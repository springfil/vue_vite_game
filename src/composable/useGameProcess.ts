import { FIELD } from '@/constants/FIELD'
import { GAME_STATUS } from '@/constants/GAME_STATUS'
import { DEFAULT_DIFFICULT } from '@/constants/DIFFICULT'
import { computed, nextTick, Ref } from 'vue' //
import { GAME_SPEED } from '@/constants/GAME_SPEED'
import { FieldType } from '@/types/fieldTypes'

export default function useGameProcess(
    fields: Ref<Array<FieldType>>,
    gameStatus: Ref<GAME_STATUS>,
    difficult: Ref<number>,
    start: () => void
) {
    let timerId: NodeJS.Timeout 

    const selectField = (id: number) => {
        const index = fields.value.findIndex((field) => {
            return field.id === id
        })

        if (index > -1 && !fields.value[index].clicked) {
            fields.value[index].clicked = true

            checkGame()
        }
    }

    const checkGame = () => {
        const errorIndex = fields.value.findIndex((field) => {
            return field.clicked && field.value === FIELD.EMPTY
        })

        if (errorIndex > -1) {
            setGameOver()
            return
        }
        //в поле есть заполненная ячейка и мы по ней не кликнули
        const notFoundItemIndex = fields.value.findIndex((field) => {
            return !field.clicked && field.value === FIELD.FILLED
        })

        if (notFoundItemIndex === -1) {
            setWin()
        }
    }

    const setGameOver = () => {
        gameStatus.value = GAME_STATUS.RESET
        difficult.value = DEFAULT_DIFFICULT
    }

    const setWin = () => {
        gameStatus.value = GAME_STATUS.NEXT
        clearTimeout(timerId)

        timerId = setTimeout(async () => {
            difficult.value += 2
            console.log(difficult.value)
            await nextTick()
            start()
        }, GAME_SPEED)
    }

    const isNext = computed(() => {
        return gameStatus.value === GAME_STATUS.NEXT
    })

    const isReset = computed(() => {
        return gameStatus.value === GAME_STATUS.RESET
    })

    return {
        selectField,
        isNext,
        isReset,
    }
}
