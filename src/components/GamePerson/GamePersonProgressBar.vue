<script setup>
import { defineProps, computed, inject, watch } from 'vue'
import { getRandom } from '@/utils/getRandom'

const data2 = inject('data2')

const props = defineProps(['progressBarWidth'])
let width = 180

const minShift = computed(() => {
    if (props.progressBarWidth.shift === 10) {
        console.log('max10')
        return 5
    }
    if (props.progressBarWidth.shift === 15) {
        console.log('max10')
        return 8
    }
    if (props.progressBarWidth.shift === 20) {
        console.log('max10')
        return 10
    }
    if (props.progressBarWidth.shift === 25) {
        console.log('max10')
        return 25
    }
    if (props.progressBarWidth.shift === 30) {
        console.log('max10')
        return 20
    }
    if (props.progressBarWidth.shift === 35) {
        console.log('max10')
        return 30
    }
})

const maxShift = computed(() => {
    if (props.progressBarWidth.shift === 10) {
        return 10
    }
    if (props.progressBarWidth.shift === 15) {
        return 16
    }
    if (props.progressBarWidth.shift === 20) {
        return 25
    }
    if (props.progressBarWidth.shift === 25) {
        return 25
    }
    if (props.progressBarWidth.shift === 30) {
        return 37
    }
    if (props.progressBarWidth.shift === 35) {
        return 45
    }
   
})

const shifted = computed(() => {
    if (props.progressBarWidth.shift === 10) {
        width = width - getRandom(minShift.value, maxShift.value)
        return width
    }
    if (props.progressBarWidth.shift === 15) {
        width = width - getRandom(minShift.value, maxShift.value)
        return width
    }
    if (props.progressBarWidth.shift === 20) {
        width = width - getRandom(minShift.value, maxShift.value)
        return width
    }
    if (props.progressBarWidth.shift === 25) {
        width = width - getRandom(minShift.value, maxShift.value)
        return width
    }
    if (props.progressBarWidth.shift === 30) {
        width = width - getRandom(minShift.value, maxShift.value)
        return width
    }
    if (props.progressBarWidth.shift === 35) {
        width = width - getRandom(minShift.value, maxShift.value)
        return width
    }
       
})

 watch(
     () => props.progressBarWidth.shift,
     (newShift) => {
         data2.value = width - shifted.value
     },
 )
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: shifted + 'px' }"></div>
        {{ shifted }}
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
