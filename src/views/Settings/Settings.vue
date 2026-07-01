<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-16" style="color: var(--db-text-primary)">

    <!-- Warm accent glow -->
    <div class="absolute top-0 right-1/4 w-96 h-64 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%); filter: blur(60px);"></div>

    <!-- Back -->
    <div class="absolute top-6 left-6 z-20">
      <button @click="router.push('/chat')" class="db-icon-btn" style="border: 1px solid var(--db-card-border); background: var(--db-card-bg); width:2.5rem; height:2.5rem; border-radius:0.75rem;">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
      </button>
    </div>

    <div class="w-full max-w-[460px]">

      <!-- Header -->
      <div class="mb-8 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4" style="background: rgba(0,0,0,0.06);">
          <svg class="w-6 h-6" style="color: var(--db-text-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight mb-1" style="color: var(--db-text-primary)">{{ $t('settings.title') }}</h1>
        <p class="text-sm" style="color: var(--db-text-muted)">{{ $t('settings.subtitle') }}</p>
      </div>

      <!-- Settings Card -->
      <div class="db-card p-7">
        <div class="h-1 w-10 rounded-full mb-6" style="background: var(--db-accent);"></div>

        <n-space vertical size="large">

          <n-form-item :label="$t('settings.api_key_label')" :feedback="$t('settings.api_key_hint')">
            <n-input
              v-model:value="apiKeyInput"
              type="password"
              show-password-on="click"
              :placeholder="$t('settings.api_key_placeholder')"
              size="large"
              class="font-mono"
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
              class="font-mono"
            >
              <template #prefix>
                <n-icon><HardwareChipOutline /></n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-alert v-if="saved" type="success" show-icon class="rounded-xl">{{ $t('settings.saved') }}</n-alert>
          <n-alert v-if="apiError" type="error" show-icon class="rounded-xl">{{ apiError }}</n-alert>

          <div class="grid grid-cols-2 gap-3 mt-2">
            <n-button secondary size="large" class="w-full rounded-xl font-semibold" :loading="testing" :disabled="!apiKeyInput.trim()" @click="handleTest">
              {{ testing ? $t('settings.testing') : $t('settings.test_connection') }}
            </n-button>
            <n-button type="primary" size="large" class="w-full rounded-xl font-bold" :loading="saving" @click="handleSave">
              {{ saving ? $t('settings.saving') : $t('settings.save') }}
            </n-button>
          </div>

        </n-space>
      </div>

      <p class="text-center text-sm mt-5" style="color: var(--db-text-muted)">{{ $t('settings.hint') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { createChatCompletion } from '@/api/chat';
import { KeyOutline, HardwareChipOutline } from '@vicons/ionicons5';

defineOptions({ name: 'Settings' });

const router = useRouter();
const { t } = useI18n();
const message = useMessage();

const API_KEY_STORAGE = 'chat_api_key';
const MODEL_STORAGE = 'chat_model';
const DEFAULT_MODEL = 'Qwen/Qwen2.5-7B-Instruct';

const apiKeyInput = ref('');
const modelInput = ref('');
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
  if (!apiKeyInput.value.trim()) { apiError.value = t('settings.api_key_required'); return; }
  saving.value = true;
  try {
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.value.trim());
    localStorage.setItem(MODEL_STORAGE, modelInput.value.trim() || DEFAULT_MODEL);
    saved.value = true;
    setTimeout(() => { saved.value = false; }, 3000);
  } finally { saving.value = false; }
};

const handleTest = async () => {
  if (!apiKeyInput.value.trim()) return;
  testing.value = true;
  apiError.value = '';
  const model = modelInput.value.trim() || DEFAULT_MODEL;
  try {
    const res = await createChatCompletion(apiKeyInput.value.trim(), {
      model, messages: [{ role: 'user', content: 'Hello, reply with "OK" only.' }], max_tokens: 10, temperature: 0.1,
    });
    const reply = res.choices[0]?.message?.content?.trim();
    if (reply) message.success(`连接成功！模型回复: ${reply}`);
    else apiError.value = t('settings.model_empty_error');
  } catch (err: any) {
    const msg = err?.response?.data?.error?.message || err?.message || 'Unknown error';
    apiError.value = `${t('settings.connection_failed')}: ${msg}`;
  } finally { testing.value = false; }
};
</script>
