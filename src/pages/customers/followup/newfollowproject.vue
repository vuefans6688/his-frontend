<template>
  <div class="newfollowproject">
      <div class="header">
        <h3 class="inl_b">随访客户</h3>
        <div class="inl_b fr">
          <el-button type="primary" size="small" @click="followupadd">保存</el-button>
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
        </el-table>
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
      },
      tableData: [
        {
          planTime: new Date(), // 随访时间
          planMan: '', // 随访人
          followClass: '', // 随访类型
          planWay: '', // 随访方式
          followContent: '', // 随访内容
        },
      ],
      userId: '',
      planMan: [],
      followClass: [
        { value: 1, label: '满意度随访' }, { value: 2, label: '诊疗效果随访' },
      ],
      planWay: [
        { value: 1, label: '微信随访' }, { value: 2, label: '电话随访' }, { value: 3, label: '面对面' },
      ],
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
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
          if (res.data.data.items) {
            res.data.data.items.forEach((val) => {
              if (val.disabled === 0) {
                arr.push(val);
              }
            });
            this.planMan = arr;
            // const arr2 = this.planMan.find((val) => {
            //   return this.planMan.userid === val.userid;
            // });
            // if (!arr2) {
            //   this.planMan.push({
            //     userid: this.user.userid,
            //     truename: this.user.truename || this.user.phone,
            //   });
            // }
            this.tableData.forEach((val) => {
              val.planMan = this.user.userid;
            });
          }
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
    // 获取客户信息
    getDiagnosisInfo(id) {
      this.$http.post('/service/diagnosis/info', {
        head: {
          accessToken: this.token,      // 用户身份标识，必选参数
          lastnotice: 0,
          msgid: '',                   // 留空
        },
        body: {
          clinic_id: this.clinic,
          regist_id: id,
        },
      }).then((res) => {
        const resdata = res.data;
        if (resdata.errcode === 0) {
          this.client.name = resdata.data.patient.name;
          this.client.sex = resdata.data.patient.gender;
          this.client.mobilephone = resdata.data.patient.phone;
          this.client.age = resdata.data.patient.birthdate;
          this.client.department = resdata.data.regist.deptname;
          this.client.doctor = resdata.data.regist.doctor;
          this.client.time = resdata.data.regist.createtime;
          if (resdata.data.medical) {
            this.client.results = resdata.data.medical.diagn_result;
            if (typeof this.client.results === 'string' && resdata.data.medical.medicaltype === 0) {
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
    // 添加随访
    followupadd() {
      if (!(this.tableData[0].followClass && this.tableData[0].planWay && this.tableData[0].followContent)) {
        this.$message.error('请填写完整随访计划');
        return;
      }
      this.$http.post('/service/customers/followupadd', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinicid: this.clinic,
          registid: this.$route.query.registid,  // 挂号id
          plantype: this.tableData[0].followClass,  // 随访类型 1满意度 2诊疗效果
          planmode: this.tableData[0].planWay,  // 随访方式 1电话随访 2微信随访 3面对面
          plantime: this.tableData[0].planTime.format('yyyy-MM-dd') + ' 00:00:00',  // 随访时间
          planexecutorid: this.tableData[0].planMan,  // 计划随访者id
          plancontent: this.tableData[0].followContent,  // 计划随访内容
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'success',
            message: '保存成功！',
          });
          this.goback();
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: '保存失败！',
          });
        }
      }).catch();
    },
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user', 'purchrecodecreate']),
  },
  filters: {
    gander(sex) {
      if (!sex) {
        return '';
      }
      if (sex === 1) {
        return '男';
      }
      if (sex === 2) {
        return '女';
      }
    },
    birth(time) {
      if (!time) {
        return '';
      }
      return new Date().format('yyyy') - time.substr(0, 4);
    },
  },
  created() {
    this.getDoctor(); // 获取医生列表
    if (this.$route.query.registid) {
      this.getDiagnosisInfo(this.$route.query.registid);
    }
    if (this.purchrecodecreate.scopeRow) {
      this.client.name = this.purchrecodecreate.scopeRow.patient_name;
      if (this.purchrecodecreate.scopeRow.sex) {
        this.client.sex = this.purchrecodecreate.scopeRow.sex;
      }
      if (this.purchrecodecreate.scopeRow.age) {
        this.client.age = this.purchrecodecreate.scopeRow.age;
      }
      this.client.mobilephone = this.purchrecodecreate.scopeRow.patient_phone;
      this.client.department = this.purchrecodecreate.scopeRow.diagn_dept;
      this.client.doctor = this.purchrecodecreate.scopeRow.diagn_doctor;
      this.client.time = this.purchrecodecreate.scopeRow.create_time;
      this.client.results = this.purchrecodecreate.scopeRow.diagn_result;
    }
  },
  beforeDestroy() {
    this.$store.commit('send_purchrecodecreate', '');
  },
};
</script>
<style scoped>
.newfollowproject{
  padding: 30px 40px;
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
  /* height: 50px; */
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
.el-date-editor{
  width: 160px;
}
</style>
