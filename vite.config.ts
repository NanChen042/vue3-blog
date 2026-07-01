import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Markdown from 'unplugin-vue-markdown/vite';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import highlightjs from 'highlight.js';
import path from 'path'
// 模块自动化导入
import ViteAutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: process.env.CF_PAGES ? "/" : (process.env.NODE_ENV === 'production' ? "/vue3-blog" : "/"),
  // base: "/vue3-blog",
  plugins: [
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        // 注册 vue 为 xml 的别名，以支持 Vue 代码块的高亮
        highlightjs.registerAliases('vue', { languageName: 'xml' });
        md.use(markdownItHighlightjs, { inline: false, hljs: highlightjs });
      },
      wrapperClasses: 'markdown-body prose dark:prose-invert max-w-none', // Automatic typography
    }),
    vue({
      include: [/\.vue$/, /\.md$/], // <-- IMPORTANT: let vue parse markdown files
    }),
    tailwindcss(),
  AutoImport({
    resolvers: [NaiveUiResolver()],
  }),
  Components({
    resolvers: [NaiveUiResolver()],
  }),

  ViteAutoImport({
    imports: ['vue', 'vue-router'],
    // dirs:['./src/api'] 模块自定义导入
    dts: './src/auto-import.d.ts',
  })
  ],
  optimizeDeps: {
    include: ['mermaid']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 适配
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        // additionalData: '@import "./src/assets/css/global.less";',
      },
    },

  },
  build: {
    // 关闭打包时的警告
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('echarts')) {
            return 'echarts';
          }
        }
      }
    }
  }
})
