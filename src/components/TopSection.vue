<template>
  <div class="top-section">
    <div class="header">{{ header }}</div>
    <router-link class="add" :to="link"><i v-bind:class="'fa fa-'+icon" aria-hidden="true"></i></router-link>
  </div>
</template>

<script>
export default {
  props:{
    header: String,
    icon: String,
    link: String
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";

.top-section{
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: $accent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -1px 7px 2px rgba(0,0,0,.6);
  z-index: 10;
  
  .header{
    margin-left: 15px;
    color: $back;
    font-size: 1.1em;
  }
  .add{
    color: $back;
    font-size: 1.3em;
    padding: 12px 20px;
    cursor: pointer;
    &:hover{
      color: lighten($back, 15%);
    }
  }
}
</style>