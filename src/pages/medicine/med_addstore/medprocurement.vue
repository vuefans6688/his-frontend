<template>
  <div class="medprocurement">
    <div class="header my_titleInpStyle">
      <DateRangePicker :value='userData.date' :attributes='date_range_picker_attributes'></DateRangePicker>
    </div>
    <div class="content">
        <div class="add">
          <el-button type="primary" @click="addstorp" size="small">新增入库</el-button>
        </div>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" align="center" width="100">
        </el-table-column>
        <el-table-column prop="purchase_sn" label="入库单号" align="center" width="210">
        </el-table-column>
        <!-- <el-table-column prop="batch_number" label="入库批号" align="center">
        </el-table-column> -->
        <el-table-column prop="creatorname" label="制单人" align="center">
        </el-table-column>
        <el-table-column prop="making_date" label="制单日期" align="center">
          <template slot-scope="scope">
            {{scope.row.createtime | createtime }}
          </template>
        </el-table-column>
        <el-table-column label="入库金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.allcost }}元
          </template>
        </el-table-column>
        <el-table-column prop="itemstatus" label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.itemstatus | itemstatus }}
          </template>
        </el-table-column>
        <el-table-column prop="control" label="操作" align="center">
          <template slot-scope="scope">
            <span @click="control(scope.row.itemstatus, scope.row)" style="color:#56bc94; cursor:pointer;">{{msg | statusFilter(scope.row.itemstatus)}}</span>
            <span style="color:red; cursor:pointer;" @click="edit(scope.row.purchase_sn, scope.row.creatorname, scope.row.createtime)" class="m_l10">{{msg | statusFilter2(scope.row.itemstatus)}}</span>
            <span class="el-icon-delete m_l10 cursor" v-if="scope.row.total === 0" @click="del_h(scope.row)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="pageindex+1" @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
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
      userData: {
        date: [new Date('2018', '00', '01'), new Date()], // 制单日期
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      options: [
        {
          value: '',
          label: '全部',
        }, {
          value: '已审核',
          label: '已审核',
        }, {
          value: '未审核',
          label: '未审核',
        }, {
          value: '已打回',
          label: '已打回',
        }, {
          value: '保存',
          label: '保存',
        }, {
          value: '已提交',
          label: '已提交',
        },
      ],
      tableData: [],
      // 分页
      currentPage4: 1,
      total: 1,
      pageindex: 0,
      pagesize: 10,
      // 搜索控制量
      search: {
        status: '',
        num: '',
      },
    };
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.search_con();
    },
    // 新增
    addstorp() {
      this.$http.post('/service/drug/purchrecodecreate', {
        head: {
          accessToken: this.token,
          lastnoticeL: 0,
        },
        body: {
          clinic_id: this.clinic,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$store.commit('send_purchrecodecreate', { itemcreator: res.data.data.creatorname, purchaseSn: res.data.data.purchase_sn });
          this.$router.push({ name: 'addstore' });
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
    // 按钮点击的函数
    control(status, row) {
      // 查看明细
      if (status === 3) {
        this.$store.commit('send_purchrecodecreate', { row });
        this.$router.push({ name: 'storereviewed' });
      }
      // 提交审核
      // if (status === 1 || status === 4) {
      //   this.$confirm('是否将该入库单提交审核?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '提交成功!',
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消提交',
      //     });
      //   });
      // }
      // 撤回
      if (status === 2) {
        this.$confirm('该入库单尚未审核，是否撤回?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'success',
            message: '撤回成功!',
          });
        }).catch(() => {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'info',
            message: '已取消撤回',
          });
        });
      }
    },
    // 编辑
    edit(purchaseSn, itemcreator, createtime) {
      this.$store.commit('send_purchrecodecreate', { purchaseSn, itemcreator, eidt: 111, createtime });
      this.$router.push({ name: 'addstore' });
    },
    // 搜索
    search_con() {
      const time1 = this.userData.date[0].format('yyMMdd');
      const time2 = this.userData.date[1].format('yyMMdd');
      this.$http.post('/service/drug/purchrecodequery', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          pageid: this.pageindex,
          pagesize: this.pagesize,
          clinic_id: this.clinic,
          begin_time: time1,
          end_time: time2,
        },
      }).then((res) => {
        this.tableData = [];
        if (res.data.errcode === 0) {
          if (!res.data.data) {
            this.tableData = [];
          } else {
            this.tableData = res.data.data.context;
            this.total = res.data.data.pagecount;
          }
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
          this.tableData = [];
        }
      }).catch();
    },
  },
  filters: {
    statusFilter(msg, status) {
      switch (status) {
        // case 1:
        //   msg = '提交审核';
        //   break;
        case 2:
          msg = '撤回';
          break;
        case 3:
          msg = '查看明细';
          break;
        // case 4:
        //   msg = '提交审核';
        //   break;
        default:
          break;
      }
      return msg;
    },
    statusFilter2(msg, status) {
      switch (status) {
        case 1:
          msg = '编辑';
          break;
        case 2:
          msg = '';
          break;
        case 3:
          msg = '';
          break;
        case 4:
          msg = '编辑';
          break;
        default:
          break;
      }
      return msg;
    },
    // 时间过滤器
    createtime(val) {
      const str = '20' + val + '';
      return str.substring(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    },
    // 状态过滤器
    itemstatus(val) {
      switch (val) {
        case 1:
          return '已保存';
        case 2:
          return '已提交';
        case 3:
          return '已审核';
        case 4:
          return '已打回';
        default:
          return '';
      }
    },
  },
  created() {
    this.search_con();
  },
  watch: {
    userData: {
      deep: true,
      handler() {
        this.pageindex = 0;
        this.pagesize = 10;
        this.search_con();
      },
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic', 'purchrecodecreate']),
    msg() {
      return '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medprocurement{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
    width: 100%;
    margin: 0 auto;
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.med-classification{
  width: 110px;
  height: 30px;
}
.content{
  margin: 10px auto 0;
  min-width: 1100px;
  width: 100%;
  padding:0 0 0 10px;
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
.med-ret{
  height: 30px;
  width: 150px;
}
.m_l100{
    margin-left:100px;
}
.m_t20{
    margin-top: 20px;
}
.fr{
  float: right;
}
.m_t5{
  margin-top: 5px;
}
.m_r200{
  margin-right: 350px;
}
.fl{
  float: left;
}
.el-select{
  width:100px;
}
.inlind_b{
  display: inline-block;
}
.cursor{
  cursor: pointer;
}
</style>
