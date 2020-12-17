<template>
    <div class="style">
        <h3>调用{{type}}模板</h3>
        <el-input size="mini" v-model="search" placeholder="请输入模板名称"></el-input>
        <el-table :data="templateList" class='white_nowrap_column' stripe style="width: 99%" @row-click='select' size='small'>
            <el-table-column prop="name" label="模板名字" width='100px' align="center"></el-table-column>
            <el-table-column label="模板类型" align="center" width='80px'>
              <template slot-scope="scope">
              {{scope.row.owner_type | typeFilter}}
              </template>
            </el-table-column> 
            <!-- 诊疗项目展示 -->
            <el-table-column label="模板内容" align="center" v-if='templateType === 5 || templateType === 6 || templateType === 7'>
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" width="300">
                  <p v-for='(item, index) in scope.row.data.item_list' :key="index">
                    {{item.name}} -- {{item.total}}  {{item.total_unit}}
                  </p>
                  <div slot="reference" class="name-wrapper">
                    {{scope.row.data.item_list | miniNum}}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 病历展示 -->
            <el-table-column label="模板内容" align="center" v-else-if="templateType === 1">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" width="300">
                  <p>
                    {{scope.row.data.complaint}} -- {{scope.row.data.allergy_history}} -- {{scope.row.data.cur_history}} -- 
                    {{scope.row.data.family_history}} -- {{scope.row.data.past_history}} -- {{scope.row.data.person_history}} -- 
                    {{scope.row.data.menses_history}} -- {{scope.row.data.fertilit_history}} -- 
                    {{scope.row.data.other_history}} -- <i v-if="!scope.row.data.medicaltype">{{scope.row.data.mainphyexam}} -- {{scope.row.data.other_phy_exam}}</i>--
                    <span>{{scope.row.data.yayizhiliaojihua && scope.row.data.yayizhiliaojihua.length ? scope.row.data.yayizhiliaojihua[0].desc : ''}}</span>
                    <span>{{scope.row.data.yayichuli && scope.row.data.yayichuli.length ? scope.row.data.yayichuli[0].desc : ''}}</span>
                  </p>
                  <span slot="reference" class="name-wrapper">{{scope.row.data.complaint}}</span>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 西药处方模板展示 -->
            <el-table-column label="模板内容" align="center" v-else-if="templateType === 2">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" width="300">
                  <p v-for='(drug, index) in scope.row.data.drug_list' :key='index'>
                    {{drug.name}} --  {{drug.spec_text}} -- {{drug.use_method}}
                  </p>
                  <div slot="reference" class="name-wrapper" width="400px">
                    <span v-for='(drug, index) in scope.row.data.drug_list' :key='index'>{{drug.name}}&nbsp;&nbsp;</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 中药处方模板展示 -->
            <el-table-column label="模板内容" align="center" v-else-if="templateType === 3">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" width="300">
                  <div>
                    <p><span v-for='(drug, index) in scope.row.data.drug_list' :key='index'>{{drug.name}} </span></p>
                    <p>{{scope.row.data.use_method}} -- 总共{{scope.row.data.total}}{{scope.row.data.total_unit}}
                       -- 每次{{scope.row.data.daily_use}}{{scope.row.data.daily_use_unit}}</p>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <span v-for='(drug, index) in scope.row.data.drug_list' :key='index'>{{drug.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 输液处方模板展示 -->
            <el-table-column label="模板内容" align="center" v-else-if="templateType === 4">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" width="300">
                  <div>
                    <div v-for='(drug, index) in scope.row.data.drug_list' :key='index'>
                      <p>{{drug.name}} -- {{drug.spec_text}}</p>
                      <p>{{drug.infusion_speed}} {{drug.infu_speed_unit}} -- {{drug.frequency}} -- {{drug.use_method}}</p>
                    </div>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <span v-for='(drug, index) in scope.row.data.drug_list' :key='index'>{{drug.name}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
             <!-- 医嘱展示 -->
            <el-table-column label="模板内容" align="center" v-else-if="templateType === 8">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" width="300">
                  <p>
                    {{scope.row.data.advice}}
                  </p>
                  <div slot="reference" class="name-wrapper">
                    {{scope.row.data.advice}}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
        </el-table>

      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page="pageindex" :page-size="10" layout="total, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { getTemplateMenu } from '@apiNormal';

export default {
  data() {
    return {
      search: '',
      templateList: [],
      pageindex: 1,
      pageTotal: 0,
    };
  },
  props: {
    medicaltype: { //  病历类型 0: 全科病历(default), 1: 牙科病历
      type: Number,
      default: 0,
    },
    templateType: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    typeFilter(id) {
      if (id === 0) {
        return '个人';
      } else if (id === 1) {
        return '通用';
      }
    },
    miniNum(list) {
      let label = '';
      list.forEach((element) => {
        label += element.name + ' ';
      });
      return label;
    },
  },
  methods: {
    handleCurrentChange(val) {  // 分页
      this.pageindex = val;
      this.getMedicalTemplateList();
    },
    select(row) {
      this.$confirm(`调用${row.name}？`)
      .then(() => {
        this.$emit('callball', row, this.templateType);
      }).catch(() => {
      });
    },
    // 获取处方模板
    getMedicalTemplateList() {
      httpServerNormal(getTemplateMenu, {
        type: this.templateType,
        name: this.search,
        owner_type: 2,
        page_index: this.pageindex - 1,
        page_size: 10,
        medicaltype: this.medicaltype,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res.items && res.items.length) {
            res.items.forEach((item) => {
              if (item.data && !item.data.fertilit_history) {
                item.data.fertilit_history = '';
              }
              if (item.data && !item.data.menses_history) {
                item.data.menses_history = '';
              }
            });
          }
          this.templateList = res.items || [];
          this.pageTotal = res.total ? res.total : 0;
        }
      });
    },
  },
  computed: {
    type() {
      let template = '';
      if (this.templateType === 1) {
        template = '病历';
      } else if (this.templateType === 2) {
        template = '西药处方';
      } else if (this.templateType === 3) {
        template = '中药处方';
      } else if (this.templateType === 4) {
        template = '输液处方';
      } else if (this.templateType === 5) {
        template = '诊疗项目';
      } else if (this.templateType === 6) {
        template = '耗材';
      } else if (this.templateType === 7) {
        template = '其他';
      } else if (this.templateType === 8) {
        template = '常用医嘱';
      }
      return template;
    },
  },
  created() {
    this.getMedicalTemplateList();
  },
  watch: {
    search() {
      this.pageindex = 1;
      this.getMedicalTemplateList();
    },
  },
};
</script>

<style lang="scss" scoped>
.style{
    width: 600px;
}
.el-table{
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
}
h3{
 font-weight: 600;
 line-height: 30px;
 border-bottom: 1px solid #ccc;
 margin-bottom: 10px;
}
.el-popover {
  width: 300px;
  height: 300px;
  overflow: hidden;
}
.pagination {
  margin: 20px 0;
  text-align: center;
}
</style>
