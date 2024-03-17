// More readable and optimized code (thnx chatgpt :D)
const arr = ["scissors", "paper", "rock"];
const resultsDiv = document.querySelector(".results");
const outputDiv = document.querySelector(".output");

// Generate a number from 0 to 3
function getRandomIndex() {
  return Math.floor(Math.random() * 3);
}

// Player selection display
function generateText(id, rand) {
  const playerChoice = arr[id].toUpperCase();
  const computerChoice = arr[rand].toUpperCase();
  return `<span class="content-text">${playerChoice}</span> <span class="content-vs">VS</span> <span class="content-text">${computerChoice}</span>`;
}

// Display message about the round result
function displayResults(status) {
  let message = "";
  if (status === 1) {
    message = "YOU WIN!!";
  } else if (status === 2) {
    message = "DRAW...";
  } else if (status === 3) {
    message = "YOU LOSE :(";
  }
  resultsDiv.innerHTML = `<p>${message}</p>`;
}

// Button handler
function getButton(id) {
  const rand = getRandomIndex();
  const text = generateText(id, rand);

  outputDiv.innerHTML = "";
  outputDiv.insertAdjacentHTML("beforeend", text);

  if ((id === 0 && rand === 1) || (id === 1 && rand === 2) || (id === 2 && rand === 0)) {
    displayResults(1); // WIN
  } else if (id === rand) {
    displayResults(2); // DRAW
  } else {
    displayResults(3); // LOSE
  }
}

// MY OLD HARD CODE :)
// Button handler
// function getButton(id) {
//   const rand = Math.floor(Math.random() * 3);
//   const text = `<span class="content-text">${arr[id].toUpperCase()}</span> <span class="content-vs">VS</span> <span class="content-text">${arr[rand].toUpperCase()}</span>`;

//   // Clear our div's
//   resultsDiv.innerHTML = "";
//   outputDiv.innerHTML = "";

//   outputDiv.insertAdjacentHTML("beforeend", text);

//   if ((id === 0 && rand === 1) || (id === 1 && rand === 2) || (id === 2 && rand === 0)) {
//     resultsDiv.insertAdjacentHTML("beforeend", resultsView(1)); // WIN
//   } else if (id === rand) {
//     resultsDiv.insertAdjacentHTML("beforeend", resultsView(2)); // DRAW
//   } else {
//     resultsDiv.insertAdjacentHTML("beforeend", resultsView(3)); // LOSE
//   }
// }

// // Display a message about the round result
// const resultsView = (status) => {
//   if (status === 1) {
//     return "YOU WIN!!";
//   } else if (status === 2) {
//     return "DRAW...";
//   } else if (status === 3) {
//     return "YOU LOSE :(";
//   }
// };
// END
