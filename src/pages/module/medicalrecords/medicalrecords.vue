<template>
  <div class="medicalrecords">
    <div class="header">

      <span class="m_l10">模板名称:</span>
      <!-- <el-input v-model="selectedTplName" class="med-ret m_l10" placeholder="" @change.native="querySearchAsync" size="small"></el-input> -->
      <input type="text" class="myInput" v-model="selectedTplName">
      <!--<el-autocomplete class="med-ret m_l10 fl"  popper-class="my-autocomplete" v-model="selectedTplName" @select="tplSuggestionSelect" :fetch-suggestions="querySearchAsync" placeholder="请输入模板名称"  :trigger-on-focus="false" valueKey='name'>-->
        <!--<template slot-scope="props">-->
          <!--<div class="thinkName">-->
            <!--{{ props.item.name }}-->
          <!--</div>-->
        <!--</template>-->
      <!--</el-autocomplete>-->

      <span class=" m_l10">模板类型:</span>
      <el-select v-model="selectedOwnerType" class=" m_l10" @change="ownerTypeChanged" size="small">
        <el-option v-for="item in moduleclassOP" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <!--<el-button type="primary fl m_l10 " @click="search_con()">搜索</el-button>-->
    </div>
    <div class="content">

      <el-button type="primary" class="fl" @click="addmodule" size="small">新增</el-button>

      <el-table :data="tableData" style="width: 100%" class="m_t20" align='center' stripe>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="name" label="模板名称" align='center'>
        </el-table-column>
        <el-table-column prop="owner_type" label="模板类型" align='center'>
        </el-table-column>
        <!--<el-table-column prop="diagnosis" label="诊断结果">-->
        <!--</el-table-column>-->
        <el-table-column prop="create_time" label="创建时间" align='center'>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
            <span @click="modification(scope.$index)" class="operation">修改</span>
            <span @click="del(scope.$index)" class="operation">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
      <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
  </div>
</template>
<script>

  import { mapGetters } from 'vuex';

  function sortListByName(obj1, obj2) {
    return obj1.name.localeCompare(obj2.name);
  }

  export default {
    data() {
      return {
        tableData: [],
        moduleclassOP: [
          {
            value: 2,
            label: '全部',
          }, {
            value: 1,
            label: '通用模板',
          }, {
            value: 0,
            label: '个人模板',
          },
        ],
        // 搜索
        selectedTplName: '',
        selectedTplId: '',
        selectedOwnerType: '全部',
        // 分页
        currentTplType: 0,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        ownerType: 2,
      };
    },
    methods: {
      makeDateTimeString(timestamp) {
        const str = '' + timestamp;
        return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2) + ':' + str.substr(10, 2);
      },
      getMedicalTemplateList(tplName, cb) {
        tplName = this.selectedTplName;
        this.tableData = [];
        this.$http.post('/service/template/list', {
          head: {
            accessToken: this.token,
            lastnotice: 0,
            msgid: '',
          },
          body: {
            clinic_id: this.clinic,
            type: 1,
            owner_type: this.ownerType,
            page_index: this.currentPage - 1,
            page_size: this.pageSize,
            name: (!tplName ? '' : tplName),
            medicaltype: 2,
          },
        }).then((response) => {
          const res = response.data;
          if (res.errcode === 0 && res.data && res.data.clinic_id === this.clinic &&
            res.data.items && res.data.items.length) {
            const data = res.data.items || [];
            this.tableData = data.map((val) => {
              val.owner_type = val.owner_type ? '通用模板' : '个人模板';
              val.create_time = this.makeDateTimeString(val.create_time);
              return val;
            });
            this.total = res.data.total;
            this.tableData.sort(sortListByName);
            if (cb) {
              cb(this.tableData);
            }
          } else {
            this.tableData = [];
            if (res.errcode !== 0) {
              this.$message.error(res.errmsg);
            }
          }
        }).catch(() => {});
      },
      handleCurrentChange(val) {  // 切换页数
        this.currentPage = val;
        this.getMedicalTemplateList();
      },
      // handlePageSizeChange(val) {  // 改变每页大小
      //   this.pageSize = val;
      //   this.getMedicalTemplateList();
      // },
      // 联想
      querySearchAsync(queryString, cb) {
        this.getMedicalTemplateList(queryString, cb);
      },
      // 选择联想项目
      tplSuggestionSelect(item) {
        this.curTplName = item.name;
        this.curTplId = item.template_id;
      },
      ownerTypeChanged(newVal) {
        this.ownerType = newVal;
        this.getMedicalTemplateList(this.selectedTplName);
      },
      // 搜索
      search_con() {
        this.search.modulename = this.userData.modulename;
        this.search.moduleclass = this.userData.moduleclass;
        this.search.modulemaker = this.userData.modulemaker;
      },
      // 新增
      addmodule() {
        this.$router.push({ name: 'switchmedical', params: { data: null, tplType: 1 } });
      },
      // 修改
      modification(n) {
        const id = this.tableData[n].template_id;
        this.$router.push({ name: 'switchmedical', params: { tplId: id, data: this.tableData[n], tplType: 1 } });
      },
      // 删除
      del(n) {
        this.$confirm('是否删除该模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const id = this.tableData[n].template_id;
          this.$http.post('/service/template/delete', {
            head: {
              accessToken: this.token,
              lastnotice: 0,
              msgid: '',
            },
            body: { clinic_id: this.clinic,
              template_id: id,
            },
          }).then((response) => {
            const res = response.data;
            if (res.errcode === 0 && res.data && res.data.clinic_id === this.clinic) {
              this.tableData.splice(n, 1);
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.total -= 1;
            } else if (res.errcode !== 0) {
              this.$message.error(res.errmsg);
            }
          }).catch(() => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
    },
    filters: {
      msgFilter(arr, name, moduleclass) {
        let target = arr;
        if (arr && arr.length && name) {
          target = target.filter((obj) => {
            return obj.name.indexOf(name) > -1;
          });
        }
        if (arr && arr.length && moduleclass) {
          target = target.filter((obj) => {
            return obj.owner_type === moduleclass;
          });
        }
        return target;
      },
    },
    computed: {
      ...mapGetters(['clinic', 'token', 'user']),
    },
    mounted() {
      this.getMedicalTemplateList();
    },
    watch: {
      selectedTplName: {
        handler() {
          this.getMedicalTemplateList(this.selectedTplName);
        },
      },
    },
  };
</script>


<style lang="scss" scoped>
  @import "~@scss";

  .medicalrecords{
    position: relative;
    padding: 30px 40px;
    padding-bottom: 60px;
    min-height: 100%;
    box-sizing: border-box;
  }
  .pagination{
    @include pagination_to_bottom;
  }
  .header{
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
  }
  .content{
    width: 100%;
    margin: 10px auto;
  }
  .lh45{
    line-height: 45px;
  }
  .fy{
    margin-top: 20px;
    margin-left: 35%;
  }
  .m_l10{
    margin-left:10px;
  }
  .med-ret{
    height: 30px;
    width: 200px;
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
  .fl{
    float: left;
  }
  .el-input__inner{
    width: 346px;
  }
  .el-select{
    width:130px;
  }
  .inlind_b{
    display: inline-block;
  }
  .operation{
    cursor: pointer;
    color: $mainColor;
    margin-left: 10px;
  }
  // 联想样式
  .my-autocomplete {
    width: 100%;
    li {
      line-height: normal;
      border-bottom: 1px solid #ccc;
      padding: 0;
      .name {
        line-height: 22px;
        font-size: 13px;
      }
      .spec{
        color: $mainColor;
        font-size: 12px;
        margin-left: 5px;
      }
      .phone {
        color: #999;
        line-height: 18px;
        font-size: 12px;
        margin-bottom: 5px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
</style>

