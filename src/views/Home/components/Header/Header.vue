<template>
  <div class="w-full h-full flex items-center px-4 sm:px-6 transition-all duration-300">
    <div class="w-full max-w-[1440px] mx-auto flex items-center justify-between gap-4">

      <!-- Left: Logo pill -->
      <router-link to="/home" class="flex items-center shrink-0">
        <div class="db-card flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:shadow-md transition-all duration-200">
          <img src="/images/logos.png" class="h-8 w-auto block dark:hidden" alt="Logo" />
          <img src="/images/logosdark.png" class="h-8 w-auto hidden dark:block" alt="Logo" />
          <div class="flex items-baseline">
            <span class="font-bold text-[15px] tracking-tight" style="color: var(--db-text-primary); font-family: 'PingFang SC', 'Noto Sans SC', sans-serif;">南辰</span>
            <span class="text-[9px] tracking-[0.2em] ml-1 uppercase font-light" style="color: var(--db-text-muted)">Blog</span>
          </div>
        </div>
      </router-link>

      <!-- Center: Pill nav (desktop) -->
      <div class="hidden lg:flex items-center">
        <nav class="db-nav flex items-center gap-1 px-2 py-1.5">
          <template v-for="item in navItems" :key="item.path">
            <!-- With children dropdown -->
            <n-dropdown
              v-if="item.children"
              :options="dropdownOptions(item.children)"
              @select="handleNavigate"
              trigger="hover"
              placement="bottom"
            >
              <div
                class="db-nav-item flex items-center gap-1"
                :class="{ active: isGroupActive(item) }"
              >
                {{ item.label }}
                <svg class="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </n-dropdown>

            <!-- Normal item -->
            <div
              v-else
              class="db-nav-item"
              :class="{ active: activeRoute === item.path }"
              @click="handleNavigate(item.path)"
            >
              {{ item.label }}
            </div>
          </template>
        </nav>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Desktop action buttons -->
        <div class="hidden lg:flex items-center gap-1">
          <!-- Search -->
          <button class="db-icon-btn" @click="showSearch = !showSearch">
            <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>

          <!-- Language -->
          <button class="db-icon-btn" @click="toggleLanguage">
            <svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
          </button>

          <!-- Theme toggle -->
          <button class="db-icon-btn" @click="toggleTheme($event)">
            <svg v-if="isDark" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
            <svg v-else class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <div class="w-px h-5 mx-1" style="background: var(--db-card-border)"></div>

          <!-- User avatar / Login -->
          <template v-if="authStore.isLoggedIn">
            <n-dropdown :options="profileOptions" trigger="hover" @select="handleProfileSelect">
              <div class="flex items-center gap-2 cursor-pointer">
                <n-avatar
                  :size="34"
                  round
                  :src="authStore.userInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                  class="border-2"
                  style="border-color: var(--db-card-border);"
                />
              </div>
            </n-dropdown>
          </template>
          <template v-else>
            <button
              @click="router.push('/login')"
              class="db-login-btn"
              style="width: auto; padding: 0 0.875rem; border-radius: 9999px; background: var(--db-nav-active-bg); color: var(--db-nav-active-text); font-size: 0.8125rem; font-weight: 600;"
            >
              Login
            </button>
          </template>
        </div>

        <!-- Mobile hamburger -->
        <button
          @click="drawerVisible = true"
          class="db-icon-btn lg:hidden"
          aria-label="Menu"
          style="width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; background: var(--db-card-bg); border: 1px solid var(--db-card-border);"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h10"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Drawer -->
  <n-drawer v-model:show="drawerVisible" placement="right" :width="300" class="mobile-nav-drawer">
    <n-drawer-content :body-content-style="{ padding: 0 }">
      <div class="flex flex-col h-full p-5">
        <div class="flex items-center justify-between mb-6">
          <span class="font-bold text-lg" style="color: var(--db-text-primary)">导航</span>
          <button @click="drawerVisible = false" class="db-icon-btn">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="flex-1 space-y-1">
          <template v-for="item in navItems" :key="item.path">
            <template v-if="item.children">
              <div class="px-3 py-1 text-xs font-semibold uppercase tracking-wider" style="color: var(--db-text-muted)">
                {{ item.label }}
              </div>
              <div
                v-for="child in item.children"
                :key="child.path"
                @click="handleNavigate(child.path); drawerVisible = false"
                class="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
                :style="activeRoute === child.path ? 'background: var(--db-nav-active-bg); color: var(--db-nav-active-text);' : 'color: var(--db-nav-text);'"
              >
                {{ child.label }}
              </div>
            </template>
            <div
              v-else
              @click="handleNavigate(item.path); drawerVisible = false"
              class="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
              :style="activeRoute === item.path ? 'background: var(--db-nav-active-bg); color: var(--db-nav-active-text);' : 'color: var(--db-nav-text);'"
            >
              {{ item.label }}
            </div>
          </template>
        </div>

        <div class="pt-4 border-t flex items-center justify-between" style="border-color: var(--db-card-border)">
          <div class="flex items-center gap-2">
            <button class="db-icon-btn" @click="toggleLanguage">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
            </button>
            <button class="db-icon-btn" @click="toggleTheme($event)">
              <svg v-if="isDark" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </button>
          </div>
          <button
            v-if="!authStore.isLoggedIn"
            @click="router.push('/login'); drawerVisible = false"
            class="text-sm font-semibold px-4 py-2 rounded-full transition-all"
            style="background: var(--db-nav-active-bg); color: var(--db-nav-active-text);"
          >
            Login
          </button>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

defineOptions({ name: 'HomeHeader' });

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const { isDark } = storeToRefs(themeStore);
const { toggleTheme: baseToggleTheme } = useTheme();
const { locale } = useI18n();

const drawerVisible = ref(false);
const showSearch = ref(false);

const navItems = computed(() => [
  { path: '/home', label: t('nav.home') },
  {
    path: 'blog-parent',
    label: t('nav.blog'),
    children: [
      { path: '/blog', label: t('nav.latest') },
      { path: '/categories', label: t('nav.categories') },
    ],
  },
  { path: '/tools', label: t('nav.tools') },
  { path: '/games', label: t('nav.games') },
  { path: '/chat', label: t('nav.chat') },
  { path: '/lab', label: t('nav.lab') },
]);

const activeRoute = computed(() => route.path === '/' ? '/home' : route.path);

const isGroupActive = (item: any) => {
  if (!item.children) return false;
  return item.children.some((c: any) => c.path === activeRoute.value);
};

const dropdownOptions = (children: any[]) =>
  children.map(c => ({ key: c.path, label: c.label }));

const handleNavigate = (path: string) => {
  router.push(path);
};

const profileOptions = computed(() => [
  { label: t('header.settings'), key: 'settings' },
  { label: t('header.logout'), key: 'logout', props: { style: { color: '#ef4444' } } },
]);

const handleProfileSelect = (key: string) => {
  if (key === 'settings') router.push('/settings');
  else if (key === 'logout') { authStore.logout(); router.push('/login'); }
};

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
  localStorage.setItem('language', locale.value);
};

const toggleTheme = (event: MouseEvent) => {
  const isAppearanceTransition =
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isAppearanceTransition) { baseToggleTheme(); return; }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 10;

  document.documentElement.classList.add('no-transition');
  // @ts-ignore
  const transition = document.startViewTransition(async () => {
    baseToggleTheme();
    await nextTick();
  });

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    const animation = document.documentElement.animate(
      { clipPath: isDark.value ? [...clipPath].reverse() : clipPath },
      { duration: 400, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)', fill: 'forwards' }
    );
    animation.onfinish = () => document.documentElement.classList.remove('no-transition');
  });
};
</script>

<style scoped>
/* 彻底去除顶部导航栏内部所有“胶囊容器”的背景、边框和阴影，使其文字和图标直接悬浮在网格背景上 */
.db-card, .db-nav, .db-icon-btn {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* 右侧图标悬浮时可以保留微微的背景以提升交互感，但默认状态绝对透明 */
.db-icon-btn:hover {
  background: rgba(128, 128, 128, 0.1) !important;
}

.db-login-btn {
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.2s ease;
}
.db-login-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
.db-login-btn:active {
  transform: translateY(0);
}
</style>