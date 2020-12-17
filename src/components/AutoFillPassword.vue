<template>
  <div class="container">
    <input class="input" type="text" name="username"/>   
　　<input class="input" type="password" name="password"/>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
};
</script>


<style lang="scss" scoped>
.container{
  position: relative;
  .input{
    height: 0;
    border: none;
  }
  .box{
    position: absolute;
    background: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
