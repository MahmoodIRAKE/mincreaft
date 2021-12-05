export function changeCursor(state,gameBoard){
  
  if(state.chosenTool!=='' && !state.isCharacter){
    gameBoard.style.cursor=`url('../assets/cursors/${state.chosenTool}.cur') 10 2 ,auto`
  }
  
  else if(state.chosenElementFromInventory!=='' && !state.isCharacter){
    gameBoard.style.cursor=`url('../assets/cursors/${state.chosenElementFromInventory}.cur') 10 10,auto`
  }
  else if(state.isCharacter){
    console.log("dsfa");
    gameBoard.style.cursor=`url('../assets/cursors/character.cur'),auto`
  }
  else{
    gameBoard.style.cursor=`grab`
  }

}