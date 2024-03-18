<script>
  let tasks = { id: 1, title: "Task 1", desc: "Do something", status: 0 }, { id: 2, title: "Task 2", desc: "Do something new", status: 1 }, { id: 3, title: "Task 3", desc: "Something wrong", status: 1 }, { id: 4, title: "Task 4", desc: "Complete", status: 2 }, { id: 5, title: "Task 5", desc: ".....", status: 0 }, main: { id: 6, title: "Clean", desc: "Clean at the home", status: 0 }};

  console.log(tasks);
</script>

<main>
  <h1>Hello!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  {#each tasks as task}
    <div>
      <h1>{task.title}</h1>
      <p>Id: {task.id}</p>
      <p>Id: {task.desc}</p>
    </div>
  {/each}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
