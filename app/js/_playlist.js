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