import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('userStore', {
    // 其他配置...
    state:()=>{
        return{
            userName:null,
            publicKey:null,
            privateKey:null,
            revAddr:null,
            balance:null,
            bulletBalance:null,
            necBalance:null,
        }
    },
    persist: {
        storage:sessionStorage, //在一个会话中持久化存储
    },
})