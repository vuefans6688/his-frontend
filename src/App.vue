<template>
  <div id="app">
    <router-view class="main_view"></router-view>
    <div class="contact" v-show="$route.path.indexOf('navigator') > -1" :style="hide" @mouseleave="toggle">
      <div class="text" @mouseover="toggle" @mouseleave.stop="()=>{}">联系我们</div>
      <div class="container">
        <el-tooltip class="item" effect="light" placement="left">
          <div slot="content"><img style="width: 160px;" src="./assets/img/wechat.jpg" alt=""></div>
          <img class="icon" src="./assets/img/wechat_icon.png" alt="">
        </el-tooltip>
      </div>
      <div class="container">
        <el-tooltip class="item" effect="light" placement="left">
          <div slot="content"><img style="width: 160px;" src="./assets/img/qq.jpg" alt=""></div>
          <img class="icon" src="./assets/img/qq_icon.png" alt="">
        </el-tooltip>
      </div>
      <div class="container">
        <el-tooltip class="item" effect="light" placement="left">
          <div slot="content"><a style="font-size: 18px; color: #56bc94;" href="tel:075586727840">0755-86727840</a></div>
          <img class="icon" src="./assets/img/phone.png" alt="">
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
const ON = '0';
const OFF = '-46px';

export default {
  name: 'app',
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    toggle() {
      this.flag = !this.flag;
    },
  },
  computed: {
    hide() {
      return {
        right: this.flag ? OFF : ON,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.contact{
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 12px 2px;
  bottom: 100px;
  border: 1px solid #ccc;
  background: #000;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  transition: all .5s ease;
  .text{
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    padding: 12px 4px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    background: #000;
    color: #fff;
    writing-mode: vertical-lr;
    writing-mode: tb-lr;
  }
  cursor: pointer;
  .container{
    margin-top: 6px;
    .icon{
      width: 40px;
      height: 40px;
    }
    .code{
      width: 100px;
      height: 100px;
    }
  }
  
}
</style>
