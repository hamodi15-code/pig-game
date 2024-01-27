'use script';
const score1 = document.querySelector('#score--0');
const score2=document.querySelector('#score--1');
const diceEl =document.querySelector('.dice');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');
const diceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const player0El= document.querySelector('.player--0');
const player1El= document.querySelector('.player--1');
//start conditions
let currentScore=0;
let activePlayer=0;
const scores =[0,0];
let playing = true;
let init = function(){
  score1.textContent = 0;
  score2.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore=0;
  activePlayer=0;
  scores[0] =0;
  scores[1]=0;
  playing=true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
}
init();

const switchPlayer=function(){
  currentScore=0;
  document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
  activePlayer=activePlayer===0?1:0
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
// rolling button
const rollFunc= function(){
  if(playing===true) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

// Hold button
const holdFunc = function(){
  if(playing===true) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');
      //document.querySelector('main').classList.add('hidden');
    }
    switchPlayer();
  }

};
//new game
diceBtn.addEventListener('click',rollFunc);
holdBtn.addEventListener('click',holdFunc);
newBtn.addEventListener('click',init);