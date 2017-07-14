function load(e,t,l){var a=new XMLHttpRequest;a.open("GET",e,!0),a.onload=function(){a.status>=200&&a.status<400?t(a.responseText):l(a.status)},a.onerror=function(){l(a.status)},a.send()}function getPlaylistVideos(e,t){load("https://crossorigin.me/https://www.youtube.com/playlist?list="+e,e=>{let l=[/<meta name="title" content="(.*) - YouTube">/g,/<meta name="description" content="(.*)">/g],a=e.match(l[0])[0].replace(l[0],"$1"),n=e.match(l[1])[0].replace(l[1],"$1"),r=e.match(/data-video-id=\"(.*?)\"/g),i=[];for(s in r)i.push(r[s].split('"')[1]);t({title:a,description:n,videos:i})})}function getVideoInfo(e,t){load("https://noembed.com/embed?url=https://www.youtube.com/watch?v="+e,e=>{t(JSON.parse(e))})}function queryStringMap(e){var t={};return e.split("&").forEach(function(e){t[decodeURIComponent(e.substring(0,e.indexOf("=")))]=decodeURIComponent(e.substring(e.indexOf("=")+1))}),t}function listOfQueryStringMaps(e){var t=[];return e.split(",").forEach(function(e){t.push(queryStringMap(e))}),t}function getVideoSources(e,t,l=3){load("https://crossorigin.me/http://www.youtube.com/get_video_info?video_id="+e+"&el=vevo&el=embedded&asv=3&sts=15902",e=>{"string"==typeof(e=queryStringMap(e)).adaptive_fmts&&(e.adaptive_fmts=listOfQueryStringMaps(e.adaptive_fmts)),t(e.adaptive_fmts.reverse()[l].url)})}function dbGet(){return null===localStorage.getItem("player__database")&&dbSet({playlists:[],quality:15}),JSON.parse(localStorage.getItem("player__database"))}function dbSet(e){localStorage.setItem("player__database",JSON.stringify(e))}function dbAssing(e){let t=JSON.parse(localStorage.getItem("player__database")),l=Object.assign(t,e);localStorage.setItem("player__database",JSON.stringify(l))}function dbClear(){localStorage.removeItem("player__database")}function playerInit(e,t){player__song.innerHTML=t.title,t.title.length>30&&(player__song.className="song long"),player__author.innerHTML=t.author_name,t.author_name.length>37&&(player__author.className="author long"),player__cover.style.backgroundImage="url('"+t.thumbnail_url+"')",(player__audio=new Audio(e[0])).volume=.4,player__container.style.display="flex"}function addPlaylist(e,t,l){if(l.length>0){playlist__playlists.innerHTML+=playlist__template.children[1].outerHTML;let a=playlist__playlists.children[playlist__playlists.children.length-1];a.children[0].children[0].innerHTML=e+'<i class="fa fa-trash trash" aria-hidden="true" class="trash"></i>',a.children[0].children[1].innerHTML=t,l.forEach(e=>{getVideoInfo(e,e=>{addCardPlaylist(a.children[1],e.title,e.author_name,e.thumbnail_url)})}),Array.from(playlist__cards).forEach(e=>{e.addEventListener("wheel",e=>{e.currentTarget.scrollLeft-=e.wheelDelta/5,e.preventDefault()})})}}function addCardPlaylist(e,t,l,a){e.innerHTML+=playlist__template.children[0].outerHTML;let n=e.children[e.children.length-1];n.children[1].children[0].innerHTML=t,t.length>20&&(n.children[1].children[0].className+=" long"),n.children[1].children[1].innerHTML=l,n.children[0].style.backgroundImage="url("+a+")"}function initPlaylists(){playlist__playlists.innerHTML="",dbGet().playlists.forEach(e=>{console.log(e.videos),e.videos.length>0&&addPlaylist(e.title,e.description,e.videos)})}let qualities=["1080p/1920x1080,video/mp4","1080p/1920x1080,video/webm","720p/1280x720,video/mp4","720p/1280x720,video/webm","480p/854x480,video/mp4","480p/854x480,video/webm","360p/640x360,video/mp4","360p/640x360,video/webm","240p/426x240,video/mp4","240p/426x240,video/webm","144p/256x144,video/mp4","144p/256x144,video/webm","audio,audio/mp4","audio,audio/webm","audio,audio/webm","audio,audio/webm","audio,audio/webm"],player__playlist=[],player__container=document.getElementById("playerContainer"),player__song=document.getElementById("song"),player__author=document.getElementById("author"),player__cover=document.getElementById("cover"),player__backward=document.getElementById("backward"),player__play=document.getElementById("play"),player__forward=document.getElementById("forward"),player__current=document.getElementById("current"),player__volume=document.getElementById("volume"),player__volumeControl=document.getElementById("volumeControl"),player__vcParent=player__volumeControl.parentElement,player__mouseOnCurrent=!1,player__audio;player__play.onclick=(()=>{player__audio.paused?(player__audio.play(),player__play.children[0].setAttribute("class","fa fa-pause")):(player__audio.pause(),player__play.children[0].setAttribute("class","fa fa-play")),player__audio.ontimeupdate=(()=>{player__mouseOnCurrent||(player__current.value=player__audio.currentTime/player__audio.duration*100)})}),player__current.onmousedown=(()=>{player__mouseOnCurrent=!0}),player__current.onmouseup=(()=>{player__mouseOnCurrent=!1}),player__current.onchange=(()=>{player__audio.currentTime=player__current.value/100*player__audio.duration}),player__volume.onclick=(()=>{player__vcParent.style.animation="fadein .3s linear",player__vcParent.style.display="block"}),player__vcParent.onclick=(e=>{e.target.value!=player__volumeControl.value&&(player__vcParent.style.animation="fadeout .3s linear",setTimeout(()=>player__vcParent.style.display="none",250))}),player__volumeControl.onchange=(()=>{player__audio.volume=player__volumeControl.value/100});let playlist__cards=document.getElementsByClassName("cards"),playlist__template=document.getElementById("template"),playlist__container=document.getElementById("container"),playlist__playlists=document.getElementById("playlists"),playlist__add=document.getElementById("add"),playlist__addPlaylistBtn=document.getElementById("addPlaylistBtn"),playlist__playlistUrl=document.getElementById("playlistUrl");playlist__add.onclick=(()=>{if("flex"!==document.getElementById("addPlaylist").style.display){document.getElementById("addPlaylist").style.display="flex";for(let e=0;e<document.getElementsByClassName("trash").length;e++)document.getElementsByClassName("trash")[e].style.display="block"}else{document.getElementById("addPlaylist").style.display="none";for(let e=0;e<document.getElementsByClassName("trash").length;e++)document.getElementsByClassName("trash")[e].style.display="none"}window.scrollTo(0,0)}),playlist__addPlaylistBtn.onclick=(()=>{getPlaylistVideos(playlist__playlistUrl.value,e=>{let t=dbGet();e.videos.length>0&&(t.playlists.push({title:e.title,description:e.description,videos:e.videos}),dbSet(t)),console.log(dbGet()),initPlaylists()})}),initPlaylists();