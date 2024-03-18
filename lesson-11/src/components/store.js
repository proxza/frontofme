import { writable } from "svelte/store";

function createTasksStore() {
  const key = "tasks";

  // Trying to get saved tasks from localStorage
  const savedTasks = localStorage.getItem(key);
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];

  // Create storage with initial values
  const { subscribe, set, update } = writable(initialTasks);

  return {
    subscribe,
    set,
    // Method to add a new task
    addTask: (task) => {
      update((tasks) => {
        const newTasks = [...tasks, task];
        localStorage.setItem(key, JSON.stringify(newTasks));
        return newTasks;
      });
    },
    // Method to delete a task by id
    removeTask: (id) => {
      update((tasks) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem(key, JSON.stringify(filteredTasks));
        return filteredTasks;
      });
    },
    // Method to clean up all tasks
    resetAllTasks: () => {
      localStorage.removeItem(key);
      set([]);
    },

    // Counting the number of records in the database
    countTasks: () => {
      let count;
      subscribe((tasks) => {
        count = tasks.length;
      })(); // Immediately call the subscribe function and unsubscribe
      return count;
    },

    // Changing the format of the date received from the user
    changeDateFormat: (dt) => {
      const dateObject = new Date(dt);
      // Extract month, day and year
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months start at 0
      const day = String(dateObject.getDate()).padStart(2, "0");

      // New mm-dd-yyyyy format
      const formattedDate = `${month}/${day}/${year}`;
      //const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    },

    //
    updateTask: (updatedTask) => {
      update((tasks) => {
        const index = tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          const newTasks = [...tasks];
          newTasks[index] = updatedTask;
          localStorage.setItem("tasks", JSON.stringify(newTasks));
          return newTasks;
        }
        return tasks; // Return an unchanged array if the task with such ID is not found
      });
    },

    // Set task status (completed/not completed)
    toggleTaskCompleted: (id) => {
      update((tasks) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed }; // Switch the execution state
          }
          return task;
        });
        localStorage.setItem(key, JSON.stringify(updatedTasks)); // Save the updated tasks
        return updatedTasks;
      });
    },

    // Another methods...
  };
}

export const tasks = createTasksStore();
