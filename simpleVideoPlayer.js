const videoPlayer = document.getElementById('simpleVideoPlayer'),
      videoPlayerMedia = videoPlayer.querySelector('.media'),
      btnPlay = videoPlayer.querySelector('.playControl'),
      barControl = videoPlayer.querySelector('.barControl');

let bucleMediaState = undefined;

btnPlay.addEventListener('click', playState);
barControl.addEventListener('click', moveProgress);


function playState(e){
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
}

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


function moveProgress(e){
  let bar = videoPlayer.querySelector('.barControl'),
      progressIndicator = videoPlayer.querySelector('.barProgress'),
      max = bar.clientWidth;

  if(!videoPlayerMedia.paused && !videoPlayerMedia.ended){
    let positionX = e.pageX - bar.offsetLeft,
        newCurrentTime = positionX * videoPlayerMedia.duration / max,
        progressValue = parseInt(newCurrentTime * max / videoPlayerMedia.duration);
console.log(`positionX: ${positionX}, newCurrentTime: ${newCurrentTime}, pageX: ${e.pageX}, barOffset: ${bar.offsetLeft}`);
    videoPlayerMedia.currentTime = newCurrentTime;
    progressIndicator.style.width = `${progressValue}%`;
  }
}
