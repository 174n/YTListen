<template>
  <div>
    <top-section icon="chevron-left" header="Settings" link="/"></top-section>
    <div class="container">
      <div class="card">
        <input type="text" v-model="playlistUrl">
        <button @click="addPlaylist">Add playlist</button>
      </div>
      <div class="card">
        <button @click="removePlaylists">Remove all playlists</button>
      </div>
    </div>
  </div>
</template>

<script>
import TopSection from './TopSection.vue';
import storage from '../mixins/storage';
import { EventBus } from '../event-bus.js';

export default {
  data () {
    return {
      playlistUrl: "https://www.youtube.com/watch?v=__QnYH4nPIo&list=PL6X1_iPMxYQtCvvA1m36i5FvE1KoJS98A&index=1"
    }
  },
  components: {
    'top-section': TopSection
  },
  methods:{

    addPlaylist: function() {
      let id = this.parsePlaylistUrl(this.playlistUrl);

      EventBus.$emit("loading", true);
      // nope, I'm not gonna use API
      this.$http.get('https://crossorigin.me/https://www.youtube.com/playlist?list='+id).then(response => {
        let data = response.body;

        let re = [
          /<meta name="title" content="(.*) - YouTube">/g,
          /<meta name="description" content="(.*)">/g
        ];
        let title = data.match(re[0])[0].
          replace(re[0],"$1");
        let description = data.match(re[1])[0].
          replace(re[1],"$1");
        let strings = data.match(/data-video-id=\"(.*?)\"/g);
        let ids = [];
        for(let s in strings){
          ids.push(strings[s].split("\"")[1]);
        }

        this.writePlaylist(title, description, ids);
        console.log(this.dbGet());
        EventBus.$emit("loading", false);
        this.$router.push('/');
      });

    },
    writePlaylist: function(title, description, ids){
      let db = this.dbGet();
      db.playlists.push({"title": title, "description": description, "videos": ids});
      this.dbSet(db);
    },
    parsePlaylistUrl: function(url){
      let re = /(.*)youtube.com\/(.*)list=(.*?)(&(.*)|$)/g;
      return url.replace(re, "$3");
    },
    removePlaylists: function(){
      this.dbClear();
      this.$router.push('/');
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

.card{
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
    cursor: pointer;
    &:hover{
      background-color: lighten($accent, 5%);
    }
  }
}
</style>