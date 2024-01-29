import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

/**
 * Initialize GUI
 */
const gui = new GUI();

const debugObject = {};
debugObject.materialMode = "standard";

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const doorColor = textureLoader.load("/textures/door/color.jpg");
const doorAlpha = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusion = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeight = textureLoader.load("/textures/door/height.jpg");
const doorNormal = textureLoader.load("/textures/door/normal.jpg");
const doorMetalness = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughness = textureLoader.load("/textures/door/roughness.jpg");

const matcap = textureLoader.load("/textures/matcaps/3.png");
const gradient = textureLoader.load("/textures/gradients/5.jpg");

doorColor.colorSpace = THREE.SRGBColorSpace;
matcap.colorSpace = THREE.SRGBColorSpace;

doorHeight.generateMipmaps = false;
doorHeight.minFilter = THREE.NearestFilter;
doorHeight.magFilter = THREE.NearestFilter;

gradient.generateMipmaps = false;
gradient.minFilter = THREE.NearestFilter;
gradient.magFilter = THREE.NearestFilter;

/**
 * Material
 */

const basicMaterial = () => {
  const material = new THREE.MeshBasicMaterial();
  material.map = doorColor;
  material.transparent = true;
  material.alphaMap = doorAlpha;
  material.side = THREE.DoubleSide;
  return material;
};

// Normal material
const normalMaterial = () => {
  const material = new THREE.MeshNormalMaterial();
  material.flatShading = true;
  material.side = THREE.DoubleSide;
  return material;
};

// Matcap Material
const matcapMaterial = () => {
  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcap;
  material.side = THREE.DoubleSide;
  return material;
};

// Lambert Material
const lambertMaterial = () => {
  const material = new THREE.MeshLambertMaterial();
  material.map = doorColor;
  material.transparent = true;
  material.alphaMap = doorAlpha;
  material.aoMap = doorAmbientOcclusion;
  material.normalMap = doorNormal;
  material.side = THREE.DoubleSide;
  return material;
};

// Phong Material
const phongMaterial = () => {
  const material = new THREE.MeshPhongMaterial();
  material.shininess = 100;
  material.specular = new THREE.Color(0x1188ff);
  material.side = THREE.DoubleSide;
  return material;
};

// Toon Material
const toonMaterial = () => {
  const material = new THREE.MeshToonMaterial();
  material.gradientMap = gradient;
  material.side = THREE.DoubleSide;
  return material;
};

// Standard material
const standardMaterial = () => {
  const material = new THREE.MeshStandardMaterial();
  material.side = THREE.DoubleSide;
  material.map = doorColor;
  material.transparent = true;
  material.alphaMap = doorAlpha;
  material.aoMap = doorAmbientOcclusion;
  material.aoMapIntensity = 1;
  material.displacementMap = doorHeight;
  material.displacementScale = 0.1;
  material.normalMap = doorNormal;
  material.normalScale.set(0.5, 0.5);
  material.metalnessMap = doorMetalness;
  material.roughnessMap = doorRoughness;
  material.metalness = 1;
  material.roughness = 1;
  return material;
};

// Physical material
const physicalMaterial = () => {
  const material = new THREE.MeshPhysicalMaterial();
  material.side = THREE.DoubleSide;
  material.map = doorColor;
  material.transparent = true;
  material.alphaMap = doorAlpha;
  material.aoMap = doorAmbientOcclusion;
  material.aoMapIntensity = 1;
  material.displacementMap = doorHeight;
  material.displacementScale = 0.1;
  material.normalMap = doorNormal;
  material.normalScale.set(0.5, 0.5);
  material.metalnessMap = doorMetalness;
  material.roughnessMap = doorRoughness;
  material.metalness = 1;
  material.roughness = 1;
  material.iridescence = 1;
  material.iridescenceIOR = 1;
  material.iridescenceThicknessRange = [100, 800];
  return material;
};

// Physical Material without effect
const physicalMaterialWithoutEffect = () => {
  const material = new THREE.MeshPhysicalMaterial();
  material.metalness = 0.1;
  material.roughness = 0.1;
  material.transmission = 0.75;
  material.iridescenceIOR = 1.5;
  material.thickness = 0.5;
  return material;
};

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  standardMaterial()
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  standardMaterial()
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  standardMaterial()
);
torus.position.x = 1.5;

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.75);
pointLight.position.x = 1;
pointLight.position.y = 2;
pointLight.position.z = -1;
scene.add(pointLight);

/**
 * HDR
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap;
  scene.environment = envMap;
});

const changeMaterial = (material, sphere, plane, torus) => {
  [sphere, plane, torus].forEach((mesh) => mesh.material.dispose());
  sphere.material = plane.material = torus.material = material;
};

gui
  .add(debugObject, "materialMode", [
    "standard",
    "normal",
    "matcap",
    "lambert",
    "phong",
    "toon",
    "basic",
    "physical",
    "physicalWithoutEffect",
  ])
  .onChange((value) => {
    switch (value) {
      case "basic":
        changeMaterial(basicMaterial(), sphere, plane, torus);
        break;
      case "normal":
        changeMaterial(normalMaterial(), sphere, plane, torus);
        break;
      case "matcap":
        changeMaterial(matcapMaterial(), sphere, plane, torus);
        break;
      case "lambert":
        changeMaterial(lambertMaterial(), sphere, plane, torus);
        break;
      case "phong":
        changeMaterial(phongMaterial(), sphere, plane, torus);
        break;
      case "toon":
        changeMaterial(toonMaterial(), sphere, plane, torus);
        break;
      case "standard":
        changeMaterial(standardMaterial(), sphere, plane, torus);
        break;
      case "physical":
        changeMaterial(physicalMaterial(), sphere, plane, torus);
        break;
      case "physicalWithoutEffect":
        changeMaterial(physicalMaterialWithoutEffect(), sphere, plane, torus);
        break;
      default:
        changeMaterial(basicMaterial(), sphere, plane, torus);
        break;
    }
  });

scene.add(sphere, plane, torus);

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

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
