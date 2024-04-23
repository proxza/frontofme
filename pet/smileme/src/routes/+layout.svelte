<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";

</script>

<svelte:head>
    <title>Smile Me (TEST)</title>
</svelte:head>

<nav>
    {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    {/if}

    {#if $page.data.user}

    <a href="/admin">Admin</a>
    <form action="/logout" method="post" use:enhance>
        <button type="submit">Log out</button>
    </form>
    {/if}
</nav>

<main>
    <slot />
</main>