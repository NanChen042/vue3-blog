import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from 'path'
// 模块自动化导入
import ViteAutoImport from 'unplugin-auto-import/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.wniui.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
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

  },
  build: {
    // 关闭打包时的警告
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'echarts': ['echarts'],
        }
      }
    }
  }
})
