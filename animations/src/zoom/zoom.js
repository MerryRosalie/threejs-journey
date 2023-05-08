import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
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

const clock = new THREE.Clock();

// Rotate that adapts to different frame rate
const zoom = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.position.z = Math.tan(elapsedTime);
  mesh.position.x = Math.tan(elapsedTime);
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);

  window.requestAnimationFrame(zoom);
};

zoom();
