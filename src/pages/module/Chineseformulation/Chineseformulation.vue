<template>
  <div>
    <Publicmodule :message='tableData'></Publicmodule>
  </div>
</template>
<script>
import Publicmodule from '../publicmodule';

export default {
  components: {
    Publicmodule,
  },
  data() {
    return {
      tableData: [
        {
          mod_name: '祖传秘方模板',
          mod_class: '个人模板',
          mod_project: '枸杞（100g），桂圆（500g），红枣（2000g）',
          mod_makeingtime: '2017-03-08',
        }, {
          mod_name: '安神模板',
          mod_class: '通用模板',
          mod_project: '沙参（100g），桂圆（500g），守宫（2000g）',
          mod_makeingtime: '2017-03-08',
        }, {
          mod_name: '炎症模板',
          mod_class: '个人模板',
          mod_project: '夏枯草（100g），桑叶（25g），菊花（500g）',
          mod_makeingtime: '2017-03-08',
        }, {
          mod_name: '安胎模板',
          mod_class: '个人模板',
          mod_project: '党参（20g），鹿茸（33g），甘草（50g）',
          mod_makeingtime: '2017-03-08',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
