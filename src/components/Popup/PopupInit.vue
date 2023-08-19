<script setup>
import { ref } from 'vue'
import PopupSlots from '@/components/Popup/PopupSlots.vue'
import GamePerson from '@/components/GamePerson/GamePerson.vue'

const isPopupOpen = ref(false)

const openPopup = () => {
    isPopupOpen.value = true
}

const popupConfirmed = () => {
    isPopupOpen.value = false
}
</script>

<template>
    <button @click="openPopup">Открыть popup</button>
    <teleport to="#modal">
        <transition name="modal">
            <popup-slots
                :is-open="isPopupOpen"
                @ok="popupConfirmed"
                @close="isPopupOpen = false">
                Кто-то победил, думаю как реализовать <br />
                Вроде еще можно тянуть сюда компоненты <br />
                Читал еще про телепорты <br />
                <game-person />
            </popup-slots>
        </transition>
    </teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>
