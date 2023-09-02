<script setup>
import { defineProps, computed, inject } from 'vue'
import { UseProgressBar } from '@/store/progressBar';
import { storeToRefs } from 'pinia'

const props = defineProps({
    progressBarWidth: {
        type: Object,
        required: true,
    },
})
const isInitialWidth = inject('isInitialWidth')

const store = UseProgressBar()
const { width2 } = storeToRefs(store)


const shifted = computed(() => {
    if (props.progressBarWidth.shift === 10 && isInitialWidth.value) {
        width2.value = width2.value - 10
        return width2.value
    }
    if (props.progressBarWidth.shift === 15 && isInitialWidth.value) {
        width2.value = width2.value - 15
        return width2.value
    }
    if (props.progressBarWidth.shift === 20 && isInitialWidth.value) {
        width2.value = width2.value - 20
        return width2.value
    }
    if (props.progressBarWidth.shift === 25 && isInitialWidth.value) {
        width2.value = width2.value - 25
        return width2.value
    }
    if (props.progressBarWidth.shift === 30 && isInitialWidth.value) {
        width2.value = width2.value - 30
        return width2.value
    }
    if (props.progressBarWidth.shift === 35 && isInitialWidth.value) {
        width2.value = width2.value - 35
        return width.value
    }
    if (props.progressBarWidth.shift === 40 && isInitialWidth.value) {
        width2.value = width2.value - 40
        return width.value
    }
    if (props.progressBarWidth.shift === 45 && isInitialWidth.value) {
        width2.value = width2.value - 45
        return width2.value
    }
    if (!isInitialWidth.value) {
        width2.value = 180
        return width2.value
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
