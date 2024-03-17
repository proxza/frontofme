// DEFAULT ARRAY
let ownArray = ["Item 1", "Item 2", "Item 3"];
let ulList = document.querySelector("#userList");

// DISPLAY OUR ARRAY BY HARD CODE :)
function arrayView(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    let li = document.createElement("li");

    li.id = "item_" + i;

    li.textContent = arr[i] + " ";
    li.appendChild(buttonAction(i));

    ulList.appendChild(li);
  }
}

// ADD NEW ITEM FROM INPUT
function addNewItem() {
  let userInput = document.querySelector("#userInput");
  let li = document.createElement("li");

  if (userInput.value !== "") {
    li.textContent = userInput.value + " ";
    li.appendChild(buttonAction(ownArray.length));
    li.id = "item_" + ownArray.length;
    ownArray.push(userInput.value);

    ulList.appendChild(li);
  }

  userInput.value = "";
}

// DELETE ITEM BY ONCLICK BUTTON "X"
function deleteItem(id) {
  //   let btnId = id.charAt(id.length - 1);

  let r = document.getElementById(id);
  if (r) {
    let list = r.parentNode;
    list.removeChild(r);
  }

  //ownArray.splice(btnId, 1);
}

// CREATE BUTTON
function buttonAction(i) {
  let btn = document.createElement("button");
  btn.textContent = "X";
  btn.id = "item_" + i;

  // ADD ONCLICK TO BUTTON BY CHATGPT :)
  btn.onclick = (function (index) {
    return function () {
      deleteItem("item_" + index);
    };
  })(i);

  return btn;
}

// MAIN
arrayView(ownArray);
