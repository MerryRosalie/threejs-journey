import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// Create axes helper
const axes = new THREE.AxesHelper(2);
scene.add(axes);

// Create cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#f542a4" });
const mesh = new THREE.Mesh(geometry, material);

// Transform object
mesh.position.set(3, 1, 1);
mesh.scale.set(2, 1, 1);
mesh.rotation.reorder("XYZ");
mesh.rotation.set(Math.PI / 4, 0, 0);

// Normalize positions
// Vector length becomes 1
mesh.position.normalize();

scene.add(mesh);

// Find length of vector position
console.log("Vector position length:", mesh.position.length());

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 3);

// Set camera to look at object
camera.lookAt(mesh.position);

scene.add(camera);

// Find distance of object to camera
console.log("Distance to camera:", mesh.position.distanceTo(camera.position));

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
