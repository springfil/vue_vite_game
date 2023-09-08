import { defineStore } from 'pinia'
import { ref } from 'vue'

export const UseProgressBar = defineStore('progressBar', () => {
    const HpPerson = ref(180)
    const HpOpponent = ref(180)
    return {
        HpPerson,
        HpOpponent,
    }
})
