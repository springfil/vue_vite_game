import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProgressBar = defineStore('progressBar', () => {
    const hpPerson = ref(180)
    const hpOpponent = ref(180)
    return {
        hpPerson,
        hpOpponent,
    }
})
