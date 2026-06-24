import { createApp } from 'vue'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import vuetyped from 'vue3typed'

import { createPinia } from 'pinia'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import './style.css'

import router from "./router/index"
import naive from 'naive-ui'
import i18n from './i18n'
import { useThemeStore } from './store/theme'

const pinia = createPinia();
const app = createApp(App)

app.use(Particles, {
  init: async (engine: any) => {
    await loadSlim(engine);
  },
})
  .use(vuetyped)
  .use(router)
  .use(pinia)
  .use(naive)
  .use(i18n)
  .mount('#app')

const themeStore = useThemeStore();
themeStore.initTheme();
