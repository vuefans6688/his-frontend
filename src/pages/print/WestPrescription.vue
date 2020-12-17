<template>
  <ul class="prescription" v-aotoClose>
    <li class="item onePage" v-for="(item, index) in presList" :key="index">
      <el-row>
        <el-col :span="12" class="left">NO.{{customer.registid}}</el-col>
        <el-col :span="12" class="right">普  {{index + 1}}/{{presList.length}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="title"><h1>{{customer.clinicname}}</h1></el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="title"><h2>西/中成药 处方笺</h2></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><span class="label">费别: </span><i class='boring-icon'>□</i>自费 <i class='boring-icon'>□<i class="select-true" v-if="customer.szsbcardid"></i></i>医保</el-col>
        <el-col :span="6"><span class="label">社保电脑号: <span>{{customer.szsbcardid}}</span></span></el-col>
        <el-col :span="6"><span class="label">参保类型: </span>{{customer.BCC334}}</el-col>
        <el-col :span="6"><span class="label">门诊/住院病历号: </span>{{customer.registid.slice(-13)}}</el-col>
      </el-row>
      <div class="info">
        <el-row>
          <el-col :span="6"><span class="label">姓名：</span>{{customer.name}}</el-col>
          <el-col :span="4"><span class="label">性别：</span>{{customer.gender | SexState}}</el-col>
          <el-col :span="6"><span class="label">年龄：</span>{{customer.age}}</el-col>
          <el-col :span="8"><span class="label">科室：</span>{{customer.deptname}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="label">住址/电话：：</span>{{customer.phone}}</el-col>
          <el-col :span="12" class="right"><span class="label">开具日期：</span>{{customer.createtime}}</el-col>

        </el-row>
        <!-- 临床诊断 -->
        <div class="jibingjson">
          <span class="label">临床诊断：</span>
          <div class="right">
            <div class="normal" v-if="!medicaltype">
              <span v-for="(item, i) in jibingjson" :key="i">{{ item.jbname ? item.jbname : item }}; &nbsp;</span>
            </div>
            <div class="dentity" v-else>
              <div class="filed_item" v-for="(item, i) in jibingjson" :key="i" >
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
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <h1 class="rp">Rp</h1>
        <ul class="list">
          <li class="item" v-for="(m_item, key) in item.drug_list" :key="key">
            <el-row >
              <el-col :span="2">{{key+1}}</el-col>
              <el-col :span='10'>{{m_item.name}}</el-col>
              <el-col :span='8'>{{m_item.spec_text}}&nbsp;</el-col>
              <el-col :span='4'>&nbsp;{{m_item.total}}{{m_item.total_unit}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="6">用法：{{m_item.use_method}}</el-col>
              <el-col :span="8">每次： {{m_item.dosage}}{{m_item.dose_unit}}</el-col>
              <el-col :span="8">&nbsp;{{m_item.frequency}}</el-col>
            </el-row>
          </li>
        </ul>

      </div>
      <el-row>
        <el-col :span="8"><span class="label">审核：</span></el-col>
        <el-col :span="8"><span class="label">调配：</span></el-col>
        <el-col :span="8"><span class="label">医师：</span>{{item.doctor}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><span class="label">核对：</span></el-col>
        <el-col :span="8"><span class="label">发药：</span></el-col>
        <el-col :span="8"><span class="label">处方总金额：</span>{{(item.totalMoney || item.total_price) | priceFilter}}</el-col>
      </el-row>
      <div class="suggestion">
        <el-row>
          <el-col :span="3">温馨提示：</el-col>
          <el-col :span="21">1.本处方当日有效</el-col>
        </el-row>
        <el-row>
          <el-col :span="3">&nbsp;</el-col>
          <el-col :span="21">2.取药时请当面核对药品名称、规格、数量</el-col>
        </el-row>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      presList: [], // 处方列表
      customer: {}, // 客户信息
      jibingjson: [], // 临床诊断
      medicaltype: 0,
    };
  },
  mounted() {
    this.customer = this.$store.state.printMsg.details;
    this.presList = this.$store.state.printMsg.westMedPre;
    this.jibingjson = this.$store.state.printMsg.medicalRecordsForm.jibingjson;
    this.medicaltype = this.$store.state.printMsg.medicalRecordsForm.medicaltype;
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

.prescription{
  padding: 10px;
  font-size: 14px;
  .item{
    &.onePage{
      page-break-after: always;
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
    .el-row{
      .el-col{
        padding: 5px 0;
      }
      .right{
        text-align: right;
      }
      .title{
        line-height: 30px;
        text-align: center;
      }
      .el-col .label{
        font-weight: bold;
      }
    }
    .info{
      border-bottom: 1px solid #000;
      border-top: 1px solid #000;
    }
    .container{
      position: relative;
      min-height: 300px;
      border-bottom: 1px solid #000;
    }
    .suggestion{
      border-top: 1px solid #000;
    }
    .jibingjson{
      display: flex;
      .label{
        flex: 0 0 80px;
        font-weight: bold;
      }
      .right{
        flex: 1 1 auto;
        .filed_item{
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          .position{
            flex: 0 0 260px;
            height: 36px;
            .el-row{
              height: 18px;
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
    }
  }
}
@import url('./print.css');
</style>
