<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center relative">
    
    <div class="absolute inset-0 bg-white/70 dark:bg-black/80 backdrop-blur-xl"></div>
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex justify-center mb-6">
        <div class="w-14 h-14 bg-linear-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-purple-500/30">
          B
        </div>
      </div>
      <h2 class="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {{ $t('login.welcome') }}
      </h2>
      <p class="mt-2 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">
        {{ $t('login.subtitle') }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl py-10 px-6 shadow-2xl rounded-3xl sm:px-10 border border-white/40 dark:border-white/10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              {{ $t('login.username') }}
            </label>
            <div class="mt-2">
              <input 
                id="username" 
                v-model="loginForm.username" 
                type="text" 
                required 
                class="appearance-none block w-full px-4 py-3 border outline-none border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-slate-950 dark:text-white transition-all" 
                :placeholder="$t('login.username_placeholder')" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              {{ $t('login.password') }}
            </label>
            <div class="mt-2">
              <input 
                id="password" 
                v-model="loginForm.password" 
                type="password" 
                required 
                class="appearance-none block w-full px-4 py-3 border outline-none border-slate-200 dark:border-slate-800 rounded-xl shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-slate-950 dark:text-white transition-all" 
                :placeholder="$t('login.password_placeholder')" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-slate-300 rounded cursor-pointer" />
              <label for="remember-me" class="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                {{ $t('login.remember_me') }}
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                {{ $t('login.forgot_password') }}
              </a>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2">
              <svg v-if="loading" class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ loading ? $t('login.signing_in') : $t('login.sign_in') }}</span>
            </button>
          </div>
          
          <div class="mt-6">
            <button @click="router.push('/')" type="button" class="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
              {{ $t('login.back_home') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
import { login } from '@/api/user';
import { ElMessage } from 'element-plus';

defineOptions({ name: 'Login' });

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const loginForm = ref({
  username: '',
  password: ''
});

const loading = ref(false);

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) return;
  
  loading.value = true;
  try {
    const res = await login(loginForm.value);
    authStore.setToken(res.data.token);
    authStore.setUserInfo(res.data.userInfo);
    
    ElMessage.success(t('login.sign_in') + ' Success');
    router.back(); 
  } catch (err: any) {
    ElMessage.error(err.message || t('login.login_failed'));
  } finally {
    loading.value = false;
  }
};
</script>
