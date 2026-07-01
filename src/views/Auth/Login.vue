<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-16" style="color: var(--db-text-primary)">

    <!-- Warm glow decorations -->
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(245,200,66,0.15) 0%, transparent 70%); filter: blur(40px);"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(245,200,66,0.10) 0%, transparent 70%); filter: blur(40px);"></div>

    <!-- Back button -->
    <button @click="router.push('/')" class="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm font-medium transition-all group" style="color: var(--db-text-muted)">
      <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      {{ $t('login.back_home') }}
    </button>

    <div class="w-full max-w-[420px]">

      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-lg" style="background: var(--db-nav-active-bg);">
          <span class="text-2xl font-black" style="color: var(--db-nav-active-text)">B</span>
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight mb-2" style="color: var(--db-text-primary)">
          {{ $t('login.welcome') }}
        </h1>
        <p class="text-sm" style="color: var(--db-text-muted)">{{ $t('login.subtitle') }}</p>
      </div>

      <!-- Login Card -->
      <div class="db-card p-8">

        <!-- Top accent bar -->
        <div class="h-1 w-12 rounded-full mb-6" style="background: var(--db-accent);"></div>

        <form class="space-y-5" @submit.prevent="handleLogin">

          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-semibold mb-2" style="color: var(--db-text-secondary)">
              {{ $t('login.username') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg class="w-4 h-4" style="color: var(--db-text-muted)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                </svg>
              </div>
              <input
                id="username"
                v-model="loginForm.username"
                type="text"
                required
                class="block w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                :style="`background: rgba(0,0,0,0.04); border: 1.5px solid var(--db-card-border); color: var(--db-text-primary);`"
                :placeholder="$t('login.username_placeholder')"
                @focus="e => (e.target as HTMLInputElement).style.borderColor = 'var(--db-accent)'"
                @blur="e => (e.target as HTMLInputElement).style.borderColor = 'var(--db-card-border)'"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold mb-2" style="color: var(--db-text-secondary)">
              {{ $t('login.password') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg class="w-4 h-4" style="color: var(--db-text-muted)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                </svg>
              </div>
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                :style="`background: rgba(0,0,0,0.04); border: 1.5px solid var(--db-card-border); color: var(--db-text-primary);`"
                :placeholder="$t('login.password_placeholder')"
                @focus="e => (e.target as HTMLInputElement).style.borderColor = 'var(--db-accent)'"
                @blur="e => (e.target as HTMLInputElement).style.borderColor = 'var(--db-card-border)'"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3.5 flex items-center" style="color: var(--db-text-muted)">
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded accent-yellow-400"/>
              <span class="text-sm" style="color: var(--db-text-secondary)">{{ $t('login.remember_me') }}</span>
            </label>
            <a href="#" class="text-sm font-semibold transition-colors" style="color: var(--db-text-muted)">{{ $t('login.forgot_password') }}</a>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            style="background: var(--db-nav-active-bg); color: var(--db-nav-active-text);"
          >
            <svg v-if="loading" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? $t('login.signing_in') : $t('login.sign_in') }}
          </button>

        </form>
      </div>

      <p class="text-center text-sm mt-5" style="color: var(--db-text-muted)">
        {{ $t('login.no_account') }}
        <a href="#" class="font-semibold ml-1" style="color: var(--db-text-primary)">{{ $t('login.sign_up') }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
import { login } from '@/api/user';
import { useMessage } from 'naive-ui';

defineOptions({ name: 'Login' });

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();
const message = useMessage();

const loginForm = ref({ username: '', password: '' });
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) return;
  loading.value = true;
  try {
    const res = await login(loginForm.value);
    authStore.setToken(res.data.token);
    authStore.setUserInfo(res.data.userInfo);
    message.success(t('login.sign_in') + ' Success');
    router.back();
  } catch (err: any) {
    message.error(err.message || t('login.login_failed'));
  } finally {
    loading.value = false;
  }
};
</script>
