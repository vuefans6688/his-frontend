<template>
<div class="newinventory">
  <div class="header my_titleInpStyle">
    <el-button type="info" @click="goback" size="small">返回</el-button>
    <el-button type="primary" @click="complete" size="small">完成盘点</el-button>
    <div class="d_inb"> <i class="el-icon-warning m_l30" style="color:#eb9e05"></i> <span class="m_l10" style="color:#878d99">在盘点完成之前请勿进行药品销售或进出库</span></div>
  </div>

  <div class="content" id="addstore_con">
    <div class="">
      <span class="m_l10">盘点单号:</span>
      <span class="single_num m_l10">{{single_num}}</span>
      <span class="m_l30">盘点人:</span>
      <span class="voucher m_l10">{{voucher}}</span>
      <span class="m_l30">创建日期:</span>
      <span class="m_l10">{{Creationdate | Time}}</span>
      <!-- <span class="m_l30">药品分类:</span>
      <el-select v-model="userData.classification" placeholder="" class="w_120 m_l10" size="small">
        <el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
    </div>

    <div class="m_t20">
      <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center">
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
      <el-table-column prop="push_id" label="批号" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="盘点前" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.count_ulunit}}</span>
          <span>{{scope.row.bigunit}}</span>
        </template>
      </el-table-column>
      <el-table-column label="盘点后" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-input v-model="scope.row.new_count_ulunit" class="d_inb w_70" size="small" @blur="updataSave(scope.row)"
          @keyup.native="limit(scope.$index, 'count_ulunit')" @change="calculate(scope.row)"></el-input>
          <span>{{scope.row.count_ulname}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="小单位" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.count_umunit" class="d_inb w_70" size="small" @blur="updataSave(scope.row)" @keyup.native="limit(scope.$index, 'count_umunit')"></el-input>
          <span>{{scope.row.count_umname}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="盈亏量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.modification_value}}</span>
          <span>{{scope.row.count_ulname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costprice" label="批发价（元）" align="center">
      </el-table-column>
      <el-table-column label="盈亏批发额（元）" align="center">
        <template slot-scope="scope">
          <span>{{(scope.row.new_count_ulunit - scope.row.count_ulunit) * scope.row.costprice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.modification_note" class="d_inb" size="small" @blur="updataSave(scope.row)" type="textarea" autosize></el-input>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="currentPage" :page-size="10"
        @current-change="handleCurrentChange"
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
import { getcheckitemlist, updatecheckeditem, finishstockcheck, drugPandian } from '@apiNormal';
import { floatLimit } from '@/utils/inputLimit';
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      inventoryData: '',
      single_num: '',
      voucher: '',
      Creationdate: '',
      optionss: [{ value: '', label: '全部' }, { value: '中药', label: '中药' }, { value: '西药', label: '西药' }],
      tableData: [],
      inputList: [], // 药品数组
      arr2: [], // 用作存剩下的药品数组
      BindSB: false, // 是否绑定社保
      // 分页
      currentPage: 1,
      total: 0,
      pageIndex: 0,
      // 用户数据
      userData: {
        classification: '',
      },
    };
  },
  methods: {
    goback() {
      this.$router.back();
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
    // 分割与调社保之间的中间函数
    midTransit() {
      if (this.arr2.length > 0) {
        this.makeList(this.arr2);
      } else {
        this.ToSocialSecurity(this.arr2);
      }
    },
    // 调社保客户端
    ToSocialSecurity(arr) {
      httpServerNormal(drugPandian, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length === 0) {
            this.finishstockcheck();
          } else {
            this.midTransit();
          }
        }
      });
    },
    // 调自己系统的完成接口
    finishstockcheck() {
      const queryObj = JSON.parse(this.$route.query.inventoryData);
      httpServerNormal(finishstockcheck, {
        clinic_id: this.clinic,
        recordkey: queryObj.recordkey,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({
            message: '盘点成功',
            type: 'success',
            showClose: true,
            duration: 1000,
          });
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }
      });
    },
    // 点击完成盘点
    complete() {
      this.$confirm('完成盘点后将不能对盘点单进行编辑, 是否完成?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        // 是否绑定社保 是否打开客户端
        const a = await connectionTest();
        if (a === '1') {
          this.getcheckitemlistAll();
        } else {
          this.finishstockcheck();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          showClose: true,
          duration: 1000,
        });
      });
    },
    // 请求盘点条目
    getcheckitemlist(val) {
      const queryObj = JSON.parse(this.$route.query.inventoryData);
      httpServerNormal(getcheckitemlist, {
        pageid: val,
        pagesize: 10,
        clinic_id: this.clinic,
        recordkey: queryObj.recordkey,
      }).then((res) => {
        this.tableData = [];
        this.tableData = res.record_arr;
        this.total = res.pagecount;
      });
    },
    // 请求全部盘点条目
    getcheckitemlistAll() {
      const queryObj = JSON.parse(this.$route.query.inventoryData);
      httpServerNormal(getcheckitemlist, {
        pageid: 0,
        pagesize: 9999999,
        clinic_id: this.clinic,
        recordkey: queryObj.recordkey,
      }).then((res) => {
        const inputList = [];
        const today = new Date();
        const queryObj = JSON.parse(this.$route.query.inventoryData);
        res.record_arr.forEach((val) => {
          if (val.ake001 && val.ake001 !== '' && val.szsbstatus === 1) {
            const obj = {
              push_id: Number(val.push_id), // 批号
              inventory_record_id: queryObj.serialnum, // 盘点明细流水号
              standard_code: val.standardnumber, // 药品本位码
              drug_code: val.ake001, // 药品编码
              drug_name: val.drugname, // 药品名称
              std: val.aka074, // 规格
              unit: val.count_ulname, // 药库单位
              inventory_number: Number(val.count_ulunit), // 药库单位数量（盘点时）
              bid: Number(val.shebao_price), // 进价
              retail_price: Number(val.shebao_price), // 零售价
              bid_amount: val.shebao_price * val.count_ulunit, // 进价金额
              retail_amount: val.shebao_price * val.count_ulunit, // 零价金额
              inventorytime: Number('20' + queryObj.createtime.toString().substr(0, 12)), // 盘点时间
              acceptime: Number(today.format('yyyyMMddhhmmss')), //   验收时间
              last_editedtime: Number(val.last_edit_time), // pos最后编辑时间
              validtime: Number(new Date(val.validtime).format('yyyyMMdd')),
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
      });
    },
    // 只能输入数字，后三位小数
    limit(index, str) {
      this.tableData[index][str] = floatLimit(this.tableData[index][str], 3);
    },
    // 取消焦点保存
    updataSave(val) {
      if (val.new_count_ulunit !== '' & val.modification_value !== '') {
        httpServerNormal(updatecheckeditem, {
          stockcheckkey: val.stockcheckkey,
          new_count_ulunit: Number(val.new_count_ulunit),
          modification_value: Number(val.modification_value),
          modification_note: val.modification_note,
          clinic_id: this.clinic,
        }).then(() => {
        });
      }
    },
    calculate(val) {
      val.modification_value = val.new_count_ulunit - val.count_ulunit;
      val.profit_loss = val.modification_value * val.costprice;
    },
    // 分页
    handleCurrentChange(val) {
      this.getcheckitemlist(val - 1);
    },
    // 判断是否绑定社保
    judgeBindSB() {
      if (this.bindSbMsg && this.bindSbMsg.hospitalCode) {
        this.BindSB = true;
      }
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic', 'bindSbMsg']),
  },
  created() {
    this.getcheckitemlist(0);
    const jsonData = JSON.parse(this.$route.query.inventoryData);
    this.single_num = jsonData.serialnum;
    this.voucher = jsonData.creatorname;
    this.Creationdate = jsonData.createtime;
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
    Time(time) {
      const str = '' + time;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.newinventory{
  position: relative;
  padding: 30px 40px;
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
  min-width: 1100px;
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
.w_70{
  width: 70px;
}
.w_120{
  width: 120px;
}
</style>
