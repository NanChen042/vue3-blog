<template>
  <div class="h-full w-full flex items-center justify-center p-4 sm:p-6" style="color: var(--db-text-primary)">
    <div class="w-full max-w-[1280px] h-full bg-white dark:bg-[#09090b] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xl dark:shadow-none flex overflow-hidden relative">

      <!-- Sidebar -->
      <div class="w-80 shrink-0 flex flex-col z-10 transition-colors" style="border-right: 1px solid var(--db-card-border); background: var(--db-card-bg); backdrop-filter: blur(16px);">

        <!-- Top Switcher -->
        <div class="p-4" style="border-bottom: 1px solid var(--db-card-border);">
          <n-tabs type="segment" size="small" v-model:value="activeView">
            <n-tab name="ai" :tab="$t('chat.ai_personas')" />
            <n-tab name="live" :tab="$t('chat.live_rooms')" />
          </n-tabs>
        </div>

        <!-- AI Persona List -->
        <div v-if="activeView === 'ai'" class="flex-1 overflow-y-auto p-3 space-y-1.5 flex flex-col">
          <div
            v-for="persona in aiPersonas"
            :key="persona.id"
            @click="selectChat(persona, 'ai')"
            class="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border"
            :class="activeSession?.id === persona.id
              ? 'border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
              : 'border-transparent bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20'"
          >
            <!-- Active Indicator Bar -->
            <div 
              v-if="activeSession?.id === persona.id" 
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-r-full"
            ></div>

            <div class="flex items-start gap-3.5 p-3">
              <!-- Avatar -->
              <div class="relative shrink-0">
                <n-avatar round :size="40" :src="persona.avatar" class="border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950" />
                <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900" :class="personaDotColor(persona.color)"></div>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <h4 
                    class="text-xs font-bold truncate leading-none transition-colors"
                    :class="activeSession?.id === persona.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-800 dark:text-zinc-200'"
                  >
                    {{ locale === 'zh' ? persona.nameZh : persona.name }}
                  </h4>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-md scale-95 origin-right transition-colors" :class="badgeClass(persona.color)">
                    {{ locale === 'zh' ? persona.badgeZh : persona.badge }}
                  </span>
                </div>
                <p class="text-[11px] text-zinc-400 dark:text-zinc-500 truncate leading-relaxed">
                  {{ locale === 'zh' ? persona.taglineZh : persona.tagline }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Rooms List -->
        <div v-else class="flex-1 overflow-y-auto p-3 space-y-1.5 flex flex-col">
          <div class="flex items-center justify-between px-2 pb-2">
            <h3 class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{{ $t('chat.public_channels') }}</h3>
            <n-button 
              size="tiny"
              secondary
              @click="createRoom"
            >
              {{ $t('chat.new_room') }}
            </n-button>
          </div>

          <div
            v-for="room in liveRooms" :key="room.id"
            @click="selectChat(room, 'live')"
            class="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border"
            :class="activeSession?.id === room.id 
              ? 'border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs' 
              : 'border-transparent bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20'">
            <!-- Active Indicator Bar -->
            <div 
              v-if="activeSession?.id === room.id" 
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-r-full"
            ></div>

            <div class="flex items-center gap-3.5 p-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-base bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                #
              </div>
              <div class="flex-1 min-w-0">
                <h4 
                  class="text-xs font-bold truncate leading-none mb-1 transition-colors"
                  :class="activeSession?.id === room.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-800 dark:text-zinc-200'"
                >
                  {{ room.name }}
                </h4>
                <p class="text-[10px] text-zinc-450 dark:text-zinc-500 truncate">{{ room.online }} {{ $t('chat.online') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Pinned to Bottom -->
        <div class="p-3 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/20 dark:bg-zinc-900/10 shrink-0">
          <button
            type="button"
            @click="router.push('/settings')"
            class="w-full flex items-center gap-3 p-2.5 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-all outline-none"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span class="text-xs font-semibold">{{ $t('chat.ai_settings') }}</span>
            <svg class="w-3.5 h-3.5 ml-auto opacity-50 text-zinc-400 group-hover:text-zinc-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col min-w-0 relative bg-white dark:bg-[#09090b] z-0 transition-colors">

      <template v-if="activeSession">
        <!-- Chat Header -->
        <header class="h-14 flex items-center justify-between px-6 border-b border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 transition-colors shrink-0 z-10 bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md sticky top-0 w-full">
          <div class="flex items-center gap-2.5">
            <span class="text-zinc-850 dark:text-zinc-100 font-semibold text-sm">
              {{ activeMode === 'ai' ? (locale === 'zh' ? activePersona?.nameZh : activePersona?.name) : activeRoomName }}
            </span>
            <span v-if="activeMode === 'live'" class="px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider">
              {{ $t('chat.live') }}
            </span>
            <span v-else class="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-550 dark:text-zinc-450 text-[10px] font-semibold border border-zinc-200 dark:border-zinc-700/30 uppercase tracking-wider">
              AI Agent
            </span>
          </div>
          <button @click="clearHistory" class="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none" :title="$t('chat.clear_chat')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </header>

        <!-- Messages Area (No-bubble flow) -->
        <div class="flex-1 overflow-y-auto px-6 pt-4 pb-4 scroll-smooth" ref="messagesContainer">
          <div class="max-w-3xl mx-auto py-6 flex flex-col gap-8 pb-36 w-full">
            
            <!-- API not configured notice -->
            <div v-if="activeMode === 'ai' && !hasApiKey" class="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-sm text-amber-700 dark:text-amber-400 w-full">
              <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <div>
                <span class="font-semibold">{{ $t('chat.api_not_configured') }}</span>
                <br />
                <button @click="router.push('/settings')" class="underline underline-offset-2 mt-1 inline-block hover:no-underline">{{ $t('chat.go_to_settings') }}</button>
              </div>
            </div>

            <!-- Message Loop -->
            <div v-for="msg in currentMessages" :key="msg.id" class="flex gap-4 sm:gap-6 group">
              
              <!-- Left side: Avatar in styled circle box -->
              <div 
                v-if="!msg.isSelf" 
                class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border"
                :class="`bg-${activePersona?.color || 'indigo'}-50 dark:bg-${activePersona?.color || 'indigo'}-950/20 border-${activePersona?.color || 'indigo'}-100 dark:border-${activePersona?.color || 'indigo'}-900/20 text-${activePersona?.color || 'indigo'}-600 dark:text-${activePersona?.color || 'indigo'}-400`"
              >
                <n-avatar round :size="24" :src="activePersona?.avatar" class="bg-transparent" />
              </div>
              
              <div 
                v-else 
                class="w-8 h-8 rounded-full bg-zinc-150 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-250/30 dark:border-zinc-700/50"
              >
                <n-avatar round :size="24" :src="authStore.userInfo?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'" class="bg-transparent" />
              </div>

              <!-- Right side: Content flow -->
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-zinc-900 dark:text-zinc-150 text-sm mb-1">
                  {{ msg.isSelf ? (authStore.userInfo?.username || (locale === 'zh' ? '我' : 'You')) : msg.sender }}
                </div>
                
                <div class="prose prose-slate dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed text-[15px]">
                  <!-- User text -->
                  <div v-if="msg.isSelf" class="whitespace-pre-wrap break-words">{{ msg.content }}</div>
                  <!-- AI Markdown text -->
                  <div v-else class="chat-markdown break-words" v-html="md.render(msg.content)"></div>
                  <!-- Typing cursor for streaming -->
                  <span v-if="msg.isStreaming" class="inline-block w-1.5 h-3.5 ml-0.5 bg-current animate-pulse rounded-sm align-middle"></span>
                </div>

                <!-- Action Toolbar -->
                <div v-if="!msg.isSelf" class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  <button @click="copyMessageText(msg.content)" class="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none" title="Copy message">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Input Area (Immersive Floating) -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#09090b] dark:via-[#09090b]/80 pt-10 pb-6 px-4 sm:px-6 shrink-0 z-20">
          
          <!-- Stop Button -->
          <div v-if="activeMode === 'ai' && (isAiThinking || streamingMessageId)" class="flex justify-center absolute -top-4 left-0 right-0 z-30">
            <button @click="stopGenerating" class="px-4 py-1.5 bg-zinc-850/90 dark:bg-zinc-150/90 hover:bg-zinc-900 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-semibold flex items-center gap-2 rounded-xl shadow-lg backdrop-blur-md transition-all">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
              {{ locale === 'zh' ? '停止生成' : 'Stop Generating' }}
            </button>
          </div>

          <div v-if="activeMode === 'live' && !authStore.isLoggedIn" class="max-w-3xl mx-auto py-4 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
            <p class="text-sm font-medium text-zinc-650 dark:text-zinc-400 mb-2">{{ $t('chat.login_required') }}</p>
            <button @click="router.push('/login')" class="px-5 py-2 inline-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-sm">
              {{ $t('chat.login_btn') }}
            </button>
          </div>

          <form v-else @submit.prevent="sendMessage" class="relative max-w-3xl mx-auto">
            <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-350 dark:focus-within:border-zinc-700 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.02)] focus-within:shadow-[0_0_25px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col">
              
              <textarea
                v-model="composeText"
                @input="adjustInputHeight"
                @keydown.enter.exact.prevent="sendMessage"
                :placeholder="$t('chat.type_message')"
                class="chat-input-textarea w-full max-h-40 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none px-4 py-4 text-[15px] outline-none placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-800 dark:text-zinc-100"
                rows="1"
                :disabled="activeMode === 'ai' && isAiThinking"
              ></textarea>

              <!-- Bottom Toolbar -->
              <div class="flex items-center justify-between px-3 pb-3 pt-1 border-t border-zinc-100/50 dark:border-zinc-800/30">
                <!-- Left: Emoji & Model selector -->
                <div class="flex items-center gap-1">
                  <!-- Emoji Button -->
                  <div class="relative shrink-0 flex items-center justify-center">
                    <button type="button" @click="showEmoji = !showEmoji" class="p-2 text-zinc-400 hover:text-zinc-755 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-lg transition-colors outline-none z-10 relative">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    <div v-if="showEmoji" class="absolute bottom-full left-0 mb-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded-2xl p-3 w-[280px] max-h-60 overflow-y-auto z-50 flex flex-wrap gap-1.5">
                      <button type="button" v-for="e in emojis" :key="e" @click="addEmoji(e)" class="text-xl w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg hover:scale-110 transition-all origin-center">{{ e }}</button>
                    </div>
                    <div v-if="showEmoji" @click="showEmoji = false" class="fixed inset-0 z-40"></div>
                  </div>

                  <!-- Model Badge -->
                  <button 
                    v-if="activeMode === 'ai'"
                    type="button"
                    @click="router.push('/settings')"
                    class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 transition-colors ml-1 outline-none"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {{ activeModelName }}
                    <svg class="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div 
                    v-else 
                    class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {{ activeRoomName }}
                  </div>
                </div>

                <!-- Right: send shortcut & Send Button -->
                <div class="flex items-center gap-3">
                  <span class="text-xs text-zinc-400 dark:text-zinc-500 hidden sm:block font-medium select-none">↵ Send</span>
                  <button 
                    type="submit"
                    :disabled="!composeText.trim() || isSending || (activeMode === 'ai' && isAiThinking)"
                    class="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 p-2 rounded-xl transition-colors flex items-center justify-center outline-none active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <svg v-if="isSending || isAiThinking" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </form>
          
          <!-- Disclaimer -->
          <div class="text-center mt-3 select-none">
            <span class="text-[11px] text-zinc-400 dark:text-zinc-500">
              {{ activeMode === 'ai' ? 'AI 可能会生成不准确的信息。请核实重要的医学或建议。' : '公共聊天室，请文明发言。' }}
            </span>
          </div>

        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-90">
        <div class="w-20 h-20 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-xl mb-6 border border-zinc-100 dark:border-zinc-800">
          <svg class="w-10 h-10 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-zinc-800 dark:text-white mb-2">{{ $t('chat.welcome') }}</h2>
        <p class="text-zinc-500 max-w-md">{{ $t('chat.welcome_desc') }}</p>
      </div>

    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'naive-ui';
import { createChatCompletionStream } from '@/api/chat';
import { aiPersonas } from '@/data/ai-personas';
import type { AIPersona } from '@/data/ai-personas';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const message = useMessage();
const md = new MarkdownIt();

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const code = token.content.trim();
  const lang = token.info.trim();
  
  let highlighted = md.utils.escapeHtml(code);
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } catch (e) {}
  }

  return `
    <div class="code-block-wrapper my-4 rounded-xl overflow-hidden bg-[#282c34] text-[#abb2bf] shadow-sm border border-zinc-700/50">
      <div class="flex items-center justify-between px-4 py-2 bg-[#21252b] text-zinc-400 text-xs font-sans">
        <span class="font-mono">${lang || 'text'}</span>
        <button class="copy-btn flex items-center gap-1 hover:text-zinc-200 transition-colors" data-code="${encodeURIComponent(code)}">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span class="copy-text">Copy code</span>
        </button>
      </div>
      <div class="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <pre class="hljs !bg-transparent !p-0 !m-0"><code class="language-${lang}">${highlighted}</code></pre>
      </div>
    </div>
  `;
};

let activeAbortController: AbortController | null = null;

const stopGenerating = () => {
  if (activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
    isSending.value = false;
    isAiThinking.value = false;
    if (streamingMessageId.value && activeSession.value) {
      const msgObj = messageHistory.value[activeSession.value.id]?.find(m => m.id === streamingMessageId.value);
      if (msgObj) msgObj.isStreaming = false;
      streamingMessageId.value = null;
    }
  }
};

defineOptions({ name: 'Chat' });

const router = useRouter();
const authStore = useAuthStore();
const { t, locale } = useI18n();

const activeView = ref<'ai' | 'live'>('ai');
const activeMode = ref<'ai' | 'live'>('ai');
const activeSession = ref<AIPersona | any | null>(null);
const activeModelName = computed(() => {
  const fullModel = localStorage.getItem('chat_model') || 'Qwen/Qwen2.5-7B-Instruct';
  const parts = fullModel.split('/');
  return parts[parts.length - 1];
});

const messagesContainer = ref<HTMLElement | null>(null);
const composeText = ref('');
const isSending = ref(false);
const isAiThinking = ref(false);
const showEmoji = ref(false);
const streamingMessageId = ref<number | null>(null);

const emojis = ['😀','😂','😅','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','💩','👻','💀','👽','👾','🤖','🎃','😺','😸','😹','😻','😼'];

const addEmoji = (e: string) => {
  composeText.value += e;
  showEmoji.value = false;
};

const liveRooms = ref([
  { id: 'room-global', name: t('chat.room_1'), online: 142 },
  { id: 'room-vue', name: t('chat.room_2'), online: 38 },
  { id: 'room-design', name: t('chat.room_3'), online: 15 },
]);

// 消息历史
const messageHistory = ref<Record<string, any[]>>({});

// API Key 存储
const API_KEY_STORAGE = 'chat_api_key';

const hasApiKey = ref(false);

const handleGlobalClick = async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const copyBtn = target.closest('.copy-btn');
  if (copyBtn) {
    const code = decodeURIComponent(copyBtn.getAttribute('data-code') || '');
    try {
      await navigator.clipboard.writeText(code);
      const span = copyBtn.querySelector('.copy-text');
      if (span) {
        const originalText = span.textContent;
        span.textContent = locale.value === 'zh' ? '已复制！' : 'Copied!';
        setTimeout(() => { span.textContent = originalText; }, 2000);
      }
    } catch (err) {
      message.error(t('chat.api_error_default'));
    }
  }
};

const copyMessageText = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    message.success(locale.value === 'zh' ? '已复制！' : 'Copied!');
  } catch (err) {
    message.error(locale.value === 'zh' ? '复制失败' : 'Failed to copy');
  }
};

const CHAT_STATE_STORAGE = 'chat_state';

onMounted(() => {
  hasApiKey.value = !!localStorage.getItem(API_KEY_STORAGE);
  document.addEventListener('click', handleGlobalClick);

  const savedState = localStorage.getItem(CHAT_STATE_STORAGE);
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      if (parsed.messageHistory) messageHistory.value = parsed.messageHistory;
      if (parsed.activeMode) activeMode.value = parsed.activeMode;
      if (parsed.activeView) activeView.value = parsed.activeView;
      
      if (parsed.activeSessionId) {
        if (parsed.activeMode === 'ai') {
          const p = aiPersonas.find(p => p.id === parsed.activeSessionId);
          if (p) activeSession.value = p;
        } else {
          const r = liveRooms.value.find(r => r.id === parsed.activeSessionId);
          if (r) activeSession.value = r;
        }
      }
    } catch(e) {}
  }
});

watch([messageHistory, activeMode, activeSession, activeView], () => {
  localStorage.setItem(CHAT_STATE_STORAGE, JSON.stringify({
    messageHistory: messageHistory.value,
    activeMode: activeMode.value,
    activeView: activeView.value,
    activeSessionId: activeSession.value?.id
  }));
}, { deep: true });

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});

const currentMessages = computed(() => {
  if (!activeSession.value) return [];
  return messageHistory.value[activeSession.value.id] || [];
});


const activePersona = computed<AIPersona | null>(() => {
  if (activeMode.value !== 'ai' || !activeSession.value) return null;
  return activeSession.value as AIPersona;
});

const activeRoomName = computed(() => {
  if (activeMode.value !== 'live' || !activeSession.value) return '';
  return (activeSession.value as any).name || '';
});

const selectChat = (item: AIPersona | any, mode: 'ai' | 'live') => {
  activeSession.value = item;
  activeMode.value = mode;
  if (!messageHistory.value[item.id]) {
    messageHistory.value[item.id] = [];
    if (mode === 'ai') {
      const persona = item as AIPersona;
      messageHistory.value[item.id].push({
        id: Date.now(),
        sender: locale.value === 'zh' ? persona.nameZh : persona.name,
        avatar: persona.avatar,
        content: locale.value === 'zh' ? persona.welcomeZh : persona.welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
        isStreaming: false,
      });
    } else {
      messageHistory.value[item.id].push({
        id: Date.now(),
        sender: 'System',
        avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Sys',
        content: t('chat.sys_welcome'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
        isStreaming: false,
      });
    }
  }
  scrollToBottom();
  nextTick(() => {
    adjustInputHeight();
  });
};

const clearHistory = () => {
  if (!activeSession.value) return;
  messageHistory.value[activeSession.value.id] = [];
  if (activeMode.value === 'ai') {
    const persona = activeSession.value as AIPersona;
    messageHistory.value[activeSession.value.id].push({
      id: Date.now(),
      sender: locale.value === 'zh' ? persona.nameZh : persona.name,
      avatar: persona.avatar,
      content: locale.value === 'zh' ? persona.welcomeZh : persona.welcome,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: false,
      isStreaming: false,
    });
  }
};

const createRoom = () => {
  if (!authStore.isLoggedIn) {
    message.warning(t('chat.must_login'));
    return;
  }
  const name = window.prompt(t('chat.enter_room_name'));
  if (name) {
    const newRoom = { id: `room-${Date.now()}`, name, online: 1 };
    liveRooms.value.unshift(newRoom);
    messageHistory.value[newRoom.id] = [
      { id: Date.now(), sender: 'System', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Sys', content: `${authStore.userInfo?.nickname || authStore.userInfo?.username} ${t('chat.created_room')}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isSelf: false, isStreaming: false }
    ];
    selectChat(newRoom, 'live');
    activeView.value = 'live';
  }
};

const adjustInputHeight = (e?: Event) => {
  const target = (e?.target || document.querySelector('.chat-input-textarea')) as HTMLTextAreaElement | null;
  if (!target) return;
  target.style.height = 'auto';
  const newHeight = Math.min(target.scrollHeight, 160);
  target.style.height = `${newHeight}px`;
};

const sendMessage = async () => {
  if (!composeText.value.trim() || !activeSession.value) return;
  if (activeMode.value === 'live' && !authStore.isLoggedIn) {
    message.error(t('chat.login_req_toast'));
    return;
  }

  isSending.value = true;
  const content = composeText.value;
  composeText.value = '';
  nextTick(() => {
    adjustInputHeight();
  });

  const selfAvatar = authStore.userInfo?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest';
  const selfName = authStore.userInfo?.nickname || authStore.userInfo?.username || 'Guest';

  // Add user message
  messageHistory.value[activeSession.value.id].push({
    id: Date.now(),
    sender: selfName,
    avatar: selfAvatar,
    content,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSelf: true,
    isStreaming: false,
  });

  scrollToBottom();

  if (activeMode.value === 'ai') {
    await handleAiResponse(content);
  } else {
    isSending.value = false;
    if (Math.random() > 0.4) {
      setTimeout(() => {
        messageHistory.value[activeSession.value.id].push({
          id: Date.now(),
          sender: 'Random User ' + Math.floor(Math.random() * 100),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
          content: t('chat.sys_mock_random'),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: false,
          isStreaming: false,
        });
        scrollToBottom();
      }, 1500);
    }
  }
};

const handleAiResponse = async (userContent: string) => {
  const apiKey = localStorage.getItem(API_KEY_STORAGE);
  if (!apiKey) {
    isSending.value = false;
    message.error(t('chat.api_not_configured'));
    return;
  }

  const persona = activeSession.value as AIPersona;
  const model = localStorage.getItem('chat_model') || 'Qwen/Qwen2.5-7B-Instruct';

  // Build messages
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
  messages.push({ role: 'system', content: persona.systemPrompt });

  // Include chat history (last 10 messages)
  const history = messageHistory.value[activeSession.value.id]
    .slice(-10)
    .filter(m => !m.isStreaming);
  for (const msg of history) {
    messages.push({ role: msg.isSelf ? 'user' : 'assistant', content: msg.content });
  }
  messages.push({ role: 'user', content: userContent });

  // Add placeholder for streaming response
  const streamingMsgId = Date.now() + Math.random();
  messageHistory.value[activeSession.value.id].push({
    id: streamingMsgId,
    sender: locale.value === 'zh' ? persona.nameZh : persona.name,
    avatar: persona.avatar,
    content: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSelf: false,
    isStreaming: true,
  });

  isSending.value = false;
  isAiThinking.value = false;
  streamingMessageId.value = streamingMsgId;
  scrollToBottom();

  let fullContent = '';
  activeAbortController = new AbortController();

  await new Promise<void>((resolve) => {
    createChatCompletionStream(
      apiKey,
      { model, messages, temperature: 0.7, max_tokens: 1024 },
      (chunk) => {
        fullContent += chunk;
        const msgObj = messageHistory.value[activeSession.value.id].find(m => m.id === streamingMsgId);
        if (msgObj) msgObj.content = fullContent;
        scrollToBottom();
      },
      () => {
        const msgObj = messageHistory.value[activeSession.value.id].find(m => m.id === streamingMsgId);
        if (msgObj) msgObj.isStreaming = false;
        streamingMessageId.value = null;
        activeAbortController = null;
        resolve();
      },
      (err: any) => {
        if (err.name === 'AbortError') {
          resolve();
          return;
        }
        const msgObj = messageHistory.value[activeSession.value.id].find(m => m.id === streamingMsgId);
        if (msgObj) {
          msgObj.content = t('chat.api_error') + (err?.message || err?.response?.data?.error?.message || t('chat.api_error_default'));
          msgObj.isStreaming = false;
        }
        streamingMessageId.value = null;
        activeAbortController = null;
        resolve();
      },
      activeAbortController!.signal
    );
  });
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Persona color helpers

const personaDotColor = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-400',
    violet: 'bg-violet-400',
    amber: 'bg-amber-400',
    emerald: 'bg-emerald-400',
    rose: 'bg-rose-400',
    cyan: 'bg-cyan-400',
    slate: 'bg-slate-400',
  };
  return map[color] || 'bg-indigo-400';
};



const badgeClass = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
    violet: 'bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400',
    rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400',
    cyan: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  };
  return map[color] || 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400';
};
</script>

<style>
@reference "../../style.css";

.chat-markdown {
  @apply text-[14.5px] leading-relaxed text-zinc-800 dark:text-zinc-200;
}
.chat-markdown p {
  @apply mb-3 last:mb-0;
}
.chat-markdown code {
  @apply bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[13px] text-indigo-600 dark:text-indigo-400 font-mono font-medium;
}
.chat-markdown pre:not(.hljs) {
  @apply bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 font-mono text-[13px] text-zinc-800 dark:text-zinc-200 overflow-x-auto my-3;
}
.chat-markdown pre code {
  @apply p-0 bg-transparent text-current text-[13px] dark:bg-transparent rounded-none;
}
.chat-markdown h1, .chat-markdown h2, .chat-markdown h3 {
  @apply font-bold mt-4 mb-2 text-zinc-900 dark:text-white;
}
.chat-markdown h1 { @apply text-lg; }
.chat-markdown h2 { @apply text-base; }
.chat-markdown h3 { @apply text-sm; }
.chat-markdown ul {
  @apply list-disc list-outside ml-5 mb-3 space-y-1.5;
}
.chat-markdown ol {
  @apply list-decimal list-outside ml-5 mb-3 space-y-1.5;
}
.chat-markdown li {
  @apply pl-0.5;
}
.chat-markdown blockquote {
  @apply border-l-4 border-indigo-500 bg-zinc-50 dark:bg-zinc-800/20 px-4 py-2 rounded-r-lg italic text-zinc-600 dark:text-zinc-300 my-3;
}
.chat-markdown a {
  @apply text-indigo-500 hover:underline;
}
.chat-markdown hr {
  @apply my-4 border-t border-zinc-200/60 dark:border-zinc-800/80;
}
.chat-markdown strong {
  @apply font-bold text-zinc-900 dark:text-white;
}
</style>
