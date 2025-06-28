import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const outputDir = env.VITE_BUILD_OUTDIR || 'dist';

  return {
    assetsInclude: ['**/*.md'],
    plugins: [
      nodePolyfills(),
      svgr(),
      tailwindcss(),
      react()
    ],
    build: {
      outDir: outputDir
    }
  };
});