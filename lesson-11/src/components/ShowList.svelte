<script>
  import { tasks } from "./store";
  import { writable } from "svelte/store";

  const editingId = writable(null);

  let editedTitle = "";
  let editedPriority = "";
  let editedDeadline = "";

  const saveTask = (id) => {
    tasks.updateTask({ id, title: editedTitle, priority: Number(editedPriority), deadline: editedDeadline });
    editingId.set(null); // Выходим из режима редактирования
  };

  // Устанавливаем начальные значения для редактирования и переключаемся на редактирование
  // function startEditing(task) {
  //   editingId.set(task.id);
  //   editedTitle = task.title;
  //   editedPriority = task.priority;
  //   editedDeadline = task.deadline;
  // }

  const deleteTask = (id) => {
    tasks.removeTask(id);
  };

  const toggleCompleted = (id) => {
    tasks.toggleTaskCompleted(id);
  };
</script>

{#if $tasks.length > 0}
  <section class="task-list">
    <table id="todo-table">
      <thead>
        <tr>
          <th class="td-task" id="sort-task">Task</th>
          <th class="td-mini-sr" id="sort-priority">Priority</th>
          <th class="td-mini-sr" id="sort-deadline">Deadline</th>
          <th class="td-mini">Actions</th>
        </tr>
      </thead>
      <tbody id="todo-body">
        {#each $tasks as task}
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
