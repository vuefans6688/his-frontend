<template>
  <div class="m_t20 common">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="product_name" label="药品名称"  align="center" >
      </el-table-column>
      <el-table-column prop="specs_txt" label="药品规格" width="100" align="center" >
      </el-table-column>
      <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip width="230" align="center" tooltip-effect="light">
      </el-table-column>
      <el-table-column label="数量/单位" align="center" width="190">
        <template slot-scope="scope">
          <el-input v-model="scope.row.count_ulunit" @blur="save(scope.row)" @keyup.native="limit(scope.$index, 'count_ulunit')" size="small" class="w_80"></el-input>
          <!-- 西药可以选择单位 -->
          <el-select v-model="scope.row.count_ulname" class="w_80" size="small">
            <el-option :label="scope.row.specs.unit_large.specs_name" :value="scope.row.specs.unit_large.specs_name" />
            <el-option :label="scope.row.specs.unit_middle.specs_name" :value="scope.row.specs.unit_middle.specs_name" />
            <el-option v-if="scope.row.specs.unit_primary.specs_name" :label="scope.row.specs.unit_primary.specs_name" :value="scope.row.specs.unit_primary.specs_name" />
          </el-select>
          <!-- 中药默认只能是g -->
          <!-- <span v-if="scope.row.drug_type === 1">{{scope.row.count_ulname}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="批发价"  align="center" width="190">
        <template slot-scope="scope">
          <el-input v-model="scope.row.costprice" size="small" class="w_80" @blur="save(scope.row)" @keyup.native="limit(scope.$index, 'costprice')"></el-input>元/{{scope.row.count_ulname}}
          <!-- <span class="littletext" v-if="littletextConturl">{{ littletext }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="处方价"  align="center" width="190">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cf_price" size="small" class="w_80" @blur="save(scope.row)" @keyup.native="limit(scope.$index, 'cf_price')"></el-input>元/{{scope.row.count_ulname}}
        </template>
      </el-table-column>
      <el-table-column label="零售价" align="center" width="190">
        <template slot-scope="scope">
          <el-input v-model="scope.row.saleprice" size="small" class="w_80" @blur="save(scope.row)" @keyup.native="limit(scope.$index, 'saleprice')"></el-input>元/{{scope.row.count_ulname}}
        </template>
      </el-table-column>
      <el-table-column  label="批号" align="center" width="190">
        <template slot-scope="scope">
          <el-input v-model="scope.row.push_id" size="small" @blur="save(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="到期日" align="center" width="190">
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.validtime" type="date" placeholder="选择日期" size="small" class="w_130" @blur="save(scope.row)" :picker-options="pickerOptions1"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column width="40" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete del_i" @click="del(scope.row.purchasekey)"></i>
        </template>
      </el-table-column>
    </el-table>

    <div class="del_btn">
      <el-button type="primary" @click="modyfy_addmed" size="small">添加药品</el-button>
    </div>

    <!-- 模态框 -->
    <div class="modyfy_addmed" v-show='modyfy_addmed_show'>
      <div class="container_m">
        <div class="header_m">
          <div class="title_m">添加药品</div>
          <!-- <span>全选添加最多选中10个</span> -->
        </div>
        <div class="close_m">
          <i class="el-icon-circle-close" @click="closemodyfy"></i>
        </div>
        <div class="content_m">
          <div class="search_m">
            <input placeholder="药品名称" v-model="mt.search" size="small" class="nameIpt">
          </div>
          <div class="yao_type_m">
            <span>药品类型:</span>
            <el-select class="yao_type_select" v-model="mt.med_class" size="small">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="yao_type_m">
            <el-button type="primary" size="small" @click="allow" class="m_l20">确定</el-button>
          </div>

          <div class="med_table_m">
            <el-table :data="msg_m" style="width: 100%" class="med_tab" @selection-change="handleSelectionChange2">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="product_name" label="药品名称" align="center">
              </el-table-column>
              <el-table-column label="处方类型" align="center">
                <template slot-scope="scope">
                  {{ scope.row.drugtype | drugtype }}
                </template>
              </el-table-column>
              <el-table-column prop="specs_txt" label="规格" width="160" show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip align="center">
              </el-table-column>
            </el-table>
          </div>
          <!-- 模态框分页 -->
          <div class="block fy_m">
            <el-pagination :current-page="currentPage2" :page-size="10" @current-change="handleCurrentChange2"
              layout="total, prev, pager, next, jumper" :total= "total2">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { floatLimit } from '@/utils/inputLimit';
import { purchasequeryitems } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';

export default {
  data() {
    return {
      // 入库药品数据
      tableData: [],
      // 分页
      currentPage: 1,
      currentPage2: 1,
      total: 0,
      total2: 0,
      pageindex1: 0,
      pageindex2: 0,
      // 模态框
      modyfy_addmed_show: false,
      multipleSelection2: [],
      options1: [
        { value: '', label: '全部' },
        { value: '0', label: '西/中成药' },
        { value: '1', label: '中药' },
      ],
      // 添加药品列表数据（模态框里）
      msg_m: [],
      // 搜索条件
      mt: {
        search: '',
        med_class: '',
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  filters: {
    drugtype(val) {
      if (val === '0') {
        return '西/中成药';
      } else if (val === '1') {
        return '中药';
      }
    },
  },
  methods: {
    // 将字段等于0的值改成空
    makeempty() {
      this.tableData.forEach((item, index) => {
        if (item.count_ulunit === 0) {
          this.tableData[index].count_ulunit = '';
        }
        if (item.costprice === 0) {
          this.tableData[index].costprice = '';
        }
        if (item.cf_price === 0) {
          this.tableData[index].cf_price = '';
        }
        if (item.saleprice === 0) {
          this.tableData[index].saleprice = '';
        }
        if (item.validtime === 0) {
          this.tableData[index].validtime = '';
        }
      });
    },
    // 查询该单入库药品列表（外面列表）,并向父组件传的药品数组
    purchasequeryitemsAll() {
      httpServerNormal(purchasequeryitems, {
        purchase_sn: this.purchrecodecreate.purchaseSn,
        pagesize: 9999999,
        pageid: 0,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const list = res.context || [];
          // if (res.clinic_id === '04dd0947-8caf-4375-8e30-89c6d0bf09bc') {
          //   list.forEach((i) => {
          //     i.count_ulunit = 500;
          //     i.saleprice = i.shebao_price || 0;
          //     i.costprice = i.shebao_price || 0;
          //     i.cf_price = i.shebao_price || 0;
          //     i.push_id = '' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
          //     i.count_ulunit = i.count_ulunit || 0;
          //   });
          // } else {
          //   list.forEach((i) => {
          //     i.saleprice = i.saleprice || 0;
          //     i.costprice = i.costprice || 0;
          //     i.cf_price = i.cf_price || 0;
          //     // i.push_id = '';
          //     i.count_ulunit = i.count_ulunit || 0;
          //   });
          // }
          list.forEach((i) => {
            i.saleprice = i.saleprice || 0;
            i.costprice = i.costprice || 0;
            i.cf_price = i.cf_price || 0;
            // i.push_id = '20190222';
            i.count_ulunit = i.count_ulunit || 0;
          });
          this.tableData = list;
          this.total = res.pagecount || 0;
          this.makeempty();
          this.$emit('send', this.tableData);
          if (this.tableData.length) {
            this.$emit('listenToChildEvent', '1');
          }
        }
      });
    },
    // 删除该行药品
    del(purchasekey) {
      this.$http.post('/service/drug/purchasedelitem', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic,
          purchasekey: purchasekey,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.purchasequeryitemsAll(); // 把全部数组传到父组件
          setTimeout(() => {            // 当删除到药品为空时，向父组件传0
            if (this.tableData.length === 0) {
              this.$emit('listenToChildEvent', '0');
            }
          }, 100);
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
        }
      }).catch(() => {
      });
    },
    // 换行提交保存
    save(val) {
      if (val.saleprice === '' || val.saleprice === 0) {
        val.saleprice = val.costprice;
      }
      if (val.cf_price === '' || val.cf_price === 0) {
        val.cf_price = val.costprice;
      }
      if (val.count_ulname !== '' & val.count_ulname !== 0 & val.count_ulunit !== '' & val.count_ulunit !== 0 & val.validtime !== ''
      & val.validtime !== 0 & val.costprice !== '' & val.costprice !== 0 & val.saleprice !== '' & val.saleprice !== 0 & val.cf_price !== ''
      & val.cf_price !== 0 & val.push_id !== '') {
        this.$http.post('/service/drug/purchaseupdateitem', {
          head: {
            accessToken: this.token,
            lastnotice: 0,
          },
          body: {
            clinic_id: this.clinic,
            purchasekey: val.purchasekey,
            count_ulname: val.count_ulname,
            count_ulunit: Number(val.count_ulunit),
            validtime: Number(val.validtime),
            costprice: Number(val.costprice),
            saleprice: Number(val.saleprice),
            cf_price: Number(val.cf_price),
            push_id: val.push_id,
          },
        });
        // .then(() => {
        //   this.purchasequeryitemsAll();
        // }).catch(() => {
        // });
      }
    },
    // 添加药品请求查询药品信息（模态框里列表）
    infolistquery() {
      this.$http.post('/service/drug/infolistquery', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          pageid: this.pageindex2,
          pagesize: 10,
          clinic_id: this.clinic,
          drugname: this.mt.search,
          drugtype: this.mt.med_class,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          if (!res.data.data) { // 如果没有则返回空
            this.msg_m = [];
          } else {
            this.total2 = res.data.data.pagecount;
            this.msg_m = res.data.data.diarr.filter(val => val.use_enable === 1); // 过滤掉禁用的
          }
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: res.data.errmsg,
          });
          this.msg_m = [];
        }
      }).catch(() => {
      });
    },
    // 添加药品按钮
    modyfy_addmed() {
      this.modyfy_addmed_show = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
      // 添加药品请求查询药品信息
      this.infolistquery();
    },
    // 模态框分页
    handleCurrentChange2(val) {
      this.pageindex2 = val - 1;
      this.infolistquery();
    },
    // 关闭模态框
    closemodyfy() {
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
      this.modyfy_addmed_show = false;
    },
    // 添加药品的勾选
    handleSelectionChange2(array) {
      this.multipleSelection2 = array;
    },
    // 添加药品确认键
    allow() {
      if (this.tableData.length + this.multipleSelection2.length > 50) {
        this.$message({ message: '当前入库单药品已经超过50条！', type: 'error' });
        return;
      }
      const arr = [];  // 用作传递后台
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1); // 药品过期时间
      this.multipleSelection2.forEach((val) => {
        arr.push({
          drugkey: val.drug_key,
          count_ulname: val.specs.unit_large.specs_name,
          count_ulunit: 0,
          validtime: Date.parse(d),
          product_time: 0,
          costprice: 0,
          saleprice: 0,
          cf_price: 0,
        });
      });
      // 增加采购药品
      this.$http.post('/service/drug/purchaseadditem', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          purchase_sn: this.purchrecodecreate.purchaseSn,
          context: arr,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'success',
            message: '添加成功!',
          });
          // this.modyfy_addmed_show = false;
          // this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
          this.$emit('listenToChildEvent', '1'); // 添加成功后，想父组件传1的信息
          this.purchasequeryitemsAll(); // 把全部数组传到父组件
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            type: 'error',
            message: '添加失败!',
          });
        }
      }).catch(() => {
      });
    },
    // 只能输入数字，后三位小数
    limit(index, str) {
      this.tableData[index][str] = floatLimit(this.tableData[index][str], 3);
    },
  },
  created() {
    if (this.purchrecodecreate.eidt) {
      this.purchasequeryitemsAll(); // 把全部药品传到父组件
    } else {
      this.tableData = [];
    }
    // 创建时，如果tableData的长度为0，则传给父组件0
    setTimeout(() => {
      if (this.tableData.length === 0) {
        this.$emit('listenToChildEvent', '0');
      }
    }, 200);
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'purchrecodecreate']),
  },
  watch: {
    mt: {
      handler() {
        this.infolistquery();
      },
      deep: true,
    },
  },
  beforeDestroy() {
    this.$store.commit('send_purchrecodecreate', '');
    this.tableData = [];
  },
};
</script>
<style lang='scss' scoped>
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.common{
  min-width: 1100px;
}
.del_btn{
  margin-top: 10px;
}
.del_i{
  font-size: 16px;
  cursor: pointer;
}
.m_t20{
  margin-top: 20px;
}
.modyfy_addmed{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(7, 17, 27, 0.5);
  overflow: auto;
  .container_m {
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translate3d(-50%, 0, 0);
    background: #fff;
    min-width: 800px;
    .nameIpt{
      -webkit-appearance: none;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #d8dce5;
      box-sizing: border-box;
      color: #5a5e66;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 1;
      outline: 0;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      height: 32px;
    }
    .header_m{
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      .title_m{
        margin-left: 20px;
        font-size: 20px;
        height: 40px;
        line-height: 40px;
      }
    }
    .close_m {
      position: absolute;
      right: 0;
      top: 0;
      padding: 6px;
      font-size: 20px;
      cursor: pointer;
    }
    .content_m {
      padding: 10px 30px;
    }
    .btn_group {
      padding: 10px 30px;
      text-align: left;
    }
  }
  .search_m{
    display: inline-block;
    width: 250px;
  }
  .med_type_m{
    display: inline-block;
    width: 200px;
    margin-left: 40px;
    .med_type_select{
      display: inline-block;
      width: 110px;
    }
  }
  .yao_type_m{
    display: inline-block;
    width: 200px;
    margin-left: 10px;
    .yao_type_select{
      display: inline-block;
      width: 130px;
    }
  }
}
// 模态框分页
.fy_m{
  margin-left: 10%;
  margin-top: 20px;
}
.med_table_m{
  height: 528px;
  overflow: auto;
}
.w_130{
  width: 130px;
}
.w_80{
  width: 80px;
}
.littletext{
  color: red;
  font-size: 5px;
}
.m_l20{
  margin-left: 20px;
}
</style>

