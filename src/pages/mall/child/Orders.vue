<template>
  <div class="container">
    <common-table :tableData='order_list' :columns='columns' :options='options'></common-table>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable';
import { getOrderList } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import { NanoSecToDateTime } from '@/utils/dateUtils';

export default {
  components: { CommonTable },
  data() {
    return {
      order_list: [],
      columns: [
        {
          label: '订单编号',
          render: (h, row) => {
            return h('span', row.order.order_createtime);
          },
        },
        {
          label: '下单时间',
          render: (h, row) => {
            return h('span', NanoSecToDateTime(row.order.order_createtime));
          },
        },
        {
          label: '收货人',
          render: (h, row) => {
            return h('span', row.order.receiver_name);
          },
        },
        {
          label: '收货人电话',
          render: (h, row) => {
            return h('span', row.order.receiver_phone);
          },
        },
        {
          label: '收货地址',
          render: (h, row) => {
            return h('span', row.order.receiver_addr);
          },
        },
        {
          label: '订单金额',
          render: (h, row) => {
            return h('span', (row.order.total_price / 100).toFixed(2));
          },
        },
        {
          label: '订单状态',
          render: (h, row) => {
            return h('span', this.status_filter(row.order.status_index));
          },
        },
        {
          prop: 'status_index',
          label: '操作',
          render: (h, row) => {
            return h('p', [
              h('a', {
                style: [{ color: 'red', cursor: 'pointer' }, row.order.status_index === 0 ? null : { visibility: 'hidden' }],
                on: { click: () => this.order_pay(row.order.order_id) },
              }, '去支付'),
              h('a', {
                style: { marginLeft: '6px', cursor: 'pointer' },
                on: { click: () => this.order_detail(row.order.order_id) },
              }, '详情'),
            ]);
          },
        },
      ],
      options: {
        border: true,
        // 分页配置
        page_size: 10,  // 必填
        page_index: 1,  // 必填
        total: 0,      // 必填
        currentChange: this.currentChange,
      },
    };
  },
  methods: {
    get_order_list() {
      httpServerNormal(getOrderList, {
        pageid: this.options.page_index,
        pagesize: this.options.page_size,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.order_list = res && res.context ? res.context : [];
          this.options.total = res && res.pagecount ? res.pagecount : 0;
        }
      });
    },
    order_pay(order_id) {
      this.$router.push({ path: 'pay', query: { order_id } });
    },
    order_detail(order_id) {
      this.$router.push({ path: 'detail', query: { order_id } });
    },
    status_filter(status) {
      let status_text = '';
      switch (status) {
        case 0: status_text = '未支付'; break;
        case 1: status_text = '已支付'; break;
        case 2: status_text = '商家已确认订单'; break;
        case 3: status_text = '商家已发货'; break;
        case 4: status_text = '买家收货'; break;
        case 5: status_text = '5买家申请退货'; break;
        case 6: status_text = '买家退货已发货'; break;
        case 7: status_text = '商家已收退货'; break;
        case 8: status_text = '商家已退钱'; break;
        case 9: status_text = '订单交易完成'; break;
        case 10: status_text = '订单已评价'; break;
        case 11: status_text = '订单已作废'; break;
        case 12: status_text = '买家已删除订单'; break;
        default: break;
      }
      return status_text;
    },
    currentChange(page_index) {
      this.options.page_index = page_index;
      this.get_order_list();
    },
  },
  created() {
    this.get_order_list();
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding: 30px 40px;
  
}
</style>

