<template>
  <div class="loading">
    <div class="spin_area">
      <div class="spinner"></div>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
    document.body.style.overflow = "hidden";
  },
  beforeDestroy(){
    document.body.style.overflow = "auto";
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";

.loading{
  position: absolute;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparentize($back, .3);
  z-index: 1000;
}

.spinner {
  width: 80px;
  height: 80px;
  background-color: $main;

  border-radius: 50%;  
  animation: scaleout 1.5s infinite ease-in-out;
}

.spin_area{
  animation: rotate360 1.5s infinite ease-in-out;
}
</style>