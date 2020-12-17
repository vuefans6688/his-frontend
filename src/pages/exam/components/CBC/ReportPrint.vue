<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-04 15:56:08
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-12 09:24:14
 -->
<template>
<div ref='print'>
  <div class="list" ref='pdfs'>
    <div class="page" v-for="(page, i) in report_list" :key="i">
      <h2 class="title">3-Part-Diff 全自动血细胞分析报告</h2>
      <el-row class="clinic">
        <el-col :span="12">检验诊所: {{clinic_name}}</el-col>
        <el-col :span="12" class="right_align">样本编号: {{page.sample[0]}}</el-col>
      </el-row>
      <div class="line"></div>

      <div class="info">
        <el-row class="info_line">
          <el-col :span="6">姓名: {{page.real_name}}</el-col>
          <el-col :span="6">病人类别: </el-col>
          <el-col :span="6">科别: </el-col>
          <el-col :span="6">医生: {{page.doctor_name}}</el-col>
        </el-row>
        <el-row class="info_line">
          <el-col :span="6">性别: {{ page.gender | SexState }}</el-col>
          <el-col :span="6">病人电话: {{page.phone}}</el-col>
          <el-col :span="6">床号: {{page.sample[1]}}</el-col>
          <el-col :span="6">医生电话: </el-col>
        </el-row>
        <el-row class="info_line">
          <el-col :span="6">年龄: {{page.age}}</el-col>
          <el-col :span="12">门诊/病历号: {{page.sample[2]}}</el-col>
          <el-col :span="6">临床诊断: </el-col>
        </el-row>
      </div>
      <div class="line"></div>

      <div class="result">
        <el-row class="header">
          <el-col :span="8">项目名称</el-col>
          <el-col :span="4">项目简称</el-col>
          <el-col :span="3">结果值</el-col>
          <el-col :span="2">提示</el-col>
          <el-col :span="3">单位</el-col>
          <el-col :span="4">参考区间</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">白细胞计数</el-col>
          <el-col :span="4">WBC</el-col>
          <el-col :span="3">{{page.data.OBX_WBC.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_WBC.split(',')[0]) < page.data.OBX_WBC.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_WBC.split(',')[0]) > page.data.OBX_WBC.split(',')[2].split('-')[1]"></i>
            &nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_WBC.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_WBC.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">淋巴细胞比率</el-col>
          <el-col :span="4">LYM%</el-col>
          <el-col :span="3">{{page.data.OBX_LYM_RATIO.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_LYM_RATIO.split(',')[0]) < page.data.OBX_LYM_RATIO.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_LYM_RATIO.split(',')[0]) > page.data.OBX_LYM_RATIO.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_LYM_RATIO.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_LYM_RATIO.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">单核细胞比率</el-col>
          <el-col :span="4">MON%</el-col>
          <el-col :span="3">{{page.data.OBX_MON_RATIO.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_MON_RATIO.split(',')[0]) < page.data.OBX_MON_RATIO.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_MON_RATIO.split(',')[0]) > page.data.OBX_MON_RATIO.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_MON_RATIO.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_MON_RATIO.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">中性粒细胞比率</el-col>
          <el-col :span="4">NEU%</el-col>
          <el-col :span="3">{{page.data.OBX_NEU_RATIO.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_NEU_RATIO.split(',')[0]) < page.data.OBX_NEU_RATIO.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_NEU_RATIO.split(',')[0]) > page.data.OBX_NEU_RATIO.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_NEU_RATIO.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_NEU_RATIO.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">淋巴细胞数</el-col>
          <el-col :span="4">LYM%</el-col>
          <el-col :span="3">{{page.data.OBX_LYM.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_LYM.split(',')[0]) < page.data.OBX_LYM.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_LYM.split(',')[0]) > page.data.OBX_LYM.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_LYM.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_LYM.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">单核细胞数</el-col>
          <el-col :span="4">MON#</el-col>
          <el-col :span="3">{{page.data.OBX_MON.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_MON.split(',')[0]) < page.data.OBX_MON.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_MON.split(',')[0]) > page.data.OBX_MON.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_MON.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_MON.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">中性粒细胞数</el-col>
          <el-col :span="4">NEU#</el-col>
          <el-col :span="3">{{page.data.OBX_NEU.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_NEU.split(',')[0]) < page.data.OBX_NEU.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_NEU.split(',')[0]) > page.data.OBX_NEU.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_NEU.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_NEU.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">红细胞数</el-col>
          <el-col :span="4">RBC</el-col>
          <el-col :span="3">{{page.data.OBX_RBC.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_RBC.split(',')[0]) < page.data.OBX_RBC.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_RBC.split(',')[0]) > page.data.OBX_RBC.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_RBC.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_RBC.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">血红蛋白浓度</el-col>
          <el-col :span="4">HGB</el-col>
          <el-col :span="3">{{page.data.OBX_HGB.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_HGB.split(',')[0]) < page.data.OBX_HGB.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_HGB.split(',')[0]) > page.data.OBX_HGB.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_HGB.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_HGB.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">血细胞比容</el-col>
          <el-col :span="4">HCT</el-col>
          <el-col :span="3">{{page.data.OBX_HCT.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_HCT.split(',')[0]) < page.data.OBX_HCT.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_HCT.split(',')[0]) > page.data.OBX_HCT.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_HCT.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_HCT.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">平均红细胞容积</el-col>
          <el-col :span="4">MCV</el-col>
          <el-col :span="3">{{page.data.OBX_MCV.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_MCV.split(',')[0]) < page.data.OBX_MCV.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_MCV.split(',')[0]) > page.data.OBX_MCV.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_MCV.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_MCV.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">平均红细胞血红蛋白量</el-col>
          <el-col :span="4">MCH</el-col>
          <el-col :span="3">{{page.data.OBX_MCH.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_MCH.split(',')[0]) < page.data.OBX_MCH.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_MCH.split(',')[0]) > page.data.OBX_MCH.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_MCH.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_MCH.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">平均红细胞血红蛋白浓度</el-col>
          <el-col :span="4">MCHC</el-col>
          <el-col :span="3">{{page.data.OBX_MCHC.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_MCHC.split(',')[0]) < page.data.OBX_MCHC.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_MCHC.split(',')[0]) > page.data.OBX_MCHC.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_MCHC.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_MCHC.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">红细胞分布宽度变异系数</el-col>
          <el-col :span="4">RDW_CV</el-col>
          <el-col :span="3">{{page.data.OBX_RDW_CV.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_RDW_CV.split(',')[0]) < page.data.OBX_RDW_CV.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_RDW_CV.split(',')[0]) > page.data.OBX_RDW_CV.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_RDW_CV.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_RDW_CV.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">红细胞分布宽度标准差</el-col>
          <el-col :span="4">RDW_SD</el-col>
          <el-col :span="3">{{page.data.OBX_RDW_SD.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_RDW_SD.split(',')[0]) < page.data.OBX_RDW_SD.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_RDW_SD.split(',')[0]) > page.data.OBX_RDW_SD.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_RDW_SD.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_RDW_SD.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">血小板</el-col>
          <el-col :span="4">PLT</el-col>
          <el-col :span="3">{{page.data.OBX_PLT.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_PLT.split(',')[0]) < page.data.OBX_PLT.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_PLT.split(',')[0]) > page.data.OBX_PLT.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_PLT.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_PLT.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">平均血小板体积</el-col>
          <el-col :span="4">MPV</el-col>
          <el-col :span="3">{{page.data.OBX_MPV.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_MPV.split(',')[0]) < page.data.OBX_MPV.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_MPV.split(',')[0]) > page.data.OBX_MPV.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_MPV.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_MPV.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">血小板分布宽度</el-col>
          <el-col :span="4">PDW</el-col>
          <el-col :span="3">{{page.data.OBX_PDW.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_PDW.split(',')[0]) < page.data.OBX_PDW.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_PDW.split(',')[0]) > page.data.OBX_PDW.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_PDW.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_PDW.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">血小板压积</el-col>
          <el-col :span="4">PCT</el-col>
          <el-col :span="3">{{page.data.OBX_PCT.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_PCT.split(',')[0]) < page.data.OBX_PCT.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_PCT.split(',')[0]) > page.data.OBX_PCT.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_PCT.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_PCT.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">血小板大细胞比率</el-col>
          <el-col :span="4">P_LCR</el-col>
          <el-col :span="3">{{page.data.OBX_P_LCR.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_P_LCR.split(',')[0]) < page.data.OBX_P_LCR.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_P_LCR.split(',')[0]) > page.data.OBX_P_LCR.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_P_LCR.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_P_LCR.split(',')[2]}}</el-col>
        </el-row>
        <el-row class="result_line">
          <el-col :span="8">大血小板数目</el-col>
          <el-col :span="4">P_LCC</el-col>
          <el-col :span="3">{{page.data.OBX_P_LCC.split(',')[0]}}</el-col>
          <el-col :span="2">
            <i class="el-icon-bottom out-of-range" v-if="parseFloat(page.data.OBX_P_LCC.split(',')[0]) < page.data.OBX_P_LCC.split(',')[2].split('-')[0]"></i>
            <i class="el-icon-top out-of-range" v-if="parseFloat(page.data.OBX_P_LCC.split(',')[0]) > page.data.OBX_P_LCC.split(',')[2].split('-')[1]"></i>&nbsp;
          </el-col>
          <el-col :span="3">{{page.data.OBX_P_LCC.split(',')[1]}}</el-col>
          <el-col :span="4">{{page.data.OBX_P_LCC.split(',')[2]}}</el-col>
        </el-row>
      </div>

      <div class="footer">
        <el-row class="footer_line">
          <el-col :span="20">本结果仅供本门诊医生参考，如有疑问请在报告日期一周内提出。</el-col>
          <el-col :span="4" class="right_align">第{{i+1}}页/共{{report_list.length}}页</el-col>
        </el-row>
        <div class="line"></div>
        <el-row class="footer_line">
          <el-col :span="6">检验人员: </el-col>
          <el-col :span="6">审核人员: </el-col>
          <el-col :span="12" class="right_align">检验时间: {{page.data.TESTTIME}}</el-col>
        </el-row>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import httpServerNormal from '@httpServerNormal';
import { CBC_get_report_detail, getClinicName } from '@apiNormal';

const A4_width = 592.28;
const A4_height = 841.89;
const Margin = 10;

export default {
  props: {
    report_id_list: {
      type: Array,
    },
  },
  data() {
    return {
      report_list: [],
      clinic_name: '',
    };
  },
  methods: {
    get_clinic_name() {
      httpServerNormal(getClinicName).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.clinic_name = res ? res.clinic_name : '';
        }
      });
    },
    get_detail(report_id) {
      httpServerNormal(CBC_get_report_detail, {
        report_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.$set(res, 'sample', res.data.OBR.split(','));
          this.report_list.push(res);
        } else {
          this.$emit('reject');
        }
      });
    },
    print() {
      const origin_html = document.body.innerHTML;
      document.body.innerHTML = this.$refs.print.innerHTML;
      window.print();
      setTimeout(() => {
        document.body.innerHTML = origin_html;
        this.$router.go(0);
      }, 0);
    },
    download() {
      html2Canvas(this.$refs.pdfs).then((canvas) => {
        const content_width = canvas.width;
        const content_height = canvas.height;

        const page_height = content_width / A4_width * A4_height;
        const page_margin = content_width / A4_width * Margin;
        let left_height = content_height;
        let position = 0;

        const img_width = A4_width;
        const img_height = content_width / A4_width * content_height;

        const page_data = canvas.toDataURL('image/jpeg', 1.0);
        const PDF = new JsPDF('', 'pt', 'a4');

        while (left_height > 0) {
          PDF.addImage(page_data, 'JPEG', 0, position, img_width, img_height);
          left_height = left_height - page_height - page_margin;
          position -= A4_height;
          if (left_height > 0) {
            PDF.addPage();
          }
        }
        PDF.save('澳考科技-血常规检验报告.pdf');
      });
    },
  },
  created() {
    this.get_clinic_name();
    this.report_id_list.forEach((id) => {
      this.get_detail(id);
    });
  },
};
</script>

<style lang="scss" scoped>
.list{
  width: 593px;
  margin: 0 auto;
  font-size: 14px;
  .page{
    page-break-after: always;
    padding: 20px 24px;
    margin-top: 10px;
    height: 842px;
    box-sizing: border-box;
    background: #fff;
    .line{
      height: 2px;
      background: #000;
    }
    .title{
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
    .clinic{
      padding: 0 12px;
      font-size: 12px;
      .right_align{
        text-align: right;
      }
    }
    .info{
      padding: 0 12px;
      font-size: 12px;
      .info_line{
        line-height: 20px;
      }
    }
    .result{
      margin-top: 4px;
      .header{
        padding: 0 12px;
        background-color: #1C86EE;
        color: #fff;
        font-weight: 600;
        line-height: 24px;
      }
      .result_line{
        padding: 0 12px;
        line-height: 20px;
        &:nth-of-type(2n+1){
          background: #ccc;
        }
        .out-of-range{
          color: red;
        }
      }
    }

    .footer{
      margin-top: 30px;
      font-size: 12px;
      .footer_line{
        padding: 0 12px;
        .right_align{
          text-align: right;
        }
      }
    }
  }
}

@media print {
  .list{
    width: 90%;
  }
  .page {
    padding: 0;
    float: none;
    font-size: 10pt !important;
  }
  @page { margin: 1.5cm; size: A4; }
  html {
    height: auto !important;
  }
  html,body {
    background-color: white;
  }
  body {
    font: 10pt "宋体", Georgia, "Times New Roman", Times, serif;
    line-height: 1;
    background: #fff !important;
    color: #000;
  }
}
</style>
