import { state } from "./constants.js";

export function draw(matrix,gameBoard) {
    gameBoard.innerHTML='';
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {

            let str = '';
            switch (matrix[i][j]) {
                case state.sky:
                    str = `<div class="sky" id='${i} ${j}' > </div>`
                    break;
                case state.cloud:
                    str = `<div class="cloud" id='${i} ${j}'> </div>`
                    break;
                case state.ground:
                    if (i === state.ground_limit) {
                        str = `<div class="ground-grass" id='${i} ${j}'> </div>`
                    } else {
                        str = `<div class="ground" id='${i} ${j}'> </div>`
                    }
                    break;
                case state.grass:
                    str = `<div class="grass" id='${i} ${j}'> </div>`
                    break;
                case state.stone:
                    str = `<div class="stone" id='${i} ${j}'> </div>`
                    break;
                case state.wood:
                    str = `<div class="wood" id='${i} ${j}'> </div>`
            }
            gameBoard.innerHTML += str;
        }
    }
}
/// another ways 2 
export function drawInventoryStack(state,inventoryStack) {
      inventoryStack.innerHTML='';
      Object.keys(state.inventory).forEach(key=>{
          if(state.inventory[key]>0){
            let str = '';
            str=`<div class='${key} sizing-box flexing-center' >${state.inventory[key]}</div>`
           inventoryStack.innerHTML += str; 
          }
      })
}
