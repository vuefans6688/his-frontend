<template>
  <div>
    <div class="footer">
      <div class="footerTitle">
        <h3>医嘱：</h3>
        <p>
          <span @click='printRecord'>
            <i class="el-icon-printer"></i>
            打印病历
          </span>
          <span @click="saveAsTemplate">
            <i class="el-icon-circle-check-outline"></i> 保存为模板
          </span>
          <span @click="usePlates('常用医嘱')">
            <i class="el-icon-document"></i> 常用医嘱</span>
        </p>
      </div>
      <el-form class="demo-form-inline" align='right' size='small' :model="patientMsg" :rules="adviceRules" ref="adviceForm">
        <el-form-item prop="advice">
          <el-input type="textarea" placeholder="请输入内容" v-model="patientMsg.advice" :autosize="{ minRows: 4, maxRows: 16}"></el-input>
        </el-form-item>
        <div class="doctorMsg">
          <p>医生：
            <span>{{ patientMsg.doctorTip.name }}</span>
            <el-button type="primary" @click="submitForm('adviceForm')" size='small'>保 存</el-button>
          </p>
          <p v-if='patientMsg.doctorTip.tipMsg'>{{ patientMsg.doctorTip.content }}</p>
        </div>
      </el-form>
    </div>

    <!--调用模板  -->
    <div class="usePlate" v-if='usePlateWin'>
      <div class="container">
        <div class="close" @click='cancelCallTemplate'><i class="el-icon-circle-close"></i></div>
        <UsePlates :templateType='8' @callball="templateCallBack"></UsePlates>
      </div>
    </div>

    <!--保存为模板窗  -->
    <div class='saveWin' v-if='savaPlateWin'>
      <div class="container">
        <div class="close" @click='cancelSaveTemplate'><i class="el-icon-circle-close"></i></div>
        <h3>保存常用医嘱</h3>
        <div class='content'>
          <el-form :model="templateType" label-width="90px" size='small' ref='form' :rules='rules'>
            <el-form-item label="模板名称:" prop='name'>
              <el-input v-model="templateType.name" class="w_300"></el-input>
            </el-form-item>
            <el-form-item label="模板类型:" class="noMargin">
              <el-radio-group v-model="templateType.owner_type">
                <el-radio :label="0">个人</el-radio>
                <el-radio :label="1">通用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-button type="primary" @click="save('form')" size='small'>保 存</el-button>
          <el-button @click='cancelSaveTemplate' size='small'>取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deepcopy from '@/utils/deepcopy';
import { mapGetters, mapMutations } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { createTemplate, saveAdvice } from '@apiNormal';
import UsePlates from '../components/UsePlates';
import SavaItemTemplate from '../components/SavaItemTemplate';

export default {
  data() {
    return {
      usePlateWin: false,
      savaPlateWin: false,
      advice: {
        content: '',
        doctor: '',
      },
      adviceRules: {
        advice: [
          { required: true, message: '请填写医嘱', trigger: 'change' },
          { min: 3, message: '医嘱内容不可少于3个字', trigger: 'change' },
        ],
      },
      rules: {
        name: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
      },
      // 保存为模板
      templateType: {
        name: '',
        owner_type: 0,
      },
    };
  },
  props: {
    patientMsg: {
      type: Object,
    },
  },
  methods: {
    ...mapMutations(['set_printMsg']),
    submitForm(formName) {   // 提交医嘱
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'warning', showClose: true, duration: 1000 });
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.patientMsg.medicalRecordsForm.medical_id) {
            this.save_Advice();
          } else {
            this.$message({ message: '请先保存病历', type: 'warning', showClose: true, duration: 1000 });
          }
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    save_Advice() {  // 保存医嘱
      httpServerNormal(saveAdvice, {
        regist_id: this.patientMsg.registid,
        medical_id: this.patientMsg.medicalRecordsForm.medical_id,
        advice: this.patientMsg.advice,
        doctor: this.patientMsg.doctorTip.name,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '保存成功', type: 'success', showClose: true, duration: 1000 });
        }
      });
    },
    printRecord() {  // 打印病历
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
    usePlates() {  // 调用模板
      this.$emit('destroyScroll');
      this.usePlateWin = true;
    },
    cancelCallTemplate() { // 取消调用模板
      this.usePlateWin = false;
      this.$emit('initScroll');
    },
    templateCallBack(data) {  // 调用模板的回调
      this.cancelCallTemplate();
      this.patientMsg.advice = data.data.advice;
    },
    cancelSaveTemplate() {  //  取消保存模板
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
      this.savaPlateWin = false;
    },
    saveAsTemplate() {   // 打开保存模板模态
      this.$emit('destroyScroll');
      this.savaPlateWin = true;
    },
    save(ruleForm) { // 检验（是否保存）
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.saveAsTemplateRequest();
        } else {
          return false;
        }
      });
    },
    saveAsTemplateRequest() { // 保存模板请求
      httpServerNormal(createTemplate, {
        name: this.templateType.name,
        owner_type: this.templateType.owner_type,
        template_id: '',
        type: 8,
        data: {
          advice: this.patientMsg.advice,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '保存成功', type: 'success', showClose: true, duration: 1000 });
          this.cancelSaveTemplate();
        }
      });
    },
  },
  computed: {
    ...mapGetters(['user', 'clinic', 'token']),
  },
  components: {
    UsePlates, SavaItemTemplate,
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

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
