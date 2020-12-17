<template>
  <div class="utils">
    <Header class="header"/>
    <div class="content">
      <p class="links">
        <i class="item" :class="{ 'active': i === active_i }" v-for="(item, i) in links" :key="i" @click="jump(i)">{{item.label}}</i>
      </p>
      <router-view></router-view>
    </div>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  components: { Header, Footer },
  data() {
    return {
      active_i: 0,
      links: [
        { label: '首页', url: 'index' },
        { label: '社保撤销', url: 'sb-drop' },
      ],
    };
  },
  methods: {
    jump(i) {
      if (i === this.active_i) {
        return;
      }
      this.active_i = i;
      this.$router.push(this.links[i].url);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.utils{
  min-height: calc(100vh);
  .header, .footer{
    height: 80px;
    background: #000;
    color: #fff;
  }
  .content{
    padding: 30px 40px;
    box-sizing: border-box;
    min-height: calc(100vh - 160px);
    .links{
      margin-bottom: 24px;
      border-bottom: 1px solid $color-exlight-silver;
      .item{
        margin-right: 12px;
        font-size: 14px;
        color: $color-silver;
        cursor: pointer;
        &.active{
          color: $mainColor;
        }
      }
    }
  }
}
</style>
