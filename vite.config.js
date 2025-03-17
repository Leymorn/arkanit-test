import { defineConfig, loadEnv  } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.kod.mobi',
          changeOrigin: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': env.VITE_API_KEY
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // Теперь @ = src/
      }
    }
  }
});