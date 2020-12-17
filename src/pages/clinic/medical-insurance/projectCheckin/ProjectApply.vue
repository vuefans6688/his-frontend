<!--
 * @Author: your name
 * @Date: 2019-11-01 11:08:51
 * @LastEditTime : 2020-01-07 11:33:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backendc:\Users\Administrator\Desktop\澳考\aokao-cloud-frontend\src\pages\clinic\medical-insurance\projectCheckin\ProjectApply.vue
 -->
<template>
  <div>

    <h3>诊疗项目准入申请单</h3>
    <p class="submitBtn">
      <el-button size="mini" type="primary" @click="submit">提交申请</el-button>
      <span class="tips">（没有社保编码的诊疗项无法进行社保备案）</span>
    </p>


    <el-form :model="ruleForm" ref="ruleForm" :inline-message="true" :show-message="false" size="mini">
      <el-table :data="ruleForm.tableData" align="center" size="mini" stripe  @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="szsbcode" label="诊疗项目统一编码" align="center" min-width="80px" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="name" label="名称" align="center" min-width="120px" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="unit" label="单位" align="center"></el-table-column>
        <el-table-column prop="price" label="销售价(元)" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price | PriceFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="szsbprice" label="社保价格" align="center" min-width="110px">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index +'.szsbprice'" :rules="[{ required: scope.row.needRules, trigger: 'change' }]">
              <el-input size="mini" v-model="scope.row.szsbprice" @keyup.native="myPriceLimit('szsbprice', scope.$index)" class="price"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="机构项目类别" align="center" width="150px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.bkf131" placeholder="请选择机构项目类别" size="mini">
              <el-option label="常规诊疗项目" value="1"></el-option>
              <el-option label="辅助器具项目" value="4"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  label="门诊特检项目标识" align="center" width="80px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.bkm062" placeholder="请选择门诊特检项目标识" size="mini">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  label="备注" align="center" min-width="200px">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.aae013" :maxlength="200" type="textarea" autosize></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="type" label="医疗机构诊疗项目编码" align="center" min-width="100px" class-name="white_nowrap_column"></el-table-column>
        <el-table-column prop="type" label="医疗机构诊疗项目名称" align="center" min-width="100px" class-name="white_nowrap_column"></el-table-column>
        <el-table-column prop="peoplenum" label="特殊标记" align="center" min-width="100px">
          <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.peoplenum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="peoplenum" label="财务分类" align="center" min-width="100px">
          <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.peoplenum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="peoplenum" label="卫生局统一编码" align="center" min-width="100px">
          <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.peoplenum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="peoplenum" label="卫生局统一名称" align="center" min-width="100px">
          <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.peoplenum"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="operation del" @click="del(scope.row)"><i class="el-icon-delete"></i></span>
          </template>
        </el-table-column> -->

      </el-table>
    </el-form>
  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { getChargitemList, bookingProject, batchmodifychargitem } from '@apiNormal';
import { floatLimit } from '@/utils/inputLimit';
import { jsTimestampFilter } from '@/utils/filters';
import connectionTest from '@/common/js/connection';
// import getClinicID from '@/serviceNormal/getClinicID';

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
          if (val.item_id === val2.item_id) {
            this.$set(val, 'needRules', true);
          }
        });
      });
    },
    myPriceLimit(val, index) {
      this.ruleForm.tableData[index][val] = floatLimit(this.ruleForm.tableData[index][val], 2);
    },
    getPayList() {  // 获取收费项目
      httpServerNormal(getChargitemList, {
        disabled: 0,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          res = res && res.length ? res : [];
          const arr = [];
          res.forEach((val) => {
            if (val.szsbcode && val.szsbstatus !== 1 && val.type !== 4 && val.type !== 6) {
              val.szsbprice = val.szsbprice || '';
              val.bkf131 = '1';
              val.bkm062 = '0';
              val.needRules = false;
              arr.push(val);
            }
          });
          arr.sort((a, b) => b.create_time - a.create_time);
          this.ruleForm.tableData = arr;
        }
      });
    },
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (!this.selectList.length) {
            this.$message({ message: '请勾选需要申请的诊疗项', type: 'error', showClose: true, duration: 1000 });
            return;
          }
          const connectionStatus = await connectionTest();
          if (connectionStatus !== '1') {
            return;
          }
          const arr = [];
          this.selectList.forEach((val, index) => {
            // const seq_num = getClinicID() === 'df6b4667-9d28-488f-84be-eae31d865675' || '592e35b7-1e06-431e-a8df-7cf9f33bafa4' ? val.seq_num : val.szsbcode;
            const seq_num = val.seq_num;
            arr.push({
              ake001: val.szsbcode,  // 社保编码
              ake005: seq_num,  // 机构编码
              ake006: val.szsbname,  // 名称
              bka506: parseFloat(val.szsbprice),  // 价格
              bkf131: val.bkf131,   // 机构项目类别
              bkm062: val.bkm062,   // 门诊特检项目标识
              aae030: parseFloat(jsTimestampFilter(new Date().getTime(), 'yyyyMMdd')),  // 备案日期(取当天)
            });
            if (val.aae013) {  // 备注
              arr[index].aae013 = val.aae013;
            }
          });

          this.total_page = Math.ceil(arr.length / 50);

          for (let i = 0; i < this.total_page; i++) {
            const start = i * 50;
            const list = i === this.total_page - 1 ? arr.slice(start) : arr.slice(start, start + 50);
            this.orderProjectMenu(list, i === this.total_page - 1);
          }
        } else {
          this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
          return false;
        }
      });
    },
    orderProjectMenu(arr) {
      httpServerNormal(bookingProject, {
        transBody: {
          listsize: arr.length,
          inputlist: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          // 处理his保存
          let contents = res.transBody.outputlist.map((val2) => {
            // const val = this.selectList.find(v => (getClinicID() === 'df6b4667-9d28-488f-84be-eae31d865675' || '592e35b7-1e06-431e-a8df-7cf9f33bafa4' ? v.seq_num : v.szsbcode) === val2.ake005) || null;
            const val = this.selectList.find(v => v.seq_num === val2.ake005) || null;
            const obj = val ? {
              item_id: val.item_id,
              items: [
                {
                  name: 'szsbstatus',
                  newVal: parseFloat(val2.baz700),
                },
                {
                  name: 'szsbprice',
                  newVal: parseFloat(val.szsbprice),
                },
              ],
            } : null;
            if (val2.baz700 === '0') {
              this.errmsgList += `<strong>${val.szsbname}</strong>备案失败，原因：${val2.bce574} \n`;
            }
            return obj;
          });
          contents = contents.filter(v => !!v);
          this.count += 1;
          if (!contents.length) return;  // 若无返回则不调用保存
          this.save_sbChargeItemStatus(contents);  // 调用修改his诊疗项备案状态
        }
      });
    },
    save_sbChargeItemStatus(contents) {  // 修改his诊疗项备案状态
      httpServerNormal(batchmodifychargitem, {
        itemarr: contents,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // total_page为总请求个数, count为当前请求个数
          if (this.count === this.total_page) {
            if (this.errmsgList.length) { // 存在备案失败
              this.$alert(this.errmsgList, '备案完成确认信息', {
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.errmsgList = '';
                  this.getPayList();
                },
              });
            } else {
              this.$message({ message: '诊疗项备案成功', type: 'success', showClose: true, duration: 1500 });
              this.errmsgList = '';
              this.getPayList();
            }
          }
          // this.getPayList();
        }
      });
    },
  },
  created() {
    this.getPayList();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

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
    width: 100px;
  }
  .el-icon-delete {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    color: $mainColor;
  }
}
</style>
