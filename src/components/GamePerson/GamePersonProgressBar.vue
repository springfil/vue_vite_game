<script setup>
import { defineProps, watch, ref, inject } from 'vue'

const data2 = inject('data2')

const props = defineProps(['progressBarWidth'])
const shifted = ref(180)

watch(
    () => props.progressBarWidth.shift,
    (newShift) => {
        shifted.value -= newShift
        data2.value = newShift
        console.log(newShift)
    },
)
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
