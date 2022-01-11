import { state } from "./constants.js";
import {draw,drawInventoryStack} from './draw.js'
import { getId,getClass,removeElement,AddToInventoryState,drawElement } from "./utils.js";
import { changeCursor } from "./cursor.js";
import { removeCharcter,setCharacter,checkPlaceForCharacter } from "./character.js";
/// delete element from the game boarde when clking it 



export function removeFromGameBoard(matrix,gameBoard,state,inventoryStack){
    
    gameBoard.addEventListener('click',(gridElement)=>{
         
        let elementClass=getClass(gridElement)
        let id =getId(gridElement);
        let lastElementID=id[0]+' '+id[1];
        
    if(state.isCharacter){
        
            if(checkPlaceForCharacter(state,matrix,id)){
                drawElement(lastElementID,state.character.class,state);
                
                setCharacter(state,gameBoard)
                matrix[id[0]][id[1]]=state.character.value;
           
            }       
    }
        
         
    else if(matrix[id[0]][id[1]]===state.character.value && !state.isCharacter){
        removeCharcter(state,gameBoard);
        removeElement(lastElementID,elementClass,state);
        matrix[id[0]][id[1]]=state.sky.value;
    }
    
    if(state.chosenElementFromInventory === '' && !state.isCharacter ){

    
        if(matrix[id[0]][id[1]]>state.cloud.value ){
            if(state[elementClass].tool===state.chosenTool){
                matrix[id[0]][id[1]]=state.sky.value;
                AddToInventoryState(state,elementClass);// this to add element to the menu;
                removeElement(lastElementID,elementClass,state);
                drawInventoryStack(state,inventoryStack);
            }         
        }
    }})
}


//inventoryStack.addEventListener