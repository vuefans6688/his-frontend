<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-04 15:56:08
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-12 10:33:34
 -->
<template>
  <div>
    <!-- 快速接诊 -->
    <div class="tag_info" v-show='!cardReading'>
      <div class="container">
        <div class="close" @click='cancelQuick'>
          <i class="el-icon-circle-close"></i>
        </div>
        <h3>快速接诊
          <!-- bindSbMsg.hospitalCode存在则绑定社保 -->
          <el-button @click="openReadingCard" size="mini" type="primary" v-if="bindSbMsg.hospitalCode">读卡</el-button>
        </h3>
        <div class="content">
        
        <el-form :model="quickForm" size="mini" :rules="quickRules" label-width="100px" ref="quickForm">
          <el-form-item label="客户姓名：" prop="name" label-width="100px">
            <template solt-scope='scope'>
              <el-autocomplete popper-class="my-autocomplete" v-model="quickForm.name" :disabled="this.oldCustomer" :fetch-suggestions="querySearchAsync" placeholder="请输入客户姓名" @select="handleSelect" :trigger-on-focus="false" valueKey='name'>  
                <template slot-scope="props">
                  <div class="thinkName">
                      {{ props.item.name }} - {{ props.item.gender | SexState }} 
                      <p class="phone">{{ props.item.phone }}</p>
                    </div>
                </template>
              </el-autocomplete>
            </template>
          </el-form-item>
          <el-form-item label="个人电脑号：">
            <el-input v-model="quickForm.szsbcardid" :maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="客户手机：" prop="phone">
            <el-input v-model="quickForm.phone" :maxlength="11">
            </el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-radio v-model="quickForm.gender" :label='1'>男</el-radio>
            <el-radio v-model="quickForm.gender" :label='2'>女</el-radio>
          </el-form-item>
          <el-form-item label="" class="ageInputs" style="margin-left: -100px;">
            <div style="display: flex;">
              <p class="label" style="flex: 0 0 88px; padding-right: 12px; text-align: right;"><span class="required" style="color: #F56C6C">* </span><span style="color: #606266;">年龄： </span></p>
              <el-form-item label="" prop="date">
                <age-component :old='date' ref="preAge"></age-component>
              </el-form-item>
            </div>
            <!-- <age-component :old='date' ref="preAge"></age-component> -->
          </el-form-item>
          <el-form-item label="就诊科室：" prop="deptid">
            <el-select v-model="quickForm.deptid" @change="quickForm.doctorid = ''">
              <!-- <el-option label="未指定" value=""></el-option> -->
              <el-option :label="item.name" :value="item.dept_id" v-for='(item, ind) in sections' :key='ind'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="就诊医生：" prop="doctorid">
            <el-select v-model="quickForm.doctorid">
              <el-option :label="item.truename" :value="item.userid" v-for='item in usefulDoctor' :key='item.userid'>
                <span style="float: left;">{{ item.truename }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px; color: #56bc94; margin-left: 10px;" v-if="item.szsbdoctorcode">社保医生</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="挂号类别：" prop="bkc368">
            <el-select v-model="quickForm.bkc368">
              <el-option v-for="(item,index) in regType" :key="index" :label="item.name" :value="item.value" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="诊金：" prop="zhenjinid">
            <el-select v-model="quickForm.zhenjinid">
              <el-option :label="item.name + '(' + item.price + '元)'" :value="item.item_id" v-for="(item, index) in feeList" :key="index" @click.native="getChargeItemMsg(item)">
                <!-- <span style="float: left;" v-if="!item.szsbcode">{{ item.name }} ({{item.price}}元)</span> -->
                <span style="float: left; font-size: 12px;">{{ item.name }}({{item.price}}元)</span>
                <span style="float: right; color: #8492a6; font-size: 12px; color: #56bc94; margin-left: 10px;" v-if="item.szsbcode">社保</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span class="clear" @click="resetForm('quickForm')">
          <i class="el-icon-delete"></i>
            清空
        </span>   
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="quickFormSubmit('quickForm')" size="mini">确 定</el-button>
          <el-button @click="cancelQuick" size="mini">取 消</el-button>
        </div>
        </div>
      </div>
    </div>

    <!-- 社保读卡 -->
    <div class="sbLoadingStyle" v-show='cardReading'>
      <div class="container">
        <div class="close" @click='closeReadingCard'>x</div>
        <h3>社保读卡</h3>
        <div class="sbloading">
          <sb-loading v-if="cardReading" @getPersonDetailInfo="closeReadingCard"></sb-loading>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import ageComponent from '@/components/AgeCalculate';
import sbLoading from '@/components/SbLoading';
import httpServerNormal from '@httpServerNormal';
import { getDeptList, getDocList, getChargitemList, patientSearch, registFast, saveChargitem } from '@apiNormal';
import dateChange from '@/utils/dateChange';
import { BCC334 } from '@/common/js/dictionary';
import { jsTimestampFilter } from '@/utils/filters';
import { mapGetters } from 'vuex';

export default {
  data() {
    const mobileValidate = (rule, valu2, callback) => {
      const isValid = /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.quickForm.phone);
      if (this.quickForm.phone && !isValid) {
        callback(new Error('请输入合法的手机号'));
      } else {
        callback();
      }
    };
    const ageValidate = (rule, valu2, callback) => {
      if (!this.date.age && !this.date.month && !this.date.birth) {
        callback(new Error('请至少输入一个年龄'));
      } else {
        callback();
      }
    };
    return {
      sections: [],   // 科室列表
      doctors: [],     // 医生列表
      payList: [],    // 挂号列表
      feeList: [],    // 诊金列表
      regType: [  // 挂号类别
        {
          name: '普通',
          value: '1',
        },
        {
          name: '主治',
          value: '2',
        },
        {
          name: '主任',
          value: '3',
        },
        {
          name: '免收诊金',
          value: '4',
        },
        {
          name: '专家号',
          value: '5',
        },
      ],
      quickForm: {  // 快速接诊
        name: '',
        patientid: '',
        phone: '',
        gender: 1,
        deptid: '',  // 科室
        doctorid: '',   // 医生
        card_num: '',
        // feeid: '',      // 就诊类型（诊金）
        clinicType: '0',   // 就诊类型
        bkc368: '1',
        zhenjinid: '',
        szsbcardid: '',   // 个人电脑号
      },
      oldCustomer: false,  // 是否老用户
      Interval: null,    // 计时器
      date: {
        age: '',
        month: '',
        birth: '',
      },
      quickRules: { // 快速接诊规则
        name: [
          { required: true, message: '请输入客户姓名', trigger: 'change' },
        ],
        phone: [
          { validator: mobileValidate, trigger: 'blur' },
        ],
        age: [
          { validator: ageValidate, trigger: 'blur' },
        ],
        month: [
          { validator: ageValidate, trigger: 'blur' },
        ],
        birth: [
          { validator: ageValidate, trigger: 'blur' },
        ],
        deptid: [
          { required: true, message: '请选择就诊科室', trigger: 'change' },
        ],
        doctorid: [
          { required: true, message: '请选择就诊医生', trigger: 'change' },
        ],
        // feeid: [
        //   { required: true, message: '请选择挂号费', trigger: 'change' },
        // ],
        zhenjinid: [
          { required: true, message: '请选择诊金', trigger: 'change' },
        ],
      },
      timeout: null,  // 联想时钟
      cardReading: false,  // 读卡
      feeObj: {
        regist_id: '',  // 挂号id
        chargitem_id: 'aa',  // 诊所设置中的收费项的id
        item_type: 7,      // 0-未知， 1挂号、2处方、3检查项、4耗材、5门诊购药、6其他
        name: '',         // 收费项目名称
        total: 1,         // 开具的数量
        price: 0,  // 单价
        total_price: 0,    // 总价
        status: 0,      // 状态，0-已保存未收费，1-已收费,2-已使用
      },
      save_doctorId: '',
      save_deptId: '',
    };
  },
  methods: {
    getDeptid() {  // 获取科室
      httpServerNormal(getDeptList, {
        disabled: 0,
        can_appoint: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          res = res && res.length ? res : [];
          this.sections = res.filter((val) => {
            return val.disabled === 0;
          });
          // 默认选科室
          const deptObj = this.sections.find((val) => {
            return val.dept_id === this.user.dept_id;
          });
          this.quickForm.deptid = deptObj ? this.user.dept_id : '';
          this.save_deptId = deptObj ? this.user.dept_id : '';
          // 默认选科室
        }
      });
    },
    getDoctor() {  // 获取医生
      httpServerNormal(getDocList, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (!res.items) {
            this.$message({ type: 'warning', message: '诊所医生为空', showClose: true, duration: 1000 });
            return;
          }
          this.doctors = res.items.filter((val) => {
            return val.disabled === 0;
          });
          // 默认选医生
          const userObj = this.doctors.find((val) => {
            return val.userid === this.user.userid;
          });
          this.quickForm.doctorid = userObj && this.usefulDoctor.length ? this.user.userid : '';
          this.save_doctorId = userObj && this.usefulDoctor.length ? this.user.userid : '';
          // 默认选医生
        }
      });
    },
    getPayList() {  // 获取收费项目
      Promise.all([httpServerNormal(getChargitemList, { disabled: 0, type: 1 }), httpServerNormal(getChargitemList, { disabled: 0, type: 7 })]).then((result) => {
        if (result[0]) {
          this.payList = this.payList.concat(result[0]);
        }
        if (result[1]) {
          this.feeList = this.payList.concat(result[1]);
        }
      });
    },
    querySearchAsync(queryString, cb) { // 模糊搜索
      clearTimeout(this.timeout);
      httpServerNormal(patientSearch, {
        keyword: queryString,
        pageindex: 0,
        pagesize: 15,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          if (!res) {  // 联想无则返回空
            cb([]);
          } else {
            cb(res.entity);
          }
        } else { // code错误需要进行的操作
          cb([]);
        }
      });
    },
    quickAdd() {  // 快速接诊挂号
      httpServerNormal(registFast, {
        ...this.quickForm,
        birthdate: jsTimestampFilter(this.date.birth),
        card_num: this.quickForm.szsbcardid ? this.quickForm.szsbcardid : '',
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.$message({ message: '挂号成功', type: 'success', showClose: true, duration: 1000 });
          this.feeObj.clinic_id = this.clinic;
          this.feeObj.doctor = this.user.truename || this.user.phone;
          this.feeObj.doctorid = this.user.userid;
          this.feeObj.regist_id = res.registid;
          this.save_Chargitem();
          this.cancelQuick(1); //
        }
      });
    },
    getChargeItemMsg(val) {
      this.feeObj.name = val.name;
      this.feeObj.chargitem_id = val.item_id;
      this.feeObj.price = val.price;
      this.feeObj.total_price = val.price;
    },
    save_Chargitem() {  // 保存诊金项目
      httpServerNormal(saveChargitem, {
        items: [this.feeObj],
      }).then((res) => {
        if (typeof res === 'string' && res.includes('ERRORCODE')) {
          this.$message({ message: '诊金提交失败', type: 'error', showClose: true, duration: 1000 });
        }
      });
    },
    resetForm(formName) {  // 重置快速接诊表单
      this.$refs[formName].resetFields();
      this.date.age = '';
      this.date.month = '';
      this.date.birth = '';
      this.quickForm.patientid = '';
      this.quickForm.szsbcardid = '';
      this.oldCustomer = false;
      // 带出默认医生和科室
      this.quickForm.deptid = this.save_deptId;
      this.quickForm.doctorid = this.save_doctorId;
    },
    handleSelect(item) {  // 联想选择事件
      this.oldCustomer = true;
      // this.date.age = item.age;
      this.quickForm.patientid = item.patientid;
      this.quickForm.gender = item.gender;
      this.quickForm.phone = item.phone + '';
      this.date.birth = new Date(item.birthdate.replace(/-/g, '/'));
      this.$refs.preAge.calculateBirth2();  // 调用子组件事件计算年龄
    },
    cancelQuick(flag) {  // 取消挂号
      this.resetForm('quickForm');
      this.$emit('closeRegistWin', flag);
    },
    openReadingCard() {  // 打开读卡窗口
      this.cardReading = true;
    },
    closeReadingCard(val, flag) {  // 关闭读卡窗口
      this.cardReading = false;
      if (!flag) {
        return;
      }
      this.resetForm('quickForm');
      this.quickForm.name = val.aac003;  // 姓名
      this.quickForm.gender = +val.aac004;  // 性别
      this.quickForm.szsbcardid = val.aac999;   // 个人电脑号
      this.date.birth = new Date(dateChange(val.aac006));  // 生日
      this.$refs.preAge.calculateBirth2();  // 调用子组件事件计算年龄
      let canbao = '';
      if (val.aac008 === '1') {
        canbao = '正常参保';
      } else if (val.aac008 === '2') {
        canbao = '暂停参保';
      } else if (val.aac008 === '3') {
        canbao = '终止参保';
      } else {
        canbao = '未知';
      }
      let str = '';
      val.outputlist2 = val.outputlist2.length ? val.outputlist2 : [];
      val.outputlist2.forEach((val) => {
        const obj = BCC334.find((val2) => {
          return val2.key === val.bcc334;
        });
        if (obj) {
          str += obj.value + ' ';
        }
      });
      this.$alert(`客户：${val.aac003}，年龄：${this.date.age}岁，参保状态：${canbao} <br/> 医保卡余额：${val.aae240}元，<br/> 缴费人员类别：${str}`, '读卡成功！', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: () => {},
      });
    },
    quickFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.quickAdd();    // 请求
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
  },
  created() {
    this.getDeptid();  // 获取科室
    this.getDoctor();  // 获取医生
    this.getPayList();    // 获取收费列表
  },
  computed: {
    ...mapGetters(['user', 'clinic', 'bindSbMsg']),
    usefulDoctor() {
      return this.doctors.filter((item) => {
        return item.deptid === this.quickForm.deptid;
      });
    },
  },
  components: {
    ageComponent, sbLoading,
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

h3 {
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 40px;
  .el-button {
    margin-left: 10px;
  }
}
.el-autocomplete {
  width: 200px;
}
.thinkName{
  border-bottom: 1px solid #ccc;
  line-height: 25px;
  height: 50px;
  .phone {
    color: $mainColor;
  }
}

.el-form-item{
  width: 100%;
  margin-bottom: 10px;
  &.ageInputs{
    // margin-bottom: 0;
  }
  .el-input {
    width: 200px;
  }
}

.clear{
  margin-top: 10px;
  margin-left: 10px;
  color: $mainColor;
  cursor: pointer;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 2px;
  font-size: 20px;
  cursor: pointer;
}

.dialog-footer {
  width: 140px;
  margin: 10px auto;
}

.sbLoadingStyle {
  z-index: 300;
  @include modify_info;
  h3 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  .container>.sbloading {
    margin-top: 20px;
    width: 580px;
  }
}
</style>

