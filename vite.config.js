import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasmPack from "vite-plugin-wasm-pack";

export default defineConfig({
    plugins: [wasmPack(["./wave"]), react()],
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-redux': ["react", "react-dom", "redux", "redux-thunk", "react-redux"],
                    fonts: [
                        "@fortawesome/fontawesome-free",
                        "@fortawesome/fontawesome-svg-core",
                        "@fortawesome/free-solid-svg-icons",
                        "@fortawesome/react-fontawesome",
                        "typeface-roboto",
                        "typeface-roboto-mono",
                        "typeface-montserrat",
                    ],
                },
            },
        },
    },
});
