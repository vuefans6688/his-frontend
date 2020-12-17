<template>
  <div class="Chineseformulation">
    <div class="header">
        <!-- <div>{{$route.params.formulationId}}</div> -->
      <span class="m_l10">模板名称:</span>
      <!-- <el-input v-model="selectedTplName" class="med-ret m_l10" placeholder="" size="small"></el-input> -->
      <input type="text" class="myInput" v-model="selectedTplName">
      <span class="m_l10">模板类型:</span>
      <el-select v-model="selectedOwnerType" class="m_l10" @change="ownerTypeChanged" size="small">
        <el-option v-for="item in moduleclassOP" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <!--<el-button type="primary fl m_l10 " @click="search_con()">搜索</el-button>-->
    </div>
    <div class="content">

      <el-button type="primary" class="fl" @click="addmodule" size="small">新增</el-button>

      <el-table :data="tableData" style="width: 100%" class="m_t20" align='center'  stripe>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="name" label="模板名称" align='center'>
        </el-table-column>
        <el-table-column prop="owner_type" label="模板类型" align='center'>
        </el-table-column>
        <!--<el-table-column prop="mod_project" label="模板项目" width="400" show-overflow-tooltip>>-->
        <!--</el-table-column>-->
        <el-table-column prop="create_time" label="创建时间" align='center'>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="modification(scope.$index)" size="small">修改</el-button>
            <el-button type="text" @click="del(scope.$index)" size="small">删除</el-button> -->
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
        tplType: 2,
        // 分页
        currentTplType: 0,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        ownerType: 2,
      };
    },
    mounted() {
      switch (this.$route.params.formulationId) {
        case 'west':
          this.rerenderTemplateList(2);
          break;
        case 'china':
          this.rerenderTemplateList(3);
          break;
        case 'infusion':
          this.rerenderTemplateList(4);
          break;
        case 'check':
          this.rerenderTemplateList(5);
          break;
        case 'material':
          this.rerenderTemplateList(6);
          break;
        case 'others':
          this.rerenderTemplateList(7);
          break;
        default: this.rerenderTemplateList(8);
          break;
      }
    },
    watch: {
      $route(to) {
        switch (to.params.formulationId) {
          case 'west':
            this.rerenderTemplateList(2);
            break;
          case 'china':
            this.rerenderTemplateList(3);
            break;
          case 'infusion':
            this.rerenderTemplateList(4);
            break;
          case 'check':
            this.rerenderTemplateList(5);
            break;
          case 'material':
            this.rerenderTemplateList(6);
            break;
          case 'others':
            this.rerenderTemplateList(7);
            break;
          default: 
            this.rerenderTemplateList(8);
            break;
        }
      },
      selectedTplName: {
        handler() {
          this.getTemplateList(this.selectedTplName);
        },
      },
    },
    methods: {
      rerenderTemplateList(tplType) {
        this.tplType = tplType;
        this.tableData = [];
        this.currentPage = 1;
        this.getTemplateList();
      },
      makeDateTimeString(timestamp) {
        const str = '' + timestamp;
        return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2) + ':' + str.substr(10, 2);
      },
      getTemplateList(tplName) {
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
            type: this.tplType,
            owner_type: this.ownerType,
            page_index: this.currentPage - 1,
            page_size: this.pageSize,
            name: (!tplName ? '' : tplName),
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
          } else {
            this.tableData = [];
            if (res.errcode !== 0) {
              this.$message({ message: res.errmsg, type: 'error', showClose: true, duration: 1000 });
            }
          }
        }).catch(() => {});
      },
      handleCurrentChange(val) {  // 切换页数
        this.currentPage = val;
        this.getTemplateList();
      },
      // handlePageSizeChange(val) {  // 改变页大小
      //   this.pageSize = val;
      //   this.getTemplateList();
      // },
      ownerTypeChanged(newVal) {
        this.ownerType = newVal;
        this.getTemplateList(this.selectedTplName);
      },
      // 搜索
      search_con() {
        this.search.modulename = this.userData.modulename;
        this.search.moduleclass = this.userData.moduleclass;
        this.search.modulemaker = this.userData.modulemaker;
      },
      // 新增
      addmodule() {
        if (this.$route.params.formulationId === 'west') {
          const id = 'new';
          this.$router.push({ name: 'newwesternformulation', params: { tplId: id, data: null, tplType: 2 } });
        }
        if (this.$route.params.formulationId === 'china') {
          const id = 'new';
          this.$router.push({ name: 'newChineseformulation', params: { tplId: id, data: null, tplType: 3 } });
        }
        if (this.$route.params.formulationId === 'infusion') {
          const id = 'new';
          this.$router.push({ name: 'newInfusionformulation', params: { tplId: id, data: null, tplType: 4 } });
        }
        if (this.$route.params.formulationId === 'check') {
          const id = 'new';
          this.$router.push({ name: 'newInspectioncheck', params: { tplId: id, data: null, tplType: 5 } });
        }
        if (this.$route.params.formulationId === 'material') {
          const id = 'new';
          this.$router.push({ name: 'newmaterialcombination', params: { tplId: id, data: null, tplType: 6 } });
        }
        if (this.$route.params.formulationId === 'others') {
          const id = 'new';
          this.$router.push({ name: 'newotherobjects', params: { tplId: id, data: null, tplType: 7 } });
        }
        if (this.$route.params.formulationId === 'advice') {
          const id = 'new';
          this.$router.push({ name: 'newusedadvice', params: { tplId: id, data: null, tplType: 8 } });
        }
      },
      // 修改
      modification(n) {
        if (this.$route.params.formulationId === 'west') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newwesternformulation', params: { tplId: id, data: this.tableData[n], tplType: 2 } });
        }
        if (this.$route.params.formulationId === 'china') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newChineseformulation', params: { tplId: id, data: this.tableData[n], tplType: 3 } });
        }
        if (this.$route.params.formulationId === 'infusion') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newInfusionformulation', params: { tplId: id, data: this.tableData[n], tplType: 4 } });
        }
        if (this.$route.params.formulationId === 'check') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newInspectioncheck', params: { tplId: id, data: this.tableData[n], tplType: 5 } });
        }
        if (this.$route.params.formulationId === 'material') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newmaterialcombination', params: { tplId: id, data: this.tableData[n], tplType: 6 } });
        }
        if (this.$route.params.formulationId === 'others') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newotherobjects', params: { tplId: id, data: this.tableData[n], tplType: 7 } });
        }
        if (this.$route.params.formulationId === 'advice') {
          const id = this.tableData[n].template_id;
          this.$router.push({ name: 'newusedadvice', params: { tplId: id, data: this.tableData[n], tplType: 8 } });
        }
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
              this.$message({ message: '删除成功!', type: 'success', showClose: true, duration: 1000 });
              this.total -= 1;
            } else if (res.errcode !== 0) {
              this.$message({ message: res.errmsg, type: 'error', showClose: true, duration: 1000 });
            }
          }).catch(() => {
          });
        }).catch(() => {
          this.$message({ message: '已取消删除!', type: 'info', showClose: true, duration: 1000 });
        });
      },
    },
    filters: {
      msgFilter(arr, name, moduleclass) {
        let target = arr;
        if (name) {
          target = target.filter((obj) => {
            return obj.mod_name.indexOf(name) > -1;
          });
        }
        if (moduleclass) {
          target = target.filter((obj) => {
            return obj.mod_class === moduleclass;
          });
        }
        return target;
      },
    },
    props: ['message'],
    // updated() {
    // },
    computed: {
      ...mapGetters(['clinic', 'token', 'user']),
    },
    created() {
    },
  };
</script>
<style scoped lang="scss">
@import '~@scss';

.Chineseformulation{
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
</style>
