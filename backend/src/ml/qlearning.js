export class QLearningAgent {
  constructor({ alpha = 0.2, gamma = 0.99, epsStart = 1.0, epsEnd = 0.05, epsDecay = 5000 } = {}) {
    this.alpha = alpha;
    this.gamma = gamma;
    this.epsStart = epsStart;
    this.epsEnd = epsEnd;
    this.epsDecay = epsDecay;
    this.q = new Map(); // key -> Float32Array(4)
    this.steps = 0;
  }

  _Q(key) {
    if (!this.q.has(key)) this.q.set(key, new Float32Array(4));
    return this.q.get(key);
  }

  epsilon() {
    const e = this.epsEnd + (this.epsStart - this.epsEnd) * Math.exp(-this.steps / this.epsDecay);
    return e;
  }

  act(key, rng) {
    this.steps++;
    const e = this.epsilon();
    if (rng() < e) return Math.floor(rng() * 4);
    const Q = this._Q(key);
    let a = 0, best = Q[0];
    for (let i = 1; i < 4; i++) if (Q[i] > best) { best = Q[i]; a = i; }
    return a;
  }

  learn(sKey, a, r, s2Key, done) {
    const Qs = this._Q(sKey);
    const Qs2 = this._Q(s2Key);
    let maxNext = Qs2[0];
    for (let i = 1; i < 4; i++) if (Qs2[i] > maxNext) maxNext = Qs2[i];
    const target = r + (done ? 0 : this.gamma * maxNext);
    Qs[a] = (1 - this.alpha) * Qs[a] + this.alpha * target;
  }
}
