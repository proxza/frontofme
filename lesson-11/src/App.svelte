<script>
  import ShowTodoList from "./components/ShowList.svelte";
  import AddTask from "./components/AddTask.svelte";
  import Header from "./components/Header.svelte";
</script>

<main>
  <Header />
  <AddTask />
  <ShowTodoList />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 850px;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
