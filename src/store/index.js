import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import cacheInLocalStorage from './localCache/cacheInLocalStorage';
import cacheInSession from './localCache/cacheInSession';

Vue.use(Vuex);

const initState = {
  token: cacheInLocalStorage.get('token'),
  user: cacheInLocalStorage.get('user') || '',
  clinic: cacheInLocalStorage.get('clinic') || '',    // 记录当前诊所信息
  main_menu_status: cacheInSession.get('main_menu_status').toString() || '',   // 记录主导航当前路由
  permissionList: [               // 权限列表
    { index: 1, name: '登记挂号', path: '/navigator/registration', weight: 1 },
    { index: 2, name: '医生站', path: '/navigator/doctorStation', weight: 1 * 2 * 2 },
    { index: 3, name: '收费发药', path: '/navigator/payCharges', weight: (1 * 2 * 2 * 2) + (1 * 2) + (1 * 2 * 2 * 2 * 2) },
    { index: 4, name: '药品库房', path: '/navigator/medicine', weight: 1 * 2 * 2 * 2 * 2 * 2 },
    { index: 5, name: '模板管理', path: '/navigator/modulemenu', weight: 1 * 2 * 2 * 2 * 2 * 2 * 2 },
    { index: 6, name: '客户管理', path: '/navigator/customers', weight: (1 * 2 * 2 * 2 * 2 * 2 * 2 * 2) + (1 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2) },
    { index: 7, name: '统计查询', path: '/navigator/statistics', weight: 1 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 },
    { index: 8, name: '诊所管理', path: '/navigator/settings', weight: 1 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 },
  ],
  print_setting: cacheInLocalStorage.get('print_setting') || {    // 打印设置
    header_receipt: '',   // 小票抬头
    header_prescription: '',      // 处方抬头
    footer: '谢谢惠顾！祝您健康！',     // 落款
    isPrintDocotr: false,         // 是否打印医生
    isPrintDetail: false,
  },
  nations: [                                          // 存储民族列表
    {
      id: '01',
      name: '汉族',
    },
    {
      id: '02',
      name: '蒙古族',
    },
    {
      id: '03',
      name: '回族',
    },
    {
      id: '04',
      name: '藏族',
    },
    {
      id: '05',
      name: '维吾尔族',
    },
    {
      id: '06',
      name: '苗族',
    },
    {
      id: '07',
      name: '彝族',
    },
    {
      id: '08',
      name: '壮族',
    },
    {
      id: '09',
      name: '布依族',
    },
    {
      id: '10',
      name: '朝鲜族',
    },
    {
      id: '11',
      name: '满族',
    },
    {
      id: '12',
      name: '侗族',
    },
    {
      id: '13',
      name: '瑶族',
    },
    {
      id: '14',
      name: '白族',
    },
    {
      id: '15',
      name: '土家族',
    },
    {
      id: '16',
      name: '哈尼族',
    },
    {
      id: '17',
      name: '哈萨克族',
    },
    {
      id: '18',
      name: '傣族',
    },
    {
      id: '19',
      name: '黎族',
    },
    {
      id: '20',
      name: '傈僳族',
    },
    {
      id: '21',
      name: '佤族',
    },
    {
      id: '22',
      name: '畲族',
    },
    {
      id: '23',
      name: '高山族',
    },
    {
      id: '24',
      name: '拉祜族',
    },
    {
      id: '25',
      name: '水族',
    },
    {
      id: '26',
      name: '东乡族',
    },
    {
      id: '27',
      name: '纳西族',
    },
    {
      id: '28',
      name: '景颇族',
    },
    {
      id: '29',
      name: '柯尔克孜族',
    },
    {
      id: '30',
      name: '土族',
    },
    {
      id: '31',
      name: '达斡尔族',
    },
    {
      id: '32',
      name: '仫佬族',
    },
    {
      id: '33',
      name: '羌族',
    },
    {
      id: '34',
      name: '布朗族',
    },
    {
      id: '35',
      name: '撒拉族',
    },
    {
      id: '36',
      name: '毛南族',
    },
    {
      id: '37',
      name: '仡佬族',
    },
    {
      id: '38',
      name: '锡伯族',
    },
    {
      id: '39',
      name: '阿昌族',
    },
    {
      id: '40',
      name: '普米族',
    },
    {
      id: '41',
      name: '塔吉克族',
    },
    {
      id: '42',
      name: '怒族',
    },
    {
      id: '43',
      name: '乌孜别克族',
    },
    {
      id: '44',
      name: '俄罗斯族',
    },
    {
      id: '45',
      name: '鄂温克族',
    },
    {
      id: '46',
      name: '德昂族',
    },
    {
      id: '47',
      name: '保安族',
    },
    {
      id: '48',
      name: '裕固族',
    },
    {
      id: '49',
      name: '京族',
    },
    {
      id: '50',
      name: '塔塔尔族',
    },
    {
      id: '51',
      name: '独龙族',
    },
    {
      id: '52',
      name: '鄂伦春族',
    },
    {
      id: '53',
      name: '赫哲族',
    },
    {
      id: '54',
      name: '门巴族',
    },
    {
      id: '55',
      name: '珞巴族',
    },
    {
      id: '56',
      name: '基诺族',
    },
    {
      id: '57',
      name: '穿青族',
    },
    {
      id: '99',
      name: '其他',
    },
  ],
  customerID: cacheInLocalStorage.get('customerID') || '',  // 存储当前客户ID
  customerType: [ // 客户类型
    { id: 1, name: '自费' },
    { id: 2, name: '医保' },
  ],
  // 存储客户来源
  customer_source: [
    { id: 1, name: '未知' },
    { id: 2, name: '自然来院' },
    { id: 3, name: '熟人介绍' },
    { id: 4, name: '平台推广' },
    { id: 5, name: '微信' },
  ],
  // 打印信息
  feeList: cacheInSession.get('feeList') || [],  // 费用打印
  printMsg: cacheInSession.get('printMsg') || '',    // 病历，处方，诊疗项目打印信息
  marriage: [           // 婚姻状况
    {
      id: 0,
      label: '未知',
    },
    {
      id: 1,
      label: '未婚',
    },
    {
      id: 2,
      label: '已婚',
    },
  ],
  // 使用频率
  frequencyList: [
    { index: 1, name: '每日一次(qd)', times: 1 },
    { index: 2, name: '每日二次(bid)', times: 0.5 },
    { index: 3, name: '每日三次(tid)', times: 0.33 },
    { index: 4, name: '每日四次(qid)', times: 0.25 },
    { index: 5, name: '隔日一次(qod)', times: 2 },
    { index: 6, name: '必要时(prn)', times: 1 },
    { index: 7, name: '每周一次(pw)', times: 7 },
    { index: 8, name: '立即(st)', times: 1 },
  ],
  usageList: [  // 用法
    { name: '口服' },
    { name: '冲服' },
    { name: '外用' },
    { name: '滴眼' },
    { name: '灌肠' },
    { name: '雾化' },
    { name: '皮下注射' },
    { name: '肌肉注射' },
    { name: '静脉注射' },
    { name: '静脉滴注' },
    { name: '肌肉注射皮试' },
    { name: '静脉滴注皮试' },
    { name: '雾化皮试' },
    { name: '穴位注射' },
    { name: '局部封闭' },
  ],
  chinaUsage: [
    { name: '煎服' },
    { name: '外敷' },
    { name: '泡水' },
    { name: '生吃' },
    { name: '直接服用' },
    { name: '温水服用' },
    { name: '水煎服两次使用' },
    { name: '碾碎分两次服用' },
  ],
  doseUnitList: [
    { name: 'g' },
    { name: 'mg' },
    { name: 'ml' },
    { name: 'ug' },
    { name: '板' },
    { name: '小包' },
    { name: '小袋' },
    { name: '粒' },
    { name: '片' },
    { name: '枚' },
    { name: '张' },
    { name: '贴' },
    { name: '支' },
    { name: '只' },
    { name: '饼' },
    { name: '袋' },
    { name: '盒' },
    { name: '桶' },
    { name: '单位' },
    { name: '万单位' },
    { name: '把' },
    { name: '%' },
  ],
  medicineinfo: [], // 原始编辑药品信息
  purchrecodecreate: cacheInSession.get('purchrecodecreate') || '', // 创建入库单的信息
  error_code_list: [],
  bindSbMsg: cacheInLocalStorage.get('bindSbMsg') || {},  // 医保信息
  seriesCode: '', // 业务结算号
  cart: cacheInLocalStorage.get('cart') || [],  // 购物车
  prepare_to_pay_list: cacheInLocalStorage.get('prepare_to_pay_list') || [],  // 下单商品列表
};

export default new Vuex.Store({
  getters,
  mutations,
  state: initState,
});
