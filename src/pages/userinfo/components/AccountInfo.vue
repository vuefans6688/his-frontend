<template>
  <div class="account_info" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
      <div class="message">
        <div class="header">
          <div class="title">账号资料</div>
          <div class="modify"><a href="javascript:void(0)" @click="modify_message">修改资料</a></div>
        </div>
        <div class="content">
          <div class="detail">
            <div class="label">姓名: </div>
            <div class="value">{{user.truename}}</div>
          </div>
          <div class="detail">
            <div class="label">性别: </div>
            <div class="value">{{user.gender | SexState}}</div>
          </div>
          <div class="detail">
            <div class="label">出生年月: </div>
            <div class="value">{{user.birthday | DateFilter}}</div>
          </div>
          <div class="detail">
            <div class="label">邮箱: </div>
            <div class="value">{{user.email}}</div>
          </div>
          <div class="detail" v-show="user.grade !== 1">
            <div class="label">诊所名称: </div>
            <div class="value">{{clinic_name}}</div>
          </div>
          <!-- 
          <div class="detail" v-show="user.grade !== 1">
            <div class="label">诊所地址: </div>
            <div class="value">{{clinic.addr}}</div>
          </div>  -->
        </div>
      </div>
      <div class="security">
        <div class="header">
          <div class="title">账号安全</div>
        </div>
        <div class="content">
          <div class="detail">
            <div class="label">账号: </div>
            <div class="value">{{user.username}}</div>
          </div>
          <div class="detail">
            <div class="label">密码: </div>
            <div class="value">********</div>
            <div class="modify"><a href="javascript:void(0)" @click="modify_password">修改密码</a></div>
          </div>
          <div class="detail">
            <div class="label">手机号: </div>
            <div class="value">{{user.phone}}</div>
            <div class="modify"></div>
          </div>
          <!-- <div class="detail" v-show="user.grade === 2">
            <div class="label">科室: </div>
            <div class="value">{{user.sectionID}}</div>
          </div>
          <div class="detail" v-show="user.grade === 2">
            <div class="label">权限: </div>
            <div class="value">{{user.rights}}</div>
          </div> -->
        </div>
      </div>
      <div class="modyfy_message modify_info" v-show='modyfy_message_show'>
        <div class="container">
          <div class="close" @click="modify_message_cancel('info')">
            <i class="el-icon-circle-close"></i>
          </div>
          <h1 class="title">修改信息</h1>
          <div class="content">
            <el-form :model="modify_user" :rules="rules_info" ref="info" label-width="100px" label-position="left" size="small">
              <el-form-item label="姓名:" prop="truename">
                <el-input v-model="modify_user.truename"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="phone">
                <el-input v-model="modify_user.phone"></el-input>
              </el-form-item>
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="modify_user.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期:" prop="birth">
                <el-date-picker
                  v-model="modify_user.birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="邮箱:" prop="email">
                <el-input v-model="modify_user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="modify_message_confirm('info')">确定</el-button>
                <el-button round @click="modify_message_cancel('info')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="modyfy_password modify_info" v-show='modyfy_password_show'>
        <div class="container">
          <div class="close" @click="modify_password_cancel('password')">
            <i class="el-icon-circle-close"></i>
          </div>
          <h1 class="title">修改密码</h1>
          <div class="content">
            <el-form :model="modify_pass" :rules="rules_password" ref="password" label-width="100px" label-position="left" size="small">
              <el-form-item label="原密码:" prop="password">
                <el-input v-model="modify_pass.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="newPassword">
                <el-input v-model="modify_pass.newPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码:" prop="newPassword2">
                <el-input v-model="modify_pass.newPassword2" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="modify_password_confirm('password')">确定</el-button>
                <el-button round @click="modify_password_cancel('password')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import { getClinicName, userModify, userModifyPswd } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (!valid) {
        callback(new Error('密码仅接收数字、字母、下划线'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!valid) {
        callback(new Error('密码仅接收数字、字母、下划线'));
      } else {
        if (this.modify_pass.newPassword2 !== '') {
          this.$refs.password.validateField('newPassword2');
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
      } else if (value !== this.modify_pass.newPassword) {
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
    const validateEmail = (rule, value, callback) => {
      if (value && !/^[A-Za-z1-9][A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]{2,}[-.])+[A-Za-z\d]{2,5}([-.][A-Za-z\d]{2,})*$/.test(value)) {
        callback(new Error('邮箱格式错误!'));
      } else {
        callback();
      }
    };
    return {
      fullscreenLoading: false,
      modify_user: {
        truename: '',
        gender: 1,
        phone: '',
        email: '',
        birthday: '',
      },
      rules_info: {
        truename: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' },
        ],
      },
      modify_pass: {
        password: '',
        newPassword: '',
        newPassword2: '',
      },
      rules_password: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码至少8位', trigger: 'blur' },
          { validator: validateOldPass, trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码至少8位', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
        ],
        newPassword2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码至少8位', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
      modyfy_message_show: false,
      modyfy_password_show: false,
      // 诊所名
      clinic_name: '',
    };
  },
  methods: {
    ...mapMutations(['change_token', 'change_user', 'change_clinic']),
    modify_message() {
      this.modyfy_message_show = true;
      this.modify_user.truename = this.user.truename;
      this.modify_user.phone = this.user.phone;
      this.modify_user.email = this.user.email;
      this.modify_user.birthday = this.user.birthday ? new Date(parseInt(this.user.birthday, 10)) : '';
      this.modify_user.gender = this.user.gender;
      // 发送事件销毁父组件scrollBar
      this.$emit('destroyScroll');
    },
    modify_message_cancel(ruleForm) {
      this.modyfy_message_show = false;
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_message_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证成功的处理
          const birth = this.modify_user.birthday ? this.modify_user.birthday.getTime().toString() : '';
          httpServerNormal(userModify, {
            userid: this.user.userid,
            items: [
              {
                name: 'truename',
                newVal: this.modify_user.truename,
              },
              {
                name: 'phone',
                newVal: this.modify_user.phone,
              },
              {
                name: 'gender',
                newVal: this.modify_user.gender.toString(),
              },
              {
                name: 'email',
                newVal: this.modify_user.email,
              },
              {
                name: 'birthday',
                newVal: birth,
              },
            ],
          }).then((res) => {
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              const userinfo = deepcopy(this.user);
              // update info in cache
              userinfo.truename = this.modify_user.truename;
              userinfo.phone = this.modify_user.phone;
              userinfo.email = this.modify_user.email;
              userinfo.birthday = birth;
              userinfo.gender = this.modify_user.gender;
              // change user in cache & in database
              this.change_user(userinfo);
              // reset
              this.$refs[ruleForm].resetFields();
              this.modyfy_message_show = false;
              this.$emit('initScroll');
            }
          });
        } else {
          return false;
        }
      });
    },
    modify_password() {
      this.modyfy_password_show = true;
      this.$emit('destroyScroll');
    },
    modify_password_cancel(ruleForm) {
      this.modyfy_password_show = false;
      // reset
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_password_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 校验密码成功的处理
          httpServerNormal(userModifyPswd, {
            oldpswd: this.MD5(this.modify_pass.password),
            newpswd: this.MD5(this.modify_pass.newPassword),
          }).then((res) => {
            this.$refs[ruleForm].resetFields();
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              // 修改密码成功的回调
              this.modyfy_password_show = false;
              // reset
              this.$emit('initScroll');
            }
          });
        } else {
          return false;
        }
      });
    },
    // 获取诊所名
    getClinicName() {  // 获取诊所名
      httpServerNormal(getClinicName).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.clinic_name = res.clinic_name;
        }
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic']),
    access_msg() {
      return this.stop ? '发送验证码' : `${this.timer}秒后可重新发送`;
    },
  },
  created() {
    if (this.user.grade !== 1) {
      this.getClinicName();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
.account_info{
  position: relative;
  padding: 0 60px 80px 60px;
  .message, .security{
    .header{
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .content{
      padding: 0 0 0 20px;
      width: 100%;
      max-width: 600px;
      .detail{
        display: flex;
        border-bottom: 1px dotted #ccc;
        .label, .value, .modify{
          height: 50px;
          line-height: 50px;
        }
        .label{
          flex: 0 0 60px;
          width: 60px;
          text-align: right;
        }
        .value{
          flex: 5 5 auto;
          padding-left: 20px;
        }
      }
    }
  }
  .message{
    margin-bottom: 60px;
    .header{
      display: flex;
      .title{
        flex: 1 1 auto;
      }
      .modify{
        flex: 2 2 auto;
      }
    }
  }
  .modify_info{
    @include modify_info;
    &.modyfy_message .container{
      min-height: 360px;
    }
    // .el-form-item{
    //   &.access_code{
    //     .el-form-item__content{
    //       .el-input{
    //         width: 90px;
    //       }
    //       .el-button{
    //         position: absolute;
    //         right: 0;
    //         bottom: 0;
    //       }
    //     }
    //   }
    // }
  }
}
</style>
