<template>
  <div class="newmedicalrecords">
    <div class="header">
      <h2 class="title d_inl">{{this.title}}</h2>
      <div class="btn fr d_inl">
        <el-button type="primary" @click="submit('form')" size="small">保存</el-button>
        <el-button type="warning" @click="cancel" size="small">取消</el-button>
        <!--<el-button type="info" @click="goback">返回</el-button>-->
      </div>
    </div>

    <div class="content">
      <el-form :model="form" ref="form" align='center'>
        <el-form-item label="模板名称:" prop="name" align='left' class="w_300" label-width="90px" :rules="{ required: true, message: '请输入模板名称', trigger: 'blur,change' }">
          <el-input v-model="form.name" size="small" :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="模板类型:" align='left' label-width="90px">
          <el-radio-group v-model="form.owner_type_str">
            <el-radio label="个人"></el-radio>
            <el-radio label="通用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="m_b10"><h3 align='left'>耗材内容</h3></div>

        <div class="demo-form-inline">
          <el-form-item>
            <template slot-scope="scope">
              <el-row class="preContentul">
                <el-col :span="2">序号</el-col>
                <el-col :span="10">耗材名称</el-col>
                <el-col :span="10">数量</el-col>
                <el-col :span="2">操作</el-col>
              </el-row>
            </template>
          </el-form-item>
          <el-form-item class="prescriptionInputs" v-for="(item, index) in form.data.item_list" :key='index'>
            <!-- 序号  -->
            <el-col :span="2">
              <el-form-item>
                <template slot-scope="scope">
                  <span>{{ (index + 1) }}</span>
                </template>
              </el-form-item>
            </el-col>
            <!--药品名称  -->
            <el-col :span="10">
              <el-form-item :prop="'data.item_list.' + index + '.name'" :rules="{ required: true, message: '请输入项目名称', trigger: 'blur,change' }">
                <template slot-scope="scope">
                  <el-autocomplete popper-class="my-autocomplete"  v-model="item.name"  size="small" :fetch-suggestions="querySearchAsync" placeholder="请输入名称" @select="westNameSelect($event, index)" :trigger-on-focus="false" valueKey='name'>
                    <template slot-scope="props">
                      <div class="thinkName">
                        {{ props.item.name }}<span class="spec"> {{ '(' + props.item.price + '元)'}}</span>
                      </div>
                    </template>
                  </el-autocomplete>
                </template>
              </el-form-item>
            </el-col>

           <!--数量  -->
            <el-col :span="5">
              <el-form-item :prop="'data.item_list.' + index + '.total'" :rules="{ required: true, message: '请输入数量', trigger: 'blur,change' }">
                <el-input v-model="item.total" class="inlineBlock" @keyup.native="numberInp('total')"  size="small" ></el-input>
              </el-form-item>
            </el-col>
            <!-- 数量单位 -->
            <el-col :span="5">
              <el-form-item :prop="'data.item_list.' + index + '.total_unit'" :rules="{ required: true, message: '请输入单位', trigger: 'blur,change' }">
                <el-input placeholder="数量单位" v-model="item.total_unit" class="inlineBlock"  size="small" :maxlength="64"></el-input>
              </el-form-item>
            </el-col>


            <!--操作  -->
            <el-col :span="2">
              <el-form-item prop="del">
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="del(index)" ></i>
                </template>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item align='left'>
          <span class='addinputs' @click='addFormItem' >
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
  import { numberLimit } from '@/utils/inputLimit';

  const TplTypeNames = [
    '',
    '门诊病历',
    '西/成药',
    '中药',
    '输液',
    '诊疗项目',
    '耗材组合',
    '其他项目',
    '常用医嘱',
  ];


  export default {
    data() {
      return {
        rules_met_tpl: {
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
          type: 6,  // 类型默认值
          owner_type_str: '',  // 模板类型
          owner_type: 0, // 类型整数，默认个人
          data: {
            item_list: [
              {
                item_id: 'none',
                item_type: 6,
                name: '',
                total: '',
                total_unit: '',
              },
            ],
          },
        },
        title: '新增耗材组合模板',
        isNew: true,
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
          this.form.type = 6;
          this.form.owner_type_str = '个人';
        } else {
          this.title = '修改' + TplTypeNames[tplType] + '模板';
          this.isNew = false;
          this.form.data = data.data;
          this.form.type = 6;
          this.form.name = data.name;
          this.form.owner_type_str = (data.owner_type === 0 || data.owner_type === '个人模板') ? '个人' : '通用';
          this.form.template_id = data.template_id;
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
      validateAllInputs() {
        if (!this.form.name) {
          return '请输入模板名称';
        }
        if (this.form.name.length > 64) {
          return '模板名称长度不能超64个字符';
        }

        if (!this.form.data.item_list || this.form.data.item_list.length === 0) {
          return '请至少输入一项';
        }

        for (let i = 0; i < this.form.data.item_list.length; i++) {
          const v = this.form.data.item_list[i];
          const preStr = '第' + (i + 1) + '行';
          if (!v.name) {
            return preStr + '请输入名称';
          }
          if (v.name.length > 64) {
            return preStr + '名称长度不能超64个字符';
          }

          if (!v.total) {
            return preStr + '请输入数量';
          }

          if (!v.total_unit) {
            return preStr + '请输入数量单位';
          }
          if (v.total_unit.length > 64) {
            return preStr + '数量单位长度不能超64个字符';
          }
        }

        return '';
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
      save() {
        // 字符串转化为数字
        this.stringNumber();
        this.form.clinic_id = this.clinic;
        if (this.form.owner_type_str === '通用') {
          this.form.owner_type = 1;
        } else {
          this.form.owner_type = 0;
        }
        const errMsg = this.validateAllInputs();
        if (errMsg) {
          this.$message({ message: errMsg, type: 'error', showClose: true, duration: 1000 });
          return;
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
        for (let i = 0; i < this.form.data.item_list.length; i++) {
          this.form.data.item_list[i][str] = numberLimit(this.form.data.item_list[i][str]);
        }
      },
      addFormItem() {
        const json = {
          item_id: 'none',
          item_type: 6,
          name: '',
          total: 0.0,
          total_unit: '',
        };
        this.form.data.item_list.push(json);
      },
      del(index) {
        if (this.form.data.item_list.length <= 1) {
          return;
        }
        this.form.data.item_list.splice(index, 1);
      },
      // 联想
      querySearchAsync(queryString, cb) { // 药名联想
        clearTimeout(this.timeout);
        this.$http.post('/service/clinic/search_chargitem', {
          head: {
            accessToken: this.token,      // 用户身份标识，必选参数
            lastnotice: 0,
            msgid: '',
          },
          body: {
            clinic_id: this.clinic,
            item_name: queryString,
            item_type: 4,
          },
        }).then((res) => {
          if (res.data.errcode === 0 && res.data.data.clinic_id === this.clinic) {
            if (!res.data.data.items) {  // 联想无则返回空
              cb([]);
            } else {
              cb(res.data.data.items);
            }
          } else {
            this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
            cb([]);
          }
        }).catch((e) => {
          this.$message({ message: e, type: 'error', showClose: true, duration: 1000 });
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
        this.form.data.item_list[index].name = item.name;
        this.form.data.item_list[index].total_unit = item.unit;
        this.form.data.item_list[index].item_id = item.item_id;
      },
      // 字符串转化为数字
      stringNumber() {
        this.form.data.item_list.forEach((item, index) => {
          this.form.data.item_list[index].total = parseFloat(item.total);
        });
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

  .header{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
    height: 49px;
    line-height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
  }
  .content{
    width: 92%;
    margin: 10px auto;
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
    margin: 10px 0;
    position: relative;
  }
  .demo-form-inline{
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .el-form-item {
    margin-bottom: 5px;
    margin-right: 10px;
    .inline-input{
      width: 100%;
    }
    .el-autocomplete{
      width: 100%;
    }
    &.w_300{
      width: 300px;
      margin-bottom: 15px;
    }
    &.dose {
      .el-input {
        width: 48%;
      }
      .el-select {
        width: 42%;
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
    &.inputs{
      margin-top: 20px;
      margin-right: 20px;
      .el-input{
        width: 200px;
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
