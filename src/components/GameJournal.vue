<template>
  <div>
    <h2>Боевой журнал</h2>
    <ul>
      <li v-for="entry in log" :key="entry.time" class="log-entry">
        {{ entry.attacker }} нанес {{ entry.damage }} урона в {{ entry.time }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject, watch} from 'vue';

const damageMultiplier = inject('data')
const log = ref([]);

watch(damageMultiplier, (newDamageMultiplier) => {
    attack();
})

function attack() {
  const damage = 5 * damageMultiplier.value ;
  const time = new Date().toLocaleTimeString();
  log.value.push({  attacker: 'Nezuko', damage, time });
}
</script>

<style scoped>
.log-entry {
  padding: 5px;
  margin-bottom: 5px;
  background-color: #9e2626;
  border-radius: 5px;
}
</style>