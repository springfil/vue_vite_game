<script setup>
import { computed, inject, watch, ref, onMounted } from 'vue'
import GameOpponentImage from '@/components/GameOpponent/GameOpponentImage.vue'
import GameOpponentProgressBar from '@/components/GameOpponent/GameOpponentProgressBar.vue'
import { loadImage } from '@/utils/loadImage.js'
import small from '@/assets/GameOpponent/small_luna.png'
import medium from '@/assets/GameOpponent/medium_luna.jpg'
import high from '@/assets/GameOpponent/high_luna.jpg'

const difficult = inject('data')
const getProgressBarWidth = ref({})

const getImageUrl = computed(() => {
    switch (difficult.value) {
        case 2:
            return small
        case 4:
            return medium
        case 6:
            return high
        default:
            return high
    }
})

onMounted(async () => {
    await Promise.all([loadImage(small), loadImage(medium), loadImage(high)])
})

watch(difficult, (newDifficult) => {
    if (newDifficult === 2) {
        return (getProgressBarWidth.value = { shift: 10 })
    }

    if (newDifficult === 4) {
        return (getProgressBarWidth.value = { shift: 15 })
    }

    if (newDifficult === 6) {
        return (getProgressBarWidth.value = { shift: 20 })
    }

    if (newDifficult === 8) {
        return (getProgressBarWidth.value = { shift: 25 })
    }

    if (newDifficult === 10) {
        return (getProgressBarWidth.value = { shift: 30 })
    }

    if (newDifficult === 12) {
        return (getProgressBarWidth.value = { shift: 35 })
    }

    if (newDifficult === 14) {
        return (getProgressBarWidth.value = { shift: 40 })
    }

    if (![2,4,6,8,10,12,14].includes(newDifficult)) {
        return (getProgressBarWidth.value = { shift: 45 })
    }
})
</script>

<template>
    <div class="container-opponent">
        <game-opponent-image :image-url="getImageUrl" :key="difficult" />
        <game-opponent-progress-bar :progress-bar-width="getProgressBarWidth" />
    </div>
</template>

<style scoped>
.container-opponent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bounce-enter-active {
    animation: bounce-in 2s;
}
</style>
