<template>
  <div class="short_message">
    <div class="header">
      <el-menu default-active="send" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="send">发短信</el-menu-item>
        <el-menu-item index="sent">已发送</el-menu-item>
      </el-menu>
      <div class="calculate">
        <span class='used'>已使用短信：{{used}}条</span>
        <span class='remain'>剩余短信数：{{remain}}条</span>
      </div>
    </div>
    <List :way="way"></List>
  </div>
</template>
<script>
import List from './painentsList/List';

export default {
  data() {
    return {
      used: 0,
      remain: 300,
      way: 'send',
    };
  },
  methods: {
    handleSelect(index) {
      this.way = index;
    },
  },
  components: {
    List,
  },
};
</script>
<style lang="scss" scoped>
.short_message{
  padding: 0 60px;
  .header{
    display: flex;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .el-menu{
      flex: 1 1 auto;
      border-bottom: none;
      min-width: 172px;
      .el-menu-item{
        height: 50px;
      }
    }
    .calculate{
      flex: 1 1 auto;
      line-height: 50px;
      min-width: 234px;
    }
  }
}
</style>
