// 1. Menghilangkan layar loading setelah website siap
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading');
  // Beri sedikit jeda agar teks loading terlihat (1 detik)
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 800); // Waktu transisi menghilang
  }, 1000);
});

// Deklarasi variabel musik
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

// 2. Fungsi saat tombol "Begin Our Journey" diklik
function scrollNext() {
  // Mainkan musik
  music.play().then(() => {
    isPlaying = true;
    musicBtn.innerHTML = '⏸️'; // Ubah ikon ke pause
  }).catch((err) => {
    console.log("Autoplay musik dicegah oleh browser.", err);
  });

  // Scroll perlahan ke bagian chapter pertama
  const firstChapter = document.querySelector('.chapter');
  firstChapter.scrollIntoView({ behavior: 'smooth' });
}

// 3. Fungsi tombol musik melayang (Play/Pause)
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicBtn.innerHTML = '🎵'; // Ubah ikon ke play
  } else {
    music.play();
    musicBtn.innerHTML = '⏸️'; // Ubah ikon ke pause
  }
  isPlaying = !isPlaying;
});

// 4. Animasi elemen muncul saat di-scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 }); // Muncul ketika 10% elemen terlihat di layar

// Menerapkan efek sembunyi/muncul ke semua section
const sections = document.querySelectorAll('.chapter, .ending');
sections.forEach((section) => {
  section.classList.add('hidden'); // Sembunyikan semua elemen di awal
  observer.observe(section);       // Pantau elemen
});
