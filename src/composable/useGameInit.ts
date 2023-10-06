import {  Ref, ref, onBeforeMount, watch } from 'vue' 
import { DEFAULT_DIFFICULT, MAX_DIFFICULT } from '@/constants/DIFFICULT'
import { FIELD } from '@/constants/FIELD'
import { FieldType } from '@/types/fieldTypes'

export default function useGameInit(numberOfCells: Ref<number>) {
    const difficult = ref(DEFAULT_DIFFICULT)
    const fields = ref<Array< FieldType >>([])

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
