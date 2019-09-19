<template>
  <div class="login-container">
    <div class="bg-top">
      <div class="system-name">欢迎登录</div>
    </div>
    <div class="bg-bottom"></div>
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
  </div>

</template>

<script>
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
              this.$router.push('/index');
              auth.setIsLogin(1);
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
    .bg-top {
      height: 50%;
      background: #0081dc;
      position: relative;
      .system-name{
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 30px;
        margin-left: -40%;
      }
    }
    .bg-bottom {
      height: 50%;
      background: #ebebeb;
    }
    .login-form {
      width: 400px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, .15);
      padding: 16px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      .login-btn{
        width: 100%;
        border-radius: 0;
      }
    }
  }
</style>
