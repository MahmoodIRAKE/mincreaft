import {addWave} from './atackwave.js'
export function nightAndDay(state,gameBoard,dayToNight){
    

    if(state.timer%2===0 ){
        addWave(state);
        if(state.timerColor===dayToNight.length){
            state.timerColor=0
        }
        gameBoard.style.backgroundColor=dayToNight[state.timerColor];
        state.timerColor++; 
    }
   
}