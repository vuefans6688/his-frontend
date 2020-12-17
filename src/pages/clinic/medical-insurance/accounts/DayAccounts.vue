<template>
  <div class="day_accounts">
    <h1 class="main_title">{{ date | dateFilter }}交易流水</h1>
    <hr>

    <el-row class='header'>
      <el-col :span="12"><h1 class="title">HIS系统账单</h1></el-col>
      <el-col :span="12"><h1 class="title">医保系统账单(总计{{allSbList.length}}条)</h1></el-col>
    </el-row>

    <el-row class='table_wrap_row'>
      <el-col class='table_wrap_col' :span='12'>
        <el-table :data="curPageHisList" style="width: 100%" type="index" stripe size='small'>
          <el-table-column align="center" prop="jigousn" label="业务结算号" width="130"></el-table-column>
          <el-table-column align="center" prop="patientname" label="姓名"></el-table-column>
          <el-table-column align="center" prop="chargestatus" label="结算状态" :formatter="chargeStatus"></el-table-column>
          <el-table-column align="center" prop="total" label="医疗费总额"></el-table-column>
          <el-table-column align="center" prop="jijinpay" label="基金支付"></el-table-column>
          <el-table-column align="center" prop="personaccount" label="个人账户支付"></el-table-column>
          <el-table-column align="center" prop="personpay" label="自费"></el-table-column>
        </el-table>
      </el-col>

      <el-col class='table_wrap_col' :span='12'>
        <el-table :data="curPageSbList" style="width: 100%" type="index" stripe size='small'>
          <el-table-column align="center" prop="bke384" label="业务结算号" width="130"></el-table-column>
          <el-table-column align="center" prop="aac003" label="姓名"></el-table-column>
          <el-table-column align="center" prop="aka018" label="结算状态" :formatter='chargeStatus'></el-table-column>
          <el-table-column align="center" prop="akc264" label="医疗费总额"></el-table-column>
          <el-table-column align="center" prop="akb068" label="基金支付"></el-table-column>
          <el-table-column align="center" prop="akb066" label="个人账户支付"></el-table-column>
          <el-table-column align="center" prop="akb067" label="自费"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail(scope.row.akc190, scope.row.bke384)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span='12' class='page_wrap'>
        <el-pagination :page-size="this.hisPagenition.pagesize" layout="total, prev, pager, next, jumper" :total="this.allHisList.length" @current-change="hisPageChage"></el-pagination>
      </el-col>
      <el-col :span='12' class='page_wrap'>
        <el-pagination :page-size="this.sbPagenition.pagesize" layout="total, prev, pager, next, jumper" :total="this.allSbList.length" @current-change="sbPageChage"></el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { dzquery, szsbchargequery } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      date: '',
      // 加载时获取所有数据
      allSbList: [],
      allHisList: [],
      hisPagenition: {
        pagesize: 10,
        currentpage: 0,
      },
      sbPagenition: {
        pagesize: 10,
        currentpage: 0,
      },
    };
  },
  methods: {
    detail(akc190, bke384) {
      this.$router.push({ path: '/navigator/settings/medicalInsurance/accounts/detail', query: { akc190, bke384 } });
    },
    // 结算状态过滤
    chargeStatus(row, column, cellValue) {
      if (cellValue === 1 || cellValue === '1') {
        return '正常';
      } else if (cellValue === 2 || cellValue === '2') {
        return '撤销';
      } else if (cellValue === 3 || cellValue === '3') {
        return '退费';
      }
      return 'error';
    },
    // his分页
    hisPageChage(index) {
      this.hisPagenition.currentpage = index - 1;
    },
    // client分页
    sbPageChage(index) {
      this.sbPagenition.currentpage = index - 1;
    },
    // 社保流水获取
    getSblist(pageno) {
      httpServerNormal(dzquery, {
        transBody: {
          // bad766: parseFloat(new Date(this.date).format('yyyyMMdd')),
          bad766: Number(this.date),
          pageno: pageno,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 当前页请求成功
          this.allSbList = this.allSbList.concat(res.transBody.outputlist);
          // 若还有数据 继续获取
          if (res.transBody.endpage === '0') {
            this.getSblist(pageno + 1);
          } else {  // 所有数据获取完毕
            this.sbSortWithBke384();
          }
        }
      });
    },
    // 按照业务结算号排序
    sbSortWithBke384() {
      this.allSbList.sort((obj1, obj2) => {
        return obj2.bke384 - obj1.bke384;
      });
    },
    // his流水获取
    getHisList() {
      httpServerNormal(szsbchargequery, {
        reqdate: Number(this.date),
        // reqdate: parseFloat(new Date(this.date).format('yyyyMMdd')),
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.allHisList = res.data || [];
          this.allHisList.sort((obj1, obj2) => {
            return obj2.jigousn - obj1.jigousn;
          });
        }
      });
    },
  },
  computed: {
    // 社保流水当前页
    curPageSbList() {
      const pagecount = Math.ceil(this.allSbList.length / this.sbPagenition.pagesize);
      if (this.sbPagenition.currentpage === pagecount - 1) {
        return this.allSbList.slice(this.sbPagenition.currentpage * this.sbPagenition.pagesize);
      }
      return this.allSbList.slice(this.sbPagenition.currentpage * this.sbPagenition.pagesize,
        (this.sbPagenition.currentpage + 1) * this.sbPagenition.pagesize);
    },
    // his流水当前页
    curPageHisList() {
      const pagecount = Math.ceil(this.allHisList.length / this.hisPagenition.pagesize);
      if (this.allHisList.currentpage === pagecount - 1) {
        return this.allHisList.slice(this.hisPagenition.currentpage * this.hisPagenition.pagesize);
      }
      return this.allHisList.slice(this.hisPagenition.currentpage * this.hisPagenition.pagesize,
        (this.hisPagenition.currentpage + 1) * this.hisPagenition.pagesize);
    },
  },
  async created() {
    // this.date = parseInt(this.$route.params.date, 10);
    this.date = this.$route.params.date;
    const connectionStatus = await connectionTest();
    if (connectionStatus === '1') {
      this.getSblist(1);
    }
    this.getHisList();
  },
  filters: {
    dateFilter(string) {
      return string.substring(0, 4) + '年' + string.substring(4, 6) + '月' + string.substring(6, 8) + '日';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.day_accounts{
  position: relative;
  padding: 30px 40px 60px 40px;
  .main_title{
    text-align: center;
  }
  .header{
    text-align: center;
  }
  .table_wrap_row{
    .table_wrap_col{
      padding: 30px;
    }
  }
  
  .el-table .el-table__body-wrapper .el-table__body .el-table__row .cell .el-button{
    padding: 0;
    font-size: 14px;
  }
  .page_wrap{
    text-align: center;
  }
}
</style>

