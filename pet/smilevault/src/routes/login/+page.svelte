<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';

  async function login() {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      goto('/'); // переадресация на главную страницу
    } else {
      errorMessage = 'Неверный логин или пароль';
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <input type="text" bind:value={username} placeholder="Имя пользователя">
  <input type="password" bind:value={password} placeholder="Пароль">
  <button type="submit">Войти</button>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</form>