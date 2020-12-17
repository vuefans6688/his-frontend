<template>
  <div class="modificationfollow">
      <div class="header">
        <h3 class="inl_b">随访客户</h3>
        <div class="inl_b fr">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="info" @click="goback" size="small">返回</el-button>
        </div>
      </div>
      <div class="content1">
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">客户姓名:</span><span class="m_l10">{{client.name}}</span></el-col>
          <el-col :span="6"><span class="m_l20">性别:</span><span class="m_l10">{{client.sex | gander}}</span></el-col>
        </el-row>
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">手机号:</span><span class="m_l10">{{client.mobilephone}}</span></el-col>
          <el-col :span="6"><span class="m_l20">年龄:</span><span class="m_l10">{{client.age | birth}}</span></el-col>
        </el-row>
      </div>
      <div class="header2">
        <h3>就诊信息</h3>
      </div>
      <div class="content2">
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">最近就诊科室:</span><span class="m_l10">{{client.department}}</span></el-col>
          <el-col :span="6"><span class="m_l20">最近就诊医生:</span><span class="m_l10">{{client.doctor}}</span></el-col>
        </el-row>
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">最近就诊时间:</span><span class="m_l10">{{client.time}}</span></el-col>
          <el-col :span="6"><span class="m_l20">诊断结果:</span><span class="m_l10">{{client.results}}</span></el-col>
        </el-row>
      </div>
      <div class="header3">
        <h3>随访计划</h3>
      </div>
      <div class="content3">
        <el-table :data="tableData" style="width: 100%" class="m_t20">
          <el-table-column label="计划随访时间" align="center">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.planTime" placeholder="" class="iptDate" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="计划随访人" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.planMan" placeholder="" size="small">
                <el-option :label="user2.username" :value="user2.userid"></el-option>
                <el-option v-for="item in planMan" :key="item.userid" :label="item.truename" :value="item.userid"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="随访类型" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.followClass" placeholder="" size="small">
                <el-option v-for="item in followClass" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="计划随访方式" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.planWay" placeholder="" size="small">
                <el-option v-for="item in planWay" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="随访内容" width="500" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.followContent" placeholder="" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete cursor" @click="disable(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <!-- 弹出框 -->
      <el-dialog title="取消随访原因" :visible.sync="dialogFormVisible" :modal-append-to-body='false' :close-on-click-modal='false'>
        <el-form :model="disableform" :rules="rules" ref="disableform">
            <el-form-item prop="content">
            <el-input v-model="disableform.content"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="allow('disableform')">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      client: {
        name: '',  // 客户姓名
        sex: '',  // 性别
        mobilephone: '',  // 手机号
        age: '',  // 年龄
        department: '', // 最近就诊科室
        doctor: '', // 最近就诊医生
        time: '', // 最近就诊时间
        results: '', // 诊断结果
      },
      tableData: [{
        planTime: new Date(),
        planMan: '',
        followClass: '',
        planWay: '',
        followContent: '',
      }],
      planMan: [], // 计划随访人
      user2: {
        userid: '',
        username: '',
      },
      followClass: [
        { value: 1, label: '满意度随访' }, { value: 2, label: '诊疗效果随访' },
      ],
      planWay: [
        { value: 1, label: '微信随访' }, { value: 2, label: '电话随访' }, { value: 3, label: '面对面' },
      ],
      // 取消对话框
      disableindex: '', // 获取要删除的行数
      dialogFormVisible: false,
      disableform: {
        content: '',
      },
      rules: {
        content: [{ required: true, message: '请输入取消原因', trigger: 'blur' }],
      },
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    allow(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '取消成功！',
            type: 'success',
          });
          this.dialogFormVisible = false;
          this.tableData.splice(this.disableindex, 1);
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '请填写取消的原因',
            type: 'error',
          });
          return false;
        }
      });
    },
    disable(index) {
      this.disableform.content = '';
      this.disableindex = index;
      this.dialogFormVisible = true;
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
          const arr = [];
          res.data.data.items.forEach((val) => {
            if (val.disabled === 0) {
              arr.push(val);
            }
          });
          this.planMan = arr;
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
        }
      }).catch(() => {
      });
    },
    // 请求随访信息
    followupinfo() {
      this.$http.post('/service/customers/followupinfo', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          followupid: this.purchrecodecreate.followid,
        },
      }).then((res) => {
        const data = res.data.data;
        this.client.name = data.name;
        this.client.sex = data.gender;
        this.client.mobilephone = data.phone;
        this.client.age = data.birthdate;
        this.client.department = data.deptname;
        this.client.doctor = data.doctor;
        if (data.medical) {
          this.client.results = data.medical.diagn_result;
        }
        this.client.time = data.visittime;
      }).catch();
    },
  },
  created() {
    this.user2.userid = this.user.userid;
    this.user2.username = this.user.truename;
    this.getDoctor();
    this.followupinfo();
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user', 'purchrecodecreate']),
  },
  filters: {
    gander(sex) {
      if (sex === 1) {
        return '男';
      }
      if (sex === 2) {
        return '女';
      }
    },
    birth(time) {
      return new Date().format('yyyy') - time.substr(0, 4);
    },
  },
  beforeDestroy() {
    this.$store.commit('send_purchrecodecreate', '');
  },
};
</script>
<style scoped>
.modificationfollow{
  padding: 20px 40px;
}
.header,.header2,.header3{
    height: 49px;
    line-height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    min-width: 1100px;
    font-weight: 600;
}
.content1,.content2{
  margin: 10px auto;
  min-width: 1100px;
  height: 50px;
}
.content3{
  margin: 10px auto;
  min-width: 1100px;
}
.row{
    margin-top: 20px;
    margin-left: 20px;
}
/* .m_l20{
    margin-left: 20px;
} */
.m_l10{
    margin-left: 10px;
}
.cursor{
  cursor: pointer;
}
.inl_b{
  display: inline-block;
}
.fr{
  float: right;
}
</style>
