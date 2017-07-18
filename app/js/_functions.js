// send get request and catch the response

function load(url, success, fail){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  document.getElementById('loader').style.display = "block";
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) success(request.responseText)
    else fail(request.status);
    document.getElementById('loader').style.display = "none";
  };
  request.onerror = function() {
    fail(request.status);
    document.getElementById('loader').style.color = "red";
  };

  request.send();
}



// parse youtube playlist page to get info about playlist

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



// functionst for parsing youtube video

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




// use local storage as DB

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