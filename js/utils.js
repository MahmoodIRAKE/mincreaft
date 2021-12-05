export function getId(gridElement){
    let idStr=gridElement.target.id;
    let blockPoint=idStr.split(" ");
    blockPoint=blockPoint.map(item=>+item)// casting the numbers from char to int
    let x=blockPoint[0];
    let y=blockPoint[1];
    return [x,y];
}
export function getClass(gridElement){
    return gridElement.target.classList[0];
}
export function getClassByValue(num,state){
    return state[Object.keys(state)[num]].class;
}
export function AddToInventoryState(state,elementClass){    
    state[elementClass].inventoryAmount++;
}
export function removeInventoryState(state,elementClass){    
    state[elementClass].inventoryAmount--;
}
export function removeElement(idStr,elementClass,state){
    let removableDiv=document.getElementById(idStr);
    removableDiv.classList.remove(elementClass);
    removableDiv.classList.add(state.sky.class);
}
export function drawElement(idStr,elementClass,state){
    let addableDiv=document.getElementById(idStr);
    addableDiv.classList.add(elementClass);
    addableDiv.classList.remove(state.sky.class);
 
}