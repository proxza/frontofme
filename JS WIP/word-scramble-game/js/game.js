const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time's over! ${correctWord.toUpperCase()} was the correct word.`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(60); // Calling initTimer function with passing 60 as maxTime value
  let randomObj = words[Math.floor(Math.random() * words.length)]; // Getting random object from words
  let wordArray = randomObj.word.split(""); // Splitting each letter of random word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // Shuffling and swiping wordArray letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase(); // Our correct word
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  console.log(randomObj);
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase(); // Getting user value
  if (!userWord) return alert("Please, enter your word."); // if user didnt enter anything
  if (userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word :(`);

  alert(`Congrats! ${userWord.toUpperCase()} is a correct word!!!`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
