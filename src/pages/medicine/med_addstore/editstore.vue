<template>
<div class="addstore">
  <div class="header">
    <span class="fl l_h37">入库单号:</span>
    <span class="fl l_h37 m_l10">{{num}}</span>

    <span class="fl l_h37 m_l30">制单人:</span>
    <span class="fl l_h37 m_l10">{{voucher}}</span>

    <span class="fl l_h37 m_l30">入库批号:</span>
    <el-input v-model="userData.ret" class="fl m_l10 w_200"></el-input>

    <span class="fl l_h37 m_l30">供应商:</span>
    <el-select v-model="userData.suppliers" placeholder="" class="fl m_l10">
      <el-option v-for="item in Suppliers" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>

  <div class="content" id="addstore_con">
    <div class="d_inb">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="savesubmit">保存并提交审核</el-button>
      <el-button type="info" @click="goback">返回</el-button>
    </div>
    <div class="mon_total fr m_r50 m_b20">
      <span class="total">入库总金额:</span>
      <span class="money m_l10">{{money}}</span>
    </div>
    <div class="m_t20">
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
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
    <el-table-column  label="生产日期" align="center">
      <template slot-scope="scope">
        <span>{{ tableData[scope.$index].Production_date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="有效期" align="center">
      <template slot-scope="scope">
        <span>{{ tableData[scope.$index].validity_date }}</span>
      </template>
    </el-table-column>
    <el-table-column width="40" align="center">
      <template slot-scope="scope">
        <i class="el-icon-delete pointer" @click="del(scope.$index, scope.row)"></i>
      </template>
    </el-table-column>
  </el-table>

    <div class="del_btn">
      <el-button type="primary" @click="modyfy_addmed">添加药品</el-button>
    </div>
    
    <!-- 分页 -->
    <div class="block fy">
      <el-pagination :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10"
        layout="total, sizes, prev, pager, next, jumper" :total="40">
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <div class="modyfy_addmed" v-show='modyfy_addmed_show'>
      <div class="container_m">
        <div class="header_m">
          <div class="title_m">添加药品</div>
        </div>
        <div class="close_m">
          <i class="el-icon-circle-close" @click="closemodyfy"></i>
        </div>
        <div class="content_m">
          <div class="search_m">
            <el-input placeholder="药品名称" v-model="mt.search"></el-input> 
          </div>
          <div class="med_type_m">
            <span>处方类型:</span>
            <el-select class="med_type_select" v-model="mt.med_type">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="yao_type_m">
            <span>药品类型:</span>
            <el-select class="yao_type_select" v-model="mt.med_class">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="med_table_m">
            <el-table :data="msg_m | msgFilter(mt.med_type, mt.search, mt.med_class)" style="width: 100%" class="med_tab" @selection-change="handleSelectionChange2">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="med_name" label="药品名称">
              </el-table-column>
              <el-table-column prop="med_class" label="药品类型">
              </el-table-column>
              <el-table-column prop="med_type" label="处方类型">
              </el-table-column>
              <el-table-column prop="med_gui" label="规格">
              </el-table-column>
              <el-table-column prop="med_factory" label="生产厂家">
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="block fy_m">
            <el-pagination :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10"
              layout="total, prev, pager, next, jumper" :total="40">
            </el-pagination>
          </div>
        </div>
        <div class='btn_group'>
          <el-button type="primary" size="medium" @click="allow">确定</el-button>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      num: '926347', // 入库单号
      voucher: '虚竹', // 制单人
      money: '200.00', // 总金额
      // 供应商
      Suppliers: [{ value: '哈药六厂', label: '哈药六厂' }, { value: '云南白药', label: '云南白药' },
      { value: '天圣制药', label: '天圣制药' }, { value: '广药', label: '广药' }],
      // 用户输入数据
      userData: {
        suppliers: '',
        ret: '',
      },
      tableData: [
        {
          med_name: '草果',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '哈药六厂',
          Production_date: '2017-02-03',
          validity_date: '2017-02-06',
          unit: '',
          quantity: '',
          wholesale_price: '',
          price_prescription: '',
          retail_price: '',
        }, {
          med_name: '飞龙',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '中国厂',
          Production_date: '2017-23-23',
          validity_date: '2017-12-34',
          unit: '',
          quantity: '',
          wholesale_price: '',
          price_prescription: '',
          retail_price: '',
        }, {
          med_name: '龙须草',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '中盖六厂',
          Production_date: '2017-62-34',
          validity_date: '2017-06-06',
          unit: '',
          quantity: '',
          wholesale_price: '',
          price_prescription: '',
          retail_price: '',
        }, {
          med_name: '佛手',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '天神制药',
          Production_date: '2017-12-05',
          validity_date: '2017-12-26',
          unit: '',
          quantity: '',
          wholesale_price: '',
          price_prescription: '',
          retail_price: '',
        }, {
          med_name: '含羞草',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '广药六厂',
          Production_date: '2017-05-23',
          validity_date: '2017-12-09',
          unit: '',
          quantity: '',
          wholesale_price: '',
          price_prescription: '',
          retail_price: '',
        }, {
          med_name: '鬼切草',
          classification: '中药',
          med_gui: '1.0g',
          med_factory: '云南白药',
          Production_date: '2017-04-12',
          validity_date: '2017-05-06',
          unit: '',
          quantity: '',
          wholesale_price: '',
          price_prescription: '',
          retail_price: '',
        },
      ],
      option2: [{ value: 'g', label: 'g' }, { value: 'kg', label: 'kg' }],
      Production_date: '2017-10-09',
      validity_date: '2019-09-29',
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 模态框
      modyfy_addmed_show: false,
      multipleSelection2: [],
      options: [{ value: '', label: '全部' }, { value: '处方', label: '处方' },
      { value: '非处方', label: '非处方' }],
      options1: [{ value: '', label: '全部' }, { value: '西药', label: '西药' },
      { value: '中草药', label: '中草药' }, { value: '清热类', label: '清热类' },
      { value: '中成药', label: '中成药' }, { value: '感冒类', label: '感冒类' },
      { value: '心脑血管类', label: '心脑血管类' }, { value: '解毒类', label: '解毒类' }],
      msg_m: [
        {
          med_name: '草果',
          med_gui: '1.0g',
          med_class: '中草药',
          med_type: '非处方',
          med_factory: '哈药六厂',
        }, {
          med_name: '佛手',
          med_gui: '1.0g',
          med_class: '清热类',
          med_type: '处方',
          med_factory: '天神制药',
        }, {
          med_name: '含羞草',
          med_gui: '1.0g',
          med_class: '清热类',
          med_type: '非处方',
          med_factory: '广药六厂',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '西药',
          med_type: '非处方',
          med_factory: '云南白药',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '中成药',
          med_type: '处方',
          med_factory: '云南白药',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '解毒类',
          med_type: '非处方',
          med_factory: '云南白药',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '中成药',
          med_type: '非处方',
          med_factory: '云南白药',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '心脑血管类',
          med_type: '处方',
          med_factory: '云南白药',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '解毒类',
          med_type: '非处方',
          med_factory: '云南白药',
        }, {
          med_name: '鬼切草',
          med_gui: '1.0g',
          med_class: '西药',
          med_type: '处方',
          med_factory: '云南白药',
        },
      ],
      // 搜索条件
      mt: {
        search: '',
        med_type: '',
        med_class: '',
      },
    };
  },
  filters: {
    msgFilter(arr, searchType, name, classification) {
      let target = arr;
      if (searchType) {
        target = arr.filter((obj) => {
          return obj.med_type === searchType;
        });
      }
      if (name) {
        target = target.filter((obj) => {
          return obj.med_name.indexOf(name) > -1;
        });
      }
      if (classification) {
        target = target.filter((obj) => {
          return obj.med_class === classification;
        });
      }
      return target;
    },
  },
  methods: {
    goback() {
      this.$router.back();
    },
    del(a) {
      this.tableData.splice(a, 1);
    },
    save() {
      this.$message({
        message: '成功保存！',
        type: 'success',
      });
    },
    savesubmit() {
      this.$message({
        message: '成功保存并提交审核！',
        type: 'success',
      });
    },
    // 模态框
    modyfy_addmed() {
      this.modyfy_addmed_show = true;
    },
    closemodyfy() {
      this.modyfy_addmed_show = false;
    },
    allow() {
      this.modyfy_addmed_show = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
  },

};
</script>

<style scoped lang='scss'>
.fl{
    float: left;
}
.fr{
    float: right;
}
  /* header里的样式 */
.addstore .header{
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
.add_date{
    margin-left: 300px;
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
.l_h37{
  line-height: 37px;
}
.w_200{
  width: 200px;
}
.single_num{
  width: 100px;
  display: inline-block;
}
.voucher{
  display: inline-block;
  width: 100px;
}
.search_ipt{
  width: 300px;
}
.search1{
  display: inline-block;
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
.del_btn{
    margin-top: 10px;
}
.m_t20{
  margin-top: 20px;
}
.pointer{
  cursor: pointer;
}
.fy{
  margin-top: 20px;
  margin-left: 30%;
}
.modyfy_addmed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(7, 17, 27, 0.5);
    .container_m {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: #fff;
        min-width: 800px;
        .header_m{
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: rgb(190, 190, 190);
            .title_m{
                margin-left: 20px;
                font-weight: 900;
                font-size: 18px;
                height: 40px;
                line-height: 40px;
            }
        }
        .close_m {
            position: absolute;
            right: 0;
            top: 0;
            padding: 6px;
            font-size: 20px;
            cursor: pointer;
        }
        .content_m {
            padding: 10px 30px;
        }
        .btn_group {
            padding: 10px 30px;
            text-align: left;
        }
    }
  .search_m{
    display: inline-block;
    width: 250px;
  }
  .med_type_m{
    display: inline-block;
    width: 200px;
    margin-left: 40px;
    .med_type_select{
      display: inline-block;
      width: 110px;
    }
  }
  .yao_type_m{
    display: inline-block;
    width: 200px;
    .yao_type_select{
      display: inline-block;
      width: 130px;
    }
  }
}
// 模态框分页
.fy_m{
  margin-left: 20%;
  margin-top: 20px; 
}
.med_table_m{
  height: 528px;
}

</style>
