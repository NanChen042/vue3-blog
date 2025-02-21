// vite.config.ts
import { defineConfig } from "file:///D:/Ademo/aaaaaaJIA/github%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/vue3-blog/node_modules/.pnpm/vite@5.0.11_@types+node@20.11.5_less@4.2.0_sass@1.77.6_terser@5.27.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Ademo/aaaaaaJIA/github%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/vue3-blog/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.0.11_@types+node@20.11.5_less@4.2.0_sass@1.77.6_terser@5.27.0_2zfwumeige3gnzoyxmblgqe5jy/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import ViteAutoImport from "file:///D:/Ademo/aaaaaaJIA/github%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/vue3-blog/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.10.0_vue@3.4.15_typescript@5.3.3___rollup@4.9.5/node_modules/unplugin-auto-import/dist/vite.js";
import AutoImport from "file:///D:/Ademo/aaaaaaJIA/github%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/vue3-blog/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.10.0_vue@3.4.15_typescript@5.3.3___rollup@4.9.5/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Ademo/aaaaaaJIA/github%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/vue3-blog/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.23.6_rollup@4.9.5_vue@3.4.15_typescript@5.3.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/Ademo/aaaaaaJIA/github%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/vue3-blog/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.23.6_rollup@4.9.5_vue@3.4.15_typescript@5.3.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_dirname = "D:\\Ademo\\aaaaaaJIA\\github\u4E2A\u4EBA\u535A\u5BA2\\vue3-blog";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/vue3-blog" : "/",
  // base: "/vue3-blog",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ViteAutoImport({
      imports: ["vue", "vue-router"],
      // dirs:['./src/api'] 模块自定义导入
      dts: "./src/auto-import.d.ts"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.wniui.com",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  // 适配
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/css/global.less";'
      }
    }
  },
  build: {
    // 关闭打包时的类型检查
    typescript: {
      noEmit: true,
      ignoreBuildErrors: true
    },
    // 关闭打包时的警告
    chunkSizeWarningLimit: 2e3,
    rollupOptions: {
      output: {
        manualChunks: {
          "echarts": ["echarts"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBZGVtb1xcXFxhYWFhYWFKSUFcXFxcZ2l0aHViXHU0RTJBXHU0RUJBXHU1MzVBXHU1QkEyXFxcXHZ1ZTMtYmxvZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQWRlbW9cXFxcYWFhYWFhSklBXFxcXGdpdGh1Ylx1NEUyQVx1NEVCQVx1NTM1QVx1NUJBMlxcXFx2dWUzLWJsb2dcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0FkZW1vL2FhYWFhYUpJQS9naXRodWIlRTQlQjglQUElRTQlQkElQkElRTUlOEQlOUElRTUlQUUlQTIvdnVlMy1ibG9nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG4vLyBcdTZBMjFcdTU3NTdcdTgxRUFcdTUyQThcdTUzMTZcdTVCRkNcdTUxNjVcbmltcG9ydCBWaXRlQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBcIi92dWUzLWJsb2dcIiA6IFwiL1wiLFxuICAvLyBiYXNlOiBcIi92dWUzLWJsb2dcIixcbiAgcGx1Z2luczogW3Z1ZSgpLFxuICBBdXRvSW1wb3J0KHtcbiAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICB9KSxcbiAgQ29tcG9uZW50cyh7XG4gICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgfSksXG5cbiAgVml0ZUF1dG9JbXBvcnQoe1xuICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcbiAgICAvLyBkaXJzOlsnLi9zcmMvYXBpJ10gXHU2QTIxXHU1NzU3XHU4MUVBXHU1QjlBXHU0RTQ5XHU1QkZDXHU1MTY1XG4gICAgZHRzOiAnLi9zcmMvYXV0by1pbXBvcnQuZC50cycsXG4gIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vd3d3LnduaXVpLmNvbScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBcdTkwMDJcdTkxNERcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBjaGFyc2V0OiBmYWxzZSxcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvYXNzZXRzL2Nzcy9nbG9iYWwubGVzc1wiOycsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBcdTUxNzNcdTk1RURcdTYyNTNcdTUzMDVcdTY1RjZcdTc2ODRcdTdDN0JcdTU3OEJcdTY4QzBcdTY3RTVcbiAgICB0eXBlc2NyaXB0OiB7XG4gICAgICBub0VtaXQ6IHRydWUsXG4gICAgICBpZ25vcmVCdWlsZEVycm9yczogdHJ1ZSxcbiAgICB9LFxuICAgIC8vIFx1NTE3M1x1OTVFRFx1NjI1M1x1NTMwNVx1NjVGNlx1NzY4NFx1OEI2Nlx1NTQ0QVxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ2VjaGFydHMnOiBbJ2VjaGFydHMnXSxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixPQUFPLG9CQUFvQjtBQUUzQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQVJwQyxJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNLFFBQVEsSUFBSSxhQUFhLGVBQWUsZUFBZTtBQUFBO0FBQUEsRUFFN0QsU0FBUztBQUFBLElBQUMsSUFBSTtBQUFBLElBQ2QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBRUQsZUFBZTtBQUFBLE1BQ2IsU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBO0FBQUEsTUFFN0IsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osU0FBUztBQUFBLFFBQ1QsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFFRjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCxZQUFZO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixtQkFBbUI7QUFBQSxJQUNyQjtBQUFBO0FBQUEsSUFFQSx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixXQUFXLENBQUMsU0FBUztBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
