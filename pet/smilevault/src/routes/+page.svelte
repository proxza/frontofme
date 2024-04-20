<script>
    import { onMount } from "svelte";

    import { session } from '$app/stores';

//$: console.log($session.authenticated ? 'Пользователь авторизован' : 'Пользователь не авторизован');
  
    let data = [];

  
    onMount(async () => {
      const response = await fetch("http://localhost:5000/api");
      data = await response.json();
    });

  </script>

  <div class="logo">
LOGO
  </div>
  <div class="header">
    <div class="menu">Home | Random | About | Contacts</div>
    <div class="login">Login/Logout/<a href="/register">Регистрация</a></div>
  </div>


    {#if data.length > 0}
        <div>
            {#each data as item (item.id)}
            <div class="main">
                <div class="container">
                    <h2>{item.title}</h2>
                    {#if item.type_content === 0}
                        <p><img src="data/{item.content}"></p>
                    {:else}
                        <p>{item.content}</p>
                    {/if}
                </div>
            </div>
            {/each}
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
    <div><p>Footer</p></div>