// TODO: write your code here
const player1 = document.querySelectorAll("#player1 td");
const player2 = document.querySelectorAll('#player2 td');
const restartBtn = document.querySelector('#btn-restart');
const computerPlay = document.querySelector('#btn-computer-plays');

let i = 0;
let j = 0;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};


const winner = () => {
  let flag = false;
  if (player1[i].classList.contains('finish')) {
    player1[i].classList.add('end-player-1');
    player1[i].classList.remove('active');
    setTimeout(alert, 100, 'Player 1 won!');
    flag = true;
  } else if (player2[j].classList.contains('finish')) {
    player2[j].classList.add('end-player-2');
    player2[j].classList.remove('active');
    setTimeout(alert, 100, 'Player 2 won!');
    flag = true;
  }
  return flag;
};

const runGame = () => {
  document.addEventListener('keyup', (event) => {
    if (event.key === 'q') {
      player1[i].classList.remove('active');
      i += 1;
      player1[i].classList.add('active');
      winner();
    } else if (event.key === 'p') {
      player2[j].classList.remove('active');
      j += 1;
      player2[j].classList.add('active');
      winner();
    }
  });
};

const computerPlayGame = async (_) => {
  const playerMoves = ["p", "q"];

  const random = playerMoves[Math.floor(Math.random() * playerMoves.length)];
  document.dispatchEvent(new KeyboardEvent('keyup', { key: `${random}` }));

  await sleep(1000);

  if (winner() !== true) {
    computerPlayGame();
  }
};

const restartGame = () => {
  player1[i].classList.remove('active');
  player1[0].classList.add('active');

  player2[j].classList.remove('active');
  player2[0].classList.add('active');

  if (player1[i].classList.contains('finish') || player2[j].classList.contains('finish')) {
    player1[i].classList.remove('end-player-1');
    player2[j].classList.remove('end-player-2');
  }

  i = 0;
  j = 0;
};

computerPlay.addEventListener("click", (event) => {
  computerPlayGame();
});

restartBtn.addEventListener("click", (event) => {
  restartGame();
});


runGame();
