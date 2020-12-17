<template>
  <div class="medwarning">
    <div class="header">
      <span class="m_l10">药物检索:</span>
        <el-input v-model="header.ret" placeholder="名称/厂家/条码" class="med-ret m_l10"></el-input>
      <span class="lh45 m_l10">入库日期:</span>
        <el-date-picker v-model="value7" type="daterange" align="center" 
        unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
        :picker-options="pickerOptions2" class="m_l10"></el-date-picker>
      <el-button type="primary m_l100">查询</el-button>
      <el-button type="primary">导出Excel</el-button>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="med_time" label="入库时间">
        </el-table-column>
        <el-table-column prop="med_name" label="药品名称">
        </el-table-column>
        <el-table-column prop="med_class" label="药品分类">
        </el-table-column>
        <el-table-column prop="med_specification" label="规格">
        </el-table-column>
        <el-table-column prop="med_factory" label="生产厂家">
        </el-table-column>
        <el-table-column prop="med_supplier" label="供货商">
        </el-table-column>
        <el-table-column prop="med_batch" label="批号">
        </el-table-column>
        <el-table-column prop="med_pleased" label="进货价">
        </el-table-column>
        <el-table-column prop="med_quantity" label="入库数量">
        </el-table-column>
        <el-table-column prop="med_amount" label="金额">
        </el-table-column>
    </el-table>
    </div>
      <!-- 分页 -->
      <div class="block fy">
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40">
          </el-pagination>
        </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        header: {
          classification: '',
        },
        tableData: [
          {
            med_time: '2017-08-8',
            med_name: '草果',
            med_class: '饮片',
            med_specification: '1.0g',
            med_factory: '',
            med_supplier: '',
            med_batch: '245345345',
            med_pleased: '$550',
            med_quantity: '33',
            med_amount: '$33',
          }, {
            med_time: '2017-08-8',
            med_name: '草果',
            med_class: '饮片',
            med_specification: '1.0g',
            med_factory: '',
            med_supplier: '',
            med_batch: '245345345',
            med_pleased: '$550',
            med_quantity: '33',
            med_amount: '$33',
          }, {
            med_time: '2017-08-8',
            med_name: '草果',
            med_class: '饮片',
            med_specification: '1.0g',
            med_factory: '',
            med_supplier: '',
            med_batch: '245345345',
            med_pleased: '$550',
            med_quantity: '33',
            med_amount: '$33',
          }, {
            med_time: '2017-08-8',
            med_name: '草果',
            med_class: '饮片',
            med_specification: '1.0g',
            med_factory: '',
            med_supplier: '',
            med_batch: '245345345',
            med_pleased: '$550',
            med_quantity: '33',
            med_amount: '$33',
          }, {
            med_time: '2017-08-8',
            med_name: '草果',
            med_class: '饮片',
            med_specification: '1.0g',
            med_factory: '',
            med_supplier: '',
            med_batch: '245345345',
            med_pleased: '$550',
            med_quantity: '33',
            med_amount: '$33',
          },
        ],

        // 分页
        currentPage4: 4,

        // 时间选择器
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
              picker.$emit('pick', [start, end]);
            },
          }],
        },
        value7: '',
      };
    },
  };
</script>
<style scoped>
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
.med-classification{
  width: 110px;
  height: 30px;
}
.content{
  width: 92%;
  margin: 10px auto;
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
</style>
