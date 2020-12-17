<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-09 18:04:00
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-12 16:35:03
 -->
<template>
  <div class="patientStyle">
    <div class="patientMesLeft">
      <div class="title">
        <h3>客户信息</h3>
        <a href="javascript:void(0);" @click='checkMes(patientMsg.patientid)'>详细信息</a>
        <ul>
          <li>
            <strong>姓名：</strong>
            <span>{{ patientMsg.details.name }}</span>
            <strong>性别：</strong>
            <span>{{ patientMsg.details.gender | SexState}}</span>
            <strong>年龄：</strong>
            <span>{{ patientMsg.details.age }} </span>
            <span>({{ patientMsg.details.birthdate }})</span>
            <strong>客户类型：</strong>
            <span>{{patientMsg.details.patienttype | CustomerType}}</span>
          </li>
          <li>
            <strong>客户来源：</strong>
            <span>{{ patientMsg.details.sourcetype | sourcetypeFilter }}</span>
            <strong>就诊次数：</strong>
            <span>{{ patientMsg.details.visitcount }}</span>
            <strong>最近就诊时间：</strong>
            <span>{{ patientMsg.details.recenttime }}</span>
          </li>
          <li>
            <strong>就诊类型：</strong>
            <el-radio-group v-model="patientMsg.details.registtype" @change="changeClinicType">
              <el-radio :label="1">初诊</el-radio>
              <el-radio :label="2">复诊</el-radio>
            </el-radio-group>
            <span v-if="patientMsg.details.registtype === 2" class="usage" @click="getLastMedicalRecord">调用最近就诊病历</span>
            <!-- <el-button type="warning" size='small'>费用预览</el-button> -->
            <!-- <el-button type="primary" size='small' @click='isAuditResShow'>处方审核</el-button> -->
            <el-button type="primary" size='medium' @click='endDiagnosis(patientMsg.registid)'>结束就诊</el-button>
          </li>
        </ul>
      </Div>
      <!--中间  -->
      <div class="content">
        <!--正文  -->
        <el-tabs type="border-card" v-model="workTab">
          <el-tab-pane label="病历" name="1">
            <div>
              <!-- medicaltype:0 全科病历 1 牙科病历-->
              <el-button style="margin-left: 20px;" @click="toggle_medical" size="mini" type="primary" v-show="!patientMsg.medicalRecordsForm.medical_id">{{!medicaltype ||medicaltype == 0 ? '切换为牙科病历' : '切换为全科病历'}}</el-button>
              <MedicalRecords v-if="medicaltype === 0 || !medicaltype" :patientMsg='patientMsg' @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin" ref='records' ></MedicalRecords>
              <MedicalDentity v-else :patientMsg='patientMsg' @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin" ref='records' ></MedicalDentity>
            </div>
          </el-tab-pane>
          <el-tab-pane label="处方" name="2">
            <Prescription @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin" :patientMsg='patientMsg'></Prescription>
          </el-tab-pane>
          <el-tab-pane label="诊疗项目" name="3">
              <Check Title="诊疗" :patientMsg='patientMsg' :payList="zhenliaoList" :checkItem="patientMsg.checkItem" :checkId="3" :itemtypeNum="5" ref="checkItemRef" @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin"></Check>
          </el-tab-pane>
          <el-tab-pane label="耗材" name="4">
            <Check Title="耗材" :patientMsg='patientMsg' :payList="haocaiList" :checkItem="patientMsg.comsumables" :checkId="4" :itemtypeNum="6" @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin"></Check>
          </el-tab-pane>
          <el-tab-pane label="其他" name="5">
            <Check Title="其他" :patientMsg='patientMsg' :payList="qitaList" :checkItem="patientMsg.other" :checkId="6" :itemtypeNum="7" @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin"></Check>
          </el-tab-pane>
          <!-- <el-tab-pane label="医嘱" name="6">
            <DoctorAdvice :patientMsg='patientMsg' @destroyScroll="destroyRocordsWin" @initScroll="initRocordsWin"></DoctorAdvice>
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { modifyCopyLast, acceptPatients, getChargitemList, lastDiagnosis, modifyReferral } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import MedicalRecords from './components/MedicalRecords';  // 病历组件
import MedicalDentity from './components/MedicalDentity';  // 牙科病历
import Prescription from './child/Prescription';  // 处方组件
import Check from './components/Check';  // 诊疗项目耗材其它组件
import UsePlates from './components/UsePlates';
import SavaItemTemplate from './components/SavaItemTemplate';

export default {
  data() {
    return {
      registtype: 0,
      workTab: '1',
      zhenliaoList: [],
      haocaiList: [],
      qitaList: [],
      medicaltype: 0,  // 0: 全科 1: 牙科
    };
  },
  props: {
    patientMsg: {
      type: Object,
    },
  },
  components: {
    MedicalRecords, Prescription, SavaItemTemplate, UsePlates, Check, MedicalDentity,
  },
  methods: {
    ...mapMutations(['send_westPreForm', 'change_customerID', 'set_printMsg', 'change_main_menu_status']),
    initType(type) {
      this.registtype = type;
    },
    checkMes(patientid) {  // 查看详细信息
      if (!this.patientMsg.registid) return;
      this.change_customerID(patientid);
      this.$router.push({ path: `/navigator/doctorStation/patientVistor/${patientid}` });
    },
    // http
    getPayList() {  // 获取收费项目
      httpServerNormal(getChargitemList, {
        disabled: 0,
        can_appoint: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (!res || !res.length) {
            return;
          }
          res.forEach((val) => {
            if (val.disabled === 0) {
              switch (val.type) {
                case 3:
                  this.zhenliaoList.push(val);
                  break;
                case 4:
                  this.haocaiList.push(val);
                  break;
                case 6:
                  this.qitaList.push(val);
                  break;
                default:
                  break;
              }
            }
          });
        }
      });
    },
    getHistory() {  // 获取最近就诊记录
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      httpServerNormal(lastDiagnosis, {
        patient_id: this.patientMsg.patientid,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          console.log(res);
        }
      });
    },
    changeClinicType() {  // 修改就诊类型
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      httpServerNormal(modifyReferral, {
        regist_id: this.patientMsg.details.registid,
        regist_type: this.patientMsg.details.registtype,
      });
    },
    getLastMedicalRecord() {  // 获取最近的病例
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      if (this.patientMsg.details.registtype === 1) {
        return;
      }
      httpServerNormal(modifyCopyLast, {
        regist_id: this.patientMsg.details.registid,
        patient_id: this.patientMsg.patientid,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res) {
            // 添加jibingjson字段，保险起见，删掉id
            delete (res.medical_id);
            delete (res.regist_id);
            if (this.medicaltype !== res.medicaltype) {
              if (res.medicaltype === 1) {
                this.$message.error('上一次就诊病历为牙科病历,请先切换为牙科病历');
              } else {
                this.$message.error('上一次就诊病历为全科病历,请先切换为全科病历');
              }
              return;
            }
            // 调用子组建的引用模板方法
            this.$refs.records.templateCallBack({ data: res });
          }
        }
      });
    },
    endDiagnosis() {  // 结束就诊
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.$confirm('结束就诊将无法再次修改病历、处方及其他信息，请确保所填信息已保存，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpServerNormal(acceptPatients, {
          registid: this.patientMsg.registid,
          oldstatus: 2,
          newstatus: 3,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            this.$emit('endDiagnosis', true);
            this.$message({ message: '已结束就诊', type: 'success', showClose: true, duration: 1000 });
            // this.$router.push({ path: '/navigator/doctorStation/checkClientMes', query: { patientId: registid } });
            this.$router.go(0);
          }
        });
      }).catch(() => {});
    },
    destroyRocordsWin() {  // 销毁滚动条
      this.$emit('destroyScroll');
    },
    initRocordsWin() {
      this.$emit('initScroll');
    },
    // 切换病历
    toggle_medical() {
      this.$confirm('是否切换病历', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.medicaltype = this.medicaltype === 0 ? 1 : 0;
        this.patientMsg.medicalRecordsForm.medicaltype = this.medicaltype;
        if (this.medicaltype) {
          this.patientMsg.medicalRecordsForm.mainphyexam = [];
          this.patientMsg.medicalRecordsForm.other_phy_exam = [];
          this.patientMsg.medicalRecordsForm.yayizhiliaojihua = [];
          this.patientMsg.medicalRecordsForm.yayichuli = [];
          this.patientMsg.medicalRecordsForm.jibingjson = [];
        } else {
          this.patientMsg.medicalRecordsForm.mainphyexam = '';
          this.patientMsg.medicalRecordsForm.other_phy_exam = '';
        }
      }).catch(() => {});
    },
  },
  watch: {
    $nextTick() {
      this.$forceUpdate();
    },
    patientMsg: {
      handler(newValue, oldValue) {
        if (oldValue.medicalRecordsForm.medicaltype !== newValue.medicalRecordsForm.medicaltype) {
          this.medicaltype = this.patientMsg.medicalRecordsForm.medicaltype ? this.patientMsg.medicalRecordsForm.medicaltype : 0;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['westPreForm', 'user', 'clinic', 'token']),
  },
  filters: {
    sourcetypeFilter(id) {  // 客户来源
      if (id === 1) return '未知';
    },
    CustomerType(type) {
      return type === 2 ? '医保' : '自费';
    },
  },
  created() {
    this.getPayList();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.patientStyle {
  display: flex;
  position: relative;
}

.patientMesLeft {
  width: 100%;
  height: 100%;
}

.title {
  height: 125px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: relative; // z-index: 4;
  // margin-right: 30px;
  .usage{
    margin-left: 20px;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #d8dce5;
    color: #5a5e66;
    &:hover{
      color: $mainColor;
     border: 1px solid $mainColor;
    }
  }
  h3 {
    display: inline-block;
    margin: 0 40px 10px 10px;
    font-weight: 600;
    font-size: 16px;
  }
  ul {
    li {
      margin-bottom: 10px;
      strong {
        margin-left: 20px;
      }
      .el-radio-group {
        .el-radio {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .el-button {
        position: absolute;
        right: 10%;
        bottom: 10px;
      }
    }
  }
}

// 门诊病历
.content {
  margin-top: 20px;
  .el-tabs.el-tabs--border-card {
    min-height: 600px;
  }
}
.cover { // 遮罩层
  background-color: rgba(255,255,255,.6);
  position: absolute;
  top: 0;
  bottom: 20px;
  left: 0;
  right: 20px;
  z-index: 999;
  h3 {
    position: absolute;
    top: 40%;
    left: 40%;
    font-size: 30px;
    font-weight: 600;
    color: #666;
    display: table-cell;
    vertical-align:middle;
  }
}

// 医嘱样式
.footer {
  padding: 0 10px;
  .footerTitle {
    line-height: 30px;
    height: 30px;
    h3 {
      float: left;
      color: #000;
      margin-left: 5px;
      line-height: 30px;
    }
    p {
      float: right;
      line-height: 40px;
      span {
        cursor: pointer;
        margin-right: 10px;
        &:hover {
          color: $mainColor;
        }
      }
    }
  }
  .el-form {
    .el-form-item {
      margin-bottom: 30px;
      textarea {
        width: 100%;
        display: block;
        resize: vertical;
        padding: 5px 15px;
        line-height: 1.5;
        box-sizing: border-box;
        width: 100%;
        font-size: 14px;
        color: #5a5e66;
        background-color: #fff;
        border: 1px solid #d8dce5;
        border-radius: 4px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        &:focus {
          border: 1px solid $mainColor;
        }
      }
    }
  }
}
.usePlate { // 调用模板
  @include modify_info;
  overflow: auto;
  .container{
    top: 100px;
    transform: translate(-50%, 0);
    min-height: 300px;
  }
}
.doctorMsg {
  p {
    span {
      font-size: 16px;
      font-weight: 600;
    }
    .el-button {
      width: 100px;
      height: 35px;
      margin-left: 15px;
      margin-right: 5%;
    }
    &:nth-of-type(2) {
      color: red;
      margin-right: 13%;
    }
  }
}

.saveWin{  // 保存模板
  @include modify_info;
  .container{
    min-height: 200px;
  }
  .footer{
    margin-top: 30px;
    text-align: center;
  }
}
</style>

