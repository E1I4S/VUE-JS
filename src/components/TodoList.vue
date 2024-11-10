<template>
  <div class="task-list">
    <h1>Lista de Tareas</h1>

    <form @submit.prevent="createTask">
      <div class="form-group">
        <label for="task">Nueva tarea:</label>
        <input 
          type="text" 
          v-model="newTaskText" 
          class="form-control" 
          placeholder="Escribe una tarea" 
        />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Agregar tarea</button>
    </form>

    <ul class="list-group mt-3">
      <li 
        v-for="(task, index) in tasks" 
        :key="task.id" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <TodoItem 
          :title="task.text" 
          :completed="task.completed" 
          @toggle-completion="toggleComplete(task)" 
          @delTodo="deleteTask(task.id)" 
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "TodoList",
  components: { TodoItem },
  props: {
    tasks: Array
  },
  data() {
    return {
      newTaskText: ''
    };
  },
  methods: {
    createTask() {
      const newTask = { text: this.newTaskText, completed: false };
      this.$emit("add-task", newTask);
      this.newTaskText = "";
    },
    toggleComplete(task) {
      const updatedTask = { ...task, completed: !task.completed };
      this.$emit("update-task", updatedTask);
    },
    deleteTask(id) {
      this.$emit("delete-task", id);
    }
  }
};
</script>
