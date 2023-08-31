<script setup>
import { defineProps, computed, inject } from 'vue'

const props = defineProps(['progressBarWidth'])
const isInitialWidth = inject('isInitialWidth')

let width = 180

const shifted = computed(() => {
    if (props.progressBarWidth.shift === 10 && isInitialWidth.value) {
        width = width - 10
        return width
    }
    if (props.progressBarWidth.shift === 15 && isInitialWidth.value) {
        width = width - 15
        return width
    } 
     if (props.progressBarWidth.shift === 20 && isInitialWidth.value) {
        width = width - 20
        return width
    }
     if (props.progressBarWidth.shift === 25 && isInitialWidth.value) {
        width = width - 25
        return width
    }
     if (props.progressBarWidth.shift === 30 && isInitialWidth.value) {
        width = width - 30
        return width
    }
    if (props.progressBarWidth.shift === 35 && isInitialWidth.value) {
        width = width - 35
        return width
    }
     if (props.progressBarWidth.shift === 40 && isInitialWidth.value) {
        width = width - 40
        return width
    }
     if (props.progressBarWidth.shift === 45 && isInitialWidth.value) {
        width = width - 45
        return width
    }
     if(!isInitialWidth.value){
        width = 180
        return width
     }
})
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: shifted + 'px' }"></div>
    </div>
</template>

<style scoped>
.progress-bar-frame {
    border: 2px solid black;
    border-radius: 15px;
    height: 15px;
    margin-top: 10px;
    width: 180px;
}

.progress-bar {
    height: 100%;
    background-color: #c0392b;
    border-radius: 15px;
    transition: width 2s;
}
</style>
