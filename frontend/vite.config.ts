import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],

  server: {
    host: true,        // дозволяє доступ ззовні Vite слухає всі IP (0.0.0.0), не тільки localhost контейнера
    port: 5173,        // порт з docker compose порт для доступу зовні (мапінг з docker-compose)
    strictPort: true,  // не міняти порт
    watch: {
      usePolling: true // обов'язково для Docker на Windows Vite буде “опитувати” файли для змін (важливо для Docker на Windows), щоб hot reload працював
    }
  },
});