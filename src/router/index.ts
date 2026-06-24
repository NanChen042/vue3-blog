import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home/Home.vue"),
      },
      {
        path: "blog",
        name: "Blog",
        component: () => import("../views/Blog/Blog.vue"),
      },
      {
        path: "categories",
        name: "Categories",
        component: () => import("../views/Categories/Categories.vue"),
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("../views/Tools/Tools.vue"),
      },
      {
        path: "games",
        name: "Games",
        component: () => import("../views/Games/Games.vue"),
      },
      {
        path: "game/:id",
        name: "GameDetail",
        component: () => import("../views/Games/GameDetail.vue"),
      },
      {
        path: "chat",
        name: "Chat",
        meta: { requiresAuth: true },
        component: () => import("../views/Chat/Chat.vue"),
      },
      {
        path: "lab",
        name: "Lab",
        meta: { requiresAuth: true },
        component: () => import("../views/Lab/Lab.vue"),
      },
      {
        path: "doc",
        redirect: "/doc/ai-agent-tutorial",
      },
      {
        path: "doc/:id",
        name: "Doc",
        component: () => import("../views/Doc/Doc.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        meta: { requiresAuth: true },
        component: () => import("../views/Settings/Settings.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/404/NotFound.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "/guide",
    name: "Guide",
    component: () => import("../views/Guide/Guide.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    return '/login';
  }
  return true;
});

export default router
