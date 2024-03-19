<script>
  import { tasks } from "./store";
  import { writable, derived } from "svelte/store";

  const editingId = writable(null);

  let editedTitle = "";
  let editedPriority = "";
  let editedDeadline = "";

  let searchQuery = writable(""); // Variable for the search query

  const sortState = writable({ key: "title", direction: "ascending" });

  const filterStatus = writable("all"); // 'all', 'completed', 'notCompleted'

  // Combined derived storage for filtering and sorting
  const filteredAndSortedTasks = derived([tasks, searchQuery, sortState, filterStatus], ([$tasks, $searchQuery, $sortState, $filterStatus]) => {
    return $tasks
      .filter((task) => {
        return (!$searchQuery.trim() || task.title.toLowerCase().includes($searchQuery.toLowerCase())) && ($filterStatus === "all" || ($filterStatus === "completed" && task.completed) || ($filterStatus === "notCompleted" && !task.completed));
      })
      .sort((a, b) => {
        if ($sortState.key === "priority" || $sortState.key === "deadline") {
          return $sortState.direction === "ascending" ? new Date(a[$sortState.key]) - new Date(b[$sortState.key]) : new Date(b[$sortState.key]) - new Date(a[$sortState.key]);
        } else {
          return $sortState.direction === "ascending" ? a[$sortState.key].localeCompare(b[$sortState.key]) : b[$sortState.key].localeCompare(a[$sortState.key]);
        }
      });
  });

  function updateSortState(key) {
    sortState.update((current) => ({
      key,
      direction: current.key === key && current.direction === "ascending" ? "descending" : "ascending",
    }));
  }

  const saveTask = (id) => {
    tasks.updateTask({ id, title: editedTitle, priority: Number(editedPriority), deadline: editedDeadline });
    editingId.set(null); // Exit editing mode
  };

  const deleteTask = (id) => {
    tasks.removeTask(id);
  };

  const toggleCompleted = (id) => {
    tasks.toggleTaskCompleted(id);
  };
</script>

<section class="task-list">
  <table id="todo-table">
    <thead>
      <tr>
        <td colspan="4"><input id="searchInput" type="text" placeholder="Search tasks by title" bind:value={$searchQuery} /></td>
      </tr>
      <tr>
        <th class="td-task" on:click={() => updateSortState("title")}>Task</th>
        <th class="td-mini-sr" on:click={() => updateSortState("priority")}>Priority</th>
        <th class="td-mini-sr" on:click={() => updateSortState("deadline")}>Deadline</th>
        <th class="td-mini">Actions</th>
      </tr>
    </thead>
    <tbody id="todo-body">
      {#each $filteredAndSortedTasks as task}
        <tr class:completed={task.completed}>
          {#if $editingId === task.id}
            <td><input type="checkbox" id="toggle-all" class="toggle-all" /><input type="text" bind:value={editedTitle} /></td>
            <td><input type="number" bind:value={editedPriority} min="1" max="5" /></td>
            <td><input type="date" bind:value={editedDeadline} /></td>
            <td>
              <button on:click={() => saveTask(task.id)}>Save</button>
            </td>
          {:else}
            <td class="td-task-main"><label class="form-control"> <input type="checkbox" bind:checked={task.completed} name="checkbox-checked" on:click={() => toggleCompleted(task.id)} />{task.title}</label></td>
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
      {#if $filteredAndSortedTasks.length === 0}
        <tr>
          <td colspan="4">No matching tasks found.</td>
        </tr>
      {/if}
      <tr>
        <td colspan="4">
          <nav>
            <a href="#" on:click|preventDefault={() => filterStatus.set("all")}>All</a> |
            <a href="#" on:click|preventDefault={() => filterStatus.set("completed")}>Completed</a> |
            <a href="#" on:click|preventDefault={() => filterStatus.set("notCompleted")}>Not Completed</a>
          </nav>
        </td>
      </tr>
      <tr>
        <td colspan="4"> Total: {$filteredAndSortedTasks.length} tasks </td>
      </tr>
    </tbody>
  </table>
</section>

<style>
  .completed {
    text-decoration: line-through;
    color: rgb(198, 197, 197);
  }
</style>
