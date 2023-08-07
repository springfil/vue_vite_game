<script setup>
import { defineProps } from "vue";

defineProps(["imageUrl"]);
</script>

<template>
    <div class="image-frame">
        <img class="sizeimg" :src="imageUrl" alt="" />
    </div>
</template>

<style scoped>
.image-frame {
    border: 5px solid black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 320px;
    width: 240px;
}
.sizeimg {
    object-fit: cover;
    height: 100%;
    width: 100%;
}
</style>
