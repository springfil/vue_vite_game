<script setup>
import { computed, inject, onMounted, watch, ref} from 'vue'
import GamePersonImage from '@/components/GamePerson/GamePersonImage.vue'
import GamePersonProgressBar from '@/components/GamePerson/GamePersonProgressBar.vue'
import { loadImage } from '@/utils/loadImage.js'
import small from '@/assets/GamePerson/nezuko_small.jpg'
import medium from '@/assets/GamePerson/nezuko_medium.jpg'
import high from '@/assets/GamePerson/nezuko_high.jpg'

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
        return getProgressBarWidth.value = { shift: 10 }
    }

    if (newDifficult === 4) {
        return getProgressBarWidth.value = { shift: 15 }
    }

    if (newDifficult === 6) {
        return getProgressBarWidth.value = { shift: 20 }
    }

    if (newDifficult === 8) {
        return getProgressBarWidth.value = { shift: 25 }
    }

    if (newDifficult === 10) {
        return getProgressBarWidth.value = { shift: 30 }
    }

    if (![2,4,6,8,10].includes(newDifficult)) {
        return getProgressBarWidth.value = { shift: 35 }
    }
})

</script>

<template>
    <div class="container-person">
            <game-person-image :image-url="getImageUrl" :key="difficult"/>
        <game-person-progress-bar :progress-bar-width="getProgressBarWidth" />
    </div>
</template>

<style scoped>
.container-person{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
