<template>
<div class="switch">
  <el-tabs v-model="medicaltype" type="card">
    <el-tab-pane label="全科病历" name="0" :disabled='!!tplId'>
      <newmedicalrecords v-if='medicaltype == 0' :data='data' :tplId='tplId'></newmedicalrecords>
    </el-tab-pane>
    <el-tab-pane label="牙科病历" name="1" :disabled='!!tplId'>
      <newmedicaldentistry v-if='medicaltype == 1' :data='data' :tplId='tplId' @destroyScroll="$emit('destroyScroll');" @initScroll="$emit('initScroll');"></newmedicaldentistry>
    </el-tab-pane>
  </el-tabs>
</div>
  
</template>

<script>
import newmedicalrecords from './newmedicalrecords';
import newmedicaldentistry from './newmedicaldentistry';

export default {
  components: { newmedicalrecords, newmedicaldentistry },
  data() {
    return {
      medicaltype: '0',
      tplId: '',  // 模板id
      data: {},
    };
  },
  methods: {
  },
  created() {
    const tplType = this.$route.params.tplType;
    if (!tplType) {
      this.$router.back();
    }
    this.data = this.$route.params.data;
    this.tplId = this.$route.params.tplId;
    this.medicaltype = this.data && this.data.data.medicaltype ? '1' : '0';
  },
};
</script>
