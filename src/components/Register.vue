<template>
  <div class="register">
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</template>

<script>
import {registerUser, loginUser} from '@/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async register() {
      try {
        await registerUser(this.username, this.password);
        this.success = 'User registered successfully';
        this.error = '';
        const response = await loginUser(this.username, this.password);
        this.$emit('register-success', response.token);
      } catch (err) {
        this.error = 'Registration failed';
        this.success = '';
      }
    }
  }
};
</script>

<style scoped>
.register {
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