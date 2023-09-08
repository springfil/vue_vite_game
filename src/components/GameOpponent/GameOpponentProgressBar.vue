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
const { HpOpponent } = storeToRefs(store)

watch(
    [() => props.progressBarWidth.shift, () => isInitialWidth.value],
    ([shift, isInitial]) => {
        if (shift === 10 && isInitial) {
            HpOpponent.value = HpOpponent.value - 10
            return HpOpponent.value
        }
        if (shift === 15 && isInitial) {
            HpOpponent.value = HpOpponent.value - 15
            return HpOpponent.value
        }
        if (shift === 20 && isInitial) {
            HpOpponent.value = HpOpponent.value - 20
            return HpOpponent.value
        }
        if (shift === 25 && isInitial) {
            HpOpponent.value = HpOpponent.value - 25
            return HpOpponent.value
        }
        if (shift === 30 && isInitial) {
            HpOpponent.value = HpOpponent.value - 30
            return HpOpponent.value
        }
        if (shift === 35 && isInitial) {
            HpOpponent.value = HpOpponent.value - 35
            return HpOpponent.value
        }
        if (shift === 40 && isInitial) {
            HpOpponent.value = HpOpponent.value - 40
            return HpOpponent.value
        }
        if (shift === 45 && isInitial) {
            HpOpponent.value = HpOpponent.value - 45
            return HpOpponent.value
        }
        if (!isInitial) {
            HpOpponent.value = 180
            return HpOpponent.value
        }
    },
)

watch(
    () => HpOpponent.value,
    (newShith) => {
        if (newShith < 0) return (HpOpponent.value = 0)
    },
)
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: HpOpponent + 'px' }"></div>
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
