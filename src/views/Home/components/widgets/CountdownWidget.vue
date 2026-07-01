<template>
  <div class="h-full w-full rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 relative overflow-hidden">
    <div class="flex items-center justify-between mb-2">
      <div class="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
        <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Countdown
      </div>
      <div class="countdown-pagination flex items-center gap-1"></div>
    </div>

    <div class="flex-1 min-h-0 relative">
      <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ el: '.countdown-pagination', clickable: true }"
        class="h-full w-full"
      >
        <swiper-slide v-for="item in countdowns" :key="item.title">
          <div class="flex flex-col justify-center h-full">
            <div class="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 mb-1 tracking-tight">{{ item.title }}</div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-5xl font-black leading-none tracking-tighter text-zinc-900 dark:text-white">{{ item.daysLeft }}</span>
              <span class="text-[11px] font-bold text-zinc-500 uppercase">Days</span>
            </div>
            <div class="text-[10px] font-bold text-zinc-400 mt-2 uppercase tracking-widest">{{ item.date }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const countdowns = [
  { title: 'New Year', date: 'Jan 1, 2027', daysLeft: 184 },
  { title: 'Vacation Trip', date: 'Aug 15, 2026', daysLeft: 45 },
  { title: 'Project Launch', date: 'Sep 1, 2026', daysLeft: 62 },
];
</script>

<style>
.countdown-pagination .swiper-pagination-bullet {
  width: 4px;
  height: 4px;
  background-color: #d4d4d8; /* zinc-300 */
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 2px !important;
}
.dark .countdown-pagination .swiper-pagination-bullet {
  background-color: #52525b; /* zinc-600 */
}
.countdown-pagination .swiper-pagination-bullet-active {
  background-color: #18181b !important;
  width: 12px;
  border-radius: 2px;
}
.dark .countdown-pagination .swiper-pagination-bullet-active {
  background-color: #ffffff !important;
}
</style>
