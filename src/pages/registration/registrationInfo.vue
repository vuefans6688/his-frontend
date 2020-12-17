<template>
  <div>
    <!--挂号查询  -->
    <div class="content">
        <div class="regTitle my_titleInpStyle">
          <DateRangePicker :value='reqData.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
          <span>就诊科室：</span>
          <el-select v-model="reqData.section" size="small" @change='changeDoctor'>
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.name" :value="item.dept_id" v-for='item in sections' :key='item.id'></el-option>
          </el-select>
          <span>医生姓名：</span>
          <el-select ageInput v-model="reqData.doctor" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.truename" :value="item.userid" v-for="(item, index) in usefulDoctor" :key='index'></el-option>
          </el-select>
          <span>客户姓名：</span>
          <input type="text" v-model="reqData.user" class="myInput" placeholder="客户姓名或电话">
          <!-- <el-button type="primary" size="small" @click="getPatientMes">搜索</el-button> -->
          <!-- <a href="javascript:;" id="download" class="download" @click="download" download="download.csv">导出数据</a> -->
        </div>
        <!--table  -->
        <div class="table">
          <el-table :data="RegTable" ref="multipleTable" class="white_nowrap_column" size="medium" stripe>
            <el-table-column align='center' label="序号">
              <template slot-scope="props">
                <span> {{ props.row.index + 1}} </span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align='center'>
            </el-table-column>
            <el-table-column label="性别" align='center' width="80">
              <template slot-scope="props">
                <span> {{ props.row.gender | SexState}} </span>
              </template>
            </el-table-column>
            <el-table-column label="手机号" align='center' min-width="150">
              <template slot-scope="props">
                <span> {{ props.row.phone | undefineFilter}} </span>
              </template>
            </el-table-column>
            <el-table-column label="就诊类型" align='center'>
              <template slot-scope="props">
                <span> {{ props.row.registtype | registtypeFilter }} </span>
              </template>
            </el-table-column>
            <el-table-column label="就诊科室" align='center'>
              <template slot-scope="props">
                <span> {{ props.row.deptid | sectionFilter(sections) }} </span>
              </template>
            </el-table-column>
            <el-table-column label="就诊医生" align='center'>
              <template slot-scope="props">
                <span> {{ props.row.doctor | undefineFilter }} </span>
              </template>
            </el-table-column>
            <el-table-column label="诊金" align='center' min-width="150">
              <template slot-scope="props">
                <span> {{ props.row.feename }} </span>
                <span> {{ props.row.feeprice }}元 </span>
              </template>
            </el-table-column>
            <el-table-column label="登记时间" align='center' min-width="130">
              <template slot-scope="props">
                <span> {{ props.row.createtime }} </span>
              </template>
            </el-table-column>
            <el-table-column label="登记人" align='center'>
              <template slot-scope="props">
                <span> {{ props.row.operator | undefineFilter }} </span>
              </template>
            </el-table-column>
            <el-table-column label="就诊状态" align='center'>
              <template slot-scope="scope">{{ scope.row.registstatus | statusFilter(scope.row.createtime) }}</template>
            </el-table-column>
            <el-table-column label="操作" align='center' min-width="130">
              <template slot-scope="props">
                <span class='operation' @click='refund(RegTable[props.row.index].name, RegTable[props.row.index].registid)' v-if="props.row.registstatus == 1 && props.row.feestatus == 0 && check(props.row.registstatus, props.row.createtime)">退号</span>
                <span class='operation' @click='newPlan(RegTable[props.row.index].registid)'>新建随访计划</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="pageindex" :page-size="15" layout="total, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { jsTimestampFilter } from '@/utils/filters';
import httpServerNormal from '@httpServerNormal';
import { cancelRegist, registList, getDeptList, getDocList } from '@apiNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      RegTable: [],  // 挂号列表数据
      reqData: {
        dateVal: [new Date(), new Date()],   // 日期
        section: '',  // 科室
        doctor: '',
        user: '',
        patientid: '',
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      sections: [],       // 就诊科室
      doctors: [],         // 就诊医生
      pageindex: 1,  // 当前页数
      totalCount: 0,    // 总页数
      Interval: null,  // 计时器名字
    };
  },
  methods: {
    check(state, oldtime) {
      if (state !== 1 || oldtime.split(' ')[0] !== jsTimestampFilter(new Date(), 'yyyyMMdd')) {
        return false;
      }
      return true;
    },
    refund(userName, registid) {  // 退号
      this.$confirm(`是否对 <span style='color: blue;font-size:16px;'>${userName}</span> 进行退号`, '退号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning',
      }).then(() => {
        this.cancelPatient(registid);   // 确定则调用取消挂号
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消', showClose: true, duration: 1000 });
      });
    },
    handleCurrentChange(val) {  // 切换页数
      this.pageindex = val;
      this.getPatientMes();
    },
    cancelPatient(registid) {  // 取消挂号请求
      httpServerNormal(cancelRegist, {
        registid: registid,
        oldstatus: 1,
        newstatus: 4,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          this.getPatientMes();  // 刷新页面
          this.$message({ type: 'success', message: '退号成功!', showClose: true, duration: 1000 });
        }
      });
    },
    getPatientMes() {   // 获取挂号列表
      httpServerNormal(registList, {
        registid: '',
        deptid: this.reqData.section,
        doctorid: this.reqData.doctor,    // 先传医生名字，暂没id
        patientid: this.reqData.patientid,
        name: this.reqData.user,
        fromdate: jsTimestampFilter(this.reqData.dateVal[0]),
        todate: jsTimestampFilter(this.reqData.dateVal[1]),
        pageindex: this.pageindex - 1,
        pagesize: 15,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.RegTable = res.entity;
          this.totalCount = +res.totalcount;
        }
      });
    },
    getDept() {  // 获取科室
      httpServerNormal(getDeptList, {
        disabled: 0,
        can_appoint: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.sections = res;
        }
      });
    },
    getDoctor() {  // 获取医生
      httpServerNormal(getDocList, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (!res.items) {
            this.$message({ type: 'warning', message: '诊所医生为空', showClose: true, duration: 1000 });
            return;
          }
          const arr = res.items.filter((val) => {
            return val.disabled === 0;
          });
          const obj = arr.find((val) => {
            return val.userid === this.user.userid;
          });
          if (!obj) {
            arr.push({
              userid: this.user.userid,
              truename: this.user.truename || this.user.phone,
              deptid: '',
            });
          }
          this.doctors = arr;
        }
      });
    },
    newPlan(id) {  // 新建随访计划
      this.$router.push({ path: '/navigator/registration/newfollowproject', query: { registid: id } });
    },
    changeDoctor() {  // 更改科室
      this.reqData.doctor = '';
    },
  },
  created() {
    this.getPatientMes();  // 获取挂号列表
    this.getDept();   // 获取科室列表
    this.getDoctor();
    this.Interval = setInterval(this.getPatientMes, 30000);
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
    usefulDoctor() {
      return this.doctors.filter((item) => {
        return item.deptid === this.reqData.section;
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.Interval);
  },
  filters: {
    statusFilter(id, date) { // 就诊状态
      switch (id) {
        case 0:
          return '未知';
        case 1:
          if (date.split(' ')[0] !== jsTimestampFilter(new Date(), 'yyyyMMdd')) {  // 非当天则显示就诊完成
            return '已过期';
          }
          return '待接诊';
        case 2:
          if (date.split(' ')[0] !== jsTimestampFilter(new Date(), 'yyyyMMdd')) {  // 非当天则显示就诊完成
            return '就诊完成';
          }
          return ' 诊断中';
        case 3:
          return '就诊完成';
        case 4:
          return '已退号';
        case 5:
          return '已退费';
        default:
      }
    },
    sourcetypeFilter(id) {  // 客户来源
      if (id === 0) return '未知';
    },
    registtypeFilter(id) {   // 挂号类别
      switch (id) {
        case 0:
          return '未知';
        case 1:
          return '初诊';
        case 2:
          return ' 复诊';
        default:
      }
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
    doctorFilter(id, doctors) {
      if (!doctors) {
        return '';
      }
      const doctor = doctors.find((doctor) => {
        return doctor.userid === id;
      });
      return doctor ? doctor.truename : '-';
    },
  },
  watch: {
    reqData: {
      handler() {
        this.pageindex = 1;
        this.getPatientMes();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.regTitle {
    line-height: 40px;
    min-height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    min-width: 1300px;
    .el-input,
    .el-select{
      width: 150px;
      margin-right: 10px;
    }
}
.table{
  .el-table {
    min-width: 1300px;
  }
  .operation{
    cursor: pointer;
    color: $mainColor;
    margin-left: 10px;
  }
}
.pagination{
    @include pagination_to_bottom;
}
// 联想样式
.thinkName {
  border-bottom: 1px solid #ccc;
  line-height: 25px;
  height: 50px;
  padding-left: 5px;
  .phone {
    color: $mainColor;
  }
}
</style>
