<template>
  <div>
    <div>{{output}}</div>
    <loading v-if="loading"></loading>

    <transition name="fade">
      <router-view></router-view>
    </transition>
  
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import { EventBus } from './event-bus.js';

export default {
  components:{
    'loading': Loading
  },
  data () {
    return {
      loading: false,
      output: ""
    }
  },
  created() {
    EventBus.$on('loading', status => {
      this.loading = status;
    });
    self = this;
    window.plugins.intent.getCordovaIntent(function (Intent) {
        self.output = Intent;
    });
  }
}
</script>

<style lang="scss">
@import "./src/styles/settings.scss";

* {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  transition: 250ms;
}

html, body{
  height: 100%;
}

body{
  background-color: lighten($back, 80%);
  &::-webkit-scrollbar {
    background-color: transparentize($back, .5);
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparentize($accent, .1);
  }
  overflow-x: hidden;
}


.fade-enter-active, .fade-leave-active {
  opacity: 0
}
</style>
