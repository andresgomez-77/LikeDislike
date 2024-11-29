import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/LikeDislike/',
  resolve: {
    extensions: ['.js', '.jsx'], // Asegúrate de que .jsx sea reconocido
  },
  server: {
    proxy: {
      "/api": {
        target: "https://superheroapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
