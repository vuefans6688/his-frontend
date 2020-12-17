<template>
  <div class="medsuppliers">
    <div class="header">
      <!-- <span class="">供应商名称:</span>
      <el-input placeholder="" class="search m_l10" v-model="userData.suppliers" size="small"></el-input>
      <span class="m_l10">联系人:</span>
      <el-input placeholder="" class="search m_l10" v-model="userData.contactPerson" size="small"></el-input>
      <el-button  type="primary" class="m_l20" size="small">搜索</el-button> -->
    </div>

    <div class="content">
      <el-button class="addsuppliers" type="primary" @click="modyfy_addmed" size="small">新增供应商</el-button>

      <el-table :data="tableData" style="width: 100%"  stripe>
        <el-table-column type="index" label="序号" width="50" align='center'>
        </el-table-column>
        <el-table-column prop="name" label="供应商名称" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="tel" label="联系人电话" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="phone" label="联系人手机" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="bank" label="银行账号" width="180" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="addr" label="地址" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column label="创建日期" align='center' show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.createtime | aaabbb }}
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注" show-overflow-tooltip align='center'>
        </el-table-column>
        <el-table-column prop="sup_cont" label="操作" align='center'>
          <template slot-scope="scope">
            <span type="text" @click="modyfy_editmed(scope.$index)" style="color:#56bc94; cursor:pointer;" class="m_l10">编辑</span>
            <!-- <span v-if=" scope.row.status == '已启用' " type="text" style="color:red; cursor:pointer;" @click="disable1(scope.$index)" class="m_l10">禁用</span>
            <span type="text" v-else @click="enable1(scope.$index)" style="color:#56bc94; cursor:pointer;" class="m_l10">启用</span> -->
            <span class="el-icon-delete m_l10 cursor" @click="del(scope.row.supplierkey)"></span>
          </template>
        </el-table-column>
      </el-table>
        <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="currentPage" :page-size="15"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
      <!-- 模态框 -->
    <div class="modyfy_addmed" v-show='modyfy_addmed_show'>
      <div class="container_m">
        <div class="header_m">
          <div class="title_m">供应商维护</div>
        </div>
        <div class="close_m">
          <i class="el-icon-circle-close" @click="closemodyfy"></i>
        </div>
        <div class="content_m">
          <el-form class="m_auto " :model="form" :inline="true" :label-position="labelPosition" label-width="100px" :rules="rules" ref="form" stripe>
            <el-form-item label="供应商名称" prop="name">
              <el-input class="w_300" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机" prop="mobphone">
              <el-input class="w_300" v-model="form.mobphone" @keyup.native="limitMobile" :maxlength='11'>
              </el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input class="w_300" v-model="form.man" >
              </el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input class="w_300" v-model="form.tel" :maxlength='13' >
              </el-input>
            </el-form-item>
            <el-form-item label="创建日期">
              <div class="inl_b w_300">
                <el-date-picker type="date" style="width: 100%;" v-model="form.makingtime" readonly></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="银行账号">
              <el-input class="w_300" v-model="form.bank_account" @keyup.native="limitzh" :maxlength='19'>
              </el-input>
            </el-form-item>
            <el-form-item label="供应商地址" >
              <el-input class="w_715" v-model="form.address">
              </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input class="w_715" v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class='btn_group'>
          <el-button type="primary" size="small" @click="allow('form')">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
import { numberLimit } from '@/utils/inputLimit';
import { mapGetters } from 'vuex';

export default {
  data() {
    const mobileValidate = (rule, valu2, callback) => {
      const isValid = /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.form.mobphone);
      if (this.form.mobphone && !isValid) {
        callback(new Error('请输入合法的手机号'));
      } else {
        callback();
      }
    };
    const telValidate = (rule, valu2, callback) => {
      const isValid = /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.form.tel);
      if (this.form.tel && !isValid) {
        callback(new Error('请输入合法的电话号'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      // 分页
      currentPage: 1,
      total: 0,
      pageindex: 0,
      // 模态框
      modyfy_addmed_show: false, // 显示模态框
      labelPosition: 'right', // 右侧对齐
      form: {
        name: '', // 供应商名字
        mobphone: '', // 联系人手机
        man: '', // 联系人
        tel: '', // 联系电话
        bank_account: '', // 银行账号
        address: '', // 供应商地址
        remark: '', // 备注
        makingtime: '', // 创建日期
        addedit: '', // 新增与编辑的标识
        donot: false,
      },
      // supplierkey标识
      supplierkey: '',
      userData: {
        suppliers: '',
        contactPerson: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
        mobphone: [
          { validator: mobileValidate, trigger: 'blur' },
        ],
        tel: [
          { validator: telValidate, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 请求供应商列表
    supplierquerylist() {
      this.$http.post('/service/drug/supplierquerylist', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          pageid: this.pageindex,
          pagesize: 15,
          clinic_id: this.clinic,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.tableData = res.data.data.context;
          this.total = res.data.data.pagecount;
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
        }
      }).catch();
    },
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.supplierquerylist();
    },
    // 删除该供应商
    del(supplierkey) {
      this.$confirm('是否确认删除该供应商信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.post('/service/drug/supplierdel', {
          head: {
            accessToken: this.token,
            lastnotice: 0,
          },
          body: {
            supplierkey: supplierkey,
            clinic_id: this.clinic,
          },
        }).then((res) => {
          if (res.data.errcode === 0) {
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'success',
              message: '删除成功!',
            });
            this.supplierquerylist();
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'error',
              message: res.data.errmsg,
            });
          }
        }).catch();
      }).catch();
    },
    // 新增供应商
    modyfy_addmed() {
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
      this.modyfy_addmed_show = true;
      this.form.makingtime = new Date();
      this.form.name = '';
      this.form.mobphone = '';
      this.form.man = '';
      this.form.tel = '';
      this.form.bank_account = '';
      this.form.remark = '';
      this.form.address = '';
      this.form.addedit = 0;
    },
    // 编辑供应商
    modyfy_editmed(index) {
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
      this.modyfy_addmed_show = true;
      this.form.name = this.tableData[index].name;
      this.form.mobphone = this.tableData[index].phone;
      this.form.man = this.tableData[index].contact;
      this.form.tel = this.tableData[index].tel;
      this.form.bank_account = this.tableData[index].bank;
      this.form.remark = this.tableData[index].note;
      this.form.address = this.tableData[index].addr;
      this.supplierkey = this.tableData[index].supplierkey;
      this.form.addedit = 1;
      const time1 = '20' + this.tableData[index].createtime.toString() + '';
      const year = time1.substring(0, 4);
      const mouth = (Number(time1.substr(4, 2)) - 1).toString();
      const day = time1.substr(6, 2);
      const time2 = new Date(year, mouth, day);
      this.form.makingtime = time2;
    },
    closemodyfy() {
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
      this.modyfy_addmed_show = false;
    },
    // 新增供应商
    allow(formName) {
      // 新增
      if (this.form.addedit === 0) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/service/drug/supplieradd', {
              head: {
                accessToken: this.token,
                lastnotice: 0,
              },
              body: {
                name: this.form.name,
                contact: this.form.man,
                tel: this.form.tel,
                phone: this.form.mobphone,
                bank: this.form.bank_account,
                addr: this.form.address,
                note: this.form.remark,
                status: 1,
                clinic_id: this.clinic,
              },
            }).then((res) => {
              if (res.data.errcode === 0) {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: '保存成功！',
                  type: 'success',
                });
                this.supplierquerylist();  // 新增成功重新请求列表
                this.closemodyfy();
              } else if (res.data.errmsg === '已存在') {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: '该供应商已存在',
                  type: 'warning',
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  type: 'error',
                  message: res.data.errmsg,
                });
              }
            }).catch(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存失败！',
                type: 'warning',
              });
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '请填写未填写的信息',
              type: 'error',
            });
            return false;
          }
        });
      } else {
        // 编辑
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/service/drug/supplierupdate', {
              head: {
                accessToken: this.token,
                lastnotice: 0,
              },
              body: {
                supplierkey: this.supplierkey,
                name: this.form.name,
                contact: this.form.man,
                tel: this.form.tel,
                phone: this.form.mobphone,
                bank: this.form.bank_account,
                addr: this.form.address,
                note: this.form.remark,
                status: 1,
                clinic_id: this.clinic,
              },
            }).then(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存成功！',
                type: 'success',
              });
              this.supplierquerylist();  // 编辑成功重新请求列表
              this.closemodyfy();
            }).catch(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存失败！',
                type: 'warning',
              });
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '请填写未填写的信息',
              type: 'error',
            });
            return false;
          }
        });
      }
    },
    // 只能输入数字
    limitMobile() {
      this.form.mobphone = numberLimit(this.form.mobphone);
    },
    limitzh() {
      this.form.bank_account = numberLimit(this.form.bank_account);
    },
    // 搜索供应商
    // find() {
    //   this.$http.post('/service/drug/supplierquerylist', {
    //     head: {
    //       accessToken: this.token,
    //       lastnotice: 0,
    //     },
    //     body: {
    //       pageid: 0,
    //       pagesize: 13,
    //       clinic_id: this.clinic,
    //       drugname: this.userData.suppliers,
    //       contact: this.userData.contactPerson,
    //     },
    //   }).then((res) => {
    //     if (res.data.errcode === 0) {
    //       this.tableData = res.data.data.context;
    //     } else {
    //       this.$message.error(res.data.errmsg);
    //     }
    //   }).catch((err) => {
    //   });
    // },
  },
  filters: {
    aaabbb(str1) {
      const str = '20' + str1 + '';
      return str.substring(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    },
  },
  created() {
    this.supplierquerylist();
  },
  computed: {
    ...mapGetters(['clinic', 'token']),
  },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.header{
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.content{
  margin: 10px auto 0;
  min-width: 1100px;
  width: 100%;
  padding:0 0 0 10px;
}
.el-message-box__wrapper {
 .el-message-box{
   width: 500px;
 }
}
.lh45{
  line-height: 45px;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
.m_l10{
  margin-left:10px;
}
.search{
  width: 200px;
}
.fr{
  float: right;
}
.modyfy_addmed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(7, 17, 27, 0.5);
    .container_m {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: #fff;
        min-width: 885px;
        .header_m{
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
            .title_m{
                margin-left: 20px;
                font-size: 20px;
                height: 40px;
                line-height: 40px;
            }
        }
        .close_m {
            position: absolute;
            right: 0;
            top: 0;
            padding: 6px;
            font-size: 20px;
            cursor: pointer;
        }
        .content_m {
            padding: 10px 30px;
        }
        .btn_group {
            padding: 10px 30px;
            text-align: left;
        }
    }
}
.inl_b{
  display: inline-block;
}
.w_300{
  width:300px;
}
.w_715{
  width: 715px;
}
.m_auto{
  margin: 20px auto 0;
}
.m_l20{
  margin-left: 20px;
}
.pagination{
  @include pagination_to_bottom;
}
.medsuppliers{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.cursor{
  cursor: pointer;
}
</style>

