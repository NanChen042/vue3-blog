<template>
  <nav class="flex items-center gap-1 h-full px-4">
    <template v-for="item in menuData" :key="item.index">

      <el-dropdown v-if="item.children" class="h-full" :ref="(el) => setDropdownRef(el, item.index)" trigger="hover" :show-timeout="50" :hide-timeout="200" popper-class="custom-dropdown-popper">
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
          <el-dropdown-menu class="p-1.5 min-w-[120px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl">
            <el-dropdown-item v-for="child in item.children" :key="child.index" class="p-0 mb-0.5 last:mb-0">
              <router-link :to="child.path" @click="closeDropdown(item.index)" class="block w-full px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 transition-all hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400" active-class="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30">
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";

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
      { index: "2-1", labelKey: "nav.latest", path: "/blog" },
      { index: "2-2", labelKey: "nav.categories", path: "/categories" },
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
  if (el) {
    dropdownRefs.value[index] = el;
  }
};

const closeDropdown = (index: string) => {
  if (dropdownRefs.value[index]) {
    dropdownRefs.value[index].handleClose();
  }
};
</script>

<style scoped>
/* 覆盖 Element Plus 的下拉菜单默认样式 */
:deep(.el-dropdown-menu__item) {
  padding: 0 !important;
  background-color: transparent !important;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: transparent !important;
}

/* 修改下拉箭头指示器颜色以适配主题 */
:deep(
    .custom-dropdown-popper.el-popper[data-popper-placement^="bottom"]
      .el-popper__arrow::before
  ) {
  background-color: var(--bg-page) !important;
  border-color: var(--border-page) !important;
}

.dark
  :deep(
    .custom-dropdown-popper.el-popper[data-popper-placement^="bottom"]
      .el-popper__arrow::before
  ) {
  background-color: var(--slate-900) !important;
}

/* 隐藏自带的阴影以使用 Tailwind 的 shadow-2xl */
:deep(.custom-dropdown-popper.el-popper) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
}
</style>