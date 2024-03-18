<script>
  import { tasks } from "./store";

  let title = "";
  let priority = 1;
  let deadline = "";

  function addNewTask() {
    let newDateString = tasks.changeDateFormat(deadline);

    tasks.addTask({ id: Date.now(), title, priority: Number(priority), deadline: newDateString, status: false });
    // Form cleaning
    title = "";
    priority = 1;
    deadline = "";
  }
</script>

<section class="add-task">
  <form on:submit|preventDefault={addNewTask}>
    <input type="text" id="new-task" placeholder="What needs to be done?" bind:value={title} />
    <input type="number" id="priority" placeholder="Priority" min="1" max="5" bind:value={priority} />
    <input type="date" id="deadline" bind:value={deadline} />
    <button type="submit">ADD</button>
  </form>
</section>
