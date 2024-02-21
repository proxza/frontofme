const arr = ["scissors", "paper", "rock"];
const resultsDiv = document.querySelector(".results");
const outputDiv = document.querySelector(".output");

function getButton(id) {
  const rand = Math.floor(Math.random() * 3);
  const text = `<u>${arr[id].toUpperCase()}</u> <b>VS</b> <u>${arr[rand].toUpperCase()}</u>`;

  resultsDiv.innerHTML = "";
  outputDiv.innerHTML = "";

  if ((id === 0 && rand === 1) || (id === 1 && rand === 2) || (id === 2 && rand === 0)) {
    outputDiv.insertAdjacentHTML("beforeend", text);
    resultsDiv.insertAdjacentHTML("beforeend", resultsView(1));
  } else if (id === rand) {
    outputDiv.insertAdjacentHTML("beforeend", text);
    resultsDiv.insertAdjacentHTML("beforeend", resultsView(2));
  } else {
    outputDiv.insertAdjacentHTML("beforeend", text);
    resultsDiv.insertAdjacentHTML("beforeend", resultsView(3));
  }
}

const resultsView = (status) => {
  if (status === 1) {
    return "YOU WIN!!";
  } else if (status === 2) {
    return "DRAW...";
  } else if (status === 3) {
    return "YOU LOSE :(";
  }
};
