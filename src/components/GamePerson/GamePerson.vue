<script setup>
import { computed, inject, onMounted, watch, ref } from 'vue'
import GamePersonImage from '@/components/GamePerson/GamePersonImage.vue'
import GamePersonProgressBar from '@/components/GamePerson/GamePersonProgressBar.vue'
import { loadImage } from '@/utils/loadImage.js'
import small from '@/assets/GamePerson/nezuko_small.jpg'
import medium from '@/assets/GamePerson/nezuko_medium.jpg'
import high from '@/assets/GamePerson/nezuko_high.jpg'

const difficult = inject('difficultToProcess')
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
            return small
    }
})

watch(difficult, (newDifficult) => {
    if ([2, 4, 6, 8, 10].includes(newDifficult)) {
        getProgressBarWidth.value = { shift: (newDifficult / 2 + 1) * 5 }
    } else {
        getProgressBarWidth.value = { shift: 35 }
    }
})

onMounted(async () => {
    await Promise.all([loadImage(small), loadImage(medium), loadImage(high)])
})
</script>

<template>
    <div class="container-person">
        <slot name="image">
            <game-person-image :image-url="getImageUrl" :key="difficult" />
        </slot>
        <slot name="bar">
            <game-person-progress-bar
                :progress-bar-width="getProgressBarWidth" />
        </slot>
    </div>
</template>

<style scoped>
.container-person {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
