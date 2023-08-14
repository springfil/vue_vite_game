<script setup>
import { computed, inject, watch, ref, onMounted } from 'vue'
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
  await Promise.all([
    loadImage(small),
    loadImage(medium),
    loadImage(high)
  ]);
});

watch(difficult, (newDifficult) => {
    if (newDifficult === 2) {
        return getProgressBarWidth.value = { shift: 10 };
    }

    if (newDifficult === 4) {
        return getProgressBarWidth.value = { shift: 15 };
    }

    if (newDifficult !== 4 && newDifficult !== 2) {
        return getProgressBarWidth.value = { shift: 20 };
    }
})
</script>

<template>
    <div class="container">
        <transition name="slide-fade">
            <game-person-image :image-url="getImageUrl" :key="difficult.value" />  
        </transition> 
        <game-person-progress-bar :progress-bar-width="getProgressBarWidth" />
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 1;
}
</style>


