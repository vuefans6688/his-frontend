<template>
  <div>

    <h3>诊所申请目录</h3>
    <div class="head">
      <a href="javascript:;" id="download" class="download" @click="download">导出本页数据</a>
      <el-button size="mini" type="warning" @click="batchCancelBooking">批量撤销</el-button>
    </div>

    <el-table :data="tableData" align="center" size="small" stripe height="600" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="ake001" label="社保编码" align="center" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ake002" label="名称" align="center" mmin-width="120px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ake003" label="目录类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.ake003 | ake003Filter }}
        </template>
      </el-table-column>
      <el-table-column prop="bka506" label="价格" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.bka506 | priceFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="aae030" label="备案日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="baa201" label="目录申请状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.baa201 | baa201Filter }}
        </template>
      </el-table-column>
      <el-table-column prop="aae016" label="办结状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.aae016 | aae016Filter }}
        </template>
      </el-table-column>
      <el-table-column prop="aae013" label="备注" align="center" min-width="100px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span class="operation cancel" @click="cancelBooking(scope.row)">
            撤销
          </span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { bookingQuery, bookingCancel, sbzbinfoupdate, batchmodifychargitem } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import { menucode } from '@filters';
import connectionTest from '@/common/js/connection';
// import getClinicID from '@/serviceNormal/getClinicID';

export default {
  props: {
    menuType: {  // 目录类别 1=药品 2=诊疗项目 3=材料 5=辅助器具项目 空时查询所有
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableData: [],
      selectList: [],
    };
  },
  methods: {
    handleSelectionChange(data) {
      this.selectList = data;
    },
    // 批量撤销备案
    batchCancelBooking() {
      const inputlist = [];
      const diarr = [];
      const itemarr = [];
      this.$confirm(`是否批量撤销该${this.selectList.length}项备案?请谨慎操作`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 遍历生成传参数组
        this.selectList.forEach((item) => {
          inputlist.push({
            ake003: item.ake003,   // 目录类别
            ake005: item.ake005,   // 编码
          });
          diarr.push({
            ake001: item.ake001,
            szsbstatus: 2,  // 默认0， 备案成功1
            shebao_price: -1,  // -1时不修改价格
          });
          itemarr.push({
            szsbcode: item.ake001,
            items: [
              {
                name: 'szsbstatus',
                newVal: 2,
              }, {
                name: 'szsbprice',
                newVal: -1,
              },
            ],
          });
        });
        // 调医保撤销接口
        httpServerNormal(bookingCancel, {
          transBody: {
            listsize: this.selectList.length,
            inputlist,
          },
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (this.menuType === '1') {
              // 更新his药品状态
              httpServerNormal(sbzbinfoupdate, { diarr }).then((res) => {
                if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
                  this.$message({ message: '药品备案撤销成功', type: 'success', showClose: true, duration: 1500 });
                  this.tableData = [];
                  this.getApplyMenu(1);
                }
              });
            } else {
              // 更新his诊疗项目的状态
              httpServerNormal(batchmodifychargitem, { itemarr }).then((res) => {
                if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
                  this.$message({ message: '诊疗项备案成功', type: 'success', showClose: true, duration: 1000 });
                  this.tableData = [];
                  this.getApplyMenu(1);
                }
              });
            }
          }
        });
      }).catch(() => {
        this.selectList = [];
      });
    },
    getApplyMenu(pageNo) {
      httpServerNormal(bookingQuery, {
        transBody: {
          pageno: pageNo,
          ake003: this.menuType,  // 目录类别 1=药品 2=诊疗项目 3=材料 5=辅助器具项目 空时查询所有
          // ake005: '',  // 协议机构目录编码
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.tableData = res.transBody && res.transBody.outputlist ? this.tableData.concat(res.transBody.outputlist) : this.tableData;
          if (res.transBody.endpage === '0') {
            this.getApplyMenu(pageNo + 1);
          }
        }
      });
    },
    cancelBooking(item) {
      this.$confirm(`是否撤销 ${item.ake002} 备案?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpServerNormal(bookingCancel, {
          transBody: {
            listsize: 1,
            inputlist: [
              {
                ake003: item.ake003,   // 目录类别
                ake005: item.ake005,   // 编码
              },
            ],
          },
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (this.menuType === '1') {
              this.change_drugStatus(item);
            } else {
              this.change_sbChargeItemStatus(item);
            }
          }
        });
      }).catch(() => {});
    },
    change_drugStatus(item) {
      httpServerNormal(sbzbinfoupdate, {
        diarr: [
          {
            ake001: item.ake001,
            szsbstatus: 2,  // 默认0， 备案成功1
            shebao_price: -1,  // -1时不修改价格
          },
        ],
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '药品备案撤销成功', type: 'success', showClose: true, duration: 1500 });
          this.tableData = [];
          this.getApplyMenu(1);
        }
      });
    },
    change_sbChargeItemStatus(item) {  // 修改his诊疗项备案状态
      const contents = {
        szsbcode: item.ake001,
        items: [
          {
            name: 'szsbstatus',
            newVal: 2,
          },
          {
            name: 'szsbprice',
            newVal: -1,
          },
        ],
      };
      httpServerNormal(batchmodifychargitem, {
        itemarr: [contents],
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '诊疗项备案成功', type: 'success', showClose: true, duration: 1000 });
          this.tableData = [];
          this.getApplyMenu(1);
        }
      });
    },
    download() {  // 导出csv
      if (!this.tableData.length) return;
      const obj = document.querySelector('#download');
      let str = '社保编码,名称,价格,备案日期,目录申请状态,办结状态\n';
      this.tableData.forEach((val) => {
        let baa201 = '';
        switch (val.baa201) {
          case '0':
            baa201 = '审批中';
            break;
          case '1':
            baa201 = '审批通过';
            break;
          case '2':
            baa201 = '审批不通过';
            break;
          default:
            break;
        }
        str += `${val.ake001},${val.ake002},${val.bka506},${val.aae030},${baa201},${val.aae016}\n`;
      });
      str = encodeURIComponent(str);
      obj.href = `data:text/csv;charset=utf-8,\ufeff${str}`;
      obj.download = '诊所申请目录.csv';
    },
  },
  async created() {
    const connectionStatus = await connectionTest();
    if (connectionStatus === '1') {
      this.getApplyMenu(1);
    }
  },
  filters: {
    ake003Filter(val) {  // 目录类别
      return menucode.ake003[val];
    },
    baa201Filter(val) {  // 目录申请状态
      return menucode.baa201[val];
    },
    aae016Filter(val) {  // 办结状态
      return menucode.aae016[val];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

h3 {
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: 600;
}
.el-table {
  .el-input {
    width: 90px;
  }
  .cancel {
    color: $mainColor;
    cursor: pointer;
  }
}
.head{
  width: 240px;
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .download {
    float: left;
    width: 80px;
    height: 28px;
    line-height: 28px; 
    background-color: $mainColor;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>
