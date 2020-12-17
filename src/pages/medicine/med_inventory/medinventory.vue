<template>
  <div class="medinventory">
    <div class="header my_titleInpStyle">

      <!-- <span class="m_l10">盘点单号:</span>
      <el-input v-model="userData.serialnum" class="med-ret m_l10" size="small"></el-input>

      <span class="m_l10">盘点人:</span>
      <el-select v-model="userData.checker" class=" m_l10" size="small">
        <el-option v-for="(item, index) in checkerList" :key="index" :label="item.truename" :value="item.userid">
        </el-option>
      </el-select>

      <span class="m_l10 ">制单日期:</span>
        <el-date-picker v-model="userData.createTime" type="daterange" align="center" 
         range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
         class="m_l10 " size="small"></el-date-picker> -->
        
      <!-- <el-button type="primary  m_l10 " @click="search_con">搜索</el-button> -->

      <div class="add">
        <el-button type="primary" @click="newinventory" size="small">新建盘点</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="serialnum" label="盘点单号" align="center">
        </el-table-column>
        <el-table-column prop="total_count" label="总类目" align="center">
        </el-table-column>
        <el-table-column prop="checked_count" label="已盘点" align="center">
        </el-table-column>
        <el-table-column label="未盘点" align="center">
          <template slot-scope="scope">
            {{ scope.row.total_count - scope.row.checked_count }}
          </template>
        </el-table-column>
        <el-table-column prop="total_cost" label="盈亏批发额合计" align="center" width="150">
        </el-table-column>
        <el-table-column prop="createtime" label="开始时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createtime | Time }}
          </template>
        </el-table-column>
        <el-table-column label="完成时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.itemstatus === 3"> {{ scope.row.acceptime | Time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creatorname" label="盘点人" align="center">
        </el-table-column>
        <el-table-column prop="control" label="操作" align="center">
          <template slot-scope="scope">
            <span @click="seen(scope.row)" style="color:#56bc94; cursor:pointer;" v-if="scope.row.itemstatus === 3">查看</span>
            <span @click="inventory(scope.row)" style="color:#56bc94; cursor:pointer;" v-else>盘点</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="currentPage" :page-size="10" @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
  </div>
</template>
<script>
import httpServerNormal from '@httpServerNormal';
import { mapGetters } from 'vuex';
import { InventoryRecords, getDocList, createstockcheck } from '@apiNormal';

export default {
  data() {
    return {
      userData: {
        serialnum: '', // 盘点单号
        checker: '', // 盘点人
        createTime: '', // 制单日期
      },
      checkerList: [], // 盘点人数组
      tableData: [],
      // 分页
      currentPage: 1,
      total: 0,
      pageindex: 0,
    };
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.getcheckList();
    },
    // 新增
    newinventory() {
      this.$confirm('请确认其他部门已停止对药品进行任何操作!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpServerNormal(createstockcheck, {
          clinic_id: this.clinic,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            this.$router.push({ name: 'newinventory', query: { inventoryData: JSON.stringify(res) } });
          } else { // code错误需要进行的操作
            const code = res.split(':')[1];
            if (code === '-1') {
              this.$alert('盘点单已存在！', '提醒', {
                confirmButtonText: '确定',
                callback: () => {},
              });
            }
          }
        });
      }).catch(() => {
        return false;
      });
    },
    // 获取盘点记录
    getcheckList() {
      httpServerNormal(InventoryRecords, {
        clinic_id: this.clinic,
        pageid: this.pageindex,
        pagesize: 10,
      }).then((res) => {
        this.tableData = res.record_arr;
        this.total = res.pagecount;
      });
    },
    // 查看
    seen(data) {
      this.$router.push({ name: 'seeninventory', query: { inventoryData: JSON.stringify(data) } });
    },
    inventory(data) {
      this.$router.push({ name: 'newinventory', query: { inventoryData: JSON.stringify(data) } });
    },
    // 获取医生
    getDocList() {
      httpServerNormal(getDocList, {
        clinic_id: this.clinic,
      }).then((res) => {
        if (res.items) {
          const arr = [];
          res.items.forEach((val) => {
            if (val.disabled === 0) {
              arr.push(val);
            }
          });
          const obj = arr.find((val) => {
            return arr.userid === val.userid;
          });
          if (!obj) {
            arr.push({
              userid: this.user.userid,
              truename: this.user.truename || this.user.phone,
            });
          }
          this.checkerList = arr;
        }
      });
    },
  },
  filters: {
    Time(time) {
      const str = '' + time;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2);
    },
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic']),
  },
  created() {
    this.getcheckList();
    this.getDocList();
  },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medinventory{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
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
  min-width: 1100px;
  margin: 10px auto;
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
</style>
