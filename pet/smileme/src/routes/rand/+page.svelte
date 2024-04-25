<script>
    import { page } from "$app/stores";
</script>

{#if $page.data.contents && $page.data.contents.length > 0}
<div>
  {#each $page.data.contents as content}
  <div class="main">
      <div class="container">
          {#if $page.data.user}
          <div class="button-container">
              <form action="/editpost" method="post" use:enhance>
                  <input type="hidden" name="id" value="{content.id}">
                <button type="submit" class="link-button">edit</button>
              </form>
              <form action="/delpost" method="post" use:enhance>
                  <input type="hidden" name="id" value="{content.id}">
                <button type="submit" class="link-button">delete</button>
              </form>
            </div>
            {/if}
            <h2>{content.title}</h2>
          {#if content.typeContent === 0}
              <p><img src="/data/{content.id}.{content.extension}"></p>
          {:else}
              <p>{content.content}</p>
          {/if}
      </div>
  </div>
  {/each}
</div>
{:else}
<div class="main">
  <div class="container">
    <p>No content available.</p>
  </div>
</div>
{/if}