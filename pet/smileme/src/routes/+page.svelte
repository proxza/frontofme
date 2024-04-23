<script>
    import { page } from "$app/stores";
    //console.log($page.data.contents);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $page.data.contents && $page.data.contents.length > 0}
  <ul>
    {#each $page.data.contents as content}
      <li>
        <strong>{content.title}</strong> - {content.content}
        <br>
        Posted by {content.author} on {content.date}
      </li>
    {/each}
  </ul>
{:else}
  <p>No content available.</p>
{/if}
