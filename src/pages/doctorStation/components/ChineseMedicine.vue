<template>
  <div class="WestMedicineStyle">
    <el-form class="demo-form-inline prescriptionInputs" align='center' size='mini' :model="chinaMedPre.chinaMedForm" ref="chinaMedForm">
      <el-form-item>
        <el-row class="preContentul">
          <el-col :span="1">序号</el-col>
          <el-col :span="5">药品名称</el-col>
          <el-col :span="3">规格</el-col>
          <el-col :span="3">单次剂量</el-col>
          <el-col :span="3">特殊用法</el-col>
          <el-col :span="3">单价</el-col>
          <el-col :span="5">金额</el-col>
          <el-col :span="1">操作</el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-for="(item, index) in chinaMedPre.chinaMedForm.drug_list" :key='index'>
        <!-- 序号  -->
        <el-col :span="1">
          <el-form-item>
            <span>{{ (index + 1) }}</span>
          </el-form-item>
        </el-col>
        <!--中药品名称  -->
        <el-col :span="5">
          <el-form-item :prop="'drug_list.' + index + '.name'" :rules="{required: true, message: ' ', trigger: 'blur, change'}">
            <template solt-scope='scope'>
              <el-autocomplete popper-class="my-autocomplete" @focus="addFormItem('', index)" @blur="checkName(index)" :disabled='chinaMedPre.chinaPreStatus.isDisabled' v-model="item.name" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名" @select="chinaNameSelect($event, index)" :trigger-on-focus="false" valueKey='name'>
                <template slot-scope="props">
                  <div class="thinkName">
                    {{ props.item.drug_name }}
                    <span class="spec"> {{ props.item.spec_text }}</span>
                    <p class="phone">{{ props.item.producer }}</p>
                  </div>
                </template>
              </el-autocomplete>
            </template>
          </el-form-item>
        </el-col>
         <!--规格  -->
        <el-col :span="3">
          <el-form-item align='center'>
            <span>{{ item.spec_text }}</span>
          </el-form-item>
        </el-col>
        <!--剂量  -->
        <el-col :span="3">
          <el-form-item :prop="'drug_list.' + index + '.dosage'" :rules="{required: true, message: ' ', trigger: 'blur, change'}" class="dose" align='left'>
            <!-- <el-input v-model="item.dosage" :disabled='chinaMedPre.chinaPreStatus.isDisabled' class="inlineBlock percent100" @keyup.native="priceInp('dosage')" @blur='calculate(index)'></el-input> -->
            <el-autocomplete
              class="inlineBlock"
              v-model="item.dosage"
              @keyup.native="priceInp('dosage')"
              :fetch-suggestions="querySearchNumber"
              @blur='calculate(index)'
              @select="calculate(index)"
              placeholder="请输入单次剂量"
              :disabled='chinaMedPre.chinaPreStatus.isDisabled'
            ></el-autocomplete>
            <span v-if="!item.specs && item.dose_unit">{{ item.dose_unit }}</span>
            <el-select v-if="item.specs" v-model="item.dose_unit" size="mini" @change="calculate(index)" :disabled='chinaMedPre.chinaPreStatus.isDisabled'>
              <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
              <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
              <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
            </el-select>
          </el-form-item>
          <span v-if="item.dosage * chinaMedPre.chinaMedForm.total > item.totalNum" class="totalNumTip">药品库存不足</span>
          <span v-if="item.dosage === '0'" class="totalNumTip">不能为0</span>
        </el-col>
        <!-- 煎法、用法 -->
        <el-col :span="3">
          <el-form-item :prop="'drug_list.' + index + '.use_note'">
            <el-autocomplete popper-class="my-autocomplete" :disabled='chinaMedPre.chinaPreStatus.isDisabled' v-model="item.use_note" valueKey="name" :fetch-suggestions="medAskForSearch" placeholder="非必填"></el-autocomplete>
          </el-form-item>
        </el-col>
        <!-- 单价 -->
        <el-col :span="3">
          <el-form-item :prop="'drug_list.' + index + '.price'" :rules="{required: true, message: ' ', trigger: 'blur, change'}">
            <span>{{ item.price | PriceFilter }}元</span><span>/{{ item.count_ulname }}</span>
          </el-form-item>
        </el-col>
        <!--金额  -->
        <el-col :span="5">
          <el-form-item prop="temperature">
            <p v-if="item.dosage">{{ item.dosage}}{{ item.dose_unit}} × {{ item.price | PriceFilter }}元/{{ item.count_ulname }} ÷ {{ item.spec_text }} = <span class="money">{{ item.total_price | PriceFilter(4) }}</span>元</p>
          </el-form-item>
        </el-col>
        <!--操作  -->
        <el-col :span="1">
          <el-form-item prop="temperature">
            <i class="el-icon-delete" @click="del(index)" v-show="!chinaMedPre.chinaPreStatus.isDisabled"></i>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item align='left'>
        <span class='addinputs' @click='addFormItem("add")' v-show="!chinaMedPre.chinaPreStatus.isDisabled">
          <i class="el-icon-circle-plus-outline"></i>
          增加一行
        </span>
      </el-form-item>
      <!--第二行  -->
      <el-form-item align="left" class="usageStyle" :rules="{required: true, message: '请选择', trigger: 'blur, change'}" prop="use_method">
        <el-col :span="4">
          <el-radio v-model="chinaMedPre.chinaMedForm.use_method" label="内服" :disabled='chinaMedPre.chinaPreStatus.isDisabled'></el-radio>
          <el-radio v-model="chinaMedPre.chinaMedForm.use_method" label="外用" :disabled='chinaMedPre.chinaPreStatus.isDisabled'></el-radio>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="total" class="dose2" :rules="{required: true, message: ' ', trigger: 'blur, change'}" label="总共：">
            <el-autocomplete
              class="inlineBlock"
              v-model="chinaMedPre.chinaMedForm.total"
              :fetch-suggestions="querySearchNumber"
              placeholder="请输入数量"
              @keyup.native="numberInp('total')"
              @blur='calculateAll'
              @select="calculateAll"
              :disabled='chinaMedPre.chinaPreStatus.isDisabled'
            ></el-autocomplete>
            <!-- <el-input v-model="chinaMedPre.chinaMedForm.total" @keyup.native="numberInp('total')" @blur="calculateAll" :disabled='chinaMedPre.chinaPreStatus.isDisabled'></el-input> -->
            <span>剂</span>
          </el-form-item>
          <span v-if="chinaMedPre.chinaMedForm.total === '0'" class="totalNumTip">不能为0</span>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="frequency" class="dose2" :rules="{required: true, message: ' ', trigger: 'blur, change'}" label="频次：">
            <el-select v-model="chinaMedPre.chinaMedForm.frequency" :disabled='chinaMedPre.chinaPreStatus.isDisabled'>
              <el-option v-for="(val, index) in frequencyList" :key="index" :label="val.name" :value="val.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="daily_use" class="dose2" label="整剂用法：">
            <el-autocomplete popper-class="my-autocomplete" v-model="chinaMedPre.chinaMedForm.zjyongfa" :disabled='chinaMedPre.chinaPreStatus.isDisabled' valueKey="name" :fetch-suggestions="medAskForSearch" placeholder="批量填写"></el-autocomplete>
            <span class="spans">（非必填）</span>
          </el-form-item>
        </el-col>
        <el-col :span="4" align="center">
          <span class="totalMoney">
            合计：
            <strong> {{chinaMedPre.chinaMedForm.totalMoney | PriceFilter}}</strong>元
          </span>
        </el-col>
      </el-form-item>
      <el-form-item label="其它要求：" class="inputs" label-width="100" align="left">
        <el-input type="textarea" :rows="3" v-model="chinaMedPre.chinaMedForm.taking_note" :disabled='chinaMedPre.chinaPreStatus.isDisabled'></el-input>
      </el-form-item>
      <el-form-item align='right' class="footer">
        <div class="doctorMsg">
          <p>医生：
            <span>{{ patientMsg.doctorTip.name }}</span>
            <el-button type="primary" @click="submitForm('chinaMedForm')" :disabled="ban" v-show="!chinaMedPre.chinaPreStatus.isDisabled">保 存</el-button>
            <el-button type="primary" @click="amendPre" v-show="chinaMedPre.chinaPreStatus.isDisabled">修改</el-button>
          </p>
          <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
        </div>
      </el-form-item>
    </el-form>
    <div class='chargeIcon' v-show='chinaMedPre.chinaPreStatus.isIconShow'></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { numberLimit, floatLimit } from '@/utils/inputLimit';
import httpServerNormal from '@httpServerNormal';
import { presSearchDrug, presDrugInfo, addPre, modifyPre } from '@apiNormal';
import savePreFunc from './savePreFunc';

export default {
  data() {
    return {
      ban: false,
      chinaMedForm: {
        drug_list: [
          {
            name: '',   // 药品名
            dosage: '',    // 单次剂量
            dose_unit: '',      // 单次剂量(单位)
            use_note: '',    // 煎法，用法
            price: 0,    // 单价
            total_price: 0,     // 金额
            total_unit: '剂',
          },
        ],
        use_method: '',        // 煎法用法
        total: 0,      // 剂数
        // daily_use: '',   // 每次剂量
        // daily_use_unit: 'ml',
        frequency: '',       // 频次
        taking_note: '',      // 要求
      },
      isDisabled: false,   // 禁用表单
      isIconShow: false,      // 收费图标
      validation: false,    // 验证
      total_money: 0,
      numberList: [
        { lable: '5', value: '5' },
        { lable: '10', value: '10' },
        { lable: '15', value: '15' },
        { lable: '20', value: '20' },
        { lable: '25', value: '25' },
        { lable: '30', value: '30' },
      ],
    };
  },
  props: ['chinaMedPre', 'patientMsg', 'chinaMedPreId'],
  methods: {
    querySearchNumber(queryString, cb) {
      cb(this.numberList);
    },
    numberInp(str) { // 限制数字输入
      this.chinaMedPre.chinaMedForm[str] = numberLimit(this.chinaMedPre.chinaMedForm[str]);
    },
    numberInp2(str) { // 限制数字输入
      for (let i = 0; i < this.chinaMedPre.chinaMedForm.drug_list.length; i++) {
        this.chinaMedPre.chinaMedForm.drug_list[i][str] =
          numberLimit(this.chinaMedPre.chinaMedForm.drug_list[i][str]);
      }
    },
    priceInp(str) { // 限制价格输入
      for (let i = 0; i < this.chinaMedPre.chinaMedForm.drug_list.length; i++) {
        this.chinaMedPre.chinaMedForm.drug_list[i][str] =
          floatLimit(this.chinaMedPre.chinaMedForm.drug_list[i][str], 2);
      }
    },
    checkName(index) {
      if (this.chinaMedPre.chinaMedForm.drug_list[index].name !== this.chinaMedPre.chinaMedForm.drug_list[index].medName) {
        this.chinaMedPre.chinaMedForm.drug_list[index].name = '';
        this.chinaMedPre.chinaMedForm.drug_list[index].drug_id = '';
        this.chinaMedPre.chinaMedForm.drug_list[index].dosage = '';
        this.chinaMedPre.chinaMedForm.drug_list[index].dose_unit = '';
        this.chinaMedPre.chinaMedForm.drug_list[index].use_note = '';
        this.chinaMedPre.chinaMedForm.drug_list[index].price = 0;
        this.chinaMedPre.chinaMedForm.drug_list[index].total_price = 0;
        this.calculateAll();
      }
    },
    addFormItem(act = '', index) {
      if (!this.patientMsg.registid) {
        this.$message({ type: 'warning', message: '请先接诊客户', showClose: true, duration: 1000 });
        return;
      }
      if (act === 'add' || (index === this.chinaMedPre.chinaMedForm.drug_list.length - 1)) {
        const json = {
          name: '',   // 药品名
          spec_text: '',  // 规格
          bigSpecsUnit: '',  // 大单位
          dosage: '',    // 单次剂量
          drug_type: 1,
          dose_unit: '',      // 单次剂量(单位)
          use_note: '',    // 煎法，用法
          price: 0,    // 单价
          total_price: 0,     // 金额
          total_unit: '剂',
          zjyongfa: '',
          use_method: '内服',
          taking_note: '',
        };
        this.chinaMedPre.chinaMedForm.drug_list.push(json);
      }
    },
    savePre() {  // 保存处方
      httpServerNormal(addPre, {
        prescriptions: this.patientMsg.presForm,
      }).then((res) => {
        if (res.includes('ERRORCODE') && res.includes(-1)) {
          this.ban = false;
          return;
        }
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ type: 'success', message: '保存成功', showClose: true, duration: 1000 });
          this.chinaMedPre.chinaPreStatus.isDisabled = true; // 保存按钮改变
          this.ban = false;
          const sum = this.patientMsg.presForm.findIndex((val) => {
            return val.prescript_id === '';
          });
          if (sum !== -1) {
            this.chinaMedPre.chinaMedForm.prescript_id = res[sum].prescript_id;
          }
          /**
           * savePreFunc.sbAudit智慧医保审批
           * 参数
           * 1绑定信息 2处方id 3挂号id 4处方类别（1西药2中药3输液）
          */
          if (this.patientMsg.details.card_num && this.bindSbMsg.hospitalCode) {  // 此次挂号存在电脑号则走智慧医保
            const prescriptId = this.chinaMedPre.chinaMedForm.prescript_id || res[sum].prescript_id;
            savePreFunc.sbAudit(this.bindSbMsg, prescriptId, this.patientMsg, 2);  // 智慧医保处方审批
          }
          // 智慧医保
        }
      }).catch(() => {
        this.ban = false;
      });
    },
    amendPre() {  // 修改
      httpServerNormal(modifyPre, {
        regist_id: this.patientMsg.registid,
        prescript_id: this.chinaMedPre.chinaMedForm.prescript_id,
        prescript_type: 1,
        status: -1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res.status === 0) {
            this.chinaMedPre.chinaPreStatus.isDisabled = false;
          } else {
            this.chinaMedPre.chinaPreStatus.isIconShow = true;
            this.$message({ message: '该处方已缴费', type: 'error', showClose: true, duration: 1000 });
          }
        }
      });
    },
    del(index) {
      if (this.chinaMedPre.chinaMedForm.drug_list.length <= 1) {
        this.chinaMedPre.chinaMedForm.totalMoney = 0;
        this.total_money = 0;
        this.chinaMedPre.chinaMedForm.drug_list = [
          {
            name: '',   // 药品名
            dosage: '',    // 单次剂量
            dose_unit: '',      // 单次剂量(单位)
            use_note: '',    // 煎法，用法
            price: 0,    // 单价
            total_price: 0,     // 金额
            total_unit: '剂',
            taking_note: '',
            use_method: '内服',
            zjyongfa: '',
          },
        ];
        return;
      }
      this.chinaMedPre.chinaMedForm.drug_list.splice(index, 1);
      this.calculateAll();
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
    calculate(index) {  // 计算当前金额
      const chinaMedForm = this.chinaMedPre.chinaMedForm;
      if (!chinaMedForm.drug_list[index].dosage || !chinaMedForm.drug_list[index].name) {
        return;
      }
      // 全部换算为小单位

      const drug = this.chinaMedPre.chinaMedForm.drug_list[index];

      let totalNum = 0; // 开药数量(小单位)
      let totalPrice = 0;

      totalNum = this.changeToPrimaryUnit(drug.specs, drug.dosage, drug.dose_unit);

      totalPrice = this.changeToPrimaryUnit(drug.specs, drug.dosage, drug.dose_unit) * this.perPrimaryUnitPrice(drug.price, drug.count_ulname, drug.specs);

      drug.total_price = totalPrice;

      if (totalNum > drug.totalNum) {
        this.$message({ message: `库存量为：${drug.totalNum}${drug.totalUnit}`, type: 'error', showClose: true, duration: 2000 });
      }
      this.calculateAll();
    },
    calculateAll() { // 计算总价
      const chinaMedForm = this.chinaMedPre.chinaMedForm;
      // 计算总价

      let totalPrice = chinaMedForm.drug_list.reduce((total, drug) => {
        return drug.total_price + total;
      }, 0);

      const drug = chinaMedForm.drug_list.find((v) => {
        const totalNum = this.changeToPrimaryUnit(v.specs, v.dosage, v.dose_unit) * chinaMedForm.total;
        return totalNum > v.totalNum;
      });

      if (drug) {
        this.$message({ message: `${drug.name}库存量为：${drug.totalNum}${drug.totalUnit}`, type: 'error', showClose: true, duration: 2000 });
      }

      totalPrice = Number((totalPrice * chinaMedForm.total).toFixed(2));
      chinaMedForm.totalMoney = totalPrice;
      this.total_money = totalPrice;
    },
    // 联想
    querySearchAsync(queryString, cb) { // 药名联想
      clearTimeout(this.timeout);
      httpServerNormal(presSearchDrug, {
        drug_name: queryString,
        drug_type: 1,
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
    TimesSearch(queryString, cb) {  // 频次联想
      const Medicine = this.frequencyList;
      const results = queryString ? Medicine.filter(this.createFilter(queryString))
        : Medicine;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 中药特殊要求联想
    medAskForSearch(queryString, cb) {
      const Medicine = this.chinaUsage;
      const results = queryString ? Medicine.filter(this.createFilter(queryString))
        : Medicine;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (Medicine) => {
        return (Medicine.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    // 选择中药名事件
    chinaNameSelect(item, index) {
      const obj = this.chinaMedPre.chinaMedForm.drug_list.find((val) => {
        return item.drug_id === val.drug_id;
      });
      if (obj) {
        this.$message({ message: '该药品已存在！', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.chinaMedPre.chinaMedForm.drug_list[index].name = item.drug_name;
      this.chinaMedPre.chinaMedForm.drug_list[index].drug_id = item.drug_id;
      this.chinaMedPre.chinaMedForm.drug_list[index].medName = item.drug_name;  // 保存药名检测

      httpServerNormal(presDrugInfo, {
        drug_id: item.drug_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res) {
            // 中药里面的开药单位，单次剂量默认给最小值, 开药数量默认给最大值
            this.chinaMedPre.chinaMedForm.drug_list[index].dose_unit = res.specs.unit_primary.specs_name ? res.specs.unit_primary.specs_name : res.specs.unit_middle.specs_name;

            this.chinaMedPre.chinaMedForm.drug_list[index].specs = res.specs;

            this.chinaMedPre.chinaMedForm.drug_list[index].dosage = res.useunit.specs_unit === 0 ? '' : res.useunit.specs_unit + '';

            this.chinaMedPre.chinaMedForm.drug_list[index].spec_text = res.specs_txt;
            this.chinaMedPre.chinaMedForm.drug_list[index].dose_unit = res.useunit.specs_name || res.specs.unit_primary.specs_name;  // 小单位

            this.chinaMedPre.chinaMedForm.drug_list[index].use_note = res.yongfa;
            this.chinaMedPre.chinaMedForm.drug_list[index].price = res.cf_price;  // 处方价
            this.chinaMedPre.chinaMedForm.drug_list[index].count_ulname = res.count_ulname;  // 入库单位
            this.calculate(index);
            // // 保存库存进行检测
            // const stockTotal = res.count_ulunit;
            // const stockUnit = res.count_ulname;
            this.chinaMedPre.chinaMedForm.drug_list[index].totalNum = res.stock_total ? res.stock_total : res.count_ulunit;
            this.chinaMedPre.chinaMedForm.drug_list[index].totalUnit = res.specs.unit_primary.specs_name ? res.specs.unit_primary.specs_name : res.specs.unit_middle.specs_name;
          } else {
            this.$message({ message: '库存0', type: 'error', showClose: true, duration: 1000 });
          }
        }
      });
    },
    // 保存
    submitForm(formName) {
      this.ban = true;
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'warning', showClose: true, duration: 1000 });
        this.ban = false;
        return;
      }
      if (!this.patientMsg.medicalRecordsForm.medical_id) {
        this.$message({ message: '请先填写病历', type: 'warning', showClose: true, duration: 1000 });
        this.ban = false;
        return;
      }
      this.chinaMedPre.chinaMedForm.drug_list = this.chinaMedPre.chinaMedForm.drug_list.filter((val) => {
        return val.name;
      });
      if (!this.chinaMedPre.chinaMedForm.drug_list.length) {
        this.$message({ message: '处方内容不可为空', type: 'warning', showClose: true, duration: 1000 });
        this.ban = false;
        this.addFormItem('add');
        return;
      }
      setTimeout(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dosageFlag = true;
            this.chinaMedPre.chinaMedForm.drug_list.forEach((val) => {
              if (val.dosage === '0' || this.changeToPrimaryUnit(val.specs, val.dosage, val.dose_unit) * this.chinaMedPre.chinaMedForm.total > val.totalNum) {
                dosageFlag = false;
              }
            });
            if (!dosageFlag || this.chinaMedPre.chinaMedForm.total === '0') {
              this.$message({ message: '数量错误', type: 'error', showClose: true, duration: 1000 });
              this.ban = false;
              return;
            }
            delete (this.chinaMedPre.chinaMedForm.flag);
            this.chinaMedPre.chinaMedForm.drug_list.map((val) => {
              val.use_method = this.chinaMedPre.chinaMedForm.use_method;
              val.total = +this.chinaMedPre.chinaMedForm.total;
              // val.daily_use = +this.chinaMedPre.chinaMedForm.daily_use;  // 删除ml模块
              val.frequency = this.chinaMedPre.chinaMedForm.frequency;
              val.taking_note = this.chinaMedPre.chinaMedForm.taking_note;
              val.zjyongfa = this.chinaMedPre.chinaMedForm.zjyongfa;
              val.dosage -= 0;
              return this.chinaMedPre.chinaMedForm;
            });
            delete (this.chinaMedPre.chinaMedForm.totalNum);
            delete (this.chinaMedPre.chinaMedForm.medName);
            // delete (this.chinaMedPre.chinaMedForm.daily_use);  // 删除ml模块
            // 调用处理处方函数
            this.patientMsg.presForm = savePreFunc.allChange(this.patientMsg);
            // 调用保存处方
            this.savePre();
          } else {
            this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
            this.ban = false;
            return false;
          }
        });
      }, 500);
    },
  },
  computed: {
    ...mapGetters(['user', 'clinic', 'token', 'preForm', 'bindSbMsg', 'frequencyList', 'chinaUsage']),
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.WestMedicineStyle {
  margin: 10px 0;
}

.demo-form-inline {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 5px;
  margin-right: 10px;
  font-size: 12px; // .inline-input{
  //   width: 80%;
  // }
  .el-radio {
    margin-left: 10px;
  }
  .el-autocomplete {
    width: 100%;
  }
  .el-autocomplete.inlineBlock{
    width: 64%;
  }
  &.dose {
    span {
      font-size: 12px;
    }
    .el-input {
      width: 60%;
    }
    .el-autocomplete {
      width: 60%;
    }
    .el-select {
      width: 30%;
    }
  }
  .money{
    color: red;
  }
  &.dose2 {
    .el-input {
      width: 100px;
    }
    .el-autocomplete {
      width: 110px;
    }
    .el-select {
      width: 60%;
    }
    .spans {
      display: inline-block; // width: 15%;
      font-size: 12px;
    }
  }
  &.dose3 {
    .el-select {
      width: 60%;
    }
    .spans {
      display: inline-block;
      width: 25%;
      font-size: 12px;
    }
  }
  .el-icon-delete {
    font-size: 20px;
    cursor: pointer;
    color: $mainColor;
  }
  .preContentul {
    border: 1px solid #ccc;
    padding-left: 5px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: -5px;
    >div {
      border-right: 1px solid #ccc;
      &:last-of-type {
        border-right: 0;
      }
    }
  }
  &.usageStyle {
    margin: 20px 0;
  }
  .el-button {
    width: 100px;
    height: 35px;
    margin-right: 5%;
    margin-top: 5px;
  }
  .totalMoney {
    strong {
      font-size: 16px;
      color: red;
      margin-right: 5px;
    }
  }
  &.inputs {
    textarea {
      width: 750px;
      display: block;
      resize: vertical;
      padding: 5px 15px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      font-size: 14px;
      color: #5a5e66;
      background-color: #fff;
      border: 1px solid #d8dce5;
      border-radius: 4px;
      -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
  }
}

.addinputs {
  cursor: pointer;
  color: $mainColor;
}
.totalNumTip{ // 库存
    color: red;
    font-size: 12px;
}
.chargeIcon {
  // papyIcon
  width: 100px;
  height: 100px;
  background-image: url('../../../assets/img/hasCharge.png');
  position: absolute;
  top: 50px;
  left: 0;
  opacity: .7;
}

// 联想样式
.my-autocomplete {
  li {
    line-height: normal;
    padding: 2px;
    border-bottom: 1px solid #ccc;
    .name {
      // text-overflow: ellipsis;
      // overflow: hidden;
      line-height: 22px;
      font-size: 13px;
    }
    .phone {
      color: #b4b4b4;
      line-height: 18px;
      font-size: 12px;
      margin-bottom: 5px;
      border-bottom: 1px solid #ccc;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}

.doctorMsg {
  margin-top: 20px;
  p {
    span {
      font-size: 16px;
      font-weight: 600;
    }
    .el-button {
      width: 100px;
      margin-top: 0;
      margin-left: 15px;
      margin-right: 5%;
    }
    &:nth-of-type(2) {
      color: red;
      margin-right: 13%;
    }
  }
}
</style>
