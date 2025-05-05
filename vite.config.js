import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  base: '/cpl-website/',
  assetsInclude: ['**/*.md'],
  plugins: [
    nodePolyfills(),
    svgr(),
    tailwindcss(),
    react()
  ],
}))
