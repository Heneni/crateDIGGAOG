import * as THREE from 'three';
import Papa from 'papaparse';
import './style.css';

// Basic Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

camera.position.z = 7;

// Load CSV
async function loadCSV() {
  const url = '/cratediggerDB.csv';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const data = Papa.parse(text, { header: true });
    return data.data;
  } catch (e) {
    console.error('Failed to load CSV', e);
    return [];
  }
}

function addCrate({ title, artist, cover, year }, i) {
  const geometry = new THREE.BoxGeometry(1, 1, 0.1);
  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (i - 2) * 1.5;
  mesh.userData = { title, artist, cover, year };
  scene.add(mesh);
}

// Main
loadCSV().then(records => {
  records.filter(row => row.title).forEach(addCrate);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
