let playlist__cards = document.getElementsByClassName('cards');
let playlist__template = document.getElementById('template');
let playlist__container = document.getElementById('container');
let playlist__add = document.getElementById('add');


function addPlaylist(title, subtitle){
  playlist__container.innerHTML += playlist__template.children[1].outerHTML;
  let playlist = playlist__container.children[playlist__container.children.length-1];
  playlist.children[0].children[0].innerHTML = title+'<i class="fa fa-trash trash" aria-hidden="true" class="trash"></i>';
  playlist.children[0].children[1].innerHTML = subtitle;
  
  // addCardPlaylist(playlist.children[1], "SAFAKASH - Rainy Day", "kota.", "https://i.ytimg.com/vi/ZGiYRScEV9M/hqdefault.jpg");
  
  
  Array.from(playlist__cards).forEach((element) => {
    element.addEventListener("wheel", (e) => {
      e.currentTarget.scrollLeft -= e.wheelDelta/5;
      e.preventDefault();
    });
  });
}

function addCardPlaylist(playlist, song, author, cover){
  playlist.innerHTML += playlist__template.children[0].outerHTML;
  let card = playlist.children[playlist.children.length-1];
  card.children[1].children[0].innerHTML = song;
  card.children[1].children[1].innerHTML = author;
  card.children[0].style.backgroundImage = "url("+cover+")";
}


playlist__add.onclick = () => {
  if(document.getElementById('addPlaylist').style.display !== "flex"){
    document.getElementById('addPlaylist').style.display = "flex"
    for(i in document.getElementsByClassName('trash')){
      document.getElementsByClassName('trash')[i].style.display = "block";
    };
  }
  else{
    document.getElementById('addPlaylist').style.display = "none";
    for(i in document.getElementsByClassName('trash')){
      document.getElementsByClassName('trash')[i].style.display = "none";
    };
  }
  
  window.scrollTo(0, 0);
}



// addPlaylist("Lorem ipsum", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, iure.");