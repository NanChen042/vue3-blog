<template>
  <div class="flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer">
    <div class="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-zinc-800 dark:text-zinc-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-active:scale-95">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="w-full h-full drop-shadow-sm -translate-y-1 sm:-translate-y-1.5">
        <defs>
          <clipPath id="circleClipLogo">
            <circle cx="100" cy="100" r="100" />
          </clipPath>
        </defs>
        <g clip-path="url(#circleClipLogo)">
          <g transform="translate(15, 20)">
            <path d="M 110,40 C 145,40 155,75 140,110 C 130,125 120,130 110,130 L 110,190 L 75,190 L 75,130 C 50,130 20,125 20,105 C 20,90 35,80 50,80 C 65,80 75,85 85,85 C 85,60 90,40 110,40 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" />
            <rect x="72" y="145" width="41" height="14" rx="4" fill="#E32636" stroke="currentColor" stroke-width="4" />
            <path d="M 110,80 C 130,80 145,110 135,140 C 125,160 100,150 100,125 C 100,100 95,80 110,80 Z" fill="currentColor" />
            <ellipse cx="20" cy="96" rx="9" ry="13" fill="currentColor" transform="rotate(-15 20 96)" />
            <path d="M 75,68 Q 80,56 85,68" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
            <path d="M 40,115 Q 55,125 70,112" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </g>
        </g>
      </svg>
    </div>
    <div class="flex items-baseline transition-transform duration-300">
      <span class="text-zinc-900 dark:text-zinc-50 font-bold text-lg sm:text-[22px] tracking-tight transition-colors" style="font-family: 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;">南辰</span>
      <span class="text-zinc-500 dark:text-zinc-400 font-light text-[10px] sm:text-xs tracking-[0.2em] ml-1.5 uppercase transition-colors" style="font-family: 'Montserrat', 'Inter', 'Helvetica Neue', sans-serif;">Blog</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "BrandLogo" });
</script>