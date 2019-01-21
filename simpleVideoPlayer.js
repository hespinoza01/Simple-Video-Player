const videoPlayer = document.getElementById('simpleVideoPlayer'),
      videoPlayerMedia = videoPlayer.querySelector('.media'),
      btnPlay = videoPlayer.querySelector('.playControl');

let bucleMediaState = undefined;

btnPlay.addEventListener('click', e => {
  let textContent = e.target.textContent;

  if(textContent === "Play"){
    e.target.textContent = "Pause";
    videoPlayerMedia.play();
    bucleMediaState = setInterval(mediaState, 1000);
  }else if(textContent === "Pause"){
    e.target.textContent = "Play";
    videoPlayerMedia.pause();
    clearInterval(bucleMediaState);
  }
});

function mediaState(){
  let max = 100,
      progressValue = 0,
      progressIndicator = videoPlayer.querySelector('.barProgress');

  if(!videoPlayerMedia.ended){
    progressValue = parseInt(videoPlayerMedia.currentTime * max / videoPlayerMedia.duration);
    progressIndicator.style.width = `${progressValue}%`;
  }else{
    progressIndicator.style.width = '0%';
    btnPlay.textContent = 'Play';
    clearInterval(bucleMediaState);
  }
}
