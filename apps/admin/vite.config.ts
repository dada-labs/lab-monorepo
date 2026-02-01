import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared/icons": path.resolve(
        __dirname,
        "../../packages/shared/src/icons.ts"
      ),
      "@shared": path.resolve(__dirname, "../../packages/shared/index.ts"),
    },
  },
});
