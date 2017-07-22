<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
import Playlist from './components/Playlist.vue';

export default {
  components:{
    'playlist': Playlist
  },
  data () {
    return {
    }
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
