<script setup>
import { defineProps } from 'vue'

defineProps(['imageUrl'])
</script>

<template>
    <div class="image-frame-1">
        <img class="sizeimg" :src="imageUrl" alt="" />
    </div>
</template>

<style scoped>
.image-frame-1 {
    border: 2px solid black;
    /* box-shadow: 0 5px 10px 1px rgba(11, 24, 206, 0.952); */
    /* border-radius: 15px; */
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
.sizeimg {
    object-fit: cover;
    /* border-radius: 15px; */
    border: 2px solid black;
    border-top: none;
    border-bottom: none;
    border-radius: 30px/90px;
    box-shadow: 0px 0px 14px 2px rgba(11, 24, 206, 0.952);
    height: 100%;
    width: 100%;
}

.image-frame-1 img {
  animation-name: image-fade-1;
  animation-duration: 5s;
  animation-fill-mode: forwards; 
}

@keyframes image-fade-1 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
