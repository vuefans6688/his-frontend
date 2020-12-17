<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-09 18:03:27
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-13 14:48:46
 -->
<template>
  <div class="all_accounts">

    <h1>HIS 日对账</h1>
    选择对账月份：
    <el-date-picker v-model="indexDate" type="month" placeholder="选择日期" size="small" class="indexDate" @change="hisInfo"></el-date-picker>

    <el-table :data="tableList" style="width: 100%" stripe size='mini'>
      <!-- <el-table-column align="center" prop="index" label="编号"></el-table-column> -->
      <!-- <el-table-column align="center" prop="name" label="名称"></el-table-column> -->
      <el-table-column align="center" prop="bad766" label="对账日期">
        <template slot-scope="scope">
          {{ scope.row.bad766 | bad766 }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="listsize" label="条目数"></el-table-column> -->
      <el-table-column align="center" prop="akc264" label="费用(元)">
        <template slot-scope="scope">
          <span>{{ scope.row.akc264 | PriceFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="对账情况">
        <template slot-scope="scope">
          <span :class="{ 'colorRed' : scope.row.dzstatus === 0}">{{ scope.row.dzstatus | statusFilter }}</span>
          <!-- <el-button type="text" size="small" v-if="scope.row.dzstatus === -1" style="color: #DAA520;">未对账</el-button> -->
          <!-- <el-button type="text" size="small" v-else-if="scope.row.dzstatus === 1">对账成功</el-button> -->
          <!-- <el-button type="text" size="small" style="color: red;" v-else-if="scope.row.dzstatus === 0">对账失败</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getDayChargeItemList(scope.row.bad766, scope.$index)" :disabled="is_dz_disabled(scope.row.dzstatus, scope.row.bad766)">对账</el-button>
          <el-button type="text" size="small" @click="contrast_day(scope.row.bad766)">流水对比</el-button>
          <el-button type="text" size="small" @click="getDrugData(scope.row.bad766)" :disabled="is_sb_disabled(scope.row.bad766)">上报</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { getszsbmonthdata, sbDzdaily, getszsbdailydata, setduizhangstatus, getDrugUpData, drugDeliver, clinicInfo } from '@apiNormal';
import connectionTest from '@/common/js/connection';

const TEST_USER_ID = '65ac0251-10ff-473a-af8a-20e8969176f7';

export default {
  data() {
    return {
      currentPage: 1,
      tableList: [],
      total: 0,
      indexDate: new Date(),
      user_id: '',
    };
  },
  methods: {
    get_clinic_info() {
      httpServerNormal(clinicInfo).then((res) => {
        this.user_id = res && res.clinic ? res.clinic.owner_id : '';
      });
    },
    contrast_day(data) {
      this.$router.push(`/navigator/settings/medicalInsurance/accounts/day/${data}`);
    },
    // 调his对账
    hisInfo() {
      httpServerNormal(getszsbmonthdata, {
        reqdate: parseFloat(new Date(this.indexDate).format('yyyyMM')),
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.tableList = res.data;
          console.log(res.data);
          // this.tableList.forEach((item) => {
          //   this.$set(item, 'dzstatus', -1);
          // });
        }
      });
    },
    getDayChargeItemList(bad766, index) {  // 获取单日账单详情
      this.$confirm('是否确认对账', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpServerNormal(getszsbdailydata, {
          reqdate: bad766,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (res.data && !res.data.length) {
              return;
            }
            // 将字段替换
            const obj = JSON.parse(JSON.stringify(res.data[0]).replace(/itemlist/g, 'inputlist'));
            this.reconciliation(obj, index);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
          showClose: true,
          duration: 1000,
        });
      });
    },
    // 调SB客户端对账
    async reconciliation(obj) {
      const connectionStatus = await connectionTest();
      if (connectionStatus !== '1') {
        return;
      }
      httpServerNormal(sbDzdaily, {
        transBody: obj,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          console.log('对账', res);
          // const transBody = res.transBody;
          let status = '';
          if (res.transBody.aae531 === '1') {
            status = '此次对帐通过';
            // this.$set(this.tableList[index], 'flag', 1);
            this.saveDayAccount(obj.bad766);
          } else if (res.transBody.aae531 === '2') {
            status = '帐已通过，不需再次对帐';
            // this.$set(this.tableList[index], 'flag', 2);
          } else {
            status = '支付项目或金额不符';
            // this.$set(this.tableList[index], 'flag', 0);
          }
          this.$alert(`${status}`, '结账结果', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            callback: () => {},
          });
        }
      });
    },
    // 保存对账结果
    saveDayAccount(bad766) {
      httpServerNormal(setduizhangstatus, {
        reqdate: bad766,
        dzstatus: 1,
        itemffect: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.hisInfo();
        }
      });
    },
    // 药品销售上报
    // 获取上报数据
    getDrugData(date) {
      httpServerNormal(getDrugUpData, {
        begin_time: date + '',
        end_time: date + '',
        page_index: 0,
        page_size: 1000000,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const result = res.result || [];
          this.ToSocialSecurity(result);
        }
      });
    },
    // 调社保客户端
    ToSocialSecurity(arr) {
      const list = arr.filter((drug) => {
        return drug.ake001 && drug.standardnumber;
      });
      if (!list.length) {
        this.$message({ message: '无药品需上报' });
        return;
      }
      const inputList = list.map((drug, i) => {
        return {
          push_id: Number(drug.push_id), // 批号
          business_type: '1', // 业务类别
          pres_sno: drug.standardnumber, // 处方号（单据号）
          record_sno: drug.standardnumber + i, // 发药序列号
          standard_code: drug.standardnumber, // 药品本位码
          drug_code: drug.ake001, // 药品-编码
          drug_name: drug.productname, // 药品-名称
          drug_std: drug.spectxt, // 药品-规格
          unit: drug.xiaoshou_dw, // 发药单位
          numbers: drug.xiaoshou_num, // 数量
          amount: drug.shebao_price, // 金额
          out_recordtime: Number(drug.date), // 发(退)药日期
          last_editedtime: Number(new Date().format('yyyyMMddhhmmss')), // POS最后编辑时间
        };
      });
      httpServerNormal(drugDeliver, {
        transBody: {
          listsize: list.length,
          inputList: inputList,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '上报成功！',
            type: 'success',
          });
        }
      });
    },
    // 是否禁用对账按钮
    is_dz_disabled(status, date) {
      const dateStr = date.toString();
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6);
      const dateTime = new Date(`${year}-${month}-${day}`).getTime();
      return (status === 1 || (new Date().getTime() - dateTime) < 1000 * 60 * 60 * 24) && this.user_id !== TEST_USER_ID;
    },
    is_sb_disabled(date) {
      const dateStr = date.toString();
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6);
      const dateTime = new Date(`${year}-${month}-${day}`).getTime();
      return ((new Date().getTime() - dateTime) < 1000 * 60 * 60 * 24) && this.user_id !== TEST_USER_ID;
    },
  },
  created() {
    this.get_clinic_info();
    this.hisInfo();
  },
  filters: {
    bad766(date) {
      const string = date.toString();
      return string.substring(0, 4) + '-' + string.substring(4, 6) + '-' + string.substring(6, 8);
    },
    statusFilter(val) {
      if (val === 0) {
        return '未对账';
      } else if (val === 1 || val === 2) {
        return '对账成功';
      }
      return '对账失败';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

h1 {
  text-align: center;
}
.pagination{
  @include pagination_to_bottom;
}
.all_accounts{
  position: relative;
  padding: 30px 40px 60px 40px;
  .el-table .el-table__body-wrapper .el-table__body .el-table__row .cell .el-button{
    padding: 0;
    font-size: 14px;
  }
}
.indexDate{
  margin: 20px 0;
  width: 150px;
}
.m_t20{
  margin-top: 20px;
}
.colorRed {
  color: red;
}
.contrast {
  margin-left: 10px;
  color: $mainColor;
  cursor: pointer;
}
</style>

