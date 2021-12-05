import {matrix,state,dayToNight} from "./constants.js";
import {draw,drawInventoryStack,drawElemnetBack} from './draw.js'
import {removeFromGameBoard} from './remove.js'
import {choosenTool} from './tools.js'
import { timer } from "./timer.js";
import {nightAndDay} from './changingDay.js'
import { bastEngine } from "./bats.js";
import {characterEngine} from "./character.js"
import { zombieEngine} from "./zombie.js";
import { themeChanger } from "./theme.js";
const gameBoard = document.querySelector('.game-board')
const inventoryStack = document.querySelector('.stack')
const inventoryTools=document.querySelector('.tools')
const timerText=document.querySelector('.timer')
const heartStack=document.querySelector('.hearts')
const gameOver=document.querySelector('.game-over')
const chosingelemnt=document.querySelector('.choosing-theme');
const mainPage=document.querySelector('.button1');
const gamePage=document.querySelector('.container');
let lastRenderTime = 0;
chosingelemnt.addEventListener('click',(gridElement)=>{
        
   let i= parseInt(gridElement.target.id)-1;
   if(i>=0){
   chosingelemnt.classList.remove('flexing-center');
   chosingelemnt.classList.add('flexing-center1');
   gamePage.classList.remove('diplying');
  
   }

function main(currentTime) {
   
    if(state[i].currentWave>state[i].maxWave){
        gameOver.innerText="You Win"
        gameOver.style.display='block'
    }
    else{
    if(state[i].character.hearts<=0){
       gameOver.style.display='block'
    }
 
    else{
        gameOver.style.display='none'
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / 1) return;
    lastRenderTime = currentTime;
    timer(timerText,state[i])
    nightAndDay(state[i],gameBoard,dayToNight)
    zombieEngine(matrix,state[i],gameBoard)
    bastEngine(matrix,state[i],gameBoard)
    characterEngine(matrix,state[i],heartStack)
    }
}
}

 window.requestAnimationFrame(main);
 mainEngine()


 function mainEngine() {
    
    draw(matrix,gameBoard,state[i]);
    choosenTool(state[i],inventoryTools,gameBoard)
    drawElemnetBack(state[i],gameBoard,inventoryStack,matrix);
    removeFromGameBoard(matrix,gameBoard,state[i],inventoryStack);
    
 }

});


const startPage=document.querySelector('.start-page')

mainPage.addEventListener('click',(item)=>{
    console.log(item)
    startPage.classList.remove('flexing-center');
    startPage.classList.add('flexing-center1');
    chosingelemnt.classList.remove('flexing-center1');
    chosingelemnt.classList.add('flexing-center');
})