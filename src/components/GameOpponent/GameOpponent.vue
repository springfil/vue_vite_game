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
    await Promise.all([loadImage(small1), loadImage(medium1), loadImage(high)])
})

watch(difficult, (newDifficult) => {
    if (newDifficult === 2) {
        return (getProgressBarWidth.value = { shift: 10 })
    }

    if (newDifficult === 4) {
        return (getProgressBarWidth.value = { shift: 15 })
    }

    if (newDifficult !== 4 && newDifficult !== 2) {
        return (getProgressBarWidth.value = { shift: 20 })
    }
})
</script>

<template>
    <div class="container-opponent">
        <!-- <transition name="bounce"> -->
            <game-opponent-image
                :image-url1="getImageUrl"
                :key="difficult.value" />
        <!-- </transition> -->
        <game-opponent-progress-bar :progress-bar-width="getProgressBarWidth" />
    </div>
</template>

<style scoped>
.container-opponent{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bounce-enter-active {
    animation: bounce-in 2s;
}
/* .bounce-leave-active {
    animation: bounce-in 0.1s reverse;
} */
/* @keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
} */
</style>
