import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProgressBar = defineStore('progressBar', () => {
    const hpPerson = ref<number>(180)
    const hpOpponent = ref<number>(180)
    const hpLimit = ref<boolean>(true)
    return {
        hpPerson,
        hpOpponent,
        hpLimit,
    }
})
