<template>
  <div class="relative min-h-screen bg-[#FDFDFD] dark:bg-[#000000] overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">

    <!-- 背景网格 -->
    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>

    <!-- 返回 -->
    <button @click="router.push('/chat')" class="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 group">
      <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ $t('settings.back_chat') }}
    </button>

    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div class="w-full max-w-[480px]">

        <!-- 标题 -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center mb-6">
            <div class="w-16 h-16 bg-linear-to-br from-indigo-600 via-violet-600 to-indigo-500 rounded-[22px] flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-500/30">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.588c.548-.453.548-1.188 0-1.641l-6.499-6.588A3 3 0 016 3h12z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            {{ $t('settings.title') }}
          </h1>
          <p class="text-base text-zinc-500 dark:text-zinc-400">
            {{ $t('settings.subtitle') }}
          </p>
        </div>

        <!-- 设置卡片 -->
        <div class="relative overflow-hidden rounded-[28px] bg-white/70 dark:bg-[#0A0A0A]/80 backdrop-blur-2xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/40 dark:shadow-black/40">
          <div class="h-1 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400"></div>

          <div class="px-10 py-10 space-y-8">

            <!-- API Key -->
            <div class="group">
              <label class="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2.5">
                {{ $t('settings.api_key_label') }}
                <span class="text-rose-500 ml-0.5">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="apiKeyInput"
                  :type="showApiKey ? 'text' : 'password'"
                  class="block w-full pl-12 pr-12 py-3.5 bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 font-mono"
                  :placeholder="$t('settings.api_key_placeholder')" />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.588c.548-.453.548-1.188 0-1.641l-6.499-6.588A3 3 0 016 3h12z"/>
                  </svg>
                </div>
                <button type="button" @click="showApiKey = !showApiKey" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <svg v-if="!showApiKey" class="w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-else class="w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                  </svg>
                </button>
              </div>
              <p class="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                {{ $t('settings.api_key_hint') }}
              </p>
            </div>

            <!-- 模型 -->
            <div class="group">
              <label class="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2.5">
                {{ $t('settings.model_label') }}
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <input
                  v-model="modelInput"
                  type="text"
                  class="block w-full pl-12 pr-4 py-3.5 bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 font-mono"
                  :placeholder="$t('settings.model_placeholder')" />
              </div>
              <p class="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                {{ $t('settings.model_hint') }}
              </p>
            </div>

            <!-- 状态显示 -->
            <div v-if="saved" class="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span class="text-sm text-emerald-700 dark:text-emerald-400 font-medium">{{ $t('settings.saved') }}</span>
            </div>

            <!-- 错误提示 -->
            <div v-if="apiError" class="flex items-start gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
              <svg class="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
              <span class="text-sm text-rose-700 dark:text-rose-400">{{ apiError }}</span>
            </div>

            <!-- 保存按钮 -->
            <button
              @click="handleSave"
              :disabled="saving"
              class="relative w-full overflow-hidden py-4 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group/btn mt-2">
              <span class="absolute inset-0 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-[200%_100%] group-hover/btn:bg-pos-right transition-all duration-500"></span>
              <span class="absolute inset-0 bg-linear-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              <span class="relative flex items-center justify-center gap-2.5 text-white">
                <svg v-if="saving" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ saving ? $t('settings.saving') : $t('settings.save') }}</span>
              </span>
            </button>

            <!-- 测试连接 -->
            <button
              @click="handleTest"
              :disabled="testing || !apiKeyInput.trim()"
              class="w-full py-3 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <svg v-if="testing" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ testing ? $t('settings.testing') : $t('settings.test_connection') }}
            </button>

          </div>
        </div>

        <!-- 底部提示 -->
        <p class="text-center text-sm text-zinc-400 dark:text-zinc-600 mt-6">
          {{ $t('settings.hint') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { createChatCompletion } from '@/api/chat';

defineOptions({ name: 'Settings' });

const router = useRouter();
const { t } = useI18n();

const API_KEY_STORAGE = 'chat_api_key';
const MODEL_STORAGE = 'chat_model';
const DEFAULT_MODEL = 'Qwen/Qwen2.5-7B-Instruct';

const apiKeyInput = ref('');
const modelInput = ref('');
const showApiKey = ref(false);
const saving = ref(false);
const testing = ref(false);
const saved = ref(false);
const apiError = ref('');

onMounted(() => {
  apiKeyInput.value = localStorage.getItem(API_KEY_STORAGE) || '';
  modelInput.value = localStorage.getItem(MODEL_STORAGE) || DEFAULT_MODEL;
});

const handleSave = async () => {
  apiError.value = '';
  saved.value = false;

  if (!apiKeyInput.value.trim()) {
    apiError.value = t('settings.api_key_required');
    return;
  }

  saving.value = true;
  try {
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.value.trim());
    localStorage.setItem(MODEL_STORAGE, modelInput.value.trim() || DEFAULT_MODEL);
    saved.value = true;
    setTimeout(() => { saved.value = false; }, 3000);
  } finally {
    saving.value = false;
  }
};

const handleTest = async () => {
  if (!apiKeyInput.value.trim()) return;

  testing.value = true;
  apiError.value = '';
  const model = modelInput.value.trim() || DEFAULT_MODEL;

  try {
    const res = await createChatCompletion(apiKeyInput.value.trim(), {
      model,
      messages: [
        { role: 'user', content: 'Hello, reply with "OK" only.' }
      ],
      max_tokens: 10,
      temperature: 0.1,
    });

    const reply = res.choices[0]?.message?.content?.trim();
    if (reply) {
      ElMessage.success(`连接成功！模型回复: ${reply}`);
    } else {
      apiError.value = t('settings.model_empty_error');
    }
  } catch (err: any) {
    const msg = err?.response?.data?.error?.message || err?.message || 'Unknown error';
    apiError.value = `${t('settings.connection_failed')}: ${msg}`;
  } finally {
    testing.value = false;
  }
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 8s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}
::-webkit-scrollbar { display: none; }
</style>
