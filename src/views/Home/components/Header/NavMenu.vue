<template>
  <el-menu
    :mode="mode"
    :default-active="activeIndex"
    router
    class="border-none bg-transparent w-full"
    :class="mode === 'horizontal' ? 'h-full flex items-center justify-center' : 'pt-2'"
    @select="handleSelect"
    :ellipsis="false"
  >
    <template v-for="item in menuData" :key="item.index">
      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <span class="font-medium text-[14px]">{{ $t(item.labelKey) }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <div class="flex items-center gap-3 py-1">
            <component :is="child.icon" class="w-4 h-4 text-purple-500" v-if="child.icon" />
            <div class="flex flex-col leading-tight">
              <span class="font-medium">{{ $t(child.labelKey) }}</span>
              <span v-if="child.descKey" class="text-[11px] opacity-60 mt-0.5">{{ $t(child.descKey) }}</span>
            </div>
          </div>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="item.path">
        <span class="font-medium text-[14px]">{{ $t(item.labelKey) }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, markRaw } from "vue";
import { useRoute } from "vue-router";
import { Document, CollectionTag } from "@element-plus/icons-vue";

const props = defineProps({
  mode: {
    type: String as () => 'horizontal' | 'vertical',
    default: "horizontal",
  },
});

const emit = defineEmits(["item-click"]);
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
  if (route.path === "/") return "/home";
  
  // Special handling for blog children so the parent active index logic matches
  if (route.path === "/categories") return "/categories";
  
  return route.path;
});

const handleSelect = () => {
  emit("item-click");
};
</script>

<style scoped>
:deep(.el-menu) {
  --el-menu-bg-color: transparent;
  --el-menu-hover-bg-color: rgba(147, 51, 234, 0.05); /* very light purple for hover */
  --el-menu-active-color: #9333ea;
  border-right: none !important;
  border-bottom: none !important;
}

:deep(.el-menu--horizontal) {
  border-bottom: none !important;
}

:deep(.el-menu-item), :deep(.el-sub-menu__title) {
  background-color: transparent !important;
  border-bottom: 2px solid transparent;
}

:deep(.el-menu--horizontal .el-menu-item.is-active) {
  border-bottom: 2px solid #9333ea !important;
  color: #9333ea !important;
}

.dark :deep(.el-menu) {
  --el-menu-hover-bg-color: rgba(168, 85, 247, 0.1);
  --el-menu-active-color: #c084fc;
  --el-menu-text-color: #e2e8f0;
}

.dark :deep(.el-menu--horizontal .el-menu-item.is-active) {
  border-bottom: 2px solid #c084fc !important;
  color: #c084fc !important;
}
</style>