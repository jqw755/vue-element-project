<template>
  <div class="login-container">
    <header class="header-wrap">
      <div class="f-left system-name">欢迎登录</div>
    </header>

    <div class="login-bg">
      <img src="../assets/login-bg.jpg" alt="" class="login-bg-img">
    </div>

    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">

      <el-form-item label="账号" prop="account">
        <el-input placeholder="输入账号" v-model="loginForm.account"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input placeholder="输入密码" type="password" v-model="loginForm.pwd"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <footer class="text-center">后台系统 ©2019</footer>
  </div>
</template>

<script>
  import {staticRoute, dynamicRouter, resetRouter} from '../router/index'
  import auth from '@/common/auth'

  export default {
    data() {
      return {
        loginForm: {
          account: '',
          pwd: ''
        },
        defaultAccount: {
          defaultAccount: 'admin',
          defaultPwd: '@123456'
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 3, message: '账号至少3个字符', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {required: true, message: '请输入密码', trigger: 'change'},
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {account, pwd} = this.loginForm;
            const {defaultAccount, defaultPwd} = this.defaultAccount;
            if (account === defaultAccount && pwd === defaultPwd) {
              // 登录后先重置之前添加的路由，避免重复
              resetRouter();

              auth.setIsLogin(1);
              this.$router.push('/index');
            } else {
              this.$message.warning('账号或密码不正确')
            }
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    height: 100%;
    position: relative;
    background: #f3f3f3;
    .header-wrap {
      background: #fff;
      height: 60px;
      line-height: 60px;
      box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .15);
      .system-name {
        color: #333;
        font-weight: bold;
        font-size: 20px;
        margin-left: 10%;
      }

    }
    .login-bg {
      width: 100%;
      margin-top: 50px;
      background: #01132b;
      .login-bg-img {
        display: block;
        margin: 10px auto;
      }

    }
    .login-form {
      width: 400px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 0 12px 2px rgba(0, 0, 0, .15);
      padding: 16px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      .login-btn {
        width: 100%;
        border-radius: 0;
      }
    }
    footer {
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      left: 0;
      color: #999;
    }
  }
</style>
