import { defineConfig } from "vite";
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
        rotate: resolve(__dirname, "/rotate/index.html"),
        bounce: resolve(__dirname, "/bounce/index.html"),
        zoom: resolve(__dirname, "/zoom/index.html"),
        delay: resolve(__dirname, "/delay/index.html"),
      },
    },
  },
};
