<template>
    <div>
        <button @click="toggleModal()">
            {{ modalVisible ? 'Закрыть' : 'Открыть модальное окно' }}
        </button>
        <div v-if="modalVisible" id="modal">
            <div v-if="modalVisible" id="modal">
                <h2>Боевой журнал</h2>
                <transition-group name="slide-fade" tag="div">
                    <ul>
                        <li
                            v-for="entry in log"
                            :key="entry.time"
                            class="log-entry">
                            {{ entry.attacker }} нанес {{ entry.damage }} урона в {{ entry.time }}
                        </li>
                    </ul>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'

const damageMultiplier = inject('data')
const log = ref([])
const modalVisible = ref(false)

function toggleModal() {
    modalVisible.value = !modalVisible.value
}

function attack() {
    const damage = 5 * damageMultiplier.value
    const time = new Date().toLocaleTimeString()
    log.value.push({ attacker: 'Nezuko', damage, time })
}

watch(damageMultiplier, (newDamageMultiplier) => {
    attack()
})
</script>

<style scoped>
.log-entry {
    padding: 5px;
    margin-bottom: 5px;
    background-color: #9e2626;
    border-radius: 5px;
    width: 250px;
    align-items: center;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
