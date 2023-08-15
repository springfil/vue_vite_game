<script setup>
import { defineProps } from 'vue'

defineProps(['imageUrl'])
</script>

<template>
    <div class="image-frame">
        <img class="sizeimg" :src="imageUrl" alt="" />
    </div>
</template>

<style scoped>
.image-frame {
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
</style>
