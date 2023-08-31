<template>
    <div class="journal">
        <transition-group name="slide-fade" tag="div" class="log-container">
            <li v-for="entry in log" :key="entry.time" class="log-entry">
                <template v-if="entry.isNewGame">
                    Вы начали заново в {{ entry.time }}
                </template>
                <template v-else>
                    {{ entry.attacker }} нанес {{ entry.damagePerson }} урона,
                    получив от противника {{ entry.damageOpponent }} урона -
                    {{ entry.time }}
                </template>
            </li>
        </transition-group>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['log'])
</script>

<style scoped>
.journal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.log-entry {
    padding: 3px;
    margin-bottom: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    width: 500px;
    align-items: center;
    font-size: 14px;
    list-style-type: none;
    text-align: center;
    margin: 2px auto;
}
.log-container {
    display: inline-block;
    max-height: 74px;
    overflow-y: auto;
    overflow-x: hidden;
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
