// Initial todos array
let todos = [{ id: 1, text: "Clean room", completed: false, priority: 1, deadline: "16-03" }];

// Function to generate a unique ID for new todos
const generateId = () => {
  return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

// Function to add a new todo
const addTodo = (text, priority, deadline) => {
  const newTodo = {
    id: generateId(),
    text: text,
    completed: false,
    priority: parseInt(priority),
    deadline: deadline,
  };
  todos.push(newTodo);
  saveTodos(); // Save todos after adding a new one
  renderTodos();
};

// Function to delete a todo by id
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(); // Save todos after deleting
  renderTodos();
};

// Event delegation to handle delete button clicks for dynamically added elements
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const idToDelete = parseInt(event.target.getAttribute("data-id"));
    deleteTodo(idToDelete);
  }
});

// Function to start editing a todo by id
const startEditTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  const todoRow = document.querySelector(`tr[data-id="${id}"]`);
  todoRow.innerHTML = `
    <td><input type="text" class="edit-text" value="${todo.text}"></td>
    <td><input type="number" class="edit-priority" value="${todo.priority}" min="1" max="5"></td>
    <td><input type="date" class="edit-deadline" value="${todo.deadline}"></td>
    <td>
      <button class="save-btn" data-id="${todo.id}">Save</button>
      <button class="cancel-btn" onclick="renderTodos()">Cancel</button>
    </td>
  `;
};

// Function to save the edited todo
const saveEditTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  const newText = document.querySelector(`tr[data-id="${id}"] .edit-text`).value.trim();
  const newPriority = document.querySelector(`tr[data-id="${id}"] .edit-priority`).value;
  const newDeadline = document.querySelector(`tr[data-id="${id}"] .edit-deadline`).value;
  todo.text = newText;
  todo.priority = parseInt(newPriority);
  todo.deadline = newDeadline;
  saveTodos(); // Save todos after editing
  renderTodos();
};

// Sort todos by different fields
const sortTodos = (field) => {
  const sortOrder = {
    text: (a, b) => a.text.localeCompare(b.text),
    priority: (a, b) => (prioritySortStatus ? b.priority - a.priority : a.priority - b.priority),
    deadline: (a, b) => (deadlineSortStatus ? new Date(b.deadline) - new Date(a.deadline) : new Date(a.deadline) - new Date(b.deadline)),
  };

  todos.sort(sortOrder[field]);
  renderTodos();
};

// Load todos from localStorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON ? JSON.parse(todosJSON) : [];
};

// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Now we update our todos array initialization
todos = loadTodos();

// Переключатели для сортировки по приоритету и дедлайну
let prioritySortStatus = false;
let deadlineSortStatus = false;

// Event listeners for sorting
document.getElementById("sort-task").addEventListener("click", () => sortTodos("text"));
document.getElementById("sort-priority").addEventListener("click", () => {
  prioritySortStatus = !prioritySortStatus;
  sortTodos("priority");
});
document.getElementById("sort-deadline").addEventListener("click", () => {
  deadlineSortStatus = !deadlineSortStatus;
  sortTodos("deadline");
});

// Function to render todos to the DOM
const renderTodos = () => {
  const todoBody = document.getElementById("todo-body");
  todoBody.innerHTML = ""; // Clear the current list
  todos.forEach((todo) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", todo.id);
    row.innerHTML = `
      <td>${todo.text}</td>
      <td class="priority-${todo.priority}">${todo.priority}</td>
      <td class="td-mini">${todo.deadline}</td>
      <td class="td-mini">
        <button class="edit-btn" onclick="startEditTodo(${todo.id})">E</button>
        <button class="delete-btn" data-id="${todo.id}">X</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
};

// Event delegation for save button
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("save-btn")) {
    const idToSave = parseInt(event.target.getAttribute("data-id"));
    saveEditTodo(idToSave);
  }
});

// Event listener for the Add button
document.getElementById("add-btn").addEventListener("click", () => {
  const newTask = document.getElementById("new-task").value.trim();
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  if (newTask && priority && deadline) {
    addTodo(newTask, priority, deadline);
    document.getElementById("new-task").value = ""; // Clear the input field
    document.getElementById("priority").value = "";
    document.getElementById("deadline").value = "";
  } else {
    alert("Please fill out all fields.");
  }
});

document.addEventListener("DOMContentLoaded", renderTodos);

// Call renderTodos to display the initial list
renderTodos();
