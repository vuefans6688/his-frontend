<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-04 15:56:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-14 14:21:26
 -->
<template>
  <div class="preStyle">
    <div class="preTitle">
      <p>
        <span @click='print(1)'  v-if="checkId === 3"><i class="el-icon-printer"></i>门诊治疗单打印</span>
        <span @click='print(checkId)'>
          <i class="el-icon-printer"></i> 打印{{Title}}项目
        </span>
        <span @click='saveAsTemplate'>
          <i class="el-icon-circle-check-outline"></i> 保存为模板
        </span>
        <span @click="usePlates(Title)">
          <i class="el-icon-document"></i> 调用模板
        </span>
      </p>
    </div>
    <div class="checkStyle">
      <el-form class="demo-form-inline prescriptionInputs" align='center' size='mini' ref="checkItem" :model="checkItem">
        <el-form-item class="btm">
          <el-row class="preContentul">
            <el-col :span="2">序号</el-col>
            <el-col :span="6">{{Title}}项目</el-col>
            <el-col :span="4">数量</el-col>
            <el-col :span="3">单价（元）</el-col>
            <el-col :span="3">金额（元）</el-col>
            <el-col :span="3">状态</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-for="(item, index) in checkItem.items" :key='index'>
          <!-- 序号  -->
          <el-col :span="2">
            <el-form-item align='center'>
              <span>{{ (index + 1) }}</span>
            </el-form-item>
          </el-col>
          <!--项目名称  -->
          <el-col :span="6">
            <!-- :prop="'item.' + index + '.name'" -->
            <el-form-item :prop="'items.' + index + '.name'" :rules="{required: true, message: '项目名称不能为空', trigger: 'change'}">
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="item.name"
                :disabled="checkItem.otherMsg.isDisabled"
                v-if="item.status == 0"
                :fetch-suggestions="querySearch"
                placeholder="请选择项目名称"
                @select="(item) => { selectPayItem(item, index) }"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="{ item }">
                  <span style="float: left; width: 190px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;" >{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px; color: #56bc94; margin-left: 10px;" v-if="item.szsbzhenliaokey">社保</span>
                </template>
              </el-autocomplete>
              <span v-if="item.status != 0">{{item.name}}</span>
            </el-form-item>
          </el-col>
          <!--数量  -->
          <el-col :span="4">
            <el-form-item class="dose" align="left" :prop="'items.' + index + '.total'" :rules="{required: true, message: '数量不能为空', trigger: 'blur' }">
                <el-input v-model="item.total" class="inlineBlock" @keyup.native='numberInp("total")' @blur="calculate(index)" :disabled="checkItem.otherMsg.isDisabled" v-if="item.status == 0"></el-input>
                <p v-if="item.status != 0" class="textAlign">{{item.total}} <span>{{item.total_unit}}</span></p>
                <!-- <span v-if="item.status == 0">{{item.total_unit}}</span> -->
            </el-form-item>
          </el-col>
          <!--单价  -->
          <el-col :span="3">
            <el-form-item class="price" align='center'>
              <span>￥ {{ item.price | PriceFilter }}</span>
              <span v-if="item.status == 0">/{{item.total_unit}}</span>
            </el-form-item>
          </el-col>
          <!--金额  -->
          <el-col :span="3">
            <el-form-item align='center'>
              <span>￥ {{ item.total_price | PriceFilter }}</span>
            </el-form-item>
          </el-col>
          <!--操作  -->
          <el-col :span="3">
            <el-form-item align='center'>
              <span>{{item.status | statusFliter}}</span>
            </el-form-item>
          </el-col>
           <!-- 状态  -->
          <el-col :span="3">
            <el-form-item  align='center'>
              <i class="el-icon-delete" @click="del(item, index)" v-show="!checkItem.otherMsg.isDisabled && item.status === 0"></i>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item align='left'>
          <span class='addinputs' @click='addFormItem' v-show="!checkItem.otherMsg.isDisabled">
            <i class="el-icon-circle-plus-outline"></i>
            增加一行
            </span>
            <span class="totalMoney"> 
            合计：<strong> {{ checkItem.totalMoney | PriceFilter }}</strong>元
          </span>
        </el-form-item>
        <!-- 底部  -->
        <el-form-item align='right'>
          <div class="doctorMsg">
            <!-- <p> 医生：{{ patientMsg.doctorTip.name }}</p> -->
            <p>
              <span>医生：{{ patientMsg.doctorTip.name }}</span>
              <el-button type="primary" @click="submitForm('checkItem')" size='small' :disabled="ban" v-show='!checkItem.otherMsg.isDisabled'>保 存</el-button>
              <el-button type="primary" v-show='checkItem.otherMsg.isDisabled' @click="amendPre(patientMsg)">修改</el-button>
            </p>
            <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--调用模板  -->
    <div class="usePlate" v-if='usePlateWin'>
      <div class="container">
        <div class="close" @click='cancelCallTemplate'><i class="el-icon-circle-close"></i></div>
        <UsePlates :templateList='templateList' :templateType='itemtypeNum' @callball="templateCallBack"></UsePlates>
      </div>
    </div>
    <!--保存为模板窗  -->
    <SavaItemTemplate :items='checkItem.items' :itemtype='itemtypeNum' v-if='savaPlateWin' @cancel='cancelSaveTemplate'></SavaItemTemplate>
  </div>
</template>

<script>
import PinyinMatch from 'pinyin-match';
import { mapGetters, mapMutations } from 'vuex';
import { numberLimit } from '@/utils/inputLimit';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import connectionTest from '@/common/js/connection';
import { saveChargitem, deleteChargitem, getUserChargitemList, sbAuditApi } from '@apiNormal';
import { jsTimestampFilter } from '@/utils/filters';
import { AKF001 } from '@/common/js/dictionary';
// import Check from '../components/Check';
import UsePlates from '../components/UsePlates';
import SavaItemTemplate from '../components/SavaItemTemplate';

export default {
  data() {
    return {
      ban: false,
      usePlateWin: false,
      savaPlateWin: false,
      templateList: [],
      opener: null,
    };
  },
  props: {
    patientMsg: {
      type: Object,
    },
    Title: {
      type: String,
    },
    checkItem: {
      type: Object,
    },
    checkId: {
      type: Number,
    },
    itemtypeNum: {
      type: Number,
    },
    payList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapMutations(['set_printMsg']),
    usePlates() {  // 调用模板
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      if (this.checkItem.otherMsg.isDisabled) {
        this.$message.error('请先点击修改按钮');
        return;
      }
      this.$emit('destroyScroll');
      // this.getMedicalTemplateList();
      this.usePlateWin = true;
    },
    // 取消调用模板
    cancelCallTemplate() {
      this.usePlateWin = false;
      this.$emit('initScroll');
    },
    calculate(index) {  // 计算金额
      this.checkItem.items[index].total_price = this.checkItem.items[index].total * this.checkItem.items[index].price; // 计算当前价格;
      this.calculateAll();
    },
    calculateAll() {  // 计算总价
      let sum = 0;
      this.checkItem.items.forEach((val) => {
        sum += val.total_price;
      });
      this.checkItem.totalMoney = sum; // 超出库存提示
    },
    amendPre() {  // 修改
      this.checkItem.otherMsg.isDisabled = false; // 可修改处方
      this.getCheckPayList();
    },
    addFormItem() {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'warning', showClose: true, duration: 1000 });
        return;
      }
      let flag = true;
      this.checkItem.items.forEach((val) => {
        if (val.name === '') {
          flag = false;
        }
      });
      if (!flag) {
        // this.$message({ type: 'warning', message: '内容为空不能新增一行', showClose: true, duration: 1000 });
        return;
      }
      const json = {
        clinic_id: this.clinic,
        regist_id: this.patientMsg.registid,
        chargitem_id: '',
        name: '',
        item_type: this.checkId, // 0-未知，1挂号、2处方、3检查项、4耗材、5门诊购药、6其他"name": "抽血检查",
        total: '1',
        price: 0,
        total_price: 0,
        doctor: this.patientMsg.doctorTip.name,
        status: 0,
      };
      this.checkItem.items.push(json);
    },
    del(item, index) {
      switch (item.status) {
        case 1:
          this.$alert(`此诊疗项(${item.name})已收费`, '提示', {
            confirmButtonText: '确定',
            callback: () => {},
          });
          return;
        case 2:
          this.$alert(`此诊疗项(${item.name})已使用`, '提示', {
            confirmButtonText: '确定',
            callback: () => {},
          });
          return;
        default:
          if (item.diagn_chargitem_id) {
            this.$confirm(`此诊疗项(${item.name})已保存, 是否删除?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              this.delCheck(item, index);
            }).catch(() => {});
          } else {
            this.checkItem.items.splice(index, 1);
            this.calculateAll();
          }
          break;
      }
    },
    numberInp(str) { // 限制数字输入
      for (let i = 0; i < this.checkItem.items.length; i++) {
        this.checkItem.items[i][str] =
        numberLimit(this.checkItem.items[i][str]);
      }
    },
    querySearch(queryString, cb) {
      const payList = this.payList;
      const results = queryString ? payList.filter(this.createFilter(queryString)) : payList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (treat) => {
        return PinyinMatch.match(treat.name, queryString);
        // return (treat.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    selectPayItem(item, index) { // 选择收费项事件 chargitem_id
      this.checkItem.items[index].name = item.name;
      this.checkItem.items[index].chargitem_id = item.item_id;
      this.checkItem.items[index].price = item.price;
      this.checkItem.items[index].total_unit = item.unit;
      this.calculate(index);  // 调用计算
    },
    submitForm(formName) {  // 保存
      this.ban = true;
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        this.ban = false;
        return;
      }
      if (!this.patientMsg.medicalRecordsForm.medical_id) {
        this.$message({ message: '请先填写病历', type: 'warning', showClose: true, duration: 1000 });
        this.ban = false;
        return;
      }
      let flag = true;
      this.checkItem.items.forEach((val) => {
        if (val.total === '0') {
          flag = false;
        }
      });
      if (!flag) {
        this.$message({ message: '数量错误', type: 'error', showClose: true, duration: 1000 });
        this.ban = false;
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const arr = [];
          const payed = [];
          this.checkItem.items.map((val) => {
            val.total -= 0;
            delete (val.item);
            if (val.status === 0) {
              arr.push(val);
            } else {
              this.ban = false;
              payed.push(val);
            }
            if (payed.length === this.checkItem.items.length) {
              this.$message({ message: '无未缴费药药品或项目', type: 'error', showClose: true, duration: 1000 });
            }
            return arr;
          });
          if (arr.length) {
            this.saveCheck(arr);
          }
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          this.ban = false;
          return false;
        }
      });
    },
    saveCheck(array) {  // 保存收费项目
      httpServerNormal(saveChargitem, {
        items: array,
      }).then((res) => {
        if (res.includes('ERRORCODE') && res.includes(-1)) {
          this.ban = false;
          return;
        }
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '保存成功', type: 'success' });
          this.ban = false;
          this.checkItem.otherMsg.isDisabled = true;
          res.forEach((val, index) => {
            array[index].diagn_chargitem_id = val.diagn_chargitem_id;
          });
          // 智慧医保
          if (this.patientMsg.details.card_num && this.bindSbMsg.hospitalCode) {  // 此次挂号存在电脑号则走智慧医保
            this.getCheckPayList(true);
          }
        }
      }).catch(() => {
        this.ban = false;
      });
    },
    // 智慧医保
    sbAudit(items) {
      const item = items[0];
      const content = {
        tran_serial_no: this.bindSbMsg.hospitalCode + new Date().format('yyyyMMddhhmmss'),
        operate_person_code: this.bindSbMsg.operatorCode,
        operate_person_name: this.bindSbMsg.operatorName,
        operate_time: jsTimestampFilter(new Date().getTime(), 'yyyyMMdd'),
        visit_no: item.regist_id,
        medical_dept_code: item.departmentcode,
        medical_dept_name: AKF001.find((v) => { return v.key === item.departmentcode; }) ? AKF001.find((v) => { return v.key === item.departmentcode; }).value : '',
        visit_type: '2',   // 就诊类型（2门诊）
        medicine_type: '11',  // 医疗类别
        card_no: this.patientMsg.details.szsbcardid,
        pc_no: this.patientMsg.details.szsbcardid,
        patient_name: this.patientMsg.name,
        sex: this.patientMsg.gender + '',
        age: this.patientMsg.age.toString(),
        birth_date: this.patientMsg.birthdate.replace(/-/g, ''),
        region_code: '440300',
        insurance_type: '310',  // 险种类型
        doctor_code: item.doctorszsbid,
        doctor_name: item.doctorszsbname,
        doctor_advice_no: item.regist_id,   // 处方流水号
        diagnoses: [], // 门诊诊断信息
        advice_details: [],    // 医嘱明细信息
      };
      content.diagnoses = this.patientMsg.medicalRecordsForm.jibingjson.map((val, index) => {
        return {
          diagnose_no: (index + 1).toString(),
          diagnose_code: val.maincode ? val.maincode : (val.desc ? val.desc[0].split('-')[0] : val.split('-')[0]),
          diagnose_desc: val.jbname ? val.jbname : (val.desc ? val.desc[0].split('-')[1] : val.split('-')[1]),
        };
      });
      content.advice_details = items.map((v) => {
        return {
          project_code: v.item.szsbcode,
          hospital_code: this.bindSbMsg.hospitalCode,
          project_name: v.item.szsbname,
          is_out_recip: '1',  // 外配处方标志（0：非外配处方；1：外配处方）
          recipe_no: v.diagn_chargitem_id,  // 换成处方id
          price: v.item.szsbprice,
          medical_number: parseFloat(v.total),
          amount: v.total_price,
        };
      });
      httpServerNormal(sbAuditApi, {
        auth_token: this.bindSbMsg.zhihuiybtoken,
        content,
      }).then((res) => {
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
      });
    },
    delCheck(item, index) {  // 删除收费项
      httpServerNormal(deleteChargitem, {
        regist_id: this.patientMsg.registid,
        item_id: item.diagn_chargitem_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '删除成功', type: 'success', showClose: true, duration: 1000 });
          this.checkItem.items.splice(index, 1);
          this.calculateAll();
        }
      });
    },
    getCheckPayList(isAudit) {  // 获取客户收费项目列表
      httpServerNormal(getUserChargitemList, {
        status: -1,
        regist_id: this.patientMsg.registid,
      }).then(async (res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const arr1 = [];
          if (res && res.length) {
            res.forEach((val) => {
              if (val.item_type === this.checkId) {
                val.total += '';
                arr1.push(val);
              }
            });
          }
          this.checkItem.items = arr1;
          const items = this.checkItem.items.filter((v) => {
            return v.item.szsbcode && v.item.szsbstatus === 1 && v.item_type !== 7;
          }) || [];
          if (isAudit && items.length) {
            const connectionStatus = await connectionTest(true);
            if (connectionStatus !== '1') {
              return;
            }
            this.sbAudit(items);
          }
        }
      });
    },
    // 打印诊疗项
    print(type) {
      // type 1: 门诊治疗单 3: 诊疗项目打印 4: 耗材 6: 其他
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      if (!this.checkItem.items[0] || !this.checkItem.items[0].name) {
        this.$message({ message: '无诊疗项可供打印', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      const printMsg = deepcopy(this.patientMsg);
      this.set_printMsg(printMsg);
      const url = type === 1 ? '/print/cureListPrint' : `/print/treatmentPrint?checkId=${type}`;
      this.$nextTick(() => {
        window.open(url);
      });
    },
    // 调用模板的回调
    templateCallBack(data) {
      this.cancelCallTemplate();
      data.data.item_list.forEach((obj) => {
        const curItem = this.payList.find((chargeItem) => {
          return chargeItem.name === obj.name;
        });
        if (!curItem) {
          this.$message({ message: '模板中存在未设置收费项', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        this.addFormItem();
        const lastOne = this.checkItem.items.length - 1;
        this.checkItem.items[lastOne].name = obj.name;
        this.checkItem.items[lastOne].total = obj.total;
        this.selectPayItem(curItem, lastOne);
        this.calculate(lastOne);
      });
    },
    // 取消保存模板
    cancelSaveTemplate() {
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
      this.savaPlateWin = false;
    },
    // 保存为模板
    saveAsTemplate() {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.$emit('destroyScroll');
      this.savaPlateWin = true;
    },
  },
  components: {
    UsePlates, SavaItemTemplate,
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user', 'bindSbMsg']),
  },
  filters: {
    statusFliter(id) {   // 挂号类别
      switch (id) {
        case 0:
          return '未缴费';
        case 1:
          return '已缴费';
        case 2:
          return '已使用';
        case 3:
          return '已退费';
        default:
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.preStyle {
  padding: 20px 0 20px 5px;
  .preTitle {
    p {
      float: right;
      height: 30px;
      line-height: 30px;
      span {
        cursor: pointer;
        margin-right: 10px;
        font-size: 14px;
        &:hover {
          color: $mainColor;
        }
      }
    }
  }
  .checkStyle {
    margin-top: 20px;
  }
}

.demo-form-inline {
  padding: 20px;
}
.el-form-item {
  margin-bottom: 10px;
  font-size: 12px;
  // text-align: center;
  &.dose {
    text-align: center;
    .el-input {
      width: 75%;
    }
  }
  .textAlign {
    text-align: center;
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
  .el-autocomplete {
    width: 85%;
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
}

.addinputs {
  cursor: pointer;
  color: $mainColor;
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

.usePlate {
  // 调用模板
  @include modify_info;
  overflow: auto;
  .container{
    top: 100px;
    transform: translate(-50%, 0);
    min-height: 300px;
  }
}
</style>

