<template>
    <div class="Pills">
        <div class="header">
            <!-- <ul>
                <li>就诊号：{{ mes.num }}</li>
                <li>客户姓名：{{ mes.name }}</li>
                <li>客户手机：{{ mes.phone }}</li>
                <li>性别：{{ mes.gender | SexState }}</li>
                <li>年龄：{{ mes.birthdate }}</li>

                <li>就诊科室：{{ mes.deptid }}</li>
                <li>就诊医生：{{ mes.doctorid }}</li>
                <li>处方单号：{{ mes.preid }}</li>
                <li>发药类别：{{ mes.feeid }}</li>
                <li>收费状态：{{ mes.paystatus }}</li>
            </ul> -->
          <el-row>
            <!-- <el-col :span='4'>就诊编号: {{mes.num}}</el-col>
            <el-col :span='1' class="empty">&nbsp;</el-col> -->
            <el-col :span='4'>客户姓名： {{mes.name}}</el-col>
            <el-col :span='1' class="empty">&nbsp;</el-col>
            <el-col :span='4'>客户手机： {{mes.phone}}</el-col>
            <el-col :span='1' class="empty">&nbsp;</el-col>
            <el-col :span='4'>性别： {{mes.gender | SexState}}</el-col>
            <el-col :span='1' class="empty">&nbsp;</el-col>
            <el-col :span='4'>年龄： {{mes.birthdate | birthdatetoage }}</el-col>
          </el-row>
        </div>
        <div class="content">
          <el-table :data="tableData5" style="width: 100%" size='medium' :default-expand-all='true'
          @selection-change="handleSelectionChange" ref='multipleTable'>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item>
                    <el-col :span="2" class="strong">组合</el-col>
                    <el-col :span="5" class="strong">药品名称</el-col>
                    <el-col :span="3" class="strong">药品规格</el-col>
                    <el-col :span="5" class="strong">生产厂家</el-col>
                    <el-col :span="2" class="strong">用法</el-col>
                    <el-col :span="2" class="strong">单次剂量</el-col>
                    <el-col :span="3" class="strong">用药频次</el-col>
                    <el-col :span="2" class="strong">开药数量</el-col>
                  </el-form-item>
                  <el-form-item v-for='(item, index) in props.row.drug_list' :key='index'>
                    <el-col :span="2" class="span">{{ item.group_index_str }}&nbsp;</el-col>
                    <el-col :span="5" class="span">{{ item.name }}&nbsp;</el-col>
                    <el-col :span="3" class="span">{{ item.spec_text }}&nbsp;</el-col>
                    <el-col :span="5" class="span">{{ item.producer }}&nbsp;</el-col>
                    <el-col :span="2" class="span">{{ item.use_method }}&nbsp;</el-col>
                    <el-col :span="2" class="span">{{ item.dosage }}{{ item.dose_unit }}&nbsp;</el-col>
                    <el-col :span="3" class="span">{{ item.frequency }}&nbsp;</el-col>
                    <el-col :span="2" class="span">{{ item.total }}{{ item.total_unit }}&nbsp;</el-col>
                  </el-form-item>
                  <!-- <el-form-item class="useage"  v-if='props.row.type==1'>
                      <span>用法:{{ props.row.useage }}</span>
                      <span>剂数:{{ props.row.dosgemou }}</span>
                      <span>每日剂量:{{ props.row.daydosgemou }}</span>
                      <span>频次:{{ props.row.daytimes }}</span>
                      <span>服用要求:{{ props.row.userule }}</span>
                  </el-form-item> -->
                </el-form>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="props">
                <strong>{{ prescription }}</strong>
                  <strong v-if="props.row.item_type !== 5 ">( 科室: {{ props.row.dept_name | deparment }} , 医生: {{ props.row.doctor }} )</strong>
              </template>
            </el-table-column>
          </el-table>
          <div class="foot">
            <el-button type="primary" size="medium" class="m_l10 fr m_t3 m_r100" @click="deliver">发药</el-button>
            <!-- <el-checkbox v-model="checked" size="small" class="fr">打印发药明细</el-checkbox> -->
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { drugDeliver } from '@apiNormal';
// import connectionTest from '@/common/js/connection';

export default {
  data() {
    return {
      mes: {
        num: '0001',   // 就诊号
        name: '',    // 姓名
        phone: '',  // 手机
        gender: 1,     // 性别
        birthdate: '',   // 年龄
        // doctorid: '',    // 医生
        // preid: '',      // 处方单号
        // feeid: '',   // 发药类别
        // paystatus: '',  // 收费状态
      },
      infoList: [],
      tableData5: [],
      // 是否打印发药明细
      checked: true,
      // 请求发药信息列表传给后台的items
      items: [],
      // 处方名字
      prescription: '处方',
      // 钩选的处方所需要传给后台的数组
      multipleSelection: [],
       // 传到社保的数组
      inputList: [],
      arr2: [], // 分割的药品数组
      // patient_id
      patient_id: '',
      BindSB: false,
    };
  },
  methods: {
    // 判断是否绑定社保
    judgeBindSB() {
      if (this.bindSbMsg && this.bindSbMsg.hospitalCode) {
        this.BindSB = true;
      }
    },
    // 点击发药按钮
    deliver() {
      if (this.multipleSelection.length !== 0) {
        this.$confirm('是否确认发药?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          this.sendMed2();
          // 是否绑定社保 是否打开客户端
          // let flag = false;
          // this.multipleSelection.forEach((value) => {
          //   if (value.paymethod === 5) {
          //     flag = true;
          //   }
          // });
          // if (flag === true) {
          //   const a = await connectionTest();
          //   if (a === '1') {
          //     this.sendMed1();
          //   } else {
          //     this.sendMed2();
          //   }
          // } else {
          //   this.sendMed2();
          // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发药',
            showClose: true,
            duration: 1000,
          });
        });
      } else {
        this.$message({
          showClose: true,
          duration: 1000,
          message: '请勾选药品',
          type: 'error',
        });
      }
    },
    // 创建传到社保的发药数组
    makeSBList(arr) {
      const inputList = [];
      this.infoList.forEach((vali) => {
        arr.forEach((vala) => {
          if (vali.item_id === vala.item_id) {
            vali.drug_list.forEach((vali1) => {
              vala.drug_list.forEach((vala1) => {
                if (vali1.druginfo && vali1.druginfo.ake001 && vali1.druginfo.ake001 !== '' && vali1.druginfo.szsbstatus === 1) {
                  const str1 = vali1.druginfo.drug_key;
                  const str2 = vala1.drugkey;
                  if (str1 === str2) {
                    const obj = {
                      push_id: Number(vala1.push_id), // 批号
                      business_type: '1', // 业务类别
                      pres_sno: vali.danju, // 处方号（单据号）
                      record_sno: vali.danju + vali1.druginfo.standard_number, // 发药序列号
                      standard_code: vali1.druginfo.standard_number, // 药品本位码
                      drug_code: vali1.druginfo.ake001, // 药品-编码
                      drug_name: vali1.druginfo.product_name, // 药品-名称
                      drug_std: vali1.druginfo.aka074, // 药品-规格
                      unit: vali1.total_unit, // 发药单位
                      numbers: vali1.total, // 数量
                      amount: vali1.druginfo.shebao_price, // 金额
                      out_recordtime: Number(new Date().format('yyyyMMdd')), // 发(退)药日期
                      last_editedtime: Number(new Date().format('yyyyMMddhhmmss')), // POS最后编辑时间
                    };
                    inputList.push(obj);
                    this.inputList = inputList;
                    // console.log(this.inputList);
                  }
                }
              });
            });
          }
        });
      });
      this.runSb();
    },
    // 调社保客户端
    ToSocialSecurity(arr) {
      // console.log(arr);
      httpServerNormal(drugDeliver, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length === 0) {
            this.$message({
              showClose: true,
              duration: 1000,
              message: '发药成功！',
              type: 'success',
            });
            setTimeout(() => {
              this.$router.back();
            }, 800);
          } else {
            this.midTransit();
          }
        }
      });
    },
    // 分割与调社保之间的中间函数
    midTransit() {
      if (this.arr2.length > 0) {
        this.makeList(this.arr2);
      } else {
        this.ToSocialSecurity();
      }
    },
    // 分割药品数组并调社保客户端
    makeList(arr) {
      if (arr.length > 50) {
        const arrInside = arr.slice(0, 49);
        const arr2Inside = arr.slice(50);
        this.arr2 = arr2Inside;
        this.ToSocialSecurity(arrInside);
      } else {
        this.ToSocialSecurity(arr);
        this.arr2 = [];
      }
    },
    // 选中的发药处方
    handleSelectionChange(val) {
      this.multipleSelection = [];
      this.infoList = val;
      val.forEach((tt) => {
        this.multipleSelection.push({
          item_id: tt.item_id,
          item_type: tt.item_type,
          regist_id: tt.regist_id,
          paymethod: tt.paymethod,
        });
      });
    },
    // 调自己系统的发药接口1
    sendMed1() {
      this.$http.post('/service/drugdeliver/deliver', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic, // 必填
          items: this.multipleSelection,  // 钩选的处方所需要传给后台的数组
          patient_id: this.patient_id,
          patient_name: this.mes.name,  // 客户名字
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.makeSBList(res.data.data.items);
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            message: res.data.errmsg,
            type: 'error',
          });
        }
      }).catch();
    },
    // 调自己系统的发药接口2
    sendMed2() {
      this.$http.post('/service/drugdeliver/deliver', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic, // 必填
          items: this.multipleSelection,  // 钩选的处方所需要传给后台的数组
          patient_id: this.patient_id,
          patient_name: this.mes.name,  // 客户名字
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '发药成功！',
            type: 'success',
          });
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            duration: 1000,
            message: res.data.errmsg,
            type: 'error',
          });
        }
      }).catch();
    },
    // 执行调社保的函数
    runSb() {
      if (this.inputList.length > 50) {
        const arrInside = this.inputList.slice(0, 49);
        const arr2Inside = this.inputList.slice(50);
        this.arr2 = arr2Inside;
        this.ToSocialSecurity(arrInside);
      } else {
        this.ToSocialSecurity(this.inputList);
        this.arr2 = [];
      }
    },
    // 全选
    // toggleSelection(val) {
    //   this.multipleSelection = [];
    //   val.forEach((tt) => {
    //     this.multipleSelection.push({
    //       item_id: tt.item_id,
    //       item_type: tt.item_type,
    //       regist_id: tt.regist_id,
    //     });
    //   });
    // },
    // 发药信息列表
    deliverinfo() {
      this.$http.post('/service/drugdeliver/info', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic, // 必填
          items: this.items,
        },
      }).then((res) => {
        this.tableData5 = res.data.data.items;
        this.patient_id = res.data.data.patient_id;
        this.mes.gender = res.data.data.patient_gender;
        this.mes.birthdate = res.data.data.patient_birthday;
      }).catch(() => {
      });
    },
  },
  created() {
    this.purchrecodecreate.val.forEach((tt) => {
      this.items.push({
        item_id: tt.item_id,
        item_type: tt.item_type,
        regist_id: tt.regist_id,
      });
    });
    this.mes.name = this.purchrecodecreate.val[0].patient_name;
    this.mes.phone = this.purchrecodecreate.val[0].patient_phone;
    this.deliverinfo();
    this.judgeBindSB();
  },
  computed: {
    ...mapGetters(['purchrecodecreate', 'clinic', 'token', 'bindSbMsg']),
  },
  beforeDestroy() {
    this.$store.commit('send_purchrecodecreate', '');
  },
  filters: {
    prescription(type) {
      if (type === 0) {
        return '西药处方';
      }
      if (type === 1) {
        return '中药处方';
      }
    },
    SexState(gender) {
      if (gender === 1) {
        return '男';
      }
      if (gender === 2) {
        return '女';
      }
    },
    birthdatetoage(birthdate) {
      if (birthdate !== '') {
        return new Date().format('yyyy') - birthdate.split('-')[0];
      }
      if (birthdate === '') {
        return '';
      }
    },
    deparment(depar) {
      if (depar === '') {
        return '未指定';
      }
      if (depar !== '') {
        return depar;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Pills{
    position: relative;
    padding: 30px 40px;
    .el-row{ line-height: 30px; }
    .header{
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      .el-row{
          margin-bottom: 10px;
      }
    }
.content{
    width:   100%;
    min-width: 800px;
    margin-top: 20px;
    padding-bottom: 10px;
    .useage{
        height: 60px;
    }
    .el-form-item{
        margin-bottom: 0;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px dashed #ccc;
        .el-form-item__content{
          height: 40px;
        }
        .strong{
          font-weight: bold;
        }
        // strong,span{
        //   display: inline-block;
        //   text-align: center;
        //   width: 100px;
        //   margin-right: 30px;
        //   overflow: hidden;
        //   white-space: nowrap;
        //   text-overflow: ellipsis;
        //   &:nth-of-type(2){
        //     width: 180px;
        //   }
        //   &:nth-of-type(3){
        //     width: 180px;
        //   }
        //   &:nth-of-type(4){
        //     width: 180px;
        //   }
        // }
    }
  }
}
.m_l10{
  margin-left: 10px;
}
.el-table__row.expanded{
  background-color: #ccc;
}
.m_t10{
  margin-top: 10px;
}
.fr{
  float: right;
}
.l_h40{
  line-height: 40px;
}
.m_t3{
  margin-top: 3px;
}
.foot{
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
}
.m_r100{
  margin-right: 100px;
}
</style>

