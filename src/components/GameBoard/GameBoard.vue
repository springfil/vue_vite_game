<script setup>
import { ref, inject, watchEffect, watch } from 'vue'
import GameBoardLog from '@/components/GameBoard/GameBoardLog.vue'
import BoardItem from '@/components/GameBoard/BoardItem.vue'
import useGameInit from '@/composable/useGameInit'
import useGameStart from '@/composable/useGameStart'
import useGameProcess from '@/composable/useGameProcess'
import { GAME_STATUS } from '@/constants/GAME_STATUS'
import { NUMBER_OF_CEILS } from '@/constants/NUMBER_OF_CEILS'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'

const difficultToProcess = inject('difficultToProcess')
const isInitialWidth = inject('isInitialWidth')

const updateData = () => {
    difficultToProcess.value = difficult.value
    // console.log(difficult.value)
}

const store = useProgressBar()
const { hpLimit } = storeToRefs(store)
const numberOfCells = ref(NUMBER_OF_CEILS.SMALL_FIELD)
const gameStatus = ref(GAME_STATUS.NONE)

const { difficult, fields, init } = useGameInit(numberOfCells)

const { start, canStartGame, canReset, canResize, rerolCount } = useGameStart(
    init,
    fields,
    difficult,
    numberOfCells,
    gameStatus,
    updateData,
)

const { selectField, isNext, isReset } = useGameProcess(
    fields,
    gameStatus,
    difficult,
    start,
)

const reset = () => {
    init()
    difficult.value = 2
    updateData()
    hpLimit.value = true
    isInitialWidth.value = false
    canReset.value = false
    canResize.value = true
    gameStatus.value = GAME_STATUS.NONE
    rerolCount.value = 1
}

const fieldSize = ref('5 x 5')
const toggleFieldSize = () => {
    if (numberOfCells.value === NUMBER_OF_CEILS.SMALL_FIELD) {
        numberOfCells.value = NUMBER_OF_CEILS.MEDIUM_FIELD
        fieldSize.value = '6 x 6'
        init()
    } else if (numberOfCells.value === NUMBER_OF_CEILS.MEDIUM_FIELD) {
        numberOfCells.value = NUMBER_OF_CEILS.LARGE_FIELD
        fieldSize.value = '7 x 7'
        init()
    } else if (numberOfCells.value === NUMBER_OF_CEILS.LARGE_FIELD) {
        numberOfCells.value = NUMBER_OF_CEILS.SMALL_FIELD
        fieldSize.value = '5 x 5'
        init()
    }
}

const boardWidth = ref(250)
watchEffect(() => {
    if (numberOfCells.value === NUMBER_OF_CEILS.SMALL_FIELD) {
        boardWidth.value = 250
    }
    if (numberOfCells.value === NUMBER_OF_CEILS.MEDIUM_FIELD) {
        boardWidth.value = 300
    }
    if (numberOfCells.value === NUMBER_OF_CEILS.LARGE_FIELD) {
        boardWidth.value = 350
    }
})

const startButton = ref('Старт')
watch(gameStatus, (newStatus) => {
   // console.log('gameStatus - ', newStatus)
    if (
        newStatus === GAME_STATUS.NONE ||
        newStatus === GAME_STATUS.RESET
    ) {
        startButton.value = 'Старт'
    } else {
        startButton.value = 'Рерол'
    }
})

</script>

<template>
    <div class="test">
        <div class="board-wrapper">
            <div class="board">
                <board-item
                    :game-status="gameStatus"
                    v-for="field in fields"
                    :key="'item-' + field.id"
                    :field="field"
                    @select-field="selectField($event)" />
            </div>

            <game-board-log
                :difficult="difficult"
                :isNext="isNext"
                :isReset="isReset" />

            <div class="btn-panel">
                <button class="btn" @click="start" :disabled="!canStartGame">
                    {{ startButton }}
                </button>

                <button
                    class="btn field-size"
                    @click="toggleFieldSize"
                    :disabled="!canResize">
                    {{ fieldSize }}
                </button>

                <button class="btn reset" @click="reset" :disabled="!canReset">
                    Сброс
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.board-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.board {
    width: v-bind(boardWidth + 'px');
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 10px;
}

.btn {
    background: rgba(255, 255, 255, 0.5);
    color: black;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
    margin: 10px 5px;
    cursor: pointer;
    outline: none;
    font-family: 'Rubik';
    font-size: 16px;
}

.btn + .field-size:hover {
    background: rgba(206, 11, 11, 0.4);
}

.btn + .reset:hover {
    background: rgba(11, 24, 206, 0.4);
}
.btn:hover {
    background: rgb(230, 50, 215, 0.5);
}

.btn:disabled {
    cursor: not-allowed;
}

.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
