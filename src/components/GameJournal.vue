<template>
    <div>
        <button @click="toggleModal()">
            {{ modalVisible ? 'Закрыть' : 'Открыть модальное окно' }}
        </button>
        <Modal v-if="modalVisible" :log="log" />
    </div>
</template>

<script setup>
import Modal from './Modal.vue'
import { ref, inject, watch } from 'vue'

const damageMultiplier = inject('data')
const log = ref([])
const modalVisible = ref(true)

function toggleModal() {
    modalVisible.value = !modalVisible.value
}

function attack() {
    const damage = 5 * damageMultiplier.value
    const time = new Date().toLocaleTimeString()
    log.value.push({ attacker: 'Nezuko', damage, time })
}

watch(damageMultiplier, attack)
</script>
