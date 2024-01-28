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
        main: resolve(__dirname, "src/index.html"),
        "basic-scene": resolve(__dirname, "src/basic-scene/index.html"),
        animations: resolve(__dirname, "src/animations/index.html"),
        "transform-object": resolve(
          __dirname,
          "src/transform-object/index.html"
        ),
        cameras: resolve(__dirname, "src/cameras/index.html"),
        textures: resolve(__dirname, "src/textures/index.html"),
      },
    },
  },
};
