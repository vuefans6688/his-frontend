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
        </div>
        <!--table  -->
        <div class="table">
          <el-table :data="wordTable" ref="multipleTable" size="medium" stripe align="center">
            <el-table-column label="序号" align='center'>
              <template slot-scope="props">
                <span>{{ props.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column label="科室" align='center' prop="dept_name">
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.dept_name | undefineFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="医生" align='center' prop="doctor_name">
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.doctor_name | undefineFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="接诊量" align='center' prop="quantity">
               <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.sum_diagn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="挂号费" align='center'>
               <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.sum_regist | PriceFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="处方金额" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.sum_prescript | PriceFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="诊疗项目金额" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.sum_exam | PriceFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="耗材金额" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.sum_material | PriceFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="其他金额" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.sum_others | PriceFilter }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="明细" align='center' prop="detail">
              <template slot-scope="props" v-if="props.row.index !== '合计'">
                <span class='operation' @click="goDetail">查看明细</span>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="pageindex" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="totalCount">
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
      wordTable: [],  // 接诊日志数据
      searchDate: {
        dateVal: [new Date(new Date() - (1000 * 60 * 60 * 24 * 30)), new Date()],   // 日期
        dept_id: '',  // 科室
        doctor_id: '',
        doctor_name: '',
        registtype: '',   // 就诊状态
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      sections: [],       // 就诊科室
      doctors: [],         // 就诊医生
      pageindex: 1,  // 当前页数
      page_size: 10,
      totalCount: 0,    // 总页数
      Interval: null,  // 计时器名字
    };
  },
  methods: {
    handleCurrentChange(val) {  // 切换页数
      this.pageindex = val;
      this.getDoctorWordsList();
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
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2) + ':' + str.substr(10, 2);
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
    getDoctorWordsList() {
      this.$http.post('/service/stats/doctor_workloads', {
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
          date_from: this.searchDate.dateVal[0].format('yyMMdd'),
          date_to: this.searchDate.dateVal[1].format('yyMMdd'),
          page_index: this.pageindex - 1,
          page_size: this.page_size,
        },
      }).then((respse) => {
        const res = respse.data;
        if (res.errcode === 0 && res.data.clinic_id === this.clinic) {
          this.wordTable = res.data.items || [];
          const obj = res.data;
          obj.index = '合计';
          obj.dept_name = '所有科室';
          obj.doctor_name = '所有医生';
          this.wordTable.forEach((val, index) => {
            val.index = index + 1;
          });
          this.wordTable.unshift(obj);
          this.totalCount = res.data.total;
        } else {
          this.$message({ message: res.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      }).catch();
    },
    goDetail() {   // 查看明细
      this.$router.push({ name: 'doctordetail' });
    },
  },
  mounted() {
    this.getDeptid();   // 获取科室列表
    this.getDoctor();    // 获取医生列表
    this.getDoctorWordsList();
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
    usefulDoctor() {
      return this.doctors.filter((item) => {
        if (item.deptid !== '') {
          return item.deptid === this.searchDate.dept_id;
        }
        return '';
      });
    },
  },
  watch: {
    searchDate: {
      handler() {
        this.pageindex = 1;
        this.getDoctorWordsList();
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
}
.regTitle {
    line-height: 40px;
    min-height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    min-width: 1100px;
    .el-input,
    .el-select{
      width: 150px;
      margin-right: 10px;
    }
}
.table{
  .el-table {
    min-width: 1200px;
  }
  .totalPrice {
    font-size: 14px;
    font-weight: 600;
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
