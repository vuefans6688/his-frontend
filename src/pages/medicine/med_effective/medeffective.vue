<template>
  <div class="medeffective">
    <div class="header">
      <button class="btn" size="mini" :class="{active: alertType==='count'}" @click="chooseCountAlert">库存预警</button>
      <button class="btn" size="mini" :class="{active: alertType==='expired'}" @click="chooseExpiredAlert">有效期预警</button>
    </div>
    <countalert v-if="alertType==='count'"></countalert>
    <expiredalert v-if="alertType==='expired'"></expiredalert>
  </div>
</template>
<script>
import countalert from './med_countalert';
import expiredalert from './med_expiredalert';

export default {
  data() {
    return {
      // 搜索控制数据
      alertType: 'count',
    };
  },
  methods: {
    chooseCountAlert() {
      this.alertType = 'count';
    },
    chooseExpiredAlert() {
      this.alertType = 'expired';
    },
  },
  components: { countalert, expiredalert },
};
</script>
<style scoped lang="scss">
@import '~@scss';

.pagination{
  @include pagination_to_bottom;
}
.medeffective{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
  height: 49px;
  color: #1a1a1a;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  min-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  .btn {
    width: 120px;
    height: 40px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    border-radius: 4px;
    outline: none;
    font-size: 15px;
    font-weight: 600;
    &.active{
      background-color: #56BC94;
      color: #fff;
      font-size: 15px;
    }
  }
}
/* .Excel{
  margin-top: 4px; 
} */
.el-range-editor.el-input__inner{
  padding: 0 10px;
}
</style>
