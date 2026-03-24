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
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        }
    }
})