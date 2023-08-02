<template>
    <div>
        <p class="difficult">
            Множитель атаки <strong>X*{{ difficult }}</strong>
        </p>
        <transition name="slide-up">
            <p class="next" v-if="isNext">УСИЛЕНИЕ</p>
            <p class="reset" v-else-if="isReset">БАЗОВАЯ АТАКА</p>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    difficult: {
        type: Number,
        required: true,
    },
    isNext: {
        type: Boolean,
        required: true,
    },
    isReset: {
        type: Boolean,
        required: true,
    },
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
