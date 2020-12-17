<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" size="small">

      <el-form-item label="医疗机构编码" prop="hospitalcode">
        <el-input v-model="ruleForm.hospitalcode"></el-input>
      </el-form-item>

      <el-form-item label="所在区域编码" prop="areacode">
        <el-input v-model="ruleForm.areacode" placeholder="当前系统社保接入区域只支持深圳市:440300"></el-input>
        <!-- <span class="tipMsg">当前系统社保接入区域只支持深圳市</span> -->
      </el-form-item>

      <el-form-item label="操作员账号" prop="operatorcode">
        <el-input v-model="ruleForm.operatorcode" :maxlength="10"></el-input>
      </el-form-item>


      <el-form-item label="操作员姓名" prop="operatorname">
        <el-input v-model="ruleForm.operatorname" :maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="智慧医保密钥" prop="zhihuiybtoken">
        <el-input v-model="ruleForm.zhihuiybtoken"></el-input>
      </el-form-item>

      <el-form-item align="center" class="btn" label-width="0" >
        <!-- v-if="isBind" -->
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">{{ isBind ? '绑 定' : '修 改'}}</el-button>
        <el-button type="primary" size="small" @click="cancelBindSb">解除社保绑定</el-button>
      </el-form-item>
      
    </el-form>

    <booking-query :bookingList="bookingList"></booking-query>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
// his
import { bindSzsb, bookingStatus, clinicInfo } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import connectionTest from '@/common/js/connection';
import bookingQuery from './BookingQuery';

export default {
  data() {
    const operatorcodeValidate = (rule, value, callback) => {
      // const valid = /^[a-zA-z]\w{3, 10}$/.test(value);
      const valid = /^[a-zA-Z0-9]{3,}$/.test(value);
      if (!valid) {
        callback(new Error('账号需3位以上数字或字母'));
      } else {
        callback();
      }
    };
    const areacodeValidate = (rule, value, callback) => {
      // const valid = /^[a-zA-z]\w{3, 10}$/.test(value);
      if (value !== '440300') {
        callback(new Error('当前系统社保接入区域只支持深圳市:440300'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        hospitalcode: '',
        areacode: '440300',
      },
      rules: {
        hospitalcode: [
          { required: true, message: '请输入医疗机构编码', trigger: 'change' },
        ],
        operatorcode: [
          { validator: operatorcodeValidate, trigger: 'blur' },
          // { required: true, message: '请输入操作员账号', trigger: 'change' },
          // { min: 3, max: 10, message: '账号长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        areacode: [
          { validator: areacodeValidate, trigger: 'blur' },
        ],
        operatorname: [
          { required: true, message: '请输入操作员姓名', trigger: 'change' },
          { min: 2, max: 10, message: '姓名长度在 2 到 10 个字符', trigger: 'blur' },
        ],
        zhihuiybtoken: [
          { required: true, message: '请输入操作员姓名', trigger: 'change' },
        ],
      },
      bookingList: [],  // 预约状态
      isBind: true,
    };
  },
  methods: {
    ...mapMutations(['change_bindSbMsg']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bindSb();
        } else {
          this.$message({ message: '请按要求填写相关信息', type: 'warning', showClose: true, duration: 1500 });
          return false;
        }
      });
    },
    cancelBindSb() {
      httpServerNormal(bindSzsb, {
        items: [
          {
            name: 'hospitalcode',
            newVal: '',
          },
        ],
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.$message.success({
            message: '社保解绑成功',
            duration: 1000,
            showClose: true,
          });
          this.change_bindSbMsg('');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getClinicInfo() {
      httpServerNormal(clinicInfo, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.ruleForm = res.clinic;
          if (res.clinic.hospitalcode) {
            this.isBind = false;
            this.requestClient();  // 绑定则测试连接
          }
        }
      });
    },
    bindSb() {
      httpServerNormal(bindSzsb, {
        items: [
          {
            name: 'hospitalcode',
            newVal: this.ruleForm.hospitalcode,
          },
          {
            name: 'areacode',
            newVal: this.ruleForm.areacode,
          },
          {
            name: 'operatorcode',
            newVal: this.ruleForm.operatorcode,
          },
          {
            name: 'operatorname',
            newVal: this.ruleForm.operatorname,
          },
          {
            name: 'zhihuiybtoken',
            newVal: this.ruleForm.zhihuiybtoken,
          },
        ],
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.$message.success({
            message: '绑定社保信息成功',
            duration: 1000,
            showClose: true,
          });
          this.change_bindSbMsg({
            cardArea: this.ruleForm.areacode,
            hospitalCode: this.ruleForm.hospitalcode,
            operatorCode: this.ruleForm.operatorcode,
            operatorName: this.ruleForm.operatorname,
            zhihuiybtoken: this.ruleForm.zhihuiybtoken,
          });
          this.requestClient();   // 测试连接
        }
      });
    },
    async requestClient() {
      const flag = await connectionTest();
      if (flag === '1') {
        console.log('调用社保其他接口');
        this.bookingStatus(); // 调用定点医药机构约定信息查询
      }
    },
    bookingStatus() {  // 定点医药机构约定信息查询
      httpServerNormal(bookingStatus, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          console.log('bookingStatus', res);
          this.bookingList = res.transBody.outputlist ? res.transBody.outputlist : [];
        }
      });
    },
  },
  created() {
    this.getClinicInfo();
  },
  components: {
    bookingQuery,
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 820px;
  padding: 20px 0;
  .tipMsg {
    font-size: 12px;
    color: red;
  }
  .btn {
    margin-top: 40px;
  }
}

</style>
