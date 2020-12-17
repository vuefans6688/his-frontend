<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-09 18:04:00
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-29 15:51:39
 -->
<template>
  <div class="recordStyle">
    <div class="medicalRecordsForm">
      <el-form :model="patientMsg.medicalRecordsForm" :rules="rules" ref="medicalRecordsForm" label-width="120px" class="demo-ruleForm" size="mini">
        <el-form-item align='right' class="medicalRecordsTitle medicalHistory">
          <p>
            <span @click='printRecord'>
              <i class="el-icon-printer"></i>
              打印病历
            </span>
            <span @click='savePlates'>
              <i class="el-icon-circle-check-outline"></i>
              保存为模板
            </span>
            <span @click='usePlates("病历")'>
              <i class="el-icon-document"></i>
              调用模板
            </span>
          </p>
        </el-form-item>
        <el-form-item label="主 诉：" class="medicalHistory rules" prop="complaint">
          <el-input v-model="patientMsg.medicalRecordsForm.complaint" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="现病史：" class="medicalHistory" prop="cur_history">
          <el-input v-model="patientMsg.medicalRecordsForm.cur_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item class="medicalHistory noPadding">
          <el-checkbox v-model="checkbox.allergy" @change="clearCheckbox('allergy')" :disabled="!patientMsg.registid">过敏史</el-checkbox>
          <el-checkbox v-model="checkbox.past" @change="clearCheckbox('past')" :disabled="!patientMsg.registid">既往史</el-checkbox>
          <el-checkbox v-model="checkbox.personal" @change="clearCheckbox('personal')" :disabled="!patientMsg.registid">个人史</el-checkbox>
          <el-checkbox v-model="checkbox.family" @change="clearCheckbox('family')" :disabled="!patientMsg.registid">家族史</el-checkbox>
          <el-checkbox v-if='patientMsg.details.gender !== 1' v-model="checkbox.menses" @change="clearCheckbox('menses')" :disabled="!patientMsg.registid">月经史</el-checkbox>
          <el-checkbox v-if='patientMsg.details.gender !== 1' v-model="checkbox.fertilit" @change="clearCheckbox('fertilit')" :disabled="!patientMsg.registid">生育史</el-checkbox>
          <el-checkbox v-model="checkbox.other" @change="clearCheckbox('other')" :disabled="!patientMsg.registid">其他</el-checkbox>
        </el-form-item>
        <el-form-item label="过敏史：" class="medicalHistory" prop="allergy_history" v-show="checkbox.allergy">
          <el-input v-model="patientMsg.medicalRecordsForm.allergy_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="既往史：" class="medicalHistory" prop="past_history" v-if="checkbox.past">
          <el-input v-model="patientMsg.medicalRecordsForm.past_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="个人史：" class="medicalHistory" prop="person_history" v-show="checkbox.personal">
          <el-input v-model="patientMsg.medicalRecordsForm.person_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="家族史：" class="medicalHistory" prop="family_history" v-show="checkbox.family">
          <el-input v-model="patientMsg.medicalRecordsForm.family_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="月经史：" class="medicalHistory" prop="menses_history" v-show="checkbox.menses">
          <el-input v-model="patientMsg.medicalRecordsForm.menses_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="生育史：" class="medicalHistory" prop="fertilit_history" v-show="checkbox.fertilit">
          <el-input v-model="patientMsg.medicalRecordsForm.fertilit_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="其 他：" class="medicalHistory" prop="other_history" v-show="checkbox.other">
          <el-input v-model="patientMsg.medicalRecordsForm.other_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="生命体征：" class="medicalHistory inputNoPadding inline_form prescriptionInputs" align="left">
          <!--体温  -->
          <el-form-item prop='temperature' label='体温：' label-width="54px">
            <el-input v-model="patientMsg.medicalRecordsForm.temperature" class="inlineBlock" @keyup.native="numberInp('temperature')" :maxlength="4" placeholder="35~42" size="mini" :disabled="!patientMsg.registid"></el-input>
            <span class="spans">°C</span>
          </el-form-item>
          <!--血压  -->
          <el-form-item prop='systolic' label='血压：' label-width="54px">
            <el-input v-model="patientMsg.medicalRecordsForm.systolic_pressure" class="inlineBlock" @keyup.native="numberInp('systolic_pressure')"  placeholder="舒张压0~300" size="mini" :disabled="!patientMsg.registid"></el-input> /
            <el-input v-model="patientMsg.medicalRecordsForm.diastolic_pressure" class="inlineBlock" @keyup.native="numberInp('diastolic_pressure')"  placeholder="收缩压0~300" size="mini" :disabled="!patientMsg.registid"></el-input>
          <span class="spans">mmHg</span>
          </el-form-item>
          <!--脉搏  -->
          <el-form-item prop='pulse' label='脉搏：' label-width="54px">
            <el-input v-model="patientMsg.medicalRecordsForm.pulse" class="inlineBlock" placeholder="50~300" @keyup.native="numberInp('pulse')" :maxlength="3" size="mini" :disabled="!patientMsg.registid"></el-input>
            <span class="spans">bpm</span>
          </el-form-item>
          <!--呼吸  -->
          <el-form-item prop='breathing' label='呼吸：' label-width="54px">
            <el-input v-model="patientMsg.medicalRecordsForm.breathing" class="inlineBlock" placeholder="0~50" @keyup.native="numberInp('breathing')" size="mini" :disabled="!patientMsg.registid"></el-input>
            <span class="spans">次/分</span>
          </el-form-item>
          <!--体重  -->
          <el-form-item prop='weight' label='体重：' label-width="54px">
            <el-input v-model="patientMsg.medicalRecordsForm.weight" class="inlineBlock" placeholder="0~200" @keyup.native="numberInp('weight')" size="mini" :disabled="!patientMsg.registid"></el-input>
            <span class="spans">公斤</span>
          </el-form-item>
        </el-form-item>
        <el-form-item label="体格检查：" class="medicalHistory" prop="mainphyexam">
          <el-input v-model="patientMsg.medicalRecordsForm.mainphyexam" type="textarea" :autosize="{ maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="辅助检查：" class="medicalHistory" prop="other_phy_exam">
          <el-input v-model="patientMsg.medicalRecordsForm.other_phy_exam" type="textarea" :autosize="{ maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="" class="medicalHistory rules " prop="jibingjson" style="margin-left: -100px;">
          <div style="display: flex;">
            <p class="label" style="flex: 0 0 88px; padding-right: 12px; text-align: right;">
              <span class="must" style="color: #606266;">初步诊断： </span>
            </p>
             <el-select v-model="patientMsg.medicalRecordsForm.jibingjson" multiple filterable remote :trigger-on-focus="false" :remote-method="remoteMethod" :disabled="!patientMsg.registid"
                placeholder="注：请选择符合国际疾病分类ICD-10的标准疾病名称，否则医保系统将无法识别" size="small">
              <el-option v-for="item in jibingSelectOptions" :key="item.maincode" :label="item.maincode+'-'+item.jbname" :value="item.maincode+'-'+item.jbname"></el-option>
            </el-select>
          </div>
         
        </el-form-item>

        <el-form-item label="治疗意见：" class="medicalHistory" prop="advice">
          <el-input v-model="patientMsg.medicalRecordsForm.advice" type="textarea" :autosize="{ minRows:2, maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>

        <el-form-item align='right' class="medicalHistory">
          <div class="doctorMsg">
            <p>医生：
              <span>{{ patientMsg.doctorTip.name }}</span>
              <el-button type="primary" @click="submitForm('medicalRecordsForm')" size='small'>保 存</el-button>  
            </p>
            <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--保存为模板窗  -->
    <div v-if='savaPlateWin' class='saveWin'>
      <div class="container">
        <div class="close" @click='closeSavePlatesWin'><i class="el-icon-circle-close"></i></div>
        <SaveRecordPlates :recordForm='patientMsg.medicalRecordsForm'  @closeWin="closeSavePlatesWin"></SaveRecordPlates>
      </div>
    </div>
    <!--调用模板  -->
    <div class="usePlate" v-if='usePlateWin'>
      <div class="container">
        <div class="close" @click='closeUsePlateWin'><i class="el-icon-circle-close"></i></div>
        <UsePlates :templateType='1' @callball="templateCallBack"></UsePlates>
      </div>
    </div>
  </div>
</template>

<script>
import { floatLimit } from '@/utils/inputLimit';
import { mapGetters, mapMutations } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import { saveMedical, getjibing } from '@apiNormal';
import doctorStationSearch from '@/components/DoctorStationSearch';
import SaveRecordPlates from './SaveRecordPlates';
import UsePlates from './UsePlates';

export default {
  data() {
    const temperatureValidate = (rule, value, callback) => {
      const isValid = /^(3[5-9]{1}|4[0-1]{1})(\.\d{1})?$|^42$/.test(value);
      if (value && !isValid) {
        callback(new Error('请输入合适数值'));
      } else {
        callback();
      }
    };
    const systolicValidate = (rule, valu2, callback) => {
      const num1 = parseFloat(this.patientMsg.medicalRecordsForm.systolic_pressure);
      const num2 = parseFloat(this.patientMsg.medicalRecordsForm.diastolic_pressure);
      const flag1 = num1 > 0 && num1 <= 300;
      const flag2 = num2 > 0 && num2 <= 300;
      const flag = num1 <= num2;
      if (num1 && !flag1) {
        callback(new Error('请输入合适数值(1~300)'));
      } else if (num2 && !flag2) {
        callback(new Error('请输入合适数值(1~300)'));
      } else if (num1 && num2 && !flag) {
        callback(new Error('错误'));
      } else {
        callback();
      }
    };
    // 脉搏
    const pulseValidate = (rule, value, callback) => {
      const isValid = /^(50|[5-9]\d{1}|1\d{2}|2\d{2})$|^300$/.test(value);
      if (value && !isValid) {
        callback(new Error('请输入合适数值'));
      } else {
        callback();
      }
    };
    // 呼吸
    const breatheValidate = (rule, value, callback) => {
      if (value > 50) {
        callback(new Error('请输入合适数值'));
      } else {
        callback();
      }
    };
    const checkDiagnResult = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('本次诊断结果中至少选择一个疾病名称'));
      } else {
        callback();
      }
      callback();
    };
    return {
      rules: {  // 挂号验证
        complaint: [
          { required: true, message: '请输入病人主诉', trigger: 'blur' },
          { min: 2, max: 500, message: '长度为2~500 ', trigger: 'blur' },
        ],
        jibingjson: [
          // { required: true, message: '本次诊断结果中至少选择一个疾病名称', trigger: 'blur' },
          { validator: checkDiagnResult, trigger: 'blur' },
        ],
        temperature: [
          { validator: temperatureValidate, trigger: 'blur' },
        ],
        systolic: [
          { validator: systolicValidate, trigger: 'blur' },
        ],
        pulse: [
          { validator: pulseValidate, trigger: 'blur' },
        ],
        breathing: [
          { validator: breatheValidate, trigger: 'blur' },
        ],
        cur_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        // mainphyexam: [
        //   { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        // ],
        // other_phy_exam: [
        //   { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        // ],
        allergy_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        past_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        person_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        family_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        menses_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        fertilit_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        other_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        advice: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
      },
      checkbox: { // 个人史 过敏史等单选框
        past: false,
        personal: false,
        allergy: true,
        family: false,
        other: false,
        menses: false, // 月经历史
        fertilit: false, // 生育史
      },
      searchWindows: false,  // 常见疾病辅助窗口
      savaPlateWin: false,  // 保存模板窗口
      usePlateWin: false,    // 调用模板窗口
      useMesTitle: { // 调用模板抬头
        title: '',
        type: '',
      },

      jibingSelectOptions: [],

      printRecordObj: {},  // 保存打印对象
      // 模板列表
      templateList: [],
      // dynamicTags: [],  // 病症tags
      searchName: '',
    };
  },
  props: ['patientMsg'],
  methods: {
    ...mapMutations(['set_printMsg']),
    clearCheckbox(str) {  // 剔除不选的内容
      switch (str) {
        case 'past':
          this.patientMsg.medicalRecordsForm.past_history = '';
          break;
        case 'personal':
          this.patientMsg.medicalRecordsForm.person_history = '';
          break;
        case 'allergy':
          this.patientMsg.medicalRecordsForm.allergy_history = '';
          break;
        case 'family':
          this.patientMsg.medicalRecordsForm.family_history = '';
          break;
        case 'menses':  // 月经历史
          this.patientMsg.medicalRecordsForm.menses_history = '';
          break;
        case 'fertilit':  // 生育史
          this.patientMsg.medicalRecordsForm.fertilit_history = '';
          break;
        case 'other':
          this.patientMsg.medicalRecordsForm.other_history = '';
          break;
        default:
          break;
      }
    },
    beforeSubmit() {  // 保存前处理
      this.printRecordObj = {
        clinic_id: this.clinic,
        regist_id: this.patientMsg.registid,
        medical_id: this.patientMsg.medicalRecordsForm.medical_id,
        complaint: this.patientMsg.medicalRecordsForm.complaint,
        past_history: this.patientMsg.medicalRecordsForm.past_history,
        cur_history: this.patientMsg.medicalRecordsForm.cur_history,
        person_history: this.patientMsg.medicalRecordsForm.person_history,
        family_history: this.patientMsg.medicalRecordsForm.family_history,
        menses_history: this.patientMsg.medicalRecordsForm.menses_history, // 月经
        fertilit_history: this.patientMsg.medicalRecordsForm.fertilit_history, // 生育
        allergy_history: this.patientMsg.medicalRecordsForm.allergy_history,
        other_history: this.patientMsg.medicalRecordsForm.other_history,
        temperature: +this.patientMsg.medicalRecordsForm.temperature,
        systolic_pressure: +this.patientMsg.medicalRecordsForm.systolic_pressure,
        diastolic_pressure: +this.patientMsg.medicalRecordsForm.diastolic_pressure,
        pulse: +this.patientMsg.medicalRecordsForm.pulse,
        breathing: +this.patientMsg.medicalRecordsForm.breathing,
        weight: +this.patientMsg.medicalRecordsForm.weight,
        mainphyexam: this.patientMsg.medicalRecordsForm.mainphyexam,
        other_phy_exam: this.patientMsg.medicalRecordsForm.other_phy_exam,
        jibingjson: JSON.stringify(this.patientMsg.medicalRecordsForm.jibingjson),
        advice: this.patientMsg.medicalRecordsForm.advice,
        doctor: this.patientMsg.doctorTip.name,
      };
    },
    submitForm(formName) {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete (this.printRecordObj.medical_id);
          this.beforeSubmit();
          this.save_Medical();   // 保存病历
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    fromChildTitle(data) {  // 辅助输入组件传值
      if (!this.patientMsg.registid) return;
      if (this.patientMsg.medicalRecordsForm.diagn_result.indexOf(data) !== -1) {
        return;
      }
      this.patientMsg.medicalRecordsForm.diagn_result += data + ' ';
    },
    numberInp(str) { // 限制数字输入
      this.patientMsg.medicalRecordsForm[str] = floatLimit(this.patientMsg.medicalRecordsForm[str], 2);
    },
    savePlates() { // 打开保存模板窗口
      this.savaPlateWin = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    closeSavePlatesWin() {
      this.savaPlateWin = false;
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
    },
    usePlates(name) { // 调用模板窗口
      this.useMesTitle.title = name;
      this.usePlateWin = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    closeUsePlateWin() {  // 关闭调用模态窗口
      this.usePlateWin = false;
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
    },
    printRecord() {  // 打印病历
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      const printMsg = deepcopy(this.patientMsg);
      if (!printMsg.medicalRecordsForm.medical_id) {
        this.$message({ message: '请先保存病历', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.set_printMsg(printMsg);
      this.$nextTick(() => {
        window.open('/print/illnessPrint');
      });
    },
    // http
    save_Medical() {  // 保存病历
      httpServerNormal(saveMedical, this.printRecordObj).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$set(this.patientMsg.medicalRecordsForm, 'medical_id', res.medical_id);
          this.$message({ message: '病历保存成功', type: 'success', showClose: true, duration: 1000 });
        }
      });
    },
    // 调用模板的回调
    templateCallBack(data) {
      this.closeUsePlateWin();
      const illness = data.data;
      this.patientMsg.medicalRecordsForm.complaint = illness.complaint;
      this.patientMsg.medicalRecordsForm.cur_history = illness.cur_history;
      this.patientMsg.medicalRecordsForm.past_history = illness.past_history;
      this.patientMsg.medicalRecordsForm.person_history = illness.person_history;
      this.patientMsg.medicalRecordsForm.allergy_history = illness.allergy_history;
      this.patientMsg.medicalRecordsForm.family_history = illness.family_history;
      this.patientMsg.medicalRecordsForm.other_history = illness.other_history;
      this.patientMsg.medicalRecordsForm.menses_history = illness.menses_history;  // 新增加的月经史
      this.patientMsg.medicalRecordsForm.fertilit_history = illness.fertilit_history; // 新增加的生育史
      // 结束
      this.patientMsg.medicalRecordsForm.mainphyexam = illness.mainphyexam;
      this.patientMsg.medicalRecordsForm.other_phy_exam = illness.other_phy_exam;
      this.patientMsg.medicalRecordsForm.advice = illness.advice;
      this.patientMsg.medicalRecordsForm.jibingjson = illness.jibingjson ? JSON.parse(illness.jibingjson).map(v => v.jbname ? `${v.maincode}-${v.jbname}` : v) : [];
      // 添加的
      this.patientMsg.medicalRecordsForm.temperature = illness.temperature || '';   // 体温
      this.patientMsg.medicalRecordsForm.systolic_pressure = illness.systolic_pressure || '';   // 收缩压
      this.patientMsg.medicalRecordsForm.diastolic_pressure = illness.diastolic_pressure || '';  // 舒张压
      this.patientMsg.medicalRecordsForm.pulse = illness.pulse || '';     // 脉搏
      this.patientMsg.medicalRecordsForm.breathing = illness.breathing || '';         // 呼吸
      this.patientMsg.medicalRecordsForm.weight = illness.weight || ''; // 新增加的体重
      if (illness.past_history) {
        this.checkbox.past = true;
      }
      if (illness.person_history) {
        this.checkbox.personal = true;
      }
      if (illness.allergy_history) {
        this.checkbox.allergy = true;
      }
      if (illness.family_history) {
        this.checkbox.family = true;
      }
      // 新增的月经史和生育史
      if (illness.menses_history) {
        this.checkbox.menses = true;
      }
      if (illness.fertilit_history) {
        this.checkbox.fertilit = true;
      }
      if (illness.other_history) {
        this.checkbox.other = true;
      }
    },
    remoteMethod(query) {
      this.jibingSelectOptions = [];
      if (query !== '') {
        httpServerNormal(getjibing, {
          txtname: query,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            // 成功的回调( 直接返回data)
            if (!res) {  // 联想无则返回空
              this.jibingSelectOptions = [];
            } else {
              this.jibingSelectOptions = res.data;
            }
          } else { // code错误需要进行的操作
            this.jibingSelectOptions = [];
          }
        });
      } else {
        this.jibingSelectOptions = [];
      }
    },
  },
  components: {
    doctorStationSearch, SaveRecordPlates, UsePlates,
  },
  computed: {
    ...mapGetters(['westPreForm', 'clinic', 'token', 'user']),
  },
  watch: {
    patientMsg: {
      handler() {
        if (this.patientMsg.medicalRecordsForm.past_history) {
          this.checkbox.past = true;
        } else {
          this.checkbox.past = false;
        }
        // 个人史
        if (this.patientMsg.medicalRecordsForm.person_history) {
          this.checkbox.personal = true;
        } else {
          this.checkbox.personal = false;
        }
        // 家族史
        if (this.patientMsg.medicalRecordsForm.family_history) {
          this.checkbox.family = true;
        } else {
          this.checkbox.family = false;
        }
        // 月经史
        if (this.patientMsg.medicalRecordsForm.menses_history) {
          this.checkbox.menses = true;
        } else {
          this.checkbox.menses = false;
        }
        // 生育史
        if (this.patientMsg.medicalRecordsForm.fertilit_history) {
          this.checkbox.fertilit = true;
        } else {
          this.checkbox.fertilit = false;
        }
        // 其他
        if (this.patientMsg.medicalRecordsForm.other_history) {
          this.checkbox.other = true;
        } else {
          this.checkbox.other = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.recordStyle {
    display: flex;
    height: 100%;
}
.medicalRecordsForm {
    width: 100%;
    height: 100%;
    .el-form {
      .el-autocomplete {
        width: 100%;
      }
      .el-tag {
        margin: 10px;
        margin-left: 0;
      }
        .medicalRecordsTitle {
            p {
                height: 30px;
                line-height: 30px;
                span {
                    cursor: pointer;
                    margin-right: 10px;
                    font-size: 14px;
                    &:hover {
                        color: $mainColor;
                    }
                }
            }
        }
        .el-button {
            width: 100px;
            height: 35px;
            margin-right: 5%;
            margin-top: 10px;
        }
        .el-form-item {
            margin-bottom: 14px;
            &.inputNoPadding {
              margin-bottom: 0;
            }
            &.rules {
              margin-bottom: 15px;
            }
            &.inline_form {
              .el-form-item{
                margin-bottom: 12px;
                width: 200px;
                float: left;
              }
              .el-form-item:nth-of-type(2) {
                width: 300px;
              }
                span {
                    font-size: 14px;
                    color: #5a5e66;
                }
                .spans {
                    font-size: 12px;
                    color: #666;
                    margin-right: 10px;
                }
            }
            .el-form-item__content .el-select {
              width: 100%;
            }
            .el-form-item__content .ageInput {
                width: 45%;
            }
            .el-form-item__content .ageSelect {
                width: 50%;
            }
            .el-button.is-round {
                margin-right: 30px;
            }
            &.medicalHistory {
                padding-right: 5%;
                &.noPadding {
                    padding-bottom: 0;
                }
                &.addTreatmentItems {
                    .el-button.el-button--primary.el-button--small {
                        width: 100px;
                    }
                    ul {
                        li {
                            margin: 10px 0 0 10px;
                            line-height: 40px;
                            .el-input {
                                float: left;
                                width: 500px;
                                &:nth-of-type(2) {
                                    width: 60px;
                                    margin-left: 10px;
                                }
                            }
                        }
                    }
                }
            }
            .inlineBlock {
                display: inline-block;
                width: 90px;
                .el-input__inner{
                    padding: 0 5px;
                }
            }

            .doctorMsg {
              margin-top: 20px;
              p {
                span {
                  font-size: 16px;
                  font-weight: 600;
                }
                .el-button {
                  width: 100px;
                  margin-top: 0;
                  margin-left: 15px;
                  margin-right: 5%;
                }
                &:nth-of-type(2) {
                  color: red;
                  margin-right: 13%;
                }
              }
            }
        }
    }
}

.doctorSearch { // 辅助输入
    border: 1px solid #ccc;
    height: 500px;
    flex: 1;
    width: 300px;
    border-radius: 8px;
    // transform: translateX(0);
}
// .searchWin{
//     transition: all 2s;
//     transform: translateX(550px);
// }

.saveWin{  // 保存模板
  @include modify_info;
  overflow: auto;
  .container{
    top: 120px;
    transform: translate(-50%, 0); 
  }
}
.usePlate{  // 调用模板
  @include modify_info;
  overflow: auto;
  .container{
    top: 100px;
    transform: translate(-50%, 0);
    min-height: 300px;
  }
}
.must::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
</style>
