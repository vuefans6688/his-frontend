<template>
<div class="addstore">
  <div class="header">
    <el-button type="info" @click="goback" size="small">返回</el-button>
    <el-button type="primary" size="small" @click="putinstore">入库</el-button>
  </div>

  <div class="content" id="addstore_con">
    <div class="">
      <span class="fl l_h37">开单日期:</span>
      <span class="fl l_h37 m_l10"><el-date-picker v-model="billingDate" type="date" size="small" class="w200" readonly></el-date-picker></span>

      <span class="fl l_h37 m_l30">制单人:</span>
      <span class="fl l_h37 m_l10">{{voucher}}</span>

      <span class="fl l_h37 m_l30">供应商:</span>
      <el-select v-model="userData.suppliers" placeholder="" class="fl l_h37 m_l10 w158" size="small">
        <el-option v-for="item in Suppliers" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <span class="fl l_h37 m_l30">入库单号:</span>
      <span class="fl l_h37 m_l10">{{ receiptNum }}</span>
    </div>

    <CommonMedicine ref='testAJie' @listenToChildEvent='showchildMsg' @destroyScroll="destroyScroll" @initScroll="initScroll" @send="getSend"></CommonMedicine>
  </div>
</div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { drugBuyin, supplierquerylist } from '@apiNormal';
import { mapGetters } from 'vuex';
import connectionTest from '@/common/js/connection';
import CommonMedicine from '../../common/commonMedicine';

export default {
  data() {
    return {
      receiptNum: '', // 入库单号
      voucher: '', // 制单人
      money: '', // 总金额
      billingDate: new Date(), // 开单日期
      // 供应商
      Suppliers: [],
      // 用户输入数据
      userData: {
        suppliers: '',
        ret: '',
      },
      // 子组件传过来判断药品列表是否为空的信息
      childMes: '',
      dataList: '', // 子组件传过来的药品数组
      arr2: [], // 用作存剩下的药品数组
      inputList: [], // 传到社保的药品数组
      SBtoday: new Date(), // 传到社保的时间
    };
  },
  methods: {
    getSend(dataList) {
      this.dataList = dataList;
    },
    // 子组件的信息赋值
    showchildMsg(data) {
      this.childMes = data;
    },
    goback() {
      this.$router.back();
    },
    destroyScroll() {
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    initScroll() {
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
    },
    // 点击入库
    putinstore() {
      if (this.childMes === '0') {
        this.$alert('请添加药品！', '提示', {
          confirmButtonText: '确定',
          callback: () => {},
        });
      } else {
        this.$confirm('是否确认药品信息已审核，药品入库后将不能修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          let flag = false;
          let mark = false;
          const inputList = [];
          this.dataList.forEach((val) => {
            if (Number(val.push_id) === 0 || Number(val.count_ulunit) === 0 || Number(val.costprice) === 0) {
              mark = true;
              return;
            }
            if (val.ake001 && val.ake001 !== '' && val.szsbstatus === 1) {
              flag = true;
              const obj = {
                push_id: Number(val.push_id), // 批号
                shelves_record_id: val.purchase_sn, // 进货单号或进货序列号
                standard_code: val.standardnumber, // 药品本位码
                drug_code: val.ake001, // 药品编码
                drug_name: val.product_name, // 药品名称
                std: val.aka074, // 规格
                unit: val.count_ulname, // 药库单位
                numbers: parseFloat(val.count_ulunit), // 药库单位数量
                bid: val.shebao_price, // 进价
                retail_price: val.shebao_price, // 零售价
                bid_amount: val.shebao_price * val.count_ulunit, // 进价金额
                retail_amount: val.shebao_price * val.count_ulunit, // 零价金额
                shelvestime: Number(this.SBtoday), // 进药日期
                acceptime: Number(new Date().format('yyyyMMddhhmmss')), //   验收时间
                proc_type: '2', // 采购类型代码(1网上采购；2医院（药店）临购)
                last_editedtime: Number(val.last_edit_time), // pos最后编辑时间
              };
              inputList.push(obj);
              this.inputList = inputList;
            }
          });
          if (mark) {
            this.$message({ type: 'warning', message: '输入框不能为空或0' });
            return;
          }
          if (flag === true) {
            const a = await connectionTest();
            if (a === '1') {
              if (this.inputList.length > 50) {
                const arrInside = this.inputList.slice(0, 49);
                const arr2Inside = this.inputList.slice(50);
                this.arr2 = arr2Inside;
                this.ToSocialSecurity(arrInside);
              } else if (this.inputList.length === 0) {
                this.addStore();
              } else {
                this.arr2 = [];
                this.ToSocialSecurity(this.inputList);
              }
            } else { // 未开客户端
              this.addStore();
            }
          } else { // 没有社保药或者没备案
            this.addStore();
          }
        }).catch();
      }
    },
    // 分割药品数组并调社保客户端
    makeList(arr) {
      if (arr.length > 50) {
        const arrInside = arr.slice(0, 49);
        const arr2Inside = arr.slice(50);
        this.arr2 = arr2Inside;
        this.ToSocialSecurity(arrInside);
      } else {
        this.arr2 = [];
        this.ToSocialSecurity(arr);
      }
    },
    // 调社保客户端
    ToSocialSecurity(arr) {
      httpServerNormal(drugBuyin, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length !== 0) {
            this.makeList(this.arr2);
          } else {
            this.addStore();
          }
        }
      });
    },
    // 调自己系统的入库接口
    addStore() {
      this.$http.post('/service/drug/purchrecodeupdate', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          purchase_sn: this.purchrecodecreate.purchaseSn,
          supplier: this.userData.suppliers,
          batchid: this.userData.ret,
          itemstatus: 3,
          clinic_id: this.clinic,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '入库成功！',
            type: 'success',
          });
          this.$router.back();
        } else if (res.data.errcode === 19) {
          this.$alert('请确认所有信息都已填', '提示', {
            confirmButtonText: '确定',
          });
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '入库失败！',
            type: 'error',
          });
        }
      }).catch();
    },
    // 获取供应商列表
    supplierList() {
      httpServerNormal(supplierquerylist, {
        pageid: 0,
        pagesize: 50,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res.context) {
            res.context.forEach((val) => {
              this.Suppliers.push({ value: val.name, label: val.name });
            });
          }
        }
      });
    },
  },
  components: {
    CommonMedicine,
  },
  computed: {
    ...mapGetters(['purchrecodecreate', 'clinic', 'token', 'bindSbMsg']),
  },
  created() {
    const pur = this.purchrecodecreate;
    this.receiptNum = pur.purchaseSn;
    this.voucher = pur.itemcreator;
    if (pur.createtime) {
      this.SBtoday = Number('20' + pur.createtime.toString().substr(0, 6));
    } else {
      this.SBtoday = Number(new Date().format('yyyyMMdd'));
    }
    this.supplierList();
  },
};
</script>

<style lang="scss" scoped>
.fl{
  float: left;
}
.fr{
  float: right;
}

  /* header里的样式 */
.header{
    width: 100%;
    margin: 0 auto;
    padding: 10px 0 0 10px;
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.save{
    margin-left:10px;
}
.supplier{
    width: 30%;
    float: right;
}
.supplier_inp{
    width: 80%;
    margin-left: 5px;
}
#addstore_con{
  margin: 10px auto 0;
  min-width: 1100px;
  width: 100%;
  padding:0 0 0 10px;
}
i{
  color: red;
}
.m_l10{
  margin-left:10px; 
}
.m_l30{
  margin-left:30px;
}

.l_h37{
  line-height: 37px;
}

.num{
  width: 100px;
  display: inline-block;
}
.lot_num{
  display: inline-block;
  width: 100px;
}
.voucher{
  display: inline-block;
  width: 100px;
}
.search_ipt{
  width: 300px;
}
.search{
  display: inline-block;
}
.mon_total{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #000;
}
.money{
  width: 100px;
  display: inline-block;
  font-weight: 900;
  color: #000;
}
.m_r50{
  margin-right: 50px;
}
.m_b20{
  margin-bottom: 20px;
}
.total{
  font-weight: 900;
  font-size: 16px;
}
.d_inb{
  display: inline-block;
}
.w_200{
  width: 200px;
}
.w158{
  width: 158px;
}
.addstore{
  position: relative;
  padding: 20px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.el-date-editor.el-input{
  width: 158px;
}
</style>
