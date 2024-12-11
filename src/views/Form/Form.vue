<!--
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-05-13 10:44:10
 * @LastEditors: Southern Wind
 * @LastEditTime: 2024-06-13 10:58:19
-->
<script setup lang="ts">
/* import {getMark } from "@/utils/watermark";
const boxRef = ref(null); 
const { waterMark } = getMark();

waterMark("Southern Wind", true, boxRef.value!); */


</script>

<template>

  <div class="common-layout" ref="boxRef" >
   
    <el-container>
      <el-header>
        <PageHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          main
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped></style>
