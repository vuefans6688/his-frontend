<template>
  <div class="preStyle">
    <el-tabs v-model="preRadio">
      <el-tab-pane label="西/中成药" name="1">
        <p class="pullRight">
          <span @click='printWinShow("west")'>
            <i class="el-icon-printer"></i> 打印处方
          </span>
          <span @click="saveAsTemplate(2)">
            <i class="el-icon-circle-check-outline"></i> 保存为模板</span>
          <span @click='usePlates(2)'>
            <i class="el-icon-document"></i> 调用模板</span>
        </p>
        <div class="tagWidth">
          <el-tag :key="index" v-for="(tag, index) in patientMsg.westMedPre" closable @close.stop="handleClose(1, index)" @click.native="touchPre('westPreShow', index)" :class="{ 'tagInfo': patientMsg.westPreShow != index }">
            西/成药处方{{ index + 1}}
          </el-tag>
          <span class="addTag" @click='addTag("西/成药")'>
            <i class="el-icon-circle-plus-outline"></i>
            增加处方
          </span>
        </div>
        <WestMedicine v-for="(item, index) in patientMsg.westMedPre" :key='index' :westMedPre='patientMsg.westMedPre[index]' :patientMsg="patientMsg" :westMedPreId="index" ref="calWest" v-show="patientMsg.westPreShow == index"></WestMedicine>
      </el-tab-pane>
      <el-tab-pane label="中药" name="2">
        <p class="pullRight">
          <span @click='printWinShow("Chinese")'>
            <i class="el-icon-printer"></i> 打印处方
          </span>
          <span @click="saveAsTemplate(3)">
            <i class="el-icon-circle-check-outline"></i> 保存为模板
          </span>
          <span @click='usePlates(3)'>
            <i class="el-icon-document"></i> 调用模板</span>
        </p>
        <div class="tagWidth">
          <el-tag :key="index" v-for="(tag, index) in patientMsg.chinaMedPre" closable @close.stop="handleClose(2, index)" @click.native="touchPre('chinaPreShow', index)" :class="{ 'tagInfo': patientMsg.chinaPreShow != index }">
            中药处方{{ index + 1}}
          </el-tag>
          <span class="addTag" @click='addTag("中药")'>
            <i class="el-icon-circle-plus-outline"></i>
            增加处方
          </span>
        </div>
        <ChineseMedicine v-for="(item, index) in patientMsg.chinaMedPre" :key='index' :chinaMedPre='patientMsg.chinaMedPre[index]' :patientMsg="patientMsg" :chinaMedPreId="index" ref="calChina" v-show="patientMsg.chinaPreShow == index"></ChineseMedicine>
        <!-- <ChineseMedicine v-for="(item, index) in patientMsg.chinaPreTags.tags" :key='index' :chinaMedPreId="index" :chinaMedPre='patientMsg.chinaMedPre[index]' :patientMsg="patientMsg" v-show='patientMsg.chinaPreTags.chinaPreShow == (index + 1)' ref="calChina"></ChineseMedicine> -->
      </el-tab-pane>
      <el-tab-pane label="输液" name="3">
        <p class="pullRight">
          <span @click='printWinShow("water")'>
            <i class="el-icon-printer"></i> 打印处方
          </span>
          <span @click="saveAsTemplate(4)">
            <i class="el-icon-circle-check-outline"></i> 保存为模板</span>
          <span @click='usePlates(4)'>
            <i class="el-icon-document"></i> 调用模板</span>
        </p>
         <div class="tagWidth">
          <el-tag :key="index" v-for="(tag, index) in patientMsg.infusionMedPre" closable @close.stop="handleClose(3, index)" @click.native="touchPre('infusionPreShow', index)" :class="{ 'tagInfo': patientMsg.infusionPreShow != index }">
            输液处方{{ index + 1}}
          </el-tag>
          <span class="addTag" @click='addTag("输液")'>
            <i class="el-icon-circle-plus-outline"></i>
            增加处方
          </span>
        </div>
        <Infusion v-for="(item, index) in patientMsg.infusionMedPre" :key='index' :InfusionArr2="patientMsg.infusionMedPre[index].InfusionArr" :infusionMedPre='patientMsg.infusionMedPre[index]' :infusionId="index" :patientMsg="patientMsg" ref="calInfusion" v-show="patientMsg.infusionPreShow == index"></Infusion>
      </el-tab-pane>
    </el-tabs>

    <!--打印模态  -->
    <div class="print_info" v-show='isPrint'>
      <div class="container">
        <h3>打印窗口</h3>
        <div class="close" @click="isPrint=false">
          <i class="el-icon-circle-close"></i>
        </div>
        <div class="content">
          <el-checkbox-group v-model="presPrint" v-if='presType === "west"'>
            <el-checkbox :label="west.westMedForm" v-for='(west, index) in patientMsg.westMedPre' :key='index'>西/成药处方{{index + 1}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="presPrint" v-else-if='presType === "Chinese"'>
            <el-checkbox :label="china.chinaMedForm" v-for='(china, index) in patientMsg.chinaMedPre' :key='index'>中药处方{{index + 1}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="presPrint" v-else-if='presType === "water"'>
            <el-checkbox :label="water.InfusionArr" v-for='(water, index) in patientMsg.infusionMedPre' :key='index'>输液处方{{index + 1}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- <el-radio-group v-model="A4orA5">
          <el-radio label="A4">A4</el-radio>
          <el-radio label=A5>A5</el-radio>
        </el-radio-group> -->
        <div class="footer">
          <el-button type="primary" size='small' @click='print'>打印</el-button>
        </div>
      </div>
    </div>
    
    <!--调用模板  -->
    <div class="usePlate" v-if='usePlateWin'>
      <div class="container">
        <div class="close" @click='cancelCallTemplate'><i class="el-icon-circle-close"></i></div>
        <UsePlates :templateList='templateList' :templateType='templateType' @callball="templateCallBack"></UsePlates>
      </div>
    </div>
    <!--保存处方窗口  -->
    <SavePlates v-if='savaPlateWin' :drugList='drugList' :itemtype='templateType' @cancel='cancelSaveTemplate'></SavePlates>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import deepcopy from '@/utils/deepcopy';
import httpServerNormal from '@httpServerNormal';
import { delPreApi, presDrugInfo } from '@apiNormal';
import WestMedicine from '../components/WestMedicine';
import ChineseMedicine from '../components/ChineseMedicine';
import Infusion from '../components/Infusion';
import UsePlates from '../components/UsePlates';
import SavePlates from '../components/SavePlates';

export default {
  data() {
    return {
      preRadio: '1',
      isPrint: false,   // 打印窗口
      pres: ['中药', '西/成药'],
      presPrint: [],  // 处方打印列表窗口
      presType: '',   // 打印处方类型
      usePlateWin: false,   // 调用模板窗口
      savaPlateWin: false,  // 保存模板窗口
      templateType: 0,      // 模板类型
      templateList: [],     // 模板列表
      drugList: [], // 需要保存为模板的数据(西/成药)
      formDisabled: false,     // 传值告知自组件
      A4orA5: 'A4',
    };
  },
  methods: {
    ...mapMutations(['set_printMsg']),
    handleClose(tag, index) {  // 删除
      if (!this.patientMsg.registid) {
        return;
      }
      let preType = '';
      // 筛选类别： 1为西/中成药 2为中药 3为输液
      switch (tag) {
        case 1:
          preType = this.patientMsg.westMedPre[index].westMedForm;
          break;
        case 2:
          preType = this.patientMsg.chinaMedPre[index].chinaMedForm;
          break;
        case 3:
          preType = this.patientMsg.infusionMedPre[index].infusionMedForm;
          break;
        default:
          break;
      }
      // 根据类别检验其状态
      switch (preType.status) {
        case 1:
          this.$message({ message: '该处方已缴费', type: 'error', showClose: true, duration: 1000 });
          return;
        case 2:
          this.$message({ message: '该处方已发药', type: 'error', showClose: true, duration: 1000 });
          return;
        case 3:
          this.$message({ message: '该处方已退药', type: 'error', showClose: true, duration: 1000 });
          return;
        case 4:
          this.$message({ message: '该处方已退费', type: 'error', showClose: true, duration: 1000 });
          return;
        default:
          break;
      }
      if (preType.prescript_id) { // 存在则调用删除接口
        this.$confirm('此处方已保存, 确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.delPre(preType.prescript_id, index, tag);   // 删除数据
        }).catch(() => {});
      } else {
        switch (tag) {
          case 1:
            this.patientMsg.westMedPre.splice(index, 1);  // 删除对应的数据
            // 删除后默认显示最后一个
            this.patientMsg.westPreShow = this.patientMsg.westMedPre.length - 1;
            break;
          case 2:
            this.patientMsg.chinaMedPre.splice(index, 1);  // 删除对应的数据
            // 删除后默认显示最后一个
            this.patientMsg.chinaPreShow = this.patientMsg.chinaMedPre.length - 1;
            break;
          case 3:
            this.patientMsg.infusionMedPre.splice(index, 1);
            this.patientMsg.infusionPreShow = this.patientMsg.infusionMedPre.length - 1;
            break;
          default:
            break;
        }
      }
    },
    addTag(str) {  // 增加tag
      if (!this.patientMsg.registid) {
        this.$message({ type: 'warning', message: '请接诊客户', showClose: true, duration: 1000 });
        return;
      }
      switch (str) {
        case '西/成药':
          this.patientMsg.westPreShow = this.patientMsg.westMedPre.length;
          this.patientMsg.westMedPre.push({
            westMedForm: {
              flag: true,
              totalMoney: 0,    // 总价
              clinic_id: this.clinic,
              regist_id: this.patientMsg.registid,
              prescript_id: '',
              prescript_type: 1,       //  处方类型，1-西/成药处方，2-中药处方，3-输液处方
              doctor: this.patientMsg.doctorTip.name,
              status: 0,   // 处方签的状态，0-已保存未收费，1-已收费，2-已开药，3-已退药，4,-已退费
              drug_list: [
                {
                  group_index_str: '',     // 组合
                  drug_id: '',   // 药品id
                  drug_type: 0,
                  name: '',   // 药品名
                  spec_text: '',     // 规格
                  use_method: '',     // 用法
                  dosage: '',    // 单次剂量
                  dose_unit: '',      // 单次剂量(单位)
                  frequency: '',     // 用药频次
                  days: '',      // 天数
                  total: '',    // 开药数量
                  total_unit: '',       // 开药数量(单位)
                  price: 0,     // 单价
                  total_price: 0,     // 金额
                  druginfo: {},
                },
              ],
            },
            westPreStatus: {
              isDisabled: false,   // 禁用表单
              isIconShow: false,      // 收费图标
              validation: false,    // 验证
            },
          });
          break;
        case '中药':
          this.patientMsg.chinaPreShow = this.patientMsg.chinaMedPre.length;
          this.patientMsg.chinaMedPre.push({
            chinaMedForm: {
              flag: true,
              totalMoney: 0,    // 总价
              clinic_id: this.clinic,
              regist_id: this.patientMsg.registid,
              prescript_id: '',
              prescript_type: 2,       //  处方类型，1-西/成药处方，2-中药处方，3-输液处方
              doctor: this.patientMsg.doctorTip.name,
              status: 0,
              drug_list: [
                {
                  name: '',   // 药品名
                  spec_text: '',  // 规格
                  bigSpecsUnit: '',  // 大单位
                  dosage: '',    // 单次剂量
                  drug_id: '',   // 药品id
                  drug_type: 1,
                  dose_unit: '',      // 单次剂量(单位)
                  use_note: '',    // 煎法，用法
                  price: 0,    // 单价
                  total_price: 0,     // 金额
                  total_unit: '剂',
                  taking_note: '',
                  use_method: '内服',
                  zjyongfa: '',
                },
              ],
              use_method: '内服',        // 煎法用法
              total: 1,      // 剂数
              daily_use: '',   // 每次剂量
              daily_use_unit: 'ml',
              frequency: '',       // 频次
              taking_note: '',      // 要求
              zjyongfa: '',
            },
            chinaPreStatus: {
              isDisabled: false,   // 禁用表单
              isIconShow: false,      // 收费图标
              validation: false,    // 验证
            },
          });
          break;
        case '输液':
          this.patientMsg.infusionPreShow = this.patientMsg.infusionMedPre.length;
          this.patientMsg.infusionMedPre.push(
            {
              InfusionArr: [
                {
                  totalMoney: 0,    // 总价
                  status: 0,
                  drug_list: [
                    {
                      name: '',   // 药品名
                      drug_id: '',   // 药品id
                      spec_text: '',
                      dosage: '',    // 剂量
                      drug_type: 0,
                      dose_unit: '',      // 剂量(单位)
                      skin_test: false,     // 皮试
                      total: '',           // 数量
                      total_unit: '',     // 数量单位
                      price: 0,        // 单价
                      total_price: 0,     // 金额
                    },
                  ],
                  use_method: '',        // 用法
                  frequency: '',      // 频次
                  infusion_speed: '',     // 滴速
                  infu_speed_unit: '',     // 滴速(单位)
                  begin_date: new Date(),        // 日期
                  days: '',      // 天数
                },
              ],
              infusionMedForm: {
                flag: true,
                clinic_id: this.clinic,
                regist_id: this.patientMsg.registid,
                prescript_id: '',
                prescript_type: 3,       //  处方类型，1-西/成药处方，2-中药处方，3-输液处方
                doctor: this.patientMsg.doctorTip.name,
                status: 0,
              },
              infusionPreStatus: {
                isDisabled: false,   // 禁用表单
                isIconShow: false,      // 收费图标
                validation: false,    // 验证
              },
            },
          );
          break;
        default:
          break;
      }
    },
    touchPre(tag, index) {  // 点击tag
      this.patientMsg[tag] = index;
    },
    delPre(id, index, type) {  // 删除处方 type 1西/成药 2 中药 3输液
      httpServerNormal(delPreApi, {
        regist_id: this.patientMsg.registid,
        prescript_id: id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$message({ message: '处方删除成功', type: 'success', showClose: true, duration: 1000 });
          switch (type) {
            case 1:
              this.patientMsg.westMedPre.splice(index, 1);
              this.patientMsg.westPreShow = this.patientMsg.westMedPre.length - 1;
              break;
            case 2:
              this.patientMsg.chinaMedPre.splice(index, 1);
              this.patientMsg.chinaPreShow = this.patientMsg.chinaMedPre.length - 1;
              break;
            case 3:
              this.patientMsg.infusionMedPre.splice(index, 1);
              this.patientMsg.infusionPreShow = this.patientMsg.infusionMedPre.length - 1;
              break;
            default:
              break;
          }
        }
      });
    },
    calUnitPrice(dprice, clname, specs) {
      let realUnitPrice = 0;
      if (clname === specs.unit_large.specs_name) { // 入库单位是最大单位
        realUnitPrice = dprice;
      } else if (clname === specs.unit_middle.specs_name) { // 入库单位是中级单位
        realUnitPrice = dprice * specs.unit_middle.specs_unit;
      } else if (clname === specs.unit_primary.specs_name) { // 入库单位是最小单位
        realUnitPrice = dprice / specs.unit_primary.specs_unit;
      }
      return realUnitPrice;
    },
    getMedPrice(drugId, type, index, index2, total, drug) {   // 获取处方价格
      let sum = 0;
      const westPreForm = this.patientMsg.westMedPre[this.patientMsg.westPreShow].westMedForm;
      const chinaPreForm = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm;
      httpServerNormal(presDrugInfo, {
        drug_id: drugId,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res) {
            switch (type) {
              case 2: { // 西/成药
                this.$set(westPreForm.drug_list[index], 'price', res.cf_price);
                westPreForm.drug_list[index].totalNum = res.stock_total || 0;
                westPreForm.drug_list[index].count_ulname = res.count_ulname;
                const unitPrice = this.calUnitPrice(res.cf_price, res.count_ulname, res.specs); // 最大单位的单价
                let stockUnit = ''; // 最小库存的单位
                let totalStock = 0; // 开药的总量
                const specs = res.specs;
                const dgl = westPreForm.drug_list;
                if (specs.unit_middle.specs_name && specs.unit_primary.specs_name) { // 有三级单位
                  stockUnit = specs.unit_primary.specs_name;
                  // 这里处理价格和库存
                  if (dgl[index].total_unit === specs.unit_large.specs_name) { // 选的是最大单位
                    dgl[index].total_price = dgl[index].total * unitPrice; // 计算最大单位的价格;
                    totalStock = dgl[index].total * specs.unit_middle.specs_unit * specs.unit_primary.specs_unit; // 最大单位换算成最小单位计算库存;
                  } else if (dgl[index].total_unit === specs.unit_middle.specs_name) { // 选的是中级单位
                    dgl[index].total_price = dgl[index].total * unitPrice / specs.unit_middle.specs_unit; // 计算次级单位的价格;
                    totalStock = dgl[index].total * specs.unit_primary.specs_unit; // 中级单位换算成最小单位计算库存;
                  } else if (dgl[index].total_unit === specs.unit_primary.specs_name) { // 选的是最小单位
                    dgl[index].total_price = dgl[index].total * unitPrice / specs.unit_middle.specs_unit / specs.unit_primary.specs_unit; // 计算最小单位的价格;
                    totalStock = dgl[index].total; // 中级单位换算成最小单位计算库存;
                  }
                } else if (!specs.unit_primary.specs_name && specs.unit_middle.specs_name) { // 药品只有二级单位
                  stockUnit = specs.unit_middle.specs_name;
                  if (dgl[index].total_unit === specs.unit_large.specs_name) { // 选的是最大单位
                    dgl[index].total_price = dgl[index].total * unitPrice; // 计算最大单位的价格;
                    totalStock = dgl[index].total * specs.unit_middle.specs_unit; // 最大单位换算成最小单位计算库存;
                  } else if (dgl[index].total_unit === specs.unit_middle.specs_name) { // 选的是中级单位
                    dgl[index].total_price = dgl[index].total * unitPrice / specs.unit_middle.specs_unit; // 计算次级单位的价格;
                    totalStock = dgl[index].total; // 中级单位换算成最小单位计算库存;
                  }
                }
                if (totalStock > dgl[index].totalNum) {
                  this.$message({ message: `药品${dgl[index].name}库存量为：${dgl[index].totalNum}${stockUnit}`, type: 'error', showClose: true, duration: 2000 });
                }
                westPreForm.totalMoney += westPreForm.drug_list[index].total_price;
                break;
              }
              case 3:  // 中药
                chinaPreForm.drug_list[index].medName = res.product_name;
                this.$set(chinaPreForm.drug_list[index], 'spec_text', res.specs_txt);
                this.$set(chinaPreForm.drug_list[index], 'specs', res.specs);
                this.$set(chinaPreForm.drug_list[index], 'price', res.cf_price);
                this.$set(chinaPreForm.drug_list[index], 'count_ulname', res.count_ulname);
                this.$set(chinaPreForm.drug_list[index], 'bigSpecsUnit', res.specs.unit_large.specs_name);
                this.perPrimaryUnitPrice(res.cf_price, res.count_ulname, res.specs);
                this.$set(chinaPreForm.drug_list[index], 'total_price', this.perPrimaryUnitPrice(res.cf_price, res.count_ulname, res.specs) * this.changeToPrimaryUnit(res.specs, drug.dosage, drug.dose_unit));
                chinaPreForm.drug_list.forEach((val) => {
                  sum += parseFloat((parseFloat(val.total_price.toFixed(3)) * total).toFixed(2));
                });
                chinaPreForm.totalMoney = sum;
                // // 保存库存进行检测
                {
                  const stockTotal = res.count_ulunit;
                  const stockUnit = res.count_ulname;
                  chinaPreForm.drug_list[index].totalNum = this.changeToPrimaryUnit(res.specs, stockTotal, stockUnit);
                  chinaPreForm.drug_list[index].totalUnit = res.specs.unit_primary.specs_name ? res.specs.unit_primary.specs_name : res.specs.unit_middle.specs_name;
                }
                break;
              case 4: { // 输液
                const oneinfusionMedPre = this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[index2];
                this.$set(oneinfusionMedPre.drug_list[index], 'price', res.cf_price);
                // 添加单位
                this.$set(oneinfusionMedPre.drug_list[index], 'specs', res.specs);
                this.$set(oneinfusionMedPre.drug_list[index], 'count_ulname', res.count_ulname);
                oneinfusionMedPre.drug_list[index].totalNum = res.stock_total || 0;
                oneinfusionMedPre.drug_list[index].count_ulname = res.count_ulname;
                const unitPrice = this.calUnitPrice(res.cf_price, res.count_ulname, res.specs); // 最大单位的单价
                let stockUnit = ''; // 最小库存的单位
                let totalStock = 0; // 开药的总量
                const specs = res.specs;
                const dgl = oneinfusionMedPre.drug_list;
                if (specs.unit_middle.specs_name && specs.unit_primary.specs_name) { // 有三级单位
                  stockUnit = specs.unit_primary.specs_name;
                  // 这里处理价格和库存
                  if (dgl[index].total_unit === specs.unit_large.specs_name) { // 选的是最大单位
                    dgl[index].total_price = dgl[index].total * unitPrice; // 计算最大单位的价格;
                    totalStock = dgl[index].total * specs.unit_middle.specs_unit * specs.unit_primary.specs_unit; // 最大单位换算成最小单位计算库存;
                  } else if (dgl[index].total_unit === specs.unit_middle.specs_name) { // 选的是中级单位
                    dgl[index].total_price = dgl[index].total * unitPrice / specs.unit_middle.specs_unit; // 计算次级单位的价格;
                    totalStock = dgl[index].total * specs.unit_primary.specs_unit; // 中级单位换算成最小单位计算库存;
                  } else if (dgl[index].total_unit === specs.unit_primary.specs_name) { // 选的是最小单位
                    dgl[index].total_price = dgl[index].total * unitPrice / specs.unit_middle.specs_unit / specs.unit_primary.specs_unit; // 计算最小单位的价格;
                    totalStock = dgl[index].total; // 中级单位换算成最小单位计算库存;
                  }
                } else if (!specs.unit_primary.specs_name && specs.unit_middle.specs_name) { // 药品只有二级单位
                  stockUnit = specs.unit_middle.specs_name;
                  if (dgl[index].total_unit === specs.unit_large.specs_name) { // 选的是最大单位
                    dgl[index].total_price = dgl[index].total * unitPrice; // 计算最大单位的价格;
                    totalStock = dgl[index].total * specs.unit_middle.specs_unit; // 最大单位换算成最小单位计算库存;
                  } else if (dgl[index].total_unit === specs.unit_middle.specs_name) { // 选的是中级单位
                    dgl[index].total_price = dgl[index].total * unitPrice / specs.unit_middle.specs_unit; // 计算次级单位的价格;
                    totalStock = dgl[index].total; // 中级单位换算成最小单位计算库存;
                  }
                }
                if (totalStock > dgl[index].totalNum) {
                  this.$message({ message: `药品${dgl[index].name}库存量为：${dgl[index].totalNum}${stockUnit}`, type: 'error', showClose: true, duration: 2000 });
                }
                oneinfusionMedPre.totalMoney += oneinfusionMedPre.drug_list[index].total_price;

                // this.$set(this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[index2].drug_list[index],
                // 'total_price', this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[index2].drug_list[index].total *
                // res.cf_price);
                // this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[index2].drug_list[index].totalNum = res.count_ulunit || 0;
                // this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[index2].totalMoney += this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[index2].drug_list[index].total_price;
              }
                break;
              default:
                break;
            }
          } else {
            this.$message({ message: '该药不存在', type: 'error', showClose: true, duration: 1000 });
          }
        }
      });
    },
    printWinShow(type) { // 打印窗口
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.presPrint = [];
      this.isPrint = true;
      this.presType = type;
      this.$emit('destroyScroll');
      if (type === 'west') {
        this.patientMsg.westMedPre.forEach((obj) => {
          this.presPrint.push(obj.westMedForm);
        });
      } else if (type === 'Chinese') {
        this.patientMsg.chinaMedPre.forEach((obj) => {
          this.presPrint.push(obj.chinaMedForm);
        });
      } else if (type === 'water') {
        this.patientMsg.infusionMedPre.forEach((obj) => {
          this.presPrint.push(obj.InfusionArr);
        });
      }
    },
    print() {  // 打印
      if (!this.presPrint.length) {
        this.$message({ message: '请至少选择一个处方！', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      const printMsg = deepcopy(this.patientMsg);
      const presList = deepcopy(this.presPrint);
      // printMsg.page_size = this.A4orA5;

      if (this.presType === 'west' && this.presPrint.length) {
        printMsg.westMedPre = presList;
        this.set_printMsg(printMsg);
        this.$nextTick(() => {
          window.open('/print/WestPrescription');
          this.isPrint = false;
        });
      } else if (this.presType === 'Chinese' && this.presPrint.length) {
        printMsg.chinaMedPre = presList;
        this.set_printMsg(printMsg);
        this.$nextTick(() => {
          window.open('/print/ChinesePrescription');
          this.isPrint = false;
        });
      } else if (this.presType === 'water' && this.presPrint.length) {
        printMsg.infusionMedPre = presList;
        this.set_printMsg(printMsg);
        this.$nextTick(() => {
          window.open('/print/WaterPrescription');
          this.isPrint = false;
        });
      }
      this.$emit('initScroll');
    },
    usePlates(type) {  // 调用模板
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.templateType = type;
      this.$emit('destroyScroll');
      // this.getMedicalTemplateList(type);
      this.usePlateWin = true;
    },
    // 取消调用模板
    cancelCallTemplate() {
      this.usePlateWin = false;
      this.$emit('initScroll');
    },
    useWestTemplate(data) {  // 填入西药模板
      this.patientMsg.westMedPre[this.patientMsg.westPreShow].westMedForm.drug_list = data.data.drug_list;
      this.patientMsg.westMedPre[this.patientMsg.westPreShow].westMedForm.drug_list.forEach((val, index) => {
        val.days += '';
        val.dosage += '';
        val.total += '';
        this.getMedPrice(val.drug_id, 2, index);
      });
    },
    useChinaTemplate(data) { // 填入中药模板
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.drug_list = data.data.drug_list;
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.drug_list.forEach((val, index) => {
        // val.dosage += '';
        this.getMedPrice(val.drug_id, 3, index, 0, data.data.total, val);
        this.$set(val, 'use_method', data.data.use_method);
        this.$set(val, 'taking_note', data.data.taking_note);
        this.$set(val, 'zjyongfa', data.data.zjyongfa);
      });
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.use_method = data.data.use_method || '内服';
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.total = data.data.total + '';
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.daily_use = data.data.daily_use;
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.frequency = data.data.frequency;
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.taking_note = data.data.taking_note;
      this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.zjyongfa = data.data.zjyongfa;
    },
    useInfusionTemplate(data) {  // 填入输液模板
      const groupArr = [];
      // this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].infusionMedForm = data.data;
      this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].infusionMedForm.drug_list = data.data.drug_list;
      data.data.drug_list.forEach((val) => { // 找出组号
        groupArr.push(val.group_index_str);
      });
      const result = groupArr.filter((item, index, array) => { // 去重
        return array.indexOf(item) === index;
      });
      result.forEach((val2) => {
        const group = {
          drug_list: [],
          totalMoney: 0,
        };
        this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].infusionMedForm.drug_list.forEach((val) => {
          if (val.group_index_str === val2) {
            val.skin_test = !!val.skin_test;
            group.drug_list.push(val);
            group.use_method = val.use_method;
            group.frequency = val.frequency;
            group.use_method = val.use_method;
            group.infusion_speed = val.infusion_speed ? val.infusion_speed.toString() : '';
            group.infu_speed_unit = val.infu_speed_unit;
            group.begin_date = new Date();
            group.days = val.days ? val.days.toString() : '';
          }
        });
        this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr.push(group);
      });
      this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr.splice(0, 1); // 删掉第一个空的
      this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr.forEach((val1, index1) => {
        val1.drug_list.forEach((val2, index2) => {
          this.getMedPrice(val2.drug_id, 4, index2, index1);
        });
      });
    },
    // 调用模板的回调
    templateCallBack(data, type) {
      this.cancelCallTemplate();
      // 下面为渲染数据部分
      if (type === 2) {
        // this.patientMsg.westPreShow为显示的tag下标
        if (this.patientMsg.westMedPre[this.patientMsg.westPreShow].westMedForm.prescript_id) {  // 当前为已保存的处方，则新增处方
          this.addTag('西/成药');
        }
        // 根据处方第一条药品名判断是否需提示
        if (this.patientMsg.westMedPre[this.patientMsg.westPreShow].westMedForm.drug_list[0].name) {
          this.$confirm('该处方包含药品, 是否覆盖?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.useWestTemplate(data);
          }).catch(() => {});
        } else {
          this.useWestTemplate(data);
        }
      } else if (type === 3) {
        // this.patientMsg.chinaPreShow为显示的tag下标
        if (this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.prescript_id) {  // 当前为已保存的处方，则新增处方
          this.addTag('中药');
        }
        // 根据处方第一条药品名判断是否需提示
        if (this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.drug_list[0].name) {
          this.$confirm('该处方包含药品, 是否覆盖?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.useChinaTemplate(data);
          }).catch(() => {});
        } else {
          this.useChinaTemplate(data);
        }
      } else if (type === 4) {
        // this.patientMsg.infusionPreShow为显示的tag下标
        if (this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].infusionMedForm.prescript_id) { // 当前为已保存的处方，则新增处方
          this.addTag('输液');
        }
        if (this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].InfusionArr[0].drug_list[0].name) {
          this.$confirm('该处方包含药品, 是否覆盖?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.useInfusionTemplate(data);
          }).catch(() => {});
        } else {
          this.useInfusionTemplate(data);
        }
      }
    },
    // 取消保存模板
    cancelSaveTemplate() {
      this.$emit('initScroll');     // 模态框消失需init父组件Scrollbar
      this.savaPlateWin = false;
    },
    // 保存为模板
    saveAsTemplate(type) {
      if (!this.patientMsg.registid) {
        this.$message({ message: '请接诊客户', type: 'error', showClose: true, duration: 1000 });
        return;
      }
      this.$emit('destroyScroll');
      this.savaPlateWin = true;
      this.templateType = type;
      if (type === 2) {
        const drugList = deepcopy(this.patientMsg.westMedPre[this.patientMsg.westPreShow].westMedForm.drug_list);
        this.drugList = drugList;
      } else if (type === 3) {
        const drugList = deepcopy(this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.drug_list);
        drugList.forEach((drug, index) => {
          drugList[index].daily_use = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.daily_use;
          drugList[index].daily_use_unit = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.daily_use_unit;
          drugList[index].frequency = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.frequency;
          drugList[index].taking_note = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.taking_note;
          drugList[index].total = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.total;
          drugList[index].use_method = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.use_method;
          drugList[index].zjyongfa = this.patientMsg.chinaMedPre[this.patientMsg.chinaPreShow].chinaMedForm.zjyongfa;
        });
        this.drugList = drugList;
      } else if (type === 4) {
        // 如果没有药品，将阻止继续
        if (!this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].infusionMedForm.drug_list) {
          this.$message({ message: '请先保存模板', type: 'error', showClose: true, duration: 1000 });
          this.cancelSaveTemplate();
          return;
        }
        const drugList = deepcopy(this.patientMsg.infusionMedPre[this.patientMsg.infusionPreShow].infusionMedForm.drug_list);
        this.drugList = drugList;
      }
    },
    // 小单位价格
    perPrimaryUnitPrice(dprice, dosageUnit, specs) {
      let realUnitPrice = 0;
      if (dosageUnit === specs.unit_large.specs_name) { // 入库单位是最大单位
        realUnitPrice = dprice / (specs.unit_middle.specs_name ? specs.unit_middle.specs_unit : 1) / (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (dosageUnit === specs.unit_middle.specs_name) { // 入库单位是中级单位
        realUnitPrice = dprice / (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (dosageUnit === specs.unit_primary.specs_name) { // 入库单位是最小单位
        realUnitPrice = dprice;
      }
      return realUnitPrice;
    },
    // 换算成小单位
    changeToPrimaryUnit(specs, dosage, dosageUnit) {
      if (!specs) {
        return 0;
      }
      let total = 0;
      if (dosageUnit === specs.unit_large.specs_name) {
        total = dosage * (specs.unit_middle.specs_name ? specs.unit_middle.specs_unit : 1) * (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else if (dosageUnit === specs.unit_middle.specs_name) {
        total = dosage * (specs.unit_primary.specs_name ? specs.unit_primary.specs_unit : 1);
      } else {
        total = dosage;
      }
      return total;
    },
  },
  components: {
    WestMedicine,
    ChineseMedicine,
    Infusion,
    UsePlates,
    SavePlates,
  },
  computed: {
    ...mapGetters(['clinic', 'token']),
  },
  watch: {
    patientMsg() {
      if (this.patientMsg.westPreList && this.patientMsg.westPreList.length) {
        for (let i = this.patientMsg.westPreList.length - 1; i >= 0; i--) {
          if (this.patientMsg.westPreList.length > this.patientMsg.westMedPre.length) {
            this.addTag('西/成药');
          }
          this.patientMsg.westPreList[i].drug_list.map((val) => {
            val.dosage += '';
            val.days += '';
            val.total += '';
            val.medName = val.name;
            return this.patientMsg.westPreList[i].drug_list;
          });
          setTimeout(() => {
            this.patientMsg.westMedPre[i].westMedForm = this.patientMsg.westPreList[i];
            this.patientMsg.westMedPre[i].westPreStatus.isDisabled = true;
            if (this.patientMsg.westMedPre[i].westMedForm.status !== 0) {
              this.patientMsg.westMedPre[i].westPreStatus.isIconShow = true;
            }
            this.$refs.calWest[i].calculateAll(); // 计算西/成药处方总价
          }, 0);
        }
      }
      if (this.patientMsg.chinaPreList && this.patientMsg.chinaPreList.length) {
        for (let i = this.patientMsg.chinaPreList.length - 1; i >= 0; i--) {
          if (this.patientMsg.chinaPreList.length > this.patientMsg.chinaMedPre.length) {
            this.addTag('中药');
          }
          const drug = this.patientMsg.chinaPreList[i].drug_list[0];
          this.$set(this.patientMsg.chinaPreList[i], 'use_method', drug.use_method);
          this.$set(this.patientMsg.chinaPreList[i], 'taking_note', drug.taking_note);
          this.$set(this.patientMsg.chinaPreList[i], 'zjyongfa', drug.zjyongfa);
          this.patientMsg.chinaPreList[i].total = drug.total;
          this.patientMsg.chinaPreList[i].daily_use = drug.daily_use;
          this.patientMsg.chinaPreList[i].daily_use_unit = drug.daily_use_unit;
          this.patientMsg.chinaPreList[i].frequency = drug.frequency;
          this.patientMsg.chinaPreList[i].spec_text = drug.spec_text;

          this.patientMsg.chinaPreList[i].drug_list.forEach((val2) => {
            val2.bigSpecsUnit = val2.spec_text.split('/')[1];
            val2.specs = val2.specs_trans;
            val2.dosage += '';
            val2.medName = val2.name;
            val2.total_price /= val2.total;
          });
          setTimeout(() => {
            this.patientMsg.chinaMedPre[i].chinaMedForm = this.patientMsg.chinaPreList[i];
            this.patientMsg.chinaMedPre[i].chinaPreStatus.isDisabled = true;
            if (this.patientMsg.chinaMedPre[i].chinaMedForm.status !== 0) {
              this.patientMsg.chinaMedPre[i].chinaPreStatus.isIconShow = true;
            }
            this.$refs.calChina[i].calculateAll(); // 计算中药处方总价
          }, 0);
        }
      }
      if (this.patientMsg.chinaPreList && this.patientMsg.chinaPreList.length === 0) {
        this.$refs.calChina[0].total_money = 0;
      }
      if (this.patientMsg.infusionPreList && this.patientMsg.infusionPreList.length) {
        for (let i = this.patientMsg.infusionPreList.length - 1; i >= 0; i--) {
          if (this.patientMsg.infusionPreList.length > this.patientMsg.infusionMedPre.length) {
            this.addTag('输液');
          }
          const groupArr = [];
          this.patientMsg.infusionMedPre[i].infusionMedForm = this.patientMsg.infusionPreList[i];
          this.patientMsg.infusionMedPre[i].infusionMedForm.drug_list.forEach((val) => { // 找出组号
            groupArr.push(val.group_index_str);
          });
          const result = groupArr.filter((item, index, array) => { // 去重
            return array.indexOf(item) === index;
          });
          result.forEach((val2) => {
            const group = {
              drug_list: [],
            };
            this.patientMsg.infusionMedPre[i].infusionMedForm.drug_list.map((val) => {
              if (val.group_index_str.indexOf(val2) > -1) {
                val.skin_test = !!val.skin_test;
                val.medName = val.name;
                group.drug_list.push(val);
                group.use_method = val.use_method;
                group.frequency = val.frequency;
                group.use_method = val.use_method;
                group.infusion_speed = val.infusion_speed ? val.infusion_speed.toString() : '';
                group.infu_speed_unit = val.infu_speed_unit;
                group.begin_date = new Date(+val.begin_date);
                group.days = val.days ? val.days.toString() : '';
              }
              return this.patientMsg.infusionMedPre[i].infusionMedForm.drug_list;
            });
            this.patientMsg.infusionMedPre[i].InfusionArr.push(group);
          });
          setTimeout(() => {
            this.patientMsg.infusionMedPre[i].InfusionArr.splice(0, 1);
            this.patientMsg.infusionMedPre[i].infusionPreStatus.isDisabled = true;
            if (this.patientMsg.infusionMedPre[i].infusionMedForm.status !== 0) {
              this.patientMsg.infusionMedPre[i].infusionPreStatus.isIconShow = true;
            }
            this.$refs.calInfusion[i].calculateAll(); // 计算输液处方总价
          }, 0);
        }
      }
    },
  },
  props: ['patientMsg'],
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.preStyle {
  padding: 0 10px;
  position: relative;
  .tagWidth{
    width: 70%;
  }
  .el-tag {
    margin-right: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 14px;
    &.tagInfo {
      background-color: rgba(135, 141, 153, .1);
      border-color: rgba(135, 141, 153, .2);
      color: #666;
    }
  }
  .addTag {
    color: $mainColor;
    cursor: pointer;
  }
  .el-tab-pane{
    min-height: 30px;
  }
  .pullRight {
    position: absolute;
    z-index: 3;
    top: 0;
    // height: 30px;
    line-height: 30px;
    right: 20px;
    span {
      cursor: pointer;
      margin-right: 10px;
      font-size: 14px;
      &:hover {
        color: $mainColor;
      }
    }
  }
}

// 打印模态
.print_info {
  @include modify_info;
  .container .content{
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .footer{
    text-align: center;
  }
}

.usePlate {
  // 调用模板
  @include modify_info;
  overflow: auto;
  .container{
    top: 100px;
    transform: translate(-50%, 0);
    min-height: 300px;
  }
}
</style>

