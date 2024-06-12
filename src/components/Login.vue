<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { loginUser } from '@/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginUser(this.username, this.password);
        localStorage.setItem('token', response.token);
        this.$emit('login-success');
      } catch (err) {
        this.error = 'Invalid credentials';
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}
input {
  margin: 10px 0;
  padding: 10px;
}
button {
  padding: 10px;
}
</style>
