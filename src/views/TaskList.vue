<template>
  <div>
      <h1>Lista de Tareas</h1>
      <button @click="fetchTasks">Cargar Tareas</button>
      <div v-if="tasks.length > 0">
          <div v-for="task in tasks" :key="task.id">
              <div>
                  <h5 :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">{{ task.todo }}</h5>
                  <span>{{ task.completed ? 'Completada' : 'Pendiente' }}</span>
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
  name: "TaskList",
  data() {
      return {
          tasks: [], // Almacenamiento local de las tareas traídas de la API
      };
  },
  methods: {
      // Llamada para obtener las tareas desde la API externa
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

      // Cambiar el estado de una tarea (completada/no completada)
      toggleTaskCompletion(task) {
          task.completed = !task.completed;
      },

      // Eliminar la tarea seleccionada
      deleteTask(task) {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
  },
};
</script>

<style scoped>
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
