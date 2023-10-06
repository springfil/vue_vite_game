<script setup lang="ts">
import { computed, watch, ref, onMounted, Ref } from 'vue'
import GameOpponentImage from '@/components/GameOpponent/GameOpponentImage.vue'
import GameOpponentProgressBar from '@/components/GameOpponent/GameOpponentProgressBar.vue'
import { loadImage } from '@/utils/loadImage'
import { injectStrict } from '@/utils/injectStrict'
import small from '@/assets/GameOpponent/small_luna.png'
import medium from '@/assets/GameOpponent/medium_luna.jpg'
import high from '@/assets/GameOpponent/high_luna.jpg'

const difficult = injectStrict<Ref<number>>('difficultToProcess');
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
            // console.log(Object.prototype.toString.call(small))
            return small
    }
})

watch(difficult, (newDifficult) => {
    if ([2, 4, 6, 8, 10, 12, 14].includes(newDifficult)) {
        getProgressBarWidth.value = { shift: (newDifficult / 2 + 1) * 5 }
    } else {
        getProgressBarWidth.value = { shift: 45 }
    }
})

onMounted(async () => {
    await Promise.all([loadImage(small), loadImage(medium), loadImage(high)])
})
</script>

<template>
    <div class="container-opponent">
        <slot name="image">
            <game-opponent-image :image-url="getImageUrl" :key="difficult" />
        </slot>
        <slot name="bar">
            <game-opponent-progress-bar
                :progress-bar-width="getProgressBarWidth" />
        </slot>
    </div>
</template>

<style scoped>
.container-opponent {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
