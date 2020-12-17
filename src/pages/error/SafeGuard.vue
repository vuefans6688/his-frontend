<template>
  <div class="bg">
    <div class="refresh">
      <el-button size="mini" type="danger" @click="test_net">刷新试试</el-button>
    </div>
    <h1 class="title">抱歉, 系统正在维护中......</h1>
  </div>
</template>

<script>
import { getClinicName } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import router from '@/router';

export default {
  methods: {
    test_net() {
      httpServerNormal(getClinicName).then(() => {
        router.go(-1);
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.bg{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('../../assets/img/error.gif');
  background-repeat: no-repeat;
  background-position: center center;
  .refresh{
    margin-top: 60px;
    text-align: center;
  }
  .title{
    text-align: center;
    margin-top: 30px;
    color: #8492A6;
    font-size: 30px;
    font-weight: 600;
  }
}
</style>
