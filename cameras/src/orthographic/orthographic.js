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
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -aspectRatio,
  aspectRatio,
  1,
  -1,
  0.1,
  100
);
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
