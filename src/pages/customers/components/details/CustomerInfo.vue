<template>
  <div class="user_info">
    <table class="info">
      <tr class="title">
        <td colspan="4"><<基本信息</td>
      </tr>
      <tr>
        <td>客户姓名</td>
        <td> {{customer.patient.name}}</td>
        <td>性别</td>
        <td>{{customer.patient.gender | SexState}}</td>
      </tr>
      <tr>
        <td>手机</td>
        <td> {{customer.patient.phone}}</td>
        <td>生日</td>
        <td> {{customer.patient.birthdate}}</td>
      </tr>
      <tr class="title">
        <td colspan="4"><<详细信息</td>
      </tr>

      <!-- 详细信息 -->

      <tr>
        <td>身份证号</td>
        <td> {{customer.patient.cardid}}</td>
        <td>就诊卡号</td>
        <td>{{customer.patient.medicalcardid}}</td>
      </tr>
      <tr>
        <td>客户类型</td>
        <td> {{customer.patient.patienttype | customerTypeFilter(customerType)}}</td>
        <td>来源渠道</td>
        <td> {{customer.patient.sourcetype | sourceFilter(customer_source)}}</td>
      </tr>
      <tr>
        <td>标签</td>
        <td></td>
        <td>民族</td>
        <td> {{customer.patient.nationid | nationFilter(nations)}}</td>
      </tr>
      <tr>
        <td>婚姻状况</td>
        <td>{{customer.patient.maritalstatus | marriageFilter(marriage)}}</td>
        <td>工作单位</td>
        <td> {{customer.patient.company}}</td>
      </tr>
      <tr>
        <td>职位</td>
        <td>{{customer.patient.jobname}}</td>
        <td>地址</td>
        <td> {{customer.patient.address}}</td>
      </tr>
      <tr>
        <td>邮箱</td>
        <td>{{customer.patient.email}}</td>
        <td>备注</td>
        <td>{{customer.patient.remark}}</td>
      </tr>
      <tr class="title">
        <td colspan="4"><<就诊信息</td>
      </tr>

      <!-- 就诊信息 -->
      <tr>
        <td>最近就诊时间</td>
        <td> {{customer.visittime}}</td>
        <td>最近就诊医生</td>
        <td>{{customer.Doctor}}</td>
      </tr>
      <tr>
        <td>就诊次数</td>
        <td> {{customer.amount}}</td>
        <td>总消费金额</td>
        <td>{{customer.chargeprice}}</td>
      </tr>
      <tr>
        <td colspan="4">
          <el-button type="primary" @click="modify_customer_method" size="small">修改信息</el-button>
        </td>
      </tr>
    </table>
    <div class="create_customer" v-show='modify_customer_show'>
      <div class="container">
        <div class="close" @click="modify_customer_cancel">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="main_title">修改客户信息</h1>
        <el-form :rules="rules" ref="modifyCustomer" :model="modify_customer" label-width="86px" size="small">
          <el-row class="title_row">
            <el-col :span="24"><h3 class="title">基本信息</h3></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="患者姓名:" prop="name">
                <el-input v-model="modify_customer.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="modify_customer.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="手机:" prop="phone">
                <el-input v-model="modify_customer.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="年龄:">
                <AgeCalculate :old="old"></AgeCalculate>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="title_row">
            <el-col :span="24"><h3 class="title">详细信息</h3></el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="身份证号:" prop="cardid">
                <el-input v-model="modify_customer.cardid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="就诊卡号:" prop="medicalcardid">
                <el-input v-model="modify_customer.medicalcardid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="客户类型:" prop="patienttype">
                <el-select v-model="modify_customer.patienttype" filterable>
                  <el-option
                    v-for="item in customerType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="来源渠道:" prop="sourcetype">
                <el-select v-model="modify_customer.sourcetype" filterable>
                  <el-option
                  v-for="item in customer_source"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  </el-option>
                </el-select> 
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="10">
                  <el-form-item label="民族:" prop="nationid">
                      <el-select v-model="modify_customer.nationid" filterable>
                          <el-option
                          v-for="item in nations"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="14">
                  <el-form-item label="婚姻状况:" prop="maritalstatus">
                      <el-select v-model="modify_customer.maritalstatus" filterable>
                          <el-option
                          v-for="item in marriage"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="10">
                  <el-form-item label="工作单位:" prop="company">
                      <el-input v-model="modify_customer.company"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="14">
                    <el-form-item label="职位:" prop="jobname">
                      <el-input v-model="modify_customer.jobname"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="邮箱:" prop="email">
                <el-input v-model="modify_customer.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="地址:" prop="address">
                <el-input v-model="modify_customer.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注:" prop="remark">
                <el-input v-model="modify_customer.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" round @click="modify_customer_confirm('modifyCustomer')" size="small">保存</el-button>
              <el-button round @click="modify_customer_cancel" size="small">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import AgeCalculate from '@/components/AgeCalculate';
import deepcopy from '@/utils/deepcopy';
import { getCurMonthDays } from '@/utils/ageTransfer';
import { customerInfo, customerInfoUpdate } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  props: {
    customerID: {
      type: String,
      default: '',
    },
  },
  data() {
    const ageValidate = (rule, valu2, callback) => {
      if (!this.old.age && !this.old.month && !this.old.birth) {
        callback(new Error('请至少输入一个年龄'));
      } else {
        callback();
      }
    };
    const mobileValidate = (rule, valu2, callback) => {
      const isValid = /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(valu2);
      if (valu2 && !isValid) {
        callback(new Error('请输入合法的手机号'));
      } else {
        callback();
      }
    };
    const IDCardValidate = (rule, valu2, callback) => {
      const isValid = /^\d{17}[\d|X]$/.test(valu2);
      if (valu2 && !isValid) {
        callback(new Error('请输入合法的身份证号'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value && !/^[A-Za-z1-9][A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]{2,}[-.])+[A-Za-z\d]{2,5}([-.][A-Za-z\d]{2,})*$/.test(value)) {
        callback(new Error('邮箱格式错误!'));
      } else {
        callback();
      }
    };
    return {
      modify_customer_show: false,
      customer: {
        patient: {},
      },   // 客户信息
      customerStatistics: {},   // 客户就诊统计
      modify_customer: {},
      old: {
        age: '',
        month: '',
        birth: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        age: [
          { validator: ageValidate, trigger: 'blur' },
        ],
        month: [
          { validator: ageValidate, trigger: 'blur' },
        ],
        year: [
          { validator: ageValidate, trigger: 'blur' },
        ],
        phone: [
          { validator: mobileValidate, trigger: 'blur' },
        ],
        cardid: [
          { validator: IDCardValidate, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(['change_customer_source']),
    modify_customer_method() {
      this.modify_customer_show = true;
      this.modify_customer = deepcopy(this.customer.patient);
      if (this.customer.patient.birthdate) {
        const birth = this.customer.patient.birthdate.split('-');
        this.old.birth = new Date(birth[0], birth[1] - 1, birth[2]);
        this.old.age = new Date().getFullYear() - this.old.birth.getFullYear();
        this.old.month = new Date().getMonth() - this.old.birth.getMonth();
        let day = new Date().getDate() - this.old.birth.getDate();
        // 获取当前月天数
        const curMonth = parseInt(this.old.birth.getMonth() + 1, 10);
        const curYear = parseInt(this.old.birth.getFullYear(), 10);
        const daysInMonth = getCurMonthDays(curMonth, curYear);
        if (day < 0) {
          day = daysInMonth + day;
          this.old.month -= 1;
        }
        if (this.old.month < 0) {
          this.old.month = 12 + this.old.month;
          this.old.age -= 1;
        }
      }
      this.$emit('destroyScroll');    // 弹出模态框时需destroy父组件Scrollbar
    },
    modify_customer_cancel() {
      // reset
      this.$refs.modifyCustomer.resetFields();
      this.modify_customer = {};
      this.old.age = '';
      this.old.month = '';
      this.old.birth = '';
      // hide the panel
      this.modify_customer_show = false;
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
    },
    modify_customer_confirm(formName) {
      if (this.old.month > 11) {
        this.$message({
          message: '月数必须小于12',
          type: 'error',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      // 修改客户档案成功的处理
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.modifyCustomerRequest();
        } else {
          return false;
        }
      });
    },
    // 获取客户详细信息
    getCustomerInfo() {
      httpServerNormal(customerInfo, {
        patientid: this.customerID,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.customer = res;
        }
      });
    },
    // 修改客户信息
    modifyCustomerRequest() {
      httpServerNormal(customerInfoUpdate, {
        patientid: this.customerID,
        ...this.modify_customer,
        birthdate: this.old.birth.format('yyyy-MM-dd'),
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.$emit('customerInfoUpdated');
          this.$message.success({ message: '修改客户信息成功', duration: 1000, showClose: true });
          this.customer.patient = res;
        }
        this.modify_customer_cancel();
      });
    },
  },
  components: {
    AgeCalculate,
  },
  computed: {
    ...mapGetters(['token', 'clinic', 'nations', 'customerType', 'marriage', 'customer_source']),
  },
  filters: {
    // 客户来源过滤
    sourceFilter(id, sourceList) {
      const source = sourceList.find((item) => {
        return item.id === id;
      });
      return source ? source.name : '';
    },
    // 客户类型过滤
    customerTypeFilter(id, typeList) {
      const type = typeList.find((item) => {
        return item.id === id;
      });
      return type ? type.name : '';
    },
    // 民族过滤
    nationFilter(id, nationList) {
      const nation = nationList.find((item) => {
        return item.id === id;
      });
      return nation ? nation.name : '';
    },
    // 婚姻状况过滤
    marriageFilter(id, marriageList) {
      const marriage = marriageList.find((item) => {
        return item.id === id;
      });
      return marriage ? marriage.label : '';
    },
  },
  created() {
    this.getCustomerInfo();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';
.user_info{
  padding: 10px 0;
  .info{
    width: 100%;
    tr{
      line-height: 40px;
      td:nth-of-type(1), td:nth-of-type(3){
        width: 10%;
        min-width: 80px;
        text-align: center;
      }
      td:nth-of-type(2), td:nth-of-type(4){
        width: 40%;
      }
      &.title{
        font-weight: 700;
        border-bottom: 1px dashed #ccc;
        td{text-align: left;}
      }
    }
  }
  .create_customer{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(7, 17, 27, 0.8);
    overflow: auto;
    .container{
      position: relative;
      width: 60%;
      margin: 100px auto;
      padding: 20px 30px;
      background: #fff;
      .close{
        position: absolute;
        padding: 5px;
        right: 0;
        top: 0;
        cursor: pointer;
        i{
            font-size: 2em;
        }
      }
      .main_title{
        text-align: center;
      }
      .el-form{
        .el-row{
          &.title_row{
            padding: 20px;
            .title{
              border-bottom: 1px dashed #ccc;
            }
          }
          &:nth-last-of-type(1){
            text-align: center;
          }
          .el-col .el-form-item .addTag{
            color: $mainColor;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

