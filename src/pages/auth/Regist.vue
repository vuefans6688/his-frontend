<template lang="html">
  <div class="login" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <transition name="regist">
      <div class="login_body" v-show="status">
        <el-form :model="apply" ref="regist" :rules="rules" class="regist_form" size="small">
          <h1 class="title">注册</h1>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="apply.mobile" :maxlength='11' placeholder="请输入手机号" @keyup.enter.native="regist('regist')"></el-input>
          </el-form-item>
          <el-form-item  prop="accessCode" class="access_code">
            <template slot-scope="scope">
                <label><span>*</span> 验证码</label>
                <el-input v-model="apply.accessCode" @keyup.enter.native="regist('regist')"></el-input>
                <el-button @click="sendAccessCode" :disabled="!stop" round>{{access_msg}}</el-button>
            </template>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="apply.password" type="password" @keyup.enter.native="regist('regist')"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordConfirm">
            <el-input v-model="apply.passwordConfirm" type="password" @keyup.enter.native="regist('regist')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="apply.isAgreeUserprotocol">我已阅读并同意 <el-button class='userprotocol' type='text' @click='isShowUserprotocol = true'>"用户注册协议"</el-button></a></el-checkbox>
          </el-form-item>
          <div class="regist_container">
            <el-button round  @click="regist('regist')" size="small" :disabled='!apply.isAgreeUserprotocol'>注册</el-button>
          </div>
          <div class="back">
            <a class="regist" @click="switchLogin">已有账户去登录</a>
          </div>
        </el-form>
    </div>
    </transition>
    <el-dialog
      title="注册成功"
      :visible.sync="registSuccess"
      width="30%"
      :modal-append-to-body='false'
      :before-close="handleClose">
      <h3 class="">恭喜您注册成功</h3>
      <p class="username" v-show="apply.username">您的用户名: {{apply.username}}</p>
      <p class="username">您的注册手机号: {{apply.mobile}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
    <div class="protocol" v-show="isShowUserprotocol">
      <div class="container">
        <div class="close" @click="isShowUserprotocol = false">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">用户注册协议</h1>
        <div class="content">
          <p>本协议是由深圳市澳考科技有限公司 （以下简称“澳考科技”）与所有使用澳考云诊所服务的主体（包括个人、团队等）（以下简称“用户”）
            对澳考云诊所服务的任何服务及相关服务所订立的有效合约。使用澳考云诊所的任何服务即表示接受本协议的全部条款，包括澳考科技对服务
            协议随时所做的任何修改。本服务协议一旦发生变动，将在本网站上公布修改内容。修改后的使用协议一经在网页上公布即有效替代原来的服
            务协议。澳考科技在平台上公布的政策、平台规则均为本协议的补充协议，与本协议具有同等效力。 本协议适用于任何澳考云诊所服务，包
            括本协议期限内的用户所使用的各项服务和软件的升级和更新。 请您仔细阅读本注册协议，您点击“注册”按钮后，本协议即构成对双方有约束
            力的法律
          </p>
          <h3 class='title_2'>一、隐私保护</h3>
          <p>澳考科技将根据行业标准严格对患者信息保密，未经同意我们不会将患者信息及与澳考云诊所系统进行数据交互的非公开内容提供给第三方
            （公司或个人），但以下情况除外：
          </p>
          <p>1、相关法律法规或监管机构、司法机构要求提供用户的个人资料；</p>
          <p>2、国家司法机关符合法律规定并经法定程序的检查及其他操作；</p>
          <p>3、任何第三方盗用、冒用或未经许可擅自披露、使用或对外公开的情况；</p>
          <h3 class='title_2'>二、免责申明</h3>
          <p>1、用户同意使用澳考云诊所系统及其相关服务，是出于用户个人的意愿，并愿意承担因自身意愿而产生的任何风险；</p>
          <p>
            2、澳考云诊所系统基于医生提供的真实准确信息为依据，为医生诊断提供建议；特此声明，澳考云诊所系统所提供的一切建议仅供医生在诊疗
            过程中参考使用，诊疗过程中最终决定权属于医生，因此澳考科技对澳考云诊所系统提出的任何建议导致的包括但不限于误诊、错诊、医疗事故
            等不承担任何法律责任。
          </p>
          <h3 class='title_2'>三、知识产权保护</h3>
          <p>
            澳考云诊所系统提供的服务中包含的任何文本、图片、图形、音频、视频资料和其他知识产权以及商业秘密，均受版权、商标及中国法律法规之
            保护。未经澳考科技相关权利人同意，用户不得将上述资料在任何媒介（包括但不限于媒体、网络、报纸、杂志等）直接或间接发布、播放或被
            用于其它任何商业目的。
          </p>
          <p>
            违反者必须销毁任何已经取得的上述信息、资料、软件或产品，同时，澳考科技保留采用技术、行政及法律手段挽回损
            失的权利，并可依照有关法律规定和澳考相关规定，追究其行政或民事责任，情节严重的，还将提请司法机关追究刑事责任。无论甲方采取何种
            方式追究乙方责任，澳考均有权要求违反者赔偿澳考所受到的实际损失。
          </p>
          <h3 class='title_2'>特别提示：</h3>
          <p>
            用户在使用澳考云诊所系统之前，请确保本人已经完全理解并接受本须知所有条款（尤其免责条款）。一旦用户正式使用，则表明用户已经完全
            理解并接受本须知所有条款。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { login, registSmscode, regist } from '@/serviceNormal/apiNormal';
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
        if (this.apply.passwordConfirm !== '') {
          this.$refs.regist.validateField('passwordConfirm');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!valid) {
        callback(new Error('密码仅接收数字、字母、下划线'));
      } else if (value !== this.apply.password) {
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
    return {
      fullscreenLoading: false,
      registSuccess: false,
      status: false,
      apply: {
        username: '',
        mobile: '',
        accessCode: '',
        password: '',
        passwordConfirm: '',
        isAgreeUserprotocol: true,
      },
      timer: 60,  // 默认倒数60秒
      stop: true,  // 默认是停止的
      Interval: null, // setInterval的对象
      rules: {
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
        passwordConfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码至少8位', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
      // 是否显示用户协议
      isShowUserprotocol: false,
    };
  },
  methods: {
    ...mapMutations(['change_token', 'change_user']),
    switchLogin() {
      this.$router.push({ name: 'Login' });
    },
    handleClose() {
      const loading = this.$loading({
        lock: true,
        text: '正在登录',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      setTimeout(() => {
        loading.close();
        this.registSuccess = false;
        this.login();
      }, 500);
    },
    regist(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证成功的回调
          httpServerNormal(regist, {
            username: this.apply.mobile,
            password: this.MD5(this.apply.password),
            smscode: this.apply.accessCode,
          }).then((res) => {
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              this.registSuccess = true;
            } else {
              this.$refs.regist.resetFields();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 登录
    login() {
      httpServerNormal(login, {
        username: this.apply.mobile,
        password: this.MD5(this.apply.password),
        forceLogin: 0,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
           // 登录成功的回调
          const user = res;
          this.change_token(res.accessToken);   // 设置token、
          this.change_user(user);
          this.$router.push({ path: '/administrator' });
        }
      });
    },
    sendAccessCode() {
      this.$refs.regist.validateField('mobile', (error) => {
        if (error) {
          return;
        }
        // 手机号正确的处理
        this.stop = false;
        this.startTimer();
        // 发送验证码
        httpServerNormal(registSmscode, {
          phone: this.apply.mobile,
        });
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
    access_msg() {
      return this.stop ? '发送验证码' : `${this.timer}秒后可重新发送`;
    },
  },
  mounted() {
    this.status = true;
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
  .login_body{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 80px;
    min-width: 320px;
    z-index: 2;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
    box-shadow: 10px 10px 5px transparentize(#000, .5);
    .regist_form{
      .title{
        margin-bottom: 30px;
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
        .userprotocol{
          font-size: 16px;
          text-decoration: underline;
          color:	#483D8B;
        }
      }
      .regist_container{
        text-align: center;
      }
      .back{
        @include clear-float;
        .regist{
          float: right;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  .regist-enter-active, .regist-leave-active{
    transition: all .8s;
  }
  .regist-enter{
    opacity: 0;
  }
   .protocol{
      @include modify_info;
      overflow: auto;
      .container{
        max-width: 800px;
        top: 60px;
        transform: translate(-50%, 0);
        .title{ font-weight: 600; }
        .content{
          .title_2{
            line-height: 40px;
            font-weight: 600;
          }
          p{
            text-indent: 2em;
          }
        }
      }
    }
}
</style>
