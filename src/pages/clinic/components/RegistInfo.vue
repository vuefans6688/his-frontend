<template>
  <div class="regist_info" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="admin_info">
      <div class="title">诊所所属人信息</div>
      <div class="content">
        <div class="detail">
          <div class="label">所属人姓名:</div>
          <div class="value">{{owner_name}}</div>
        </div>
        <div class="detail">
          <div class="label">所属人手机:</div>
          <div class="value">{{owner_phone}}</div>
        </div>
      </div>
    </div>
    <div class="clinic_info">
      <div class="title clinic_title">
        <div class="left_title">诊所信息</div> 
        <div class="modify">
          <el-button size='small' type='primary' @click="modify_clinic">修改诊所信息</el-button>
        </div>
      </div>
      <div class="content">
        <div class="detail">
          <div class="label">诊所名称:</div>
          <div class="value">{{clinic_info.name}}</div>
        </div>
        <!-- <div class="detail">
          <div class="label">诊所编号:</div>
          <div class="value">{{clinic_info.clinic_id}}</div>
        </div> -->
        <div class="detail">
          <div class="label">诊所地址:</div>
          <div class="value">{{clinic_info.address}}</div>
        </div>
        <div class="detail">
          <div class="label">注册时间:</div>
          <div class="value">{{clinic_info.create_time | clinicDateFilter}}</div>
        </div>
        <!-- <div class="detail">
          <div class="label">剩余时长:</div>
          <div class="value">{{clinic_info.leftDay}}</div>
        </div> -->
      </div>
    </div>
    <!-- 执照 -->
    <div class="identify identify_info">
      <div class="title clinic_title">
        <div class="left_title">营业执照</div> 
        <div class="modify"><el-button @click='upload_identify' size='small' type='primary'>上传执照</el-button></div>
      </div>
      <div class="content" v-show='avatar'>
        <el-tooltip placement="top" :open-delay='200' effect="light" :offset='-100'>
          <div slot="content" class='avatar_detail'><img :src="avatar"></div>
          <img class='avatar_show' :src="avatar">
        </el-tooltip>
      </div>
    </div>
    <div class="modify_info" v-show="modify_clinic_show">
      <div class="container">
        <div class="close" @click="modify_clinic_cancel('clinic')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">修改诊所信息</h1>
        <div class="content">
          <el-form :model="clinic_modify" :rules="rules_clinic" ref="clinic" label-width="100px" label-position="left" size="small">
            <el-form-item label="诊所名称:" prop="name">
              <el-input v-model="clinic_modify.name"></el-input>
            </el-form-item>
            <el-form-item label="诊所地址:" prop="address">
              <el-input v-model="clinic_modify.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="modify_clinic_confirm('clinic')">确定</el-button>
              <el-button round @click="modify_clinic_cancel('clinic')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 上传执照 -->
    <div class="modify_info" v-if="upload_show">
      <div class="container upload_identity">
        <div class="close" @click="upload_cancel">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">上传诊所执照</h1>
        <div class="content">
          <el-form :model='upload' label-width="100px" label-position="left" size="small">
             <el-form-item label="文件:">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :auto-upload="false" 
                :on-change='selectFile'>
                <img v-if="upload.base64" :src="upload.base64" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item> 
            <el-form-item>
              <el-button type="primary" round @click="upload_confirm" :disabled="uploadDisabled">确定</el-button>
              <el-button round @click="upload_cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { mapGetters } from 'vuex';
import deepcopy from '@/utils/deepcopy';

export default {
  data() {
    return {
      fullscreenLoading: false,
      modify_clinic_show: false,
      upload_show: false,
      clinic_modify: {
        name: '',
        address: '',
      },
      rules_clinic: {
        name: [
          { required: true, message: '请输入诊所名称', trigger: 'blur' },
          { max: 64, message: '诊所名称长度不超过64位', trigger: 'blur' },
        ],
      },
      clinic_info: {},
      owner_name: '',
      owner_phone: '',
      base64: '',
      upload: {
        base64: '',
        data: '',
        file: {},
      },
      avatar: '',
      uploadDisabled: false,
    };
  },
  methods: {
    modify_clinic() {
      this.modify_clinic_show = true;
      this.clinic_modify.name = this.clinic_info.name;
      this.clinic_modify.address = this.clinic_info.address;
      this.$emit('destroyScroll');
    },
    modify_clinic_cancel(ruleForm) {
      this.modify_clinic_show = false;
      // reset
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_clinic_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 6000);
          this.$http.post('/service/clinic/modify', {
            head: {
              msgid: '',
              lastnotice: 0,
              accessToken: this.token,
            },
            body: {
              clinic_id: this.clinic_info.clinic_id,
              items: [
                {
                  name: 'name',
                  newVal: this.clinic_modify.name,
                },
                {
                  name: 'address',
                  newVal: this.clinic_modify.address,
                },
              ],
            },
          }).then((response) => {
            this.fullscreenLoading = false;
            const res = response.data;
            if (res.errcode === 0) {
              // 修改成功的处理
              // update clinic message
              this.clinic_info.name = this.clinic_modify.name;
              this.clinic_info.address = this.clinic_modify.address;
              // reset
              this.$refs[ruleForm].resetFields();
              // hide panle
              this.modify_clinic_show = false;
              this.$emit('initScroll');
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
        } else {
          return false;
        }
      });
    },
    // file reset
    file_reset() {
      this.upload.base64 = '';
      this.upload.data = '';
      this.upload.file = {};
      this.uploadDisabled = false;
    },
    // 弹出文件上传框
    upload_identify() {
      this.upload_show = true;
      this.$emit('destroyScroll');
    },
    // 取消上传
    upload_cancel() {
      this.upload_show = false;
      this.$emit('initScroll');
      this.file_reset();
    },
    // 获取文件
    selectFile(file) {
      // 限制类型和大小
      const isPIC = /\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/.test(file.name);
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isPIC) {
        this.$message.error({
          message: '仅支持gif,jpg,jpeg,png,bmp 图片上传',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      if (!isLt4M) {
        this.$message.error({
          message: '图片大小不超过4M',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      this.upload.file = deepcopy(file);
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onloadend = () => {
        this.upload.base64 = reader.result;
        this.upload.data = reader.result.split(',')[1];
      };
    },
    upload_confirm() {
      if (!this.upload.base64) {
        this.$message.error({
          message: '请选择文件',
          duration: 1000,
          showClose: true,
        });
        return;
      }
      // 点击后禁用 防止再次上传
      this.uploadDisabled = true;
      this.$http.post('/service/clinic/upload_file', {
        body: {
          clinic_id: this.clinic,
          source_name: this.upload.file.name,
          use_type: 0,
          data: this.upload.data,
        },
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
      }).then((response) => {
        const res = response.data;
        if (res.errcode === 0) {
          this.$message.success({
            message: '执照上传成功',
            duration: 1000,
            showClose: true,
          });
          this.avatar = res.data.file_url;
        } else {
          this.$message.error({
            message: res.errmsg,
            duration: 1000,
            showClose: true,
          });
        }
        this.upload_cancel();
      }).catch(() => {
        this.$message.error({
          message: '执照上传失败',
          duration: 1000,
          showClose: true,
        });
        this.upload_cancel();
      });
    },
    // 获取执照
    getIdentity() {
      this.$http.post('/service/clinic/file_info', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          use_type: 0,
        },
      }).then((res) => {
        if (res.data.errcode === 0 && res.data.data) {
          this.avatar = res.data.data.file_url;
        }
      });
    },
  },
  computed: {
    ...mapGetters(['user', 'clinic', 'token', 'clinic']),
  },
  filters: {
    clinicDateFilter(str1) {
      const str = str1 + '';
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
  },
  created() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 6000);
    this.$http.post('/service/clinic/info', {
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
        this.clinic_info = res.data.clinic;
        this.owner_name = res.data.owner_name;
        this.owner_phone = res.data.owner_phone;
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
      this.$message.error({
        message: '获取诊所信息失败',
        duration: 1000,
        showClose: true,
      });
    });
    // 获取执照
    this.getIdentity();
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
.regist_info{
  padding: 30px 40px;
  .admin_info, .clinic_info, .identify_info {
    .title{
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      &.clinic_title{
        display: flex;
        line-height: 40px;
        .left_title{
          flex: 1 1 auto;
        }
        .modify{
          flex: 2 2 auto;
        }
      }
    }
    .content{
      padding: 20px 40px;
      width: 100%;
      max-width: 600px;
      .avatar_show{
        width: 120px;
        height: 120px;
        margin-left: 100px;
        cursor: pointer;
      }
      .detail{
        display: flex;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px dotted #ccc;
        .label{
          flex: 0 0 100px;
          width: 100px;
        }
        .value{
          flex: 1 1 auto;
        }
      }
    }
  }
  .admin_info{
    margin-bottom: 60px;
  }
  .modify_info{
    @include modify_info;
    .content{
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 30px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        outline-width: 0px;  
        vertical-align: top;
        display: inline-block;
      }
    }
  }
}
.avatar_detail{
  max-width: 640px;
  max-height: 480%;
  img{
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
