<template>
  <div class="nav-menu-wrapper w-full h-full flex" :class="mode === 'horizontal' ? 'justify-center items-center' : ''">
    
    <!-- Custom Desktop Horizontal Menu -->
    <div v-if="mode === 'horizontal'" class="flex items-stretch h-full gap-2">
      <template v-for="item in mobileNavItems" :key="item.path">
        
        <!-- Dropdown for Parent -->
        <n-dropdown 
          v-if="item.children" 
          :options="item.children.map(c => ({ key: c.path, label: c.label }))" 
          @select="handleNavigate" 
          trigger="hover"
          placement="bottom"
          :show-arrow="true"
        >
          <div 
            class="relative h-full px-4 text-[15px] leading-none font-medium transition-colors duration-300 cursor-pointer flex items-center justify-center gap-1 select-none group"
            :class="[
              isChildActive(item)
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400'
            ]"
          >
            <!-- Gentle Hover Background -->
            <div class="absolute inset-y-3 inset-x-1 rounded-lg bg-purple-50/80 dark:bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            <span class="z-10">{{ item.label }}</span>
            <svg class="w-3.5 h-3.5 opacity-60 transition-transform z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>

            <!-- Bottom Active Line -->
            <div v-if="isChildActive(item)" class="absolute bottom-0 left-3 right-3 h-[3px] bg-purple-600 dark:bg-purple-400 rounded-t-full shadow-[0_-2px_8px_rgba(147,51,234,0.25)]"></div>
          </div>
        </n-dropdown>

        <!-- Normal Item -->
        <div v-else
          @click="handleNavigate(item.path)"
          class="relative h-full px-4 text-[15px] leading-none font-medium transition-colors duration-300 cursor-pointer flex items-center justify-center select-none group"
          :class="[
            activeIndex === item.path
              ? 'text-purple-600 dark:text-purple-400' 
              : 'text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400'
          ]"
        >
          <!-- Gentle Hover Background -->
          <div class="absolute inset-y-3 inset-x-1 rounded-lg bg-purple-50/80 dark:bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          <span class="z-10">{{ item.label }}</span>
          
          <!-- Bottom Active Line -->
          <div v-if="activeIndex === item.path" class="absolute bottom-0 left-3 right-3 h-[3px] bg-purple-600 dark:bg-purple-400 rounded-t-full shadow-[0_-2px_8px_rgba(147,51,234,0.25)]"></div>
        </div>

      </template>
    </div>

    <!-- Mobile Vertical Menu (Custom Elegant Implementation) -->
    <div v-else class="w-full flex flex-col gap-1 px-1 py-2">
      <template v-for="item in mobileNavItems" :key="item.path">
        
        <!-- Parent with Children -->
        <div v-if="item.children" class="mb-1">
          <div 
            class="flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-medium transition-colors select-none cursor-pointer"
            :class="[
              isChildActive(item) 
                ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' 
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            ]"
            @click="toggleExpand(item.path)"
          >
            <div class="flex items-center gap-3">
              <component v-if="item.icon" :is="item.icon" class="w-5 h-5 opacity-70" />
              <span>{{ item.label }}</span>
            </div>
            <svg class="w-4 h-4 transition-transform duration-300 opacity-60" :class="{ 'rotate-180': expanded.includes(item.path) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <!-- Children wrapper -->
          <div v-show="expanded.includes(item.path)" class="mt-1 flex flex-col gap-1 pl-3 relative overflow-hidden transition-all">
            <div class="absolute left-[20px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800"></div>
            <div 
              v-for="child in item.children" 
              :key="child.path"
              class="relative flex items-center gap-3 pl-7 pr-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              :class="[
                activeIndex === child.path 
                  ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-50/50 dark:bg-purple-500/5' 
                  : 'text-zinc-500 dark:text-zinc-400 font-medium hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              ]"
              @click="handleNavigate(child.path)"
            >
              <div class="absolute left-[17px] w-[7px] h-[7px] rounded-full border-2 border-slate-50 dark:border-slate-950 transition-colors duration-300" :class="activeIndex === child.path ? 'bg-purple-500 z-10' : 'bg-zinc-300 dark:bg-zinc-700'"></div>
              <span>{{ child.label }}</span>
            </div>
          </div>
        </div>
        
        <!-- Normal Link -->
        <div 
          v-else
          class="flex items-center px-3 py-3 rounded-xl text-[15px] font-medium transition-colors cursor-pointer mb-1"
          :class="[
            activeIndex === item.path 
              ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' 
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          ]"
          @click="handleNavigate(item.path)"
        >
          <div class="flex items-center gap-3">
            <component v-if="item.icon" :is="item.icon" class="w-5 h-5 opacity-70" />
            <span>{{ item.label }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, computed, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useI18n } from 'vue-i18n';
import type { MenuOption } from 'naive-ui';
import { NIcon } from 'naive-ui';
import { DocumentTextOutline, PricetagsOutline, ChevronDownOutline, HomeOutline, HardwareChipOutline, GameControllerOutline, ChatbubbleEllipsesOutline, FlaskOutline } from '@vicons/ionicons5';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  mode: {
    type: String as () => 'horizontal' | 'vertical',
    default: "horizontal",
  },
});

const emit = defineEmits(["item-click"]);
defineOptions({ name: "NavMenu" });

function renderIcon(icon: any) {
  return () => h(NIcon, { class: 'text-purple-500', size: 18 }, { default: () => h(icon) });
}

// === Desktop Native n-menu Options ===
const menuOptions = computed<MenuOption[]>(() => [
  {
    label: () => h(RouterLink, { to: '/home' }, { default: () => h('span', { class: 'font-medium text-[14px] px-1' }, t('nav.home')) }),
    key: '/home',
  },
  {
    label: () => h('span', { class: 'font-medium text-[14px] px-1 flex items-center gap-1 cursor-pointer' }, [
      t('nav.blog'),
      h(NIcon, { size: 14, class: 'opacity-60 transition-transform group-hover:rotate-180' }, { default: () => h(ChevronDownOutline) })
    ]),
    key: 'blog-parent',
    children: [
      {
        label: () => h(RouterLink, { to: '/blog' }, { default: () => t('nav.latest') }),
        key: '/blog',
        icon: renderIcon(DocumentTextOutline)
      },
      {
        label: () => h(RouterLink, { to: '/categories' }, { default: () => t('nav.categories') }),
        key: '/categories',
        icon: renderIcon(PricetagsOutline)
      }
    ]
  },
  {
    label: () => h(RouterLink, { to: '/tools' }, { default: () => h('span', { class: 'font-medium text-[14px] px-1' }, t('nav.tools')) }),
    key: '/tools',
  },
  {
    label: () => h(RouterLink, { to: '/games' }, { default: () => h('span', { class: 'font-medium text-[14px] px-1' }, t('nav.games')) }),
    key: '/games',
  },
  {
    label: () => h(RouterLink, { to: '/chat' }, { default: () => h('span', { class: 'font-medium text-[14px] px-1' }, t('nav.chat')) }),
    key: '/chat',
  },
  {
    label: () => h(RouterLink, { to: '/lab' }, { default: () => h('span', { class: 'font-medium text-[14px] px-1' }, t('nav.lab')) }),
    key: '/lab',
  }
]);

// === Custom Mobile Navigation Data ===
const expanded = ref<string[]>(['blog-parent']); // Default expanded

const mobileNavItems = computed(() => [
  { path: '/home', label: t('nav.home'), icon: HomeOutline },
  { 
    path: 'blog-parent', 
    label: t('nav.blog'), 
    icon: DocumentTextOutline,
    children: [
      { path: '/blog', label: t('nav.latest') },
      { path: '/categories', label: t('nav.categories') }
    ]
  },
  { path: '/tools', label: t('nav.tools'), icon: HardwareChipOutline },
  { path: '/games', label: t('nav.games'), icon: GameControllerOutline },
  { path: '/chat', label: t('nav.chat'), icon: ChatbubbleEllipsesOutline },
  { path: '/lab', label: t('nav.lab'), icon: FlaskOutline }
]);

const activeIndex = computed(() => {
  if (route.path === "/") return "/home";
  if (route.path === "/categories") return "/categories";
  return route.path;
});

const isChildActive = (item: any) => {
  if (item.path === activeIndex.value) return true;
  if (item.children) {
    return item.children.some((child: any) => child.path === activeIndex.value);
  }
  return false;
};

const toggleExpand = (path: string) => {
  if (expanded.value.includes(path)) {
    expanded.value = expanded.value.filter(p => p !== path);
  } else {
    expanded.value.push(path);
  }
};

const handleNavigate = (path: string) => {
  router.push(path);
  emit("item-click");
};

const handleSelect = (key: string) => {
  emit("item-click");
};
</script>

<style scoped>
/* Scoped overrides if needed */
</style>