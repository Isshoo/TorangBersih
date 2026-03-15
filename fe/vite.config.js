import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: true, // Ini akan membuka akses ke IP lokal (0.0.0.0)
		port: 5173, // Pastikan port ini yang Anda gunakan
	  }
});
