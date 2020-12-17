<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-09 18:04:00
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-12 15:34:19
 -->
<template>
  <div class="outpatient_componnent">

    <el-collapse-transition>
      <div class="left" v-show='isHideOrShow' id='doctorStationLeft'>
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
          <el-menu-item index="/navigator/doctorStation/treatmentHistory">
            <i class="el-icon-edit-outline"></i>接诊记录
          </el-menu-item>
          <el-menu-item index="/navigator/doctorStation/patientMessage">
            <i class="el-icon-tickets"></i>今日接诊
          </el-menu-item>
        </el-menu>
        <div v-show='$route.path === "/navigator/doctorStation/patientMessage"'>
          <div class="quick">
            <el-button @click="openQuickRegistWin" size='small'>快速接诊</el-button>
            <el-button @click="refresh" size='mini'>刷新</el-button>
          </div>
          <div class="todaySeeDoctor">
            <h3>就诊列表
              <span>{{ todaySeeDoctor.length}} 人</span>
            </h3>
            <ul>
              <li v-for="(item,index) in todaySeeDoctor" :key='index' :class="{'active' : isActive === item.registid }">
                <p>
                  <span>{{ item.name }}-</span>
                  <span>{{ item.gender | SexState }}-</span>
                  <span>{{ item.age }}</span>
                </p>
                <p class="status">
                  <span>{{ item.registstatus | statusFilter }}</span>
                </p>
                <el-button size='mini' v-if='item.registstatus == 1' @click="receivePatient(item, 1)">接诊</el-button>
                <el-button size='mini' v-else-if='item.registstatus == 2' @click="receivePatient(item, 2)">继续诊断</el-button>
                <el-button size='mini' v-else-if='item.registstatus == 3' @click="receivePatient(item, 3, index)">查看</el-button>
              </li>
              <li v-for="(item,index) in wctodaySeeDoctor" :key='index' :class="{'active' : isActive === item.id }">
                <p>
                  <span>{{ item.name }}-</span>
                  <span>{{ item.gender | SexState }}-</span>
                  <span>{{ calculateFromBirth(item.birth_date) }}</span>
                </p>
                <p class="status">
                  <span>{{item.booking_time? `预约时间:${item.booking_time.substr(11)}` : status(item.status)}}</span>
                </p>
                <el-button size='mini' v-if='item.status == 1' @click="receivePatient(item, 1)">接诊</el-button>
                <el-button size='mini' v-else-if='item.status == 2' @click="receivePatient(item, 2)">继续诊断</el-button>
                <el-button size='mini' v-else-if='item.status == 3' @click="receivePatient(item, 3, index)">查看</el-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    
    <div @click="isHideOrShow = !isHideOrShow" class="hide">
      <span v-show='isHideOrShow'>收起</span>
      <span v-show='!isHideOrShow'>展开</span>
    </div>
    <div class="right" id='doctorStationRight'>
      <router-view class="view" :patientMsg='msg' ref='initType' @destroyScroll="destroy_scroll" @initScroll="init_scroll" @endDiagnosis="endDiagnosis" @detainPage="switchRouter">
      </router-view>
    </div>

    <!-- 快速接诊 -->
    <div class="quickRegistStyle" v-show='quickRegistWinStatus'>
      <div class="container">
        <quick-regist @closeRegistWin="closeRegistWin"></quick-regist>
      </div>
    </div>
      
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { prescriptionList, getUserChargitemList,
 getUserMedicalInfo, acceptPatients, getClinicName, registdoctor, registsingle, sbRemindApi, wcregistlist, wcregistrationAdd } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import { BCC334 } from '@/common/js/dictionary';
import deepcopy from '@/utils/deepcopy';
import { jsTimestampFilter } from '@/utils/filters';
import Scrollbar from 'smooth-scrollbar';
import { calculateFromBirth } from '@/utils/ageTransfer';
import connectionTest from '@/common/js/connection';
import quickRegist from '@/pages/doctorStation/components/QuickRegist';

export default {
  data() {
    return {
      opener: null, // 智慧医保窗口
      clinic_name: '',
      num: '',
      todaySeeDoctor: [],
      wctodaySeeDoctor: [],
      savePatientMes: {},
      shortCut: true,   // 快捷栏是否显示
      regType: [  // 挂号类别
        {
          name: '普通',
          value: '1',
        },
        {
          name: '主治',
          value: '2',
        },
        {
          name: '主任',
          value: '3',
        },
        {
          name: '免收诊金',
          value: '4',
        },
        {
          name: '专家号',
          value: '5',
        },
      ],
      msg: {    // 子组件传值保存用户信息
        details: {},   // 详细信息
        medicalRecordsForm: {
          complaint: '',      // 主述
          cur_history: '',   // 现病史
          past_history: '',        // 既往史
          person_history: '',  // 个人史
          allergy_history: '',   // 过敏史
          family_history: '',    // 家族史
          // 月经史和生育史是新加的
          menses_history: '',    // 月经史
          fertilit_history: '',    // 生育史
          other_history: '',  // 其他
          temperature: '',    // 体温
          systolic_pressure: '',    // 收缩压
          diastolic_pressure: '',   // 舒张压
          pulse: '',      // 脉搏
          breathing: '',          // 呼吸
          weight: '',          // 体重
          mainphyexam: '',    // 体格检查
          other_phy_exam: '',    // 辅助检查
          jibingjson: [],      // 病症tags
          advice: '',
          diagn_result: '',   // 本次诊断结果
          yayichuli: [],
          yayizhiliaojihua: [],
        },   // 病历
        westMedPre: [   // 西药处方
          {
            westMedForm: {},
            westPreStatus: {
              isDisabled: false,   // 禁用表单
              isIconShow: false,      // 收费图标
              validation: false,    // 验证
            },
          },
        ],
        chinaMedPre: [   // 中药处方
          {
            chinaMedForm: {},
            chinaPreStatus: {
              isDisabled: false,   // 禁用表单
              isIconShow: false,      // 收费图标
              validation: false,    // 验证
            },
          },
        ],
        infusionMedPre: [{  // 输液处方
          InfusionArr: [],
          infusionPreStatus: {
            isDisabled: false,   // 禁用表单
            isIconShow: false,      // 收费图标
            validation: false,    // 验证
          },
        }],
        westPreShow: 0,
        chinaPreShow: 0,
        infusionPreShow: 0,
        presForm: [], // 处方列表
        checkItem: {
          items: [],
          checkPayList: [],
          otherMsg: {},
          totalMoney: 0,
        },
        comsumables: {
          items: [],
          comsumablesPayList: [],
          otherMsg: {},
          totalMoney: 0,
        },
        other: {
          items: [],
          otherPayList: [],
          otherMsg: {},
          totalMoney: 0,
        },
        doctorTip: {   // 医生信息
          name: '',
          tipMsg: true,
          content: '请完善用户信息',
        },
        medicalAdvice: '',    // 医嘱
      },
      isActive: '',
      isHideOrShow: true,
      dialogFormVisible: false, // 快速接诊 模态框
      Interval: null,    // 计时器
      quickRegistWinStatus: false, // 快速接诊窗口
    };
  },
  methods: {
    calculateFromBirth,
    ...mapMutations(['change_customerID']),
    init_scroll() { // 滚动条插件
      Scrollbar.init(document.querySelector('#doctorStationLeft'));
      Scrollbar.init(document.querySelector('#doctorStationRight'), {
        alwaysShowTracks: true,
      });
    },
    destroy_scroll() { // 滚动条插件
      Scrollbar.destroyAll();
    },
    switchRouter() {
      // console.log(index);
      // console.log(this.$route.path);
    },
    openQuickRegistWin() {
      this.quickRegistWinStatus = true;
      this.destroy_scroll();
    },
    closeRegistWin(flag) {
      this.quickRegistWinStatus = false;
      this.init_scroll();
      if (flag === 1) {  // 代表快速挂号成功
        this.getPreMes();   // 刷新患者列表
      }
    },
    refresh() {
      this.getWcPre();
      this.getPreMes();
    },
    getRecord(val) {  // 获取病历及医嘱
      httpServerNormal(getUserMedicalInfo, {
        regist_id: val.registid,
        medical_id: '',
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          console.log('getUserMedicalInfo返回的res', res);
          if (res) {
            this.$set(val, 'medicalRecordsForm', res);
            this.$set(val.medicalRecordsForm, 'temperature', res.temperature === 0 ? '' : res.temperature);
            this.$set(val.medicalRecordsForm, 'systolic_pressure', res.systolic_pressure === 0 ? '' : res.systolic_pressure);
            this.$set(val.medicalRecordsForm, 'diastolic_pressure', res.diastolic_pressure === 0 ? '' : res.diastolic_pressure);
            this.$set(val.medicalRecordsForm, 'pulse', res.pulse === 0 ? '' : res.pulse);
            this.$set(val.medicalRecordsForm, 'breathing', res.breathing === 0 ? '' : res.breathing);
            this.$set(val.medicalRecordsForm, 'weight', res.weight === 0 ? '' : res.weight);
            this.$set(val.medicalRecordsForm, 'menses_history', res.menses_history === 0 ? '' : res.menses_history);
            this.$set(val.medicalRecordsForm, 'fertilit_history', res.fertilit_history === 0 ? '' : res.fertilit_history);

            this.$set(val.medicalRecordsForm, 'jibingjson', res.jibingjson ? JSON.parse(res.jibingjson) : []);

            // 牙科病历
            if (res.medicaltype) {
              const yayizhiliaojihua = res.yayizhiliaojihua.map((v) => {
                return {
                  desc: v.desc,
                  pos: JSON.parse(v.pos),
                };
              });
              const yayichuli = res.yayichuli.map((v) => {
                return {
                  desc: v.desc,
                  pos: JSON.parse(v.pos),
                };
              });
              this.$set(val.medicalRecordsForm, 'mainphyexam', res.mainphyexam ? JSON.parse(res.mainphyexam) : []);
              if (!val.medicalRecordsForm.mainphyexam) {
                this.$set(val.medicalRecordsForm, 'mainphyexam', []);
              }
              this.$set(val.medicalRecordsForm, 'other_phy_exam', res.other_phy_exam ? JSON.parse(res.other_phy_exam) : []);
              if (!val.medicalRecordsForm.other_phy_exam) {
                this.$set(val.medicalRecordsForm, 'other_phy_exam', []);
              }
              this.$set(val.medicalRecordsForm, 'yayizhiliaojihua', yayizhiliaojihua);
              this.$set(val.medicalRecordsForm, 'yayichuli', yayichuli);
            } else {
              // 全科病历
              this.$set(val.medicalRecordsForm, 'medicaltype', 0);
            }
          }
        }
      });
    },
    getPresList(val) {  // 获取处方列表
      httpServerNormal(prescriptionList, {
        regist_id: val.registid,
        status: -1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const arr1 = [];
          const arr2 = [];
          const arr3 = [];
          if (res && res.length) {
            res.forEach((item) => {
              switch (item.prescript_type) {
                case 1:
                  // 因后台接口返回字段不一样，添加字段
                  item.drug_list.forEach((d) => {
                    d.count_ulname = d.price_unit;
                    d.specs = d.specs_trans;
                  });
                  arr1.push(item);
                  break;
                case 2:
                  item.drug_list.forEach((d) => {
                    item.total = d.total;
                    d.count_ulname = d.price_unit;
                    d.specs = d.specs_trans;
                  });
                  arr2.push(item);
                  break;
                case 3:
                  item.drug_list.forEach((d) => {
                    d.count_ulname = d.price_unit;
                    d.specs = d.specs_trans;
                  });
                  arr3.push(item);
                  break;
                default:
                  break;
              }
            });
          }
          this.$set(val, 'westPreList', arr1);
          this.$set(val, 'chinaPreList', arr2);
          this.$set(val, 'infusionPreList', arr3);
        }
      });
    },
    getCheckPayList(val) {  // 获取客户收费项目列表
      httpServerNormal(getUserChargitemList, {
        status: -1,
        regist_id: val.registid,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const arr1 = [];
          const arr2 = [];
          const arr3 = [];
          if (res && res.length) {
            res.forEach((item) => {
              switch (item.item_type) {
                case 3:
                  arr1.push(item);
                  break;
                case 4:
                  arr2.push(item);
                  break;
                case 6:
                  arr3.push(item);
                  break;
                default:
                  break;
              }
            });
          }
          // 检验检查
          if (arr1.length) {
            let sum = 0;
            arr1.forEach((val) => {
              sum += val.total_price;
            });
            val.checkItem.totalMoney = sum; // 超出库存提示
            val.checkItem.items = arr1;
            val.checkItem.otherMsg.isDisabled = true;
          } else {
            val.checkItem.otherMsg.isDisabled = false;
          }
          // 耗材
          // val.comsumables.items = arr2.length ? arr2 : val.comsumables.items;
          if (arr2.length) {
            let sumComsumables = 0;
            arr2.forEach((val) => {
              sumComsumables += val.total_price;
            });
            val.comsumables.totalMoney = sumComsumables;
            val.comsumables.items = arr2;
            val.comsumables.otherMsg.isDisabled = true;
          } else {
            val.comsumables.otherMsg.isDisabled = false;
          }
          // 其他
          // val.other.items = arr3.length ? arr3 : val.other.items;
          if (arr3.length) {
            let sumOther = 0;
            arr3.forEach((val) => {
              sumOther += val.total_price;
            });
            val.other.totalMoney = sumOther;
            val.other.items = arr3;
            val.other.otherMsg.isDisabled = true;
          } else {
            val.other.otherMsg.isDisabled = false;
          }
        }
      });
    },
    getWcPre() { // 获取微信预约患者列表
      httpServerNormal(wcregistlist).then((res) => {
        this.wctodaySeeDoctor = res;
      });
    },
    async getPreMes() { // 获取患者列表
      await httpServerNormal(registdoctor, {
        doctorid: this.user.userid,   // 医生id
        fromdate: jsTimestampFilter(new Date()),
        todate: jsTimestampFilter(new Date()),
        // fromdate: '2021-01-16',
        // todate: '2021-01-16',
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const arr = [];
          if (!res.entity || !res.entity.length) {
            return;
          }
          res.entity.forEach((val) => {
            val.age = calculateFromBirth(val.birthdate);
            if (this.todaySeeDoctor.length === 0) {
              val.medicalRecordsForm = {  // 病历
                clinic_id: '',
                regist_id: '',
                medical_id: '',
                complaint: '',      // 主述
                cur_history: '',   // 现病史
                past_history: '',        // 既往史
                person_history: '',  // 个人史
                allergy_history: '',   // 过敏史
                family_history: '',    // 家族史
                // 这里是新加的 月经史和生育史 体重
                menses_history: '', // 月经
                fertilit_history: '', // 生育
                weight: '', // 体重
                other_history: '',  // 其他
                temperature: '',    // 体温
                systolic_pressure: '',    // 收缩压
                diastolic_pressure: '',   // 舒张压
                pulse: '',      // 脉搏
                breathing: '',          // 呼吸
                mainphyexam: '',    // 体格检查
                other_phy_exam: '',    // 辅助检查
                jibingjson: [],      // 病症tags
                advice: '',
                yayizhiliaojihua: [],
                yayichuli: [],
                diagn_result: '',   // 本次诊断结果
              };
              val.westMedPre = [{
                westMedForm: {
                  flag: true,
                  totalMoney: 0,    // 总价
                  clinic_id: this.clinic,
                  regist_id: val.registid,
                  prescript_id: '',
                  prescript_type: 1,       //  处方类型，1-西药处方，2-中药处方，3-输液处方
                  doctor: this.msg.doctorTip.name,
                  doctorid: this.user.userid,
                  status: 0,
                  drug_list: [
                    {
                      group_index_str: '',     // 组合
                      drug_id: '',   // 药品id
                      drug_type: 0,
                      name: '',   // 药品名
                      spec_text: '',     // 规格
                      use_method: '',     // 用法
                      dosage: '',    // 单次剂量
                      dose_unit: '',      // 单次剂量(单位)
                      frequency: '',     // 用药频次
                      days: '',      // 天数
                      total: '',    // 开药数量
                      total_unit: '',       // 开药数量(单位)
                      price: 0,     // 单价
                      total_price: 0,     // 金额
                    },
                  ],
                },
                westPreStatus: {
                  isDisabled: false,   // 禁用表单
                  isIconShow: false,      // 收费图标
                  validation: false,    // 验证
                },
              }];
              val.chinaMedPre = [{
                chinaMedForm: {
                  flag: true,
                  totalMoney: 0,    // 总价
                  clinic_id: this.clinic,
                  regist_id: val.registid,
                  prescript_id: '',
                  prescript_type: 2,       //  处方类型，1-西药处方，2-中药处方，3-输液处方
                  doctor: this.msg.doctorTip.name,
                  doctorid: this.user.userid,
                  status: 0,
                  drug_list: [
                    {
                      name: '',   // 药品名
                      spec_text: '',  // 规格
                      bigSpecsUnit: '',  // 大单位
                      dosage: '',    // 单次剂量
                      dose_unit: '',      // 单次剂量(单位)
                      drug_id: '',   // 药品id
                      drug_type: 1,
                      use_note: '',    // 煎法，用法
                      price: 0,    // 单价
                      total_price: 0,     // 金额
                      total_unit: '剂',
                      specs: '',   // 规则计算
                      use_method: '内服',
                      taking_note: '',
                      zjyongfa: '',
                    },
                  ],
                  use_method: '内服',        // 煎法用法
                  total: 1,      // 剂数
                  daily_use: '',   // 每次剂量
                  daily_use_unit: 'ml',
                  frequency: '',       // 频次
                  taking_note: '',      // 要求
                },
                chinaPreStatus: {
                  isDisabled: false,   // 禁用表单
                  isIconShow: false,      // 收费图标
                  validation: false,    // 验证
                },
              }];
              val.infusionMedPre = [{  // 输液处方
                InfusionArr: [
                  {
                    totalMoney: 0,    // 总价
                    status: 0,
                    drug_list: [
                      {
                        name: '',   // 药品名
                        drug_id: '',   // 药品id
                        spec_text: '',
                        drug_type: 0,
                        dosage: '',    // 剂量
                        dose_unit: '',      // 剂量(单位)
                        skin_test: false,     // 皮试
                        total: '',           // 数量
                        total_unit: '',     // 数量单位
                        price: 0,        // 单价
                        total_price: 0,     // 金额
                      },
                    ],
                    use_method: '',        // 用法
                    frequency: '',      // 频次
                    infusion_speed: '',     // 滴速
                    infu_speed_unit: '',     // 滴速(单位)
                    begin_date: new Date(),        // 日期
                    days: '',      // 天数
                  },
                ],
                infusionMedForm: {
                  flag: true,
                  clinic_id: this.clinic,
                  regist_id: val.registid,
                  prescript_id: '',
                  prescript_type: 3,       //  处方类型，1-西药处方，2-中药处方，3-输液处方
                  doctor: this.msg.doctorTip.name,
                  doctorid: this.user.userid,
                  status: 0,
                },
                infusionPreStatus: {
                  isDisabled: false,   // 禁用表单
                  isIconShow: false,      // 收费图标
                  validation: false,    // 验证
                },
              }];
              val.westPreShow = 0;
              val.chinaPreShow = 0;
              val.infusionPreShow = 0;
              val.presForm = [];
              val.checkItem = {
                items: [
                  {
                    clinic_id: this.clinic,
                    regist_id: val.registid,
                    chargitem_id: '',
                    name: '',
                    item_type: 3,
                    total: 1,
                    price: 0,
                    total_price: 0,
                    doctor: this.msg.doctorTip.name,
                    doctorid: this.user.userid,
                    status: 0,
                  },
                ],
                otherMsg: {
                  isDisabled: false,   // 禁用表单
                  isIconShow: false,      // 收费图标
                },
                totalMoney: 0,
              };
              val.comsumables = {
                items: [
                  {
                    clinic_id: this.clinic,
                    regist_id: val.registid,
                    chargitem_id: '',
                    name: '',
                    item_type: 4,
                    total: 1,
                    price: 0,
                    total_price: 0,
                    doctor: this.msg.doctorTip.name,
                    doctorid: this.user.userid,
                    status: 0,
                  },
                ],
                otherMsg: {
                  isDisabled: false,   // 禁用表单
                  isIconShow: false,      // 收费图标
                },
                totalMoney: 0,
              };
              val.other = {
                items: [
                  {
                    clinic_id: this.clinic,
                    regist_id: val.registid,
                    chargitem_id: '',
                    name: '',
                    item_type: 6,
                    total: 1,
                    price: 0,
                    total_price: 0,
                    doctor: this.msg.doctorTip.name,
                    doctorid: this.user.userid,
                    status: 0,
                  },
                ],
                otherMsg: {
                  isDisabled: false,   // 禁用表单
                  isIconShow: false,      // 收费图标
                },
                totalMoney: 0,
              };
              val.checkItemTotalMoney = 0;
              val.comsumablesTotalMoney = 0;
              val.otherTotalMoney = 0;
              val.medicalAdvice = '';
            }
            for (let i = 0; i < this.todaySeeDoctor.length; i++) {
              if (this.todaySeeDoctor[i].registid === val.registid) {  // 存在则赋值
                val.medicalRecordsForm = this.todaySeeDoctor[i].medicalRecordsForm;
                val.medicalAdvice = this.todaySeeDoctor[i].medicalAdvice;
                val.westMedPre = this.todaySeeDoctor[i].westMedPre;
                val.chinaMedPre = this.todaySeeDoctor[i].chinaMedPre;
                val.infusionMedPre = this.todaySeeDoctor[i].infusionMedPre;
                val.presForm = this.todaySeeDoctor[i].presForm;
                val.westPreShow = this.todaySeeDoctor[i].westPreShow;
                val.chinaPreShow = this.todaySeeDoctor[i].chinaPreShow;
                val.infusionPreShow = this.todaySeeDoctor[i].infusionPreShow;
                val.checkItem = this.todaySeeDoctor[i].checkItem;
                val.comsumables = this.todaySeeDoctor[i].comsumables;
                val.other = this.todaySeeDoctor[i].other;
                val.checkItemTotalMoney = this.todaySeeDoctor[i].checkItemTotalMoney;
                val.comsumablesTotalMoney = this.todaySeeDoctor[i].comsumablesTotalMoney;
                val.otherTotalMoney = this.todaySeeDoctor[i].otherTotalMoney;
                val.medicalAdvice = this.todaySeeDoctor[i].medicalAdvice;
                break;
              } else {
                val.medicalRecordsForm = {  // 诊断信息
                  clinic_id: '',
                  regist_id: '',
                  medical_id: '',
                  complaint: '',      // 主述
                  cur_history: '',   // 现病史
                  past_history: '',        // 既往史
                  person_history: '',  // 个人史
                  allergy_history: '',   // 过敏史
                  family_history: '',    // 家族史
                  // 这里是新加的 月经史和生育史 体重
                  menses_history: '', // 月经
                  fertilit_history: '', // 生育
                  weight: '', // 体重
                  other_history: '',  // 其他
                  temperature: '',    // 体温
                  // systolic: '',    // 收缩压
                  systolic_pressure: '',    // 收缩压
                  diastolic_pressure: '',   // 舒张压
                  pulse: '',      // 脉搏
                  breathing: '',          // 呼吸
                  mainphyexam: '',    // 体格检查
                  other_phy_exam: '',    // 辅助检查
                  advice: '',
                  diagn_result: '',   // 本次诊断结果
                  jibingjson: [],      // 病症tags
                  yayizhiliaojihua: [],      // 病症tags
                  yayichuli: [],      // 病症tags
                };
                val.westMedPre = [{  // 西药处方
                  westMedForm: {
                    flag: true,
                    totalMoney: 0,    // 总价
                    clinic_id: this.clinic,
                    regist_id: val.registid,
                    prescript_id: '',
                    prescript_type: 1,  //  处方类型，1-西药处方，2-中药处方，3-输液处方
                    doctor: this.msg.doctorTip.name,
                    doctorid: this.user.userid,
                    status: 0,
                    drug_list: [
                      {
                        group_index_str: '',     // 组合
                        drug_id: '',   // 药品id
                        drug_type: 0,
                        name: '',   // 药品名
                        spec_text: '',     // 规格
                        use_method: '',     // 用法
                        dosage: '',    // 单次剂量
                        dose_unit: '',      // 单次剂量(单位)
                        frequency: '',     // 用药频次
                        days: '',      // 天数
                        total: '',    // 开药数量
                        total_unit: '',       // 开药数量(单位)
                        price: 0,     // 单价
                        total_price: 0,     // 金额
                      },
                    ],
                  },
                  westPreStatus: {
                    isDisabled: false,   // 禁用表单
                    isIconShow: false,      // 收费图标
                    validation: false,    // 验证
                  },
                }];
                val.chinaMedPre = [{
                  chinaMedForm: {
                    flag: true,
                    totalMoney: 0,    // 总价
                    clinic_id: this.clinic,
                    regist_id: val.registid,
                    prescript_id: '',
                    prescript_type: 2,       //  处方类型，1-西药处方，2-中药处方，3-输液处方
                    doctor: this.msg.doctorTip.name,
                    doctorid: this.user.userid,
                    status: 0,
                    drug_list: [
                      {
                        name: '',   // 药品名
                        spec_text: '',  // 规格
                        bigSpecsUnit: '',  // 大单位
                        dosage: '',    // 单次剂量
                        drug_id: '',
                        drug_type: 1,
                        dose_unit: '',      // 单次剂量(单位)
                        use_note: '',    // 煎法，用法
                        price: 0,    // 单价
                        total_price: 0,     // 金额
                        total_unit: '剂',
                        use_method: '内服',
                        taking_note: '',
                        zjyongfa: '',
                      },
                    ],
                    use_method: '内服',        // 煎法用法
                    total: 1,      // 剂数
                    daily_use: '',   // 每次剂量
                    f: 'ml',
                    frequency: '',       // 频次
                    taking_note: '',      // 要求
                  },
                  chinaPreStatus: {
                    isDisabled: false,   // 禁用表单
                    isIconShow: false,      // 收费图标
                    validation: false,    // 验证
                  },
                }];
                val.infusionMedPre = [{  // 输液处方
                  InfusionArr: [
                    {
                      totalMoney: 0,    // 总价
                      status: 0,
                      drug_list: [
                        {
                          name: '',   // 药品名
                          drug_id: '',   // 药品id
                          spec_text: '',
                          dosage: '',    // 剂量
                          drug_type: 0,
                          dose_unit: '',      // 剂量(单位)
                          skin_test: false,     // 皮试
                          total: '',           // 数量
                          total_unit: '',     // 数量单位
                          price: 0,        // 单价
                          total_price: 0,     // 金额
                        },
                      ],
                      use_method: '',        // 用法
                      frequency: '',      // 频次
                      infusion_speed: '',     // 滴速
                      infu_speed_unit: '',     // 滴速(单位)
                      begin_date: new Date(),        // 日期
                      days: '',      // 天数
                    },
                  ],
                  infusionMedForm: {
                    flag: true,
                    clinic_id: this.clinic,
                    regist_id: val.registid,
                    prescript_id: '',
                    prescript_type: 3,       //  处方类型，1-西药处方，2-中药处方，3-输液处方
                    doctor: this.msg.doctorTip.name,
                    doctorid: this.user.userid,
                    status: 0,
                  },
                  infusionPreStatus: {
                    isDisabled: false,   // 禁用表单
                    isIconShow: false,      // 收费图标
                    validation: false,    // 验证
                  },
                }];
                val.westPreShow = 0;
                val.chinaPreShow = 0;
                val.infusionPreShow = 0;
                val.presForm = [];
                val.checkItem = {
                  items: [
                    {
                      clinic_id: this.clinic,
                      regist_id: val.registid,
                      chargitem_id: '',
                      name: '',
                      item_type: 3, // 0-未知，1挂号、2处方、3检查项、4耗材、5门诊购药、6其他"name": "抽血检查",
                      total: 1,
                      price: 0,
                      total_price: 0,
                      doctor: this.msg.doctorTip.name,
                      doctorid: this.user.userid,
                      status: 0,
                    },
                  ],
                  otherMsg: {
                    isDisabled: false,   // 禁用表单
                    isIconShow: false,      // 收费图标
                  },
                };
                val.comsumables = {
                  items: [
                    {
                      clinic_id: this.clinic,
                      regist_id: val.registid,
                      chargitem_id: '',
                      name: '',
                      item_type: 4,
                      total: 1,
                      price: 0,
                      total_price: 0,
                      doctor: this.msg.doctorTip.name,
                      doctorid: this.user.userid,
                      status: 0,
                    },
                  ],
                  otherMsg: {
                    isDisabled: false,   // 禁用表单
                    isIconShow: false,      // 收费图标
                  },
                };
                val.other = {
                  items: [
                    {
                      clinic_id: this.clinic,
                      regist_id: val.registid,
                      chargitem_id: '',
                      name: '',
                      item_type: 6,
                      total: 1,
                      price: 0,
                      total_price: 0,
                      doctor: this.msg.doctorTip.name,
                      doctorid: this.user.userid,
                      status: 0,
                    },
                  ],
                  otherMsg: {
                    isDisabled: false,   // 禁用表单
                    isIconShow: false,      // 收费图标
                  },
                };
                val.checkItemTotalMoney = 0;
                val.comsumablesTotalMoney = 0;
                val.otherTotalMoney = 0;
                val.medicalAdvice = '';  // 医嘱
              }
            }
            arr.push(val);
          });
          // 排序
          const copy = deepcopy(arr);
          copy.sort((obj1, obj2) => {
            if (obj1.registstatus === 3 && obj2.registstatus !== 3) {
              return 1;
            }
            return 0;
          });
          this.todaySeeDoctor = copy;
        }
      });
    },
    async receivePatient(item, id) {   // 点击客户列表获取挂号信息
      if (item.id) {
        await httpServerNormal(wcregistrationAdd, {  // 微信挂的号融入his的挂号中
          deptid: this.user.dept_id,
          register_time: item.register_time,
          id: item.id,
          doctorid: this.user.userid,
          patientid: item.patient_id,
          user_id: item.user_id,
          name: item.name,
          gender: item.gender,
          phone: item.phone,
          birthdate: item.birth_date,
        }).then((res) => {
          this.isActive = item.id;
          item.registid = res.registid;
        }).catch(() => {
          return false;
        });
      }
      if (id === 3) {
        this.$router.push({ path: '/navigator/doctorStation/checkClientMes', query: { patientId: item.registid } });
      } else {
        this.$router.push({ path: '/navigator/doctorStation/patientMessage' });
        console.log('点击接诊registsingle中的item', item);
        httpServerNormal(registsingle, {
          registid: item.registid,
        }).then(async (res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            console.log('registsingle接口返回的res', res);
            this.isActive = item.registid; // 根据id判断选择颜色
            if (id === 1) {
              // 初诊
              await this.acceptPatient(item.registid, 2); // 修改就诊状态 状态2接诊中
              if (item.id) {
                const val = this.todaySeeDoctor.filter((val) => { // 获取当前融入his的挂号数据
                  return item.registid === val.registid;
                })[0];
                console.log(val);
                item = val; // 获取到的值赋给item 避免出现bug
              }
              item.westPreList = [];
              item.chinaPreList = [];
              item.infusionPreList = [];
              item.checkItem.items = [];
              item.comsumables.items = [];
              item.other.items = [];
            }
            if (id === 2) {
              //  复诊
              this.getCheckPayList(item);  // 获取用户收费列表（诊疗项目，耗材，其他）
              this.getRecord(item);   // 获取病历及医嘱
              this.getPresList(item);  // 获取已开处方
            }
            item.details = res;
            item.details.BCC334 = res.szsbcardid ? res.bcc334 ? BCC334.find(v => v.key === res.bcc334).value : BCC334[0].value : '';
            item.details.clinicname = this.clinic_name; // 设置诊所名
            // 计算年龄
            item.details.age = calculateFromBirth(res.birthdate);
            item.doctorTip = this.msg.doctorTip;
            setTimeout(() => {  // 向子组件传值
              this.msg = deepcopy(item);
              // this.$refs.initType.initType(item.details.registtype);
              if (item.details.szsbcardid) {  // 存在电脑号则走智慧医保
                this.sbReminder(item);  // 智慧医保提示
              }
            }, 300);
          }
        });
      }
    },
    async acceptPatient(registid, statusId) {  // 接诊
      await httpServerNormal(acceptPatients, {
        registid: registid,
        deptid: this.user.dept_id, // 科室id
        doctorid: this.user.userid,   // 医生id
        oldstatus: 1,
        newstatus: statusId,
      }).then(async (res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          await this.getPreMes();
          this.getWcPre();
        }
      });
    },
    endDiagnosis() {   // 结束就诊
      // this.getPreMes();
    },
    getClinic_Name() {  // 获取诊所名
      httpServerNormal(getClinicName, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.clinic_name = res.clinic_name;
        }
      });
    },
    async sbReminder(item) {  // 智慧医保提示
      const connectionStatus = await connectionTest(true);
      if (connectionStatus !== '1') {
        return;
      }
      const obj = {
        auth_token: this.bindSbMsg.zhihuiybtoken,
        content: {
          tran_serial_no: this.bindSbMsg.hospitalCode + new Date().format('yyyyMMddhhmmss'),
          operate_person_code: this.bindSbMsg.operatorCode,
          operate_person_name: this.bindSbMsg.operatorName,
          operate_time: jsTimestampFilter(new Date().getTime(), 'yyyyMMdd'),
          visit_no: item.details.registid,
          patient_evidence_type: '01',  // 凭证类型。默认01，社会保障卡号
          card_no: item.details.szsbcardid,   // 个人电脑编号
          pc_no: item.details.szsbcardid,
          medical_dept_code: item.details.departmentcode,
          medical_dept_name: item.details.deptname,
          visit_type: '2',   // 就诊类型（2门诊）
          doctor_code: item.details.doctorcode,
          doctor_name: item.details.doctor,
          patient_name: item.name,
          sex: item.gender + '',
          age: item.age.replace(/[\u4e00-\u9fa5]/g, ''),
          birth_date: item.birthdate.replace(/-/g, ''),
          region_code: '440300',
          insurance_type: '310',  // 险种类型
          /*
            0 不参加
            1 基本医疗保险（一档）
            2 基本医疗保险（二档）
            3 特殊
            4 基本医疗保险（三档）
            5 医疗保险二档（少儿）
            6 统筹保险
          */
        },
      };
      httpServerNormal(sbRemindApi, obj).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE')) && res.is_open_window === '1') {
          // 成功的回调( 直接返回data)  弹窗
          if (this.opener) {
            this.opener.close();
            this.opener = null;
          }
          const url = res.window_url;
          const outerWidth = window.outerWidth;
          const outerHeight = window.outerHeight;
          const height = parseFloat(res.window_size.split(',')[1]);
          const width = parseFloat(res.window_size.split(',')[0]);
          const top = (outerHeight - height) / 2;
          const left = (outerWidth - width) / 2;
          if (res.is_open_window === '' || res.window_url === '' || res.is_open_window === null || res.window_url === null) {
            return;
          }
          this.opener = window.open(url, '_blank', `height=${height},width=${width},top=${top},left=${left}`);

          if (res.window_open_way === '2') {
            setTimeout(() => {
              this.opener.close();
              this.opener = null;
            }, 30000);
          }
        }
      });
    },
    status(status) {
      return status === 1 ? '待接诊' : '';
    },
  },
  components: {
    quickRegist,
  },
  created() {
    if (!this.user.truename) {
      this.msg.doctorTip.name = this.user.phone;  // 将用户名赋值给医生
      this.msg.doctorTip.tipMsg = true;
    } else {
      this.msg.doctorTip.name = this.user.truename;  // 将用户名赋值给医生
      this.msg.doctorTip.tipMsg = false;
    }
    this.getPreMes();
    this.getWcPre();
    this.getClinic_Name();
    // this.Interval = setInterval(this.getPreMes, 30000);  // 30秒刷新
  },
  computed: {
    ...mapGetters(['clinic', 'user', 'token', 'main_mune_list', 'user', 'bindSbMsg']),
    usefulDoctor() {
      return this.doctors.filter((item) => {
        return item.deptid === this.quickForm.deptid;
      });
    },
  },
  mounted() {
    this.init_scroll();
    // this.msg.InfusionArr.push(this.msg.infusionMedPre);
  },
  beforeUpdate() {
    this.destroy_scroll(); // 路由更新销毁所有Scrollbar
  },
  updated() {
    if (this.$route.path.indexOf('doctorStation') === -1) {
      return;
    }
    // 如果路由切到非settings模块，此时settings组件已销毁，如果执行destroyAll将会报错，故return
    this.$nextTick(() => {
      this.init_scroll(); // 更新完路由重新初始化路由更新销毁所有Scrollbar
    });
  },
  beforeDestroy() {
    clearInterval(this.Interval);
  },
  filters: {
    statusFilter(id) { // 就诊状态
      switch (id) {
        case 0:
          return '未知';
        case 1:
          return '待接诊';
        case 2:
          return ' 诊断中';
        case 3:
          return '就诊完成';
        case 4:
          return '已退号';
        case 5:
          return '已失效';
        default:
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.outpatient_componnent {
  display: flex;
  .left {
    flex: 0 0 200px;
    width: 200px;
    height: 100%;
    padding-top: 10px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    .el-menu{
      border-right: 0;
    }
    .el-form {
      border-bottom: 1px solid #ccc;
      .el-form-item {
        margin-bottom: 10px;
        .el-input {
          width: 140px;
        }
        .el-select {
          width: 140px;
        }
        .el-button {
          width: 80px;
        }
        &.searchSubmit {
          margin-left: 20px;
          span {
            margin-right: 10px;
          }
        }
      }
    }
    .quick{
      margin: 20px 0 20px 30px;
      span {
        margin-left: 10px;
        cursor: pointer;
        &:hover{
          color: $mainColor;
        }
      }
    }
    .todaySeeDoctor {
      min-height: 500px;
      padding-bottom: 30px;
      h3 {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
      }
      p {
        line-height: 30px;
      }
      ul {
        // border-bottom: 2px solid #ccc;
        padding-bottom: 5px;
        li {
          padding-left: 12px;
          border-radius: 3px;
          margin-bottom: 2px;
          position: relative;
          border-bottom: 1px dashed #ccc;
          &.active{
            background-color: #e4e4f0;
          }
          p {
            height: 25px;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.status{
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #666;
            }
          }
          .el-button {
            position: absolute;
            right: 5px;
            padding: 6px 10px;
            bottom: 10px;
            z-index: 1;
          }
        }
      }
    }
  }
  .hide{
    width: 20px;
    height: 50px;
    line-height: 25px;
    margin-top: 20px;
    padding: 5px;
    border-radius: 0 5px 5px 0;
    font-size: 16px;
    color: #666;
    border: 1px solid #ccc;
    border-left: 0;
    text-align: center;
    cursor: pointer;
    i{
    font-size: 20px;
    }
  }
  .right {
    flex: 1 1 auto;
   .view{
      padding: 30px 20px;
      min-height: 100%;
      min-width: 1050px;
      box-sizing: border-box;
   }
  }
}


.quickRegistStyle {
  @include modify_info;
  h3 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    .el-button {
      margin-left: 20px;
    }
  }
  .container {
    width: 450px;
    // overflow-x: hidden;
    min-height: 480px;
    .el-form-item{
      width: 100%;
      margin-bottom: 10px;
      &.ageInputs{
        margin-bottom: 0;
      }
      .el-input {
        width: 200px;
      }
    }
    .dialog-footer {
      width: 140px;
      margin: 10px auto;
    }
    .clear{
      margin-top: 10px;
      margin-left: 10px;
      color: $mainColor;
      cursor: pointer;
    }
  }
}
</style>
