<template>
  <div class="record">
    <div class="header my_titleInpStyle">
      <span>客户：</span>
      <input v-model="userData.ret" placeholder="客户姓名或手机号" size='small' class="myInput">
      <DateRangePicker :value='userData.value7' :attributes='date_range_picker_attributes'></DateRangePicker>
    </div>
    <div class="content">
      <el-table :data="tableData" class="m_t20" align='center' size='medium' stripe>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="deliver_sn" label="发药单号" align='center' width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align='center'>
        </el-table-column>
        <el-table-column label="性别" align='center'>
          <template slot-scope="scope">
            {{ scope.row.gender | gender }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align='center'>
        </el-table-column>
        <el-table-column label="发药类型" align='center'>
          <template slot-scope="scope">
            {{ scope.row.deliver_source | deliversource }}
          </template>
        </el-table-column>
        <el-table-column prop="department" label="就诊科室" align='center'>
        </el-table-column>
        <el-table-column prop="doctor_name" label="就诊医生" align='center'>
        </el-table-column>
        <el-table-column prop="operator_name" label="操作人" align='center'>
        </el-table-column>
        <el-table-column prop="getmed_time" label="发(退)药时间" align='center' width="180">
          <template slot-scope="scope">
            {{ scope.row.create_time | createtime }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="totalprice" label="发药金额" align='center'>
        </el-table-column> -->
        <el-table-column label="状态" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.drug_opstype === 1">已发药</span>
            <span v-if="scope.row.drug_opstype === 2" class="red">已退药</span>
          </template>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
            <!-- <span class="spans" v-if=" scope.row.drug_opstype == '已发药'" @click="retMed">退药</span> -->
            <!-- <span class="spans">打印</span> -->
            <span class="spans" @click="retMed(scope.row)">查看明细</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="pageindex+1" :page-size="pagesize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
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
        value7: [new Date(), new Date()], // 日期
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      tableData: [],
      total: 0,
      pageindex: 0,
      pagesize: 10,
    };
  },
  methods: {
    // 搜索发药记录
    search_con() {
      this.$http.post('/service/drugdeliver/recordlist', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          pageid: this.pageindex, // 必填
          pagesize: this.pagesize, // 必填
          clinic_id: this.clinic, // 必填
          status: 0, // 必填
          date_from: this.userData.value7[0].format('yyMMdd'),  // 日期2017-11-10 前面没有20，日期必填
          date_to: this.userData.value7[1].format('yyMMdd'),  // 必填
          name: this.userData.ret,  // 客户的名字
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.tableData = res.data.data.entity || [];
          this.total = res.data.data.pagecount || 0;
        } else {
          this.$message.error(res.data.errmsg);
        }
      }).catch();
    },
      // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.search_con();
    },
    // 退药按钮
    retMed(val) {
      this.$router.push({ name: 'retMed' });
      this.$store.commit('send_purchrecodecreate', { val });
    },
  },
  filters: {
    gender(sex) {
      if (sex === 1) {
        return '男';
      }
      if (sex === 2) {
        return '女';
      }
    },
    deliversource(source) {
      if (source === 2) {
        return '处方发药';
      }
      if (source === 5) {
        return '门诊购药';
      }
    },
    createtime(time) {
      const time1 = '' + time;
      return '20' + time1.substr(0, 2) + '-' + time1.substr(2, 2) + '-' + time1.substr(4, 2) + ' ' + time1.substr(6, 2) + ':' + time1.substr(8, 2) + ':' + time1.substr(10, 2);
    },
    opstype(type) {
      if (type === 1) {
        return '已发药';
      }
      if (type === 2) {
        return '已退药';
      }
    },
  },
  created() {
    this.search_con();
  },
  computed: {
    ...mapGetters(['purchrecodecreate', 'clinic', 'token']),
  },
  watch: {
    userData: {
      handler() {
        this.pageindex = 0;
        this.pagesize = 10;
        this.search_con();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang='scss'>
@import "~@scss";

.pagination{
  @include pagination_to_bottom;
}
.record{
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
  .el-table{
    min-width: 1300px;
  }
}
.el-table{
  width: 100%;
}
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
.spans{
  color: $mainColor;
  cursor: pointer;
  margin-right: 10px;
}
.m_l10{
  margin-left: 10px;
}
.red{
  color:red;
}
</style>
