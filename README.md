# AI/ML Eat the Dot — MVP

**Goal:** From a clean clone, train a tabular Q-learning agent that reliably reaches the dot on a 10×10 grid (mean return ≥ 0.7 over the last 100 episodes) in ≤ 10 minutes on CPU, and replay the learned policy in a minimal Three.js viewer.

## Environment spec
- **Grid:** width=10, height=10; free space only (no walls for MVP).
- **Action space:** {0: up, 1: right, 2: down, 3: left}.
- **Observation:** `(ax, ay, dx, dy)` where `a` is agent, `d` is dot; integers in `[0, width-1]`.
- **Episode end:** when dot reached or `maxSteps=200`.
- **Rewards:** `+1` when dot reached; `-0.01` per step; no wall penalty in MVP.
- **Determinism:** seedable RNG; `reset(seed)` and CLI `--seed` to reproduce trajectories.

## Quickstart
```bash
# 1) Backend (train + serve replay)
cd backend
npm i
npm run train        # trains Q-learning and writes CSV + trajectory JSON
npm start            # starts Fastify on :3000 and WS on /ws

# 2) Frontend (static viewer)
cd ../frontend
npm i
npm start            # serves index.html on :5173 (Vite dev server)
```

### Train options
```bash
node src/cli/train.js --episodes=10000 --seed=123 --grid=10x10 --maxSteps=200 \\
  --alpha=0.2 --gamma=0.99 --epsStart=1.0 --epsEnd=0.05 --epsDecay=5000
```
Outputs:
- `data/logs/returns-<timestamp>.csv` (episode, return, epsilon)
- `data/trajectories/ep-<n>-<timestamp>.json` (state/action/reward stream)

### Replay a trajectory
1. Copy a trajectory filename printed at end of train.
2. `POST /run/replay` with `{ "file": "ep-123-2025-08-08T20-55-12.json" }`.
3. Open the viewer; it connects to `ws://localhost:3000/ws` and renders ticks.

```bash
curl -X POST http://localhost:3000/run/replay \\
  -H 'content-type: application/json' \\
  -d '{"file":"ep-123-2025-08-08T20-55-12.json"}'
```

## Why tabular first?
Simplest possible loop to verify rewards, termination, determinism, and the I/O that the viewer needs. DQN/TF.js can be added after MVP.
