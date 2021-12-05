// function that determine the waves and runs the attack

export function addWave(state){
    
    if(state.timerColor===4){
        state.toAddWave=true
    }
    else{
        state.toAddWave=false;
    }
    if(state.toAddWave){
        state.currentWave++;
        state.zombieNumber+=state.currentWave+2;
        state.batsNumber+=state.currentWave+2;
    }
    if(state.timerColor>4 &&state.timerColor<15){
        state.toAttack=true;
    }
    else{
        state.toAttack=false;
    }
}