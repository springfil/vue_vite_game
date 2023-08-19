<template>
    <div>
        <button @click="toggleJournal()">
            {{ journalVisible ? 'Закрыть' : 'Открыть' }}
        </button>
        <Journal v-if="journalVisible" :log="log" />
    </div>
</template>

<script setup>
import Journal from '@/components/GameJournal/Journal.vue'
import { ref, inject, watch, computed } from 'vue'

const damageMultiplierPerson = inject('data')
const damageMultiplierOpponent = inject('data2')
const log = ref([])
const journalVisible = ref(true)

function toggleJournal() {
    journalVisible.value = !journalVisible.value
}

const damagePerson = computed(() => {
    if (damageMultiplierPerson.value === 2) {
        return 10
    } else if (damageMultiplierPerson.value === 4) {
        return 15
    } else {
        return 20
    }
})

function attack() {
    const damageOpponent = damageMultiplierOpponent.value
    const time = new Date().toLocaleTimeString()
    log.value.unshift({
        attacker: 'Nezuko',
        damagePerson: damagePerson.value,
        damageOpponent,
        time,
    })
}

watch(damageMultiplierPerson, attack)
</script>
