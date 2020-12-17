<template>
  <div class="records">
    <div class="list_left">
      <div class="pages">
        <el-button type="primary" size="mini" @click="prevPage" :disabled="prevPageDisable">上一页</el-button>
        <el-button type="primary" size="mini" @click="nextPage" :disabled="nextPageDisable">下一页</el-button>
      </div>
      <ul class="list">
        <li class="item" v-for="(item, index) in visitList" :key="index" :class="{'active': regist_id === item.regist_id}" @click="switch_record(item.regist_id)">
          <h3 class="date">{{item.create_time | dateFilter}}</h3>
          <p class="type">
             <span v-show='item.diagn_type !== 0'>({{item.diagn_type | diagnTypeFilter}})</span>
             <span v-show='item.diagn_dept'>{{item.diagn_dept}} | </span>
             <span v-show='item.diagn_doctor'>{{item.diagn_doctor}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="detail_right">
      <RecordDetail v-if="!medical.medicaltype" :medical='medical' :chinaPrescriptions='chinaPrescriptions' :westPrescriptions='westPrescriptions' :waterPrescriptions='waterPrescriptions'
        :treamentList='treamentList' :materialList='materialList' :otherList='otherList'/>
      <RecordDentistryDetail v-else :medical='medical' :chinaPrescriptions='chinaPrescriptions' :westPrescriptions='westPrescriptions' :waterPrescriptions='waterPrescriptions'
        :treamentList='treamentList' :materialList='materialList' :otherList='otherList'/>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { diagnosisList, diagnosisInfo } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';
import RecordDetail from './child/RecordDetail';
import RecordDentistryDetail from './child/RecordDentistryDetail';

export default {
  components: { RecordDetail, RecordDentistryDetail },
  props: {
    customerID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeName: '1',
      visitList: [],
      medical: {},  // 当前记录的病历
      // 搜索条件
      condition: {
        date_from: new Date(2000, 1, 1).format('yyMMdd'),
        date_to: new Date().format('yyMMdd'),
        patient_id: this.customerID,
        page_index: 0,
        page_size: 5,
      },
      total: 0,
      // 当前展示项的挂号ID
      regist_id: '',
      // 默认的病历(若病历为空)
      defaultMedical: {
        complaint: '',
        cur_history: '',   // 现病史
        past_history: '',        // 既往史
        person_history: '',  // 个人史
        allergy_history: '',   // 过敏史
        family_history: '',    // 家族史
        menses_history: '',    // 月经史
        fertilit_history: '',    // 生育史
        other_history: '',  // 其他
        other_phy_exam: '',    // 其他体格检查
        jibingjson: [],
      },
      // 处方列表
      prescriptions: [],
      // 中药处方列表
      chinaPrescriptions: [],
      // 西药处方列表
      westPrescriptions: [],
      // 输液处方列表
      waterPrescriptions: [],
      // 收费项列表
      chargitems: [],
      materialList: [], // 耗材
      treamentList: [], // 诊疗项目
      otherList: [], // 其他收费项目列表
    };
  },
  methods: {
    // 切换就诊记录
    switch_record(id) {
      this.regist_id = id;
      this.getDiagnosisInfo();
    },
    // 下一页
    nextPage() {
      this.condition.page_index += 1;
      this.getRecoedsList();
    },
    // 上一页
    prevPage() {
      this.condition.page_index -= 1;
      this.getRecoedsList();
    },
    // 获取接诊记录列表
    getRecoedsList() {
      httpServerNormal(diagnosisList, {
        ...this.condition,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.visitList = res.items || [];
          this.total = res.total;
          if (this.visitList.length) {
            // 按日期排序
            this.visitList = this.visitList.sort((obj1, obj2) => {
              return obj2.create_time - obj1.create_time;
            });
            this.regist_id = this.visitList[0].regist_id;
            // 获取详情
            this.getDiagnosisInfo();
          } else {
            this.medical = this.defaultMedical;
          }
        }
      });
    },
    // 获取当次接诊详情
    getDiagnosisInfo() {
      httpServerNormal(diagnosisInfo, {
        regist_id: this.regist_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.medical = res.medical || this.defaultMedical;
          this.medical.jibingjson = res.medical.jibingjson ? JSON.parse(res.medical.jibingjson).map((v) => { return v.jbname ? v.jbname : v; }) : [];
          if (res.medical.medicaltype) {
            // 牙科病历
            if (this.medical.jibingjson && this.medical.jibingjson.length && !this.medical.jibingjson[0].pos) {
              this.medical.jibingjson = [{ desc: this.medical.jibingjson, pos: { left_top: [], right_top: [], left_bottom: [], right_bottom: [] } }];
            }
            try {
              this.medical.mainphyexam = JSON.parse(res.medical.mainphyexam);
            } catch (error) {
              this.medical.mainphyexam = [{ pos: { left_top: [], right_top: [], left_bottom: [], right_bottom: [] }, desc: this.medical.mainphyexam }];
            }

            try {
              this.medical.other_phy_exam = JSON.parse(res.medical.other_phy_exam);
            } catch (error) {
              this.medical.other_phy_exam = [{ pos: { left_top: [], right_top: [], left_bottom: [], right_bottom: [] }, desc: this.medical.other_phy_exam }];
            }
            this.medical.yayizhiliaojihua = res.medical.yayizhiliaojihua ? res.medical.yayizhiliaojihua.map(v => ({ desc: v.desc, pos: v.pos ? JSON.parse(v.pos) : { left_top: [], right_top: [], left_bottom: [], right_bottom: [] } })) : [];
            this.medical.yayichuli = res.medical.yayichuli ? res.medical.yayichuli.map(v => ({ desc: v.desc, pos: v.pos ? JSON.parse(v.pos) : { left_top: [], right_top: [], left_bottom: [], right_bottom: [] } })) : [];
          }
          this.prescriptions = res.prescriptions || [];
          this.chargitems = res.chargitems || [];
          // 处方分类
          this.prescriptionsClassify();
          // 收费项分类
          this.chargitemsClassify();
        }
      });
    },
    // 处方分类
    prescriptionsClassify() {
      this.chinaPrescriptions = this.prescriptions.filter((item) => {
        return item.prescript_type === 2;
      });
      this.westPrescriptions = this.prescriptions.filter((item) => {
        return item.prescript_type === 1;
      });
      this.waterPrescriptions = this.prescriptions.filter((item) => {
        return item.prescript_type === 3;
      });
    },
    // 收费项分类
    chargitemsClassify() {
      this.treamentList = this.chargitems.filter((item) => {
        return item.item_type === 3;
      });
      this.materialList = this.chargitems.filter((item) => {
        return item.item_type === 4;
      });
      this.otherList = this.chargitems.filter((item) => {
        return item.item_type === 6;
      });
    },
  },
  mounted() {
    this.current_visit = this.visitList[0];
  },
  computed: {
    ...mapGetters(['token', 'clinic']),
    nextPageDisable() {
      return this.condition.page_index >= Math.ceil(this.total / this.condition.page_size) - 1;
    },
    prevPageDisable() {
      return this.condition.page_index === 0;
    },
  },
  filters: {
    dateFilter(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2);
    },
    // 就诊类型
    diagnTypeFilter(type) {
      if (type === 1) {
        return '初诊';
      } else if (type === 2) {
        return '复诊';
      }
    },
  },
  created() {
    this.getRecoedsList();
  },
};
</script>

<style lang="scss" scoped>
.records{
  display: flex;
  padding: 20px 0;
  .list_left{
    flex: 0 0 220px;
    width: 220px;
    margin-right: 20px;
    .item{
      padding: 10px 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 10px;
      cursor: pointer;
      &:last-child{
        margin-bottom: 0;
      }
      &.active{
        border: 1px solid #56bc94;
        background: #f6f6f6;
      }
      .date, .type{
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
    .pages{
      padding: 10px 0;
      text-align: center;
    }
  }
  .detail_right{
    flex: 1 1 auto;
    padding: 5px;
    border: 1px solid #ccc;
    overflow-x: auto;
  }
}

</style>

