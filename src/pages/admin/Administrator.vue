<template>
  <div class="admin_container" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="header">
        <i class="el-icon-tickets menu_toggle"></i>
        <router-link class="index" to="/administrator">澳考SaaS云诊所</router-link>
        <el-dropdown @command="dropdownCommand">
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>   <span>{{showusername}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showInfo">用户信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div class="admin">
        <div class="left">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                router>
                  <el-menu-item index="/administrator/index">
                      <i class="icon-home3"></i><span>诊所列表</span>
                  </el-menu-item>
                  <el-menu-item index="/administrator/accountInfo">
                      <i class="icon-home3"></i><span>用户信息</span>
                  </el-menu-item>
            </el-menu>
        </div>

        <div class="right">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { logout } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    return {
      fullscreenLoading: false,
    };
  },
  methods: {
    ...mapMutations(['change_token', 'change_user', 'change_clinic', 'change_bindSbMsg']),
    dropdownCommand(command) {
      switch (command) {
        case 'logout' :
          this.logout();
          break;
        case 'showInfo':
          this.showInfo();
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
    showInfo() {
      this.$router.push({ path: '/administrator/accountInfo' });
    },
  },
  computed: {
    ...mapGetters(['user', 'token']),
    showusername() {
      return this.user.truename || this.user.username;
    },
  },
  created() {
    if (!this.token) {
      this.$router.replace({ path: '/auth/login' });
    } else if (this.user.grade !== 1) {
      this.$router.push({ path: '/navigator/registration' });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.admin_container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .header{
        padding: 10px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        font-size: 16px;
        background: $mainColor;
        color: #fff;
        .menu_toggle{
            display: inline-block;
            vertical-align: top;
            width: 60px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
        }
        .index{
            display: inline-block;
            vertical-align: top;
            padding: 0 20px;
            cursor: pointer;
            color: #ffffff;
            border-left: 1px solid #ffffff;
        }
        .el-dropdown{
            position: absolute;
            right: 40px;
            cursor: pointer;
            color: #fff;
            .el-dropdown-link{
                display: inline-block;
                padding: 10px 0;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                i, span{
                    display: inline-block;
                    vertical-align: middle;
                }
                span{
                    width: 60px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .admin{
        display: flex;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
        .left{
            flex: 0 0 160px;
            width: 160px;
            height: 100%;
            .el-menu{
                height: 100%;
                .el-menu-item{
                    i{
                      margin-right: 10px;
                    }
                }
            }
        }
        .right{
          flex: 1 1 auto;
          height: 100%;
          overflow: auto;
        }
    }
}
</style>
