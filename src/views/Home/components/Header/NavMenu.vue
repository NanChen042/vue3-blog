<template>
  <!-- Mobile Vertical Mode -->
  <div v-if="mode === 'vertical'" class="flex flex-col gap-2">
    <template v-for="item in menuData" :key="item.index">
      <div v-if="item.children" class="flex flex-col">
        <button 
          @click="toggleMobileSubmenu(item.index)"
          class="flex items-center justify-between px-5 py-3.5 rounded-2xl text-[16px] font-bold transition-all duration-200"
          :class="[
            activeIndex === item.index 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          ]"
        >
          <span>{{ $t(item.labelKey) }}</span>
          <el-icon :class="{ 'rotate-180': openMobileSubmenus.includes(item.index) }" class="transition-transform duration-300">
            <ArrowDown />
          </el-icon>
        </button>
        
        <el-collapse-transition>
          <div v-show="openMobileSubmenus.includes(item.index)" class="mt-2 flex flex-col gap-2 overflow-hidden">
            <router-link 
              v-for="child in item.children" 
              :key="child.index"
              :to="child.path"
              @click="$emit('item-click')"
              class="flex flex-col gap-1 px-5 py-3 ml-4 rounded-xl transition-all duration-200"
              :class="[
                route.path === child.path
                  ? 'bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/30'
                  : 'text-slate-500 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400'
              ]"
            >
              <span class="font-bold text-[14px]">{{ $t(child.labelKey) }}</span>
              <span v-if="child.descKey" class="text-[10px] opacity-60 leading-tight">{{ $t(child.descKey) }}</span>
            </router-link>
          </div>
        </el-collapse-transition>
      </div>
      
      <router-link 
        v-else
        :to="item.path"
        @click="$emit('item-click')"
        class="px-5 py-3.5 rounded-2xl text-[16px] font-bold transition-all duration-200"
        :class="[
          activeIndex === item.index 
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
        ]"
      >
        {{ $t(item.labelKey) }}
      </router-link>
    </template>
  </div>

  <!-- Desktop Horizontal Mode -->
  <nav v-else class="flex items-center gap-1 h-full px-4">
    <template v-for="item in menuData" :key="item.index">

      <el-dropdown 
        v-if="item.children" 
        class="h-full" 
        :ref="(el) => setDropdownRef(el, item.index)" 
        trigger="hover" 
        :show-timeout="50" 
        :hide-timeout="200" 
        :popper-class="item.index === '2' ? 'mega-menu-popper' : 'custom-dropdown-popper'"
      >
        <button class="relative px-4 h-full min-h-[40px] flex items-center justify-center gap-1.5 text-[15px] font-medium transition-colors cursor-pointer outline-none group" :class="[
            activeIndex === item.index 
              ? 'text-purple-600 dark:text-purple-400 font-semibold' 
              : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
          ]">
          <span>{{ $t(item.labelKey) }}</span>
          <el-icon class="opacity-60 transition-transform duration-300 group-hover:rotate-180 text-sm">
            <ArrowDown />
          </el-icon>
          <div v-if="activeIndex === item.index" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-purple-600 dark:bg-purple-400 rounded-t-md shadow-[0_-1px_4px_rgba(147,51,234,0.3)]"></div>
        </button>

        <template #dropdown>
          <!-- Special Mega Menu for Blog -->
          <div v-if="item.index === '2'" class="p-6 w-[420px]">
            <div class="grid grid-cols-2 gap-6">
              <div v-for="child in item.children" :key="child.index" class="group/item">
                <router-link 
                  :to="child.path" 
                  @click="closeDropdown(item.index)"
                  class="flex flex-col gap-2 p-4 rounded-2xl border border-transparent hover:border-purple-100 dark:hover:border-purple-900/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300"
                >
                  <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <component :is="child.icon" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 dark:text-white mb-0.5">{{ $t(child.labelKey) }}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{{ $t(child.descKey || '') }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          
          <el-dropdown-menu v-else>
            <el-dropdown-item v-for="child in item.children" :key="child.index">
              <router-link :to="child.path" @click="closeDropdown(item.index)" active-class="is-active">
                {{ $t(child.labelKey) }}
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <router-link v-else :to="item.path" class="relative px-4 h-full min-h-[40px] flex items-center justify-center text-[15px] font-medium transition-colors" :class="[
          activeIndex === item.index 
            ? 'text-purple-600 dark:text-purple-400 font-semibold' 
            : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
        ]">
        <span>{{ $t(item.labelKey) }}</span>
        <div v-if="activeIndex === item.index" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-purple-600 dark:bg-purple-400 rounded-t-md shadow-[0_-1px_4px_rgba(147,51,234,0.3)]"></div>
      </router-link>

    </template>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from "vue";
import { useRoute } from "vue-router";
import { ArrowDown, Document, CollectionTag } from "@element-plus/icons-vue";

const props = defineProps({
  mode: {
    type: String,
    default: "horizontal",
  },
});

defineEmits(['item-click']);

defineOptions({ name: "NavMenu" });

const route = useRoute();

// 菜单数据配置
const menuData = [
  { index: "1", labelKey: "nav.home", path: "/home" },
  {
    index: "2",
    labelKey: "nav.blog",
    path: "/blog",
    children: [
      { 
        index: "2-1", 
        labelKey: "nav.latest", 
        descKey: "blog.latest_desc",
        path: "/blog",
        icon: markRaw(Document)
      },
      { 
        index: "2-2", 
        labelKey: "nav.categories", 
        descKey: "blog.categories_desc",
        path: "/categories",
        icon: markRaw(CollectionTag)
      },
    ],
  },
  { index: "3", labelKey: "nav.tools", path: "/tools" },
  { index: "4", labelKey: "nav.games", path: "/games" },
  { index: "5", labelKey: "nav.chat", path: "/chat" },
  { index: "6", labelKey: "nav.lab", path: "/lab" },
];

// 计算当前激活的菜单项索引
const activeIndex = computed(() => {
  if (["/", "/home"].includes(route.path)) return "1";

  const matchedItem = menuData.find(
    (item) =>
      item.path === route.path ||
      item.children?.some((child) => child.path === route.path)
  );

  return matchedItem?.index || "1";
});

// --- 下拉菜单引用管理与自动关闭逻辑 ---
const dropdownRefs = ref<Record<string, any>>({});
const setDropdownRef = (el: any, index: string) => {
  if (el) dropdownRefs.value[index] = el;
};
const closeDropdown = (index: string) => {
  if (dropdownRefs.value[index]) dropdownRefs.value[index].handleClose();
};

// --- 移动端逻辑 ---
const openMobileSubmenus = ref<string[]>([]);
const toggleMobileSubmenu = (index: string) => {
  const i = openMobileSubmenus.value.indexOf(index);
  if (i > -1) openMobileSubmenus.value.splice(i, 1);
  else openMobileSubmenus.value.push(index);
};
</script>

<style scoped>
/* Strip El Plus item defaults */
:deep(.el-dropdown-menu__item) {
  padding: 0 !important;
  background-color: transparent !important;
  line-height: 1 !important;
}
:deep(.el-dropdown-menu__item:hover),
:deep(.el-dropdown-menu__item:focus) {
  background-color: transparent !important;
  color: inherit !important;
}

:deep(.el-dropdown-menu__item a) {
  display: block;
  padding: 0.55rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.15s;
}
:deep(.el-dropdown-menu__item a:hover) {
  background-color: #f5f3ff;
  color: #7c3aed;
}
:deep(.el-dropdown-menu__item a.is-active) {
  background-color: #f5f3ff;
  color: #7c3aed;
}

/* Outer popper wrapper */
:deep(.custom-dropdown-popper.el-popper),
:deep(.mega-menu-popper.el-popper) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
}

/* Arrow styling */
:deep(.el-popper.is-light .el-popper__arrow::before) {
  background-color: #ffffff !important;
  border-color: #e2e8f0 !important;
}
.dark :deep(.el-popper.is-light .el-popper__arrow::before) {
  background-color: #0f172a !important;
  border-color: #1e293b !important;
}
</style>