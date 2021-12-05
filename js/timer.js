


export function timer(timerText,state){

  setTimeout(() => {
      state.timer++;
      timerText.innerText='WAVE '+state.currentWave+'/'+state.maxWave;
  }, 1000);
}