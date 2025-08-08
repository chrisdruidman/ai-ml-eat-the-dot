import fs from 'fs';
import path from 'path';
import { GridEnv } from '../env/gridEnv.js';
import { QLearningAgent } from '../ml/qlearning.js';
import { mulberry32, seedFromString } from '../util/rng.js';
import { ensureDirs, logDir, trajDir, writeCSVLine, writeJSON } from '../util/io.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { episodes: 5000, seed: 123, grid: '10x10', maxSteps: 200, alpha: 0.2, gamma: 0.99, epsStart: 1.0, epsEnd: 0.05, epsDecay: 5000 };
  for (let i = 0; i < args.length; i++) {
    const [k, v] = args[i].split('=');
    if (k.startsWith('--')) opts[k.slice(2)] = v ?? true;
  }
  if (typeof opts.seed === 'string' && isNaN(Number(opts.seed))) opts.seed = seedFromString(opts.seed);
  const [w, h] = String(opts.grid).split('x').map(Number);
  opts.width = w; opts.height = h;
  return opts;
}

async function main() {
  ensureDirs();
  const opts = parseArgs();
  const env = new GridEnv({ width: opts.width, height: opts.height, maxSteps: Number(opts.maxSteps) });
  const agent = new QLearningAgent({ alpha: Number(opts.alpha), gamma: Number(opts.gamma), epsStart: Number(opts.epsStart), epsEnd: Number(opts.epsEnd), epsDecay: Number(opts.epsDecay) });

  const rng = mulberry32(Number(opts.seed));
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const csv = path.resolve(logDir, `returns-${ts}.csv`);
  fs.writeFileSync(csv, 'episode,return,epsilon\n');

  let bestReturn = -Infinity; let bestTraj = null; let bestEp = -1;

  for (let ep = 1; ep <= Number(opts.episodes); ep++) {
    env.reset((rng() * 1e9) | 0);
    let done = false; let G = 0; let steps = 0;
    const traj = [];
    let sKey = env.key();
    while (!done) {
      const a = agent.act(sKey, rng);
      const [obs2, r, terminated] = env.step(a);
      const s2Key = env.key();
      agent.learn(sKey, a, r, s2Key, terminated);
      G += r; steps++;
      traj.push({ t: steps, ax: obs2.ax, ay: obs2.ay, dx: obs2.dx, dy: obs2.dy, a, r });
      sKey = s2Key;
      if (terminated) done = true;
    }

    writeCSVLine(csv, [ep, G.toFixed(4), agent.epsilon().toFixed(4)]);
    if (G > bestReturn) { bestReturn = G; bestTraj = traj; bestEp = ep; }
    if (ep % 500 == 0) console.log(`ep=${ep} return=${G.toFixed(3)} epsilon=${agent.epsilon().toFixed(3)}`);
  }

  const bestFile = `ep-${bestEp}-${ts}.json`;
  writeJSON(path.resolve(trajDir, bestFile), { meta: { bestReturn, episode: bestEp, width: opts.width, height: opts.height }, traj: bestTraj });
  console.log(`Best episode ${bestEp} return=${bestReturn.toFixed(3)} -> saved to data/trajectories/${bestFile}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
