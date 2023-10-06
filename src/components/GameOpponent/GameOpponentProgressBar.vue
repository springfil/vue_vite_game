<script setup lang='ts'>
import { defineProps, watch, Ref } from 'vue'
import { injectStrict } from '@/utils/injectStrict'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const props = defineProps({
    progressBarWidth: {
        type: Object,
        required: true,
    },
})

const isInitialWidth = injectStrict<Ref<boolean>>('isInitialWidth')

const store = useProgressBar()
const { hpOpponent } = storeToRefs(store)

watch(
    [() => props.progressBarWidth.shift, () => isInitialWidth.value],
    ([shift, isInitial]) => {
        if (!isInitial) {
            hpOpponent.value = 180
            return hpOpponent.value
        }
        if ([10, 15, 20, 25, 30, 35, 40].includes(shift) && isInitial) {
            hpOpponent.value = hpOpponent.value - shift
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
