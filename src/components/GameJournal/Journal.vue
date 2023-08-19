<template>
    <div id="journal">
        <h2>Боевой журнал</h2>
        <transition-group name="slide-fade" tag="div" class="log-container">
            <li v-for="entry in log" :key="entry.time" class="log-entry">
                {{ entry.attacker }} нанес {{ entry.damagePerson }} урона,
                получив от противника {{ entry.damageOpponent }} урона -
                {{ entry.time }}
            </li>
        </transition-group>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['log'])
</script>

<style scoped>
.log-entry {
    padding: 5px;
    margin-bottom: 5px;
    background-color: #9e2626;
    border-radius: 5px;
    width: 500px;
    align-items: center;
}
.log-container {
    max-height: 100px;
    overflow-y: auto;
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
