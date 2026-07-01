<template>
  <div class="h-full w-full rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 p-5 sm:p-6 flex flex-col hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300">
    <div class="flex items-center justify-between mb-5">
      <h3 class="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">Focus List</h3>
      <button 
        @click="toggleInput"
        :class="['w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border', 
          isInputActive ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 rotate-45' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-zinc-200/50 dark:border-zinc-700/50'
        ]"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
    
    <div class="flex-1 space-y-4 overflow-hidden relative">
      <div v-show="isInputActive" class="mb-4">
        <input 
          ref="taskInput"
          v-model="newTaskText"
          @keyup.enter="addTask"
          type="text" 
          placeholder="What needs to be done?" 
          class="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded text-xs px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors placeholder:text-zinc-400 text-zinc-800 dark:text-zinc-200"
        />
      </div>

      <TransitionGroup name="list" tag="div" class="space-y-4">
        <div v-for="task in tasks" :key="task.id" class="flex items-center gap-3.5 group cursor-pointer" @click="toggleTask(task)">
          <div :class="['w-4 h-4 rounded-sm flex items-center justify-center shrink-0 transition-all duration-300', task.done ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border border-transparent scale-95' : 'border border-zinc-300 dark:border-zinc-600 bg-transparent group-hover:border-zinc-500']">
            <svg v-if="task.done" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div :class="['text-[13px] font-semibold transition-all duration-300', task.done ? 'text-zinc-400 line-through opacity-50 translate-x-1' : 'text-zinc-700 dark:text-zinc-200']">
            {{ task.text }}
          </div>
        </div>
      </TransitionGroup>
      
      <!-- Empty State -->
      <div v-if="tasks.length === 0" class="absolute inset-0 flex flex-col items-center justify-center opacity-50 pointer-events-none">
        <svg class="w-8 h-8 text-zinc-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs font-semibold text-zinc-500">All caught up!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const tasks = ref([
  { id: 1, text: 'Email creative team', done: true },
  { id: 2, text: 'Review design system', done: false },
  { id: 3, text: 'Prepare Q3 Roadmap', done: false },
]);

const isInputActive = ref(false);
const newTaskText = ref('');
const taskInput = ref<HTMLInputElement | null>(null);

const toggleInput = () => {
  isInputActive.value = !isInputActive.value;
  if (isInputActive.value) {
    nextTick(() => {
      taskInput.value?.focus();
    });
  } else {
    newTaskText.value = '';
  }
};

const addTask = () => {
  if (!newTaskText.value.trim()) return;
  
  tasks.value.unshift({
    id: Date.now(),
    text: newTaskText.value.trim(),
    done: false
  });
  
  newTaskText.value = '';
  isInputActive.value = false;
};

const toggleTask = (task: any) => {
  task.done = !task.done;
  // Optional: Move completed tasks to bottom after a delay
  if (task.done) {
    setTimeout(() => {
      const idx = tasks.value.findIndex(t => t.id === task.id);
      if (idx > -1) {
        const [t] = tasks.value.splice(idx, 1);
        tasks.value.push(t);
      }
    }, 600);
  }
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-15px) scale(0.95);
}

.list-leave-active {
  position: absolute;
}
</style>
