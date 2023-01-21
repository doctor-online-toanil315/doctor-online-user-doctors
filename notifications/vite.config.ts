import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
const packageJson = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "notification",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./Module": "./src/bootstrap.tsx",
      },
      shared: packageJson.dependencies,
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    "process.env": {},
  },
  build: { sourcemap: false, rollupOptions: { cache: false } },
});
