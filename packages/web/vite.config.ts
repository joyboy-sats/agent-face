import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@agent-face/core": resolve(__dirname, "../core/src/index.ts"),
      "@agent-face/react": resolve(__dirname, "../react/src/index.tsx")
    }
  },
  server: {
    fs: {
      allow: [resolve(__dirname, "..", "..")]
    }
  }
});
