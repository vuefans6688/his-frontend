<template>
  <div class="follow">
    <el-table
      :data="follow_list"
      stripe size="small"
      style="width: 100%">
      <el-table-column
        label="随访状态" align='center'>
        <template slot-scope="scope">
          {{scope.row.status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column
        label="随访类型" align='center'>
        <template slot-scope="scope">
          {{scope.row.plantype | typeFilter}}
        </template>
      </el-table-column>
      <el-table-column
        prop="planexecutor"
        label="随访申请人" align='center'>
      </el-table-column>
      <el-table-column
        label="计划随访时间" align='center'>
        <template slot-scope="scope">
          {{scope.row.plantime | dateFilter}}
        </template>
      </el-table-column>
      <el-table-column
        label="随访计划" width='160' align='center' class-name="white_nowrap_column">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div class="detail_hover">{{scope.row.plancontent}}</div>
            <div slot="reference" class="name-wrapper">
              {{scope.row.plancontent}}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="actualexecutor"
        label="执行人" align='center'>
      </el-table-column>
      <el-table-column
        prop="visittime"
        label="执行时间" width='160' align='center'>
      </el-table-column>
      <el-table-column
        label="随访结果" width='160' align='center' class-name="white_nowrap_column">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div class="detail_hover">{{scope.row.actualcontent}}</div>
            <div slot="reference" class="name-wrapper">
              {{scope.row.actualcontent}}
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next, jumper" :page-size="condition.pagesize" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { followUpList } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  props: {
    customerID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 搜索条件
      condition: {
        fromdate: new Date(2000, 1, 1).format('yyyy-MM-dd hh:mm:ss'),
        todate: new Date().format('yyyy-MM-dd hh:mm:ss'),
        pageindex: 0,
        pagesize: 15,
      },
      total: 0,
      follow_list: [],
    };
  },
  methods: {
    // 获取随访列表
    getFollowUpList() {
      httpServerNormal(followUpList, {
        patientid: this.customerID,
        status: 2,
        type: -1,
        ...this.condition,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.follow_list = res.entity || [];
          this.total = res.totalcount || 0;
        }
      });
    },
    // 分页
    handleCurrentChange(pageindex) {
      this.condition.pageindex = pageindex - 1;
      this.getFollowUpList();
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic']),
  },
  filters: {
    // 状态guolv
    statusFilter(status) {
      if (status === 1) {
        return '待随访';
      } else if (status === 2) {
        return '已随访';
      } else if (status === 3) {
        return '取消随访';
      }
    },
    // 随访类型过滤
    typeFilter(type) {
      if (type === 1) {
        return '满意度';
      } else if (type === 2) {
        return '诊疗效果';
      }
    },
    dateFilter(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
  },
  created() {
    this.getFollowUpList();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.follow{
  .el-table{
    font-size: 14px;
  }
  .el-pagination{
    @include pagination_to_bottom;
  }
}
.detail_hover{
  max-width: 300px;
  line-height: 30px;
}
</style>
