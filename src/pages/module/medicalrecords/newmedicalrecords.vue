<template>
  <div class="newmedicalrecords">
    <div class="header">
      <h2 class="title d_inl">{{this.title}}</h2>
      <div class="btn fr d_inl">
        <el-button type="primary" @click="submitForm('form')" size="small">保存</el-button>
        <el-button type="warning" @click="cancel" size="small">取消</el-button>
        <!--<el-button type="info" @click="goback">返回</el-button>-->
      </div>
    </div>

    <div class="content">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form" size="small">
        <el-form-item label="模板名称:" prop="name">
          <el-input v-model="form.name" size="small" class="w_300" :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="模板类型:">
          <el-radio-group v-model="owner_type_str">
          <el-radio label="个人"></el-radio>
          <el-radio label="通用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="m_b10"><h3>病历内容</h3></div>
        <el-form-item label="主 诉:" prop="complaint">
          <el-input v-model="form.complaint" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="现病史:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4}"
            v-model="form.cur_history">
          </el-input>
        </el-form-item>
        <el-form-item label="过敏史:">
          <el-input v-model="form.allergy_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="既往史:">
          <el-input v-model="form.past_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="个人史:">
          <el-input v-model="form.person_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="家族史:">
          <el-input v-model="form.family_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="月经史:">
          <el-input v-model="form.menses_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="生育史:">
          <el-input v-model="form.fertilit_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="其他:">
          <el-input v-model="form.other_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>

          <el-form-item label="体格检查：" prop="mainphyexam">
            <el-input v-model="form.mainphyexam" type="textarea" :autosize="{ maxRows: 3}"></el-input>
          </el-form-item>
          <el-form-item label="辅助检查：" prop="other_phy_exam">
            <el-input v-model="form.other_phy_exam" type="textarea" :autosize="{ maxRows: 3}"></el-input>
          </el-form-item>
          <el-form-item label="初步诊断：" prop="jibingjson">
            <el-select v-model="form.jibingjson" multiple filterable remote :trigger-on-focus="false" size="small" :remote-method="remoteMethod"
              placeholder="注：请选择符合国际疾病分类ICD-10的标准疾病名称，否则医保系统将无法识别">
              <el-option v-for="(item, i) in jibingSelectOptions" :key="i" :label="item.maincode+'-'+item.jbname" :value="item.maincode+'-'+item.jbname"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="治疗意见：" prop="advice">
            <el-input v-model="form.advice" type="textarea" :autosize="{ maxRows: 3}"></el-input>
          </el-form-item>
 
      </el-form>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import { getjibing } from '@apiNormal';

export default {
  props: {
    data: {
      type: Object,
    },
    tplId: {
      type: String,
    },
  },
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
      rules: {  // 病历验证
        name: [
          { required: true, message: '请输入模板名称', trigger: 'change' },
        ],
        complaint: [
          { required: true, message: '请输入病人主诉', trigger: 'blur' },
          { min: 2, max: 500, message: '长度为2~500 ', trigger: 'blur' },
        ],
        jibingjson: [
          { validator: checkDiagnResult, trigger: 'change' },
        ],
        cur_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        mainphyexam: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        other_phy_exam: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
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
      // 表单数据
      owner_type_str: '个人',
      form: {
        clinic_id: '',
        template_id: '',
        name: '',  // 模板名字
        type: 1,  // 类型为病历模板
        medicaltype: 0,
        owner_type_str: '',  // 模板类型
        owner_type: 0, // 类型整数，默认个人
        complaint: '', // 主诉
        cur_history: '', // 现病史
        past_history: '',   // 既往史
        person_history: '',  // 个人史
        allergy_history: '',   // 过敏史
        family_history: '',    // 家族史
        menses_history: '',    // 月经史
        fertilit_history: '',    // 生育史
        other_history: '',   // 其他
        jibingjson: [],   // 初步诊断
      },
      title: '新增门诊病历模板',
      isNew: true,
      searchName: '',

      jibingSelectOptions: [],
    };
  },
  methods: {
    cancel() {
      this.$confirm('是否取消保存?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      }).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.owner_type_str === '通用') {
            this.form.owner_type = 1;
          } else {
            this.form.owner_type = 0;
          }
          const url = this.isNew ? '/service/template/create' : '/service/template/modify';
          const templateId = this.isNew ? '' : this.form.template_id;
          this.$http.post(url, {
            head: {
              accessToken: this.token,
              lastnotice: 0,
              msgid: '',
            },
            body: { clinic_id: this.clinic,
              template_id: templateId,
              type: 1,
              name: this.form.name,
              owner_type: this.form.owner_type,
              data: {
                ...this.form,
                jibingjson: JSON.stringify(this.form.jibingjson),
              },
            },
          }).then((response) => {
            const res = response.data;
            if (res.errcode === 0 && res.data && res.data.clinic_id === this.clinic) {
              this.$message({ message: '保存成功!', type: 'success', showClose: true, duration: 1000 });
              this.$router.back();
            } else if (res.errcode !== 0) {
              this.$message({ message: res.errmsg, type: 'error', showClose: true, duration: 1000 });
            }
          }).catch(() => {
          });
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
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
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  mounted() {
    const data = this.data;

    if (!this.tplId) {
      this.title = '新增门诊全科病历模板';
      this.isNew = true;
      this.form.owner_type = 0;
      this.form.owner_type_str = '个人';
    } else {
      this.title = '修改门诊全科病历模板';
      this.isNew = false;

      if (data.data) {
        this.form = deepcopy(data.data);
        this.form.jibingjson = typeof this.form.jibingjson === 'string' ? JSON.parse(this.form.jibingjson) : this.form.jibingjson.map(v => `${v.maincode}-${v.jbname}`);
      }
      this.owner_type_str = (data.owner_type === 0 || data.owner_type === '个人模板') ? '个人' : '通用';
      this.form.template_id = data.template_id;
      this.form.name = data.name;
    }
  },
};
</script>
<style scoped lang="scss">
.newmedicalrecords{
  position: relative;
  padding: 20px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
  min-width: 1000px;
}
.header{
    width: 100%;
    margin: 0 auto;
    height: 49px;
    line-height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
}

.content{
  margin: 10px auto;
  display: flex;
  .el-select{
    width: 100%;
  }
  .el-form{
    // width: 80%;
    flex: 1;
  }
  .doctorSearch { 
    border: 1px solid #ccc;
    height: 500px;
    width: 300px;
    // width: 300px;
    margin-top: 170px;
    margin-left: 20px;
    border-radius: 8px;
  }
}

.title{
    margin-top: 10px;
}
.w_300{
  width: 300px;
}
// .w_900{
//   width: 900px;
// }
.m_b10{
  margin-bottom: 10px;
}
.d_inl{
  display: inline-block;
}
.fr{
    float: right;
}
.el-form-item{
  margin-bottom: 10px;
  margin-top: 20px;
}
.w_100{
  width: 100px;
}
.el-autocomplete {
  width: 100%;
}
.el-tag {
  margin: 10px;
  margin-left: 0;
}
</style>
