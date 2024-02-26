const wordsArray = ["table", "sister", "mouse", "cat", "bed", "car", "phone", "wheel", "headphones", "bus", "keyboard", "button", "movie", "news", "paper", "dog", "hamster", "apple", "banana", "cherry", "date", "egg", "fig", "grape", "hat", "ice", "juice", "kite", "lemon", "mango", "nut", "orange", "pear", "quilt", "rose", "salt", "tea", "umbrella", "vase", "water", "x-ray", "yarn", "zebra", "book", "cup", "desk", "elephant", "flower", "guitar", "house", "island", "jacket", "kangaroo", "lamp", "mountain", "nest", "ocean", "pencil", "queen", "rabbit", "sun", "tree", "unicorn", "volcano", "wolf", "xylophone", "yacht", "zipper", "cloud", "star", "moon", "grass", "rain", "snow", "river", "lake", "forest", "tree", "flower", "rock", "bird", "fish", "sky", "sea", "sunshine", "sand", "beach", "hill", "valley", "road", "town", "village", "city", "country", "world", "space", "universe"];
const SCORE_EXP = 10;
let score = 0,
  mistakes = 0,
  hp = 100,
  streak = 0;
let guessedLetters = new Set();
let randomizeWord = randomWord();
const selectWordDiv = document.querySelector(".selectWord"),
  secretDiv = document.getElementById("secret"),
  showMeDiv = document.getElementById("showMe"),
  statsDiv = document.getElementById("stats"),
  panelDiv = document.getElementById("panel");

// Key processing from the keyboard
document.addEventListener("keydown", (event) => {
  const letter = event.key.toLowerCase();
  if (letter >= "a" && letter <= "z" && letter.length === 1) {
    getBtn(letter);
  }
  console.log("Keydown event detected:", event.key);
});

// Get a random word from the array
function randomWord() {
  return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

// The image depending on the number of errors
function updateHangmanImage(mistakes) {
  const imgElement = document.getElementById("hangmanImage");
  imgElement.src = `./img/hp-${mistakes}.png`;
}

// The main function determining the guessing of words and letters
function generateDisplayString(randomizeWord, guessedLetters) {
  let displayStr = "";
  let allLettersGuessed = true;

  for (let char of randomizeWord) {
    if (guessedLetters.has(char)) {
      displayStr += ` ${char.toUpperCase()} `;
    } else {
      displayStr += " _ ";
      allLettersGuessed = false;
    }
  }

  secretDiv.textContent = displayStr;
  return allLettersGuessed;
}

// Player statistics
function updateStats() {
  statsDiv.innerHTML = `<p>Mistakes: ${mistakes}/7</p>
    <p>HP: ${hp}%</p>
    <p>XP: ${score}</p>
    <p>Streaks: ${streak}</p>`;
}

// Player's win condition
function checkWinCondition(allLettersGuessed) {
  if (allLettersGuessed) {
    streak++;
    console.log(streak);
    score += SCORE_EXP + hp / 10;

    if (mistakes == 0 && streak >= 3) {
      score += SCORE_EXP * 2;
    }

    panelDiv.innerHTML = `<button id="resetButton" onclick="startNewRound()">Next Round!</button>`;
  }
}

// MAIN
function displaySecret() {
  updateHangmanImage(mistakes);
  const allLettersGuessed = generateDisplayString(randomizeWord, guessedLetters);
  updateStats();
  checkWinCondition(allLettersGuessed);
}

// Changing button styles
function disableButton(clickedButton, borderColor, borderWidth) {
  if (clickedButton) {
    clickedButton.style.borderColor = borderColor;
    clickedButton.style.borderWidth = borderWidth;
    clickedButton.disabled = true;
  }
}

// Update score when player guess the letter
function updateScoreOnCorrectGuess() {
  score += Math.round(SCORE_EXP * (1 + streak * 0.1));
}

// Player's mistakes
function handleIncorrectGuess() {
  if (score != 0) {
    score = Math.max(Math.round(score - 5 * (1 - mistakes / 10)), 0);
  }
  //hp -= Math.round(14.29);
  mistakes++;
  if (mistakes < 7) {
    hp -= 14; // Вычитаем 14 HP за каждую ошибку, кроме последней
  } else if (mistakes === 7) {
    hp -= 16; // Вычитаем 16 HP за последнюю ошибку, чтобы достичь 0 HP
  }
}

// GAME OVER :(
function checkGameOver() {
  if (mistakes === 7 || hp <= 0) {
    alert("YOU LOST :(");
    panelDiv.innerHTML = `<button id="resetButton" onclick="startNewGame()">Start New Game</button>`;
  }
}

// Button handling
function getBtn(letter) {
  let clickedButton = document.querySelector(`#btn${letter.toUpperCase()}`);

  guessedLetters.add(letter);

  if (randomizeWord.includes(letter)) {
    updateScoreOnCorrectGuess();
    disableButton(clickedButton, "blue", "3px");
  } else {
    console.log(`${letter} is not in the word.`);
    handleIncorrectGuess();
    disableButton(clickedButton, "red", "3px");
  }

  checkGameOver();
  displaySecret();
}

// Hint function
function showMeHint() {
  const count = randomizeWord.length;
  let letter = "";

  do {
    const showLetter = Math.floor(Math.random() * count);
    letter = randomizeWord[showLetter];
  } while (guessedLetters.has(letter));

  guessedLetters.add(letter);

  displaySecret();
}

// Button generation
function generateButton() {
  selectWordDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const newBtnHTML = `<button id="btn${letter}" onclick="getBtn('${letter.toLowerCase()}')">${letter}</button>`;
    selectWordDiv.insertAdjacentHTML("beforeend", newBtnHTML);
  }
}

// Init
function initialization() {
  generateButton();
  randomizeWord = randomWord();
  guessedLetters = new Set();
  console.log("New word: " + randomizeWord);
  secretDiv.innerHTML = "";
  displaySecret();
}

// Start new Round after win
function startNewRound() {
  panelDiv.innerHTML = `<button id="hint" onclick="showMeHint()">Hint</button>`;
  initialization();
  mistakes = 0;
  hp = 100;
  displaySecret();
}

// Start new Game after lose
function startNewGame() {
  initialization();
  hp = 100;
  panelDiv.innerHTML = `<button id="hint" onclick="showMeHint()">Hint</button>`;
  mistakes = 0;
  streak = 0;
  score = 0;
  displaySecret();
}

//
displaySecret();
generateButton();
