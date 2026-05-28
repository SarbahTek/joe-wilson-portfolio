import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget =
    env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "https://joe-wilson-api-production.up.railway.app";

  return {
    plugins: [react()],
    build: {
      sourcemap: true,
      outDir: "out",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@shared": resolve(__dirname, "../../shared"),
      },
    },
    server: {
      port: 5174,
      host: "0.0.0.0",
      proxy: {
        "/v1": {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
