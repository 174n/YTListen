<template>
  <router-link class="card" :to='"play/"+id+"/"+playlistid'>
    <div @mouseover="mouse(true)" @mouseout="mouse(false)">
      <div class="cover" :style="{ 'background-image': 'url(' + card.thumbnail_url + ')' }"></div>
      <div class="text">
        <div class="song" :class="{ long: mousestate && card.title.length > 25 }">{{ card.title }}</div>
        <div class="author" :class="{ long: mousestate && card.author_name.length > 30 }">{{ card.author_name }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  props:{
    id: String,
    playlistid: Number
  },
  data () {
    return {
      card: {},
      mousestate: false
    }
  },
  methods:{
    mouse: function(state){
      this.mousestate = state;
    }
  },
  created(){
    this.$http.get('https://noembed.com/embed?url=https://www.youtube.com/watch?v='+this.id).then(response => {
      this.card = response.body;
    });
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";

.card{
  min-width: 150px;
  height: 150px;
  background-color: #fff;
  margin-right: 12px;
  margin-left: 3px;
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,.2);
  cursor: pointer;
  text-decoration: none;
  .cover{
    width: 100%;
    height: 110px;
    background-size: 180%;
    background-position: center;
  }

  .text{

    padding: 5px;
    overflow: hidden;
    white-space: nowrap;

    .song{
      color: $back;
      font-size: .8em;
      font-weight: 600;
      margin-bottom: 2px;
      &.long{
        animation: marquee 7s infinite;
      }
    }
    .author{
      color: lighten($back, 20%);
      font-size: .7em;
      font-weight: 300;
      &.long{
        animation: marquee 7s infinite;
      }
    }

  }
}

</style>
