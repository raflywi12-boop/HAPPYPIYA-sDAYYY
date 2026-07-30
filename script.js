const music=document.getElementById("music");

const btn=document.getElementById("musicBtn");

btn.onclick=()=>{

if(music.paused){

music.play();

btn.innerHTML="⏸";

}else{

music.pause();

btn.innerHTML="🎵";

}

}

window.onload=()=>{

setTimeout(()=>{

document.getElementById("loading").style.display="none";

},2000);

}

function scrollNext(){

window.scrollTo({

top:window.innerHeight,

behavior:"smooth"

});

}
