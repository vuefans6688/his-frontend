<template>
  <div class="treament" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请稍后" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
    <div class="new_section">
      <div class="left">
        <el-button size="small" type="primary" @click="modify_trentment(-1)">新增诊疗项目</el-button>
        <el-upload
          class="upload-btn"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          :before-upload="beforeFileUpload"
        >
          <el-button class="up-btn" slot="trigger" size="small" type="primary">一键导入</el-button>
        </el-upload>
        <div class="search">
          <span class="">搜索:</span>
          <el-input placeholder="请输入常见诊断结果" class="input-with-select" @keyup.native="initToal" v-model="searchWord" size="small" />
          <!-- <input v-model="searchWord" placeholder="搜索诊疗项目" class="in_block w_200 myInput" size="small"> -->
        </div>
      </div>
      <a href="/static/诊疗项目批量导入.xlsx" class="download">下载模板</a>
    </div>
    <div class="treaments">
      <el-table
        :data="showData"
        style="width: 100%"
        type="index"
        stripe>
        <el-table-column align="center" prop="szsbcode" label="社保编号"/>
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column prop="cost" label="成本价" align="center" />
        <el-table-column prop="price" label="项目单价" align="center" />
        <el-table-column prop="unit" label="单位" align="center" />
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.create_time | clinicDateFilter}}
          </template>
        </el-table-column>
        <el-table-column label="社保备案状态" align='center'>
          <template slot-scope="scope">
            {{scope.row.szsbstatus | szsbstatusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="是否自费" align='center'>
          <template slot-scope="scope">
            {{scope.row.own_pay | own_payFilter}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.disabled | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify_trentment(scope.$index)">编辑</el-button>
            <el-button v-show="scope.row.disabled === 0" type="text" class="forbid" @click="forbid_treament(scope.$index)">禁用</el-button>
            <el-button v-show="scope.row.disabled !== 0" type="text" @click="start_treament(scope.$index)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      :page-size="pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      :current-page="pageindex+1"
      @current-change="pageChage">
    </el-pagination>
    <!-- modify_section -->
    <div class="modify_section" v-show="modify_treament_show">
      <div class="container">
        <div class="close" @click="modify_trentment_cancel('treanent')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">{{this.oparation}}诊疗项目</h1>
        <div class="content">
          <el-form :model="treament" :rules="rules_treanent" ref="treanent" label-width="100px" size="small">
            <el-form-item label="社保编号:" prop="szsbcode">
              <el-input v-model="treament.szsbcode" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="名称:" prop="name">
              <template solt-scope='scope'>
                <el-autocomplete popper-class="my-autocomplete" v-model="treament.name" :disabled="canEditName" :fetch-suggestions="querySearch" placeholder="请选择诊疗项目名称" :trigger-on-focus="false" @select="handleSelect">  
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
              <el-input v-model="treament.cost" @keyup.native="myPriceLimit('cost')" @blur="paddingZero('cost', 2)"></el-input>
            </el-form-item>
            <el-form-item label="销售价:" prop="price">
              <el-input v-model="treament.price" @keyup.native="myPriceLimit('price')" @blur="paddingZero('price', 2)"></el-input>
            </el-form-item>
            <el-form-item label="单位:" prop="unit">
              <el-input v-model="treament.unit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="modify_trentment_confirm('treanent')">确定</el-button>
              <el-button round @click="modify_trentment_cancel('treanent')">取消</el-button>
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
import XLSX from 'xlsx';
import httpServerNormal from '@httpServerNormal';
import { fuzzysearchzhenliao, getzhenliaoByKey, createChargitem, getChargitemInfo, modifyChargitem, getChargitemList } from '@apiNormal';
// import getClinicID from '@/serviceNormal/getClinicID';

export default {
  data() {
    return {
      loading: null,
      fullscreenLoading: false,
      treaments: [],
      modify_treament_show: false,
      treament: {
        seq_num: '', // 社保编号
        type: 3,
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
      rules_treanent: {
        szsbcode: [
          // { required: true, message: '请输入编号', trigger: 'blur' },
          // { validator: validateID, trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'change' },
          // { validator: validateName, trigger: 'change' },
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
      searchWord: '', // 搜索诊疗项
      searchData: [], // 搜索出来的数据
      // 分页
      pageindex: 0,
      pagesize: 10,
      total: 0,
      // 读取文件相关
      fileList: [],
      outputs: [],
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
      this.treament.seq_num = item.code;
      this.treament.szsbzhenliaokey = item.key;
      httpServerNormal(getzhenliaoByKey, {
        key: item.key,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.selectedItem = res.zhenliao;
          this.treament.name = res.zhenliao.ake002;
          this.treament.szsbprice = res.zhenliao.bkm055 || 0;
          this.treament.szsbcode = res.zhenliao.ake001 || 0;
          this.treament.unit = res.zhenliao.aka067 || '';
        }
      });
    },
    modify_trentment(index) {
      this.index = index;
      this.action = index > -1 ? 'edit' : 'new';
      if (index > -1) {
        this.getCurItem();
      }
      this.modify_treament_show = true;
      this.$emit('destroyScroll');
    },
    modify_trentment_cancel(ruleForm) {
      // reset
      this.$refs[ruleForm].resetFields();
      this.modify_treament_show = false;
      this.$emit('initScroll');
    },
    modify_trentment_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
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
    start_treament(index) {
      this.changeStatus(index, 0);
    },
    forbid_treament(index) {
      this.$confirm('禁用后将无法使用, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.changeStatus(index, 1);
      });
    },
    myPriceLimit(th) {
      this.treament[th] = floatLimit(this.treament[th], 2);
    },
    // 末尾补零
    paddingZero(label, len) {
      this.treament[label] = paddingEndZero(this.treament[label], len);
    },
    reset() {
      // reset
      this.treament = {
        seq_num: '',
        type: 3,
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
      this.$refs.treanent.resetFields();
      this.modify_treament_show = false;
      this.$emit('initScroll');
    },
    updateView() {
      this.showData[this.index].seq_num = this.treament.seq_num;
      this.showData[this.index].name = this.treament.name;
      this.showData[this.index].cost = this.treament.cost;
      this.showData[this.index].price = this.treament.price;
      this.showData[this.index].unit = this.treament.unit;
    },
    // 分页
    pageChage(curPage) {
      this.pageindex = curPage - 1;
      // this.getItemList();
    },
    initToal() {
      this.pageindex = 0;
    },
    getItemList() { // http request 全部获取
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      httpServerNormal(getChargitemList, {
        disabled: 2,
        type: 3,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.treaments = res && res.length ? res : [];
          this.total = this.treaments.length;
        }
      });
    },
    addItem() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.treament.type = parseInt(this.treament.type, 10);
      this.treament.cost = parseFloat(this.treament.cost);
      this.treament.price = parseFloat(this.treament.price);
      // const seq_num = getClinicID() === 'df6b4667-9d28-488f-84be-eae31d865675' || '592e35b7-1e06-431e-a8df-7cf9f33bafa4' ? parseInt(new Date().getTime() / 1000, 10).toString(32) + this.treament.seq_num : this.treament.seq_num;
      // const seq_num = parseInt(new Date().getTime() / 1000, 10).toString(32) + this.treament.seq_num;
      const seq_num = this.treament.seq_num;
      httpServerNormal(createChargitem, {
        ...this.treament,
        szsbcode: this.treament.seq_num,
        seq_num: seq_num,
        szsbname: this.treament.name,
        szsbprice: this.treament.szsbprice,
        szsbzhenliaokey: this.treament.szsbzhenliaokey,
        szsbpricelevel: '4',
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.treaments.unshift(res);
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
        item_id: this.showData[this.index].item_id,
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.treament = res;
        }
      });
    },
    // 修改当前项
    update_item() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 6000);
      this.treament.cost = parseFloat(this.treament.cost);
      this.treament.price = parseFloat(this.treament.price);
      httpServerNormal(modifyChargitem, {
        item_id: this.treament.item_id,
        items: [
          { name: 'seq_num', newVal: this.treament.seq_num },
          { name: 'name', newVal: this.treament.name },
          { name: 'price', newVal: this.treament.price },
          { name: 'cost', newVal: this.treament.cost },
          { name: 'unit', newVal: this.treament.unit },
          { name: 'szsbcode', newVal: this.treament.szsbcode },
          { name: 'szsbname', newVal: this.treament.name },
          { name: 'szsbprice', newVal: this.treament.szsbprice },
          { name: 'szsbzhenliaokey', newVal: this.treament.szsbzhenliaokey },
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
        item_id: this.showData[index].item_id,
        items: [
          { name: 'disabled', newVal: status + '' },
        ],
      }).then((res) => {
        this.fullscreenLoading = false;
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.showData[index].disabled = status;
        }
      });
    },
    close_loading() {
      if (this.loading) {
        this.loading.close();
      }
    },
    // 上传文件之前的钩子
    beforeFileUpload(file) {
      this.loading = this.$loading({ lock: true, text: '信息上传中', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
      const that = this;
      if (file.size <= 0) { // 如果没有文件名
        this.close_loading();
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
        this.close_loading();
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary',
          });
          const wsname = workbook.SheetNames[0]; // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
          that.outputs = []; // 清空接收数据
          for (let i = 0; i < ws.length; i++) {
            const sheetData = {
              type: 3,
              szsbzhenliaokey: '',
              szsbcode: ws[i]['社保编号'] ? '' + ws[i]['社保编号'] : '',
              seq_num: ws[i]['社保编号'] ? '' + ws[i]['社保编号'] : '',
              szsbname: ws[i]['名称'],
              name: ws[i]['名称'],
              szsbprice: ws[i]['社保价'] ? +ws[i]['社保价'] : 0,
              price: +ws[i]['销售价'],
              cost: +ws[i]['成本价'],
              unit: ws[i]['单位'],
              szsbpricelevel: '4',
            };
            that.outputs.push(sheetData);
          }
          console.log(`从文档中读到${that.outputs.length}条数据`, that.outputs);
          this.batchImport(this.outputs);
        } catch (e) {
          this.close_loading();
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    // 批量获取szsbzhenliaokey,然后添加
    batchImport(arr) {
      setTimeout(() => {
        this.close_loading();
      }, 5000);
      arr.forEach((e) => {
        if (e.seq_num && e.szsbcode) {
          httpServerNormal(fuzzysearchzhenliao, {
            name: e.szsbname,
          }).then((res) => {
            if (!(typeof res === 'string' && res.includes('ERRORCOD E'))) {
              // 成功的回调( 直接返回data)
              if (res && res.outputlist && res.outputlist.length) {
                e.szsbzhenliaokey = res.outputlist[0].key;
                if (e.szsbzhenliaokey) {
                  httpServerNormal(createChargitem, e).then((res) => {
                    if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
                      this.treaments.unshift(res);
                      this.reset();
                    }
                  });
                }
              } else {
                console.log(`${e.szsbname}  库内没有`);
              }
            }
          });
        } else {
          httpServerNormal(createChargitem, e).then((res) => {
            if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
              this.treaments.unshift(res);
              this.reset();
            }
          });
        }
      });
      setTimeout(() => {
        this.$message.success('导入完成');
        this.getItemList();
      }, 4000);
    },
  },
  computed: {
    oparation() {
      return this.action === 'edit' ? '编辑' : '新增';
    },
    showData() {
      if (this.searchWord === '') {
        this.total = this.treaments.length;
        const pagecount = Math.ceil(this.treaments.length / this.pagesize);
        if (this.pageindex === pagecount - 1) {
          return this.treaments.slice(this.pageindex * this.pagesize);
        }
        return this.treaments.slice(this.pageindex * this.pagesize, (this.pageindex + 1) * this.pagesize);
      }
      this.searchData = this.treaments.filter((v) => { return v.name.indexOf(this.searchWord) > -1; });
      this.total = this.searchData.length;
      const pagecount = Math.ceil(this.searchData.length / this.pagesize);
      if (this.pageindex === pagecount - 1) {
        return this.searchData.slice(this.pageindex * this.pagesize);
      }
      return this.searchData.slice(this.pageindex * this.pagesize, (this.pageindex + 1) * this.pagesize);
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
      if (val === 1) {
        return '已备案';
      }
      return '未备案';
    },
    own_payFilter(val) {
      if (val === '99') {
        return '自费';
      }
      return '';
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
    display: flex;
    justify-content: space-between;
    .left{
      // width: 300px;
      display: flex;
      justify-content: space-around;
      .upload-btn{
        margin-left: 10px;
        .up-btn{
          height: 29px;
        }
      }
      .search{
        width: 300px;
        margin-left: 10px;
        .el-input {
          width: 200px;
          // margin: 10px 0;
        }
      }
    }
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
  .el-pagination{
    @include pagination_to_bottom;
  }
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
.download {
  // float: 'right';
  width: 80px;
  height: 29px;
  line-height: 29px; 
  background-color: $mainColor;
  border-radius: 2px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  margin-bottom: 15px;
}
</style>
