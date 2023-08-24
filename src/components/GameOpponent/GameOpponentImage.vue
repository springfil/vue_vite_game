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
.sizeimg-1 {
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

.image-frame-opponent img {
  animation-name: aboba;
  animation-duration: 5s;
  animation-fill-mode: forwards; 
}

@keyframes aboba {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
