<template>
  <div class="main-container-outer">
    <div class="main-container-inner">
      <div class="main-container-inner-box">
        <div class="main-circle logo">
          <h1 class="logo-title">PODOMORO</h1>
        </div>
        <p class="tip">
          You don't have any task now,
          <br>
          please add task first!
        </p>
      </div>
    </div>

    <p class="product-name">
      PODOMORO
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .logo{
    background-image: url('~@/assets/img/tomato_small_color.svg');
    @include set-background-image(contain);

    &-title{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      letter-spacing: 3.6px;
      color: #fff;
      font-weight: 100;
    }
  }
</style>