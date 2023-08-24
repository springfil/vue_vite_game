<script setup>
import { defineProps, watch, ref, inject, computed } from 'vue'

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
    //{immediate: true}
)


 </script>

<!-- <script setup>
import { defineProps, computed, inject, watch} from 'vue'

const data2 = inject('data2')

const props = defineProps(['progressBarWidth'])
let width = 180
const shifted = computed(() => width - props.progressBarWidth.shift)

watch(
   
    () => props.progressBarWidth.shift,
    (newShift) => {
        debugger
        data2.value = newShift    
    },
)
</script>   -->

<!-- <script setup>
import { watchEffect, defineProps, inject, ref } from 'vue'

const data2 = inject('data2')

const props = defineProps(['progressBarWidth'])
const shifted = ref(180)

watchEffect(() => {
    shifted.value -= props.progressBarWidth.shift
    data2.value = props.progressBarWidth.shift
})
</script> -->

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
