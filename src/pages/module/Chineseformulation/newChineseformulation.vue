<template>
  <div class="newChineseformulation">
    <div class="header">
      <h2 class="title d_inl">{{this.title}}</h2>
      <div class="btn fr d_inl">
        <el-button type="primary" @click="submit('form')" size="small">保存</el-button>
        <el-button type="warning" @click="cancel" size="small">取消</el-button>
        <!--<el-button type="info" @click="goback">返回</el-button>-->
      </div>
    </div>

    <div class="content prescriptionInputs">
      <el-form :model="form" ref="form" align='center' size="small">
        <el-form-item label="模板名称:" class="w_300" prop="name" align='left' label-width="90px" :rules="{ required: true, message: '请输入模板名称', trigger: 'blur,change' }">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="模板类型:" align='left' label-width="90px">
          <el-radio-group v-model="form.owner_type_str">
            <el-radio label="个人"></el-radio>
            <el-radio label="通用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="m_b10"><h3 align='left'>处方内容</h3></div>

        <div class="demo-form-inline WestMedicineStyle">
          <el-form-item>
            <template slot-scope="scope">
              <el-row class="preContentul">
                <el-col :span="2">序号</el-col>
                <el-col :span="8">药品名称</el-col>
                <el-col :span="4">规格</el-col>
                <el-col :span="4">单次剂量</el-col>
                <el-col :span="4">煎法/用法</el-col>
                <el-col :span="2">操作</el-col>
              </el-row>
            </template>
          </el-form-item>
          <el-form-item class="prescriptionInputs" v-for="(item, index) in form.data.drug_list" :key='index'>
            <!-- 序号  -->
            <el-col :span="2">
              <el-form-item>
                <template slot-scope="scope">
                  <span>{{ (index + 1) }}</span>
                </template>
              </el-form-item>
            </el-col>
            <!--药品名称  -->
            <el-col :span="8">
              <el-form-item :prop="'data.drug_list.' + index + '.name'" :rules="{ required: true, message: '请输入药品名称', trigger: 'blur,change' }">
                <template slot-scope="scope">
                  <el-autocomplete popper-class="my-autocomplete" @blur="checkName(index)" v-model="item.name"  size="small" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名" @select="westNameSelect($event, index)" :trigger-on-focus="false" valueKey='name'>
                    <template slot-scope="props">
                      <div class="thinkName">
                        {{ props.item.drug_name }}<span class="spec"> {{ props.item.spec_text }}</span>
                        <p class="phone">{{ props.item.producer }}</p>
                      </div>
                    </template>
                  </el-autocomplete>
                </template>
              </el-form-item>
            </el-col>

            <!--规格  -->
            <el-col :span="4">
              <el-form-item>
                <el-input v-model="item.spec_text" size="small" :maxlength="64" class="inlineBlock" placeholder="规格"></el-input>
              </el-form-item>
            </el-col>
            <!--剂量  -->
            <el-col :span="2">
              <el-form-item>
                <el-input v-model="item.dosage" class="inlineBlock" @keyup.native="floatLimitDrug('dosage', 4)"  size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <!-- <el-autocomplete popper-class="my-autocomplete" v-model="item.dose_unit" valueKey="name" :fetch-suggestions="doesUnitSearch" placeholder="剂量单位" size="small"></el-autocomplete> -->
                <el-select v-model="item.dose_unit" placeholder="剂量单位">
                  <el-option v-for="(unit_item, i) in item.dose_unit_list" :key="i" :label="unit_item" :value="unit_item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 煎法、用法 -->
            <el-col :span="4">
              <el-form-item>
                <template slot-scope="scope">
                  <el-autocomplete popper-class="my-autocomplete" v-model="item.use_note" valueKey="name" :fetch-suggestions="medAskForSearch" placeholder="请输入用法" size="small"></el-autocomplete>
                </template>
              </el-form-item>
            </el-col>

            <!--操作  -->
            <el-col :span="2">
              <el-form-item prop="del">
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="del(index)" v-show='!isDisabled'></i>
                </template>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item align='left'>
          <span class='addinputs' @click='addFormItem' v-show='!isDisabled'>
             <i class="el-icon-circle-plus-outline"></i>
             增加一行
          </span>
          </el-form-item>

          <el-form-item align="left" class="usageStyle">
            <!-- 内用/外用 -->
            <el-col :span="4">
              <el-radio v-model="form.data.use_method" label="内服"></el-radio>
              <el-radio v-model="form.data.use_method" label="外用"></el-radio>
            </el-col>
            <!-- 剂数 -->
            <el-col :span="4">
              <el-form-item class="dose2">
                <span>剂数：</span>
                <el-input v-model="form.data.total" @keyup.native="numberLimitPre('total')" size="small"></el-input>
                <span>剂</span>
              </el-form-item>
            </el-col>
            <!-- 频次 -->
            <el-col :span="5">
              <el-form-item  class="dose2" label="频次：">
                <el-select v-model="form.data.frequency">
                  <el-option v-for="(val, index) in frequencyList" :key="index" :label="val.name" :value="val.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 整剂用法 -->
            <el-col :span="6">
              <el-form-item prop="daily_use" class="dose2" label="整剂用法：">
                <el-autocomplete popper-class="my-autocomplete" v-model="form.data.zjyongfa"  valueKey="name" :fetch-suggestions="medAskForSearch" placeholder="批量填写煎法/用法"></el-autocomplete>
                <span class="spans">（非必填）</span>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="其它要求：" class="inputs" label-width="100" align="left">
            <el-input type="textarea" :rows="3" v-model="form.data.taking_note" size="small" style="width: 100%;"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { numberLimit, floatLimit } from '@/utils/inputLimit';
  import httpServerNormal from '@httpServerNormal';
  import { presSearchDrug, presDrugInfo } from '@apiNormal';

  const TplTypeNames = [
    '',
    '门诊病历',
    '西/成药',
    '中药',
  ];

  export default {
    data() {
      return {
        rules_western_presc_tpl: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { max: 64, message: '模板名称长度不超过64个字符', trigger: 'blur' },
          ],
        },
        // 表单数据
        form: {
          clinic_id: '',
          template_id: '',
          name: '',  // 模板名字
          type: -1,  // 类型默认值
          owner_type_str: '',  // 模板类型
          owner_type: 0, // 类型整数，默认个人
          data: {
            use_method: '内服',
            frequency: '',
            total: 1,
            total_unit: '剂',
            taking_note: '',
            zjyongfa: '',
            drug_list: [
              {
                drug_id: 'none',
                drug_type: 1,
                name: '',
                spec_text: '',
                use_note: '',
                dosage: '',
                dose_unit: '',
                taking_note: '',
                zjyongfa: '',
                use_method: '内服',
              },
            ],
          }, // 处方列表
        },
        title: '新增中药处方模板',
        isNew: true,
        isDisabled: false,   // 禁用表单
      };
    },
    methods: {
      initData() {
        const data = this.$route.params.data;
        const tplType = this.$route.params.tplType;
        if (tplType === undefined) {
          this.goback();
        }
        if (!data) {
          this.title = '新增' + TplTypeNames[tplType] + '模板';
          this.isNew = true;
          this.form.owner_type = 0;
          this.form.type = tplType;
          this.form.owner_type_str = '个人';
        } else {
          this.title = '修改' + TplTypeNames[tplType] + '模板';
          this.isNew = false;
          this.form.data = data.data;
          this.$set(this.form.data, 'zjyongfa', data.data.zjyongfa || '');
          this.form.type = tplType;
          this.form.name = data.name;
          this.form.owner_type_str = (data.owner_type === 0 || data.owner_type === '个人模板') ? '个人' : '通用';
          this.form.template_id = data.template_id;
          this.form.data.drug_list.forEach((drug) => {
            this.$set(drug, 'use_method', data.data.use_method);
            this.$set(drug, 'taking_note', data.data.taking_note);
            this.$set(drug, 'zjyongfa', data.data.zjyongfa || '');
          });
        }
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save();
          } else {
            this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
            return false;
          }
        });
      },
      validateDrugName(str) {
        if (!str || str.length > 64) {
          this.$message({ message: '请输入药品名称', type: 'error', showClose: true, duration: 1000 });
        }

        if (str.length > 64) {
          this.$message({ message: '药品名称长度不能超过64个字符', type: 'error', showClose: true, duration: 1000 });
        }
      },
      goback() {
        this.$router.back();
      },
      cancel() {
        this.$confirm('是否取消保存?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        }).then(() => {
          this.$router.back();
        }).catch(() => {});
      },
      // 中药使用频率联想
      TimesSearch(queryString, cb) {
        const Medicine = this.frequencyList;
        const results = queryString ? Medicine.filter(this.createFilter(queryString))
          : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 中药特殊要求联想
      medAskForSearch(queryString, cb) {
        const Medicine = this.chinaUsage;
        const results = queryString ? Medicine.filter(this.createFilter(queryString))
          : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      validateAllInputs() {
        if (!this.form.name) {
          return '请输入模板名称';
        }
        if (this.form.name.length > 64) {
          return '模板名称长度不能超64个字符';
        }

        if (!this.form.data.drug_list || this.form.data.drug_list.length === 0) {
          return '请至少输入一种药品';
        }

        for (let i = 0; i < this.form.data.drug_list.length; i++) {
          const v = this.form.data.drug_list[i];
          const preStr = '第' + (i + 1) + '行';
          if (!v.name) {
            return preStr + '请输入药品名称';
          }
          if (v.name.length > 64) {
            return preStr + '药品名称长度不能超64个字符';
          }

          v.dosage = parseInt(v.dosage, 10);
          if (!v.dosage) {
            return preStr + '请输入药品剂量';
          }

          if (!v.use_note) {
            return preStr + '请输入药品煎法/用法';
          }
          if (v.use_note.length > 64) {
            return preStr + '煎法 / 用法长度不能超64个字符';
          }
        }

        if (!this.form.data.use_method) {
          return '请选择 内服 / 外用';
        }

        if (!this.form.data.total) {
          return '请输入开药剂数';
        }

        this.form.data.total = parseInt(this.form.data.total, 10);
        if (this.form.data.total === 0) {
          return '请输入开药剂数';
        }

        if (!this.form.data.frequency) {
          return '请输入用药频次';
        }
        if (this.form.data.frequency.length > 64) {
          return '用药频次长度不能超64个字符';
        }

        if (this.form.data.taking_note && this.form.data.taking_note.length > 256) {
          return '其他要求长度不能超256个字符';
        }
        for (let i = 0; i < this.form.data.drug_list.length; i++) {
          this.form.data.drug_list[i].use_method = this.form.data.use_method;
          this.form.data.drug_list[i].frequency = this.form.data.frequency;
          this.form.data.drug_list[i].total = this.form.data.total;
          this.form.data.drug_list[i].total_unit = this.form.data.total_unit;
          this.form.data.drug_list[i].taking_note = this.form.data.taking_note;
        }
        return '';
      },
      save() {
        // 字符串转化为数字
        this.stringNumber();
        this.form.clinic_id = this.clinic;
        if (this.form.owner_type_str === '通用') {
          this.form.owner_type = 1;
        } else {
          this.form.owner_type = 0;
        }
        const url = this.isNew ? '/service/template/create' : '/service/template/modify';
        const data = {
          head: {
            accessToken: this.token,
            lastnotice: 0,
            msgid: '',
          },
          body: this.form,
        };
        this.$http.post(url, data).then((response) => {
          const res = response.data;
          if (res.errcode === 0 && res.data && res.data.clinic_id === this.clinic) {
            this.$message({ message: '保存成功', type: 'success', showClose: true, duration: 1000 });
            this.$router.back();
          } else if (res.errcode !== 0) {
            this.$message({ message: res.errmsg, type: 'error', showClose: true, duration: 1000 });
          }
        }).catch(() => {
        });
      },
      // 限制药品数字输入
      floatLimitDrug(str, bit) {
        for (let i = 0; i < this.form.data.drug_list.length; i++) {
          this.form.data.drug_list[i][str] = floatLimit(this.form.data.drug_list[i][str], bit);
        }
      },
      // 限制处方数字输入
      numberLimitPre(str) {
        this.form.data[str] = numberLimit(this.form.data[str]);
      },
      addFormItem() {
        let flag = true;
        this.form.data.drug_list.forEach((val) => {
          if (!val.name) {
            flag = false;
          }
        });
        if (!flag) {
          this.$message({ message: '内容为空不能新增一行', type: 'warning', showClose: true, duration: 1000 });
          return;
        }
        if (this.form.data.drug_list.length >= 64) {
          this.$message({ message: '单个中药处方最多64种药品', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        const json = {
          drug_id: 'none',
          drug_type: 1,
          name: '',
          spec_text: '',
          use_note: '',
          dosage: '',
          dose_unit: '',
          use_method: '',
          taking_note: '',
          zjyongfa: '',
        };
        this.form.data.drug_list.push(json);
      },
      del(index) {
        if (this.form.data.drug_list.length <= 1) {
          return;
        }
        this.form.data.drug_list.splice(index, 1);
      },
      checkName(index) {  // 检验名字
        if (this.form.data.drug_list[index].name !== this.form.data.drug_list[index].medName) {
          this.form.data.drug_list[index].drug_id = 'none';
        }
      },
      // 联想
      querySearchAsync(queryString, cb) { // 药名联想
        clearTimeout(this.timeout);
        httpServerNormal(presSearchDrug, {
          drug_name: queryString,
          drug_type: 1,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (!res.data) {  // 联想无则返回空
              cb([]);
            } else {
              cb(res.data);
            }
          }
        }).catch(() => {
          cb([]);
        });
      },
      usageSearch(queryString, cb) {  // 用法联想
        const westUsageArr = this.Usage;
        const results = queryString ? westUsageArr.filter(this.createFilter(queryString))
          : westUsageArr;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      timesSearch(queryString, cb) {  // 用药频次联想
        const timesArr = this.frequency;
        const results = queryString ? timesArr.filter(this.createFilter(queryString))
          : timesArr;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (array) => {
          return (array.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      // 西药名称选择事件
      westNameSelect(item, index) {
        const obj = this.form.data.drug_list.find((val) => {
          return item.drug_id === val.drug_id;
        });
        if (obj) {
          this.$message({ message: '该药品已存在！', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        this.form.data.drug_list[index].name = item.drug_name;
        this.form.data.drug_list[index].drug_id = item.drug_id;
        this.form.data.drug_list[index].medName = item.drug_name;  // 保存药名检测
        httpServerNormal(presDrugInfo, {
          drug_id: item.drug_id,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (res) {
              this.form.data.drug_list[index].spec_text = res.specs_txt;
              this.form.data.drug_list[index].use_note = res.yongfa;
              this.form.data.drug_list[index].dosage = res.useunit.specs_unit;
              this.form.data.drug_list[index].dose_unit = res.useunit.specs_name;
              this.form.data.drug_list[index].dose_unit_list = Object.keys(res.specs).map(v1 => res.specs[v1]).map(v2 => v2.specs_name);
              this.form.data.drug_list[index].total = res.useall.specs_unit;
              this.form.data.drug_list[index].total_unit = res.useall.specs_name;
              this.form.data.drug_list[index].frequency = this.frequencyList[res.usedaily_times].name;
              this.form.data.frequency = this.frequencyList[res.usedaily_times].name;
            }
          }
        });
      },
      // 字符串转化为数字
      stringNumber() {
        // this.form.data.daily_use = parseFloat(this.form.data.daily_use);
        this.form.data.total = parseFloat(this.form.data.total);
        this.form.data.drug_list.forEach((drug, index) => {
          this.form.data.drug_list[index].dosage = parseFloat(this.form.data.drug_list[index].dosage);
          this.form.data.drug_list[index].use_method = this.form.data.use_method;
          this.form.data.drug_list[index].taking_note = this.form.data.taking_note;
          this.form.data.drug_list[index].zjyongfa = this.form.data.zjyongfa;
        });
      },
    },
    created() {
    },
    computed: {
      ...mapGetters(['clinic', 'token', 'user', 'frequencyList', 'chinaUsage', 'doseUnitList']),
    },
    mounted() {
      this.initData();
    },
  };
</script>
<style lang="scss" scoped>
@import "~@scss";

.newChineseformulation{
  position: relative;
  padding: 20px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
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
  min-width: 1100px;
}
.content{
  width: 100%;
  margin: 10px auto;
  min-width: 1100px;
}
.title{
  margin-top: 10px;
}
.w_900{
  width: 900px;
}
.m_b10{
  margin-bottom: 10px;
}
.d_inl{
  display: inline-block;
}
.fr{
  float: right;
}
.cursor{
  cursor: pointer;
}
.WestMedicineStyle{
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #ccc;
}
.el-form-item {
  margin-bottom: 8px;
  margin-right: 10px;
  font-size: 12px;
  // .inline-input{
  //   width: 80%;
  // }
  .el-radio{
    margin-left: 10px;
  }
  .el-autocomplete{
    width: 100%;
  }
  &.w_300{
    width: 300px;
    margin-bottom: 15px;
  }
  &.dose {
    span{
      font-size: 12px;
    }
    .el-input {
      width: 80%;
    }
  }
  &.dose2 {
    .el-input {
      width: 60px;
    }
    .el-autocomplete{
      width: 150px;
    }
    .spans {
      display: inline-block;
      // width: 15%;
      font-size: 12px;
    }
  }
  &.dose3 {
    .el-select {
      width: 60%;
    }
    .spans {
      display: inline-block;
      width: 25%;
      font-size: 12px;
    }
  }
  .el-icon-delete {
    font-size: 20px;
    cursor: pointer;
    color: $mainColor;
  }
  .preContentul {
    border: 1px solid #ccc;
    padding-left: 5px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: -5px;
    >div {
      border-right: 1px solid #ccc;
      &:last-of-type {
        border-right: 0;
      }
    }
  }
  &.usageStyle{
    margin: 20px 0;
  }
  .el-button {
    width: 100px;
    height: 35px;
    margin-right: 5%;
    margin-top: 5px;
  }

  &.inputs{
    .el-textarea{
      width: 750px;
    }

  }
}
.addinputs{
  cursor: pointer;
  color: $mainColor;
}
// 联想样式
.my-autocomplete {
  width: 100%;
  li {
    line-height: normal;
    padding: 2px;
    border-bottom: 1px solid #ccc;
    .name {
      // text-overflow: ellipsis;
      // overflow: hidden;
      line-height: 22px;
      font-size: 13px;
    }
    .phone {
      color: #b4b4b4;
      line-height: 18px;
      font-size: 12px;
      margin-bottom: 5px;
      border-bottom: 1px solid #ccc;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
