<template>
<div class="medpricing">
  <div class="header my_titleInpStyle">
      <span class="m_l10">申请单号:</span>
      <span class="m_l10">{{Apply_num}}</span>
      <span class="m_l30">制单日期:</span>
      <el-date-picker v-model="userData1.making_date" type="date" placeholder="选择日期" class="w_150 m_l10" size="small"></el-date-picker>
      <span class="m_l30">制单人:</span>
      <el-input v-model="userData1.making_man" placeholder="" class="w_150 m_l10" size="small"></el-input>
  </div>

  <div class="content" id="addstore_con">
    <div class=" d_inb fl">
      <span class="m_l10">药品名称:</span>
      <el-input placeholder="" class="w_200 m_l10" v-model="userDatas.ipt" size="small"> </el-input>
      <!-- <el-button  type="primary" class="m_l10" @click="search">搜索</el-button> -->
    </div>
    <div class=" fr d_inb">
      <el-button type="primary"  size="small">提交</el-button>
      <el-button type="info"  size="small">取消</el-button>
    </div>

    <div class="m_t10">
    <el-table :data="tableData | msgFilter(sou.ipt)" style="width: 100%">
    <el-table-column type="index" width="50" label="序号" align="center">
    </el-table-column>
    <el-table-column prop="med_name" label="药品名称" align="center">
    </el-table-column>
    <el-table-column prop="med_gui" label="药品规格" align="center">
    </el-table-column>
    <el-table-column prop="med_factory" label="生产厂家" width="200" show-overflow-tooltip align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.row.id].factory" class="d_inb" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="原处方价" align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.row.id].Original_price" class="d_inb w_57" size="small"></el-input>
        <span>/{{tableData[scope.row.id].unit}}</span>
      </template>
    </el-table-column>
    <el-table-column label="原零售价" align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.row.id].Original_Retail_price" class="d_inb w_57" size="small"></el-input>
        <span>/{{tableData[scope.row.id].unit}}</span>
      </template>
    </el-table-column>
    <el-table-column label="新处方价" align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.row.id].New_price" class="d_inb w_57" size="small"></el-input>
        <span>/{{tableData[scope.row.id].unit}}</span>
      </template>
    </el-table-column>
    <el-table-column label="新零售价" align="center">
      <template slot-scope="scope">
        <el-input v-model="tableData[scope.row.id].New_Retail_price" class="d_inb w_57" size="small"></el-input>
        <span>/{{tableData[scope.row.id].unit}}</span>
      </template>
    </el-table-column>
    <el-table-column  align="center">
      <template slot-scope="scope">
        <i class="el-icon-delete del_i" @click="del(scope.row.id)"></i>
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
      tableData: [
        {
          id: 1,
          med_name: '草果',
          med_gui: '1.0g',
          med_factory: '哈药六厂',
          unit: '盒',
          factory: '',
          Original_price: '',
          Original_Retail_price: '',
          New_price: '',
          New_Retail_price: '',
        }, {
          id: 0,
          med_name: '草果',
          med_gui: '1.0g',
          med_factory: '哈药六厂',
          unit: '包',
          Original_price: '',
          Original_Retail_price: '',
          New_price: '',
          New_Retail_price: '',
          factory: '',
        }, {
          id: 2,
          med_name: '龙国',
          med_gui: '1.0g',
          med_factory: '中英制药',
          unit: '盒',
          Original_price: '',
          Original_Retail_price: '',
          New_price: '',
          New_Retail_price: '',
          factory: '',
        }, {
          id: 3,
          med_name: '草果',
          med_gui: '1.0g',
          med_factory: '云南白药',
          unit: '包',
          Original_price: '',
          Original_Retail_price: '',
          New_price: '',
          New_Retail_price: '',
          factory: '',
        }, {
          id: 4,
          med_name: '葡萄',
          med_gui: '1.0g',
          med_factory: '天神制药',
          unit: '盒',
          Original_price: '',
          Original_Retail_price: '',
          New_price: '',
          New_Retail_price: '',
          factory: '',
        }, {
          id: 5,
          med_name: '红素',
          med_gui: '1.0g',
          med_factory: '飞鹰药品',
          unit: '盒',
          Original_price: '',
          Original_Retail_price: '',
          New_price: '',
          New_Retail_price: '',
          factory: '',
        },
      ],
      arr: [],
      Apply_num: 'M25554', // 申请单号
      // 分页
      currentPage4: 4,
      // 输入的数据
      userData1: {
        making_date: '',
        making_man: '',
      },
      userData2: {
        factory: '',
        Original_price: '',
        Original_Retail_price: '',
        New_price: '',
        New_Retail_price: '',
      },
      sou: {
        ipt: '',
      },
      userDatas: {
        ipt: '',
      },
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    del(index) {
      this.tableData.splice(index, 1);
    },
    search() {
      this.sou.ipt = this.userDatas.ipt;
    },
  },
  filters: {
    msgFilter(arr, name) {
      let target = arr;
      target = target.filter((obj) => {
        return obj.med_name.indexOf(name) > -1;
      });
      return target;
    },
  },
};
</script>

<style scoped lang='scss'>
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medpricing{
  position: relative;
  padding: 30px 40px;
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
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
}
#addstore_con{
  min-width: 1100px;
  margin: 10px auto;
}
.m_l10{
  margin-left:10px; 
}
.m_l30{
  margin-left:30px;
}
.l_h49{
  line-height: 45px;
}
.voucher{
  display: inline-block;
  width: 100px;
}
.total{
  font-weight: 900;
  font-size: 16px;
}
.d_inb{
  display: inline-block;
}
.m_t20{
  margin-top: 20px;
}
.m_t10{
  margin-top: 10px;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
.w_57{
  width: 57px;
}
.w_150{
    width: 150px;
}
.w_200{
    width: 200px;
}
.del_i{
    cursor: pointer;
}
.fr{
  float: right;
}
.fl{
  float: left;
}
</style>
