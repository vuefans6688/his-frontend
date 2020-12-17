<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-04 15:56:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-13 15:49:23
 -->
<template>
  <div class="pay_info">
    <div class="container" v-show='!sbInput.show'>
      <div class="close" @click="cancelCharge">
        <i class="el-icon-circle-close"></i>
      </div>
      <h3 class="title">收费信息</h3>
      <div class="content">
        <!-- <p>订单号：<span>{{chargeList.registid}}</span></p> -->
        <p>收费机构： <span>{{chargeList.clinic}}</span></p>
        <p v-if='!socialSecurityPay.isChekced'>总金额： <span>￥{{ chargeList.total_price | PriceFilter }} 元</span></p>
        <p v-else>总金额： <span>￥{{ sbToatlPrice | PriceFilter }} 元</span></p>
        <p class="payWay" v-show='!socialSecurityPay.isChekced && !changePrice'>
            <strong>减免金额：</strong>
            <el-input size='small' class="right_align" :class="{ 'red_border' : showRedBorder }" v-model="payObj.discount" @keyup.native="numberLimit('discount')"></el-input>
            <span>元</span>
        </p>

        <div class="other" v-show='isSocialSecuritySupport'>
          <h3>其他支付方式</h3>
          <div class="top">
            <el-checkbox v-model="socialSecurityPay.isChekced" @change='selectSb'>{{socialSecurityPay.label}}</el-checkbox>
            <el-checkbox v-model="changePrice" @change='changeRealPrice'>修改金额</el-checkbox>
            <el-select v-model="aka130" placeholder="请选择" size="mini" v-show='socialSecurityPay.isChekced'>
              <el-option v-for="item in AKA130" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>

          <p v-show='socialSecurityPay.isChekced'>
            <strong>{{ socialSecurityPay.label }}：</strong>
            <el-input size='small' class="right_align" v-model='socialSecurityPay.price' disabled></el-input>
            <span v-if='socialSecurityPay.readCardStatus === 2'>元</span>
            <el-button v-else-if='socialSecurityPay.readCardStatus === 0' type="primary" class='read' size='small' @click='sbInput.show=true;'>读卡</el-button>
            <el-button v-else type="primary" class='read' size='small' :loading="true">读卡中</el-button>
          </p>

          <p class='keywords' v-if='socialSecurityPay.readCardStatus === 2 && socialSecurityPay.isChekced'>
            社保卡余额: <strong>{{baseInfo.aae240}}</strong> 元
          </p>
          <p class='keywords' v-if='socialSecurityPay.readCardStatus === 2 && socialSecurityPay.isChekced'>
            持卡人姓名: <strong>{{baseInfo.aac003}}</strong>
          </p>
          <p class='keywords' v-if='socialSecurityPay.readCardStatus === 2 && socialSecurityPay.isChekced'>
            自费部分: <strong>{{cashPay}}</strong> 元
          </p>

        </div>

        <p v-show='!socialSecurityPay.isChekced' class="keywords">应收：￥<strong>{{needPay}}</strong> 元</p>
        <p v-show='!socialSecurityPay.isChekced && changePrice' class="inputPrice">实收：<el-input placeholder="修改金额" v-model="payObj.realprice" style="width: 100px" size="mini"></el-input> 元</p>

        <h3><span v-show='!socialSecurityPay.isChekced'>支付方式</span></h3>
        <p class="payWay" v-show='!socialSecurityPay.isChekced'>
          <el-radio-group v-model="payMethod" size="small">
            <el-radio :label="1" border>现金</el-radio>
            <el-radio :label="2" border>银行卡</el-radio>
            <el-radio :label="3" border>微信支付</el-radio>
            <el-radio :label="4" border>支付宝支付</el-radio>
          </el-radio-group>
        </p>
        <p class="payInp">
          <strong>实收金额：</strong>
          <el-input size='small' class="right_align" :class="{ 'red_border' :  showRedBorder}" v-model="payObj.realPay" @keyup.native="numberLimit('realPay')"></el-input>
          <span>元</span>
        </p>
         <p class="keywords">找零：￥<strong> {{ change }}</strong> 元</p> 
      </div>

      <div class="footer">

        <!-- 清单打印 -->
        <el-checkbox v-model="is_list_print">清单打印</el-checkbox>

        <!-- 非社保支付 -->
        <!-- <el-checkbox v-if='!socialSecurityPay.isChekced' v-model="isNormalChargePrint">收据打印</el-checkbox> -->
        <!-- 社保支付 -->
        <!-- <el-checkbox v-if='socialSecurityPay.isChekced && (sbPrescriptList.length || sbChargeItems.length)' v-model="sbChargeSbPrint">社保项打印</el-checkbox>
        <el-checkbox v-if='socialSecurityPay.isChekced && (normalPrescriptList.length || normalChargeItems.length)' v-model="sbChargeNormalPrint">自费项打印</el-checkbox> -->
        
        <p>
          <el-button type="primary" @click='submit' size="small" :disabled="chargeDisable" :loading="chargeDisable">收费</el-button>
          <el-button @click='cancelCharge' size="small">取消</el-button>
        </p>
      </div>
    </div>

    <div class="progress" v-if='sbInput.show'>
      <div class="close" @click="sbInput.show=false;">
        <i class="el-icon-circle-close"></i>
      </div>
      <SbLoading @getPersonDetailInfo='readCard' @readFailed='keepReading=false;' class='loading' :keepReading='keepReading'></SbLoading>
    </div>

  </div>
</template>

<script>
// import { Message } from 'element-ui';
import { mapGetters, mapMutations } from 'vuex';
import { floatLimit } from '@/utils/inputLimit';
import connection from '@/common/js/connection';
import { AKA130 } from '@/common/js/dictionary';
import { getClinicName, chargeForHIS, receiveTreatment, registrationTryChargeUrl, registrationChargeUrl, cfadd, cfcancel, fyshisuan, fyjiesuan, cfquery } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';
import SbLoading from '@/components/SbLoading';

const UnloadConfirm = {};

export default {
  data() {
    return {
      isSocialSecuritySupport: false,
      socialSecurityPay: {
        label: '社保支付',
        isChekced: false,
        price: 0,
        readCardStatus: 0,  // 0: 未读卡， 1： 读卡中， 2： 读卡完成
      },
      cashPay: 0,  // 自费部分
      // 社保卡密码
      sbInput: {
        show: false,
        password: '000000',
      },
      // 社保个人信息
      baseInfo: {
        aac003: '', // 持卡人姓名
        aae240: '', // 个人账户余额
      },
      theCode: '', // 定点协议机构编码
      aka130: '11', // 医疗类别 '11'=普通门诊
      AKA130: [],
      aka030: '12', // 结算类别 '12'=个人医疗费本地联网结算
      ckc601: '0',  // 医保费用先行支付记账资格 '1'=已申请先行支付 '0'=非先行支付
      // 社保收费项
      sbRegist: {},  // 社保挂号项
      normalRegist: {}, // 非社保挂号
      sbPrescriptList: [], // 社保处方
      normalPrescriptList: [],  // 自费处方
      sbChargeItems: [],  // 社保收费项目
      normalChargeItems: [],  // 自费诊疗项目
      payObj: {
        discount: '',    // 减免金额
        realPay: '',    // 实收费用
        realprice: '',
      },
      payMethod: 1,   // 支付方式
      is_list_print: true,
      isNormalChargePrint: true,   // 非社保支付打印
      sbChargeSbPrint: true,       // 社保支付打印(社保部分)
      sbChargeNormalPrint: true,   // 社保支付打印(非社保部分)
      chargeDisable: false,   // 是否禁用收费按钮
      startToCompute: false, // 计算余额是否可以支付
      showRedBorder: false, // 余额不足以支付时，显示红色边框
      keepReading: false,
      printSbTotal: 0,
      printsbCash: 0,
      printSbAccount: 0,
      printSbJijin: 0,
      sbItems: [],
      changePrice: false,
    };
  },
  methods: {
    ...mapMutations(['set_feePrintMsg', 'update_seriesCode']),
    getClinic_Name() {  // 获取诊所名
      httpServerNormal(getClinicName).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$set(this.printData, 'clinic_name', res.clinic_name);
        }
      });
    },
    changeRealPrice(isSelected) {
      this.changePrice = isSelected;
      this.payObj.discount = '';
    },
    // 收费状态（cancel: 取消支付, success: 收费成功, error: 收费失败）
    isCharge(status) {
      this.$emit('isCharge', status);
    },
    numberLimit(str) { // 限制数字输入
      this.payObj[str] = floatLimit(this.payObj[str], 2);
    },
    submit() {
      // 点击收费后，需禁用收费按钮，防止再次发送收费请求
      this.chargeDisable = true;
      if (this.socialSecurityPay.isChekced) {
        // 没有试算 无法结算
        if (this.socialSecurityPay.readCardStatus !== 2) {
          this.chargeDisable = false;
          this.$message.error({ duration: 1500, message: '社保支付请先读卡' });
          return;
        }
        if (this.change === '') {
          this.chargeDisable = false;
          this.$message.error({ message: '支付金额不足, 请加收金额', duration: 2000, showClose: true });
          this.startToCompute = true;
          this.showRedBorder = true;
          return;
        }
        if (this.cashPay < 0) {
          this.chargeDisable = false;
          this.$message.error({ message: '费用错误', duration: 2000, showClose: true });
          return;
        }
        if (this.sbPrescriptList.length) {
          this.prescriptionCharge(this.sbPrescriptList, 0);
        } else if (this.sbChargeItems.length) {
          this.itemsCharge(this.sbChargeItems, 0);
        } else {
          this.hisCharge();
        }
        return;
      }
      if (this.change === '') {
        this.$message.error({
          message: '支付金额不足, 请加收金额或设置折扣',
          duration: 2000,
          showClose: true,
        });
        this.chargeDisable = false;
        this.startToCompute = true;
        this.showRedBorder = true;
        return;
      }
      // 添加收费条目
      const list = [];
      this.chargeList.items.forEach((element) => {
        const obj = {};
        obj.chargetype = element.type;
        if (element.type === 1) {
          obj.chargetypeid = element.data.registid;
        } else if (element.type === 2) {
          obj.chargetypeid = element.data.prescript_id;
        } else if (element.type === 3 || element.type === 4 || element.type === 6 || element.type === 7) {
          obj.chargetypeid = element.data.diagn_chargitem_id;
        }
        if (!(this.socialSecurityPay.readCardStatus === 2 && element.type === 1)) {
          list.push(obj);
        }
      });
      this.sendChargeRequest(list);
    },
    // 取消收费
    cancelCharge() {
      this.isCharge('cancel');
    },
    // 发送收费请求
    sendChargeRequest(needChargeList) {
      const needPay = parseFloat(this.needPay);
      const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
      const realprice = (this.changePrice && this.payObj.realprice) ? parseFloat(this.payObj.realprice) : needPay;

      httpServerNormal(chargeForHIS, {
        clinicid: this.clinic,
        patientid: this.chargeList.patientid,
        registid: this.chargeList.registid,
        totalprice: parseFloat(this.chargeList.total_price.toFixed(2)),
        realprice: realprice, // 实际支付金额(所有支付方式支付总和)
        reduceprice: discount,
        paymethod: this.payMethod,
        payprice: needPay,    // 实际付款金额
        items: [...needChargeList],
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 收费成功
          this.$message.success({ message: '收费成功!', duration: 1000, showClose: true });
          if (this.is_list_print) {
            this.call_list_print();
          }
          this.isCharge('success');
        } else {
          // 收费响应后，需解除收费按钮的禁用
          this.chargeDisable = false;
        }
      }).catch((res) => {
        this.$message.error({
          message: res,
          duration: 1000,
          showClose: true,
        });
        this.chargeDisable = false;
      });
    },
    normalPayPrint(danju) {
      const list = this.chargeList.items;

      const data = {};

      this.$set(data, 'type', 1);

      this.$set(data, 'isSb', false);  // 是否社保

      this.$set(data, 'deptname', this.chargeList.deptname);

      this.$set(data, 'name', this.chargeList.name);
      this.$set(data, 'liushui', this.chargeList.registid);
      this.$set(data, 'danju', danju);

      let printSbTotal = 0;
      let reduce = this.payObj.discount || 0;
      reduce = parseFloat(reduce);

      // 药品
      let checkTotalPrice = 0;
      let westTotalPrice = 0;
      let zhongchengTotalPrice = 0;
      let zhongcaoTotalPrice = 0;
      let otherTotalPrice = 0;

      list.forEach((item) => {
        if (item.type === 1) {
          return;
        }
        printSbTotal += item.data.total_price;
        if (item.type === 3) {    // 检验检查
          checkTotalPrice += item.data.total_price;
        } else if (item.type === 4 || item.type === 6 || item.type === 7) {   // 其他
          otherTotalPrice += item.data.total_price;
        } else if (item.type === 2) {   // 处方
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

      this.$set(data, 'checkTotalPrice', checkTotalPrice);
      this.$set(data, 'westTotalPrice', westTotalPrice);
      this.$set(data, 'zhongchengTotalPrice', zhongchengTotalPrice);
      this.$set(data, 'zhongcaoTotalPrice', zhongcaoTotalPrice);
      this.$set(data, 'otherTotalPrice', otherTotalPrice);

      this.$set(data, 'printSbTotal', printSbTotal);
      this.$set(data, 'reduce', reduce);
      this.$set(data, 'printsbCash', printSbTotal - reduce);
      this.$set(data, 'printSbAccount', 0);
      this.$set(data, 'printSbJijin', 0);

      this.set_feePrintMsg([data]);
      window.open('/print/billPrint');
    },
    /*  换算  */
    // 小单位价格
    perPrimaryUnitPrice(price, priceUnit, specs) {
      let realUnitPrice = 0;
      if (priceUnit === specs.unit_large.specs_name) { // 入库单位是最大单位
        realUnitPrice = price / (specs.unit_middle.specs_name ? specs.unit_middle.specs_unit : 1) / (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (priceUnit === specs.unit_middle.specs_name) { // 入库单位是中级单位
        realUnitPrice = price / (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (priceUnit === specs.unit_primary.specs_name) { // 入库单位是最小单位
        realUnitPrice = price;
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
    // 社保处理
    /*
      * 读卡
      * 挂号试算
      * 处方录入
      * 处方试算
      * 收费项录入
      * 收费项试算
      * 处方取消  （如需要）
      * 收费项取消  （如需要）
      * 挂号结算
      * 处方结算
      * 收费项结算
    */
    // 勾选社保支付后 需链接测试
    async selectSb(isSelected) {
      if (isSelected) {
        const flag = await connection().catch(() => {
          this.socialSecurityPay.isChekced = false;
        });
        if (flag !== '1') {
          this.socialSecurityPay.isChekced = false;
        }
      }
    },
    /**
     * @name: init
     * @description: 初始化处方状态
     * @param {type} void
     * @return: void
     */
    init() {
      this.chargeList.items.forEach((item) => {
        this.$set(item, 'status', 0);
      });
    },
    // 分类
    classify() {
      // 收费项
      let items = this.chargeList.items || [];

      items = items.filter((item) => {
        return item.status === 0 || item.status === 5;
      });

      // 社保是否包含挂号
      this.sbRegist = items.find((item) => {
        return item.type === 1;
      }) || {};

      // 处方分类
      const prescripts = items.filter((item) => {
        return item.type === 2;
      });
      prescripts.forEach((prescript) => {
        const isContainSbDrug = prescript.data.drug_list.some((drug) => {
          return drug.druginfo.ake001 && drug.druginfo.szsbstatus === 1;
        });
        if (isContainSbDrug) {
          this.sbPrescriptList.push(prescript); // 社保处方
        } else {
          this.normalPrescriptList.push(prescript); // 非社保处方
        }
      });

      // 社保收费项目
      this.sbChargeItems = items.filter((item) => {
        return (item.type === 3 || item.type === 4 || item.type === 6 || item.type === 7) &&
        (item.data.item && item.data.item.szsbcode && item.data.item.szsbstatus === 1) && item.data.item.szsbprice > 0;
      });
      this.normalChargeItems = items.filter((item) => {
        return (item.type === 3 || item.type === 4 || item.type === 6 || item.type === 7) &&
        !(item.data.item && item.data.item.szsbcode && item.data.item.szsbstatus === 1 && item.data.item.szsbprice > 0);
      });
    },
    // 读卡
    readCard(info, flag, password) {
      // if (info.aae240 < this.chargeList.total_price) {
      //   Message({ message: '社保卡余额不足', type: 'error', showClose: true, duration: 1500 });
      //   this.socialSecurityPay.isChekced = false;
      //   this.sbInput.show = false;
      //   return;
      // }
      this.classify();
      this.socialSecurityPay.readCardStatus = 1;
      this.baseInfo = info;
      this.keepReading = true;
      this.sbInput.password = password;
      if (this.sbRegist.data) {
        this.registrationTryCharge();
      } else {
        // 无挂号项
        this.afterRegistCharge();
      }
    },
    // 挂号结算之后的处理
    afterRegistCharge() {
      if (this.sbPrescriptList.length) {
        this.prescriptionRead(this.sbPrescriptList, 0);
      } else if (this.sbChargeItems.length) {
        this.chargeItemsRead(this.sbChargeItems, 0);
      } else {
        this.afterTryCharge();
      }
    },

    // 挂号试算
    registrationTryCharge() {
      // 挂号item
      const registItem = this.sbRegist.data;

      const data = {
        akc190: registItem.registid,
        aka130: this.aka130,
        akf001: this.chargeList.szsbdeptcode,
        bkc368: registItem.bkc368,
        akc264: 0,
        listsize: 0,
        inputlist: [],
      };

      httpServerNormal(registrationTryChargeUrl, {
        transBody: data,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 正确的处理
          this.$set(this.sbRegist, 'tryChargeData', res.transBody);
          this.registrationCharge();
        } else {
          this.reset();
        }
      });
    },
    // 挂号结算
    async registrationCharge() {
      const regist = this.sbRegist.data;

      let seriesCode = this.theCode + new Date().format('yyyyMMddhhmmssS');
      if (this.seriesCode === seriesCode) {
        await this.delay(200);
        seriesCode = this.theCode + new Date().format('yyyyMMddhhmmssS');
      }
      this.update_seriesCode(seriesCode);

      this.$set(this.sbRegist, 'bke384', seriesCode);
      const data = {
        akc190: regist.registid,
        bzz269: this.sbInput.password,
        aka130: this.aka130,
        akf001: this.chargeList.szsbdeptcode,
        bkc368: regist.bkc368,
        bke384: seriesCode,
        akc264: 0,
        listsize: 0,
        inputlist: [],
      };
      if (!regist.szsbprice) {
        delete data.listsize;
        delete data.inputlist;
      }
      httpServerNormal(registrationChargeUrl, {
        transBody: data,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 正确的处理
          this.$set(this.sbRegist, 'chargeData', res.transBody);
          this.$set(this.sbRegist, 'transTime', res.transTime);
          this.$set(this.sbRegist, 'status', 1);
          this.savePaientRecord();
          // 客户端结算之后his单独收费挂号
          this.hisChargeRegist();
        } else {
          this.reset();
        }
      });
    },
    // 接诊
    savePaientRecord() {
      httpServerNormal(receiveTreatment, {
        transBody: {
          akc190: this.chargeList.registid,
          czy201: parseInt(new Date(new Date().getTime() - (1000 * 60 * 10)).format('yyyyMMddhhmmss'), 10),
          akf001: this.chargeList.szsbdeptcode,
          bkc320: this.chargeList.szsbdoctorcode,
          bkc275: this.chargeList.szsbdoctorname,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 接诊完之后调处方录入
          this.afterRegistCharge();
        } else {
          this.reset();
        }
      });
    },
    // 试算完成之后的处理
    afterTryCharge() {
      this.sbInput.show = false;
      this.socialSecurityPay.readCardStatus = 2;
      this.keepReading = false;
      // 社保处方计算
      this.sbPrescriptList.forEach((prescript) => {
        const sbPay = prescript.tryChargeData.akc264 - prescript.tryChargeData.akb067;
        let cashPay = prescript.data.szsbtotalprice - sbPay;
        cashPay = cashPay < 0 ? 0 : cashPay;
        this.socialSecurityPay.price += sbPay;
        this.cashPay += cashPay;
        // 处理打印数据
        this.printSbTotal += prescript.tryChargeData.akc264;
        this.printsbCash += prescript.tryChargeData.akb067;
        this.printSbAccount += prescript.tryChargeData.akb066;
        this.printSbJijin += prescript.tryChargeData.akb068;
      });
      // 自费处方计算
      this.normalPrescriptList.forEach((prescript) => {
        this.cashPay += prescript.data.total_price;
      });
      // 社保诊疗项目计算
      this.sbChargeItems.forEach((item) => {
        const sbPay = item.tryChargeData.akc264 - item.tryChargeData.akb067;
        let cashPay = item.data.szsbtotalprice - sbPay;
        cashPay = cashPay < 0 ? 0 : cashPay;
        this.socialSecurityPay.price += sbPay;
        this.cashPay += cashPay;
        // 处理打印数据
        this.printSbTotal += item.tryChargeData.akc264;
        this.printsbCash += item.tryChargeData.akb067;
        this.printSbAccount += item.tryChargeData.akb066;
        this.printSbJijin += item.tryChargeData.akb068;
      });
      // 非社保诊疗项计算
      this.normalChargeItems.forEach((item) => {
        this.cashPay += item.data.total_price;
      });
      this.cashPay = this.cashPay.toFixed(2);
      this.socialSecurityPay.price = this.socialSecurityPay.price.toFixed(2);
      // this.getClinic_Name();
    },
    // 延时工具函数
    delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    },
    // 处方录入(收费项目)
    async prescriptionRead(list, index) {
      let seriesCode = this.theCode + new Date().format('yyyyMMddhhmmssS');
      if (this.seriesCode === seriesCode) {
        await this.delay(200);
        seriesCode = this.theCode + new Date().format('yyyyMMddhhmmssS');
      }
      this.update_seriesCode(seriesCode);
      this.$set(list[index], 'bke384', seriesCode);
      const prescript = list[index].data;
      const sbDrugList = [];
      prescript.drug_list.forEach((drug, drugIndex) => {
        // const createTime = `20${drug.druginfo.create_time}`;
        if (drug.druginfo.ake001 && drug.druginfo.szsbstatus === 1) {
          // 2是中药,需单独处理
          const total = prescript.prescript_type === 2 ? drug.total * drug.dosage : drug.total; // 开药总量(大单位)
          const totalUnit = prescript.prescript_type === 2 ? drug.dose_unit : drug.total_unit;
          const primaryTotal = this.changeToPrimaryUnit(drug.druginfo.specs, total, totalUnit); // 开药总量(换算成小单位)
          const drugItem = {
            aae072: prescript.danju,
            bkc369: '1',
            bkf500: `yb${drugIndex}`,
            ake001: drug.druginfo.ake001,
            ake002: drug.druginfo.product_name,
            bkm017: drug.druginfo.standard_number,
            ake005: drug.druginfo.ake001,
            ake006: drug.druginfo.product_name,
            aka070: drug.druginfo.dosage_type,
            aka074: drug.druginfo.aka074,
            // 这里处理医保药品的单位和价格
            akc225: parseFloat((drug.total_price / primaryTotal).toFixed(4)), // 单价
            akc226: primaryTotal,    // 数量
            akc264: parseFloat((drug.total_price).toFixed(2)),  // 总额
            aka067: drug.druginfo.specs.unit_primary.specs_name ? drug.druginfo.specs.unit_primary.specs_name : drug.druginfo.specs.unit_middle.specs_name, // 计价单位(小单位)
            akc271: parseInt(new Date().getFullYear() + ('00' + (new Date().getMonth() + 1)).slice(('00' + (new Date().getMonth() + 1)).length - 2) + ('00' + new Date().getDate()).slice(('00' + new Date().getDate()).length - 2), 10),
            bkc320: prescript.doctorszsbid,
          };
          sbDrugList.push(drugItem);
        }
      });
      const cfAddData = {
        akc190: prescript.regist_id,
        bke384: seriesCode,
        listsize: sbDrugList.length,
        inputlist: sbDrugList,
      };
      httpServerNormal(cfadd, {
        transBody: cfAddData,
      }).then((res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          // 处方录入失败(需要取消已经录入成功的处方)
          this.reset();
          if (index > 0) {  // 前面有录入成功的处方
            this.prescriptionCanael(list, index - 1);
          }
        } else if (index < list.length - 1) {
          // 当前处方录入成功 并且还有处方需要录入
          setTimeout(() => {
            this.$set(list[index], 'status', 5);
            this.prescriptionRead(list, index + 1);
          }, 1000);
        } else {
          // 所有处方录入成功,调处方试算
          this.$set(list[index], 'status', 5);
          this.prescriptionTryChage(list, 0);
        }
      });
    },
    // 处方取消
    prescriptionCanael(list, index) {
      const prescript = list[index].data;
      const data = {
        akc190: prescript.regist_id,
        bke384: list[index].bke384,
        listsize: 0,
        inputlist: [{}],
      };
      httpServerNormal(cfcancel, {
        transBody: data,
      }).then((res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          // 处方取消失败
          // this.prescriptionCanael(list, index);
        } else if (index > 0) { // 处方取消成功 并且还有需要取消的处方
          this.$set(list[index], 'status', 0);
          this.prescriptionCanael(list, index - 1);
        } else {
          // 处方全部取消
          this.reset();
        }
      });
    },
    // 收费项目录入
    async chargeItemsRead(list, index) {
      const chargeItem = list[index].data;
      let seriesCode = this.theCode + new Date().format('yyyyMMddhhmmssS');
      if (this.seriesCode === seriesCode) {
        await this.delay(200);
        seriesCode = this.theCode + new Date().format('yyyyMMddhhmmssS');
      }
      this.update_seriesCode(seriesCode);
      this.$set(list[index], 'bke384', seriesCode);
      // const createTime = `20${chargeItem.item.create_time}`;
      const cfAddData = {
        akc190: chargeItem.regist_id,
        bke384: seriesCode,
        listsize: 1,
        inputlist: [
          {
            aae072: chargeItem.danju,
            bkc369: '1',
            bkf500: `sf${index}`,
            ake001: chargeItem.item.szsbcode,
            ake002: chargeItem.item.szsbname,
            ake005: chargeItem.item.seq_num,
            ake006: chargeItem.item.szsbname,
            aka067: chargeItem.total_unit,
            akc225: chargeItem.item.szsbprice,
            akc226: chargeItem.total,
            akc264: parseFloat((chargeItem.item.szsbprice * chargeItem.total).toFixed(2)),
            akc271: parseInt(new Date().getFullYear() + ('00' + (new Date().getMonth() + 1)).slice(('00' + (new Date().getMonth() + 1)).length - 2) + ('00' + new Date().getDate()).slice(('00' + new Date().getDate()).length - 2), 10),
            bkc320: this.chargeList.szsbdoctorcode,
          },
        ],
      };
      httpServerNormal(cfadd, {
        transBody: cfAddData,
      }).then((res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          // 收费项目录入失败(需要取消已经录入成功的收费项目)
          this.reset();
          if (index > 0) {  // 前面有录入成功的收费项目
            this.chargeItemsCancel(list, index - 1);
            if (this.sbPrescriptList.length) {
              this.prescriptionCanael(this.sbPrescriptList, this.sbPrescriptList.length - 1);
            }
          }
        } else if (index < list.length - 1) {
          // 当前收费项目录入成功 并且还有收费项目需要录入
          setTimeout(() => {
            this.$set(list[index], 'status', 5);
            this.chargeItemsRead(list, index + 1);
          }, 1000);
        } else {
          // 所有收费项目录入成功,调收费项目试算
          this.$set(list[index], 'status', 5);
          this.chargeItemsTryChage(list, 0);
        }
      });
    },
    // 收费项目取消
    chargeItemsCancel(list, index) {
      const item = list[index].data;
      const data = {
        akc190: item.regist_id,
        bke384: list[index].bke384,
        listsize: 0,
        inputlist: [{
        }],
      };
      httpServerNormal(cfcancel, {
        transBody: data,
      }).then((res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          // 收费项目取消失败
          // this.chargeItemsCancel(list, index);
        } else if (index > 0) { // 收费项目取消成功 并且还有需要取消的收费项目
          this.$set(list[index], 'status', 0);
          this.chargeItemsCancel(list, index - 1);
        } else {
          // 收费项目全部取消
          this.reset();
        }
      });
    },
    // 处方试算
    prescriptionTryChage(list, index) {
      const prescript = list[index].data;
      let totalprice = 0;
      prescript.drug_list.forEach((drug) => {
        if (drug.druginfo.ake001 && drug.druginfo.szsbstatus === 1) {
          totalprice += drug.total_price;
        }
      });

      const data = {
        akc190: prescript.regist_id,
        aka130: this.aka130,
        bkc320: prescript.doctorszsbid,
        ckc350: prescript.doctorszsbname,
        aka030: this.aka030,
        akc264: parseFloat(totalprice.toFixed(2)),
        ckc601: this.ckc601,
        bke384: list[index].bke384,
      };

      httpServerNormal(fyshisuan, {
        transBody: data,
      }).then((res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          // 处方试算失败
          this.reset();
          this.prescriptionCanael(list, list.length - 1); // 取消全部处方
        } else {
          // 当前处方试算成功
          this.$set(list[index], 'tryChargeData', res.transBody);
          if (index < list.length - 1) {
            // 试算下一条
            this.prescriptionTryChage(list, index + 1);
          } else if (this.sbChargeItems.length) {
            // 所有处方试算完成// 有收费项目需要录入
            this.chargeItemsRead(this.sbChargeItems, 0);
          } else {
            this.afterTryCharge();
          }
        }
      });
    },
    // 收费项试算
    chargeItemsTryChage(list, index) {
      const item = list[index].data;
      const data = {
        akc190: item.regist_id,
        aka130: this.aka130,
        bkc320: this.chargeList.szsbdoctorcode,
        ckc350: this.chargeList.szsbdoctorname,
        aka030: this.aka030,
        akc264: parseFloat((item.item.szsbprice * item.total).toFixed(2)),
        ckc601: this.ckc601,
        bke384: list[index].bke384,
      };
      httpServerNormal(fyshisuan, {
        transBody: data,
      }).then((res) => {
        if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
          // 处方试算失败
          this.reset();
          this.chargeItemsCancel(list, list.length - 1);
          if (this.sbPrescriptList.length) {
            this.prescriptionCanael(this.sbPrescriptList, this.sbPrescriptList.length - 1);
          }
        } else {
          // 当前收费项试算成功
          this.$set(list[index], 'tryChargeData', res.transBody);
          if (index < list.length - 1) {
            // 试算下一条
            this.chargeItemsTryChage(list, index + 1);
          } else {
            this.afterTryCharge();
          }
        }
      });
    },
    // 处方结算
    prescriptionCharge(list, index) {
      const prescript = list[index].data;
      let totalprice = 0;
      prescript.drug_list.forEach((drug) => {
        if (drug.druginfo.ake001 && drug.druginfo.szsbstatus === 1) {
          totalprice += drug.total_price;
        }
      });
      const data = {
        bzz269: this.sbInput.password,
        akc190: prescript.regist_id,
        aka130: this.aka130,
        bkc320: prescript.doctorszsbid,
        ckc350: prescript.doctorszsbname,
        aka030: this.aka030,
        akc264: parseFloat(totalprice.toFixed(2)),
        ckc601: this.ckc601,
        bke384: list[index].bke384,
      };
      httpServerNormal(fyjiesuan, {
        transBody: data,
      }).then(async (res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 当前处方结算成功
          this.$set(list[index], 'chargeData', res.transBody);
          this.$set(list[index], 'transTime', res.transTime);
          this.$set(list[index], 'status', 1);
          await this.hisChargeByYbItem(list, index);
          await this.delay(1000);
          if (index < list.length - 1) {  // 还有处方需要结算
            this.prescriptionCharge(list, index + 1);
          } else if (this.sbChargeItems.length) {
            // 所有处方结算成功 包含诊疗项目，需进行诊疗项目结算
            this.itemsCharge(this.sbChargeItems, 0);
          } else {
            this.hisCharge();
          }
        } else {
          // 收费失败
          this.isCharge('cancel');
        }
      });
    },
    // 收费项结算
    itemsCharge(list, index) {
      const item = list[index].data;
      const data = {
        bzz269: this.sbInput.password,
        akc190: item.regist_id,
        aka130: this.aka130,
        bkc320: this.chargeList.szsbdoctorcode,
        ckc350: this.chargeList.szsbdoctorname,
        aka030: this.aka030,
        akc264: parseFloat((item.item.szsbprice * item.total).toFixed(2)),
        ckc601: this.ckc601,
        bke384: list[index].bke384,
      };
      httpServerNormal(fyjiesuan, {
        transBody: data,
      }).then(async (res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 当前收费项结算成功
          this.$set(list[index], 'chargeData', res.transBody);
          this.$set(list[index], 'transTime', res.transTime);
          this.$set(list[index], 'status', 1);
          await this.hisChargeByYbItem(list, index);
          await this.delay(1000);
          if (index < list.length - 1) {
            // 结算成功，结算下一条
            this.itemsCharge(list, index + 1);
          } else {
            this.hisCharge();
          }
        } else {
          // 收费失败
          this.isCharge('cancel');
        }
      });
    },
    /**
     * @name: hisChargeByYbItem
     * @description: 社保结算一下 后台也结算一下
     * @param {list}: 处方单列表
     * @param {index}: 处方单序号
     * @return: void
     */
    hisChargeByYbItem(list, index) {
      const item = list[index];

      const obj = {};
      obj.chargetype = item.type;
      obj.chargetypeid = item.type === 2 ? item.data.prescript_id : item.data.diagn_chargitem_id;
      obj.total_price = item.data.szsbtotalprice;

      obj.paymethod = 5;

      const outputlist = {};
      let szsbtime = '';
      szsbtime = item.transTime.split(':')[0];

      if (item.chargeData.outputlist) {
        this.$set(outputlist, 'outputlist', item.chargeData.outputlist);
      }
      if (item.chargeData.outputlist1) {
        this.$set(outputlist, 'outputlist1', item.chargeData.outputlist1);
      }
      if (item.chargeData.outputlist2) {
        this.$set(outputlist, 'outputlist2', item.chargeData.outputlist2);
      }
      if (item.chargeData.outputlist3) {
        this.$set(outputlist, 'outputlist3', item.chargeData.outputlist3);
      }

      obj.szsbrecord = {
        shebaosn: item.chargeData.ckc618,
        liushui: obj.chargetypeid,
        jigousn: item.bke384,
        chargetype: item.type,
        aka130: this.aka130,
        aka030: this.aka030,
        total: item.chargeData.akc264,
        jijinpay: item.chargeData.akb068,
        personaccount: item.chargeData.akb066,
        personpay: item.chargeData.akb067,
        personleft: item.chargeData.aae240,
        personleftbp: index === 0 ? this.baseInfo.aae240 : list[index - 1].chargeData.aae240,
        szsbtime: parseFloat(szsbtime),
        chargestatus: 1,
        outputlist: outputlist,
        clinicid: this.clinic,
        patientname: this.baseInfo.aac003,
        yiliaohao: this.baseInfo.aaz500,
        diannaohao: this.baseInfo.aac999,
        bcc334: this.baseInfo.outputlist2.sort((a, b) => b.aae030 - a.aae030)[0].bcc334,
      };

      const data = {
        cashierid: this.user.userid,
        cashier: this.user.truename,
        PatientName: this.chargeList.name,
        paymethod: 5,
        clinicid: this.clinic,
        patientid: this.chargeList.patientid,
        registid: this.chargeList.registid,
        totalprice: item.data.szsbtotalprice,
        realprice: item.data.szsbtotalprice, // 实际支付金额(所有支付方式支付总和)
        reduceprice: 0,
        payprice: item.data.szsbtotalprice,    // 实际付款金额
        items: [obj],
      };
      return new Promise((resolve, reject) => {
        httpServerNormal(chargeForHIS, data).then((res) => {
          if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
            // 收费成功
            resolve();
          }
        }).catch((res) => {
          this.$message.error({ message: res, duration: 1000, showClose: true });
          this.chargeDisable = false;
          reject();
        });
      });
    },
    // his系统后台结算
    hisCharge() {
      this.detailQuery();

      // 添加收费条目
      const list = [];
      const normalList = this.normalPrescriptList.concat(this.normalChargeItems);

      let totalPrice = 0;

      normalList.forEach((element) => {
        const obj = {};
        obj.chargetype = element.type;
        if (element.type === 2) {
          obj.chargetypeid = element.data.prescript_id;
        } else if (element.type === 3 || element.type === 4 || element.type === 6 || element.type === 7) {
          obj.chargetypeid = element.data.diagn_chargitem_id;
        }
        obj.total_price = element.data.szsbtotalprice;
        totalPrice += element.data.szsbtotalprice;
        obj.paymethod = element.bke384 ? 5 : this.payMethod;
        obj.szsbrecord = {};
        list.push(obj);
      });

      const data = {
        cashierid: this.user.userid,
        cashier: this.user.truename,
        PatientName: this.chargeList.name,
        paymethod: this.payMethod,
        clinicid: this.clinic,
        patientid: this.chargeList.patientid,
        registid: this.chargeList.registid,
        totalprice: parseFloat(totalPrice),
        realprice: parseFloat(totalPrice), // 实际支付金额(所有支付方式支付总和)
        reduceprice: 0,
        payprice: parseFloat(totalPrice),    // 实际付款金额
        items: list,
      };

      if (!list || !list.length) {
        this.chargeSuccess();
        return;
      }

      httpServerNormal(chargeForHIS, data).then((res) => {
        this.chargeDisable = false;
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          // 收费成功
          this.chargeSuccess();
        }
      }).catch((res) => {
        this.$message.error({ message: res, duration: 1000, showClose: true });
        this.chargeDisable = false;
      });
    },
    chargeSuccess() {
      this.$message.success({ message: '收费成功!', duration: 1000, showClose: true });
      if (this.is_list_print) {
        this.call_list_print();
      }
      this.isCharge('success');
    },
    // 客户端结算之后his单独收费挂号
    hisChargeRegist() {
      const list = [];
      const obj = {};
      obj.chargetype = this.sbRegist.type;
      obj.chargetypeid = this.sbRegist.data.registid;
      obj.total_price = this.sbRegist.data.szsbprice;
      obj.paymethod = 5;
      const outputlist = {};
      // let szsbtime = '';
      // szsbtime = this.sbRegist.transTime.split(':')[0];
      if (this.sbRegist.chargeData.outputlist) {
        this.$set(outputlist, 'outputlist', this.sbRegist.chargeData.outputlist);
      }
      if (this.sbRegist.chargeData.outputlist2) {
        this.$set(outputlist, 'outputlist2', this.sbRegist.chargeData.outputlist2);
      }
      // obj.szsbrecord = {
      //   shebaosn: this.sbRegist.chargeData.ckc618,
      //   liushui: obj.chargetypeid,
      //   jigousn: this.sbRegist.bke384,
      //   chargetype: this.sbRegist.type,
      //   aka130: this.aka130,
      //   aka030: this.aka030,
      //   total: this.sbRegist.chargeData.akc264,
      //   jijinpay: this.sbRegist.chargeData.akb068,
      //   personaccount: this.sbRegist.chargeData.akb066,
      //   personpay: this.sbRegist.chargeData.akb067,
      //   personleft: this.sbRegist.chargeData.aae240,
      //   szsbtime: parseFloat(szsbtime),
      //   chargestatus: 1,
      //   outputlist: outputlist,
      //   clinicid: this.clinic,
      // };
      obj.szsbrecord = {};
      list.push(obj);

      const data = {
        cashierid: this.user.userid,
        cashier: this.user.truename,
        PatientName: this.chargeList.name,
        paymethod: 5,
        clinicid: this.clinic,
        patientid: this.chargeList.patientid,
        registid: this.chargeList.registid,
        totalprice: this.sbRegist.data.szsbprice,
        realprice: this.sbRegist.data.szsbprice, // 实际支付金额(所有支付方式支付总和)
        reduceprice: 0,
        payprice: this.sbRegist.data.szsbprice,   // 实际付款金额
        items: list,
      };

      httpServerNormal(chargeForHIS, data);
    },
    // 交易明细查询
    detailQuery() {
      httpServerNormal(cfquery, {
        transBody: {
          akc190: this.chargeList.registid,
        },
      });
    },
    // 录入、试算、结算失败的重置
    reset() {
      this.sbInput.show = false;
      this.socialSecurityPay.price = 0;
      this.socialSecurityPay.readCardStatus = 0;
    },
    // 关闭浏览器
    closeWindow() {
    },
    // 清单打印
    call_list_print() {
      const change = this.change ? parseFloat(this.change) : 0;
      const realPay = parseFloat(this.payObj.realPay) - change;
      const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
      const needPay = this.chargeList.total_price;
      this.chargeList.discount = discount;
      this.chargeList.needPay = needPay;
      this.chargeList.realPay = realPay;
      this.set_feePrintMsg(this.chargeList);
      window.open('/print/feePrint');
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic', 'user', 'bindSbMsg', 'seriesCode']),
    needPay() {
      const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
      const total = parseFloat(this.chargeList.total_price);
      const needPay = total - discount;
      return needPay < 0 ? 0 : needPay.toFixed(2);
    },
    change() {
      let exchange = '';
      const realPay = this.payObj.realPay ? parseFloat(this.payObj.realPay) : 0;
      if (this.socialSecurityPay.isChekced) {
        exchange = realPay - this.cashPay;
      } else {
        const needPay = (this.changePrice && this.payObj.realprice) ? this.payObj.realprice : this.needPay;
        exchange = realPay - needPay;
      }
      return exchange < 0 ? '' : exchange.toFixed(2);
    },
    // 社保总价
    sbToatlPrice() {
      const items = this.chargeList.items || [];
      let price = 0;
      items.forEach((obj) => {
        if (obj.type === 1) {
          price += obj.data.szsbprice;
        } else {
          price += obj.data.szsbtotalprice;
        }
      });
      return price.toFixed(2);
    },
  },
  props: {
    chargeList: {
      type: Object,
    },
  },
  watch: {
    payObj: {
      handler() {
        // 折扣不能大于总价
        const total = parseFloat(this.chargeList.total_price);
        const discount = this.payObj.discount ? parseFloat(this.payObj.discount) : 0;
        if (discount > total) {
          this.$message({
            type: 'error',
            message: '减免金额不能大于总金额',
            duration: 1000,
            showClose: true,
          });
          this.payObj.discount = '';
          return;
        }
        if (this.change !== '' && this.startToCompute) {
          this.showRedBorder = false;
        }
      },
      deep: true,
    },
  },
  components: { SbLoading },
  created() {
    this.AKA130 = AKA130;
    UnloadConfirm.MSG_UNLOAD = '您确定要离开吗？';
    UnloadConfirm.set = (a) => {
      window.onbeforeunload = (b) => {
        this.cancelCharge();
        b = b || window.event;
        b.returnValue = a;
        return a;
      };
    };
    UnloadConfirm.clear = () => {
      window.onbeforeunload = () => {};
    };
  },
  mounted() {
    UnloadConfirm.set(UnloadConfirm.MSG_UNLOAD);
    // 判断是否对接医保
    if (this.bindSbMsg && this.bindSbMsg.hospitalCode) {
      this.isSocialSecuritySupport = true;
      this.theCode = this.bindSbMsg.hospitalCode;
      this.init();
    }
  },
  destroyed() {
    UnloadConfirm.clear();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
// pay模态
.pay_info {
  @include modify_info;
  overflow: auto;
  .container{
    top: 100px;
    transform: translate(-50%, 0);
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
      .other {
        .top {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 10px;
        }
      }
      p {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        .el-input {
          width: 60%;
        }
        span, .read {
          float: right;
        }
        &.keywords {
          padding-left: 150px;
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
        &.inputPrice{
          padding-left: 120px;
          // color: $mainColor;
          // font-size: 12px;
          height: 20px;
          line-height: 20px;
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
  .progress{
    position: absolute;
    padding: 20px;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      right: 10px;
      top: 0;
      padding: 6px;
      font-size: 20px;
      cursor: pointer;
    }
    .loading{
      margin-top: 20px;
    }
  }
}
</style>
