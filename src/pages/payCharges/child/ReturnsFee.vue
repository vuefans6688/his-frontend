<template>
  <div class="detail">
     <div class="header">
      <el-row>
        <el-col :span='11'>
          <span>客户信息: {{feeMsg.name}}</span>
          <span v-show='feeMsg.gender'> -- {{feeMsg.gender | SexState}}</span>
          <span v-show='feeMsg.birthdate'> -- {{age}}岁</span>&nbsp;
        </el-col>
        <el-col :span='1' class="empty">&nbsp;</el-col>
        <el-col :span='12'>客户手机： {{feeMsg.phone}}</el-col>
      </el-row>
      <el-row>
        <el-col :span='11'>挂号: {{feeMsg.registid}}</el-col>
        <el-col :span='1' class="empty">&nbsp;</el-col>
        <el-col :span='12'>减免金额：<span class='highlight'>￥{{feeMsg.reduceprice}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span='1' class="empty">&nbsp;</el-col>
      </el-row>
      <el-row>
        <el-button type="primary" size='small' @click="call_list_print">清单打印</el-button>
        <!-- <el-button v-if='feeMsg.chargestatus === 1 && sbItems.length' type="primary" size='small' @click="sbBillPrint">社保发票补打</el-button> -->
        <!-- <el-button v-if='feeMsg.chargestatus === 1 && normalItems.length' type="primary" size='small' @click="normalBillPrint">自费项发票补打</el-button> -->
        <el-button v-if='feeMsg.chargestatus === 1 && sbItems.length' type="primary" size='small' @click="sbPrint(1)">社保收费收据补打</el-button>
        <el-button v-if='feeMsg.chargestatus === 1 && normalItems.length' type="primary" size='small' @click="normalPrint(1)">自费项收费收据补打</el-button>
        <el-button v-if='feeMsg.chargestatus === 2 && sbItems.length' type="primary" size='small' @click="sbPrint(2)">社保退费打印</el-button>
        <el-button v-if='feeMsg.chargestatus === 2 && normalItems.length' type="primary" size='small' @click="normalPrint(2)">自费退费打印</el-button>
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
        <el-col :span="4">金额（元）</el-col>
        <el-col :span="1">支付方式</el-col>
      </el-row>
      <ul class="fee_list" v-for="(item, index) in feeMsg.items" :key="index">
        <li v-if="item.chargetype === 1"></li>
        <li v-else-if="item.chargetype === 2">
          <el-row>
            <el-col :span='1'><el-checkbox v-model="item.isChecked" @change="selectOneItem($event, index)" 
              :disabled="!item.canBackFee"></el-checkbox></el-col>
            <el-col :span='22'>
              <span v-if="item.data.prescript_type === 1">西药处方{{item.data.prescript_id | indexfilter(1, feeMsg.items)}}</span>
              <span v-if="item.data.prescript_type === 2">中药处方{{item.data.prescript_id | indexfilter(2, feeMsg.items)}}</span>
              <span v-if="item.data.prescript_type === 3">输液处方{{item.data.prescript_id | indexfilter(3, feeMsg.items)}}</span>
              <span class='status'>({{item.data.status | prescriptStatus}})</span>
            </el-col>
            <el-col :span="1">{{item.paymethod | payMethod}}</el-col>
          </el-row>
          <el-row v-for="(drug_item, index2) in item.data.drug_list" :key="index2">
            <el-col :span='2'>&nbsp;</el-col>
            <el-col :span='4'>{{drug_item.name}}</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <span>
                <i v-if='item.paymethod===5&&drug_item.druginfo.szsbstatus===1'>{{drug_item.druginfo.shebao_price | PriceFilter}}</i>
                <i v-else>{{drug_item.price | PriceFilter}}</i>              
                元/{{drug_item.price_unit}}
              </span>
              <span class="china_dosage" v-show="item.data.prescript_type === 2">&nbsp;({{drug_item.spec_text}})</span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <span class="west_dosage" v-show="item.data.prescript_type === 2">{{drug_item.dosage}}{{drug_item.dose_unit}}*</span>
              {{drug_item.total}}{{drug_item.total_unit}}&nbsp;
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <span>
                <i>{{drug_item.total_price | PriceFilter}}</i>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19" class="align_rigth">&nbsp;</el-col>
            <el-col :span="5">合计： 
              <i>{{item.total_price | PriceFilter}}</i>
            </el-col>
          </el-row> 
        </li> 
        <li v-else-if="item.chargetype === 5">
          <el-row>
            <el-col :span='1'><el-checkbox v-model="item.isChecked" @change="selectOneItem($event, index)" 
              :disabled="!item.canBackFee"></el-checkbox></el-col>
            <el-col :span='22'>
              <span>门诊零售</span>
              <span class='status'>({{item.data.status | prescriptStatus}})</span>
            </el-col>
            <el-col :span="1">{{item.paymethod | payMethod}}</el-col>
          </el-row>
          <el-row v-for="(drug_item, index2) in item.data.drug_list" :key="index2">
            <el-col :span='2'>&nbsp;</el-col>
            <el-col :span='4'>{{drug_item.name}}</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">{{drug_item.price | PriceFilter}}元/{{drug_item.price_unit}}
              <span class="china_dosage" v-show="drug_item.drug_type === 1">&nbsp;({{drug_item.spec}})</span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">{{drug_item.total}}{{drug_item.total_unit}}&nbsp;</el-col>
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
            <el-col :span="1"><el-checkbox v-model="item.isChecked" @change="selectOneItem($event, index)" 
              :disabled="!item.canBackFee"></el-checkbox></el-col>
            <el-col :span="5">{{item.data.name}}<span class='status'>({{item.data.status | otherStatus}})</span></el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <span v-if='item.paymethod===5&&item.data.item.szsbstatus===1'>{{item.data.item.szsbprice | PriceFilter}}</span>
              <span v-else>{{item.data.price | PriceFilter}}</span>元
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">{{item.data.total}}{{item.data.total_unit}}</el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="4"><span>{{item.total_price}}</span></el-col>
            <el-col :span="1">{{item.paymethod | payMethod}}</el-col>
          </el-row>
        </li> 
      </ul>
    </div>
    <div class="footer" v-show='feeMsg.chargestatus === 1'>
      <p>应退金额(元)： 
        <span class="price_bold" v-if='this.feeMsg.paymethod === 5'>￥{{ totalPrice2 }}</span>
        <span class="price_bold" v-else>￥{{ totalPrice }}</span>
        <span v-show='this.feeMsg.paymethod === 5'>(社保：{{sbFee}}元, 自费: {{personalFee}}元)</span>
      </p>
      <p v-show='this.feeMsg.paymethod !== 5'>实退金额(元)： <el-input class='real_return_fee' v-model="realReturnFee" size='small' @keyup.native="returnPriceLimit"></el-input></p>
      <div class="operation">
        <p class='warn_text'>温馨提示：当前退费为不可逆动作，请谨慎操作！</p>
        <div>
          <el-button type="primary" size='small' @click="isBackFee" :disabled="!selectedItems.length">确认退费</el-button>
          <el-button type="info" size='small' @click="back">取消</el-button> 
        </div>
      </div>
    </div>
    <div class="footer" v-show='feeMsg.chargestatus === 2'>
      <el-button type="info" size='small' @click="back">返回</el-button> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { floatLimit } from '@/utils/inputLimit';
import { BCC334 } from '@/common/js/dictionary';
import connection from '@/common/js/connection';
import { backFeeDetail2, payedRefund, jycancel } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    return {
      feeMsg: {},
      // 实际退费金额
      realReturnFee: '',
    };
  },
  methods: {
    ...mapMutations(['set_feePrintMsg']),
    call_list_print() {
      this.feeMsg.discount = this.feeMsg.reduceprice;
      this.feeMsg.needPay = this.feeMsg.totalprice.toFixed(2);
      this.feeMsg.realPay = this.feeMsg.realprice.toFixed(2);
      this.set_feePrintMsg(this.feeMsg);
      window.open('/print/feePrint');
    },
    // 收据打印
    sbPrint(type) {
      const printData = {};

      this.$set(printData, 'type', type);

      this.sbItems = this.sbItems.sort((a, b) => {
        return b.szsbrecord.personleft - a.szsbrecord.personleft;
      });

      const personleftbp = type === 1 ? this.sbItems[0].szsbrecord.personleftbp : this.sbItems[this.sbItems.length - 1].szsbrecord.personleft;
      const personleft = type === 1 ? this.sbItems[this.sbItems.length - 1].szsbrecord.personleft : this.sbItems[0].szsbrecord.personleftbp;

      this.$set(printData, 'reg_time', this.feeMsg.reg_time);
      this.$set(printData, 'phone', this.feeMsg.phone);
      this.$set(printData, 'name', this.sbItems[0].szsbrecord.patientname);
      this.$set(printData, 'liushui', this.feeMsg.registid);
      this.$set(printData, 'danju', this.feeMsg.chargeid);
      this.$set(printData, 'yiliaoCard', this.sbItems[0].szsbrecord.yiliaohao);
      this.$set(printData, 'computerCard', this.sbItems[0].szsbrecord.diannaohao);
      this.$set(printData, 'BCC334', this.sbItems[0].szsbrecord.bcc334 ? BCC334.find(v => v.key === this.sbItems[0].szsbrecord.bcc334).value : BCC334[0].value);
      this.$set(printData, 'personleftbp', personleftbp);
      this.$set(printData, 'personleft', personleft);

      // 清单
      this.$set(printData, 'list', this.sbItems);

      // 药品
      let checkTotalPrice = 0;
      let westTotalPrice = 0;
      let zhongchengTotalPrice = 0;
      let zhongcaoTotalPrice = 0;
      let otherTotalPrice = 0;

      // 支付组成
      let printSbTotal = 0;
      let printsbCash = 0;
      let printSbAccount = 0;
      let printSbJijin = 0;

      this.sbItems.forEach((item) => {
        printSbTotal += item.szsbrecord.total;
        printsbCash += item.szsbrecord.personpay;
        printSbAccount += item.szsbrecord.personaccount;
        printSbJijin += item.szsbrecord.jijinpay;

        if (item.szsbrecord.outputlist && item.szsbrecord.outputlist.outputlist1) {
          const list = item.szsbrecord.outputlist.outputlist1;
          list.forEach((v) => {
            if (v.aka111 === '06' || v.aka111 === '07') { // 检查治疗
              checkTotalPrice += v.bka058;
            } else if (v.aka111 === '02') {
              westTotalPrice += v.bka058;
            } else if (v.aka111 === '04') {
              zhongchengTotalPrice += v.bka058;
            } else if (v.aka111 === '03' || v.aka111 === '05') {
              zhongcaoTotalPrice += v.bka058;
            } else {
              otherTotalPrice += v.bka058;
            }
          });
        }
      });

      if (type === 2) { // 退费
        checkTotalPrice = -checkTotalPrice;
        westTotalPrice = - westTotalPrice;
        zhongchengTotalPrice = - zhongchengTotalPrice;
        zhongcaoTotalPrice = - zhongcaoTotalPrice;
        otherTotalPrice = - otherTotalPrice;

        printSbTotal = - printSbTotal;
        printsbCash = - printsbCash;
        printSbAccount = - printSbAccount;
        printSbJijin = - printSbJijin;
      }

      this.$set(printData, 'checkTotalPrice', checkTotalPrice);
      this.$set(printData, 'westTotalPrice', westTotalPrice);
      this.$set(printData, 'zhongchengTotalPrice', zhongchengTotalPrice);
      this.$set(printData, 'zhongcaoTotalPrice', zhongcaoTotalPrice);
      this.$set(printData, 'otherTotalPrice', otherTotalPrice);

      this.$set(printData, 'printSbTotal', printSbTotal);
      this.$set(printData, 'printsbCash', printsbCash);
      this.$set(printData, 'printSbAccount', printSbAccount);
      this.$set(printData, 'printSbJijin', printSbJijin);

      this.set_feePrintMsg([printData]);
      window.open('/print/feePrint2');
    },
    // 非社保收据
    normalPrint(type) {
      const printData = {};

      this.$set(printData, 'type', type);
      this.$set(printData, 'reg_time', this.feeMsg.reg_time);

      this.$set(printData, 'name', this.feeMsg.name);
      this.$set(printData, 'phone', this.feeMsg.phone);
      this.$set(printData, 'liushui', this.feeMsg.registid);
      this.$set(printData, 'danju', this.feeMsg.chargeid);

      let printSbTotal = 0;
      let reduce = this.feeMsg.reduceprice;

      // 药品
      let checkTotalPrice = 0;
      let westTotalPrice = 0;
      let zhongchengTotalPrice = 0;
      let zhongcaoTotalPrice = 0;
      let otherTotalPrice = 0;

      this.normalItems.forEach((item) => {
        printSbTotal += item.total_price;
        if (item.chargetype === 3) {    // 检验检查
          checkTotalPrice += item.total_price;
        } else if (item.chargetype === 4 || item.chargetype === 6 || item.chargetype === 7) {   // 其他
          otherTotalPrice += item.total_price;
        } else if (item.chargetype === 2) {   // 处方
          item.data.drug_list.forEach((drug) => {
            if (drug.druginfo.drugclass === '1') {  // 西药
              westTotalPrice += drug.total_price;
            } else if (drug.druginfo.drugclass === '2') { // 中成药
              zhongchengTotalPrice += drug.total_price;
            } else if (drug.druginfo.drugclass === '3' || drug.druginfo.drugclass === '4') {
              zhongcaoTotalPrice += drug.total_price;
            }
          });
        }
      });

      if (type === 2) { // 退费
        checkTotalPrice = -checkTotalPrice;
        westTotalPrice = - westTotalPrice;
        zhongchengTotalPrice = - zhongchengTotalPrice;
        zhongcaoTotalPrice = - zhongcaoTotalPrice;
        otherTotalPrice = - otherTotalPrice;
        printSbTotal = - printSbTotal;
        reduce = -reduce;
      }

      this.$set(printData, 'checkTotalPrice', checkTotalPrice);
      this.$set(printData, 'westTotalPrice', westTotalPrice);
      this.$set(printData, 'zhongchengTotalPrice', zhongchengTotalPrice);
      this.$set(printData, 'zhongcaoTotalPrice', zhongcaoTotalPrice);
      this.$set(printData, 'otherTotalPrice', otherTotalPrice);

      this.$set(printData, 'printSbTotal', printSbTotal);
      this.$set(printData, 'printsbCash', printSbTotal - reduce);
      this.$set(printData, 'printSbAccount', 0);
      this.$set(printData, 'printSbJijin', 0);

      this.set_feePrintMsg([printData]);
      window.open('/print/feePrint2');
    },
    // 发票补打
    // 1 社保
    sbBillPrint() {
      const printData = {};

      this.$set(printData, 'type', 1);
      this.$set(printData, 'isSb', true);  // 是否社保
      this.$set(printData, 'deptname', this.feeMsg.deptname);

      this.sbItems = this.sbItems.sort((a, b) => {
        return b.szsbrecord.personleftbp - b.szsbrecord.personleftbp;
      });

      const personleftbp = this.sbItems[0].szsbrecord.personleftbp;
      const personleft = this.sbItems[this.sbItems.length - 1].szsbrecord.personleft;

      this.$set(printData, 'name', this.sbItems[0].szsbrecord.patientname);
      this.$set(printData, 'liushui', this.feeMsg.registid);
      this.$set(printData, 'danju', this.feeMsg.chargeid);
      this.$set(printData, 'yiliaoCard', this.sbItems[0].szsbrecord.yiliaohao);
      this.$set(printData, 'computerCard', this.sbItems[0].szsbrecord.diannaohao);
      this.$set(printData, 'personleftbp', personleftbp);
      this.$set(printData, 'personleft', personleft);

      // 药品
      let checkTotalPrice = 0;
      let westTotalPrice = 0;
      let zhongchengTotalPrice = 0;
      let zhongcaoTotalPrice = 0;
      let otherTotalPrice = 0;

      // 支付组成
      let printSbTotal = 0;
      let printsbCash = 0;
      let printSbAccount = 0;
      let printSbJijin = 0;

      this.sbItems.forEach((item) => {
        printSbTotal += item.szsbrecord.total;
        printsbCash += item.szsbrecord.personpay;
        printSbAccount += item.szsbrecord.personaccount;
        printSbJijin += item.szsbrecord.jijinpay;

        if (item.szsbrecord.outputlist && item.szsbrecord.outputlist.outputlist1) {
          const list = item.szsbrecord.outputlist.outputlist1;
          list.forEach((v) => {
            if (v.aka111 === '06' || v.aka111 === '07') { // 检查治疗
              checkTotalPrice += v.bka058;
            } else if (v.aka111 === '02') {
              westTotalPrice += v.bka058;
            } else if (v.aka111 === '04') {
              zhongchengTotalPrice += v.bka058;
            } else if (v.aka111 === '03' || v.aka111 === '05') {
              zhongcaoTotalPrice += v.bka058;
            } else {
              otherTotalPrice += v.bka058;
            }
          });
        }
      });

      this.$set(printData, 'checkTotalPrice', checkTotalPrice);
      this.$set(printData, 'westTotalPrice', westTotalPrice);
      this.$set(printData, 'zhongchengTotalPrice', zhongchengTotalPrice);
      this.$set(printData, 'zhongcaoTotalPrice', zhongcaoTotalPrice);
      this.$set(printData, 'otherTotalPrice', otherTotalPrice);

      this.$set(printData, 'printSbTotal', printSbTotal);
      this.$set(printData, 'printsbCash', printsbCash);
      this.$set(printData, 'printSbAccount', printSbAccount);
      this.$set(printData, 'printSbJijin', printSbJijin);

      this.set_feePrintMsg([printData]);
      window.open('/print/billPrint');
    },
    // 2 自费项
    normalBillPrint() {
      const printData = {};

      this.$set(printData, 'type', 1);

      this.$set(printData, 'isSb', false);  // 是否社保

      this.$set(printData, 'deptname', this.feeMsg.deptname);

      this.$set(printData, 'name', this.feeMsg.name);
      this.$set(printData, 'liushui', this.feeMsg.registid);
      this.$set(printData, 'danju', this.feeMsg.chargeid);

      let printSbTotal = 0;
      const reduce = this.feeMsg.reduceprice;

      // 药品
      let checkTotalPrice = 0;
      let westTotalPrice = 0;
      let zhongchengTotalPrice = 0;
      let zhongcaoTotalPrice = 0;
      let otherTotalPrice = 0;

      this.normalItems.forEach((item) => {
        printSbTotal += item.total_price;
        if (item.chargetype === 3) {    // 检验检查
          checkTotalPrice += item.total_price;
        } else if (item.chargetype === 4 || item.chargetype === 6 || item.chargetype === 7) {   // 其他
          otherTotalPrice += item.total_price;
        } else if (item.chargetype === 2) {   // 处方
          item.data.drug_list.forEach((drug) => {
            if (drug.druginfo.drugclass === '1') {  // 西药
              westTotalPrice += drug.total_price;
            } else if (drug.druginfo.drugclass === '2') { // 中成药
              zhongchengTotalPrice += drug.total_price;
            } else if (drug.druginfo.drugclass === '3' || drug.druginfo.drugclass === '4') {
              zhongcaoTotalPrice += drug.total_price;
            }
          });
        }
      });

      this.$set(printData, 'checkTotalPrice', checkTotalPrice);
      this.$set(printData, 'westTotalPrice', westTotalPrice);
      this.$set(printData, 'zhongchengTotalPrice', zhongchengTotalPrice);
      this.$set(printData, 'zhongcaoTotalPrice', zhongcaoTotalPrice);
      this.$set(printData, 'otherTotalPrice', otherTotalPrice);

      this.$set(printData, 'printSbTotal', printSbTotal);
      this.$set(printData, 'printsbCash', printSbTotal - reduce);
      this.$set(printData, 'printSbAccount', 0);
      this.$set(printData, 'printSbJijin', 0);

      this.set_feePrintMsg([printData]);
      window.open('/print/billPrint');
    },
    // 限制退费价格输入
    returnPriceLimit() { // 限制数字输入
      this.realReturnFee = floatLimit(this.realReturnFee, 2);
    },
    // 获取费用信息
    getFeeDetail(registid, chargestatus) {
      httpServerNormal(backFeeDetail2, {
        registid,
        chargestatus: parseInt(chargestatus, 10),
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.feeMsg = res || {};
          // 为每条记录设置选中状态，方便后面勾选
          if (!this.feeMsg.items) {
            return;
          }
          this.feeMsg.items.forEach((elem, index) => {
            this.$set(this.feeMsg.items[index], 'isChecked', false);
          });
          // 记录设置是否禁用(不能退费的需要禁用)
          this.setDisabled();
        }
      });
    },
    // 设置每条记录是否可以退费
    setDisabled() {
      if (!this.feeMsg.items) {
        return;
      }
      this.feeMsg.items.forEach((item, index) => {
        let canBackFee = false;
        if (item.chargetype === 1) {
          canBackFee = (item.data.feestatus === 1)
            && (item.data.status === 1 || item.data.status === 4);
        } else if (item.chargetype === 2 || item.chargetype === 5) {
          canBackFee = item.data.status === 1 || item.data.status === 3;
        } else {
          canBackFee = item.data.status === 1;
        }
        this.$set(this.feeMsg.items[index], 'canBackFee', canBackFee);
      });
    },
    // 是否选中所有
    handleCheckAllChange(isCheckAll) {
      if (!this.feeMsg.items) {
        return isCheckAll;
      }
      this.feeMsg.items.forEach((elem, index) => {
        if (elem.canBackFee) {
          this.feeMsg.items[index].isChecked = isCheckAll;
        }
      });
    },
    // 选中或取消单个
    selectOneItem(check, index) {
      this.feeMsg.items[index].isChecked = check;
    },
    back() {
      this.$router.push({ path: '/navigator/payCharges/payChargesHistory' });
    },
    // 是否退费
    async isBackFee() {
      // 如果需要调社保客户端退费
      if (this.sbClientList.length) {
        // 检查是否连接社保
        const flag = await connection();
        if (flag !== '1') {
          return;
        }
        this.$confirm('当前退费为不可逆动作,是否退费？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.sbBackFee(this.sbClientList, 0);
        }).catch(() => {});
        return;
      }
      // 如果退费金额未填，不允许退费
      if (this.feeMsg.paymethod !== 5 && !this.realReturnFee) {
        this.$message.error({
          message: '请填写退费金额',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      // 如果退费金额超出总金额，将阻止
      const realReturnFee = this.realReturnFee ? parseFloat(this.realReturnFee) : 0;
      if (realReturnFee > this.totalPrice) {
        this.$message.error({
          message: '退费金额不能大于实际金额',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      this.$confirm('当前退费为不可逆动作,是否退费？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.getNeedBackFeeList();
      }).catch(() => {});
    },
    // 整理退费条目
    getNeedBackFeeList() {
      // 添加退费条目
      const list = [];
      this.selectedItems.forEach((element) => {
        const obj = {};
        obj.chargetype = element.chargetype;
        obj.paymethod = element.paymethod;
        if (element.chargetype === 1) {
          obj.chargetypeid = element.data.registid;
        } else if (element.chargetype === 2) {
          obj.chargetypeid = element.data.prescript_id;
        } else if (element.chargetype === 3 || element.chargetype === 4 || element.chargetype === 6 || element.chargetype === 7) {
          obj.chargetypeid = element.data.diagn_chargitem_id;
        } else if (element.chargetype === 5) {
          obj.chargetypeid = element.data.drug_sales_id;
        }
        if (element.paymethod === 5) {
          const record = element.szsbrecord;
          record.chargestatus = new Date(element.szsbrecord.szsbtime).getMonth() === new Date().getMonth() ? 2 : 3;
          obj.szsbrecord = record;
          obj.total_price = element.szsbrecord.total;
        } else {
          obj.total_price = element.total_price;
        }
        list.push(obj);
      });
      this.backFee(list);
    },
    // 退费请求
    backFee(needBackFeeList) {
      let total = parseFloat(this.totalPrice);
      let realReturn = parseFloat(this.realReturnFee);  // 实退金额
      const discount = parseFloat(this.feeMsg.reduceprice);  // 退费时应当去掉折扣
      let paymethod = 1;
      // 存在社保退费
      if (this.feeMsg.paymethod === 5) {
        realReturn = parseFloat(this.personalFee);
        paymethod = 5;
        total = parseFloat(this.totalPrice2);
      }

      httpServerNormal(payedRefund, {
        patientid: this.feeMsg.patientid,
        registid: this.feeMsg.registid,
        totalprice: total,
        realprice: realReturn,
        reduceprice: discount,
        paymethod: paymethod, // 一期默认现金方式退费
        payprice: realReturn,
        items: [...needBackFeeList],
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.$message.success({ message: '退费成功', duration: 1000, showClose: true });
          this.back();
        }
      });
    },
    // 社保退费
    sbBackFee(list, index) {
      // let uri = '';
      // const month = new Date(list[index].szsbrecord.szsbtime).getMonth();
      // uri = month === new Date().getMonth() ? jydrop : jycancel;
      httpServerNormal(jycancel, {
        transBody: {
          akc190: this.feeMsg.registid,
          bke384: list[index].szsbrecord.jigousn,
        },
      }).then(async (res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          console.log();
          // this.sbBackFee(list, index);
        } else {
          await this.hisBackFeeByItem(list[index]);
          await this.delay(200);
          if (index < list.length - 1) {
            this.sbBackFee(list, index + 1);
          } else {
            this.getNeedBackFeeListAfterSb();
          }
        }
      });
    },
    /**
     * @name: hisBackFeeByItem
     * @description: 对应社保退费, 社保退一单, his退一单
     * @param {type} element: 当前执行的处方单
     * @return: Promise
     */
    hisBackFeeByItem(element) {
      const obj = {};
      obj.chargetype = element.chargetype;
      obj.paymethod = element.paymethod;
      if (element.chargetype === 1) {
        obj.chargetypeid = element.data.registid;
      } else if (element.chargetype === 2) {
        obj.chargetypeid = element.data.prescript_id;
      } else if (element.chargetype === 3 || element.chargetype === 4 || element.chargetype === 6 || element.chargetype === 7) {
        obj.chargetypeid = element.data.diagn_chargitem_id;
      } else if (element.chargetype === 5) {
        obj.chargetypeid = element.data.drug_sales_id;
      }
      const record = element.szsbrecord;
      record.chargestatus = new Date(element.szsbrecord.szsbtime).getMonth() === new Date().getMonth() ? 2 : 3;
      obj.szsbrecord = record;
      obj.total_price = element.szsbrecord.total;

      return new Promise((resolve) => {
        httpServerNormal(payedRefund, {
          patientid: this.feeMsg.patientid,
          registid: this.feeMsg.registid,
          totalprice: element.total_price,
          realprice: element.total_price,
          reduceprice: 0,
          paymethod: 5, // 一期默认现金方式退费
          payprice: element.total_price,
          items: [obj],
        }).then((res) => {
          if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
            resolve();
          }
        });
      });
    },
    /**
     * @name: getNeedBackFeeListAfterSb
     * @description: 社保退费之后的his非社保退费
     * @return: void
     */
    getNeedBackFeeListAfterSb() {
      let list = this.selectedItems.filter(v => v.paymethod !== 5 && v.chargetype !== 1);
      if (!list.length) {
        this.$message.success({ message: '退费成功', duration: 1000, showClose: true });
        this.back();
        return;
      }
      list = list.map(element => ({
        chargetype: element.chargetype,
        paymethod: element.paymethod,
        chargetypeid: element.chargetype === 2 ? element.data.prescript_id : element.data.diagn_chargitem_id,
        total_price: element.total_price,
      }));
      const total = list.reduce((total, v) => total + v.total_price, 0);
      httpServerNormal(payedRefund, {
        patientid: this.feeMsg.patientid,
        registid: this.feeMsg.registid,
        totalprice: total,
        realprice: total,
        reduceprice: 0,
        paymethod: 1, // 一期默认现金方式退费
        payprice: total,
        items: [...list],
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.$message.success({ message: '退费成功', duration: 1000, showClose: true });
          this.back();
        }
      });
    },
    // 延时工具函数
    delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    },
  },
  filters: {
    indexfilter(id, type, list) {
      // 设置处方index
      if (!list) {
        return;
      }
      // 筛选出处方
      const preceptionList = list.filter((obj) => {
        return obj.chargetype === 2;
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
    // 挂号项费用状态
    registFeeStatus(status) {
      if (status === 1) {
        return '已收费';
      } else if (status === 2) {
        return '已退费';
      }
    },
    // 挂号项接诊状态
    registStatus(status) {
      if (status === 1) {
        return '等待接诊';
      } else if (status === 2) {
        return '诊断中 不可退费';
      } else if (status === 3) {
        return '完成 不可退费';
      } else if (status === 4) {
        return '已取消';
      } else if (status === 5) {
        return '已失效';
      }
    },
    // 处方签状态
    prescriptStatus(status) {
      if (status === 1) {
        return '已收费';
      } else if (status === 2) {
        return '未退药 不可退费';
      } else if (status === 3) {
        return '已退药';
      } else if (status === 4) {
        return '已退费';
      }
    },
    // 其他状态
    otherStatus(status) {
      if (status === 1) {
        return '已收费';
      } else if (status === 2) {
        return '已使用 不可退费';
      } else if (status === 3) {
        return '已退费';
      }
      return 'error';
    },
    // 支付方式
    payMethod(paymethod) {
      const methods = [
        { index: 0, label: '其他' },
        { index: 1, label: '现金' },
        { index: 2, label: '银行卡' },
        { index: 3, label: '微信' },
        { index: 4, label: '支付宝' },
        { index: 5, label: '社保' },
      ];
      const method = methods.find((obj) => {
        return obj.index === paymethod;
      });
      return method ? method.label : '';
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic']),
    age() {
      if (!this.feeMsg.birthdate) {
        return '';
      }
      return new Date().getFullYear() - this.feeMsg.birthdate.substring(0, 4);
    },
    checkAll: {
      get() {
        if (!this.feeMsg.items) {
          return true;
        }
        return this.feeMsg.items.filter((obj) => {
          return !obj.isChecked && obj.canBackFee;
        }).length === 0;
      },
      set() {},
    },
    // 退费总金额
    totalPrice() {
      if (!this.feeMsg.items) {
        return 0;
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.isChecked;
      });
      let price = 0;
      selectItems.forEach((obj) => {
        price += obj.total_price;
      });
      return price.toFixed(2);
    },
    // 社保退费总金额
    totalPrice2() {
      if (!this.feeMsg.items) {
        return 0;
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.isChecked;
      });
      let price = 0;
      selectItems.forEach((obj) => {
        price += obj.total_price;
      });
      return price.toFixed(2);
    },
    // 选中的条目
    selectedItems() {
      if (!this.feeMsg.items) {
        return [];
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.isChecked && obj.chargetype !== 1;
      });
      return selectItems || [];
    },
    // 社保费用
    sbFee() {
      if (this.feeMsg.paymethod !== 5) {
        return 0;
      }
      if (!this.feeMsg.items) {
        return 0;
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.isChecked && obj.paymethod === 5;
      });
      let price = 0;
      selectItems.forEach((obj) => {
        const sb = obj.szsbrecord.total - obj.szsbrecord.personpay;
        price += sb;
      });
      return price.toFixed(2);
    },
    // 自费
    personalFee() {
      if (this.feeMsg.paymethod !== 5) {
        return 0;
      }
      return (this.totalPrice2 - this.sbFee).toFixed(2);
    },
    // 需要走客户端退费的条目
    sbClientList() {
      if (this.feeMsg.paymethod !== 5) {
        return [];
      }
      if (!this.feeMsg.items) {
        return [];
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.isChecked && obj.paymethod === 5 && obj.chargetype !== 1;
      });
      return selectItems || [];
    },
    // 社保和非社保划分(打印数据)
    // 社保部分
    sbItems: {
      get() {
        if (this.feeMsg.paymethod !== 5) {
          return [];
        }
        if (!this.feeMsg.items) {
          return [];
        }
        const selectItems = this.feeMsg.items.filter((obj) => {
          return obj.paymethod === 5 && obj.chargetype !== 1;
        });
        return selectItems || [];
      },
      set() {},
    },
    // 非社保部分
    normalItems() {
      if (!this.feeMsg.items) {
        return [];
      }
      const selectItems = this.feeMsg.items.filter((obj) => {
        return obj.paymethod !== 5;
      });
      return selectItems || [];
    },
  },
  created() {
    const registid = this.$route.params.registid;
    const chargestatus = this.$route.params.chargestatus;
    this.getFeeDetail(registid, chargestatus);
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.detail{
  position: relative;
  min-width: 760px;
  padding: 30px 40px;
  .el-row{ line-height: 30px; }
  .header{
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
    .el-row{
      margin-bottom: 10px;
      .highlight{
        font-size: 18px;
        font-weight: 600;
        color: yellowgreen;
      }
    }
  }
  .content{
    margin-bottom: 60px;
    .title{
      background: #ccc;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
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
    border-top: 1px solid #ccc;
    .price_bold {
      color: red;
      font-size: 18px;
      font-weight: 600;
    }
    .real_return_fee{
      width: 200px;
    }
    .operation{
      margin-top: 20px;
      .warn_text{
        line-height: 32px;
        color: $color-yellow;
      }
    }
  }
}
</style>

