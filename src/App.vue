<template>
  <div id="app">
    <header>
      <h1>Gestor de Tareas</h1>
      <nav>
        <router-link to="/HomeView">Inicio</router-link>
        <router-link to="/TaskList">Lista de Tareas</router-link>
        <router-link to="/AddTask">Agregar Tarea</router-link>
        <router-link to="/CombinedView">Vista Combinada</router-link>
        <router-link to="/AboutView">Acerca de</router-link>
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
/* Estilos globales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background-color: #35495e;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  font-size: 2em;
  margin: 0;
  color: #fff;
}

nav {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #42b983;
}

/* Animación de transición para el cambio de vistas */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
