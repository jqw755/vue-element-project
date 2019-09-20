<template>
  <el-container class="home-container">
    <!--页头-->
    <el-header class="global-header ">
      <div class="f-left">欢迎您</div>
      <div class="login-out f-right" @click="logout">
        退出登录
      </div>
    </el-header>

    <el-container>
      <!--菜单-->
      <el-aside width="200px" class="menu-aside">
        <el-menu class="home-menu" :unique-opened="true" :default-active="currentPage" @select="menuSelect">
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">列表管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!--子页面显示的内容区-->
      <el-main class="home-content-wrap">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!--返回顶部-->
        <div class="text-center to-top" v-show="isShowTop" @click="toTop">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import auth from '../../common/auth'

  export default {
    data() {
      return {
        currentPage: auth.getCurrentPage(),

        isShowTop: false, // 显示返回顶部按钮

        // 公司信息
        companyInfo: {},
        // 当前登录账户信息
        userInfo: {},

      }
    },
    mounted() {
      // 获取用户 公司信息
      this.userInfo = auth.getUserInfo();

    },

    methods: {
      // 页面home-content滚动监听（暂时去掉，不起作用）
      homeScroll() {
        // 监听页面滚动
        window.addEventListener('scroll', () => {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          this.isShowTop = scrollTop >= 500;
        }, true)
      },
      // 获取页面滚动高度
      toTop() {
        if (document.documentElement && document.documentElement.scrollTop) {
          document.documentElement.scrollTop = 0;
        } else if (document.body) {
          document.body.scrollTop = 0;
        }
      },

      // 选中菜单
      menuSelect(path){
        this.$router.push({path});
      },

      //  退出登录
      logout() {
        this.$confirm('确定退出登录吗?', '退出登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 前端退出
          auth.removeToken();
          this.$router.push('/login');
        }).catch(() => {
        });
      },
    },
    computed: {},
    watch: {},
  }
</script>
<style lang="scss" scoped>
  .home-container {
    height: 100%;
    position: relative;
    .global-header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-weight: bold;
      padding: 0 30px;
      background: $global-header-bg;
      z-index: 2001;
      letter-spacing: 0;
      .login-out {
        cursor: pointer;
      }
    }

    .menu-aside {
      min-height: 100%;
      box-shadow: -2px 0 10px 2px rgba(0, 0, 0, .2);
      .home-menu {
        height: 100%;
        background: $base-f7;
      }
    }

    .home-content-wrap {
      min-height: 100%;
      color: $base-font;
      position: relative;
      padding-left: 20px;
      .to-top {
        width: 42px;
        height: 42px;
        color: #7ebf41;
        border-radius: 50%;
        cursor: pointer;
        transition: .3s;
        box-shadow: 0 0 6px rgba(0, 0, 0, .3);
        z-index: 9999;
        background: #fff;
        position: fixed;
        right: 30px;
        bottom: 40px;

      }

    }

  }
</style>

