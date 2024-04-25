<script lang="ts">
    import { page } from "$app/stores";
</script>

<h1>You can add new post here</h1>

{#if $page.data.user.role !== 'ADMIN'} 
<p>Welcome {$page.data.user.name}!!!</p>
{$page.data.user.role}!
{/if}

<div class="forms">
{#if $page.data.user.role === 'ADMIN'}
<form action="?/newpost" method="post" enctype="multipart/form-data">
    <div class="form-row">
        <label for="title">Title</label>
        <input id="title" name="title" type="text">
        </div>
        <div class="form-row">
        <label for="typeContent">Post type:</label>
        <select id="typeContent" name="typeContent">
          <option value="0">Картинка</option>
          <option value="1">Текст</option>
          <option value="2">Видео</option>
        </select>
      </div>
      <div class="form-row">
        <label for="content">Content</label>
        <input type="text" id="content" name="content">
      </div>
      <div class="form-row">
        <label for="file">Upload Image</label>
        <input type="file" id="file" name="file">
    </div>
      <div class="form-row">
        <button type="submit">ADD</button>
      </div>
</form>
{/if}
</div>