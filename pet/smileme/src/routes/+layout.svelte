<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";

</script>

<svelte:head>
    <title>Smile Me (TEST)</title>
</svelte:head>

<nav>
    <div class="logo">LOGO</div>
          <div class="header">
            <div class="menu"><a href="/">Home</a> | Random | About | Contacts</div>
            <div class="login">

                {#if !$page.data.user}
                <a href="/login">Login</a> / <a href="/register">Register</a>
                {/if}
            
                {#if $page.data.user}
                Hello, <a href="/admin">{$page.data.user.name}</a>! <br />
                <a href="/newpost">Add Post</a> 
                <form action="/logout" method="post" use:enhance>
                    <button type="submit" class="link-button">Log out</button>
                </form>
                {/if}

            </div>
          </div>
</nav>

<main>
    <slot />
</main>

<div class="footer">
    <p>Copyrights is here :) (c) 2x24</p>
</div>