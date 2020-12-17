<template>
  <div class="style">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="机构绑定" name="1">
        <bind-company></bind-company>
      </el-tab-pane>
      <!-- <el-tab-pane label="机构基本信息" name="2">机构基本信息</el-tab-pane> -->
      <!-- <el-tab-pane label="机构科室管理" name="3">
        <bind-section v-if="activeName === '3'" @initScroll="$emit('initScroll')" @destroyScroll="$emit('destroyScroll')"></bind-section>
      </el-tab-pane> -->
      <el-tab-pane label="机构医务人员管理" name="4">
        <bind-staff v-if="activeName === '4'" @initScroll="$emit('initScroll')" @destroyScroll="$emit('destroyScroll')"></bind-staff>
      </el-tab-pane>
      <!-- <el-tab-pane label="测试界面" name="5">
        <test-filters v-if="activeName === '5'"></test-filters>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import bindCompany from './BindCompany';
// import bindSection from './BindSection';
import bindStaff from './BindStaff';
import testFilters from './TestFilters';

export default {
  data() {
    return {
      activeName: '1',
    };
  },
  methods: {
  },
  components: {
    bindCompany, bindStaff, testFilters,
  },
};
</script>

<style lang="scss" scoped>
.style {
  position: relative;
  padding: 30px 40px 60px 40px;
  .el-tabs {
    min-width: 1000px;
  }
}
</style>
