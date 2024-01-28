import { resolve } from "path";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  root: "src/",
  publicDir: "static/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        "basic-scene": resolve(__dirname, "src/basic-scene/index.html"),
        animations: resolve(__dirname, "src/animations/index.html"),
        bounce: resolve(__dirname, "src/animations/bounce/index.html"),
        rotate: resolve(__dirname, "src/animations/rotate/index.html"),
        timeline: resolve(__dirname, "src/animations/timeline/index.html"),
        zoom: resolve(__dirname, "src/animations/zoom/index.html"),
        "transform-object": resolve(
          __dirname,
          "src/transform-object/index.html"
        ),
        group: resolve(__dirname, "src/transform-object/group/index.html"),
        transform: resolve(
          __dirname,
          "src/transform-object/transform/index.html"
        ),
        cameras: resolve(__dirname, "src/cameras/index.html"),
        mouse: resolve(__dirname, "src/cameras/mouse/index.html"),
        orbit: resolve(__dirname, "src/cameras/orbit/index.html"),
        orthographic: resolve(__dirname, "src/cameras/orthographic/index.html"),
        textures: resolve(__dirname, "src/textures/index.html"),
        minecraft: resolve(__dirname, "src/textures/minecraft/index.html"),
        materials: resolve(__dirname, "src/textures/materials/index.html"),
      },
    },
  },
};
