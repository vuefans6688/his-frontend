<template>
  <div class="treament" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="new_section">
      <el-button size="small" type="primary" @click="modify_material(-1)">新增其他收费项</el-button>
    </div>
    <div class="treaments">
      <el-table
        :data="materials"
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
          prop="unit"
          label="单位"
          align="center">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center">
          <template slot-scope="scope">
            {{scope.row.create_time | clinicDateFilter}}
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
            <el-button type="text" size="small" @click="modify_material(scope.$index)">编辑</el-button>
            <el-button v-show="scope.row.disabled === 0" type="text" class="forbid" @click="forbid_material(scope.$index)">禁用</el-button>
            <el-button v-show="scope.row.disabled !== 0" type="text" @click="start_material(scope.$index)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-pagination
      :page-size="this.pagesize"
      layout="total, prev, pager, next, jumper"
      :total="this.total"
      @current-change="pageChage">
    </el-pagination> -->
    <div class="modify_section" v-show="modify_material_show">
      <div class="container">
        <div class="close" @click="modify_material_cancel('material')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">{{this.oparation}}其他收费项</h1>
        <div class="content">
          <el-form :model="material" :rules="rules_material" ref="material" label-width="100px" label-position="left" size="small">
            <el-form-item label="社保编号:" prop="seq_num">
              <el-input v-model="material.seq_num"></el-input>
            </el-form-item>
            <!-- <el-form-item label="名称:" prop="name">
              <el-input v-model="material.name"></el-input>
            </el-form-item> -->
            <el-form-item label="名称:" prop="name">
              <template solt-scope='scope'>
                <el-autocomplete popper-class="my-autocomplete" v-model="material.name" :disabled="canEditName" :fetch-suggestions="querySearch" placeholder="请选择收费项名称" :trigger-on-focus="false" @select="handleSelect">  
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
              <el-input v-model="material.cost" ref="cost" @keyup.native="myPriceLimit('cost')" @blur="paddingZero('cost', 2)"></el-input>
            </el-form-item>
            <el-form-item label="销售价:" prop="price">
              <el-input v-model="material.price" ref="price" @keyup.native="myPriceLimit('price')" @blur="paddingZero('price', 2)"></el-input>
            </el-form-item>
            <el-form-item label="单位:" prop="unit">
              <el-input v-model="material.unit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="modify_material_confirm('material')">确定</el-button>
              <el-button round @click="modify_material_cancel('material')">取消</el-button>
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
      materials: [],
      modify_material_show: false,
      material: {
        type: 6,
        seq_num: '',
        name: '',
        cost: '',
        price: '',
        unit: '',
        szsbcode: '',
        szsbname: '',
        szsbprice: 0,
        szsbzhenliaokey: '',
      },
      canEditName: false,
      selectedItem: {}, // 点击联想选中的信息
      rules_material: {
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
        unit: [
          { required: true, message: '请输入单位', trigger: 'blur' },
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
      this.material.seq_num = item.code;
      this.material.szsbzhenliaokey = item.key;
      httpServerNormal(getzhenliaoByKey, {
        key: item.key,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.selectedItem = res.zhenliao;
          this.material.name = res.zhenliao.ake002;
          this.material.szsbprice = res.zhenliao.bkm055 || 0;
        }
      });
    },
    modify_material(index) {
      this.index = index;
      this.action = index > -1 ? 'edit' : 'new';
      if (index > -1) {
        this.getCurItem();
      }
      this.modify_material_show = true;
      this.$emit('destroyScroll');
      this.calculateCanEditName();
    },
    modify_material_cancel(ruleForm) {
      this.modify_material_show = false;
      // reset
      this.$refs[ruleForm].resetFields();
      this.$emit('initScroll');
    },
    modify_material_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.modify_material_show = false;
          this.$emit('initScroll');
          // 修改成功的处理
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
    start_material(index) {
      this.changeStatus(index, 0);
    },
    forbid_material(index) {
      this.$confirm('禁用后将无法使用, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.changeStatus(index, 1);
      });
    },
    myPriceLimit(th) {
      this.material[th] = floatLimit(this.material[th], 2);
    },
    // 末尾补零
    paddingZero(label, len) {
      this.material[label] = paddingEndZero(this.material[label], len);
    },
    reset() {
      // reset
      this.material = {
        seq_num: '',
        type: 6,
        name: '',
        cost: '',
        price: '',
        unit: '',
        szsbcode: '',
        szsbname: '',
        szsbprice: 0,
        szsbzhenliaokey: '',
      };
      this.selectedItem = {};
      this.$refs.material.resetFields();
      this.modify_material_show = false;
      this.$emit('initScroll');
    },
    updateView() {
      this.materials[this.index].seq_num = this.material.seq_num;
      this.materials[this.index].name = this.material.name;
      this.materials[this.index].cost = this.material.cost;
      this.materials[this.index].price = this.material.price;
      this.materials[this.index].unit = this.material.unit;
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
        type: 6,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.materials = res && res.length ? res : [];
        }
      });
    },
    addItem() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.material.type = parseInt(this.material.type, 10);
      this.material.cost = parseFloat(this.material.cost);
      this.material.price = parseFloat(this.material.price);
      httpServerNormal(createChargitem, {
        ...this.material,
        szsbcode: this.material.seq_num,
        szsbname: this.material.name,
        szsbprice: this.material.szsbprice,
        szsbpricelevel: '4',
        szsbzhenliaokey: this.material.szsbzhenliaokey,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.materials.push(res);
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
        item_id: this.materials[this.index].item_id,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.material = res;
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
      this.material.cost = parseFloat(this.material.cost);
      this.material.price = parseFloat(this.material.price);
      httpServerNormal(modifyChargitem, {
        item_id: this.material.item_id,
        items: [
          { name: 'seq_num', newVal: this.material.seq_num },
          { name: 'name', newVal: this.material.name },
          { name: 'price', newVal: this.material.price },
          { name: 'cost', newVal: this.material.cost },
          { name: 'unit', newVal: this.material.unit },
          { name: 'szsbcode', newVal: this.material.seq_num },
          { name: 'szsbname', newVal: this.material.name },
          { name: 'szsbprice', newVal: this.material.szsbprice },
          { name: 'szsbzhenliaokey', newVal: this.material.szsbzhenliaokey },
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
        item_id: this.materials[index].item_id,
        items: [
          { name: 'disabled', newVal: status + '' },
        ],
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.materials[index].disabled = status;
        }
      });
    },
    calculateCanEditName() {
      // this.canEditName = this.action === 'edit' && this.material.seq_num.length > 0;
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
