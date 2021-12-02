import { state } from "./constants.js";
import {draw,drawInventoryStack} from './draw.js'
/// delete element from the game boarde when clking it 
const inventoryStack = document.querySelector('.stack')


export function removeFromGameBoard(matrix,gameBoard){
    gameBoard.addEventListener('click',(gridElement)=>{
        //Todo
        /// if(clkic is to remove )
        let idStr=gridElement.target.id;
        let blockPoint=idStr.split(" ");
        blockPoint=blockPoint.map(item=>+item)// casting the numbers from char to int
        let x=blockPoint[0];
        let y=blockPoint[1];
        if(matrix[x][y]>state.cloud){
            Object.keys(state).forEach(key=>{
               if( state[key]===matrix[x][y]){
                   state.inventory[key]++;
               }
            });
            matrix[x][y]=state.sky;
            let removableDiv=document.getElementById(idStr);
            console.log(removableDiv);
            removableDiv.style.background='transparent';
            drawInventoryStack(state,inventoryStack);
        }

    })
}


//inventoryStack.addEventListener