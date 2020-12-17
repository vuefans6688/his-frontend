<template>
  <div class="content">
    <div class="con_top">
      <div class="search">
        <span class=" m_l10">库存范围:</span>
        <el-input v-model="search.count_from" size="mini" @blur="getStockCountAlert"></el-input>
        -
        <el-input v-model="search.count_to" size="mini" @blur="getStockCountAlert"></el-input>

        <span class=" m_l10">单位:</span>
        <el-select name="med-classification" class="med-classification m_l10 " v-model="search.unit_level" size="small" @change="getStockCountAlert">
          <el-option label="最大单位" :value="1"></el-option>
          <el-option label="二级单位" :value="2"></el-option>
          <el-option label="最小单位" :value="3"></el-option>
        </el-select>
      </div>

      <div class="typeSelect">
        <span class=" m_l10 ">药品类型:</span>
        <el-select name="med-classification" class="med-classification m_l10 " v-model="search.drug_type" size="small" @change="getStockCountAlert">
          <!-- <el-option label="全部" :value="2"></el-option> -->
          <el-option label="西药" :value="0"></el-option>
          <el-option label="中药" :value="1"></el-option>
        </el-select>
      </div>
      <!-- <el-button class=" m_l10" type="primary" @click="search_con">搜索</el-button> -->
      <!-- <el-button class="fr Excel" type="primary" size="small">导出Excel</el-button> -->
    </div>
    <el-table :data="tableData" style="width: 100%" class="m_t20">
      <el-table-column type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="productname" label="药品名称" align="center">
      </el-table-column>
      <el-table-column label="药品分类" align="center">
        <template slot-scope="scope">
          {{scope.row.drugtype | drugtypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="spectxt" label="药品规格" align="center">
      </el-table-column>
      <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column label="预警值" align="center">
        <template slot-scope="scope">
          {{scope.row.stock_alert_count}}
          {{scope.row.stock_alert_unit}}
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          {{scope.row.stock_count}}
          {{scope.row.stock_alert_unit}}
        </template>
      </el-table-column>
      <el-table-column prop="validity_period" label="到期日" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { stockCountAlert } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';

export default {
  data() {
    return {
      // 搜索控制数据
      search: {
        drug_type: 0,
        count_from: '',
        count_to: '',
        unit_level: 1,
      },
      alertType: 'count',
      tableData: [],
      // 分页
      currentPage4: 4,
    };
  },
  methods: {
    chooseCountAlert() {
      this.alertType = 'count';
    },
    chooseExpiredAlert() {
      this.alertType = 'expired';
    },
    getStockCountAlert() {
      const params = {};
      if (this.search.count_from !== '' || this.search.count_to !== '') {
        params.count_from = +this.search.count_from;
        params.count_to = +this.search.count_to;
        if (this.search.unit_level === '') {
          this.$message.error({ duration: 1500, message: '请选择单位' });
        } else {
          params.unit_level = this.search.unit_level;
        }
      }
      params.drug_type = this.search.drug_type;
      httpServerNormal(stockCountAlert, params).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.tableData = res;
        } else { // code错误需要进行的操作
        }
      });
    },
  },
  created() {
    this.getStockCountAlert();
  },
  filters: {
    drugtypeFilter(val) {
      switch (val) {
        case 0:
          return '西药';
        case 1:
          return '中药';

        default:
          return '';
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.content{
  min-width: 1100px;
  margin: 10px auto;
  .con_top{
    height: 40px;
    min-width: 1100px;
    display: flex;
    justify-content: space-between;
    .search{
      // width: 60%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-input{
        width: 60px;
        margin: 0 10px;
      }
    }
    .typeSelect{
      width: 400px;
    }
  }
}
.m_l10{
  margin-left:10px; 
}
.m_t20{
  margin-top: 20px;
}
/* .Excel{
  margin-top: 4px; 
} */
.el-range-editor.el-input__inner{
  padding: 0 10px;
}
</style>
