<template>
  <div class='style'>
    <!--查询  -->
    <div class="my_titleInpStyle timeSelect">
      <DateRangePicker :value='searchDate.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
      
      <span @click="changeTime(30)">最近一月</span>
      <span @click="changeTime(91)">最近三月</span>
      <span @click="changeTime(183)">最近半年</span>
      <span @click="changeTime(364)">最近一年</span>
    </div>
    <el-tabs type="card" v-model="selectName">
      <el-tab-pane label="图表" name="1">
        <div>
          <div class="title" >
            <h3>财务概况：</h3>
            <div class="titleContent">
              <div class="generalize">
                <p>
                  实际收入
                  <br>
                  <span>
                    {{ echartsArr.sum_real_price | PriceFilter }} 元
                  </span>
                </p>
                <p>
                  总应收
                  <br>
                  <span>
                    {{ echartsArr.sum_total_price | PriceFilter }} 元
                  </span>
                </p>
                <p>
                  总减免
                  <br>
                  <span>
                    {{ echartsArr.sum_reduce_price | PriceFilter }} 元
                  </span>
                </p>
                <p>
                  总退费
                  <br>
                  <span>
                    {{ echartsArr.sum_refund | PriceFilter }} 元
                  </span>
                </p>
              </div>
              <div class="payMethod">
                <p>
                  社保： 
                  <strong>{{ echartsArr.sum_shebao | PriceFilter }} 元</strong>
                </p>
                <p>
                  现金：
                  <strong>{{ echartsArr.sum_cash | PriceFilter }} 元</strong>
                </p>
                <p>
                  银行卡：
                  <strong>{{ echartsArr.sum_card | PriceFilter }} 元</strong>
                </p>
                <p>
                  微信支付：
                  <strong>{{ echartsArr.sum_wechat | PriceFilter }} 元</strong>
                </p>
                <p>
                  支付宝支付：
                  <strong>{{ echartsArr.sum_alipay | PriceFilter }} 元</strong>
                </p>
              </div>
            </div>
          </div>
          <div class="canvas">
            <div id="main2" ref="chartOne"></div>
            <div id="main3"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="详情" name="2">
        <div class="content">
          <div class="regTitle my_titleInpStyle">
          <!-- <el-date-picker v-model="searchDate.dateVal" size="small" unlink-panels :editable="false" :clearable="false" type="daterange" :picker-options="pickerOptions"></el-date-picker> -->
            <span>收费类型：</span>
            <el-select v-model="searchDate.charge_type" size="small">
              <el-option :label="item.name" :value="item.value" v-for="item in payItem" :key="item.value"></el-option>
            </el-select>
            <span>收费情况：</span>
            <el-select v-model="searchDate.data_type" size="small">
              <el-option label="已收费" :value="1"></el-option>
              <el-option label="已退费" :value="2"></el-option>
            </el-select>
          </div>
          <div class="table" v-if="searchDate.data_type === 1">
            <el-table :data="chargeTable" ref="multipleTable" size="medium" stripe align="center" class="white_nowrap_column">
              <el-table-column label="序号" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                    {{ props.row.index }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="收费时间" align='center' min-width="130">
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                    {{ props.row.create_time }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="收费类型" align='center'>
                <template slot-scope="props">
                  <el-tooltip placement="top" effect="light">
                    <span :class="{'totalPrice': props.row.index === '合计' }">
                      {{ props.row.charge_type | chargeFilter }}
                    </span>
                    <div slot="content">
                      <p v-for="(item, index) in props.row.tips" :key="index">
                        {{ item.chargetype | chargeFilter }}
                      </p>
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="收费单号" align='center' min-width="100">
                <template slot-scope="props">
                  <span>
                  {{ props.row.item_id | undefineFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="patient_name" label="客户姓名" align='center'>
              </el-table-column>
              <el-table-column label="性别" align='center'>
                <template slot-scope="props">
                  <span> {{ props.row.patient_gender | SexState }} </span>
                </template>
              </el-table-column>
              <el-table-column label="手机号" align='center' min-width="150">
                <template slot-scope="props">
                  <span> {{ props.row.patient_phone | undefineFilter}} </span>
                </template>
              </el-table-column>
              <el-table-column label="就诊科室" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.diagn_dept | undefineFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="就诊医生" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                    {{ props.row.diagn_doctor | undefineFilter }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="应收金额" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.total_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="实收金额" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.real_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="减免金额" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.reduce_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="社保" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.sum_shebao | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="现金" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.cash_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="银行卡" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.bank_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="微信支付" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.wx_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="支付宝支付" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.zfb_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table" v-if="searchDate.data_type === 2">
            <el-table :data="chargeTable" ref="multipleTable" size="medium" stripe align="center" class="white_nowrap_column">
              <el-table-column label="序号" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                    {{ props.row.index }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="收费时间" align='center' min-width="130">
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                    {{ props.row.create_time }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="收费类型" align='center'>
                <template slot-scope="props">
                  <el-tooltip placement="top" effect="light">
                    <span :class="{'totalPrice': props.row.index === '合计' }">
                      {{ props.row.charge_type | chargeFilter }}
                    </span>
                    <div slot="content">
                      <p v-for="(item, index) in props.row.tips" :key="index">
                        {{ item.chargetype | chargeFilter }}
                      </p>
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="收费单号" align='center' min-width="100">
                <template slot-scope="props">
                  <span>
                  {{ props.row.item_id | undefineFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="patient_name" label="客户姓名" align='center'>
              </el-table-column>
              <el-table-column label="性别" align='center'>
                <template slot-scope="props">
                  <span> {{ props.row.patient_gender | SexState }} </span>
                </template>
              </el-table-column>
              <el-table-column label="手机号" align='center' min-width="150">
                <template slot-scope="props">
                  <span> {{ props.row.patient_phone | undefineFilter}} </span>
                </template>
              </el-table-column>
              <el-table-column label="就诊科室" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.diagn_dept | undefineFilter}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="就诊医生" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                    {{ props.row.diagn_doctor | undefineFilter }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="退费金额" align='center'>
                <template slot-scope="props">
                  <span :class="{'totalPrice': props.row.index === '合计' }">
                  {{ props.row.total_price | PriceFilter}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="pagination" v-show="selectName == '2'">
      <el-pagination @current-change="handleCurrentChange" :current-page="pageindex" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DateRangePicker from '@/components/DateRangePicker';

const echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');

export default {
  components: { DateRangePicker },
  data() {
    return {
      value: 3,
      selectName: '1',
      clinic_name: '',   // 诊所名
      chargeTable: [],  // 收费数据
      echartsArr: {},   // 图标数据
      searchDate: {
        dateVal: [new Date(new Date() - (1000 * 60 * 60 * 24 * 30)), new Date()],   // 日期
        charge_type: 0,   // 收费类型
        data_type: 1,   // 收费退费
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      payItem: [
        {
          value: 0,
          name: '全部',
        },
        {
          value: 7,
          name: '诊金',
        },
        {
          value: 2,
          name: '处方',
        },
        {
          value: 3,
          name: '诊疗项目',
        },
        {
          value: 4,
          name: '耗材',
        },
        {
          value: 5,
          name: '门诊购药',
        },
        {
          value: 6,
          name: '其他',
        },
      ],
      pageindex: 1,  // 当前页数
      page_size: 10,
      totalCount: 0,    // 总页数
      Interval: null,  // 计时器名字
    };
  },
  methods: {
    handleCurrentChange(val) {  // 切换页数
      this.pageindex = val;
      this.getList();
    },
    changeTime(time) {
      this.$set(this.searchDate.dateVal, 0, new Date(new Date() - (1000 * 60 * 60 * 24 * time)));
    },
    makeDateTimeString(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2);
    },
    getClinicName() {  // 获取诊所名
      this.$http.post('/service/public/clinic_name', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.clinic_name = res.data.data.clinic_name;
        } else {
          this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
        }
      });
    },
    getList() {
      this.$http.post('/service/stats/charges2', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          charge_type: this.searchDate.charge_type,
          date_from: this.searchDate.dateVal[0].format('yyMMdd'),
          date_to: this.searchDate.dateVal[1].format('yyMMdd'),
          page_index: this.pageindex,
          page_size: this.page_size,
          data_type: this.searchDate.data_type,
        },
      }).then((respse) => {
        const res = respse.data;
        // if (res.errcode === 0 && res.data.clinic_id === this.clinic) {
        if (res.errcode === 0) {
          const data = res.data.items || [];
          // console.log(res);
          this.chargeTable = data.map((val) => {
            val.create_time = this.makeDateTimeString(val.create_time);
            return val;
          });
          // const sum = 0;
          // if (this.searchDate.data_type === 1) {
          //   res.data.sum_typed_total_price.forEach((val) => {
          //     sum += val;
          //   });
          // } else if (this.searchDate.data_type === 2) {
          //   res.data.sum_typed_refund.forEach((val) => {
          //     sum += val;
          //   });
          // }
          const obj = {
            index: '合计',
            create_time: `${this.searchDate.dateVal[0].getFullYear()}-${this.searchDate.dateVal[0].getMonth() + 1}-${this.searchDate.dateVal[0].getDate()} 至
            ${this.searchDate.dateVal[1].getFullYear()}-${this.searchDate.dateVal[1].getMonth() + 1}-${this.searchDate.dateVal[1].getDate()}`,
            charge_type: 99,
            item_id: '',
            patient_name: '-',
            patient_gender: '',
            patient_phone: '',
            diagn_dept: '所有科室',
            diagn_doctor: '所有医生',
            total_price: res.data.sum_total_price,
            real_price: res.data.sum_real_price,
            // real_price: res.data.sum_total_price - res.data.sum_reduce_price,
            reduce_price: res.data.sum_reduce_price,
            cash_price: res.data.sum_cash,
            bank_price: res.data.sum_card,
            wx_price: res.data.sum_wechat,
            zfb_price: res.data.sum_alipay,
            sum_shebao: res.data.sum_shebao,
          };
          this.chargeTable.forEach((val, index) => {
            val.index = index + 1;
            val.cash_price = 0;
            val.wx_price = 0;
            val.zfb_price = 0;
            val.bank_price = 0;
            val.sum_shebao = 0;
            switch (val.pay_method) {
              case 1:
                val.cash_price = val.real_price;
                break;
              case 2:
                val.bank_price = val.real_price;
                break;
              case 3:
                val.wx_price = val.real_price;
                break;
              case 4:
                val.zfb_price = val.real_price;
                break;
              case 5:
                val.sum_shebao = val.real_price;
                break;
              default:
                break;
            }
            if (val.data.length === 1) {
              val.charge_type = val.data[0].chargetype;
            }
            val.tips = val.data;
          });
          this.chargeTable.unshift(obj);
          this.totalCount = res.data.total;
        } else {
          this.chargeTable = [];
          if (res.errcode !== 0) {
            this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
          }
        }
      }).catch();
    },
    getCharts() {
      this.$http.post('/service/stats/charges', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          charge_type: this.searchDate.charge_type,
          date_from: this.searchDate.dateVal[0].format('yyMMdd'),
          date_to: this.searchDate.dateVal[1].format('yyMMdd'),
          data_type: 0,
        },
      }).then((respse) => {
        const pieArr = [];
        const res = respse.data.data;
        const arrString = ['挂号费', '处方费', '诊疗项目', '耗材', '门诊购药', '其它', '诊金'];
        for (let i = 0; i < res.sum_typed_refund.length; i++) {
          res.sum_typed_total_price[i] = Number(res.sum_typed_total_price[i].toFixed(2));
          res.sum_typed_refund[i] = Number(res.sum_typed_refund[i].toFixed(2));
          res.sum_typed_refund[i] *= -1;
          const pieArrVal = (res.sum_typed_total_price[i] + res.sum_typed_refund[i]).toFixed(2);
          pieArr.push({
            value: pieArrVal,
            name: arrString[i],
          });
          if (res.sum_typed_refund[i] === 0) {
            res.sum_typed_refund[i] = '';
          }
        }
        res.pieArr = pieArr;
        this.echartsArr = res;
        this.echartsArr.sum_real_price = this.echartsArr.sum_total_price - this.echartsArr.sum_reduce_price - this.echartsArr.sum_refund;
        this.drawBar2('main2');
        this.drawPie('main3');
      }).catch();
    },
    drawPie(id) {  // 饼状图
      const chartOne = echarts.init(document.getElementById(id));
      const arrData = this.echartsArr.pieArr;
      arrData.splice(0, 1);  // 删掉挂号费
      const arrString = ['处方费', '诊疗项目', '耗材', '门诊购药', '其它', '诊金'];
      const option = {
        title: {
          text: this.clinic_name,
          subtext: '实际收入占比',
          x: 'center',
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',          // 主标题文字颜色
          },
          subtextStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}元 ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: arrString,
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: arrData,
            stillShowZeroSum: false,
            label: {
              normal: {
                formatter: '{b}: {c}元 ({d}%)',
                textStyle: {
                  // fontWeight: 'bold',
                  fontSize: 14,
                },
                subtextStyle: {
                  color: 'red',  // 副标题文字颜色
                  fontSize: 14,
                },
              },
            },
            labelLine: {
              show: true,
            },
          },
        ],
        // color: ['rgba(254, 67, 101, .9)', 'rgba(61, 119, 185, .8)', 'rgba(249,205,173,.8)', 'rgba(200,200,250.8)', 'rgba(131,175,125,.8)', 'rgba(78,29,76.8)'],
        // color: ['rgba(254, 67, 101, .8)', 'rgba(61, 119, 185, .8)', '#ff7f50', '#32cd32', '#b8860b', '#00fa9a'],'rgba(61, 119, 185, .8)', 'rgba(254, 67, 101, .9)'
        // color: ['#ffd700', 'rgba(254, 67, 101, .9)', '#6699FF', 'rgba(61, 119, 185, .8)', '#b8860b', '#30e0e0'],
      };
      chartOne.setOption(option);
    },
    drawBar2(id) {  // 柱状图
      const myChart = echarts.init(document.getElementById(id));
      const xAxisData = ['处方费', '诊疗项目', '耗材', '门诊购药', '其它', '诊金'];
      const data1 = this.echartsArr.sum_typed_total_price;
      const data2 = this.echartsArr.sum_typed_refund;
      data1.splice(0, 1);  // 删掉挂号费
      data2.splice(0, 1);  // 删掉挂号费
      const option = {
        title: {
          text: this.clinic_name,
          subtext: '收/退费分析',
          x: 'center',
          fontSize: '22px',
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',          // 主标题文字颜色
          },
          subtextStyle: {
            fontSize: 15,
          },
        },
        legend: {
          data: ['收费金额', '退费金额'],
          align: 'left',
          left: 10,
        },
        brush: {
          toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
          xAxisIndex: 0,
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['stack', 'tiled'],
            },
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          name: '项目',
        },
        yAxis: {
          name: '金额（元）',
          // inverse: false,
        },
        grid: {
          left: 50,
        },
        series: [
          {
            name: '收费金额',
            type: 'bar',
            stack: 'one',
            stillShowZeroSum: false,
            itemStyle: {
              emphasis: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)',
              },
              normal: {
                label: {
                  show: true, // 显示数字
                  color: 'grey',
                  position: 'top',  // 位置
                  // fontWeight: 'bold',
                  fontSize: 14,
                },
              },
            },
            data: data1,
          },
          {
            name: '退费金额',
            type: 'bar',
            stack: 'one',
            itemStyle: {
              emphasis: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)',
              },
              normal: {
                label: {
                  show: true, // 显示数字
                  color: 'grey',
                  position: 'bottom',  // 位置
                  // fontWeight: 'bold',
                  fontSize: 14,
                },
              },
            },
            data: data2,
          },
        ],
        color: ['rgba(61, 119, 185, .8)', 'rgba(254, 67, 101, .9)'],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.getClinicName();
    this.getCharts();
    this.getList();
    // this.$nextTick(() => {
    //   this.drawBar2('main2');
    //   this.drawPie('main3');
    // });
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  beforeDestroy() {
    // this.chart.clear();
    // clearInterval(this.Interval);
  },
  watch: {
    searchDate: {
      handler() {
        this.pageindex = 1;
        this.getList();
        this.getCharts();
      },
      deep: true,
    },
    selectName(newValue) {
      console.log(newValue);
    },
  },
  filters: {
    chargeFilter(id) {
      switch (id) {
        case 1:
          return '挂号费';
        case 2:
          return '处方费';
        case 3:
          return '诊疗项目费';
        case 4:
          return '耗材费';
        case 5:
          return '门诊售药费';
        case 6:
          return '其他费';
        case 99:
          return '合计';
        default:
          return '多项收费';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.style{
  position: relative;
  box-sizing: border-box;
  min-width: 1200px;
}
.regTitle {
    line-height: 40px;
    min-height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    min-width: 1100px;
    .el-input,
    .el-select {
      width: 150px;
      margin-right: 10px;
    }
}
.table{
  .el-table {
    min-width: 1500px;
  }
  .totalPrice {
    font-size: 14px;
    font-weight: 600;
  }
  .operation{
    cursor: pointer;
    color: $mainColor;
    margin-left: 10px;
  }
}
.pagination{
    @include pagination_to_bottom;
}
.timeSelect {
  margin-bottom: 10px;
  span {
    cursor: pointer;
    margin-right: 10px;
    color: $mainColor;
    &:hover{
      border-bottom: 1px solid $mainColor;
    }
  }
}
.title {
  padding: 0 10px;
  // height: 200px;
  display: flex;
  border-bottom:  1px solid #ccc;
  h3 {
    font-size: 24px;
    line-height: 200px;
    margin-right: 20px;
  }
  .titleContent {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .generalize { // 概括
    display: flex;
    height: 100px;
    padding-bottom: 20px;
    p {
      padding-top: 20px;
      flex: 1;
      text-align: center;
      font-size: 16px;
      span {
        font-size: 30px;
        color: red;
      }
      &:nth-of-type(2) {
        border-left: 1px dashed #ccc;
        span{
          color: #000;
        }
      }
    }
  }
  .payMethod {
    display: flex;
    flex: 1;
    border-top: 1px dashed #ccc;
    text-align: center;
     p {
      line-height: 70px;
      font-size: 16px;
      flex: 1;
      strong {
        font-size: 20px;
       }
     }
  }
}
.canvas {
  display: flex;
  height: 500px;
  padding-top: 20px;
}
#main2 {
  /*需要制定具体高度，以px为单位*/
  flex: 4;
  canvas{
    width: 100%;
  }
}

#main3 {
  flex: 3;
  canvas{
    width: 100%;
  }
  /*需要制定具体高度，以px为单位*/
  /* height: 300px;
  width: 45%;
  float: left;
  margin-left: 50px; */
}
</style>
