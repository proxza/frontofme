<script>
  import { onMount } from "svelte";

  // Todo state
  let todos = loadTodos();
  let newTask = "";
  let priority = 1;
  let deadline = "";

  onMount(() => {
    // Initialize todos from local storage or default
    todos = loadTodos();
  });

  // Generate unique ID for new todos
  const generateId = () => (todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1);

  // Add a new todo
  function addTodo() {
    if (newTask && priority && deadline) {
      const newTodo = {
        id: generateId(),
        text: newTask,
        completed: false,
        priority: parseInt(priority),
        deadline: deadline,
      };
      todos = [...todos, newTodo];
      saveTodos();
      newTask = "";
      priority = 1;
      deadline = "";
    }
  }

  // Delete a todo by ID
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
  }

  // Save todos to local storage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Load todos from local storage
  function loadTodos() {
    const todosJSON = localStorage.getItem("todos");
    return todosJSON ? JSON.parse(todosJSON) : [];
  }
</script>

<section class="add-task">
  <input bind:value={newTask} type="text" placeholder="New todo..." />
  <input bind:value={priority} type="number" placeholder="Priority" min="1" max="5" />
  <input bind:value={deadline} type="date" />
  <button on:click={addTodo}>ADD</button>
</section>
<section class="task-list">
  {#if todos.length > 0}
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Priority</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each todos as { id, text, priority, deadline }}
          <tr>
            <td>{text}</td>
            <td>{priority}</td>
            <td>{deadline}</td>
            <td>
              <!-- Add edit functionality if needed -->
              <button on:click={() => deleteTodo(id)}>Edit</button>
              <button on:click={() => deleteTodo(id)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No todos yet. Add some!</p>
  {/if}
</section>
