<template>
  <div class="checkcancel">
      <div class="header">
        <h3 class="inl_b">随访客户</h3>
        <div class="inl_b fr">
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
          <el-col :span="6"><span class="m_l20">计划随访时间:</span><span class="m_l10">{{client.planTime | Plantime}}</span></el-col>
          <el-col :span="6"><span class="m_l20">随访类型:</span><span class="m_l10">{{client.followclass | Class}}</span></el-col>
          <el-col :span="10"><span class="m_l20">随访内容:</span><span class="m_l10">{{client.followcontent}}</span></el-col>
        </el-row>
      </div>
      <div class="header3">
        <h3>取消原因</h3>
      </div>
      <div class="content3">
        <el-row :gutter="20" class="row">
          <el-col :span="6"><span class="m_l20">取消时间:</span><span class="m_l10">{{client.cancelTime}}</span></el-col>
          <el-col :span="6"><span class="m_l20">取消人员:</span><span class="m_l10">{{client.cancelMen}}</span></el-col>
          <el-col :span="10"><span class="m_l20">取消原因:</span><span class="m_l10">{{client.cancelCause}}</span></el-col>
        </el-row>
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
        sex: '', // 性别
        mobilephone: '', // 手机
        age: '', // 年龄
        department: '', // 科室
        doctor: '', // 医生
        time: '', // 就诊时间
        results: '', // 就诊结果
        createdTime: '', // 创建时间
        founder: '', // 创建人
        planMan: '', // 计划执行人
        followclass: '', // 随访类型
        followcontent: '', // 随访内容
        planTime: '', // 计划随访时间
        cancelTime: '', // 取消时间
        cancelMen: '', // 取消人
        cancelCause: '', // 取消原因
      },
    };
  },
  methods: {
    goback() {
      this.$router.back();
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
        if (res.data.errcode === 0) {
          const data = res.data.data;
          this.client.name = data.name;
          this.client.sex = data.gender;
          this.client.mobilephone = data.phone;
          this.client.age = data.birthdate;
          this.client.department = data.deptname;
          this.client.doctor = data.doctor;
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
          this.client.cancelTime = data.actualtime;
          this.client.cancelMen = data.actualexecutor;
          this.client.cancelCause = data.actualcontent;
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
    Plantime(time) {
      return time.substr(0, 10);
    },
    Class(followclass) {
      if (followclass === 1) {
        return '满意度随访';
      }
      if (followclass === 2) {
        return '诊疗效果随访';
      }
    },
  },
  created() {
    this.followupinfo();
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user', 'purchrecodecreate']),
  },
  beforeDestroy() {
    this.$store.commit('send_purchrecodecreate', '');
  },
};
</script>
<style scoped>
.checkcancel{
  padding: 20px 40px;
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
  /* height: 50px; */
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
</style>
