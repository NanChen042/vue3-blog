import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NotFound from '@/views/NotFound/404.vue';
import { useStore } from '@/store/index';

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
    path: "/map",
    component: () => import("../views/Map/map.vue"),
  },

  {
    path: "/form",
    name: "Form",
    component: () => import("../views/Form/Form.vue"),
    redirect: '/form/profile',
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("../views/Form/components/Profile.vue")
      },
      {
        path: "skills",
        name: "Skills",
        component: () => import("../views/Form/components/Skills.vue")
      },
      {
        path: "projects",
        name: "Projects",
        component: () => import("../views/Form/components/Projects.vue")
      }
    ]
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

router.beforeEach((to, _from, next) => {
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
