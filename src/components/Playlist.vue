<template>
  <div>
    <top-section icon="bars" header="YTListen" link="/settings"></top-section>
    <div class="container" id="container">
      <div id="playlists">
        <single-playlist v-for="(playlist, index) in playlists" :key="playlist.title" :title="playlist.title" :subtitle="playlist.subtitle" :cards="playlist.cards" :playlistid="index"></single-playlist>
      </div>
    </div>
  </div>
</template>

<script>
import TopSection from './TopSection.vue';
import SinglePlaylist from './SinglePlaylist.vue';


export default {
  components: {
    'top-section': TopSection,
    'single-playlist': SinglePlaylist
  },
  data () {
    return {
      playlists:[
        {
          title: "test1",
          subtitle: "test2",
          cards: [
            "9qqFH60isFc",
            "9qqFH60isFc",
            "9qqFH60isFc",
            "9qqFH60isFc",
            "9qqFH60isFc"
          ]
        },
        {
          title: "test3",
          subtitle: "test4",
          cards: [
            "9qqFH60isFc",
            "9qqFH60isFc",
            "9qqFH60isFc",
            "9qqFH60isFc",
            "9qqFH60isFc"
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";

.container{
  padding-top: 50px;
}
</style>