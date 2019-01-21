const videoPlayer = document.getElementById('simpleVideoPlayer'),
      videoPlayerMedia = videoPlayer.querySelector('.media'),
      btnPlay = videoPlayer.querySelector('.playControl'),
      barControl = videoPlayer.querySelector('.barControl');


btnPlay.addEventListener('click', playState);
barControl.addEventListener('click', moveProgress);
// barControl.addEventListener('mousedown', () => { videoPlayerMedia.pause(); });
// barControl.addEventListener('mouseup', () => { videoPlayerMedia.play(); });
videoPlayerMedia.addEventListener('timeupdate', mediaState);
videoPlayerMedia.addEventListener('click', playState);


function playState(){
  if(videoPlayerMedia.paused){
    btnPlay.textContent = "Pause";
    videoPlayerMedia.play();
  }else{
    btnPlay.textContent = "Play";
    videoPlayerMedia.pause();
  }
}

function mediaState(e){
  let max = 100,
      progressValue = 0,
      progressIndicator = videoPlayer.querySelector('.barProgress');

  if(!videoPlayerMedia.ended){
    progressValue = parseInt(e.target.currentTime * max / e.target.duration);
    progressIndicator.style.width = `${progressValue}%`;
  }else{
    progressIndicator.style.width = '0%';
    btnPlay.textContent = 'Play';
  }
}


function moveProgress(e){
  let bar = videoPlayer.querySelector('.barControl').getBoundingClientRect(),
      progressIndicator = videoPlayer.querySelector('.barProgress'),
      max = bar.width,
      positionX = e.pageX - bar.left,
      newCurrentTime = positionX * videoPlayerMedia.duration / max,
      progressValue = parseInt(newCurrentTime * max / videoPlayerMedia.duration);

  videoPlayerMedia.pause();
  videoPlayerMedia.currentTime = newCurrentTime;
  progressIndicator.style.width = `${progressValue}%`;
  videoPlayerMedia.play();
}

/*addEventListener('mousemove', e => {
  let bar = document.querySelector('.barControl').getBoundingClientRect();
  console.log(`pageX: ${e.pageX}, barOffset: ${bar.left} = ${e.pageX - bar.left}`);
});*/
