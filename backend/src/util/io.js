import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), '..');
export const dataDir = path.resolve(root, 'data');
export const trajDir = path.resolve(dataDir, 'trajectories');
export const logDir = path.resolve(dataDir, 'logs');

export function ensureDirs() {
  [dataDir, trajDir, logDir].forEach((p) => fs.mkdirSync(p, { recursive: true }));
}

export function writeCSVLine(filePath, arr) {
  fs.appendFileSync(filePath, arr.join(',') + '\n');
}

export function writeJSON(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj));
}

export function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
