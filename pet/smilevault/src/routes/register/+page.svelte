<script>
  import { browser } from '$app/environment';

  // Переменные для данных формы
  let username = '';
  let password = '';
  let errorMessage = '';

  async function handleFormSubmit(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    // Создаем объект FormData и добавляем в него данные
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      // Отправляем запрос на серверный эндпоинт
      const response = await fetch('register', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (response.ok) {
        // Если регистрация успешна, перенаправляем на главную страницу
        window.location.href = '/';
      } else {
        // Если произошла ошибка, выводим сообщение об ошибке
        errorMessage = result.error || 'Произошла неизвестная ошибка';
      }
    } catch (error) {
      // Обработка исключений при работе с сетью или JSON
      errorMessage = error.message || 'Произошла ошибка при отправке данных';
    }
  }
</script>

{#if browser}
  <h1>Регистрация1</h1>
  <form on:submit|preventDefault={handleFormSubmit}>
    <div>
      <label for="username">Имя пользователя:</label>
      <input type="text" id="username" bind:value={username} required>
    </div>
    <div>
      <label for="password">Пароль:</label>
      <input type="password" id="password" bind:value={password} required>
    </div>
    <div>
      <button type="submit">Зарегистрироваться</button>
    </div>
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
  </form>
{/if}