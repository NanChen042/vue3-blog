<template>
  <div class="h-full w-full rounded-2xl bg-gradient-to-br from-blue-500/90 to-indigo-600/90 dark:from-indigo-900 dark:to-slate-900 border border-white/20 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group text-white">
    
    <!-- Size Switcher (Hover to reveal) -->
    <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
      <button @click="$emit('change-size', '1x1')" :class="['w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold', size === '1x1' ? 'bg-white/20' : 'bg-black/20 hover:bg-black/40']">1x1</button>
      <button @click="$emit('change-size', '2x1')" :class="['w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold', size === '2x1' ? 'bg-white/20' : 'bg-black/20 hover:bg-black/40']">2x1</button>
      <button @click="$emit('change-size', '2x2')" :class="['w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold', size === '2x2' ? 'bg-white/20' : 'bg-black/20 hover:bg-black/40']">2x2</button>
    </div>

    <!-- 1x1 Mini Layout -->
    <template v-if="size === '1x1'">
      <div class="flex justify-between items-start">
        <svg class="w-8 h-8 text-yellow-300 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5 19.5c.2 0 .4-.1.5-.2.2-.2.2-.4.2-.6 0-.8-.6-1.5-1.4-1.5h-13c-.8 0-1.4.7-1.4 1.5 0 .2.1.4.2.6.2.2.4.2.6.2h13.3zm-13.3-3h13.3c.2 0 .4-.1.5-.2.2-.2.2-.4.2-.6 0-.8-.6-1.5-1.4-1.5H4.2c-.8 0-1.4.7-1.4 1.5 0 .2.1.4.2.6.2.2.4.2.6.2zM21 9.7c0-2.6-2.1-4.7-4.7-4.7-1.2 0-2.3.5-3.1 1.3C12.3 4.2 10.1 2.5 7.5 2.5 4.5 2.5 2 5 2 8c0 1.9 1.1 3.5 2.8 4.3.4.2.9.4 1.4.5h10.5c.5-.1 1-.3 1.4-.5C19.9 11.5 21 9.9 21 8zm-4.7-2.7c1.5 0 2.7 1.2 2.7 2.7 0 1.2-.8 2.2-2 2.6H8C6.1 12 4 10.2 4 8c0-1.9 1.6-3.5 3.5-3.5 1.7 0 3.2 1.2 3.4 2.8h.6c.7-1.4 2.1-2.3 3.8-2.3z" />
        </svg>
        <div class="text-right">
          <p class="text-[10px] text-white/70 uppercase tracking-widest font-bold">Shanghai</p>
        </div>
      </div>
      <div class="mt-auto">
        <div class="text-4xl font-black text-white tracking-tighter">25°</div>
      </div>
    </template>

    <!-- 2x1 Horizontal Layout -->
    <template v-else-if="size === '2x1'">
      <div class="flex items-center justify-between h-full">
        <div>
          <p class="text-[10px] text-white/70 uppercase tracking-widest font-bold mb-1">Shanghai</p>
          <div class="text-5xl font-black text-white tracking-tighter leading-none mb-1">25°</div>
          <p class="text-[11px] font-semibold text-white/90">Mostly Clear</p>
        </div>
        <div class="flex gap-4">
          <div v-for="day in forecast.slice(0, 3)" :key="day.name" class="flex flex-col items-center">
            <span class="text-[10px] text-white/70 font-bold">{{ day.name }}</span>
            <svg class="w-5 h-5 text-yellow-300 my-1" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/></svg>
            <span class="text-[11px] font-bold">{{ day.temp }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 2x2 Large Layout (Screenshot Style) -->
    <template v-else>
      <div class="flex justify-between items-start mb-6">
        <div>
          <div class="flex items-center gap-1 opacity-70 mb-1">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span class="text-[11px] font-bold">Shanghai</span>
          </div>
          <div class="text-6xl font-black tracking-tighter">25°</div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-black mb-1">☀️</div>
          <div class="text-[11px] font-semibold">Clear</div>
          <div class="text-[10px] opacity-70">L: 22° H: 26°</div>
        </div>
      </div>
      
      <div class="mt-auto grid grid-cols-5 gap-2 border-t border-white/10 pt-4">
        <div v-for="day in forecast" :key="day.name" class="flex flex-col items-center">
          <span class="text-[10px] text-white/80 font-bold">{{ day.name }}</span>
          <svg class="w-5 h-5 text-yellow-300 my-1.5 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
          </svg>
          <span class="text-[10px] font-bold">{{ day.min }}-{{ day.max }}</span>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: '2x2'
  }
});

defineEmits(['change-size']);

const forecast = [
  { name: 'Today', temp: '25°', min: '24', max: '28' },
  { name: 'Fri', temp: '26°', min: '25', max: '29' },
  { name: 'Sat', temp: '24°', min: '26', max: '30' },
  { name: 'Sun', temp: '25°', min: '25', max: '30' },
  { name: 'Mon', temp: '28°', min: '24', max: '32' },
];
</script>
