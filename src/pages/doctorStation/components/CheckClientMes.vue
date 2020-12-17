<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="title">
        <h3>客户信息</h3>
        <div @click='goHistory' class="pullRight">
          <el-button type="primary" icon="el-icon-arrow-left" size="small">返回列表</el-button>
        </div>
        <ul>
            <li>
              <strong>姓名：</strong>
                  <span>{{ patientMsg.name }}</span>
                <strong>性别：</strong>
                <span>{{ patientMsg.gender | SexState}}</span>
                <strong>年龄：</strong>
                <span>{{ patientMsg.age }} 岁</span>
                <span>({{ patientMsg.birthdate }})</span>
                <strong>客户类型：</strong>
                <span>自费</span>
            </li>
            <li>
                <strong>客户来源：</strong>
                <span>{{ patientMsg.patienttype | sourcetypeFilter }}</span>
                <strong>最近就诊时间：</strong>
                <span>{{ patientMsg.createtime }}</span>
            </li>
        </ul>
      </div>
      <div class="text item content">
        <h3>门诊病历：<el-button size='mini' type='primary' @click='print_medical'>打印病历</el-button></h3>
        <ul class="medical">
          <li>
            <strong>主诉：</strong>
            <span>{{ medical.complaint }}</span>
          </li>
          <li>
            <strong>现病史：</strong>
            <span>{{ medical.cur_history }}</span>
          </li>
          <li>
            <strong>既往史：</strong>
            <span>{{ medical.past_history }}</span>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>个人史：</strong>
            <span>{{ medical.person_history }}</span>
          </li>
          <li>
            <strong>过敏史：</strong>
            <span>{{ medical.allergy_history }}</span>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>家族史：</strong>
            <span>{{ medical.family_history }}</span>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>月经史：</strong>
            <span>{{ medical.menses_history }}</span>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>生育史：</strong>
            <span>{{ medical.fertilit_history }}</span>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>其它：</strong>
            <span>{{ medical.other_history }}</span>
          </li>
          <li class="bodyCheck" v-if="!medical.medicaltype">
            <strong>生命体征：</strong>
            <span>体温： {{ medical.temperature }} °C</span>
            <span>血压： {{ medical.systolic_pressure }} / {{ medical.diastolic_pressure }} mmHg</span>
            <span>脉搏： {{ medical.pulse }} bpm</span>
            <span>呼吸： {{ medical.breathing }} 次/分</span>
            <span>体重： {{ medical.weight }} 公斤</span>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>体格检查：</strong>
            <span>{{ medical.mainphyexam }}</span>
          </li>
          <li v-else>
            <div class="detail">
              <strong class="label">体格检查：  </strong>
              <div class="value">
                <div class="filed_item" v-for="(item, i) in medical.mainphyexam" :key="i" >
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
              </div>
              
            </div>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>辅助检查：</strong>
            <span>{{ medical.other_phy_exam }}</span>
          </li>
          <li v-else>
            <div class="detail">
              <strong class="label">辅助检查：  </strong>
              <div class="value">
                <div class="filed_item" v-for="(item, i) in medical.other_phy_exam" :key="i" >
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
              </div>
              
            </div>
          </li>
          <li v-if="!medical.medicaltype">
            <strong>初步诊断：</strong>
            <span v-for="(item, i) in medical.jibingjson" :key="i">{{ item }} </span>
          </li>
          <li v-else>
            <div class="detail">
              <strong class="label">初步诊断：  </strong>
              <div class="value">
                <div class="filed_item" v-for="(item, i) in medical.jibingjson" :key="i" >
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
          </li>
          <li v-if="!!medical.medicaltype">
            <div class="detail">
              <strong class="label">治疗计划：  </strong>
              <div class="value">
                <div class="filed_item" v-for="(item, i) in medical.yayizhiliaojihua" :key="i" >
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
              </div>
              
            </div>
          </li>
           <li v-if="!!medical.medicaltype">
            <div class="detail">
              <strong class="label">处理：  </strong>
              <div class="value">
                <div class="filed_item" v-for="(item, i) in medical.yayichuli" :key="i" >
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
              </div>
              
            </div>
          </li>
          <li>
            <strong>治疗意见：</strong>
            <span>{{ medical.advice }}</span>
          </li>
        </ul>
        <div class="prescriptions" v-if="prescriptions && prescriptions.length">
          <h3>处方单：</h3>
          <ul>
            <li v-for='(item, index) in westPrescriptions' :key='index'>
              <h4 class='prescription_title'>西药处方{{ index + 1 }} <span>({{ item.status | statusFilter}})</span><el-button size='mini' type='primary' @click='print_west(index);'>打印</el-button></h4>
              <p v-for='(item2, index2) in item.drug_list' :key='index2'>
                <span>药名：{{ item2.name }}</span>
                <span>厂商：{{ item2.producer }}</span>
                <span>规格：{{ item2.spec_text }}</span>
                <span>用法：{{ item2.use_method }}</span>
                <span>单次剂量：{{ item2.dosage }} {{ item2.dose_unit }}</span>
                <span>频次：{{ item2.frequency }}</span>
                <span>天数：{{ item2.days }}</span>
                <span>开药数量：{{ item2.total }} {{ item2.total_unit }}</span>
              </p>
            </li>
          </ul>
          <ul>
            <li v-for='(item, index) in chinaPrescriptions' :key='index'>
              <h4 class='prescription_title'>中药处方{{ index + 1 }} <span>({{ item.status | statusFilter}})</span> <el-button size='mini' type='primary' @click='print_chin(index);'>打印</el-button></h4>
              <p v-for='(item2, index2) in item.drug_list' :key='index2'>
                <span>药名：{{ item2.name }}</span>
                <span>厂商：{{ item2.producer }}</span>
                <span>单次剂量：{{ item2.dosage }} {{ item2.dose_unit }}</span>
                <span>煎法/用法：{{ item2.use_note }}</span>
                <span>{{ item2.use_method }}</span>
                <span>总共：{{ item2.total }} 剂</span>
                <span>每次：{{ item2.daily_use }} ml</span>
                <span>频次：{{ item2.frequency }}</span>
                <span>其他要求：{{ item2.taking_note }}</span>
              </p>
            </li>
          </ul>
          <ul class='waterPrescriptions list' v-show='waterPrescriptions.length'>
            <li v-for='(item, index) in waterPrescriptions' :key='index'>
              <h4 class='prescription_title'>输液处方{{ index + 1 }} <span>({{ item.status | statusFilter}})</span><el-button size='mini' type='primary' @click='print_water(index);'>打印</el-button></h4>
              <p v-for='(item2, index2) in item.drug_list' :key='index2'>
                <span>输液组{{ item2.group_index_str}}</span>
                <span>药名：{{ item2.name }}</span>
                <span>厂商：{{ item2.producer }}</span>
                <span>规格：{{ item2.spec_text }}</span>
                <span>单次剂量：{{ item2.dosage }} {{ item2.dose_unit }}</span>
                <span>皮试：{{ item2.skin_test === 0 ? '不需要' : '需要' }}</span>
                <span>数量：{{ item2.total }} {{ item2.total_unit }}</span>
                <span>用法：{{ item2.use_method }} </span>
                <span>频次：{{ item2.frequency }} </span>
                <span>滴速：{{ item2.infusion_speed }} {{ item2.infu_speed_unit }}</span>
                <span>开始日期：{{ item2.begin_date | DateFilter}} </span>
                <span>连续天数：{{ item2.days }} </span>
              </p>
            </li>
          </ul>
        </div>
        <div class="chargitems" v-if="treamentList && treamentList.length">
          <h3>诊疗项目: 
            <el-button size='mini' type='primary' @click='print_charge_item(1, treamentList)'>治疗单打印</el-button>
            <el-button size='mini' type='primary' @click='print_charge_item(3, treamentList)'>申请单打印</el-button>
          </h3>
          <p v-for="(item, index) in treamentList" :key="index">
            <!-- <strong>{{ item.item_type | typeFilter }}：</strong> -->
            <span>项目名：{{ item.name }}</span>
            <span>数量：{{ item.total }} {{ item.total_unit }}</span>
            <span>状态：{{ item.status | statusFilter }}</span>
          </p>
        </div>

        <div class="chargitems" v-if="materialList && materialList.length">
          <h3>耗材: 
            <el-button size='mini' type='primary' @click='print_charge_item(4, materialList)'>耗材打印</el-button>
          </h3>
          <p v-for="(item, index) in materialList" :key="index">
            <!-- <strong>{{ item.item_type | typeFilter }}：</strong> -->
            <span>项目名：{{ item.name }}</span>
            <span>数量：{{ item.total }} {{ item.total_unit }}</span>
            <span>状态：{{ item.status | statusFilter }}</span>
          </p>
        </div>

        <div class="chargitems" v-if="otherList && otherList.length">
          <h3>其他项目: 
            <el-button size='mini' type='primary' @click='print_charge_item(6, otherList)'>其他项目打印</el-button>
          </h3>
          <p v-for="(item, index) in otherList" :key="index">
            <!-- <strong>{{ item.item_type | typeFilter }}：</strong> -->
            <span>项目名：{{ item.name }}</span>
            <span>数量：{{ item.total }} {{ item.total_unit }}</span>
            <span>状态：{{ item.status | statusFilter }}</span>
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { diagnosisInfo } from '@apiNormal';
import { BCC334 } from '@/common/js/dictionary';

export default {
  data() {
    return {
      patientMsg: {},
      defaultMedical: {
        complaint: '',
        cur_history: '',   // 现病史
        past_history: '',        // 既往史
        person_history: '',  // 个人史
        allergy_history: '',   // 过敏史
        family_history: '',    // 家族史
        other_history: '',  // 其他
        other_phy_exam: '',    // 其他体格检查
        diagn_result: '',   // 本次诊断结果
      },
      medical: {},
      // 处方列表
      prescriptions: [],
      // 中药处方列表
      chinaPrescriptions: [],
      // 西药处方列表
      westPrescriptions: [],
      // 输液处方列表
      waterPrescriptions: [],
      // 收费项列表
      chargitems: [],
      materialList: [], // 耗材
      treamentList: [], // 诊疗项目
      otherList: [], // 其他收费项目列表
    };
  },
  mounted() {
    this.getDiagnosisInfo(this.$route.query.patientId);
  },
  methods: {
    ...mapMutations(['set_printMsg']),
    goHistory() {  // 返回
      this.$router.push({ path: '/navigator/doctorStation/treatmentHistory' });
    },
    getDiagnosisInfo(id) {
      httpServerNormal(diagnosisInfo, {
        regist_id: id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.patientMsg = res.regist;
          this.patientMsg.clinicname = res.clinic_name;
          this.patientMsg.BCC334 = this.patientMsg.szsbcardid ? this.patientMsg.bcc334 ? BCC334.find(v => v.key === this.patientMsg.bcc334).value : BCC334[0].value : '';
          this.patientMsg.age = new Date().getFullYear() - (res.patient.birthdate.slice(0, 4));
          this.patientMsg.createtime = res.regist.createtime.split(' ')[0];
          this.medical = res.medical || this.defaultMedical;
          this.medical.jibingjson = res.medical.jibingjson ? JSON.parse(res.medical.jibingjson).map((v) => { return v.jbname ? v.jbname : v; }) : [];
          if (res.medical.medicaltype) {
            // 牙科病历
            if (this.medical.jibingjson && this.medical.jibingjson.length && !this.medical.jibingjson[0].pos) {
              this.medical.jibingjson = [{ desc: this.medical.jibingjson, pos: { left_top: [], right_top: [], left_bottom: [], right_bottom: [] } }];
            }
            try {
              this.medical.mainphyexam = JSON.parse(res.medical.mainphyexam);
            } catch (error) {
              this.medical.mainphyexam = [{ pos: { left_top: [], right_top: [], left_bottom: [], right_bottom: [] }, desc: this.medical.mainphyexam }];
            }

            try {
              this.medical.other_phy_exam = JSON.parse(res.medical.other_phy_exam);
            } catch (error) {
              this.medical.other_phy_exam = [{ pos: { left_top: [], right_top: [], left_bottom: [], right_bottom: [] }, desc: this.medical.other_phy_exam }];
            }
            this.medical.yayizhiliaojihua = res.medical.yayizhiliaojihua ? res.medical.yayizhiliaojihua.map(v => ({ desc: v.desc, pos: v.pos ? JSON.parse(v.pos) : { left_top: [], right_top: [], left_bottom: [], right_bottom: [] } })) : [];
            this.medical.yayichuli = res.medical.yayichuli ? res.medical.yayichuli.map(v => ({ desc: v.desc, pos: v.pos ? JSON.parse(v.pos) : { left_top: [], right_top: [], left_bottom: [], right_bottom: [] } })) : [];
          }
          this.prescriptions = res.prescriptions || [];
          this.chargitems = res.chargitems || [];
          this.medical.temperature = this.medical.temperature === 0 ? '' : this.medical.temperature;
          this.medical.systolic_pressure = this.medical.systolic_pressure === 0 ? '' : this.medical.systolic_pressure;
          this.medical.diastolic_pressure = this.medical.diastolic_pressure === 0 ? '' : this.medical.diastolic_pressure;
          this.medical.pulse = this.medical.pulse === 0 ? '' : this.medical.pulse;
          this.medical.breathing = this.medical.breathing === 0 ? '' : this.medical.breathing;
          // 处方分类
          this.prescriptionsClassify();
          // 收费项分类
          this.chargitemsClassify();
        }
      });
    },
     // 处方分类
    prescriptionsClassify() {
      this.chinaPrescriptions = this.prescriptions.filter((item) => {
        return item.prescript_type === 2;
      });
      this.westPrescriptions = this.prescriptions.filter((item) => {
        return item.prescript_type === 1;
      });
      this.waterPrescriptions = this.prescriptions.filter((item) => {
        return item.prescript_type === 3;
      });
    },
    // 收费项分类
    chargitemsClassify() {
      this.treamentList = this.chargitems.filter((item) => {
        return item.item_type === 3;
      });
      this.materialList = this.chargitems.filter((item) => {
        return item.item_type === 4;
      });
      this.otherList = this.chargitems.filter((item) => {
        return item.item_type === 6;
      });
    },
    /*  打印  */
    // 病历打印
    print_medical() {
      const printMsg = {
        details: this.patientMsg,
        medicalRecordsForm: {
          ...this.medical,
        },
        advice: this.medical.advice,
      };
      this.set_printMsg(printMsg);
      this.$nextTick(() => {
        const url = !this.medical.medicaltype ? '/print/illnessPrint' : '/print/illnessPrintDentistry';
        window.open(url);
      });
    },
    // 西药处方单打印
    print_west(i) {
      const printMsg = {
        details: this.patientMsg,
        westMedPre: [this.westPrescriptions[i]],
        medicalRecordsForm: {
          jibingjson: this.medical.jibingjson,
          medicaltype: this.medical.medicaltype,
        },
      };
      this.set_printMsg(printMsg);
      this.$nextTick(() => {
        window.open('/print/WestPrescription');
      });
    },
    // 中药处方打印
    print_chin(i) {
      const printMsg = {
        details: this.patientMsg,
        chinaMedPre: [this.chinaPrescriptions[i]],
        medicalRecordsForm: {
          jibingjson: this.medical.jibingjson,
          medicaltype: this.medical.medicaltype,
        },
      };
      this.set_printMsg(printMsg);
      this.$nextTick(() => {
        window.open('/print/ChinesePrescription');
      });
    },
    // 输液处方打印
    print_water(i) {
      let groups = [];
      this.waterPrescriptions[i].drug_list.forEach((val) => {
        groups.push(val.group_index_str);
      });
      groups = Array.from(new Set(groups));

      groups = groups.map((groupStr) => {
        const group = {
          drug_list: [],
          totalMoney: 0,
        };
        group.drug_list = this.waterPrescriptions[i].drug_list.filter((drug) => {
          return drug.group_index_str === groupStr;
        });
        group.totalMoney = group.drug_list.reduce((total, drug) => {
          return drug.total_price + total;
        }, 0);
        group.use_method = group.drug_list[0].use_method;
        group.frequency = group.drug_list[0].frequency;
        group.use_method = group.drug_list[0].use_method;
        group.infusion_speed = group.drug_list[0].infusion_speed ? group.drug_list[0].infusion_speed.toString() : '';
        group.infu_speed_unit = group.drug_list[0].infu_speed_unit;
        group.begin_date = new Date();
        group.days = group.drug_list[0].days ? group.drug_list[0].days.toString() : '';
        return group;
      });
      const printMsg = {
        details: this.patientMsg,
        infusionMedPre: [groups],
        medicalRecordsForm: {
          jibingjson: this.medical.jibingjson,
          medicaltype: this.medical.medicaltype,
        },
      };
      this.set_printMsg(printMsg);
      this.$nextTick(() => {
        window.open('/print/WaterPrescription');
      });
    },
    // 收费项目打印
    print_charge_item(type, items) {
      const url = type === 1 ? '/print/cureListPrint' : `/print/treatmentPrint?checkId=${type}`;
      const printMsg = {
        details: this.patientMsg,
        checkItem: {
          items,
        },
        comsumables: {
          items,
        },
        other: {
          items,
        },
        medicalRecordsForm: {
          jibingjson: this.medical.jibingjson,
          medicaltype: this.medical.medicaltype,
        },
      };
      this.set_printMsg(printMsg);
      this.$nextTick(() => {
        window.open(url);
      });
    },
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  filters: {
    sourcetypeFilter(id) {  // 客户来源
      if (id === 1) return '未知';
    },
    statusFilter(id) {
      switch (id) {
        case 0:
          return '已保存';
        case 1:
          return '已收费';
        case 2:
          return '已发药';
        case 3:
          return '已退药';
        case 4:
          return '已退费';
        default:
          break;
      }
    },
    typeFilter(id) {
      switch (id) {
        case 3:
          return '诊疗项目';
        case 4:
          return '耗材';
        case 6:
          return '其它';
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.title {
    h3 {
        display: inline-block;
        margin: 10px;
        font-weight: 600;
        font-size: 16px;
    }
    ul {
        li {
            margin-bottom: 10px;
            line-height: 25px;
            strong {
                margin-left: 30px;
            }
            .el-radio-group {
                .el-radio {
                    margin-left: 10px;
                }
            }
        }
    }
    .pullRight{
      float: right;
      margin-right: 50px;
      margin-top: 20px;
    }
}
.content{
  h3{
    line-height: 35px;
    font-weight: 600;
  }
  .medical{  // 病历
    li{
      line-height: 40px;
      font-size: 14px;
        &:nth-of-type(2n-1){
          background-color: #FAFAFA;
        }
          &.bodyCheck{
        span {
          display: inline-block;
          margin-right: 30px;
        }
      }
      strong {
        display: inline-block;
        width: 150px;
        text-align: center;
      }
    }
    .detail{
      display: flex;
      .label{
        flex: 0 0 150px;
        width: 150px;
        text-align: center;
      }
      .value{
        flex: 1 1 auto;
        .filed_item{
          margin-bottom: 12px;
          padding: 12px;
          display: flex;
          align-items: center;
          border: 1px solid transparent;
          cursor: pointer;
          &:hover{
            border: 1px solid $mainColor;
          }
          .position{
            flex: 0 0 240px;
            height: 48px;
            cursor: pointer;
            .el-row{
              height: 24px;
              line-height: 24px;
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
  .prescriptions{ // 处方
    ul {
      li {
        h4 {
          font-weight: 600;
          font-size: 14px;
          line-height: 30px;
          padding-left: -20px;
          span {
            font-weight: 400;
          }
        }
        padding-left: 20px;
        line-height: 25px;
        span {
          margin-right: 20px;
          &.status{
            color: $mainColor;
            font-size: 16px;
          }
        }
      }
    }
  }
  .chargitems {
    p {
    padding-left: 30px;
    strong {
      display: inline-block;
      width: 80px;
    }
    span {
      margin-right: 30px;
    }
    }
  }
}
</style>

