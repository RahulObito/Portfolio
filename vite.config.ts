import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// The production portfolio is a static React site; contact submissions use Web3Forms.
export default defineConfig({
  server: { host: "localhost", port: 8080 },
  build: { outDir: "dist/spa" },
  plugins: [react()],
});
