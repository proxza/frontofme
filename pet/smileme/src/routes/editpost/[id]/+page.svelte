<script context="module">
  import { db } from "$lib/database";

  export async function load({ params }) {
      const { id } = params;
      const post = await db.content.findUnique({ where: { id: parseInt(id) } });
      if (post) {
          return { props: { post } };
      } else {
          return { status: 404, error: new Error('Post not found') };
      }
  }
</script>

<script>
  export let post;
  let { title, typeContent, content } = post ?? { title: '', typeContent: 1, content: '' };

  async function handleSubmit() {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('typeContent', typeContent);
      formData.append('content', content);

      const response = await fetch(`/editpost/${post.id}`, {
          method: 'POST',
          body: formData
      });
      if (response.ok) {
          // Redirect or show success message
          window.location.href = '/'; // Redirect to home
      }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={title} placeholder="Title">
  <select bind:value={typeContent}>
      <option value="0">Image</option>
      <option value="1">Text</option>
      <option value="2">Video</option>
  </select>
  <textarea bind:value={content} placeholder="Content"></textarea>
  <button type="submit">Save</button>
</form>
