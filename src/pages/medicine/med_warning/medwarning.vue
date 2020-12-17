<template>
  <div class="medwarning">
    <div class="header">
      <span class="lh45 m_l10">药品类型:</span>
      <el-select name="med-classification" class="med-classification m_l10" v-model="header.classification">
        <el-option label="全部" value="1"></el-option>
        <el-option label="饮片" value="2"></el-option>
        <el-option label="中成药" value="3"></el-option>
        <el-option label="化学制剂" value="4"></el-option>
        <el-option label="耗材" value="5"></el-option>
        <el-option label="生物制剂" value="6"></el-option>
        <el-option label="其他" value="7"></el-option>            
      </el-select>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="med_n" label="药品名称">
        </el-table-column>
        <el-table-column prop="med_f" label="药品分类">
        </el-table-column>
        <el-table-column prop="med_g" label="规格">
        </el-table-column>
        <el-table-column prop="med_c" label="生产厂家" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="med_k" label="库存">
        </el-table-column>
        <el-table-column prop="med_y" label="库存阈值">
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
            med_n: '草果',
            med_f: '饮片',
            med_g: '1.0g',
            med_c: '',
            med_k: '0',
            med_y: '0',
          }, {
            med_n: '草果',
            med_f: '饮片',
            med_g: '1.0g',
            med_c: '',
            med_k: '0',
            med_y: '0',
          }, {
            med_n: '草果',
            med_f: '饮片',
            med_g: '1.0g',
            med_c: '',
            med_k: '0',
            med_y: '0',
          }, {
            med_n: '草果',
            med_f: '饮片',
            med_g: '1.0g',
            med_c: '',
            med_k: '0',
            med_y: '0',
          }, {
            med_n: '草果',
            med_f: '饮片',
            med_g: '1.0g',
            med_c: '',
            med_k: '0',
            med_y: '0',
          }, {
            med_n: '草果',
            med_f: '饮片',
            med_g: '1.0g',
            med_c: '',
            med_k: '0',
            med_y: '0',
          },
        ],
        currentPage4: 4,
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
</style>
