<template>
  <div class="drop">

    <div class="login__body">
      <el-form :model="form_data" ref="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="akc190" prop="akc190">
          <el-input v-model="form_data.akc190" placeholder="请输入门诊流水akc190"></el-input>
        </el-form-item>
        <el-form-item label="ckc618" prop="ckc618">
          <el-input v-model="form_data.ckc618" placeholder="请输入结算业务号ckc618"></el-input>
        </el-form-item>
        <el-form-item label="bke384" prop="bke384">
          <el-input v-model="form_data.bke384" placeholder="请输入医药机构结算业务序列号bke384"></el-input>
        </el-form-item>
        <el-form-item label="aac999" prop="aac999">
          <el-input v-model="form_data.aac999" placeholder="请输入电脑号aac999"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submit('form')" size="small">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { jydrop } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    return {
      form_data: {
        akc190: '',
        ckc618: '',
        bke384: '',
        aac999: '',
      },
      rules: {
        akc190: [
          { required: true, message: '请输入门诊流水akc190', trigger: 'blur' },
        ],
        bke384: [
          { required: true, message: '请输入医药机构结算业务序列号bke384', trigger: 'blur' },
        ],
      },
      loadingInstance: null,
    };
  },
  methods: {
    submit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.open_loading();
          this.send_http_request();
        } else {
          return false;
        }
      });
    },
    send_http_request() {
      httpServerNormal(jydrop, {
        transBody: {
          ...this.form_data,
        },
      }).then((res) => {
        this.close_loading();
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.$message.success('撤销成功!');
          this.reset();
        }
      }).catch(() => {
        this.$message.error('后台服务器异常, 是否开启客户端?');
        this.close_loading();
      });
    },
    open_loading() {
      this.loadingInstance = this.$loading({
        lock: true,
        fullscreen: true,
        text: '加载中, 请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    },
    close_loading() {
      if (this.loadingInstance) {
        this.loadingInstance.close();
        this.loadingInstance = null;
      }
    },
    reset() {
      const akc190 = this.form_data.akc190;
      this.$refs.form.resetFields();
      this.form_data.akc190 = akc190;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.drop{
  .login__body{
    margin: 30px auto;
    padding: 30px 40px;
    width: 60%;
    box-shadow: 10px 10px 5px $color-silver;
    border: 1px solid $color-exlight-silver;
    border-radius: 30px;
  }
}
</style>
