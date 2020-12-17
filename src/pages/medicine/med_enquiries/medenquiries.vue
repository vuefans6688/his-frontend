<template>
  <div class="medenquiries">
    <div class="header">
        <!-- <el-button type="primary" class="titel">药品总库存</el-button> -->
      <div class="menu">
        <div class="search">
          <span class="">药品名称:</span>
          <input placeholder="" class="search_ipt myInput" v-model="userDatas.ipt" size="small">
        </div>
        <div class="med_classification m_l10">
          <span>处方分类:</span>
          <el-select v-model="userDatas.class" placeholder="请选择" class="med_type_select" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="med_classification m_l40"><el-button type="primary" size="small" @click="upToShebao" v-if="BindSB">上传社保库存</el-button></div>
        <!-- <div class="med_classification m_l40"><el-button type="primary" size="small" @click="deleteSb" v-if="BindSB">撤销社保库存</el-button></div> -->
        <!-- <div class="showstrop fl m_l40">
          <el-radio-group v-model="userDatas.radio">
            <el-radio :label="1">显示空库存</el-radio>
            <el-radio :label="2">显示库存</el-radio>
          </el-radio-group>
          <input type="text" v-model="userDatas.val1" class="btn1">-<input type="text" v-model="userDatas.val2" class="btn1">
        </div> -->
        <!-- <el-button type="primary" class="m_l10"  size="small" @click="find">搜索</el-button> -->
        <!-- <el-button type="primary" class="fr"  size="small">导出Excel</el-button> -->
      </div>
    </div>
    <div class="content">
      
      <!-- 库存表格 -->
      <div class="m_t10">
        <el-table :data="msg" style="width: 100%" class="med_tab" stripe>
          <el-table-column type="index" label="序号" align="center">
          </el-table-column>
          <el-table-column prop="product_name" label="药品名称" align="center">
          </el-table-column>
          <!-- <el-table-column prop="batchNum" label="批号" align="center">
          </el-table-column> -->
          <el-table-column label="处方分类" align="center">
            <template slot-scope="scope">
              {{ scope.row.drugtype | drugtype }}
            </template>
          </el-table-column>
          <el-table-column prop="specs_txt" label="药品规格" align="center">
          </el-table-column>
          <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column prop="push_id" label="批号" align="center">
          </el-table-column>
          <el-table-column label="处方价" align="center">
            <template slot-scope="scope">
              {{ scope.row.cf_price}}元/{{ scope.row.count_ulname }}
            </template>
          </el-table-column>
          <el-table-column label="零售价" align="center">
            <template slot-scope="scope">
              {{ scope.row.saleprice}}元/{{ scope.row.count_ulname }}
            </template>
          </el-table-column>
          <el-table-column label="库存" align="center">
            <template slot-scope="scope">
              {{scope.row.count_ulunit | count_ulunit }}{{scope.row.count_ulname}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="currentPage4" :page-size="15"
      @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { stockquery, drugStore, drugDeleteStore } from '@apiNormal';
import connectionTest from '@/common/js/connection';

export default{
  data() {
    return {
      options: [{ value: '', label: '全部' }, { value: '1', label: '中药' }, { value: '0', label: '西/中成药' }],
      total: 0,
      currentPage4: 1,
      pageindex: 0,
      msg: [],
      arr2: [], // 用作存剩下的药品数组
      inputList: [], // 传到社保的药品数组
      BindSB: false, // 是否绑定社保
      userDatas: {
        ipt: '',
        class: '',
        val1: '',
        val2: '',
        radio: '',
      },
    };
  },
  methods: {
    find() {
      this.$http.post('/service/drug/stockquery', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          pageid: this.pageindex,
          pagesize: 15,
          clinic_id: this.clinic,
          query_by_names: this.userDatas.ipt,
          query_by_type: this.userDatas.class,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          if (!res.data.data) { // 如果没有则返回空
            this.msg = [];
          } else {
            this.msg = res.data.data.context || [];
            this.total = res.data.data.pagecount || 0;
          }
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
          this.msg = [];
        }
      }).catch();
    },
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.find();
    },
    // 点击上传社保
    async upToShebao() {
      // 是否绑定社保 是否打开客户端
      const a = await connectionTest();
      if (a === '1') {
        httpServerNormal(stockquery, {
          pageid: 0,
          pagesize: 99999999,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            const msgAll = res.context || [];
            const inputList = [];
            msgAll.forEach((val) => {
              if (val.druginfo.ake001 && val.druginfo.ake001 !== '' && val.druginfo.szsbstatus === 1) {
                const obj = {
                  push_id: Number(val.push_id), // 批号
                  stock_record_id: val.purchase_sn, // 库存明细流水号
                  standard_code: val.druginfo.standard_number, // 药品本位码
                  drug_code: val.druginfo.ake001, // 药品编码
                  drug_name: val.druginfo.product_name, // 药品名称
                  std: val.druginfo.aka074, // 规格
                  unit: val.count_ulname, // 药库单位
                  stock_number: Number(val.count_ulunit), // 药库单位数量（在架库存）
                  bid: Number(val.druginfo.shebao_price), // 进价
                  retail_price: Number(val.druginfo.shebao_price), // 零售价
                  bid_amount: val.druginfo.shebao_price * val.count_ulunit, // 进价金额
                  retail_amount: val.druginfo.shebao_price * val.count_ulunit, // 零价金额
                  stocktime: Number('20' + val.druginfo.create_time.toString().substr(0, 12)), // 库存清点时间
                  acceptime: Number(new Date().format('yyyyMMddhhmmss')), //   验收时间
                  last_editedtime: Number(val.last_edit_time), // pos最后编辑时间
                  validtime: Number(new Date(val.validtime).format('yyyyMMdd')), // 有效期
                };
                inputList.push(obj);
                this.inputList = inputList;
              }
            });
            if (this.inputList.length > 50) {
              const arrInside = this.inputList.slice(0, 49);
              const arr2Inside = this.inputList.slice(50);
              this.arr2 = arr2Inside;
              this.ToSocialSecurity(arrInside);
            } else {
              this.ToSocialSecurity(this.inputList);
              this.arr2 = [];
            }
          }
        });
      }
    },
    // 点击撤销社保
    async deleteSb() {
       // 是否绑定社保 是否打开客户端
      const a = await connectionTest();
      if (a === '1') {
        httpServerNormal(stockquery, {
          pageid: 0,
          pagesize: 99999999,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            const msgAll = res.context || [];
            const inputList = [];
            msgAll.forEach((val) => {
              if (val.druginfo.ake001 && val.druginfo.ake001 !== '') {
                const obj = {
                  revoke_type: '4', // 撤销类型
                  push_id: Number(val.push_id), // 批号
                  stock_record_id: val.purchase_sn, // 库存明细流水号
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
        });
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
        this.ToSocialSecurity(arr);
        this.arr2 = [];
      }
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
    // 调社保库存
    ToSocialSecurity(arr) {
      httpServerNormal(drugStore, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length > 0) {
            this.makeList(this.arr2);
          } else {
            this.finshstork();
          }
        }
      });
    },
    // 撤销社保库存清点
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
          }
        }
      });
    },
    // 完成上传弹出
    finshstork() {
      this.$message({
        message: '库存成功上传社保',
        type: 'success',
        showClose: true,
        duration: 1000,
      });
    },
    // 判断是否绑定社保
    judgeBindSB() {
      if (this.bindSbMsg && this.bindSbMsg.hospitalCode) {
        this.BindSB = true;
      }
    },
  },
  created() {
    httpServerNormal(stockquery, {
      pageid: 0,
      pagesize: 15,
    }).then((res) => {
      if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
        this.msg = res.context || [];
        this.total = res.pagecount || 0;
      }
    });
    this.judgeBindSB();
  },
  filters: {
    drugtype(type) {
      if (type === '0') {
        return '西/中成药';
      }
      if (type === '1') {
        return '中药';
      }
    },
    // 若小数点后超过3位，保留小数点后三位小数
    count_ulunit(unit) {
      if (unit.toString().indexOf('.') !== -1) {
        if (unit.toString().split('.')[1].length > 3) {
          return Number(unit).toFixed(3);
        }
        if (unit.toString().split('.')[1].length <= 3) {
          return unit;
        }
      }
      if (unit.toString().indexOf('.') === -1) {
        return unit;
      }
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic', 'bindSbMsg']),
  },
  watch: {
    userDatas: {
      handler() {
        this.find();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medenquiries{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
    width: 100%;
    margin: 0 auto;
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.titel{
    position: relative;
    left: 50%;
    margin-left: -136px;
    font-size: 16px;
    font-weight: 900;
}
.content{
  margin: 10px auto 0;
  min-width: 1100px;
  width: 100%;
  padding:0 0 0 10px;
}
.search{
  display: inline-block;
}
.med_classification{
  display: inline-block;
}
.med_type_select{
  width: 120px;
}
.btn1{
  outline: none;
  width: 30px;
  height: 28px;
  border: 1px solid #d8dce5;
  border-radius: 4px;
}
.showstrop{
  display: inline-block;
}
.fr{
  float: right;
}
.m_t10{
  margin-top: 10px;
}
.m_t40{
  margin-top: 40px;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
.fl{
  float: left;
}
.menu{
  height: 40px;
  min-width: 1100px;
}
.l_h40{
  line-height: 40px;
}
.m_l40{
  margin-left: 40px;
}
.search_ipt{
  width: 200px;
}
.m_l10{
  margin-left: 10px;
}
</style>
