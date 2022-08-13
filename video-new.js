// setting the video variables
const videoProgress = [];
const quizForm = document.getElementById('quizForm');
const playBtn = document.querySelector('#play-button');
const fullscreenBtn = document.querySelector('#fullscreen-video');
const videoText = document.querySelector('#name-overlay');
const closeBtn = document.querySelector('#close-video');
const homeworkWrapper = document.getElementById('homework');
const player = document.querySelector('#main-video');
const vimeoPlayer = new Vimeo.Player(player);

playBtn.addEventListener('click', goFullScreen);
fullscreenBtn.addEventListener('click', goFullScreen);
//
quizForm.style.display = 'none';
//
fullscreenBtn.addEventListener('click', goFullScreen);
videoText.addEventListener('click', playerPlay);

// video plays/pauses
vimeoPlayer.on('pause', () => {
  // we set up a listener function for the pause event, which posts the data as soon as the video pauses.
  updateProgress();
  videoText.classList.add('add-active');
  playBtn.style.display = 'flex';
  homeworkWrapper.classList.remove('not-active');
});
vimeoPlayer.on('play', () => {
  playBtn.style.display = 'none';
});

// tracking video progress
vimeoPlayer.on('progress', (data) => {
  console.log('progress', data);
  const currentPercent = Math.ceil(data.percent * 100);
  if (videoProgress.indexOf(currentPercent) != -1) {
    return;
  }
  let timestamp = new Date().getTime();
  timestamp = Math.floor(timestamp / 1000);
  videoProgress.push(currentPercent);
  videoProgress.lastUpdate = timestamp;
});

setInterval(updateProgress, 1000);
function updateProgress() {
  if (videoProgress.lastSent == videoProgress.lastUpdate) {
    return;
  }
  videoProgress.lastSent = videoProgress.lastUpdate;
  localStorage.setItem(
    'videoFrameNumber',
    videoProgress[videoProgress.length - 1]
  );
}

// fullscreen the video
function goFullScreen() {
  const player = document.querySelector('#main-video');
  const vimeoPlayer = new Vimeo.Player(player);
  const playerWrapper = document.querySelector('#vimeo-video');
  vimeoPlayer.play();
  videoText.classList.remove('add-active');
  closeBtn.classList.add('add-active');
  fullscreenBtn.classList.remove('add-active');
  if (playerWrapper.requestFullscreen) {
    playerWrapper.requestFullscreen();
  } else if (playerWrapper.mozRequestFullScreen) {
    playerWrapper.mozRequestFullScreen();
  } else if (playerWrapper.webkitRequestFullscreen) {
    playerWrapper.webkitRequestFullscreen();
  } else if (playerWrapper.msRequestFullscreen) {
    playerWrapper.msRequestFullscreen();
  }
}

// play video in fullscreen mode
function playerPlay() {
  const player = document.querySelector('#main-video');
  const vimeoPlayer = new Vimeo.Player(player);
  vimeoPlayer.play();
  videoText.classList.remove('add-active');
}

// exit the fullscreen
closeBtn.addEventListener('click', exitFullScreen);

function exitFullScreen() {
  closeBtn.classList.remove('add-active');
  homeworkWrapper.classList.add('not-active');
  fullscreenBtn.classList.remove('add-active');
  if (videoProgress[videoProgress.length - 1] === 100) {
    quizForm.style.display = 'block';
  } else {
    quizForm.style.display = 'none';
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
