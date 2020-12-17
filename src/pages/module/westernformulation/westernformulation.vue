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
          mod_name: '轻微感冒处方',
          mod_class: '个人模板',
          mod_project: '阿莫西林（1盒），太极急支糖浆（1瓶），太极藿香正气液（2盒）',
          mod_makeingtime: '2017-03-08',
        }, {
          mod_name: '轻微发烧处方',
          mod_class: '通用模板',
          mod_project: '阿莫西林（1盒），太极急支糖浆（1瓶），太极藿香正气液（2盒）',
          mod_makeingtime: '2017-07-17',
        }, {
          mod_name: '炎症模板',
          mod_class: '个人模板',
          mod_project: '阿莫西林（1盒），太极急支糖浆（1瓶），太极藿香正气液（2盒）',
          mod_makeingtime: '2017-11-28',
        }, {
          mod_name: '安胎模板',
          mod_class: '个人模板',
          mod_project: '阿莫西林（1盒），太极急支糖浆（1瓶），太极藿香正气液（2盒）',
          mod_makeingtime: '2017-08-12',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
