<template>
  <div class="newfollow">
    <div class="header my_titleInpStyle">
      <span class="m_l10">客户:</span>
      <input v-model="userData.name" class="med-ret m_l10 myInput" placeholder="客户姓名" size="small">

      <DateRangePicker :value='userData.clincTime' :attributes='date_range_picker_attributes'></DateRangePicker>

    </div>

    <div class="content">
      <el-table :data="tableData" style="width: 100%" class="m_t20" align='center'>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="patient_name" label="姓名" align='center'>

        </el-table-column>
        <el-table-column prop="patient_gender" label="性别" align='center'>
          <template slot-scope="scope">
            {{ scope.row.patient_gender | sex }}
          </template>
        </el-table-column>
        <el-table-column prop="patient_birthday" label="年龄" align='center'>
          <template slot-scope="scope">
            {{ scope.row.patient_birthday | agefix }}
          </template>
        </el-table-column>
        <el-table-column prop="patient_phone" label="手机号" align='center'>
        </el-table-column>
        <el-table-column label="最近就诊科室" align='center'>
          <template slot-scope="scope">
            {{ scope.row.diagn_dept | UndefineFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="diagn_doctor" label="最近就诊医生" align='center'>
        </el-table-column>
        <el-table-column prop="create_time" label="最近就诊日期" align='center'>
        </el-table-column>
        <el-table-column prop="diagn_result" label="诊断结果" align='center'>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
            <span class="btn" @click="addnewproject(scope.row.regist_id)">新建随访计划</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="pageindex+1" :page-size="pageSize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
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
        name: '', // 客户姓名
        clincTime: [new Date(), new Date()], // 就诊日期
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      tableData: [],
      // 分页
      pageindex: 0,
      total: 0,
      pageSize: 10,
    };
  },
  methods: {
    // 把日期转成列表需要的格式
    makeDateTimeString(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2) + ':' + str.substr(10, 2);
    },
    // 新建随访计划
    addnewproject(id) {
      this.$router.push({ path: '/navigator/customers/newfollowproject', query: { registid: id } });
    },
    // 获取随访列表
    getDiagnosisList() {
      this.$http.post('/service/diagnosis/list', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          name: this.userData.name,
          date_from: this.userData.clincTime[0].format('yyMMdd'),
          date_to: this.userData.clincTime[1].format('yyMMdd'),
          page_index: this.pageindex,
          page_size: this.pageSize,
        },
      }).then((respse) => {
        const res = respse.data;
        if (res.errcode === 0 && res.data.clinic_id === this.clinic &&
          res.data.items && res.data.items.length) {
          const data = res.data.items || [];
          this.tableData = data.map((val) => {
            val.create_time = this.makeDateTimeString(val.create_time);
            return val;
          });
          this.total = res.data.total;
        } else {
          this.tableData = [];
          if (res.errcode !== 0) {
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'error',
              message: res.errmsg,
            });
          }
        }
      }).catch();
    },
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.getDiagnosisList();
    },
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  created() {
    this.getDiagnosisList();
  },
  watch: {
    userData: {
      handler() {
        this.pageindex = 0;
        this.getDiagnosisList();
      },
      deep: true,
    },
  },
  filters: {
    sex(gender) {
      if (gender === 1) {
        return '男';
      }
      if (gender === 2) {
        return '女';
      }
    },
    agefix(brithday) {
      const nowYear = Number(new Date().format('yyyy')) - Number(brithday.substr(0, 4));
      return nowYear;
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.newfollow{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.pagination{
  @include pagination_to_bottom;
}
.header{
  height: 49px;
  color: #1a1a1a;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  min-width: 1100px;
}
.content{
  margin: 10px auto;
  min-width: 1100px;
}
.m_l10{
  margin-left:10px;
}
.med-ret{
  width: 180px;
}
.m_l100{
    margin-left:100px;
}
.m_t20{
    margin-top: 20px;
}
.fr{
  float: right;
}
.fl{
  float: left;
}
.el-select{
  width:100px;
}
.inlind_b{
  display: inline-block;
}
.btn{
    color:#56bc94;
    cursor: pointer;
}
.btn:hover{
    color: rgba(46,139,87, 0.6);
}
</style>
