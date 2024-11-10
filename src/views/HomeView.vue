<template>
    <!-- Contenido principal de la página de inicio -->
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" class="home-logo" />
      <h1 class="welcome-message">Bienvenido a tu Gestor de Tareas</h1>
      <p class="description">
        Organiza tus tareas de manera fácil y eficiente. ¡Empieza ahora!
      </p>
      <router-link to="/AddTask" class="btn btn-primary start-button">
        Comienza a agregar tareas
      </router-link>
    </div>
</template>

<style scoped>
/* Estilos para la página de inicio */
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
  padding: 20px;
}

.home-logo {
  max-width: 150px;
  margin-bottom: 30px;
}

.welcome-message {
  font-size: 2.5rem;
  color: #343a40;
  font-weight: bold;
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 30px;
}

.start-button {
  font-size: 1rem;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
}

.start-button:hover {
  background-color: #007bff;
  color: white;
}
</style>
