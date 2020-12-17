<template>
  <div class="navigator">
    <div id="navbar" class="navbar">
      <el-row>
        <el-col :xs="0" :sm="1" :md="2" :lg="4" class="titleBox"><p class="title">{{ClinicName}}</p></el-col>
        <el-col :xs="24" :sm="17" :md="17" :lg="16">
          <el-menu :default-active="main_menu_status" class="el-menu-demo" mode="horizontal" router @select="switchRouter">
            <el-menu-item v-for='(item, index) in permissionList' :index="item.path" :key='index' v-show="permissionLimit(item.index)">{{item.name}}</el-menu-item>
            <el-menu-item index="/navigator/exam">检验管理</el-menu-item>
            <!-- <el-menu-item index="/navigator/mall">商城</el-menu-item> -->
            <!-- <a href="http://www.xty999.com/" target="blank" class='new_window'>云药库</a> -->
          </el-menu>
        </el-col>
        <el-col :xs="0" :sm="6" :md="5" :lg="4">
          <div class="my-notifications">
            <div class="message-wrap">
            </div> 
            <div class="message-wrap">
              <router-link to="/navigator/help" class="message" @click.native="switchRouter('-1')">
                <i class="icon-question"></i>
              </router-link>
            </div>  
            <!-- <div class="message-wrap">
              <router-link to="/navigator/message" class="message" @click.native="switchRouter('-1')">
                <i class="el-icon-message"></i>
                <div class='dot' v-show="hasMessage"></div>
              </router-link>
            </div> -->
            <div class="message-wrap">
              <el-dropdown @command="dropdownCommand">
                <span class="el-dropdown-link">
                  <i class="icon-user-check"></i>  <span class="currentUser">{{showusername}}</span>
                </span>
                <el-dropdown-menu slot="dropdown" trigger="click">
                  <el-dropdown-item v-show="user.grade === 1" command="clinic_list">诊所列表</el-dropdown-item>
                  <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { hasPermission } from '@/utils/hasPermission';
import { logout, clinicInfo } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';
import { MessageBox } from 'element-ui';

export default {
  data() {
    return {
      hasMessage: true,
      ClinicName: '',
    };
  },
  methods: {
    ...mapMutations(['change_token', 'change_user', 'change_clinic', 'change_main_menu_status', 'change_bindSbMsg']),
    dropdownCommand(command) {
      this.switchRouter('');
      switch (command) {
        case 'clinic_list' :
          this.switch_clinic();
          break;
        case 'userinfo' :
          this.switchRouter('-1');
          this.userinfo();
          break;
        case 'logout' :
          this.logout();
          break;
        default:
          break;
      }
    },
    logout() {
      httpServerNormal(logout).then(() => {
        this.change_token('');
        this.change_user('');
        this.change_clinic('');
        this.change_bindSbMsg('');
        // 退出
        this.$router.replace({ path: '/auth/login' });
      }).catch(() => {
        // 退出
        this.change_token('');
        this.change_user('');
        this.change_clinic('');
        this.change_bindSbMsg('');
        this.$router.replace({ path: '/auth/login' });
      });
    },
    userinfo() {
      this.$router.replace({ path: '/navigator/userinfo' });
    },
    switch_clinic() {
      this.change_clinic('');
      this.change_bindSbMsg('');
      this.$router.push({ path: '/administrator' });
    },
    switchRouter(index) {
      this.change_main_menu_status(index);
    },
    permissionLimit(index) {
      return hasPermission(index, this.user.permission);
    },
    getClinicInfo() {
      httpServerNormal(clinicInfo, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 如果账户过期则提示续费
          if (res.clinic.now > res.clinic.stop_time) {
            MessageBox.alert('您的账号已到期, 为不影响系统正常使用, 请及时联系相关业务员续费', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: () => {},
            });
          }
          // 成功的回调( 直接返回data)
          const obj = {
            cardArea: res.clinic.areacode,
            hospitalCode: res.clinic.hospitalcode,
            operatorCode: res.clinic.operatorcode,
            operatorName: res.clinic.operatorname,
            zhihuiybtoken: res.clinic.zhihuiybtoken,
          };
          this.change_bindSbMsg(obj);
        }
      });
    },
    getClinicName() {
      httpServerNormal(clinicInfo, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.ClinicName = res.clinic.name;
        }
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'main_menu_status', 'permissionList']),
    showusername() {
      return this.user.truename || this.user.username;
    },
  },
  created() {
    if (!this.token) {
      this.$router.replace({ path: '/auth/login' });
    } else {
      this.getClinicInfo();
      this.getClinicName();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.navigator{
  overflow: hidden;
  .navbar{
    position: relative;
    background: $mainColor;
    height: 65px;
    .el-row, .el-col{
      height: 100%;
      line-height: 65px;
      h1{
        font-size: 30px;
        font-weight: 600;
      }
    }
    .titleBox{
      display: flex;
      align-items: center;
      .title{
        margin: 0 auto;
        color: #fff;
        text-align: center;
        word-break: break-all;
        font-size: 20px;
        width: 80%;
        line-height: 28px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }
    .el-menu-demo{
      display: flex;
      justify-content: flex-start;
      background: $mainColor;
      border-bottom: 0;
      .el-menu-item{
        background: $mainColor;
        text-align: center;
        flex: 1 1 auto;
        max-width: 150px;
        padding: 0;
        line-height: 65px;
        height: 100%;
        border-bottom: 0;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        &.is-active, &:hover{
          background: rgba(	46,139,87, 0.6);
        }
      }
      .new_window{
        padding: 0 12px;
        background: $mainColor;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        &:hover{
          background: rgba(	46,139,87, 0.6);
        }
      }
    }
    .my-notifications{
      display: flex;
      height: 100%;
      line-height: 65px;
      .message-wrap{
        flex: 1 1 auto;
        height: 100%;
        text-align: center;
        cursor: pointer;
        &:last-child{
            flex: 2;
        }
        .message{
          position: relative;
          padding: 10px;
          .dot{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: red;
            transform: translate(50%, -100%);
          }
        }
        // &:hover{
        //     font-size: 16px;
        // }
        i{
          color: #fff;
          cursor: pointer;
          font-size: 18px;
        }
        .el-dropdown{
          height: 65px;
          width: 100%;
          text-align: center;
          .el-dropdown-link{
            padding: 10px 0;
            line-height: 16px;
            height: 16px;
            color: #fff;
            i, .currentUser{
              display: inline-block;
              font-size: 16px;
              height: 16px;
              vertical-align: middle;
              text-align: left;
            }
          }
        }
      }
    }
  }
  .view{
    position: fixed;
    display: flex;
    top: 65px;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
@media screen and (max-width: 600px) {
  .navigator .navbar .el-menu-demo .el-menu-item{
    font-size: 12px;
  }
}
</style>
