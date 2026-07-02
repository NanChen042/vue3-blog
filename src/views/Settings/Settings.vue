<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { createChatCompletion } from '@/api/chat';
import BoxReveal from '@/components/ui/BoxReveal.vue';
import SpotlightInput from '@/components/ui/SpotlightInput.vue';
import TechOrbitDisplay from '@/components/ui/TechOrbitDisplay.vue';
import Ripple from '@/components/ui/Ripple.vue';
import { HardwareChip, Chatbubbles, Settings, Planet, Flash } from '@vicons/ionicons5';

defineOptions({ name: 'Settings' });

const router = useRouter();
const { t } = useI18n();
const message = useMessage();

const API_KEY_STORAGE = 'chat_api_key';
const MODEL_STORAGE = 'chat_model';
const DEFAULT_MODEL = 'Qwen/Qwen2.5-7B-Instruct';

const apiKeyInput = ref('');
const modelInput = ref(DEFAULT_MODEL);
const passwordVisible = ref(false);

const saving = ref(false);
const testing = ref(false);

const iconsArray = [
  { class: 'text-blue-500 w-10 h-10', duration: 15, delay: 0, radius: 100, component: HardwareChip },
  { class: 'text-emerald-500 w-8 h-8', duration: 20, delay: 5, radius: 160, component: Chatbubbles, reverse: true },
  { class: 'text-purple-500 w-12 h-12', duration: 25, delay: 10, radius: 220, component: Settings },
  { class: 'text-zinc-800 dark:text-white w-10 h-10', duration: 30, delay: 15, radius: 280, component: Planet, reverse: true },
  { class: 'text-orange-500 w-9 h-9', duration: 22, delay: 8, radius: 340, component: Flash }
];

// Load saved settings
onMounted(() => {
  const storedKey = localStorage.getItem(API_KEY_STORAGE);
  const storedModel = localStorage.getItem(MODEL_STORAGE);
  if (storedKey) apiKeyInput.value = storedKey;
  if (storedModel) modelInput.value = storedModel;
});

const handleSave = (e: Event) => {
  e.preventDefault();
  saving.value = true;
  setTimeout(() => {
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.value.trim());
    localStorage.setItem(MODEL_STORAGE, modelInput.value.trim() || DEFAULT_MODEL);
    saving.value = false;
    message.success(t('settings.saved'));
  }, 500);
};

const handleTest = async () => {
  if (!apiKeyInput.value.trim()) {
    message.warning(t('settings.api_key_hint'));
    return;
  }
  
  testing.value = true;
  
  try {
    const key = apiKeyInput.value.trim();
    const model = modelInput.value.trim() || DEFAULT_MODEL;
    
    const res = await createChatCompletion(key, {
      model: model,
      messages: [{ role: 'user', content: 'Ping. Reply with exactly one word: Pong.' }],
      max_tokens: 5,
    });
    
    if (res && res.choices && res.choices.length > 0) {
      message.success(t('settings.test_success'));
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: any) {
    console.error("API Test Error:", error);
    message.error(error.response?.data?.error?.message || error.message || t('settings.test_failed'));
  } finally {
    testing.value = false;
  }
};
</script>

<template>
  <div class="flex h-screen w-full bg-white dark:bg-black font-sans">
    
    <!-- Back to home button (absolute top left) -->
    <button @click="router.push('/chat')" class="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm font-medium transition-all group text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer outline-none bg-white/50 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
      <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      <span>Back</span>
    </button>

    <!-- Left Side: Visual Showcase -->
    <div class="hidden lg:flex w-1/2 relative flex-col justify-center items-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <!-- Ambient Ripple -->
      <Ripple :num-circles="8" :main-circle-size="150" />
      
      <!-- Orbiting Tech Display -->
      <div class="absolute inset-0 flex items-center justify-center">
        <TechOrbitDisplay :iconsArray="iconsArray" :text="`AI\nSettings`" />
      </div>
    </div>

    <!-- Right Side: Settings Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-black p-8 relative overflow-hidden">
      <!-- Mobile Ripple Fallback -->
      <Ripple class="lg:hidden opacity-30" :num-circles="6" :main-circle-size="100" />
      
      <section class="max-md:w-full flex flex-col gap-4 w-96 mx-auto relative z-10">
        <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
          <h2 class="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
            {{ $t('settings.title') }}
          </h2>
        </BoxReveal>

        <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" class="pb-2">
          <p class="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
            {{ $t('settings.subtitle') }}
          </p>
        </BoxReveal>

        <form @submit="handleSave">
          <section class="grid grid-cols-1 gap-4 mb-6">
            
            <!-- API Key Field -->
            <section class="flex flex-col gap-2">
              <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
                <label class="text-sm font-medium leading-none text-neutral-800 dark:text-neutral-200">
                  {{ $t('settings.api_key_label') }} <span class="text-red-500">*</span>
                </label>
              </BoxReveal>

              <BoxReveal width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" class="flex flex-col space-y-2 w-full">
                <section class="relative">
                  <SpotlightInput
                    :type="passwordVisible ? 'text' : 'password'"
                    :placeholder="$t('settings.api_key_placeholder')"
                    v-model="apiKeyInput"
                    class="pr-10"
                  />
                  <button
                    type="button"
                    @click="passwordVisible = !passwordVisible"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-neutral-500 cursor-pointer outline-none"
                  >
                    <svg v-if="passwordVisible" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  </button>
                </section>
                <p class="text-neutral-500 text-xs">{{ $t('settings.api_key_hint') }}</p>
              </BoxReveal>
            </section>

            <!-- Model Field -->
            <section class="flex flex-col gap-2">
              <BoxReveal boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" class="mt-2">
                <label class="text-sm font-medium leading-none text-neutral-800 dark:text-neutral-200">
                  {{ $t('settings.model_label') }} <span class="text-red-500">*</span>
                </label>
              </BoxReveal>

              <BoxReveal width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" class="flex flex-col space-y-2 w-full">
                <SpotlightInput
                  type="text"
                  :placeholder="$t('settings.model_placeholder')"
                  v-model="modelInput"
                />
                <p class="text-neutral-500 text-xs">{{ $t('settings.model_hint') }}</p>
              </BoxReveal>
            </section>

          </section>

          <!-- Buttons -->
          <div class="flex flex-col gap-3 mt-4">
            <BoxReveal width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3" overflow="visible">
              <button
                class="bg-gradient-to-br relative group/btn from-zinc-200 dark:from-zinc-900 dark:to-zinc-900 to-zinc-200 block dark:bg-zinc-800 w-full text-black dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] outline-none hover:cursor-pointer overflow-hidden flex justify-center items-center gap-2"
                type="submit"
                :disabled="saving"
              >
                <svg v-if="saving" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span class="relative z-10">{{ saving ? $t('settings.saving') : $t('settings.save') }} &rarr;</span>
                <span class="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
                <span class="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span>
              </button>
            </BoxReveal>

            <BoxReveal width="100%" boxColor="var(--skeleton, #e5e7eb)" :duration="0.3">
              <div class="text-center mt-2">
                <button 
                  type="button" 
                  class="text-sm text-blue-500 hover:text-blue-600 outline-none flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                  @click="handleTest"
                  :disabled="testing || !apiKeyInput.trim()"
                >
                  <svg v-if="testing" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  {{ testing ? $t('settings.testing') : $t('settings.test_connection') }}
                </button>
              </div>
            </BoxReveal>
          </div>
        </form>

      </section>
    </div>
  </div>
</template>
