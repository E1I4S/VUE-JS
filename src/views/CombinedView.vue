<template>
  <div class="combined-view">
    <h1>Vista Combinada de Tareas</h1>

    <!-- Sección para añadir tareas -->
    <div class="add-task-section">
      <form @submit.prevent="addNewTask">
        <div class="form-group">
          <label for="newTask">Nueva tarea:</label>
          <input 
            type="text" 
            v-model="newTaskText" 
            class="form-control" 
            placeholder="Escribe una tarea" 
          />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Agregar tarea</button>
      </form>
    </div>

    <!-- Sección para mostrar la lista de tareas -->
    <div class="task-list-section">
      <h2>Lista de Tareas</h2>

      <!-- Aplicar 'v-if' en el elemento contenedor 'ul' para evitar renderizado innecesario -->
      <ul class="list-group mt-3" v-if="tasks && tasks.length > 0">
        <li 
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="task in tasks" 
          :key="task.id"
        >
          <TodoItem 
            :title="task.text" 
            :completed="task.completed" 
            @toggle-completion="toggleCompletion(task)" 
            @delTodo="deleteTask(task.id)"
          />
        </li>
      </ul>

      <!-- Mensaje cuando no hay tareas -->
      <p v-else>No hay tareas para mostrar.</p>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue';

export default {
  name: 'CombinedView',
  components: { TodoItem },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newTaskText: '' // Controlador de texto para una nueva tarea
    };
  },
  methods: {
    addNewTask() {
      if (this.newTaskText.trim()) {
        this.$emit('add-task', { text: this.newTaskText, completed: false });
        this.newTaskText = ''; // Limpiar campo después de añadir
      }
    },
    toggleCompletion(task) {
      const updatedTask = { ...task, completed: !task.completed };
      this.$emit('update-task', updatedTask);
    },
    deleteTask(taskId) {
      this.$emit('delete-task', taskId);
    }
  }
};
</script>

<style scoped>
.combined-view {
  max-width: 600px;
  margin: 0 auto;
}
.add-task-section, .task-list-section {
  margin-bottom: 20px;
}
</style>

  
