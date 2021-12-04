import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasmPack from "vite-plugin-wasm-pack";

export default defineConfig({
    plugins: [
        wasmPack(["./wave"]),
        react(),
    ],
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        rollupOptions: {
            output: {
                entryFileNames: "[name].js"
            }
        }
    }
});
