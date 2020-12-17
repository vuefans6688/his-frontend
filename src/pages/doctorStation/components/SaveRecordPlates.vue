<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-06-21 14:50:03
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-29 15:53:55
 -->
<template>
  <div class="style">
    <h3>新增门诊病历模板</h3>
    <div class="content">
      <el-form :model="illness" label-width="100px" ref="recordForm" :rules="rules" inline-message size='small'>
        <el-form-item label="模板名称:" prop='name'>
          <el-input v-model="illness.name" class="w_300"></el-input>
        </el-form-item>
        <el-form-item label="模板类型:" class="noMargin">
          <el-radio-group v-model="illness.owner_type">
            <el-radio :label="0">个人</el-radio>
            <el-radio :label="1">通用</el-radio>
          </el-radio-group>
        </el-form-item>
        <h4>病历内容</h4>
        <el-form-item label="主 诉：" prop='complaint'>
            <el-input v-model="illness.complaint"></el-input>
        </el-form-item>
        <el-form-item label="现病史:">
          <el-input v-model="illness.cur_history"></el-input>
        </el-form-item>
        <el-form-item label="既往史:">
          <el-input v-model="illness.past_history"></el-input>
        </el-form-item>
        <el-form-item label="个人史:">
          <el-input v-model="illness.person_history"></el-input>
        </el-form-item>
        <el-form-item label="过敏史:">
          <el-input v-model="illness.allergy_history"></el-input>
        </el-form-item>
        <el-form-item label="家族史:">
          <el-input v-model="illness.family_history"></el-input>
        </el-form-item>
        <el-form-item label="月经史:">
          <el-input v-model="illness.menses_history"></el-input>
        </el-form-item>
        <el-form-item label="生育史:">
          <el-input v-model="illness.fertilit_history"></el-input>
        </el-form-item>
        <el-form-item label="其他:">
          <el-input v-model="illness.other_history" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="其他体格检查:">
          <el-input v-model="illness.other_phy_exam" class="w_900"></el-input>
        </el-form-item>
        <el-form-item label="" class="medicalHistory rules " prop="jibingjson" style="margin-left: -100px;">
          <div style="display: flex;">
            <p class="label" style="flex: 0 0 88px; padding-right: 12px; text-align: right;">
              <span class="required" style="color: #F56C6C">* </span><span style="color: #606266;">初步诊断： </span>
            </p>
            <el-select v-model="illness.jibingjson" multiple filterable remote :trigger-on-focus="false" :remote-method="remoteMethod"
              placeholder="注：请选择符合国际疾病分类ICD-10的标准疾病名称，否则医保系统将无法识别" size="small">
              <el-option v-for="item in jibingSelectOptions" :key="item.maincode" :label="item.maincode+'-'+item.jbname" :value="item.maincode+'-'+item.jbname"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div class="footer">
         <el-button type="primary" @click="submitForm('recordForm')" size='small'>保 存</el-button>
         <el-button @click='closeWin' size='small'>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { createTemplate, getjibing } from '@apiNormal';
import deepcopy from '@/utils/deepcopy';

export default {
  data() {
    const checkDiagnResult = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('本次诊断结果中至少选择一个疾病名称'));
      } else {
        callback();
      }
      callback();
    };
    return {
      templateConfig: {
        name: '',
        owner_type: 0,
      },
      illness: {},
      jibingSelectOptions: [],
      rules: {  // 挂号验证
        name: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        complaint: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        jibingjson: [
          { validator: checkDiagnResult, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.templateConfig.name = this.illness.name;
          this.templateConfig.owner_type = this.illness.owner_type;
          delete this.illness.name;
          delete this.illness.owner_type;
          this.illness.jibingjson = JSON.stringify(this.illness.jibingjson);
          this.addIllTemplate();
        } else {
          this.$message({ message: '请正确填写信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    // 保存模板
    addIllTemplate() {
      httpServerNormal(createTemplate, {
        template_id: '',
        type: 1,
        name: this.templateConfig.name,
        owner_type: this.templateConfig.owner_type,
        data: this.illness,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$emit('closeWin');
          this.$message({ message: '保存模板成功', type: 'success', showClose: true, duration: 1000 });
        }
      });
    },
    closeWin() {
      this.$emit('closeWin');
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
    handleSelectChange(value) {
      this.illness.jibingjson = value.map((v) => {
        const tempArr = v.split('-');
        return {
          maincode: tempArr[0],
          jbname: tempArr[1],
        };
      });
      this.illness.jibingstring = value;
      this.illness.diagn_result = ((jibingjson) => {
        const result = jibingjson.map((val) => {
          return val.jbname;
        });
        return result.toString();
      })(this.illness.jibingjson);
    },
  },
  computed: {
    ...mapGetters(['clinic', 'token']),
  },
  props: {
    recordForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    const illness = deepcopy(this.recordForm);
    delete illness.breathing;
    delete illness.diastolic_pressure;
    delete illness.pulse;
    delete illness.systolic_pressure;
    delete illness.weight;
    delete illness.temperature;
    this.$set(illness, 'name', '');
    this.$set(illness, 'owner_type', 0);
    this.illness = illness;
  },
};
</script>

<style lang="scss" scoped>
.style{
  width: 600px;
  padding: 20px;
  padding-top: 0;
}
h3{
  line-height: 30px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}
h4{
  font-size: 16px;
  line-height: 30px;
}
.el-form{
  padding: 10px;
  padding-bottom: 0;
}
.el-form-item{
  .el-input.inlineBlock{
    width: 80px;
  }
  .el-select{
    width: 100%;
  }
  .spans {
      font-size: 12px;
      color: #666;
      margin-right: 10px;
  }
}
.footer{
  text-align: center;
}
</style>
