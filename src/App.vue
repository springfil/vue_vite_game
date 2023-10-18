<script setup lang="ts">
import { provide, ref } from 'vue'
import GameBoard from '@/components/GameBoard/GameBoard.vue'
import GamePerson from '@/components/GamePerson/GamePerson.vue'
import GameOpponent from '@/components/GameOpponent/GameOpponent.vue'
import GameJournal from '@/components/GameJournal/GameJournal.vue'
import PopupInit from '@/components/Popup/PopupInit.vue'
import ScreenRotation from '@/components/ScreenRotation/ScreenRotation.vue'
import DebagPanelVue from '@/components/DebagPanel/DebagPanel.vue'

 
const difficultToProcess = ref(1) 
provide('difficultToProcess', difficultToProcess)

const difficultToJournal = ref(1) 
provide('difficultToJournal', difficultToJournal)

const isInitialWidth = ref(true) 
provide("isInitialWidth", isInitialWidth)

const showDebugPanel = ref(false)
const clickCount = ref(0)

const toggleDebugPanel = () => {
  clickCount.value++
  if (clickCount.value === 5) {
    showDebugPanel.value = !showDebugPanel.value
    clickCount.value = 0
  }
}
</script>

<template>
    <div class="wrapper">
        <div class="centered-content">
            <img class="logo" src="./assets/logo.png" alt="Game logo" @click="toggleDebugPanel"/>
            <h2 class="h2">Коробка удачи</h2>
        </div>
        <div class="container">
            <div class="game-person">
                <game-person />
            </div>
            <div class="game-board">
                <div class="app">
                    <game-board />
                </div>
            </div>
            <div class="game-opponent">
                <game-opponent />
            </div>
        </div>
        <game-journal />
        <debag-panel-vue v-if="showDebugPanel"/>
    </div>
   
    <popup-init />
    <screen-rotation/>
</template>

<style scoped>
.wrapper {
    max-width: 1000px;
    /* padding-left: 15px;
    padding-right: 15px; */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.centered-content {
    text-align: center;
    font-family: 'Rubik Bold'
}
.container {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
    /* min-width: 960px; */
}

.app {
    font-family: 'Rubik Bold';
    letter-spacing: 1.8px;
    text-align: center;
   /* margin-top: 5px; */
}

.logo {
    width: 70px;
    animation: floatingAnimation 1.5s infinite ease-in-out alternate;
}

@keyframes floatingAnimation {
    from {
        transform: translate(0, 0);
    }
    to {
        transform: translate(0px, 10px);
    }
}


</style>
