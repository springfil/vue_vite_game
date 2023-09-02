import { defineStore } from 'pinia'
import { ref } from 'vue'

export const UseProgressBar = defineStore('progressBar', () => {
    const width = ref(180)
    const width2 = ref(180)
    return {
        width,
        width2,
    }
})
