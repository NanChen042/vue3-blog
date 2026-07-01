<template>
  <div class="h-full w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg relative">
    
    <!-- Widget Header -->
    <div class="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md z-10 absolute top-0 w-full">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" /></svg>
        </div>
        <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-wider uppercase">Latest Posts</span>
      </div>
      <button class="text-[10px] bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-full font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
        View All
      </button>
    </div>

    <div class="flex-1 w-full h-full pt-[44px] overflow-hidden flex flex-col">
      <!-- 2x2 Layout: Pure List -->
      <template v-if="size === '2x2'">
        <div class="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2 space-y-1">
          <div v-for="post in (featuredPost ? [featuredPost, ...posts] : []).slice(0, 3)" 
               :key="post.id" 
               @click="goToPost(post.safeId)"
               class="flex items-center gap-3 p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors group/item shrink-0 h-[60px]">
            <div class="w-11 h-11 shrink-0 rounded-md overflow-hidden relative">
              <img :src="post.image" class="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-500" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{{ post.title }}</h4>
              <p class="text-[10px] text-zinc-400 truncate mt-0.5">{{ post.date }} · {{ post.readTime }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- 2x4 Layout: Featured Image + List -->
      <template v-else-if="size === '2x4'">
        <!-- Featured Post -->
        <div v-if="featuredPost" @click="goToPost(featuredPost.safeId)" class="relative h-[140px] w-full shrink-0 group/featured cursor-pointer overflow-hidden">
          <img :src="featuredPost.image" class="absolute inset-0 w-full h-full object-cover transform group-hover/featured:scale-110 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-4">
            <span class="text-[10px] font-bold text-blue-400 mb-1 block uppercase tracking-wider">{{ featuredPost.category || 'TUTORIAL' }}</span>
            <h3 class="text-sm font-bold text-white line-clamp-2 leading-snug">{{ featuredPost.title }}</h3>
          </div>
        </div>

        <!-- Post List -->
        <div class="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2 space-y-1">
          <div v-for="post in posts" 
               :key="post.id" 
               @click="goToPost(post.safeId)"
               class="flex items-center gap-3 p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors group/item shrink-0 h-[60px]">
            <div class="w-11 h-11 shrink-0 rounded-md overflow-hidden relative">
              <img :src="post.image" class="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-500" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{{ post.title }}</h4>
              <p class="text-[10px] text-zinc-400 truncate mt-0.5">{{ post.date }} · {{ post.readTime }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- 2x1 Layout -->
      <template v-else-if="size === '2x1'">
        <div class="flex items-center h-full gap-4 px-4 overflow-x-auto no-scrollbar pb-2">
          <div v-for="post in (featuredPost ? [featuredPost, ...posts] : []).slice(0, 2)" 
               :key="post.id" 
               @click="goToPost(post.safeId)"
               class="w-[200px] shrink-0 flex items-center gap-3 cursor-pointer group/item">
            <div class="w-11 h-11 shrink-0 rounded-md overflow-hidden">
              <img :src="post.image" class="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-[12px] font-bold text-zinc-800 dark:text-zinc-200 line-clamp-2 leading-tight">{{ post.title }}</h4>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import postsData from '@/data/posts.json';

const router = useRouter();

defineProps({
  size: {
    type: String,
    default: '2x2'
  }
});

// Fallback images since posts.json has empty coverUrls
const defaultImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
];

const featuredPost = ref<any>(null);
const posts = ref<any[]>([]);

onMounted(() => {
  // Sort posts by date (newest first)
  const sortedPosts = [...postsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedPosts.length > 0) {
    featuredPost.value = {
      ...sortedPosts[0],
      image: sortedPosts[0].coverUrl || defaultImages[0]
    };
    
    // Pick the next 3 posts
    posts.value = sortedPosts.slice(1, 4).map((p, index) => ({
      ...p,
      image: p.coverUrl || defaultImages[(index + 1) % defaultImages.length]
    }));
  }
});

const goToPost = (safeId: string) => {
  if (safeId) {
    router.push(`/doc/${safeId}`);
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
