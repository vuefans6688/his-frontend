<template>
  <div class="print_setting">
      <div class="prescription setting">
          <div class="title">处方设置</div>
          <div class="content">
              <div class="detail">
                  <span class="label">抬头: </span>
                  <span>{{print_setting.header_prescription | isSetHeader(clinic.name)}}</span>
              </div>
              <div class="detail">
                  <span class="label">是否打印医生姓名: </span>
                  <span>{{print_setting.isPrintDocotr | yesOrNoFilter}}</span>
              </div>
          </div>
          <div class="footer">
              <a @click="modify_prescription">修改</a>
          </div>
      </div>
      <div class="receipt setting">
          <div class="title">小票设置</div>
          <div class="content">
              <div class="detail">
                  <span class="label">抬头: </span>
                  <span>{{print_setting.header_receipt | isSetHeader(clinic.name)}}</span>
              </div>
              <div class="detail">
                  <span class="label">落款: </span>
                  <span>{{print_setting.footer}}</span>
              </div>
              <div class="detail">
                  <span class="label">是否打印明细: </span>
                  <span>{{print_setting.isPrintDetail | yesOrNoFilter}}</span>
              </div>
          </div>
          <div class="footer">
            <a @click="modify_receipt">修改</a>
          </div>
      </div>
      <div class="modify" v-show="modify_prescription_show">
        <div class="container">
            <div class="close" @click="modify_prescription_cancel('print_prescription')">
                <i class="el-icon-circle-close"></i>
            </div>
            <h1 class="title">处方设置</h1>
            <div class="content">
                <el-form :model="modify_print" ref="print_prescription" label-width="140px" label-position="left" size="small">
                    <el-form-item label="抬头:" prop="header_prescription" :rules="{ required: true, message: '请输入处方抬头', trigger: 'blur' }">
                        <el-input v-model="modify_print.header_prescription"></el-input>
                    </el-form-item>
                    <el-form-item label="是否打印医生姓名:" prop="isPrintDocotr">
                        <el-radio-group v-model="modify_print.isPrintDocotr">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" round @click="modify_prescription_confirm('print_prescription')">确定</el-button>
                        <el-button round @click="modify_prescription_cancel('print_prescription')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
      </div>
      <div class="modify" v-show="modify_receipt_show">
        <div class="container">
            <div class="close" @click="modify_receipt_cancel('print_receipt')">
                <i class="el-icon-circle-close"></i>
            </div>
            <h1 class="title">小票设置</h1>
            <div class="content">
                <el-form :model="modify_print" ref="print_receipt" label-width="140px" label-position="left" size="small">
                    <el-form-item label="抬头:" prop="header_receipt" :rules="{ required: true, message: '请输入小票抬头', trigger: 'blur' }">
                        <el-input v-model="modify_print.header_receipt"></el-input>
                    </el-form-item>
                    <el-form-item label="落款:" prop="footer" :rules="{ required: true, message: '请输入小票落款', trigger: 'blur' }">
                        <el-input v-model="modify_print.footer"></el-input>
                    </el-form-item>
                    <el-form-item label="是否打印明细:" prop="isPrintDetail">
                        <el-radio-group v-model="modify_print.isPrintDetail">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" round @click="modify_receipt_confirm('print_receipt')">确定</el-button>
                        <el-button round @click="modify_receipt_cancel('print_receipt')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      modify_print: {
        header_receipt: '',   // 小票抬头
        header_prescription: '',      // 处方抬头
        footer: '谢谢惠顾！祝您健康！',     // 落款
        isPrintDocotr: false,         // 是否打印医生
        isPrintDetail: false,         // 是否打印明细
      },
      modify_prescription_show: false,
      modify_receipt_show: false,
    };
  },
  methods: {
    ...mapMutations(['set_print_setting']),
    // 处方设置
    modify_prescription() {
      this.modify_print.header_prescription = this.print_setting.header_prescription
      || this.clinic.name;                                      // 若没有设置抬头，默认显示诊所名
      this.modify_print.isPrintDocotr = this.print_setting.isPrintDocotr || false;
      this.modify_prescription_show = true;
      this.$emit('destroyScroll');
    },
    modify_prescription_cancel(ruleForm) {
      this.modify_prescription_show = false;
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_prescription_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.modify_prescription_show = false;
          this.$emit('initScroll');
          // 修改成功的处理
          this.print_setting.header_prescription = this.modify_print.header_prescription;
          this.print_setting.isPrintDocotr = this.modify_print.isPrintDocotr;
          // reset
          this.$refs[ruleForm].resetFields();
          // update message in cache
          this.set_print_setting(this.print_setting);
          // loading
          const loading = this.$loading({
            lock: true,
            text: '修改处方打印设置成功',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
          setTimeout(() => {
            loading.close();
          }, 500);
        } else {
          return false;
        }
      });
    },
    // 小票设置
    modify_receipt() {
      this.modify_print.header_receipt = this.print_setting.header_receipt
      || this.clinic.name;          // 若没有设置抬头，默认显示诊所名
      this.modify_print.footer = this.print_setting.footer;
      this.modify_print.isPrintDetail = this.print_setting.isPrintDetail || false;
      this.modify_receipt_show = true;
      this.$emit('destroyScroll');
    },
    modify_receipt_cancel(ruleForm) {
      this.modify_receipt_show = false;
      // reset
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_receipt_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.modify_receipt_show = false;
          this.$emit('initScroll');
          // 修改成功的处理
          this.print_setting.header_receipt = this.modify_print.header_receipt;
          this.print_setting.footer = this.modify_print.footer;
          this.print_setting.isPrintDetail = this.modify_print.isPrintDetail;
          // reset
          this.$refs[ruleForm].resetFields();
          // update message in cache
          this.set_print_setting(this.print_setting);
          // loading
          const loading = this.$loading({
            lock: true,
            text: '修改小票打印设置成功',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
          setTimeout(() => {
            loading.close();
          }, 500);
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(['clinic', 'print_setting']),
  },
  filters: {
    yesOrNoFilter(flag) {
      return flag ? '是' : '否';
    },
    isSetHeader(header, name) {     // 若没有设置抬头，则默认显示诊所名
      return header || name;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
.print_setting{
    padding: 30px 40px;
    .setting{
        .title{
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
        }
        .content{
            padding: 10px;
            .detail{
                width: 100%;
                max-width: 600px;
                line-height: 50px;
                border-bottom: 1px dotted #ccc;
            }
        }
        .footer{
            padding: 15px 0;
            a{
                cursor: pointer;
            }
        }
    }
    .modify{
        @include modify_info;
    }
}
</style>
