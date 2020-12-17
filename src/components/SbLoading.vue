<template>
  <div>

    <AutoFillPassword></AutoFillPassword>
    <div class="card">
      <span>社保卡号：</span><el-input v-model="sbForm.sbCard" size="small"></el-input>
      <el-button size="small" type="primary" @click="getPersonBaseInfo" :disabled="isReading">确认读卡</el-button>
    </div>

    <div class="card" v-if="passwordShow">
      <span>社保密码：</span>
      <el-input v-model="sbForm.sbPassword" type="password" size="small" placeholder="请输入社保卡密码"></el-input>
    </div>

    <div class="myloading" v-show="isReading"></div>
    
  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { baseinfo, detailinfo } from '@apiNormal';
import connectionTest from '@/common/js/connection';
import AutoFillPassword from '@/components/AutoFillPassword';

export default {
  components: { AutoFillPassword },
  props: {
    keepReading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reading: false,
      sbForm: {
        sbCard: '%GALKXMFSWLUKZHANWDFZ?;07821534685348960214?',
        sbPassword: '000000',
      },
      passwordShow: false,
    };
  },
  methods: {
    async getPersonBaseInfo() {  // 读卡获取基本信息
      this.reading = true;
      try {
        const flag = await connectionTest();
        // const flag = await connectionTest();
        if (flag === '1') {
          httpServerNormal(baseinfo, {
            transBody: { bzz269: this.sbForm.sbPassword },
          }).then((res) => {
            if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
              this.getPersonDetailInfo(this.sbForm.sbPassword);
              this.$emit('getPersonBaseInfo', res.transBody, true, this.sbForm.sbPassword);
            } else {
              this.passwordShow = true;
              this.reading = false;
              this.$emit('readFailed', 'failed');
            }
          }).catch(() => {
            this.reading = false;
            this.$emit('readFailed', 'error');
          });
        } else {
          this.reading = false;
        }
      } catch (e) {
        console.log(e);
        this.reading = false;
      }
    },
    getPersonDetailInfo(password) {  // 读卡获取详细信息
      httpServerNormal(detailinfo, {
        transBody: { bzz269: this.sbForm.sbPassword },
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.reading = false;
          this.$emit('getPersonDetailInfo', res.transBody, true, password);
        } else {
          this.reading = false;
          this.$emit('readFailed', 'failed');
        }
      }).catch(() => {
        this.reading = false;
        this.$emit('readFailed', 'error');
      });
    },
  },
  computed: {
    isReading() {
      return this.reading || this.keepReading;
    },
  },
};
</script>


<style scoped lang="scss">

.el-input {
  width: 390px;
  margin: 10px 0;
}
.el-button {
  margin-left: 10px;
}
.myloading {
  width: 300px;
  height: 22px;
  border-radius: 6px;
  background-color: #56BC94;
  position: relative;
  overflow: hidden;
  margin: 10px auto;
}
.myloading::after {
  display: block;
  content: '';
  font-size: 12px;
  color: #fff;
  line-height: 22px;
  text-align: center;
  position: absolute;
  width: 100px;
  height: 22px;
  border-radius: 5px;
  background-color: #666;
  animation: mymove 2s infinite linear;
  -webkit-animation: mymove 2s infinite linear; /*Safari and Chrome*/
}

@keyframes mymove {
  from {
    left: -50px;
  }
  to {
    left: 320px;
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    left: -50px;
  }
  to {
    left: 320px;
  }
}
</style>
