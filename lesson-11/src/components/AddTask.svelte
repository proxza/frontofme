<script>
  import { tasks } from "./store";

  let task = {
    title: "",
    priority: "",
    deadline: "",
  };

  function addNewTask() {
    const newTask = {
      ...task,
      id: Date.now(),
      priority: Number(task.priority),
      status: false,
    };
    tasks.addTask(newTask);
    resetForm();
  }

  function resetForm() {
    task = { title: "", priority: "", deadline: "" };
  }
</script>

<section class="add-task">
  <form on:submit|preventDefault={addNewTask}>
    <input type="text" placeholder="What needs to be done?" bind:value={task.title} autofocus />
    <input type="number" placeholder="Priority" min="1" max="5" bind:value={task.priority} />
    <input type="date" placeholder="Deadline" bind:value={task.deadline} />
    <button type="submit">ADD</button>
  </form>
</section>
