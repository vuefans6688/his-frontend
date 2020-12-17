<template>
  <div class="clinic" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="new_section">
      <el-button size="small" type="primary" @click="modify_section(-1)">新增科室</el-button>
    </div>
    <div class="sections">
      <el-table
        :data="sections"
        style="width: 100%"
        type="index"
        stripe>
        <el-table-column
          align="center"
          prop="seq_num"
          label="社保编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称">
        </el-table-column>
        <!-- <el-table-column
          label="成员" class-name='white_nowrap_column'
          align="center">
          <template slot-scope="scope">
            {{scope.row.id | sectionMemberFilter(employees) }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center">
          <template slot-scope="scope">
            {{scope.row.create_time | clinicDateFilter}}
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
          label="是否开通挂号"
          align="center">
          <template slot-scope="scope">
            {{scope.row.can_appoint | yesORnoFilter }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify_section(scope.$index)">编辑</el-button>
            <el-button v-show="scope.row.disabled === 0" type="text" class="forbid" @click="forbid_section(scope.$index)">禁用</el-button>
            <el-button v-show="scope.row.disabled !== 0" type="text" @click="start_section(scope.$index)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-pagination
      :page-size="sections.length"
      layout="total, prev, pager, next, jumper"
      :total="sections.length">
    </el-pagination> -->
    <div class="modify_section" v-show="modify_section_show">
      <div class="container">
        <div class="close" @click="modify_section_cancel('section')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">{{this.oparation}}科室</h1>
        <div class="content">
          <el-form :model="section" :rules="rules_section" ref="section" label-width="120px" size="small">
            <el-form-item label="科室编号:" prop="seq_num">
              <el-input v-model="section.seq_num" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="科室名称:" prop="name">
              <el-input v-model="section.name"></el-input>
            </el-form-item> -->
            <el-form-item label="科室名称:" prop="name">
              <template solt-scope='scope'>
                <el-autocomplete popper-class="my-autocomplete" v-model="section.name" :fetch-suggestions="querySearch" placeholder="请选择科室名称" @select="handleSelect">  
                  <!-- <template slot-scope="{item}">
                    <div class="thinkName">
                      {{ item.value }}
                    </div>
                  </template> -->
                </el-autocomplete>
              </template>
            </el-form-item>
            <el-form-item label="是否开通挂号:" prop="can_appoint" required>
              <el-radio-group v-model="section.can_appoint">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="modify_section_confirm('section')">确定</el-button>
              <el-button round @click="modify_section_cancel('section')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { AKF001 } from '@/common/js/dictionary';
import { createDept, modifyDept, getDeptList } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
// import { isNameOrIDRegist } from '@/utils/uniqueLimit';

export default {
  data() {
    // const validateID = (rule, value, callback) => {
    //   const valid = /^(\w)*$/.test(value);
    //   if (!valid) {
    //     callback(new Error('编号仅接收数字、字母、下划线'));
    //   } else if (isNameOrIDRegist(this.sections, this.index, 'seq_num', this.section.seq_num)) {
    //     callback(new Error('此编号已被注册，请更换'));
    //   } else {
    //     callback();
    //   }
    // };
    // const validateName = (rule, value, callback) => {
    //   if (isNameOrIDRegist(this.sections, this.index, 'name', this.section.name)) {
    //     callback(new Error('此名称已被注册，请更换'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      fullscreenLoading: false,
      // pageSize: 15,
      // total: 15,
      modify_section_show: false,
      section: {
        name: '',
        seq_num: '',  // 科室编号
        can_appoint: 1, // 是否开通预约(1表示是)
        szsbcode: '',
        szsbname: '',
      },
      sections: [],
      // selectSection: '',
      sectionNames: AKF001,
      rules_section: {
        seq_num: [
          // { required: true, message: '请输入科室编号', trigger: 'blur' },
          // { validator: validateID, trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入科室名称', trigger: 'change' },
          // { validator: validateName, trigger: 'change' },
        ],
      },
      action: '', // 记录是新增还是编辑
      index: -1,  // 记录编辑的行号
    };
  },
  methods: {
    // currentPageChange() {
    // },
    // 医保科室联想
    querySearch(queryString, cb) {
      const sectionNames = this.sectionNames;
      const results = queryString ? sectionNames.filter(this.createFilter(queryString)) : sectionNames;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (sectionName) => {
        return (sectionName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {  // 联想选择事件
      this.section.name = item.value;
      this.section.seq_num = item.key;
    },
    modify_section(index) {
      this.index = index;
      if (index > -1) {
        this.action = 'edit';
        this.section.seq_num = this.sections[index].seq_num;
        this.section.name = this.sections[index].name;
        this.section.can_appoint = this.sections[index].can_appoint;
      } else {
        this.action = 'new';
      }
      this.modify_section_show = true;
      this.$emit('destroyScroll');
    },
    modify_section_cancel(ruleForm) {
      this.modify_section_show = false;
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    // 创建、编辑科室
    createNewDept() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(createDept, {
        ...this.section,
        szsbcode: this.section.seq_num,
        szsbname: this.section.name,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const newSetion = res;
          // update
          this.sections.push(newSetion);
          // reset
          this.addOReditRESET('section');
        }
      });
    },
    editDept() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(modifyDept, {
        item_id: this.sections[this.index].dept_id,
        items: [
          {
            name: 'seq_num',
            newVal: this.section.seq_num,
          },
          {
            name: 'name',
            newVal: this.section.name,
          },
          {
            name: 'szsbcode',
            newVal: this.section.seq_num,
          },
          {
            name: 'szsbname',
            newVal: this.section.name,
          },
          {
            name: 'can_appoint',
            newVal: this.section.can_appoint + '',
          },
        ],
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // const newSetion = res;
          // update
          this.sections[this.index].seq_num = this.section.seq_num;
          this.sections[this.index].name = this.section.name;
          this.sections[this.index].szsbcode = this.section.szsbcode;
          this.sections[this.index].szsbname = this.section.szsbname;
          this.sections[this.index].can_appoint = this.section.can_appoint;
          // reset
          this.addOReditRESET('section');
        }
      });
    },
    modify_section_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证成功的处理
          if (this.action === 'new') {
            // 新建科室
            this.createNewDept();
          } else {
            // 编辑科室
            this.editDept();
          }
        } else {
          return false;
        }
      });
    },
    start_section(index) {
      this.changeStatus(index, 0);
    },
    forbid_section(index) {
      this.$confirm('禁用后将无法使用, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.changeStatus(index, 1);
      }).catch(() => {});
    },
    changeStatus(index, status) {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(modifyDept, {
        item_id: this.sections[index].dept_id,
        items: [
          {
            name: 'disabled',
            newVal: status + '',
          },
        ],
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.sections[index].disabled = status;
          // reset
          this.addOReditRESET('section');
        }
      });
      // this.$http.post('/service/clinic/modify_dept', {
      //   head: {
      //     msgid: '',
      //     lastnotice: 0,
      //     accessToken: this.token,
      //   },
      //   body: {
      //     clinic_id: this.clinic,
      //     item_id: this.sections[index].dept_id,
      //     items: [
      //       {
      //         name: 'disabled',
      //         newVal: status + '',
      //       },
      //     ],
      //   },
      // }).then((res) => {
      //   this.fullscreenLoading = false;
      //   if (res.data.errcode === 0) {
      //     this.sections[index].disabled = status;
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.data.errmsg,
      //       duration: 1000,
      //       showClose: true,
      //     });
      //   }
      // }).catch(() => {
      //   this.fullscreenLoading = false;
      // });
    },
    addOReditRESET(ruleForm) {
      // reset
      this.$refs[ruleForm].resetFields();
      // hide
      this.modify_section_show = false;
      this.$emit('initScroll');
    },
    getDepts() {  // 获取科室
      httpServerNormal(getDeptList, {
        disabled: 2,    // 2表示获取所有
        can_appoint: 2, // 同上
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          res = res && res.length ? res : [];
          this.sections = res;
        }
      });
    },
  },
  watch: {
    section: {
      handler() {
        const results = this.sectionNames.filter(item => item.value === this.section.name);
        if (results && results.length === 0) {
          this.section.seq_num = '';
        } else {
          this.section.seq_num = results[0].key;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['user', 'token', 'clinic']),
    oparation() {
      return this.action === 'edit' ? '编辑' : '新增';
    },
  },
  filters: {
    yesORnoFilter(flag) {
      return flag ? '是' : '否';
    },
    statusFilter(val) {
      return val === 0 ? '已启用' : '已禁用';
    },
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
    this.getDepts();
    // this.$http.post('/service/clinic/dept_list', {
    //   head: {
    //     msgid: '',
    //     lastnotice: 0,
    //     accessToken: this.token,
    //   },
    //   body: {
    //     clinic_id: this.clinic,
    //     disabled: 2,    // 2表示获取所有
    //     can_appoint: 2, // 同上
    //   },
    // }).then((response) => {
    //   this.fullscreenLoading = false;
    //   const res = response.data;
    //   if (res.errcode === 0) {
    //     this.sections = res.data || [];
    //   } else {
    //     this.$message({
    //       type: 'error',
    //       message: res.errmsg,
    //       duration: 1000,
    //       showClose: true,
    //     });
    //     this.sections = [];
    //   }
    // }).catch(() => {
    //   this.fullscreenLoading = false;
    // });
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";

.clinic{
  position: relative;
  padding: 30px 40px 60px 40px;
  .new_section{
    padding: 10px;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .sections{
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
  .modify_section{
    @include modify_info;
  }
}
.el-autocomplete {
  width: 100%;
}
// .thinkName{
//   // border-bottom: 1px solid #ccc;
//   // height: 50px;
//   line-height: 40px;
// }
</style>
