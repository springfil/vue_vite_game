<script setup>
import { ref } from 'vue'
import PopupSlots from '@/components/Popup/PopupSlots.vue'

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
    <popup-slots
        :is-open="isPopupOpen"
        @ok="popupConfirmed"
        @close="isPopupOpen = false">
       Кто-то победил, думаю как реализовать <br/>
       Вроде еще можно тянуть сюда компоненты <br/>
       Читал еще про телепорты <br/>
    </popup-slots>
</template>

