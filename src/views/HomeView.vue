<template>
  <div>
    <h2>Lista de Tareas</h2>
    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <TodoItem 
          :title="task.text" 
          :completed="task.completed"
          @toggle-completion="toggleCompletion(task)"
          @delTodo="deleteTask(task.id)"
        />
      </li>
    </ul>
    <p v-else>No hay tareas disponibles.</p>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "TaskList",
  props: {
    tasks: Array,
  },
  methods: {
    toggleCompletion(task) {
      this.$emit("update-task", { ...task, completed: !task.completed });
    },
    deleteTask(id) {
      this.$emit("delete-task", id);
    }
  },
  components: {
    TodoItem
  }
};
</script>
