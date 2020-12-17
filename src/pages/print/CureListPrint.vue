<template>
  <div class="treatment" v-aotoClose>
    <el-row>
        <el-col :span="24" class="left">NO.{{customer.registid}}</el-col>
        <!-- <el-col :span="12" class="right">{{customer.registtype}}</el-col> -->
    </el-row>
    <el-row>
        <el-col :span="24" class="title"><h1>{{customer.clinicname}}</h1></el-col>
    </el-row>
    <el-row>
        <el-col :span="24" class="title"><h2>门诊治疗单</h2></el-col>
    </el-row>
    <div class="info">
        <el-row>
          <el-col :span="6"><span class="label">姓名：</span>{{customer.name}}</el-col>
          <el-col :span="6"><span class="label">性别：</span>{{customer.gender | SexState}}</el-col>
          <el-col :span="6"><span class="label">年龄：</span>{{customer.age}}</el-col>
          <el-col :span="6"><span class="label">科室：</span>{{customer.deptname}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><span class="label">费别: </span><i class='boring-icon'>□</i>自费 <i class='boring-icon'>□ <i class="select-true" v-if="customer.szsbcardid"></i></i>医保</el-col>
          <el-col :span="8"><span class="label">社保电脑号: <span>{{customer.szsbcardid}}</span></span></el-col>
          <el-col :span="8"><span class="label">参保类型: </span>{{customer.BCC334}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="label">电话/住址：</span>{{customer.phone}}</el-col>
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
        <table width="100%">
            <tr>
                <th>项目名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>单位</th>
                <th>第一次</th>
                <th>第二次</th>
                <th>第三次</th>
                <th>第四次</th>
                <th>第五次</th>
                <th>第六次</th>
                <th>第七次</th>
            </tr>
            <tr v-for="(item, index) in treatment" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.total}}</td>
                <td>{{item.total_unit}}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
        <p class="empty">(以下空白)</p>
        <el-row class="totalprice">
            <el-col class="right" :span="22"><span class="label">总金额:  </span>{{totalPrice.toFixed(2)}}</el-col>
            <el-col :span="2">&nbsp;</el-col>
        </el-row>
        <table width='100%' border="1px solid #000;">
            <tr>
                <td>治疗日期</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>患者签名</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>备注</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
    <el-row class="footer">
        <el-col class="right" :span="20"><span class="label">医师: {{treatment.doctor}} </span></el-col>
        <el-col :span="4">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      treatment: [],
      customer: {},
      jibingjson: [], // 临床诊断
      medicaltype: 0,
    };
  },
  mounted() {
    this.treatment = this.$store.state.printMsg.checkItem.items;
    this.customer = this.$store.state.printMsg.details;
    this.jibingjson = this.$store.state.printMsg.medicalRecordsForm.jibingjson;
    this.medicaltype = this.$store.state.printMsg.medicalRecordsForm.medicaltype;
    this.treatment.doctor = this.$store.state.printMsg.doctorTip ? this.$store.state.printMsg.doctorTip.name : this.$store.state.printMsg.details.doctor;
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
  computed: {
    ...mapGetters(['user']),
    totalPrice() {
      let total = 0;
      this.treatment.forEach((element) => {
        total += element.total_price;
      });
      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.treatment{
    font-size: 10px;
    padding: 15px;
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
            padding: 4px;
            &.right{
                text-align: right;
            }
            &.title{
                text-align: center;
            }
            .label{
                font-weight: bold;
            }
        }
    }
    .info{
        border-top: 1px solid #000;
    }
    .container{
        position: relative;
        padding-bottom: 20px;
        // min-height: 300px;
        border-bottom: 1px solid #000;
        border-top: 1px solid #000;
        table tr td{
            text-align: center;
            padding: 4px;
        }
        .empty{
            margin-top: 6px;
            border-bottom: 1px solid #000;
        }
        .totalprice{
            margin-bottom: 60px;
        }
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
            flex: 0 260px;
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

@media print {
  .treatment {
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

