let songs = [
    "http://127.0.0.1:5500/Songs/Ed%20Sheeran%20-%20Sapphire%20(Official%20Music%20Video).mp3",
    "http://127.0.0.1:5500/Songs/Ehsan%20Tera%20Hoga%20Mujh%20Par%20with%20Lyrics%20%20%20%20%20%20%20%20%20%20Mohammed%20Rafi.mp3",
    "http://127.0.0.1:5500/Songs/Ed%20Sheeran%20%20Perfect%20Official%20Music%20Video.mp3",
    "http://127.0.0.1:5500/Songs/Aashiq%20Tera%20%20Full%20Audio%20Song%20%20Happy%20Bhag%20Jayegi.mp3",
    "http://127.0.0.1:5500/Songs/Ricky%20Montgomery%20%20Line%20Without%20a%20Hook%20Official%20Music%20Video.mp3"


    //may fetch songs using these urls, by applying a for loop 
]

let currentaudio = new Audio();
let playbtn = document.querySelector(".playbtn");

//function to play music
const playAudio = (track)=>{

  currentaudio.src = "/Songs/" + track
  currentaudio.play();
document.querySelector("#nameofsong").innerHTML = track;

}


//function to convert seconds to minutes
const secondsToMinutes = (some) => {
const minutes = Math.floor(some / 60);
const seconds = Math.floor((some % 60));
let progress = `${minutes}:${seconds}`

return progress
}



//main function
async function getSongs() {

  //get all songs
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const eachsong of songs) {
        let song = eachsong.split("Songs/")[1].replaceAll("%20", " ")
       
        songUL.innerHTML = songUL.innerHTML + `<li class="flex align-center justify-between">
                            <img class="invert"  src="music.svg" alt="music" srcset="">
                            <div class="info">  <div> ${song} </div>
                            </div>
                          <div class="playnow flex align-center ">
                                <img class="invert" src="play.svg" alt="" srcset="">
                                Play now
                              </div>
                            </li>`;
    }

//listen for an event to play the music
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(element => {

      element.addEventListener("click", e=>{
            console.log(element.querySelector(".info").firstElementChild.innerHTML)
            playAudio(element.querySelector(".info").firstElementChild.innerHTML.trim())
            playbtn.src="pause.svg"
            
      })
      
    });

//listen to event for play buttons
    playbtn.addEventListener("click", ()=>{
      if(currentaudio.paused){
        
        playbtn.src = "pause.svg"
        
        currentaudio.play();
      }
      else if(!currentaudio.paused) {
        currentaudio.pause();
        playbtn.src = "play.svg";
       
      }
      else{
        currentaudio.play()
      }
    })


//listen to timeupdate event
    currentaudio.addEventListener("timeupdate",()=>{
      console.log(currentaudio.currentTime,currentaudio.duration);
      console.log(`${secondsToMinutes(currentaudio.currentTime)} / ${secondsToMinutes(currentaudio.duration)}`)
      document.getElementById("time-update").innerHTML= `${secondsToMinutes(currentaudio.currentTime)} / ${secondsToMinutes(currentaudio.duration)}`;
      document.querySelector(".circle").style.left = (currentaudio.currentTime/currentaudio.duration)*100 + "%" 
      })
  
}

//listen to event for playline
document.querySelector(".playline").addEventListener("click", (e)=>{
  console.log(e.offsetX, e.target.getBoundingClientRect().width);
  perc = (e.offsetX / e.target.getBoundingClientRect().width)*100;
  document.querySelector(".circle").style.left = perc + "%";
  currentaudio.currentTime = (currentaudio.duration * perc  )/100;

  console.count();
})

getSongs();