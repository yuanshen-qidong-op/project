<!-- src/components/Register.vue -->
<template>
  <div>
    <h2>注册</h2>
    <input v-model="form.username" type="text" placeholder="用户名" />
    <input v-model="form.email" type="email" placeholder="邮箱" />
    <input v-model="form.password" type="password" placeholder="密码" />
    <button @click="handleRegister">注册</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: { username: '', email: '', password: '' }
    };
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post('/api/auth/register', this.form);
        alert('注册成功，请登录');
        this.$router.push('/login');
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }
};
</script>

<style>
</style>