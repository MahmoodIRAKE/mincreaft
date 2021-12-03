import { state } from "./constants.js";
import {draw,drawInventoryStack} from './draw.js'
/// delete element from the game boarde when clking it 
const inventoryStack = document.querySelector('.stack')


export function removeFromGameBoard(matrix,gameBoard){
    
    gameBoard.addEventListener('click',(gridElement)=>{
        let destroy=false;
         if(state.chosenElementFromInventory === ''){
        let idStr=gridElement.target.id;
        let blockPoint=idStr.split(" ");
        blockPoint=blockPoint.map(item=>+item)// casting the numbers from char to int
        let x=blockPoint[0];
        let y=blockPoint[1];
        if(matrix[x][y]>state.cloud){
                 if(state.chosenTool!==''){
                 for(let k=0;k<state.tools[state.chosenTool].length;k++){
                     let element=state.tools[state.chosenTool][k];
                    if(matrix[x][y]===state[element]){
                       destroy=true;
                    }
                 
                }
            }
            else{alert("You need To chose Tool")}
                   
         
          if(destroy){
            Object.keys(state).forEach(key=>{
               if( state[key]===matrix[x][y]){
                   state.inventory[key]++;
               }
            });
            matrix[x][y]=state.sky;
            let removableDiv=document.getElementById(idStr);
            removableDiv.classList.remove(gridElement.target.classList[0]);
            removableDiv.classList.add('sky');
            drawInventoryStack(state,inventoryStack);
        }
        }
    }
    })
}


//inventoryStack.addEventListener