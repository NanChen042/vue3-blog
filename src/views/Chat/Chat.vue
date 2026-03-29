<template>
  <div class="h-full w-full flex bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-hidden relative">

    <!-- Sidebar -->
    <div class="w-80 shrink-0 border-r border-zinc-200/60 dark:border-white/5 flex flex-col bg-white dark:bg-black/20 z-10 transition-colors">

      <!-- Top Switcher -->
      <div class="p-4 border-b border-zinc-200/60 dark:border-white/5">
        <div class="flex p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
          <button
            @click="activeView = 'ai'"
            class="flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all text-center"
            :class="activeView === 'ai' ? 'bg-white dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'">
            {{ $t('chat.ai_personas') }}
          </button>
          <button
            @click="activeView = 'live'"
            class="flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all text-center"
            :class="activeView === 'live' ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'">
            {{ $t('chat.live_rooms') }}
          </button>
        </div>
      </div>

      <!-- AI Persona List -->
      <div v-if="activeView === 'ai'" class="flex-1 overflow-y-auto p-3 space-y-2">
        <div
          v-for="persona in aiPersonas"
          :key="persona.id"
          @click="selectChat(persona, 'ai')"
          class="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300"
          :class="activeSession?.id === persona.id
            ? `ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 ${personaBorderColor(persona.color)} bg-${persona.color}-50 dark:bg-${persona.color}-500/10`
            : 'bg-zinc-50/60 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700'">

          <div class="flex items-start gap-3 p-3.5">
            <!-- Avatar -->
            <div class="relative shrink-0">
              <el-avatar :size="44" :src="persona.avatar" class="border-2" :class="personaBorderClass(persona.color)" />
              <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900" :class="personaDotColor(persona.color)"></div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <h4 class="text-sm font-bold text-zinc-900 dark:text-white truncate leading-none">
                  {{ locale === 'zh' ? persona.nameZh : persona.name }}
                </h4>
                <span class="shrink-0 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                  :class="personaBadgeClass(persona.color)">
                  {{ locale === 'zh' ? persona.badgeZh : persona.badge }}
                </span>
              </div>
              <p class="text-[11px] text-zinc-500 dark:text-zinc-400 truncate leading-relaxed">
                {{ locale === 'zh' ? persona.taglineZh : persona.tagline }}
              </p>
            </div>
          </div>

          <!-- Capabilities tags (shown when selected) -->
          <div v-if="activeSessionId === persona.id" class="px-3.5 pb-3.5 -mt-1">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="cap in (locale === 'zh' ? persona.capabilitiesZh : persona.capabilities)"
                :key="cap"
                class="px-2 py-0.5 rounded-full text-[9px] font-medium"
                :class="personaCapClass(persona.color)">
                {{ cap }}
              </span>
            </div>
          </div>
        </div>

        <!-- Settings link -->
        <button
          @click="router.push('/settings')"
          class="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all text-sm font-medium group">
          <div class="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <span>{{ $t('chat.ai_settings') }}</span>
          <svg class="w-4 h-4 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Live Rooms List -->
      <div v-else class="flex-1 overflow-y-auto p-3 space-y-1 flex flex-col">
        <div class="flex items-center justify-between px-2 pb-2">
          <h3 class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{{ $t('chat.public_channels') }}</h3>
          <button @click="createRoom" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md transition-colors">
            {{ $t('chat.new_room') }}
          </button>
        </div>

        <div
          v-for="room in liveRooms" :key="room.id"
          @click="selectChat(room, 'live')"
          class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
          :class="activeSession?.id === room.id ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'hover:bg-zinc-50 dark:hover:bg-white/5'">
            <div class="w-10 h-10 rounded-[10px] bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
            #
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-zinc-900 dark:text-white truncate">{{ room.name }}</h4>
            <p class="text-[11px] text-zinc-500 truncate">{{ room.online }} {{ $t('chat.online') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col min-w-0 relative bg-[#fafafa] dark:bg-[#050505] z-0 transition-colors">

      <template v-if="activeSession">
        <!-- Chat Header -->
        <header class="h-16 shrink-0 border-b border-zinc-200/60 dark:border-white/5 flex items-center justify-between px-6 bg-white/60 dark:bg-[#050505]/60 backdrop-blur-xl z-20 absolute top-0 w-full transition-colors">
          <div class="flex items-center gap-3">
            <el-avatar v-if="activeMode === 'ai'" :size="32" :src="activePersona?.avatar" class="border border-zinc-200 dark:border-zinc-700" />
            <div v-else class="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">#</div>
            <h2 class="font-bold text-base text-zinc-800 dark:text-zinc-100">
              {{ activeMode === 'ai' ? (locale === 'zh' ? activePersona?.nameZh : activePersona?.name) : activeRoomName }}
            </h2>
            <span v-if="activeMode === 'live'" class="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              {{ $t('chat.live') }}
            </span>
            <span v-else class="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              {{ $t('chat.ai_bot') }}
            </span>
          </div>
          <button @click="clearHistory" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-medium flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            {{ $t('chat.clear_chat') }}
          </button>
        </header>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto px-6 pt-20 pb-4 space-y-5 scroll-smooth" ref="messagesContainer">

          <!-- API not configured notice -->
          <div v-if="activeMode === 'ai' && !hasApiKey" class="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-sm text-amber-700 dark:text-amber-400 max-w-3xl mx-auto">
            <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <div>
              <span class="font-semibold">{{ $t('chat.api_not_configured') }}</span>
              <br />
              <button @click="router.push('/settings')" class="underline underline-offset-2 mt-1 inline-block hover:no-underline">{{ $t('chat.go_to_settings') }}</button>
            </div>
          </div>

          <div v-for="msg in currentMessages" :key="msg.id"
               class="flex gap-3 max-w-3xl"
               :class="msg.isSelf ? 'ml-auto flex-row-reverse' : ''">

            <!-- Avatar -->
            <el-avatar v-if="!msg.isSelf" :size="34" :src="msg.avatar" class="shrink-0 border border-zinc-200 dark:border-zinc-800" />
            <el-avatar v-else :size="34" :src="msg.avatar" class="shrink-0" :class="activeMode === 'ai' ? 'border-2 border-indigo-200 dark:border-indigo-800' : 'border border-zinc-200 dark:border-zinc-800'" />

            <div class="flex flex-col gap-1 min-w-0" :class="msg.isSelf ? 'items-end' : 'items-start'">
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-semibold text-zinc-500">{{ msg.sender }}</span>
                <span class="text-[10px] text-zinc-400 font-normal">{{ msg.time }}</span>
              </div>

              <!-- Message bubble -->
              <div class="px-4 py-3 text-[14px] leading-relaxed wrap-break-word shadow-sm max-w-[80vw] sm:max-w-[480px]"
                   :class="msg.isSelf
                     ? (activeMode === 'live' ? 'bg-emerald-500 text-white rounded-2xl rounded-tr-[6px]' : 'bg-indigo-500 text-white rounded-2xl rounded-tr-[6px]')
                     : 'bg-white dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-tl-[6px] border border-zinc-100 dark:border-zinc-700/50'">
                <!-- Streaming text -->
                <span>{{ msg.content }}</span>
                <!-- Typing cursor for streaming -->
                <span v-if="msg.isStreaming" class="inline-block w-1.5 h-3.5 ml-0.5 bg-current animate-pulse rounded-sm align-middle"></span>
              </div>
            </div>
          </div>

          <!-- Thinking indicator -->
          <div v-if="isAiThinking && !streamingMessageId" class="flex gap-3 max-w-3xl">
            <el-avatar :size="34" :src="activePersona?.avatar" class="shrink-0 border border-zinc-200 dark:border-zinc-800" />
            <div class="px-4 py-3 bg-white dark:bg-zinc-800/90 rounded-2xl rounded-tl-[6px] border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
              <div class="flex items-center gap-1.5">
                <span class="text-[12px] text-zinc-500 dark:text-zinc-400">{{ $t('chat.thinking') }}</span>
                <div class="flex gap-0.5">
                  <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white/60 dark:bg-[#050505]/60 backdrop-blur-xl border-t border-zinc-200/60 dark:border-white/5 shrink-0 z-20 w-full transition-colors relative">
          <div v-if="activeMode === 'live' && !authStore.isLoggedIn" class="w-full py-4 text-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
            <p class="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">{{ $t('chat.login_required') }}</p>
            <button @click="router.push('/login')" class="px-5 py-2 inline-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-sm">
              {{ $t('chat.login_btn') }}
            </button>
          </div>

          <form v-else @submit.prevent="sendMessage" class="relative max-w-4xl mx-auto flex items-end gap-2">
            <div class="flex-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-300 dark:focus-within:border-zinc-600 rounded-2xl overflow-visible transition-all flex items-end p-1 shadow-sm">

              <!-- Emoji Button -->
              <div class="relative shrink-0 flex items-center justify-center">
                <button type="button" @click="showEmoji = !showEmoji" class="p-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors outline-none z-10 relative">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <div v-if="showEmoji" class="absolute bottom-full left-0 mb-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded-2xl p-3 w-[280px] max-h-60 overflow-y-auto z-50 flex flex-wrap gap-1.5">
                  <button type="button" v-for="e in emojis" :key="e" @click="addEmoji(e)" class="text-xl w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg hover:scale-110 transition-all origin-center">{{ e }}</button>
                </div>
                <div v-if="showEmoji" @click="showEmoji = false" class="fixed inset-0 z-40"></div>
              </div>

              <textarea
                v-model="composeText"
                @keydown.enter.exact.prevent="sendMessage"
                :placeholder="$t('chat.type_message')"
                class="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-2.5 px-2 text-[15px] outline-none placeholder-zinc-400 dark:text-white"
                rows="1"
                :disabled="activeMode === 'ai' && isAiThinking"
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="!composeText.trim() || isSending || (activeMode === 'ai' && isAiThinking)"
              class="w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-sm outline-none"
              :class="activeMode === 'live'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400'">
              <svg v-if="isSending || isAiThinking" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <svg v-else class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </form>
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
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { createChatCompletionStream } from '@/api/chat';
import { aiPersonas } from '@/data/ai-personas';
import type { AIPersona } from '@/data/ai-personas';

defineOptions({ name: 'Chat' });

const router = useRouter();
const authStore = useAuthStore();
const { t, locale } = useI18n();

const activeView = ref<'ai' | 'live'>('ai');
const activeMode = ref<'ai' | 'live'>('ai');
const activeSession = ref<AIPersona | any | null>(null);

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

onMounted(() => {
  hasApiKey.value = !!localStorage.getItem(API_KEY_STORAGE);
});

const currentMessages = computed(() => {
  if (!activeSession.value) return [];
  return messageHistory.value[activeSession.value.id] || [];
});

const activeSessionId = computed(() => activeSession.value?.id);

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
    ElMessage.warning(t('chat.must_login'));
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

const sendMessage = async () => {
  if (!composeText.value.trim() || !activeSession.value) return;
  if (activeMode.value === 'live' && !authStore.isLoggedIn) {
    ElMessage.error(t('chat.login_req_toast'));
    return;
  }

  isSending.value = true;
  const content = composeText.value;
  composeText.value = '';

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
    await handleAiResponse(content, selfAvatar, selfName);
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

const handleAiResponse = async (userContent: string, selfAvatar: string, selfName: string) => {
  const apiKey = localStorage.getItem(API_KEY_STORAGE);
  if (!apiKey) {
    isSending.value = false;
    ElMessage.error(t('chat.api_not_configured'));
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
  const streamingMsgId = Date.now();
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
        resolve();
      },
      (err: any) => {
        const msgObj = messageHistory.value[activeSession.value.id].find(m => m.id === streamingMsgId);
        if (msgObj) {
          msgObj.content = t('chat.api_error') + (err?.message || err?.response?.data?.error?.message || t('chat.api_error_default'));
          msgObj.isStreaming = false;
        }
        streamingMessageId.value = null;
        resolve();
      }
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
const personaBorderColor = (color: string) => {
  const map: Record<string, string> = {
    blue: 'ring-blue-400 dark:ring-blue-400',
    violet: 'ring-violet-400 dark:ring-violet-400',
    amber: 'ring-amber-400 dark:ring-amber-400',
    emerald: 'ring-emerald-400 dark:ring-emerald-400',
    rose: 'ring-rose-400 dark:ring-rose-400',
  };
  return map[color] || 'ring-indigo-400 dark:ring-indigo-400';
};

const personaBorderClass = (color: string) => {
  const map: Record<string, string> = {
    blue: 'border-blue-300 dark:border-blue-600',
    violet: 'border-violet-300 dark:border-violet-600',
    amber: 'border-amber-300 dark:border-amber-600',
    emerald: 'border-emerald-300 dark:border-emerald-600',
    rose: 'border-rose-300 dark:border-rose-600',
  };
  return map[color] || 'border-indigo-300 dark:border-indigo-600';
};

const personaDotColor = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-400',
    violet: 'bg-violet-400',
    amber: 'bg-amber-400',
    emerald: 'bg-emerald-400',
    rose: 'bg-rose-400',
  };
  return map[color] || 'bg-indigo-400';
};

const personaBadgeClass = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    violet: 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    rose: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
  };
  return map[color] || 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400';
};

const personaCapClass = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    violet: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400',
  };
  return map[color] || 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400';
};
</script>
