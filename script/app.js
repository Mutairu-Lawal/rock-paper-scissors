const moves = ["paper", "scissors", "rock"];
let result = "";
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  draw: 0,
};
const paperBtn = document.querySelector(".paper");
const rockBtn = document.querySelector(".rock");
const scissorsBtn = document.querySelector(".scissors");
const displayResult = document.querySelector(".gameResult");
const scoreBoard = document.querySelector(".js-scores");
const gameMoves = document.querySelector(".gameMoves");

displayScore();

paperBtn.addEventListener("click", () => {
  playGame("paper");
});
rockBtn.addEventListener("click", () => {
  playGame("rock");
});
scissorsBtn.addEventListener("click", () => {
  playGame("scissors");
});

function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = getResult(playerMove, computerMove);
  updateScore(result, score);

  displayResult.classList.remove("green", "red");

  switch (result) {
    case "You win.":
      displayResult.classList.add("green");
      break;
    case "You lose.":
      displayResult.classList.add("red");
      break;
  }

  displayResult.innerHTML =
    result === "Tie."
      ? result + `🤝`
      : result === "You lose."
      ? result + `😖`
      : result === "You win."
      ? result + "😃"
      : "";

  gameMoves.innerHTML = `
    You <img src="img/${playerMove}-emoji.png" alt="" />
    Computer <img src="img/${computerMove}-emoji.png" alt="" />
  `;

  localStorage.setItem("score", JSON.stringify(score));
  displayScore();
}

function getComputerMove() {
  let computerMove = moves[Math.floor(Math.random() * moves.length)];

  return computerMove;
}

function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return (result = "Tie.");
  }
  switch (playerMove) {
    case "rock":
      return (result = computerMove === "scissors" ? "You win." : "You lose.");
      break;
    case "paper":
      return (result = computerMove === "rock" ? "You win." : "You lose.");
      break;
    case "scissors":
      return (result = computerMove === "paper" ? "You win." : "You lose.");
      break;
  }
}

function updateScore(result, score) {
  switch (result) {
    case "Tie.":
      score.draw++;
      break;
    case "You win.":
      score.wins++;
      break;
    case "You lose.":
      score.losses++;
      break;
  }
}

function displayScore() {
  scoreBoard.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.draw}`;
}

document.querySelector(".reset-score").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.draw = 0;
  localStorage.removeItem("score");
  displayResult.innerHTML = "";
  gameMoves.innerHTML = "";
  displayScore();
});

let isAutoPlaying = false;
let setIntervalId;

document.querySelector(".auto-play").addEventListener("click", () => {
  if (!isAutoPlaying) {
    setIntervalId = setInterval(() => {
      const playerMove = getComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(setIntervalId);
    isAutoPlaying = false;
  }
});
