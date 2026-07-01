<template>
  <div class="h-full w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 overflow-hidden flex flex-col relative group transition-shadow hover:shadow-lg">
    
    <!-- Header -->
    <div class="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md absolute top-0 w-full z-10">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white relative">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <div class="absolute bottom-0 right-0 w-2 h-2 bg-green-400 border border-white dark:border-zinc-900 rounded-full"></div>
        </div>
        <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300">AI Assistant</span>
      </div>
      <div class="text-[10px] text-zinc-400">Online</div>
    </div>

    <!-- Chat Messages -->
    <div class="flex-1 w-full pt-14 pb-14 px-3 overflow-y-auto custom-scrollbar flex flex-col gap-3" ref="chatContainer">
      <div 
        v-for="(msg, index) in messages" 
        :key="index"
        class="flex w-full"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div 
          class="max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed"
          :class="msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-sm' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm'"
        >
          {{ msg.content }}
        </div>
      </div>
      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex w-full justify-start">
        <div class="px-3 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 rounded-tl-sm flex gap-1">
          <div class="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="absolute bottom-0 w-full p-2 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800/60 z-10">
      <div class="relative flex items-center">
        <input 
          v-model="inputText" 
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Ask me anything..." 
          class="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-full py-1.5 pl-4 pr-10 text-[13px] text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
        />
        <button 
          @click="sendMessage"
          class="absolute right-1 w-6 h-6 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50"
          :disabled="!inputText.trim() || isTyping"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

defineProps({
  size: {
    type: String,
    default: '2x2'
  }
});

const inputText = ref('');
const isTyping = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const messages = ref([
  { role: 'ai', content: 'Hi! I am your AI assistant. How can I help you today?' }
]);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const sendMessage = () => {
  if (!inputText.value.trim() || isTyping.value) return;
  
  messages.value.push({ role: 'user', content: inputText.value });
  inputText.value = '';
  scrollToBottom();
  
  isTyping.value = true;
  
  // Fake AI response
  setTimeout(() => {
    isTyping.value = false;
    const responses = [
      "That's an interesting perspective!",
      "I can certainly help you with that. Let me look it up.",
      "Could you elaborate more on what you mean?",
      "Absolutely. The Vue 3 composition API makes things much easier."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    messages.value.push({ role: 'ai', content: randomResponse });
    scrollToBottom();
  }, 1500);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
}
</style>
