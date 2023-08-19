<script setup>
import { computed, inject, onMounted } from 'vue'
import GamePersonImage from '@/components/GamePerson/GamePersonImage.vue'
import GamePersonProgressBar from '@/components/GamePerson/GamePersonProgressBar.vue'
import { loadImage } from '@/utils/loadImage.js'
import { getRandom } from '@/utils/getRandom'
import small from '@/assets/GamePerson/nezuko_small.jpg'
import medium from '@/assets/GamePerson/nezuko_medium.jpg'
import high from '@/assets/GamePerson/nezuko_high.jpg'

const difficult = inject('data')

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

const getProgressBarWidth = computed(() => {
    let minShift
    let maxShift
    if (difficult.value === 2) {
        minShift = 5
        maxShift = 10
    } else if (difficult.value === 4) {
        minShift = 10
        maxShift = 15
    } else {
        minShift = 15
        maxShift = 40
    }

    const shift = getRandom(minShift, maxShift)
    console.log(shift)
    return { shift }
})
</script>

<template>
    <div class="container">
        <transition name="bounce">
            <game-person-image :image-url="getImageUrl" :key="difficult" />
        </transition>
        <game-person-progress-bar :progress-bar-width="getProgressBarWidth" />
    </div>
</template>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 2s;
}
.bounce-leave-active {
    animation: bounce-in 0.1s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>
