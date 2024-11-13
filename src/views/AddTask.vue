<template>
  <div class="add-task-container">
      <h1>Añadir Tarea</h1>
      <div class="input-group">
          <input 
              v-model="newTask" 
              @keyup.enter="addTask" 
              placeholder="Añadir nueva tarea" 
              class="task-input"
          />
          <button @click="addTask" class="add-button">Añadir</button>
      </div>

      <div v-if="tasks.length > 0" class="task-list">
          <div v-for="task in tasks" :key="task.id" class="task-item">
              <span :class="{ completed: task.completed }">{{ task.todo }}</span>
              <div>
                  <button @click="toggleTaskCompletion(task)">
                      {{ task.completed ? 'Desmarcar' : 'Completar' }}
                  </button>
                  <button @click="deleteTask(task)">Eliminar</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
      return {
          newTask: "", // Campo de entrada para la nueva tarea
          tasks: [],   // Lista de tareas locales
      };
  },
  methods: {
      addTask() {
          if (this.newTask.trim() === "") return;

          const newTask = {
              todo: this.newTask,
              completed: false,
              id: Date.now(), 
          };

          // Añadir la nueva tarea al inicio de la lista
          this.tasks.unshift(newTask);
          this.newTask = ""; // Limpiar el campo de entrada después de agregar
      },

      // Elimina una tarea específica de la lista
      deleteTask(task) {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },

      // Cambia el estado de la tarea entre completada y no completada
      toggleTaskCompletion(task) {
          task.completed = !task.completed;
      },
  },
};
</script>

<style scoped>
.add-task-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.6rem;
  color: #6200ea;
  margin-bottom: 1rem;
}

.task-input {
  width: 100%;
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  font-size: 1rem;
}

.btn-add-task {
  background-color: #6200ea;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-add-task:hover {
  background-color: #3700b3;
}
</style>
