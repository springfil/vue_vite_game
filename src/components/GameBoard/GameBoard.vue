<script setup>
import { ref, inject } from 'vue'
import GameBoardLog from '@/components/GameBoard/GameBoardLog.vue'
import BoardItem from '@/components/GameBoard/BoardItem.vue'
import useGameInit from '@/composable/useGameInit'
import useGameStart from '@/composable/useGameStart'
import useGameProcess from '@/composable/useGameProcess'
import { GAME_STATUS } from '@/constants/GAME_STATUS'


const data = inject('data')
const isInitialWidth = inject('isInitialWidth')

const updateData = () => {
    data.value = difficult.value
    console.log(difficult.value)
}

const numberOfCells = 25
const gameStatus = ref(GAME_STATUS.NONE)

const { difficult, fields, init } = useGameInit(numberOfCells)

const { start, canStartGame, canReset} = useGameStart(
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
    init();
    difficult.value = 2
    updateData()
    isInitialWidth.value = false
    canReset.value = false
}
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
                :isReset="isReset"/>

            <div class="btn-panel">
                <button class="btn" @click="start" :disabled="!canStartGame">
                    Старт
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
    width: 250px;
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
}

.btn + .reset:hover{
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
