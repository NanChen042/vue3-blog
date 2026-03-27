<template>
  <div class="relative min-h-screen bg-[#FDFDFD] dark:bg-[#000000] overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">

    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>

    <section class="relative z-10 flex flex-col items-center text-center pt-32 pb-24 px-6 max-w-5xl mx-auto">

      <div class="group flex items-center gap-3 px-4 py-1.5 mb-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0A] cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300 shadow-sm">
        <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
        <span class="text-xs font-mono font-medium tracking-widest uppercase text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
          {{ $t('home.hero.badge') }}
        </span>
      </div>

      <h1 class="text-[4rem] sm:text-[5.5rem] lg:text-[7rem] font-extrabold tracking-tighter leading-[1.05] text-zinc-900 dark:text-white mb-8">
        {{ $t('home.hero.title_prefix') }}<br />
        <span class="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
        {{ $t('home.hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-4">
        <button class="w-full sm:w-auto px-8 py-3.5 rounded-[18px] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
          {{ $t('home.hero.primary_btn') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        <button class="w-full sm:w-auto px-8 py-3.5 rounded-[18px] bg-white/50 dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200">
          {{ $t('home.hero.secondary_btn') }}
        </button>
      </div>
    </section>

    <section class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pb-40">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[300px]">

        <div class="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 cursor-pointer p-10 flex flex-col justify-between">

          <div class="absolute right-0 top-0 w-2/3 h-full pointer-events-none overflow-hidden flex items-center justify-end pr-10">
            <div class="relative w-[300px] h-[300px] border border-zinc-100 dark:border-zinc-800 rounded-full flex items-center justify-center">
              <div class="w-[200px] h-[200px] border border-zinc-100 dark:border-zinc-800 rounded-full"></div>
              <div class="w-[100px] h-[100px] border border-zinc-200 dark:border-zinc-700 rounded-full border-dashed group-hover:rotate-180 transition-transform duration-[3s] ease-in-out"></div>
              <div class="absolute top-1/2 left-1/2 w-[150px] h-[1px] bg-indigo-500 origin-left animate-[spin_4s_linear_infinite] opacity-50"></div>
              <div class="absolute w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1] top-[20%] left-[70%] group-hover:scale-150 transition-transform duration-500"></div>
              <div class="absolute w-1.5 h-1.5 bg-zinc-900 dark:bg-white rounded-full top-[60%] left-[20%] group-hover:scale-150 transition-transform duration-500 delay-100"></div>
            </div>
          </div>

          <div class="relative z-10">
            <div class="w-14 h-14 mb-6 rounded-2xl bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-colors duration-500">
              <svg class="w-7 h-7 text-indigo-600 dark:text-indigo-400 icon-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-mono tracking-widest text-zinc-500">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
            </div>
          </div>

          <div class="relative z-10 max-w-sm">
            <h3 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ $t('home.features.lab.title') }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
              {{ $t('home.features.lab.desc') }}
            </p>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between">
          <div class="absolute right-6 top-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            <div class="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 flex flex-col gap-1">
              <span>> init_system()</span>
              <span class="text-blue-500 group-hover:animate-pulse">Loading dependencies...</span>
              <span class="w-2 h-3 bg-zinc-400 dark:bg-zinc-500 animate-pulse mt-1"></span>
            </div>
          </div>

          <div class="mt-auto relative z-10">
            <div class="w-12 h-12 mb-5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM14 4v5h5M8 12h8m-8 4h6" />
              </svg>
            </div>
            <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ $t('home.features.blog.title') }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              {{ $t('home.features.blog.desc') }}
            </p>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between">
          <div class="absolute right-6 top-6 w-24 h-24 pointer-events-none">
            <div class="absolute inset-0 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#0A0A0A] translate-x-0 translate-y-0 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 z-20 flex items-center justify-center">
              <div class="w-4 h-4 rounded-sm border border-emerald-400"></div>
            </div>
            <div class="absolute inset-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500 z-10"></div>
          </div>

          <div class="mt-auto relative z-10">
            <div class="w-12 h-12 mb-5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors">
              <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {{ $t('home.features.tools.title') }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              {{ $t('home.features.tools.desc') }}
            </p>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between">
          <div class="absolute inset-x-0 top-0 h-1/2 flex items-center justify-center pointer-events-none">
            <div class="relative w-full h-full">
              <div class="absolute top-[30%] left-[30%] w-16 h-16 rounded-xl border border-zinc-300 dark:border-zinc-700 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-700 ease-out"></div>
              <div class="absolute top-[35%] left-[35%] w-16 h-16 rounded-xl bg-zinc-900 dark:bg-white group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-700 ease-out flex items-center justify-center shadow-lg">
                <div class="w-3 h-3 bg-white dark:bg-black rounded-full"></div>
              </div>
              <div class="absolute top-[60%] right-[30%] w-8 h-8 rounded-lg border border-zinc-300 dark:border-zinc-700 group-hover:rotate-45 transition-transform duration-500"></div>
            </div>
          </div>

          <div class="mt-auto relative z-10">
            <div class="w-12 h-12 mb-5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 group-hover:border-rose-200 dark:group-hover:border-rose-800 transition-colors">
              <svg class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {{ $t('home.features.games.title') }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              {{ $t('home.features.games.desc') }}
            </p>
          </div>
        </div>

        <div class="md:col-span-2 group relative overflow-hidden rounded-[32px] bg-zinc-900 dark:bg-white border border-transparent hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div class="flex items-center gap-6">
            <div class="w-14 h-14 rounded-2xl bg-white/10 dark:bg-black/5 flex items-center justify-center group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-500/20 transition-colors">
              <svg class="w-7 h-7 text-white dark:text-black group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold tracking-tight text-white dark:text-black mb-1 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                {{ $t('home.features.chat.title') }}
              </h3>
              <p class="text-zinc-400 dark:text-zinc-500 text-sm md:text-base max-w-sm">
                {{ $t('home.features.chat.desc') }}
              </p>
            </div>
          </div>

          <button class="relative overflow-hidden shrink-0 px-8 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 text-black dark:text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200">
            <span class="relative z-10">{{ $t('home.features.chat.action') }}</span>
          </button>
        </div>

      </div>
    </section>
  </div>
</template>

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
</style>