<template>
  <div class="illness" v-aotoClose>
    <el-row class="illness_type">
      <el-col :span="24" class="left"><span class="bold">NO.</span>{{customer.registid}}</el-col>
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
      <el-col :span="8"><span class="label">费别: </span><i class='boring-icon'>□</i>自费 <i class='boring-icon'>□ <i class="select-true" v-if="customer.szsbcardid"></i></i>医保</el-col>
      <el-col :span="8"><span class="label">社保电脑号: <span>{{customer.szsbcardid}}</span></span></el-col>
      <el-col :span="8"><span class="label">参保类型: </span>{{customer.BCC334}}</el-col>
    </el-row>
    <el-row class="bottom_line">
      <el-col :span="12"><span class="label">电话/地址：</span>{{customer.phone}}</el-col>
      <el-col :span="12" class="right"><span class="label">开具日期：</span>{{customer.createtime}}</el-col>
    </el-row>

    <el-row>
      <el-col :span="3">主诉：</el-col>
      <el-col :span="21">{{illness.complaint}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">现病史: </el-col>
      <el-col :span="21">{{illness.cur_history}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">既往史: </el-col>
      <el-col :span="21">{{illness.past_history}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">过敏史: </el-col>
      <el-col :span="21">{{illness.allergy_history}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">体格检查: </el-col>
      <el-col :span="21">
        <div class="filed_item" v-for="(item, i) in illness.mainphyexam" :key="i" >
          <div class="position">
            <el-row class="line1">
              <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
            </el-row>
          </div>
          <span class="center" type="textarea">{{item.desc}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">辅助检查: </el-col>
      <el-col :span="21">
        <div class="filed_item" v-for="(item, i) in illness.other_phy_exam" :key="i" >
          <div class="position">
            <el-row class="line1">
              <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
            </el-row>
          </div>
          <span class="center" type="textarea">{{item.desc}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">初步诊断: </el-col>
      <el-col :span="21">
        <div class="filed_item" v-for="(item, i) in illness.jibingjson" :key="i" >
          <div class="position">
            <el-row class="line1">
              <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
            </el-row>
          </div>
          <span class="center" type="textarea">{{item.desc.join(', ')}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">治疗计划: </el-col>
      <el-col :span="21">
        <div class="filed_item" v-for="(item, i) in illness.yayizhiliaojihua" :key="i" >
          <div class="position">
            <el-row class="line1">
              <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
            </el-row>
          </div>
          <span class="center" type="textarea">{{item.desc}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">处理: </el-col>
      <el-col :span="21">
        <div class="filed_item" v-for="(item, i) in illness.yayichuli" :key="i" >
          <div class="position">
            <el-row class="line1">
              <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
              <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
            </el-row>
          </div>
          <span class="center" type="textarea">{{item.desc}}</span>
        </div>
      </el-col>
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
@import "~@scss";

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
  
  .bottom_line{
    border-bottom: 2px solid #000;
  }
  .line{
    border-top: 2px solid #000;
  }
  .bold{
    font-weight: bold;
  }

  .filed_item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    .position{
      flex: 0 0 240px;
      height: 48px;
      .el-row{
        height: 24px;
        box-sizing: border-box;
        .el-col{
          height: 100%;
        }
      }
      .line1{
        border-bottom: 1px solid $mainColor;
      }
      .line2{
        border-right: 1px solid $mainColor;
        text-align: right;
      }
    }
    .center{
      flex: 1 1 auto;
      margin: 0 24px;
    }
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

