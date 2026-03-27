<template>
  <div v-if="mode === 'vertical'" class="flex flex-col gap-1.5 pt-2">
    <template v-for="item in menuData" :key="item.index">

      <div v-if="item.children" class="flex flex-col">
        <button @click="toggleMobileSubmenu(item.index)" class="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-200 outline-none" :class="[
            activeIndex === item.index 
              ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-purple-600 dark:hover:text-purple-400'
          ]">
          <span>{{ $t(item.labelKey) }}</span>
          <el-icon :class="{ 'rotate-180': openMobileSubmenus.includes(item.index) }" class="transition-transform duration-300 text-sm">
            <ArrowDown />
          </el-icon>
        </button>

        <el-collapse-transition>
          <div v-show="openMobileSubmenus.includes(item.index)" class="mt-1 flex flex-col gap-1 overflow-hidden pl-3 ml-4 border-l border-slate-200 dark:border-slate-800">
            <router-link v-for="child in item.children" :key="child.index" :to="child.path" @click="$emit('item-click')" class="flex flex-col gap-0.5 px-4 py-2.5 rounded-lg transition-colors duration-200" :class="[
                route.path === child.path
                  ? 'bg-purple-50/80 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium'
                  : 'text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
              ]">
              <span class="text-[14px]">{{ $t(child.labelKey) }}</span>
              <span v-if="child.descKey" class="text-[10px] opacity-70 leading-tight font-normal">{{ $t(child.descKey) }}</span>
            </router-link>
          </div>
        </el-collapse-transition>
      </div>

      <router-link v-else :to="item.path" @click="$emit('item-click')" class="px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-200 outline-none" :class="[
          activeIndex === item.index 
            ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-purple-600 dark:hover:text-purple-400'
        ]">
        {{ $t(item.labelKey) }}
      </router-link>
    </template>
  </div>

  <nav v-else class="flex items-center gap-1 h-full px-4">
    <template v-for="item in menuData" :key="item.index">

      <el-dropdown v-if="item.children" class="h-full" :ref="(el) => setDropdownRef(el, item.index)" trigger="hover" :show-timeout="50" :hide-timeout="200" :teleported="false" :popper-class="item.index === '2' ? 'mega-menu-popper' : 'custom-dropdown-popper'">
        <button class="relative px-3.5 h-full min-h-[40px] flex items-center justify-center gap-1.5 text-[14px] font-medium transition-colors cursor-pointer outline-none group" :class="[
            activeIndex === item.index 
              ? 'text-purple-600 dark:text-purple-400' 
              : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
          ]">
          <span>{{ $t(item.labelKey) }}</span>
          <el-icon class="opacity-50 transition-transform duration-300 group-hover:rotate-180 text-xs">
            <ArrowDown />
          </el-icon>
          <div v-if="activeIndex === item.index" class="absolute bottom-0 left-0 w-full h-[2px] bg-purple-600 dark:bg-purple-400 rounded-t-sm shadow-[0_-1px_4px_rgba(147,51,234,0.3)]"></div>
        </button>

        <template #dropdown>
          <el-dropdown-menu v-if="item.index === '2'" class="!p-0 !bg-transparent !border-none !shadow-none">
            <div class="p-5 w-[420px] bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden mt-2">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="child in item.children" :key="child.index" class="group/item">
                  <router-link :to="child.path" @click="closeDropdown(item.index)" class="flex flex-col gap-3 p-4 rounded-xl border border-transparent hover:border-purple-100 dark:hover:border-purple-900/30 hover:bg-purple-50/50 dark:hover:bg-purple-500/5 transition-all duration-300 outline-none">
                    <div class="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center group-hover/item:scale-105 group-hover/item:bg-purple-100 dark:group-hover/item:bg-purple-500/20 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-all duration-300 shadow-sm border border-transparent group-hover/item:border-purple-200 dark:group-hover/item:border-purple-500/30">
                      <component :is="child.icon" class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="font-semibold text-[14px] text-slate-900 dark:text-white mb-1 transition-colors group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400">
                        {{ $t(child.labelKey) }}
                      </div>
                      <div class="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        {{ $t(child.descKey || '') }}
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </el-dropdown-menu>

          <el-dropdown-menu v-else class="mt-2 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl dark:shadow-2xl">
            <el-dropdown-item v-for="child in item.children" :key="child.index">
              <router-link :to="child.path" @click="closeDropdown(item.index)" active-class="is-active">
                {{ $t(child.labelKey) }}
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <router-link v-else :to="item.path" class="relative px-3.5 h-full min-h-[40px] flex items-center justify-center text-[14px] font-medium transition-colors outline-none" :class="[
          activeIndex === item.index 
            ? 'text-purple-600 dark:text-purple-400' 
            : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
        ]">
        <span>{{ $t(item.labelKey) }}</span>
        <div v-if="activeIndex === item.index" class="absolute bottom-0 left-0 w-full h-[2px] bg-purple-600 dark:bg-purple-400 rounded-t-sm shadow-[0_-1px_4px_rgba(147,51,234,0.3)]"></div>
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

defineEmits(["item-click"]);
defineOptions({ name: "NavMenu" });

const route = useRoute();

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
        icon: markRaw(Document),
      },
      {
        index: "2-2",
        labelKey: "nav.categories",
        descKey: "blog.categories_desc",
        path: "/categories",
        icon: markRaw(CollectionTag),
      },
    ],
  },
  { index: "3", labelKey: "nav.tools", path: "/tools" },
  { index: "4", labelKey: "nav.games", path: "/games" },
  { index: "5", labelKey: "nav.chat", path: "/chat" },
  { index: "6", labelKey: "nav.lab", path: "/lab" },
];

const activeIndex = computed(() => {
  if (["/", "/home"].includes(route.path)) return "1";
  const matchedItem = menuData.find(
    (item) =>
      item.path === route.path ||
      item.children?.some((child) => child.path === route.path)
  );
  return matchedItem?.index || "1";
});

const dropdownRefs = ref<Record<string, any>>({});
const setDropdownRef = (el: any, index: string) => {
  if (el) dropdownRefs.value[index] = el;
};
const closeDropdown = (index: string) => {
  if (dropdownRefs.value[index]) dropdownRefs.value[index].handleClose();
};

const openMobileSubmenus = ref<string[]>([]);
const toggleMobileSubmenu = (index: string) => {
  const i = openMobileSubmenus.value.indexOf(index);
  if (i > -1) openMobileSubmenus.value.splice(i, 1);
  else openMobileSubmenus.value.push(index);
};
</script>

<style scoped>
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

/* 帶有紫色交互的下拉菜單重寫 */
:deep(.el-dropdown-menu__item a) {
  display: block;
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b; /* slate-500 */
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s;
  margin: 4px;
}
:deep(.el-dropdown-menu__item a:hover) {
  background-color: #faf5ff; /* purple-50 */
  color: #9333ea; /* purple-600 */
}
:deep(.el-dropdown-menu__item a.is-active) {
  background-color: #faf5ff; /* purple-50 */
  color: #9333ea; /* purple-600 */
  font-weight: 600;
}

/* 暗黑模式選單字體與 Hover 狀態修復 */
.dark :deep(.el-dropdown-menu__item a) {
  color: #94a3b8; /* slate-400 */
}
.dark :deep(.el-dropdown-menu__item a:hover),
.dark :deep(.el-dropdown-menu__item a.is-active) {
  background-color: rgba(168, 85, 247, 0.1); /* purple-500/10 */
  color: #c084fc; /* purple-400 */
}

/* 清除 Element Plus 預設白底和边框，让自定义的深色背景生效 */
:deep(.custom-dropdown-popper.el-popper),
:deep(.mega-menu-popper.el-popper) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
}

/* Element Plus 箭头暗黑模式适配 */
:deep(.el-popper.is-light .el-popper__arrow::before) {
  background-color: #ffffff !important;
  border-color: #e2e8f0 !important;
}
.dark :deep(.el-popper.is-light .el-popper__arrow::before) {
  background-color: #0a0a0a !important; /* 与弹窗暗黑背景 #0A0A0A 一致 */
  border-color: #1e293b !important;
}
</style>