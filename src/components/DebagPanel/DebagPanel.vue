<script setup lang="ts">
import { ref } from 'vue'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const store = useProgressBar()
const { hpPerson, hpOpponent } = storeToRefs(store)

const isValidInput = ref(true)

const validateInput = (value: number) => {
    if (value >= 0 && value <= 180) {
        isValidInput.value = true
    } else {
        isValidInput.value = false
        hpPerson.value = 180
        hpOpponent.value = 180
    }
}
</script>

<template>
    <div class="debug-panel">
        <div class="debug-panel-input">
            <label for="hp-person">HP Person:</label>
            <input
                id="hp-person"
                type="number"
                v-model.lazy="hpPerson"
                @input="validateInput(hpPerson)" 
                min="0"
                max="180" />

            <label for="hp-opponent">HP Opponent:</label>
            <input
                id="hp-opponent"
                type="number"
                v-model.lazy="hpOpponent"
                @input="validateInput(hpOpponent)"
                min="0"
                max="180" />
        </div>
        <div class="debug-panel-message" v-if="!isValidInput">
            Диапазон 0 - 180
        </div>
    </div>
</template>

<style scoped>
</style>