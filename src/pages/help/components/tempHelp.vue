<template>
  <div class="tempHelp">
    <div class="header">
      <h1 class="">模板帮助</h1>
    </div>
    <div class="content">
      <div class="big_items">
        <h2 class="">一、	新增模板</h2>
        <ul>
          <li>1.	新增病历、医嘱模板。</li>
          <li>2.	新增处方、诊疗项目、耗材、其他收费项模板。</li>
        </ul>
        <img src="../components/img/MB1.1.png" class="img_big">
        <img src="../components/img/MB1.2.png" class="img_big">
        <img src="../components/img/MB1.3.png" class="img_big">
        <img src="../components/img/MB1.4.png" class="img_big">
      </div>
      <div class="big_items">
        <h2 class="">二、	修改/删除模板</h2>
        <img src="../components/img/MB2.png" class="img_big">
      </div>
      <div class="big_items">
        <h2 class="">三、	注意事项</h2>
        <ul>
          <li>①医生站保存的模板也显示在模板对应的列表下。</li>
          <li>②各模板默认保存为个人模板，仅创建人可见，若设置为共享模板可在模板类型处进行切换。</li>
          <li>③通用模板切换到个人模板，则仅创建人可见。</li>
          <li>④若模板中药品、收费项库存为零或已停用，可在此进行修改，以防调用模板时出现异常或影响医生就诊。</li>
          <li>⑤模板列表根据创建时间排序，可根据模板名称或类型快捷查找。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.tempHelp{
  position: relative;
  padding: 30px 40px;
  padding-bottom: 60px;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  .header{
    height: 49px;
    color: #1a1a1a;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    min-width: 1100px;
  }
  .content{
    min-width: 1100px;
    .big_items{
      padding: 20px 0;
      ul{
        margin-top: 20px;
        font-size: 15px;
        li{
          margin-top: 10px;
        }
      }
    }
  }
}
.img_big{
  width: 80%;
  min-width: 1100px;
  height: 580px;
  margin-top: 20px;
}
.img_mid{
    display: block;
    height: 388px;
    margin-top: 20px;
    margin-left: 368px;
}
.m_t10{
  margin-top: 10px;
}
.red{
  color: red;
}
.m_l30{
    margin-left: 30px;
}
</style>
