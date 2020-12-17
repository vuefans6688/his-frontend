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
        <el-form-item label="过敏史:">
          <el-input v-model="illness.allergy_history"></el-input>
        </el-form-item>

        <div class="filed_wrap">
          <span class="label">检查： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in illness.mainphyexam" :key="i" 
              :prop="'mainphyexam.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
              </div>
            </el-form-item>
          </div>
          
        </div>

        <div class="filed_wrap">
          <span class="label">辅助检查： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in illness.other_phy_exam" :key="i" 
              :prop="'other_phy_exam.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
              </div>
            </el-form-item>
          </div>
        </div>

        <div class="filed_wrap">
          <span class="label"><i class="required">&nbsp;&nbsp;*</i> 诊断： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in illness.jibingjson" :key="i" 
              :prop="'jibingjson.' + i + '.desc'">
              <div class="filed_item">
                <div class="position" >
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
                  <el-select v-model="item.desc" multiple filterable remote :trigger-on-focus="false" :remote-method="remoteMethod"
                    placeholder="注：请选择符合国际疾病分类ICD-10的标准疾病名称，否则医保系统将无法识别" size="small">
                    <el-option v-for="item in jibingSelectOptions" :key="item.maincode" :label="item.maincode+'-'+item.jbname" :value="item.maincode+'-'+item.jbname"></el-option>
                  </el-select>
                  <p class="error" v-if="!item.desc.length">不能为空</p>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>

        <div class="filed_wrap">
          <span class="label">治疗计划： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in illness.yayizhiliaojihua" :key="i" 
              :prop="'yayizhiliaojihua.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
              </div>
            </el-form-item>
          </div>
          
        </div>

        <div class="filed_wrap">
          <span class="label">处理： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in illness.yayichuli" :key="i" 
              :prop="'yayichuli.' + i + '.desc'" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
              <div class="filed_item">
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
              </div>
            </el-form-item>
          </div>
        </div>
        
        <el-form-item label="医嘱:" prop='advice'>
          <el-input v-model="illness.advice" class="w_900"></el-input>
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
    return {
      templateConfig: {
        name: '',
        owner_type: 0,
      },
      illness: {},
      jibingSelectOptions: [],
      first_diagn_result: [],
      rules: {  // 挂号验证
        name: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        complaint: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const flag = this.illness.jibingjson.some(v => !(v.desc && v.desc.length));
        if (!this.illness.jibingjson.length || flag) {
          this.$message({ message: '请完善诊断信息', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        if (valid) {
          this.templateConfig.name = this.illness.name;
          this.templateConfig.owner_type = this.illness.owner_type;
          delete this.illness.name;
          delete this.illness.owner_type;
          this.addIllTemplate();
        } else {
          this.$message({ message: '请正确填写信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    // 保存模板
    addIllTemplate() {
      const yayizhiliaojihua = this.illness.yayizhiliaojihua.map((v) => {
        const item = deepcopy(v);
        item.pos = JSON.stringify(item.pos);
        return item;
      });
      const yayichuli = this.illness.yayichuli.map((v) => {
        const item = deepcopy(v);
        item.pos = JSON.stringify(item.pos);
        return item;
      });
      httpServerNormal(createTemplate, {
        template_id: '',
        type: 1,
        name: this.templateConfig.name,
        owner_type: this.templateConfig.owner_type,
        data: {
          ...this.illness,
          medicaltype: 1,
          mainphyexam: JSON.stringify(this.illness.mainphyexam),
          other_phy_exam: JSON.stringify(this.illness.other_phy_exam),
          jibingjson: JSON.stringify(this.illness.jibingjson),
          yayizhiliaojihua,
          yayichuli,
        },
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
@import "~@scss";

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

// 牙位循环
.filed_wrap {
  display: flex;
  margin-bottom: 60px;
  .label{
    flex: 0 0 100px;
    box-sizing: border-box;
    padding-right: 10px;
    padding-top: 30px;
    text-align: right;
    .required{
      color: #F56C6C;
    }
  }
  .right{
    flex: 1 1 auto;
    padding: 12px 0;
    border-bottom: 1px solid #ccc;
    .filed_item{
      margin-bottom: 12px;
      padding: 12px;
      padding-right: 0;
      display: flex;
      align-items: center;
      border: 1px solid transparent;
      cursor: pointer;
      &:hover{
        border: 1px solid $mainColor;
      }
      .position{
        flex: 0 0 120px;
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
        margin-left: 12px;
        .error{
          position: absolute;
          color: #F56C6C;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
