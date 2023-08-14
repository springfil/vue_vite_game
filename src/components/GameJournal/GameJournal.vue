<template>
    <div>
        <button @click="toggleModal()">
            {{ modalVisible ? 'Закрыть' : 'Открыть' }}
        </button>
        <Modal v-if="modalVisible" :log="log" />
    </div>
</template>

<script setup>
import Modal from '@/components/GameJournal/Modal.vue'
import { ref, inject, watch } from 'vue'

const damageMultiplierPerson = inject('data')
const damageMultiplierOpponent = inject('data2')
const log = ref([])
const modalVisible = ref(true)

function toggleModal() {
    modalVisible.value = !modalVisible.value
}

function attack() {
    let damagePerson
    if (damageMultiplierPerson.value === 2) {
        damagePerson = 10
    } else if (damageMultiplierPerson.value === 4) {
        damagePerson = 15
    } else {
        damagePerson = 20
    }

    const damageOpponent = damageMultiplierOpponent.value
    const time = new Date().toLocaleTimeString()
    log.value.push({ attacker: 'Nezuko', damagePerson, damageOpponent, time })
}

watch(damageMultiplierPerson, attack)
</script>
