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
    gameResult: {
        type: String,
        required: false,
        default: 'draw',
    },
})

const emit = defineEmits(['close-popup'])

const handleKeydown = (e) => {
    if (props.isOpen && e.key === 'Escape') {
        close()
    }
}

const close = () => {
    emit('close-popup')
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <div v-if="isOpen" class="backdrop" @mousedown="close">
        <div class="popup" @mousedown.stop>
            <h2>{{ gameResult === 'draw' ? 'Ничья!' : 'Победа:' }}</h2>
            <hr />
            <template v-if="gameResult === 'person'">
                <game-person>
                    <template v-slot:image></template>
                    <template v-slot:bar></template>
                </game-person>
            </template>
            <template v-else-if="gameResult === 'opponent'">
                <game-opponent>
                    <template v-slot:image></template>
                    <template v-slot:bar></template>
                </game-opponent>
            </template>
            <template v-else-if="gameResult === 'draw'">
                <div class="draw">
                    <game-person>
                        <template v-slot:image></template>
                        <template v-slot:bar></template>
                    </game-person>
                    <div class="space"></div>
                    <game-opponent>
                        <template v-slot:image></template>
                        <template v-slot:bar></template>
                    </game-opponent>
                </div>
            </template>
            <hr />
            <div class="footer">
                <slot name="actions" :close="close" >
                <button class="btn" @click="close" >Спасибо</button>
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

.draw {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.space {
    width: 20px; 
}

.footer {
    text-align: center; 
}
.btn {
    background: rgba(206, 200, 200, 0.349);
    color: black;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
    margin: 10px 5px;
    cursor: pointer;
    outline: none;
    font-family: 'Rubik';
    font-size: 16px;
}

.btn:hover {
    background: rgba(73, 223, 36, 0.4);
}
</style>
