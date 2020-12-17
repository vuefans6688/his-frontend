<template>
  <div>
     <el-table :data="bookingList" align="center" size="mini" stripe>
      <el-table-column label="约定类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkf122 | bookingTypeFilter }}
        </template>
      </el-table-column>
       <el-table-column label="约定状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.bkf222 | bkf222Filter }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { BKF122 } from '@/common/js/dictionary';
import { menucode } from '@filters';  // 按需导出

export default {
  props: {
    bookingList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    bookingTypeFilter(value) {
      const obj = BKF122.find((val) => {
        return val.key === value;
      });
      if (obj) {
        return obj.value;
      }
      return '-';
    },
    bkf222Filter(val) {
      return menucode.bkf222[val]; // 按需导出使用
    },
  },
};
</script>

