<template>
  <div>
    <h3 class="add">
      <i class="el-icon-circle-plus-outline" @click="openWin"> 新增科室</i>
    </h3>
    
    <el-table :data="tableData" align="center" size="medium" stripe>
      <el-table-column prop="id" label="科室编码" align="center"></el-table-column>
      <el-table-column prop="section" label="科室名称" align="center"></el-table-column>
      <el-table-column prop="type" label="科室类别" align="center"></el-table-column>
      <el-table-column prop="name" label="负责人" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="peoplenum" label="人数" align="center"></el-table-column>
      <el-table-column prop="bednum" label="床位数" align="center"></el-table-column>
      <el-table-column label="标准价格" align="center">
        <template slot-scope="scope">
          {{ scope.row.price | PriceFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- {{ scope.row.aa }} -->
          <span @click="modify(scope.row)" class="operation">修改</span>
          <span class="operation del" @click="del(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>


   <!-- 遮罩层 -->
    <el-dialog :title="addStatus ? '新增科室' : '编辑科室'" :visible.sync="dialogVisible" :modal-append-to-body="false" center :close-on-click-modal="false">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" size="small">

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="10">
           <el-form-item label="科室编码" prop="id">
            <el-input v-model="ruleForm.id" :disabled="true"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="科室名称" prop="section">
              <el-select v-model="ruleForm.section" placeholder="请选择科室">
                <el-option :label="item" :value="item" v-for="(item,index) in sectionList" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="10">
           <el-form-item label="负责人" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="10">
            <el-form-item label="科室类别" prop="section">
              <el-select v-model="ruleForm.type">
                <el-option label="普通科室" value="1"></el-option>
                <el-option label="特殊科室" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="人数" prop="peoplenum">
              <el-input v-model="ruleForm.peoplenum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
     
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="10">
           <el-form-item label="床位数" prop="bednum">
            <el-input v-model="ruleForm.bednum"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="标准价格" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')" size="small">确 定</el-button>
        <el-button @click="closeWin" size="small">取 消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import deepcopy from '@/utils/deepcopy';

export default {
  data() {
    return {
      addStatus: true,  // 修改状态
      dialogVisible: false,
      tableData: [],
      ruleForm: {
        name: '',
        region: '',
        type: 1,
      },
      rules: {
        num: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
      sectionList: [1, 2, 3],
    };
  },
  methods: {
    openWin() {
      this.addStatus = true;
      this.dialogVisible = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
    },
    closeWin() {
      this.dialogVisible = false;
      this.$emit('initScroll');
      this.resetForm('ruleForm');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.ruleForm = {};
      this.$refs[formName].resetFields();
    },
    modify(item) {
      this.addStatus = false;
      this.dialogVisible = true;
      this.$emit('destroyScroll');  // 弹出模态框时需destroy父组件Scrollbar
      this.ruleForm = deepcopy(item);
    },
    del(item) {
      this.$confirm(`确定删除 ${item.section} 科室?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          showClose: true,
          duration: 1000,
        });
      }).catch(() => {
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  i {
    cursor: pointer;
  }
}
.el-table {
  margin-top: 20px;
  .operation {
    cursor: pointer;
  }
  .del {
    margin-left: 10px;
    color: red;    
  }
}
.el-select {
  width: 100%;
}
</style>
