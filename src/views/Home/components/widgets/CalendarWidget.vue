<template>
  <div class="h-full w-full rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300">
    <div class="flex items-center justify-between mb-4">
      <div class="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">{{ currentMonthStr }}</div>
      <div class="text-[10px] font-bold text-zinc-400">{{ currentYear }}</div>
    </div>

    <!-- Days of Week Header -->
    <div class="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-zinc-400/80 uppercase">
      <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 flex-1 content-between mt-2">
      <div 
        v-for="(day, index) in calendarDays" 
        :key="index"
        :class="[
          'flex items-center justify-center text-[11px] font-semibold rounded-full w-6 h-6 sm:w-7 sm:h-7 mx-auto',
          day.isCurrentMonth ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-300 dark:text-zinc-700 opacity-40',
          day.isToday ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold shadow-sm' : ''
        ]"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentMonthStr = ref('');
const currentYear = ref(0);
const calendarDays = ref<Array<{date: number, isCurrentMonth: boolean, isToday: boolean}>>([]);

onMounted(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  
  currentYear.value = year;
  currentMonthStr.value = now.toLocaleDateString('en-US', { month: 'long' });
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({ date: daysInPrevMonth - i, isCurrentMonth: false, isToday: false });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: i, isCurrentMonth: true, isToday: i === today });
  }
  
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ date: i, isCurrentMonth: false, isToday: false });
  }
  
  calendarDays.value = days;
});
</script>
