<template>
  <div class="newinfusionformulation">
    <div class="header">
      <h2 class="d_inl">新增输液处方模板</h2>
      <div class="btn fr d_inl">
        <el-button type="primary" @click="submit('form')" size="small">保存</el-button>
        <el-button type="warning" @click="cancel" size="small">取消</el-button>
      </div>
    </div>

    <div class="content">
      <el-form :model="form" ref="form" align='center' :rules="rules_infu_presc_tpl" inline-message>
        <el-form-item label="模板名称:" prop="name" align='left' label-width="90px" :rules="{ required: true, message: '请输入模板名称', trigger: 'blur,change' }">
          <el-input v-model="form.name" size="small" class="w_300"></el-input>
        </el-form-item>
        <el-form-item label="模板类型:" align='left' label-width="90px">
          <el-radio-group v-model="form.owner_type_str">
          <el-radio label="个人"></el-radio>
          <el-radio label="通用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="m_b10"><h3 align='left'>处方内容</h3></div>

        <div class="WestMedicineStyle">
          <el-form class="demo-form-inline prescriptionInputs" align='center' size='small' :model="form.data" ref="groupList">
            <el-form-item v-for="(group, index1) in form.data.groupList" :key='index1'>
              <template solt-scope='scope'>
                <el-form-item align='left'>
                  <div class="team1">
                    <strong>组{{ index1 + 1 }}</strong>
                    <span @click="delGroup(index1)">删除该组</span>
                    <span @click="addGroup()">新增输液组</span>
                  </div>
                </el-form-item>
              </template>
              <!-- 第零行  -->
              <el-form-item class="line0">
                <el-row class="preContentul">
                  <el-col :span="2">序号</el-col>
                  <el-col :span="6">药品名称</el-col>
                  <el-col :span="4">规格</el-col>
                  <el-col :span="4">单次剂量</el-col>
                  <el-col :span="2">皮试</el-col>
                  <el-col :span="4">数量</el-col>
                  <el-col :span="2">操作</el-col>
                </el-row>
              </el-form-item>
              <!--第一行  -->
              <el-form-item v-for="(item, index2) in group.drug_list" :key='index2' class="line1">
                <!-- 序号  -->
                <el-col :span="2">
                  <el-form-item>
                    <span>{{ (index2 + 1) }}</span>
                  </el-form-item>
                </el-col>
                <!--药品名称  -->
                <el-col :span="6">
                  <el-form-item >
                    <el-autocomplete popper-class="my-autocomplete" v-model="item.name" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名"
                      @select="westNameSelect($event, index1, index2)" :trigger-on-focus="false" valueKey='name' @blur="checkName(index1, index2)">
                      <template slot-scope="props">
                        <div class="thinkName">
                          {{ props.item.drug_name }}<span class="spec"> {{ props.item.spec_text }}</span>
                          <p class="phone">{{ props.item.producer }}</p>
                        </div>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <!-- 规格 -->
                 <el-col :span="4">
                  <el-form-item>
                    <!-- <span>{{ item.spec_text }}</span> -->
                    <el-input v-model="item.spec_text" class="inlineBlock" placeholder="药品规格"></el-input>
                  </el-form-item>
                </el-col>
                <!--单次剂量  -->
                <el-col :span="2">
                  <el-form-item>
                    <el-input v-model="item.dosage" size="small" :maxlength="8"  @keyup.native="floatLimitDrug('dosage', 4)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item>
                    <!-- 输液可以选择单位 -->
                    <el-select v-if="item.specs && item.specs.unit_large" v-model="item.dose_unit" class="my-autocomplete" size="small" >
                      <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                      <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                      <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
                    </el-select>
                    <el-autocomplete v-if="!item.specs || !item.specs.unit_large" popper-class="my-autocomplete" size="small" v-model="item.dose_unit" valueKey="name" :fetch-suggestions="doseunitSearch" placeholder="剂量单位"></el-autocomplete>
                  </el-form-item>
                </el-col>
                <!-- 皮试 -->
                <el-col :span="2">
                  <el-form-item >
                    <el-checkbox v-model="item.skin_test" :true-label="1" :false-label="0" class="elCheckBox"></el-checkbox>
                  </el-form-item>
                </el-col>
                <!--数量  -->
                <el-col :span="2">
                  <el-form-item>
                    <el-input v-model="item.total" size="small" class="inlineBlock" @keyup.native="numberLimitDrug('total')" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item>
                    <el-select v-if="item.specs && item.specs.unit_large" v-model="item.total_unit" class="my-autocomplete" size="small" placeholder="单位">
                      <el-option :label="item.specs.unit_large.specs_name" :value="item.specs.unit_large.specs_name" />
                      <el-option :label="item.specs.unit_middle.specs_name" :value="item.specs.unit_middle.specs_name" />
                      <el-option v-if="item.specs.unit_primary.specs_name" :label="item.specs.unit_primary.specs_name" :value="item.specs.unit_primary.specs_name" />
                    </el-select>
                    <el-autocomplete v-if="!item.specs || !item.specs.unit_large" popper-class="my-autocomplete" size="small" v-model="item.total_unit" valueKey="name" :fetch-suggestions="totalUnitSearch" placeholder="单位"></el-autocomplete>
                  </el-form-item>
                </el-col>
                <!--操作  -->
                <el-col :span="2">
                  <el-form-item prop="temperature">
                    <i class="el-icon-delete" @click="del(index1, index2)"></i>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item align='left'>
                <span class='addinputs' @click="addDrugItem(index1)">
                   <i class="el-icon-circle-plus-outline"></i>
                   增加一行
                </span>
              </el-form-item>

              <!--第二行  -->
              <el-form-item align="left" class="line2">
                <!--用法  -->
                <el-col :span="6">
                  <el-form-item class="dose2">
                    <span class="spans">用法：</span>
                    <el-autocomplete popper-class="my-autocomplete" v-model="group.use_method" valueKey="name" :fetch-suggestions="medAskForSearch" placeholder="请输入用法"></el-autocomplete>
                  </el-form-item>
                  <!--频次  -->
                </el-col>
                <el-col :span="6">
                  <el-form-item  class="dose2">
                    <span>频次：</span>
                    <el-autocomplete popper-class="my-autocomplete2" v-model="group.frequency" valueKey="name" :fetch-suggestions="TimesSearch" placeholder="请输入频次"></el-autocomplete>
                  </el-form-item>
                </el-col>
                <!--滴速  -->
                <el-col :span="6">
                  <el-form-item class="prescriptionInputs dose3">
                    <span>滴速：</span>
                    <el-input class="inlineBlock"  v-model="group.infusion_speed" @keyup.native="floatLimitGroup('infusion_speed', 4)"></el-input>
                    <el-autocomplete popper-class="my-autocomplete" v-model="group.infu_speed_unit" valueKey="name" :fetch-suggestions="infuSpeedUnitSearch" placeholder="滴速"></el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item  class="dose2">
                    <span class="spans">连续天数：</span>
                      <el-input v-model="group.days" @keyup.native="numberLimitGroup('days')"></el-input>
                      <span class="spans">天</span>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { numberLimit, floatLimit } from '@/utils/inputLimit';
  import deepcopy from '@/utils/deepcopy';
  import httpServerNormal from '@httpServerNormal';
  import { presSearchDrug, presDrugInfo } from '@apiNormal';

  const TplTypeNames = [
    '',
    '门诊病历',
    '西/成药',
    '中药',
    '输液',
  ];

  export default {
    data() {
      return {
        rules_infu_presc_tpl: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { max: 64, message: '模板名称长度不超过64个字符', trigger: 'blur' },
          ],
        },

        // 表单数据
        form: {
          clinic_id: '',
          template_id: '',
          name: '',  // 模板名字
          type: -1,  // 类型默认值
          owner_type_str: '',  // 模板类型
          owner_type: 0, // 类型整数，默认个人
          data: {
            // 输液组合
            groupList: [{
              use_method: '',
              frequency: '',
              infusion_speed: 0.0,
              infu_speed_unit: '',
              begin_date: new Date(), // this.dateString(new Date()),
              days: '',
              drug_list: [{
                drug_id: 'none',
                drug_type: 0,
                name: '',
                spec_text: '',
                dosage: '',
                dose_unit: '',
                skin_test: 0,
                total: '',
                total_unit: '',
              }],
            }],
          },
        },

        title: '新增输液处方模板',
        isNew: true,

        isDisabled: false,   // 禁用表单
        tcmUsage: [
          { name: '静脉注射' },
          { name: '静脉滴注' },
          { name: '皮下注射' },
          { name: '肌肉注射' },
          { name: '皮内注射' },
          { name: '静脉推注' },
          { name: '体腔内注射' },
          { name: '动脉注射' },
          { name: '内心注射' },
        ],
        doseUnit: [
          { name: 'g' },
          { name: 'mg' },
          { name: 'ml' },
          { name: 'ug' },
          { name: '板' },
          { name: '小包' },
          { name: '小袋' },
          { name: '粒' },
          { name: '片' },
          { name: '枚' },
          { name: '张' },
          { name: '贴' },
          { name: '支' },
          { name: '只' },
          { name: '饼' },
          { name: '袋' },
          { name: '盒' },
          { name: '桶' },
          { name: '单位' },
          { name: '万单位' },
          { name: '把' },
          { name: '%' },
        ],
        totalUnit: [
          { name: '盒' },
          { name: '袋' },
          { name: '包' },
          { name: 'ug' },
          { name: 'mg' },
          { name: 'ml' },
          { name: 'kg' },
          { name: 'g' },
          { name: '单位' },
          { name: '瓶' },
          { name: '桶' },
          { name: '万单位' },
          { name: '把' },
          { name: '板' },
          { name: '小包' },
          { name: '小袋' },
          { name: '粒' },
          { name: '枚' },
          { name: '片' },
          { name: '张' },
          { name: '只' },
          { name: '支' },
          { name: '贴' },
          { name: '%' },
        ],
        // 使用频率
        tcmTimes: [
          { name: '每日一次(qd)', index: 1 },
          { name: '每日二次(bid)', index: 2 },
          { name: '每日三次(tid)', index: 3 },
          { name: '每日四次(qid)', index: 4 },
          { name: '隔日一次(qod)', index: 5 },
          { name: '必要时(prn)', index: 6 },
          { name: '每周一次(pw)', index: 7 },
          { name: '立即(st)', index: 8 },
        ],
        infuSpeedUnit: [
          { name: 'g/分钟' },
          { name: 'ug/分钟' },
          { name: '滴/分钟' },
          { name: 'ml/分钟' },
          { name: 'ml/小时' },
          { name: '分钟/次' },
        ],
      };
    },
    methods: {
      dateString(date) {
        const year = (1900 + date.getYear()) * 10000;
        const month = (1 + date.getMonth()) * 100;
        const day = date.getDate();
        const str = '' + (year + month + day);
        return (str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2));
      },
      checkName(index1, index2) {  // 检验名字
        const medList = this.form.data.groupList[index1].drug_list[index2];
        if (medList.name !== medList.medName) {
          medList.drug_id = 'none';
        }
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save();
          } else {
            this.$message({ message: '请填写相关信息', type: 'warning', showClose: true, duration: 1000 });
            return false;
          }
        });
      },
      doseunitSearch(queryString, cb) {  // 剂量单位联想
        // const westUsageArr = this.doseUnit;
        const results = queryString ? this.doseUnit.filter(this.createFilter(queryString)) : this.doseUnit;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      initData() {
        const data = this.$route.params.data;
        const tplType = this.$route.params.tplType;
        if (tplType === undefined) {
          this.goback();
        }
        if (!data) {
          this.title = '新增' + TplTypeNames[tplType] + '模板';
          this.isNew = true;
          this.form.owner_type = 0;
          this.form.type = tplType;
          this.form.owner_type_str = '个人';
        } else {
          this.title = '修改' + TplTypeNames[tplType] + '模板';
          this.isNew = false;

          // this.form.data = data.data;
          this.parseResponseData(data);

          this.form.type = tplType;
          this.form.name = data.name;
          this.form.owner_type_str = (data.owner_type === 0 || data.owner_type === '个人模板') ? '个人' : '通用';
          this.form.template_id = data.template_id;
        }
      },
      validateDrugName(str) {
        if (!str || str.length > 64) {
          this.$message({ message: '请输入药品名称', type: 'error', showClose: true, duration: 1000 });
        }

        if (str.length > 64) {
          this.$message({ message: '药品名称长度不能超过64个字符', type: 'error', showClose: true, duration: 1000 });
        }
      },
      goback() {
        this.$router.back();
      },
      cancel() {
        this.$confirm('是否取消保存?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        }).then(() => {
          this.$router.back();
        }).catch(() => {});
      },
      // 中药使用频率联想
      TimesSearch(queryString, cb) {
        const Medicine = this.tcmTimes;
        const results = queryString ? Medicine.filter(this.createFilter(queryString))
          : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 中药特殊要求联想
      medAskForSearch(queryString, cb) {
        const Medicine = this.tcmUsage;
        const results = queryString ? Medicine.filter(this.createFilter(queryString))
          : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      doesUnitSearch(queryString, cb) {
        const Medicine = this.doseUnit;
        const results = queryString ? Medicine.filter(this.createFilter(queryString))
          : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      totalUnitSearch(queryString, cb) {
        const Medicine = this.totalUnit;
        const results = queryString ? Medicine.filter(this.createFilter(queryString)) : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      infuSpeedUnitSearch(queryString, cb) {
        const Medicine = this.infuSpeedUnit;
        const results = queryString ? Medicine.filter(this.createFilter(queryString))
          : Medicine;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      validateAllInputs() {
        if (!this.form.name) {
          return '请输入模板名称';
        }
        if (this.form.name.length > 64) {
          return '模板名称长度不能超64个字符';
        }

        for (let n = 0; n < this.form.data.groupList.length; n++) {
          for (let i = 0; i < this.form.data.groupList[n].drug_list.length; i++) {
            const v = this.form.data.groupList[n].drug_list[i];
            const preStr = '第' + (n + 1) + '组第' + (i + 1) + '行';
            if (!v.name) {
              return preStr + '请输入药品名称';
            }
          }
          const v = this.form.data.groupList[n];
          v.infusion_speed = parseFloat(v.infusion_speed, 10);
          v.days = parseInt(v.days, 10);
        }

        for (let n = 0; n < this.form.data.groupList.length; n++) {
          for (let i = 0; i < this.form.data.groupList[n].drug_list.length; i++) {
            const v = this.form.data.groupList[n].drug_list[i];
            v.group_index_str = '' + (n + 1);
            v.use_method = this.form.data.groupList[n].use_method;
            v.frequency = this.form.data.groupList[n].frequency;
            v.infusion_speed = this.form.data.groupList[n].infusion_speed;
            v.infu_speed_unit = this.form.data.groupList[n].infu_speed_unit;
            v.begin_date = this.form.data.groupList[n].begin_date;
            v.days = this.form.data.groupList[n].days;
          }
        }
        return '';
      },
      makePostData() {
        const data = { drug_list: [] };
        for (let n = 0; n < this.form.data.groupList.length; n++) {
          for (let i = 0; i < this.form.data.groupList[n].drug_list.length; i++) {
            data.drug_list.push(this.form.data.groupList[n].drug_list[i]);
          }
        }
        const formData = deepcopy(this.form);
        formData.data = data;
        return formData;
      },
      parseResponseData(resp) {
        this.form.create_time = resp.create_time;
        this.form.creator_id = resp.creator_id;
        this.form.name = resp.name;
        this.form.owner_type = resp.owner_type;
        this.form.template_id = resp.template_id;
        this.form.type = resp.type;

        const data = { groupList: [] };
        for (let i = 0; i < resp.data.drug_list.length; i++) {
          const n = parseInt(resp.data.drug_list[i].group_index_str, 10);
          if (n > data.groupList.length) { // 新增组
            for (let k = 0; k < (n - data.groupList.length); k++) {
              const json = {
                use_method: '',
                frequency: '',
                infusion_speed: 0.0,
                infu_speed_unit: '',
                begin_date: '',
                days: 0,
                drug_list: [],
              };
              data.groupList.push(json);
            }
          }

          const group = data.groupList[n - 1];
          group.use_method = resp.data.drug_list[i].use_method;
          group.frequency = resp.data.drug_list[i].frequency;
          group.infusion_speed = resp.data.drug_list[i].infusion_speed;
          group.infu_speed_unit = resp.data.drug_list[i].infu_speed_unit;
          group.begin_date = new Date(Date.parse(resp.data.drug_list[i].begin_date));
          group.days = resp.data.drug_list[i].days;
          group.drug_list.push(resp.data.drug_list[i]);
        }

        this.form.data = data;
      },
      save() {
        // 字符串转化为数字
        this.stringNumber();
        this.form.clinic_id = this.clinic;
        if (this.form.owner_type_str === '通用') {
          this.form.owner_type = 1;
        } else {
          this.form.owner_type = 0;
        }
        const errMsg = this.validateAllInputs();
        if (errMsg) {
          this.$message({ message: errMsg, type: 'error', showClose: true, duration: 1000 });
          return;
        }

        const url = this.isNew ? '/service/template/create' : '/service/template/modify';
        const data = {
          head: {
            accessToken: this.token,
            lastnotice: 0,
            msgid: '',
          },
          body: this.makePostData(),
        };
        this.$http.post(url, data).then((response) => {
          const res = response.data;
          if (res.errcode === 0 && res.data && res.data.clinic_id === this.clinic) {
            this.$message({ message: '保存成功', type: 'success', showClose: true, duration: 1000 });
            this.$router.back();
          } else if (res.errcode !== 0) {
            this.$message({ message: res.errmsg, type: 'error', showClose: true, duration: 1000 });
          }
        }).catch();
      },
      // 限制drug数字输入
      numberLimitDrug(str) {
        this.form.data.groupList.forEach((group, index1) => {
          group.drug_list.forEach((drug, index2) => {
            this.form.data.groupList[index1].drug_list[index2][str] = numberLimit(drug[str]);
          });
        });
      },
      // 限制药的小数输入
      floatLimitDrug(str, bit) {
        this.form.data.groupList.forEach((group, index1) => {
          group.drug_list.forEach((drug, index2) => {
            this.form.data.groupList[index1].drug_list[index2][str] = floatLimit(drug[str], bit);
          });
        });
      },
      // 限制组的小数输入
      floatLimitGroup(str, bit) {
        this.form.data.groupList.forEach((group, index) => {
          this.form.data.groupList[index][str] = floatLimit(group[str], bit);
        });
      },
      // 限制组数字输入
      numberLimitGroup(str) {
        this.form.data.groupList.forEach((group, index) => {
          this.form.data.groupList[index][str] = numberLimit(group[str]);
        });
      },
      delGroup(index) {
        if (this.form.data.groupList.length <= 1) {
          this.$message({ message: '最少保留一个组', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        this.form.data.groupList.splice(index, 1);
      },
      addGroup() {
        if (this.form.data.groupList.length >= 64) {
          this.$message({ message: '单个处方最多64个分组', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        const json = {
          use_method: '',
          frequency: '',
          infusion_speed: 0.0,
          infu_speed_unit: '',
          begin_date: new Date(), // this.dateString(new Date()),
          days: '',
          drug_list: [{
            drug_id: 'none',
            drug_type: 0,
            name: '',
            spec_text: '',
            dosage: '',
            dose_unit: '',
            skin_test: 0,
            total: '',
            total_unit: '',
          }],
        };
        this.form.data.groupList.push(json);
      },
      addDrugItem(index1) {
        let flag = true;
        this.form.data.groupList[index1].drug_list.forEach((val) => {
          if (!val.name) {
            flag = false;
          }
        });
        if (!flag) {
          this.$message({ message: '内容为空不能新增一行', type: 'warning', showClose: true, duration: 1000 });
          return;
        }
        if (this.form.data.groupList[index1].drug_list.length >= 64) {
          this.$message({ message: '单个处方最多64种药品', type: 'error', showClose: true, duration: 1000 });
          return;
        }
        const json = {
          drug_id: 'none',
          drug_type: 0,
          name: '',
          spec_text: '',
          dosage: '',
          dose_unit: '',
          skin_test: 0,
          total: '',
          total_unit: '',
        };
        this.form.data.groupList[index1].drug_list.push(json);
      },
      del(index1, index2) {
        if (this.form.data.groupList[index1].drug_list.length <= 1) {
          this.form.data.groupList[index1].drug_list = [{
            drug_id: 'none',
            drug_type: 0,
            name: '',
            spec_text: '',
            dosage: '',
            dose_unit: '',
            skin_test: 0,
            total: '',
            total_unit: '',
          }];
          return;
        }
        this.form.data.groupList[index1].drug_list.splice(index2, 1);
      },
      // 联想
      querySearchAsync(queryString, cb) { // 药名联想
        clearTimeout(this.timeout);
        httpServerNormal(presSearchDrug, {
          drug_name: queryString,
          drug_type: 0,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (!res.data) {  // 联想无则返回空
              cb([]);
            } else {
              cb(res.data);
            }
          }
        }).catch(() => {
          cb([]);
        });
      },
      usageSearch(queryString, cb) {  // 用法联想
        const westUsageArr = this.Usage;
        const results = queryString ? westUsageArr.filter(this.createFilter(queryString))
          : westUsageArr;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      timesSearch(queryString, cb) {  // 用药频次联想
        const timesArr = this.frequency;
        const results = queryString ? timesArr.filter(this.createFilter(queryString))
          : timesArr;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (array) => {
          return (array.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      // 西药名称选择事件
      westNameSelect(item, index1, index2) {
        this.form.data.groupList[index1].drug_list[index2].name = item.drug_name;
        this.form.data.groupList[index1].drug_list[index2].drug_id = item.drug_id;
        this.form.data.groupList[index1].drug_list[index2].medName = item.drug_name;  // 保存药名检测
        httpServerNormal(presDrugInfo, {
          drug_id: item.drug_id,
        }).then((res) => {
          if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
            if (res) {
              this.validation = false;
              this.form.data.groupList[index1].drug_list[index2].spec_text = res.specs_txt;
              this.form.data.groupList[index1].drug_list[index2].specs = res.specs;
              this.form.data.groupList[index1].drug_list[index2].use_method = res.yongfa;
              this.form.data.groupList[index1].drug_list[index2].dosage = res.useunit.specs_unit || '';
              this.form.data.groupList[index1].drug_list[index2].dose_unit = res.useunit.specs_name;
              this.form.data.groupList[index1].drug_list[index2].days = res.usedall_days;
              this.form.data.groupList[index1].drug_list[index2].total = res.useall.specs_unit || '';
              this.form.data.groupList[index1].drug_list[index2].total_unit = res.useall.specs_name;
              // this.form.data.groupList[index1].drug_list[index2].frequency = this.tcmTimes[res.usedaily_times - 1].name;
              // this.form.data.groupList[index1].frequency = this.tcmTimes[res.usedaily_times - 1].name;
              this.form.data.groupList[index1].use_method = res.yongfa;
              // this.form.data.groupList[index1].days = res.usedall_days;
            }
          }
        });
      },
      // 字符串转化为数字
      stringNumber() {
        this.form.data.groupList.forEach((group, index1) => {
          this.form.data.groupList[index1].infusion_speed = parseFloat(group.infusion_speed);
          this.form.data.groupList[index1].days = parseFloat(group.days);
          group.drug_list.forEach((drug, index2) => {
            this.form.data.groupList[index1].drug_list[index2].dosage = parseFloat(drug.dosage);
            this.form.data.groupList[index1].drug_list[index2].total = parseFloat(drug.total);
          });
        });
      },
    },
    computed: {
      ...mapGetters(['clinic', 'token', 'user']),
    },
    mounted() {
      this.initData();
    },
  };
</script>
<style lang="scss" scoped>
@import "~@scss";

.newinfusionformulation{
  position: relative;
  padding: 20px 40px;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
}
.header{
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  height: 49px;
  line-height: 49px;
  color: #1a1a1a;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  min-width: 1100px;
}
.content{
  width: 100%;
  margin: 10px auto;
}
.w_300{
  width: 300px;
}
.w_900{
  width: 900px;
}
.m_b10{
  margin-bottom: 10px;
}
.d_inl{
  display: inline-block;
}
.fr{
  float: right;
}
.WestMedicineStyle{
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #ccc;
     .team1{
       line-height: 35px;
       span {
        cursor: pointer;
        color: $mainColor;
        margin-left: 10px;
        &:hover{
          color: blue;
        }
      }
    }
}

.el-form-item {
  margin-bottom: 5px;
  margin-right: 10px;
  font-size: 12px;
  .inline-input {
    width: 80%;
  }
  .el-autocomplete{
    width: 100%;
  }
  &.dose {
    .el-input {
      width: 48%;
    } 
    .el-select {
      width: 42%;
    }
    .el-autocomplete{
      width: 42%;
    }
  }
  &.dose2 {
    .el-input {
      width: 30%;
    }
    .el-select {
      width: 40%;
    }
    .el-autocomplete{
      width: 60%;
    }
  }
  &.dose3 {
    .el-input {
      width: 30%;
    }
    .el-select {
      width: 60%;
    }
    .el-autocomplete{
      width: 40%;
    }
    .spans {
      display: inline-block;
      width: 25%;
      font-size: 12px;
    }
  }
  .el-icon-delete {
    font-size: 20px;
    cursor: pointer;
    color: #56bc94;
  }
  .preContentul {
    border: 1px solid #ccc;
    padding-left: 5px;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-left: -5px;
    > div {
      border-right: 1px solid #ccc;
      &:last-of-type {
        border-right: 0;
      }
    }
  }
  &.line0 {
    border-top: 1px dashed #ccc;
    padding-top: 10px;
  }
  &.line2 {
    margin-top: 30px;
    .el-input-method {
      width: 80%;
    }
  }
  &.line3 {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .el-button {
    width: 100px;
    height: 35px;
    margin-right: 5%;
    margin-top: 5px;
  }
  &.inputs {
    margin-top: 20px;
    margin-right: 20px;
    .el-input {
      width: 200px;
    }
  }
  &.inputs {
    margin-top: 20px;
    margin-right: 20px;
    .el-textarea {
      width: 400px;
    }
    span {
      line-height: 75px;
    }
  }
  .addinputs {
    cursor: pointer;
    color: $mainColor;
  }

}

// 联想样式
.my-autocomplete {
  width: 100%;
  li {
    line-height: normal;
    padding: 2px;
    border-bottom: 1px solid #ccc;
    .name {
      // text-overflow: ellipsis;
      // overflow: hidden;
      line-height: 22px;
      font-size: 13px;
    }
    .phone {
      color: #b4b4b4;
      line-height: 18px;
      font-size: 12px;
      margin-bottom: 5px;
      border-bottom: 1px solid #ccc;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
