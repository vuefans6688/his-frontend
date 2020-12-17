// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as dateUtils from '@/utils/dateUtils';
import Vue from 'vue';
import ElementUI from 'element-ui';
import Es6Promise from 'es6-promise';
import axios from 'axios';
import { priceFilter, sexFilter, jsTimestampFilter, undefineFilter, dateTimeFilter } from '@/utils/filters';
import { getMD5 } from '@/utils/md5';
import { findCurModule, hasPermission, findNextMenu, findcurMenu } from '@/utils/hasPermission';
import Store from './store/index';
import App from './App';
import router from './router';
import './assets/element-variables.scss';
import './assets/theme/font-iconmoon.css';
import './assets/theme/reset.css';
import './assets/theme/site.css';

Es6Promise.polyfill();

// 给Date对象添加几个常用方法
Date.prototype.format = function format(pattern) {
  return dateUtils.format(this, pattern);
};
Date.prototype.compareDate = function compareDate(time1, time2) {
  return dateUtils.compareDate(time1, time2);
};

Date.prototype.plusDays = function plusDays(days) {
  return dateUtils.plusDays(this, days);
};

Date.prototype.getTimestamp = function getTimestamp() {
  return dateUtils.dateToTimestamp(this);
};

Vue.prototype.$http = axios;
Vue.prototype.MD5 = function MD5(value) {
  return getMD5(value);
};

Vue.filter('SexState', sexFilter);
Vue.filter('PriceFilter', priceFilter);
Vue.filter('DateFilter', jsTimestampFilter);
Vue.filter('UndefineFilter', undefineFilter);
Vue.filter('DateTimeFilter', dateTimeFilter);

Vue.use(ElementUI);
Vue.config.productionTip = false;

// 权限控制
router.beforeEach((to, from, next) => {
  // 搜索当前主路由跳转模块(Navigator)
  const curModule = findCurModule(to.path);
  if (!curModule) {
    // 若为非主路由，则放行
    next();
    return;
  }
  // 当前跳转为主路由
  if (!hasPermission(curModule.index, Store.state.user.permission)) {
    // 若当前模块没有权限，则跳到下一模块
    next(findNextMenu(curModule.index));
    return;
  }
  Store.commit('change_main_menu_status', findcurMenu(curModule.index));
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: Store,
  render: h => h(App),
  data: {
    eventHub: new Vue(),
  },
});
