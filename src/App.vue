<template>
  <div id="app">
    <header>
      <h1>Gestor de Tareas</h1>
      <nav class="navbar">
        <router-link to="/HomeView">Inicio</router-link> |
        <router-link to="/TaskList">Lista de Tareas</router-link> |
        <router-link to="/AddTask">Agregar Tarea</router-link> |
        <router-link to="/CombinedView">Vista Combinada</router-link> |
        <router-link to="/AboutView">Acerca de</router-link> |
      </nav>
    </header>

    <!-- Vista que se renderiza según la ruta -->
    <router-view 
      :tasks="tasks" 
      @add-task="addTask" 
      @update-task="updateTask" 
      @delete-task="deleteTask" 
    />
  </div>
</template>

<script>
import TodoService from "@/todoService";

export default {
  data() {
    return {
      tasks: []
    };
  },
  async created() {
    await this.loadTasks();
  },
  methods: {
    async loadTasks() {
      try {
        const tasks = await TodoService.getTodos();
        this.tasks = tasks;
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    },
    async addTask(newTask) {
      try {
        const addedTask = await TodoService.createTodo(newTask);
        this.tasks.push(addedTask);
      } catch (error) {
        console.error("Error al añadir la tarea:", error);
      }
    },
    async updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        try {
          const updatedData = await TodoService.updateTodo(updatedTask.id, updatedTask);
          this.tasks.splice(index, 1, updatedData);
        } catch (error) {
          console.error("Error al actualizar la tarea:", error);
        }
      }
    },
    async deleteTask(id) {
      try {
        await TodoService.deleteTodo(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
  }
};
</script>

<style>
/* Encabezado */
header {
  background-color: #6200ea;
  color: #ffffff;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

header h1 {
  font-size: 2rem;
  margin: 0;
  color: #fff;
}

nav {
  margin-top: 10px;
}

nav a {
  color: #bb86fc;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #3700b3;
  color: #ffffff;
}

/* Contenedor principal */
#app {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

/* Lista de tareas */
.task-list, .add-task-form {
  max-width: 600px;
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-list h1, .add-task-form h2 {
  font-size: 1.8rem;
  color: #6200ea;
  margin-bottom: 1rem;
}

/* Botones */
button {
  background-color: #6200ea;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

button:hover {
  background-color: #3700b3;
}

/* Input */
input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

/* Lista de tareas y animaciones */
.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  background-color: #e8eaf6;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.list-group-item:hover {
  background-color: #d1c4e9;
}

.completed {
  text-decoration: line-through;
  color: #757575;
}

/* Transiciones para lista */
.list-group-item-enter-active, .list-group-item-leave-active {
  transition: all 0.3s ease;
}

.list-group-item-enter, .list-group-item-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
