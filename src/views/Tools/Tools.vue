<template>
  <div class="bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30">
    <div class="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start">
      
      <aside class="hidden lg:flex flex-col w-[260px] shrink-0 sticky top-0 h-[calc(100vh-144px)] pt-12 pb-8 border-r border-zinc-200/60 dark:border-white/5 pr-6">
        <div class="mb-8 px-3">
          <h2 class="text-sm font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
            Navigation
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
        <header class="mb-16">
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
            {{ $t('nav.tools') || '开发者工具箱' }}
          </h1>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium">
            精选开发资源、框架文档与在线工具，助力高效构建现代 Web 应用。
          </p>
        </header>

        <div class="space-y-20">
          <section
            v-for="category in NAV_DATA"
            :key="category.title"
            :data-category="category.title"
            class="category-section"
          >
            <div class="flex items-center gap-4 mb-8">
              <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                {{ $t(category.title) || category.title }}
              </h2>
              <div class="flex-1 h-[1px] bg-gradient-to-r from-zinc-200 to-transparent dark:from-white/10"></div>
              <span class="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-xs font-semibold tracking-wider">
                {{ category.items.length }} TOOLS
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
  // 获取我们在 MainLayout 里面定义的滚动容器
  scrollContainer = document.getElementById('main-scroll-container');
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