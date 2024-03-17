<script>
  export let name;
  let color = "black";

  const changeColor = () => {
    const colors = ["black", "blue", "red", "yellow", "green", "cian", "white", "purple"];
    let randomColor = Math.floor(Math.random() * color.length);

    color = colors[randomColor];
  };
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  <p>Color is: {color}</p>
  <p><button on:click={changeColor}>Change Color</button></p>
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
