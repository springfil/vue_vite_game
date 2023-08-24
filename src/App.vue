<script setup>
import { provide, ref } from "vue";
import GameBoard from "@/components/GameBoard/GameBoard.vue";
import GamePerson from "@/components/GamePerson/GamePerson.vue";
import GameOpponent from "@/components/GameOpponent/GameOpponent.vue";
import GameJournal from '@/components/GameJournal/GameJournal.vue'
import PopupInit from "@/components/Popup/PopupInit.vue";

const data = ref(2);
provide("data", data);

const data2 = ref(NaN);
provide("data2", data2);
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <div class="left-column">
                <game-person />
            </div>
            <div class="center-column">
                <div class="app">
                    <img class="logo" src="./assets/logo.png" alt="Vue logo" />
                    <h2 class="h2">Коробка удачи</h2>
                    <game-board />
                </div>
            </div>
            <div class="right-column">
                <game-opponent />
            </div>
        </div>
        <popup-init />
        <game-journal />
    </div>
</template>

<style scoped>

.wrapper{
    max-width: 1000px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto
}
.container {
    display: flex;
    flex-direction: row;
    align-items: center; 
}

.left-column,
.right-column {
    flex: 1;
  
}

.center-column {
    flex: 2;
    display: flex;
    justify-content: center;
   
}

.app {
    font-family: Helvetica, sans-serif;
    text-align: center;
    margin-top: 40px;
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
