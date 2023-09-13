<script setup>
import { ref, computed, watch } from 'vue'
import PopupSlots from '@/components/Popup/PopupSlots.vue'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const store = useProgressBar()
const { hpPerson, hpOpponent } = storeToRefs(store)

const isPopupOpen = ref(false)

// const popupConfirm = () => {
//     isPopupOpen.value = false
// }

const gameResult = computed(() => {
    if (hpPerson.value === 0 && hpOpponent.value > 0) return 'opponent'
    if (hpOpponent.value === 0 && hpPerson.value > 0) return 'person'
    if (hpPerson.value === 0 && hpOpponent.value === 0) return 'draw' 
})

watch([hpPerson, hpOpponent], ([remainingHpPerson, remainingHpOpponent]) => {
    if (remainingHpPerson <= 0 || remainingHpOpponent <= 0) {
        isPopupOpen.value = true
    }
})
</script>

<template>
    <teleport to="body">
        <transition name="popup">
            <popup-slots
                :game-result="gameResult"
                :is-open="isPopupOpen"
                @close-popup="isPopupOpen = false">
            </popup-slots>
        </transition>
    </teleport>
</template>

<style scoped>

</style>
        <!-- @confirm-popup="popupConfirm" -->
