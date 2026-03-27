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

      <!-- AI List -->
      <div v-if="activeView === 'ai'" class="flex-1 overflow-y-auto p-3 space-y-1">
        <div 
          v-for="persona in aiPersonas" :key="persona.id"
          @click="selectChat(persona, 'ai')"
          class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
          :class="activeSession?.id === persona.id ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'hover:bg-zinc-50 dark:hover:bg-white/5'">
          <div class="relative">
            <el-avatar :size="40" :src="persona.avatar" class="border border-zinc-200 dark:border-zinc-700/50" />
            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-zinc-900 dark:text-white truncate">{{ persona.name }}</h4>
            <p class="text-[11px] text-zinc-500 truncate" :title="persona.tagline">{{ persona.tagline }}</p>
          </div>
        </div>
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
          <div class="w-10 h-10 rounded-[10px] bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
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
            <h2 class="font-bold text-lg text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <span v-if="activeMode === 'live'" class="text-emerald-500">#</span>
              {{ activeSession.name }}
            </h2>
            <span v-if="activeMode === 'live'" class="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              {{ $t('chat.live') }}
            </span>
            <span v-else class="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              {{ $t('chat.ai_bot') }}
            </span>
          </div>
        </header>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto px-6 pt-24 pb-6 space-y-6 scroll-smooth z-10" ref="messagesContainer">
          
          <div v-for="msg in currentMessages" :key="msg.id" 
               class="flex gap-4 max-w-3xl"
               :class="msg.isSelf ? 'ml-auto flex-row-reverse' : ''">
            
            <el-avatar :size="36" :src="msg.avatar" class="shrink-0 border border-zinc-200 dark:border-zinc-800" />
            
            <div class="flex flex-col gap-1 min-w-0" :class="msg.isSelf ? 'items-end' : 'items-start'">
              <span class="text-[11px] font-semibold text-zinc-500 flex items-center gap-2">
                {{ msg.sender }} <span class="text-zinc-400 font-normal">{{ msg.time }}</span>
              </span>
              
              <div class="px-4 py-2.5 text-[15px] leading-relaxed break-words shadow-sm"
                   :class="msg.isSelf 
                     ? (activeMode === 'live' ? 'bg-emerald-500 text-white rounded-2xl rounded-tr-[4px]' : 'bg-indigo-500 text-white rounded-2xl rounded-tr-[4px]')
                     : 'bg-white dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-tl-[4px] border border-zinc-100 dark:border-transparent'">
                {{ msg.content }}
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
              
              <!-- Emoji Button & Picker -->
              <div class="relative shrink-0 flex items-center justify-center">
                <button type="button" @click="showEmoji = !showEmoji" class="p-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors outline-none z-10 relative">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <div v-if="showEmoji" class="absolute bottom-full left-0 mb-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded-2xl p-3 w-[280px] max-h-60 overflow-y-auto z-50 flex flex-wrap gap-1.5 custom-scrollbar">
                  <button type="button" v-for="e in emojis" :key="e" @click="addEmoji(e)" class="text-xl w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg hover:scale-110 transition-all origin-center">
                    {{ e }}
                  </button>
                </div>
                <!-- Backdrop to close emoji -->
                <div v-if="showEmoji" @click="showEmoji = false" class="fixed inset-0 z-40"></div>
              </div>

              <textarea 
                v-model="composeText"
                @keydown.enter.exact.prevent="sendMessage"
                :placeholder="$t('chat.type_message')"
                class="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-2.5 px-2 text-[15px] outline-none placeholder-zinc-400 dark:text-white"
                rows="1"
              ></textarea>
            </div>
            <button 
              type="submit"
              :disabled="!composeText.trim() || isSending"
              class="w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-sm outline-none"
              :class="activeMode === 'live' 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400'">
              <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </form>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-90 max-h-full">
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
import { ref, computed, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';

defineOptions({ name: 'Chat' });

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const activeView = ref<'ai'|'live'>('ai');
const activeMode = ref<'ai'|'live'>('ai');
const activeSession = ref<any>(null);

const messagesContainer = ref<HTMLElement | null>(null);

const composeText = ref('');
const isSending = ref(false);
const showEmoji = ref(false);

const emojis = ['😀','😂','😅','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','👽','👾','🤖','🎃','😺','😸','😹','😻','😼'];

const addEmoji = (e: string) => {
  composeText.value += e;
};

const aiPersonas = computed(() => [
  { id: 'bot-1', name: t('chat.ai_1_name'), tagline: t('chat.ai_1_desc'), avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeMaker&backgroundColor=b6e3f4' },
  { id: 'bot-2', name: t('chat.ai_2_name'), tagline: t('chat.ai_2_desc'), avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Design&backgroundColor=c0aede' },
  { id: 'bot-3', name: t('chat.ai_3_name'), tagline: t('chat.ai_3_desc'), avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Chill&backgroundColor=ffdfbf' },
]);

const liveRooms = ref([
  { id: 'room-global', name: t('chat.room_1'), online: 142 },
  { id: 'room-vue', name: t('chat.room_2'), online: 38 },
  { id: 'room-design', name: t('chat.room_3'), online: 15 },
]);

// Initialize mock messages safely inside onMounted or let it be loosely coupled with translations
const messageHistory = ref<Record<string, any[]>>({});

// Provide initial data only when needed to map translations properly
const initMockData = () => {
    messageHistory.value = {
      'bot-1': [
        { id: 1, sender: t('chat.ai_1_name'), avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeMaker&backgroundColor=b6e3f4', content: t('chat.ai_1_hello'), time: '10:00 AM', isSelf: false }
      ],
      'room-global': [
        { id: 1, sender: 'System', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Sys', content: t('chat.sys_welcome'), time: '09:00 AM', isSelf: false },
        { id: 2, sender: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', content: t('chat.sys_mock_user'), time: '09:45 AM', isSelf: false },
      ]
    };
};

// Start initialization once on component creation
initMockData();

const currentMessages = computed(() => {
  if (!activeSession.value) return [];
  return messageHistory.value[activeSession.value.id] || [];
});

const selectChat = (item: any, mode: 'ai'|'live') => {
  activeSession.value = item;
  activeMode.value = mode;
  // Initialize empty history if not exist
  if (!messageHistory.value[item.id]) {
    messageHistory.value[item.id] = [];
    if (mode === 'ai') {
      let content = t('chat.ai_1_hello');
      if (item.id === 'bot-2') content = t('chat.ai_2_hello');
      if (item.id === 'bot-3') content = t('chat.ai_3_hello');

      messageHistory.value[item.id].push({
        id: Date.now(),
        sender: item.name,
        avatar: item.avatar,
        content: content,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isSelf: false
      });
    }
  }
  scrollToBottom();
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
      { id: Date.now(), sender: 'System', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Sys', content: `${authStore.userInfo?.nickname || authStore.userInfo?.username} ${t('chat.created_room')}`, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isSelf: false }
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

  messageHistory.value[activeSession.value.id].push({
    id: Date.now(),
    sender: selfName,
    avatar: selfAvatar,
    content: content,
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    isSelf: true
  });
  
  scrollToBottom();

  if (activeMode.value === 'ai') {
    // Simulate AI typing response
    setTimeout(() => {
      messageHistory.value[activeSession.value.id].push({
        id: Date.now(),
        sender: activeSession.value.name,
        avatar: activeSession.value.avatar,
        content: t('chat.ai_1_reply') + ` "${content}"`,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isSelf: false
      });
      isSending.value = false;
      scrollToBottom();
    }, 1000);
  } else {
    // Simulate a random user responding in Live Room occasionally
    isSending.value = false;
    if (Math.random() > 0.4) {
      setTimeout(() => {
        messageHistory.value[activeSession.value.id].push({
          id: Date.now(),
          sender: 'Random User ' + Math.floor(Math.random() * 100),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
          content: t('chat.sys_mock_random'),
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isSelf: false
        });
        scrollToBottom();
      }, 1500);
    }
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>
