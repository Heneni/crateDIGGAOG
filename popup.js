// Chrome Extension Popup - CrateDIGGAOG
// 3D Crate Visualization using Three.js

let scene, camera, renderer;
let crates = [];

// Initialize the 3D scene
function initScene() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x181818);
    
    // Camera setup - adjusted for popup dimensions
    camera = new THREE.PerspectiveCamera(
        75,
        400 / 300, // popup aspect ratio
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 300);
    document.getElementById('app').appendChild(renderer.domElement);
    
    // Add some basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
}

// Load CSV data
async function loadCSV() {
    try {
        const response = await fetch(chrome.runtime.getURL('cratediggerDB.csv'));
        const text = await response.text();
        const data = Papa.parse(text, { header: true });
        return data.data.filter(row => row.title && row.title.trim() !== '');
    } catch (e) {
        console.error('Failed to load CSV', e);
        return [];
    }
}

// Create a crate (vinyl record) mesh
function createCrate(record, index) {
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
    
    // Create different colors for different artists
    const colors = [0x44aa88, 0xaa4488, 0x4488aa, 0xaa8844, 0x88aa44, 0x8844aa];
    const color = colors[index % colors.length];
    
    const material = new THREE.MeshLambertMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position crates in a grid
    const col = index % 4;
    const row = Math.floor(index / 4);
    mesh.position.x = (col - 1.5) * 1.2;
    mesh.position.y = (row - 1) * 1.2;
    mesh.position.z = 0;
    
    // Store record data
    mesh.userData = {
        title: record.title,
        artist: record.artist,
        year: record.year,
        cover: record.cover
    };
    
    // Add hover effect
    mesh.rotation.x = Math.random() * 0.2 - 0.1;
    mesh.rotation.y = Math.random() * 0.2 - 0.1;
    
    scene.add(mesh);
    crates.push(mesh);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Gentle rotation for all crates
    crates.forEach((crate, index) => {
        crate.rotation.y += 0.005 + (index * 0.001);
        crate.rotation.x += 0.002;
    });
    
    renderer.render(scene, camera);
}

// Show crate info on hover
function setupInteraction() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    function onMouseMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(crates);
        
        // Remove existing info
        const existingInfo = document.querySelector('.info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        if (intersects.length > 0) {
            const crate = intersects[0].object;
            const info = document.createElement('div');
            info.className = 'info';
            info.innerHTML = `
                <strong>${crate.userData.title}</strong><br>
                ${crate.userData.artist}<br>
                ${crate.userData.year}
            `;
            document.body.appendChild(info);
            
            // Scale up the hovered crate
            crate.scale.set(1.1, 1.1, 1.1);
        }
        
        // Reset scale for all other crates
        crates.forEach(c => {
            if (intersects.length === 0 || c !== intersects[0].object) {
                c.scale.set(1, 1, 1);
            }
        });
    }
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
}

// Initialize everything when popup opens
document.addEventListener('DOMContentLoaded', async () => {
    initScene();
    
    const records = await loadCSV();
    console.log(`Loaded ${records.length} records`);
    
    // Show up to 8 records in the popup
    records.slice(0, 8).forEach((record, index) => {
        createCrate(record, index);
    });
    
    setupInteraction();
    animate();
});