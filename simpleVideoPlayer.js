const videoPlayer = document.getElementById('simpleVideoPlayer'),
      videoPlayerMedia = videoPlayer.querySelector('.media'),
      btnPlay = videoPlayer.querySelector('.playControl'),
      barControl = videoPlayer.querySelector('.barControl'),
      btnMute = videoPlayer.querySelector('.muteControl'),
      btnFullscreen = videoPlayer.querySelector('.fullscreenControl'),
      timeLabel = videoPlayer.querySelector('.timeLabel'),
      volumeControl = videoPlayer.querySelector('#volumeControl');

const icons = {
  play: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7 6v12l10-6z'/></svg>",
  pause: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M8 7h3v10H8zM13 7h3v10h-3z'/></svg>",
  mute: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M13.472 3.118c-.324-.174-.72-.154-1.026.05L7.727 6.313l-4.02-4.02L2.293 3.707l18 18 1.414-1.414-2.02-2.02c1.441-1.686 2.312-3.85 2.312-6.273 0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7 0 1.832-.63 3.543-1.671 4.914l-1.286-1.286C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4C14 3.631 13.797 3.292 13.472 3.118zM12 5.868v4.718L9.169 7.755 12 5.868zM3 17h3.697l5.748 3.832C12.612 20.943 12.806 21 13 21c.162 0 .324-.039.472-.118C13.797 20.708 14 20.369 14 20v-1.879l-2-2v2.011l-4.445-2.964C7.391 15.059 7.197 15 7 15H4V9h.879L2.899 7.021C2.396 7.073 2 7.483 2 8v8C2 16.553 2.447 17 3 17z'/></svg>",
  unmute: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M3 17h3.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm1-8h3c.197 0 .391-.059.555-.168L12 5.868v12.264l-4.445-2.964A1.006 1.006 0 0 0 7 15H4V9zM16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z'/><path d='M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5z'/></svg>"
};


btnPlay.addEventListener('click', playState);
btnMute.addEventListener('click', muteState);
btnFullscreen.addEventListener('click', fullscreenState);
barControl.addEventListener('click', moveProgress);
barControl.addEventListener('mouseover', showTooltip);
barControl.addEventListener('mousemove', updateTooltip);
barControl.addEventListener('mouseout', hideTooltip);
videoPlayerMedia.addEventListener('timeupdate', mediaState);
videoPlayerMedia.addEventListener('click', playState);
videoPlayerMedia.addEventListener('play', playTrigger);
volumeControl.addEventListener('input', volumeState);


(function(){
  btnPlay.innerHTML = icons.play;
  btnMute.innerHTML = icons.unmute;
})();


function playState(){
  let video = videoPlayerMedia;

  (video.paused  || video.ended)
    ? playTrigger()
    : pauseTrigger();
}

function playTrigger(){
  let video = videoPlayerMedia;

  btnPlay.innerHTML = icons.pause;
  video.play();
}

function pauseTrigger(){
  let video = videoPlayerMedia;

  btnPlay.innerHTML = icons.play;
  video.pause();
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
    btnPlay.innerHTML = icons.play;
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
  let bar = barControl.getBoundingClientRect(),
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
    btnMute.innerHTML = icons.mute;
  }else{
    video.muted = false;
    btnMute.innerHTML = icons.unmute;
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
  let tooltip = document.createElement('div'),
      bar = e.target.getBoundingClientRect();

  tooltip.className = 'tooltip';
  tooltip.textContent = getTimeTooltip(e);
  document.body.appendChild(tooltip);

  tooltip.setAttribute('style', `top: ${bar.y - tooltip.offsetHeight - bar.height}px; left: ${e.pageX - 10}px;`);
}

function updateTooltip(e){
  let tooltip = document.querySelector('.tooltip'),
      bar = e.target.getBoundingClientRect();

  tooltip.textContent = getTimeTooltip(e);
  tooltip.setAttribute('style', `top: ${bar.y - tooltip.offsetHeight - bar.height}px; left: ${e.pageX - 10}px;`);
}

function hideTooltip() {
  document.querySelector('.tooltip').remove();
}

function getTimeTooltip(e){
  let bar = e.target.getBoundingClientRect(),
      max = bar.width,
      positionX = e.pageX - bar.left,
      currentTime = positionX * videoPlayerMedia.duration / max,
      currentTimeMins = parseInt(currentTime / 60, 10),
      currentTimeSecs = parseInt(currentTime % 60, 10);

  if(currentTimeMins < 10) currentTimeMins = '0'+currentTimeMins;
  if(currentTimeSecs < 10) currentTimeSecs = '0'+currentTimeSecs;

  return `${currentTimeMins}:${currentTimeSecs}`;
}

function volumeState(e){
  let video = videoPlayerMedia,
      volume = e.target.value;

  video.volume = volume;
}
