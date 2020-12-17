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
        <p class="label">过敏史：  </p>
        <p class="value">{{medical.allergy_history}}</p>
      </div>
      
      <div class="detail">
        <p class="label">体格检查：  </p>
        <div class="value">
          <div class="filed_item" v-for="(item, i) in medical.mainphyexam" :key="i" >
            <div class="position">
              <el-row class="line1">
                <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
              </el-row>
            </div>
            <span class="center" type="textarea">{{item.desc}}</span>
          </div>
        </div>
      </div>

      <div class="detail">
        <p class="label">辅助检查：  </p>
        <div class="value">
          <div class="filed_item" v-for="(item, i) in medical.other_phy_exam" :key="i" >
            <div class="position">
              <el-row class="line1">
                <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
              </el-row>
            </div>
            <span class="center" type="textarea">{{item.desc}}</span>
          </div>
        </div>
      </div>

      <div class="detail">
        <p class="label">初步诊断：  </p>
        <div class="value">
          <div class="filed_item" v-for="(item, i) in medical.jibingjson" :key="i" >
            <div class="position">
              <el-row class="line1">
                <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
              </el-row>
            </div>
            <span class="center" type="textarea">{{item.desc.join(', ')}}</span>
          </div>
        </div>
      </div>
      
      <div class="detail">
        <p class="label">牙医处理：  </p>
        <div class="value">
          <div class="filed_item" v-for="(item, i) in medical.yayichuli" :key="i" >
            <div class="position">
              <el-row class="line1">
                <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
              </el-row>
            </div>
            <span class="center" type="textarea">{{item.desc}}</span>
          </div>
        </div>
      </div>

      <div class="detail">
        <p class="label">牙医治疗计划：  </p>
        <div class="value">
          <div class="filed_item" v-for="(item, i) in medical.yayizhiliaojihua" :key="i" >
            <div class="position">
              <el-row class="line1">
                <el-col :span="12" class="line2">{{item.pos.left_top.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_top.join(' ')}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="line2">{{item.pos.left_bottom.join(' ')}}&nbsp;</el-col>
                <el-col :span="12">&nbsp;{{item.pos.right_bottom.join(' ')}}</el-col>
              </el-row>
            </div>
            <span class="center" type="textarea">{{item.desc}}</span>
          </div>
        </div>
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
@import "~@scss";

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
      min-height: 30px;
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
        .filed_item{
          margin-bottom: 12px;
          padding: 12px;
          display: flex;
          align-items: center;
          border: 1px solid transparent;
          cursor: pointer;
          &:hover{
            border: 1px solid $mainColor;
          }
          .position{
            flex: 0 0 240px;
            height: 48px;
            cursor: pointer;
            .el-row{
              height: 24px;
              box-sizing: border-box;
              .el-col{
                height: 100%;
              }
            }
            .line1{
              border-bottom: 1px solid $mainColor;
            }
            .line2{
              border-right: 1px solid $mainColor;
              text-align: right;
            }
          }
          .center{
            flex: 1 1 auto;
            margin: 0 24px;
          }
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
