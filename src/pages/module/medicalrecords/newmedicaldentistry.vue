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
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="form.cur_history"></el-input>
        </el-form-item>
        <el-form-item label="既往史:">
          <el-input v-model="form.past_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <el-form-item label="过敏史:">
          <el-input v-model="form.allergy_history" size="medium" type="textarea" :autosize="{ maxRows: 3 }"></el-input>
        </el-form-item>
        <div class="filed_wrap">
          <span class="label">检查: </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in form.mainphyexam" :key="i" 
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('mainphyexam', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('mainphyexam', -1)">添加牙位</el-button>
          </div>
          
        </div>

        <div class="filed_wrap">
          <span class="label">辅助检查： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in form.other_phy_exam" :key="i" 
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('other_phy_exam', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('other_phy_exam', -1)">添加牙位</el-button>
          </div>
        </div>

        <div class="filed_wrap">
          <span class="label"><i class="required">&nbsp;&nbsp;*</i> 诊断： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in form.jibingjson" :key="i" 
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
                  <el-select v-model="item.desc" multiple filterable remote :trigger-on-focus="false" :remote-method="remoteMethod"
                    placeholder="注：请选择符合国际疾病分类ICD-10的标准疾病名称，否则医保系统将无法识别" size="small">
                    <el-option v-for="item in jibingSelectOptions" :key="item.maincode" :label="item.maincode+'-'+item.jbname" :value="item.maincode+'-'+item.jbname"></el-option>
                  </el-select>
                  <p class="error" v-if="!item.desc.length">不能为空</p>
                </div>
                <i class="el-icon-delete icon" @click="delete_teeth('jibingjson', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('jibingjson', -1)">添加牙位</el-button>
          </div>
        </div>

        <div class="filed_wrap">
          <span class="label">治疗计划： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in form.yayizhiliaojihua" :key="i" 
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('yayizhiliaojihua', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('yayizhiliaojihua', -1)">添加牙位</el-button>
          </div>
          
        </div>

        <div class="filed_wrap">
          <span class="label">处理： </span>
          <div class="right">
            <el-form-item label-width="0" v-for="(item, i) in form.yayichuli" :key="i" 
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
                <el-input class="center" v-model="item.desc" type="textarea" :autosize="{ maxRows: 3}"></el-input>
                <i class="el-icon-delete icon" @click="delete_teeth('yayichuli', i)"></i>
              </div>
            </el-form-item>
            <el-button class="teeth_add" type="text" @click="show_teeth_picture('yayichuli', -1)">添加牙位</el-button>
          </div>
        </div>
        
        <el-form-item label="医嘱:" prop="advice">
          <el-input v-model="form.advice" type="textarea" :autosize="{ minRows: 2, maxRows: 3}"></el-input>
        </el-form-item>
      </el-form>
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

import { mapGetters } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import { getjibing } from '@apiNormal';
import TeethPicture from '../../doctorStation/components/TeethPicture';

export default {
  components: { TeethPicture },
  props: {
    data: {
      type: Object,
    },
    tplId: {
      type: String,
    },
  },
  data() {
    return {
      rules: {  // 病历验证
        name: [
          { required: true, message: '请输入模板名称', trigger: 'change' },
        ],
        complaint: [
          { required: true, message: '请输入病人主诉', trigger: 'blur' },
          { min: 2, max: 500, message: '长度为2~500 ', trigger: 'blur' },
        ],
        cur_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        allergy_history: [
          { max: 500, message: '长度最多为500 ', trigger: 'blur' },
        ],
        past_history: [
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
        medicaltype: 1,
        owner_type_str: '',  // 模板类型
        owner_type: 0, // 类型整数，默认个人
        complaint: '', // 主诉
        cur_history: '', // 现病史
        past_history: '',   // 既往史
        allergy_history: '',   // 过敏史
        mainphyexam: [],
        other_phy_exam: [],
        jibingjson: [],   // 初步诊断
        yayizhiliaojihua: [],
        yayichuli: [],
        advice: '',
      },
      title: '新增门诊病历模板',
      isNew: true,
      searchName: '',

      jibingSelectOptions: [],
      teeth_picture_flag: false,
      active_field: '', // 当前操作的字段
      active_i: -1, // 当前操作的序号
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
        const flag = this.form.jibingjson.some(v => !(v.desc && v.desc.length));
        if (!this.form.jibingjson.length || flag) {
          this.$message({ message: '请完善诊断信息', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        if (valid) {
          if (this.owner_type_str === '通用') {
            this.form.owner_type = 1;
          } else {
            this.form.owner_type = 0;
          }
          const url = this.isNew ? '/service/template/create' : '/service/template/modify';
          const templateId = this.isNew ? '' : this.form.template_id;

          const yayizhiliaojihua = this.form.yayizhiliaojihua.map((v) => {
            const item = deepcopy(v);
            item.pos = JSON.stringify(item.pos);
            return item;
          });
          const yayichuli = this.form.yayichuli.map((v) => {
            const item = deepcopy(v);
            item.pos = JSON.stringify(item.pos);
            return item;
          });

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
                mainphyexam: JSON.stringify(this.form.mainphyexam),
                other_phy_exam: JSON.stringify(this.form.other_phy_exam),
                jibingjson: JSON.stringify(this.form.jibingjson),
                yayizhiliaojihua,
                yayichuli,
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
        Child.selected_left_top = deepcopy(this.form[field][i].pos.left_top);
        Child.selected_right_top = deepcopy(this.form[field][i].pos.right_top);
        Child.selected_left_bottom = deepcopy(this.form[field][i].pos.left_bottom);
        Child.selected_right_bottom = deepcopy(this.form[field][i].pos.right_bottom);
        Child.activeName = this.form[field][i].pos.type;
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
        this.form[this.active_field][this.active_i].pos = {
          left_top: area1, right_top: area2, left_bottom: area3, right_bottom: area4, type: Child.activeName,
        };
      } else {
        // 新增
        const item = {
          pos: { left_top: area1, right_top: area2, left_bottom: area3, right_bottom: area4, type: Child.activeName },
          desc: '',
        };
        this.form[this.active_field].push(item);
      }
      this.hide_teeth_picture();
    },
    // 删除牙位
    delete_teeth(field, i) {
      this.form[field].splice(i, 1);
    },
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  mounted() {
    const data = this.data;

    if (!this.tplId) {
      this.title = '新增门诊牙科病历模板';
      this.isNew = true;
      this.form.owner_type = 0;
      this.form.owner_type_str = '个人';
    } else {
      this.title = '修改门诊牙科病历模板';
      this.isNew = false;

      if (data.data) {
        this.form = deepcopy(data.data);
        this.form.mainphyexam = this.form.mainphyexam ? JSON.parse(this.form.mainphyexam) : [];
        this.form.other_phy_exam = this.form.other_phy_exam ? JSON.parse(this.form.other_phy_exam) : [];
        this.form.jibingjson = this.form.jibingjson ? JSON.parse(this.form.jibingjson) : [];
        const yayizhiliaojihua = this.form.yayizhiliaojihua ? this.form.yayizhiliaojihua.map((v) => {
          return {
            desc: v.desc,
            pos: v.pos ? JSON.parse(v.pos) : { left_top: [], right_top: [], left_bottom: [], right_bottom: [] },
          };
        }) : [];
        const yayichuli = this.form.yayichuli ? this.form.yayichuli.map((v) => {
          return {
            desc: v.desc,
            pos: v.pos ? JSON.parse(v.pos) : { left_top: [], right_top: [], left_bottom: [], right_bottom: [] },
          };
        }) : [];
        this.form.yayizhiliaojihua = yayizhiliaojihua;
        this.form.yayichuli = yayichuli;
      }
      this.owner_type_str = (data.owner_type === 0 || data.owner_type === '个人模板') ? '个人' : '通用';
      this.form.template_id = data.template_id;

      this.form.name = data.name;
    }
  },
};
</script>
<style scoped lang="scss">
@import "~@scss";

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

// 牙位循环
.filed_wrap {
  display: flex;
  // align-items: center;
  margin-bottom: 60px;
  .label{
    flex: 0 0 100px;
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
