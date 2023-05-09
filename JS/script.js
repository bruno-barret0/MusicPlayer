const songname = document.getElementById('nomemusica');
const capadisco = document.getElementById('capa-musica');
const banda = document.getElementById('name-band');
const song = document.getElementById('musica');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentprogress = document.getElementById('progress');
const progresscontainer = document.getElementById('progresscontainer');
const shuffle = document.getElementById('random');
const repeat = document.getElementById('repeat');
const songtime = document.getElementById('songtime');
const totaltime = document.getElementById('totaltime');
const likebutton = document.getElementById('like');
const IWriteSinsNotTragedies = {
    nomesom: 'I Write Sins Not Tragedies',
    artist: 'Panic At The Disco',
    file: 'panic_ i_write',
    file2: 'Panic! At The Disco_ I Write Sins Not Tragedies [OFFICIAL VIDEO]',
   liked: true,
};
const petsematary = {
    nomesom: 'Pet Sematary',
    artist: 'Ramones',
    file: 'pet_sematary',
    file2: 'Ramones - Pet Sematary (Official Music Video) (1)',
    liked: false,
}; 
const thunderstruck = {
    nomesom: 'Thunderstruck',
    artist: 'Ac/Dc',
    file: 'thunderstruck',
    file2: 'AC DC - Thunderstruck (Official Video)',
    liked: false,  
}; 
banda.innerText = 'panic At The Disco';
songname.innerText = 'I Write Sins Not Tragedies';
let isplaying = false;
let isShuffled = false;
let repeatOn = false;
const playlist = [IWriteSinsNotTragedies, petsematary, thunderstruck];
let sortedplaylist = [...playlist];
let index = 0;
function playsong(){
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    isplaying = true;
}
function pausesong(){
    play.querySelector('.bi').classList.add('bi-play-circle');
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    song.pause();
    isplaying = false;
}
function playpauser(){
    if(isplaying === true){
        pausesong();
    }
    else{
        playsong();
    }
}
function updatetotaltime(){
    totaltime.innerText = tohhmmss(song.duration);
}
function likebuttonrender() {
    if (sortedplaylist[index].liked === true) {
        likebutton.querySelector('.bi').classList.remove('bi-heart');
        likebutton.querySelector('.bi').classList.add('bi-suit-heart-fill');
        likebutton.classList.add('ativarlike');
    }
    else {
        likebutton.querySelector('.bi').classList.add('bi-heart');
        likebutton.querySelector('.bi').classList.remove('bi-suit-heart-fill');
        likebutton.classList.remove('ativarlike');
    }
}
function iniciarsom() {
song.src = `Music/${sortedplaylist[index].file2}.mp3`;
capadisco.src = `IMG/${sortedplaylist[index].file}.jfif`;
banda.innerText = sortedplaylist[index].artist;
songname.innerText = sortedplaylist[index].nomesom;
likebuttonrender()  ;
}
function previoussong(){
    if(index === 0){
    index =sortedplaylist.length - 1;
}
else{
    index = index -1;
}
iniciarsom();
playsong();
}

function nextsong(){
    if(index === sortedplaylist.length - 1){
    index = 0;
}
else{
    index +=1; 
}
iniciarsom();
playsong();
}
function updateprogress(){
    song.currentTime
    song.duration
    const barwidth = (song.currentTime/song.duration)*100;
    currentprogress.style.setProperty('--progress', `${barwidth}%`);
    songtime.innerText = tohhmmss(song.currentTime);
}
function jumpto(event){
   const width = progresscontainer.clientWidth;
   const clickposition = event.offsetX;
   const jumptotime = (clickposition/width)*song.duration;
   song.currentTime = jumptotime;
}
function shufflearray(preshufflearray){
    const size = preshufflearray.length;
    let currentindex = size - 1;
    while(currentindex > 0){
    let randomindex = Math.floor(Math.random()*size);
    let aux = preshufflearray[currentindex];
    preshufflearray[currentindex] = preshufflearray[randomindex]
    preshufflearray[randomindex] = aux;
    currentindex -= 1;
    }
}
function shufflebutton(){
    if(isShuffled === false){
        isShuffled = true;
        shufflearray(sortedplaylist);
        shuffle.classList.add('ativarrandom');
    }
    else {
        isShuffled = false;
        shuffle.classList.remove('ativarrandom');        
    }
}
function repeatclick(){
    if(repeatOn === false){
        repeatOn = true;
        repeat.classList.add('ativarrepeat');
    }
    else {
        repeatOn = false;
        repeat.classList.remove('ativarrepeat');        
    }
}
function nextOrrepeat(){
    if (repeatOn === false){
        nextsong();
    }
    else{
        playsong();
    }
}
function tohhmmss(originalnumber){
    let hours = Math.floor(originalnumber/3600);
    let min = Math.floor((originalnumber - hours * 3600)/60);
    let secs = Math.floor(originalnumber - hours * 3600 - min * 60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function likebuttonclicked(){
    if(sortedplaylist[index].liked === false){
        sortedplaylist[index].liked = true;
    }
    else{
        sortedplaylist[index].liked = false;
    }
    likebuttonrender()
}
iniciarsom();
play.addEventListener('click', playpauser);
previous.addEventListener('click', previoussong);
next.addEventListener('click', nextsong);
song.addEventListener('timeupdate', updateprogress);
song.addEventListener('ended', nextOrrepeat);
song.addEventListener('loadedmetadata', updatetotaltime);
progresscontainer.addEventListener('click', jumpto);
shuffle.addEventListener('click', shufflebutton);
repeat.addEventListener('click', repeatclick);
likebutton.addEventListener('click', likebuttonclicked);