'use strict';

// --------------------Selecting elements--------------------

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// --------------------RESET CURRENT Funtion(Resets current score to 0)--------------------

const resetCurrent = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

// --------------------SWITCH PLAYER Function--------------------

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

//

const closeRules = function () {
  document.querySelector('.rules').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
};

// --------------------Starting conditions--------------------

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// --------------------Defining Variable--------------------

let currentScore = 0;
let score = [0, 0];
let playing = false;
let activePlayer = 0;

// --------------------Roll Button functionality--------------------

btnRoll.addEventListener('click', function () {
  // ----------To turn off the button when the game is not acitive----------
  if (playing) {
    // ----------Generating a random dice roll----------
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    // ----------Display dice----------
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // ----------Check for rolled 1----------
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// --------------------Hold Button functionality--------------------

btnHold.addEventListener('click', function () {
  // ----------To turn off the button when the game isnot acitive----------
  if (playing) {
    // ----------Total Score Display----------
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // ----------Checking for Winner----------
    if (score[activePlayer] > 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      resetCurrent();
      playing = false;
    } else switchPlayer();
  }
});

// --------------------New Game Button functionality--------------------

btnNew.addEventListener('click', function () {
  // ----------Activate the buttons----------
  playing = true;
  // ----------Reseting Players----------
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  // ----------REseting Scores----------
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
});

document.querySelector('.show-rules').addEventListener('click', function () {
  if (!playing) {
    document.querySelector('.rules').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');

    document
      .querySelector('.close-rules')
      .addEventListener('click', closeRules);

    document.querySelector('.overlay').addEventListener('click', closeRules);

    document.addEventListener('keydown', function (e) {
      if (
        !document.querySelector('.rules').classList.contains('hidden') &&
        e.key === 'Escape'
      ) {
        closeRules();
      }
    });
  }
});
