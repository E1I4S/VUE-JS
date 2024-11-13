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
import axios from "axios";
export default {
  name: "AddTask",
  data() {
      return {
          newTask: "", // Campo de entrada para la nueva tarea
          tasks: [],   // Lista de tareas locales
      };
  }, created(){
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
        axios
        .get("https://dummyjson.com/todos")
        .then((response)=>{
          this.tasks=response.data.todos;
        })
        .catch((error)=>{
          console.log (error);
        });
          // Aquí deberían realizar la solicitud a la API usando axios o fetch.
          // La URL que usaremos es: https://dummyjson.com/todos

          // Sugerencia: Intentar implementarlo con axios o fetch
      },

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
.task-list {
  max-width: 600px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8rem;
  color: #6200ea;
  margin-bottom: 1rem;
  text-align: center;
}

/* Lista de tareas */
.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  background-color: #e8eaf6;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.list-group-item:hover {
  background-color: #d1c4e9;
  transform: translateY(-2px);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.completed {
  text-decoration: line-through;
  color: #757575;
}

/* Botón eliminar */
.btn-delete-task {
  background-color: #f44336;
  color: #ffffff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete-task:hover {
  background-color: #e53935;
}

/* Estilo para el checkbox */
.checkbox {
  accent-color: #6200ea;
}
</style>
