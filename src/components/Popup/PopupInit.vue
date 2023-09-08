<script setup>
import { ref, computed, watch } from 'vue'
import PopupSlots from '@/components/Popup/PopupSlots.vue'
import { UseProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const store = UseProgressBar()
const { HpPerson, HpOpponent } = storeToRefs(store)

const isPopupOpen = ref(false)

const popupConfirmed = () => {
    isPopupOpen.value = false
}

const win = computed(() => {
    if (HpPerson.value === 0 && HpOpponent.value > 0) return 'opponent'
    if (HpOpponent.value === 0 && HpPerson.value > 0) return 'person'
    if (HpPerson.value === 0 && HpOpponent.value === 0) return 'draw' 
})

watch([HpPerson, HpOpponent], ([RemainingHpPerson, RemainingHpOpponent]) => {
    if (RemainingHpPerson <= 0 || RemainingHpOpponent <= 0) {
        isPopupOpen.value = true
    }
})
</script>

<template>
    <teleport to="body">
        <transition name="popup">
            <popup-slots
                :win="win"
                :is-open="isPopupOpen"
                @confirm-popup="popupConfirmed"
                @close-popup="isPopupOpen = false">
            </popup-slots>
        </transition>
    </teleport>
</template>

<style scoped>

</style>
