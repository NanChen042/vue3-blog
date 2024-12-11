<!--
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-05-27 10:43:41
 * @LastEditors: Southern Wind
 * @LastEditTime: 2024-06-06 10:37:50
-->
<script setup lang="ts">
import { useStore } from '@/store/index';
import LoginPage from '@/components/LoginPage.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const sotre = useStore()
const token = ref('abcdefghijklmnopqrstuvwxyz');

interface loginPage {
  emailModel: string,
  passwordModel: string,
  login: () => void
}

const obj = reactive<loginPage>({
  emailModel: 'admin',
  passwordModel: 'admin',
  login: () => {

  }
})

const loginClick = () => {
  console.log(obj);
  sotre.token = token.value;
  router.push('/')
}
onMounted(() => {

})
/* sotre.token = token.value */
</script>

<template>
  <LoginPage v-model:email-model="obj.emailModel" v-model:password-model="obj.passwordModel" @loginClick="loginClick" />
</template>

<style scoped></style>
