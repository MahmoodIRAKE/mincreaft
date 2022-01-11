import { drawElement ,removeElement,getClassByValue, getClass} from "./utils.js";
import { getCharacter } from "./character.js";


// this is the main engine for the zombie that runs everything in the game 
export function zombieEngine(matrix,state){
    zombieDirection(matrix,state)
    showZombie(matrix,state)
    zombieFellToGround(matrix,state)
    moveZombie(matrix,state)
    burnZombie(matrix,state)
    destroyElemente(matrix,state)
}


// function that tells to show zombies at night
     export function showZombie(matrix,state){
         
         if(state.toAttack){
            
        for (let i = 1; i < matrix.length-1; i++) {
            for (let j = 1; j < matrix.length; j++) {
                if(matrix[i][j]===0&&matrix[i+1][j]>state.cloud.value&&state.zombieNumber>0&&matrix[i+1][j]<state.zombie.value){
                    drawElement(i+' '+j,state.zombie.class,state);
                    state.zombieNumber--;
                    matrix[i][j]=state.zombie.value
                }              
            }
        }
     } 
    } 

 //function that tell the zombie to attack character
export function moveZombie(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let zombieArr=getZombie(matrix,state);
    if(state.toAttack){
        for (let i =0; i < zombieArr.length; i++) {
            let elementPosotion=[];
            let zombiePosotion=zombieArr[i];
            drawZombieLeft(matrix,state,characterPosotion,zombiePosotion,elementPosotion);
            drawZombieRight(matrix,state,characterPosotion,zombiePosotion,elementPosotion)
           }              
       }
    }
// function that draws the zombie in the next left side
export function drawZombieLeft(matrix,state,characterPosotion,zombiePosotion,elmentPosotion){
    let elementWay=isElementinTheWay(matrix,state,characterPosotion,zombiePosotion,elmentPosotion);
    let characterSide=isCharacterLeft(characterPosotion,zombiePosotion) 
    if(zombiePosotion[1]>characterPosotion[1]+1 && !elementWay &&characterSide ){          
        removeElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
        matrix[zombiePosotion[0]][zombiePosotion[1]]=state.sky.value;
        zombiePosotion[1]--;
         drawElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
         matrix[zombiePosotion[0]][zombiePosotion[1]]=state.zombie.value;
         
        
     }
}


// function that draws the zombie in the next right side 
export function drawZombieRight(matrix,state,characterPosotion,zombiePosotion,elmentPosotion){
    let elementWay=isElementinTheWay(matrix,state,characterPosotion,zombiePosotion,elmentPosotion);
    let characterSide=isCharacterLeft(characterPosotion,zombiePosotion) 
    if(zombiePosotion[1]<characterPosotion[1]-1 && !elementWay && !characterSide ){          
        removeElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
        matrix[zombiePosotion[0]][zombiePosotion[1]]=state.sky.value;
        zombiePosotion[1]++;
         drawElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
         matrix[zombiePosotion[0]][zombiePosotion[1]]=state.zombie.value;   
     } 
}
// this function turn the zombie to the direction of the character
  export function zombieDirection(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let zombieArr=getZombie(matrix,state);
    for (let i =0; i < zombieArr.length; i++) {
        let zombiePosotion=zombieArr[i];  
        if(isCharacterLeft(characterPosotion,zombiePosotion)){
            let zombieElement=document.getElementById(zombiePosotion[0]+' '+zombiePosotion[1]);
            zombieElement.style.transform='scaleX(-1)'
        }
   }
  } 




// function that burns the zombies
export function burnZombie(matrix,state){
    let zombieArr=getZombie(matrix,state);
    if(!state.toAttack){
        for (let i =0; i < zombieArr.length; i++) {
            let zombiePosotion=zombieArr[i];
            removeElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
            let burnElement=document.getElementById(zombiePosotion[0]+' '+zombiePosotion[1]);
            burnElement.style.background= `url('../assets/images/fire.gif')  center center/cover`
            matrix[zombiePosotion[0]][zombiePosotion[1]]=state.sky.value;
            setTimeout(() => {
                burnElement.style.background='';
            },1000);
        }
}
}

// function that tells the zombie to destroy elements

export function destroyElemente(matrix,state){
    let characterPosotion=getCharacter(matrix,state);
    let zombieArr=getZombie(matrix,state);
    
    if(state.toAttack){
        for (let i =0; i < zombieArr.length; i++) {
            let elementPosotion=[];
            let zombiePosotion=zombieArr[i];
            let check=isElementinTheWay(matrix,state,characterPosotion,zombiePosotion,elementPosotion);
            if(check){
                elemntDefenseDown(matrix,state,elementPosotion);
            }
        }    
    }
}


// function that returns the zombie posotion 
export function getZombie(matrix,state){
    let res=[];
    for (let i =0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
             if(matrix[i][j]===state.zombie.value){
                 res.push( [i,j]);
             }
        }
    }
    return res;
}

// function that returns false if the character is left side and true if the character is in th ght side of the zombie 

export function isCharacterLeft(characterPosotion,zombiePosotion){
    if(zombiePosotion[1]>characterPosotion[1]){
        return true;
    }
    return false;
}
//function that check if there is an element in the zombie way  and save the element posotion in next posotion parameter
export function isElementinTheWay(matrix,state,characterPosotion,zombiePosotion,elmentPosotion){
    let nextPosotion='';

    if(isCharacterLeft(characterPosotion,zombiePosotion)){
        nextPosotion=matrix[zombiePosotion[0]][zombiePosotion[1]-1];
        elmentPosotion.push(zombiePosotion[0])
        elmentPosotion.push(zombiePosotion[1]-1)
    }
    else{
        nextPosotion=matrix[zombiePosotion[0]][zombiePosotion[1]+1];
        elmentPosotion.push(zombiePosotion[0])
        elmentPosotion.push(zombiePosotion[1]+1)
    }
    if(nextPosotion>state.cloud.value  ){
        
           return true;
    }
    else{
            return false
    }
}

// function that get the elemnt postion and count thedefense of this elemnt down 
// tp let the zombie detroy it accorrding to the elment defense strength that we gave in the state

export function elemntDefenseDown(matrix,state,elementPosotion){
    
    let elmentClass=document.getElementById(elementPosotion[0]+" "+elementPosotion[1]);
    elmentClass=elmentClass.classList[0]
    console.log(elmentClass)
    setTimeout(()=>{
        if( isZombieStillAround(matrix,state,elementPosotion)){
         removeElement(elementPosotion[0]+" "+elementPosotion[1],state.sky.class,state);
         matrix[elementPosotion[0]][elementPosotion[1]]=state.sky.value
        }
    }, state[elmentClass].zombieDefense*1000)
}

// function that checks if the zombies still around the element
// if the zombie still around the elemnt at teime then it can be removed
export function isZombieStillAround(matrix,state,elementPosotion){
    let posotionClass=matrix[elementPosotion[0]][elementPosotion[1]];
    let rightClass=matrix[elementPosotion[0]][elementPosotion[1]-1];
    let leftClass=matrix[elementPosotion[0]][elementPosotion[1]+1];

    if(leftClass===state.zombie.value||rightClass===state.zombie.value){
        if(posotionClass!==state.zombie.value){
         return true;
        }
    }
    return false;
   
}

// function that tells the zombie to fell down to the first unsky element 
// gravity down

export function zombieFellToGround(matrix,state){
    let zombieArr=getZombie(matrix,state);
    for (let i =0; i < zombieArr.length; i++) {
        let zombiePosotion=zombieArr[i];  
       while(isElementinTheWayDown(matrix,state,zombiePosotion)){
            drawZombieDown(matrix,state,zombiePosotion)
        }
   }
   
}

// function that checks if there is an elemnt underneth the zombie 
export function isElementinTheWayDown(matrix,state,zombiePosotion){
    let nextPosotion='';
    nextPosotion=matrix[zombiePosotion[0]+1][zombiePosotion[1]];  
   if(nextPosotion<state.cloud.value){
        
           return true;
    }
    else{
            return false
    }
}
// function that draws the zombie down
export function drawZombieDown(matrix,state,zombiePosotion){
    removeElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
    matrix[zombiePosotion[0]][zombiePosotion[1]]=state.sky.value;
    zombiePosotion[0]++;
     drawElement(zombiePosotion[0]+' '+zombiePosotion[1],state.zombie.class,state);
     matrix[zombiePosotion[0]][zombiePosotion[1]]=state.zombie.value;
}




