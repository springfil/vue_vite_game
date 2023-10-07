<script setup lang="ts">

interface Props {
    imageUrl: string
}

defineProps<Props>()

</script>

<template>
    <div class="image-frame">
        <img class="sizeimg" :src="imageUrl" alt="" />
    </div>
</template>

<style scoped>
.image-frame {
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
.sizeimg {
    object-fit: cover;
    border: 2px solid black;
    border-top: none;
    border-bottom: none;
    border-radius: 30px/90px;
    box-shadow: 0px 0px 14px 2px rgb(230, 50, 215);
    height: 100%;
    width: 100%;
}
.image-frame img {
    animation-name: image-fade;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}

@keyframes image-fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
