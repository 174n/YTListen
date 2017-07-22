<template>
  <div class="player" id="playerContainer">

    <transition name="fade">
      <div class="volumeControl" v-if="volumeControl" @click="volumeControlToggle">
        <input type="range" value="50" class="volumeRange" @change="changeVolume" v-model.number="volume">
      </div>
    </transition>

    <div class="back"><router-link to="/"><i class="fa fa-chevron-left" aria-hidden="true"></i></router-link></div>
    <div class="volume" id="volume" @click="volumeControlToggle"><i class="fa fa-volume-up" aria-hidden="true"></i></div>
    
    <div class="cover" :style="{ 'background-image': 'url(' + info.thumbnail_url + ')' }">
    </div>
    <div class="header">
      <div class="song">{{ info.title }}</div>
      <div class="author">{{ info.author_name }}</div>
    </div>
    <div class="progress">
        <input type="range" id="current" value="0">
    </div>
    <div class="controls">
      <div class="backward"><i class="fa fa-backward" aria-hidden="true"></i></div>
      <div class="play" @click="playToggle">
        <i class="fa" :class="{
          'fa-play': audioUrl && player !== undefined && paused,
          'fa-pause': audioUrl && player !== undefined && !paused,
          'fa-refresh': !audioUrl
        }" aria-hidden="true"></i>
      </div>
      <div class="forward"><i class="fa fa-forward" aria-hidden="true"></i></div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      info: {},
      volumeControl: false,
      audioUrl: false,
      player: undefined,
      paused: false,
      volume: 50
    }
  },



  methods:{

    volumeControlToggle: function(e){
      if (e.toElement.className !== "volumeRange") this.volumeControl=!this.volumeControl;
    },


    playToggle: function(){
      if(this.player !== undefined) {
        if(this.player.paused) this.player.play()
          else this.player.pause();
        this.paused = this.player.paused;
      }
    },

    changeVolume: function(){
      if(this.player !== undefined) {
        this.player.volume = this.volume/100;
      }
    },

    queryStringMap: function(data) {
      var result = {};
      data.split('&').forEach(function(entry) {
        result[
            decodeURIComponent(entry.substring(0, entry.indexOf('=')))] =
            decodeURIComponent(entry.substring(entry.indexOf('=') + 1));
      });
      return result;
    },
    listOfQueryStringMaps: function(data) {
      var self = this;
      var result = [];
      data.split(',').forEach(function(entry) {
        result.push(self.queryStringMap(entry));
      });
      return result;
    }

  },



  created(){
    let self = this;

    this.$http.get('https://noembed.com/embed?url=https://www.youtube.com/watch?v='+this.$route.params.id).then(response => {

      this.info = response.body;

    });

    this.$http.get('https://crossorigin.me/http://www.youtube.com/get_video_info?video_id='+this.$route.params.id+'&el=vevo&el=embedded&asv=3&sts=15902').then(response => {
        let data = this.queryStringMap(response.body);
        if (typeof data['adaptive_fmts'] == 'string') {
          data['adaptive_fmts'] = this.listOfQueryStringMaps(data['adaptive_fmts']);
        }
        self.audioUrl = data.adaptive_fmts.reverse()[3].url;
        self.player = new Audio(self.audioUrl);
        this.player.volume = 0.5;
        self.paused = self.player.paused;
        console.log(self.audioUrl);
     
      });
  },

  beforeDestroy(){
    this.player.src = "";
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";



.player{
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: $back;
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px 20px 40px 0px rgba(0,0,0,.5);
  
  .back{
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 1.5em;
    color: darken($main, 20%);
    text-decoration: none;
    cursor: pointer;
    a{
      color: inherit;
    }
    i{
      height: 100%;
      width: 100%;
      padding: 15px;
    }
    i:hover{
      color: $main;
    }
  }


  .volume{
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 1.5em;
    color: darken($main, 20%);;
    cursor: pointer;
    z-index: 10;
    i{
      height: 100%;
      width: 100%;
      padding: 15px;
    }
    i:hover{
      color: $main;
    }
  }

  .volumeControl{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,.8);
      .volumeRange{
        transform: rotate(-90deg);
        position: absolute;
        right: -7px;
        top: 85px;
        width: 70px;

        height: 3px;
        -webkit-appearance: none;
        background: transparent;
        border-radius: 0;

        &:focus {
          outline: none;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 15px;
          height: 15px;
          background-color: $accent;
          border-radius:50%;
          margin-top: -6px;
        }

        &::-moz-range-thumb {
          width: 15px;
          height: 15px;
          background-color: $accent;
          border-radius:50%;
          margin-top: -6px;
        }

        &::-webkit-slider-runnable-track {
          width: 100%;
          height: 3px;
          cursor: pointer;
          background-color: $main;
        }
        &::-moz-range-track {
          width: 100%;
          height: 3px;
          cursor: pointer;
          background-color: $main;
        }
        &:hover::-webkit-slider-runnable-track {
          background: lighten($main,20%);
        }
        &:hover::-moz-range-track {
          background: lighten($main,20%);
        }

      }
  }
  
  
  .cover{
    height: 50vh;
    width: 50vh;
    background-size: 180%;
    background-position: center;
    border-radius: 50%;
    box-shadow: 1px 1px 20px 0;
  }
  .header{
    width: 100%;
    padding: 0 15px 20px 70px;
    white-space: nowrap;
    overflow: hidden;
    
    & div.long:hover{
      animation: marquee 7s infinite;
    }
    
    .song{
      font-size: 1.1em;
      font-weight: 600;
      color: lighten($main, 20%);
    }
    .author{
      font-weight: 300;
      color: $main;
      margin-top: 3px;
    }
  }
  .controls{
    width: 100%;
    display: flex;
    font-size: 3em;
    justify-content: space-around;
    color: $main;
    cursor: pointer;
    i{
      height: 100%;
      width: 100%;
      padding: 0 10px;
    }
    i:hover{
      color: lighten($main, 20%);
    }
  }
  .progress{
    width: 100%;
    //padding: 0 15px;
    height: 3px;
    
    #current{
      width: 100%;
      height: 3px;
      -webkit-appearance: none;
      background: transparent;
      border-radius: 0;
      overflow: hidden;
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
      }
      &:focus {
        outline: none;
      }
      
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0px;
        box-shadow: -100vw 0 0 100vw $accent;
      }
      
      &::-moz-range-thumb {
        width: 0px;
        box-shadow: -100vw 0 0 100vw $accent;
      }
      
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background-color: $main;
      }
      &::-moz-range-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background-color: $main;
      }
      &:hover::-webkit-slider-runnable-track {
        background: lighten($main,20%);
      }
    }
  }
  
  @media only screen and (min-width: 720px) {
    position: fixed;
    width: 360px;
    margin-left: -180px;
    left: 50%;
    animation: fadein 1s ease-in-out;
  }
  @media only screen and (min-width: 500px) {
    height: 100vh;
  }
}
</style>