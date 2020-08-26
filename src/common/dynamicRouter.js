
// 处理，添加动态路由

/**
 * @userType 用户类型 （字符串数字）
 * @menuList  后台返回的未经处理的菜单数组
 *
 * */
import { dynamicRouter } from "@/router/index";

export const createDR = (userType, menuList) => {
  userType = String(userType);

  let dR = []; //创建一个数组用来存储符合权限的路由

  // 获取用户角色，并设置首页路径
  let userTypeDesc = '';

  // 根据用户类型，设置平台类型以及对应的路由
  switch (userType) {
    case '0':
      userTypeDesc = 'main'; //主平台
      break;
    case '1':
      userTypeDesc = 'company'; //桩企平台
      break;
    case '2':
      userTypeDesc = 'customer'; //emp客户平台
      break;
    case '3':
      userTypeDesc = 'company'; //运营商
      break;
    case '4':
      userTypeDesc = 'icpo'; // 综合运营商
      break;
    case '5':
      userTypeDesc = 'scpo'; // 超级运营商
      break;
  }

  let menuUrlList = [];  // 既然页面刷新那么动态路由就消失，从本地取完整菜单重新组装后台菜单数据
  const mapMenu = (list) => {
    list.forEach(item => {
      item.menuUrl ? menuUrlList.push(item.menuUrl) : '';
      if (item.children && item.children.length) {
        mapMenu(item.children);
      }
    });
  };
  mapMenu(menuList); // 初始时 遍历整个本地菜单

  for (let router of dynamicRouter) {
    if (router.children && router.children.length) {
      for (let page of router.children) {
        if (page.meta && page.meta.roles) {
          let idx = router.meta.roles.indexOf(userTypeDesc);
          if (idx !== -1) {
            // 判断该角色下的路由是否在后台返回的菜单数组中
            const urlIdx = menuUrlList.indexOf(router.redirect);
            if (urlIdx !== -1) {
              //符合条件的父级路由信息就放进数组里
              dR.push(router);
            }
            // 上面push的是父页面，下面push父页面中的详情 编辑等子页面
            if (page.meta.parents) {
              page.meta.parents.forEach(item => {
                if (menuUrlList.indexOf(item.href) !== -1) {
                  //符合条件的路由信息就放进数组里
                  dR.push(router);
                }
              });
            }
          }
        }
      }
    }
  }

  return {dR, userTypeDesc, menuUrlList}; // 处理好的动态路由；用户角色字符串；包括可访问的父级、子级（详情，编辑等二级页面）菜单路径
};
