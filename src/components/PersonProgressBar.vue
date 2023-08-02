<script setup>
import { defineProps, watch, ref } from "vue";

const props = defineProps(["progressBarWidth"]);
const width = ref(240); 

watch(() => props.progressBarWidth, (newValue) => {
    
    width.value = width.value - newValue;
    console.log(newValue);
    console.log(width.value);
}); 
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: width + 'px' }"></div>
    </div>
</template>

<style scoped>
.progress-bar-frame {
    border: 5px solid black;
    border-radius: 15px;
    height: 20px;
    margin-top: 10px;
    width: 240px;
}

.progress-bar {
    height: 100%;
    background-color: #c0392b;
    border-radius: 15px;
    transition: width 2s;
}
</style>

// const props = defineProps(["progressBarWidth"]);

// watch(() => props.progressBarWidth, (newValue) => {
//     console.log(newValue);
// });
// const width = ref("240"); 