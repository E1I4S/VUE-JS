<template>
  <div>
    <h2>Agregar Nueva Tarea</h2>
    <form @submit.prevent="submitTask">
      <input v-model="newTask" placeholder="Escribe una nueva tarea" />
      <button type="submit">Agregar Tarea</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      newTask: ""
    };
  },
  methods: {
    submitTask() {
      if (this.newTask.trim()) {
        this.$emit("add-task", { text: this.newTask, completed: false });
        this.newTask = "";
      }
    }
  }
};
</script>

