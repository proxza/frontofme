<script context="module">
    import { db } from '$lib/database';
    import { redirect } from '@sveltejs/kit';
  
    // Загрузка данных поста
    export async function load({ params }) {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return { status: 400, error: new Error('Invalid post ID') };
      }
  
      const post = await db.content.findUnique({
        where: { id }
      });
  
      if (!post) {
        return { status: 404, error: new Error('Post not found') };
      }
  
      return { props: { post } };
    }
  
    // Действие для обновления поста
    export const actions = {
      default: async ({ request, params }) => {
        const form = await request.formData();
        const title = form.get('title');
        const content = form.get('content');
  
        if (!title || !content) {
          return { status: 400, error: new Error('Title and content are required') };
        }
  
        const id = parseInt(params.id);
        if (isNaN(id)) {
          return { status: 400, error: new Error('Invalid post ID') };
        }
  
        await db.content.update({
          where: { id },
          data: { title, content }
        });
  
        throw redirect(303, `/`); // Перенаправление на главную страницу после обновления
      }
    };
  </script>
  
  <script>
    export let post;
  
    let title = post.title;
    let content = post.content;
  </script>
  
  <form use:action method="post">
    <div>
      <label for="title">Title:</label>
      <input id="title" name="title" type="text" bind:value={title} required>
    </div>
    <div>
      <label for="content">Content:</label>
      <textarea id="content" name="content" bind:value={content} required></textarea>
    </div>
    <div>
      <button type="submit">Save</button>
    </div>
  </form>
  