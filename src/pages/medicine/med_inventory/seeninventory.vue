<template>
<div class="seeninventory">
  <div class="header my_titleInpStyle">
    <span class="m_l10">盘点单号:</span>
    <span class="single_num m_l10">{{single_num}}</span>
    <span class="m_l30">盘点人:</span>
    <span class="voucher m_l10">{{voucher}}</span>
    <span class="m_l30">创建日期:</span>
    <span class="m_l10">{{Creationdate | Time}}</span>
    <span class="m_l30">药品分类:</span>
      <el-select v-model="userData.classification" placeholder="" class="w_120 m_l10" size="small">
        <el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
  </div>

  <div class="content" id="addstore_con">
    <div class="d_inb">
      <el-button type="info" @click="goback" size="small">返回</el-button>
      <!-- <el-button type="danger" @click="deleteSb" size="small" v-if="BindSB">撤销</el-button> -->
    </div>

    <div class="m_t20">
    <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="50" label="序号" align="center">
    </el-table-column>
    <el-table-column prop="push_id" label="入库批号" align="center">
    </el-table-column>
    <el-table-column prop="drugname" label="药品名称" align="center">
    </el-table-column>
    <el-table-column prop="med_class" label="药品分类" align="center">
      <template slot-scope="scope">
        {{ scope.row.drugtype | drugtype }}
      </template>
    </el-table-column>
    <el-table-column prop="drugspec" label="药品规格" align="center">
    </el-table-column>
    <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip align="center">
    </el-table-column>
    <el-table-column label="盘点前" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.count_ulunit}}</span>
        <span>{{scope.row.count_ulname}}</span>
      </template>
    </el-table-column>
    <el-table-column label="盘点后" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.new_count_ulunit}}</span>
        <span>{{scope.row.count_ulname}}</span>
      </template>
    </el-table-column>
    <el-table-column label="盈亏量" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.modification_value}}</span>
        <span>{{scope.row.count_ulname}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="costprice" label="批发价(元)" align="center">
    </el-table-column>
    <el-table-column label="盈亏批发额" align="center">
      <template slot-scope="scope">
        <span>{{(scope.row.new_count_ulunit - scope.row.count_ulunit) * scope.row.costprice}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="modification_note" label="备注" align="center">
    </el-table-column>
  </el-table>

      <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="currentPage" :page-size="10"
        layout="total, prev, pager, next, jumper" :total="total"  @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { mapGetters } from 'vuex';
import { getcheckitemlist, drugDeleteStore } from '@apiNormal';
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      single_num: '',
      voucher: '',
      Creationdate: '',
      optionss: [{ value: '', label: '全部' }, { value: '中药', label: '中药' }, { value: '西药', label: '西药' }],
      tableData: [],
      // recordkey
      recordkey: '',
      // 分页
      currentPage: 1,
      total: 0,
      pageIndex: 0,

      // 输入的数据
      userData: {
        bigunit: '',
        smallunit: '',
        classification: '',
      },
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
    // 分页
    handleCurrentChange(val) {
      this.pageIndex = val - 1;
      this.getcheckitemlist();
    },
    getcheckitemlist() {
      httpServerNormal(getcheckitemlist, {
        pageid: this.pageIndex,
        pagesize: 10,
        clinic_id: this.clinic,
        recordkey: this.recordkey,
      }).then((res) => {
        this.tableData = res.record_arr;
        this.total = res.pagecount;
      });
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
            this.deleteStork();
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
  filters: {
    drugtype(type) {
      if (type === '0') {
        return '西/中成药';
      }
      if (type === '1') {
        return '中药';
      }
    },
    Time(time) {
      const str = '' + time;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic', 'bindSbMsg']),
  },
  created() {
    this.recordkey = JSON.parse(this.$route.query.inventoryData).recordkey;
    this.getcheckitemlist();
    this.single_num = JSON.parse(this.$route.query.inventoryData).serialnum;
    this.voucher = JSON.parse(this.$route.query.inventoryData).creatorname;
    this.Creationdate = JSON.parse(this.$route.query.inventoryData).createtime;
    this.judgeBindSB();
  },
};
</script>

<style scoped lang='scss'>
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.seeninventory{
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
.add_date{
    margin-left: 300px;
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
  line-height: 45px;
}
.single_num{
  width: 100px;
  display: inline-block;
}
.voucher{
  display: inline-block;
  width: 100px;
}
.search_ipt{
  width: 300px;
}
.search1{
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
.del_btn{
    margin-top: 10px;
}
.m_t20{
  margin-top: 20px;
}
.pointer{
  cursor: pointer;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
.w_57{
  width: 57px;
}
.w_120{
  width: 120px;
}
</style>
