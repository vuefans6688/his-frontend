<template>
  <div class="follow">
      <div class="header">
        <h3 class="inl_b">随访客户</h3>
        <div class="inl_b fr">
          <el-button type="primary" size="small" @click="finishfollow">保存</el-button>
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
          <el-col :span="9"><span class="m_l20">诊断结果:</span><span class="m_l10">{{client.results.toString()}}</span></el-col>
        </el-row>
      </div>
      <div class="header4">
        <h3>随访计划</h3>
      </div>
      <div class="content4">
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">创建时间:</span><span class="m_l10">{{client.createdTime}}</span></el-col>
          <el-col :span="6"><span class="m_l20">创建人员:</span><span class="m_l10">{{client.founder}}</span></el-col>
          <el-col :span="6"><span class="m_l20">计划执行人员:</span><span class="m_l10">{{client.planMan}}</span></el-col>
        </el-row>
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">计划随访时间:</span><span class="m_l10">{{client.planTime | followtime}}</span></el-col>
          <el-col :span="6"><span class="m_l20">随访类型:</span><span class="m_l10">{{client.followclass | Class}}</span></el-col>
          <el-col :span="12"><span class="m_l20">随访内容:</span><span class="m_l10 followContent">{{client.followcontent}}</span></el-col>
        </el-row>
      </div>
      <div class="header3">
        <h3>随访结果</h3>
      </div>
      <div class="content3">
        <el-table :data="tableData" style="width: 100%" class="m_t20">
          <el-table-column prop="followTime" label="随访时间" align="center">
          </el-table-column>
          <el-table-column label="随访人" prop="followMan" width="200" align="center">
          </el-table-column>
          <el-table-column label="随访类型" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.followclass" placeholder="" size="small">
                <el-option v-for="item in followclass" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="随访方式" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.planWay" placeholder="" size="small">
                <el-option v-for="item in planWay" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="随访结果" width="800" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.followContent" placeholder="" size="small"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content5">
        <el-button type="primary" @click="addnewproject()" size="small">新增随访计划</el-button>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      client: {
        name: '',
        sex: '',
        mobilephone: '',
        age: '',
        department: '',
        doctor: '',
        time: '',
        results: '',
        createdTime: '', // 创建时间
        founder: '', // 创建人
        planMan: '', // 计划执行人
        followclass: '', // 随访类型
        followcontent: '', // 随访内容
        planTime: '', // 计划随访时间
      },
      tableData: [
        {
          followTime: new Date().format('yyyy-MM-dd hh:mm:ss'),
          followMan: '',
          planWay: '',
          followContent: '',
          followclass: '',
        },
      ],
      planWay: [
        { value: 1, label: '微信随访' }, { value: 2, label: '电话随访' }, { value: 3, label: '面对面' },
      ],
      followclass: [
        { value: 1, label: '满意度随访' }, { value: 2, label: '诊疗效果随访' },
      ],
      registid: '',
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    addnewproject() {
      this.$router.push({ name: 'newfollowproject', query: { registid: this.registid } });
      this.$store.commit('send_purchrecodecreate', '');
      this.$store.commit('send_purchrecodecreate', {
        scopeRow: {
          patient_name: this.client.name,
          sex: this.client.sex,
          patient_phone: this.client.mobilephone,
          age: this.client.age,
          diagn_dept: this.client.department,
          diagn_doctor: this.client.doctor,
          diagn_result: this.client.results,
          create_time: this.client.createdTime,
        },
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
          followupid: this.$route.query.followid,
        },
      }).then((res) => {
        const data = res.data.data;
        this.client.name = data.name;
        this.client.sex = data.gender;
        this.client.mobilephone = data.phone;
        this.client.age = data.birthdate;
        this.client.department = data.deptname;
        this.client.doctor = data.doctor;
        this.registid = data.registid;
        if (data.medical) {
          this.client.results = data.medical.diagn_result;
          if (typeof this.client.results === 'string' && data.medical.medicaltype === 0) {
            this.client.results = JSON.parse(this.client.results);
          } else {
            let arr = [];
            this.client.results = JSON.parse(this.client.results).map((item) => {
              delete item.pos;
              arr = [...item.desc];
              return arr;
            });
          }
        }
        this.client.createdTime = data.createtime;
        this.client.founder = data.creator;
        this.client.planMan = data.planexecutor;
        this.client.followclass = data.planmode;
        this.client.followcontent = data.plancontent;
        this.client.planTime = data.plantime;
        this.client.time = data.visittime;
      }).catch();
    },
    // 跳转到待随访
    // jumpWaittingFollow() {
    //   this.$router.push({ name: 'waitingfollow' });
    // },
    // 完成随访
    finishfollow() {
      this.$http.post('/service/customers/followupupd', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          followupid: this.$route.query.followid,
          status: 2, // 完成随访
          actualtype: this.tableData[0].followclass, // 随访类型 1满意度 2诊疗效果
          actualmode: this.tableData[0].planWay, // 随访方式 1电话随访 2微信随访 3面对面
          actualexecutorid: this.tableData[0].followMan, // 实际随访者 当为取消时为取消执行人
          actualcontent: this.tableData[0].followContent, // 随访内容，当为取消时填写取消原因
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '成功随访！',
            type: 'success',
          });
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
    this.followupinfo();
    if (this.user.truename) {
      this.tableData[0].followMan = this.user.truename;
    } else {
      this.tableData[0].followMan = this.user.phone;
    }
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
    followtime(time) {
      return time.substr(0, 10);
    },
    Class(followclass) {
      if (followclass === 1) {
        return '满意度随访';
      }
      if (followclass === 2) {
        return '诊疗效果随访';
      }
      if (followclass === 3) {
        return '面对面';
      }
    },
  },
};
</script>
<style scoped>
.follow{
  padding: 30px 40px;
}
.header,.header2,.header3,.header4{
    height: 49px;
    line-height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    min-width: 1100px;
    font-weight: 600;
}
.content1,.content2,.content4{
  margin: 10px auto;
  min-width: 1100px;
  height: 50px;
}
.content3,.content5{
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
.followContent{
  overflow: hidden;
}
</style>
