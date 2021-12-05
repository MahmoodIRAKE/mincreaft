import {matrix,state,dayToNight} from "./constants.js";
//Math.random()<0.5?0:1)

function randomMatrix(){
    
    for(let i=0;i<state.gameGrid;i++){
        for(let j=0;j<state.gameGrid;j++){
                if(i>state.gameGrid-state.gameGrid/4){
                    matrix[i][j]=state.ground.value;
                }
                if(i===state.gameGrid-state.gameGrid/4){
                    matrix[i][j]=state.groundGrass.value;
                }
                
        }
    }

}
