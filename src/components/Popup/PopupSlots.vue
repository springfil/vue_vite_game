<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import GamePerson from '@/components/GamePerson/GamePerson.vue'
import GameOpponent from '@/components/GameOpponent/GameOpponent.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: false,
        default: false,
    },
    isWin: {
        type: Boolean,
        required: false,
        default: true,
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
    emit('closePopup')
}

const confirm = () => {
    emit('confirmPopup')
}
</script>

<template>
    <div v-if="isOpen" class="backdrop" @mousedown="close">
        <div class="popup" @mousedown.stop>
            <h2>Победил:</h2>
            <hr />
            <template v-if="isWin">
                <game-person>
                    <template v-slot:image></template>
                    <template v-slot:bar></template>
                </game-person>
            </template>
            <template v-else>
                <game-opponent>
                    <template v-slot:image></template>
                    <template v-slot:bar></template>
                </game-opponent>
            </template>
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
}

.footer {
    text-align: right;
}
</style>
