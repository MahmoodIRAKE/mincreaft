export function choosenTool(state,inventoryTools){
   inventoryTools.addEventListener('click',(item)=>{
    state.chosenTool=item.target.classList[0];
    state.chosenElementFromInventory='';
 });
}

