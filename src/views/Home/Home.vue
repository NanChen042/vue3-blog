<template>
  <div class="relative min-h-screen bg-[#FDFDFD] dark:bg-[#000000] overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">

    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>

    <section class="relative z-10 flex flex-col items-center text-center pt-16 pb-12 px-6 max-w-5xl mx-auto">

      <div class="group flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0A] cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300 shadow-sm">
        <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
        <span class="text-xs font-mono font-medium tracking-widest uppercase text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
          {{ $t('home.hero.badge') }}
        </span>
      </div>

      <h1 class="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] text-zinc-900 dark:text-white mb-6">
        {{ $t('home.hero.title_prefix') }}<br />
        <span class="bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
        {{ $t('home.hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-3">
        <button class="w-full sm:w-auto px-7 py-2.5 rounded-[14px] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
          {{ $t('home.hero.primary_btn') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        <button class="w-full sm:w-auto px-7 py-2.5 rounded-[14px] bg-white/50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200">
          {{ $t('home.hero.secondary_btn') }}
        </button>
      </div>
    </section>

    <!-- Stats Banner -->
    <section class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 -mt-2 mb-6">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/blog')">
          <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">32+</div>
            <div class="text-[10px] text-zinc-500 mt-0.5">技术文章</div>
          </div>
        </div>
        <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/tools')">
          <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">57</div>
            <div class="text-[10px] text-zinc-500 mt-0.5">在线工具</div>
          </div>
        </div>
        <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/games')">
          <div class="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">24+</div>
            <div class="text-[10px] text-zinc-500 mt-0.5">在线游戏</div>
          </div>
        </div>
        <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/60 dark:bg-[#0A0A0A]/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors cursor-pointer" @click="router.push('/lab')">
          <div class="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
            <svg class="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white leading-none">3</div>
            <div class="text-[10px] text-zinc-500 mt-0.5">AI 模型</div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pb-24">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <!-- AI 实验 - 大卡片 -->
        <div class="md:col-span-2 group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between min-h-[320px]" @click="router.push('/lab')">

          <!-- 装饰背景 -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute -right-16 -top-16 w-[320px] h-[320px]">
              <div class="relative w-full h-full flex items-center justify-center">
                <div class="w-full h-full border border-zinc-100 dark:border-zinc-800 rounded-full"></div>
                <div class="absolute inset-8 border border-zinc-100 dark:border-zinc-800 rounded-full"></div>
                <div class="absolute inset-16 border border-zinc-200 dark:border-zinc-700 rounded-full border-dashed group-hover:rotate-[540deg] transition-transform duration-[5s] ease-in-out"></div>
                <div class="absolute inset-24 border border-indigo-200 dark:border-indigo-800/40 rounded-full"></div>
                <!-- 旋转扫描线 -->
                <div class="absolute inset-0 animate-[spin_6s_linear_infinite]">
                  <div class="w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent absolute top-1/2 left-0 -translate-y-1/2"></div>
                </div>
                <!-- 浮动粒子 -->
                <div class="absolute w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_12px_#6366f1] top-[15%] left-[68%] group-hover:scale-150 transition-transform duration-700"></div>
                <div class="absolute w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_8px_#8b5cf6] top-[60%] left-[18%] group-hover:scale-150 transition-transform duration-700 delay-100"></div>
                <div class="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#06b6d4] top-[75%] left-[65%] group-hover:scale-150 transition-transform duration-700 delay-200"></div>
                <!-- 连接线 -->
                <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000" viewBox="0 0 320 320">
                  <circle cx="160" cy="160" r="60" fill="none" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="4 4"/>
                  <circle cx="160" cy="160" r="100" fill="none" stroke="#8b5cf6" stroke-width="0.5" stroke-dasharray="4 6"/>
                </svg>
              </div>
            </div>
            <!-- 底部渐变遮罩 -->
            <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0A0A0A] to-transparent"></div>
          </div>

          <!-- 顶部: 图标 + 标题描述 -->
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors duration-500">
                <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400 icon-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1 animate-pulse"></span>
                  {{ aiModels.filter(m => m.status === 'online').length }} 在线
                </span>
                <span class="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-semibold">{{ aiModels.length }} 模型</span>
              </div>
            </div>
            <h3 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ $t('home.features.lab.title') }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
              {{ $t('home.features.lab.desc') }}
            </p>
          </div>

          <!-- 底部: 模型状态 + 快速操作 -->
          <div class="relative z-10">
            <!-- AI 模型状态 -->
            <div class="grid grid-cols-3 gap-2 mb-3">
              <div v-for="model in aiModels" :key="model.name"
                class="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800/30 transition-colors">
                <div class="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <span class="text-[9px] font-mono font-bold text-indigo-600 dark:text-indigo-400">{{ model.name.slice(0,2) }}</span>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-[10px] font-semibold text-zinc-700 dark:text-zinc-200 truncate">{{ model.name }}</div>
                  <div class="text-[8px] text-zinc-400 truncate">{{ model.tasks }}</div>
                </div>
                <div class="w-1.5 h-1.5 rounded-full shrink-0" :class="model.status === 'online' ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : model.status === 'busy' ? 'bg-amber-500' : 'bg-zinc-400'"></div>
              </div>
            </div>

            <!-- 快速操作 -->
            <div class="flex items-center gap-2">
              <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                新建实验
              </button>
              <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                历史记录
              </button>
            </div>
          </div>
        </div>

        <!-- 博客文章 -->
        <div class="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col" @click="router.push('/blog')">

          <div class="mb-auto">
            <div class="w-12 h-12 mb-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM14 4v5h5M8 12h8m-8 4h6" />
              </svg>
            </div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ $t('home.features.blog.title') }}
              </h3>
              <span class="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-semibold">{{ recentPosts.length }} 篇</span>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              {{ $t('home.features.blog.desc') }}
            </p>
          </div>

          <!-- Featured 文章 -->
          <div class="mb-4 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 group/feat hover:border-blue-200 dark:group-hover/feat:border-blue-800/30 transition-colors">
            <div class="h-28 overflow-hidden bg-zinc-50 dark:bg-zinc-900 relative">
              <img v-if="recentPosts[0]?.coverUrl" :src="recentPosts[0].coverUrl" class="w-full h-full object-cover group-hover/feat:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
              <div class="absolute bottom-2 left-2.5 right-2.5">
                <span class="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wide">置顶</span>
              </div>
            </div>
            <div class="p-3 bg-white dark:bg-[#0A0A0A]">
              <div class="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug mb-1 line-clamp-2 group-hover/feat:text-blue-600 dark:group-hover/feat:text-blue-400 transition-colors">{{ recentPosts[0]?.title }}</div>
              <div class="flex items-center gap-2">
                <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 font-medium">{{ recentPosts[0]?.category }}</span>
                <span class="text-[9px] text-zinc-400">{{ recentPosts[0]?.date }}</span>
                <span class="text-[9px] text-zinc-400">· {{ recentPosts[0]?.readTime }}</span>
              </div>
            </div>
          </div>

          <!-- 最新文章列表 -->
          <div class="space-y-2">
            <div v-for="post in recentPosts.slice(1)" :key="post.id" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group/post">
              <div class="w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                <img v-if="post.coverUrl" :src="post.coverUrl" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover/post:text-blue-600 dark:group-hover/post:text-blue-400 transition-colors">{{ post.title }}</div>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 font-medium">{{ post.category }}</span>
                  <span class="text-[10px] text-zinc-400">{{ post.readTime }}</span>
                </div>
              </div>
              <svg class="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0 opacity-0 group-hover/post:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- 工具集合 -->
        <div class="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col" @click="router.push('/tools')">
          <div class="absolute right-6 top-6 w-24 h-24 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500">
            <div class="absolute inset-0 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#0A0A0A] translate-x-0 translate-y-0 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 z-20 flex items-center justify-center">
              <div class="w-4 h-4 rounded-sm border border-emerald-400"></div>
            </div>
            <div class="absolute inset-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 z-10"></div>
          </div>

          <div class="mb-auto">
            <div class="w-12 h-12 mb-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors">
              <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {{ $t('home.features.tools.title') }}
              </h3>
              <span class="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">{{ toolCategories.length }} 类</span>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              {{ $t('home.features.tools.desc') }}
            </p>
          </div>

          <!-- 工具项目网格 -->
          <div class="grid grid-cols-3 gap-2">
            <div v-for="cat in toolCategories" :key="cat.name"
              class="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer group/cat">
              <span class="text-base leading-none">{{ cat.icon }}</span>
              <span class="text-[9px] font-semibold text-zinc-500 dark:text-zinc-400 group-hover/cat:text-emerald-600 dark:group-hover/cat:text-emerald-400 transition-colors leading-none text-center">{{ cat.name }}</span>
              <span class="px-1 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[8px] font-medium text-zinc-500 dark:text-zinc-400">{{ cat.count }}</span>
            </div>
          </div>
        </div>

        <!-- 游戏 -->
        <div class="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col" @click="router.push('/games')">
          <div class="absolute inset-x-0 top-0 h-24 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-35 transition-opacity duration-500">
            <div class="relative w-full h-full flex items-center justify-center">
              <div class="absolute top-[10%] left-[20%] w-12 h-12 rounded-lg border border-zinc-300 dark:border-zinc-600 group-hover:-translate-y-3 group-hover:-translate-x-3 transition-transform duration-700 ease-out"></div>
              <div class="absolute top-[15%] left-[30%] w-12 h-12 rounded-lg bg-zinc-900 dark:bg-white group-hover:translate-y-3 group-hover:translate-x-3 transition-transform duration-700 ease-out flex items-center justify-center shadow-lg">
                <div class="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
              </div>
              <div class="absolute top-[50%] right-[20%] w-6 h-6 rounded-md border border-zinc-300 dark:border-zinc-600 group-hover:rotate-45 transition-transform duration-500"></div>
            </div>
          </div>

          <div class="mb-auto">
            <div class="w-12 h-12 mb-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 group-hover:border-rose-200 dark:group-hover:border-rose-800 transition-colors">
              <svg class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {{ $t('home.features.games.title') }}
              </h3>
              <span class="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-semibold">{{ gameStats[0].value }}</span>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              {{ $t('home.features.games.desc') }}
            </p>
          </div>

          <!-- 游戏数据统计 -->
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div v-for="stat in gameStats" :key="stat.label" class="text-center p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-rose-200 dark:hover:border-rose-800/30 transition-colors">
              <div class="text-base font-bold text-rose-600 dark:text-rose-400 leading-none">{{ stat.value }}</div>
              <div class="text-[9px] text-zinc-500 mt-0.5">{{ stat.label }}</div>
            </div>
          </div>

          <!-- 热门游戏快捷入口 -->
          <div class="flex items-center gap-2 overflow-hidden">
            <span class="text-[10px] text-zinc-400 shrink-0 font-medium">热门:</span>
            <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              <span v-for="game in hotGames" :key="game.name"
                class="shrink-0 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 text-[10px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-800/30 transition-colors cursor-pointer">
                <span>{{ game.icon }}</span>{{ game.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- 聊天室 -->
        <div class="md:col-span-2 group relative overflow-hidden rounded-[32px] bg-zinc-900 dark:bg-white border border-transparent hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer p-6 flex flex-col md:flex-row md:items-center justify-between gap-5" @click="router.push('/chat')">

          <div class="flex items-start gap-5 flex-1 min-w-0">
            <div class="w-12 h-12 rounded-xl bg-white/10 dark:bg-black/5 flex items-center justify-center group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-500/20 transition-colors shrink-0 mt-0.5">
              <svg class="w-6 h-6 text-white dark:text-black group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <h3 class="text-xl font-bold tracking-tight text-white dark:text-black group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                  {{ $t('home.features.chat.title') }}
                </h3>
                <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  142 在线
                </div>
              </div>
              <p class="text-zinc-400 dark:text-zinc-500 text-sm mb-3 leading-relaxed">
                {{ $t('home.features.chat.desc') }}
              </p>
              <!-- 最近消息预览 -->
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="flex -space-x-2 shrink-0">
                  <div v-for="n in 4" :key="n" class="w-7 h-7 rounded-full border-2 border-zinc-900 dark:border-white bg-zinc-600 dark:bg-zinc-300 overflow-hidden">
                    <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${n * 11}`" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                    <span class="font-semibold text-zinc-300 dark:text-zinc-600 truncate max-w-[120px]">Alice, Bob, Chris +1</span>
                    <span>·</span>
                    <span class="shrink-0">刚刚</span>
                  </div>
                  <p class="text-[10px] text-zinc-600 dark:text-zinc-500 truncate max-w-[200px]">这个项目太棒了，期待下一个版本 🚀</p>
                </div>
              </div>
            </div>
          </div>

          <button class="relative overflow-hidden shrink-0 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 text-black dark:text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg">
            <span class="relative z-10">{{ $t('home.features.chat.action') }}</span>
          </button>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { recentPosts, toolCategories, aiModels, gameStats } from '@/data/home';

defineOptions({ name: 'Home' });

const router = useRouter();

const hotGames = [
  { name: 'Flappy Bird', icon: '🐦' },
  { name: '2048', icon: '🎲' },
  { name: 'Tetris', icon: '🧱' },
  { name: 'Snake', icon: '🐍' },
  { name: 'Pong', icon: '🏓' },
];
</script>

<style scoped>
/* 极光流体呼吸动画 */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(40px, -60px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}
.animation-delay-2000 {
  animation-delay: 4s;
}
.animation-delay-4000 {
  animation-delay: 8s;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}
/* 悬浮呼吸动画 (AI 图标) */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.icon-float {
  animation: float 4s ease-in-out infinite;
}

/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>