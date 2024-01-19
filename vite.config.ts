import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? "/vue3-blog" : "/",
  plugins: [vue()],
  server: {
    proxy: {
        '/api': {
            target: 'http://192.168.1.10:9999',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api')
        },
       
    }
}

})
