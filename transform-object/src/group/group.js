import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// Create axes helper
const axes = new THREE.AxesHelper(2);
scene.add(axes);

// Create Object Group
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = Math.PI / 4;

scene.add(group);

["#e2d810", "#d9138a", "#12a4d9"].map((color, index) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color })
  );
  cube.position.x = 2 - 2 * index;
  group.add(cube);
});

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 3);

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
