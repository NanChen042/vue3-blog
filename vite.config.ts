import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssImport from "postcss-pxtorem"
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
},
 // 适配
 css: {
    postcss: {
      plugins: [
        postcssImport({
          // 这里的rootValue就是你的设计稿大小
          rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 192;
          },
          propList: ['*'],
        })
      ]
    }
  }


})
