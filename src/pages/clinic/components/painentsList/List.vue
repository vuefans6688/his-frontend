<template>
  <div class="list">
    <div class="date">
      <el-date-picker
          v-model="value9"
          width= "100px"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          default-value="2010-10-01">
      </el-date-picker>
      <div class='search'>
        <div class="detail">
          <div class='label'>患者姓名/电话</div><el-input class='value' v-model="condition1"></el-input>
        </div>
        <div class="detail" v-show="this.way !== 'send'">
          <div class='label'>发送状态</div>
          <el-select v-model="condition2" placeholder="请选择" class='value'>
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btn_group">
        <el-button round size="small">查询</el-button>
        <el-button round size="small" v-show="this.way === 'send'">发送短信</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="content"
        label="短信内容">
      </el-table-column>
      <el-table-column
        prop="status"
        label="发送状态">
      </el-table-column>
      <el-table-column
        prop="oparator"
        label="操作人">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value9: '',
      condition1: '',
      condition2: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
      ],
    };
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [
          {
            name: '',
            gender: 0,
            age: 0,
            mobile: '',
            content: '',
            date: '',
            status: '',
            oparator: '',
          },
        ];
      },
    },
    way: {
      type: String,
      default: 'send',
    },
  },
};
</script>

<style lang="scss" scoped>
.list{
  .date{
    display: flex;
    padding: 30px 0;
    .el-date-editor{
      flex: 1 1 auto;
      min-width: 204px;
    }
    .search{
      flex: 1 1 auto;
      display: flex;
      line-height: 40px;
      .detail{
        display: flex;
        .label{
          flex: 0 0 90px;
          width: 90px;
        }
        .value{
          display: 1 1 auto;
        }
      }
    }
    .btn_group{
      flex: 1 1 auto;
      line-height: 40px;
      min-width: 152px;
    }
  }
}
</style>
