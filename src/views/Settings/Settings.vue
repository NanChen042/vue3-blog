<template>
  <div class="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#FDFDFD] dark:bg-[#000000] overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">
    
    <!-- Background grid -->
    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>

    <!-- Back Button -->
    <div class="absolute top-8 left-8 z-20">
      <n-button 
        quaternary 
        circle 
        size="large"
        class="hover:-translate-x-1 transition-transform bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md" 
        @click="router.push('/chat')"
      >
        <template #icon>
          <n-icon><ArrowBackOutline /></n-icon>
        </template>
      </n-button>
    </div>

    <div class="relative z-10 w-full max-w-[480px] px-4 py-8">
        
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            {{ $t('settings.title') }}
          </h1>
          <p class="text-zinc-500 dark:text-zinc-400">
            {{ $t('settings.subtitle') }}
          </p>
        </div>

        <!-- Form Card -->
        <n-card 
          size="huge" 
          class="rounded-[24px] shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 border-zinc-200/60 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl"
          :bordered="true"
        >
          <n-space vertical size="large">
            
            <n-form-item :label="$t('settings.api_key_label')" :feedback="$t('settings.api_key_hint')">
              <n-input 
                v-model:value="apiKeyInput"
                type="password"
                show-password-on="click"
                :placeholder="$t('settings.api_key_placeholder')"
                size="large"
                class="font-mono rounded-lg"
              >
                <template #prefix>
                  <n-icon><KeyOutline /></n-icon>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item :label="$t('settings.model_label')" :feedback="$t('settings.model_hint')">
              <n-input 
                v-model:value="modelInput"
                :placeholder="$t('settings.model_placeholder')"
                size="large"
                class="font-mono rounded-lg"
              >
                <template #prefix>
                  <n-icon><HardwareChipOutline /></n-icon>
                </template>
              </n-input>
            </n-form-item>

            <n-alert v-if="saved" type="success" show-icon class="rounded-xl mt-2">
              {{ $t('settings.saved') }}
            </n-alert>
            
            <n-alert v-if="apiError" type="error" show-icon class="rounded-xl mt-2">
              {{ apiError }}
            </n-alert>

            <div class="grid grid-cols-2 gap-4 mt-6">
              <n-button 
                secondary 
                size="large" 
                class="w-full rounded-xl font-semibold"
                :loading="testing"
                :disabled="!apiKeyInput.trim()"
                @click="handleTest"
              >
                {{ testing ? $t('settings.testing') : $t('settings.test_connection') }}
              </n-button>

              <n-button 
                type="primary" 
                size="large" 
                class="w-full rounded-xl font-bold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 border-none"
                :loading="saving"
                @click="handleSave"
              >
                {{ saving ? $t('settings.saving') : $t('settings.save') }}
              </n-button>
            </div>

          </n-space>
        </n-card>

        <p class="text-center text-sm text-zinc-400 dark:text-zinc-600 mt-8">
          {{ $t('settings.hint') }}
        </p>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { createChatCompletion } from '@/api/chat';
import { ArrowBackOutline, SettingsOutline, KeyOutline, HardwareChipOutline } from '@vicons/ionicons5';

defineOptions({ name: 'Settings' });

const router = useRouter();
const { t } = useI18n();
const message = useMessage();

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
      message.success(`连接成功！模型回复: ${reply}`);
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
