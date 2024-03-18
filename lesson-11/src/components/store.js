import { writable } from "svelte/store";

function createTasksStore() {
  const key = "tasks";

  // Попытка получить сохраненные задачи из localStorage
  const savedTasks = localStorage.getItem(key);
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];

  // Создаем хранилище с начальными значениями
  const { subscribe, set, update } = writable(initialTasks);

  return {
    subscribe,
    set,
    // Метод для добавления новой задачи
    addTask: (task) => {
      update((tasks) => {
        const newTasks = [...tasks, task];
        localStorage.setItem(key, JSON.stringify(newTasks));
        return newTasks;
      });
    },
    // Метод для удаления задачи по id
    removeTask: (id) => {
      update((tasks) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem(key, JSON.stringify(filteredTasks));
        return filteredTasks;
      });
    },
    // Метод для очистки всех задач
    resetAllTasks: () => {
      localStorage.removeItem(key);
      set([]);
    },

    countTasks: () => {
      let count;
      subscribe((tasks) => {
        count = tasks.length;
      })(); // Немедленно вызываем функцию подписки и отписываемся
      return count;
    },

    updateTask: (updatedTask) => {
      update((tasks) => {
        const index = tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          const newTasks = [...tasks];
          newTasks[index] = updatedTask;
          localStorage.setItem("tasks", JSON.stringify(newTasks));
          return newTasks;
        }
        return tasks; // Возвращаем неизменный массив, если задача с таким ID не найдена
      });
    },

    toggleTaskCompleted: (id) => {
      update((tasks) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed }; // Переключение состояния выполнения
          }
          return task;
        });
        localStorage.setItem(key, JSON.stringify(updatedTasks)); // Сохраняем обновленные задачи
        return updatedTasks;
      });
    },
    // Добавьте другие методы для работы с задачами по необходимости
  };
}

export const tasks = createTasksStore();
