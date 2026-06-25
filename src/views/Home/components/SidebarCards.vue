<template>
  <!-- 工具集合 -->
  <!-- 【极致单品 1：小工具 (UI 蓝图刻度版)】 -->
<div class="group relative lg:col-span-1 rounded-[3px] bg-white dark:bg-[#050505] border border-[#efeff5] dark:border-[rgba(255,255,255,0.09)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_3px_12px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col p-7 min-h-[300px]" @click="router.push('/tools')">
  <!-- 专属底纹：聚焦聚光灯网格 (Premium Spotlight Canvas) -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-700">
    <!-- 隐现的祖母绿环境光晕 -->
    <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/0 dark:bg-emerald-500/0 rounded-full blur-[60px] group-hover:bg-emerald-400/10 dark:group-hover:bg-emerald-500/15 group-hover:scale-150 transition-all duration-[2s] ease-out"></div>
    
    <!-- 极简微点阵 (带径向渐变蒙版，仅在左下角部分区域隐约可见，极其克制) -->
    <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-[0.15] dark:group-hover:opacity-[0.2] transition-opacity duration-[1.5s]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dot-matrix-tools" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
        <radialGradient id="mask-tools" cx="20%" cy="80%" r="60%">
          <stop offset="0%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-matrix-tools)" mask="url(#mask-tools)" class="text-emerald-500" />
    </svg>
  </div>
  <div class="absolute inset-0 pointer-events-none">
    <!-- 四角精密定位符 -->
    <div class="absolute top-4 left-4 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700/80"></div>
    <div class="absolute top-4 right-4 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700/80"></div>
    <div class="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700/80"></div>
    <div class="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700/80"></div>

    <!-- 🌟 全新重构的 SVG：工程蓝图与刻度尺 (Toolkit 隐喻) -->
    <svg class="absolute right-0 top-0 w-3/4 h-full opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-1000" viewBox="0 0 100 200" fill="none">
      <!-- 测绘基准纵线与刻度 -->
      <path d="M 85 0 L 85 200" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" />
      <path d="M 85 30 L 90 30 M 85 50 L 95 50 M 85 70 L 90 70 M 85 90 L 95 90 M 85 110 L 90 110" stroke="currentColor" stroke-width="0.5" />
      
      <!-- 悬浮的 UI 模块结构框 -->
      <rect x="30" y="30" width="40" height="30" rx="2" stroke="currentColor" stroke-width="0.5" />
      <!-- 内部骨架线条 -->
      <path d="M 35 40 L 65 40 M 35 50 L 50 50" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 2" />
      
      <!-- 连接锚点与折线 -->
      <path d="M 70 45 L 85 45" stroke="currentColor" stroke-width="0.5" />
      <circle cx="70" cy="45" r="1.5" fill="currentColor" />
      
      <!-- 底部的数据处理流 -->
      <rect x="40" y="80" width="20" height="40" rx="1" stroke="currentColor" stroke-width="0.5" />
      <path d="M 50 60 L 50 80" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" />
      <polygon points="50,75 52,70 48,70" fill="currentColor" />

      <!-- Hover 触发的镭射扫描线 -->
      <line x1="20" y1="20" x2="90" y2="20" stroke="#10b981" stroke-width="0.5" class="opacity-0 group-hover:opacity-100 group-hover:translate-y-[100px] transition-all duration-[2s] ease-in-out" />
    </svg>
  </div>

  <div class="relative z-10 flex items-start gap-3 mb-5">
    <div class="w-6 h-6 mt-0.5 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-full h-full">
        <!-- 象征“工具”的扳手与齿轮极简符号 -->
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    
    <div>
      <div class="flex items-center gap-2 mb-1.5">
        <h3 class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {{ $t('home.features.tools.title') }}
        </h3>
        <n-tag :bordered="false" size="small" type="success" class="cursor-pointer font-mono font-bold" round>
          {{ totalToolsCount }} 工具
        </n-tag>
      </div>
      <p class="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
        {{ $t('home.features.tools.desc') }}
      </p>
    </div>
  </div>
  <div class="relative z-10 mt-auto pt-4 grid grid-cols-2 gap-x-6 gap-y-3">
    <div v-for="cat in toolCategories" :key="cat.name" class="group/sub flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800/60 hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-colors cursor-pointer">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 rounded-[1px] bg-zinc-200 dark:bg-zinc-700 group-hover/sub:bg-emerald-500 group-hover/sub:rotate-45 transition-all duration-300"></div>
        <span class="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 group-hover/sub:text-emerald-600 dark:group-hover/sub:text-emerald-400 transition-colors truncate max-w-[70px]">{{ cat.name }}</span>
      </div>
      <span class="text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 group-hover/sub:text-emerald-500 transition-colors">{{ cat.count }}</span>
    </div>
  </div>
</div>

<div class="group relative lg:col-span-2 rounded-[3px] bg-white dark:bg-[#050505] border border-[#efeff5] dark:border-[rgba(255,255,255,0.09)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_3px_12px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col p-7 min-h-[300px]" @click="router.push('/games')">
  <!-- 专属底纹：律动波纹与光晕 (Premium Rhythmic Waves) -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-700">
    <!-- 隐现的玫瑰红环境光晕 -->
    <div class="absolute -bottom-10 left-1/4 w-72 h-40 bg-rose-400/0 dark:bg-rose-500/0 rounded-[100%] blur-[50px] group-hover:bg-rose-400/10 dark:group-hover:bg-rose-500/15 group-hover:-translate-y-6 group-hover:scale-125 transition-all duration-[2s] ease-out"></div>
    
    <!-- 极简流体贝塞尔曲线 (模仿物理引擎或水波，与弹跳小球形成完美呼应) -->
    <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-[0.25] dark:group-hover:opacity-[0.3] transition-opacity duration-[1.5s]" preserveAspectRatio="none" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 80 Q 50 65 100 80 T 200 80" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" class="text-rose-500 group-hover:-translate-y-2 transition-transform duration-[2.5s] ease-in-out" />
      <path d="M 0 85 Q 50 72 100 85 T 200 85" fill="none" stroke="currentColor" stroke-width="0.5" class="text-rose-400 group-hover:translate-y-1 transition-transform duration-[3s] ease-in-out delay-75" />
      <path d="M 0 92 Q 50 82 100 92 T 200 92" fill="none" stroke="currentColor" stroke-width="0.3" class="text-rose-300 group-hover:-translate-y-3 transition-transform duration-[3.5s] ease-in-out delay-150" />
    </svg>
  </div>
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-4 left-4 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700/80"></div>
    <div class="absolute top-4 right-4 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700/80"></div>
    <div class="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700/80"></div>
    <div class="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700/80"></div>

    <svg class="absolute right-0 top-0 w-2/3 h-full opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-1000" viewBox="0 0 200 100" fill="none">
      <path d="M 0 80 L 200 80" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" />
      <path d="M 150 0 L 150 100" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" />
      
      <path d="M 20 80 Q 80 10 150 75" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" class="text-zinc-500" />
      
      <circle cx="150" cy="75" r="4" stroke="currentColor" stroke-width="1.5" class="text-rose-500 group-hover:animate-bounce origin-bottom" style="animation-duration: 1.5s;" />
      
      <path d="M 150 75 L 170 55" stroke="currentColor" stroke-width="1" class="text-rose-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700" />
      <polygon points="172,53 173,59 167,58" fill="currentColor" class="text-rose-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700" />

      <rect x="135" y="60" width="30" height="20" stroke="currentColor" stroke-width="0.5" class="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300" />
    </svg>
  </div>



  <div class="relative z-10 flex items-start gap-3 mb-6 w-3/4">
    <div class="w-6 h-6 mt-0.5 flex items-center justify-center text-rose-600 dark:text-rose-500 shrink-0">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </div>
    
    <div>
      <div class="flex items-center gap-2 mb-1.5">
        <h3 class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
          {{ $t('home.features.games.title') }}
        </h3>
        <n-tag :bordered="false" size="small" type="error" class="cursor-pointer font-mono font-bold" round>
          {{ totalGamesCount }}
        </n-tag>
      </div>
      <p class="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
        {{ $t('home.features.games.desc') }}
      </p>
    </div>
  </div>

  <div class="relative z-10 grid grid-cols-4 gap-3 mb-8 w-full md:w-[90%]">
    <div v-for="stat in remainingGameStats" :key="stat.label" class="flex flex-col p-2.5 rounded-lg bg-zinc-50/40 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 group-hover:border-rose-200 dark:group-hover:border-rose-500/30 transition-colors duration-300">
      <span class="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-0.5">{{ stat.label }}</span>
      <span class="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors tracking-tight">{{ stat.value }}</span>
    </div>
  </div>

  <div class="relative z-10 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
    <div class="flex items-center gap-3 overflow-hidden">
      <div class="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
        <span class="w-1.5 h-1.5 bg-rose-500 animate-pulse rounded-full"></span>
        <span class="text-[11px] font-semibold text-rose-600 dark:text-rose-500">Hot games</span>
      </div>
      
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        <n-tag v-for="game in hotGames" :key="game.name" :bordered="false" size="small" type="error" class="cursor-pointer hover:-translate-y-0.5 transition-transform shrink-0">
          <template #icon>
            <span class="text-[12px] opacity-80 mt-[1px] ml-0.5">{{ game.icon }}</span>
          </template>
          <span class="font-medium ml-1">{{ game.name }}</span>
        </n-tag>
      </div>
    </div>
  </div>

</div>

<div class="group/chatcard relative lg:col-span-3 overflow-hidden rounded-[3px] bg-white dark:bg-[#050505] border border-[#efeff5] dark:border-[rgba(255,255,255,0.09)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_3px_12px_rgba(0,0,0,0.3)] transition-all duration-500">
  <!-- 专属底纹：神经漫游与交流星团 (Premium Neural Aura & Flow) -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-700">
    <!-- 隐现的星云光晕 (左蓝右紫) -->
    <div class="absolute -bottom-10 left-10 w-96 h-96 bg-indigo-500/0 dark:bg-indigo-500/0 rounded-full blur-[80px] group-hover/chatcard:bg-indigo-500/10 group-hover/chatcard:scale-110 group-hover/chatcard:-translate-y-4 transition-all duration-[2.5s] ease-out"></div>
    <div class="absolute -top-10 right-10 w-72 h-72 bg-violet-500/0 dark:bg-violet-500/0 rounded-full blur-[60px] group-hover/chatcard:bg-violet-500/10 group-hover/chatcard:scale-125 group-hover/chatcard:translate-y-4 transition-all duration-[3s] ease-out delay-100"></div>
    
    <!-- 极简神经网络流线 -->
    <svg class="absolute inset-0 w-full h-full opacity-0 group-hover/chatcard:opacity-[0.25] dark:group-hover/chatcard:opacity-[0.3] transition-opacity duration-[2s]" preserveAspectRatio="none" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 50 Q 100 20 200 50 T 400 50" fill="none" stroke="url(#chat-grad-1)" stroke-width="0.5" class="group-hover/chatcard:translate-y-2 transition-transform duration-[3s] ease-in-out" />
      <path d="M 0 60 Q 150 90 250 60 T 400 60" fill="none" stroke="url(#chat-grad-2)" stroke-width="0.3" class="group-hover/chatcard:-translate-y-2 transition-transform duration-[4s] ease-in-out delay-100" />
      <path d="M 100 35 L 250 75" fill="none" stroke="currentColor" stroke-width="0.2" stroke-dasharray="2 4" class="text-indigo-400 group-hover/chatcard:rotate-1 origin-center transition-transform duration-[3s]" />
      
      <!-- 神经节点点缀 -->
      <circle cx="100" cy="35" r="1.5" fill="currentColor" class="text-indigo-500" />
      <circle cx="200" cy="50" r="1" fill="currentColor" class="text-violet-400" />
      <circle cx="250" cy="75" r="1.5" fill="currentColor" class="text-indigo-400" />
      
      <defs>
        <linearGradient id="chat-grad-1" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0" />
          <stop offset="50%" stop-color="#6366f1" stop-opacity="1" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="chat-grad-2" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0" />
          <stop offset="50%" stop-color="#8b5cf6" stop-opacity="1" />
          <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#efeff5] dark:divide-[rgba(255,255,255,0.09)] h-full">
    
    <div class="relative p-7 group cursor-pointer hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors flex flex-col justify-between h-full overflow-hidden" @click="router.push('/chat')">
      
      <svg class="absolute right-0 top-0 w-1/2 h-full opacity-[0.02] dark:opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-1000 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M 10 50 L 40 50 L 70 20 M 40 50 L 70 80" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 3" class="text-indigo-500" />
        <circle cx="70" cy="20" r="2" fill="currentColor" class="text-indigo-400" />
        <circle cx="70" cy="80" r="2" fill="currentColor" class="text-indigo-400" />
        <circle cx="40" cy="50" r="3" fill="currentColor" class="text-indigo-500 group-hover:animate-ping origin-center" />
      </svg>

      <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-indigo-500 group-hover:h-1/3 transition-all duration-500 ease-out z-20"></div>

      <div class="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 mt-0.5 flex items-center justify-center text-indigo-600 dark:text-indigo-500 shrink-0">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <div class="pt-0.5">
            <div class="flex items-center gap-2 mb-1.5">
              <h3 class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {{ $t('home.features.chat.ai_title') }}
              </h3>
              <div class="px-1.5 py-0.5 rounded border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-mono font-bold uppercase tracking-widest shadow-sm">
                {{ $t('home.features.chat.ai_tag') }}
              </div>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-[95%] mt-1">
              {{ $t('home.features.chat.ai_desc') }}
            </p>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-[#efeff5]/50 dark:border-[rgba(255,255,255,0.05)]">
        <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
          <svg class="w-3.5 h-3.5 text-indigo-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <span>{{ $t('home.features.chat.ai_feature') }}</span>
        </div>
        <div class="flex items-center gap-1 text-xs font-bold text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-widest hidden md:flex">
          {{ $t('home.features.chat.ai_action') }}
          <svg class="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>
    </div>

    <div class="relative p-7 group cursor-pointer hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors flex flex-col justify-between h-full overflow-hidden" @click="router.push('/chat')">
      
      <svg class="absolute right-0 top-0 w-1/2 h-full opacity-[0.02] dark:opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-1000 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="90" cy="50" r="20" stroke="currentColor" stroke-width="0.5" class="text-emerald-500 group-hover:scale-110 transition-transform duration-[2s] origin-[90%_50%]" />
        <circle cx="90" cy="50" r="40" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4" class="text-emerald-500 group-hover:scale-105 transition-transform duration-[3s] origin-[90%_50%]" />
        <path d="M 20 50 L 90 50" stroke="currentColor" stroke-width="0.5" class="text-zinc-500" />
        <rect x="50" y="48" width="4" height="4" fill="currentColor" class="text-emerald-400" />
      </svg>

      <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-emerald-500 group-hover:h-1/3 transition-all duration-500 ease-out z-20"></div>

      <div class="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 mt-0.5 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div class="pt-0.5">
            <div class="flex items-center gap-2 mb-1.5">
              <h3 class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {{ $t('home.features.chat.channel_title') }}
              </h3>
              <div class="flex items-center gap-1.5 px-1.5 py-0.5 rounded border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-widest shadow-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {{ $t('home.features.chat.channel_online') }}
              </div>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-[13px] font-medium leading-relaxed max-w-[90%]">
              {{ $t('home.features.chat.channel_desc') }}
            </p>
          </div>
        </div>
      </div>

      <div class="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-[#efeff5]/50 dark:border-[rgba(255,255,255,0.05)]">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="flex -space-x-2 shrink-0">
            <div v-for="n in 3" :key="n" class="w-6 h-6 rounded-full border-2 border-white dark:border-[#050505] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative z-[calc(3-n)]">
              <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${n * 11}`" class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
              <span class="font-bold text-zinc-600 dark:text-zinc-400 truncate max-w-[100px]">{{ $t('home.features.chat.mock_user') }}</span>
              <span class="text-zinc-300 dark:text-zinc-700">/</span>
              <span class="shrink-0">{{ $t('home.features.chat.mock_time') }}</span>
            </div>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[180px] mt-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">{{ $t('home.features.chat.mock_msg') }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-1 text-[11px] font-bold text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors uppercase tracking-widest hidden md:flex shrink-0">
          {{ $t('home.features.chat.channel_action') }}
          <svg class="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toolCategories, gameStats } from '@/data/home';
import { NTag } from 'naive-ui';

const router = useRouter();

const totalToolsCount = computed(() => toolCategories.reduce((sum, cat) => sum + cat.count, 0));
const totalGamesCount = computed(() => gameStats.find(s => s.label === '游戏数量')?.value || 'GAMES');
const remainingGameStats = computed(() => gameStats.filter(s => s.label !== '游戏数量'));

const hotGames = [
  { name: 'Flappy Bird', icon: '🐦' },
  { name: '2048', icon: '🎲' },
  { name: 'Tetris', icon: '🧱' },
  { name: 'Snake', icon: '🐍' },
  { name: 'Pong', icon: '🏓' },
];
</script>

<style scoped>
/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
