<template>
  <div class="preStyle">
    <div class="preTitle">
      <p>
        <span @click='saveAsTemplate'>
          <i class="el-icon-circle-check-outline"></i> 保存为模板
        </span>
        <span @click="usePlates('耗材项目')">
          <i class="el-icon-document"></i> 调用模板
        </span>
      </p>
    </div>
    <div class="checkStyle">
      <!-- <Check Title='项目名称' :checkMsg="patientMsg.checkItem" checkId="3" :patientMsg="patientMsg"></Check> -->
      <el-form class="demo-form-inline prescriptionInputs" align='center' size='small' ref="comsumables" :model="patientMsg.comsumables">
        <el-form-item class="btm">
          <el-row class="preContentul">
            <el-col :span="2">序号</el-col>
            <el-col :span="6">耗材名称</el-col>
            <el-col :span="4">数量</el-col>
            <el-col :span="3">单价（元）</el-col>
            <el-col :span="3">金额（元）</el-col>
            <el-col :span="3">状态</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-for="(item, index) in patientMsg.comsumables.items" :key='index'>
          <!-- 序号  -->
          <el-col :span="2">
            <el-form-item align='center'>
              <span>{{ (index + 1) }}</span>
            </el-form-item>
          </el-col>
          <!--项目名称  -->
          <el-col :span="6">
            <!-- :prop="'item.' + index + '.name'" -->
            <el-form-item :prop="'items.' + index + '.name'" :rules="{required: true, message: '耗材名称不能为空', trigger: 'blur'}">
              <el-select v-model="item.name" placeholder="请选择耗材名称" :disabled="patientMsg.comsumables.comsumablesStatus.isDisabled" v-if="item.status == 0">
                <el-option v-for="val in payList" :key="val.item_id" :label="val.name" :value="val.name" @click.native="selectPayItem(val, index)"></el-option>
              </el-select>
              <span v-if="item.status != 0">{{item.name}}</span>
            </el-form-item>
          </el-col>
          <!--数量  -->
          <el-col :span="4">
            <el-form-item class="dose" align="left" :prop="'items.' + index + '.total'" :rules="{required: true, message: '数量不能为空', trigger: 'blur' }">
                <!-- <el-input v-model="item.total" class="inlineBlock" @keyup.native='numberInp("total")'></el-input> -->
                <el-input v-model="item.total" class="inlineBlock" @keyup.native='numberInp("total")' @blur="calculate(index)" :disabled="patientMsg.comsumables.comsumablesStatus.isDisabled" v-if="item.status == 0"></el-input>
                <p v-if="item.status != 0" class="textAlign">{{item.total}} <span>{{item.total_unit}}</span></p>
                <span v-if="item.status == 0">{{item.total_unit}}</span>
            </el-form-item>
          </el-col>
          <!--单价  -->
          <el-col :span="3">
            <el-form-item class="price" align='center'>
              <span>￥ {{ item.price | PriceFilter }}</span>
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
              <i class="el-icon-delete" @click="del(item, index)" v-show="!patientMsg.comsumables.comsumablesStatus.isDisabled"></i>
              <!-- <i class="el-icon-delete" @click="del(index)" v-if="item.status != 0"></i> -->
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item align='left'>
          <span class='addinputs' @click='addFormItem' v-show="!patientMsg.comsumables.comsumablesStatus.isDisabled">
            <i class="el-icon-circle-plus-outline"></i>
            增加一行
          </span>
          <span class="totalMoney"> 
          合计：<strong> {{ patientMsg.comsumablesTotalMoney }}</strong>元
        </span>
        </el-form-item>
        <!-- 底部  -->
        <el-form-item align='right'>
          <div class="doctorMsg">
            <p> 医生：{{ patientMsg.doctorTip.name }}</p>
            <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
            <el-button type="primary" @click="submitForm('comsumables')" size='small' v-show='!patientMsg.comsumables.comsumablesStatus.isDisabled'>保 存</el-button>
            <el-button type="primary" v-show='patientMsg.comsumables.comsumablesStatus.isDisabled' @click="amendPre(patientMsg)">修改</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--调用模板  -->
    <div class="usePlate" v-show='usePlateWin'>
      <div class="container">
        <div class="close" @click='cancelCallTemplate'><i class="el-icon-circle-close"></i></div>
        <UsePlates :templateList='templateList' :templateType='6' @callball="templateCallBack"></UsePlates>
      </div>
    </div>
    <!--保存为模板窗  -->
    <SavaItemTemplate :items='patientMsg.comsumables.items' :itemtype='6' v-if='savaPlateWin' @cancel='cancelSaveTemplate'></SavaItemTemplate>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { numberLimit } from '@/utils/inputLimit';
import httpServerNormal from '@httpServerNormal';
import { getChargitemList } from '@apiNormal';
import UsePlates from '../components/UsePlates';
import SavaItemTemplate from '../components/SavaItemTemplate';


export default {
  data() {
    return {
      usePlateWin: false,
      savaPlateWin: false,
      payList: [],
      templateList: [],
    };
  },
  methods: {
    usePlates() {  // 调用模板
      if (this.patientMsg.comsumables.comsumablesStatus.isDisabled) {
        this.$message.error('请先点击修改按钮');
        return;
      }
      this.$emit('destroyScroll');
      this.getMedicalTemplateList();
      this.usePlateWin = true;
    },
    // 取消调用模板
    cancelCallTemplate() {
      this.usePlateWin = false;
      this.$emit('initScroll');
    },
    calculate(index) {  // 计算金额
      this.patientMsg.comsumables.items[index].total_price =
      this.patientMsg.comsumables.items[index].total *
        this.patientMsg.comsumables.items[index].price; // 计算当前价格;
      this.calculateAll();
    },
    calculateAll() {  // 计算总价
      let sum = 0;
      this.patientMsg.comsumables.items.forEach((val) => {
        sum += val.total_price;
      });
      this.patientMsg.comsumablesTotalMoney = sum; // 超出库存提示
    },
    amendPre() {  // 修改
      this.patientMsg.comsumables.comsumablesStatus.isDisabled = false; // 可修改处方
      this.getCheckPayList();
    },
    addFormItem() {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'warning', showClose: true, duration: 1000 });
        return;
      }
      const json = {
        clinic_id: this.clinic,
        regist_id: this.patientMsg.registid,
        chargitem_id: '',
        name: '',
        item_type: 4, // 0-未知，1挂号、2处方、3检查项、4耗材、5门诊购药、6其他"name": "抽血检查",
        total: '1',
        price: 0,
        total_price: 0,
        doctor: this.patientMsg.doctorTip.name,
        status: 0,
      };
      this.patientMsg.comsumables.items.push(json);
    },
    del(item, index) {
      switch (item.status) {
        case 1:
          this.$message.error('该项目已收费');
          return;
        case 2:
          this.$message.error('该项目已使用');
          return;
        default:
          break;
      }
      if (this.patientMsg.comsumables.items.length <= 1) {
        return;
      }
      this.patientMsg.comsumables.items.splice(index, 1);
      this.calculateAll();
    },
    numberInp(str) { // 限制数字输入
      for (let i = 0; i < this.patientMsg.comsumables.items.length; i++) {
        this.patientMsg.comsumables.items[i][str] =
        numberLimit(this.patientMsg.comsumables.items[i][str]);
      }
    },
    selectPayItem(item, index) { // 选择收费项事件 chargitem_id
      this.patientMsg.comsumables.items[index].chargitem_id = item.item_id;
      this.patientMsg.comsumables.items[index].price = item.price;
      this.patientMsg.comsumables.items[index].total_unit = item.unit;
      this.calculate(index);  // 调用计算
    },
    submitForm(formName) {  // 保存
      if (!this.patientMsg.registid) return;
      let flag = true;
      this.patientMsg.comsumables.items.forEach((val) => {
        if (val.total === '0' || val.price === 0) {
          flag = false;
        }
      });
      if (!flag) {
        this.$message.error('数量错误');
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const arr = [];
          this.patientMsg.comsumables.items.map((val) => {
            val.total -= 0;
            if (val.status === 0) {
              arr.push(val);
            }
            return arr;
          });
          if (arr.length) {
            this.saveCheck(arr);
          }
        } else {
          this.$message({ message: '信息有误', type: 'warning' });
          return false;
        }
      });
    },
    saveCheck(array) {  // 保存收费项目
      this.$http.post('/service/chargitem/save', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          items: array,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({ message: '保存成功', type: 'success' });
          this.patientMsg.comsumables.comsumablesStatus.isDisabled = true;
          res.data.data.forEach((val, index) => {
            array[index].diagn_chargitem_id = val.diagn_chargitem_id;
          });
        } else {
          this.$message.error(res.data.errmsg);
        }
      }).catch();
    },
    getPayList() {  // 获取收费项目
      httpServerNormal(getChargitemList, {
        disabled: 0,
        type: 4,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.payList = res && res.length ? res : [];
        }
      });
    },
    getCheckPayList() {  // 获取客户收费项目列表
      this.$http.post('/service/chargitem/list', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          status: -1,
          regist_id: this.patientMsg.registid,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          const arr = [];
          if (res.data.data) {
            res.data.data.forEach((val) => {
              if (val.item_type === 4) {
                arr.push(val);
              }
            });
          }
          this.patientMsg.comsumables.items = arr;
        } else {
          this.$message.error(res.data.errmsg);
        }
      }).catch(() => {
        this.$message.error('获取科室失败');
      });
    },
    // 获取诊疗项目模板
    getMedicalTemplateList() {
      this.$http.post('/service/template/list', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          type: 6,
          name: '',
          owner_type: 2,
          page_index: 0,
          page_size: 10000,
        },
      }).then((response) => {
        if (response.data.errcode === 0) {
          this.templateList = response.data.data.items || [];
        } else {
          this.$message.error(response.data.errmsg);
        }
      }).catch(() => {
      });
    },
    // 调用模板的回调
    templateCallBack(data) {
      this.cancelCallTemplate();
      data.data.item_list.forEach((obj) => {
        this.addFormItem();
        const curItem = this.payList.find((chargeItem) => {
          return chargeItem.name === obj.name;
        });
        const lastOne = this.patientMsg.comsumables.items.length - 1;
        this.patientMsg.comsumables.items[lastOne].name = obj.name;
        this.patientMsg.comsumables.items[lastOne].total = obj.total;
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
      this.$emit('destroyScroll');
      this.savaPlateWin = true;
    },
  },
  components: {
    UsePlates, SavaItemTemplate,
  },
  props: ['patientMsg'],
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  watch: {
    patientMsg() {
      if (this.patientMsg.comsumablesPayList.length) {
        this.patientMsg.comsumables.items = this.patientMsg.comsumablesPayList;
        this.patientMsg.comsumables.comsumablesStatus.isDisabled = true;
        this.calculateAll();
        // this.patientMsg.comsumables.items.map((val) => {
        //   val.total += '';
        //   return this.patientMsg.comsumables.items;
        // });
      }
    },
  },
  created() {
    this.getPayList();
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
  &.dose {
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
  .el-select {
    width: 95%;
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
  margin-right: 5%;
  p:nth-of-type(2) {
    color: red;
    font-weight: 600;
  }
  .el-button {
    margin-top: 10px;
    width: 100px;
    height: 35px;
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
.saveWin{  // 保存模板
  @include modify_info;
  .container{
    min-height: 200px;
  }
  .footer{
    margin-top: 30px;
    text-align: center;
  }
}
</style>

