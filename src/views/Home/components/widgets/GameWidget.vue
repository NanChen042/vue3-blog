<template>
  <div class="h-full w-full rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col relative group">
    <!-- Header -->
    <div class="px-4 py-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md absolute top-0 w-full z-10">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <span class="text-xs font-bold text-zinc-300 tracking-wider uppercase">Tic Tac Toe</span>
      </div>
      <button @click="resetGame" class="text-[10px] bg-zinc-800 px-2 py-1 rounded-full font-bold text-zinc-400 hover:text-white transition-colors">
        Restart
      </button>
    </div>

    <div class="flex-1 w-full h-full pt-14 pb-4 px-4 flex flex-col items-center justify-center relative">
      <div v-if="winner || isDraw" class="absolute inset-0 z-20 bg-zinc-900/90 backdrop-blur-sm flex flex-col items-center justify-center">
        <div class="text-3xl font-black mb-2" :class="winner === 'X' ? 'text-blue-400' : (winner === 'O' ? 'text-red-400' : 'text-zinc-400')">
          {{ winner ? `${winner} Wins!` : 'Draw!' }}
        </div>
        <button @click="resetGame" class="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold transition-colors">Play Again</button>
      </div>

      <!-- Game Board -->
      <div class="grid grid-cols-3 gap-2 w-full max-w-[160px] aspect-square mx-auto">
        <button 
          v-for="(cell, index) in board" 
          :key="index"
          @click="makeMove(index)"
          :disabled="!!cell || !!winner"
          class="w-full h-full rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-3xl font-black transition-colors"
          :class="cell === 'X' ? 'text-blue-400 shadow-[inset_0_0_20px_rgba(96,165,250,0.2)]' : (cell === 'O' ? 'text-red-400 shadow-[inset_0_0_20px_rgba(248,113,113,0.2)]' : '')"
        >
          <transition name="pop">
            <span v-if="cell">{{ cell }}</span>
          </transition>
        </button>
      </div>

      <div class="mt-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">
        {{ isPlayerTurn ? 'Your Turn (X)' : 'AI is thinking...' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

defineProps({
  size: {
    type: String,
    default: '2x2'
  }
});

const board = ref<Array<string | null>>(Array(9).fill(null));
const isPlayerTurn = ref(true);
const winner = ref<string | null>(null);

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const checkWinner = (squares: Array<string | null>) => {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isDraw = computed(() => board.value.every(cell => cell !== null) && !winner.value);

const makeMove = (index: number) => {
  if (board.value[index] || winner.value || !isPlayerTurn.value) return;
  
  board.value[index] = 'X';
  winner.value = checkWinner(board.value);
  
  if (!winner.value && !isDraw.value) {
    isPlayerTurn.value = false;
    setTimeout(aiMove, 600);
  }
};

const aiMove = () => {
  const emptyIndices = board.value.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null) as number[];
  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board.value[randomIndex] = 'O';
    winner.value = checkWinner(board.value);
  }
  isPlayerTurn.value = true;
};

const resetGame = () => {
  board.value = Array(9).fill(null);
  winner.value = null;
  isPlayerTurn.value = true;
};
</script>

<style scoped>
.pop-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.3);
}
</style>
