<template>
  <div class="detail">
    <h1 class="title">门诊病历</h1>
    <div class="content">
      <div class="detail">
        <p class="label">主诉： </p>
        <p class="value">{{medical.complaint}}</p>
      </div>
      <div class="detail">
        <p class="label">现病史：  </p>
        <p class="value">{{medical.cur_history}}</p>
      </div>
      <div class="detail">
        <p class="label">既往史：  </p>
        <p class="value">{{medical.past_history}}</p>
      </div>
      <div class="detail">
        <p class="label">个人史：  </p>
        <p class="value">{{medical.person_history}}</p>
      </div>
      <div class="detail">
        <p class="label">过敏史：  </p>
        <p class="value">{{medical.allergy_history}}</p>
      </div>
      <div class="detail">
        <p class="label">家族史：  </p>
        <p class="value">{{medical.family_history}}</p>
      </div>
      <div class="detail">
        <p class="label">月经史：  </p>
        <p class="value">{{medical.menses_history}}</p>
      </div>
      <div class="detail">
        <p class="label">生育史：  </p>
        <p class="value">{{medical.fertilit_history}}</p>
      </div>
      <div class="detail">
        <p class="label">其他：  </p>
        <p class="value">{{medical.other_history}}</p>
      </div>
      <div class="detail">
        <p class="label">生命体征：  </p>
        <p class="value">
          <span v-if="medical.temperature !== 0">体温：{{ medical.temperature }}°C &nbsp;</span>
          <span v-if="medical.systolic_pressure !== 0">血压：{{ medical.systolic_pressure }}/{{ medical.diastolic_pressure }}mmHg &nbsp;</span>
          <span v-if="medical.pulse !== 0">脉搏：{{ medical.pulse }}bpm &nbsp;</span>
          <span v-if="medical.breathing !== 0">呼吸：{{ medical.breathing }}次/分</span>
          <span v-if="medical.weight !== 0">体重：{{ medical.weight }}公斤</span>
        </p>
      </div>
      <div class="detail">
        <p class="label">体格检查：  </p>
        <p class="value">{{medical.mainphyexam}}</p>
      </div>
      <div class="detail">
        <p class="label">辅助检查：  </p>
        <p class="value">{{medical.other_phy_exam}}</p>
      </div>
      <div class="detail">
        <p class="label">初步诊断：  </p>
        <p class="value">
          <span v-for="(item, index) in medical.jibingjson" :key="index">{{typeof item === 'object' ? item.jbname : item}} </span>
        </p>
      </div>
      <div class="detail">
        <p class="label">治疗意见：  </p>
        <p class="value">{{medical.advice}}</p>
      </div>
      <div class="detail">
        <p class="label">处方:  </p>
        <p class="value">
          <el-tooltip placement="top" effect="light">
            <div slot="content" class='prescriptions_detail'>
              <ul class='westPrescriptions list' v-show='westPrescriptions.length'>
                <li v-for='(item, index) in westPrescriptions' :key='index'>
                  <h3 class='prescription_title'>西药处方{{ index + 1 }}</h3>
                  <p v-for='(drug, index2) in item.drug_list' :key='index2'>
                    <span>药名: {{drug.name}}&nbsp;&nbsp;</span>
                    <span>厂商: {{drug.producer}}&nbsp;&nbsp;</span>
                    <span>规格: {{drug.spec_text}}&nbsp;&nbsp;</span>
                    <span>用法: {{drug.use_method}}&nbsp;&nbsp;</span>
                    <span>单次剂量: {{drug.dosage}} {{drug.dose_unit}}&nbsp;&nbsp;</span>
                    <span>频次: {{drug.frequency}}&nbsp;&nbsp;</span>
                    <span>开药数量: {{drug.total}} {{drug.total_unit}}&nbsp;&nbsp;</span>
                  </p>
                </li>
              </ul>
              <ul class='chinaPrescriptions list' v-show='chinaPrescriptions.length'>
                <li v-for='(item, index) in chinaPrescriptions' :key='index'>
                  <h3 class='prescription_title'>中药处方{{ index + 1 }}</h3>
                  <p v-for='(drug, index2) in item.drug_list' :key='index2'>
                    <span>药名: {{drug.name}}&nbsp;&nbsp;</span>
                    <span>厂商: {{drug.producer}}&nbsp;&nbsp;</span>
                    <span>规格: {{drug.spec_text}}&nbsp;&nbsp;</span>
                    <span>用法: {{drug.use_method}}&nbsp;&nbsp;</span>
                    <span>单次剂量: {{drug.dosage}} {{drug.dose_unit}}&nbsp;&nbsp;</span>
                    <span>频次: {{drug.frequency}}&nbsp;&nbsp;</span>
                    <span>开药数量: {{drug.total}} {{drug.total_unit}}&nbsp;&nbsp;</span>
                  </p>
                </li>
              </ul>
              <ul class='waterPrescriptions list' v-show='waterPrescriptions.length'>
                <li v-for='(item, index) in waterPrescriptions' :key='index'>
                  <h3 class='prescription_title'>输液处方{{ index + 1 }}</h3>
                  <p v-for='(drug, index2) in item.drug_list' :key='index2'>
                    <span>药名: {{drug.name}}&nbsp;&nbsp;</span>
                    <span>厂商: {{drug.producer}}&nbsp;&nbsp;</span>
                    <span>规格: {{drug.spec_text}}&nbsp;&nbsp;</span>
                    <span>用法: {{drug.use_method}}&nbsp;&nbsp;</span>
                    <span>单次剂量: {{drug.dosage}} {{drug.dose_unit}}&nbsp;&nbsp;</span>
                    <span>频次: {{drug.frequency}}&nbsp;&nbsp;</span>
                    <span>开药数量: {{drug.total}} {{drug.total_unit}}&nbsp;&nbsp;</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class='tooltip_detail'>
              <span v-show='westPrescriptions.length'>西药处方 * {{westPrescriptions.length}}</span>
              <span v-show='chinaPrescriptions.length'>中药处方 * {{chinaPrescriptions.length}}</span>
              <span v-show='waterPrescriptions.length'>输液处方 * {{waterPrescriptions.length}}</span>
            </div>
          </el-tooltip>
        </p>
      </div>
      <div class="detail">
        <p class="label">诊疗项目： </p>
        <p class="value">
          <el-tooltip placement="top" effect="light">
            <div slot="content" class='chargeitem_detail'>
              <span v-for='(item, index) in treamentList' :key='index'>{{item.name}}*{{item.total}} &nbsp;&nbsp;</span>
            </div>
            <div class='tooltip_detail'>
              <span v-for='(item, index) in treamentList' :key='index'>{{item.name}}*{{item.total}} &nbsp;</span>
            </div>
          </el-tooltip>
        </p>
      </div>
      <div class="detail">
        <p class="label">耗材:  </p>
        <p class="value">
          <el-tooltip placement="top" effect="light">
            <div slot="content" class='chargeitem_detail'>
              <span v-for='(item, index) in materialList' :key='index'>{{item.name}}*{{item.total}} &nbsp;&nbsp;</span>
            </div>
            <div class='tooltip_detail'>
              <span v-for='(item, index) in materialList' :key='index'>{{item.name}}*{{item.total}} &nbsp;</span>
            </div>
          </el-tooltip>
        </p>
      </div>
      <div class="detail">
        <p class="label">其他：  </p>
        <p class="value">
          <el-tooltip placement="top" effect="light">
            <div slot="content" class='chargeitem_detail'>
              <span v-for='(item, index) in otherList' :key='index'>{{item.name}}*{{item.total}} &nbsp;&nbsp;</span>
            </div>
            <div class='tooltip_detail'>
              <span v-for='(item, index) in otherList' :key='index'>{{item.name}}*{{item.total}} &nbsp;</span>
            </div>
          </el-tooltip>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    medical: {
      type: Object,
    },
    chinaPrescriptions: {
      type: Array,
    },
    westPrescriptions: {
      type: Array,
    },
    waterPrescriptions: {
      type: Array,
    },
    treamentList: {
      type: Array,
    },
    materialList: {
      type: Array,
    },
    otherList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.detail{
  .title{
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    background: #ccc;
  }
  .content{
    .detail{
      display: flex;
      height: 30px;
      line-height: 30px;
      &:nth-of-type(2n){
        background: #f1f1f1;
      }
      .label{
        flex: 0 0 120px;
        width: 120px;
      }
      .value{
        flex: 1 1 auto;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .tooltip_detail{
          float: left;
        }
      }
    }
  }
}

.prescriptions_detail{
  .list li {
    .prescription_title{ line-height: 40px; }
    p { 
      padding-left: 5px;
      line-height: 30px;
      font-size: 14px;
     }
  }
}
</style>
