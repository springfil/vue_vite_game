<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import GamePerson from '@/components/GamePerson/GamePerson.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['ok', 'close'])

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (e) => {
    if (props.isOpen && e.key === 'Escape') {
        close()
    }
}

const close = () => {
    emit('close')
}

const confirm = () => {
    emit('ok')
}
</script>

<template>
    <div v-if="isOpen" class="backdrop" @mousedown="close">
        <div class="popup" @mousedown.stop>
            <h2>Победил:</h2>
            <hr />
            <game-person >
                <template v-slot:image ></template>
                <template v-slot:bar></template>
            </game-person>
            <hr />
            <div class="footer">
                <slot name="actions" :close="close" :confirm="confirm">
                    <button @click="close">Отмена</button>
                    <button @click="confirm">Ok</button>
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup {
    top: 10%;
    padding: 20px;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
    background-color: white;
    border-radius: 10px;
    text-align: center;
}

.popup h1 {
    text-align: center;
    margin: 0;
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    /* z-index: 100; */
}

.footer {
    text-align: right;
}
</style>
