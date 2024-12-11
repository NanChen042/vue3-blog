/*
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-05-27 10:57:41
 * @LastEditors: Southern Wind
 * @LastEditTime: 2024-06-06 10:11:06
 */
import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('storeToken', {
    state: () => ({
        token: ''
    }),
    persist: {
        enabled: true, // 启用
        strategies: [
          // storage 可选localStorage或sessionStorage
          // paths 给指定数据持久化
          { key: 'user', storage: localStorage, paths: ['token'] }
        ]
      },

})