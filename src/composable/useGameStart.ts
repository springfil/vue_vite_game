import { FIELD } from '@/constants/FIELD'
import { FieldType } from '@/types/fieldTypes'
import { GAME_STATUS } from '@/constants/GAME_STATUS'
import { GAME_SPEED } from '@/constants/GAME_SPEED'
import { computed, ref, watch, Ref } from 'vue' 
import { getRandom } from '@/utils/getRandom'
import { injectStrict } from '@/utils/injectStrict'

export default function useGameStart(
    init: () => void,
    fields: Ref<Array<FieldType>>,
    difficult: Ref<number>,
    numberOfCells: Ref<number>,
    gameStatus: Ref<GAME_STATUS>,
    updateData:() => void,
    dropdownOpen: Ref<boolean>
) {
    let timerId: NodeJS.Timeout
    const isInitialWidth = injectStrict<Ref<boolean>>('isInitialWidth');
    const canReset = ref(false)
    const canResize = ref(true)
    const rerolCount = ref(1)

    const start = () => {
        updateData()
        init()
        prepareGame()
        increaseRerolCount()
        isInitialWidth.value = true
        canReset.value = true
        canResize.value = false
        dropdownOpen.value = false
    }

    const increaseRerolCount = () => {
        if (rerolCount.value < 3) {
            rerolCount.value = rerolCount.value + 1
            // console.log('rerolCount.value - ', rerolCount.value)
        }
    }

    const prepareGame = () => {
        gameStatus.value = GAME_STATUS.PREVIEW

        for (let i = 0; i < difficult.value; ) {
            const index = getRandom(0, numberOfCells.value - 1)

            if (fields.value[index].value === FIELD.FILLED) {
                continue
            }

            fields.value[index].value = FIELD.FILLED
            i = i + 1
        }
        
        clearTimeout(timerId)

        timerId = setTimeout(() => {
            gameStatus.value = GAME_STATUS.STARTED
        }, GAME_SPEED) 
    }

    const canStartGame = computed(() => {
        return (
            gameStatus.value !== GAME_STATUS.PREVIEW &&
            gameStatus.value !== GAME_STATUS.NEXT &&
            rerolCount.value < 3
        )
    })

    watch(gameStatus, (newStatus) => {
        //console.log(newStatus)
        if (newStatus === GAME_STATUS.NEXT || newStatus === GAME_STATUS.RESET) {
            rerolCount.value = 0
        }
    })
    return {
        start,
        canStartGame,
        canReset,
        canResize,
        rerolCount,
    }
}
