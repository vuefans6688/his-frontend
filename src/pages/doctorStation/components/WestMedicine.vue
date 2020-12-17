<template>
  <div class="WestMedicineStyle">
    <el-form class="demo-form-inline prescriptionInputs" size='mini' :model="westMedPre.westMedForm" ref="westMedForm" align="left">
      <el-form-item>
          <el-row class="preContentul">
            <el-col :span="1">组合</el-col>
            <el-col :span="4">药品名称</el-col>
            <el-col :span="3">包装规格</el-col>
            <el-col :span="2">用法</el-col>
            <el-col :span="3">单次剂量</el-col>
            <el-col :span="2">用药频次</el-col>
            <el-col :span="1">天数</el-col>
            <el-col :span="3">开药数量</el-col>
            <el-col :span="2">单价</el-col>
            <el-col :span="2">金额</el-col>
            <el-col :span="1">操作</el-col>
          </el-row>
      </el-form-item>
      <el-row v-for="(item, index) in westMedPre.westMedForm.drug_list" :key='index'>
        <!--组合  -->
        <el-col :span="1">
          <el-form-item>
            <el-input v-model="item.group_index_str" class="inlineBlock" :maxlength="2" @keyup.native="numberInp('group_index_str')" :disabled='westMedPre.westPreStatus.isDisabled'></el-input>
          </el-form-item>
        </el-col>
        <!--药品名称  -->
        <el-col :span="4">
          <el-form-item :prop="'drug_list.' + index + '.name'" :rules="{required: true, message: ' ', trigger: 'blur, change'}" class="inlineBlock">
            <template solt-scope='scope'>
              <el-autocomplete popper-class="my-autocomplete" @focus='addFormItem("", index)' @blur="checkName(index)" :disabled='westMedPre.westPreStatus.isDisabled' v-model="item.name" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名" @select="westNameSelect($event, index)" :trigger-on-focus="false" valueKey='name'>
                <template slot-scope="props">
                  <div class="thinkName">
                    {{ props.item.drug_name }}<span class="spec"> {{ props.item.spec_text }}</span>
                    <p class="factory">{{ props.item.producer }}</p>
                  </div>
                </template>
              </el-autocomplete>
            </template>
          </el-form-item>
        </el-col>
        <!--包装规格  -->
        <el-col :span="3">
          <el-form-item prop="spec_text" align="center">
            <span>{{ item.spec_text }}</span>
          </el-form-item>
        </el-col>
        <!--用法  -->
        <el-col :span="2">
          <el-form-item :prop="'drug_list.' + index + '.use_method'" :rules="{required: true, message: ' ', trigger: 'blur, change'}">
            <el-autocomplete popper-class="my-autocomplete" :disabled='westMedPre.westPreStatus.isDisabled' v-model="item.use_method" valueKey="name" :fetch-suggestions="usageSearch" placeholder="请输入用法"></el-autocomplete>
          </el-form-item>
        </el-col>
        <!--单次剂量  -->
        <el-col :span="3">
          <el-form-item :prop="'drug_list.' + index + '.dosage'" :rules="{required: true, message: ' ', trigger: 'blur, change'}" class="dose">
            <!-- <el-input v-model="item.dosage" class="inlineBlock" @keyup.native="priceInp('dosage')" :disabled='westMedPre.westPreStatus.isDisabled'></el-input> -->
            <el-autocomplete
              class="inlineBlock"
              v-model="item.dosage"
              @keyup.native="priceInp('dosage')"
              :fetch-suggestions="querySearchNumber"
              placeholder="请输入单次剂量"
              :disabled='westMedPre.westPreStatus.isDisabled'
            ></el-autocomplete>
              <!-- @select="handleSelect" -->
            <span v-if="!item.specs && item.dose_unit">{{ item.dose_unit }}</span>
            <el-select v-if="item.specs " v-model="item.dose_unit" style="width: 80" size="small" :disabled='westMedPre.westPreStatus.isDisabled'>
              <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
              <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
              <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
            </el-select>
          </el-form-item>
          <span v-if="item.dosage === '0'" class="totalNumTip">不能为0</span>
        </el-col>
        <!--用药频次  -->
        <el-col :span="2">
          <el-form-item :prop="'drug_list.' + index + '.frequency'" :rules="{required: true, message: ' ', trigger: 'blur, change'}">
            <el-select v-model="item.frequency" :disabled='westMedPre.westPreStatus.isDisabled'>
              <el-option v-for="(val, index) in frequencyList" :key="index" :label="val.name" :value="val.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 天数  -->
        <el-col :span="1">
          <el-form-item  :prop="'drug_list.' + index + '.days'" :rules="{required: true, message: ' ', trigger: 'blur, change'}">
            <!-- <el-input v-model="item.days" @keyup.native="numberInp('days')" :maxlength="2" :disabled='westMedPre.westPreStatus.isDisabled'></el-input> -->
            <el-autocomplete
              v-model="item.days"
              :fetch-suggestions="querySearchNumber"
              placeholder="天数"
              @keyup.native="numberInp('days')"
              :maxlength="2"
              :disabled='westMedPre.westPreStatus.isDisabled'
            ></el-autocomplete>
          </el-form-item>
          <span v-if="item.days === '0'" class="totalNumTip">不能为0</span>
        </el-col>
        <!--开药数量  -->
        <el-col :span="3">
          <el-form-item :prop="'drug_list.' + index + '.total'" :rules="{required: true, message: ' ', trigger: 'blur, change'}" class="dose">
            <el-autocomplete
              class="inlineBlock"
              v-model="item.total"
              :fetch-suggestions="querySearchNumber"
              placeholder="请输入数量"
              @keyup.native="priceInp('total', 4)"
              @blur='calculate(index)'
              @select="calculate(index)"
              :disabled='westMedPre.westPreStatus.isDisabled'
            ></el-autocomplete>
            <!-- <el-input v-model="item.total" class="inlineBlock" @keyup.native="priceInp('total', 4)" @blur='calculate(index)' :disabled='westMedPre.westPreStatus.isDisabled'></el-input> -->
            <span v-if="!item.specs && item.total_unit">{{ item.total_unit }}</span>
            <el-select v-if="item.specs" v-model="item.total_unit" @change="calculate(index)" style="width: 80" size="small" :disabled='westMedPre.westPreStatus.isDisabled'>
              <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
              <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
              <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
            </el-select>
          </el-form-item>
        <span v-if="item.total === '0'" class="totalNumTip">不能为0</span>
        </el-col>
        <!--单价  -->
        <el-col :span="2">
          <el-form-item prop="price" align="center">
            <span> ￥ {{ item.price | PriceFilter }}</span>
            <span v-if="item.count_ulname">/{{item.count_ulname}}</span>
          </el-form-item>
        </el-col>
        <!--金额  -->
        <el-col :span="2">
          <el-form-item prop="total_price" align="center">
            <span>￥ {{ item.total_price | PriceFilter }}</span>
          </el-form-item>
        </el-col>
        <!--操作  -->
        <el-col :span="1">
          <el-form-item prop="del" align="center">
            <i class="el-icon-delete" @click="del(index)" v-show='!westMedPre.westPreStatus.isDisabled'></i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item align='left'>
        <span class='addinputs' @click='addFormItem("add")' v-show='!westMedPre.westPreStatus.isDisabled'>
          <i class="el-icon-circle-plus-outline"></i>
          增加一行
        </span>
        <span class="totalMoney">
          合计：<strong> {{ westMedPre.westMedForm.totalMoney | PriceFilter }}</strong>元
        </span>
      </el-form-item>
      <el-form-item align='right'>
        <div class="doctorMsg">
          <p>医生：
            <span>{{ patientMsg.doctorTip.name }}</span>
              <el-button type="primary" @click="submitWestForm('westMedForm')" :disabled="ban" v-show="!westMedPre.westPreStatus.isDisabled">保 存</el-button>
              <el-button type="primary" v-show='westMedPre.westPreStatus.isDisabled' @click="amendPre">修改</el-button>
          </p>
          <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
        </div>
      </el-form-item>
    </el-form>
    <div class='chargeIcon' v-show='westMedPre.westPreStatus.isIconShow'></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { presSearchDrug, presDrugInfo, addPre, modifyPre } from '@apiNormal';
import { numberLimit, floatLimit } from '@/utils/inputLimit';
import savePreFunc from './savePreFunc';

export default {
  data() {
    return {
      ban: false,
      numberList: [
        { lable: '1', value: '1' },
        { lable: '2', value: '2' },
        { lable: '3', value: '3' },
        { lable: '4', value: '4' },
        { lable: '7', value: '7' },
        { lable: '10', value: '10' },
      ],
    };
  },
  props: {
    westMedPre: {
      type: Object,
    },
    patientMsg: {
      type: Object,
    },
  },
  methods: {
    numberInp(str) { // 限制数字输入
      for (let i = 0; i < this.westMedPre.westMedForm.drug_list.length; i++) {
        this.westMedPre.westMedForm.drug_list[i][str] =
        numberLimit(this.westMedPre.westMedForm.drug_list[i][str]);
      }
    },
    priceInp(str, num = 3) { // 限制小数输入
      for (let i = 0; i < this.westMedPre.westMedForm.drug_list.length; i++) {
        this.westMedPre.westMedForm.drug_list[i][str] = floatLimit(this.westMedPre.westMedForm.drug_list[i][str], num);
      }
    },
    addFormItem(act = '', index) {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'warning', showClose: true, duration: 1000 });
        return;
      }
      if (act === 'add' || (index === this.westMedPre.westMedForm.drug_list.length - 1 && index < 4)) {
        const json = {
          group_index_str: '',     // 组合
          drug_id: '',   // 药品id
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
        };
        this.westMedPre.westMedForm.drug_list.push(json);
      }
      if (index === 4) {
        this.$message({ type: 'warning', message: '该处方药品达到上限,请新开处方单', showClose: true, duration: 1000 });
      }
    },
    del(index) {
      if (this.westMedPre.westMedForm.drug_list.length <= 1) {
        this.westMedPre.westMedForm.totalMoney = 0;
        this.westMedPre.westMedForm.drug_list = [
          {
            group_index_str: '',     // 组合
            drug_id: '',   // 药品id
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
        ];
        return;
      }
      this.westMedPre.westMedForm.drug_list.splice(index, 1);
      this.calculateAll();
    },
    checkName(index) {  // 检验名字
      if (this.westMedPre.westMedForm.drug_list[index].name !== this.westMedPre.westMedForm.drug_list[index].medName) {
        this.westMedPre.westMedForm.drug_list[index].group_index_str = '';
        this.westMedPre.westMedForm.drug_list[index].drug_id = '';
        this.westMedPre.westMedForm.drug_list[index].name = '';
        this.westMedPre.westMedForm.drug_list[index].spec_text = '';
        this.westMedPre.westMedForm.drug_list[index].use_method = '';
        this.westMedPre.westMedForm.drug_list[index].dosage = '';
        this.westMedPre.westMedForm.drug_list[index].dose_unit = '';
        this.westMedPre.westMedForm.drug_list[index].frequency = '';
        this.westMedPre.westMedForm.drug_list[index].days = '';
        this.westMedPre.westMedForm.drug_list[index].total = '';
        this.westMedPre.westMedForm.drug_list[index].total_unit = '';
        this.westMedPre.westMedForm.drug_list[index].price = 0;
        this.westMedPre.westMedForm.drug_list[index].total_price = 0;
        this.calculateAll();
      }
    },
    calculate(index) {  // 计算金额
      const dgl = this.westMedPre.westMedForm.drug_list[index];
      let totalStock = 0; // 开药的总量
      let stockUnit = ''; // 最小库存的单位
      let unitPrice = 0; // 入库单位换算出真实的药品单价（最大单位）。
      if (dgl.specs) {
        const specs = dgl.specs;
        const punitname = dgl.count_ulname || dgl.price_unit;
        unitPrice = this.calUnitPrice(dgl.price, punitname, specs);
        // 先判断药品有几级单位，再判断用户开药选的是第几级
        if (specs.unit_middle.specs_name && specs.unit_primary.specs_name) { // 有三级单位
          stockUnit = specs.unit_primary.specs_name;
          // 这里处理价格和库存
          if (dgl.total_unit === specs.unit_large.specs_name) { // 选的是最大单位
            dgl.total_price = dgl.total * unitPrice; // 计算最大单位的价格;
            totalStock = dgl.total * specs.unit_middle.specs_unit * specs.unit_primary.specs_unit; // 最大单位换算成最小单位计算库存;
          } else if (dgl.total_unit === specs.unit_middle.specs_name) { // 选的是中级单位
            dgl.total_price = dgl.total * unitPrice / specs.unit_middle.specs_unit; // 计算次级单位的价格;
            totalStock = dgl.total * specs.unit_primary.specs_unit; // 中级单位换算成最小单位计算库存;
          } else if (dgl.total_unit === specs.unit_primary.specs_name) { // 选的是最小单位
            dgl.total_price = dgl.total * unitPrice / specs.unit_middle.specs_unit / specs.unit_primary.specs_unit; // 计算最小单位的价格;
            totalStock = dgl.total; // 中级单位换算成最小单位计算库存;
          }
        } else if (!specs.unit_primary.specs_name && specs.unit_middle.specs_name) { // 药品只有二级单位
          stockUnit = specs.unit_middle.specs_name;
          if (dgl.total_unit === specs.unit_large.specs_name) { // 选的是最大单位
            dgl.total_price = dgl.total * unitPrice; // 计算最大单位的价格;
            totalStock = dgl.total * specs.unit_middle.specs_unit; // 最大单位换算成最小单位计算库存;
          } else if (dgl.total_unit === specs.unit_middle.specs_name) { // 选的是中级单位
            dgl.total_price = dgl.total * unitPrice / specs.unit_middle.specs_unit; // 计算次级单位的价格;
            totalStock = dgl.total; // 中级单位换算成最小单位计算库存;
          }
        }
      }
      if (totalStock > dgl.totalNum) {
        this.$message({ message: `库存量为：${dgl.totalNum}${stockUnit}`, type: 'error', showClose: true, duration: 2000 });
      }
      this.calculateAll();
    },
    calUnitPrice(dprice, clname, specs) {
      let realUnitPrice = 0;
      if (clname === specs.unit_large.specs_name) { // 入库单位是最大单位
        realUnitPrice = dprice;
      } else if (clname === specs.unit_middle.specs_name) { // 入库单位是中级单位
        realUnitPrice = dprice * specs.unit_middle.specs_unit;
      } else if (clname === specs.unit_primary.specs_name) { // 入库单位是最小单位
        realUnitPrice = dprice / specs.unit_primary.specs_unit;
      }
      return realUnitPrice;
    },
    calculateAll() {  // 计算总价
      let sum = 0;
      this.westMedPre.westMedForm.drug_list.forEach((val) => {
        sum += val.total_price;
      });
      this.westMedPre.westMedForm.totalMoney = sum; // 超出库存提示
      this.westMedPre.westMedForm.szsbtotalprice = sum; // 超出库存提示
      this.westMedPre.westMedForm.total_price = sum; // 超出库存提示
    },
    resetForm() {  // 重置表单
      this.westMedPre.westMedForm = {
        totalMoney: 0,    // 总价
        drug_list: [
          {
            group_index_str: '',     // 组合
            drug_id: '',   // 药品id
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
      };
    },
    querySearchNumber(queryString, cb) {
      cb(this.numberList);
    },
    querySearchAsync(queryString, cb) { // 药名联想
      clearTimeout(this.timeout);
      httpServerNormal(presSearchDrug, {
        drug_name: queryString,
        drug_type: 0,
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
    usageSearch(queryString, cb) {  // 用法联想
      const westUsageArr = this.usageList;
      const results = queryString ? westUsageArr.filter(this.createFilter(queryString))
        : westUsageArr;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (array) => {
        return (array.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    westNameSelect(item, index) {   // 西药名选择事件
      const obj = this.westMedPre.westMedForm.drug_list.find((val) => {
        return item.drug_id === val.drug_id;
      });
      if (obj) {
        this.$message({ message: '该药品已存在！', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.westMedPre.westMedForm.drug_list[index].name = item.drug_name;
      this.westMedPre.westMedForm.drug_list[index].drug_id = item.drug_id;
      this.westMedPre.westMedForm.drug_list[index].medName = item.drug_name;  // 保存药名检测
      // 通过接口获取详细的药品信息
      httpServerNormal(presDrugInfo, {
        drug_id: item.drug_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res) {
            this.westMedPre.westMedForm.drug_list[index].spec_text = res.specs_txt;
            this.westMedPre.westMedForm.drug_list[index].price = res.cf_price;
            this.westMedPre.westMedForm.drug_list[index].use_method = res.yongfa;
            this.westMedPre.westMedForm.drug_list[index].dosage = res.useunit.specs_unit ? res.useunit.specs_unit.toString() : '';
            this.westMedPre.westMedForm.drug_list[index].days = res.usedall_days ? res.usedall_days.toString() : '';
            this.westMedPre.westMedForm.drug_list[index].total = res.useall && res.useall.specs_unit ? res.useall.specs_unit.toString() : '';
            // 西药里面的开药单位，单次剂量默认给最小值, 开药数量默认给最大值
            if (res.specs && res.specs.unit_primary.specs_name) { // 有最小单位
              this.westMedPre.westMedForm.drug_list[index].dose_unit = res.specs.unit_primary.specs_name;
            } else if (res.specs && !res.specs.unit_primary.specs_name && res.specs.unit_middle.specs_name) { // 无最小单位，有中级单位
              this.westMedPre.westMedForm.drug_list[index].dose_unit = res.specs.unit_middle.specs_name;
            }
            this.westMedPre.westMedForm.drug_list[index].total_unit = res.specs && res.specs.unit_large ? res.specs.unit_large.specs_name : '';
            this.westMedPre.westMedForm.drug_list[index].frequency = res.usedaily_times ? res.usedaily_times : '';
            this.westMedPre.westMedForm.drug_list[index].count_ulname = res.count_ulname;
            this.westMedPre.westMedForm.drug_list[index].specs = res.specs;
            if (this.westMedPre.westMedForm.drug_list[index].frequency) {
              const times = this.frequencyList.find((val) => {
                return val.index === res.usedaily_times;
              });
              this.westMedPre.westMedForm.drug_list[index].frequency = times.name;
            }
            // 保存库存进行检测
            this.westMedPre.westMedForm.drug_list[index].totalNum = res.stock_total ? res.stock_total : res.count_ulunit;
            this.calculate(index);
          } else {
            this.$message({ message: '该药品库存为0', type: 'error', showClose: true, duration: 1000 });
          }
        }
      });
    },
    submitWestForm(formName) { // 保存
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
      this.westMedPre.westMedForm.drug_list = this.westMedPre.westMedForm.drug_list.filter((val) => {
        return val.name;
      });
      if (!this.westMedPre.westMedForm.drug_list.length) {
        this.$message({ message: '处方内容不可为空', type: 'warning', showClose: true, duration: 1000 });
        this.ban = false;
        this.addFormItem('add');
        return;
      }
      setTimeout(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let priceFlag = true;
            this.westMedPre.westMedForm.drug_list.forEach((val) => {
              if (!val.price) {
                priceFlag = false;
              }
            });
            if (!priceFlag) {
              this.$message({ message: '该药未入库', type: 'error', showClose: true, duration: 1000 });
              this.ban = false;
              return;
            }
            if (this.type === 'print') { // 若为子组件则传值
              this.$emit('formMes', this.westMedPre.westMedForm);
            }
            delete (this.westMedPre.westMedForm.flag);
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
          this.ban = false;
          this.westMedPre.westPreStatus.isDisabled = true; // 保存按钮改变
          const sum = this.patientMsg.presForm.findIndex((val) => {
            return val.prescript_id === '';
          });
          if (sum !== -1) {
            this.westMedPre.westMedForm.prescript_id = res[sum].prescript_id;
          }
          /**
           * savePreFunc.sbAudit智慧医保审批
           * 参数
           * 1绑定信息 2处方id 3挂号id 4处方类别（1西药2中药3输液）
          */
          if (this.patientMsg.details.card_num && this.bindSbMsg.hospitalCode) {  // 存在电脑号则走智慧医保
            const prescriptId = this.westMedPre.westMedForm.prescript_id || res[sum].prescript_id;
            savePreFunc.sbAudit(this.bindSbMsg, prescriptId, this.patientMsg, 1);  // 智慧医保处方审批
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
        prescript_id: this.westMedPre.westMedForm.prescript_id,
        prescript_type: 1,
        status: -1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res.status === 0) {
            // 可修改处方
            this.westMedPre.westPreStatus.isDisabled = false;
          } else {
            this.westMedPre.westPreStatus.isIconShow = true;
            this.$message({ message: '该处方已缴费', type: 'error', showClose: true, duration: 1000 });
          }
        }
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'bindSbMsg', 'frequencyList', 'usageList']),
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.WestMedicineStyle {
  margin: 10px 0;
  position: relative;
}

.demo-form-inline {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
}

.el-form-item {
  // margin-bottom: 5px;
  margin-right: 10px;
  &.dose {
    .el-input {
      width: 64%;
    }
    .el-input-number{
      width: 64%;
    }
    .el-select {
      width: 32%;
    }
  }
  .el-autocomplete{
    width: 100%;
  }
  .el-autocomplete.inlineBlock{
    width: 64%;
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
    margin-bottom: 10px;
    border-radius: 5px;
    margin-left: -5px;
    >div {
      border-right: 1px solid #ccc;
      &:last-of-type {
        border-right: 0;
      }
    }
  }
  .el-button {
    width: 100px;
    height: 35px;
    margin-right: 5%;
    margin-top: 5px;
  }
  &.inputs {
    margin-top: 20px;
    margin-right: 20px;
    .el-input {
      width: 200px;
    }
  }
}

.addinputs {
  cursor: pointer;
  color: $mainColor;
}
.totalMoney{
  float: right;
  margin-right: 80px;
  strong{
    font-size: 16px;
    color: red;
    margin-right: 5px;
  }
}

.chargeIcon {
  width: 100px;
  height: 100px;
  background-image: url('../../../assets/img/hasCharge.png');
  position: absolute;
  top: 0;
  left: 0;
  opacity: .7;
}

.totalNumTip{ // 库存
    color: red;
    font-size: 12px;
}
// 联想样式
.thinkName {
  line-height: 26px;
  font-size: 12px;
  .spec{
    color: #999;
    font-size: 10px;
    margin-left: 5px;
  }
  .factory {
    color: #999;
    line-height: 18px;
    font-size: 10px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
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
    &:nth-of-type(2){
      color: red;
      margin-right: 13%;
    }
  }
}
</style>
