const videoPlayer = document.getElementById('simpleVideoPlayer'),
      videoPlayerMedia = videoPlayer.querySelector('.media'),
      btnPlay = videoPlayer.querySelector('.playControl'),
      barControl = videoPlayer.querySelector('.barControl'),
      btnMute = videoPlayer.querySelector('.muteControl'),
      btnFullscreen = videoPlayer.querySelector('.fullscreenControl'),
      timeLabel = videoPlayer.querySelector('.timeLabel');


btnPlay.addEventListener('click', playState);
btnMute.addEventListener('click', muteState);
btnFullscreen.addEventListener('click', fullscreenState);
barControl.addEventListener('click', moveProgress);
barControl.addEventListener('mouseover', showTooltip);
barControl.addEventListener('mousemove', updateTooltip);
barControl.addEventListener('mouseout', hideTooltip);
videoPlayerMedia.addEventListener('timeupdate', mediaState);
videoPlayerMedia.addEventListener('click', playState);


function playState(){
  let video = videoPlayerMedia;

  if(video.paused  || video.ended){
    btnPlay.textContent = "Pause";
    video.play();
  }else{
    btnPlay.textContent = "Play";
    video.pause();
  }
}

function mediaState(e){
  let max = 100,
      progressValue = 0,
      progressIndicator = videoPlayer.querySelector('.barProgress'),
      video = e.target;

  if(!video.ended){
    progressValue = parseInt(video.currentTime * max / video.duration);
    progressIndicator.style.width = `${progressValue}%`;
  }else{
    progressIndicator.style.width = '0%';
    btnPlay.textContent = 'Play';
  }

  timeLabelState();
}

function timeLabelState() {
  let video = videoPlayerMedia,
    currentTimeMins = Math.floor(video.currentTime / 60),
    currentTimeSecs = Math.floor(video.currentTime - currentTimeMins * 60),
    durationMins = Math.floor(video.duration / 60),
    durationSecs = Math.floor(video.duration - durationMins * 60);

  if(currentTimeMins < 10) currentTimeMins = '0'+currentTimeMins;
  if(currentTimeSecs < 10) currentTimeSecs = '0'+currentTimeSecs;
  if(durationMins < 10) durationMins = '0'+durationMins;
  if(durationSecs < 10) durationSecs = '0'+durationSecs;

  timeLabel.textContent = `${currentTimeMins}:${currentTimeSecs} / ${durationMins}:${durationSecs}`;
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
  if(!videoPlayerMedia.ended) videoPlayerMedia.play();
}

function muteState(){
  let video = videoPlayerMedia;

  if(!video.muted){
    video.muted = true;
    btnMute.textContent = 'Unmute';
  }else{
    video.muted = false;
    btnMute.textContent = 'Mute';
  }
}

function fullscreenState() {
  let video = videoPlayerMedia;

  if(video.requestFullscreen){
    video.requestFullscreen();
  }else if(video.mozRequestFullScreen){
    video.mozRequestFullScreen();
  }else if(video.webkitRequestFullScreen){
    video.webkitRequestFullScreen();
  }
}


function showTooltip(e) {
  let tooltipBody = document.createElement('div'),
      bar = e.target.getBoundingClientRect();

  tooltipBody.className = 'tooltip';
  tooltipBody.textContent = getTimeTooltip(e);
  document.body.appendChild(tooltipBody);

  tooltipBody.setAttribute('style', `top: ${bar.top - bar.height - 5}px; left: ${e.pageX}px;`);

}

function updateTooltip(e){
  let tooltip = document.querySelector('.tooltip'),
      bar = e.target.getBoundingClientRect();

  tooltip.textContent = getTimeTooltip(e);
  tooltip.setAttribute('style', `top: ${bar.top - bar.height - 7}px; left: ${e.pageX}px;`);
}

function hideTooltip() {
  document.querySelector('.tooltip').remove();
}

function getTimeTooltip(e){
  let bar = e.target.getBoundingClientRect(),
      max = bar.width,
      positionX = e.pageX - bar.left,
      currentTime = positionX * videoPlayerMedia.duration / max,
      currentTimeMins = Math.floor(currentTime / 60),
      currentTimeSecs = Math.floor(currentTime - currentTimeMins * 60);

  if(currentTimeMins < 10) currentTimeMins = '0'+currentTimeMins;
  if(currentTimeSecs < 10) currentTimeSecs = '0'+currentTimeSecs;

  return `${currentTimeMins}:${currentTimeSecs}`;
}
