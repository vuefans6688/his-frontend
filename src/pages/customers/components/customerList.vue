<template>
<div class="documents">
    <div class="search my_titleInpStyle">
        <DateRangePicker :value='searchCondition.dateRange' :attributes='date_range_picker_attributes'></DateRangePicker>
        <input class='myInput condition' size="mini" v-model="searchCondition.name" placeholder="客户姓名或手机号" />
    </div>
    <div class="new_document">
        <el-button type="primary" @click="create_customer" size="mini">新增客户档案</el-button>
    </div>
    <div class="customers_list no_padding_left_table">
        <el-table
            :data="customersList"
            stripe
            style="width: 100%">
            <el-table-column
                type="index"
                align="center"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                label="姓名">
            </el-table-column>
            <el-table-column
                align="center"
                label="性别">
                <template slot-scope="scope">
                    {{scope.row.gender | SexState}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="年龄">
                <template slot-scope="scope">
                    {{scope.row.birthdate | formatBirth}}
                </template>
            </el-table-column>
            <el-table-column
                prop="phone"
                align="center"
                label="手机">
            </el-table-column>
            <el-table-column
                align="center"
                label="客户类型">
                <template slot-scope="scope">
                    {{scope.row.patienttype | customerTypeFilter(customerType)}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="客户来源">
                <template slot-scope="scope">
                    {{scope.row.patientsource | sourceFilter(customer_source)}}
                </template>
            </el-table-column>
            <el-table-column
                prop="deptname"
                align="center"
                show-overflow-tooltip
                label="最近就诊科室">
            </el-table-column>
            <el-table-column
                prop="doctor"
                align="center"
                label="最近就诊医生">
            </el-table-column>
            <el-table-column
                align="center"
                min-width="100px" 
                show-overflow-tooltip
                prop="visittime"	
                label="最近就诊时间">
                <!-- <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                    <div class="right_hover">{{scope.row.visittime}}</div>
                    <div slot="reference" class="name-wrapper">
                        {{scope.row.visittime}}
                    </div>
                    </el-popover>
                </template> -->
            </el-table-column>
            <el-table-column
                align="center"
                min-width="100px" 
                show-overflow-tooltip
                prop="createtime"
                label="建档时间" class-name="white_nowrap_column">
                <!-- <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                    <div class="right_hover">{{scope.row.createtime}}</div>
                    <div slot="reference" class="name-wrapper">
                        {{scope.row.createtime}}
                    </div>
                    </el-popover>
                </template> -->
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button class="show_detail_btn" type="text" size="mini" @click="show_customer_detail(scope.row.patientid)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination">
      <el-pagination :current-page="page.pageindex+1" @current-change="handleCurrentChange" :page-size="page.pagesize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <div class="create_customer" v-show='create_customer_show'>
        <div class="container">
            <div class="close" @click="create_customer_cancel">
                <i class="el-icon-circle-close"></i>
            </div>
            <h1 class="main_title">新增客户档案</h1>
            <el-form :rules="rules" ref="createCustomer" :model="customer" label-width="86px" size="mini">
                <el-row class="title_row">
                    <el-col :span="24"><h3 class="title">基本信息</h3></el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="客户姓名:" prop="name">
                            <el-input v-model="customer.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="性别:" prop="gender">
                            <el-radio-group v-model="customer.gender">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="手机:" prop="phone">
                            <el-input v-model="customer.phone" :maxlength="11" @keyup.native="limit_mobile('phone')"></el-input>
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
                            <el-input v-model="customer.cardid"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="就诊卡号:" prop="medicalcardid">
                            <el-input v-model="customer.medicalcardid"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="来源渠道:" prop="sourcetype">
                            <el-select v-model="customer.sourcetype" filterable>
                                <el-option
                                v-for="item in customer_source"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="客户类型:" prop="patienttype">
                            <el-select v-model="customer.patienttype" filterable>
                                <el-option
                                    v-for="item in customerType"
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
                        <el-form-item label="民族:" prop="nation">
                            <el-select v-model="customer.nationid" filterable>
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
                            <el-select v-model="customer.maritalstatus" filterable>
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
                            <el-input v-model="customer.company"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="职位:" prop="jobname">
                            <el-input v-model="customer.jobname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="邮箱:" prop="email">
                            <el-input v-model="customer.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="地址:" prop="address">
                            <el-input v-model="customer.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注:" prop="remark">
                            <el-input v-model="customer.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" round @click="create_customer_confirm('createCustomer')" size="small">保存</el-button>
                        <el-button round @click="create_customer_cancel" size="small">取消</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { numberLimit } from '@/utils/inputLimit';
import deepcopy from '@/utils/deepcopy';
import AgeCalculate from '@/components/AgeCalculate';
import DateRangePicker from '@/components/DateRangePicker';
import { calculateFromBirth } from '@/utils/ageTransfer';
import { customerList, customerAdd } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    const ageValidate = (rule, valu2, callback) => {
      if (!this.old.age && !this.old.month && !this.old.birth) {
        callback(new Error('请至少输入一个年龄'));
      } else if (this.old.birth > new Date()) {
        callback(new Error('请填写正确的生日'));
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
      total: 0,
      create_customer_show: false,  // 控制是否显示新建客户档案
      senior_search_show: false,    // 控制是否显示高级搜索
      date_range_picker_attributes: {
        editable: false,
        clearable: false,
        size: 'small',
      },
      searchCondition: {            // 搜索条件
        dateRange: [new Date(new Date() - (1000 * 60 * 60 * 24 * 7)), new Date()],
        name: '',               // 姓名或电话
        patienttype: -1,
        patientsource: -1,
      },
      page: {
        pageindex: 0,
        pagesize: 10,
      },
      customersList: [],
      customer: {
        name: '',
        gender: 1,
        phone: '',
        cardid: '',
        medicalcardid: '',  // 就诊卡
        patienttype: 1,
        sourcetype: 1,
        nationid: '01',     // 民族
        maritalstatus: 0,
        company: '',     // 单位
        jobname: '',       // 职位
        email: '',
        address: '',
        remark: '',
      },
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
    ...mapMutations(['change_customerID', 'change_customer_source']),
    handleCurrentChange(index) {
      this.page.pageindex = index - 1;
      this.getCustomersList();
    },
    // 新建档案
    create_customer() {
      this.create_customer_show = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    // 取消建档
    create_customer_cancel() {
      // reset
      this.$refs.createCustomer.resetFields();
      this.old.age = '';
      this.old.month = '';
      this.old.birth = '';
      // hide the panel
      this.create_customer_show = false;
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
    },
    // 确认建档
    create_customer_confirm(formName) {
      if (this.old.month > 11) {
        this.$message({
          message: '月数必须小于12',
          type: 'error',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      // 添加客户档案成功的处理
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.newCustomerFile();
        } else {
          return false;
        }
      });
    },
    // 限制手机号输入
    limit_mobile(item) {
      this.customer[item] = numberLimit(this.customer[item]);
    },
    // 查看客户详情
    show_customer_detail(customerID) {
      this.change_customerID(customerID);
      this.$router.push({ path: '/navigator/customers/customerDetail' });
    },
    // 获取客户档案列表
    getCustomersList() {
      if (!this.searchCondition.dateRange[0] || !this.searchCondition.dateRange[1]) {
        return;
      }
      const fromdate = this.searchCondition.dateRange[0] ? this.searchCondition.dateRange[0].format('yyyy-MM-dd') : '';
      const todate = this.searchCondition.dateRange[1] ? this.searchCondition.dateRange[1].format('yyyy-MM-dd') : '';

      httpServerNormal(customerList, {
        fromdate: fromdate,
        todate: todate,
        ...this.searchCondition,
        ...this.page,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.customersList = res && res.items ? res.items : [];
          this.total = res ? res.totalcount : 0;
        }
      });
    },
    // 新建档案
    newCustomerFile() {
      httpServerNormal(customerAdd, {
        ...this.customer,
        birthdate: this.old.birth.format('yyyy-MM-dd'),
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          const customer = deepcopy(res);
          this.$set(customer, 'createtime', new Date().format('yyyy-MM-dd hh:mm:ss'));
          this.customersList.push(customer);
          this.$message.success({ message: '新建客户档案成功', duration: 1000, showClose: true });
        }
        this.create_customer_cancel();
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic', 'nations', 'customerType', 'marriage', 'customer_source']),
  },
  components: {
    AgeCalculate,
    DateRangePicker,
  },
  // 监听检索条件
  watch: {
    searchCondition: {
      handler() {
        this.page.pageindex = 0;
        this.getCustomersList();
      },
      deep: true,
    },
  },
  filters: {
    sourceFilter(id, sourceList) {
      const source = sourceList.find((item) => {
        return item.id === id;
      });
      return source ? source.name : '未知';
    },
    customerTypeFilter(id, typeList) {
      const type = typeList.find((item) => {
        return item.id === id;
      });
      return type ? type.name : '自费';
    },
    formatBirth(birth) {
      return calculateFromBirth(birth);
    },
  },
  created() {
    this.getCustomersList();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';
@import "~@device";
.documents{
    position: relative;
    padding: 30px 40px 60px 40px;
    .search{
        margin-bottom: 10px;
        .condition{
            display: inline-block;
            width: 200px;
            vertical-align: middle;
        }
    }
    .senior_search{
        margin-bottom: 20px;
        .el-select{
            @include width_fixed(150px);
        }
    }
    .new_document{
        padding-top: 10px;
        border-top: 1px solid #ccc;
        .el-button{
            font-size: 14px;
        }
    }
    .customers_list .el-table{
        font-size: 14px;
        .show_detail_btn{
            padding: 3px;
            font-size: 14px;
        }
        .el-table__body-wrapper .el-table__body .el-table__row .cell{
            background: #ccc;
        }
    }
    .pagination{
        @include pagination_to_bottom;
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
            width: 50%;
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

