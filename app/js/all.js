function load(url, success, fail){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) success(request.responseText)
    else fail(request.status);
  };
  request.onerror = function() {
    fail(request.status);
  };

  request.send();
}


function getPlaylistVideos(id, callback){
  load("https://crossorigin.me/https://www.youtube.com/playlist?list="+id, (data) => {
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
    for(s in strings){
      ids.push(strings[s].split("\"")[1]);
    }
    callback({"title": title, "description": description, "videos": ids});
  });
}

function getVideoInfo(id, callback) {
  load("https://noembed.com/embed?url=https://www.youtube.com/watch?v="+id, (data) => {
    callback(JSON.parse(data));
  });
}




function queryStringMap(data) {
	var result = {};
	data.split('&').forEach(function(entry) {
		result[
				decodeURIComponent(entry.substring(0, entry.indexOf('=')))] =
				decodeURIComponent(entry.substring(entry.indexOf('=') + 1));
	});
	return result;
}

function listOfQueryStringMaps(data) {
	var result = [];
	data.split(',').forEach(function(entry) {
		result.push(queryStringMap(entry));
	});
	return result;
}


let qualities = ["1080p/1920x1080,video/mp4", "1080p/1920x1080,video/webm", "720p/1280x720,video/mp4", "720p/1280x720,video/webm", "480p/854x480,video/mp4", "480p/854x480,video/webm", "360p/640x360,video/mp4", "360p/640x360,video/webm", "240p/426x240,video/mp4", "240p/426x240,video/webm", "144p/256x144,video/mp4", "144p/256x144,video/webm", "audio,audio/mp4", "audio,audio/webm", "audio,audio/webm", "audio,audio/webm", "audio,audio/webm"];
//reversed


function getVideoSources(id, callback, quality=3){
  load('https://crossorigin.me/http://www.youtube.com/get_video_info?video_id='+id+'&el=vevo&el=embedded&asv=3&sts=15902', (data) => {
    data = queryStringMap(data);
    if (typeof data['adaptive_fmts'] == 'string') {
      data['adaptive_fmts'] = listOfQueryStringMaps(data['adaptive_fmts']);
    }
    // let current_quality;
    // let source;
    // data.adaptive_fmts.forEach((videoEntry) => {
    //   current_quality = (videoEntry.size !== undefined ? (videoEntry.quality_label+'/'+videoEntry.size) : "audio")+","+videoEntry.type.split(";")[0];
    //   if(current_quality === quality) source = videoEntry.url;
    // });
    callback(data.adaptive_fmts.reverse()[quality].url);
  });
}



function dbGet(){
  if(localStorage.getItem("player__database") === null)
    dbSet({"playlists":[],"quality":15});
  return JSON.parse(localStorage.getItem("player__database"));
}

function dbSet(obj){
  localStorage.setItem("player__database", JSON.stringify(obj));
}

function dbAssing(obj){
  let data = JSON.parse(localStorage.getItem("player__database"));
  let edited = Object.assign(data, obj);
  localStorage.setItem("player__database", JSON.stringify(edited) );
}

function dbClear(){
  localStorage.removeItem("player__database");
}


// getVideoSources("__QnYH4nPIo", (info) => {
//   console.log(info);
// });


// getPlaylistVideos("PL6X1_iPMxYQtCvvA1m36i5FvE1KoJS98A", (ids) => {
//   console.log(ids);
// });

// getVideoInfo("__QnYH4nPIo", (info) => {
//   console.log(info);
// });
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
let playlist__cards = document.getElementsByClassName('cards');
let playlist__template = document.getElementById('template');
let playlist__container = document.getElementById('container');
let playlist__playlists = document.getElementById('playlists');
let playlist__add = document.getElementById('add');
let playlist__addPlaylistBtn = document.getElementById('addPlaylistBtn');
let playlist__playlistUrl = document.getElementById('playlistUrl');






function addPlaylist(title, subtitle, videos){
  if(videos.length > 0){
    playlist__playlists.innerHTML += playlist__template.children[1].outerHTML;
    let playlistN = playlist__playlists.children.length-1;
    let playlist = playlist__playlists.children[playlistN];
    playlist.children[0].children[0].innerHTML = title+
    '<button class="trash" data-target="'+playlistN
    +'" onclick="removePlaylist(this)"><i class="fa fa-trash" aria-hidden="true" class="trash"></i></button>';
    playlist.children[0].children[1].innerHTML = subtitle;


    
    videos.forEach((video) => {
      getVideoInfo(video, (info) => {
        addCardPlaylist(playlist__playlists.children[playlistN].children[1], info.title, info.author_name, info.thumbnail_url);
      });
    })
    
    
    Array.from(playlist__cards).forEach((element) => {
      element.addEventListener("wheel", (e) => {
        e.currentTarget.scrollLeft -= e.wheelDelta/5;
        e.preventDefault();
      });
    });
  }
}

function removePlaylist(elem){
  let db = dbGet();
  db.playlists.splice(parseInt(elem.getAttribute("data-target")), 1);
  dbSet(db);
  initPlaylists();
}


function addCardPlaylist(playlist, song, author, cover){
  playlist.innerHTML += playlist__template.children[0].outerHTML;
  let card = playlist.children[playlist.children.length-1];
  card.children[1].children[0].innerHTML = song;
  if(song.length > 20) card.children[1].children[0].className += " long";
  card.children[1].children[1].innerHTML = author;
  card.children[0].style.backgroundImage = "url("+cover+")";
}


playlist__add.onclick = () => {
  if(document.getElementById('addPlaylist').style.display !== "flex"){
    document.getElementById('addPlaylist').style.display = "flex"
    for(let i = 0; i < document.getElementsByClassName('trash').length; i++){
      document.getElementsByClassName('trash')[i].style.display = "block";
    }
  }
  else{
    document.getElementById('addPlaylist').style.display = "none";
    for(let i = 0; i < document.getElementsByClassName('trash').length; i++){
      document.getElementsByClassName('trash')[i].style.display = "none";
    }
  }
  
  window.scrollTo(0, 0);
}


playlist__addPlaylistBtn.onclick = () => {
  getPlaylistVideos(playlist__playlistUrl.value, (data) => {
    let db = dbGet();
    if(data.videos.length > 0){
      db.playlists.push({
        "title": data.title,
        "description": data.description,
        "videos": data.videos
      })
      dbSet(db);
    }
    initPlaylists();
  });
}

function initPlaylists(){
  playlist__playlists.innerHTML = "";
  dbGet().playlists.forEach((playlist) => {
    if(playlist.videos.length > 0)
      addPlaylist(playlist.title, playlist.description, playlist.videos);
  });

  playlist__add.click();
  playlist__add.click();
}

initPlaylists();

// addPlaylist("Lorem ipsum", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, iure.");