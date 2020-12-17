<template>
  <div class="illness" v-aotoClose>
      <el-row class="illness_type">
          <el-col :span="24" class="left"><span class="bold">NO.</span>{{customer.registid}}</el-col>
          <!-- <el-col :span="11" class="right">挂</el-col> -->
      </el-row>
      <div class="header">
          <h1 class="clinic_name">{{customer.clinicname}}</h1>
          <h3>门诊病历</h3>
      </div>

      <el-row>
          <el-col :span="5"><span class="bold">姓名：</span> {{customer.name}}</el-col>
          <el-col :span="4"><span class="bold">性别：</span> {{customer.gender | SexState}}</el-col>
          <el-col :span="4"><span class="bold">年龄：</span> {{customer.age}}</el-col>
          <el-col :span="5"><span class="bold">科室：</span> {{customer.deptname}}</el-col>
          <el-col :span="6"><span class="bold">登记号</span> {{customer.registid ? customer.registid.slice(-13) : ''}}</el-col>
      </el-row>

      <el-row>
        <el-col :span="8"><span class="label">费别: </span><i class='boring-icon'>□<i class="select-true" v-if="!customer.szsbcardid"></i></i>自费 <i class='boring-icon'>□ <i class="select-true" v-if="customer.szsbcardid"></i></i>医保</el-col>
        <el-col :span="8"><span class="label">社保电脑号: <span>{{customer.szsbcardid}}</span></span></el-col>
        <el-col :span="8"><span class="label">参保类型: </span>{{customer.BCC334}}</el-col>
      </el-row>
      <el-row class="row3">
        <el-col :span="12"><span class="label">电话/地址：</span>{{customer.phone}}</el-col>
        <el-col :span="12" class="right"><span class="label">开具日期：</span>{{customer.createtime}}</el-col>
      </el-row>

      <el-row>
          <el-col :span="3">主诉：</el-col>
          <el-col :span="21">{{illness.complaint}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">过敏史: </el-col>
          <el-col :span="21">{{illness.allergy_history}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">既往史: </el-col>
          <el-col :span="21">{{illness.past_history}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">现病史: </el-col>
          <el-col :span="21">{{illness.cur_history}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">个人史: </el-col>
          <el-col :span="21">{{illness.person_history}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">家族史: </el-col>
          <el-col :span="21">{{illness.family_history}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">生命体征: </el-col>
          <el-col :span="4">体温: {{illness.temperature}} °C</el-col>
          <el-col :span="5">血压: {{illness.systolic_pressure}}/{{illness.diastolic_pressure}} mmHg</el-col>
          <el-col :span="4">脉搏: {{illness.pulse}} bpm</el-col>
          <el-col :span="4">呼吸: {{illness.breathing}} 次/分</el-col>
          <el-col :span="4">体重: {{illness.weight==0 ? '' : illness.weight}} 公斤</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">体格检查: </el-col>
          <el-col :span="21">{{illness.mainphyexam}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="3">辅助检查: </el-col>
          <el-col :span="21">{{illness.other_phy_exam}}</el-col>
      </el-row>
      <el-row>
          <el-col :span="4">初步诊断: </el-col>
          <el-col :span="20"><span v-for="(item,index) in illness.jibingjson" :key="index">{{typeof item === 'string' ? item : item.jbname}}</span></el-col>
      </el-row>
      <el-row>
          <el-col :span="3">治疗意见: </el-col>
          <el-col :span="21">{{illness.advice}}</el-col>
      </el-row>
      <el-row class="line">
          <el-col :span="8">&nbsp;</el-col>
          <el-col :span="8">&nbsp;</el-col>
          <el-col :span="8"><span class="bold">医生签字：{{illness.doctor}}</span></el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: {},
      illness: {},
      advice: '',
    };
  },
  mounted() {
    this.customer = this.$store.state.printMsg.details;
    this.illness = this.$store.state.printMsg.medicalRecordsForm;
    this.advice = this.$store.state.printMsg.advice;
    this.illness.doctor = this.$store.state.printMsg.doctorTip ? this.$store.state.printMsg.doctorTip.name : this.$store.state.printMsg.details.doctor;
    setTimeout(() => {
      window.print();
      window.close();
    }, 500);
  },
  directives: {
    aotoClose() {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          window.opener = null;
          window.open('', '_self');
          window.close();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.illness{
  display: block;
  top: 0;
  padding: 16px;
  font-size: 12px;
  .el-row{
      .el-col{
          padding: 5px 2px;
      }
  }
  .illness_type{
      .right{
          text-align: right;
      }
  }
  .header{
      h1, h3{
          text-align: center;
      }
  }
  .medicalCard{
      border-bottom: 2px solid #000;
  }
  .row1, .row2{
      border-bottom: 1px solid #ccc;
  }
  .row3{
      border-bottom: 2px solid #000;
  }
  .boring-icon{
    font-size: 20px;
    position: relative;
    .select-true{
      width: 8px;
      height: 10px;
      border-bottom: 1px solid #000;
      border-right: 2px solid #000;
      position: absolute;        
      top: 6px;
      left: 2px;
      transform: rotate(45deg);
    }
  }
  .line{
      border-top: 2px solid #000;
  }
  .bold{
      font-weight: bold;
  }
}
@media print {
  .illness {
    width: 90%;
    margin: 0 auto;
    float: none;
  }
  @page { margin: 2cm; size: A4; }

  html {
    height: auto !important;
  }
  html,body {
    background-color: white;
  }

  body {
    font: 6pt "宋体", Georgia, "Times New Roman", Times, serif;
    line-height: 1;
    background: #fff !important;
    color: #000;
  }
}
</style>

