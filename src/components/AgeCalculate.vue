<template>
  <div class="ageCalculate">
    <el-col :span="6" class="maxWidth">
      <el-form-item prop="age">
        <el-input class="el_input_no_padding right_align" placeholder="岁" ref="age" @keyup.native="intLimitAge('age')" v-model="old.age" @blur="calculateBirth" :maxlength="3"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="1">岁</el-col>
    <el-col :span="6" class="maxWidth">
      <el-form-item prop="month">
        <el-input class="el_input_no_padding right_align" placeholder="月" v-model="old.month" ref="month" @keyup.native="intLimitAge('month', 12)" @blur="calculateBirth" :maxlength="2"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="1">月</el-col>
    <el-col :span="10">
      <el-form-item prop="birth">
        <el-date-picker type="date" placeholder="选择出生日期" v-model="old.birth" @change="calculateBirth2" :editable="false" :clearable="false" :picker-options='pickerOptions'>
        </el-date-picker>
      </el-form-item>
    </el-col>
  </div>
</template>

<script>
import { numberLimit } from '@/utils/inputLimit';
import { getCurMonthDays } from '@/utils/ageTransfer';

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(date) {
          const today = new Date();
          return date.getTime() > new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        },
      },
    };
  },
  props: {
    old: {
      type: Object,
      default() {
        return {
          age: 0,
          month: 0,
          birth: '',
        };
      },
    },
  },
  methods: {
    getAGE() {
      return this.old.age || 0;
    },
    getMONTH() {
      return this.old.month || 0;
    },
    getBIRTH() {
      return this.old.birth || new Date();
    },
    calculateBirth() {      // 根据岁数和月数计算生日
      const TODAY = new Date();
      let YEAR = TODAY.getFullYear() - this.getAGE();
      let MONTH = TODAY.getMonth() + 1 - this.getMONTH();
      if (MONTH < 0) {
        MONTH = 12 + MONTH;
        YEAR -= 1;
      }
      const birthday = new Date(YEAR, MONTH - 1, TODAY.getDate());
      this.old.birth = birthday;
    },
    calculateBirth2() {         // 根据生日计算岁数
      if (this.getBIRTH() > new Date()) {
        this.old.birth = '';
        return;
      }
      this.old.age = new Date().getFullYear() - this.getBIRTH().getFullYear();
      this.old.month = new Date().getMonth() - this.getBIRTH().getMonth();
      let day = new Date().getDate() - this.getBIRTH().getDate();
      // 获取当前月天数
      const curMonth = parseInt(this.getBIRTH().getMonth() + 1, 10);
      const curYear = parseInt(this.getBIRTH().getFullYear(), 10);
      const daysInMonth = getCurMonthDays(curMonth, curYear);
      if (day < 0) {
        day = daysInMonth + day;
        this.old.month -= 1;
      }
      if (this.old.month < 0) {
        this.old.month = 12 + this.old.month;
        this.old.age -= 1;
      }
    },
    intLimitAge(filed, limit) {
      this.old[filed] = numberLimit(this.old[filed], limit);
    },
  },
};
</script>


<style lang="scss" scoped>
.maxWidth{
  max-width: 60px;
}
</style>
