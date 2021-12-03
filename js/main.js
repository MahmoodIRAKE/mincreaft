import {matrix,state} from "./constants.js";
import {draw,drawInventoryStack,drawElemnetBack} from './draw.js'
import {removeFromGameBoard} from './remove.js'
import {choosenTool} from './tools.js'

const gameBoard = document.querySelector('.game-board')
const inventoryStack = document.querySelector('.stack')
const inventoryTools=document.querySelector('.tools')
function main() {
    draw(matrix,gameBoard);
    choosenTool(state,inventoryTools)
    removeFromGameBoard(matrix,gameBoard);
    drawElemnetBack(state,gameBoard,inventoryStack,matrix);
    
}



main();