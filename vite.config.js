import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig(({ mode }) => {
  
  // ルートの .env / .env.development 等を読み込む
  const env = loadEnv(mode, process.cwd(), '')
  const API_URL = env.VITE_API_URL
  return {
    base: '/portfolio-frontend/',
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
      }),
      VueMacros({ setupSFC: true }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
        }
      }
    },
  }
})
