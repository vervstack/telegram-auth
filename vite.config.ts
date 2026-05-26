import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import {resolve} from "node:path"

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["src"],
            tsconfigPath: "./tsconfig.build.json",
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "TelegramAuth",
            fileName: "telegram-auth",
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "ReactJSXRuntime",
                },
            },
        },
    },
})
