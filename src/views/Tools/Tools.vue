<template>
  <div style="color: var(--db-text-primary)">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start">
      
      <aside class="hidden lg:flex flex-col w-[240px] shrink-0 sticky top-[88px] h-[calc(100vh-144px)] pt-6 pb-8 pr-6 self-start" style="border-right: 1px solid var(--db-card-border);">
        <div class="mb-8 px-3 flex items-center gap-2.5">
          <div class="w-1.5 h-4 rounded-full" style="background: var(--db-accent);"></div>
          <h2 class="text-[15px] font-bold tracking-wide" style="color: var(--db-text-primary)">
            发现工具
          </h2>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar -mr-4 pr-4">
          <ToolSidebar 
            :categories="NAV_DATA" 
            :active-category="activeCategory" 
            @scroll-to="handleScrollTo"
          />
        </div>
      </aside>

      <main class="flex-1 min-w-0 lg:pl-16 pt-12 pb-32">
        <header class="mb-12">
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style="color: var(--db-text-primary)">
            {{ $t('nav.tools') || '开发者工具箱' }}
          </h1>
          <p class="text-base max-w-2xl font-medium" style="color: var(--db-text-muted)">
            精选开发资源、框架文档与在线工具，助力高效构建现代 Web 应用。
          </p>
        </header>

        <div class="space-y-12">
          <section
            v-for="category in NAV_DATA"
            :key="category.title"
            :data-category="category.title"
            class="category-section"
          >
            <div class="flex items-center gap-4 mb-5">
              <h2 class="text-xl font-bold tracking-tight" style="color: var(--db-text-primary)">
                {{ $t(category.title) || category.title }}
              </h2>
              <div class="flex-1 h-px" style="background: var(--db-card-border);"></div>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold" style="background: rgba(0,0,0,0.05); color: var(--db-text-muted)">
                {{ category.items.length }} {{ $t('tools.unit') || 'TOOLS' }}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              <ToolCard 
                v-for="item in category.items" 
                :key="item.title" 
                :item="item" 
              />
            </div>
          </section>
        </div>
      </main>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { NAV_DATA } from './data';
import ToolCard from './components/ToolCard.vue';
import ToolSidebar from './components/ToolSidebar.vue';

defineOptions({ name: 'ToolsView' });

const activeCategory = ref(NAV_DATA[0]?.title);
let isScrolling = false;
let scrollTimeout: ReturnType<typeof setTimeout>;
let scrollContainer: HTMLElement | null = null;

// 点击目录精准滚动容器
const handleScrollTo = (categoryTitle: string) => {
  if (!scrollContainer) return;
  
  isScrolling = true;
  activeCategory.value = categoryTitle;
  
  const el = document.querySelector(`[data-category="${categoryTitle}"]`) as HTMLElement;
  if (el) {
    // 算法：目标元素距离视口顶部 - 滚动容器距离视口顶部 + 容器已经滚动的距离 - 顶部留白
    const containerRect = scrollContainer.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offsetTop = elRect.top - containerRect.top + scrollContainer.scrollTop - 40;

    scrollContainer.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
};

// 监听容器内部的滚动，实现左侧高亮跟随
const handleScroll = () => {
  if (isScrolling || !scrollContainer) return;

  const sections = document.querySelectorAll('.category-section');
  const containerRect = scrollContainer.getBoundingClientRect();

  let currentCategory = activeCategory.value;

  sections.forEach((section) => {
    const el = section as HTMLElement;
    const rect = el.getBoundingClientRect();
    
    // 如果元素的顶部距离容器顶部小于 150px，说明该分类已经滚动到了视野核心区
    if (rect.top - containerRect.top <= 150) {
      currentCategory = el.dataset.category || '';
    }
  });

  if (activeCategory.value !== currentCategory) {
    activeCategory.value = currentCategory;
  }
};

onMounted(() => {
  // 获取我们在 MainLayout 里面定义的滚动容器，精确匹配 Naive UI 内部的滚动容器
  scrollContainer = document.querySelector('#main-scroll-container .n-layout-scroll-container') as HTMLElement;
  if (!scrollContainer) {
    scrollContainer = document.getElementById('main-scroll-container');
  }
  
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化计算
  }
});

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
  }
  clearTimeout(scrollTimeout);
});
</script>

<style scoped>
/* 左侧目录自定义优雅滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}
.dark .custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>