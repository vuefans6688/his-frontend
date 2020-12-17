<template>
  <div class="style">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="诊疗项目准入申请" name="1">
        <projectApply v-if="activeName === '1'"></projectApply>
      </el-tab-pane>
      <el-tab-pane label="诊所申请目录" name="2">
        <query-menu menuType="2" v-if="activeName === '2'"></query-menu>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import projectApply from './ProjectApply';
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
    projectApply, 'query-menu': queryMenu,
  },
};
</script>

<style lang="scss" scoped>
.style {
  position: relative;
  padding: 30px 40px 60px 40px;
}
</style>
