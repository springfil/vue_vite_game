<script setup>
import { defineProps, watch, inject } from 'vue'
import { UseProgressBar } from '@/store/progressBar'
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

watch(
    [() => props.progressBarWidth.shift, () => isInitialWidth.value],
    ([shift, isInitial]) => {
        if (shift === 10 && isInitial) {
            width2.value = width2.value - 10
            return width2.value
        }
        if (shift === 15 && isInitial) {
            width2.value = width2.value - 15
            return width2.value
        }
        if (shift === 20 && isInitial) {
            width2.value = width2.value - 20
            return width2.value
        }
        if (shift === 25 && isInitial) {
            width2.value = width2.value - 25
            return width2.value
        }
        if (shift === 30 && isInitial) {
            width2.value = width2.value - 30
            return width2.value
        }
        if (shift === 35 && isInitial) {
            width2.value = width2.value - 35
            return width2.value
        }
        if (shift === 40 && isInitial) {
            width2.value = width2.value - 40
            return width2.value
        }
        if (shift === 45 && isInitial) {
            width2.value = width2.value - 45
            return width2.value
        }
        if (!isInitial) {
            width2.value = 180
            return width2.value
        }
    },
)

watch(
    () => width2.value,
    (newShith) => {
        if (newShith < 0) return (width2.value = 0)
    },
)
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: width2 + 'px' }"></div>
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
    transition: width 1s;
}
</style>
