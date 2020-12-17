<template>
  <div class="newmedicalrecords">
    <div class="header">
      <h2 class="title d_inl">{{title}}模板</h2>
      <div class="btn fr d_inl">
        <el-button type="primary" @click="submitForm('checkForm')">保存</el-button>
        <el-button type="warning">取消</el-button>
      </div>
    </div>

    <div class="content">
      <el-form :model="checkForm" ref="checkForm" align='center' inline-message>
        <el-form-item label="模板名称:" prop="modulename" align='left' label-width="90px">
          <input type="text" class="myInput" v-model="checkForm.modulename">
        </el-form-item>
        <el-form-item label="模板类型:" prop="moduleclass" align='left' label-width="90px">
          <el-radio-group v-model="checkForm.moduleclass">
          <el-radio label="个人"></el-radio>
          <el-radio label="通用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="m_b10"><h3 align='left'>{{title3}}内容</h3></div>

        <div class="demo-form-inline">
          <el-form-item class="btm">
            <template slot-scope="scope">
              <el-row class="preContentul">
                <el-col :span="2">序号</el-col>
                <el-col :span="7">{{title2}}</el-col>
                <el-col :span="7">数量</el-col>
                <el-col :span="3">操作</el-col>
              </el-row>
            </template>
          </el-form-item>
          <el-form-item v-for="(item, index) in checkForm.arr" :key='index'>
            <!-- 序号  -->
            <el-col :span="2">
              <el-form-item>
                <template slot-scope="scope">
                  <span>{{ (index + 1) }}</span>
                </template>
              </el-form-item>
            </el-col>
            <!--项目名称  -->
            <el-col :span="7">
              <el-form-item prop="name">
                <template slot-scope="scope">
                  <el-autocomplete class="inline-input" v-model="item.name" @click.native='addFormItem(index)' :fetch-suggestions="querySearch" :placeholder="'请输入'+title2" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                </template>
              </el-form-item>
            </el-col>
            <!--数量  -->
            <el-col :span="7">
              <el-form-item prop="number" class="dose">
                <template slot-scope="scope">
                  <el-input v-model="item.number" class="inlineBlock" type="number"></el-input>
                  <el-select placeholder="单位" v-model="item.numUnit">
                    <el-option label="个" value="个"></el-option>
                    <el-option label="盒" value="盒"></el-option>
                    <el-option label="只" value="只"></el-option>
                    <el-option label="支" value="支"></el-option>
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
            <!--操作  -->
            <el-col :span="3">
              <el-form-item>
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="del(index)"></i>
                </template>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item align='left'>
            <span class='addinputs' @click='addFormItem'>
              <i class="el-icon-circle-plus-outline"></i>
              增加一行
            </span>
          </el-form-item>
          <!-- 底部  -->
          <el-form-item align='right' class="inputs">
            <span>医生：</span>
            <el-input v-model="checkForm.doctor"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      checkForm: {
        arr: [
          {
            name: '',   // 项目名
            number: '',    // 数量
            numUnit: '',      // 数量(单位)
          },
        ],
        doctor: '杨永信',
        modulename: '',
        moduleclass: '',
      },
      arr: [
        { value: '888', price: 18 },
        { value: '777', price: 8 },
        { value: '8885', price: 46 },
      ],
      // 验证规则
      // rules: {
      //   modulename: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
      //   moduleclass: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
      // },
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    addFormItem() {
      const json = {
        name: '',
        number: '',
        numUnit: '',
        money: '0.00',
      };
      this.checkForm.arr.push(json);
    },
    del(index) {
      if (this.checkForm.arr.length <= 1) {
        return;
      }
      this.checkForm.arr.splice(index, 1);
    },
    // 联想
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    loadAll() {
      return [
        { value: '999感冒灵', price: 18 },
        { value: '感冒片', price: 8 },
        { value: '999皮炎平', price: 46 },
        { value: '夏桑菊', price: 132 },
        { value: '板蓝根', price: 38 },
        { value: '野菊花', price: 38 },
      ];
    },
    // handleSelect(item) {
    // },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({ message: '保存成功!', type: 'success', showClose: true, duration: 1000 });
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
  },
  props: ['title', 'title2', 'title3'],
  mounted() {
    this.restaurants = this.loadAll();
  },
  created() {
    this.checkForm.doctor = this.user.name;  // 将用户名赋值给医生
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
<style lang='scss' scoped>
@import "~@scss";

.header{
    // width: 92%;
    margin: 0 auto;
    padding-top: 10px;
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.content{
  // width: 92%;
  // margin: 10px auto;
    // width: 100%;
  min-width: 1100px;
}
.title{
    margin-top: 10px;
    margin-left: 30px;
}
.w_300{
    width: 300px;
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
.checkStyle {
  border-radius: 20px;
  margin-bottom: 15px;
  margin-right: 10px;
}

.demo-form-inline {
  padding: 20px;
  min-width: 1100px;
}

.el-form-item {
  margin-bottom: 5px;
  font-size: 12px;
  .inline-input {
    width: 80%;
  }
  &.dose {
    .el-input {
      width: 28%;
    }
    .el-select {
      width: 32%;
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
  .el-button {
    width: 100px;
    height: 35px;
    margin-right: 5%;
    margin-top: 5px;
  }
  &.inputs {
    margin-top: 20px;
    margin-right: 20px;
    .el-input {
      width: 200px;
    }
  }
}
.addinputs{
  cursor: pointer;
  color: $mainColor;
}
</style>
