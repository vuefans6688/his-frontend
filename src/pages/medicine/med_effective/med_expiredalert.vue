<template>
  <div class="content">
    <div class="con_top">
      <div class="timeSelect">
        <strong>日期：</strong>
        <el-date-picker v-model="dateVal" size="small" unlink-panels :editable="false" :clearable="false" type="daterange" :picker-options="pickerOptions"></el-date-picker>
      </div>
      <div class="typeSelect">
        <span class=" m_l10 ">药品类型:</span>
        <el-select name="med-classification" class="med-classification m_l10 " v-model="drug_type" size="small" @change="getList">
          <!-- <el-option label="全部" :value="2"></el-option> -->
          <el-option label="西药" :value="0"></el-option>
          <el-option label="中药" :value="1"></el-option>
        </el-select>
      </div>
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
      <el-table-column prop="med_store" label="库存" align="center">
        <template slot-scope="scope">
          {{scope.row.count_ulunit}}{{scope.row.count_ulname}}
        </template>
      </el-table-column>
      <el-table-column label="到期日" align="center">
        <template slot-scope="scope">
          {{scope.row.validtime | timeFilter}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { stockExpiredAlert } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';

export default {
  data() {
    return {
      dateVal: [new Date(), new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30))],   // 日期
      // 搜索控制数据
      expired_date: new Date(),
      drug_type: 0,
      alertType: 'count',
      tableData: [],
      // 日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: '未来一月',
            onClick(picker) {
              const start = new Date();
              const end = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30));
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '未来三月',
            onClick(picker) {
              const start = new Date();
              const end = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 91));
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '未来半年',
            onClick(picker) {
              const start = new Date();
              const end = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 183));
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '未来一年',
            onClick(picker) {
              const start = new Date();
              const end = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 364));
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    changeTime(time) {
      this.expired_date = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * time));
      this.getList();
    },
    getList() {
      httpServerNormal(stockExpiredAlert, {
        drug_type: this.drug_type,
        // expired_date: this.expired_date.format('yyyy-MM-dd'),
        begin_date: this.dateVal[0].format('yyyy-MM-dd'),
        end_date: this.dateVal[1].format('yyyy-MM-dd'),
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.tableData = res;
        } else { // code错误需要进行的操作
          this.tableData = [];
        }
      });
    },
  },
  created() {
    this.getList();
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
    timeFilter(val) {
      return new Date(val).format('yyyy-MM-dd');
    },
  },
  watch: {
    dateVal: {
      handler() {
        this.getList();
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
.med-classification{
  width: 110px;
  height: 30px;
}
.content{
  min-width: 1100px;
  margin: 10px auto;
  .con_top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .timeSelect{
      span{
        color: $mainColor;
        margin-left: 10px;
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
.search{
  width: 220px;
  display: inline-block;
}
/* .Excel{
  margin-top: 4px; 
} */
.el-range-editor.el-input__inner{
  padding: 0 10px;
}
</style>
