/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate letiable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/



let scores, roundScore, activePlayer, dice, dice2, gamePlaying, diceRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    dice = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // 1.2. STORE dice result in array
    // diceRoll.push(dice);

    // 2. Display the result
    let diceDOM = document.querySelector('.dice');
    let diceDOM2 = document.querySelector('.dice-2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png'; 

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1 && dice2 !== 1) {
      if (dice == 6 && dice2 == 6) {
        //Check if double six
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      }
      else {
        // Add score
        roundScore += dice;
        roundScore += dice2
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }

    }
    else {
      // Next player
      nextPlayer();
    };
  };
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Save CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // 2. Update UI  
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game
    let maxScore = document.getElementById('max-score').value;
    let winningScore;

    if (maxScore) {
      winningScore = maxScore;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }
    else {
      // Next Player
      nextPlayer();
    };
  };
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  diceRoll = [];

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
  // Next player 
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  diceRoll = [];

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

function doubleSix() {
  let itIs = false;
  for (let i = 0; i < diceRoll.length; i++) {
    if (diceRoll[i] === 6 && diceRoll[i-1] === 6) {
      itIs = true;
    }
  }
  return itIs;
}