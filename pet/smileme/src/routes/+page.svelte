<script>
    import { page } from "$app/stores";
    import { enhance } from '$app/forms';
    // Функция для изменения страницы
  function changePage(newPage) {
    window.location.href = `/?page=${newPage}`;
  }


  let editing = null;
    let editedTitle = '';
    let editedContent = '';

    function startEditing(content) {
        editing = content.id;
        editedTitle = content.title;
        editedContent = content.content;
    }

    async function submitEdit(form) {
        await fetch('/editpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editing,
                title: editedTitle,
                content: editedContent
            })
        });
        editing = null; // Закончить редактирование после отправки
    }
  
</script>

{#if $page.data.contents && $page.data.contents.length > 0}
  <div>
    {#each $page.data.contents as content}
      <div class="main">  
        <div class="container">
            {#if $page.data.user}
            <div class="button-container">


              {#if editing === content.id}
            <form on:submit|preventDefault={submitEdit}>
                <input type="text" bind:value={editedTitle} />
                <textarea bind:value={editedContent}></textarea>
                <button type="submit">Save</button>
                <button type="button" on:click={() => editing = null}>Cancel</button>
            </form>
        {:else}


              <button on:click={() => startEditing(content)}>Edit</button>
              {/if}
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