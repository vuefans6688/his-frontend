<template>
  <div class="style">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="耗材准入申请" name="1">
        <materialApply v-if="activeName === '1'"></materialApply>
      </el-tab-pane>
      <el-tab-pane label="诊所申请目录" name="2">
        <query-menu menuType="3" v-if="activeName === '2'"></query-menu>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import materialApply from './MaterialApply';
import queryMenu from '../components/QueryMenu';


export default {
  data() {
    return {
      activeName: '1',
    };
  },
  methods: {
  },
  components: {
    materialApply, 'query-menu': queryMenu,
  },
};
</script>

<style lang="scss" scoped>
.style {
  position: relative;
  padding: 30px 40px 60px 40px;
}
</style>
