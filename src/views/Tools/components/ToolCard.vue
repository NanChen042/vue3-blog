<template>
  <n-popover trigger="hover" placement="top" :style="{ maxWidth: '300px' }" :delay="100">
    <template #trigger>
      <a :href="item.link" target="_blank" rel="noopener noreferrer" class="group relative flex flex-col h-full p-3.5 rounded-lg bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:shadow-md hover:shadow-purple-500/5 hover:bg-purple-50/50 dark:hover:bg-purple-900/10">
        <div class="relative z-10 flex items-start gap-3">
          <div class="shrink-0 w-9 h-9 rounded-md bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-white dark:group-hover:bg-[#1a1a1a]">
            <img v-if="item.icon" :src="item.icon" :alt="item.title" class="w-4 h-4 object-contain transition-transform duration-300 group-hover:scale-110" @error="onIconError" />
            <n-icon v-else class="text-[16px] text-zinc-400 group-hover:text-purple-500 transition-colors">
              <LinkOutline />
            </n-icon>
          </div>

          <div class="flex-1 min-w-0 pt-0.5">
            <div class="flex items-center justify-between gap-2">
              
              <!-- Title Container with Marquee -->
              <div class="relative overflow-hidden flex-1 min-w-0">
                <!-- Normal Truncated Title -->
                <h3 
                  ref="titleRef"
                  class="font-bold text-[14px] text-zinc-900 dark:text-zinc-100 truncate transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400"
                  :class="{ 'group-hover:opacity-0': isOverflowing }"
                >
                  {{ item.title }}
                </h3>
                
                <!-- Hover Auto-Scroll Title (only renders if overflowing) -->
                <h3 
                  v-if="isOverflowing"
                  class="absolute top-0 left-0 whitespace-nowrap font-bold text-[14px] text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-marquee-hover"
                  :style="{ '--scroll-distance': scrollDistance }"
                  style="width: max-content;"
                >
                  {{ item.title }}
                </h3>
              </div>

              <n-icon class="shrink-0 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <OpenOutline />
              </n-icon>
            </div>

            <p class="mt-1 text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </a>
    </template>
    <span class="text-[13px] leading-relaxed">{{ item.desc }}</span>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { LinkOutline, OpenOutline } from "@vicons/ionicons5";
import { NIcon, NPopover } from "naive-ui";

interface ToolItem {
  title: string;
  desc: string;
  link: string;
  icon?: string;
}

defineProps<{
  item: ToolItem;
}>();

const titleRef = ref<HTMLElement | null>(null);
const isOverflowing = ref(false);
const scrollDistance = ref('0px');
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (titleRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (titleRef.value) {
        const scrollW = titleRef.value.scrollWidth;
        const clientW = titleRef.value.clientWidth;
        if (scrollW > clientW) {
          isOverflowing.value = true;
          // Calculate distance to scroll to the end, plus a tiny buffer
          scrollDistance.value = `-${scrollW - clientW + 4}px`;
        } else {
          isOverflowing.value = false;
        }
      }
    });
    resizeObserver.observe(titleRef.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

const onIconError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none';
};
</script>

<style scoped>
@keyframes marquee-scroll {
  0%, 15% { transform: translateX(0); }
  85%, 100% { transform: translateX(var(--scroll-distance)); }
}

/* We bind the animation to group:hover from Tailwind */
.group:hover .animate-marquee-hover {
  animation: marquee-scroll 3.5s linear infinite alternate;
}
</style>