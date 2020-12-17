<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 14:05:49
 * @LastEditTime: 2019-08-29 15:27:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="employees" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="new_section">
      <el-button size="small" type="primary" @click="modify_employee(-1)">新增账号</el-button>
    </div>
    <div class="employees_list">
      <el-table
        :data="employees"
        style="width: 100%"
        type="index"
        stripe>
        <el-table-column
          align="center"
          prop="username"
          label="登录账号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="truename"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          label="性别">
          <template slot-scope="scope">{{scope.row.gender | SexState}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="电话">
        </el-table-column>
         <el-table-column
          align="center"
          label="科室">
          <template slot-scope="scope">{{scope.row.deptid | sectionFilter(sections)}}</template>
        </el-table-column>
        <el-table-column
          align="center"  class-name="white_nowrap_column" class='rights'
          label="权限">
          <!-- <template slot-scope="scope">{{scope.row.permission | rightsFilter(permissionList)}}</template> -->
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <div class="right_hover">{{scope.row.permission | rightsFilter(permissionList)}}</div>
              <div slot="reference" class="name-wrapper">
                {{scope.row.permission | rightsFilter(permissionList)}}
              </div>
            </el-popover>
          </template>
        </el-table-column> 
        <el-table-column
          label="出生日期"
          align="center">
          <template slot-scope="scope">
            {{scope.row.birthday | DateFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            {{scope.row.disabled | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="modify_employee(scope.$index)">编辑</el-button>
            <el-button v-show="scope.row.disabled === 0" type="text" class="forbid" @click="forbid_employee(scope.$index)" v-if="scope.row.grade !== 1">禁用</el-button>
            <el-button v-show="scope.row.disabled !== 0" type="text" @click="start_employee(scope.$index)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-pagination
      :page-size="employees.length"
      layout="total, prev, pager, next, jumper"
      :total="employees.length">
    </el-pagination> -->
    <div class="modify_employee" v-show="modify_employee_show">
      <div class="container">
        <div class="close" @click="modify_employee_cancel('employee')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">{{oparation}}账号</h1>
        <div class="content">
          <el-form :model="employee" :rules="rules_employee" ref="employee" label-width="100px" size="small">
            <AutoFillPassword></AutoFillPassword>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登录账号:" prop="username">
                  <el-input v-model="employee.username" :disabled="this.action === 'edit'"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名:" prop="truename">
                  <el-input v-model="employee.truename"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="employee.password" type="password" :placeholder="passHolder"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="确认密码:" prop="password_confirm">
                  <el-input v-model="employee.password_confirm" type="password" :placeholder="passHolder"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    v-model="employee.birthday"
                    type="date" :default-value='null'
                    placeholder="选择出生日期" :picker-options='pickerOptions'>
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="employee.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                 <el-form-item label="科室:" prop="deptid">
                  <el-select v-model="employee.deptid">
                    <el-option
                      v-for="item in sections"
                      :key="item.dept_id"
                      :label="item.name"
                      :value="item.dept_id"
                      :disabled="item.disabled !== 0">
                    </el-option>
                  </el-select>
                </el-form-item> 
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机:" prop="phone">
                  <el-input v-model="employee.phone" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证:" prop="idcode">
                  <el-input v-model="employee.idcode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="employee.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="权限:" prop="permission" required>
              <el-checkbox-group v-model="employee.permission">
                <el-checkbox v-for="permission in permissionList" :label="permission.weight" :key="permission.index">{{permission.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="绑定社保医务人员:" prop="sb" label-width="140px" >
              <el-select v-model="employee.szsbdoctorkey" clearable>
                <el-option v-for="(item, index) in sbDoctorList" :key="index" :label="item.aac003" :value="item.doctorkey"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="modify_employee_confirm('employee')">确定</el-button>
              <el-button round @click="modify_employee_cancel('employee')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { isNameOrIDRegist } from '@/utils/uniqueLimit';
import deepcopy from '@/utils/deepcopy';
import { szdoctorListHis } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import AutoFillPassword from '@/components/AutoFillPassword';

export default {
  components: { AutoFillPassword },
  data() {
    const validatePass = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (value) {
        if (!valid) {
          callback(new Error('密码仅接收8位以上数字、字母、下划线'));
        } else {
          this.$refs.employee.validateField('password_confirm');
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      const valid = /^(\w){8,}$/.test(value);
      if (value) {
        if (!valid) {
          callback(new Error('密码仅接收8位以上数字、字母、下划线'));
        } else if (value !== this.employee.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value && !/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value)) {
        callback(new Error('手机号错误!'));
      } else {
        callback();
      }
    };
    const validateRights = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请设置权限'));
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
    const validateUsernameFommat = (rule, value, callback) => {
      const valid = /^[a-zA-Z0-9_]{6,}$/.test(value);
      if (!valid) {
        callback(new Error('用户名仅接受数字、字母或下划线'));
      } else if (isNameOrIDRegist(this.employees, this.index, 'username', this.employee.username)) {
        callback(new Error('此账号已被注册'));
      } else {
        callback();
      }
    };
    const IDCardValidate = (rule, value, callback) => {
      const isValid = /^\d{17}[\d|X]$/.test(value);
      if (value && !isValid) {
        callback(new Error('请输入合法的身份证号'));
      } else {
        callback();
      }
    };
    return {
      fullscreenLoading: false,
      modify_employee_show: false,
      action: '', // 记录是新增还是编辑
      index: -1,  // 记录编辑的行号
      employee: {
        username: '',
        password: '',
        password_confirm: '',
        truename: '',
        idcode: '',
        gender: 1,  // 1表示男， 2表示女
        birthday: '',
        phone: '',
        email: '',
        deptid: '',
        permission: [],
        prescription: 0,  // 是否有权限查看处方
        disabled: 0, // 是否禁用(0表示不禁用)
        szsbdoctorkey: '',  // 社保医生key
      },
      employees: [],
      sections: [],
      rules_employee: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, message: '账号长度不小于6', trigger: 'blur' },
          { validator: validateUsernameFommat, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        password_confirm: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        truename: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone: [
          { validator: validateMobile, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        deptid: [
          { required: true, message: '请分配科室', trigger: 'change' },
        ],
        permission: [
          { validator: validateRights, trigger: 'blur' },
        ],
        idcode: [
          { validator: IDCardValidate, trigger: 'blur' },
        ],
      },
      // 现在日期
      pickerOptions: {
        disabledDate(date) {
          const today = new Date();
          return date.getTime() > new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        },
      },
      sbDoctorList: [],
    };
  },
  methods: {
    ...mapMutations(['change_user']),
    modify_employee(index) {
      if (!this.usefulSections.length) {
        this.$message.error({
          message: '没有可用科室，请先维护科室信息',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      // 新增条目， 密码必输
      if (index === -1) {
        const passCompusory = { required: true, message: '请输入密码', trigger: 'blur' };
        this.rules_employee.password.unshift(passCompusory);
        this.rules_employee.password_confirm.unshift(passCompusory);
      }
      this.index = index;
      this.action = index > -1 ? 'edit' : 'new';
      if (index > -1) {
        this.getUserInfo(index);
      }
      this.modify_employee_show = true;
      this.$emit('destroyScroll');
    },
    modify_employee_cancel(ruleForm) {
      this.modify_employee_show = false;
      // reset
      this.$refs[ruleForm].resetFields();
      if (this.index === -1) {
        this.rules_employee.password.shift();
        this.rules_employee.password_confirm.shift();
      }
      this.$emit('initScroll');
    },
    modify_employee_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证成功的处理
          if (this.action === 'new') {
            this.addNewUser();
          } else if (this.employee.password) {
            this.modifyUser();
          } else {
            this.modifyUser_nopass();
          }
        } else {
          return false;
        }
      });
    },
    start_employee(index) {
      this.changeStatus(index, 0);
    },
    forbid_employee(index) {
      this.$confirm('禁用后将无法使用, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.changeStatus(index, 1);
      }).catch(() => {});
    },
    // http
    getSections() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.$http.post('/service/clinic/dept_list', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
          disabled: 2,    // 2表示获取所有
          can_appoint: 2, // 同上
        },
      }).then((response) => {
        this.fullscreenLoading = false;
        const res = response.data;
        if (res.errcode === 0) {
          this.sections = res.data || [];
        } else {
          this.$message({
            type: 'error',
            message: res.errmsg,
            duration: 1000,
            showClose: true,
          });
        }
      }).catch(() => {
        this.fullscreenLoading = false;
      });
    },
    getEmployees() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.$http.post('/service/clinic/user_list', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
        },
      }).then((response) => {
        this.fullscreenLoading = false;
        const res = response.data;
        if (res.errcode === 0) {
          this.employees = res.data.items || [];
        } else {
          this.$message.error({
            message: res.errmsg,
            duration: 1000,
            showClose: true,
          });
          this.employees = [];
        }
      }).catch(() => {
        this.fullscreenLoading = false;
      });
    },
    addNewUser() {
      // loading
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      const permissionList = this.employee.permission;
      const permission = this.calculatePermission(permissionList);
      const birth = this.employee.birthday ? this.employee.birthday.getTime().toString() : '';
      this.employee.permission = permission;
      this.employee.birthday = birth;
      this.employee.password = this.MD5(this.employee.password);
      delete this.employee.password_confirm;
      this.$http.post('/service/clinic/create_user', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
          ...this.employee,
          ...this.sbDoctorMsg,
        },
      }).then((response) => {
        this.fullscreenLoading = false;
        const res = response.data;
        if (res.errcode === 0) {
          const newEmployee = deepcopy(this.employee);
          this.$set(newEmployee, 'userid', res.data.userid);
          this.employees.push(newEmployee);
          this.$set(this.employee, 'password_confirm', '');
          this.reset();
        } else {
          this.$message.error({
            message: res.errmsg,
            duration: 1000,
            showClose: true,
          });
          this.employee.permission = permissionList;
          this.employee.birthday = birth ? new Date(parseInt(birth, 10)) : '';
          // 此时密码已加密，需重置
          this.employee.password = '';
        }
      }).catch(() => {
        this.$message.error({
          message: '添加人员失败',
          duration: 1000,
          showClose: true,
        });
        this.fullscreenLoading = false;
        this.employee.permission = permissionList;
        this.employee.birthday = birth ? new Date(parseInt(birth, 10)) : '';
        // 此时密码已加密，需重置
        this.employee.password = '';
      });
    },
    getUserInfo(index) {
      // loading
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.$http.post('/service/clinic/user_info', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
          item_id: this.employees[index].userid,
        },
      }).then((response) => {
        this.fullscreenLoading = false;
        const res = response.data;
        if (res.errcode === 0) {
          const emplo = res.data;
          // idcode 去空格
          emplo.idcode = emplo.idcode.replace(/^\s+|\s+$/g, '');
          this.employee = emplo;
          const permission = this.resolvePermission(res.data.permission);
          this.employee.permission = permission;
          this.employee.birthday = new Date(parseInt(res.data.birthday, 10));
        } else {
          this.$message({
            message: res.errmsg,
            duration: 1000,
            showClose: true,
          });
        }
      }).catch(() => {
        this.fullscreenLoading = false;
      });
    },
    modifyUser() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      const permission = this.calculatePermission(this.employee.permission);
      const birth = this.employee.birthday ? this.employee.birthday.getTime().toString() : '';
      this.employee.birthday = birth;
      this.$http.post('/service/clinic/modify_user', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
          item_id: this.employees[this.index].userid,
          items: [
            {
              name: 'passwd',
              newVal: this.MD5(this.employee.password),
            },
            {
              name: 'truename',
              newVal: this.employee.truename,
            },
            {
              name: 'idcode',
              newVal: this.employee.idcode,
            },
            {
              name: 'gender',
              newVal: this.employee.gender + '',
            },
            {
              name: 'birthday',
              newVal: this.employee.birthday,
            },
            {
              name: 'phone',
              newVal: this.employee.phone,
            },
            {
              name: 'email',
              newVal: this.employee.email,
            },
            {
              name: 'dept',
              newVal: this.employee.deptid,
            },
            {
              name: 'permission1',
              newVal: permission + '',
            },
            {
              name: 'szsbdoctorkey',
              newVal: this.employee.szsbdoctorkey,
            },
          ],
        },
      }).then((res) => {
        this.fullscreenLoading = false;
        if (res.data.errcode === 0) {
          this.updateView();
        } else {
          this.$message({
            message: res.data.errmsg,
            duration: 1000,
            showClose: true,
          });
          this.employee.birthday = birth ? new Date(parseInt(birth, 10)) : '';
        }
      }).catch(() => {
        this.fullscreenLoading = false;
      });
    },
    // 不修改密码
    modifyUser_nopass() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      const permission = this.calculatePermission(this.employee.permission);
      const birth = this.employee.birthday ? this.employee.birthday.getTime().toString() : '';
      this.employee.birthday = birth;
      this.$http.post('/service/clinic/modify_user', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
          item_id: this.employees[this.index].userid,
          items: [
            {
              name: 'truename',
              newVal: this.employee.truename,
            },
            {
              name: 'idcode',
              newVal: this.employee.idcode,
            },
            {
              name: 'gender',
              newVal: this.employee.gender + '',
            },
            {
              name: 'birthday',
              newVal: this.employee.birthday,
            },
            {
              name: 'phone',
              newVal: this.employee.phone,
            },
            {
              name: 'email',
              newVal: this.employee.email,
            },
            {
              name: 'dept',
              newVal: this.employee.deptid,
            },
            {
              name: 'permission1',
              newVal: permission + '',
            },
            {
              name: 'szsbdoctorkey',
              newVal: this.employee.szsbdoctorkey,
            },
          ],
        },
      }).then((res) => {
        this.fullscreenLoading = false;
        if (res.data.errcode === 0) {
          this.updateView();
        } else {
          this.$message({
            message: res.data.errmsg,
            duration: 1000,
            showClose: true,
          });
          this.employee.birthday = birth ? new Date(parseInt(birth, 10)) : '';
        }
      }).catch(() => {
        this.fullscreenLoading = false;
      });
    },
    updateView() {
      this.employees[this.index].truename = this.employee.truename;
      this.employees[this.index].gender = this.employee.gender;
      this.employees[this.index].phone = this.employee.phone;
      this.employees[this.index].deptid = this.employee.deptid;
      this.employees[this.index].permission = this.calculatePermission(this.employee.permission);
      this.employees[this.index].birthday = this.employee.birthday;
      // 如果子用户在诊所管理修改自己权限，需更新权限
      if (this.employees[this.index].userid === this.user.userid) {
        const userinfo = deepcopy(this.user);
        userinfo.permission = this.calculatePermission(this.employee.permission);
        userinfo.birthday = this.employee.birthday;
        userinfo.gender = this.employee.gender;
        userinfo.dept_id = this.employee.deptid;
        userinfo.phone = this.employee.phone;
        userinfo.email = this.employee.email;
        this.change_user(userinfo);
      }
      // reset
      this.reset();
    },
    reset() {
      // reset
      this.$refs.employee.resetFields();
      this.modify_employee_show = false;
      if (this.index === -1) {
        this.rules_employee.password.shift();
        this.rules_employee.password_confirm.shift();
      }
      this.$emit('initScroll');
    },
    changeStatus(index, status) {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.$http.post('/service/clinic/modify_user', {
        head: {
          msgid: '',
          lastnotice: 0,
          accessToken: this.token,
        },
        body: {
          clinic_id: this.clinic,
          item_id: this.employees[index].userid,    // 子用户id
          items: [
            {
              name: 'disabled',
              newVal: status + '',
            },
          ],
        },
      }).then((res) => {
        this.fullscreenLoading = false;
        if (res.data.errcode === 0) {
          this.employees[index].disabled = status;
        } else {
          this.$message({
            message: res.data.errmsg,
            duration: 1000,
            showClose: true,
          });
        }
      }).catch(() => {
        this.fullscreenLoading = false;
      });
    },
    calculatePermission(list) {
      let permission = 0;
      list.forEach((element) => {
        permission |= element;
      }, this);
      return permission;
    },
    resolvePermission(permission) {
      const rights = this.permissionList.filter((item) => {
        return (item.weight & permission) !== 0;
      });
      const rightWeight = [];
      rights.forEach((item) => {
        rightWeight.push(item.weight);
      });
      return rightWeight;
    },
    getDoctorList() {  // 获取社保医生
      httpServerNormal(szdoctorListHis, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.sbDoctorList = res.record_arr ? res.record_arr : [];
        }
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic', 'permissionList', 'user']),
    oparation() {
      return this.action === 'edit' ? '编辑' : '新增';
    },
    usefulSections() {
      if (!this.sections) {
        return '';
      }
      return this.sections.filter((section) => {
        return section.disabled === 0;
      });
    },
    passHolder() {
      return this.index > -1 ? '若无需修改密码，此处请留空' : '';
    },
  },
  filters: {
    rightsFilter(permission, list) {
      const rights = list.filter((item) => {
        return (item.weight & permission) !== 0;
      });
      let label = '';
      rights.forEach((item) => {
        label += item.name;
        label += '、';
      });
      return label ? label.substr(0, label.length - 1) : '';
    },
    statusFilter(val) {
      return val === 0 ? '已启用' : '已禁用';
    },
    sectionFilter(id, sections) {
      if (!sections) {
        return '';
      }
      const section = sections.find((section) => {
        return section.dept_id === id;
      });
      return section ? section.name : '';
    },
  },
  created() {
    this.getEmployees();
    this.getSections();
    this.getDoctorList();
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
  .employees{
    position: relative;
    padding: 30px 40px 60px 40px;
    .new_section{
      padding: 10px;
      height: 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }
    .employees_list{
      .el-table .el-table__body-wrapper .el-table__body .el-table__row .cell .el-button{
        padding: 0;
        font-size: 14px;
        &.forbid{
          color: red;
        }
      }
    }
    // .el-pagination{
    //   @include pagination_to_bottom;
    // }
    .modify_employee{
      @include modify_info;
      .container{
        min-width: 460px;
        height: 500px;
      }
      .el-date-editor{
        width: 100%;
      }
    }
  }
  .right_hover{
    max-width: 200px;
  }
</style>
