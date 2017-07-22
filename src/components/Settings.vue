<template>
	<div>
		<top-section icon="chevron-left" header="Settings" link="/"></top-section>
		<div class="container">
		  <div class="addPlaylist" id="addPlaylist">
		    <input type="text" id="playlistUrl" value="PL6X1_iPMxYQtCvvA1m36i5FvE1KoJS98A">
		    <button id="addPlaylistBtn">Add playlist</button>
		  </div>
		</div>
	</div>
</template>

<script>
import TopSection from './TopSection.vue';

export default {
  data () {
    return {
      
    }
  },
  components: {
    'top-section': TopSection
  },
}
</script>

<style lang="scss" scoped>
@import "./src/styles/settings.scss";

.container{
  padding-top: 50px;
}

.addPlaylist{
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