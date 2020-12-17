<template>
  <div class="customer_detail">
    <div class="operation">
      <div class="back">
        <router-link v-show="!isFromDoctorStation" class="item" to="/navigator/customers/customersList">返回</router-link>
        <router-link v-show="isFromDoctorStation" class="item" to="/navigator/doctorStation">返回</router-link>
      </div>
      <div class="msg">
        <span class="name">{{customer.name}}</span>
        <span class="gender" v-show='customer.gender'> - {{customer.gender | SexState}}</span>
        <span class="age" v-show='customer.birthdate'> - {{age}}</span>
        <span class="mobile" v-show='customer.phone'> - {{customer.phone}}</span>
      </div>
      <div class="options">
        <router-link class="item" to="customerInfo">客户信息</router-link>
        <router-link class="item" to="visitRecord">就诊记录</router-link>
        <router-link class="item" to="followUpRecord">随访记录</router-link>
        <router-link class="item" to="chargeRecord">收费记录</router-link>
      </div>
    </div>
    <div class="detail_info">
      <router-view :customerID='customerID' 
        @initScroll="$emit('initScroll');" 
        @destroyScroll="$emit('destroyScroll');"
        @customerInfoUpdated='getCustomerInfo'>
      </router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { calculateFromBirth } from '@/utils/ageTransfer';
import { customerInfo } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    return {
      customer: {},
      isFromDoctorStation: false,   // 若从医生工作站查看客户信息，需返回医生工作站
    };
  },
  methods: {
    ...mapMutations(['change_customerID']),
    // 获取患者信息
    getCustomerInfo() {
      httpServerNormal(customerInfo, {
        patientid: this.customerID,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.customer = res.patient;
        }
      });
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic', 'customerID']),
    age() {
      return calculateFromBirth(this.customer.birthdate);
    },
  },
  beforeDestroy() {
    this.change_customerID('');
  },
  created() {
    this.isFromDoctorStation = this.$route.params.patientid;
    this.getCustomerInfo();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';
.customer_detail{
  padding: 30px 40px 60px 40px;
  position: relative;
  .operation{
    min-width: 360px;
    .back{
      .item{
        display: inline-block;
        padding: 4px 16px;
        border: 1px solid $mainColor;
        border-radius: 5px;
        &:hover{
          background: #56bc94;
          color: #fff;
        }
      }
    }
    .msg{
      margin-top: 10px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 700;
      border-top: 1px solid #ccc;
    }
    .options{
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      .item{
        display: inline-block;
        padding: 4px 6px;
        margin-right: 10px;
        border: 1px solid $mainColor;
        border-radius: 5px;
        &.router-link-active, &:hover{
          background: #56bc94;
          color: #fff;
        }
      }
    }
  }
}
</style>

