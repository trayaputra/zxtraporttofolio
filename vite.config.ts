import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // "./" supaya hasil build bisa dibuka dari sub-folder (GitHub Pages / Vercel preview)
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    chunkSizeWarningLimit: 800,
  },
});
