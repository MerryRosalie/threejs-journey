import { resolve } from "path";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  root: "src/",
  publicDir: "../static/",
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
        main: resolve(__dirname, "index.html"),
        "basic-scene": resolve(__dirname, "basic-scene/index.html"),
        animations: resolve(__dirname, "animations/index.html"),
        "transform-object": resolve(__dirname, "transform-object/index.html"),
        cameras: resolve(__dirname, "cameras/index.html"),
        textures: resolve(__dirname, "textures/index.html"),
      },
    },
  },
};
