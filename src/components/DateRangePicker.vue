<template>
  <div class="date-range">
    <div class="start">
      <span class="label item">开始日期</span>
      <div class="date item">
        <el-date-picker v-model="value[0]" type="date" :placeholder="config.startPlaceholder" :size="config.size" :readonly='config.readonly'
          :disabled='config.disabled' :editable='config.editable' :clearable='config.clearable' :format='config.format' :align='config.align'>
        </el-date-picker>
      </div>
    </div>

    <div class="end">
      <span class="label">截止日期</span>
      <div class="date item">
        <el-date-picker v-model="value[1]" type="date" :placeholder="config.endPlaceholder" :size="config.size" :readonly='config.readonly'
          :disabled='config.disabled' :editable='config.editable' :clearable='config.clearable' :format='config.format' :align='config.align'>
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_config: {
        readonly: false,
        disabled: false,
        editable: true,
        clearable: true,
        startPlaceholder: '选择开始日期',
        endPlaceholder: '选择截止日期',
        format: 'yyyy-MM-dd',
        align: 'left',
      },
    };
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    attributes: {
      type: Object,
    },
  },
  computed: {
    config() {
      return Object.assign({}, this.default_config, this.attributes);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-range{
  display: inline-block;
  .start, .end{
    display: inline-block;
    .date{
      display: inline-block;
    }
  }
}
</style>
