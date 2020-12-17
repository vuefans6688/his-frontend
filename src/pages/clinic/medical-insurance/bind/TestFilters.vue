<template>
  <div>
    {{ bkc346 | bkc346Filter }}
    <el-button @click="request">请求his</el-button>
    <el-button @click="test">请求社保客户端</el-button>

    <!-- <sb-loading></sb-loading> -->

  <!-- <div>
    <quick-reg></quick-reg>
  </div> -->

   <!-- <div class="quickRegistStyle" v-show='cardReading'>
      <div class="container">
        <quick-regist @closeRegistWin="closeRegistWin"></quick-regist>
      </div>
    </div> -->

  </div>
</template>

<script>
// his
import httpServerNormal from '@httpServerNormal';
import { getClinicName, connecton } from '@apiNormal';
// 过滤器
import { usercode } from '@filters';  // 按需导出
// import * as ybFilters from '@filters'; // 全部导出
import { AKF001 } from '@/common/js/dictionary';
import sbLoading from '@/components/SbLoading';
// import quickRegist from '@/pages/doctorStation/components/QuickRegist';
// 测试连接
import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      bkc346: '00',
      sections: AKF001,
      cardReading: true,
    };
  },
  created() {
    // this.request();
    // console.log(usercode);
    // console.log(ybFilters);
    // const a = await connectionTest();
    // console.log(a);
  },
  methods: {
    closeRegistWin(flag) {
      console.log(flag);
      this.cardReading = false;
    },
    async test() {
      const flag = await connectionTest();
      if (flag === '1') {
        console.log('调用社保其他接口');
      }
    },
    // 请求his
    request() {
      httpServerNormal(getClinicName, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          console.log(res);
        } else { // code错误需要进行的操作
          const code = res.split(':')[1];
          console.log(code);
        }
      });
    },
    // 请求社保客户端
    requestClient() {  // 测试连接
      httpServerNormal(connecton, {
        transBody: {  // 社保文档的参数放在transBody中
          // serverstatus: '1',
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          // 成功的回调( 直接返回data)
          console.log(res);
        } else { // code错误需要进行的操作
          const code = res.split(':')[1];
          console.log(code);
        }
      });
    },
  },
  filters: {
    bkc346Filter(val) {
      return usercode.bkc346[val]; // 按需导出使用
      // return ybFilters.bkc346[val]; // 全部导出使用
    },
  },
  components: {
    sbLoading,
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

.quickRegistStyle {
  @include modify_info;
  h3 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    .el-button {
      margin-left: 20px;
    }
  }
  .container {
    width: 450px;
    overflow-x: hidden;
    .content {
      overflow: auto;
      border: 0;
      width: 450px;
      min-height: 520px;
      .el-form-item{
        width: 100%;
        margin-bottom: 10px;
        &.ageInputs{
          margin-bottom: 0;
        }
        .el-input {
          width: 200px;
        }
      }
      .dialog-footer {
        width: 140px;
        margin: 10px auto;
      }
      .clear{
        margin-top: 10px;
        margin-left: 10px;
        color: $mainColor;
        cursor: pointer;
      }
    }
  }
}
</style>
