<script setup>
import { defineProps } from 'vue'

defineProps(['imageUrl1'])
</script>

<template>
    <div class="image-frame-opponent">
        <img class="sizeimg-1" :src="imageUrl1" alt="" />
    </div>
</template>

<style scoped>
.image-frame-opponent {
    border: 2px solid black;
    border-top: none;
    border-bottom: none;
    border-radius: 30px/90px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 320px;
    width: 240px;
}
.sizeimg-1 {
    object-fit: cover;
    border: 2px solid black;
    border-top: none;
    border-bottom: none;
    border-radius: 30px/90px;
    box-shadow: 0px 0px 14px 2px rgba(11, 24, 206, 0.952);
    height: 100%;
    width: 100%;
}

.image-frame-opponent img {
  animation-name: image-fade;
  animation-duration: 2s;
  animation-fill-mode: forwards; 
}

@keyframes image-fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

</style>
