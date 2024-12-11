/*
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-05-13 10:40:50
 * @LastEditors: Southern Wind
 * @LastEditTime: 2024-06-06 10:35:21
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
// 模块自动化导入
import ViteAutoImport from 'unplugin-auto-import/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}
const alias: Record<string, string> = {
  '@': pathResolve("src")
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? "/vue3-blog" : "/",
  // base: "/vue3-blog",
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),

  ViteAutoImport({
    imports: ['vue', 'vue-router'],
    // dirs:['./src/api'] 模块自定义导入
    dts: './src/auto-import.d.ts',
  })
  ],
  resolve: {
    alias
  },
  server: {
    proxy: {
      '/api': {
        target: '0,0,0,0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },

    }
  },

  // 适配
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/css/global.less";',
      },
    },

  }


})
