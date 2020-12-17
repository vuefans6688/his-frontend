<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-04-17 14:53:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-27 14:44:30
 -->
<template lang="html">
  <div class="login" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <transition name="login">
      <div class="login__body" v-show="isLogin">
        <el-form :model="login_user" ref="login_user" :rules="rules" class="ligin__form demo-ruleForm" size="small">
          <h1 class="title">欢迎登录澳考SaaS云诊所</h1>
          <el-form-item label="登录账号" prop="username">
            <el-input v-model="login_user.username" placeholder="请输入用户名或手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="login_user.password" @keyup.enter.native="login('login_user')" type="password"></el-input>
          </el-form-item>
          <div class="login_btn">
            <el-button round @click="login('login_user')" size="small">{{loginORforget}}</el-button>
          </div>
          <div class="forget_password">
            <a class="regist" @click="switchRegister">注册</a>
            <a class="forget_btn" @click="forget_pass">忘记密码?</a>
          </div>
        </el-form>
      </div>
    </transition>
    <transition name="find">
      <div class="login__body find__pass" v-show="!isLogin">
        <el-form :model="find_user" ref="find_user" :rules="rules2" class="ligin__form" size="small">
          <h1 class="title">找回密码</h1>
          <el-form-item label="账号" prop="username">
            <el-input v-model="find_user.username" placeholder="机构用户请输入手机号" @keyup.13.native="changePass('find_user')"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="find_user.mobile" :maxlength='11' @keyup.13.native="changePass('find_user')"></el-input>
          </el-form-item>
          <el-form-item  prop="accessCode" class="access_code">
            <template slot-scope="scope">
                <label><span>*</span> 验证码</label>
                <el-input v-model="find_user.accessCode" @keyup.13.native="changePass('find_user')"></el-input>
                <el-button @click="sendAccessCode('find_user')" :disabled="!stop" round>{{access_msg}}</el-button>
            </template>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="find_user.password" type="password" @keyup.13.native="changePass('find_user')"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="passConfirm">
            <el-input v-model="find_user.passConfirm" type="password" @keyup.13.native="changePass('find_user')"></el-input>
          </el-form-item>
          <div class="login_btn">
            <el-button size="small" round  @click="changePass('find_user')">{{loginORforget}}</el-button>
          </div>
          <div class="forget_password">
            <a class="regist" @click="switchLogin">返回登录</a>
          </div>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { login, forgotSmscode, forgotPswd, clinicInfo } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!valid) {
        callback(new Error('密码仅接收数字、字母、下划线'));
      } else {
        if (this.find_user.passConfirm !== '') {
          this.$refs.find_user.validateField('passConfirm');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!valid) {
        callback(new Error('密码仅接收数字、字母、下划线'));
      } else if (value !== this.find_user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value)) {
        callback(new Error('手机号错误!'));
      } else {
        callback();
      }
    };
    const validateUsernameFommat = (rule, value, callback) => {
      const valid = /^[a-zA-Z0-9_]{6,}$/.test(value);
      if (!valid) {
        callback(new Error('用户名仅接受数字、字母或下划线'));
      } else {
        callback();
      }
    };
    return {
      fullscreenLoading: false,
      login_user: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名或手机号', trigger: 'blur' },
          { min: 6, message: '账号最少包含6位', trigger: 'blur' },
          { validator: validateUsernameFommat, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码最少包含8位', trigger: 'blur' },
          { validator: validateUsernameFommat, trigger: 'blur' },
        ],
      },
      rules2: {
        username: [
          { min: 6, message: '用户名至少6位', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateUsernameFommat, trigger: 'blur' },
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        accessCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码至少8位', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
        ],
        passConfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码至少8位', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
      find_user: {
        username: '',
        mobile: '',
        accessCode: '',
        password: '',
        passConfirm: '',
      },
      isLogin: true,
      loginORforget: '登录',
      timer: 60,  // 默认倒数60秒
      stop: true,  // 默认是停止的
      Interval: null, // setInterval的对象
      userinfo: {},
    };
  },
  methods: {
    ...mapMutations(['change_token', 'change_user', 'change_clinic', 'change_bindSbMsg']),
    login(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          httpServerNormal(login, {
            username: this.login_user.username,
            password: this.MD5(this.login_user.password),
            forceLogin: 0,
          }).then((res) => {
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              this.userinfo = res;
              this.change_token(res.accessToken);   // 设置token、
              this.change_user(this.userinfo);
              this.login_success();
            } else if (res === 'ERRORCODE:4' || res === 'ERRORCODE:8') {
              this.login_user.password = '';
            } else {
              this.$refs.login_user.fields[1].resetField();
            }
          });
        } else {
          return false;
        }
      });
    },
    switchRegister() {
      this.$router.push({ name: 'regist' });
    },
    switchLogin() {
      this.isLogin = true;
      this.loginORforget = '登录';
    },
    forget_pass() {
      this.isLogin = false;
      this.loginORforget = '确认修改';
    },
    sendAccessCode(ruleForm) {
      this.$refs.find_user.validateField('username', (error) => {
        if (error) {
          return;
        }
        this.$refs.find_user.validateField('mobile', (error) => {
          if (error) {
            return;
          }
          // 用户名和手机号校验成功
          this.stop = false;
          this.startTimer();
          httpServerNormal(forgotSmscode, {
            username: this.find_user.username,
            phone: this.find_user.mobile,
          }).then((res) => {
            if (typeof res === 'string' && res.indexOf('ERRORCODE') !== -1) {
              this.stop = true;
              this.$refs[ruleForm].resetFields();
            }
          });
        });
      });
    },
    changePass(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        // 验证成功
        if (valid) {
          httpServerNormal(forgotPswd, {
            username: this.find_user.username,
            phone: this.find_user.mobile,
            smscode: this.find_user.accessCode,
            passwd: this.MD5(this.find_user.password),
          }).then((res) => {
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              // success
              const loading = this.$loading({
                lock: true,
                text: '密码修改成功, 正在返回登录',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
              });
              setTimeout(() => {
                loading.close();
                this.switchLogin();
              }, 500);
            } else {
              this.stop = true;
              this.$refs[ruleForm].resetFields();
            }
          });
        } else {
          return false;
        }
      });
    },
    login_success() {
      // 判断何种用户
      if (this.user.grade === 1) {            // 管理员
        this.$router.push({ path: '/administrator' });
      } else {
        // 员工将进入对应诊所页面
        this.change_clinic(this.user.clinic_id);
        // this.getClinicInfo();
        this.$router.push({ path: '/navigator/registration' });
      }
    },
    getClinicInfo() {
      httpServerNormal(clinicInfo, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res.clinic.hospitalcode) {
            this.change_bindSbMsg({
              cardArea: res.clinic.areacode,
              hospitalCode: res.clinic.hospitalcode,
              operatorCode: res.clinic.operatorcode,
              operatorName: res.clinic.operatorname,
              zhihuiybtoken: res.clinic.zhihuiybtoken,
            });
          }
          this.$router.push({ path: '/navigator/registration' });
        }
      });
    },
    runTimer() {
      if (this.timer <= 0) {
        this.timer = 60;
        this.stop = true;
        clearInterval(this.Interval);
      } else {
        this.timer -= 1;
      }
    },
    startTimer() {
      // 如果是false就开始倒计时，如果是true就停止倒计时
      if (!this.stop) {
        this.Interval = setInterval(this.runTimer, 1000);
      } else {
        clearInterval(this.Interval);
      }
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic']),
    access_msg() {
      return this.stop ? '发送验证码' : `${this.timer}秒后可重新发送`;
    },
  },
  mounted() {
    if (this.token) {
      this.login_success();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('./imgs/login_bg.jpg');
  background-size: cover;
  background-position: 50%;
  .login__body {
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translate(0, -50%);
    padding: 40px 80px;
    min-width: 320px;
    z-index: 2;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
    box-shadow: 10px 10px 5px transparentize(#000, 0.5);
    &.find__pass{
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
    .ligin__form{
      .title{
        margin-bottom: 30px;
      }
      .login_btn{
        text-align: center;
      }
      .forget_password{
        margin: 20px 0;
        a{
          cursor: pointer;
        }
        .regist{
          float: left;
        }
        .forget_btn{
          float: right;
        }
      }
      .el-form-item{
        &.access_code{
          .el-form-item__content{
            label{
              display: block;
              span{
                color: red;
              }
            }
            .el-input{
              width: 90px;
            }
            .el-button{
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
  .login-enter-active, .login-leave-active, .find-enter-active, .find-leave-active{
    transition: all 0.8s;
  }
  .login-enter, .login-leave-to, .find-enter, .find-leave-to{
    opacity: 0;
  }
}
</style>
