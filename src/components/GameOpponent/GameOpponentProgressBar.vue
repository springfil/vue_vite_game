<script setup>
import { defineProps, watch, inject } from 'vue'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const props = defineProps({
    progressBarWidth: {
        type: Object,
        required: true,
    },
})

const isInitialWidth = inject('isInitialWidth')

const store = useProgressBar()
const { hpOpponent } = storeToRefs(store)

watch(
    [() => props.progressBarWidth.shift, () => isInitialWidth.value],
    ([shift, isInitial]) => {
        if (shift === 10 && isInitial) {
            hpOpponent.value = hpOpponent.value - 10
            return hpOpponent.value
        }
        if (shift === 15 && isInitial) {
            hpOpponent.value = hpOpponent.value - 15
            return hpOpponent.value
        }
        if (shift === 20 && isInitial) {
            hpOpponent.value = hpOpponent.value - 20
            return hpOpponent.value
        }
        if (shift === 25 && isInitial) {
            hpOpponent.value = hpOpponent.value - 25
            return hpOpponent.value
        }
        if (shift === 30 && isInitial) {
            hpOpponent.value = hpOpponent.value - 30
            return hpOpponent.value
        }
        if (shift === 35 && isInitial) {
            hpOpponent.value = hpOpponent.value - 35
            return hpOpponent.value
        }
        if (shift === 40 && isInitial) {
            hpOpponent.value = hpOpponent.value - 40
            return hpOpponent.value
        }
        if (shift === 45 && isInitial) {
            hpOpponent.value = hpOpponent.value - 45
            return hpOpponent.value
        }
        if (!isInitial) {
            hpOpponent.value = 180
            return hpOpponent.value
        }
    },
)

watch(
    () => hpOpponent.value,
    (newShith) => {
        if (newShith < 0) {
            hpOpponent.value = 0
        }
    },
)
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: hpOpponent + 'px' }"></div>
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
