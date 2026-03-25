<template>
  <div class="flex items-center gap-2">
    <!-- Language Switcher -->
    <el-tooltip :content="locale === 'zh' ? $t('header.lang_en') : $t('header.lang_zh')" placement="bottom">
      <button @click="toggleLanguage" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
        <el-icon :size="20">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
          </svg>
        </el-icon>
      </button>
    </el-tooltip>

    <!-- App Grid -->
    <el-tooltip :content="$t('header.lab_desc')" placement="bottom">
      <div>
        <el-popover placement="bottom" :width="320" trigger="click" popper-class="grid-popover">
          <template #reference>
            <button class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </template>
          <div class="p-4">
            <div class="flex items-center justify-between mb-4 px-1">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ $t('header.lab_desc') }}</span>
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div v-for="app in apps" :key="app.name" class="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all duration-300 group">
                <div class="w-12 h-12 flex items-center justify-center bg-linear-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-110 group-hover:shadow-md transition-all duration-300" v-html="app.icon"></div>
                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">{{ app.name }}</span>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </el-tooltip>

    <!-- Theme Toggle -->
    <el-tooltip :content="isDark ? $t('header.light_mode') : $t('header.dark_mode')" placement="bottom">
      <button @click="toggleTheme($event)" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </el-tooltip>

    <!-- User Profile -->
    <el-dropdown trigger="click">
      <div class="flex items-center gap-2 ml-2 cursor-pointer group outline-none">
        <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="border-2 border-transparent group-hover:border-purple-500 transition-all" />
        <div class="hidden sm:flex flex-col items-start translate-y-px">
          <span class="text-xs font-bold text-slate-900 dark:text-white leading-none">Admin</span>
          <span class="text-[10px] text-slate-500 dark:text-slate-400">Developer</span>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ $t('header.profile') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('header.settings') }}</el-dropdown-item>
          <el-dropdown-item divided>{{ $t('header.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { useTheme } from "@/hooks/useTheme";
import { useThemeStore } from "@/store/theme";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

defineOptions({ name: "ActionButtons" });

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
const { toggleTheme: baseToggleTheme } = useTheme();
const { locale } = useI18n();

const toggleTheme = (event: MouseEvent) => {
  // @ts-ignore
  const isAppearanceTransition =
    document.startViewTransition &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isAppearanceTransition) {
    baseToggleTheme();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius =
    Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 10; // Extra margin to avoid edge artifacts

  // Pre-suppress all CSS transitions to avoid flicker
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
        pseudoElement: isDark.value ? "::view-transition-old(root)" : "::view-transition-new(root)",
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

const apps = [
  {
    name: "代码库",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
  },
  {
    name: "素材库",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
  },
  {
    name: "任务",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
  },
];
</script>

<style>
.grid-popover {
  border-radius: 1rem !important;
  padding: 0.5rem !important;
}
</style>
