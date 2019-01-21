const videoPlayer = document.getElementById('simpleVideoPlayer');
const videoPlayerMedia = videoPlayer.querySelector('.media');
const btnPlay = videoPlayer.querySelector('.playControl');

btnPlay.addEventListener('click', e => {
  let textContent = e.target.textContent;
console.log(textContent);
  if(textContent === "Play"){
    e.target.textContent = "Pause";
    videoPlayerMedia.play();
  }else if(textContent === "Pause"){
    e.target.textContent = "Play";
    videoPlayerMedia.pause();
  }
});
