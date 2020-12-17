<template>
  <div class="alreadyfollow">
    <div class="header my_titleInpStyle">
      <span class="m_l10">客户:</span>
      <input v-model="userData.name" class="med-ret m_l10 myInput" placeholder="客户姓名" size="small">

      <DateRangePicker :value='userData.planTime' :attributes='date_range_picker_attributes'></DateRangePicker>


      <span class="m_l10">执行人:</span>
      <el-select v-model="userData.planMan" class="m_l10" size="small" clearable>
        <el-option v-for="(item, index) in planMan" :key="index" :label="item.truename" :value="item.userid"></el-option>
      </el-select>

      <span class="m_l10">创建人:</span>
      <el-select v-model="userData.founder" class="m_l10" size="small" clearable>
        <el-option v-for="(item, index) in planMan" :key="index" :label="item.truename" :value="item.userid"></el-option>
      </el-select>

      <!-- <el-button type="primary m_l10 " size="small" @click="followlist">搜索</el-button> -->
    </div>

    <div class="content">
      <el-table :data="tableData" style="width: 100%" class="m_t20" align='center'>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80" align='center'>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="70" align='center'>
          <template slot-scope="scope">
            {{ scope.row.gender | gender }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="70" align='center'>
          <template slot-scope="scope">
            {{ scope.row.birthdate | birthdate }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align='center'>
        </el-table-column>
        <el-table-column label="最近就诊科室" align='center'>
          <template slot-scope="scope">
            {{ scope.row.deptname | UndefineFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="doctor" label="最近就诊医生" align='center'>
        </el-table-column>
        <el-table-column prop="visittime" label="最近就诊日期" width="180" align='center'>
        </el-table-column>
        <el-table-column prop="actualtime" label="随访日期" width="180" align='center'>
        </el-table-column>
        <el-table-column prop="actualcontent" label="随访结果" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="actualexecutor" label="执行人" width="90" align='center'>
        </el-table-column>
        <el-table-column prop="createtime" label="创建日期" width="180" align='center'>
        </el-table-column>
        <el-table-column prop="creator" label="创建人员" width="100" align='center'>
        </el-table-column>
        <el-table-column prop="control" label="操作" width="130" align='center'>
          <template slot-scope="scope">
            <span class="btn" @click="checkfollow(scope.row.followupid)">查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="pageindex+1" :page-size="15" @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper" :total="total">
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
        name: '', // 客户姓名
        planTime: [new Date(), new Date()], // 计划随访日期
        planMan: '', // 计划执行人
        founder: '', // 创建人
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      tableData: [],
      planMan: [], // 计划执行人的options
      user2: {
        userid: '',
        username: '',
      },
      // 分页
      total: 0,
      pageindex: 0,
    };
  },
  methods: {
    checkfollow(followupid) {
      this.$router.push({ name: 'checkfollow' });
      this.$store.commit('send_purchrecodecreate', { followid: followupid });
    },
    // 获取医生
    getDoctor() {
      this.$http.post('/service/clinic/user_list', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: { clinic_id: this.clinic },
      }).then((res) => {
        if (res.data.errcode === 0 && res.data.data.clinic_id === this.clinic) {
          if (res.data.data.items) {
            const arr = [];
            res.data.data.items.forEach((val) => {
              if (val.disabled === 0) {
                arr.push(val);
              }
            });
            const obj = arr.find((val) => {
              return arr.userid === val.userid;
            });
            if (!obj) {
              arr.push({
                userid: this.user.userid,
                truename: this.user.truename || this.user.phone,
              });
            }
            this.planMan = arr;
          }
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
        }
      }).catch();
    },
    // 请求随访列表
    followlist() {
      this.$http.post('/service/customers/followuplist', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          patientid: '',  // 患者id
          name: this.userData.name,   // patientid 和 name 优先patientid 二者可选
          executorid: this.userData.planMan, // 可选 当status为1时为计划随访者id status为2,3时为执行随访者id
          creatorid: this.userData.founder, // 可选 建立随访者id
          status: 2, // 1待随访 2随访完成 3取消随访 必选
          type: -1, // 随访类型 -1全部 1满意度 2诊疗效果 必选
          fromdate: this.userData.planTime[0].format('yyyy-MM-dd') + ' 00:00:00', // 当status为1时为计划随访时间 2,3时为执行随访时间（或者取消随访时间） 必选
          todate: this.userData.planTime[1].format('yyyy-MM-dd') + ' 23:59:59', // 必选
          pageindex: this.pageindex,
          pagesize: 15,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.tableData = res.data.data.entity;
          this.total = res.data.data.totalcount;
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
        }
      }).catch();
    },
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.followlist();
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
    birthdate(birth) {
      return new Date().format('yyyy') - birth.substr(0, 4);
    },
  },
  created() {
    this.getDoctor();
    this.followlist();
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user', 'purchrecodecreate']),
  },
  watch: {
    userData: {
      handler() {
        this.pageindex = 0;
        this.followlist();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.alreadyfollow{
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
.lh45{
  line-height: 45px;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
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
