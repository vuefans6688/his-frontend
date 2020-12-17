<template>
  <div class="container">

    <div class="search my_titleInpStyle">
      <DateRangePicker :value='searchCondition.dateRange' :attributes='date_range_picker_attributes'></DateRangePicker>
      <input class='myInput condition' size="mini" v-model="searchCondition.text" placeholder="客户姓名或手机号" />
      <el-button type="primary" size="small" @click="combine_print">合并打印</el-button>
    </div>

    <common-table :tableData='order_list' :columns='columns' :options='options'></common-table>

    <div class="shaow" v-if="print_flag">
      <div class="header">
        <el-button type="primary" size="mini" @click="print">打印</el-button>
        <el-button type="danger" size="mini" @click="download">下载</el-button>
        <el-button size="mini" @click="close_print">关闭</el-button>
      </div>
      <ReportPrint ref='printComponent' :report_id_list='report_id_list' @reject='close_print'/>
    </div>

  </div>
</template>

<script>
import { CBC_get_report_list } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import CommonTable from '@/components/CommonTable';
import { NanoSecToDateTime } from '@/utils/dateUtils';
import DateRangePicker from '@/components/DateRangePicker';
import ReportPrint from './ReportPrint';

export default {
  components: { CommonTable, DateRangePicker, ReportPrint },
  data() {
    return {
      print_flag: false,
      date_range_picker_attributes: {
        editable: false,
        clearable: false,
        size: 'small',
      },
      searchCondition: {            // 搜索条件
        dateRange: [new Date(), new Date()],
        text: '',               // 姓名或电话
      },
      order_list: [],
      selected_rows: [],
      columns: [
        {
          label: '样本编号',
          prop: 'sample_code',
        },
        {
          label: '报告时间',
          prop: 'create_time',
          render: (h, row) => (h('span', NanoSecToDateTime(row.create_time))),
        },
        {
          label: '姓名',
          prop: 'real_name',
        },
        {
          label: '性别',
          prop: 'gender',
          render: (h, row) => (h('span', row.gender === 1 ? '男' : '女')),
        },
        {
          label: '年龄',
          prop: 'age',
        },
        {
          label: '电话',
          prop: 'phone',
        },
        {
          label: '送检项目',
          render: h => (h('span', '血常规三分类')),
        },
        {
          label: '医生',
          prop: 'doctor_name',
        },
        {
          label: '操作',
          render: (h, row) => {
            return h('p', [
              h('a', {
                style: { cursor: 'pointer' },
                on: { click: () => this.report_print([row.report_id]) },
              }, '查看报告'),
              h('a', {
                style: { cursor: 'pointer', color: 'red', marginLeft: '6px' },
                on: { click: () => this.report_print([row.report_id]) },
              }, '打印'),
            ]);
          },
        },
      ],
      options: {
        multipleRowSelect: true,
        selectionChange: this.selectionChange,
        currentChange: (page_index) => { this.options.page_index = page_index; this.get_list(); },
        border: true,
        // 分页配置
        page_size: 10,
        page_index: 1,
        total: 0,
      },
      report_id_list: [],
    };
  },
  methods: {
    show_print() {
      this.print_flag = true;
      this.$emit('destroyScroll');
    },
    close_print() {
      this.print_flag = false;
      this.$emit('initScroll');
    },
    print() {
      this.$refs.printComponent.print();
    },
    download() {
      this.$refs.printComponent.download();
    },
    get_list() {
      httpServerNormal(CBC_get_report_list, {
        page_index: this.options.page_index,
        page_size: this.options.page_size,
        text: this.searchCondition.text,
        begin_date: this.searchCondition.dateRange[0].format('yyyy-MM-dd'),
        end_date: this.searchCondition.dateRange[1].format('yyyy-MM-dd'),
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.order_list = res && res.data ? res.data : [];
          this.options.total = res && res.total ? res.total : 0;
        }
      });
    },
    report_print(report_id_list) {
      this.report_id_list = report_id_list;
      this.show_print();
    },
    selectionChange(rows) {
      this.selected_rows = rows;
    },
    // 合并打印
    combine_print() {
      if (!this.selected_rows.length) {
        this.$message({ message: '请勾选订单', type: 'error', showClose: true });
        return;
      }
      this.report_print(this.selected_rows.map(v => v.report_id));
    },
  },
  watch: {
    searchCondition: {
      handler() {
        this.options.page_index = 1;
        this.get_list();
      },
      deep: true,
    },
  },
  mounted() {
    this.get_list();
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding: 30px 40px;
  .search{
    margin-bottom: 30px;
  }

  .shaow{
    position: fixed;
    padding: 120px 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(7, 17, 27, 0.6);
    z-index: 2000 !important;
    overflow: auto;
    .header{
      position: fixed;
      z-index: 2001 !important;
      left: 0;
      right: 0;
      top: 0;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: #242424;
    }
    
  }
}
</style>
