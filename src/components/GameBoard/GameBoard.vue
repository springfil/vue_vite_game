<script setup lang="ts">
import { Ref, ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import GameBoardLog from '@/components/GameBoard/GameBoardLog.vue'
import BoardItem from '@/components/GameBoard/BoardItem.vue'
import useGameInit from '@/composable/useGameInit'
import useGameStart from '@/composable/useGameStart'
import useGameProcess from '@/composable/useGameProcess'
import { GAME_STATUS } from '@/constants/GAME_STATUS'
import { NUMBER_OF_CEILS } from '@/constants/NUMBER_OF_CEILS'
import { useProgressBar } from '@/store/progressBar'
import { storeToRefs } from 'pinia'
import { injectStrict } from '@/utils/injectStrict'

const difficultToProcess = injectStrict<Ref<number>>('difficultToProcess');
const isInitialWidth = injectStrict<Ref<boolean>>('isInitialWidth');

const updateData = () => {
    difficultToProcess.value = difficult.value
    // console.log(difficult.value)
}

const store = useProgressBar()
const { hpLimit } = storeToRefs(store)
const numberOfCells = ref(NUMBER_OF_CEILS.SMALL_FIELD)
const gameStatus = ref(GAME_STATUS.NONE)
const dropdownOpen = ref(false)


const { difficult, fields, init } = useGameInit(numberOfCells)

const { start, canStartGame, canReset, canResize, rerolCount } = useGameStart(
    init,
    fields,
    difficult,
    numberOfCells,
    gameStatus,
    updateData,
    dropdownOpen
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

const boardWidth = ref(275)
const startButton = ref('Старт')

const fieldSizeOptions = [
  { value: NUMBER_OF_CEILS.SMALL_FIELD, sizeText: '5 x 5', width: [180, 275] },
  { value: NUMBER_OF_CEILS.MEDIUM_FIELD, sizeText: '6 x 6', width: [204, 330] },
  { value: NUMBER_OF_CEILS.LARGE_FIELD, sizeText: '7 x 7', width: [238, 385] },
]

const selectedFieldSize = ref(NUMBER_OF_CEILS.SMALL_FIELD)

const fieldSizeText = computed(() => {
  const selectedOption = fieldSizeOptions.find(option => option.value === selectedFieldSize.value)
  return selectedOption ? selectedOption.sizeText : ''
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectFieldSize = (value: number) => {
  selectedFieldSize.value = value
  toggleDropdown()
  updateBoardWidth()
}

const updateBoardWidth = () => {
  const { width } : {value: number, sizeText: string ,width: number[]} = fieldSizeOptions.find( ({ value }) => value === selectedFieldSize.value )!
  boardWidth.value = window.innerWidth <= 896 ? width[0] : width[1]
}

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

watch(
    () => selectedFieldSize.value, 
    (size) => {
        numberOfCells.value = size
        init()
    }
)
    
onMounted(() => {
    window.addEventListener('resize', updateBoardWidth)
    updateBoardWidth()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateBoardWidth)
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
                <button class="btn btn-start" @click="start" :disabled="!canStartGame">
                    {{ startButton }}
                </button>

                
                <div class="dropdown">
                    <button class="btn btn-field-size" @click="toggleDropdown" :disabled="!canResize">
                    {{ fieldSizeText }}
                    </button>
                        <div class="dropdown-menu" v-show="dropdownOpen">
                            <li class="dropdown-item" 
                            v-for="option in fieldSizeOptions" 
                            :key="option.value" 
                            :class="{ 'active': option.value === selectedFieldSize }"
                            @click="selectFieldSize(option.value) , toggleDropdown ">
                                {{ option.sizeText }}
                            </li>
                        </div>
                </div>


                <button class="btn btn-reset" @click="reset" :disabled="!canReset">
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

.btn-panel {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    font-family: 'Rubik';
    font-size: 16px;
    font-weight: 400;
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
    font-weight: 400;
}

/* .btn-start:hover {
    background: rgb(230, 50, 215, 0.5);
} */
.btn-start:active:focus {
    background: rgb(230, 50, 215, 0.5);
}

.btn-field-size:hover {
    background: rgba(206, 11, 11, 0.4);
}

.btn-reset:hover {
    background: rgba(11, 24, 206, 0.4);
}

.btn:disabled {
    cursor: not-allowed;
    background: rgb(255 255 255 / 15%);
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

.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
  left: 50%; 
  transform: translateX(-50%);
}
.dropdown-item {
  display: inline-block;
  padding: 0px 25px;
  color: #212529;
  cursor: pointer;
  border: 1px solid #ccc;
}
.dropdown-item:hover,
.dropdown-item.active {
  /* color: #fff; */
  background: rgba(206, 11, 11, 0.4);
}
</style>
