import cacheInLocalStorage from './localCache/cacheInLocalStorage';
import cacheInSession from './localCache/cacheInSession';

const mutations = {
  change_token(state, token) {  // 修改登录状态
    state.token = token;
    if (token) {
      cacheInLocalStorage.set('token', token);   // 登录成功，记录响应的token
    } else {
      cacheInLocalStorage.remove('token');   // 主动退出, 清除登陆状态
    }
  },
  change_user(state, user) {
    state.user = user;
    if (user) {
      cacheInLocalStorage.set('user', user);  // 登陆成功，记录user信息
    } else {
      cacheInLocalStorage.remove('user');   // 退出登陆，删除该user信息
    }
  },
  change_clinic(state, clinic) {
    state.clinic = clinic;
    if (clinic) {
      cacheInLocalStorage.set('clinic', clinic);  // 登陆成功，记录clinic信息
    } else {
      cacheInLocalStorage.remove('clinic');   // 退出登陆，删除该clinic信息
    }
  },
  change_main_menu_status(state, status) {
    if (status) {
      state.main_menu_status = status;
      cacheInSession.set('main_menu_status', status);
    } else {
      state.main_menu_status = '/registration';
      cacheInSession.remove('main_menu_status');
    }
  },
  set_print_setting(state, printSetting) {  // 设置打印
    cacheInLocalStorage.set('print_setting', printSetting);
  },
  change_customerID(state, customerID) {
    if (customerID) {
      state.customerID = customerID;
      cacheInLocalStorage.set('customerID', customerID);
    } else {
      state.clinicStatus = '';
      cacheInLocalStorage.remove('customerID');
    }
  },
  save_medicineinfo(state, val) { // 保存原始编辑药品信息
    state.medicineinfo.push(val);
  },
  send_purchrecodecreate(state, val) { // 发送创建入库单的信息
    state.purchrecodecreate = val;
    if (val) {
      cacheInSession.set('purchrecodecreate', val);
    } else {
      cacheInSession.remove('purchrecodecreate');
    }
  },
  set_feePrintMsg(state, val) { // 费用打印
    state.feeList = val;
    cacheInSession.set('feeList', val);
  },
  // 打印的所有信息
  set_printMsg(state, printMsg) {
    state.printMsg = printMsg;
    cacheInSession.set('printMsg', printMsg);
  },
  change_bindSbMsg(state, bindSbMsg) {  // 修改社保绑定信息
    state.bindSbMsg = bindSbMsg;
    if (bindSbMsg) {
      cacheInLocalStorage.set('bindSbMsg', bindSbMsg);   // 登录成功，记录响应的bindSbMsg
    } else {
      cacheInLocalStorage.remove('bindSbMsg');   // 主动退出, 清除状态
    }
  },
  update_seriesCode(state, seriesCode) {
    state.seriesCode = seriesCode;
  },
  update_cart(state, list) {
    state.cart = list;
    cacheInLocalStorage.set('cart', list);
  },
  update_prepare_to_pay_list(state, list) {
    state.prepare_to_pay_list = list;
    cacheInLocalStorage.set('prepare_to_pay_list', list);
  },
};

export default mutations;
