<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden selection:bg-indigo-500/20">

    <!-- Background ambient blobs -->
    <div class="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px]"></div>
    <div class="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-400/10 dark:bg-violet-500/10 blur-[120px]"></div>

    <!-- ============================================
         HERO SECTION
         ============================================ -->
    <section class="relative z-10 flex flex-col items-center text-center pt-28 pb-20 px-6 sm:pt-36 sm:pb-28 max-w-4xl mx-auto">

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
        <span class="text-[11px] font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400">{{ $t('home.hero.badge') }}</span>
      </div>

      <!-- Headline -->
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
        {{ $t('home.hero.title_prefix') }}
        <span class="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <!-- Description -->
      <p class="max-w-xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
        {{ $t('home.hero.description') }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center gap-3">
        <button class="w-full sm:w-auto px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
          {{ $t('home.hero.primary_btn') }}
        </button>
        <button class="w-full sm:w-auto px-7 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
          {{ $t('home.hero.secondary_btn') }}
        </button>
      </div>
    </section>

    <!-- ============================================
         BENTO FEATURE GRID
         ============================================ -->
    <section class="relative z-10 max-w-6xl mx-auto px-6 pb-32">

      <!-- Dot grid backdrop -->
      <div class="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"></div>

      <div class="relative grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[minmax(220px,auto)]">

        <!-- AI Laboratory — large card -->
        <div class="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer">
          <!-- rotating border glow on hover -->
          <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 [background:conic-gradient(from_var(--border-angle,0deg),transparent_60%,rgba(99,102,241,0.4)_70%,transparent_80%)] card-spin"></div>
          <!-- inner content -->
          <div class="relative h-full flex flex-col justify-between p-8 sm:p-10">
            <!-- soft ambient -->
            <div class="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-400/10 dark:bg-indigo-500/15 blur-[60px] group-hover:opacity-80 transition-opacity duration-700"></div>
            <div class="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-violet-400/10 dark:bg-violet-500/15 blur-[60px] group-hover:opacity-80 transition-opacity duration-700"></div>

            <!-- Top row: icon + status badge -->
            <div class="relative flex items-start justify-between">
              <div class="w-13 h-13 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                <svg class="w-7 h-7 text-indigo-600 dark:text-indigo-400 icon-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </div>
            </div>

            <!-- Bottom: title + desc -->
            <div class="relative">
              <h3 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300">
                {{ $t('home.features.lab.title') }}
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                {{ $t('home.features.lab.desc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tech Blog card -->
        <div class="md:col-span-2 group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-slate-500/10 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer">
          <div class="relative h-full flex flex-col justify-center p-8 sm:p-10">
            <div class="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-[50px]"></div>
            <div class="flex items-center gap-5">
              <div class="shrink-0 w-13 h-13 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 4v5h5M8 12h8m-8 4h6" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {{ $t('home.features.blog.title') }}
                </h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-snug">
                  {{ $t('home.features.blog.desc') }}
                </p>
              </div>
              <div class="hidden sm:flex shrink-0 w-9 h-9 rounded-xl border border-slate-100 dark:border-slate-800 items-center justify-center text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3 transition-all duration-300">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Toolkit card -->
        <div class="group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer">
          <div class="relative h-full flex flex-col justify-between p-8">
            <div class="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="w-13 h-13 flex items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div class="relative">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {{ $t('home.features.tools.title') }}
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-snug">
                {{ $t('home.features.tools.desc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Game Lounge card -->
        <div class="group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer">
          <div class="relative h-full flex flex-col justify-between p-8">
            <div class="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-rose-400/10 dark:bg-rose-500/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="w-13 h-13 flex items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <svg class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="relative">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                {{ $t('home.features.games.title') }}
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-snug">
                {{ $t('home.features.games.desc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Live Chatroom — full-width banner -->
        <div class="md:col-span-4 group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
          <div class="relative min-h-[160px] flex items-center p-8 sm:p-12">
            <!-- subtle radial gradient accent -->
            <div class="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_60%_50%,rgba(99,102,241,0.07),transparent_70%)] group-hover:[background:radial-gradient(ellipse_at_60%_50%,rgba(99,102,241,0.12),transparent_70%)] transition-all duration-700"></div>

            <div class="relative w-full flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-6">
                <div class="relative shrink-0">
                  <div class="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping [animation-duration:2s]"></div>
                  <div class="relative w-13 h-13 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                    <svg class="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                    {{ $t('home.features.chat.title') }}
                  </h3>
                  <p class="text-slate-500 dark:text-slate-400 text-base max-w-lg leading-relaxed">
                    {{ $t('home.features.chat.desc') }}
                  </p>
                </div>
              </div>

              <button class="shrink-0 relative overflow-hidden px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
                <span class="relative z-10">{{ $t('home.features.chat.action') }}</span>
                <div class="absolute inset-0 btn-shimmer opacity-0 group-hover:opacity-100"></div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* Floating animation for AI icon */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.icon-float {
  animation: float 3.5s ease-in-out infinite;
}

/* Rotating border for AI card */
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes spin-border {
  to { --border-angle: 360deg; }
}
.card-spin {
  animation: spin-border 6s linear infinite;
}

/* Shimmer overlay for chat button */
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
.btn-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
  animation: shimmer 1.8s ease-in-out infinite;
}
</style>