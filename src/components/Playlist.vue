<template>
  <div>
    <top-section icon="bars" header="YTListen" link="/settings"></top-section>
    <div class="container" id="container">
      <div class="addPlaylist" id="addPlaylist">
        <input type="text" id="playlistUrl" value="PL6X1_iPMxYQtCvvA1m36i5FvE1KoJS98A">
        <button id="addPlaylistBtn">Add playlist</button>
      </div>
      <div id="playlists">
        <single-playlist v-for="playlist in playlists" :key="playlist.title" :title="playlist.title" :subtitle="playlist.subtitle" :cards="playlist.cards"></single-playlist>
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
  
  .addPlaylist{

    display: none;
    padding: 15px;
    background-color: #fff;
    margin: 15px;
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,.2);
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    input, button{
      width: 100%;
      border: 0;
      box-shadow: 0px 0px 1px 0px rgba(0,0,0,.9);
      padding: 5px;
      font-size: 1.1em;
      margin: 5px;
    }
    button{
      background-color: $accent;
      color: $back;
      padding: 10px 15px;
      font-size: .8em;
      font-weight: 300;
      &:hover{
        background-color: lighten($accent, 5%);
      }
    }
    
  }
}
</style>