<template>
<div class="medaudit2">
  <div class="header">
    <el-button type="info" @click="goback">返回</el-button>
    <el-button type="danger" @click="backto">打回</el-button>
    <el-button type="primary" @click="allowaudit">审核</el-button>
  </div>

  <div class="content" id="addstore_con">
    <div class="">
      <div class="single fl l_h49">
      <span class="m_l10">入库单号:</span>
      <span class="single_num">{{single_num}}</span>
    </div>
    <div class="fl l_h49 m_l30">
      <span class="m_l10">制单人:</span>
      <span class="voucher">{{voucher}}</span>
    </div>
    <div class="fl l_h49 m_l30">
        <span class="m_l10">制单日期:</span>
        <span class="making_date">{{making_date}}</span>
    </div>
    <div class="fl l_h49 m_l30">
      <span class="m_l10">供应商:</span>
      <span class="suppliers">{{suppliers}}</span>
    </div>
    </div>
    <div class="mon_total fr m_r50 m_b20">
      <span class="total">入库总金额:</span>
      <span class="money m_l10">{{money}}</span>
    </div>

    <div class="m_t20">
    <el-table :data="tableData" style="width: 100%" >
    <el-table-column type="index" width="50" label="序号" align="center">
    </el-table-column>
    <el-table-column prop="med_name" label="药品名称"  align="center">
    </el-table-column>
    <el-table-column prop="med_gui" label="药品规格"  align="center">
    </el-table-column>
    <el-table-column prop="med_factory" label="生产厂家" show-overflow-tooltip width="190" align="center">
    </el-table-column>
    <el-table-column label="数量" width="100" align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.$index].quantity"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="100" align="center">
      <template slot-scope="scope">
          <el-select v-model="tableData[scope.$index].unit" placeholder="">
            <el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
      </template>
    </el-table-column>
    <el-table-column label="批发价"  align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.$index].wholesale_price"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="处方价"  align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.$index].price_prescription"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="零售价" align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.$index].retail_price"></el-input>
      </template>
    </el-table-column>
    <el-table-column  prop="wholesale_amount" label="批发额" align="center">
    </el-table-column>
    <el-table-column  prop="Production_date" label="生产日期" align="center">
    </el-table-column>
    <el-table-column prop="validity_date" label="有效期" align="center">
    </el-table-column>
    <el-table-column width="40" align="center">
      <template slot-scope="scope">
        <i class="el-icon-delete pointer" @click="del(scope.$index, scope.row)"></i>
      </template>
    </el-table-column>
  </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="40">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      single_num: '926347',
      voucher: '虚竹',
      suppliers: '云南白药',
      money: '200.00',
      making_date: '2017-09-09',
      //   分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      //   单位select
      option2: [{ value: 'g', label: 'g' }, { value: 'kg', label: 'kg' }],
      tableData: [
        {
          med_name: '草果',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '哈药六厂哈药六厂哈药六厂哈药六厂哈药六厂哈药六厂',
          unit: '',
          wholesale_amount: '￥440',
          Production_date: '2017-10-09',
          validity_date: '2019-09-29',
          quantity: '',
          wholesale_price: '',
          retail_price: '',
        }, {
          med_name: '飞龙',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '中国厂',
          unit: '',
          wholesale_amount: '￥230',
          Production_date: '2037-14-09',
          validity_date: '2012-09-29',
          quantity: '',
          wholesale_price: '',
          retail_price: '',
        }, {
          med_name: '龙须草',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '中盖六厂',
          unit: '',
          wholesale_amount: '￥2120',
          Production_date: '2027-13-02',
          validity_date: '2034-19-49',
          quantity: '',
          wholesale_price: '',
          retail_price: '',
        }, {
          med_name: '佛手',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '天神制药',
          unit: '',
          wholesale_amount: '￥320',
          Production_date: '2067-14-09',
          validity_date: '2014-32-23',
          quantity: '',
          wholesale_price: '',
          retail_price: '',
        }, {
          med_name: '含羞草',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '广药六厂',
          unit: '',
          wholesale_amount: '￥204',
          Production_date: '2012-10-09',
          validity_date: '2013-09-29',
          quantity: '',
          wholesale_price: '',
          retail_price: '',
        }, {
          med_name: '鬼切草',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '云南白药',
          unit: '',
          wholesale_amount: '￥2',
          Production_date: '2011-13-05',
          validity_date: '2015-39-24',
          quantity: '',
          wholesale_price: '',
          retail_price: '',
        },
      ],
      // 输入的数据
      userData: {
        quantity: '',
        wholesale_price: '',
        price_prescription: '',
        retail_price: '',
      },
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    del(a) {
      this.tableData.splice(a, 1);
    },
    backto() {
      this.$message({
        message: '已打回！',
        type: 'warning',
      });
    },
    allowaudit() {
      this.$message({
        message: '已通过审核！',
        type: 'success',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medaudit2{
  position: relative;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
  /* header里的样式 */
.header{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
.supplier{
    width: 30%;
    float: right;
}
#addstore_con{
    width: 92%;
    margin: 10px auto;
}
.m_l10{
  margin-left:10px; 
}
.m_l30{
  margin-left:30px;
}
.l_h49{
  line-height: 49px;
}
.single_num{
  width: 100px;
  display: inline-block;
}
.voucher{
  display: inline-block;
  width: 100px;
}
.mon_total{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #000;
}
.money{
  width: 100px;
  display: inline-block;
  font-weight: 900;
  color: #000;
}
.m_r50{
  margin-right: 50px;
}
.m_b20{
  margin-bottom: 20px;
}
.total{
  font-weight: 900;
  font-size: 16px;
}
.d_inb{
  display: inline-block;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
</style>
