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

  <script>
  import axios from 'axios';
  
  export default {
    name: 'AgregarTarea',
    data() {
      return {
        task: {
          title: '',
          description: '',
        },
      };
    },
    watch: {
      // Observa cambios en el título o la descripción y envía la tarea automáticamente
      task: {
        deep: true,
        handler() {
          this.guardarTarea();
        },
      },
    },
    methods: {
      async guardarTarea() {
        // Verifica que el título no esté vacío antes de hacer la solicitud
        if (!this.task.title.trim()) return;
  
        try {
          // Realiza la llamada POST al API con la tarea
          await axios.post('https://api.dummyjson.com/todos', {
            title: this.task.title,
            description: this.task.description,
          });
          console.log('Tarea guardada automáticamente');
        } catch (error) {
          console.error('Error al guardar la tarea:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el formulario de agregar tareas */
  .add-task {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  
