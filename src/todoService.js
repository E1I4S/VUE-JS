import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export default {
  async getTodos() {
    try {
      const response = await axios.get(API_URL);
      // Mapea los datos de la API para usar "text" y "completed" consistentemente
      return response.data.todos.map(todo => ({
        id: todo.id,
        text: todo.todo,         // Usar "todo.todo" si el campo se llama "todo"
        completed: todo.completed
      }));
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      throw error;
    }
  },

  async getTodo(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return {
        id: response.data.id,
        text: response.data.todo,  // Asegurarse que coincida con "text"
        completed: response.data.completed
      };
    } catch (error) {
      console.error(`Error al obtener la tarea con id ${id}:`, error);
      throw error;
    }
  },

  async createTodo(todo) {
    try {
      const response = await axios.post(API_URL, { todo: todo.text, completed: todo.completed });
      return {
        id: response.data.id,
        text: response.data.todo,
        completed: response.data.completed
      };
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      throw error;
    }
  },

  async updateTodo(id, todo) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { todo: todo.text, completed: todo.completed });
      return {
        id: response.data.id,
        text: response.data.todo,
        completed: response.data.completed
      };
    } catch (error) {
      console.error(`Error al actualizar la tarea con id ${id}:`, error);
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      console.error(`Error al eliminar la tarea con id ${id}:`, error);
      throw error;
    }
  }
};
