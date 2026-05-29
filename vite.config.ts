import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import cssInjectedByJs from "vite-plugin-css-injected-by-js"
import {resolve} from "node:path"

export default defineConfig({
    plugins: [
        react(),
        cssInjectedByJs(),
        dts({
            include: ["src"],
            tsconfigPath: "./tsconfig.build.json",
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "Chures",
            fileName: "chures",
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime", "zustand", "framer-motion"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "ReactJSXRuntime",
                    zustand: "Zustand",
                    "framer-motion": "FramerMotion",
                },
            },
        },
    },
})
