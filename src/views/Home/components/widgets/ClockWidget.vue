<template>
  <div 
    class="h-full w-full rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-6 flex flex-col justify-center items-start hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 relative overflow-hidden group cursor-pointer"
    @click="toggleMode"
  >
    <!-- Exquisite Canvas Analog Clock Background (Only for 2x2) -->
    <canvas 
      v-show="size === '2x2'"
      ref="clockCanvas" 
      class="absolute -right-8 -bottom-8 w-64 h-64 pointer-events-none group-hover:scale-[1.1] transition-transform duration-700 ease-out"
    ></canvas>

    <!-- 1x1 Mini Digital / Analog layout -->
    <template v-if="size === '1x1'">
      <div class="w-full h-full flex flex-col items-center justify-center relative z-10">
        <div class="text-3xl font-black text-zinc-900 dark:text-zinc-50 font-sans leading-none flex items-baseline perspective">
          <span>{{ hours }}:{{ minutes }}</span>
        </div>
        <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{{ period }}</div>
      </div>
    </template>

    <!-- 2x1 Horizontal Layout -->
    <template v-else-if="size === '2x1'">
      <div class="w-full h-full flex items-center justify-between relative z-10">
        <div class="flex flex-col">
          <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ isWorldClock ? 'World Clocks' : 'Time & Date' }}
          </div>
          <div class="text-5xl font-black text-zinc-900 dark:text-zinc-50 font-sans leading-none flex items-baseline perspective">
             <transition name="flip" mode="out-in"><span :key="hours" class="inline-block">{{ hours }}</span></transition>
             <span :class="{'opacity-30': !showColon}" class="mx-1 pb-1 transition-opacity duration-300 inline-block">:</span>
             <transition name="flip" mode="out-in"><span :key="minutes[0]" class="inline-block">{{ minutes[0] }}</span></transition>
             <transition name="flip" mode="out-in"><span :key="minutes[1]" class="inline-block">{{ minutes[1] }}</span></transition>
          </div>
        </div>
        <div class="text-right flex flex-col items-end justify-center">
          <div class="text-[11px] font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{{ period }}</div>
          <div class="mt-2 text-xs font-semibold text-zinc-400">{{ weekday }}</div>
        </div>
      </div>
    </template>

    <!-- 2x2 Large Layout (Default) -->
    <template v-else>
      <div class="relative z-10 w-full flex items-center justify-between mb-4">
        <div class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover:text-zinc-500">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ isWorldClock ? 'World Clocks' : 'Time & Date' }}
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <transition name="fade" mode="out-in">
            <span :key="period" class="text-[10px] font-bold text-zinc-400">{{ period }}</span>
          </transition>
        </div>
      </div>
      
      <div class="relative z-10 mt-auto mb-auto w-full h-[120px] flex flex-col justify-center">
        <transition name="slide-up" mode="out-in">
          <!-- Local Time Mode with Flip Effect -->
          <div v-if="!isWorldClock" key="local" class="w-full">
            <div class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 font-sans leading-none flex items-baseline perspective">
              <!-- Hour Flip -->
              <transition name="flip" mode="out-in">
                <span :key="hours" class="inline-block">{{ hours }}</span>
              </transition>
              
              <span :class="{'opacity-30': !showColon}" class="mx-1 pb-2 transition-opacity duration-300 inline-block">:</span>
              
              <!-- Minute Tens Flip -->
              <transition name="flip" mode="out-in">
                <span :key="minutes[0]" class="inline-block">{{ minutes[0] }}</span>
              </transition>
              <!-- Minute Ones Flip -->
              <transition name="flip" mode="out-in">
                <span :key="minutes[1]" class="inline-block">{{ minutes[1] }}</span>
              </transition>
            </div>
            <div class="mt-4 text-sm sm:text-base font-semibold text-zinc-500 dark:text-zinc-400 flex gap-2">
              <span>{{ date }}</span>
              <span class="opacity-30">|</span>
              <span>{{ weekday }}</span>
            </div>
          </div>

          <!-- World Clock Mode -->
          <div v-else key="world" class="w-full flex flex-col gap-3">
            <div v-for="city in worldCities" :key="city.name" class="flex items-center justify-between group/city">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest w-12">{{ city.abbr }}</span>
                <span class="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 group-hover/city:translate-x-1 transition-transform">{{ city.name }}</span>
              </div>
              <div class="flex items-baseline gap-1">
                <transition name="flip" mode="out-in">
                  <span :key="city.time" class="text-lg font-black text-zinc-900 dark:text-white inline-block">{{ city.time }}</span>
                </transition>
                <span class="text-[10px] font-bold text-zinc-500">{{ city.period }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: '2x2'
  }
});

const hours = ref('');
const minutes = ref('00');
const date = ref('');
const weekday = ref('');
const period = ref('');
const showColon = ref(true);

const isWorldClock = ref(false);
const clockCanvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

const worldCities = ref([
  { name: 'New York', abbr: 'NYC', time: '', period: '', timeZone: 'America/New_York' },
  { name: 'London', abbr: 'LON', time: '', period: '', timeZone: 'Europe/London' },
  { name: 'Tokyo', abbr: 'TYO', time: '', period: '', timeZone: 'Asia/Tokyo' },
]);

const toggleMode = () => {
  isWorldClock.value = !isWorldClock.value;
};

const updateTime = () => {
  const now = new Date();
  
  // Local time formatting
  let hrs = now.getHours();
  const mins = now.getMinutes().toString().padStart(2, '0');
  
  period.value = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12 || 12;
  
  hours.value = hrs.toString();
  minutes.value = mins;
  showColon.value = now.getSeconds() % 2 === 0;
  
  date.value = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  weekday.value = now.toLocaleDateString('en-US', { weekday: 'long' });

  // World clocks formatting
  worldCities.value.forEach(city => {
    const cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.timeZone }));
    let cHrs = cityTime.getHours();
    const cMins = cityTime.getMinutes().toString().padStart(2, '0');
    
    city.period = cHrs >= 12 ? 'PM' : 'AM';
    cHrs = cHrs % 12 || 12;
    city.time = `${cHrs}:${cMins}`;
  });
};

const drawCanvasClock = () => {
  const canvas = clockCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Setup crisp high-DPI canvas
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  const width = rect.width;
  const height = rect.height;
  const cx = width / 2;
  const cy = height / 2;
  const radius = cx - 2;
  
  ctx.clearRect(0, 0, width, height);
  
  // Dynamic theme colors
  const isDark = document.documentElement.classList.contains('dark');
  const ringColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const tickColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
  const handColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.15)';
  const secHandColor = 'rgba(16, 185, 129, 0.4)'; // Emerald green matching UI
  
  // Outer Ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 14;
  ctx.stroke();
  
  // Inner Ring / Ticks
  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI) / 30;
    const isHour = i % 5 === 0;
    const innerRadius = radius - (isHour ? 18 : 10);
    const outerRadius = radius - 4;
    
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * innerRadius, cy + Math.sin(angle) * innerRadius);
    ctx.lineTo(cx + Math.cos(angle) * outerRadius, cy + Math.sin(angle) * outerRadius);
    ctx.strokeStyle = isHour ? handColor : tickColor;
    ctx.lineWidth = isHour ? 3 : 1;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  
  // Calculate smooth continuous time
  const now = new Date();
  const ms = now.getMilliseconds();
  const sec = now.getSeconds() + ms / 1000;
  const min = now.getMinutes() + sec / 60;
  const hr = now.getHours() % 12 + min / 60;
  
  const drawHand = (angle: number, length: number, width: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
  };
  
  // Hour Hand
  drawHand((hr * Math.PI) / 6 - Math.PI / 2, radius * 0.45, 6, handColor);
  // Minute Hand
  drawHand((min * Math.PI) / 30 - Math.PI / 2, radius * 0.65, 4, handColor);
  // Second Hand (Sweeping)
  drawHand((sec * Math.PI) / 30 - Math.PI / 2, radius * 0.75, 2, secHandColor);
  
  // Center Dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
  ctx.fillStyle = secHandColor;
  ctx.fill();
  
  if (props.size === '2x2') {
    animationFrameId = requestAnimationFrame(drawCanvasClock);
  }
};

let timer: number;
onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  
  nextTick(() => {
    if (props.size === '2x2') {
      animationFrameId = requestAnimationFrame(drawCanvasClock);
    }
  });
});

onUnmounted(() => {
  clearInterval(timer);
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

/* Digital Flip Effect */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-enter-from {
  transform: rotateX(90deg);
  opacity: 0;
}

.flip-leave-to {
  transform: rotateX(-90deg);
  opacity: 0;
}

/* Slide up for mode switching */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
