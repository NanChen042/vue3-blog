import { createApp } from 'vue'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import vuetyped from 'vue3typed'

import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import './style.css'

import router from "./router/index"
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './i18n'
import { useThemeStore } from './store/theme'

const pinia = createPinia();
const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(Particles, {
  init: async (engine: any) => {
    await loadSlim(engine);
  },
})
  .use(vuetyped)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .use(i18n)
  .mount('#app')

const themeStore = useThemeStore();
themeStore.initTheme();
