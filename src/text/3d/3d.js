import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * HDR
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "/textures/environmentMap/kloppenheim_06_puresky_2k.hdr",
  (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = envMap;
    scene.environment = envMap;
  }
);

/**
 * Font
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/Super_Woobly_Regular.json", (font) => {
  const textGeometry = new TextGeometry("M3RRY", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();

  const material = new THREE.MeshPhysicalMaterial();
  material.transmission = 0.25;
  material.transparent = true;
  material.opacity = 0.85;
  material.roughness = 0.25;
  material.metalness = 0.1;
  material.iridescence = 1;
  material.iridescenceIOR = 1;

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.SphereGeometry();
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = (Math.random() - 0.5) * 75;
    mesh.position.y = (Math.random() - 0.5) * 75;
    mesh.position.z = (Math.random() - 0.5) * 75;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    const scale = Math.random();
    mesh.scale.x = scale;
    mesh.scale.y = scale;
    mesh.scale.z = scale;

    scene.add(mesh);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  scene.traverse((mesh) => {
    mesh.rotation.x = Math.cos(elapsedTime) * 0.015;
    mesh.rotation.y = -Math.sin(elapsedTime) * 0.015;
    mesh.rotation.z = -Math.sin(elapsedTime) * 0.015;
  });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
