import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: 5173, // Ensure it matches the exposed port
    strictPort: true, // Prevent random port assignment
  }
});



