<template>
  <div class="WestMedicineStyle">
    <el-form class="demo-form-inline prescriptionInputs" align='left' size='mini' :model="infusionMedForm" ref="infusionMedForm">
      <el-form-item v-for="(infusionMedForm, index1) in InfusionArr2" :key='index1'>
        <template solt-scope='scope'>
          <el-form-item align='left'>
            <div class="team1">
              <strong>输液组 {{ index1 + 1 }}</strong>
              <span @click="delForm(index1)" v-show='!infusionMedPre.infusionPreStatus.isDisabled'>删除该组</span>
              <span @click="addForm('infusionMedForm')" v-show='!infusionMedPre.infusionPreStatus.isDisabled'>新增输液组</span>
            </div>
          </el-form-item>
        </template>
        <!-- 第零行  -->
        <el-form-item class="line0">
          <el-row class="preContentul">
            <el-col :span="1">序号</el-col>
            <el-col :span="5">药品名称</el-col>
            <el-col :span="4">规格</el-col>
            <el-col :span="3">单次剂量</el-col>
            <el-col :span="2">皮试</el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="2">单价</el-col>
            <el-col :span="2">金额</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
        </el-form-item>
        <!--第一行  -->
        <el-form-item v-for="(item, index2) in infusionMedForm.drug_list" :key='index2' class="line1">
          <!-- 序号  -->
          <el-col :span="1">
            <el-form-item align='center'>
              <span>{{ (index2 + 1) }}</span>
            </el-form-item>
          </el-col>
          <!--药品名称  -->
          <el-col :span="5">
            <el-form-item>
              <el-autocomplete popper-class="my-autocomplete" v-model="item.name" @focus="addFormItem(index1, index2)" @blur="checkName(index1, index2)" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名" @select="infusionNameSelect($event, index1, index2)" :trigger-on-focus="false" valueKey='name' :disabled="infusionMedPre.infusionPreStatus.isDisabled">
                <template slot-scope="props">
                  <div class="thinkName">
                    {{ props.item.drug_name }}<span class="spec"> {{ props.item.spec_text }}</span>
                    <p class="factory">{{ props.item.producer }}</p>
                  </div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <!-- 规格 -->
          <el-col :span="4">
            <el-form-item align='center'>
              <span>{{ item.spec_text }}</span>
            </el-form-item>
          </el-col>
          <!--单次剂量  -->
          <el-col :span="3">
            <el-form-item class="dose" align="left">
              <el-autocomplete
                class="inlineBlock"
                v-model="item.dosage"
                @keyup.native="numberInp(index1, index2, 'dosage')"
                :fetch-suggestions="querySearchNumber"
                placeholder="请输入单次剂量"
                :disabled='infusionMedPre.infusionPreStatus.isDisabled'
              ></el-autocomplete>
              <!-- <el-input v-model="item.dosage"  class="inlineBlock"  @keyup.native="numberInp(index1, index2, 'dosage')" :disabled="infusionMedPre.infusionPreStatus.isDisabled"></el-input> -->
              <span v-if="!item.specs && item.dose_unit">{{ item.dose_unit }}</span>
              <el-select v-if="item.specs " v-model="item.dose_unit" size="small" :disabled='infusionMedPre.infusionPreStatus.isDisabled'>
                <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 皮试 -->
          <el-col :span="2">
            <el-form-item prop="skin_test" align='center'>
              <el-checkbox v-model="item.skin_test" :disabled="infusionMedPre.infusionPreStatus.isDisabled" class="elCheckBox"></el-checkbox>
            </el-form-item>
          </el-col>
          <!--数量  -->
          <el-col :span="3">
            <el-form-item class="dose" align="left">
              <el-autocomplete
                class="inlineBlock"
                v-model="item.total"
                :fetch-suggestions="querySearchNumber"
                placeholder="请输入数量"
                @keyup.native="numberInp(index1, index2, 'total', 4)"
                @blur="calculate(index1, index2)"
                @select="calculate(index1, index2)"
                :disabled='infusionMedPre.infusionPreStatus.isDisabled'
              ></el-autocomplete>
              <!-- <el-input v-model="item.total" class="inlineBlock" @keyup.native="numberInp(index1, index2, 'total', 4)" @change="calculate(index1, index2)" :disabled="infusionMedPre.infusionPreStatus.isDisabled"></el-input> -->
              <span v-if="!item.specs && item.total_unit">{{ item.total_unit }}</span>
              <el-select v-if="item.specs" v-model="item.total_unit" @change="calculate(index1, index2)" size="small" :disabled='infusionMedPre.infusionPreStatus.isDisabled'>
                <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
              </el-select>
            </el-form-item>
          </el-col>
           <!--单价  -->
          <el-col :span="2">
            <el-form-item prop="price" align='center'>
              <span>￥ {{ item.price | PriceFilter }}</span>
              <span v-if="item.count_ulname">/{{item.count_ulname}}</span>
            </el-form-item>
          </el-col>
          <!--金额  -->
          <el-col :span="2">
            <el-form-item prop="temperature" align='center'>
              <span>￥ {{ item.total_price | PriceFilter }}</span>
            </el-form-item>
          </el-col>
          <!--操作  -->
          <el-col :span="2">
            <el-form-item prop="temperature" align='center'>
              <i class="el-icon-delete" @click="del(index1, index2)" v-show="!infusionMedPre.infusionPreStatus.isDisabled"></i>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item align='left'>
          <span class='addinputs' @click='addFormItem(index1, InfusionArr2[index1].drug_list.length - 1)' v-show="!infusionMedPre.infusionPreStatus.isDisabled">
            <i class="el-icon-circle-plus-outline"></i> 
            增加一行
          </span>
          <span class="totalMoney">
            合计：<strong>{{ infusionMedForm.totalMoney | PriceFilter }}</strong>元
          </span>
        </el-form-item> 
        <!--第二行  -->
        <el-form-item align="left" class="line2">
          <!--用法  -->
          <el-col :span="6">
            <el-form-item prop="use_method" class="dose2" >
              <span class="require"><i>*</i>用法：</span>
              <el-autocomplete popper-class="my-autocomplete" v-model="infusionMedForm.use_method" valueKey="name" :fetch-suggestions="usageSearch" placeholder="请输入用法" :disabled="infusionMedPre.infusionPreStatus.isDisabled"></el-autocomplete>
            </el-form-item>
            <!--频次  -->
          </el-col>
          <el-col :span="6">
            <el-form-item prop="frequency" class="dose2">
              <span class="require"><i>*</i>频次：</span>
              <el-select v-model="infusionMedForm.frequency" :disabled="infusionMedPre.infusionPreStatus.isDisabled" class="fSelect">
                <el-option v-for="(val, index) in frequencyList" :key="index" :label="val.name" :value="val.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--滴速  -->
          <el-col :span="6">
            <el-form-item prop="infusion_speed" class="dose2">
              <span class="require">滴速：</span>
              <el-input class="inlineBlock" @keyup.native="numberInp2(index1, 'infusion_speed')" v-model="infusionMedForm.infusion_speed" :disabled="infusionMedPre.infusionPreStatus.isDisabled"></el-input>
              <el-select placeholder="滴速" v-model="infusionMedForm.infu_speed_unit" :disabled="infusionMedPre.infusionPreStatus.isDisabled">
                <el-option label="g/分钟" value="g/分钟"></el-option>
                <el-option label="ml/分钟" value="ml/分钟"></el-option>
                <el-option label="ml/小时" value="ml/小时"></el-option>
                <el-option label="分钟/次" value="分钟/次"></el-option>
                <el-option label="ug/分钟" value="ug/分钟"></el-option>
                <el-option label="滴/分钟" value="滴/分钟"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!--第三行  -->
        <el-form-item class="line3">
          <el-col :span="7">
            <el-form-item label="开始日期：" class="dosedate">
              <el-date-picker type="date" v-model="infusionMedForm.begin_date" placeholder="选择日期" :clearable="false" :editable="false" :disabled="infusionMedPre.infusionPreStatus.isDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="days" class="days" >
              <span class="require"><i>*</i>连续天数：</span>
                <el-autocomplete
                  class="inlineBlock"
                  v-model="infusionMedForm.days"
                  @keyup.native="numberInp2(index1, 'days')"
                  :fetch-suggestions="querySearchNumber"
                  placeholder="请输入单次剂量"
                  :disabled='infusionMedPre.infusionPreStatus.isDisabled'
                ></el-autocomplete>
                <!-- <el-input @keyup.native="numberInp2(index1, 'days')" v-model="infusionMedForm.days" :disabled="infusionMedPre.infusionPreStatus.isDisabled"></el-input> -->
                <span class="spans">天</span>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div class='chargeIcon' v-show='infusionMedPre.infusionPreStatus.isIconShow'></div>
    <!--底部  -->
    <el-form>
      <el-form-item  align='right'>
        <div class="doctorMsg">
          <p>医生：
            <span>{{ patientMsg.doctorTip.name }}</span>
              <el-button type="primary" @click="submitForm('infusionMedForm')" :disabled="ban" v-show='!infusionMedPre.infusionPreStatus.isDisabled'>保 存</el-button>
              <el-button type="primary" v-show='infusionMedPre.infusionPreStatus.isDisabled' @click="amendPre">修改</el-button>
          </p>
          <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import { floatLimit } from '@/utils/inputLimit';
import httpServerNormal from '@httpServerNormal';
import { presSearchDrug, presDrugInfo, addPre, modifyPre } from '@apiNormal';
import savePreFunc from './savePreFunc';


export default {
  data() {
    return {
      ban: false,
      infusionMedForm: {   // 单个输液组
        drug_list: [
          {
            name: '',   // 药品名
            spec_text: '',
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
      // 用于克隆的模板
      infusionMedForm2: {
        totalMoney: 0,    // 总价
        drug_list: [
          {
            name: '',   // 药品名
            spec_text: '',
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
        begin_date: '',        // 日期
        days: '',      // 天数
      },
      timeout: null,
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
  methods: {
    querySearchNumber(queryString, cb) {
      cb(this.numberList);
    },
    numberInp(index1, index2, key, num = 2) { // 限制数字输入
      this.InfusionArr2[index1].drug_list[index2][key] = floatLimit(this.InfusionArr2[index1].drug_list[index2][key], num);
    },
    numberInp2(index1, key) { // 限制数字输入
      this.InfusionArr2[index1][key] = floatLimit(this.InfusionArr2[index1][key], 2);
    },
    addFormItem(index1, index2) {
      if (index2 === this.InfusionArr2[index1].drug_list.length - 1 && index2 < 9) {
        const obj = {
          name: '',   // 药品名
          spec_text: '',
          dosage: '',    // 剂量
          dose_unit: '',      // 剂量(单位)
          skin_test: false,     // 皮试
          total: '',           // 数量
          total_unit: '',     // 数量单位
          price: 0,        // 单价
          total_price: 0,     // 金额
        };
        this.InfusionArr2[index1].drug_list.push(obj);
      }
    },
    checkName(index1, index2) {
      if (this.InfusionArr2[index1].drug_list[index2].name !== this.InfusionArr2[index1].drug_list[index2].medName) {
        this.InfusionArr2[index1].drug_list[index2].name = '';
        this.InfusionArr2[index1].drug_list[index2].drug_id = '';
        this.InfusionArr2[index1].drug_list[index2].spec_text = '';
        this.InfusionArr2[index1].drug_list[index2].dosage = '';
        this.InfusionArr2[index1].drug_list[index2].dose_unit = '';
        this.InfusionArr2[index1].drug_list[index2].skin_test = false;
        this.InfusionArr2[index1].drug_list[index2].total = '';
        this.InfusionArr2[index1].drug_list[index2].total_unit = '';
        this.InfusionArr2[index1].drug_list[index2].price = 0;
        this.InfusionArr2[index1].drug_list[index2].total_price = 0;
        this.calculateAll();
      }
    },
    del(index1, index2) {
      if (this.InfusionArr2[index1].drug_list.length <= 1) {
        this.InfusionArr2[index1].drug_list = [{
          name: '',   // 药品名
          spec_text: '',
          dosage: '',    // 剂量
          dose_unit: '',      // 剂量(单位)
          skin_test: false,     // 皮试
          total: '',           // 数量
          total_unit: '',     // 数量单位
          price: 0,        // 单价
          total_price: 0,     // 金额
        }];
        return;
      }
      this.InfusionArr2[index1].drug_list.splice(index2, 1);
      this.calculateAll();
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
    infusionNameSelect(item, index1, index2) {   // 药名选择事件
      const obj = this.InfusionArr2[index1].drug_list.find((val) => {
        return item.drug_id === val.drug_id;
      });
      if (obj) {
        this.$message({ message: '该药品已存在！', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.InfusionArr2[index1].drug_list[index2].name = item.drug_name;
      this.InfusionArr2[index1].drug_list[index2].spec_text = item.spec_text;
      this.InfusionArr2[index1].drug_list[index2].drug_id = item.drug_id;
      this.InfusionArr2[index1].drug_list[index2].medName = item.drug_name; //  保存药名检测
      httpServerNormal(presDrugInfo, {
        drug_id: item.drug_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res) {
            this.InfusionArr2[index1].drug_list[index2].dosage = res.useunit.specs_unit === 0 ? '' : res.useunit.specs_unit.toString();
            this.InfusionArr2[index1].drug_list[index2].dose_unit = res.useunit.specs_name;
            this.InfusionArr2[index1].drug_list[index2].total = res.useall.specs_unit === 0 ? '' : res.useall.specs_unit.toString() + '';
            this.InfusionArr2[index1].drug_list[index2].total_unit = res.useall.specs_name;
            this.InfusionArr2[index1].drug_list[index2].price = res.cf_price;
            this.InfusionArr2[index1].drug_list[index2].count_ulname = res.count_ulname;
            this.InfusionArr2[index1].drug_list[index2].specs = res.specs;
            // 保存库存进行检测
            this.InfusionArr2[index1].drug_list[index2].totalNum = res.stock_total ? res.stock_total : res.count_ulunit;
            this.calculate(index1, index2);
          } else {
            this.$message({ message: '该药品库存为0', type: 'error', showClose: true, duration: 2000 });
          }
        }
      });
    },
    usageSearch(queryString, cb) {  // 用法联想
      const westUsageArr = this.usageList;
      const results = queryString ? westUsageArr.filter(this.createFilter(queryString))
        : westUsageArr;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 使用频率联想
    TimesSearch(queryString, cb) {
      const Medicine = this.frequencyList;
      const results = queryString ? Medicine.filter(this.createFilter(queryString))
        : Medicine;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (array) => {
        return (array.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    calculate(index1, index2) {  // 计算金额
      const dgl = this.InfusionArr2[index1].drug_list[index2];
      let totalStock = 0; // 开药的总量
      let stockUnit = ''; // 最小库存的单位
      let unitPrice = 0; // 入库单位换算出真实的药品单价（最大单位）。
      if (dgl.specs) {
        const specs = dgl.specs;
        unitPrice = this.calUnitPrice(dgl.price, dgl.count_ulname, specs);
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
      this.InfusionArr2.forEach((val) => {
        let sum = 0;
        val.drug_list.forEach((val2) => {
          sum += val2.total_price;
        });
        val.totalMoney = sum;
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
      let valid = true;
      // 校验药品名
      this.InfusionArr2.forEach((group) => {
        group.drug_list = group.drug_list.filter((drug) => {
          return drug.name;
        });
      });
      // 校验剂量
      this.InfusionArr2.forEach((group) => {
        group.drug_list.forEach((drug) => {
          if (!drug.dosage || drug.dosage === '0') {
            this.$message({ message: '请填写单次剂量', type: 'error', showClose: true, duration: 1000 });
            valid = false;
          }
        });
      });
      // 校验数量
      this.InfusionArr2.forEach((group) => {
        group.drug_list.forEach((drug) => {
          if (!drug.total || drug.total === '0') {
            this.$message({ message: '请填写数量', type: 'error', showClose: true, duration: 1000 });
            valid = false;
          }
        });
      });
      // 校验用法
      this.InfusionArr2.forEach((group) => {
        if (!group.use_method) {
          this.$message({ message: '请填写用法', type: 'error', showClose: true, duration: 1000 });
          valid = false;
        }
      });
      // 校验频次
      this.InfusionArr2.forEach((group) => {
        if (!group.frequency) {
          this.$message({ message: '请选择频次', type: 'error', showClose: true, duration: 1000 });
          valid = false;
        }
      });
      // 校验天数
      this.InfusionArr2.forEach((group) => {
        const days = Number(group.days);
        if (!days || days === 0 || days >= 100) {
          this.$message({ message: '天数格式错误', type: 'error', showClose: true, duration: 1000 });
          valid = false;
        }
      });
      if (!valid) {
        this.ban = false;
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete (this.infusionMedPre.infusionMedForm.flag);
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
          this.infusionMedPre.infusionPreStatus.isDisabled = true; // 保存按钮改变
          const sum = this.patientMsg.presForm.findIndex((val) => {
            return val.prescript_id === '';
          });
          if (sum !== -1) {
            this.infusionMedPre.infusionMedForm.prescript_id = res[sum].prescript_id;
          }
          /**
           * savePreFunc.sbAudit智慧医保审批
           * 参数
           * 1绑定信息 2处方id 3挂号id 4处方类别（1西药2中药3输液）
          */
          if (this.patientMsg.details.card_num && this.bindSbMsg.hospitalCode) {  // 存在电脑号则走智慧医保
            const prescriptId = this.infusionMedPre.infusionMedForm.prescript_id || res[sum].prescript_id;
            savePreFunc.sbAudit(this.bindSbMsg, prescriptId, this.patientMsg, 3);  // 智慧医保处方审批
          }
        }
      }).catch(() => {
        this.ban = false;
      });
    },
    addForm() {
      this.InfusionArr2.forEach((group) => {
        group.drug_list = group.drug_list.filter((drug) => {
          return drug.name;
        });
      });
      if (this.infusionMedPre.InfusionArr.length >= 64) {
        this.$message({ message: '单个处方最多64个分组', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      const copy = deepcopy(this.infusionMedForm2);
      copy.begin_date = new Date();
      this.infusionMedPre.InfusionArr.push(copy);
    },
    delForm(index) {
      if (this.InfusionArr2.length <= 1) {
        return;
      }
      this.infusionMedPre.InfusionArr.splice(index, 1);
    },
    amendPre() {  // 修改
      httpServerNormal(modifyPre, {
        regist_id: this.patientMsg.registid,
        prescript_id: this.infusionMedPre.infusionMedForm.prescript_id,
        prescript_type: 3,
        status: -1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res.status === 0) {
            this.infusionMedPre.infusionPreStatus.isDisabled = false;  // 可修改处方
          } else {
            this.infusionMedPre.infusionPreStatus.isIconShow = true;
            this.$message({ message: '该处方已缴费', type: 'error', showClose: true, duration: 1000 });
          }
        }
      });
    },
  },
  computed: {
    ...mapGetters(['user', 'clinic', 'token', 'bindSbMsg', 'frequencyList', 'usageList']),
  },
  props: ['InfusionArr2', 'infusionMedPre', 'patientMsg', 'infusionId'],
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.WestMedicineStyle{
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
    .team1{
      line-height: 35px;
      span {
      cursor: pointer;
      color: $mainColor; 
      margin-left: 10px;
      &:hover{
        color: blue;
      }
    }
  }
}
.require {
  font-size: 14px;
  color: #626569;
  i {
    color: red;
    padding-right: 3px;
  }
}
.el-form{
  padding: 20px;
}
.el-form-item {
    margin-bottom: 5px;
    margin-right: 10px;
    font-size: 12px;
    .inline-input{
      width: 80%;
    }
    .el-autocomplete{
      width: 100%;
    }
    &.days{
      .el-input {
        width: 100px;
      }
      .el-autocomplete {
        width: 100px;
        margin-right: 3px;
      }
    }
    &.dose {
      .el-input {
        width: 62%;
      }
      .el-select {
        width: 32%;
      }
      .el-autocomplete{
        width: 64%;
      }
    }
    &.dose2 {
      .el-input {
        width: 30%;
      }
      .el-select {
        width: 40%;
      }
      .fSelect {
        width: 60%;
      }
      .el-autocomplete{
        width: 60%;
      }
    }
    &.dose3 {
      .el-select {
        width: 60%;
      }
      .el-input {
        width: 40%;
      }
      .spans {
        display: inline-block;
        font-size: 12px;
      }
    }
    &.dosedate{
      .el-input{
        width: 60%;
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
        >div {
            border-right: 1px solid #ccc;
            &:last-of-type {
                border-right: 0;
            }
        }
    }
    &.line0{
      border-top: 1px dashed #ccc;
      padding-top: 10px;
    }
    &.line2{
        margin-top: 30px;
        .el-autocomplete{
          width: 60%;
        }
    }
    &.line3{
      padding-bottom: 10px;
      border-bottom: 1px dashed #ccc;
    }
    .el-button {
      width: 100px;
      height: 35px;
      margin-right: 5%;
      margin-top: 5px;
    }
    &.inputs{
      margin-top: 20px;
      margin-right: 20px;
  }
  &.inputs{
      margin-top: 20px;
      margin-right: 20px;
      .el-textarea{
        width: 400px;
      }
      span{
        line-height: 75px;
      }
  }
}

.addinputs{
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
  top: 45px;
  left: 0;
  opacity: .7;
}
// 联想样式
.thinkName {
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
.doctorMsg {
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
