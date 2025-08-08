import { mulberry32 } from '../util/rng.js';

export class GridEnv {
  constructor({ width = 10, height = 10, maxSteps = 200 } = {}) {
    this.width = width;
    this.height = height;
    this.maxSteps = maxSteps;
    this.reset();
  }

  reset(seed = 123) {
    this.rng = mulberry32(seed);
    this.t = 0;
    this.ax = Math.floor(this.rng() * this.width);
    this.ay = Math.floor(this.rng() * this.height);
    this.dx = Math.floor(this.rng() * this.width);
    this.dy = Math.floor(this.rng() * this.height);
    // avoid starting on the dot
    if (this.ax === this.dx && this.ay === this.dy) this.dx = (this.dx + 1) % this.width;
    return this._obs();
  }

  _obs() {
    return { ax: this.ax, ay: this.ay, dx: this.dx, dy: this.dy };
  }

  step(action) {
    // 0 up, 1 right, 2 down, 3 left
    if (action === 0 && this.ay > 0) this.ay -= 1;
    else if (action === 1 && this.ax < this.width - 1) this.ax += 1;
    else if (action === 2 && this.ay < this.height - 1) this.ay += 1;
    else if (action === 3 && this.ax > 0) this.ax -= 1;

    this.t += 1;
    let reward = -0.01;
    let terminated = false;

    if (this.ax === this.dx && this.ay === this.dy) {
      reward = 1.0;
      terminated = true;
    } else if (this.t >= this.maxSteps) {
      terminated = true;
    }

    return [this._obs(), reward, terminated, false, { t: this.t }];
  }

  key() {
    return `${this.ax},${this.ay},${this.dx},${this.dy}`;
  }
}
