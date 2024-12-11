/*
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-01-19 10:02:23
 * @LastEditors: Southern Wind
 * @LastEditTime: 2024-06-06 12:02:27
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { loadSlim } from "@tsparticles/slim";
import vuetyped from 'vue3typed'
// import 'amfe-flexible'

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'


import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './styles/dark/css-vars.css'


import './assets/css/input.css';
import './assets/css/global.less';

import router from "./router/index" // 引入router
const pinia = createPinia();
pinia.use(piniaPluginPersist)
createApp(App).use(vuetyped).use(Particles, {
    init: async (engine:any) => {
        // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
        await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
    },
})
.use(router).use(pinia).mount('#app')
