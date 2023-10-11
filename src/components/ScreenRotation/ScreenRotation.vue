<template>
    <div class="backdrop-flip">
        <div class="screen-rotation">

        </div>
    </div>
</template>


<style scoped>
.backdrop-flip {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(229 229 229);
}
.screen-rotation {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);

    width: 7rem;
    height: 7rem;

    background: url('@/assets/ScreenRotation/flip-phone.png');
    background-size: cover;
    background-position: center;
}

</style>

<script setup lang="ts">

</script>