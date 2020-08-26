import Vue from 'vue'
import Router from 'vue-router'
import auth from '../common/auth'
import $store from '../store/index'

Vue.use(Router);

// 导入各页面
const
  login = () => import('@/view/login.vue').then(m => m.default),
  index = () => import('@/view/index.vue').then(m => m.default),
  home = () => import('@/view/home/home.vue').then(m => m.default);

// 放在home.vue中的各个嵌套页面
const childrenArr = [
  {
    name: 'index',
    path: '/',
    component: index,
    meta: {
      title: '首页',
      requireAuth: true
    }
  },
  {
    name: 'index1',
    path: '/index',
    component: index,
    meta: {
      title: '首页',
      requireAuth: true
    }
  },
];

// 定义需要权限的动态路由
export const dynamicRouter = [];

// 定义好无需权限的页面，注入到路由对象中
export const staticRoute = [
  {
    path: '/',
    component: home,
    meta: {
      title: '首页',
      requireAuth: true
    },
    children: childrenArr
  },
  {
    path: '/login',
    component: login,
    meta: {
      title: '欢迎登陆'
    }
  },
];
const createRouter = () => new Router({
  scrollBehavior: () => ({y: 0}),
  routes: staticRoute
});
const router = createRouter();

// 路由进入前执行
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    // 处理，添加动态路由
   // let dR = []; //创建一个数组用来存储符合权限的路由

    // for (let router of dynamicRouter) {
    //   if (router.children && router.children.length) {
    //     for (let page of router.children) {
    //       if (page.meta && page.meta.roles) {
    //         //符合条件的路由信息就放进数组里
    //         dR.push(router);
    //       }
    //     }
    //   }
    // }
   // router.addRoutes(dR.concat([{path: '*', redirect: '/login'}]));
    // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  //  next({...to, replace: true}); // 详见  https://juejin.im/post/591aa14f570c35006961acac

    if (to.meta.requireAuth && !auth.isLogin()) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }else {
      next();
    }

  }
});
// 进入路由后执行
router.afterEach((to, from, next) => {
  // 将to页面的路由父子信息存进本地做面包屑导航，再通知store从本地取出来，因为客户端存数据不是双向绑定的，只能通过store取
  // 且又要避免刷新页面，丢失上一级页面路由信息，还需要进行path对比
  // if (to.path !== auth.getCurrentPage()) {
  //   auth.setBreadcrumb({
  //     'to': { meta: to.meta, path: to.path },
  //     'from': { path: from.path }
  //   });
  // }
  // $store.dispatch('setBreadcrumb', true);

  // 将该页面路由存本地，对应home.vue的菜单，实现菜单默认选中状态
  auth.setCurrentPage(to.path);

});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
//  !!! 作用是：重置之前addRoutes过的路由，避免多次add出现重复 !!!
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router;
