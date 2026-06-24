<template>
  <div class="flex items-center gap-1 sm:gap-2">

    <n-tooltip placement="bottom" :delay="200">
      <template #trigger>
        <button @click="toggleLanguage" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer outline-none">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
          </svg>
        </button>
      </template>
      {{ locale === 'zh' ? $t('header.lang_en') : $t('header.lang_zh') }}
    </n-tooltip>

    <n-tooltip placement="bottom" :delay="200">
      <template #trigger>
        <div>
          <n-popover placement="bottom" trigger="click" :show-arrow="false">
            <template #trigger>
              <button class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </template>

            <div class="p-3 w-72">
              <div class="flex items-center justify-between mb-4 px-1">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ $t('header.lab_desc') }}</span>
                <div class="flex items-center justify-center w-2 h-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div v-for="app in apps" :key="app.name" class="group flex flex-col items-center gap-2.5 p-3 rounded-xl border border-transparent hover:border-purple-200 dark:hover:border-purple-500/30 hover:bg-purple-50/50 dark:hover:bg-purple-500/10 cursor-pointer transition-all duration-300">
                  <div class="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:scale-110 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:border-purple-200 dark:group-hover:border-purple-500/30 transition-all duration-300 shadow-sm" v-html="app.icon"></div>
                  <span class="text-[12px] font-semibold text-slate-700 dark:text-slate-300 text-center leading-none group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{{ app.name }}</span>
                </div>
              </div>
            </div>
          </n-popover>
        </div>
      </template>
      {{ $t('header.lab_desc') }}
    </n-tooltip>

    <n-tooltip placement="bottom" :delay="200">
      <template #trigger>
        <button @click="toggleTheme($event)" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer outline-none">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </template>
      {{ isDark ? $t('header.light_mode') : $t('header.dark_mode') }}
    </n-tooltip>

    <div class="hidden sm:block w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

    <template v-if="authStore.isLoggedIn">
      <n-dropdown :options="profileOptions" trigger="hover" @select="handleDropdownSelect" class="ml-1">
        <div class="flex items-center gap-2.5 sm:pl-2 pr-1 cursor-pointer group outline-none">
          <n-avatar :size="34" round :src="authStore.userInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" class="border border-slate-200 dark:border-slate-700 group-hover:border-purple-500 group-hover:ring-2 group-hover:ring-purple-500/20 transition-all duration-300" />
          <div class="hidden sm:flex flex-col items-start justify-center">
            <span class="text-[13px] font-bold text-slate-900 dark:text-white leading-none mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{{ authStore.userInfo?.nickname || authStore.userInfo?.username }}</span>
            <span class="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none">{{ authStore.userInfo?.role || 'Member' }}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </n-dropdown>
    </template>
    
    <template v-else>
      <button @click="router.push('/login')" class="ml-1 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-sm tracking-wide">
        Login
      </button>
    </template>

  </div>
</template>

<script setup lang="ts">
import { nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "@/hooks/useTheme";
import { useThemeStore } from "@/store/theme";
import { useAuthStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

defineOptions({ name: "ActionButtons" });

const router = useRouter();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const { isDark } = storeToRefs(themeStore);
const { toggleTheme: baseToggleTheme } = useTheme();
const { locale, t } = useI18n();

const profileOptions = computed(() => [
  { label: t('header.profile'), key: 'profile' },
  { label: t('header.settings'), key: 'settings' },
  { label: t('header.logout'), key: 'logout', props: { style: { color: '#ef4444' } } }
]);

const handleDropdownSelect = (key: string) => {
  if (key === 'profile') {
    // router.push('/profile');
  } else if (key === 'settings') {
    router.push('/settings');
  } else if (key === 'logout') {
    handleLogout();
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const toggleTheme = (event: MouseEvent) => {
  // @ts-ignore
  const isAppearanceTransition =
    'startViewTransition' in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isAppearanceTransition) {
    baseToggleTheme();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius =
    Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 10;

  document.documentElement.classList.add("no-transition");

  // @ts-ignore
  const transition = document.startViewTransition(async () => {
    baseToggleTheme();
    await nextTick();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    const animation = document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.19, 1, 0.22, 1)",
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      document.documentElement.classList.remove("no-transition");
    };
  });
};

const toggleLanguage = () => {
  locale.value = locale.value === "zh" ? "en" : "zh";
  localStorage.setItem("language", locale.value);
};

// 重新整理了 Icon，采用 1.5px 粗细的极简风格，更符合整体调性
const apps = [
  {
    name: "代码库",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
  },
  {
    name: "素材库",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
  },
  {
    name: "任务",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
  },
];
</script>

<style scoped>
</style>