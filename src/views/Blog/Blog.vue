<template>
  <div class="min-h-screen transition-colors duration-300 pb-20">
    
    <!-- Hero Section with Aurora Glow -->
    <div class="relative w-full h-[40vh] sm:h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob" style="background-color: #8b5cf6;"></div>
        <div class="absolute top-[10%] right-[-10%] w-[40%] h-[60%] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000" style="background-color: #4f46e5;"></div>
        <div class="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000" style="background-color: #ec4899;"></div>
      </div>
      
      <div class="relative z-10 text-center px-4">
        <h1 class="text-5xl sm:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
          Knowledge Base
        </h1>
        <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium tracking-wide uppercase">
          探索技术前沿 / 沉淀极客思考
        </p>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
      
      <!-- Category Pills -->
      <div class="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar mb-10 w-full justify-center">
        <button 
          v-for="cat in allCategories" 
          :key="cat"
          @click="activeCategory = cat"
          class="px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all border shrink-0 focus:outline-none"
          :class="activeCategory === cat 
            ? 'bg-[#8b5cf6] text-white border-[#8b5cf6] shadow-[4px_4px_0px_rgba(139,92,246,0.3)] translate-y-[-2px]' 
            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 dark:bg-[#0A0A0A] dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600'"
        >
          {{ getCategoryName(cat) }}
        </button>
      </div>

      <!-- Article Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="group relative flex flex-col bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:border-[#8b5cf6] dark:hover:border-[#8b5cf6] cursor-pointer hover:shadow-[8px_8px_0px_rgba(139,92,246,0.15)] dark:hover:shadow-[8px_8px_0px_rgba(139,92,246,0.15)] hover:-translate-y-1"
          @click="router.push(`/doc/${article.id}`)"
        >
          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <div class="mb-3 flex items-center justify-between">
              <span class="text-xs font-bold text-[#8b5cf6] bg-[#8b5cf6]/10 px-2.5 py-1 uppercase tracking-widest">
                {{ getCategoryName(article.category) }}
              </span>
            </div>
            <h2 class="text-xl font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#8b5cf6] transition-colors">
              {{ article.title }}
            </h2>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
              {{ article.description || '本文暂无简短描述，请点击阅读详情...' }}
            </p>
            
            <div class="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-4 mt-auto">
              <span class="text-xs font-semibold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Read Article
              </span>
              <svg class="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-[#8b5cf6] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredArticles.length === 0" class="py-32 text-center">
        <h3 class="text-xl font-bold text-zinc-400 dark:text-zinc-600 mb-2">该分类下暂无文章</h3>
        <button @click="activeCategory = 'All'" class="text-[#8b5cf6] hover:underline font-medium text-sm">
          返回全部
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { syncedDocMenus } from '@/data/synced-docs';

defineOptions({ name: 'Blog' });
const router = useRouter();

const categoryMap: Record<string, string> = {
  'All': '全部',
  'Vue': 'Vue3 系列',
  'AI': 'AI Agent',
  'deepseek': 'DeepSeek',
  'web': 'Web前端',
  'ThreeJS': 'Three.js',
  'Games': '游戏开发',
  'NodeJS': '后端专栏',
  'harmony-os-4.0-series': 'HarmonyOS 4.0',
  'Algorithm': '算法'
};

const getCategoryName = (key: string) => categoryMap[key] || key;

const allCategories = ['All', ...syncedDocMenus.map(c => c.title)];
const activeCategory = ref('All');

const allArticles = computed(() => {
  return syncedDocMenus.flatMap(cat => 
    cat.items.map(item => ({
      ...item,
      category: cat.title
    }))
  );
});

const filteredArticles = computed(() => {
  if (activeCategory.value === 'All') return allArticles.value;
  return allArticles.value.filter(a => a.category === activeCategory.value);
});

</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.5);
}
</style>
