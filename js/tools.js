import { changeCursor } from "./cursor.js";
export function choosenTool(state,inventoryTools,gameBoard){
   
   inventoryTools.addEventListener('click',(item)=>{
      if(!state.isCharacter){
    state.chosenTool=item.target.classList[0];
    state.chosenElementFromInventory='';
    changeCursor(state,gameBoard);
      } 
 });
}

