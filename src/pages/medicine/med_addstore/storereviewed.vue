<template>
<div class="storereviewed">
  <div class="header">
    <div class="single fl l_h49">
      <span class="m_l10">入库单号:</span>
      <span class="single_num">{{single_num}}</span>
    </div>
    <div class="fl l_h49 m_l30">
      <span class="m_l10">制单人:</span>
      <span class="voucher">{{voucher}}</span>
    </div>
    <div class="fl l_h49 m_l30">
        <span class="m_l10">制单日期:</span>
        <span class="making_date">{{ making_date | aaabbb }}</span>
    </div>
    <div class="fl l_h49 m_l30">
      <span class="m_l10">供应商:</span>
      <span class="suppliers">{{suppliers}}</span>
    </div>
  </div>

  <div class="content" id="addstore_con">
    <div class="d_inb">
      <el-button type="info" @click="goback" size="small">返回</el-button>
      <!-- <el-button type="danger" @click="deleteSb" size="small" v-if="BindSB">撤销</el-button> -->
    </div>
    <div class="mon_total fr m_r50 m_b20">
      <span class="total">入库总金额:</span>
      <span class="money m_l10">{{money}} 元</span>
    </div>

    <div class="m_t20">
    <el-table :data="tableData" style="width: 100%" >
    <el-table-column type="index" width="50" label="序号" align="center">
    </el-table-column>
    <el-table-column prop="product_name" label="药品名称"  align="center">
    </el-table-column>
    <el-table-column prop="specs_txt" label="药品规格"  align="center">
    </el-table-column>
    <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip width="190" align="center">
    </el-table-column>
    <el-table-column prop="count_ulunit" label="数量" width="100" align="center">
    </el-table-column>
    <el-table-column prop="count_ulname" label="单位" width="100" align="center">
    </el-table-column>
    <el-table-column prop="costprice" label="批发价"  align="center">
      <template slot-scope="scope">
        {{ scope.row.costprice}}元/{{ scope.row.count_ulname }}
      </template>
    </el-table-column>
    <el-table-column prop="cf_price" label="处方价"  align="center">
      <template slot-scope="scope">
        {{ scope.row.cf_price}}元/{{ scope.row.count_ulname }}
      </template>
    </el-table-column>
    <el-table-column prop="saleprice" label="零售价" align="center">
      <template slot-scope="scope">
        {{ scope.row.saleprice}}元/{{ scope.row.count_ulname }}
      </template>
    </el-table-column>
    <el-table-column prop="push_id" label="批号" align="center" width="190">
    </el-table-column>
    <!-- <el-table-column  prop="wholesale_amount" label="批发额" align="center">
    </el-table-column> -->
    <!-- <el-table-column  prop="Production_date" label="生产日期" align="center">
    </el-table-column> -->
    <el-table-column label="到期日" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.validtime | timeF }}</span>
      </template>
    </el-table-column>
  </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="currentPage4" :page-size="10" @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { mapGetters } from 'vuex';
import { drugDeleteStore } from '@apiNormal';
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      total: 1,
      single_num: '',
      voucher: '',
      suppliers: '',
      money: '',
      making_date: '',
    //   分页
      currentPage4: 1,
      tableData: [],
      BindSB: false,
    };
  },
  methods: {
    // 判断是否绑定社保
    judgeBindSB() {
      if (this.bindSbMsg && this.bindSbMsg.hospitalCode) {
        this.BindSB = true;
      }
    },
    goback() {
      this.$router.back();
    },
    del(a) {
      this.tableData.splice(a, 1);
    },
    // 分页
    handleCurrentChange(val) {
      const msgid = new Date().getTime().toString();
      const page = val - 1;
      this.$http.post('/service/drug/purchasequeryitems', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: msgid,
        },
        body: {
          pageid: page,
          pagesize: 10,
          purchase_sn: this.purchrecodecreate.row.purchase_sn,
          clinic_id: this.clinic,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.tableData = res.data.data.context;
          this.total = res.data.data.pagecount;
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
        }
      }).catch();
    },
    // 点击撤销社保
    async deleteSb() {
      // 是否绑定社保 是否打开客户端
      const a = await connectionTest();
      if (a === '1') {
        const inputList = [];
        this.tableData.forEach((val) => {
          if (val.ake001 && val.ake001 !== '') {
            const obj = {
              revoke_type: '1', // 撤销类型
              push_id: Number(val.push_id), // 批号
              inventory_record_id: val.purchase_sn, // 库存明细流水号
            };
            inputList.push(obj);
            this.inputList = inputList;
          }
        });
        // 开始撤销医保库存
        if (this.inputList.length > 50) {
          const arrInside = this.inputList.slice(0, 49);
          const arr2Inside = this.inputList.slice(50);
          this.arr2 = arr2Inside;
          this.deleteShebao(arrInside);
        } else {
          this.deleteShebao(this.inputList);
          this.arr2 = [];
        }
      }
    },
    // 调撤销社保库存清点
    deleteShebao(arr) {
      httpServerNormal(drugDeleteStore, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length > 0) {
            this.makeListDelete(this.arr2);
          } else {
            // this.deleteSb();
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'success',
              message: '撤销成功',
            });
          }
        }
      });
    },
    // 撤销分割药品数组并调社保客户端
    makeListDelete(arr) {
      if (arr.length > 50) {
        const arrInside = arr.slice(0, 49);
        const arr2Inside = arr.slice(50);
        this.arr2 = arr2Inside;
        this.deleteShebao(arrInside);
      } else {
        this.deleteShebao(arr);
        this.arr2 = [];
      }
    },
  },
  created() {
    this.single_num = this.purchrecodecreate.row.purchase_sn;
    this.voucher = this.purchrecodecreate.row.creatorname;
    this.suppliers = this.purchrecodecreate.row.supplier;
    this.money = this.purchrecodecreate.row.allcost;
    this.making_date = this.purchrecodecreate.row.createtime;
    this.$http.post('/service/drug/purchasequeryitems', {
      head: {
        accessToken: this.token,
        lastnotice: 0,
      },
      body: {
        clinic_id: this.clinic,
        purchase_sn: this.purchrecodecreate.row.purchase_sn,
        pagesize: 10,
        pageid: 0,
      },
    }).then((res) => {
      if (res.data.errcode === 0) {
        this.tableData = res.data.data.context;
        this.total = res.data.data.pagecount;
      } else {
        this.$message({
          showClose: true,
          duration: 1000,
          type: 'error',
          message: res.data.errmsg,
        });
      }
    }).catch();
    this.judgeBindSB();
  },
  computed: {
    ...mapGetters(['purchrecodecreate', 'clinic', 'token', 'bindSbMsg']),
  },
  filters: {
    timeF(validtime) {
      return new Date(validtime).format('yyyy-MM-dd');
    },
    aaabbb(str1) {
      const str = '20' + str1 + '';
      return str.substring(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    },
  },
  beforeDestroy() {
    this.$store.commit('send_purchrecodecreate', '');
    this.tableData = [];
  },
};
</script>

<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.storereviewed{
  position: relative;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}

.fl{
    float: left;
}
.fr{
    float: right;
}


  /* header里的样式 */
.header{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.supplier{
    width: 30%;
    float: right;
}
#addstore_con{
    width: 92%;
    margin: 10px auto;
}
.m_l10{
  margin-left:10px; 
}
.m_l30{
  margin-left:30px;
}
.l_h49{
  line-height: 49px;
}
.single_num{
  display: inline-block;
}
.voucher{
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
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
</style>
