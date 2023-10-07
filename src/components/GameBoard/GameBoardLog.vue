<script setup lang="ts">
import { watch, ref } from 'vue'

interface Props {
    difficult: number;
    isNext: boolean;
    isReset: boolean;
}

const props = defineProps<Props>()

const multiplier = ref(2)

watch(
    () => props.difficult,
    (newDifficult) => {
        multiplier.value = newDifficult / 2 + 1
    },
)
</script>

<template>
    <div class="board-log">
        <p class="difficult">
            Множитель атаки X*{{ multiplier }}
        </p>
        <transition name="slide-up">
            <p class="next" v-if="isNext"> - Усиление - </p>
            <p class="reset" v-else-if="isReset"> - Базовая атака - </p>
        </transition>
    </div>
</template>

<style scoped>
.board-log {
    height: 72px;
}
.difficult{
    font-size: 14px;
}

.reset,
.next{
    font-size: 12px;
}
</style>
