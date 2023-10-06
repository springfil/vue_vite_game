<script setup>
import { defineProps, ref, watch } from 'vue'

const props = defineProps({
    log: {
        type: Array,
        required: true,
    },
})

const isResizeEnabled = ref(false)

watch(
    () => props.log.length,
    (newLength) => {
        isResizeEnabled.value = newLength >= 3
    },
)
</script>

<template>
    <div class="journal">
        <transition-group
            name="slide-fade"
            tag="ul"
            class="log-container"
            :style="{ resize: isResizeEnabled ? 'vertical' : 'none' }">
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
    width: 700px;
    align-items: center;
    font-family: 'Montserrat';
    font-size: 14px;
    list-style-type: none;
    text-align: center;
    margin: 2px auto;
}
.log-container {
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    height: 74px;
    max-height: 148px;
}
</style>
