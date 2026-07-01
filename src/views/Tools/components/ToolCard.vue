<template>
  <n-popover trigger="hover" placement="top" :style="{ maxWidth: '300px' }" :delay="100">
    <template #trigger>
      <n-card
        :bordered="false"
        hoverable
        class="h-full cursor-pointer transition-all duration-300 group"
        style="border-radius: 12px; overflow: hidden; background: var(--db-card-bg);"
        content-style="padding: 16px; display: flex; flex-direction: column; justify-content: flex-start; height: 100%;"
        @click="openLink"
      >
        <div class="relative z-10 flex items-start gap-3">
          <div class="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300" style="background: rgba(0,0,0,0.04);">
            <img v-if="item.icon" :src="item.icon" :alt="item.title" class="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110" @error="onIconError" />
            <n-icon v-else class="text-[18px] transition-colors" style="color: var(--db-text-muted);">
              <LinkOutline />
            </n-icon>
          </div>

          <div class="flex-1 min-w-0 pt-0.5">
            <div class="flex items-center justify-between gap-2">
              <div class="relative overflow-hidden flex-1 min-w-0">
                <h3
                  ref="titleRef"
                  class="font-bold text-[14px] truncate transition-colors"
                  :class="{ 'group-hover:opacity-0': isOverflowing }"
                  style="color: var(--db-text-primary);"
                >
                  {{ item.title }}
                </h3>
                <h3
                  v-if="isOverflowing"
                  class="absolute top-0 left-0 whitespace-nowrap font-bold text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-marquee-hover"
                  :style="{ '--scroll-distance': scrollDistance, color: 'var(--db-text-primary)' }"
                  style="width: max-content;"
                >
                  {{ item.title }}
                </h3>
              </div>
              <n-icon class="shrink-0 w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style="color: var(--db-text-secondary);">
                <OpenOutline />
              </n-icon>
            </div>
            <p class="mt-1.5 text-[12px] leading-relaxed line-clamp-2" style="color: var(--db-text-muted);">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </n-card>
    </template>
    <span class="text-[13px] leading-relaxed">{{ item.desc }}</span>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { LinkOutline, OpenOutline } from "@vicons/ionicons5";
import { NIcon, NPopover, NCard } from "naive-ui";

interface ToolItem {
  title: string;
  desc: string;
  link: string;
  icon?: string;
}

const props = defineProps<{
  item: ToolItem;
}>();

const titleRef = ref<HTMLElement | null>(null);
const isOverflowing = ref(false);
const scrollDistance = ref('0px');
let resizeObserver: ResizeObserver | null = null;

const openLink = () => {
  window.open(props.item.link, '_blank', 'noopener,noreferrer');
};

onMounted(() => {
  if (titleRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (titleRef.value) {
        const scrollW = titleRef.value.scrollWidth;
        const clientW = titleRef.value.clientWidth;
        isOverflowing.value = scrollW > clientW;
        if (isOverflowing.value) {
          scrollDistance.value = `-${scrollW - clientW}px`;
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
  const target = e.target as HTMLImageElement;
  target.style.display = 'none';
  target.nextElementSibling?.classList.remove('hidden');
};
</script>

<style scoped>
@keyframes marquee-hover {
  0% { transform: translateX(0); }
  10%, 90% { animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
  50% { transform: translateX(var(--scroll-distance)); }
  100% { transform: translateX(0); }
}

.animate-marquee-hover {
  animation: marquee-hover 4s linear infinite;
}
</style>