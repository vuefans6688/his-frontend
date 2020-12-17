<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-04 15:56:08
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-12 10:31:40
 -->
<template>
  <div>
    <div class="title">
      <h3>客户信息</h3>
      <span @click="resetForm('addForm')" class='clear'> 清空
        <i class="el-icon-delete"></i>
      </span>
      <!-- bindSbMsg.hospitalCode存在则绑定社保 -->
      <el-button @click="openReadingCard" size="mini" type="primary" v-if="bindSbMsg.hospitalCode">读卡</el-button>

      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px" class="demo-form-inline" size='mini'>
        <el-form-item label-width="0">
          <el-col :span='7'>
            <el-form-item label="姓名：" prop="name">
              <el-autocomplete :disabled="this.oldCustomer" v-model="addForm.name" :fetch-suggestions="querySearchAsync" placeholder="请输入客户姓名" @select="handleSelect" :trigger-on-focus="false" valueKey='name'>
                <template slot-scope="props">
                  <div class="thinkName">
                    {{ props.item.name }} - {{ props.item.gender | SexState }}
                    <p class="phone">{{ props.item.phone }}</p>
                  </div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span='16'> 
            <el-form-item label="性别：" prop="gender">
              <el-radio v-model="addForm.gender" :label='1'>男</el-radio>
              <el-radio v-model="addForm.gender" :label='2'>女</el-radio>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-row>
          <el-col :span='7'>
            <el-form-item label="手机：" prop="phone">
              <el-input v-model="addForm.phone" placeholder="请输入客户号码" :maxlength="11" @keyup.native="numInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='10'>
            <div style="display: flex;">
              <p class="label" style="flex: 0 0 88px; padding-right: 12px; text-align: right;"><span class="required" style="color: #F56C6C">* </span><span style="color: #606266;">年龄： </span></p>
              <el-form-item label="" prop="date" style="margin-left: -100px;">
                <age-calculate :old='date' ref="preAge"></age-calculate>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span='7'>
            <el-form-item prop="patienttype" label='客户类型：'>
              <el-select v-model="addForm.patienttype">
                <el-option :label="item.name" :value="item.id" v-for="(item, index) in customerType" :key="index"></el-option>
              </el-select>
            </el-form-item>
             </el-col>
          <el-col :span='10'>
            <el-form-item label="个人电脑号：">
              <el-input v-model="addForm.szsbcardid" :maxlength="18"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <span class="details" @click='details = !details'>
          <i class="el-icon-arrow-up" v-show='details'></i>
          <i class="el-icon-arrow-down" v-show='!details'></i>
          <span>详细信息</span>
        </span>
        <!--详细信息  -->
        <el-collapse-transition>
          <el-form-item label-width="0" v-show='details' class='otherMes'>
            <template solt-scope='scope'>
              <el-form-item label-width="0" class="hideForm">
                <el-col :span='7'>
                  <el-form-item label="身份证：" prop="cardid">
                    <el-input v-model="addForm.cardid" :maxlength="18"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='16'>
                  <el-form-item label="就诊卡号：" prop="otherMes.medicalcardid">
                    <el-input v-model="addForm.otherMes.medicalcardid"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label-width="0" class="hideForm">
                <el-col :span='7'>
                  <el-form-item label="客户来源：" prop="otherMes.sourcetype">
                    <el-select v-model="addForm.otherMes.sourcetype">
                      <el-option :label="item.name" :value="item.id" v-for="item in customer_source" :key='item.id'></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='16'>
                  <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="addForm.email" class="email"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label-width="0" class="hideForm">
                <el-col :span='7'>
                  <el-form-item label="民族：" prop="otherMes.nationid">
                    <el-select v-model="addForm.otherMes.nationid">
                      <el-option :label="item.name" :value="item.id" v-for='item in nations' :key='item.id'></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='16'>
                  <el-form-item label="婚姻状况：" prop="otherMes.maritalstatus">
                    <el-select v-model="addForm.otherMes.maritalstatus">
                      <el-option label="未知" :value="0"></el-option>
                      <el-option label="未婚" :value="1"></el-option>
                      <el-option label="已婚" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label-width="0" class="hideForm">
                <el-col :span='7'>
                  <el-form-item label="工作单位：" prop="otherMes.company">
                    <el-input v-model="addForm.otherMes.company"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='16'>
                  <el-form-item label="职位：" prop="otherMes.jobname">
                    <el-input v-model="addForm.otherMes.jobname"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="地址：" prop="otherMes.address" class="address hideForm">
                  <el-input v-model="addForm.otherMes.address"></el-input>
                </el-form-item>
              <el-form-item label="备注：" prop="otherMes.remark">
                <el-input v-model="addForm.otherMes.remark" type='textarea'></el-input>
              </el-form-item>
            </template>
          </el-form-item>
        </el-collapse-transition>

        <el-form-item solt-scope='scope' class="visitMes" label-width="0">
          <h3>就诊信息</h3>
          <el-form-item label-width="0" class="hideForm">
            <el-col :span='7'>
              <el-form-item label="就诊科室：" prop="deptid">
                <el-select v-model="addForm.deptid" @change="clearDoctor">
                  <!-- <el-option label="未指定" value="" @click.native="getDeptName('未指定')"></el-option> -->
                  <el-option :label="item.name" :value="item.dept_id" v-for='item in sections' :key='item.ind' @click.native="getDeptName(item.name)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='16'>
              <el-form-item label="就诊医生：" prop="doctorid">
                <el-select v-model="addForm.doctorid">
                  <!-- <el-option label="未指定" value="" @click.native="getDoctorName('未指定')"></el-option> -->
                  <el-option :label="item.truename" :value="item.userid" v-for='item in usefulDoctor' :key='item.userid' @click.native="getDoctorName(item.truename)">
                    <span style="float: left;">{{ item.truename }}</span>
                    <span style="float: right; color: #8492a6; font-size: 12px; color: #56bc94; margin-left: 10px;" v-if="item.szsbdoctorcode">社保医生</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-row>
             <el-col :span='7'>
              <el-form-item label="挂号类别：" prop="type">
                <el-select v-model="addForm.bkc368">
                  <el-option v-for="(item,index) in regType" :key="index" :label="item.name" :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

             <el-col :span='7'>
              <el-form-item label="诊金：" prop="zhenjinid">
                <el-select v-model="addForm.zhenjinid">
                  <el-option :label="item.name + '(' + item.price + '元)'" :value="item.item_id" v-for="(item, index) in feeList" :key="index" @click.native="getChargeItemMsg(item)">
                    <span style="float: left;">{{ item.name }} ({{item.price}}元)</span>
                    <!-- <span style="float: left;" v-else>{{ item.name }} (社保价{{item.szsbprice}}元)</span> -->
                    <span style="float: right; color: #8492a6; font-size: 12px; color: #56bc94; margin-left: 10px;" v-if="item.szsbcode">社保</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> 
          </el-row>

        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <!-- <el-checkbox v-model="checkInPay">登记并收费</el-checkbox> -->
      <el-button type="primary" @click="submitForm('addForm')" size='small' :disabled="btnDisabled">{{btnText}}</el-button>
    </div>
   
   <!-- 读卡 -->
    <div class="tag_info" v-show='cardReading'>
      <div class="container">
        <div class="close" @click='cardReading = false'>x</div>
        <div class="sbloading">
          <sb-loading v-if="cardReading" @getPersonDetailInfo="closeReadingCard"></sb-loading>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getDeptList, getDocList, getChargitemList, getClinicName, addRegist, patientSearch, patientDetail, patientDetail2, saveChargitem } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import ageCalculate from '@/components/AgeCalculate';
import { numberLimit } from '@/utils/inputLimit';
import { jsTimestampFilter } from '@/utils/filters';
import sbLoading from '@/components/SbLoading';
import dateChange from '@/utils/dateChange';
import { BCC334 } from '@/common/js/dictionary';

export default {
  data() {
    const mobileValidate = (rule, valu2, callback) => {
      const isValid = /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(valu2);
      if (valu2 && !isValid) {
        callback(new Error('请输入合法的手机号'));
      } else {
        callback();
      }
    };
    const ageValidate = (rule, valu2, callback) => {
      if (!this.date.age && !this.date.month && !this.date.birth) {
        callback(new Error('请至少输入一个年龄'));
      } else {
        callback();
      }
    };
    const IDCardValidate = (rule, valu2, callback) => {
      const isValid = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/.test(valu2);
      if (valu2 && !isValid) {
        callback(new Error('请输入合法的身份证号'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error('邮箱格式错误!'));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        name: '',
        gender: 1,
        phone: '',
        birthdate: '',
        patienttype: 1,   // 客户类型
        cardid: '',
        bcc334: '',
        email: '',
        szsbcardid: '',   // 个人电脑号
        card_num: '', // 本次挂号是否为医保
        otherMes: {
          cardid: '',    // 身份证
          medicalcardid: '',    // 就诊卡号
          label: '',      // 标签
          sourcetype: 1,    // 客户来源
          nationid: '01',   // 民族
          maritalstatus: 0,    // 婚姻状况
          address: '',         // 地址
          company: '',        // 工作单位
          jobname: '',           // 职业
          email: '',        // 邮箱
          remark: '',        // 备注
        },
        deptid: '',       // 就诊科室
        deptname: '未指定',
        doctorid: '',         // 就诊医生
        doctorname: '未指定',
        // feeid: '',        // 挂号费
        feename: '',
        feeunit: '',
        feeprice: '',
        bkc368: '1',  // 挂号类别
        zhenjinid: '',   // 诊金
      },
      date: {        // 年龄
        age: '',
        month: '',
        birth: '',
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
        ],
        phone: [
          { validator: mobileValidate, trigger: 'blur' },
        ],
        age: [
          { validator: ageValidate, trigger: 'blur,change' },
        ],
        month: [
          { validator: ageValidate, trigger: 'blur,change' },
        ],
        birth: [
          { validator: ageValidate, trigger: 'blur,change' },
        ],
        cardid: [
          { validator: IDCardValidate, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        deptid: [
          { required: true, message: '请选择就诊科室', trigger: 'change' },
        ],
        doctorid: [
          { required: true, message: '请选择就诊医生', trigger: 'change' },
        ],
        // feeid: [
        //   { required: true, message: '请选择挂号费', trigger: 'change' },
        // ],
        zhenjinid: [
          { required: true, message: '请选择诊金', trigger: 'change' },
        ],
      },
      btnText: '立即挂号',
      tagShow: false,    // 标签模态框显示
      checkInPay: false,   // 登记并收费
      btnDisabled: false,   // 按钮禁用
      details: false,  // 详细信息显示
      sections: [],   // 科室列表
      doctors: [],     // 医生列表
      payList: [],    // 挂号列表
      feeList: [],   // 诊金列表
      oldCustomer: false,    // 是否为老客户
      tags: [  //  获取标签
        { id: '1', name: '心脏病患者' },
        { id: '2', name: '高血压患者' },
        { id: '3', name: '哮喘' },
        { id: '4', name: '外地' },
        { id: '5', name: '脂肪肝' },
        { id: '6', name: '烟酒史' },
        { id: '7', name: '团购用户' },
      ],
      tag: [],  // 渲染
      saveTag: [],  // 保存
      timeout: null,  // 联想时钟
      isShowCharge: false,    // 收费窗口
      feeMsg: {},
      clinic_name: '',    // 诊所名
      regType: [
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
      cardReading: false,
      user_info: {},
      feeObj: {
        regist_id: '',  // 挂号id
        chargitem_id: 'aa',  // 诊所设置中的收费项的id
        item_type: 7,      // 0-未知， 1挂号、2处方、3检查项、4耗材、5门诊购药、6其他、7诊金
        name: '',         // 收费项目名称
        total: 1,         // 开具的数量
        price: 0,  // 单价
        total_price: 0,    // 总价
        // clinic_id: this.clinic,
        // doctor: this.user.truename || this.user.phone,
        // doctorid: this.user.userid,
        status: 0,      // 状态，0-已保存未收费，1-已收费,2-已使用
      },
    };
  },
  methods: {
    getDoctorName(name) {  // 获取医生名字
      this.addForm.doctorname = name;
    },
    getDeptName(name) {  // 获取科室名字
      this.addForm.deptname = name;
    },
    clearDoctor() {  // 删除医生名字
      this.addForm.doctorname = name;
      this.addForm.doctorid = name;
    },
    getFeeName(item) {
      this.addForm.feename = item.name;
      this.addForm.feeunit = item.unit;
      this.addForm.feeprice = item.price;
    },
    getChargeItemMsg(val) {
      this.feeObj.name = val.name;
      this.feeObj.chargitem_id = val.item_id;
      this.feeObj.price = val.price;
      this.feeObj.total_price = val.price;
      this.feeObj.total_unit = val.unit;
    },
    resetForm(formName) {  // 重置表单
      this.$refs[formName].resetFields();
      this.date.age = '';
      this.date.month = '';
      this.date.birth = '';
      this.oldCustomer = false;
      delete (this.addForm.patientid);
    },
    submitForm(formName) {  // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnDisabled = true;
          this.addForm.birthdate = jsTimestampFilter(this.date.birth);
          if (this.oldCustomer) { // 老客户
            this.addRegist2(2);  // 状态2更新信息
          } else { // 存在则直接挂号
            this.addRegist2(1);  // 状态1新建
          }
        } else { // 验证不通过
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    getDept() {  // 获取科室
      httpServerNormal(getDeptList, {
        disabled: 0,
        can_appoint: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          res = res && res.length ? res : [];
          this.sections = res.filter((val) => {
            return val.disabled === 0;
          });
        }
      });
    },
    getDoctor() {  // 获取医生
      httpServerNormal(getDocList, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (!res.items) {
            res.items = [];
          }
          const arr = res.items.filter((val) => {
            return val.disabled === 0;
          });
          this.doctors = arr;
        }
      });
    },
    getPayList() {  // 获取收费项目
      Promise.all([httpServerNormal(getChargitemList, { disabled: 0, type: 1 }), httpServerNormal(getChargitemList, { disabled: 0, type: 7 })]).then((result) => {
        if (result[0]) {
          this.payList = this.payList.concat(result[0]);
        }
        if (result[1]) {
          this.feeList = this.payList.concat(result[1]);
        }
      });
    },
    addRegist2(patientStatus) {  // 挂号
      console.log('addRegist2 this.addForm', this.addForm);
      this.addForm.otherMes.cardid = this.addForm.cardid;
      this.addForm.otherMes.email = this.addForm.email;
      setTimeout(() => {
        this.btnDisabled = false;
      }, 60000);
      console.log('this.addForm.szsbcardid', this.addForm.szsbcardid);
      httpServerNormal(addRegist, {
        deptid: this.addForm.deptid,
        doctorid: this.addForm.doctorid,
        registtype: 0,
        // feeid: this.addForm.feeid,
        card_num: this.addForm.szsbcardid ? this.addForm.szsbcardid : '',
        bcc334: this.addForm.bcc334 ? this.addForm.bcc334 : '',
        patientopt: patientStatus,
        bkc368: this.addForm.bkc368,
        patient: {
          ...this.addForm.otherMes,
          bcc334: this.addForm.bcc334 ? this.addForm.bcc334 : '',
          name: this.addForm.name,
          gender: this.addForm.gender,
          phone: this.addForm.phone,
          birthdate: this.addForm.birthdate,
          patienttype: this.addForm.patienttype,
          szsbcardid: this.addForm.szsbcardid,
        },
      }).then((res) => {
        this.btnDisabled = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.resetForm('addForm');  // 重置表单
          this.details = false;  // 收起详细信息
          this.$message({ type: 'success', message: '挂号成功', showClose: true, duration: 1000 });
          // 保存诊金收费项
          this.feeObj.clinic_id = this.clinic;
          this.feeObj.doctor = this.user.truename || this.user.phone;
          this.feeObj.doctorid = this.user.userid;
          this.feeObj.regist_id = res.registid;
          this.save_Chargitem();
        }
      });
    },
    save_Chargitem() {
      httpServerNormal(saveChargitem, {
        items: [this.feeObj],
      }).then((res) => {
        if (typeof res === 'string' && res.includes('ERRORCODE')) {
          this.$message({ message: '保存诊金项失败', type: 'warning', showClose: true, duration: 1000 });
        }
      });
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
    is_charge(flag) { // 取消收费
      if (flag === 'cancel') {
        this.isShowCharge = false;
        this.$emit('initScroll');
      } else if (flag === 'success') {  // 收费成功
        this.isShowCharge = false;
        this.$emit('initScroll');
        this.resetForm('addForm');
        this.details = false;  // 收起详细信息
      }
    },
    handleClose(val) { // tag
      this.tag.splice(this.tag.indexOf(val), 1);
    },
    querySearchAsync(queryString, cb) { // 联想
      clearTimeout(this.timeout);
      httpServerNormal(patientSearch, {
        keyword: queryString,
        pageindex: 0,
        pagesize: 15,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          if (!res) {  // 联想无则返回空
            cb([]);
          } else {
            cb(res.entity);
          }
        } else { // code错误需要进行的操作
          cb([]);
        }
      });
    },
    handleSelect(item) {  // 选择联想事件
      httpServerNormal(patientDetail, {
        patientid: item.patientid,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.addForm.patientid = res.patientid;
          // this.addForm.szsbcardid = res.szsbcardid;  // 屏蔽掉
          this.addForm.otherMes = res;
          this.addForm.cardid = res.cardid;
          this.addForm.email = res.email;
          this.details = true;  // 展现详细信息
          this.oldCustomer = true;  // 保存为老用户
          this.addForm.phone = item.phone;
          // this.date.birth = new Date(item.birthdate.replace(/-/, '/'));
          this.date.birth = new Date(item.birthdate);
          this.addForm.gender = item.gender;
          this.$refs.preAge.calculateBirth2();  // 调用子组件事件计算年龄
        }
      });
    },
    numInput() { // 整数限制
      this.addForm.phone = numberLimit(this.addForm.phone);
    },
    openTagWin() {
      this.tagShow = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
      this.saveTag = this.tag;
    },
    closeTagWin(id) {
      this.tagShow = false;
      if (id === 0) this.tag = this.saveTag;
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
    },
    openReadingCard() {   // 打开读卡窗口
      this.cardReading = true;
      this.$emit('destroyScroll');
    },
    async closeReadingCard(val, flag) {  // 关闭读卡窗口。，第二个参数存在则读卡成功
      this.cardReading = false;
      this.user_info = val;
      this.$emit('initScroll');
      if (!flag) {
        return;
      }
      let canbao = '';
      if (val.aac008 === '1') {
        canbao = '正常参保';
      } else if (val.aac008 === '2') {
        canbao = '暂停参保';
      } else if (val.aac008 === '3') {
        canbao = '终止参保';
      } else {
        canbao = '未知';
      }
      let str = '';
      val.outputlist2 = val.outputlist2.length ? val.outputlist2 : [];
      val.outputlist2.forEach((val) => {
        const obj = BCC334.find((val2) => {
          return val2.key === val.bcc334;
        });
        if (obj) {
          str += obj.value + ' ';
        }
      });
      this.$alert(`客户：${val.aac003}，年龄：${this.date.age}岁，参保状态：${canbao} <br/> 医保卡余额：${val.aae240}元，<br/> 缴费人员类别：${str}`, '读卡成功！', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: () => {},
      });
      const result = await httpServerNormal(patientDetail2, {
        name: val.aac003,
        gender: parseInt(val.aac004, 10),
        birthdate: new Date(dateChange(val.aac006)).format('yyyy-MM-dd'),
        patienttype: 2,
        szsbcardid: val.aac999,
      });

      if (!(typeof result === 'string' && result.includes('ERRORCODE'))) {
        this.addForm.patienttype = 2;  // 客户来源改成2医保
        this.addForm.name = result.name;
        this.addForm.patientid = result.patientid;
        this.addForm.szsbcardid = result.szsbcardid;
        this.addForm.bcc334 = val.outputlist2.sort((a, b) => b.aae030 - a.aae030)[0].bcc334;
        this.addForm.card_num = result.card_num; // 本次挂号是否为医保
        this.addForm.otherMes = result;
        // this.addForm.cardid = result.cardid;
        this.addForm.email = result.email;
        this.details = true;  // 展现详细信息
        this.oldCustomer = true;  // 保存为老用户
        this.addForm.phone = result.phone;
        this.date.birth = new Date(result.birthdate);
        this.addForm.gender = result.gender;
        this.$refs.preAge.calculateBirth2();  // 调用子组件事件计算年龄
        return;
      }

      // 未找到对应客户，当做新客户处理
      this.resetForm('addForm');
      if (val.aac058 === '01') {
        this.addForm.cardid = val.aac147;  // 身份证
      }
      this.addForm.patienttype = 2;  // 客户来源改成2医保
      this.addForm.name = val.aac003;  // 姓名
      this.addForm.gender = +val.aac004;  // 性别
      this.addForm.szsbcardid = val.aac999;   // 个人电脑号
      this.addForm.bcc334 = val.outputlist2.sort((a, b) => b.aae030 - a.aae030)[0].bcc334;
      // this.addForm.card_num = result.card_num;  // 本次挂号是否为医保
      this.date.birth = new Date(dateChange(val.aac006));  // 生日
      this.$refs.preAge.calculateBirth2();  // 调用子组件事件计算年龄

      this.details = true;  // 展现详细信息
    },
  },
  components: {
    ageCalculate, sbLoading,
  },
  created() {
    this.getDept();   // 获取科室列表
    this.getDoctor();   // 获取医生列表
    this.getPayList();    // 获取收费列表
    // this.getClinic_Name();   // 获取诊所名
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user', 'bindSbMsg', 'nations', 'customerType', 'customer_source']),
    usefulDoctor() {
      return this.doctors.filter((item) => {
        return item.deptid === this.addForm.deptid;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.title {
  h3{
    display: inline-block;
  }
  .clear {
    color: $mainColor;
    display: inline-block;
    cursor: pointer;
    margin: 0 20px;
    line-height: 30px;
  }
  .el-input {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
  .el-form-item {
    margin-bottom: 10px;
    &.noMargin {
      margin-bottom: 0;
    }
    &.otherMes {
      margin-top: 10px;
    }
    .el-textarea {
      width: 80%;
    }
    &.address{
      .el-input{
        width: 80%;
      }
    }
    .el-tag {
      margin-right: 5px;
    }
    .addTag {
      margin-left: 10px;
      cursor: pointer;
      color: $mainColor;
      font-size: 18px;
    }
  }
  .details {
    color: $mainColor;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .visitMes {
    border-top: 1px dashed #ccc;
    padding-top: 20px;
  }
}

.footer {
  padding-top: 30px;
  border-top: 1px dashed #ccc;
  padding-left: 50%;
  // .el-checkbox {
  //   margin-right: 20px;
  //   margin-left: 40%;
  // }
}

h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  margin-bottom: 10px;
}

// tag模态
.tag_info {
  @include modify_info;
  .container>.sbloading {
    margin-top: 20px;
  }
  .content {
    overflow: auto;
    .tagMargin {
      margin: 10px 0;
    }
  }
  .el-button {
    margin-top: 20px;
    margin-left: 40%;
  }
}

// 联想样式
.thinkName {
  border-bottom: 1px solid #ccc;
  line-height: 25px;
  height: 50px;
  padding-left: 5px;
  .phone {
    color: $mainColor;
  }
}
</style>
