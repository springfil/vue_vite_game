<template>
    <div>
        <Journal :log="log" />
    </div>
</template>

<script setup>
import Journal from '@/components/GameJournal/Journal.vue'
import { ref, inject, watch, computed } from 'vue'

const damageMultiplierPerson = inject('data')
const damageMultiplierOpponent = inject('data2')
const isInitialWidth = inject('isInitialWidth')

const log = ref([])

const damagePerson = computed(() => {
    if (damageMultiplierPerson.value === 2) {
        return 10
    } else if (damageMultiplierPerson.value === 4) {
        return 15
    } else if (damageMultiplierPerson.value === 6) {
        return 20
    } else if (damageMultiplierPerson.value === 8) {
        return 25
    } else if (damageMultiplierPerson.value === 10) {
        return 30
    } else if (damageMultiplierPerson.value === 12) {
        return 35
    } else if (damageMultiplierPerson.value === 14) {
        return 40
    } else if (damageMultiplierPerson.value === 16) {
        return 45
    }
})

const attack = () => {
    if (!isInitialWidth.value) {
        log.value = [
            {
                isNewGame: true,
                time: new Date().toLocaleTimeString(),
            },
        ]
    } else {
        const damageOpponent = damageMultiplierOpponent.value
        const time = new Date().toLocaleTimeString()
        log.value.unshift({
            attacker: 'Nezuko',
            damagePerson: damagePerson.value,
            damageOpponent,
            time,
        })
    }
}

watch([damageMultiplierPerson, isInitialWidth], attack)
</script>
