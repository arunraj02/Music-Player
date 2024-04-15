let allSongs = [
    {
        songName : "Ordinary Person",
        artist : "Anirudh Ravichander, Nikhita Gandhi",
        img : "images/ordinary-person.jpg",
        src : "audios/music-1.mp3"
    },
    {
        songName : "Warriyo Mortals",
        artist : "Laura Brehm",
        img : "images/mortals.jpg",
        src : "audios/music-2.mp3"
    },
    {
        songName : "Heros Tonight",
        artist : "Janji & Johnning",
        img : "images/heros tonight.jpg",
        src : "audios/music-3.mp3"
    },
    {
        songName : "Elektronomia - Sky High",
        artist : "NCS Release",
        img : "images/sky-high.jpg",
        src : "audios/music-4.mp3"
    },
    {
        songName : "DEAF KEV - Invincible",
        artist : "NCS Release",
        img : "images/invincible.jpg",
        src : "audios/music-5.mp3"
    },
    {
        songName : "Cartoon - On & On",
        artist : "Daniel Levi",
        img : "images/On & On.jpg",
        src : "audios/music-6.mp3"
    }
]

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('main-audio');
    const playPauseBtn = document.querySelector('.play-pause');
    const muteUnmuteBtn = document.querySelector('.mute-unmute');
    const repeatBtn = document.querySelector('.fa-repeat');
    const forwardBtn = document.querySelector('.fa-forward-step');
    const backwardBtn = document.querySelector('.fa-backward-step');
    const songName = document.querySelector('.songName');
    const artist = document.querySelector('.artist');
    const imgArea = document.querySelector('.img-area img');

    let currentIndex = 0;
    let isPlaying = false;
    let isMuted = false;

    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }

    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    function loadSong(song) {
        audio.src = song.src;
        songName.innerText = song.songName;
        artist.innerText = song.artist;
        imgArea.src = song.img;
    }

    function playNextSong() {
        currentIndex = (currentIndex + 1) % allSongs.length;
        loadSong(allSongs[currentIndex]);
        playSong();
    }

    function playPreviousSong() {
        currentIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
        loadSong(allSongs[currentIndex]);
        playSong();
    }

    function repeatSong() {
        audio.currentTime = 0;
        playSong();
    }

    function toggleMute() {
        if (isMuted) {
            audio.muted = false;
            isMuted = false;
            muteUnmuteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            audio.muted = true;
            isMuted = true;
            muteUnmuteBtn.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
        }
    }

//function for progress bar
    const progressBar = document.querySelector('.progress-bar');
    const currentTime = document.querySelector('.current-time');
    const maxDuration = document.querySelector('.max-duration');

    function updateProgressBar() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';
        currentTime.innerText = formatTime(audio.currentTime);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        let remainderSeconds = Math.floor(seconds % 60);
        if (remainderSeconds < 10) {
            remainderSeconds = '0' + remainderSeconds;
        }
        return `${minutes}:${remainderSeconds}`;
    }

    audio.addEventListener('timeupdate', updateProgressBar);
    audio.addEventListener('loadedmetadata', function() {
        maxDuration.innerText = formatTime(audio.duration);
    });

    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    muteUnmuteBtn.addEventListener('click', toggleMute);
    repeatBtn.addEventListener('click', repeatSong);
    forwardBtn.addEventListener('click', playNextSong);
    backwardBtn.addEventListener('click', playPreviousSong);

    // Load the first song
    loadSong(allSongs[currentIndex]);
});