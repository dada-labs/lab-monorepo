import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // 포트 고정
    strictPort: true, // 다른 포트 넘어가지 않기, 에러 표시
  },
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
