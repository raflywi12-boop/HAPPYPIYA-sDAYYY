// 1. Progress Bar
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
    document.getElementById("progressText").innerText = Math.round(scrolled) + "%";
};

// 2. Begin Journey
const music = document.getElementById("music");
function beginJourney() {
    music.play().catch(e => console.log("Autoplay blocked."));
    document.querySelector('.timeline-section').scrollIntoView({ behavior: 'smooth' });
}

// 3. Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if(entry.target.id === 'letterSection' && !isTypingStarted) {
                startTypewriter();
            }
            if(entry.target.id === 'endingSection' && !isSlideshowDone) {
                startRapidSlideshow();
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// 4. Popups
function showPopup(title, desc) {
    document.getElementById('tlTitle').innerText = title;
    document.getElementById('tlDesc').innerText = desc;
    document.getElementById('timelinePopup').style.display = 'flex';
}
function openLightbox(imgSrc, caption) {
    document.getElementById('lbImg').src = imgSrc;
    document.getElementById('lbCap').innerText = caption;
    document.getElementById('lightbox').style.display = 'flex';
}
function openArsenalPopup() {
    document.getElementById('arsenalPopup').style.display = 'flex';
}
function openSecretLetter() {
    document.getElementById('secretPopup').style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// 5. Typewriter
const letterText = "Hai sayang.\nSelamat ulang tahun.\nAku tahu beberapa bulan terakhir kita tidak selalu mudah. Kita pernah salah paham. Kita pernah saling menangis.\nTapi di balik semua itu, aku melihat satu hal.\nKamu tidak pernah berhenti berusaha.\nDan itu adalah alasan kenapa aku masih memilihmu setiap hari.";
let i = 0;
let isTypingStarted = false;

function startTypewriter() {
    isTypingStarted = true;
    const speed = 50; 
    function type() {
        if (i < letterText.length) {
            document.getElementById("typewriterText").innerHTML += letterText.charAt(i) === '\n' ? '<br><br>' : letterText.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            document.getElementById("heartSignature").classList.add('show');
        }
    }
    type();
}

// 6. Gamification Button "NO"
const btnNo = document.getElementById("btnNo");
btnNo.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btnNo.style.position = "fixed";
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
});
btnNo.addEventListener("click", () => { btnNo.innerHTML = "Tetap YES! 😂"; });

function goToEnding() {
    document.getElementById("endingSection").scrollIntoView({ behavior: 'smooth' });
}

// 7. Ending Slideshow & Confetti
let isSlideshowDone = false;
// Daftar foto untuk efek kedip cepat sebelum berhenti
const photos = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"]; 

function startRapidSlideshow() {
    isSlideshowDone = true;
    const imgEl = document.getElementById('rapidSlideshow');
    imgEl.style.display = 'block';
    
    let flashCount = 0;
    const maxFlashes = 10; 
    
    const interval = setInterval(() => {
        imgEl.src = photos[Math.floor(Math.random() * photos.length)];
        flashCount++;
        
        if(flashCount >= maxFlashes) {
            clearInterval(interval);
            // FOTO YANG MUNCUL TERAKHIR SAAT SLIDESHOW BERHENTI
            imgEl.src = "photo1.jpg"; 
            
            document.getElementById('finalText').classList.add('show');
            startConfetti();
            let vol = 1;
            let fadeOut = setInterval(() => {
                if(vol > 0.2) { vol -= 0.1; music.volume = vol; }
                else { clearInterval(fadeOut); }
            }, 500);
        }
    }, 150);
}

// 8. Confetti
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 100,
            color: ['#E8C76A', '#A8B89A', '#FFFDF8', '#FF4D6D'][Math.floor(Math.random() * 4)],
            tilt: Math.random() * 10
        });
    }
    
    let angle = 0;
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angle += 0.01;
        for(let i=0; i<particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
            ctx.stroke();
            
            p.y += Math.cos(angle + p.d) + 1 + p.r/2;
            p.x += Math.sin(angle);
            
            if(p.y > canvas.height) {
                particles[i] = {x: Math.random() * canvas.width, y: -10, r: p.r, d: p.d, color: p.color, tilt: p.tilt};
            }
        }
    }, 20);
}
