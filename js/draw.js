import { state } from "./constants.js";
import { getId,getClass,removeElement,removeInventoryState,AddToInventoryState,drawElement } from "./utils.js";
import { changeCursor } from "./cursor.js";
import { setCharacter,checkPlaceForCharacter } from "./character.js";
import { themeChanger } from "./theme.js";


export function draw(matrix,gameBoard,state) {
    gameBoard.innerHTML='';
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            let str = '';
            let keys=Object.keys(state);
            str = `<div class="${state[keys[matrix[i][j]]].class}"  id='${i} ${j}' > </div>`
            gameBoard.innerHTML += str;
            
        }
    }
    
}
/// another ways 2 
export function drawInventoryStack(state,inventoryStack) {
      inventoryStack.innerHTML='';
      Object.keys(state).forEach(item=>{
      if(state[item].inventoryAmount>0 &&state[item].value<state.character.value){
            let str = '';
            str=`<div class='${item} sizing-box flexing-center ' >${state[item].inventoryAmount}</div>`
            inventoryStack.innerHTML += str; 
      }
    })
}

export function drawElemnetBack(state,gameBoard,inventoryStack,matrix){
   chosenElement(state,inventoryStack,gameBoard);
   gameBoard.addEventListener('click',(gridElement)=>{
    let elementClass=state.chosenElementFromInventory;
    let id =getId(gridElement);
    let lastElementID=id[0]+' '+id[1];
    if(state.chosenElementFromInventory !== '' &&state[elementClass].inventoryAmount>0 && state.isCharacter==false ){
        
            
        if(matrix[id[0]][id[1]]===state.sky.value){
            if(state.chosenTool===''){
                matrix[id[0]][id[1]]=state[elementClass].value;
                removeInventoryState(state,elementClass);// this to add element to the menu;
                drawElement(lastElementID,elementClass,state);
                drawInventoryStack(state,inventoryStack);
                
            }
            
            else{alert("You need To chose Tool")}
                   
         
        }
    }

   });
}

function chosenElement(state,inventoryStack,gameBoard){
    
    inventoryStack.addEventListener('click',(item)=>{
        if(!state.isCharacter){
        state.chosenElementFromInventory=item.target.classList[0];
        state.chosenTool=''
        changeCursor(state,gameBoard); 
        }
    });
}