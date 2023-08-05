<script setup>
import { computed, inject, watch, ref, onMounted } from 'vue'
import PersonImage from './PersonImage.vue'
import PersonProgressBar from './PersonProgressBar.vue'
import nezuko_small from '@/assets/nezuko_small.jpg'
import nezuko_medium from '@/assets/nezuko_medium.jpg'
import nezuko_high from '@/assets/nezuko_high.jpg'

const difficult = inject('data')
const getProgressBarWidth = ref({})

const getImageUrl = computed(() => {
    switch (difficult.value) {
        case 2:
            return nezuko_small
        case 4:
            return nezuko_medium
        case 6:
            return nezuko_high
        default:
            return nezuko_high
    }
})

onMounted(async () => {
    await loadImage(nezuko_small);
    await loadImage(nezuko_medium);
    await loadImage(nezuko_high);
})

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        console.log(img)
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
    });
}

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
            <person-image :image-url="getImageUrl" :key="difficult.value" />  
        </transition> 
        <person-progress-bar :progress-bar-width="getProgressBarWidth" />
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

// const DIFFICULT = { // easy: 1, // medium: 2, // hard: 3, // }; // const
//difficult = ref(DIFFICULT.medium); //:progress-bar-width="getProgressBarWidth"
// const getProgressBarWidth = computed(() => { // });
