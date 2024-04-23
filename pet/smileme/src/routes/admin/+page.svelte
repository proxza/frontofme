<script lang="ts">
    import { page } from "$app/stores";
</script>

<h1>Admin Panel</h1>

{#if $page.data.user} 
<p>Welcome {$page.data.user.name}!!!</p>
{$page.data.user.role}!
{/if}

{#if $page.data.user === 'ADMIN'}
<form action="/logout" method="post">
<button type="submit">Log out</button>
</form>
{/if}