<template>
  <div class="day_accounts">
    <h3 class="title">交易明细详情</h3>

    <el-table :data="outputList" stripe style="width: 100%">
      <el-table-column prop="bke384" label="医药机构结算业务序列号"></el-table-column>
      <el-table-column prop="bkf500" label="费用序列号"></el-table-column>
      <el-table-column prop="aae072" label="费用单据号"></el-table-column>
      <el-table-column prop="akc225" label="单价">
        <template slot-scope="scope">
          {{ scope.row.akc225 | priceFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="akc226" label="数量"></el-table-column>
      <el-table-column prop="akc264" label="医疗费总额">
        <template slot-scope="scope">
          {{ scope.row.akc264 | priceFilter }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { dzdetailquery } from '@apiNormal';
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      outputList: [],
    };
  },
  async created() {
    const connectionStatus = await connectionTest();
    if (connectionStatus === '1') {
      this.getSbMenuInfo();
    }
  },
  methods: {
    getSbMenuInfo() {  // 获取交易明细查询
      httpServerNormal(dzdetailquery, {
        transBody: {
          akc190: this.$route.query.akc190,  // 门诊流水号
          bke384: this.$route.query.bke384,  // 医药机构结算业务序列号
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          console.log('dzdetailquery', res);
          this.outputList = res.transBody.outputlist ? res.transBody.outputlist : [];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.day_accounts{
  position: relative;
  padding: 30px 40px 60px 40px;
}
.title {
  text-align: center;
  line-height: 60px;
  font-weight: 600;
}
</style>

