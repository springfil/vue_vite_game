<script setup>
import { defineProps, computed, inject, watch } from 'vue'
import { getRandom } from '@/utils/getRandom'
import { UseProgressBar } from '@/store/progressBar';
import { storeToRefs } from 'pinia'

const props = defineProps({
    progressBarWidth: {
        type: Object,
        required: true,
    },
})

const data2 = inject('data2')
const isInitialWidth = inject("isInitialWidth")

const store = UseProgressBar()
const { width } = storeToRefs(store)


const minShift = computed(() => {
    if (props.progressBarWidth.shift === 10) return 5
    
    if (props.progressBarWidth.shift === 15) return 8
    
    if (props.progressBarWidth.shift === 20) return 10
    
    if (props.progressBarWidth.shift === 25) return 25

    if (props.progressBarWidth.shift === 30) return 20
    
    if (props.progressBarWidth.shift === 35) return 30
})

const maxShift = computed(() => {
    if (props.progressBarWidth.shift === 10) return 10

    if (props.progressBarWidth.shift === 15) return 16

    if (props.progressBarWidth.shift === 20) return 25

    if (props.progressBarWidth.shift === 25) return 25
    
    if (props.progressBarWidth.shift === 30) return 37
    
    if (props.progressBarWidth.shift === 35) return 45

})

const shifted = computed(() => {
   
    if (props.progressBarWidth.shift === 10 && isInitialWidth.value) {
        width.value = width.value - getRandom(minShift.value, maxShift.value)
        return width.value
    }
    if (props.progressBarWidth.shift === 15 && isInitialWidth.value) {
        width.value = width.value - getRandom(minShift.value, maxShift.value)
        return width.value
    }
    if (props.progressBarWidth.shift === 20 && isInitialWidth.value) {
        width.value = width.value - getRandom(minShift.value, maxShift.value)
        return width.value
    }
    if (props.progressBarWidth.shift === 25 && isInitialWidth.value) {
        width.value = width.value - getRandom(minShift.value, maxShift.value)
        return width.value
    }
    if (props.progressBarWidth.shift === 30 && isInitialWidth.value) {
        width.value = width.value - getRandom(minShift.value, maxShift.value)
        return width.value
    }
    if (props.progressBarWidth.shift === 35 && isInitialWidth.value) {
        width.value = width.value - getRandom(minShift.value, maxShift.value)
        return width.value
    }
    if(!isInitialWidth.value){
        console.log ('сброс должен работать')
        width.value = 180
        return width.value
    }
       
})

watch( shifted, (newShift, oldShift = 180) => {
    data2.value = oldShift - newShift
    console.log(`width ${data2.value}  newShift ${newShift} oldShift ${oldShift}`)
    console.log(width.value)
})

</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: width + 'px' }"></div>
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
