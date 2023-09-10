<script setup>
import { defineProps, computed, inject, watch } from 'vue'
import { getRandom } from '@/utils/getRandom'
import { useProgressBar } from '@/store/progressBar';
import { storeToRefs } from 'pinia'

const props = defineProps({
    progressBarWidth: {
        type: Object,
        required: true,
    },
})

const data2 = inject('data2')
const isInitialWidth = inject("isInitialWidth")

const store = useProgressBar()
const { hpPerson } = storeToRefs(store)


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
        hpPerson.value = hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
    if (props.progressBarWidth.shift === 15 && isInitialWidth.value) {
        hpPerson.value = hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
    if (props.progressBarWidth.shift === 20 && isInitialWidth.value) {
        hpPerson.value = hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
    if (props.progressBarWidth.shift === 25 && isInitialWidth.value) {
        hpPerson.value = hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
    if (props.progressBarWidth.shift === 30 && isInitialWidth.value) {
        hpPerson.value = hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
    if (props.progressBarWidth.shift === 35 && isInitialWidth.value) {
        hpPerson.value = hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
    if(!isInitialWidth.value){
        console.log ('сброс должен работать')
        hpPerson.value = 180
        return hpPerson.value
    }
       
})

watch( shifted, (newShift, oldShift = 180) => {
    data2.value = oldShift - newShift
})

watch(
    () => hpPerson.value,
    (newShith) => {
        if (newShith < 0) {
            console.log("персон стал 0")
            return (hpPerson.value = 0)  
        }
    },
)
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: hpPerson + 'px' }"></div>
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
