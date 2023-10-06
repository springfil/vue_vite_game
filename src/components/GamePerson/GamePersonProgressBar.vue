<script setup lang="ts">
import { defineProps, computed, watch, Ref } from 'vue'
import { getRandom } from '@/utils/getRandom'
import { injectStrict } from '@/utils/injectStrict'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const props = defineProps({
    progressBarWidth: {
        type: Object,
        required: true,
    },
})

const difficultToJournal = injectStrict<Ref<number>>('difficultToJournal')
const isInitialWidth = injectStrict<Ref<boolean>>('isInitialWidth')

const store = useProgressBar()
const { hpPerson, hpLimit } = storeToRefs(store)

const minShift = computed(() => {
    if (props.progressBarWidth.shift === 10) return 5

    if (props.progressBarWidth.shift === 15) return 8

    if (props.progressBarWidth.shift === 20) return 10

    if (props.progressBarWidth.shift === 25) return 25

    if (props.progressBarWidth.shift === 30) return 20

    if (props.progressBarWidth.shift === 35) return 30

    return 5
})

const maxShift = computed(() => {
    if (props.progressBarWidth.shift === 10) return 10

    if (props.progressBarWidth.shift === 15) return 16

    if (props.progressBarWidth.shift === 20) return 25

    if (props.progressBarWidth.shift === 25) return 25

    if (props.progressBarWidth.shift === 30) return 37

    if (props.progressBarWidth.shift === 35) return 45

    return 10
})

const shifted = computed(() => {
    if (!hpLimit.value) {
        return
    }

    if (!isInitialWidth.value) {
        hpPerson.value = 180
        return hpPerson.value
    }

    if (
        [10, 15, 20, 25, 30, 35].includes(props.progressBarWidth.shift) &&
        isInitialWidth.value
    ) {
        hpPerson.value =
            hpPerson.value - getRandom(minShift.value, maxShift.value)
        return hpPerson.value
    }
})

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
})
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
</style>
