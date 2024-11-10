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
