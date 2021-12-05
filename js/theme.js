import { state } from "./constants.js";


export function themeChanger(chosingelemnt){
    let i=-1;
    chosingelemnt.addEventListener('click',(gridElement)=>{
        
       i= parseInt(gridElement.target.id);
    });
    return i;
}
