<script setup>
import { ref } from 'vue';
import TodoList from "@/components/TodoList.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const isAuthenticated = ref(false);
const isLoginForm = ref(true);

const handleLoginSuccess = () => {
  isAuthenticated.value = true;
};

const handleLogout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
};

const handleRegisterSuccess = (token) => {
  localStorage.setItem('token', token);
  isAuthenticated.value = true;
};

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};

if (localStorage.getItem('token')) {
  isAuthenticated.value = true;
}
</script>

<template>
  <main>
    <div v-if="!isAuthenticated">
      <div v-if="isLoginForm">
        <Login @login-success="handleLoginSuccess" />
        <p>Don't have an account? <button @click="toggleForm">Register</button></p>
      </div>
      <div v-else>
        <Register @register-success="handleRegisterSuccess" />
        <p>Already have an account? <button @click="toggleForm">Login</button></p>
      </div>
    </div>
    <div v-else>
      <TodoList />
      <button @click="handleLogout">Logout</button>
    </div>
  </main>
</template>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

button.logout {
  background-color: #ff4d4d;
}

button.logout:hover {
  background-color: #ff1a1a;
}
</style>
