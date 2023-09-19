import { Ref , ref, onBeforeMount, watch } from 'vue'
import { FIELD } from '@/constants/FIELD'
import { DEFAULT_DIFFICULT, MAX_DIFFICULT } from '@/constants/DIFFICULT'

export default function useGameInit(numberOfCells: Ref<number>) {
    const difficult = ref(DEFAULT_DIFFICULT)
    const fields = ref<Array<{ id: number; clicked: boolean; value: number }>>([])

    const init = () => {
        fields.value = []

        for (let i = 0; i < numberOfCells.value; i++) {
            fields.value.push({
                id: i,
                clicked: false,
                value: FIELD.EMPTY,
            })
        }
    }

    watch(difficult, (newDifficult) => {
        if (newDifficult > MAX_DIFFICULT) {
            difficult.value = MAX_DIFFICULT
        }
    })
    console.log(difficult.value)
    onBeforeMount(init)

    return {
        difficult,
        fields,
        init,
    }
}
