<script>
  import { onMount } from "svelte";

  let cars = [];
  let randomCar = null; // Add a variable to store a random car

  onMount(async () => {
    const response = await fetch("http://localhost:3000/api");
    cars = await response.json();
    if (cars.length > 0) {
      // Selecting a random car when the data is loaded
      randomCar = cars[Math.floor(Math.random() * cars.length)];
    }
  });
</script>

{#if randomCar}
  <div class="main-container">
    <div><h1>{randomCar.make} {randomCar.model}</h1></div>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <div><img src="/cars/{randomCar.main_photo}" alt="main-photo" class="main-photo" /></div>
    <div class="photos-carousel">
      {#each randomCar.photos as photo}
        <img src="/cars/{photo}" alt="Photo of {randomCar.make} {randomCar.model}" />
      {/each}
    </div>
    <div class="description">
      <p>Description: {randomCar.description}</p>
      <p>Year: {randomCar.year}</p>
      <p>Price: {randomCar.price}</p>
      <p>Location: {randomCar.location}</p>
      <p>Car history: {randomCar.history}</p>
      <p>Link: {randomCar.link}</p>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
