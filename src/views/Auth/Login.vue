<template>
  <div class="relative min-h-screen overflow-hidden font-sans text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30">
    <!-- 背景网格 -->
    <div class="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]"></div>

    <!-- 装饰圆形 -->
    <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-linear-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-linear-to-tr from-violet-500/20 via-indigo-500/10 to-transparent blur-3xl pointer-events-none"></div>

    <!-- 返回首页 -->
    <button @click="router.push('/')" class="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 group">
      <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ $t('login.back_home') }}
    </button>

    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div class="w-full max-w-[440px]">

        <!-- Logo & 标题 -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center mb-6">
            <div class="w-16 h-16 bg-linear-to-br from-indigo-600 via-violet-600 to-indigo-500 rounded-[22px] flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/30 animate-blob">
              B
            </div>
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
            {{ $t('login.welcome') }}
          </h1>
          <p class="text-base text-zinc-500 dark:text-zinc-400">
            {{ $t('login.subtitle') }}
          </p>
        </div>

        <!-- 登录表单卡片 -->
        <div class="relative overflow-hidden rounded-[28px] bg-white/70 dark:bg-[#0A0A0A]/80 backdrop-blur-2xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/40 dark:shadow-black/40 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/50">

          <!-- 顶部渐变条 -->
          <div class="h-1 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400"></div>

          <div class="px-10 py-10">
            <form class="space-y-6" @submit.prevent="handleLogin">

              <!-- 用户名 -->
              <div class="group">
                <label for="username" class="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2.5">
                  {{ $t('login.username') }}
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    v-model="loginForm.username"
                    type="text"
                    required
                    class="block w-full pl-12 pr-4 py-3.5 bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200"
                    :placeholder="$t('login.username_placeholder')" />
                </div>
              </div>

              <!-- 密码 -->
              <div class="group">
                <label for="password" class="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2.5">
                  {{ $t('login.password') }}
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    v-model="loginForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="block w-full pl-12 pr-12 py-3.5 bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200"
                    :placeholder="$t('login.password_placeholder')" />
                  <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg v-if="!showPassword" class="w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <svg v-else class="w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- 记住我 & 忘记密码 -->
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2.5 cursor-pointer group/remember">
                  <div class="relative">
                    <input id="remember-me" type="checkbox" class="sr-only peer" />
                    <div class="w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-600 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500/30 transition-all duration-200 group-hover/remember:border-indigo-400"></div>
                    <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span class="text-sm text-zinc-600 dark:text-zinc-400 group-hover/remember:text-zinc-900 dark:group-hover/remember:text-white transition-colors">
                    {{ $t('login.remember_me') }}
                  </span>
                </label>

                <a href="#" class="text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {{ $t('login.forgot_password') }}
                </a>
              </div>

              <!-- 登录按钮 -->
              <button
                type="submit"
                :disabled="loading"
                class="relative w-full overflow-hidden py-4 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group/btn mt-2">

                <!-- 背景 -->
                <span class="absolute inset-0 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-[200%_100%] group-hover/btn:bg-pos-right transition-all duration-500"></span>

                <!-- 光泽效果 -->
                <span class="absolute inset-0 bg-linear-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>

                <!-- 文字 -->
                <span class="relative flex items-center justify-center gap-2.5 text-white">
                  <svg v-if="loading" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ loading ? $t('login.signing_in') : $t('login.sign_in') }}</span>
                  <svg v-if="!loading" class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>

            </form>
          </div>
        </div>

        <!-- 底部提示 -->
        <p class="text-center text-sm text-zinc-400 dark:text-zinc-600 mt-6">
          {{ $t('login.no_account') }}
          <a href="#" class="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            {{ $t('login.sign_up') }}
          </a>
        </p>
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
const showPassword = ref(false);

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

<style scoped>
/* Blob 动画 */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 8s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

/* 渐变背景动画 */
@keyframes bg-position {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
