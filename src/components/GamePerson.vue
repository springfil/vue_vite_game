<script setup>
import { computed, inject } from 'vue'
import PersonImage from './PersonImage.vue'
import PersonProgressBar from './PersonProgressBar.vue'
import nezuko_small from '@/assets/nezuko_small.jpg'
import nezuko_medium from '@/assets/nezuko_medium.jpg'
import nezuko_high from '@/assets/nezuko_high.jpg'

const difficult = inject('data')

const getImageUrl = computed(() => {
    switch (difficult.value) {
        case 2:
            return nezuko_small
        case 4:
            return nezuko_medium
        case 6:
            return nezuko_high
        default:
            return '../assets/logo.png'
    }
})
</script>

<template>
    <div class="container">
        <person-image :image-url="getImageUrl" :key="difficult.value" />  
        <person-progress-bar />
    </div>
</template>

<style scoped>

</style>

// const DIFFICULT = { // easy: 1, // medium: 2, // hard: 3, // }; // const
//difficult = ref(DIFFICULT.medium); //:progress-bar-width="getProgressBarWidth"
// const getProgressBarWidth = computed(() => { // });
