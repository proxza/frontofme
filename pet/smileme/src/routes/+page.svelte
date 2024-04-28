<script>
    import { page } from "$app/stores";
    import { enhance } from '$app/forms';
    // Функция для изменения страницы
  function changePage(newPage) {
    window.location.href = `/?page=${newPage}`;
  }
</script>

{#if $page.data.contents && $page.data.contents.length > 0}
  <div>
    {#each $page.data.contents as content}
      <div class="main">  
        <div class="container">
            {#if $page.data.user}
            <div class="button-container">
              <form action="/editpost/{content.id}" method="get">
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
            <p class="likes">- 0 +</p>
        </div>
    </div>
    {/each}
    <div class="pagination">
      {#if $page.data.currentPage > 1}
        <button on:click={() => changePage($page.data.currentPage - 1)}>Prev</button>
      {/if}
      {#if $page.data.currentPage < $page.data.totalPages}
        <button on:click={() => changePage($page.data.currentPage + 1)}>Next</button>
      {/if}
    </div>
  </div>
{:else}
  <div class="main">
    <div class="container">
      <p>No content available.</p>
    </div>
  </div>
{/if}