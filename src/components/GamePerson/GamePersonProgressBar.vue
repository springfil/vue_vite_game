<script setup lang="ts">
import { computed, watch, Ref, ref } from 'vue'
import { getRandom } from '@/utils/getRandom'
import { injectStrict } from '@/utils/injectStrict'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

interface Props {
    progressBarWidth: { shift: number }
}

const props = defineProps<Props>()

const difficultToJournal = injectStrict<Ref<number>>('difficultToJournal')
const isInitialWidth = injectStrict<Ref<boolean>>('isInitialWidth')

const store = useProgressBar()
const { hpPerson, hpLimit } = storeToRefs(store)

const medianShift = ref(1)

const shifted = computed(() => {
    if (!hpLimit.value) return

    if (!isInitialWidth.value) {
        hpPerson.value = 180
        return hpPerson.value
    }

    if (
        [10, 15, 20, 25, 30, 35].includes(props.progressBarWidth.shift) &&
        isInitialWidth.value
    ) {
        hpPerson.value =
            hpPerson.value -
            getRandom(medianShift.value - getRandom(0, 5), medianShift.value + getRandom(-7, 2))
        return hpPerson.value
    }
})

watch(
    () => props.progressBarWidth.shift,
    (newShift) => {
        if ([10, 15, 20, 25, 30, 35].includes(newShift)) {
            medianShift.value = newShift
        } else {
            medianShift.value = 10
        }
    },
)

watch(
    () => hpPerson.value,
    (newHp) => {
        if (newHp < 0) {
            console.log('персон стал 0')
            hpPerson.value = 0
            hpLimit.value = false
        }
    },
)

watch(
    () => shifted.value,
    (newHp, oldHp = 180) => {
        if (newHp) {
            difficultToJournal.value = oldHp - newHp
        }
        if (!newHp) {
            difficultToJournal.value = -oldHp
        }
        console.log(
            `difficultToJournal.value ${difficultToJournal.value} = oldHp ${oldHp} - newHp ${newHp}`,
        )
    },
)
</script>

<template>
    <div class="progress-bar-frame">
        <div class="progress-bar" :style="{ width: hpPerson + 'px' }"></div>
    </div>
</template>

<style scoped>
.progress-bar-frame {
    border: 2px solid black;
    border-radius: 15px;
    height: 15px;
    margin-top: 10px;
    width: 180px;
}

.progress-bar {
    height: 100%;
    background-color: #c0392b;
    border-radius: 15px;
    transition: width 1s;
}

@media (max-width: 750px) {
    .progress-bar-frame{
        height: 10px;
    } 
}
</style>
