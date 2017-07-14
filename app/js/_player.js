let player__playlist = [];
// getVideoSources("__QnYH4nPIo", (url) => {
//   player__playlist.push(url);
// });

let player__container = document.getElementById("playerContainer");

let player__song = document.getElementById("song");
let player__author = document.getElementById("author");
let player__cover = document.getElementById("cover");

let player__backward = document.getElementById("backward");
let player__play = document.getElementById("play");
let player__forward = document.getElementById("forward");
let player__current = document.getElementById("current");
let player__volume = document.getElementById("volume");
let player__volumeControl = document.getElementById("volumeControl");
let player__vcParent = player__volumeControl.parentElement;
let player__mouseOnCurrent=false;
let player__audio;



//init
function playerInit(url, info){
  player__song.innerHTML = info.title;
  if(info.title.length > 30) player__song.className = "song long";
  
  player__author.innerHTML = info.author_name;
  if(info.author_name.length > 37) player__author.className = "author long";
  
  player__cover.style.backgroundImage = "url('"+info.thumbnail_url+"')";

  player__audio = new Audio(url[0]);
  player__audio.volume = 0.4;
  
  player__container.style.display = "flex";
}

//play/pause
player__play.onclick = () => {
  if(player__audio.paused){
    player__audio.play();
    player__play.children[0].setAttribute("class", "fa fa-pause");
  }
  else{
    player__audio.pause();
    player__play.children[0].setAttribute("class", "fa fa-play");
  }
  //slider
  player__audio.ontimeupdate = () => {
    if(!player__mouseOnCurrent)
      player__current.value = player__audio.currentTime/player__audio.duration*100;
  }
}
player__current.onmousedown = () => { player__mouseOnCurrent=true; }
player__current.onmouseup = () => { player__mouseOnCurrent=false; }

player__current.onchange = () => {
  player__audio.currentTime = player__current.value/100*player__audio.duration;
}

//volume
player__volume.onclick = () => {
  player__vcParent.style.animation = "fadein .3s linear";
  player__vcParent.style.display = "block";
}
player__vcParent.onclick = (e) => {
  if(e.target.value != player__volumeControl.value){
    player__vcParent.style.animation = "fadeout .3s linear";
    setTimeout(() => player__vcParent.style.display = "none", 250);
  }
}

player__volumeControl.onchange = () => {
  player__audio.volume = player__volumeControl.value/100;
}




// playerInit(player__playlist, {
//   "title": "SAFAKASH - Rainy Day",
//   "author_name": "kota.",
//   "thumbnail_url":"//i.ytimg.com/vi/ZGiYRScEV9M/hqdefault.jpg"
// });