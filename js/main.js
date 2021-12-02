import {matrix,state} from "./constants.js";
import {draw,drawInventoryStack} from './draw.js'
import {removeFromGameBoard} from './remove.js'

const gameBoard = document.querySelector('.game-board')


function main() {
    draw(matrix,gameBoard);
    removeFromGameBoard(matrix,gameBoard);
}



main();