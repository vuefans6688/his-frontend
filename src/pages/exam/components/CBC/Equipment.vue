<template>
  <div class="devices_container">
    <div class="header">
      <el-button size="mini" type="primary" @click="add_devices">添加设备</el-button>
    </div>

    <common-table :tableData='devices_list' :columns='columns' :options='options'></common-table>


    <div class="add_device" v-show="add_devices_flag">
      <div class="container">
        <div class="close" @click="reset">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">设备绑定</h1>
        <div class="content">
          <el-form :model="devices" :rules="rules" ref="devices" label-width="100px" label-position="left" size="small">
            <el-form-item label="设备编号:" prop="device_code">
              <el-input v-model="devices.device_code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="add_devices_confirm('devices')">确定</el-button>
              <el-button round @click="reset">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { get_device_list, add_device } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import CommonTable from '@/components/CommonTable';
import { NanoSecToDateTime } from '@/utils/dateUtils';

export default {
  components: { CommonTable },
  data() {
    return {
      devices_list: [],
      add_devices_flag: false,
      devices: {
        device_code: '',
      },
      rules: {
        device_code: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
      },
      columns: [
        {
          label: '设备编号',
          prop: 'msh',
        },
        {
          label: '设备名称',
          prop: 'device_name',
        },
        {
          label: '设备状态',
          render: (h, row) => {
            return h('span', this.devices_status(row.auth_status));
          },
        },
        {
          label: '诊所状态',
          render: (h, row) => {
            return h('span', this.clinic_status(row.clinic_status));
          },
        },
        {
          label: '添加时间',
          render: (h, row) => {
            return h('span', NanoSecToDateTime(row.create_time));
          },
        },
        {
          label: '溶血剂过期时间',
          render: (h, row) => {
            return h('span', NanoSecToDateTime(row.hemolysis_exp_time));
          },
        },
        {
          label: '稀释液过期时间',
          render: (h, row) => {
            return h('span', NanoSecToDateTime(row.diluent_exp_time));
          },
        },
      ],
      options: {
        border: true,
        // 分页配置
        pagination: false,
      },
    };
  },
  methods: {
    get_list() {
      httpServerNormal(get_device_list).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.devices_list = res || [];
        }
      });
    },
    add_devices() {
      this.add_devices_flag = true;
      this.$emit('destroyScroll');
    },
    add_devices_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // this.add_devices_flag = false;
          // this.$emit('initScroll');
          this.add_devices_request();
        } else {
          return false;
        }
      });
    },
    add_devices_request() {
      httpServerNormal(add_device, {
        ...this.devices,
      }).then((res) => {
        this.reset();
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.get_list();
        }
      }).catch(() => {
        this.reset();
      });
    },
    reset() {
      this.$refs.devices.resetFields();
      this.add_devices_flag = false;
      this.$emit('initScroll');
    },
    devices_status(status) {
      let statue_tips = '';
      switch (status) {
        case 1: statue_tips = '审核中'; break;
        case 2: statue_tips = '审核不通过'; break;
        case 3: statue_tips = '审核通过'; break;
        case 4: statue_tips = '已脱机'; break;
        default : break;
      }
      return statue_tips;
    },
    clinic_status(status) {
      return status === 1 ? '正常' : '禁用';
    },
  },
  created() {
    this.get_list();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.devices_container{
  padding: 30px 40px;
  .header{
    margin-bottom: 24px;
  }

  .add_device{
    @include modify_info;
  }
}
</style>
