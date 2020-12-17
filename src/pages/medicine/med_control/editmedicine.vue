<!--
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @Date: 2019-07-04 15:56:08
 * @LastEditors: FanHaorun
 * @LastEditTime: 2019-08-22 15:43:12
 -->
<template>
  <div class="editmedicine">
    <div class="header">
      <h3 class="title fl lh45">{{this.title}}</h3>

      <div class="type_btn in_block">
        <button class="btn" :class="{active: btnShowxiyao}" @click="btnShowOrHidexiyao" :disabled="mark_x">西药/中成药</button>
        <button class="btn" :class="{active: btnShowzhongyao}" @click="btnShowOrHidezhongyao" :disabled="mark_z">中草药</button>
      </div>
      <div class="btn_group fr in_block">
        <el-button type="primary" @click="save1('xiyaoapply')" v-show="btnsavexi">保存</el-button>
        <el-button type="primary" @click="save2('zhongyaoapply')" v-show="btnsavezhong">保存</el-button>
        <el-button type="primary" @click="close">取消</el-button>
      </div>
    </div>

    <!-- 西药/中成药 -->
    <div class="med_info" v-show="showxiyao">
      <el-form :rules="rules1" ref="xiyaoapply"  class="main_form" :model="xiyaoapply">
        <!-- 基本信息 -->
        <div class="med_base">
          <div class="main-block-title ">
            基本信息
          </div>
          <div class="main-block-content">
            <div class="warning" v-show="!donot">
              提示语：为方便您后续接入社保需求，与您诊所匹配的药品信息请您优先选择带有社保标识的药品。
            </div>
            <el-row class="base1 m_t20">
              <el-col :span="8">
                <i class="require">*</i>
                <span>药品名称:</span>
                <el-form-item prop="med_name" class="in_block">
                  <template solt-scope='scope'>
                    <el-autocomplete :disabled="donot" v-model="xiyaoapply.med_name"
                    :fetch-suggestions="querySearchAsync" :debounce=300 placeholder="药品名称" @select="handleSelect" :trigger-on-focus="false">
                      <template slot-scope="props">
                        <div class="thinkName">
                          {{ props.item.name }} <span class="sebao" v-if="props.item.extra4 !== ''">社保</span>
                          <p class="spec">{{ props.item.extra1 }}</p>
                          <p class="factory">{{ props.item.extra2 }}</p>
                        </div>
                      </template>
                    </el-autocomplete>
                  </template>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <span>药品别名:</span>
                  <el-input placeholder="" class="ipt" v-model="xiyaoapply.med_lname"></el-input>
              </el-col>
              
              <el-col :span="8">
                <el-form-item prop="ake001" class="in_block" label='社保编码:' label-width="100px" 
                :rules="[{ required: this.requiredFlag, message: '请输入社保编码', trigger: 'change'}]">
                  <el-input placeholder="" class="ipt" v-model="xiyaoapply.ake001"></el-input>
                </el-form-item>
              </el-col>
              
            </el-row>

            <el-row class="base3 m_t20">
              <el-col :span="8">
                <el-form-item prop="aka074" class="in_block" label="规格:" label-width="72px"
                :rules="[{ required: this.requiredFlag, message: '请输入药品规格', trigger: 'change' }]">
                  <el-input placeholder="" class="ipt" v-model="xiyaoapply.aka074"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <span>批准文号:</span>
                <el-input placeholder="" class="ipt" v-model="xiyaoapply.med_titanic"></el-input>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="standard_number" class="in_block" label="药品本位码:" label-width="100px"
                :rules="[{ required: this.requiredFlag, message: '请输入药品本位码', trigger: 'change' }]">
                  <el-input placeholder="" class="ipt" v-model="xiyaoapply.standard_number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="base3 m_t20">
              <el-col :span="20">
                <div>
                  <i class="require">*</i> 药品规格:(<span class="warning"> 例如:每【盒】有【20】【包】；每【包】有【20】【g】</span>)
                  <span class="addTag" @click='addSpec' v-if="!showSpec">
                    <i class="el-icon-circle-plus-outline"></i>
                    增加规格
                  </span>
                </div>
                <div class="m_t20 m_l29">
                  <!-- 第一个 -->
                  <div class="in_block">
                    <span>每</span>
                    <el-form-item prop="bigunit1" class="in_block">
                      <el-select v-model="xiyaoapply.bigunit1" class="use_unit" placeholder=""  :disabled="donot">
                        <el-option v-for="(item, index) in XYbigunit" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <span>有</span>
                    <el-form-item prop="med_manyunit1" class="in_block">
                      <el-input class="use_unit" v-model="xiyaoapply.med_manyunit1" @keyup.native="limit('med_manyunit1')" :disabled="donot"></el-input>
                    </el-form-item>
                    <el-form-item prop="smallunit1" class="in_block">
                      <el-select v-model="xiyaoapply.smallunit1" class="use_unit" placeholder="" :disabled="donot">
                        <el-option v-for="(item, index) in options3" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <!-- 第二个 -->
                  <div class="in_block" v-if="(donot && xiyaoapply.smallunit2 !== '') || (!donot && showSpec)">
                    <span class="m_l50">每</span>
                    <el-form-item prop="smallunit1" class="in_block">
                      <el-select v-model="xiyaoapply.smallunit1" class="use_unit" placeholder="" :disabled="donot">
                        <el-option v-for="(item, index) in options4" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <span>有</span>
                    <el-form-item prop="med_manyunit2" class="in_block">
                      <el-input class="use_unit" v-model="xiyaoapply.med_manyunit2" @keyup.native="limit('med_manyunit2')" :disabled="donot"></el-input>
                    </el-form-item>
                    <el-form-item prop="smallunit2" class="in_block">
                      <el-select v-model="xiyaoapply.smallunit2" class="use_unit" placeholder="" :disabled="donot">
                        <el-option v-for="(item, index) in options5" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <span class="delSpec" v-if="!donot"><i class="el-icon-delete pointer" @click="delSpec()">删除次级规格</i></span>
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-row class="base3 m_t20">
              <el-col :span="8">
                <span>药品剂型:</span>
                <el-form-item prop="med_dosage" class="in_block">
                  <el-select v-model="xiyaoapply.med_dosage" placeholder="" class="ipt" :clearable="true" filterable>
                    <el-option v-for="(item, index) in options8" :key="index" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <span>用药类型:</span>
                <el-form-item prop="med_type" class="in_block">
                  <el-select v-model="xiyaoapply.med_type" placeholder="" :clearable="true" class="ipt">
                    <el-option v-for="(item, index) in options9" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="commodity_code" label="物品码(EAN13):">
                  <el-input placeholder="" class="ipt" v-model="xiyaoapply.commodity_code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="base3 m_t20">
              <el-col :span="8">
                <span>生产厂家:</span>
                <el-input placeholder="" class="ipt" v-model="xiyaoapply.factory"></el-input>
              </el-col>
              <el-col :span="8" v-if="this.act === '编辑'">
                <span>医保价格:</span>
                <el-input placeholder="" class="ipt" v-model="xiyaoapply.price_healthcard"  :disabled="true"></el-input>
              </el-col>
              <el-col :span="8" >
                <div class="stock_alert">
                  <span>库存预警:</span>
                  <el-input placeholder="库存预警数量" class="ipt" v-model="xiyaoapply.stock_alert_count" ></el-input>
                  <el-select v-model="xiyaoapply.stock_alert_unit" placeholder="单位" :clearable="true" class="ipt">
                    <el-option v-if="xiyaoapply.bigunit1" :label="xiyaoapply.bigunit1" :value="xiyaoapply.bigunit1"></el-option>
                    <el-option v-if="xiyaoapply.smallunit1" :label="xiyaoapply.smallunit1" :value="xiyaoapply.smallunit1"></el-option>
                    <el-option v-if="xiyaoapply.smallunit2" :label="xiyaoapply.smallunit2" :value="xiyaoapply.smallunit2"></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 使用信息 -->
        <div class="med_use">
          <div class="main-block-title ">
            使用信息
          </div>
          <div class="main-block-down m_t20">
              <el-row class="stock1">
              <el-col :span="8">
                <div class="m_l29">
                  <span>用法:</span>
                  <el-select v-model="xiyaoapply.usage" placeholder="" :clearable="true" class="ipt">
                    <el-option v-for="(item, index) in options6" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="15">
                <div>
                  <span>单次用量:</span>
                  <el-input class="ipt w_80" v-model="xiyaoapply.use_times1" @keyup.native="limit('use_times1')"></el-input>
                  <span class="w_80">{{ xiyaoapply.smallunit2 }}/次</span>
                  <el-select v-model="xiyaoapply.use_times2" class="w_140" placeholder="" clearable>
                    <el-option v-for="(item, index) in options11" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <span class="m_l29">总量:</span>
                  <el-select v-model="xiyaoapply.use_days" class="w_80" placeholder="" :clearable="true">
                    <el-option v-for="(item, index) in options12" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <el-input class="ipt w_80" v-model="xiyaoapply.use_total" @keyup.native="limit('use_total')"></el-input>
                  <span>{{xiyaoapply.bigunit1}}</span>
                </div>
              </el-col>
              </el-row>
              <el-row class="stock2 m_t20">
              <el-col :span="8">
                  <div>
                    <span>药品说明:</span>
                    <el-input placeholder="" class="ipt" v-model="xiyaoapply.med_instruction"></el-input>
                  </div>
              </el-col>
              <el-col :span="15">
                  <div>
                    <span>药品功效:</span>
                    <el-input placeholder="" class="ipt2" v-model="xiyaoapply.med_efficacy"></el-input>
                  </div>
              </el-col>
              </el-row>
              <el-row class="stock2 m_t20">
              <el-col :span="24">
                  <div class="m_l29">
                    <span>备注:</span>
                    <el-input placeholder="" class="doc_ipt" v-model="xiyaoapply.remark"></el-input>
                  </div>
              </el-col>
              </el-row>
          </div>
        </div>
      </el-form>
    </div>

    <!-- 中草药 -->
    <div class="med_info" v-show="showzhongyao">
      <el-form :rules="rules2" ref="zhongyaoapply"  class="main_form" :model="zhongyaoapply">
        <!-- 基本信息 -->
        <div class="med_base">
          <div class="main-block-title ">
            基本信息
            <div class="addimport" v-if="act === '新增'">
              <a href="/static/中药批量导入.xlsx" class="download">下载模板</a>
              <el-upload
                class="upload-btn"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeFileUpload"
                :show-file-list='false'
              >
                <el-button class="up-btn" slot="trigger" size="small" type="primary">一键导入</el-button>
              </el-upload>
            </div>
          </div>
          <div class="main-block-content">
            <div class="warning">
              提示语：为方便您后续接入社保需求，与您诊所匹配的药品信息请您优先选择带有社保标识的药品。
            </div>
              <el-row class="base1 m_t20">
                <el-col :span="8">
                  <el-form-item prop="med_name_z" class="in_block" label="药品名称:" label-width="100px">
                    <!-- <el-input placeholder="" class="ipt" v-model="zhongyaoapply.med_name_z" :disabled="donot"></el-input> -->
                    <el-form-item prop="med_name" class="in_block">
                      <template solt-scope='scope'>
                        <el-autocomplete :disabled="donot" v-model="zhongyaoapply.med_name_z"
                        :fetch-suggestions="querySearchAsync" placeholder="药品名称" @select="handleSelect" :trigger-on-focus="false">
                          <template slot-scope="props">
                            <div class="thinkName">
                              {{ props.item.name }}  <span class="sebao" v-if="props.item.extra4 !== ''">社保</span>
                              <span class="spec">{{ props.item.extra1 }}</span>
                              <p class="factory">{{ props.item.extra2 }}</p>
                            </div>
                          </template>
                        </el-autocomplete>
                      </template>
                    </el-form-item>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="med_lname_z" class="in_block" label="药品别名:" label-width="100px">
                    <el-input placeholder="" class="ipt" v-model="zhongyaoapply.med_lname_z"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="factory_z" class="in_block" label-width="100px" label="生产厂家:">
                  <el-input placeholder="" class="ipt" v-model="zhongyaoapply.factory_z"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row class="base1 m_t20">
                <el-col :span="8">
                  <el-form-item prop="ake001_z" class="in_block" label='社保编码:' label-width="100px" 
                  :rules="[{ required: this.requiredFlag_z, message: '请输入社保编码', trigger: 'change' }]">
                    <el-input placeholder="" class="ipt" v-model="zhongyaoapply.ake001_z"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="standard_number_z" class="in_block" label="药品本位码:" label-width="100px"
                  :rules="[{ required: this.requiredFlag_z, message: '请输入药品本位码', trigger: 'change' }]">
                    <el-input placeholder="" class="ipt" v-model="zhongyaoapply.standard_number_z"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="med_dosage_z" class="in_block" label-width="100px" label="药品剂型:">
                  <el-select v-model="zhongyaoapply.med_dosage_z" placeholder="" class="ipt" :clearable="true">
                    <el-option v-for="(item, index) in options8" :key="index" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row class="base3 m_t20">
                <el-col :span="20">
                  <div>
                    <i class="require">*</i> 药品规格:(<span class="warning"> 例如:每【盒】有【20】【包】；每【包】有【20】【g】</span>)
                    <span class="addTag" @click='addSpec' v-if="!showSpec">
                      <i class="el-icon-circle-plus-outline"></i>
                      增加规格
                    </span>
                  </div>
                  <div class="m_t20 m_l29">
                    <!-- 第一个 -->
                    <div class="in_block">
                      <span>每</span>
                      <el-form-item prop="bigunit1" class="in_block">
                        <el-select v-model="zhongyaoapply.bigunit1" class="use_unit" placeholder=""  :disabled="donot">
                          <el-option v-for="(item, index) in XYbigunit" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <span>有</span>
                      <el-form-item prop="med_manyunit1" class="in_block">
                        <el-input class="use_unit" v-model="zhongyaoapply.med_manyunit1" @keyup.native="limit('med_manyunit1')" :disabled="donot"></el-input>
                      </el-form-item>
                      <el-form-item prop="smallunit1" class="in_block">
                        <el-select v-model="zhongyaoapply.smallunit1" class="use_unit" placeholder="" :disabled="donot">
                          <el-option v-for="(item, index) in options3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <!-- 第二个 -->
                    <div class="in_block" v-if="(donot && zhongyaoapply.smallunit2 !== '') || (!donot && showSpec)">
                      <span class="m_l50">每</span>
                      <el-form-item prop="smallunit1" class="in_block">
                        <el-select v-model="zhongyaoapply.smallunit1" class="use_unit" placeholder="" :disabled="donot">
                          <el-option v-for="(item, index) in options4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <span>有</span>
                      <el-form-item prop="med_manyunit2" class="in_block">
                        <el-input class="use_unit" v-model="zhongyaoapply.med_manyunit2" @keyup.native="limit('med_manyunit2')" :disabled="donot"></el-input>
                      </el-form-item>
                      <el-form-item prop="smallunit2" class="in_block">
                        <el-select v-model="zhongyaoapply.smallunit2" class="use_unit" placeholder="" :disabled="donot">
                          <el-option v-for="(item, index) in options5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <span class="delSpec" v-if="!donot"><i class="el-icon-delete pointer" @click="delSpec()">删除次级规格</i></span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <el-row class="base1 m_t20">
                <el-col :span="24">
                  <el-form-item class="in_block stock_alert" label='库存预警:' label-width="100px">
                    <el-input placeholder="库存预警数量" class="ipt" v-model="zhongyaoapply.stock_alert_count_z" ></el-input>
                    <el-select v-model="zhongyaoapply.stock_alert_unit_z" placeholder="单位" :clearable="true" class="ipt" style='width: 120px;'>
                      <el-option v-if="zhongyaoapply.bigunit1" :label="zhongyaoapply.bigunit1" :value="zhongyaoapply.bigunit1"></el-option>
                      <el-option v-if="zhongyaoapply.smallunit1" :label="zhongyaoapply.smallunit1" :value="zhongyaoapply.smallunit1"></el-option>
                      <el-option v-if="zhongyaoapply.smallunit2" :label="zhongyaoapply.smallunit2" :value="zhongyaoapply.smallunit2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              
          </div>
        </div>
        <!-- 使用信息 -->
        <div class="med_use">
          <div class="main-block-title ">
              使用信息
          </div>
          <div class="main-block-down m_t20">
            <el-row class="stock1">
              <el-col :span="8">
                  <div class="m_l29">
                    <span>用法:</span>
                    <el-select v-model="zhongyaoapply.usage_z" placeholder="用法" :clearable="true" class="ipt">
                      <el-option v-for="(item, index) in options6" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
              </el-col>
              <el-col :span="15">
                  <div>
                      <span>单次剂量:</span>
                      <el-input class="ipt w_80" v-model="zhongyaoapply.use_times1_z" @keyup.native="limit2('use_times1_z')"></el-input>
                      <span class="w_80">{{ zhongyaoapply.smallunit2 || 'g' }}</span>
                  </div>
              </el-col>
              </el-row>
              <el-row class="stock2 m_t20">
              <el-col :span="8">
                  <div>
                    <span>药品说明:</span>
                    <el-input placeholder="" class="ipt" v-model="zhongyaoapply.med_instruction_z"></el-input>
                  </div>
              </el-col>
              <el-col :span="15">
                  <div>
                    <span>药品功效:</span>
                    <el-input placeholder="" class="ipt2" v-model="zhongyaoapply.med_efficacy_z"></el-input>
                  </div>
              </el-col>
              </el-row>
              <el-row class="stock2 m_t20">
              <el-col :span="24">
                  <div class="m_l29">
                    <span>备注:</span>
                    <el-input placeholder="" class="doc_ipt" v-model="zhongyaoapply.remark_z"></el-input>
                  </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import XLSX from 'xlsx';
import { querySearchDrugKey, selectDrug, saveDrug } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import { floatLimit } from '@/utils/inputLimit';
import { AKA070 } from '@/common/js/dictionary';
import { transfer_to_three_stage } from '@/utils/specs';

export default{
  data() {
    return {
      loading: null,
      data: {
        act: '',
      },
      requiredFlag: false,
      requiredFlag_z: false,
      rules1: {
        med_name: [
          { required: true, message: '请输入药品名称', trigger: 'blur' },
        ],
        bigunit1: [
          { required: true, message: '请输入常用单位', trigger: 'change' },
        ],
        med_manyunit1: [
          { required: true, message: '请输入换算量', trigger: 'change' },
        ],
        smallunit1: [
          { required: true, message: '请输入最小单位', trigger: 'change' },
        ],
        med_manyunit2: [
          { required: true, message: '请输入剂量', trigger: 'change' },
        ],
        smallunit2: [
          { required: true, message: '请输入剂型单位', trigger: 'change' },
        ],
        // med_class: [
        //   { required: true, message: '请输入药品分类', trigger: 'change' },
        // ],
        aka074: [
          { required: true, message: '请输入规格', trigger: 'change' },
        ],
      },
      rules2: {
        med_name_z: [
          { required: true, message: '请输入药品名称', trigger: 'blur' },
        ],
        med_class_z: [
          { required: true, message: '请输入药品分类', trigger: 'change' },
        ],
      },
      options1: [
        { value: '饮片', label: '饮片' }, { value: '中成药', label: '中成药' }, { value: '西药', label: '西药' },
        { value: '化学制剂', label: '化学制剂' }, { value: '耗材', label: '耗材' },
        { value: '生物制剂', label: '生物制剂' }, { value: '其他', label: '其他' },
      ],
      ZYbigunit: [
        { value: 'kg', label: 'kg' }, { value: 'g', label: 'g' },
        { value: '盒', label: '盒' }, { value: '袋', label: '袋' }, { value: '包', label: '包' },
        { value: 'mg', label: 'mg' }, { value: 'ml', label: 'ml' },
        { value: '单位', label: '单位' }, { value: '瓶', label: '瓶' }, { value: '桶', label: '桶' },
        { value: '万单位', label: '万单位' }, { value: '把', label: '把' }, { value: '板', label: '板' },
        { value: '小包', label: '小包' }, { value: '小袋', label: '小袋' }, { value: '粒', label: '粒' },
        { value: '枚', label: '枚' }, { value: '片', label: '片' }, { value: '张', label: '张' },
        { value: '只', label: '只' }, { value: '支', label: '支' }, { value: '贴', label: '贴' },
        { value: '%', label: '%' }, { value: '罐', label: '罐' },
      ],
      XYbigunit: [
        { value: '盒', label: '盒' }, { value: '袋', label: '袋' }, { value: '包', label: '包' }, { value: 'ug', label: 'ug' },
        { value: 'mg', label: 'mg' }, { value: 'ml', label: 'ml' }, { value: 'kg', label: 'kg' }, { value: 'g', label: 'g' },
        { value: '单位', label: '单位' }, { value: '瓶', label: '瓶' }, { value: '桶', label: '桶' },
        { value: '万单位', label: '万单位' }, { value: '把', label: '把' }, { value: '板', label: '板' },
        { value: '小包', label: '小包' }, { value: '小袋', label: '小袋' }, { value: '粒', label: '粒' },
        { value: '枚', label: '枚' }, { value: '片', label: '片' }, { value: '张', label: '张' },
        { value: '只', label: '只' }, { value: '支', label: '支' }, { value: '贴', label: '贴' },
        { value: '%', label: '%' }, { value: '罐', label: '罐' },
      ],
      options3: [
        { value: 'g', label: 'g' }, { value: 'mg', label: 'mg' }, { value: 'ml', label: 'ml' }, { value: 'ug', label: 'ug' },
        { value: '板', label: '板' }, { value: '小包', label: '小包' }, { value: '小袋', label: '小袋' },
        { value: '粒', label: '粒' }, { value: '片', label: '片' }, { value: '枚', label: '枚' },
        { value: '张', label: '张' }, { value: '贴', label: '贴' }, { value: '支', label: '支' },
        { value: '只', label: '只' }, { value: '瓶', label: '瓶' }, { value: '包', label: '包' },
        { value: '袋', label: '袋' }, { value: '盒', label: '盒' }, { value: '桶', label: '桶' },
        { value: '单位', label: '单位' }, { value: '万单位', label: '万单位' }, { value: '把', label: '把' },
        { value: '%', label: '%' }, { value: '个', label: '个' },
      ],
      options4: [],

      options5: [
        { value: 'g', label: 'g' }, { value: 'mg', label: 'mg' }, { value: 'ml', label: 'ml' }, { value: 'ug', label: 'ug' },
        { value: '板', label: '板' }, { value: '小包', label: '小包' }, { value: '小袋', label: '小袋' },
        { value: '粒', label: '粒' }, { value: '片', label: '片' }, { value: '枚', label: '枚' },
        { value: '张', label: '张' }, { value: '贴', label: '贴' }, { value: '支', label: '支' },
        { value: '只', label: '只' }, { value: '瓶', label: '瓶' }, { value: '包', label: '包' },
        { value: '袋', label: '袋' }, { value: '盒', label: '盒' }, { value: '桶', label: '桶' },
        { value: '单位', label: '单位' }, { value: '万单位', label: '万单位' }, { value: '把', label: '把' },
        { value: '%', label: '%' }, { value: '个', label: '个' },
      ],
      // 用法
      options6: [
        { value: '冲服', label: '冲服' }, { value: '口服', label: '口服' }, { value: '外用', label: '外用' },
        { value: '雾化', label: '雾化' }, { value: '皮下注射', label: '皮下注射' }, { value: '肌肉注射', label: '肌肉注射' },
        { value: '静脉注射', label: '静脉注射' }, { value: '静脉滴注', label: '静脉滴注' }, { value: '穴位注射', label: '穴位注射' },
        { value: '肌肉注射皮试', label: '肌肉注射皮试' }, { value: '雾化皮试', label: '雾化皮试' }, { value: '静脉滴注皮试', label: '静脉滴注皮试' },
        { value: '局部封闭', label: '局部封闭' }, { value: '灌肠', label: '灌肠' }, { value: '左眼', label: '左眼' },
        { value: '右眼', label: '右眼' }, { value: '直接服用', label: '直接服用' }, { value: '温水服用', label: '温水服用' },
        { value: '泡水', label: '泡水' }, { value: '生吃', label: '生吃' }, { value: '外敷', label: '外敷' },
        { value: '煎服', label: '煎服' }, { value: '水煎服两次使用', label: '水煎服两次使用' }, { value: '碾碎分两次服用', label: '碾碎分两次服用' },
      ],
      options8: [], // 剂型单位(字典)
      options9: [{ value: 1, label: '处方药' }, { value: 0, label: '非处方药' }], // 用药类型

      options11: [
        { value: 1, label: '每日一次(qd)' }, { value: 2, label: '每日二次(bid)' }, { value: 3, label: '每日三次(tid)' },
        { value: 4, label: '每日四次(qid)' }, { value: 5, label: '隔日一次(qod)' }, { value: 6, label: '必要时(prn)' },
        { value: 7, label: '每周一次(qw)' }, { value: 8, label: '立即' },
      ],
      options12: [
        { value: 1, label: '1天' }, { value: 2, label: '2天' }, { value: 3, label: '3天' },
        { value: 4, label: '4天' }, { value: 5, label: '5天' }, { value: 6, label: '6天' },
        { value: 7, label: '7天' },
      ],
      options13: [],
      options14: [],
      showSpec: true, // 显示二级的药品规格
      // 中西药区分数据
      btnShowxiyao: true,  //  西药的标题按钮
      btnShowzhongyao: false,  //  中药的标题按钮
      showxiyao: true,  // 西药的页面
      showzhongyao: false,  // 中药的页面

      btnsavexi: true,  // 西药的保存按钮
      btnsavezhong: false,  //  中药的保存按钮
      drugtype: '0', // 区分西药0、中药1的字段
      mark_x: false, // 控制西药标题按钮的禁用
      mark_z: false, // 控制中药标题按钮的禁用
      donot: false, // 禁止编辑
      showbtntital: false, // 编辑时控制中西药标题的显示
      // 初始的药品社保编号
      ake001_z: '',
      ake001: '',
      // 药品数据
      xiyaoapply: {
        med_name: '',  // 药品名称.
        med_lname: '',  // 药品别名.
        med_titanic: '', // 批准文号.
        med_barcode: '',  // 药品条码
        bigunit1: '',  // 大单位.
        med_manyunit1: '', // 小单位数量.
        smallunit1: '',  // 小单位.
        med_manyunit2: '',  // 剂型单位数量.
        smallunit2: '',  // 剂型单位.
        med_class: '',  // 药品分类.
        med_dosage: '',  // 药品剂型.
        med_type: '',  // 用药类型.
        factory: '',   // 生产厂家.
        price_healthcard: '',  // 社保价格.
        usage: '',  // 用法.
        use_times1: '',  // 单次用量1.
        use_times2: '',  // 单次用量2.
        use_days: '',   // 总量天数.
        use_total: '',  // 总量.
        med_instruction: '',  // 药品说明.
        med_efficacy: '',  // 药品功效.
        remark: '',  // 备注.
        ake001: '',  // 社保编号
        aka074: '',  // 规格
        sebaoList: {}, // 社保参数对象
        standard_number: '', // 药品本位码
        commodity_code: '',
        szsbstatus: '',  // 社保备案状态
        stock_alert_count: '', // 库存预警的阈值，可选，默认为0
        stock_alert_unit: '', // 库存预警阈值的单位，只能从规格
      },
      zhongyaoapply: {
        med_name_z: '',
        med_lname_z: '',
        med_titanic_z: '',
        med_barcode_z: '',
        bigunit1_z: '',
        bigunit1: '',  // 大单位.
        med_manyunit1: '', // 小单位数量.
        smallunit1: '',  // 小单位.
        med_manyunit2: '',  // 剂型单位数量.
        smallunit2: '',  // 剂型单位.
        med_manyunit1_z: '',
        smallunit1_z: '',
        med_class_z: '',
        med_dosage_z: '',
        med_type_z: '',
        factory_z: '',
        price_healthcard_z: '',
        usage_z: '',
        use_times1_z: '',
        use_times2_z: '',
        use_days_z: '',
        use_total_z: '',
        med_instruction_z: '',
        med_efficacy_z: '',
        remark_z: '',
        ake001_z: '',  // 社保编号
        standard_number_z: '', // 药品本位码
        aka074_z: '', // 中药规格
        sebaoList_z: {},
        szsbstatus_z: '',  // 社保备案状态
        stock_alert_count_z: '', // 库存预警的阈值，可选，默认为0
        stock_alert_unit_z: '', // 库存预警阈值的单位，只能从规格
      },
      // 批量导入用的
      fileList: [],
      outputs: [],
      failList: [],
    };
  },
  methods: {
    //  西药的新增与编辑的保存
    save1(formName) {
      // 新增药品信息
      if (sessionStorage.getItem('med_key') === 'add') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.showSpec && (!this.xiyaoapply.smallunit2 || !this.xiyaoapply.med_manyunit2)) {
              // 新增情况下没有删除次级规格并且没有填写次级规格，手动校验确保没问题,不过一般都会触发自动校验
              this.$message({ showClose: true, duration: 1000, type: 'warning', message: '请填写药品规格-次级规格或将其删除' });
              return;
            }
            const specsTxt = (this.xiyaoapply.med_manyunit2 && this.xiyaoapply.smallunit2) ? `${this.xiyaoapply.med_manyunit2}${this.xiyaoapply.smallunit2}/${this.xiyaoapply.smallunit1} ${this.xiyaoapply.med_manyunit1}${this.xiyaoapply.smallunit1}/${this.xiyaoapply.bigunit1}` : `${this.xiyaoapply.med_manyunit1}${this.xiyaoapply.smallunit1}/${this.xiyaoapply.bigunit1}`;
            this.$http.post('/service/drug/infoadd', {
              head: {
                accessToken: this.token,
                lastnotice: 0,
              },
              body: {
                clinic_id: this.clinic,
                commodity_code: this.xiyaoapply.commodity_code, // 条码
                approval_number: this.xiyaoapply.med_titanic, // 批准文号
                product_name: this.xiyaoapply.med_name,   // 药物名称
                productalicas: this.xiyaoapply.med_lname,  // 药品别名
                specs: {
                  unit_large: {
                    specs_name: this.xiyaoapply.bigunit1,  // 大单位
                  },
                  unit_middle: {
                    specs_name: this.xiyaoapply.smallunit1,  // 小单位
                    specs_unit: Number(this.xiyaoapply.med_manyunit1),  // 小单位数量
                  },
                  unit_primary: {
                    specs_name: this.xiyaoapply.smallunit2,  // 剂型单位
                    specs_unit: Number(this.xiyaoapply.med_manyunit2), // 剂型数量
                  },
                },
                otc: Number(this.xiyaoapply.med_type),  // 用法类型
                dosage_type: this.xiyaoapply.med_dosage, // 药品剂型
                drugclass: this.xiyaoapply.med_class,  // 药品分类
                producer: this.xiyaoapply.factory,  // 生产厂家
                yongfa: this.xiyaoapply.usage,  // 用法
                shebao_price: Number(this.xiyaoapply.price_healthcard),  // 社保价格
                drugspectxt: this.xiyaoapply.med_instruction,  // 药品说明
                drugfunctxt: this.xiyaoapply.med_efficacy,  // 药品功效
                drugnotetxt: this.xiyaoapply.remark,  // 备注
                drugtype: this.drugtype,      // 区分中西药
                specs_txt: specsTxt,   // 药品规格
                use_enable: 1,
                useunit: {
                  specs_name: this.xiyaoapply.smallunit2, // 单次用量次数
                  specs_unit: Number(this.xiyaoapply.use_times1),  // 次数单位
                },
                usedaily_times: Number(this.xiyaoapply.use_times2),  // 用药频率
                usedall_days: Number(this.xiyaoapply.use_days),  // 天数
                useall: {
                  specs_name: this.xiyaoapply.bigunit1,    // 总量单位
                  specs_unit: Number(this.xiyaoapply.use_total), // 总量
                },
                ake001: this.xiyaoapply.ake001,
                aka074: this.xiyaoapply.aka074,
                standard_number: this.xiyaoapply.standard_number,
                stock_alert_count: this.xiyaoapply.stock_alert_count ? +this.xiyaoapply.stock_alert_count : 0,
                stock_alert_unit: this.xiyaoapply.stock_alert_unit ? this.xiyaoapply.stock_alert_unit : '',
                ...this.xiyaoapply.sebaoList,
              },
            }).then((res) => {
              if (res.data.errcode === 0) {
                sessionStorage.setItem('preAction', 'addxiyao');
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: '保存成功！',
                  type: 'success',
                });
                this.$router.back();
              } else if (res.data.errcode === 35) {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: '该药品已存在！',
                  type: 'warning',
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  type: 'error',
                  message: res.data.errmsg,
                });
              }
            }).catch(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存失败！',
                type: 'error',
              });
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '请填写未填写的信息',
              type: 'error',
            });
            return false;
          }
        });
      } else {
        // 社保的编号有变化,将备案状态改成0
        if (this.ake001 !== this.xiyaoapply.ake001) {
          this.xiyaoapply.szsbstatus = 0;
        }
        // 编辑更新药品信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const specsTxt = `${this.xiyaoapply.med_manyunit1}${this.xiyaoapply.smallunit1}/${this.xiyaoapply.bigunit1}${this.xiyaoapply.med_manyunit2}${this.xiyaoapply.smallunit2}/${this.xiyaoapply.smallunit1}`;
            this.$http.post('/service/drug/infoupdate', {
              head: {
                accessToken: this.token,
                lastnotice: 0,
              },
              body: {
                clinic_id: this.clinic,
                drug_key: sessionStorage.getItem('drug_key'),
                commodity_code: this.xiyaoapply.commodity_code, // 批准文号
                approval_number: this.xiyaoapply.med_titanic, // 批准文号
                product_name: this.xiyaoapply.med_name,   // 药物名称
                productalicas: this.xiyaoapply.med_lname,  // 药品别名
                specs: {
                  unit_large: {
                    specs_name: this.xiyaoapply.bigunit1,  // 大单位
                  },
                  unit_middle: {
                    specs_name: this.xiyaoapply.smallunit1,  // 小单位
                    specs_unit: Number(this.xiyaoapply.med_manyunit1),  // 小单位数量
                  },
                  unit_primary: {
                    specs_name: this.xiyaoapply.smallunit2,  // 剂型单位
                    specs_unit: Number(this.xiyaoapply.med_manyunit2), // 剂型数量
                  },
                },
                otc: Number(this.xiyaoapply.med_type),  // 用法类型
                dosage_type: this.xiyaoapply.med_dosage, // 药品剂型
                drugclass: this.xiyaoapply.med_class,  // 药品分类
                producer: this.xiyaoapply.factory,  // 生产厂家
                yongfa: this.xiyaoapply.usage,  // 用法
                shebao_price: Number(this.xiyaoapply.price_healthcard),  // 社保价格
                drugspectxt: this.xiyaoapply.med_instruction,  // 药品说明
                drugfunctxt: this.xiyaoapply.med_efficacy,  // 药品功效
                drugnotetxt: this.xiyaoapply.remark,  // 备注
                drugtype: this.drugtype,      // 区分中西药
                specs_txt: specsTxt,   // 药品规格
                useunit: {
                  specs_name: this.xiyaoapply.smallunit2, // 单次用量次数
                  specs_unit: Number(this.xiyaoapply.use_times1),  // 次数单位
                },
                usedaily_times: Number(this.xiyaoapply.use_times2),  // 用药频率
                usedall_days: Number(this.xiyaoapply.use_days),  // 天数
                useall: {
                  specs_name: this.xiyaoapply.bigunit1,    // 总量单位
                  specs_unit: Number(this.xiyaoapply.use_total), // 总量
                },
                stock_alert_count: this.xiyaoapply.stock_alert_count ? +this.xiyaoapply.stock_alert_count : 0,
                stock_alert_unit: this.xiyaoapply.stock_alert_unit ? this.xiyaoapply.stock_alert_unit : '',
                ...this.xiyaoapply.sebaoList,
                ake001: this.xiyaoapply.ake001,
                aka074: this.xiyaoapply.aka074,
                standard_number: this.xiyaoapply.standard_number,
              },
            }).then(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存成功！',
                type: 'success',
              });
              this.$router.back();
            }).catch(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存失败！',
                type: 'warning',
              });
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '请填写未填写的信息',
              type: 'error',
            });
            return false;
          }
        });
      }
    },
    // 中药的新增与编辑的保存
    save2(formName) {
      // 新增药品信息
      if (sessionStorage.getItem('med_key') === 'add') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // const specsTxt = `${this.zhongyaoapply.med_manyunit1_z}${this.zhongyaoapply.smallunit1_z}/${this.zhongyaoapply.bigunit1_z}`;
            const specsTxt = (this.zhongyaoapply.med_manyunit2 && this.zhongyaoapply.smallunit2) ? `${this.zhongyaoapply.med_manyunit2}${this.zhongyaoapply.smallunit2}/${this.zhongyaoapply.smallunit1} ${this.zhongyaoapply.med_manyunit1}${this.zhongyaoapply.smallunit1}/${this.zhongyaoapply.bigunit1}` : `${this.zhongyaoapply.med_manyunit1}${this.zhongyaoapply.smallunit1}/${this.zhongyaoapply.bigunit1}`;
            this.$http.post('/service/drug/infoadd', {
              head: {
                accessToken: this.token,
                lastnotice: 0,
              },
              body: {
                clinic_id: this.clinic,
                approval_number: this.zhongyaoapply.med_titanic_z, // 批准文号
                product_name: this.zhongyaoapply.med_name_z,   // 药物名称
                productalicas: this.zhongyaoapply.med_lname_z,  // 药品别名
                specs: {
                  unit_large: {
                    specs_name: this.zhongyaoapply.bigunit1,  // 大单位
                  },
                  unit_middle: {
                    specs_name: this.zhongyaoapply.smallunit1,  // 小单位
                    specs_unit: Number(this.zhongyaoapply.med_manyunit1),  // 小单位数量
                  },
                  unit_primary: {
                    specs_name: this.zhongyaoapply.smallunit2,  // 剂型单位
                    specs_unit: Number(this.zhongyaoapply.med_manyunit2), // 剂型数量
                  },
                },
                otc: Number(this.zhongyaoapply.med_type_z),  // 用法类型
                dosage_type: this.zhongyaoapply.med_dosage_z, // 药品剂型
                drugclass: this.zhongyaoapply.med_class_z,  // 药品分类
                producer: this.zhongyaoapply.factory_z,  // 生产厂家
                yongfa: this.zhongyaoapply.usage_z,  // 用法
                shebao_price: Number(this.zhongyaoapply.price_healthcard_z),  // 社保价格
                drugspectxt: this.zhongyaoapply.med_instruction_z,  // 药品说明
                drugfunctxt: this.zhongyaoapply.med_efficacy_z,  // 药品功效
                drugnotetxt: this.zhongyaoapply.remark_z,  // 备注
                drugtype: this.drugtype,      // 区分中西药
                specs_txt: specsTxt,   // 药品规格
                use_enable: 1,  // 禁用启用
                useunit: {
                  specs_name: this.zhongyaoapply.smallunit2, // 单次用量名字
                  specs_unit: Number(this.zhongyaoapply.use_times1_z),  // 次数单位
                },
                usedaily_times: Number(this.zhongyaoapply.use_times2_z),  // 用药频率
                usedall_days: Number(this.zhongyaoapply.use_days_z),  // 天数
                useall: {
                  specs_name: this.zhongyaoapply.smallunit1_z,    // 总量单位
                  specs_unit: Number(this.zhongyaoapply.use_total_z), // 总量
                },
                stock_alert_count: this.zhongyaoapply.stock_alert_count_z ? +this.zhongyaoapply.stock_alert_count_z : 0,
                stock_alert_unit: this.zhongyaoapply.stock_alert_unit_z ? this.zhongyaoapply.stock_alert_unit_z : '',
                ...this.zhongyaoapply.sebaoList_z,
                ake001: this.zhongyaoapply.ake001_z,
                aka074: specsTxt,
                standard_number: this.zhongyaoapply.standard_number_z,
              },
            }).then((res) => {
              if (res.data.errcode === 0) {
                sessionStorage.setItem('preAction', 'addzhongyao');
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: '保存成功！',
                  type: 'success',
                });
                this.$router.back();
              } else if (res.data.errmsg === '已存在') {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  message: '该药品已存在！',
                  type: 'warning',
                });
              } else {
                this.$message({
                  showClose: true,
                  duration: 1000,
                  type: 'error',
                  message: res.data.errmsg,
                });
              }
            }).catch(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存失败！',
                type: 'error',
              });
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '请填写未填写的信息',
              type: 'error',
            });
            return false;
          }
        });
      } else {
        // 判断社保的编号有没有变化
        if (this.ake001_z !== this.zhongyaoapply.ake001_z) {
          this.zhongyaoapply.szsbstatus_z = 0;
        }
        // 编辑更新药品信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // const specsTxt = `${this.zhongyaoapply.med_manyunit1_z}${this.zhongyaoapply.smallunit1_z}/${this.zhongyaoapply.bigunit1_z}`;
            const specsTxt = (this.zhongyaoapply.med_manyunit2 && this.zhongyaoapply.smallunit2) ? `${this.zhongyaoapply.med_manyunit2}${this.zhongyaoapply.smallunit2}/${this.zhongyaoapply.smallunit1} ${this.zhongyaoapply.med_manyunit1}${this.zhongyaoapply.smallunit1}/${this.zhongyaoapply.bigunit1}` : `${this.zhongyaoapply.med_manyunit1}${this.zhongyaoapply.smallunit1}/${this.zhongyaoapply.bigunit1}`;
            this.$http.post('/service/drug/infoupdate', {
              head: {
                accessToken: this.token,
                lastnotice: 0,
              },
              body: {
                clinic_id: this.clinic,
                drug_key: sessionStorage.getItem('drug_key'),
                approval_number: this.zhongyaoapply.med_titanic_z, // 批准文号
                product_name: this.zhongyaoapply.med_name_z,   // 药物名称
                productalicas: this.zhongyaoapply.med_lname_z,  // 药品别名
                specs: {
                  unit_large: {
                    specs_name: this.zhongyaoapply.bigunit1,  // 大单位
                  },
                  unit_middle: {
                    specs_name: this.zhongyaoapply.smallunit1,  // 小单位
                    specs_unit: Number(this.zhongyaoapply.med_manyunit1),  // 小单位数量
                  },
                  unit_primary: {
                    specs_name: this.zhongyaoapply.smallunit2,  // 剂型单位
                    specs_unit: Number(this.zhongyaoapply.med_manyunit2), // 剂型数量
                  },
                },
                otc: Number(this.zhongyaoapply.med_type_z),  // 用法类型
                dosage_type: this.zhongyaoapply.med_dosage_z, // 药品剂型
                drugclass: this.zhongyaoapply.med_class_z,  // 药品分类
                producer: this.zhongyaoapply.factory_z,  // 生产厂家
                yongfa: this.zhongyaoapply.usage_z,  // 用法
                shebao_price: Number(this.zhongyaoapply.price_healthcard_z),  // 社保价格
                drugspectxt: this.zhongyaoapply.med_instruction_z,  // 药品说明
                drugfunctxt: this.zhongyaoapply.med_efficacy_z,  // 药品功效
                drugnotetxt: this.zhongyaoapply.remark_z,  // 备注
                drugtype: this.drugtype,      // 区分中西药
                specs_txt: specsTxt,   // 药品规格
                // use_enable: 1,  // 禁用启用
                useunit: {
                  specs_name: this.zhongyaoapply.smallunit2, // 单次用量次数
                  specs_unit: Number(this.zhongyaoapply.use_times1_z),  // 次数单位
                },
                usedaily_times: Number(this.zhongyaoapply.use_times2_z),  // 用药频率
                usedall_days: Number(this.zhongyaoapply.use_days_z),  // 天数
                useall: {
                  specs_name: this.zhongyaoapply.smallunit1_z,    // 总量单位
                  specs_unit: Number(this.zhongyaoapply.use_total_z), // 总量
                },
                stock_alert_count: this.zhongyaoapply.stock_alert_count_z ? +this.zhongyaoapply.stock_alert_count_z : 0,
                stock_alert_unit: this.zhongyaoapply.stock_alert_unit_z ? this.zhongyaoapply.stock_alert_unit_z : '',
                ake001: this.zhongyaoapply.ake001_z,
                aka074: specsTxt,
                standard_number: this.zhongyaoapply.standard_number_z,
              },
            }).then(() => {
              this.$router.back();
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存成功！',
                type: 'success',
              });
            }).catch(() => {
              this.$message({
                showClose: true,
                duration: 1000,
                message: '保存失败！',
                type: 'warning',
              });
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '请填写未填写的信息',
              type: 'error',
            });
            return false;
          }
        });
      }
    },
    // 取消返回上一页
    close() {
      this.$confirm('确认取消操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    addSpec() {
      this.showSpec = true;
    },
    delSpec() {
      this.showSpec = false;
    },
    // 切换的西药
    btnShowOrHidexiyao() {
      this.showxiyao = true;
      this.showzhongyao = false;
      this.btnShowxiyao = true;
      this.btnShowzhongyao = false;
      this.btnsavexi = true;
      this.btnsavezhong = false;
      this.drugtype = '0';
    },
    // 切换的中药
    btnShowOrHidezhongyao() {
      this.showxiyao = false;
      this.showzhongyao = true;
      this.btnShowxiyao = false;
      this.btnShowzhongyao = true;
      this.btnsavexi = false;
      this.btnsavezhong = true;
      this.drugtype = '1';
    },
    // 只能输数字
    limit(str) {
      this.xiyaoapply[str] = floatLimit(this.xiyaoapply[str], 3);
    },
    limit2(str) {
      this.zhongyaoapply[str] = floatLimit(this.zhongyaoapply[str], 3);
    },
    // 单次用量和总量的数量为0时制空
    makeempty() {
      if (this.zhongyaoapply.use_times1_z === 0) {
        this.zhongyaoapply.use_times1_z = '';
      }
      if (this.xiyaoapply.use_times1 === 0) {
        this.xiyaoapply.use_times1 = '';
      }
      if (this.xiyaoapply.use_total === 0) {
        this.xiyaoapply.use_total = '';
      }
    },
    // 联想系统的药品
    querySearchAsync(queryString, cb) {
      httpServerNormal(querySearchDrugKey, {
        pageid: 0,
        pagesize: 100,
        drugname: queryString,
        drugtype: this.drugtype,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          if (!res || !res.SourceList) {  // 联想无则返回空
            cb([]);
          } else {
            for (let i = 0; i < res.IdList.length; i++) {
              res.SourceList[i].drug_searchkey = res.IdList[i];
            }
            cb(res.SourceList);
          }
        } else { // code错误需要进行的操作
          cb([]);
        }
      });
    },
    // 选择系统的药品
    handleSelect(item) {
      httpServerNormal(selectDrug, {
        drug_key: item.drug_searchkey,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const edit = res;
          if (edit.drugtype === '1') { // 选择的药品是中药
            this.btnShowOrHidezhongyao();
            this.zhongyaoapply.med_name_z = edit.product_name;
            this.zhongyaoapply.med_lname_z = edit.commodityname;
            this.zhongyaoapply.med_titanic_z = edit.approval_number;
            this.zhongyaoapply.bigunit1_z = edit.specs.unit_large.specs_name;
            this.zhongyaoapply.med_manyunit1_z = edit.specs.unit_primary.specs_unit;
            this.zhongyaoapply.smallunit1_z = edit.specs.unit_primary.specs_name;
            this.zhongyaoapply.med_class_z = edit.drugclass;
            this.zhongyaoapply.med_dosage_z = edit.dosage_type;
            this.zhongyaoapply.factory_z = edit.producer;
            this.zhongyaoapply.price_healthcard_z = edit.shebao_price;
            this.zhongyaoapply.usage_z = edit.yongfa;
            this.zhongyaoapply.use_times1_z = edit.useunit.specs_unit;
            this.zhongyaoapply.use_times2_z = edit.usedaily_times;
            this.zhongyaoapply.use_days_z = edit.usedall_days;
            this.zhongyaoapply.use_total_z = edit.useall.specs_unit;
            this.zhongyaoapply.med_instruction_z = edit.drugspectxt;
            this.zhongyaoapply.med_efficacy_z = edit.drugfunctxt;
            this.zhongyaoapply.remark_z = edit.drugnotetxt;
            this.zhongyaoapply.use_times2 = edit.usedaily_times;
            this.zhongyaoapply.med_type_z = edit.otc;
            this.zhongyaoapply.ake001_z = edit.ake001;
            this.zhongyaoapply.ake070_z = edit.ake070;
            this.zhongyaoapply.standard_number_z = edit.standard_number;
            this.standard_number_z = edit.standard_number;
            this.zhongyaoapply.sebaoList_z = {
              aae013: edit.aae013,
              aae030: edit.aae030,
              aae396: edit.aae396,
              aka022: edit.aka022,
              aka031: edit.aka031,
              aka036: edit.aka036,
              aka062: edit.aka062,
              aka065: edit.aka065,
              aka067: edit.aka067,
              aka068: edit.aka068,
              aka074: '1克/克',
              aka111: edit.aka111,
              akb020: edit.akb020,
              ake001: edit.ake001,
              ake003: edit.ake003,
              ala011: edit.ala011,
              ama011: edit.ama011,
              bka640: edit.bka640,
              bke111: edit.bke111,
              bkm032: edit.bkm032,
              bkm033: edit.bkm033,
              bkm034: edit.bkm034,
              bkm035: edit.bkm035,
              bkm036: edit.bkm036,
              bkm037: edit.bkm037,
              bkm038: edit.bkm038,
              bkm039: edit.bkm039,
              bkm040: edit.bkm040,
              bkm041: edit.bkm041,
              bkm042: edit.bkm042,
              bkm043: edit.bkm043,
              bkm044: edit.bkm044,
              bkm045: edit.bkm045,
              bkm046: edit.bkm046,
              bkm047: edit.bkm047,
              bkm048: edit.bkm048,
              bkm049: edit.bkm049,
              bkm054: edit.bkm054,
              bkm080: edit.bkm080,
              bkm081: edit.bkm081,
              bkm082: edit.bkm082,
              bkm083: edit.bkm083,
              bkm090: edit.bkm090,
              bkm095: edit.bkm095,
              bkm100: edit.bkm100,
              bkm101: edit.bkm101,
              bkm102: edit.bkm102,
              bla050: edit.bla050,
              bla051: edit.bla051,
              bla052: edit.bla052,
              bla053: edit.bla053,
              bla054: edit.bla054,
              bma030: edit.bma030,
              bma031: edit.bma031,
              cke900: edit.cke900,
              cke901: edit.cke901,
              cke902: edit.cke902,
              cke903: edit.cke903,
              cke904: edit.cke904,
              ckm097: edit.ckm097,
              ckm098: edit.ckm098,
              ckm099: edit.ckm099,
              ckm102: edit.ckm102,
              ckm104: edit.ckm104,
              ckm105: edit.ckm105,
              ckm106: edit.ckm106,
            };
            if (edit.ake001 && edit.ake001 !== '') {
              // this.requiredFlag_z = true;
            }
          } else { // 选择的药品是西药
            this.btnShowOrHidexiyao();
            this.xiyaoapply.med_name = edit.product_name;
            this.xiyaoapply.med_lname = edit.commodityname;
            this.xiyaoapply.med_titanic = edit.approval_number;
            this.xiyaoapply.bigunit1 = edit.specs.unit_large.specs_name;
            this.xiyaoapply.med_manyunit1 = edit.specs.unit_middle.specs_unit || '';
            this.xiyaoapply.smallunit1 = edit.specs.unit_middle.specs_name;
            this.xiyaoapply.smallunit2 = edit.specs.unit_primary.specs_name;
            this.xiyaoapply.med_manyunit2 = edit.specs.unit_primary.specs_unit || '';
            this.xiyaoapply.med_class = edit.drugclass;
            this.xiyaoapply.med_dosage = edit.dosage_type;
            this.xiyaoapply.factory = edit.producer;
            this.xiyaoapply.price_healthcard = edit.shebao_price;
            this.xiyaoapply.usage = edit.yongfa;
            this.xiyaoapply.use_times1 = edit.useunit.specs_unit;
            this.xiyaoapply.use_times2 = edit.usedaily_times;
            this.xiyaoapply.use_days = edit.usedall_days;
            this.xiyaoapply.use_total = edit.useall.specs_unit;
            this.xiyaoapply.med_instruction = edit.drugspectxt;
            this.xiyaoapply.med_efficacy = edit.drugfunctxt;
            this.xiyaoapply.remark = edit.drugnotetxt;
            this.xiyaoapply.use_times2 = edit.usedaily_times;
            this.xiyaoapply.med_type = edit.otc;
            this.xiyaoapply.ake001 = edit.ake001;
            this.xiyaoapply.aka074 = edit.aka074;
            this.xiyaoapply.ake070 = edit.ake070;
            this.xiyaoapply.standard_number = edit.standard_number;
            this.standard_number = edit.standard_number;
            this.xiyaoapply.sebaoList = {
              aka067: edit.aka067,
              aae030: edit.aae030,
              aae013: edit.aae013,
              aka111: edit.aka111,
              ake003: edit.ake003,
              bke111: edit.bke111,
              aka031: edit.aka031,
              ckm097: edit.ckm097,
              ckm098: edit.ckm098,
              aka036: edit.aka036,
              ckm099: edit.ckm099,
              bkm100: edit.bkm100,
              bkm101: edit.bkm101,
              bkm102: edit.bkm102,
              bka640: edit.bka640,
              aka065: edit.aka065,
              bkm032: edit.bkm032,
              aka022: edit.aka022,
              bkm033: edit.bkm033,
              bkm034: edit.bkm034,
              bkm035: edit.bkm035,
              bkm036: edit.bkm036,
              bkm037: edit.bkm037,
              bkm038: edit.bkm038,
              bkm039: edit.bkm039,
              bkm040: edit.bkm040,
              bkm041: edit.bkm041,
              bkm042: edit.bkm042,
              bkm043: edit.bkm043,
              bkm044: edit.bkm044,
              bkm045: edit.bkm045,
              bkm046: edit.bkm046,
              bkm047: edit.bkm047,
              bkm048: edit.bkm048,
              bkm049: edit.bkm049,
              ama011: edit.ama011,
              bma030: edit.bma030,
              bma031: edit.bma031,
              ala011: edit.ala011,
              bla050: edit.bla050,
              bla051: edit.bla051,
              bla052: edit.bla052,
              bla053: edit.bla053,
              bla054: edit.bla054,
              bkm054: edit.bkm054,
              akb020: edit.akb020,
              bkm090: edit.bkm090,
              ckm102: edit.ckm102,
              bkm095: edit.bkm095,
              aka068: edit.aka068,
              ckm104: edit.ckm104,
              ckm105: edit.ckm105,
              cke900: edit.cke900,
              cke901: edit.cke901,
              cke902: edit.cke902,
              cke903: edit.cke903,
              cke904: edit.cke904,
            };
            if (edit.ake001 && edit.ake001 !== '') {
              // this.requiredFlag = true;
            }
          }
          // this.makeempty();
        }
      });
    },
    close_loading() {
      if (this.loading) {
        this.loading.close();
      }
    },
    // 上传文件之前的钩子
    beforeFileUpload(file) {
      this.loading = this.$loading({ lock: true, text: '药品信息上传中', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
      const that = this;
      if (file.size <= 0) { // 如果没有文件名
        this.close_loading();
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
        this.close_loading();
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary',
          });
          const wsname = workbook.SheetNames[0]; // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
          that.outputs = []; // 清空接收数据
          const keys = ws.length ? Object.keys(ws[0]) : [];
          for (let i = 0; i < ws.length; i++) {
            const sheetData = {
              name: ws[i][keys[0]],
              shebao_price: ws[i][keys[1]] ? +ws[i][keys[1]] : 0,
              factory: ws[i][keys[2]],
              specs: ws[i][keys[3]].trim().replace(/\s+/g, ' '),
            };
            that.outputs.push(sheetData);
          }
          this.batchImport(this.outputs);
        } catch (e) {
          this.close_loading();
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    // 批量获取医保信息,然后添加
    batchImport(arr) {
      setTimeout(() => {
        this.close_loading();
      }, 5000);
      arr.forEach((e) => {
        httpServerNormal(querySearchDrugKey, {
          pageid: 0,
          pagesize: 100,
          drugname: e.name,
          drugtype: '1',
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            // 根据key获取信息成功的回调( 直接返回data)
            if (!res.SourceList) {  // 联想无则返回空
              this.failList.push(e.name);
            } else {
              for (let i = 0; i < res.SourceList.length; i++) {
                if (res.SourceList[i].extra4 !== '' && res.SourceList[i].name === e.name) {
                  res.SourceList[i].drug_searchkey = res.IdList[i];
                  httpServerNormal(selectDrug, {
                    drug_key: res.IdList[i],
                  }).then((drugRes) => {
                    if (!(typeof drugRes === 'string' && drugRes.includes('ERRORCODE'))) {
                      const shitsbcode = {
                        aae013: drugRes.aae013,
                        aae030: drugRes.aae030,
                        aae396: drugRes.aae396,
                        aka022: drugRes.aka022,
                        aka031: drugRes.aka031,
                        aka036: drugRes.aka036,
                        aka062: drugRes.aka062,
                        aka065: drugRes.aka065,
                        aka067: drugRes.aka067,
                        aka068: drugRes.aka068,
                        aka074: drugRes.aka074,
                        aka111: drugRes.aka111,
                        akb020: drugRes.akb020,
                        ake001: drugRes.ake001,
                        ake003: drugRes.ake003,
                        ala011: drugRes.ala011,
                        ama011: drugRes.ama011,
                        bka640: drugRes.bka640,
                        bke111: drugRes.bke111,
                        bkm032: drugRes.bkm032,
                        bkm033: drugRes.bkm033,
                        bkm034: drugRes.bkm034,
                        bkm035: drugRes.bkm035,
                        bkm036: drugRes.bkm036,
                        bkm037: drugRes.bkm037,
                        bkm038: drugRes.bkm038,
                        bkm039: drugRes.bkm039,
                        bkm040: drugRes.bkm040,
                        bkm041: drugRes.bkm041,
                        bkm042: drugRes.bkm042,
                        bkm043: drugRes.bkm043,
                        bkm044: drugRes.bkm044,
                        bkm045: drugRes.bkm045,
                        bkm046: drugRes.bkm046,
                        bkm047: drugRes.bkm047,
                        bkm048: drugRes.bkm048,
                        bkm049: drugRes.bkm049,
                        bkm054: drugRes.bkm054,
                        bkm080: drugRes.bkm080,
                        bkm081: drugRes.bkm081,
                        bkm082: drugRes.bkm082,
                        bkm083: drugRes.bkm083,
                        bkm090: drugRes.bkm090,
                        bkm095: drugRes.bkm095,
                        bkm100: drugRes.bkm100,
                        bkm101: drugRes.bkm101,
                        bkm102: drugRes.bkm102,
                        bla050: drugRes.bla050,
                        bla051: drugRes.bla051,
                        bla052: drugRes.bla052,
                        bla053: drugRes.bla053,
                        bla054: drugRes.bla054,
                        bma030: drugRes.bma030,
                        bma031: drugRes.bma031,
                        cke900: drugRes.cke900,
                        cke901: drugRes.cke901,
                        cke902: drugRes.cke902,
                        cke903: drugRes.cke903,
                        cke904: drugRes.cke904,
                        ckm097: drugRes.ckm097,
                        ckm098: drugRes.ckm098,
                        ckm099: drugRes.ckm099,
                        ckm102: drugRes.ckm102,
                        ckm104: drugRes.ckm104,
                        ckm105: drugRes.ckm105,
                        ckm106: drugRes.ckm106,
                      };
                      httpServerNormal(saveDrug, {
                        approval_number: drugRes.approval_number, // 批准文号
                        product_name: drugRes.product_name,   // 药物名称
                        productalicas: drugRes.commodityname,  // 药品别名
                        specs: transfer_to_three_stage(e.specs),
                        otc: Number(drugRes.otc),  // 用法类型
                        dosage_type: drugRes.dosage_type, // 药品剂型
                        drugclass: drugRes.drugclass,  // 药品分类
                        producer: e.factory || drugRes.producer,  // 生产厂家
                        yongfa: drugRes.yongfa,  // 用法
                        shebao_price: e.shebao_price ? parseFloat(parseFloat(e.shebao_price).toFixed(2)) : Number(drugRes.shebao_price),  // 社保价格
                        drugspectxt: drugRes.drugspectxt,  // 药品说明
                        drugfunctxt: drugRes.drugfunctxt,  // 药品功效
                        drugnotetxt: drugRes.drugnotetxt,  // 备注
                        drugtype: '1',      // 区分中西药
                        specs_txt: e.specs,   // 药品规格
                        use_enable: 1,  // 禁用启用
                        useunit: {
                          specs_name: drugRes.specs.unit_primary.specs_name, // 单次用量名字
                          specs_unit: Number(drugRes.useunit.specs_unit),  // 次数单位
                        },
                        usedaily_times: Number(drugRes.usedaily_times),  // 用药频率
                        usedall_days: Number(drugRes.usedall_days),  // 天数
                        useall: {
                          specs_name: drugRes.specs.unit_primary.specs_name,    // 总量单位
                          specs_unit: Number(drugRes.useall.specs_unit), // 总量
                        },
                        ...shitsbcode,
                        ake001: drugRes.ake001,
                        aka074: e.specs,
                        standard_number: drugRes.standard_number,
                      }).then((res) => {
                        if (typeof res === 'string' && res.includes('ERRORCODE')) {
                          this.failList.push(e.name);
                        }
                      });
                    }
                  });
                }
              }
            }
          } else { // 根据key获取药品信息失败
            this.failList.push(e.name);
          }
        });
      });
    },
  },
  created() {
    // title的改变
    this.act = sessionStorage.getItem('med_key');
    if (this.act === 'add') {
      this.act = '新增';
      this.donot = false;
      if (sessionStorage.getItem('preAction') === 'addzhongyao') {
        this.btnShowOrHidezhongyao();
      }
    }
    if (this.act === 'edit') {
      this.act = '编辑';
      this.donot = true;
    }
    // 获取剂型
    this.options8 = AKA070;
    // 编辑就请求数据
    if (sessionStorage.getItem('drug_key')) {
      const drugKey = sessionStorage.getItem('drug_key');
      this.$http.post('/service/drug/infoquerybykey', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic,
          drug_key: drugKey,
        },
      }).then((res) => {
        const edit = res.data.data;
        if (edit.drugtype === '1') {
          this.btnShowOrHidezhongyao();
          this.mark_x = true;
          this.mark_z = false;
          this.zhongyaoapply.med_name_z = edit.product_name;
          this.zhongyaoapply.med_lname_z = edit.productalicas;
          this.zhongyaoapply.med_titanic_z = edit.approval_number;
          this.zhongyaoapply.bigunit1_z = edit.specs.unit_large.specs_name;
          this.zhongyaoapply.med_manyunit1_z = edit.specs.unit_primary.specs_unit;
          this.zhongyaoapply.smallunit1_z = edit.specs.unit_primary.specs_name;

          this.zhongyaoapply.bigunit1 = edit.specs.unit_large.specs_name;
          this.zhongyaoapply.med_manyunit1 = edit.specs.unit_middle.specs_unit;
          this.zhongyaoapply.smallunit1 = edit.specs.unit_middle.specs_name;
          this.zhongyaoapply.med_manyunit2 = edit.specs.unit_primary.specs_unit;
          this.zhongyaoapply.smallunit2 = edit.specs.unit_primary.specs_name;

          this.zhongyaoapply.med_class_z = edit.drugclass;
          this.zhongyaoapply.med_dosage_z = edit.dosage_type;
          this.zhongyaoapply.factory_z = edit.producer;
          this.zhongyaoapply.price_healthcard_z = edit.shebao_price;
          this.zhongyaoapply.usage_z = edit.yongfa;
          this.zhongyaoapply.use_times1_z = edit.useunit.specs_unit;
          this.zhongyaoapply.use_times2_z = edit.usedaily_times;
          this.zhongyaoapply.use_days_z = edit.usedall_days;
          this.zhongyaoapply.use_total_z = edit.useall.specs_unit;
          this.zhongyaoapply.med_instruction_z = edit.drugspectxt;
          this.zhongyaoapply.med_efficacy_z = edit.drugfunctxt;
          this.zhongyaoapply.remark_z = edit.drugnotetxt;
          this.zhongyaoapply.use_times2 = edit.usedaily_times;
          this.zhongyaoapply.med_type_z = edit.otc;
          this.zhongyaoapply.standard_number_z = edit.standard_number;
          this.zhongyaoapply.ake001_z = edit.ake001;
          this.zhongyaoapply.szsbstatus_z = edit.szsbstatus;
          this.zhongyaoapply.stock_alert_count_z = edit.stock_alert_count;
          this.zhongyaoapply.stock_alert_unit_z = edit.stock_alert_unit;
        } else {
          this.mark_z = true;
          this.mark_x = false;
          this.xiyaoapply.commodity_code = edit.commodity_code;
          this.xiyaoapply.med_name = edit.product_name;
          this.xiyaoapply.med_lname = edit.productalicas;
          this.xiyaoapply.med_titanic = edit.approval_number;
          this.xiyaoapply.bigunit1 = edit.specs.unit_large.specs_name;
          this.xiyaoapply.med_manyunit1 = edit.specs.unit_middle.specs_unit;
          this.xiyaoapply.smallunit1 = edit.specs.unit_middle.specs_name;
          this.xiyaoapply.smallunit2 = edit.specs.unit_primary.specs_name;
          this.xiyaoapply.med_class = edit.drugclass;
          this.xiyaoapply.med_dosage = edit.dosage_type;
          this.xiyaoapply.factory = edit.producer;
          this.xiyaoapply.price_healthcard = edit.shebao_price;
          this.xiyaoapply.usage = edit.yongfa;
          this.xiyaoapply.use_times1 = edit.useunit.specs_unit;
          this.xiyaoapply.use_times2 = edit.usedaily_times;
          this.xiyaoapply.use_days = edit.usedall_days;
          this.xiyaoapply.use_total = edit.useall.specs_unit;
          this.xiyaoapply.med_instruction = edit.drugspectxt;
          this.xiyaoapply.med_efficacy = edit.drugfunctxt;
          this.xiyaoapply.remark = edit.drugnotetxt;
          this.xiyaoapply.med_manyunit2 = edit.specs.unit_primary.specs_unit;
          this.xiyaoapply.use_times2 = edit.usedaily_times;
          this.xiyaoapply.med_type = edit.otc;
          this.xiyaoapply.aka074 = edit.aka074;
          this.xiyaoapply.ake001 = edit.ake001;
          this.xiyaoapply.standard_number = edit.standard_number;
          this.xiyaoapply.szsbstatus = edit.szsbstatus;
          this.xiyaoapply.stock_alert_count = edit.stock_alert_count;
          this.xiyaoapply.stock_alert_unit = edit.stock_alert_unit;
        }
      }).catch(() => {
      });
    }
  },
  computed: {
    ...mapGetters(['token', 'user', 'clinic']),
    title() {
      return `${this.act}药品`;
    },
  },
  watch: {
    failList: {
      handler() {
        console.log('导入失败的药品有：', this.failList);
      },
      deep: true,
    },
  },
  beforeDestroy() {
    sessionStorage.removeItem('drug_key');
    sessionStorage.removeItem('med_key');
  },
};
</script>

<style scoped lang='scss'>
@import "~@scss";

.editmedicine{
  padding: 30px 40px;
}
.btn{
  width: 120px;
  height: 40px;
  border: 1px solid #c1c1c1;
  background-color: #fff;
  border-radius: 4px;
  outline: none;
  font-size: 15px;
  font-weight: 600;
}
.btn.active{
  background-color: #56BC94;
  color: #fff;
  font-size: 15px;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.m_t20{
  margin-top: 20px;
}
.m_l29{
  margin-left: 29px;
}
.m_l50{
  margin-left: 50px;
}
.header{
  height: 49px;
  color: #1a1a1a;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  min-width: 1100px;
}
.title{
  line-height: 6px;
  font-weight: 900;
}
.med_info{
  width: 100%;
  margin: 10px auto 0;
  overflow: auto;
  min-width: 1100px;
   .addTag, .delSpec{
    color: $mainColor;
    cursor: pointer;
  }
}
.main-block-title{
  padding-left: 2%;
  height: 49px;
  font-size: 14px;
  color: #383838;
  line-height: 49px;
  font-weight: bold;
  border-top: 1px solid #dfdfdf;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
    .addimport{
      width: 180px;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .download {
        width: 80px;
        height: 30px;
        line-height: 30px;
        background-color: $mainColor;
        border-radius: 2px;
        font-size: 12px;
        color: #fff;
        text-align: center;
      }
      .upload-btn{
        margin-right: 10px;
        .up-btn{
          height: 30px;
        }
      }
    }
}
.main-block-content{
  width: 100%;
  padding: 8px 0 32px 0;
}
.main-block-down{
  width: 100%;
  padding: 8px 0 0 0;
}
.lh45{
  line-height: 45px;
}
.ipt{
  display: inline-block;
  width: 250px;
}
.use_unit{
  width: 110px;
}
.doc_ipt{
  width: 1027px;
}
.type_btn{
  margin-left: 33%;
}
.in_block{
  display: inline-block;
}
.w_80{
  width: 80px;
}
.ipt2{
  width: 468px;
}
.w_140{
  width: 140px;
}
.thinkName {
  line-height: 26px;
  width: 400px;
  .spec{
    color: #999;
    font-size: 12px;
  }
  .factory {
    color: #999;
    line-height: 18px;
    height: 16px;
    font-size: 12px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
}
.warning, .require{
  color: red;
}
.el-autocomplete{
  width: 250px;
}
.m_l37{
  margin-left: 37px;
}
.sebao{
  display: inline-block;
  width: 30px;
  height: 20px;
  background-color: #56bc94;
  border: 1px solid #56bc94;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
}
.guige{
  width: 65px;
  display: inline-block;
  text-align: center;
}
.sb_code{
  width: 75.88px;
  display: inline-block;
  text-align: center;
}
.a {
  width: 50px;
}
.base3 .stock_alert{
  // background-color: #f00;
  .el-input{
    width: 40%;
  }
  .el-select{
    width: 22%;
  }
}
</style>
