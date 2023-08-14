<script setup>
import { defineProps, watch, ref } from "vue";

const props = defineProps(["progressBarWidth"]);
let width = 240;

const shifted = ref(width);

watch(() => props.progressBarWidth.shift, (newShift) => {
  width -= newShift;
  shifted.value = width;
});
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: shifted + 'px' }"></div>
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

