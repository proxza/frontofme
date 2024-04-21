<script>
  let username = '';
  let password = '';

  async function login() {
      const response = await fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          window.location.href = '/';
      } else {
          alert('Invalid credentials');
      }
  }
</script>

<form on:submit|preventDefault={login}>
  <label for="username">Username:</label>
  <input id="username" type="text" bind:value={username} required>
  <label for="password">Password:</label>
  <input id="password" type="password" bind:value={password} required>
  <button type="submit">Login</button>
</form>