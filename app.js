const score0Elm = document.querySelector('#score--0');
const score1Elm = document.querySelector('#score--1');
score0Elm.textContent = 0;
score1Elm.textContent = 0;

const diceElm = document.querySelector('.dice');
diceElm.classList.add('hidden');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerScoresElms = document.querySelectorAll('.score');
const scores = [0, 0];
const currentScoreElms = document.querySelectorAll('.current-score');
// const currentScoreElms = [];
// for (let i = 0; i <2; i++){
//     currentScoreElms.push(document.getElementById(`current--${i}`));
// }
const sectionPlayers = document.querySelectorAll('.player');
const btnNew = document.querySelector('.btn--new');

btnRoll.addEventListener('click', clickRollDice);
btnHold.addEventListener('click', clickHold);
btnNew.addEventListener('click', newGame);

let activePlayer = 0;
let currentScore = 0;

function clickRollDice() {
    diceElm.classList.remove('hidden');
    const diceNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNumber);
    diceElm.src = `dice-${diceNumber}.png`;
    if ( diceNumber === 1){
        currentScore = 0;
        currentScoreElms[activePlayer].textContent = 0;
        activePlayer = 1 - activePlayer;
        sectionPlayers[0].classList.toggle('player--active');
        sectionPlayers[1].classList.toggle('player--active');
    }else{
        currentScore += diceNumber;
        currentScoreElms[activePlayer].textContent = currentScore; 
    }
}

function clickHold(){
    scores[activePlayer] += currentScore;
    playerScoresElms[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
        sectionPlayers[activePlayer].classList.add('player--winner');
        btnHold.removeEventListener('click', clickHold)
        btnRoll.removeEventListener('click', clickRollDice)
    }else{
        currentScore = 0;
        currentScoreElms[activePlayer].textContent = 0;
        activePlayer = 1 - activePlayer;
        sectionPlayers[0].classList.toggle('player--active');
        sectionPlayers[1].classList.toggle('player--active');
    }
}

function newGame() {
    scores[0] = 0;
    scores[1] = 0;
    playerScoresElms[0].textContent = 0;
    playerScoresElms[1].textContent = 0;
    currentScoreElms[0].textContent = 0;
    currentScoreElms[1].textContent = 0;
    btnHold.addEventListener('click', clickHold);
    btnRoll.addEventListener('click', clickRollDice);
    sectionPlayers[0].classList.remove('player--winner');
    sectionPlayers[1].classList.remove('player--winner');
    sectionPlayers[0].classList.add('player--active');
    sectionPlayers[1].classList.remove('player--active');
    currentScore = 0;
    activePlayer = 0;
}
