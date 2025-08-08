const app = document.getElementById('app');
const statusEl = document.getElementById('status');
const btn = document.getElementById('replay');

// Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// Grid (10x10) — simple lines
const size = 10, step = 1;
const grid = new THREE.GridHelper(size, size / step, 0x666666, 0x222222);
scene.add(grid);

// Agent and dot
const agentGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
const dotGeo = new THREE.SphereGeometry(0.45, 16, 16);
const agentMat = new THREE.MeshStandardMaterial({ color: 0x4caf50 });
const dotMat = new THREE.MeshStandardMaterial({ color: 0xff5252 });
const agent = new THREE.Mesh(agentGeo, agentMat);
const dot = new THREE.Mesh(dotGeo, dotMat);
scene.add(agent); scene.add(dot);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dir = new THREE.DirectionalLight(0xffffff, 0.8); dir.position.set(5, 10, 7); scene.add(dir);

camera.position.set(5, 8, 12);
camera.lookAt(5, 0, 5);

function place(mesh, x, y) {
  mesh.position.set(x - 4.5, 0.5, y - 4.5);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

let ws;
function connect() {
  ws = new WebSocket(`ws://localhost:3000/ws`);
  ws.onopen = () => (statusEl.textContent = 'connected');
  ws.onclose = () => (statusEl.textContent = 'disconnected');
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.type === 'tick') {
      const { ax, ay, dx, dy } = m.tick;
      place(agent, ax, ay); place(dot, dx, dy);
    }
  };
}
connect();

btn.onclick = () => {
  if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'control', cmd: 'replay' }));
};

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
