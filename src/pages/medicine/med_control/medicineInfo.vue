<template>
  <div class="medicineInfo" id="medicineInfo">
    <div class="header">
        <!-- 左边元素 -->
      <!-- <el-form :inline="true" :model="header" class="demo-form-inline" size="small">
        <el-form-item label="药品名称:" prop="ret" >
          <template solt-scope='scope'> -->
            <span class="m_l10">药品名称:</span>
            <input v-model="header.ret" placeholder="" class="in_block w_200 myInput" size="small">
          
        <!-- <span class="">药品名称:</span>
        <input type="text" class=""> -->
        <span class="m_l10">处方分类:</span>
        <div class="in_block m_l10">
          <el-select name="med-classification" class="med-classification" v-model="header.drugtype" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="西/中成药" value="0"></el-option>
            <el-option label="中药" value="1"></el-option>
          </el-select>
        </div>
        <div class="in_block  m_l10">
          <!-- <el-button type="primary" size="small" @click="querySearchAsync">搜索</el-button> -->
        </div>
        <!-- </el-form> -->
    </div>

    <div class="med_tab">
      <el-button type="primary" class="fl" @click="addmedicine" size="small">新增药品</el-button>
    </div>
    <!-- 药物列表 -->
    <div class="med_tab content">
      <el-table :data="msg" style="width: 100%" class="h_600" stripe>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="product_name" label="药品名称" align='center'>
        </el-table-column>
        <el-table-column label="处方分类" align='center'>
          <template slot-scope="scope">
            {{ scope.row.drugtype | drugtype }}
          </template>
        </el-table-column>
        <el-table-column prop="specs_txt" label="规格" align='center'>
        </el-table-column>
        <el-table-column prop="producer" label="生产厂家"  align='center' show-overflow-tooltip width="300">
        </el-table-column>
        <el-table-column label="创建日期" align='center'>
          <template slot-scope="scope">
            {{scope.row.create_time | aaabbb }}
          </template>
        </el-table-column>
        <el-table-column label="状态" align='center'>
          <template slot-scope="scope">
            {{scope.row.use_enable | use_enableFilter}}
          </template>
        </el-table-column>
        <el-table-column label="记账标识" align='center'>
          <template slot-scope="scope">
            {{scope.row.bkm032 | bkm032Filter}}
          </template>
        </el-table-column>
        <el-table-column label="社保备案状态" align='center'>
          <template slot-scope="scope">
            {{scope.row.szsbstatus | szsbstatusFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="150" align='center'>
          <template slot-scope="scope">
            <span @click="editmedicine(scope.row.drug_key)" style="color:#56bc94; cursor:pointer;" class="m_l10">编辑</span>
            <span v-if=" scope.row.use_enable == 1 " style="color:red; cursor:pointer;" @click="disable1(scope.row, scope.$index)" class="m_l10">禁用</span>
            <span v-else-if=" scope.row.use_enable == 2 "  @click="enable1(scope.row, scope.$index)" style="color:#56bc94; cursor:pointer;" class="m_l10">启用</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="pageindex+1" :page-size="pagesize"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      // 分页
      total: 0,
      pageindex: 0,
      pagesize: 10,
      // 禁用
      disable: false,
      header: {
        ret: '',
        drugtype: '',
        state: '',
      },
      msg: [],
    };
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.querySearchAsync();
    },
    // 新增药品
    addmedicine() {
      this.$router.push({ name: 'editmedicine' });
      if (typeof (Storage) !== 'undefined') {
        sessionStorage.setItem('med_key', 'add');
      } else {
        this.$alert('你的浏览器版本过低，无法请求数据，请升级浏览器！', '警告', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'info',
              message: `action: ${action}`,
            });
          },
        });
      }
    },
    // 编辑药品
    editmedicine(drugKey) {
      this.$router.push({ name: 'editmedicine' });
      if (typeof (Storage) !== 'undefined') {
        sessionStorage.setItem('drug_key', drugKey);
        sessionStorage.setItem('med_key', 'edit');
      } else {
        this.$alert('你的浏览器版本过低，无法请求数据，请升级浏览器！', '警告', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'info',
              message: `action: ${action}`,
            });
          },
        });
      }
    },
    // 禁用
    disable1(row, index) {
      const drugkey = row.drug_key;
      this.$confirm('禁用后该药品将不会再显示，是否禁用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.post('/service/drug/infoenable', {
          head: {
            accessToken: this.token,
            lastnotice: 0,
          },
          body: {
            drug_key: drugkey,
            clinic_id: this.clinic,
            use_enable: 2,
          },
        }).then((res) => {
          if (res.data.errcode === 0) {
            this.$message({
              showClose: true,
              duration: 1000,
              type: 'success',
              message: '禁用成功!',
            });
            this.msg[index].use_enable = 2;
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
    // 启用
    enable1(row, index) {
      const drugkey = row.drug_key;
      this.$http.post('/service/drug/infoenable', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          drug_key: drugkey,
          clinic_id: this.clinic,
          use_enable: 1,
        },
      }).then(() => {
        this.$message({
          showClose: true,
          duration: 1000,
          type: 'success',
          message: '启用成功!',
        });
        this.msg[index].use_enable = 1;
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 1000,
          type: 'warning',
          message: '启用失败!',
        });
      });
    },
    // 药品搜索
    querySearchAsync() {
      this.$http.post('/service/drug/infolistquery', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          pageid: this.pageindex,
          pagesize: this.pagesize,
          clinic_id: this.clinic,
          drugname: this.header.ret,
          drugtype: this.header.drugtype,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          if (!res.data.data) { // 如果没有则返回空
            this.msg = [];
            this.total = 0;
          } else {
            this.msg = res.data.data.diarr;
            this.total = res.data.data.pagecount || 0;
          }
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
          this.msg = [];
        }
      }).catch();
    },
  },
  filters: {
    bkm032Filter(val) {
      if (val === '01') {
        return '';
      }
      return '自费';
    },
    use_enableFilter(val) {
      if (val === 1) {
        return '已启用';
      } else if (val === 2) {
        return '已禁用';
      }
    },
    szsbstatusFilter(val) {
      if (val === 1) {
        return '已备案';
      }
      return '未备案';
    },
    aaabbb(str1) {
      const str = '20' + str1 + '';
      return str.substring(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    },
    drugtype(type) {
      if (type === '0') {
        return '西/中成药';
      }
      if (type === '1') {
        return '中药';
      }
    },
  },
  created() {
    this.querySearchAsync();
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic']),
  },
  watch: {
    header: {
      handler() {
        this.pageindex = 0;
        this.querySearchAsync();
      },
      deep: true,
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~@scss';

.fl{
  float: left;
}
.fr{
  float: right;
}
#medicineInfo{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
    width: 100%;
    margin: 0 auto;
    // padding:10px 0 0 10px;
    height: 49px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.med-classification{
  width: 130px;
  height: 30px;
}
.m_l10{
  margin-left:10px; 
}
.med_tab{
  margin: 10px auto 0;
  min-width: 1100px;
  width: 100%;
  padding:0 0 0 10px;
}
.lh45{
  line-height: 45px;
}
.m_t10{
  margin-top: 10px;
}
.pagination{
  @include pagination_to_bottom;
}
// 联想框
.thinkName {
  border-bottom: 1px solid #ccc;
  line-height: 25px;
  height: 25px;
  padding-left: 5px;
  .phone {
    color: $mainColor;
  }
}
.l_h49{
  line-height: 49px;
}
.in_block{
  display: inline-block;
}
.w_200{
  width: 200px;
}
</style>
