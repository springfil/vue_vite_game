<script setup>
import { ref, computed, watch } from 'vue'
import PopupSlots from '@/components/Popup/PopupSlots.vue'
import { UseProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const store = UseProgressBar()
const { width, width2 } = storeToRefs(store)

const isPopupOpen = ref(false)

const popupConfirmed = () => {
    isPopupOpen.value = false
}

const isWin = computed(() => {
    if (width.value <= 0) return false
    if (width2.value <= 0) return true
})

watch([width, width2], ([newWidth, newWidth2]) => {
    if (newWidth <= 0 || newWidth2 <= 0) {
        isPopupOpen.value = true
    }
})
</script>

<template>
    <teleport to="body">
        <transition name="popup">
            <popup-slots
                :is-win="isWin"
                :is-open="isPopupOpen"
                @confirm-popup="popupConfirmed"
                @close-popup="isPopupOpen = false">
            </popup-slots>
        </transition>
    </teleport>
</template>

<style scoped>

</style>
