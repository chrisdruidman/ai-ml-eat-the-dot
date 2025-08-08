import Fastify from 'fastify';
import cors from '@fastify/cors';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { ensureDirs, trajDir, readJSON } from './util/io.js';

dotenv.config();
const PORT = Number(process.env.PORT || 3000);

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

app.get('/health', async () => ({ ok: true }));

let wss; let currentReplay = null;

app.post('/run/replay', async (req, reply) => {
  const { file, speed = 1 } = req.body || {};
  if (!file) return reply.code(400).send({ error: 'file required' });
  const full = path.resolve(trajDir, file);
  if (!fs.existsSync(full)) return reply.code(404).send({ error: 'trajectory not found' });
  currentReplay = { data: readJSON(full), speed: Number(speed) };
  app.log.info({ file }, 'loaded trajectory for replay');
  return { ok: true };
});

const server = await app.listen({ port: PORT, host: '0.0.0.0' });
ensureDirs();

// WebSocket server (same HTTP server)
wss = new WebSocketServer({ server: app.server, path: '/ws' });
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'hello', msg: 'connected' }));
  ws.on('message', (buf) => {
    try {
      const m = JSON.parse(buf.toString());
      if (m.type === 'control' && m.cmd === 'replay' && currentReplay) {
        const { traj } = currentReplay.data;
        let i = 0;
        const interval = setInterval(() => {
          if (i >= traj.length || ws.readyState !== ws.OPEN) { clearInterval(interval); return; }
          const tick = traj[i++];
          ws.send(JSON.stringify({ type: 'tick', tick }));
        }, Math.max(16, 100 / (currentReplay.speed || 1)));
      }
    } catch {}
  });
});

console.log(`HTTP on http://localhost:${PORT}  WS on ws://localhost:${PORT}/ws`);
