<!--
 * @Author: your name
 * @Date: 2019-11-01 11:08:51
 * @LastEditTime : 2020-01-06 14:02:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backendc:\Users\Administrator\Desktop\澳考\aokao-cloud-frontend\src\pages\clinic\medical-insurance\drugCheckin\DrugApply.vue
 -->
<template>
  <div>

    <h3>药品准入申请单</h3>
    <p class="submitBtn">
      <el-button size="mini" type="primary" @click="submit">提交申请</el-button>
      <span class="tips">（没有社保编码的药品无法进行社保备案）</span>
    </p>

    <el-form :model="ruleForm" ref="ruleForm" :show-message="false" size="mini">
      <el-table :data="ruleForm.tableData" align="center" size="mini" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" ></el-table-column>
        <el-table-column prop="ake001" label="社保编码" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="product_name" label="名称" align="center" min-width="120px" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="aka031" label="药品类别" align="center">
          <template slot-scope="scope">
            {{ scope.row.aka031 | aka031Filter }}
          </template>
        </el-table-column>
        <el-table-column prop="dosage_type" label="剂型" align="center">
          <template slot-scope="scope">
            {{ scope.row.dosage_type | dosage_type }}
          </template>
        </el-table-column>
        <el-table-column prop="aka074" label="规格" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="shebao_price" label="社保价格" align="center" min-width="130px">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index +'.shebao_price'" :rules="[{ required: scope.row.needRules, trigger: 'change' }]" class="inputNoPadding">
              <el-input size="mini" v-model="scope.row.shebao_price" @keyup.native="myPriceLimit('shebao_price', scope.$index)" class="price"></el-input>
              <!-- 单位 -->
              <span style="font-size:12px;">元/{{ scope.row.drug_specs_name }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="aka061" label="通用名" align="center" min-width="80px" class-name="white_nowrap_column"></el-table-column> -->
        <el-table-column  label="备注" align="center" width="300px">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.aae013" :maxlength="200" type="textarea" :autosize="{ maxRows: 3}"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { getDrugList, bookingDrug, sbzbinfoupdate } from '@apiNormal';
import { menucode } from '@filters';
import { floatLimit } from '@/utils/inputLimit';
import { jsTimestampFilter } from '@/utils/filters';
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      ruleForm: {
        tableData: [],
      },
      selectList: [],
      errmsgList: '',
      total_page: 0,
      count: 0,
    };
  },
  methods: {
    handleSelectionChange(data) {
      this.selectList = data;
      this.ruleForm.tableData.forEach((val) => {
        this.$set(val, 'needRules', false);
        this.selectList.forEach((val2) => {
          if (val.drug_key === val2.drug_key) {
            this.$set(val, 'needRules', true);
          }
        });
      });
    },
    myPriceLimit(val, index) {
      this.ruleForm.tableData[index][val] = floatLimit(this.ruleForm.tableData[index][val], 2);
    },
    getDrugList() {  // 获取药品
      httpServerNormal(getDrugList, {
        pageid: 0,
        pagesize: 0,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const list = res && res.diarr ? res.diarr : [];
          this.ruleForm.tableData = list.filter(v => v.szsbstatus !== 1 && v.ake001 && v.use_enable === 1).map(drug => ({
            ...drug,
            shebao_price: drug.shebao_price === 0 ? '' : drug.shebao_price,
            needRules: false,
            drug_specs_name: drug.specs.unit_large.specs_name,
          }));
        }
      });
    },
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (!this.selectList.length) {
            this.$message({ message: '请勾选需要申请的药品', type: 'error', showClose: true, duration: 1000 });
            return false;
          }
          const connectionStatus = await connectionTest();
          if (connectionStatus !== '1') {
            return;
          }
          const arr = this.selectList.map(val => ({
            ake001: val.ake001,  // 社保编码
            bkm017: val.standard_number,  // 药品本位码
            ake005: val.ake001,  // 机构编码
            ake006: val.product_name,   // 名称
            aka074: val.aka074,   // 规格
            aka070: val.dosage_type,  // 剂型
            aka067: val.drug_specs_name,   // 计价单位
            bka053: val.producer,   // 厂家
            bka505: parseFloat(val.shebao_price),   // 药品进货价格
            bka506: parseFloat(val.shebao_price),   // 药品收费价格
            aae030: parseFloat(jsTimestampFilter(new Date().getTime(), 'yyyyMMdd')),   // 备案日期
            aae013: val.aae013,    // 药品备注
          }));
          // 处理大于五十条
          this.total_page = Math.ceil(arr.length / 50);

          for (let i = 0; i < this.total_page; i++) {
            const start = i * 50;
            const list = i === this.total_page - 1 ? arr.slice(start) : arr.slice(start, start + 50);
            this.orderDrugMenu(list, i === this.total_page - 1);
          }
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    orderDrugMenu(arr) { // 参数1位处理数据，2位是否为最后一条，最后一条需刷新列表
      httpServerNormal(bookingDrug, {
        transBody: {
          listsize: arr.length,
          inputlist: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          // 处理his保存
          let list = res.transBody.outputlist.map((output_v) => {
            const drug = this.selectList.find(v => v.ake001 === output_v.ake005) || null;
            if (output_v.baz700 === '0' && output_v.bce574.includes('已备案')) {
              this.errmsgList += `<strong>${drug.product_name}</strong>备案失败，原因：${output_v.bce574} \n`;
              output_v.baz700 = '1';
            }
            const obj = drug ? {
              drug_key: drug.drug_key,
              szsbstatus: parseFloat(output_v.baz700),  // 默认0， 备案成功1
              shebao_price: parseFloat(drug.shebao_price),
            } : null;
            if (output_v.baz700 === '0') {
              this.errmsgList += `<strong>${drug.product_name}</strong>备案失败，原因：${output_v.bce574} \n`;
            }
            return obj;
          });
          list = list.filter(v => !!v);
          this.count += 1;
          if (!list.length) return;  // 若无返回则不调用保存
          this.save_sbDrugStatus(list);
        }
      });
    },
    save_sbDrugStatus(contents) {  // 修改his备案状态
      httpServerNormal(sbzbinfoupdate, {
        diarr: contents,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // total_page为总请求个数, count为当前请求个数
          if (this.count === this.total_page) {
            if (this.errmsgList.length) { // 存在备案失败
              this.$alert(this.errmsgList, '备案完成确认信息', {
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.errmsgList = '';
                  this.getDrugList();
                },
              });
            } else {
              this.$message({ message: '药品备案成功', type: 'success', showClose: true, duration: 1500 });
              this.errmsgList = '';
              this.getDrugList();
            }
          }
          // this.getDrugList();
        }
      });
    },
  },
  created() {
    this.getDrugList();
  },
  filters: {
    aka031Filter(val) {
      return menucode.aka031[val]; // 按需导出使用
    },
    dosage_type(val) {
      return menucode.aka070[val]; // 按需导出使用
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  font-weight: 600;
  line-height: 40px;
}
.submitBtn {
  margin-bottom: 10px;
  .tips {
    margin-left: 20px;
    color: red;
    font-size: 12px;
  }
}
.el-table {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-input.price {
    width: 60px;
  }
}
</style>
