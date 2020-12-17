<template>
  <div class="address_manage">
    <div class="header">
      <el-button type="primary" size="mini" @click="modify_address(-1)">新增收货地址</el-button>
    </div>
    <common-table :tableData='table_data' :columns='columns' :options='options'></common-table>

    <div class="modify_address" v-show="modify_address_flag">
      <div class="container">
        <div class="close" @click="modify_address_cancel('address')">
          <i class="el-icon-circle-close"></i>
        </div>
        <h1 class="title">{{action}}地址</h1>
        <div class="content">
          <el-form :model="address" :rules="rules_address" ref="address" label-width="100px" label-position="left" size="small">
            <el-form-item label="收货人姓名:" prop="receiver_name">
              <el-input placeholder="请输入姓名" v-model="address.receiver_name"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话:" prop="receiver_phone">
              <el-input placeholder="请输入电话" v-model="address.receiver_phone"></el-input>
            </el-form-item>
            <el-form-item label="省:" prop="province_id">
              <el-select v-model="address.province_id" placeholder="请选择省份">
                <el-option v-for="item in province_list" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="市:" prop="city_id">
              <el-select v-model="address.city_id" placeholder="请选择城市">
                <el-option v-for="item in city_list" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区:" prop="area_id">
              <el-select v-model="address.area_id" placeholder="请选择地区">
                <el-option v-for="item in area_list" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址:" prop="detail">
              <el-input type="textarea" v-model="address.detail"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" round @click="modify_address_confirm('address')">确定</el-button>
              <el-button round @click="modify_address_cancel('address')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getAddressList, addAddress, updateAddress, deleteAddress } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import CommonTable from '@/components/CommonTable';
import provinceList from '@/common/js/provinceList';

// 广东深圳南山areaId
const GD_AREA_ID = 19;
const SZ_AREA_ID = 281;
const NS_AREA_ID = 3046;

export default {
  components: { CommonTable },
  data() {
    const validateMobile = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
      if (value && !reg.test(value)) {
        callback(new Error('手机号错误!'));
        return;
      }
      callback();
    };
    return {
      loading: null,
      modify_address_flag: false,
      table_data: [],
      key: -1,
      action: '',
      address: {
        receiver_name: '',
        receiver_phone: '',
        province_id: GD_AREA_ID,
        city_id: SZ_AREA_ID,
        area_id: NS_AREA_ID,
        detail: '',
      },
      province_list: provinceList,
      city_list: [],
      area_list: [],
      columns: [
        {
          label: '是否默认地址',
          render: (h, row) => {
            return h('i', {
              class: { 'el-icon-location': row.default_item },
              style: { fontSize: '20px', color: 'red' },
            }, '');
          },
        },
        {
          label: '收货人姓名',
          prop: 'receiver_name',
        },
        {
          label: '收货人电话',
          prop: 'receiver_phone',
        },
        {
          label: '省市区',
          render: (h, row) => {
            const province = provinceList[row.province_id - 1];
            const city = province.childrenList.find(v => v.areaId === row.city_id);
            const area = city.childrenList.find(v => v.areaId === row.area_id);
            return h('p', `${province.areaName}-${city.areaName}-${area.areaName}`);
          },
        },
        {
          label: '详细地址',
          prop: 'detail',
        },
        {
          label: '操作',
          render: (h, row, index) => {
            return h('p', [
              h('a', {
                style: { cursor: 'pointer', color: 'red', marginRight: '12px' },
                on: { click: () => this.delete_address(row.receiver_id) },
              }, '删除'),
              h('a', {
                style: { cursor: 'pointer', marginRight: '12px' },
                on: { click: () => this.modify_address(index) },
              }, '编辑'),
              h('a', {
                style: { cursor: 'pointer', color: '#EE9A00' },
                on: { click: () => this.set_as_default(index) },
              }, '设为默认地址'),
            ]);
          },
        },
      ],
      options: {
        border: true,
        pagination: false,
      },
      rules_address: {
        receiver_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        receiver_phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' },
        ],
        province_id: [
          { required: true, message: '请选择省份', trigger: 'blur' },
        ],
        city_id: [
          { required: true, message: '请选择城市', trigger: 'blur' },
        ],
        area_id: [
          { required: true, message: '请选择地区', trigger: 'blur' },
        ],
        detail: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    get_list() {
      httpServerNormal(getAddressList).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.table_data = res && res.context ? res.context : [];
        }
      });
    },
    modify_address(key) {
      this.key = key;
      this.action = key > -1 ? '编辑' : '新增';
      this.modify_address_flag = true;
      if (key > -1) {
        this.address = this.table_data[key];
      }
      this.init_area();
      this.$emit('destroyScroll');
    },
    modify_address_cancel() {
      this.modify_address_flag = false;
      this.$refs.address.resetFields();
      this.$emit('initScroll');
    },
    modify_address_confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.update_address();
        } else {
          return false;
        }
      });
    },
    init_area() {
      this.city_list = provinceList[this.address.province_id - 1].childrenList;
      this.area_list = this.city_list.find(v => v.areaId === this.address.city_id).childrenList;
    },
    update_address() {
      const url = this.key > -1 ? updateAddress : addAddress;
      httpServerNormal(url, {
        ...this.address,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.modify_address_cancel();
          this.get_list();
        }
      });
    },
    delete_address(receiver_id) {
      this.$confirm('是否永久删除?', '警告', { type: 'warning' }).then(() => {
        httpServerNormal(deleteAddress, {
          receiver_id,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            this.get_list();
          }
        });
      }).catch(() => {});
    },
    delay(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(456);
        }, delay);
      });
    },
    async set_as_default(index) {
      this.loading = this.$loading({ lock: true, text: '地址维护中...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
      await this.delay(2000);
      this.close_loading();
      const address = this.table_data[index];
      httpServerNormal(updateAddress, {
        ...address,
        default_item: 1,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.get_list();
        }
      });
    },
    close_loading() {
      if (this.loading) {
        this.loading.close();
      }
    },
  },
  created() {
    this.table_data = this.address_list;
    this.get_list();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.address_manage{
  padding: 30px 40px;
  .header{
    margin-bottom: 30px;
  }

  .modify_address{
    @include modify_info;
    .container{
      height: 420px;
      .el-select{
        width: 100%;
      }
    }
  }
}
</style>
