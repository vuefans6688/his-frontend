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
        <el-form-item label="既往史：" class="medicalHistory" prop="past_history">
          <el-input v-model="patientMsg.medicalRecordsForm.past_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>
        <el-form-item label="过敏史：" class="medicalHistory" prop="allergy_history">
          <el-input v-model="patientMsg.medicalRecordsForm.allergy_history" type="textarea" :autosize="{ maxRows: 3 }" :disabled="!patientMsg.registid"></el-input>
        </el-form-item>

        <div class="filed_wrap">
          <span class="label">检查： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in patientMsg.medicalRecordsForm.mainphyexam" :key="i" 
              :prop="'mainphyexam.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
                <div class="position" @click="show_teeth_picture('mainphyexam', i)">
                  <el-row class="line1">
                    <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
                  </el-row>
                </div>
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('mainphyexam', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('mainphyexam', -1)" :disabled="!patientMsg.registid">添加牙位</el-button>
          </div>
          
        </div>

        <div class="filed_wrap">
          <span class="label">辅助检查： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in patientMsg.medicalRecordsForm.other_phy_exam" :key="i" 
              :prop="'other_phy_exam.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
                <div class="position" @click="show_teeth_picture('other_phy_exam', i)">
                  <el-row class="line1">
                    <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
                  </el-row>
                </div>
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('other_phy_exam', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('other_phy_exam', -1)" :disabled="!patientMsg.registid">添加牙位</el-button>
          </div>
        </div>

        <div class="filed_wrap">
          <span class="label"><i class="required">&nbsp;&nbsp;*</i> 诊断： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in patientMsg.medicalRecordsForm.jibingjson" :key="i" 
              :prop="'jibingjson.' + i + '.desc'">
              <div class="filed_item">
                <div class="position" @click="show_teeth_picture('jibingjson', i)">
                  <el-row class="line1">
                    <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
                  </el-row>
                </div>
                <div class="center">
                  <el-select v-model="item.desc" multiple filterable remote :trigger-on-focus="false" :remote-method="remoteMethod" :disabled="!patientMsg.registid"
                    placeholder="注：请选择符合国际疾病分类ICD-10的标准疾病名称，否则医保系统将无法识别" size="small">
                    <el-option v-for="item in jibingSelectOptions" :key="item.maincode" :label="item.maincode+'-'+item.jbname" :value="item.maincode+'-'+item.jbname"></el-option>
                  </el-select>
                  <p class="error" v-if="!item.desc.length">不能为空</p>
                </div>
                <i class="el-icon-delete icon" @click="delete_teeth('jibingjson', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('jibingjson', -1)" :disabled="!patientMsg.registid">添加牙位</el-button>
          </div>
        </div>

        <div class="filed_wrap">
          <span class="label">治疗计划： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in patientMsg.medicalRecordsForm.yayizhiliaojihua" :key="i" 
              :prop="'yayizhiliaojihua.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
                <div class="position" @click="show_teeth_picture('yayizhiliaojihua', i)">
                  <el-row class="line1">
                    <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
                  </el-row>
                </div>
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('yayizhiliaojihua', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('yayizhiliaojihua', -1)" :disabled="!patientMsg.registid">添加牙位</el-button>
          </div>
          
        </div>

        <div class="filed_wrap">
          <span class="label">处理： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in patientMsg.medicalRecordsForm.yayichuli" :key="i" 
              :prop="'yayichuli.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
                <div class="position" @click="show_teeth_picture('yayichuli', i)">
                  <el-row class="line1">
                    <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                    <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
                  </el-row>
                </div>
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}" :disabled="!patientMsg.registid"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('yayichuli', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('yayichuli', -1)" :disabled="!patientMsg.registid">添加牙位</el-button>
          </div>
        </div>

        <el-form-item label="医嘱：" class="medicalHistory" prop="advice">
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
        <UsePlates :templateType='1' :medicaltype='1' @callball="templateCallBack"></UsePlates>
      </div>
    </div>
    <!-- 牙位选择 -->
    <div class="select_teeth_picture" v-if='teeth_picture_flag'>
      <div class="container">
        <div class="close" @click='hide_teeth_picture'><i class="el-icon-circle-close"></i></div>
        <h1>牙位选择</h1>
        <div class="content">
          <TeethPicture ref="TeethPicture"/>
        </div>
        <div class="control">
          <el-button size="mini" type="primary" @click='select_teeth_confirm'>确定</el-button>
          <el-button size="mini" @click='hide_teeth_picture'>取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import { saveMedical, getjibing } from '@apiNormal';
import doctorStationSearch from '@/components/DoctorStationSearch';
import SaveRecordPlates from './SaveRecordPlatesDentistry';
import UsePlates from './UsePlates';
import TeethPicture from './TeethPicture';

export default {
  data() {
    return {
      rules: {  // 挂号验证
        complaint: [
          { required: true, message: '请输入病人主诉', trigger: 'blur' },
          { min: 2, max: 500, message: '长度为2~500 ', trigger: 'blur' },
        ],
        cur_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        past_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        allergy_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        advice: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
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

      teeth_picture_flag: false,
      active_field: '', // 当前操作的字段
      active_i: -1, // 当前操作的序号
    };
  },
  props: ['patientMsg'],
  methods: {
    ...mapMutations(['set_printMsg']),
    beforeSubmit() {  // 保存前处理
      const yayizhiliaojihua = this.patientMsg.medicalRecordsForm.yayizhiliaojihua.map((v) => {
        const item = deepcopy(v);
        item.pos = JSON.stringify(item.pos);
        return item;
      });
      const yayichuli = this.patientMsg.medicalRecordsForm.yayichuli.map((v) => {
        const item = deepcopy(v);
        item.pos = JSON.stringify(item.pos);
        return item;
      });
      this.printRecordObj = {
        medicaltype: 1,  // 0: 全科(默认), 1: 牙科
        clinic_id: this.clinic,
        regist_id: this.patientMsg.registid,
        medical_id: this.patientMsg.medicalRecordsForm.medical_id,
        complaint: this.patientMsg.medicalRecordsForm.complaint,
        past_history: this.patientMsg.medicalRecordsForm.past_history,
        cur_history: this.patientMsg.medicalRecordsForm.cur_history,
        allergy_history: this.patientMsg.medicalRecordsForm.allergy_history,
        mainphyexam: JSON.stringify(this.patientMsg.medicalRecordsForm.mainphyexam || []),
        other_phy_exam: JSON.stringify(this.patientMsg.medicalRecordsForm.other_phy_exam || []),
        jibingjson: JSON.stringify(this.patientMsg.medicalRecordsForm.jibingjson),
        yayizhiliaojihua,
        yayichuli,
        advice: this.patientMsg.medicalRecordsForm.advice,
        doctor: this.patientMsg.doctorTip.name,
      };
    },
    submitForm(formName) {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      const flag = this.patientMsg.medicalRecordsForm.jibingjson.some(v => !(v.desc && v.desc.length));
      if (!this.patientMsg.medicalRecordsForm.jibingjson.length || flag) {
        this.$message({ message: '请完善诊断信息', type: 'error', showClose: true, duration: 1000 });
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
        // 牙科病历打印
        window.open('/print/illnessPrintDentistry');
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
      this.patientMsg.medicalRecordsForm.allergy_history = illness.allergy_history;
      // 结束
      this.patientMsg.medicalRecordsForm.mainphyexam = JSON.parse(illness.mainphyexam);
      this.patientMsg.medicalRecordsForm.other_phy_exam = JSON.parse(illness.other_phy_exam);
      this.patientMsg.medicalRecordsForm.jibingjson = JSON.parse(illness.jibingjson);
      this.patientMsg.medicalRecordsForm.yayizhiliaojihua = illness.yayizhiliaojihua.map(v => ({ desc: v.desc, pos: JSON.parse(v.pos) }));
      this.patientMsg.medicalRecordsForm.yayichuli = illness.yayichuli.map(v => ({ desc: v.desc, pos: JSON.parse(v.pos) }));
      this.patientMsg.medicalRecordsForm.advice = illness.advice;
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
    delay(delay) {
      return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, delay);
      });
    },
    // 展示牙位选择图
    async show_teeth_picture(field, i) {
      this.active_field = field;
      this.active_i = i;
      this.teeth_picture_flag = true;
      if (i > -1) {
        await this.delay(100);
        const Child = this.$refs.TeethPicture;
        Child.selected_left_top = deepcopy(this.patientMsg.medicalRecordsForm[field][i].pos.left_top);
        Child.selected_right_top = deepcopy(this.patientMsg.medicalRecordsForm[field][i].pos.right_top);
        Child.selected_left_bottom = deepcopy(this.patientMsg.medicalRecordsForm[field][i].pos.left_bottom);
        Child.selected_right_bottom = deepcopy(this.patientMsg.medicalRecordsForm[field][i].pos.right_bottom);
        Child.activeName = this.patientMsg.medicalRecordsForm[field][i].pos.type;
        // 显示牙位选择图根据
        if (Child.selected_left_bottom.length >= 8 && Child.selected_right_bottom.length >= 8) {
          Child.CheckBottom = true;
        } else if (Child.selected_right_bottom.length >= 5 && Child.selected_left_bottom.length >= 5) {
          if (Child.selected_left_bottom.toString().indexOf('I') > -1) {
            Child.childBottom = true;
          }
        }
        if (Child.selected_left_top.length >= 8 && Child.selected_right_top.length >= 8) {
          Child.CheckTop = true;
        } else if (Child.selected_right_top.length >= 5 && Child.selected_left_top.length >= 5) {
          if (Child.selected_left_top.toString().indexOf('I') > -1) {
            Child.childTop = true;
          }
        }
        if (Child.CheckBottom === true && Child.CheckTop === true) {
          Child.checkAll = true;
        }
        if (Child.childBottom === true && Child.childTop === true) {
          Child.childAll = true;
        }
      }
      this.$emit('destroyScroll');
    },
    hide_teeth_picture() {
      this.teeth_picture_flag = false;
      this.active_i = -1;
      this.$emit('initScroll');
    },
    // 确认添加牙位
    select_teeth_confirm() {
      const Child = this.$refs.TeethPicture;
      const area1 = deepcopy(Child.selected_left_top);
      const area2 = deepcopy(Child.selected_right_top);
      const area3 = deepcopy(Child.selected_left_bottom);
      const area4 = deepcopy(Child.selected_right_bottom);

      if (!(area1.length || area2.length || area3.length || area4.length)) {
        // 没有选择牙位
        this.hide_teeth_picture();
        return;
      }
      if (this.active_i > -1) {
        // 编辑
        this.patientMsg.medicalRecordsForm[this.active_field][this.active_i].pos = {
          left_top: area1, right_top: area2, left_bottom: area3, right_bottom: area4, type: Child.activeName,
        };
      } else {
        // 新增
        const item = {
          pos: { left_top: area1, right_top: area2, left_bottom: area3, right_bottom: area4, type: Child.activeName },
          desc: '',
        };
        this.patientMsg.medicalRecordsForm[this.active_field].push(item);
      }
      this.hide_teeth_picture();
    },
    // 删除牙位
    delete_teeth(field, i) {
      this.patientMsg.medicalRecordsForm[field].splice(i, 1);
    },
  },
  components: { doctorStationSearch, SaveRecordPlates, UsePlates, TeethPicture },
  computed: {
    ...mapGetters(['westPreForm', 'clinic', 'token', 'user']),
  },
  watch: {
    patientMsg: {
      handler() {
        if (this.patientMsg.medicalRecordsForm.jibingstring && this.patientMsg.medicalRecordsForm.jibingstring.length) {
          this.first_diagn_result = this.patientMsg.medicalRecordsForm.jibingstring;
        } else {
          this.first_diagn_result = [];
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

// 牙位循环
.filed_wrap {
  display: flex;
  // align-items: center;
  margin-bottom: 60px;
  .label{
    flex: 0 0 120px;
    box-sizing: border-box;
    padding-right: 12px;
    padding-top: 30px;
    text-align: right;
    .required{
      color: #F56C6C;
    }
  }
  .right{
    flex: 1 1 auto;
    margin-right: 5%;
    padding: 12px 0;
    border-bottom: 1px solid #ccc;
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
        height: 60px;
        cursor: pointer;
        .el-row{
          height: 30px;
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
        margin: 0 12px;
        .error{
          position: absolute;
          color: #F56C6C;
          font-size: 12px;
        }
      }
      .icon{
        flex: 0 0 24px;
        font-size: 24px;
        cursor: pointer;
        color: $mainColor;
      }
    }
  }
}


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

.select_teeth_picture{
  @include modify_info;
  .container .content{
    padding: 30px 0;
  }
  .control{
    margin-top: 12px;
    text-align: center;
  }
}
</style>
