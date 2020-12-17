<template>
  <div>
    <!--预约挂号  -->
    <div class="content">
      <div class="regTitle my_titleInpStyle">
        <DateRangePicker
          :value="reqData.dateVal"
          :attributes="date_range_picker_attributes"
        ></DateRangePicker>
        <!-- <span>就诊科室：</span>
          <el-select v-model="reqData.section" size="small" @change='changeDoctor'>
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.name" :value="item.dept_id" v-for='item in sections' :key='item.id'></el-option>
          </el-select>
          <span>医生姓名：</span>
          <el-select ageInput v-model="reqData.doctor" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.truename" :value="item.userid" v-for="(item, index) in usefulDoctor" :key='index'></el-option>
          </el-select> -->
        <span>客户姓名：</span>
        <input
          type="text"
          v-model="reqData.user"
          class="myInput"
          placeholder="客户姓名或电话"
        />
        <!-- <el-button type="primary" size="small" @click="getPatientMes">搜索</el-button> -->
        <!-- <a href="javascript:;" id="download" class="download" @click="download" download="download.csv">导出数据</a> -->
      </div>
      <!--table  -->
      <div class="table">
        <el-table
          :data="RegTable"
          ref="multipleTable"
          class="white_nowrap_column"
          size="medium"
          stripe
        >
          <el-table-column align="center" type="index" label="序号">
            <!-- <template slot-scope="props">
              <span> {{ props.row}} </span>
            </template> -->
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column label="性别" align="center" width="80">
            <template slot-scope="props">
              <span> {{ props.row.gender | SexState }} </span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" align="center" min-width="150">
            <template slot-scope="props">
              <span> {{ calculateFromBirth(props.row.birth_date) }} </span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center" min-width="150">
            <template slot-scope="props">
              <span> {{ props.row.phone | undefineFilter }} </span>
            </template>
          </el-table-column>
          <el-table-column label="预约时间" align="center" min-width="130">
            <template slot-scope="props">
              <span> {{ props.row.booking_time }} </span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{
                scope.row.status | statusFilter(scope.row.booking_time)
              }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="130">
            <template slot-scope="props">
              <el-button v-if="props.row.status ===1 && expired(props.row.booking_time)" :disabled="flag" @click="cancel(props.row.id)" :style="{color:'red'}" type="text">取消预约</el-button>
              <el-button v-else disabled  :style="{color:'#888'}" type="text">取消预约</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageindex"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import DateRangePicker from '@/components/DateRangePicker';
import { jsTimestampFilter } from '@/utils/filters';
import httpServerNormal from '@httpServerNormal';
import { wcbookinglist, wcbookingcancel } from '@apiNormal';
import { calculateFromBirth } from '@/utils/ageTransfer';

export default {
  components: { DateRangePicker },
  data() {
    return {
      RegTable: [], // 预约挂号列表数据
      reqData: {
        dateVal: [new Date(), new Date()], // 日期
        user: '',
        // patientid: '',
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      pageindex: 1, // 当前页数
      totalCount: 0, // 总页数,
      flag: false,
    };
  },
  created() {
    this.getwcPatientMes();
  },
  methods: {
    calculateFromBirth,
    getwcPatientMes() {   // 获取预约挂号列表
      httpServerNormal(wcbookinglist, {
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
          this.RegTable = res.data;
          this.totalCount = +res.total;
        }
      });
    },
    handleCurrentChange(val) {
      // 切换页数
      this.pageindex = val;
      this.getwcPatientMes();
    },
    expired(date) {
      const appointTime = new Date().getFullYear() + '-' + date.substr(0, 2) + '-' + date.substr(3, 2) + ' ' + date.substr(date.length - 5, 5);
      const time = appointTime;
      const time2 = new Date().format('yyyy-MM-dd hh:mm');
      if (new Date().compareDate(time, time2)) { // 超过预约时间就显示已过期
        return false;
      }
      return true;
    },
    cancel(id) {
      // this.flag = true;
      this.$confirm('是否确定取消预约, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpServerNormal(wcbookingcancel, {
          id,
        }).then(() => {
          this.$message.success('取消成功');
          this.flag = false;
          this.getwcPatientMes();
        });
      });
    },
  },
  filters: {
    statusFilter(id, date) { // 就诊状态
      const appointTime = new Date().getFullYear() + '-' + date.substr(0, 2) + '-' + date.substr(3, 2) + ' ' + date.substr(date.length - 5, 5);
      const time = id === 1 ? appointTime : appointTime.substr(0, 10);
      const time2 = id === 1 ? new Date().format('yyyy-MM-dd hh:mm') : new Date().format('yyyy-MM-dd');
      switch (id) {
        case 0:
          return '未知';
        case 1:
          if (new Date().compareDate(time, time2)) { // 超过预约时间就显示已过期
            return '已过期';
          }
          // if (jsTimestampFilter(new Date(date), 'yyyyMMdd') !== jsTimestampFilter(new Date(), 'yyyyMMdd')) {  // 非当天则显示就诊完成
          //   return '已过期';
          // }
          return '待接诊';
        case 2:
          return '已取消';
        case 3:
          if (new Date().compareDate(time, time2)) {
            return '结束就诊';
          }
          return '接诊中';
        case 4:
          return '就诊完成';
        default:
      }
    },
  },
  watch: {
    reqData: {
      handler() {
        this.pageindex = 1;
        this.getwcPatientMes();
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
  .el-select {
    width: 150px;
    margin-right: 10px;
  }
}
.table {
  .el-table {
    min-width: 1300px;
  }
  .operation {
    cursor: pointer;
    color: $mainColor;
    margin-left: 10px;
  }
}
.pagination {
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
