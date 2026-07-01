<template>
  <n-card hoverable class="group cursor-default" content-style="padding: 0; display: flex; flex-direction: column; height: 100%;">
    <!-- Header: Title & Desc -->
    <div class="p-4 text-center pb-2">
      <n-text depth="1" class="text-[15px] font-bold">{{ widget.name }}</n-text>
      <br>
      <n-text depth="3" class="text-xs mt-1.5 line-clamp-2 px-2">{{ widget.desc }}</n-text>
    </div>

    <!-- Carousel Area -->
    <div class="relative w-full h-[180px] bg-zinc-50 dark:bg-black/20 flex items-center justify-center group/carousel overflow-hidden border-y border-black/5 dark:border-white/5">
      <!-- Arrows (Using Naive UI Buttons) -->
      <div v-if="widget.sizes.length > 1" class="absolute left-2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
        <n-button 
          circle 
          size="small"
          @click="prevSize" 
          class="shadow-md"
        >
          <template #icon>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </template>
        </n-button>
      </div>
      
      <div v-if="widget.sizes.length > 1" class="absolute right-2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
        <n-button 
          circle 
          size="small"
          @click="nextSize" 
          class="shadow-md"
        >
          <template #icon>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </template>
        </n-button>
      </div>

      <!-- Slides -->
      <div class="relative w-full h-full flex items-center justify-center transition-all duration-300" :key="currentIndex">
        <transition name="slide-fade" mode="out-in">
          <div :key="currentSize" class="absolute inset-0 flex items-center justify-center">
             <!-- The actual Widget Preview scaled down -->
             <div class="pointer-events-none origin-center transition-transform duration-500" :style="getPreviewScale(currentSize)">
                <component :is="widgetComponent" :size="currentSize" />
             </div>
          </div>
        </transition>
      </div>

      <!-- Dots -->
      <div v-if="widget.sizes.length > 1" class="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 z-10">
        <div 
          v-for="(size, index) in widget.sizes" 
          :key="size"
          @click="currentIndex = index"
          class="w-1.5 h-1.5 rounded-full transition-all cursor-pointer"
          :class="index === currentIndex ? 'bg-blue-500 w-3' : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400'"
        ></div>
      </div>
      
      <!-- Size Badge Overlay (Using Naive UI Tag) -->
      <div class="absolute top-2 right-2 z-10">
        <n-tag size="small" type="info" :bordered="false" round class="font-bold shadow-sm">
          {{ currentSize }}
        </n-tag>
      </div>
    </div>

    <!-- Footer: Heat & Add Button -->
    <div class="p-3 flex items-center justify-between mt-auto bg-zinc-50/50 dark:bg-black/10">
      <div class="flex items-center gap-1 text-orange-500 font-bold text-xs">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" /></svg>
        <span>{{ widget.hot }}</span>
      </div>
      <n-button type="info" round size="small" @click="$emit('add', widget.type, currentSize)" class="px-5 font-bold shadow-sm hover:shadow-md transition-shadow">
        添加
      </n-button>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NCard, NText, NTag, NButton } from 'naive-ui';

const props = defineProps({
  widget: {
    type: Object,
    required: true
  },
  widgetComponent: {
    type: Object,
    required: true
  }
});

defineEmits(['add']);

const currentIndex = ref(0);
const currentSize = computed(() => props.widget.sizes[currentIndex.value]);

const nextSize = () => {
  currentIndex.value = (currentIndex.value + 1) % props.widget.sizes.length;
};

const prevSize = () => {
  currentIndex.value = (currentIndex.value - 1 + props.widget.sizes.length) % props.widget.sizes.length;
};

// Calculate appropriate scale based on target widget size to fit in the 180px height container
const getPreviewScale = (size: string) => {
  if (size === '1x1') {
    return { transform: 'scale(0.8)', width: '110px', height: '110px' };
  } else if (size === '2x1') {
    return { transform: 'scale(0.7)', width: '236px', height: '110px' };
  } else if (size === '2x2') {
    return { transform: 'scale(0.55)', width: '236px', height: '236px' };
  } else if (size === '2x4') {
    return { transform: 'scale(0.4)', width: '236px', height: '480px' };
  }
  return { transform: 'scale(0.5)' };
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
}
</style>
