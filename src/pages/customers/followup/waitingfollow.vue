<template>
  <div class="waitingfollow">
    <div class="header my_titleInpStyle">
      <span class="m_l10">客户:</span>
      <input v-model="userData.name" class="med-ret m_l10 myInput" placeholder="客户姓名" size="small">

      <DateRangePicker :value='userData.planTime' :attributes='date_range_picker_attributes'></DateRangePicker>

      <span class="m_l10">计划执行人:</span>
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
            {{ scope.row.birthdate | birth }}
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
        <el-table-column prop="visittime" label="最近就诊日期" align='center' width="180">
        </el-table-column>
        <el-table-column prop="planTime" label="计划随访日期" align='center'>
          <template slot-scope="scope">
            {{ scope.row.plantime | plantime }}
          </template>
        </el-table-column>
        <el-table-column prop="plancontent" label="随访内容" show-overflow-tooltip  align='center'>
        </el-table-column>
        <el-table-column prop="planexecutor" label="计划执行人" width="90" align='center'>
        </el-table-column>
        <el-table-column prop="createtime" label="创建日期" width="180" align='center'>
        </el-table-column>
        <el-table-column prop="creator" label="创建人员" width="100" align='center'>
        </el-table-column>
        <el-table-column prop="control" label="操作" width="130" align='center'>
          <template slot-scope="scope">
            <span class="btn" @click="follow(scope.row.followupid)">随访</span>
            <!-- <span class="btn m_l5" @click="modification(scope.row.followupid)">修改</span> -->
            <span class="btn m_l5" @click="disable(scope.row.followupid)">取消</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="pageindex+1" :page-size="pagesize" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
      <!-- 弹出框 -->
    <el-dialog title="取消随访原因" :visible.sync="dialogFormVisible" :modal-append-to-body='false' :close-on-click-modal='false'>
      <el-form :model="disableform" :rules="rules" ref="disableform">
          <el-form-item prop="content">
          <el-input v-model="disableform.content" size="small"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="cancel('disableform')" size="small">确 定</el-button>
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
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
        planTime: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date(new Date().setDate(new Date().getDate() + 21))], // 计划随访日期
        planMan: '', // 计划执行人
        founder: '', // 创建人
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      tableData: [],
      followupid: '', // 用作删除的followid
      planMan: [], // 计划随访人下拉框的options
      // 分页
      total: 0,
      pageindex: 0,
      pagesize: 10,
      // 取消对话框
      disableindex: '', // 获取要删除的行数
      dialogFormVisible: false,
      disableform: {
        content: '', // 输入的取消原因
      },
      rules: {
        content: [{ required: true, message: '请输入取消原因', trigger: 'blur,change' }],
      },
    };
  },
  methods: {
    follow(followupid) {
      this.$router.push({ name: 'follow', query: { followid: followupid } });
    },
    modification(followupid) {
      this.$router.push({ name: 'modificationfollow' });
      this.$store.commit('send_purchrecodecreate', { followid: followupid });
    },
    // 取消随访请求
    cancelfollow() {
      this.$http.post('/service/customers/followupupd', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          followupid: this.followupid,
          status: 3, // 取消随访
          actualtype: 1, // 随访类型 1满意度 2诊疗效果
          actualmode: 1, // 随访方式 1电话随访 2微信随访 3面对面
          actualexecutorid: this.user.userid, // 实际随访者 当为取消时为取消执行人
          actualcontent: this.disableform.content, // 随访内容，当为取消时填写取消原因
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '取消成功！',
            type: 'success',
          });
          this.followlist();
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
          return false;
        }
      }).catch();
    },
    // 取消随访
    cancel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cancelfollow();
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    // 取消按钮
    disable(followid) {
      this.followupid = followid;
      this.disableform.content = '';
      this.dialogFormVisible = true;
    },
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.followlist();
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
          status: 1, // 1待随访 2随访完成 3取消随访 必选
          type: -1, // 随访类型 -1全部 1满意度 2诊疗效果 必选
          fromdate: this.userData.planTime[0].format('yyyy-MM-dd') + ' 00:00:00', // 当status为1时为计划随访时间 2,3时为执行随访时间（或者取消随访时间） 必选
          todate: this.userData.planTime[1].format('yyyy-MM-dd') + ' 23:59:59', // 必选
          pageindex: this.pageindex,
          pagesize: this.pagesize,
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
  },
  created() {
    this.followlist();
    this.getDoctor();
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  filters: {
    gender(gen) {
      if (gen === 1) {
        return '男';
      }
      if (gen === 2) {
        return '女';
      }
    },
    birth(birth) {
      return new Date().format('yyyy') - birth.substr(0, 4);
    },
    plantime(time) {
      const str = '' + time;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
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

.waitingfollow{
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
.m_l5{
    margin-left: 5px;
}
</style>
