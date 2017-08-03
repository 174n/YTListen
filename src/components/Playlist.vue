<template>
  <div>
    <top-section icon="bars" header="YTListen" link="/settings"></top-section>
    <div class="container" id="container">
      <div id="playlists">
        <single-playlist v-for="(playlist, index) in playlists" :key="playlist.title" :title="playlist.title" :subtitle="playlist.description" :cards="playlist.videos" :playlistid="index"></single-playlist>
      </div>
    </div>
  </div>
</template>

<script>
import TopSection from './TopSection.vue';
import SinglePlaylist from './SinglePlaylist.vue';
import storage from '../mixins/storage';


export default {
  components: {
    'top-section': TopSection,
    'single-playlist': SinglePlaylist
  },
  computed:{
    playlists: function(){
      return this.dbGet().playlists;
    }
  },
  mixins: [storage]
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";

.container{
  padding-top: 50px;
}
</style>