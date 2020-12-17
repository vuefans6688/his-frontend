<template>
  <div class="retMed">
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
        <el-col :span='4'>年龄： {{mes.birthdate | birthdatetoage}}</el-col>
      </el-row>
    </div>
    <div class="content">
      <el-table :data="tableData5" style="width: 100%" size='medium' :default-expand-all='true'
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" v-if='!donot' :selectable='selectable'></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item>
                <strong>组合</strong>
                <strong>药品名称</strong>
                <strong>药品规格</strong>
                <strong>生产厂家</strong>
                <strong>用法</strong>
                <strong>单次剂量</strong>
                <strong>用药频次</strong>
                <strong>开药数量</strong>
              </el-form-item>
              <el-form-item v-for='(item, index) in props.row.drug_list' :key='index'>
                <span>{{ item.group_index_str }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.spec_text }}</span>
                <span>{{ item.producer }}</span>
                <span>{{ item.use_method }}</span>
                <span>{{ item.dosage }}{{ item.dose_unit }}</span>
                <span>{{ item.frequency }}</span>
                <span>{{ item.total }}{{ item.total_unit }}</span>
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
            <strong>( 科室: {{ props.row.dept_name | deparment }} , 医生: {{ props.row.doctor }} )</strong>
            <span class="red" v-if="props.row.status === 3">已退药</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot">
        <!-- <el-button type="danger" size="medium" class="m_l10 fr m_t3 m_r100" :disabled='donot' @click="deleteSb" v-if="BindSB">撤销社保发药</el-button> -->
        <el-button type="primary" size="medium" class="m_l10 fr m_t3" :disabled='donot' @click="deliverback">退药</el-button>
        <!-- <el-checkbox v-model="checked" size="small" class="fr">打印退药明细</el-checkbox> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { drugDeliver, drugDeleteStore } from '@apiNormal';
// import connectionTest from '@/common/js/connection';

export default{
  data() {
    return {
      mes: {
        num: '',   // 就诊号
        name: '',    // 姓名
        phone: '',  // 手机
        gender: '',     // 性别
        birthdate: '',   // 年龄
        // doctorid: '',    // 医生
        // preid: '',      // 处方单号
        // feeid: '',   // 发药类别
        // paystatus: '',  // 收费状态
      },
      tableData5: [],
      // 是否打印退药明细
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
      // 传到后台的创建时间
      createTime: '',
      // patient_id
      patient_id: '',
      // 根据drug_opstype设置可用不可用
      donot: true,
      // 发药单号
      deliver_sn: '',
      BindSB: false,
    };
  },
  methods: {
    // 勾选需要的药品
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
    // 判断是否绑定社保
    judgeBindSB() {
      if (this.bindSbMsg && this.bindSbMsg.hospitalCode) {
        this.BindSB = true;
      }
    },
    selectable(row) {
      return row.status !== 3;
    },
    // 点击退药操作
    deliverback() {
      if (this.multipleSelection.length !== 0) {
        this.$confirm('是否确认退药?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          // 是否绑定社保 是否打开客户端
          this.retDback();
          // let flag = false;
          // this.multipleSelection.forEach((value) => {
          //   if (value.paymethod === 5) {
          //     flag = true;
          //   }
          // });
          // if (flag === true) {
          //   const a = await connectionTest();
          //   if (a === '1') {
          //     this.makeSBList(); // 调社保客户端
          //   } else {
          //     this.retDback(); // 调his退药接口
          //   }
          // } else {
          //   this.retDback(); // 调his退药接口
          // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退药',
          });
        });
      } else {
        this.$message.error('请勾选药品');
      }
    },
    // 请求已发药的药品信息
    recordinfo() {
      this.$http.post('/service/drugdeliver/recordinfo', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic, // 必填
          create_time: this.createTime,
        },
      }).then((res) => {
        this.tableData5 = res.data.data.items;
        this.patient_id = res.data.data.items[0].patient_id;
        this.mes.gender = res.data.data.items[0].patient_gender;
        this.mes.birthdate = res.data.data.items[0].patient_birthday;
        // 默认禁用，只要一个处方的状态为2，就解除禁用（2是已发药，3已退药，4是已退费）
        for (let i = 0; i < res.data.data.items.length; i++) {
          if (res.data.data.items[i].status === 2) {
            this.donot = false;  //  解除禁用
          }
        }
      }).catch(() => {
      });
    },
    // 退药接口函数
    retDback() {
      this.$http.post('/service/drugdeliver/dback', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
        },
        body: {
          clinic_id: this.clinic, // 必填
          items: this.multipleSelection,  // 钩选的处方所需要传给后台的数组
          patient_id: this.patient_id,
          patient_name: this.mes.name,
          deliver_sn: this.deliver_sn,
        },
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.$message({
            message: '退药成功',
            type: 'success',
          });
          setTimeout(() => {
            this.$router.back();
          }, 800);
        } else {
          this.$message.error('该药品已退');
        }
      }).catch();
    },
    // 创建传到社保的发药数组
    makeSBList() {
      const inputList = [];
      this.infoList.forEach((val) => {
        val.drug_list.forEach((valin) => {
          if (valin.druginfo && valin.druginfo.ake001 && valin.druginfo.ake001 !== '') {
            const obj = {
              push_id: Number(valin.push_id), // 批号
              business_type: '1', // 业务类别
              pres_sno: val.danju, // 处方号（单据号）
              record_sno: valin.danju + valin.druginfo.standard_number, // 发药序列号
              standard_code: valin.druginfo.standard_number, // 药品本位码
              drug_code: valin.druginfo.ake001, // 药品-编码
              drug_name: valin.druginfo.product_name, // 药品-名称
              drug_std: valin.druginfo.aka074, // 药品-规格
              unit: valin.total_unit, // 发药单位
              numbers: -valin.total, // 数量
              amount: valin.druginfo.shebao_price, // 金额
              out_recordtime: Number(new Date().format('yyyyMMdd')), // 发(退)药日期
              last_editedtime: Number(new Date().format('yyyyMMddhhmmss')), // POS最后编辑时间
            };
            inputList.push(obj);
            this.inputList = inputList;
          }
        });
      });
      this.runSb();
    },
    // 调社保客户端
    ToSocialSecurity(arr) {
      httpServerNormal(drugDeliver, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length === 0) {
            this.retDback();
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
    // 点击撤销社保
    deleteSb() {
      if (this.multipleSelection.length !== 0) {
        const inputList = [];
        this.infoList.forEach((val) => {
          val.drug_list.forEach((valin) => {
            if (valin.druginfo && valin.druginfo.ake001 && valin.druginfo.ake001 !== '') {
              const obj = {
                revoke_type: '3', // 撤销类型
                push_id: Number(valin.push_id), // 批号
                pres_sno: val.danju, // 单据号
              };
              inputList.push(obj);
              this.inputList = inputList;
            }
          });
        });
        // 开始撤销医保库存
        if (this.inputList.length > 50) {
          const arrInside = this.inputList.slice(0, 49);
          const arr2Inside = this.inputList.slice(50);
          this.arr2 = arr2Inside;
          this.deleteShebao(arrInside);
        } else {
          this.deleteShebao(this.inputList);
          this.arr2 = [];
        }
      } else {
        this.$message.error('请勾选药品');
      }
    },
    // 调撤销社保库存清点
    deleteShebao(arr) {
      httpServerNormal(drugDeleteStore, {
        transBody: {
          listsize: arr.length,
          inputList: arr,
        },
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (this.arr2.length > 0) {
            this.makeListDelete(this.arr2);
          }
        }
      });
    },
    // 撤销分割药品数组并调社保客户端
    makeListDelete(arr) {
      if (arr.length > 50) {
        const arrInside = arr.slice(0, 49);
        const arr2Inside = arr.slice(50);
        this.arr2 = arr2Inside;
        this.deleteShebao(arrInside);
      } else {
        this.deleteShebao(arr);
        this.arr2 = [];
      }
    },
  },
  created() {
    this.createTime = this.purchrecodecreate.val.create_time.toString();
    this.mes.name = this.purchrecodecreate.val.name;
    this.mes.phone = this.purchrecodecreate.val.phone;
    this.deliver_sn = this.purchrecodecreate.val.deliver_sn;
    this.recordinfo();
    this.judgeBindSB();
  },
  computed: {
    ...mapGetters(['purchrecodecreate', 'clinic', 'token', 'bindSbMsg']),
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
      return new Date().format('yyyy') - birthdate.split('-')[0];
    },
    deparment(depar) {
      if (depar === '') {
        return '没有指定科室';
      }
      if (depar !== '') {
        return depar;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.retMed{
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
    width: 100%;
    min-width: 1420px;
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
        strong,span{
          display: inline-block;
          text-align: center;
          width: 100px;
          margin-right: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-of-type(2){
            width: 180px;
          }
          &:nth-of-type(3){
            width: 180px;
          }
          &:nth-of-type(4){
            width: 180px;
          }
        }
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
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
}
.m_r100{
  margin-right: 100px;
}
.red{
  color: red;
}
</style>
