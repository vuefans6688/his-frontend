<template>
  <div class="newwesternformulation">
    <div class="header">
      <h2 class="title d_inl">{{title}}</h2>
      <div class="btn fr d_inl">
        <el-button type="primary" @click="submit('form')" size="small">保存</el-button>
        <el-button type="warning" @click="cancel" size="small">取消</el-button>
      </div>
    </div>

    <div class="content">
      <el-form :model="form" ref="form" align='center' size="small">
        <el-form-item label="模板名称:" prop="name" align='left' label-width="90px" class="w_300" :rules="{ required: true, message: '请输入模板名称', trigger: 'blur,change' }">
          <el-input v-model="form.name" size="small" :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="模板类型:" align='left' label-width="90px">
          <el-radio-group v-model="form.owner_type_str">
            <el-radio label="个人"></el-radio>
            <el-radio label="通用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <h3 align='left' class="m_b10">处方内容</h3>

        <div class="demo-form-inline">
          <el-form-item>
            <el-row class="preContentul">
              <el-col :span="1">组合</el-col>
              <el-col :span="5">药品名称</el-col>
              <el-col :span="3">包装规格</el-col>
              <el-col :span="3">用法</el-col>
              <el-col :span="4">单次剂量</el-col>
              <el-col :span="3">用药频次</el-col>
              <el-col :span="1">天数</el-col>
              <el-col :span="3">开药数量</el-col>
              <el-col :span="1">操作</el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="prescriptionInputs" v-for="(item, index) in form.data.drug_list" :key='index'>
            <!--组合  -->
            <el-col :span="1">
              <el-form-item>
                <el-input v-model="item.group_index_str" size="small" class="inlineBlock" :maxlength="2" @keyup.native="numberInp('group_index_str')"></el-input>
              </el-form-item>
            </el-col>
            <!--药品名称  -->
            <el-col :span="5">
              <el-form-item :prop="'data.drug_list.' + index + '.name'" :rules="{ required: true, message: '请输入药品名称', trigger: 'blur,change' }">
                <el-autocomplete popper-class="my-autocomplete" @blur="checkName(index)" :maxlength="64" size="small" v-model="item.name"  :fetch-suggestions="querySearchAsync" placeholder="请输入药品名" @select="westNameSelect($event, index)" :trigger-on-focus="false" valueKey='name'>
                  <template slot-scope="props">
                    <div class="thinkName">
                      {{ props.item.drug_name }}<span class="spec"> {{ props.item.spec_text }}</span>
                      <p class="phone">{{ props.item.producer }}</p>
                    </div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <!--包装规格  -->
            <el-col :span="3">
              <el-form-item>
                <el-input v-model="item.spec_text" size="small" :maxlength="64" class="inlineBlock" placeholder="规格"></el-input>
              </el-form-item>
            </el-col>
            <!--用法  -->
            <el-col :span="3">
              <el-form-item>
                <el-autocomplete popper-class="my-autocomplete" size="small" v-model="item.use_method" valueKey="name" :fetch-suggestions="usageSearch" placeholder="请输入用法"></el-autocomplete>
              </el-form-item>
            </el-col>
            <!--单次剂量  -->
            <el-col :span="2">
              <el-form-item>
                <el-input v-model="item.dosage" size="small" :maxlength="8"  @keyup.native="priceInp('dosage', 4)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <!-- 西药可以选择单位 -->
                <el-select v-if="item.specs && item.specs.unit_large" v-model="item.dose_unit" class="my-autocomplete" size="small" >
                  <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                  <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                  <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
                </el-select>
                <el-autocomplete v-if="!item.specs || !item.specs.unit_large" popper-class="my-autocomplete" size="small" v-model="item.dose_unit" valueKey="name" :fetch-suggestions="doseunitSearch" placeholder="剂量单位"></el-autocomplete>
              </el-form-item>
            </el-col>
            <!--用药频次  -->
            <el-col :span="3">
              <el-form-item>
                <el-autocomplete class="inline-input" size="small" :maxlength="64" v-model="item.frequency" valueKey="name" :fetch-suggestions="timesSearch" placeholder="用药频次"></el-autocomplete>
              </el-form-item>
            </el-col>
            <!-- 天数  -->
            <el-col :span="1">
              <el-form-item>
                <el-input v-model="item.days" size="small" @keyup.native="numberInp('days')" :maxlength="2"></el-input>
              </el-form-item>
            </el-col>
            <!--开药数量  -->
            <el-col :span="1">
              <el-form-item>
                <el-input v-model="item.total" size="small" class="inlineBlock" @keyup.native="numberInp('total')" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-select v-if="item.specs && item.specs.unit_large" v-model="item.total_unit" class="my-autocomplete" size="small" placeholder="单位">
                  <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                  <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                  <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
                </el-select>
                <el-autocomplete v-if="!item.specs || !item.specs.unit_large" popper-class="my-autocomplete" size="small" v-model="item.total_unit" valueKey="name" :fetch-suggestions="totalunitSearch" placeholder="单位"></el-autocomplete>
              </el-form-item>
            </el-col>
            <!--操作  -->
            <el-col :span="1">
              <el-form-item prop="del">
                <i class="el-icon-delete" @click="del(index)"></i>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item align='left'>
            <span class='addinputs' @click='addFormItem'>
              <i class="el-icon-circle-plus-outline"></i>
              增加一行
            </span>
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
          drug_list: [
            {
              group_index_str: '',
              drug_id: 'none',
              drug_type: 0,
              name: '',
              spec_text: '',
              producer: '',
              use_method: '',
              dosage: '',
              dose_unit: '',
              frequency: '',
              days: '',
              total: '',
              total_unit: '',
              specs: {},
            },
          ],
        }, // 处方列表
      },
      title: '新增西/成药处方模板',
      isNew: true,
      doseUnit: [
        { name: 'g' },
        { name: 'mg' },
        { name: 'ml' },
        { name: 'ug' },
        { name: '板' },
        { name: '小包' },
        { name: '小袋' },
        { name: '粒' },
        { name: '片' },
        { name: '枚' },
        { name: '张' },
        { name: '贴' },
        { name: '支' },
        { name: '只' },
        { name: '饼' },
        { name: '袋' },
        { name: '盒' },
        { name: '桶' },
        { name: '单位' },
        { name: '万单位' },
        { name: '把' },
        { name: '%' },
      ],
      Usage: [  // 用法
        { name: '口服' },
        { name: '冲服' },
        { name: '外用' },
        { name: '滴眼' },
        { name: '灌肠' },
        { name: '雾化' },
        { name: '皮下注射' },
        { name: '肌肉注射' },
        { name: '静脉注射' },
        { name: '静脉滴注' },
        { name: '肌肉注射皮试' },
        { name: '静脉滴注皮试' },
        { name: '雾化皮试' },
        { name: '穴位注射' },
        { name: '局部封闭' },
      ],
      frequencyList: [  // 频次
        { name: '每日一次(qd)', index: 1 },
        { name: '每日二次(bid)', index: 2 },
        { name: '每日三次(tid)', index: 3 },
        { name: '每日四次(qid)', index: 4 },
        { name: '隔日一次(qod)', index: 5 },
        { name: '必要时(prn)', index: 6 },
        { name: '每周一次(pw)', index: 7 },
        { name: '立即(st)', index: 8 },
      ],
      totalUnit: [
        { name: '盒' },
        { name: '袋' },
        { name: '包' },
        { name: 'ug' },
        { name: 'mg' },
        { name: 'ml' },
        { name: 'kg' },
        { name: 'g' },
        { name: '单位' },
        { name: '瓶' },
        { name: '桶' },
        { name: '万单位' },
        { name: '把' },
        { name: '板' },
        { name: '小包' },
        { name: '小袋' },
        { name: '粒' },
        { name: '枚' },
        { name: '片' },
        { name: '张' },
        { name: '只' },
        { name: '支' },
        { name: '贴' },
        { name: '%' },
      ],
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
        this.form.type = 2;
        this.form.owner_type_str = '个人';
      } else {
        this.title = '修改' + TplTypeNames[tplType] + '模板';
        this.isNew = false;
        this.form.data = data.data;
        this.form.type = 2;
        this.form.name = data.name;
        this.form.owner_type_str = (data.owner_type === 0 || data.owner_type === '个人模板') ? '个人' : '通用';
        this.form.template_id = data.template_id;
      }
    },
    checkName(index) {  // 检验名字
      const medList = this.form.data.drug_list[index];
      if (medList.name !== medList.medName) {
        medList.drug_id = 'none';
      }
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

        // if (!v.spec_text) {
        //   return preStr + '请输入药品规格';
        // }
        if (v.spec_text.length > 64) {
          return preStr + '药品规格长度不能超64个字符';
        }

        if (!v.use_method) {
          return preStr + '请输入药品用法';
        }
        if (v.use_method.length > 64) {
          return preStr + '用法长度不能超64个字符';
        }

        if (!v.dosage) {
          return preStr + '请输入药品剂量';
        }

        if (!v.dose_unit) {
          return preStr + '请输入药品剂量单位';
        }
        if (v.dose_unit.length > 64) {
          return preStr + '剂量单位长度不能超64个字符';
        }

        if (!v.frequency) {
          return preStr + '请输入用药频次';
        }
        if (v.frequency.length > 64) {
          return preStr + '用药频次长度不能超64个字符';
        }

        if (!v.days) {
          return preStr + '请输入开药天数';
        }

        if (!v.total) {
          return preStr + '请输入开药数量';
        }

        if (!v.total_unit) {
          return preStr + '请输入开药数量单位';
        }
        if (v.total_unit.length > 64) {
          return preStr + '开药数量长度不能超64个字符';
        }
      }

      return '';
    },
    save() {
      this.findStrThatNeedToChange('dosage', 'days', 'total');
      this.form.clinic_id = this.clinic;
      if (this.form.owner_type_str === '通用') {
        this.form.owner_type = 1;
      } else {
        this.form.owner_type = 0;
      }
      const url = this.isNew ? '/service/template/create' : '/service/template/modify';
      this.$http.post(url, {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: this.form,
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
    },
    numberInp(str) { // 限制数字输入
      for (let i = 0; i < this.form.data.drug_list.length; i++) {
        this.form.data.drug_list[i][str] = numberLimit(this.form.data.drug_list[i][str]);
      }
    },
    priceInp(str, bit) { // 限制小数输入
      for (let i = 0; i < this.form.data.drug_list.length; i++) {
        this.form.data.drug_list[i][str] = floatLimit(this.form.data.drug_list[i][str], bit);
      }
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
      if (this.form.data.drug_list.length >= 5) {
        this.$message({ message: '单个处方最多5种药品', type: 'warning', showClose: true, duration: 1000 });
        return;
      }
      const json = {
        group_index_str: '',
        drug_id: 'none',
        drug_type: 0,
        name: '',
        spec_text: '',
        producer: '',
        use_method: '',
        dosage: '',
        dose_unit: '',
        frequency: '',
        days: '',
        total: '',
        total_unit: '',
        specs: {},
      };
      this.form.data.drug_list.push(json);
    },
    del(index) {
      if (this.form.data.drug_list.length <= 1) {
        return;
      }
      this.form.data.drug_list.splice(index, 1);
    },
    // 联想
    querySearchAsync(queryString, cb) { // 药名联想
      clearTimeout(this.timeout);
      httpServerNormal(presSearchDrug, {
        drug_name: queryString,
        drug_type: 0,
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
    doseunitSearch(queryString, cb) {  // 剂量单位联想
      // const westUsageArr = this.doseUnit;
      const results = queryString ? this.doseUnit.filter(this.createFilter(queryString))
      : this.doseUnit;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    usageSearch(queryString, cb) {  // 用法联想
      const westUsageArr = this.Usage;
      const results = queryString ? westUsageArr.filter(this.createFilter(queryString))
      : westUsageArr;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    timesSearch(queryString, cb) {  // 用药频次联想
      const timesArr = this.frequencyList;
      const results = queryString ? timesArr.filter(this.createFilter(queryString))
      : timesArr;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    totalunitSearch(queryString, cb) {  // 数量单位联想
      const results = queryString ? this.totalUnit.filter(this.createFilter(queryString)) : this.totalUnit;
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
        this.$message({ message: '该药品已存在！', type: 'warning', showClose: true, duration: 1000 });
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
            this.validation = false;
            this.form.data.drug_list[index].spec_text = res.specs_txt;
            this.form.data.drug_list[index].use_method = res.yongfa;
            this.form.data.drug_list[index].dosage = res.useunit.specs_unit || '';
            this.form.data.drug_list[index].dose_unit = res.useunit.specs_name;
            this.form.data.drug_list[index].days = res.usedall_days || '';
            this.form.data.drug_list[index].total = res.useall.specs_unit || '';
            this.form.data.drug_list[index].total_unit = res.useall.specs_name;
            this.form.data.drug_list[index].frequency = res.usedaily_times ? this.frequencyList[res.usedaily_times - 1].name : '';
            this.form.data.drug_list[index].specs = res.specs;
          }
        }
      });
    },
    // 搜索需要转化的字段
    findStrThatNeedToChange() {
      this.form.data.drug_list.forEach((drug, index) => {
        const items = Array.prototype.slice.call(arguments);
        items.forEach((name) => {
          this.form.data.drug_list[index][name] = this.stringToNumber(drug[name]);
        });
      });
    },
    // 字符串转化为数字
    stringToNumber(str) {
      return parseFloat(str);
    },
  },
  created() {
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";

.newwesternformulation{
  position: relative;
  padding: 20px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
    width: 100%;
    margin: 10px auto;
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
  .el-form{
    width: 100%;
  }
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
    position: relative;
}
.demo-form-inline{
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
.el-form-item {
    margin-bottom: 8px;
    margin-right: 10px;
    .inline-input{
      width: 100%;
    }
  .el-autocomplete{
    width: 100%;
  }
  &.dose{
    .el-input{
      width: 75%;
    }
  }
  &.w_300{
    width: 300px;
    margin-bottom: 15px;
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
        margin-bottom: 10px;
        border-radius: 5px;
        margin-left: -5px;
        >div {
            border-right: 1px solid #ccc;
            &:last-of-type {
                border-right: 0;
            }
        }
    }
    .el-button {
        width: 100px;
        height: 35px;
        margin-right: 5%;
        margin-top: 5px;
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
