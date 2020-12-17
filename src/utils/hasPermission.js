import router from '@/router';
import Store from '@/store/index';

const permissionList = Store.state.permissionList;

// 搜寻下一模块
export function findNextMenu(index) {
  const curModuleIndex = permissionList.findIndex((item) => {
    return item.index === index;
  });
  // 返回下一个
  if (curModuleIndex === permissionList.length - 1) {
    return permissionList[0].path;
  }
  return permissionList[curModuleIndex + 1].path;
}

// 判断模块是否展示
export function hasPermission(index, permission) {
  const rightItem = permissionList.find((item) => {
    return item.index === index;
  });
  if (!rightItem) {
    return false;
  }
  return (rightItem.weight & permission) !== 0;
}

// 搜寻当前路由对应模块
export function findCurModule(path) {
  const menuList = router.options.routes;
  const mainMenuListObj = menuList.find((item) => {
    return item.path.indexOf('navigator') > -1;
  });
  const mainMenuList = mainMenuListObj.children.filter((item) => {
    return item.needAuth;
  });
  const pathArr = path.split('/');
  // 找到当前模块的索引
  const curModule = mainMenuList.find((item) => {
    if (pathArr.length < 3 || path.indexOf('navigator') === -1) {
      return false;
    }
    return pathArr[2] === item.path && item.index > 0;
  });
  return curModule;
}

// 搜寻当前定位到的模块菜单路由
export function findcurMenu(index) {
  return permissionList.find((obj) => {
    return obj.index === index;
  }).path;
}

export default {};
