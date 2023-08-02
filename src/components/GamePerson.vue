<script setup>
import { computed, inject, watch, ref } from 'vue'
import PersonImage from './PersonImage.vue'
import PersonProgressBar from './PersonProgressBar.vue'
import nezuko_small from '@/assets/nezuko_small.jpg'
import nezuko_medium from '@/assets/nezuko_medium.jpg'
import nezuko_high from '@/assets/nezuko_high.jpg'

const difficult = inject('data')
const getProgressBarWidth = ref(0)

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

watch(difficult, (newDifficult) => {
        if (newDifficult === 2) {
            getProgressBarWidth.value = 10
        } else if (newDifficult === 4){
            getProgressBarWidth.value = 15  
        } else if (newDifficult === 6){
            getProgressBarWidth.value = 20  
        }

    })

</script>

<template>
    <div class="container">
        <person-image :image-url="getImageUrl" :key="difficult.value" />  
        <person-progress-bar :progress-bar-width="getProgressBarWidth" />
        {{ getProgressBarWidth }}
    </div>
</template>

<style scoped>

</style>

// const DIFFICULT = { // easy: 1, // medium: 2, // hard: 3, // }; // const
//difficult = ref(DIFFICULT.medium); //:progress-bar-width="getProgressBarWidth"
// const getProgressBarWidth = computed(() => { // });
