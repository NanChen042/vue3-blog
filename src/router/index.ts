/*
 * @Description: router
 * @Autor: Southern Wind
 * @Date: 2024-05-13 10:40:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-08 09:54:53
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NotFound from '@/views/NotFound/404.vue';
import { useStore } from '@/store/index';


// RouteRecordRaw 内置的类型接口
// 接口大写I
/* interface IRouterList{
  path?: string;
  name?: string;
  meta?: {
    menu: string;
  };
  component?: any;
  redirect?: string;

}

interface IRouterListChildren{
  path: string;
  name?: string;
  meta?: {
    menu?: string;
  };
  component?: any;
  children?:IRouterList[]
} */
// 1. 配置路由
// const routes: Array<RouteRecordRaw> = [
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    component: NotFound
  },
  {
    path: "/login", // 登录
    name: 'Login',
    meta: {
      menu: '登录',
    },
    component: () => import('@/views/Login/Login.vue')

  },
  {
    path: "/", 
    component: () => import("../views/Index/index.vue"),
  },

  {
    path: "/form", 
    component: () => import("../views/Form/Form.vue"),
  },
  {
    path: "/anli", 
    component: () => import("../views/Anli/Anli.vue"),
  },

];
// 2.返回一个 router 实列，为函数，配置 history 模式
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore()
  let token: string | null = store.token;

  if (!token) {
    if (to.path == '/login') return next();
/*     ElNotification({
      title: 'Warning',
      message: '登录状态过期，请重新登录',
      type: 'warning',
    }) */
    return next('/login')

  } else if (to.path == '/login') {
    return next('/')
  }
  next();
})


// 3.导出路由   去 main.ts 注册 router.ts
export default router