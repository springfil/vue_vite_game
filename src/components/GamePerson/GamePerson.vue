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

const minShift = computed(() => {
    if (difficult.value === 2) {
        console.log("min2")
        return 5
    } else if (difficult.value === 4) {
        console.log("min4")
        return 10
    } else {
        console.log("minzopa")
        return 15
    }
})

const maxShift = computed(() => {
    if (difficult.value === 2) {
        console.log("max4")
        return 10
    } else if (difficult.value === 4) {
        console.log("max4")
        return 15
    } else {
        console.log("maxzop")
        return 40
    }
    
})

const getProgressBarWidth = computed(() => {
    const shift = getRandom(minShift.value, maxShift.value)
    console.log(shift)
    return { shift }
})
</script>

<template>
    <div class="container-person">
        <!-- <transition name="bounce"> -->
            <game-person-image :image-url="getImageUrl" :key="difficult" />
        <!-- </transition> -->
        <game-person-progress-bar :progress-bar-width="getProgressBarWidth" />
    </div>
</template>

<style scoped>
.container-person{
    display: flex;
    flex-direction: column;
    align-items: center;
}
/* .bounce-enter-active {
    animation: bounce-in 2s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
} */
/* .bounce-leave-active {
    animation: bounce-in 2s reverse;
} */
</style>
