import { drawElement ,removeElement,getClassByValue, getClass} from "./utils.js";
import { getCharacter } from "./character.js";
//this is the engine of bats zombies
export function bastEngine(matrix,state,gameBoard){
  showbats(matrix,state)
  dropFire(matrix,state)
  moveBats(matrix,state)
  moveDrops(matrix,state)
  burnBats(matrix,state)
}

// function that tells to show zombies at night
export function showbats(matrix,state){
     let lastCloud=getLastCloudElement(matrix,state);    
    if(state.toAttack){
       
   for (let i = 0; i < matrix.length-1; i++) {
       for (let j = 0; j < matrix.length; j++) {
           if(matrix[i][j]===0&&state.batsNumber>0&&matrix[i][j]<state.bats.value && i>lastCloud){
               drawElement(i+' '+j,state.bats.class,state);
               state.batsNumber--;
               matrix[i][j]=state.bats.value
           }              
       }
   }
} 
} 

// function that tells bats to come under clouds

function getLastCloudElement(matrix,state){
    let res=0;
    for (let i = 1; i < matrix.length-1; i++) {
        for (let j = 1; j < matrix.length; j++) {
            if(matrix[i][j]===state.cloud.value){
               res=i;
            }              
        }
    }
    return res;
}
// function that burns the bats when it morning
export function burnBats(matrix,state){
    let batsArr=getBats(matrix,state);
    if(!state.toAttack){
        for (let i =0; i < batsArr.length; i++) {
            let batsPosotion=batsArr[i];
            removeElement(batsPosotion[0]+' '+batsPosotion[1],state.bats.class,state);
            let burnElement=document.getElementById(batsPosotion[0]+' '+batsPosotion[1]);
            burnElement.style.background= `url('../assets/images/fire.gif')  center center/cover`
            matrix[batsPosotion[0]][batsPosotion[1]]=state.sky.value;
            setTimeout(() => {
                burnElement.style.background='';
            },1000);
        }
}
}
// function that return all the elements ofthte bats
export function getBats(matrix,state){
    let res=[];
    for (let i =0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
             if(matrix[i][j]===state.bats.value){
                 res.push( [i,j]);
             }
        }
    }
    return res;
}



// function that move bats
export function moveBats(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let batsArr=getBats(matrix,state);
    if(state.toAttack){
        for (let i =0; i < batsArr.length; i++) {
            let elementPosotion=[];
            let batsPosotion=batsArr[i];
            drawBatsLeft(matrix,state,characterPosotion,batsPosotion,elementPosotion);
            drawBatsRight(matrix,state,characterPosotion,batsPosotion,elementPosotion)
           }              
       }
    }
// function that draws the zombie in the next left side
export function drawBatsLeft(matrix,state,characterPosotion,batsPosotion,elmentPosotion){
    let elementWay=isclearTheWay(matrix,state,characterPosotion,batsPosotion,elmentPosotion);
    let characterSide=isCharacterLeft(characterPosotion,batsPosotion) 
    if(!elementWay &&characterSide ){          
        removeElement(batsPosotion[0]+' '+batsPosotion[1],state.bats.class,state);
        matrix[batsPosotion[0]][batsPosotion[1]]=state.sky.value;
        batsPosotion[1]--;
         drawElement(batsPosotion[0]+' '+batsPosotion[1],state.bats.class,state);
         matrix[batsPosotion[0]][batsPosotion[1]]=state.bats.value;  
     }
}
// function that draws the zombie in the next right side 
export function drawBatsRight(matrix,state,characterPosotion,batsPosotion,elmentPosotion){
    let elementWay=isclearTheWay(matrix,state,characterPosotion,batsPosotion,elmentPosotion);
    let characterSide=isCharacterLeft(characterPosotion,batsPosotion) 
    if( !elementWay && !characterSide ){          
        removeElement(batsPosotion[0]+' '+batsPosotion[1],state.bats.class,state);
        matrix[batsPosotion[0]][batsPosotion[1]]=state.sky.value;
        batsPosotion[1]++;
         drawElement(batsPosotion[0]+' '+batsPosotion[1],state.bats.class,state);
         matrix[batsPosotion[0]][batsPosotion[1]]=state.bats.value;   
     } 
}

// function that tells that there is no elemnt 
export function isclearTheWay(matrix,state,characterPosotion,batsPosotion,elmentPosotion){
    let nextPosotion='';

    if(isCharacterLeft(characterPosotion,batsPosotion)){
        nextPosotion=matrix[batsPosotion[0]][batsPosotion[1]-1];
        elmentPosotion.push(batsPosotion[0])
        elmentPosotion.push(batsPosotion[1]-1)
    }
    else{
        nextPosotion=matrix[batsPosotion[0]][batsPosotion[1]+1];
        elmentPosotion.push(batsPosotion[0])
        elmentPosotion.push(batsPosotion[1]+1)
    }
    if(nextPosotion>state.cloud.value  ){
        
           return true;
    }
    else{
            return false
    }
}
// function that tells us the dierection of the character
export function isCharacterLeft(characterPosotion,batsPosotion){
    if(batsPosotion[1]>characterPosotion[1]){
        return true;
    }
    return false;
}

/// function that tells that bats to drop fire

function dropFire(matrix,state){
    let batsArr=getBats(matrix,state);
    if(state.toAttack){
        
        for (let i =0; i < batsArr.length; i++) {
            let elementPosotion=[];
            
            let batsPosotion=batsArr[i];
            let dropPosotion=[batsPosotion[0]+1,batsPosotion[1]];
            drawDropDown(matrix,state,dropPosotion);
           } 
                    
    
}
}

function drawDropDown(matrix,state,dropPosotion){
    
    if(matrix[dropPosotion[0]+1][dropPosotion[1]]<state.cloud.value){ 
                
        removeElement(dropPosotion[0]+' '+dropPosotion[1],state.drop.class,state);
        matrix[dropPosotion[0]][dropPosotion[1]]=state.sky.value;
         dropPosotion[0]++;
         drawElement(dropPosotion[0]+' '+dropPosotion[1],state.drop.class,state);
         matrix[dropPosotion[0]][dropPosotion[1]]=state.drop.value; 
         
     }
    
}

function vanishDrop(matrix,state,dropPosotion){
    setTimeout(()=>{ 
    if(matrix[dropPosotion[0]+1][dropPosotion[1]]>state.cloud.value){          
        removeElement(dropPosotion[0]+' '+dropPosotion[1],state.drop.class,state);
        matrix[dropPosotion[0]][dropPosotion[1]]=state.sky.value; 
     }
    },1000) 
    
}

export function getdrops(matrix,state){
    let res=[];
    for (let i =0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
             if(matrix[i][j]===state.drop.value){
                 res.push( [i,j]);
             }
        }
    }
    return res;
}

function moveDrops(matrix,state){
    let dropArr=getdrops(matrix,state);
    
        
        for (let i =0; i < dropArr.length; i++) {
            
            let dropPosotion=dropArr[i];
            
            if(matrix[dropPosotion[0]+1][dropPosotion[1]]<state.cloud.value){ 
                
                removeElement(dropPosotion[0]+' '+dropPosotion[1],state.drop.class,state);
                matrix[dropPosotion[0]][dropPosotion[1]]=state.sky.value;
                 dropPosotion[0]++;
                 drawElement(dropPosotion[0]+' '+dropPosotion[1],state.drop.class,state);
                 matrix[dropPosotion[0]][dropPosotion[1]]=state.drop.value; 
                 
             }
            vanishDrop(matrix,state,dropPosotion);
           } 
                    
    

}


