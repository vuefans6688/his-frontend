<template>
  <div class="treament" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="new_section">
      <el-button size="small" type="primary" @click="modify_registration(-1)">新增诊金项</el-button>
    </div>
    <div class="treaments">
      <el-table
        :data="registrations"
        style="width: 100%"
        type="index"
        stripe>
        <el-table-column
          align="center"
          prop="seq_num"
          label="编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="成本价"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="销售价"
          align="center">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center">
          <template slot-scope="scope">
            {{scope.row.create_time | clinicDateFilter}}
          </template>
        </el-table-column>
        <el-table-column label="社保备案状态" align='center'>
          <template slot-scope="scope">
            {{scope.row.szsbstatus | szsbstatusFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            {{scope.row.disabled | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="modify_registration(scope.$index)">编辑</el-button>
            <el-button v-show="scope.row.disabled === 0" type="text" class="forbid" @click="forbid_registration(scope.$index)">禁用</el-button>
            <el-button v-show="scope.row.disabled !== 0" type="text" @click="start_registration(scope.$index)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <el-pagination
      :page-size="this.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="this.total"
      @current-change="pageChage">
    </el-pagination> -->
    <div class="modify_section" v-show="modify_registration_show">
      <div class="container">
        <div class="close" @click="modify_registration_cancel('registration')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">{{this.oparation}}诊金项</h1>
        <div class="content">
          <el-form :model="registration" :rules="rules_registration" ref="registration" label-width="100px" size="small">
            <el-form-item label="社保编号:" prop="seq_num">
              <el-input v-model="registration.seq_num" :disabled="false"></el-input>
            </el-form-item>
            <!-- <el-form-item label="名称:" prop="name">
              <el-input v-model="registration.name"></el-input>
            </el-form-item> -->
            <el-form-item label="名称:" prop="name">
              <template solt-scope='scope'>
                <el-autocomplete popper-class="my-autocomplete" v-model="registration.name" :disabled="canEditName" :fetch-suggestions="querySearch" placeholder="请选择诊疗名称" :trigger-on-focus="false" @select="handleSelect">  
                  <template slot-scope="props">
                    <div class="thinkName">
                      <p>
                        <span>{{ props.item.name }}</span>
                        <span style="color: #8492a6; font-size: 12px; color: #56bc94; margin-left: 10px;">社保</span>
                      </p>
                      <p>
                        <span>社保编号：</span>
                        <span class="code">{{ props.item.code }}</span>
                      </p>
                    </div>
                  </template>
                </el-autocomplete>
              </template>
            </el-form-item>
            <el-form-item label="成本价:" prop="cost">
              <el-input v-model="registration.cost" ref="cost" @keyup.native="myPriceLimit('cost')" @blur="paddingZero('cost', 2)"></el-input>
            </el-form-item>
            <el-form-item label="销售价:" prop="price">
              <el-input v-model="registration.price" ref="price" @keyup.native="myPriceLimit('price')" @blur="paddingZero('price', 2)"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="modify_registration_confirm('registration')">确定</el-button>
              <el-button round @click="modify_registration_cancel('registration')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { floatLimit } from '@/utils/inputLimit';
import { paddingEndZero } from '@/utils/filters';
import httpServerNormal from '@httpServerNormal';
import { fuzzysearchzhenliao, getzhenliaoByKey, createChargitem, getChargitemInfo, modifyChargitem, getChargitemList } from '@apiNormal';

export default {
  data() {
    return {
      fullscreenLoading: false,
      registrations: [],
      modify_registration_show: false,
      registration: {
        name: '',
        seq_num: '',
        type: 7,
        cost: '',
        price: '',
        szsbcode: '',
        szsbname: '',
        szsbprice: 0,
        szsbzhenliaokey: '',
        unit: '次',
      },
      canEditName: false,
      selectedItem: {}, // 点击联想选中的信息
      rules_registration: {
        seq_num: [
          // { required: true, message: '请输入编号', trigger: 'blur' },
          // { validator: validateID, trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          // { validator: validateName, trigger: 'blur' },
        ],
        cost: [
          { required: true, message: '请输入成本价', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入销售价', trigger: 'blur' },
        ],
      },
      action: '', // 记录是新增还是编辑
      index: -1,  // 记录编辑的行号
      // 分页
      pageindex: 0,
      pagesize: 3,
      total: 0,
    };
  },
  methods: {
    // checkName() {  // 检验名字
    //   if (this.registration.name !== this.selectedItem.ake002) {
    //     this.registration.seq_num = '';
    //     this.registration.szsbzhenliaokey = '';
    //     this.selectedItem = {};
    //   }
    // },
    querySearch(queryString, cb) { // 联想
      clearTimeout(this.timeout);
      httpServerNormal(fuzzysearchzhenliao, {
        name: queryString,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          if (!res) {  // 联想无则返回空
            cb([]);
          } else {
            cb(res.outputlist);
          }
        } else { // code错误需要进行的操作
          cb([]);
        }
      });
    },
    handleSelect(item) {  // 联想选择事件
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.registration.seq_num = item.code;
      this.registration.szsbzhenliaokey = item.key;
      httpServerNormal(getzhenliaoByKey, {
        key: item.key,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.selectedItem = res.zhenliao;
          this.registration.name = res.zhenliao.ake002;
          this.registration.szsbprice = res.zhenliao.bkm055 || 0;
        }
      });
    },
    modify_registration(index) {
      this.index = index;
      this.action = index > -1 ? 'edit' : 'new';
      if (index > -1) {
        this.getCurItem();
      }
      this.modify_registration_show = true;
      this.$emit('destroyScroll');
      this.calculateCanEditName();
    },
    modify_registration_cancel(ruleForm) {
      this.modify_registration_show = false;
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_registration_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // reset data
          if (this.action === 'new') {
            this.addItem();
          } else {
            this.update_item();
          }
        } else {
          return false;
        }
      });
    },
    start_registration(index) {
      this.changeStatus(index, 0);
    },
    forbid_registration(index) {
      this.$confirm('禁用后将无法使用, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.changeStatus(index, 1);
      });
    },
    myPriceLimit(th) {
      this.registration[th] = floatLimit(this.registration[th], 2);
    },
    // 末尾补零
    paddingZero(label, len) {
      this.registration[label] = paddingEndZero(this.registration[label], len);
    },
    reset() {
      this.registration = {
        seq_num: '',
        type: 7,
        name: '',
        cost: '',
        price: '',
        unit: '次',
        szsbcode: '',
        szsbname: '',
        szsbprice: 0,
        szsbzhenliaokey: '',
      };
      this.selectedItem = {};
      this.$refs.registration.resetFields();
      this.modify_registration_show = false;
      this.$emit('initScroll');
    },
    updateView() {
      this.registrations[this.index].seq_num = this.registration.seq_num;
      this.registrations[this.index].name = this.registration.name;
      this.registrations[this.index].cost = this.registration.cost;
      this.registrations[this.index].price = this.registration.price;
      this.registrations[this.index].unit = this.registration.unit || '次';
    },
    // 分页
    pageChage(curPage) {
      this.pageindex = curPage - 1;
      this.getItemList();
    },
    getItemList() { // http request 全部获取
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(getChargitemList, {
        disabled: 2,
        type: 7,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.registrations = res && res.length ? res : [];
        }
      });
    },
    addItem() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.registration.type = parseInt(this.registration.type, 10);
      this.registration.cost = parseFloat(this.registration.cost);
      this.registration.price = parseFloat(this.registration.price);
      httpServerNormal(createChargitem, {
        ...this.registration,
        szsbcode: this.registration.seq_num,
        szsbname: this.registration.name,
        szsbprice: this.registration.szsbprice,
        szsbzhenliaokey: this.registration.szsbzhenliaokey,
        szsbpricelevel: '4',
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.registrations.push(res);
          this.reset();
        }
      });
    },
    // 获取当前编辑的信息
    getCurItem() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(getChargitemInfo, {
        item_id: this.registrations[this.index].item_id,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.registration = res;
          if (!this.registration.unit) {
            this.registration.unit = '次';
          }
          this.calculateCanEditName();
        }
      });
    },
    // 修改当前项
    update_item() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.registration.cost = parseFloat(this.registration.cost);
      this.registration.price = parseFloat(this.registration.price);
      httpServerNormal(modifyChargitem, {
        item_id: this.registration.item_id,
        items: [
          { name: 'seq_num', newVal: this.registration.seq_num },
          { name: 'name', newVal: this.registration.name },
          { name: 'price', newVal: this.registration.price },
          { name: 'cost', newVal: this.registration.cost },
          { name: 'unit', newVal: this.registration.unit || '次' },
          { name: 'szsbcode', newVal: this.registration.seq_num },
          { name: 'szsbname', newVal: this.registration.name },
          { name: 'szsbprice', newVal: this.registration.szsbprice },
          { name: 'szsbzhenliaokey', newVal: this.registration.szsbzhenliaokey },
        ],
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.updateView();
          this.reset();
        }
      });
    },
    // 修改状态
    changeStatus(index, status) {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(modifyChargitem, {
        item_id: this.registrations[index].item_id,
        items: [
          { name: 'disabled', newVal: status + '' },
        ],
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.registrations[index].disabled = status;
        }
      });
    },
    calculateCanEditName() {
      // this.canEditName = this.action === 'edit' && this.registration.seq_num.length > 0;
    },
  },
  computed: {
    oparation() {
      return this.action === 'edit' ? '编辑' : '新增';
    },
  },
  filters: {
    statusFilter(val) {
      return val === 0 ? '已启用' : '已禁用';
    },
    clinicDateFilter(str1) {
      const str = str1 + '';
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
    szsbstatusFilter(val) {
      if (val <= 0) {
        return '未备案';
      } else if (val === 1) {
        return '已备案';
      }
    },
  },
  created() {
    this.getItemList();
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
.treament{
  position: relative;
  padding: 30px 40px 60px 40px;
  .new_section{
    padding: 10px;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .treaments{
    .el-table .el-table__body-wrapper .el-table__body .el-table__row .cell .el-button{
      padding: 0;
      font-size: 14px;
      &.forbid{
        color: red;
      }
    }
  }
  // .el-pagination{
  //   @include pagination_to_bottom;
  // }
  .modify_section{
    @include modify_info;
  }
}
.el-autocomplete {
  width: 100%;
}
.thinkName {
  border-bottom: 1px solid #ccc;
  line-height: 25px;
  height: 50px;
  padding: 0 5px;
  p {
    font-size: 12px;
    color: #888;
    width: 238px;
    height: 25px;
    display: flex;
    align-items: center;
    &:first-child {
      justify-content: space-between;
    }
    span {
      max-width: 200px;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .code {
      color: $mainColor;
    }
  }
}
</style>
