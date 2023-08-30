<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps(['progressBarWidth'])
let width = 180

const shifted = computed(() => {
    if (props.progressBarWidth.shift === 10) {
        width = width - 10
        return width
    }else if (props.progressBarWidth.shift === 15) {
        width = width - 15
        return width
    } else if (props.progressBarWidth.shift === 20) {
        width = width - 20
        return width
    }else if (props.progressBarWidth.shift === 25) {
        width = width - 25
        return width
    }else if (props.progressBarWidth.shift === 30) {
        width = width - 30
        return width
    }else if (props.progressBarWidth.shift === 35) {
        width = width - 35
        return width
    }else if (props.progressBarWidth.shift === 40) {
        width = width - 40
        return width
    }else if (props.progressBarWidth.shift === 45) {
        width = width - 45
        return width
    }
})
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: shifted + 'px' }"></div>
        {{shifted}}
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
