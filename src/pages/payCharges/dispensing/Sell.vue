<template>
  <div class="Sell">
    <div class="header my_titleInpStyle">
      <span>客户：</span>
      <input v-model="userData.ret" placeholder="客户姓名或手机号" size='small' class="myInput">
      <DateRangePicker :value='userData.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
      <el-button type="text" class="m_l20" size='small' @click="reflesh"><i class="el-icon-refresh"></i> 刷新</el-button>
    </div>

    <div class="content">
      <el-table :data="tableData" class="m_t20" align='center' size='medium' stripe>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="patient_name" label="姓名" align='center'>
        </el-table-column>
        <el-table-column prop="patient_phone" label="手机号" align='center'>
        </el-table-column>
        <el-table-column label="就诊日期" align='center'>
          <template slot-scope="scope">
            {{ scope.row.create_time | aaabbb }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="dispensing_class" label="发药类别" align='center'>
          <template slot-scope="scope">
            {{ scope.row.item_type | type11 }}
          </template>
        </el-table-column> -->
        <el-table-column prop="total_price" label="药品金额" align='center'>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
            <span class="spans" @click="sandpills(scope.row.items)">发药</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page='pageindex+1' :page-size="pagesize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      userData: {
        ret: '', // 客户姓名或手机号
        dateVal: [new Date(), new Date()], // 日期
        pillclass: '', // 发药类别
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      tableData: [],
      pillclass: [
        {
          value: '',
          label: '全部',
        }, {
          value: '零售发药',
          label: '零售发药',
        }, {
          value: '处方发药',
          label: '处方发药',
        },
      ],
      // 分页
      total: 0,
      pagesize: 10,
      pageindex: 0,
    };
  },
  methods: {
    handleCurrentChange(val) { // 分页
      this.pageindex = val - 1;
      this.deliverlist();
    },
    sandpills(val) {
      this.$router.push({ name: 'Pills' });
      this.$store.commit('send_purchrecodecreate', { val });
    },
    // 显示发药列表
    deliverlist() {
      this.$http.post('/service/drugdeliver/list', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          pageindex: this.pageindex, // 必填
          pagesize: this.pagesize, // 必填
          clinic_id: this.clinic, // 必填
          status: 0, // 必填
          date_from: this.userData.dateVal[0].format('yyMMdd'),
          date_to: this.userData.dateVal[1].format('yyMMdd'),
          name: this.userData.ret,  // 客户名字
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.tableData = res.data.data.items || [];
          this.total = res.data.data.total || 0;
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            message: res.data.errmsg,
            type: 'error',
          });
        }
      }).catch();
    },
    // 刷新
    reflesh() {
      this.pagesize = 10;
      this.pageindex = 0;
      this.userData.ret = '';
      this.userData.pillclass = '';
      this.userData.dateVal = [new Date(), new Date()];
      this.deliverlist();
    },
  },
  filters: {
    aaabbb(str1) {
      const str = '20' + str1 + '';
      return str.substring(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    },
    type11(status) {
      if (status === 2) {
        return '处方发药';
      } else if (status === 5) {
        return '门诊购药';
      }
    },
  },
  created() {
    this.deliverlist();
  },
  watch: {
    userData: {
      handler() {
        this.pagesize = 10;
        this.pageindex = 0;
        this.deliverlist();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['purchrecodecreate', 'clinic', 'token']),
  },
};
</script>
<style scoped lang='scss'>
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.Sell{
  position: relative;
  padding: 30px 40px 60px 40px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
    height: 49px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    min-width: 1100px;
    .el-input{
      width: 150px;
      margin-right:10px;
    }
  .el-select{
    width: 150px;
    margin-right: 10px;
  }
}
.content{
  width: 100%;
  .el-table {
    min-width: 1100px;
  }
}
.el-table{
  width: 100%;
}
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
.fr{
  float: right;
}
.spans{
  color: $mainColor;
  cursor: pointer;
}
.m_l20{
  margin-left: 20px;
}
.m_l10{
  margin-left: 10px;
}
</style>
