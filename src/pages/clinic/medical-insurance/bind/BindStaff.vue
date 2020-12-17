<template>
  <div>
    <!-- <h3 class="add">
      <i class="el-icon-circle-plus-outline" @click="addWin"> 新增医务人员</i>
    </h3> -->
    <el-button size="mini" type="primary" @click="addWin">新增医务人员</el-button>
    <h3>机构医务人员管理</h3>
    
    
    <el-table :data="tableData" align="center" size="mini" stripe>
      <el-table-column prop="bkc320" label="医务人员编码" align="center"></el-table-column>
      <el-table-column prop="aac003" label="姓名" align="center"></el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ Number(scope.row.aac004) | SexState }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="aac006" label="出生时间" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.aac006 | sbDateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属科室" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.akf001 | deptFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医护人员类别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bka633 | docTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="aae005" label="联系电话" align="center" min-width="100px"></el-table-column>
      <el-table-column prop="acc501" label="工号" align="center"></el-table-column>
      <el-table-column prop="aac007" label="参加工作日期" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.aac007 | sbDateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100px">
        <template slot-scope="scope">
          <!-- {{ scope.row.aa }} -->
          <span @click="modify(scope.row)" class="operation modify">修改</span>
          <!-- <span @click="modify(scope.$index)" class="operation">修改</span> -->
          <span v-if='scope.row.bke155 === "3" || scope.row.bke155 === "4"' class="operation del" @click="reAdd(scope.row)">重新备案</span>
          <span v-else class="operation del" @click="del(scope.row)">注销</span>
        </template>
      </el-table-column>
    </el-table>


   <!-- 遮罩层 -->
    <!-- <el-dialog :title="staffStatus ? '新建医务人员' : '编辑医务人员'" :visible.sync="dialogVisible" :modal-append-to-body="false" center :close-on-click-modal="false" width="1200px">
      <StaffForm :ruleForm="ruleForm"></StaffForm>
    </el-dialog> -->

    <div class="dialog" v-show="dialogVisible">
      <div class="container">
        <div class="title" v-text="staffStatus ? '新建医务人员' : '编辑医务人员'"></div>
        <div class="close">
          <i class="el-icon-circle-close" @click="closeWin"></i>
        </div>
        <div class="content">
          <staff-form :ruleForm="ruleForm" @closeWin="closeWin" ref="staffForm" :staffStatus="staffStatus" @changeDoctor="closeWin" :sectionList="sectionList"></staff-form>
        </div>
      </div> 
    </div>

  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { getDeptList, szdoctorListHis, changeDocotorSb, changeDocotorHis, doctorRegistSb } from '@apiNormal';
import { AKF001 } from '@/common/js/dictionary';
import { getCurMonthDays } from '@/utils/ageTransfer';
import deepcopy from '@/utils/deepcopy';
import connectionTest from '@/common/js/connection';
// import StaffForm from './StaffForm';

export default {
  data() {
    return {
      dialogVisible: false,
      staffStatus: true,  // 新增或修改状态:新增为true,修改为false
      tableData: [],
      sectionList: [],
      ruleForm: {
        bka633: '1',
      },
    };
  },
  methods: {
    getDepts() {  // 获取科室
      httpServerNormal(getDeptList, {
        disabled: 0,
        can_appoint: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          res = res && res.length ? res : [];
          const arr = [];
          res.forEach((val) => {
            if (val.szsbcode) {
              arr.push({
                key: val.szsbcode,
                value: val.szsbname,
              });
            }
          });
          this.sectionList = arr;
        }
      });
    },
    addWin() {  // 新增
      this.staffStatus = true;
      this.dialogVisible = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    modify(item) {  // 修改
      this.staffStatus = false;
      this.dialogVisible = true;
      this.ruleForm = deepcopy(item);
      if (item.doctorkey) {
        this.$refs.staffForm.getDoctorPhoto(item.doctorkey);
      }
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    closeWin(flag) { // 关闭模态
      this.dialogVisible = false;
      this.$emit('initScroll');
      this.$refs.staffForm.resetForm();
      if (flag) {
        this.getDoctorList();
      }
    },
    del(item) {
      this.$confirm(`确定注销医务人员(${item.aac003}) ?<p>注销后如需再添加该医生时需重新登记 !</p>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delectDocotorSb(item);
      }).catch(() => {});
    },
    async delectDocotorSb(item) {  // 注销
      const flag = await connectionTest();
      if (flag === '1') {
        httpServerNormal(changeDocotorSb, {
          transBody: {
            listsize: 1,
            inputlist: [
              {
                bkc320: item.bkc320,
                bke155: '3',
              },
            ],
          },
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            this.delectDocotorHis(item, '3');
          }
        });
      }
    },
    delectDocotorHis(item, status) {
      httpServerNormal(changeDocotorHis, {
        doctorKey: item.doctorkey,
        bke155: status,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const msg = status === '3' ? '注销医务人员成功' : '备案成功';
          this.$message({ message: msg, type: 'success', showClose: true, duration: 1500 });
          this.getDoctorList();
        }
      });
    },
    getDoctorList() {  // 获取社保医生
      httpServerNormal(szdoctorListHis, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.tableData = res.record_arr ? res.record_arr : [];
          this.tableData.forEach((val) => {
            val.aac006 += '';
            val.aac007 += '';
            val.aae030 += '';
            // 计算年龄
            const curMonth = parseInt(val.aac006.slice(4, 6), 8);
            const curYear = parseInt(val.aac006.slice(0, 4), 8);
            const daysInMonth = getCurMonthDays(curMonth, curYear);
            let age = new Date().getFullYear() - (val.aac006.slice(0, 4));
            let month = new Date().getMonth() + 1 - (val.aac006.slice(4, 6));
            let day = new Date().getDate() - (val.aac006.slice(6, 8));
            if (day < 0) {
              day = daysInMonth + day;
              month -= 1;
            }
            if (month < 0) {
              month = 12 + month;
              age -= 1;
            }
            val.age = age;
          });
        }
      });
    },
    // 重新备案
    async reAdd(obj) {
      const doctor = deepcopy(obj);
      const connectionStatus = await connectionTest();
      if (connectionStatus !== '1') {
        return;
      }
      if (doctor.bka633 === '1') {   // 选择医师，则删除药师信息
        delete doctor.bkc332;
        delete doctor.bkc333;
        delete doctor.bkc334;
        delete doctor.bkc335;
      } else {
        delete doctor.bkc325;
        delete doctor.ckc304;
        delete doctor.akc055;
        delete doctor.bcc950;
        delete doctor.bcc955;
        delete doctor.bka503;
      }
      doctor.aac006 = Number(doctor.aac006);
      doctor.aac007 = Number(doctor.aac007);
      doctor.aae030 = Number(doctor.aae030);
      // 社保医生注册
      httpServerNormal(doctorRegistSb, {
        transBody: {
          listsize: 1,
          inputlist: [
            {
              ...doctor,
            },
          ],
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.delectDocotorHis(obj, '1');
        }
      });
    },
  },
  components: {
    staffForm: () => import('./StaffForm'),
  },
  created() {
    this.getDepts();
    this.getDoctorList();
  },
  filters: {
    deptFilter(value) {
      const obj = AKF001.find((val) => {
        return val.key === value;
      });
      if (obj) {
        return obj.value;
      }
      return '-';
    },
    docTypeFilter(val) {
      if (val === '1') {
        return '医师';
      }
      return '药师';
    },
    sbDateFilter(val) {
      // return `${val.slice(0, 4)}年${val.slice(4, 5) > 0 ? val.slice(4, 6) : val.slice(5, 6)}月${val.slice(6, 8)}日`;
      return `${val.slice(0, 4)}年${val.slice(4, 6)}月${val.slice(6, 8)}日`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

h3 {
  text-align: center;
  font-weight: 600;
  line-height: 40px;
}
.add {
  i {
    cursor: pointer;
  }
}
.el-table {
  margin-top: 20px;
  .operation {
    cursor: pointer;
    &.modify {
      color: $mainColor;
    }
    &.del {
      margin-left: 10px;
      color: red;    
    }
  }
}


// 模态
.dialog {
  @include modify_info(0.2);
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    text-align: center;
  }
  .container{
    min-width: 900px;
    height: calc(100vh- 200px);
    // max-height: 500px;
    overflow-y: auto;
    .content {
      border-bottom: 0;
    }
  }
}
</style>
