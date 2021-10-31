'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const resetCurrent = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};
const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  resetCurrent();
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
// let totalScore0 = 0;
// let totalScore1 = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3. Check for rolled 1
    if (diceRoll !== 1) {
      // Add dice to current
      // if (player0El.classList.contains('player--active')) {
      //   currentScore += diceRoll;
      //   current0El.textContent = currentScore;
      // } else {
      //   currentScore += diceRoll;
      //   current1El.textContent = currentScore;
      // }
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
      // if (player0El.classList.contains('player--active')) {
      //   player0El.classList.remove('player--active');
      //   player1El.classList.add('player--active');
      //   resetCurrent();
      // } else {
      //   player1El.classList.remove('player--active');
      //   player0El.classList.add('player--active');
      //   resetCurrent();
      // }
    }
  }
});

// Hold button funcionality
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] > 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else switchPlayer();

    //   if (player0El.classList.contains('player--active')) {
    //     totalScore0 += currentScore;
    //     resetCurrent();
    //     score0El.textContent = totalScore0;

    //     if (totalScore0 < 100) {
    //       player0El.classList.remove('player--active');
    //       player1El.classList.add('player--active');
    //     } else {
    //       player0El.classList.add('player--winner');
    //     }
    //   } else {
    //     totalScore1 += currentScore;
    //     resetCurrent();
    //     score1El.textContent = totalScore1;
    //     if (totalScore1 < 100) {
    //       player1El.classList.remove('player--active');
    //       player0El.classList.add('player--active');
    //     } else {
    //       player1El.classList.add('player--winner');
    //       diceEl.classList.add('hidden');
    //     }
    //  }
  }
});

btnNew.addEventListener('click', function () {
  score[activePlayer] > 100
    ? document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner')
    : switchPlayer();
  activePlayer ? switchPlayer() : resetCurrent();
  //   totalScore0 > 100
  //     ? player0El.classList.remove('player--winner')
  //     : player1El.classList.remove('player--winner');
  //   if (!player0El.classList.contains('player--winner')) {
  // player0El.classList.add('player--active');
  //     player1El.classList.remove('player--active');
  //   }
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  //   totalScore0 = 0;
  //   score0El.textContent = totalScore0;
  //   totalScore1 = 0;
  //   score1El.textContent = totalScore1;
  diceEl.classList.add('hidden');
});
