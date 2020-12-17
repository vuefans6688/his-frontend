<template>
    <div class="pay_detail">
        <div class="header">
            <el-row>
                <el-col :span='7'>客户姓名： {{feeMsg.name}}</el-col>
                <el-col :span='1' class="empty">&nbsp;</el-col>
                <el-col :span='7'>客户手机： {{feeMsg.phone}}</el-col>
                <el-col :span='1' class="empty">&nbsp;</el-col>
                <el-col :span='3'>性别： {{feeMsg.gender | SexState}}</el-col>
                <el-col :span='1' class="empty">&nbsp;</el-col>
                <el-col :span='4'>年龄： {{age}}</el-col> 
            </el-row>
            <el-row>
                <el-col :span='7'>就诊编号： {{feeMsg.registid}}</el-col>
                <el-col :span='1' class="empty">&nbsp;</el-col>
                <el-col :span='7'>就诊科室： {{feeMsg.deptname}}</el-col>
                <el-col :span='1' class="empty">&nbsp;</el-col>
                <el-col :span='8'>就诊医师： {{feeMsg.doctorname}}</el-col>
            </el-row>
        </div>
        <div class="content">
          <el-row class="title">
              <el-col :span='1'>
                  <el-checkbox v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
              </el-col>
              <el-col :span="5">收费项目</el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="5">单价</el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="5">数量</el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="5">金额（元）</el-col>
          </el-row>
          <ul class="fee_list" v-for="(item, index) in feeMsg.items" :key="index">
            <li v-if="item.type === 1" v-show='false'>
              <el-row >
                <el-col :span="1"><el-checkbox v-model="item.isChecked" disabled></el-checkbox></el-col>
                <el-col :span="5">{{item.data.feename}}</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{item.data.feeprice | PriceFilter}}元</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">1{{item.data.feeunit}}</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{item.data.feeprice | PriceFilter}}元</el-col>
              </el-row>
            </li>
             <li v-else-if="item.type === 2">
              <el-row>
                <el-col :span='1'><el-checkbox v-model="item.isChecked" @change="selectOneItem($event, index)"></el-checkbox></el-col>
                <el-col :span='23'>
                  <span v-if="item.data.prescript_type === 1">西药处方{{item.data.prescript_id | indexfilter(1, feeMsg.items)}}</span>
                  <span v-if="item.data.prescript_type === 2">中药处方{{item.data.prescript_id | indexfilter(2, feeMsg.items)}}</span>
                  <span v-if="item.data.prescript_type === 3">输液处方{{item.data.prescript_id | indexfilter(3, feeMsg.items)}}</span>
                </el-col>
              </el-row>
              <el-row v-for="(drug_item, index2) in item.data.drug_list" :key="index2">
                <el-col :span='2'>&nbsp;</el-col>
                <el-col :span='4'>{{drug_item.name}}</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{drug_item.price | PriceFilter}}元
                  <span class='unit'>/{{drug_item.price_unit}}</span>
                  <span class="china_dosage" v-show="item.data.prescript_type === 2">&nbsp;({{drug_item.spec_text}})</span>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <span class="china_dosage" v-show="item.data.prescript_type === 2">{{drug_item.dosage}}{{drug_item.dose_unit}}*</span>
                  {{drug_item.total}}{{drug_item.total_unit}}&nbsp;
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{drug_item.total_price | PriceFilter}}元&nbsp;</el-col>
              </el-row>
              <el-row>
                <el-col :span="19" class="align_rigth">&nbsp;</el-col>
                <el-col :span="5">合计： {{item.data.total_price | PriceFilter}} 元</el-col>
              </el-row> 
            </li> 
            <li v-else>
              <el-row>
                <el-col :span="1"><el-checkbox v-model="item.isChecked" @change="selectOneItem($event, index)"></el-checkbox></el-col>
                <el-col :span="5">{{item.data.name}}</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{item.data.price | PriceFilter}}元</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{item.data.total}} {{item.data.total_unit}}</el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">{{item.data.total_price | PriceFilter}}元</el-col>
              </el-row>
            </li> 
          </ul>
        </div>
        <div class="footer">
            累计消费金额： <span>￥{{ totalPrice | PriceFilter }}元</span>
            <p class="pullRight">
                <el-button type="primary" size='small' @click='showCharge'>收费</el-button>
                <el-button @click='back' type="info" size='small'>取消</el-button> 
            </p>
        </div>
        <Pay v-if='isShowCharge' :chargeList='selectedChargeItems' @isCharge='is_charge' @hisChargeRegist='getFeeDetail'></Pay>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pay from '@/components/Pay';
import deepcopy from '@/utils/deepcopy';
import { feeDetail } from '@/serviceNormal/apiNormal';
import { calculateFromBirth } from '@/utils/ageTransfer';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    return {
      feeMsg: {},
      isShowCharge: false,    // 收费窗口
      selectedChargeItems: {},
    };
  },
  methods: {
    // 返回待收费列表
    back() {
      this.$router.replace({ path: '/navigator/payCharges/payChargesList' });
    },
    // 弹出收费
    showCharge() {
      this.$set(this.feeMsg, 'total_price', this.totalPrice);
      // 剔除没有选中的条目
      this.deleteNoSelect();
      this.$emit('destroyScroll');
      this.isShowCharge = true;
    },
    // 剔除没有勾选的
    deleteNoSelect() {
      if (!this.feeMsg.items) {
        return;
      }
      const list = deepcopy(this.feeMsg.items);
      const targetArr = list.filter((obj) => {
        return obj.isChecked;
      });
      this.selectedChargeItems = deepcopy(this.feeMsg);
      this.selectedChargeItems.items = targetArr;
    },
    is_charge(flag) {
      // 取消收费
      if (flag === 'cancel') {
        this.isShowCharge = false;
        this.getFeeDetail();
        this.$emit('initScroll');
      } else if (flag === 'success') {  // 收费成功
        this.$message.success({
          message: '收费成功',
          duration: 1000,
          showClose: true,
        });
        this.isShowCharge = false;
        this.$emit('initScroll');
        setTimeout(() => {
          this.back();
        }, 1000);
      }
    },
    // 是否选中所有
    handleCheckAllChange(isCheckAll) {
      if (!this.feeMsg.items) {
        return isCheckAll;
      }
      this.feeMsg.items.forEach((elem, index) => {
        if (this.feeMsg.items[index].type !== 1) {
          this.feeMsg.items[index].isChecked = isCheckAll;
        }
      });
    },
    // 选中或取消单个
    selectOneItem(check, index) {
      this.feeMsg.items[index].isChecked = check;
    },
    // 获取收费详情
    getFeeDetail() {
      const registid = this.$route.params.registid;
      httpServerNormal(feeDetail, {
        registid: registid,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.feeMsg = res;
          // 为每条记录设置选中状态，方便后面勾选
          if (!this.feeMsg.items) {
            return;
          }
          this.feeMsg.items.forEach((elem, index) => {
            this.$set(this.feeMsg.items[index], 'isChecked', true);
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic']),
    age() {
      return calculateFromBirth(this.feeMsg.birthdate);
    },
    checkAll: {
      get() {
        if (!this.feeMsg.items) {
          return true;
        }
        return this.feeMsg.items.filter((obj) => {
          return obj.isChecked === false;
        }).length === 0;
      },
      set() {},
    },
    totalPrice() {
      if (!this.feeMsg.items) {
        return 0;
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.isChecked;
      });
      let price = 0;
      selectItems.forEach((obj) => {
        if (obj.data.feeprice || obj.data.feeprice === 0) {
          price += obj.data.feeprice;
        } else {
          price += obj.data.total_price;
        }
      });
      return price;
    },
  },
  components: {
    Pay,
  },
  created() {
    this.getFeeDetail();
  },
  filters: {
    indexfilter(id, type, list) {
      // 设置处方index
      if (!list) {
        return;
      }
      // 筛选出处方
      const preceptionList = list.filter((obj) => {
        return obj.type === 2;
      }) || [];
      // 找出对应类型的处方
      const curTypePreceptionList = preceptionList.filter((obj) => {
        return obj.data.prescript_type === type;
      }) || [];
      // 找出该类型处方的下标
      const index = curTypePreceptionList.findIndex((obj) => {
        return obj.data.prescript_id === id;
      }) || 0;
      return index + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.pay_detail{
    position: relative;
    min-width: 76 0px;
    padding: 30px 40px;
    .el-row{ line-height: 30px; }
    .header{
        margin-bottom: 30px;
        border-bottom: 1px dashed #ccc;
        .el-row{
            margin-bottom: 10px;
        }
    }
    .content{
        margin-bottom: 60px;
        .title{
            background: #ccc;
            line-height: 30px;
            .el-col:first-of-type{
                text-align: center;
            }
        }
        .fee_list{
            .el-row{
                border-bottom: 1px dashed #ccc;
                .el-col:first-of-type{ text-align: center; }
                .align_rigth{
                  text-align: right;
                }
            }
        }
    }
    .footer{
        padding-top: 30px;
        border-top: 1px dashed #ccc;
        span {
            color: red;
            font-size: 18px;
            font-weight: 600;
        }
        .pullRight{
            float: right;
            margin-right: 200px;
        }
        .el-button{
            margin-right: 30px;
        }
    }
}

</style>

