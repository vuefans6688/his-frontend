<template>
    <div class="style">
        <el-form align='left' size='small' :model="sellForm" ref="sellForm" :rules="rules">
            <div class="medicine prescriptionInputs">
                <el-row class="preContentul">
                    <el-col :span="5">药品名称</el-col>
                    <el-col :span="3">规格</el-col>
                    <el-col :span="3">数量</el-col>
                    <el-col :span="3">单价</el-col>
                    <el-col :span="5">金额</el-col>
                    <el-col :span="2">操作</el-col>
                </el-row>
                <el-row v-for='(item, index) in sellForm.drug_list' :key='index'>
                    <el-col :span="5">
                        <el-form-item :prop="'drug_list.' + index + '.name'" :rules="{required: true, message: ' ', trigger: 'blur, change'}" class="drugName">
                            <template solt-scope='scope'>
                                <el-autocomplete popper-class="my-autocomplete" @blur="checkName(index)" v-model="item.name" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名" @select="selectMed($event, index)" :trigger-on-focus="false" valueKey='name'>
                                <template slot-scope="props">
                                    <div class="thinkMedName">
                                    {{ props.item.drug_name }}<span class="spec"> {{ props.item.spec_text }}</span>
                                    <p class="factory">{{ props.item.producer }}</p>
                                    </div>
                                </template>
                                </el-autocomplete>
                            </template>
                          <span class="otc" v-if="item.otc == 1">Rx</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item align="center">
                            <span>{{ item.spec_text}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item align="center" class="in-line" :prop="'drug_list.' + index + '.total'" :rules="{required: true, message: ' ', trigger: 'blur, change'}">
                            <el-input v-model="item.total" @keyup.native="numberInp('total')" @blur="calculate(index)"></el-input>
                            <span v-if="!item.specs && item.total_unit">{{ item.total_unit }}</span>
                            <el-select v-if="item.specs" v-model="item.total_unit" @change="calculate(index)" style="width: 80" size="small">
                              <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                              <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                              <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
                            </el-select>
                            <!-- <p v-if="item.total > item.totalNum" class="totalNumTip">药品库存不足</p> -->
                            <p v-if="changeToPrimaryUnit(item.specs, item.total, item.total_unit) > item.stock_total" class="totalNumTip">药品库存不足</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item align="center">
                            <span>{{ item.price | PriceFilter }}元/{{ item.count_ulname }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item align="center">
                          <div v-if="item.total">
                            <p>{{ item.total}}{{ item.total_unit}} × {{ item.price | PriceFilter }}元/{{ item.count_ulname }} ÷ {{ item.spec_text }} = <span class="money">{{ item.total_price | PriceFilter }}</span>元</p>
                            <!-- <p v-if="item.drug_type === 0">{{ item.total}}{{ item.total_unit}} ×{{ item.price | PriceFilter }}元 = <span class="money">{{ item.total_price | PriceFilter }}</span>元</p> -->
                          </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item align="center">
                            <i class="el-icon-delete" @click="del(index)"></i>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <span class='addinputs' @click='addFormItem'>
                        <i class="el-icon-circle-plus-outline"></i>
                        增加药品
                    </span>
                </el-form-item>
            </div>
             <div class="patientMsg">
                <h3>客户信息</h3>
                <span @click="resetForm" class='clear'> 清空
                    <i class="el-icon-delete"></i>
                </span>
                    <el-form-item label-width="0">
                    <el-col :span='7'>
                        <el-form-item label="姓名：" label-width="100px">
                        <template solt-scope='scope'>
                            <el-autocomplete popper-class="my-autocomplete" :disabled="this.oldCustomer" v-model="sellForm.patient.name" :fetch-suggestions="querySearchName" placeholder="请输入客户姓名" @select="handleSelect" :trigger-on-focus="false" valueKey='name'>
                            <template slot-scope="props">
                                <div class="thinkName">
                                {{ props.item.name }} - {{ props.item.gender | SexState }}
                                <p class="phone">{{ props.item.phone }}</p>
                                </div>
                            </template>
                            </el-autocomplete>
                        </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span='16'>
                        <el-form-item label="性别：" label-width="100px">
                        <el-radio v-model="sellForm.gender" :label='1'>男</el-radio>
                        <el-radio v-model="sellForm.gender" :label='2'>女</el-radio>
                        </el-form-item>
                    </el-col>
                    </el-form-item>
                    <el-form-item label-width="0" class="noMargin">
                        <el-col :span='7'>
                            <el-form-item label="手机：" prop="phone" label-width="100px">
                            <el-input v-model="sellForm.phone" placeholder="请输入客户号码" :maxlength="11" @keyup.native="numInput2"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='8'>
                            <el-form-item label="年龄：" class="noMargin" label-width="100px">
                            <AgeCalculate :old='date' ref="preAge"></AgeCalculate>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label='客户类型：' label-width="100px">
                        <el-select v-model="sellForm.patient.patienttype">
                          <el-option :label="item.name" :value="item.id" v-for="(item, index) in customerType" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <span class="details" @click='details = !details'>
                    <i class="el-icon-arrow-up" v-show='details'></i>
                    <i class="el-icon-arrow-down" v-show='!details'></i>
                    <span>详细信息</span>
                    </span>
                    <!--详细信息  -->
                    <el-form-item label-width="0" v-show='details' class='otherMes'>
                    <template solt-scope='scope'>
                        <el-form-item label-width="0" class="hideForm">
                        <el-col :span='7'>
                            <el-form-item label="身份证：" prop="cardid" label-width="100px">
                            <el-input v-model="sellForm.cardid" :maxlength="18"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='16'>
                            <el-form-item label="就诊卡号：" prop="patient.medicalcardid" label-width="100px">
                            <el-input v-model="sellForm.patient.medicalcardid"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-form-item>
                        <el-form-item label-width="0" class="hideForm">
                        <el-col :span='7'>
                            <el-form-item label="客户来源：" prop="patient.sourcetype" label-width="100px">
                              <el-select v-model="sellForm.patient.sourcetype">
                                <el-option :label="item.name" :value="item.id" v-for="item in customer_source" :key='item.id'></el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='16'>
                            <el-form-item label="邮箱：" prop="email" label-width="100px">
                            <el-input v-model="sellForm.email" class="email"></el-input>
                        </el-form-item>
                        </el-col>
                        </el-form-item>
                        <el-form-item label-width="0" class="hideForm">
                        <el-col :span='7'>
                            <el-form-item label="民族：" prop="patient.nationid" label-width="100px">
                            <el-select v-model="sellForm.patient.nationid">
                                <el-option :label="item.name" :value="item.id" v-for='item in nations' :key='item.id'></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='16'>
                            <el-form-item label="婚姻状况：" prop="patient.maritalstatus" label-width="100px">
                            <el-select v-model="sellForm.patient.maritalstatus">
                                <el-option label="未知" :value="0"></el-option>
                                <el-option label="未婚" :value="1"></el-option>
                                <el-option label="已婚" :value="2"></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                        </el-form-item>
                        <el-form-item label-width="0" class="hideForm">
                        <el-col :span='7'>
                            <el-form-item label="工作单位：" prop="patient.company" label-width="100px">
                            <el-input v-model="sellForm.patient.company"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='16'>
                            <el-form-item label="职位：" prop="patient.jobname" label-width="100px">
                            <el-input v-model="sellForm.patient.jobname"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-form-item>
                        <el-form-item label="地址：" prop="patient.address" class="address hideForm" label-width="100px">
                          <el-input v-model="sellForm.patient.address"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" prop="patient.remark" label-width="100px">
                        <el-input v-model="sellForm.patient.remark" type='textarea'></el-input>
                        </el-form-item>
                    </template>
                    </el-form-item>
            </div>
        </el-form>
        <div class="subumit">
             <span class="totalMoney">
                累计收费金额：<strong> {{ sellForm.totalMoney | PriceFilter }}</strong>元
            </span>
            <el-button type="primary" @click="submitForm('sellForm')" size="small">收 费</el-button>
        </div>

         <div class="pay_info" v-if="payWin">
            <div class="container">
                <div class="close" @click="payWin=false">
                    <i class="el-icon-circle-close"></i>
                </div>
                <h3 class="title">收费信息</h3>
                <div class="content">
                    <p>收费机构： <span>{{ clinic_name }}</span></p>
                    <p>总金额： <span>￥{{ chargeList.total_price.toFixed(2) }} 元</span></p>
                    <p class="payWay">
                        <strong>减免金额：</strong>
                        <el-input size='small' class="right_align" v-model="payObj.discount" @keyup.native="numberLimit('discount')" @blur="lessThanTotal"></el-input>
                        <span>元</span>
                    </p>
                    <p class="keywords">应收：￥<strong>{{needPay}}</strong> 元</p>
                    <h3>支付方式</h3>
                    <p class="payWay">
                    <el-radio-group v-model="payObj.payMethod" size="small">
                        <el-radio :label="1" border>现金</el-radio>
                        <el-radio :label="2" border>银行卡</el-radio>
                        <el-radio :label="3" border>微信支付</el-radio>
                        <el-radio :label="4" border>支付宝支付</el-radio>
                    </el-radio-group>
                    </p>
                    <p class="payInp">
                    <strong>实收金额：</strong>
                    <el-input size='small' class="right_align" v-model="payObj.realPay" @keyup.native="numberLimit('realPay')"></el-input>
                    <span>元</span>
                    </p>
                    <p class="keywords">找零：￥<strong> {{ change }}</strong> 元</p>
                </div>
                <div class="footer">
                    <el-checkbox v-model="isPrint">打印收费收据</el-checkbox>
                    <el-button type="primary" @click='submit' size="small" :disabled="chargeDisable">收费</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import AgeCalculate from '@/components/AgeCalculate';
import { numberLimit, floatLimit } from '@/utils/inputLimit';
import { jsTimestampFilter } from '@/utils/filters';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import { presSearchDrug, presDrugInfo } from '@apiNormal';

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
      sellForm: {
        drug_list: [
          {
            name: '',
            drug_id: '',
            spec_text: '',
            total: '',
            total_unit: '',
            price: 0,
            total_price: 0,
          },
        ],
        totalMoney: 0,
        phone: '',
        cardid: '',    // 身份证
        email: '',        // 邮箱
        gender: 1,
        patient: {
          patientid: '',
          name: '',
          birthdate: '',
          patienttype: 1,   // 客户类型
          medicalcardid: '',    // 就诊卡号
          sourcetype: 1,    // 客户来源
          nationid: '01',   // 民族
          maritalstatus: 0,    // 婚姻状况
          address: '',         // 地址
          company: '',        // 工作单位
          jobname: '',           // 职业
          remark: '',        // 备注
        },
      },
      rules: {
        phone: [
          { validator: mobileValidate, trigger: 'blur' },
        ],
        cardid: [
          { validator: IDCardValidate, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
      },
      date: {        // 年龄
        age: '',
        month: '',
        birth: '',
      },
      doctorName: '',
      details: false,  // 详细信息显示
      oldCustomer: false,  // 是否老客户
      timeout: null,
      payWin: false,  // 收费窗口
      payCheckbox: [],
      chargeList: {
        clinic: '',
        total_price: 0,
        items: [],
      },
      payObj: {
        discount: '',    // 减免金额
        realPay: '',    // 实收费用
        payMethod: 1,   // 支付方式
      },
      isPrint: true,   // 打印
      chargeDisable: false,   // 是否禁用收费按钮
      clinic_name: '',  // 保存诊所名
    };
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic', 'customerType', 'customer_source', 'nations']),
    needPay() {
      const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
      const total = parseFloat(this.chargeList.total_price);
      const needPay = total - discount;
      return needPay < 0 ? 0 : needPay.toFixed(2);
    },
    change() {
      const realPay = this.payObj.realPay ? parseFloat(this.payObj.realPay) : 0;
      const needPay = this.needPay;
      const exchange = realPay - needPay;
      return exchange < 0 ? '' : exchange.toFixed(2);
    },
  },
  components: {
    AgeCalculate,
  },
  methods: {
    ...mapMutations(['set_feePrintMsg']),
    numberInp(str) { // 限制数字输入
      for (let i = 0; i < this.sellForm.drug_list.length; i++) {
        this.sellForm.drug_list[i][str] =
        numberLimit(this.sellForm.drug_list[i][str]);
      }
    },
    numInput2() {
      this.sellForm.phone = numberLimit(this.sellForm.phone);
    },
    querySearchAsync(queryString, cb) { // 药名联想
      clearTimeout(this.timeout);
      httpServerNormal(presSearchDrug, {
        drug_name: queryString,
        drug_type: -1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (!res.data) {  // 联想无则返回空
            cb([]);
          } else {
            cb(res.data);
          }
        }
      }).catch(() => {
        cb([]);
      });
    },
    // 小单位价格
    perPrimaryUnitPrice(dprice, dosageUnit, specs) {
      let realUnitPrice = 0;
      if (dosageUnit === specs.unit_large.specs_name) { // 入库单位是最大单位
        realUnitPrice = dprice / (specs.unit_middle.specs_name ? specs.unit_middle.specs_unit : 1) / (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (dosageUnit === specs.unit_middle.specs_name) { // 入库单位是中级单位
        realUnitPrice = dprice / (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (dosageUnit === specs.unit_primary.specs_name) { // 入库单位是最小单位
        realUnitPrice = dprice;
      }
      return realUnitPrice;
    },
    // 换算成小单位
    changeToPrimaryUnit(specs, dosage, dosageUnit) {
      if (!specs) {
        return 0;
      }
      let total = 0;
      if (dosageUnit === specs.unit_large.specs_name) {
        total = dosage * (specs.unit_middle.specs_name ? specs.unit_middle.specs_unit : 1) * (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (dosageUnit === specs.unit_middle.specs_name) {
        total = dosage * (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else {
        total = dosage;
      }
      return total;
    },
    selectMed(item, index) {  // 药名选择事件
      const obj = this.sellForm.drug_list.find((val) => {
        return item.drug_id === val.drug_id;
      });
      if (obj) {
        this.$message({ message: '该药品已存在！', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.sellForm.drug_list[index].name = item.drug_name;
      this.sellForm.drug_list[index].medName = item.drug_name;
      this.sellForm.drug_list[index].drug_id = item.drug_id;
      httpServerNormal(presDrugInfo, {
        drug_id: item.drug_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res) {
            this.sellForm.drug_list[index].drug_type = +res.drugtype;

            this.sellForm.drug_list[index].specs = res.specs;
            this.sellForm.drug_list[index].spec_text = res.specs_txt;

            this.sellForm.drug_list[index].total = res.useall && res.useall.specs_unit ? res.useall.specs_unit.toString() : '';
            this.sellForm.drug_list[index].total_unit = res.useall && res.useall.specs_name ? res.useall.specs_name : '';

            this.sellForm.drug_list[index].price = res.saleprice;
            this.sellForm.drug_list[index].count_ulname = res.count_ulname; // 库存单位
            // 保存库存进行检测
            const stockTotal = res.count_ulunit;
            const stockUnit = res.count_ulname;
            this.sellForm.drug_list[index].stock_total = this.changeToPrimaryUnit(res.specs, stockTotal, stockUnit);
            this.sellForm.drug_list[index].stock_unit = res.specs.unit_primary.specs_name ? res.specs.unit_primary.specs_name : res.specs.unit_middle.specs_name;

            this.sellForm.drug_list[index].otc = res.otc;

            this.calculate(index);
          }
        }
      });
    },
    querySearchName(queryString, cb) { // 客户名联想
      clearTimeout(this.timeout);
      this.$http.post('/service/registration/patientsearch', {
        head: {
          accessToken: this.token,      // 用户身份标识，必选参数
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          keyword: queryString,
          pageindex: 0,
          pagesize: 15,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          if (!res.data.data) {  // 联想无则返回空
            cb([]);
          } else {
            cb(res.data.data.entity);
          }
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
          cb([]);
        }
      }).catch();
    },
    handleSelect(item) {  // 选择客户名事件
      this.$http.post('/service/registration/patientdetail', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          patientid: item.patientid,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          // 选择联想，则带出患者数据
          this.sellForm.patient = res.data.data;
          this.sellForm.cardid = res.data.data.cardid;
          this.sellForm.email = res.data.data.email;
          this.sellForm.phone = item.phone;
          this.details = true;  // 展现详细信息
          this.oldCustomer = true;  // 保存为老用户
          this.date.birth = new Date(item.birthdate.replace(/-/, '/'));
          this.sellForm.patient.name = item.name;
          this.sellForm.gender = item.gender;
          this.sellForm.patient.patienttype = 1;
          this.$refs.preAge.calculateBirth2();  // 调用子组件事件计算年龄
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      }).catch();
    },
    del(index) {
      if (this.sellForm.drug_list.length <= 1) {
        return;
      }
      this.sellForm.drug_list.splice(index, 1);
      this.calculateAll();
    },
    addFormItem() {    // 增加一行
      let flag = true;
      this.sellForm.drug_list.forEach((val) => {
        if (val.name === '') {
          flag = false;
        }
      });
      if (!flag) {
        this.$message({ message: '内容为空不能新增一行', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      const obj = {
        name: '',
        drug_id: '',
        spec_text: '',
        total: '',
        total_unit: '',
        price: 0,
        total_price: 0,
      };
      this.sellForm.drug_list.push(obj);
    },
    resetForm() {  // 重置客户表单
      this.sellForm.patient.patientid = '';
      this.sellForm.patient.name = '';
      this.sellForm.gender = 1;
      this.sellForm.phone = '';
      this.sellForm.cardid = '';
      this.sellForm.email = '';
      this.sellForm.patient.medicalcardid = '';
      this.sellForm.patient.nationid = '01';
      this.sellForm.patient.maritalstatus = 0;
      this.sellForm.patient.company = '';
      this.sellForm.patient.jobname = '';
      this.sellForm.patient.address = '';
      this.sellForm.patient.remark = '';
      this.date.age = '';
      this.date.month = '';
      this.date.birth = '';
      this.oldCustomer = false;
    },
    resetSellForm() {  // 重置
      this.sellForm = {
        drug_list: [
          {
            name: '',
            drug_id: '',
            spec_text: '',
            total: '',
            total_unit: '',
            price: 0,
            total_price: 0,
          },
        ],
        totalMoney: 0,
        phone: '',
        cardid: '',    // 身份证
        email: '',        // 邮箱
        gender: 1,
        patient: {
          patientid: '',
          name: '',
          birthdate: '',
          patienttype: 1,   // 客户类型
          medicalcardid: '',    // 就诊卡号
          sourcetype: 1,    // 客户来源
          nationid: '01',   // 民族
          maritalstatus: 0,    // 婚姻状况
          company: '',        // 工作单位
          jobname: '',           // 职业
          address: '',      // 地址
          remark: '',        // 备注
        },
      };
      this.payObj = {
        discount: '',    // 减免金额
        realPay: '',    // 实收费用
        payMethod: 1,   // 支付方式
      };
      this.details = false;  // 收起详细信息
    },
    beforeSubmit() {
      this.chargeList.clinic = this.clinic;
      this.chargeList.total_price = this.sellForm.totalMoney;
      this.sellForm.patient.birthdate = jsTimestampFilter(this.date.birth);
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
      this.sellForm.patient.phone = this.sellForm.phone;
      this.sellForm.patient.cardid = this.sellForm.cardid;
      this.sellForm.patient.email = this.sellForm.email;
      this.sellForm.patient.gender = this.sellForm.gender;
      this.payWin = true;
      this.getClinicName();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let flag = true;
        this.sellForm.drug_list.forEach((val) => {
          if (val.total === '0' || val.total > val.totalNum) {
            flag = false;
          }
        });
        if (!flag) {
          this.$message({ message: '数量错误', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        if (this.sellForm.patient.name) {
          if (!this.date.birth) {
            this.$message({ message: '请填写年龄', type: 'error', showClose: true, duration: 1000 });
            return false;
          }
        }
        if (valid) {
          const otcFlag = this.sellForm.drug_list.find((val) => {
            return val.otc === 1;
          });
          if (otcFlag) {
            this.$confirm('药品中包含处方药，是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
            .then(() => {
              this.beforeSubmit();
            }).catch(() => {
              this.$message({ type: 'info', message: '已取消', showClose: true, duration: 1000 });
            });
          } else {
            this.beforeSubmit();
          }
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    checkName(index) {  // 检验名字
      if (this.sellForm.drug_list[index].name !== this.sellForm.drug_list[index].medName) {
        this.sellForm.drug_list[index].drug_id = '';
        this.sellForm.drug_list[index].name = '';
        this.sellForm.drug_list[index].spec_text = '';
        this.sellForm.drug_list[index].total = '';
        this.sellForm.drug_list[index].total_unit = '';
        this.sellForm.drug_list[index].price = 0;
        this.sellForm.drug_list[index].total_price = 0;
        this.sellForm.drug_list[index].otc = '';
      }
    },
    calculate(index) {  // 计算金额
      const drug = this.sellForm.drug_list[index];
      if (!drug.total || !drug.name) {
        return;
      }

      if (this.changeToPrimaryUnit(drug.specs, drug.total, drug.total_unit) > drug.stock_total) {
        this.$message({ message: `库存量为：${drug.stock_total}${drug.stock_unit}`, type: 'error', showClose: true, duration: 1000 });
      }

      drug.total_price = this.changeToPrimaryUnit(drug.specs, drug.total, drug.total_unit) * this.perPrimaryUnitPrice(drug.price, drug.count_ulname, drug.specs);
      this.calculateAll();
    },
    calculateAll() {  // 计算总价
      let sum = 0;
      this.sellForm.drug_list.forEach((val) => {
        sum += val.total_price;
      });
      this.sellForm.totalMoney = sum; // 超出库存提示
    },
    save() {
      let copy = deepcopy(this.sellForm.patient);
      if (copy.name === '') {
        copy = {};
      }
      this.sellForm.drug_list.forEach((val) => {
        val.total -= 0;
      });
      this.$http.post('/service/drugsales/create', {
        head: {
          accessToken: this.token,      // 用户身份标识，必选参数
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          total_price: this.sellForm.totalMoney,
          doctor: this.doctorName,
          drug_list: this.sellForm.drug_list,
          patient: copy,
          charging: {
            clinicid: this.clinic,
            cashierid: this.user.userid,  // 收银员
            patientid: this.sellForm.patient.patientid,
            patientname: this.sellForm.patient.name,
            totalprice: +this.sellForm.totalMoney,
            reduceprice: +this.payObj.discount,
            realprice: +this.needPay,
            paymethod: this.payObj.payMethod,   // 支付方式
            // payprice: +this.needPay,
          },
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({ type: 'success', message: '收费成功!', showClose: true, duration: 1000 });
          this.chargeList.name = this.sellForm.patient.name;
          this.chargeList.phone = this.sellForm.phone;
          this.sellForm.drug_list.forEach((val) => {
            this.chargeList.items.push({
              type: 5,
              data: val,
            });
          });
          if (this.isPrint) {
            this.print();
          }
          this.resetSellForm();   // 页面恢复
          this.payWin = false;
          this.chargeDisable = false;
          this.oldCustomer = false;
          this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
          this.chargeDisable = false;
        }
      }).catch();
    },
    numberLimit(str) { // 限制数字输入
      this.payObj[str] = floatLimit(this.payObj[str], 2);
    },
    getClinicName() {  // 获取诊所名
      this.$http.post('/service/public/clinic_name', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.clinic_name = res.data.data.clinic_name;
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      });
    },
    // 折扣不能大于总价
    lessThanTotal() {
      const total = parseFloat(this.chargeList.total_price);
      const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
      if (discount > total) {
        this.$message({ message: '减免金额不能大于总金额', type: 'error', showClose: true, duration: 1000 });
        this.payObj.discount = '';
      }
    },
    submit() {
      if (this.change === '') {
        this.$message({ message: '支付金额不足', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.chargeDisable = true;     // 点击收费后，需禁用收费按钮，防止再次发送收费请求
      this.save();
    },
    // 发送收费请求
    // sendChargeRequest() {
    //   const needPay = parseFloat(this.needPay);
    //   const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
    //     // 收费响应后，需解除收费按钮的禁用
    //   this.chargeDisable = false;
    // },
    print() {
      const change = this.change ? parseFloat(this.change) : 0;
      const realPay = parseFloat(this.payObj.realPay) - change;
      const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
      const needPay = this.chargeList.total_price;
      this.chargeList.discount = discount;
      this.chargeList.needPay = needPay;
      this.chargeList.realPay = realPay;
      this.set_feePrintMsg(this.chargeList);
      window.open('/print/feePrint');
      this.chargeList.items = [];
    },
  },
  created() {
    this.doctorName = this.user.truename ? this.user.truename : this.user.phone;
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.style {
    position: relative;
    min-width: 1000px;
    padding: 30px 40px 60px 40px;
}
.el-form{
    .medicine {
        min-height: 400px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 20px;
        // overflow-y: auto;
        .preContentul{
            margin-bottom: 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #ccc;
        }
        .money{
          color: red;
        }
        .el-col{
                margin-right: 10px;
        }
        .totalNumTip{ // 库存
          color: red;
          font-size: 12px;
        }
        .addinputs{
            cursor: pointer;
            color: $mainColor;
        }
        .drugName{
          position: relative;
          .otc {
            color: rgb(221, 116, 17);
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            width: 30px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 15px;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            background-color: red;
            opacity: .7;
          }
        }
        .el-icon-delete { // 删除icon
            font-size: 20px;
            cursor: pointer;
            color: $mainColor;
        }
        .el-autocomplete{
            width: 100%;
        }
        .el-input {
            width: 80%  ;
        }
        .in-line{
          .el-input{
            width: 50%;
          }
          .el-select {
            width: 40%;
          }
        }
    }
    .patientMsg{
        h3 {
            line-height: 30px;
        }
        .clear {
            color: $mainColor;
            display: inline-block;
            cursor: pointer;
            margin-left: 20px;
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
            margin-bottom: 8px;
            &.address {
            margin-bottom: 10px;
            .el-input{
              width: 500px;
            }
          }
        }
        .noMargin{
            margin-bottom: 0;
        }
         .details {
            color: $mainColor;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 10px;
        }
    }
}
.subumit{
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px dashed #ccc;
    .totalMoney{
        line-height: 30px;
        strong{
            font-size: 20px;
            color: red;
            margin-right: 5px;
        }
    }
    .el-button{
        margin-left: 35%;
    }
}
// 收费窗口
.pay_info {
  @include modify_info;
  .container{
    padding: 30px 40px;
    min-height: 400px;
    .title{
      font-weight: 600;
    }
    .content {
      padding: 0;
      h3 {
        line-height: 30px;
        font-weight: 600;
        margin: 10px 0;
        border-bottom: 1px dashed #ccc;
      }
      p {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        .el-input {
          width: 70%;
        }
        span {
          float: right;
        }
        &.keywords {
          padding-left: 80px;
          color: $mainColor;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          strong{
            color: red;
            font-size: 16px;
          }
        }
        &.payWay {
            margin-bottom: 15px;
        }
      }
    }
    .footer{
      margin-top: 20px;
      margin-left: 20%;
      .el-button{
        margin-left: 20px;
      }
    }
  }
}
// 联想样式
.thinkMedName {
  line-height: 26px;
  .spec{
    color: #999;
    font-size: 12px;
    margin-left: 5px;
  }
  .factory {
    color: #999;
    line-height: 18px;
    font-size: 12px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
}
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
