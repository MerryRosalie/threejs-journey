import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: "#f542a4" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Cursor controls
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Animate cube based on mousemove
const control = () => {
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2.5;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2.5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(control);
};

control();
