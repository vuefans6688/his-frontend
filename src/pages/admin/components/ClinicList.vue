<template>
<div class="index" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
  <ul class="clinic_list">
    <li class="clinic" @click="create_clinic">
      <img class="icon" src="../img/add.png" />
      <span class="title">创建诊所</span>
    </li>
      <li class="clinic" v-for="clinic in clinic_list" :key="clinic.id" @click="select_clinic(clinic)">
        <img class="icon" src="../img/clinic_avatar.jpg" :title='clinic.name' />
        <span class="title">{{clinic.name}}</span>
      </li>
  </ul>
    <div class="create_clinic" v-show="create_clinic_show">
      <div class="container">
        <div class="close" @click="create_clinic_cancel('clinic')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">创建诊所</h1>

        <div class="content">
          <el-form :model="clinic" ref="clinic" :rules="clinic_rule" label-width="100px" label-position="left" size="small">
            <el-form-item label="诊所名称:" prop="name">
              <el-input v-model="clinic.name"></el-input>
            </el-form-item>
            <el-form-item label="诊所地址:" prop="address">
              <el-input v-model="clinic.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="create_clinic_confirm('clinic')">确定</el-button>
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
import { isNameOrIDRegist } from '@/utils/uniqueLimit';
import { clinicList, clinicAdd, getChargitemList, clinicInfo } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (isNameOrIDRegist(this.clinic_list, -1, 'name', value)) {
        callback(new Error('此名称已被注册，请更换'));
      } else {
        callback();
      }
    };
    return {
      fullscreenLoading: false,
      create_clinic_show: false,
      clinic: {
        name: '',
        address: '',
      },
      clinic_list: [],
      clinic_rule: {
        name: [
          { required: true, message: '请输入诊所名称', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' },
        ],
      },
      chargeItems: [],
    };
  },
  methods: {
    ...mapMutations(['change_clinic', 'change_user', 'change_bindSbMsg']),
    // 获取诊所列表
    getClinicList() {
      httpServerNormal(clinicList).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.clinic_list = res || [];
        }
      });
    },
    select_clinic(clinic) {
      // 获取挂号项列表，若为空，提示完善信息
      this.getItemList(clinic.clinic_id);
      this.change_clinic(clinic.clinic_id); // 存储所选诊所的id
      this.getClinicInfo(); // 获取诊所信息
    },
    create_clinic() {
      this.create_clinic_show = true;
    },
    create_clinic_cancel(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.create_clinic_show = false;
    },
    create_clinic_confirm(ruleForm) {
      // 检验诊所成功的处理
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // loading
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 6000);
          httpServerNormal(clinicAdd, {
            name: this.clinic.name,
            address: this.clinic.address,
          }).then((res) => {
            this.fullscreenLoading = false;
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              // 创建成功的回调
              const newClinic = deepcopy(res);
              this.clinic_list.push(newClinic);
              // reset
              this.$refs[ruleForm].resetFields();
              this.create_clinic_show = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 获取挂号项列表，若为空，提示完善信息
    getItemList(clinic) {
      httpServerNormal(getChargitemList, {
        clinic_id: clinic,
        type: 7,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.chargeItems = res && res.length ? res : [];
          this.isUpdateClinicInfo();
        }
      });
    },
    // 获取诊所信息
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
        }
      });
    },
    // 是否提示完善信息
    isUpdateClinicInfo() {
      if (!this.chargeItems.length) {
        this.$confirm('为方便使用本系统，请先完善诊所信息', '提示', {
          confirmButtonText: '立即维护',
          cancelButtonText: '暂不维护',
          type: 'warning',
          closeOnClickModal: false,
        }).then(() => {
          this.$router.push({ path: '/navigator/settings' });
        }).catch(() => {
          this.$router.push({ path: '/navigator/registration' });
        });
      } else {
        // 如已经维护，则跳转到挂号
        this.$router.push({ path: '/navigator/registration' });
      }
    },
  },
  computed: {
    ...mapGetters(['user', 'token']),
  },
  created() {
    this.getClinicList();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
@import "~@device";
.index{
    .clinic_list{
        padding: 40px 40px 40px 0;
        list-style: none;
        @include clear-float;
        .clinic{
            float: left; 
            padding: 20px;
            margin-left: 40px;
            margin-bottom: 30px;
            width: 160px;
            height: 200px;
            border: 1px solid #ccc;
            cursor: pointer;
            .icon{
                display: block;
                width: 130px;
                height: 130px;
                border: 1px solid #ccc;
                border-radius: 50%;
                margin-left: 50%;
                margin-top: 20px;
                transform: translate(-50%, 0);
            }
            .title{
                display: block;
                margin-top: 30px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .create_clinic{
        @include modify_info;
        .content{
        }
    }
}
</style>
