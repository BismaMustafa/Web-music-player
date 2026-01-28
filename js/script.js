const wrapper = document.querySelector(".container");
const musicImg = document.querySelector(".image-area img");
const musicName = document.querySelector(".song-details .name");
const musicArtist = document.querySelector(".song-details .artist");

const playPauseBtn = document.querySelector(".play-pause");
const playIcon = playPauseBtn.querySelector("i");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const mainAudio = document.getElementById("main-audio");

const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");

const currentTimeEl = document.querySelector(".current-time");
const maxDurationEl = document.querySelector(".max-duration");

const musicList = document.querySelector(".music-list");
const moreMusicBtn = document.getElementById("more-music");
const closeBtn = document.getElementById("close");

let musicIndex = 0;

/* 🎵 MUSIC LIST (APNI AUDIO FILES KA PATH YAHAN DO) */
const allMusic = [
  {
    name: "Badmashi",
    artist: "Mankirt Aulakh",
    img: "badmashi.jfif",
    src: "Badmashi(KoshalWorld.Com)"
  },
  {
    name: "Before You Came",
    artist: "ABBA",
    img: "before you came.jfif",
    src: "BEFORE YOU CAME(KoshalWorld.Com)"
  },
  {
    name: "Maharani",
    artist: "Arpit Bala",
    img: "maharani.jfif",
    src: "MAHARANI(KoshalWorld.Com)"
  },
  {
    name: "My Time",
    artist: "Jungkook",
    img: "my-time.jfif",
    src: "MY TIME(KoshalWorld.Com)"
  },
  {
    name: "Rafta Rafta",
    artist: "Atif Aslam",
    img: "music-5.webp",
    src: "Rafta Rafta - Atif Aslam"
  },
  {
    name: "Saiyarra",
    artist: "Faheem Abdullah",
    img: "saiyara.jfif",
    src: "Saiyaara(KoshalWorld.Com)"
  },
  {
    name: "Udaarian",
    artist: "Satinder Sartaaj",
    img: "udaarian.jfif",
    src: "Udaarian"
  }
];

/* 🔁 LOAD SONG */
function loadMusic(index) {
  musicName.innerText = allMusic[index].name;
  musicArtist.innerText = allMusic[index].artist;
  musicImg.src = `images/${allMusic[index].img}`;
  mainAudio.src = `music/${allMusic[index].src}.mp3`;
}

/* ▶ PLAY MUSIC */
function playMusic() {
  wrapper.classList.add("paused");
  playIcon.innerText = "pause";
  mainAudio.play();
}

/* ⏸ PAUSE MUSIC */
function pauseMusic() {
  wrapper.classList.remove("paused");
  playIcon.innerText = "play_arrow";
  mainAudio.pause();
}

/* ▶⏸ PLAY / PAUSE BUTTON */
playPauseBtn.addEventListener("click", () => {
  const isPlaying = wrapper.classList.contains("paused");
  isPlaying ? pauseMusic() : playMusic();
});

/* ⏭ NEXT */
nextBtn.addEventListener("click", () => {
  musicIndex++;
  if (musicIndex >= allMusic.length) musicIndex = 0;
  loadMusic(musicIndex);
  playMusic();
});

/* ⏮ PREVIOUS */
prevBtn.addEventListener("click", () => {
  musicIndex--;
  if (musicIndex < 0) musicIndex = allMusic.length - 1;
  loadMusic(musicIndex);
  playMusic();
});

/* ⏱ UPDATE PROGRESS BAR */
mainAudio.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.target;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;
  currentTimeEl.innerText = `${currentMin}:${currentSec}`;

  if (duration) {
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    maxDurationEl.innerText = `${totalMin}:${totalSec}`;
  }
});

/* ⏩ CLICK TO SEEK */
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

/* 📃 SHOW / HIDE MUSIC LIST */
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  musicList.classList.remove("show");
});

/* 🎶 AUTO NEXT WHEN SONG ENDS */
mainAudio.addEventListener("ended", () => {
  nextBtn.click();
});

/* 🚀 INITIAL LOAD */
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});
const allLiTags = document.querySelectorAll(".music-list ul li");

allLiTags.forEach((li, index) => {
  li.addEventListener("click", () => {
    musicIndex = index;
    loadMusic(musicIndex);
    playMusic();
    highlightSong();
  });
});

function highlightSong() {
  allLiTags.forEach(li => {
    li.classList.remove("playing");
  });
  allLiTags[musicIndex].classList.add("playing");
}

/* 🔊 VOLUME CONTROL */
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");

// Default volume
mainAudio.volume = 1;

// Slider se volume change
volumeSlider.addEventListener("input", () => {
  mainAudio.volume = volumeSlider.value / 100;

  if (volumeSlider.value == 0) {
    volumeIcon.innerText = "volume_off";
  } else if (volumeSlider.value < 50) {
    volumeIcon.innerText = "volume_down";
  } else {
    volumeIcon.innerText = "volume_up";
  }
});

// DOM Elements
const addBtn = document.getElementById('add-song'); // + icon
const fileInput = document.getElementById('file-input');
const musicListUL = document.querySelector('.music-list ul');
// const mainAudio = document.getElementById('main-audio');
const songNameEl = document.querySelector('.song-details .name');
const artistEl = document.querySelector('.song-details .artist');

// const volumeSlider = document.getElementById('volume-slider');
// const volumeIcon = document.getElementById('volume-icon');

// --- Add new song ---
addBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;

    let songName = file.name.split('.').slice(0, -1).join('.');
    const words = songName.split(' ');
    if(words.length > 2){
        songName = words.slice(0,2).join(' ');
    }
    const artist = "Unknown Artist";

    // Check duplicates
    let exists = false;
    musicListUL.querySelectorAll('li').forEach(li => {
        const liName = li.querySelector('.row span').textContent;
        if(liName === songName){
            exists = true;
        }
    });
    if(exists){
        alert(`${songName} is already in the playlist!`);
        return;
    }

    // Create li element and store audio src
    const fileURL = URL.createObjectURL(file);
    const li = document.createElement('li');
    li.dataset.src = fileURL;
    li.innerHTML = `
        <div class="row">
            <span>${songName}</span>
            <p>${artist}</p>
        </div>
        <span class="delete-song material-icons">delete</span>
    `;
    musicListUL.appendChild(li);

    // Play immediately
    mainAudio.src = fileURL;
    mainAudio.play();
    songNameEl.textContent = songName;
    artistEl.textContent = artist;

    // Highlight current song
    musicListUL.querySelectorAll('li').forEach(item => item.classList.remove('playing'));
    li.classList.add('playing');
});

// --- Play on click (all songs) ---
musicListUL.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if(!li) return;

    // Delete button click handled separately
    if(e.target.classList.contains('delete-song')) return;

    const songName = li.querySelector('.row span').textContent;
    const artist = li.querySelector('.row p').textContent;
    const songSrc = li.dataset.src;

    if(songSrc){
        mainAudio.src = songSrc;
        mainAudio.play();
        songNameEl.textContent = songName;
        artistEl.textContent = artist;

        // Highlight current song
        musicListUL.querySelectorAll('li').forEach(item => item.classList.remove('playing'));
        li.classList.add('playing');
    }
});

// --- Delete song ---
musicListUL.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-song')){
        const li = e.target.closest('li');
        const songName = li.querySelector('.row span').textContent;
        li.remove();
    }
});

// --- Volume control ---
volumeSlider.addEventListener('input', () => {
    mainAudio.volume = volumeSlider.value / 100;

    if(volumeSlider.value == 0){
        volumeIcon.textContent = 'volume_off';
    } else {
        volumeIcon.textContent = 'volume_up';
    }
});

// --- Mute/Unmute on icon click ---
volumeIcon.addEventListener('click', () => {
    if(mainAudio.muted){
        mainAudio.muted = false;
        volumeIcon.textContent = 'volume_up';
        volumeSlider.value = mainAudio.volume * 100;
    } else {
        mainAudio.muted = true;
        volumeIcon.textContent = 'volume_off';
        volumeSlider.value = 0;
    }
});
