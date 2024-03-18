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

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (max-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
