<template>
  <div class="printHelp">
    <div class="header">
      <h1 class="">打印帮助</h1>
    </div>
    <div class="content">
      <div class="big_items">
        <h2 class="">一、	医生如何打印病历？</h2>
        <ul>
          <li>1.	进入医生站→病历→选择客户接诊。</li>
          <li>2.	输入问诊详情→点击【保存】按钮。</li>
          <li>3.	点击【打印病历】按钮。</li>
          <li>  
            <span class="red m_t10">注：以A4纸打印为例：</span>
            <div class="red m_l30 m_t10">①打印病历时，必须先保存病历</div>
            <div class="red m_l30 m_t10">②打印时，将页眉和页脚去掉</div>
          </li>
        </ul>
        <img src="../components/img/DY1.1.png" class="img_big">
        <img src="../components/img/DY1.2.png" class="img_MM">
      </div>
      <div class="big_items">
        <h2 class="">二、	医生如何打印西药处方？</h2>
        <ul>
          <li>1.	进入医生站→处方→西药→选择接诊客户。</li>
          <li>2.	输入药品信息→点击【保存】按钮。</li>
          <li>3.	点击【打印处方】。</li>
          <li>  
            <span class="red m_t10">注：以A4纸打印为例：</span>
            <div class="red m_l30 m_t10">打印时，将页眉和页脚去掉</div>
          </li>
        </ul>
        <img src="../components/img/DY2.1.png" class="img_big">
        <img src="../components/img/DY2.2.png" class="img_MM">
      </div>
      <div class="big_items">
        <h2 class="">三、	医生如何打印中药处方？</h2>
        <ul>
          <li>1.	进入医生站→处方→中药→选择接诊客户。</li>
          <li>2.	输入药品信息→点击【保存】按钮。</li>
          <li>3.	点击【打印处方】。</li>
          <li>  
            <span class="red m_t10">注：以A4纸打印为例：</span>
            <div class="red m_l30 m_t10">打印时，将页眉和页脚去掉</div>
          </li>
        </ul>
        <img src="../components/img/DY3.1.png" class="img_big">
        <img src="../components/img/DY3.2.png" class="img_MM">
      </div>
      <div class="big_items">
        <h2 class="">四、	医生如何打印输液处方？</h2>
        <ul>
          <li>1.	进入医生站→处方→输液→选择接诊客户。</li>
          <li>2.	输入药品信息→点击【保存】按钮。</li>
          <li>3.	点击【打印处方】。</li>
          <li>  
            <span class="red m_t10">注：以A4纸打印为例：</span>
            <div class="red m_l30 m_t10">打印时，将页眉和页脚去掉</div>
          </li>
        </ul>
        <img src="../components/img/DY4.1.png" class="img_big">
        <img src="../components/img/DY4.2.png" class="img_MM">
      </div>
      <div class="big_items">
        <h2 class="">五、	医生如何打印诊疗项目？</h2>
        <ul>
          <li>1.	进入医生站→诊疗项目→选择接诊客户。</li>
          <li>2.	输入药品信息→点击【保存】按钮。</li>
          <li>3.	点击【打印处方】。</li>
          <li>  
            <span class="red m_t10">注：以A4纸打印为例：</span>
            <div class="red m_l30 m_t10">打印时，将页眉和页脚去掉</div>
          </li>
        </ul>
        <img src="../components/img/DY5.1.png" class="img_big">
        <img src="../components/img/DY5.2.png" class="img_MM">
      </div>
      <div class="big_items">
        <h2 class="">六、	收费处如何打印收费收据？</h2>
        <ul>
          <li>1.	进入收费→待发药→点击【收费】。</li>
          <li>2.	勾选收费项→点击【收费】→弹出收费信息框。</li>
          <li>3.	点击【打印处方】。</li>
          <li>  
            <span class="red m_t10">注：以收银纸为例：</span>
            <div class="red m_l30 m_t10">打印收费时，应将边距改为无</div>
          </li>
        </ul>
        <img src="../components/img/DY6.1.png" class="img_big">
        <img src="../components/img/DY6.2.png" class="img_big">
        <img src="../components/img/DY6.3.png" class="img_MM">
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.printHelp{
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
.img_MM{
  display: block;
  height: 388px;
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
