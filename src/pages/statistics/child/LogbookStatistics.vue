<template>
  <div class='style'>
    <!--挂号查询  -->
    <div class="content">
      <div class="regTitle my_titleInpStyle">
        
        <DateRangePicker :value='searchDate.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
        
        <span>科室：</span>
        <el-select v-model="searchDate.dept_id" size="small" @change="clearDoctor">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.dept_id" v-for='item in sections' :key='item.id'></el-option>
        </el-select>
        <span>医生：</span>
        <el-select ageInput v-model="searchDate.doctor_id" size="small">
          <el-option label="全部" value="" @click.native="selectDoctor('')"></el-option>
          <el-option :label="item.truename" :value="item.userid" v-for="(item, index) in usefulDoctor" :key='index' @click.native="selectDoctor(item.truename)"></el-option>
        </el-select>
        <span>就诊类型：</span>
        <el-select v-model="searchDate.regist_type" size="small">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="初诊" :value="1"></el-option>
          <el-option label="复诊" :value="2"></el-option>
        </el-select>
      </div>
      <!--table  -->
      <div class="table">
        <el-table :data="logbookTable" ref="multipleTable" size="medium" stripe align="center">
          <el-table-column type="index" label="序号" align='center'></el-table-column>
          <el-table-column label="就诊日期" align='center' width="200" prop="create_time">
          </el-table-column>
          <el-table-column prop="patient_name" label="姓名" align='center'>
          </el-table-column>
          <el-table-column label="性别" align='center'>
            <template slot-scope="props">
              <span> {{ props.row.patient_gender | SexState }} </span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" align='center' width="150">
            <template slot-scope="props">
              <span> {{ props.row.patient_phone | undefineFilter}} </span>
            </template>
          </el-table-column>
          <el-table-column label="就诊类型" align='center'>
            <template slot-scope="props">
              <span> {{ props.row.diagn_type | registtypeFilter }} </span>
            </template>
          </el-table-column>
          <el-table-column label="就诊科室" align='center'>
            <template slot-scope="props">
              <span> {{ props.row.diagn_dept | undefineFilter }} </span>
            </template>
          </el-table-column>
          <el-table-column label="就诊医生" align='center'>
            <template slot-scope="props">
              <span> {{ props.row.diagn_doctor | undefineFilter }} </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="客户来源" align='center'>
            <template slot-scope="scope">{{ scope.row.registstatus | statusFilter }}</template>
          </el-table-column> -->
          <el-table-column label="诊断信息" align='center'>
            <template slot-scope="scope">{{ scope.row.diagn_result | jibingjson_filter }}</template>
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
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      logbookTable: [],  // 接诊日志数据
      searchDate: {
        dateVal: [new Date(new Date() - (1000 * 60 * 60 * 24 * 30)), new Date()],   // 日期
        dept_id: '',  // 科室
        doctor_id: '',
        doctor_name: '',
        regist_type: 0,   // 就诊状态
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
    handleCurrentChange(val) {  // 切换页数
      this.pageindex = val;
      this.getDiagnosisList();
    },
    clearDoctor() {
      this.searchDate.doctor_id = '';
      this.searchDate.doctor_name = '';
    },
    selectDoctor(str) {
      this.searchDate.doctor_name = str;
    },
    makeDateTimeString(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2);
    },
    getDeptid() {  // 获取科室
      this.$http.post('/service/clinic/dept_list', {
        head: {
          accessToken: this.token,      // 用户身份标识，必选参数
          lastnotice: 0,
          msgid: '',                   // 留空
        },
        body: {
          clinic_id: this.clinic,
          disabled: 0,
          can_appoint: 1,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.sections = res.data.data;
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      }).catch();
    },
    getDoctor() {  // 获取医生
      this.$http.post('/service/clinic/user_list', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: { clinic_id: this.clinic },
      }).then((res) => {
        if (res.data.errcode === 0 && res.data.data.clinic_id === this.clinic) {
          const arr = [];
          res.data.data.items.forEach((val) => {
            if (val.disabled === 0) {
              arr.push(val);
            }
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
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      }).catch(() => {
      });
    },
    getDiagnosisList() {
      this.$http.post('/service/stats/diagn_logs', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          dept_id: this.searchDate.dept_id,
          doctor_id: this.searchDate.doctor_id,
          doctor_name: this.searchDate.doctor_name,
          regist_type: this.searchDate.regist_type,
          date_from: this.searchDate.dateVal[0].format('yyMMdd'),
          date_to: this.searchDate.dateVal[1].format('yyMMdd'),
          page_index: this.pageindex - 1,
          page_size: 15,
        },
      }).then((respse) => {
        const res = respse.data;
        if (res.errcode === 0 && res.data.clinic_id === this.clinic) {
          const data = res.data.items || [];
          this.logbookTable = data.map((val) => {
            val.create_time = this.makeDateTimeString(val.create_time);
            return val;
          });
          this.totalCount = res.data.total;
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      }).catch();
    },
  },
  mounted() {
    this.getDeptid();   // 获取科室列表
    this.getDoctor();    // 获取医生列表
    this.getDiagnosisList();  // 获取接诊日志
    this.Interval = setInterval(this.getDiagnosisList, 30000);
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
    usefulDoctor() {
      return this.doctors.filter((item) => {
        if (!this.searchDate.dept_id) {
          return item;
        }
        return item.deptid === this.searchDate.dept_id;
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.Interval);
  },
  filters: {
    statusFilter(id) { // 就诊状态
      switch (id) {
        case 0:
          return '未知';
        case 1:
          return '待接诊';
        case 2:
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
    jibingjson_filter(jibingjson) {
      if (!jibingjson) {
        return '-';
      }
      let result = null;
      try {
        result = JSON.parse(jibingjson);
      } catch (error) {
        return jibingjson;
      }
      if (typeof result !== 'object') {
        return result;
      }
      return result.map((v) => {
        return v.jbname ? v.jbname : (v.desc ? v.desc : v);
      }).join(', ');
    },
  },
  watch: {
    searchDate: {
      handler() {
        this.pageindex = 1;
        this.getDiagnosisList();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.style{
  position: relative;
  box-sizing: border-box;
  min-width: 1500px;
}
.regTitle {
  line-height: 40px;
  min-height: 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  vertical-align: middle;
  min-width: 1100px;
  .el-input,
  .el-select,{
    width: 150px;
    margin-right: 10px;
  }
}
.table{
  .el-table {
    min-width: 1500px;
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
</style>
