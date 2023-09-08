<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { GAME_STATUS } from '@/constants/GAME_STATUS'
import { FIELD } from '@/constants/FIELD'

const props = defineProps({
    field: {
        type: Object,
        required: true,
    },
    gameStatus: {
        type: Number,
        required: false,
        default: GAME_STATUS.NONE,
    },
})

const emit = defineEmits(['select-field'])

const isPreviewActive = computed(() => {
    return (
        props.field.value === FIELD.FILLED &&
        props.gameStatus === GAME_STATUS.PREVIEW
    )
})

const isActive = computed(() => {
    return props.field.clicked && props.field.value === FIELD.FILLED
})

const isError = computed(() => {
    return props.field.clicked && props.field.value === FIELD.EMPTY
})

const boardItemClasses = computed(() => {
    let classes = 'item '

    if (isPreviewActive.value || isActive.value) {
        classes += 'active'
    }
    if (isError.value) {
        classes += 'error'
    }
    return classes
})

const select = (id) => {
    if (props.gameStatus === GAME_STATUS.STARTED) {
        emit('select-field', id)
    }
}
</script>

<template>
    <img :class="boardItemClasses" @click="select(field.id)" />
</template>

<style scoped>
.item {
    position: relative;
    width: 40px;
    height: 40px;

    background: url('@/assets/logo.png');
    background-size: cover;
    background-position: center;

    display: inline-block;
    border: none;
    border-radius: 15px;
    margin: 5px;
    cursor: pointer;

    transition: 0.9s;
    transform-style: preserve-3d;
}

.item.active {
    background: url('@/assets/board_nezuko.png');
    background-size: cover;
    background-position: center;
    transform: rotateX(720deg);
}

.item.error {
    background: url('@/assets/board_troll.png');
    background-size: cover;
    background-position: center;
    transform: rotateX(720deg);
}
</style>
