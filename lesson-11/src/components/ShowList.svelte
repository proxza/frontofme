<script>
  import { tasks } from "./store";
  import { writable, derived } from "svelte/store";

  const editingId = writable(null);

  let editedTitle = "";
  let editedPriority = "";
  let editedDeadline = "";

  // Sort state
  const sortState = writable({ key: "title", direction: "ascending" });

  // Derived store to sort tasks based on sort state
  const sortedTasks = derived([tasks, sortState], ([$tasks, $sortState]) => {
    return $tasks.slice().sort((a, b) => {
      if ($sortState.key === "deadline") {
        // Handle dates separately
        const dateA = new Date(a[$sortState.key]),
          dateB = new Date(b[$sortState.key]);
        return $sortState.direction === "ascending" ? dateA - dateB : dateB - dateA;
      } else {
        // Handle strings and numbers generically
        const valA = a[$sortState.key],
          valB = b[$sortState.key];
        if (valA < valB) return $sortState.direction === "ascending" ? -1 : 1;
        if (valA > valB) return $sortState.direction === "ascending" ? 1 : -1;
        return 0;
      }
    });
  });

  // Click handlers to update sort state
  function updateSortState(key) {
    sortState.update((current) => ({
      key,
      direction: current.key === key && current.direction === "ascending" ? "descending" : "ascending",
    }));
  }

  // Editing mode
  const saveTask = (id) => {
    let newDateString = tasks.changeDateFormat(editedDeadline);
    tasks.updateTask({ id, title: editedTitle, priority: Number(editedPriority), deadline: newDateString });
    editingId.set(null); // Exit editing mode
  };

  // Deleting a task
  const deleteTask = (id) => {
    tasks.removeTask(id);
  };

  // Setting the status of task completion
  const toggleCompleted = (id) => {
    tasks.toggleTaskCompleted(id);
  };
</script>

{#if $sortedTasks.length > 0}
  <section class="task-list">
    <table id="todo-table">
      <thead>
        <tr>
          <th class="td-task" id="sort-task" on:click={() => updateSortState("title")}>Task</th>
          <th class="td-mini-sr" id="sort-priority" on:click={() => updateSortState("priority")}>Priority</th>
          <th class="td-mini-sr" id="sort-deadline" on:click={() => updateSortState("deadline")}>Deadline</th>
          <th class="td-mini">Actions</th>
        </tr>
      </thead>
      <tbody id="todo-body">
        {#each $sortedTasks as task}
          <tr class:completed={task.completed}>
            {#if $editingId === task.id}
              <td><input type="text" bind:value={editedTitle} /></td>
              <td><input type="number" bind:value={editedPriority} min="1" max="5" /></td>
              <td><input type="date" bind:value={editedDeadline} /></td>
              <td>
                <button on:click={() => saveTask(task.id)}>Save</button>
              </td>
            {:else}
              <td class="td-task" on:click={() => toggleCompleted(task.id)}>{task.title}</td>
              <td class="priority-{task.priority}">{task.priority}</td>
              <td>{task.deadline}</td>
              <td class="td-mini">
                <button
                  on:click={() => {
                    editingId.set(task.id);
                    editedTitle = task.title;
                    editedPriority = task.priority;
                    editedDeadline = task.deadline;
                  }}>Edit</button
                >
                <button on:click={() => deleteTask(task.id)}>Delete</button>
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
{:else}
  <p>No todos yet. Add some!</p>
{/if}

<style>
  .completed {
    text-decoration: line-through;
    color: rgb(198, 197, 197);
  }
</style>
