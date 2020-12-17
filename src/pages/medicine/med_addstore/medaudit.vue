<template>
  <div class="medaudit">
    <div class="header my_titleInpStyle">
      <!-- <span class="m_l10 fl lh45">入库单号:</span>
        <el-input v-model="userData.ret" class="med-ret m_l10 fl"></el-input> -->
      <span class="m_l10">制单日期:</span>
        <el-date-picker v-model="userData.value7" type="daterange" align="center" :editable="false" :clearable="false"
        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
        class="m_l10" size="small"></el-date-picker>
      <!-- <span class="m_l10 fl lh45">供应商:</span>
        <el-select v-model="userData.value1" class="fl m_l10">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
      <!-- <span class="lh45 m_l10 fl">审核状态:</span>
      <el-select v-model="userData.status" class="fl m_l10">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->

      <!-- <el-button type="primary" class="m_l10" size="small">搜索</el-button> -->

    </div>
    <div class="content">
      <el-table :data="tableData " style="width: 100%" class="m_t20">
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="Receipt_no" label="入库单号" align="center">
        </el-table-column>
        <el-table-column prop="batch_number" label="入库批号" align="center">
        </el-table-column>
        <el-table-column prop="making_people" label="制单人" align="center">
        </el-table-column>
        <el-table-column prop="making_date" label="制单日期" align="center">
        </el-table-column>
        <el-table-column prop="suppliers" label="供应商" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="Total_amount" label="采购总金额" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column prop="control" label="操作" align="center">
          <template slot-scope="scope">
            <span @click="audit" v-if=" scope.row.status == '未审核' " class="shenhe">审核</span>
            <!-- <el-button type="text"  class="shenhe" size='mini'></el-button> -->
            <div class="inline_b" v-else>
              <span>审核人:</span><span>{{ auditpeople }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
      <div class="pagination">
          <el-pagination :current-page="currentPage4" :page-size="15"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userData: {
          ret: '',  // 制单号
          value7: '', // 制单日期
          value1: '', // 供应商
          status: '', // 审核状态
        },
        options: [
          {
            value: '',
            label: '全部',
          }, {
            value: '已审核',
            label: '已审核',
          }, {
            value: '未审核',
            label: '未审核',
          }, {
            value: '已打回',
            label: '已打回',
          }, {
            value: '保存',
            label: '保存',
          }, {
            value: '已提交',
            label: '已提交',
          },
        ],
        options1: [
          {
            value: '',
            label: '全部',
          }, {
            value: '哈药',
            label: '哈药',
          }, {
            value: '云南白药',
            label: '云南白药',
          }, {
            value: '广药',
            label: '广药',
          },
        ],
        tableData: [
          {
            Receipt_no: '13515465',
            batch_number: '56235',
            making_people: '张大庄',
            making_date: '2017-09-09',
            suppliers: '云南白药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已审核',
          }, {
            Receipt_no: '13515466',
            batch_number: '23435',
            making_people: '张大庄',
            making_date: '2017-06-25',
            suppliers: '天神制药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '未审核',
          }, {
            Receipt_no: '13515467',
            batch_number: '23456',
            making_people: '张大庄',
            making_date: '2015-12-16',
            suppliers: '哈药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已审核',
          }, {
            Receipt_no: '13515468',
            batch_number: '45233',
            making_people: '张大庄',
            making_date: '2014-04-07',
            suppliers: '广药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已打回',
          }, {
            Receipt_no: '13515468',
            batch_number: '53124',
            making_people: '张大庄',
            making_date: '2017-09-09',
            suppliers: '广药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已打回',
          }, {
            Receipt_no: '13515469',
            batch_number: '56764',
            making_people: '张大庄',
            making_date: '2017-09-09',
            suppliers: '广药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '未审核',
          }, {
            Receipt_no: '13515470',
            batch_number: '34476',
            making_people: '张大庄',
            making_date: '2016-11-09',
            suppliers: '广药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已打回',
          }, {
            Receipt_no: '13515471',
            batch_number: '34432',
            making_people: '张大庄',
            making_date: '2015-08-12',
            suppliers: '广药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已审核',
          }, {
            Receipt_no: '13515472',
            batch_number: '34563',
            making_people: '张大庄',
            making_date: '2017-05-23',
            suppliers: '广药',
            Total_amount: '￥256',
            Amount: '￥256',
            status: '已审核',
          },
        ],

        // 分页
        currentPage4: 4,
        total: 0,
        auditpeople: 'Fsj', // 审核人
      };
    },
    methods: {
      addstorp() {
        this.$router.push({ name: 'addstore' });
      },
      audit() {
        this.$router.push({ name: 'medaudit2' });
      },
      search_con() {
        this.search.ret = this.userData.ret;
        this.search.status = this.userData.status;
        this.search.value1 = this.userData.value1;
      },
    },
    filters: {
    },
  };
</script>
<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medaudit{
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
  margin: 10px auto;
  min-width: 1100px;
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
  margin-top: 5px;
}
.fl{
  float: left;
}
.el-select{
  width:120px;
}
.inline_b{
  display: inline-block;
}
.shenhe{
  color: #56bc94;
  cursor: pointer;
}
</style>
