<template>
  <div class="login-page">
    <el-form
      ref="form"
      :model="form"
      class="login-form"
      label-width="120px">
      <el-form-item label="用户名">
        <el-input
          v-model="form.name"
          placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie'

export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      // Do your business
      if (this.form.name && this.form.password) {
        Cookies.set('username', this.form.name)
        location.href = '/'
      }
    }
  }
}
</script>

<style>
  .login-page {
    position: relative;
    height: 100vh;
  }

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    transform: translate(-50%, -50%);
  }
</style>
