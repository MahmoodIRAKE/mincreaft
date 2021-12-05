import { drawElement ,removeElement,getClassByValue, getClass} from "./utils.js";
import { changeCursor } from "./cursor.js";


export function characterEngine(matrix,state,heartStack){
    downHeart(matrix,state)
    drawHeart(state,heartStack)
    characterDown(matrix,state)
}

export function removeCharcter(state,gameBoard){
        state.isCharacter=true;
        changeCursor(state,gameBoard); 
}
export function setCharacter(state,gameBoard){
    state.isCharacter=false;
    changeCursor(state,gameBoard); 
}
export function checkPlaceForCharacter(state,matrix,posotion){
    
    if(matrix[posotion[0]+1][posotion[1]]>state.cloud.value &&matrix[posotion[0]][posotion[1]]===state.sky.value){
        
        return true;
    }
    return false;
}
export function getCharacter(matrix,state){
    for (let i =0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
             if(matrix[i][j]===state.character.value){
                 return [i,j];
             }
        }
    }
    return [0,0]
}

/// function that tells to down thae hearts

export function downHeart(matrix,state){
   if(zombieAround(matrix,state)&&state.character.hearts>0){
       setTimeout(()=>{
        if(zombieAround(matrix,state)){
            console.log("yes")
            state.character.hearts--;  
        }
       },1000)
   }
   if(isHitbyDrop(matrix,state)&&state.character.hearts>0){
       state.character.hearts--;
       console.log(state);
   }
}

/// function that tells the charcter have zo,bie around him

function zombieAround(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let left=matrix[characterPosotion[0]][characterPosotion[1]-1];
    let right=matrix[characterPosotion[0]][characterPosotion[1]+1];
    if(left===state.zombie.value||right===state.zombie.value){
        return true;
    }
    return false;
}

/// function that tells if the character was hit by drop
function isHitbyDrop(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let up=matrix[characterPosotion[0]-1][characterPosotion[1]];
    if(up===state.drop.value){
        return true;
    }
    return false;
}

/// function that draws hearts 

export function drawHeart(state,heartStack) {
    heartStack.innerHTML='';
    for(let i=0;i<state.character.hearts;i++){
          
          let str = '';
          str=`<div class='heartsImg'></div>`
          heartStack.innerHTML += str; 
    }
  
}
/// function that tells the charcter to go down
function characterDown(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let down=matrix[characterPosotion[0]+1][characterPosotion[1]];
    if(down===state.sky.value){
        removeElement(characterPosotion[0]+' '+characterPosotion[1],state.character.class,state);
        matrix[characterPosotion[0]][characterPosotion[1]]=state.sky.value;
        characterPosotion[0]++;
         drawElement(characterPosotion[0]+' '+characterPosotion[1],state.character.class,state);
         matrix[characterPosotion[0]][characterPosotion[1]]=state.character.value;
    }
    return false;
}