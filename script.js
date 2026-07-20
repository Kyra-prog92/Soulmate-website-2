// ===== GLOBAL STATE =====
let currentScene = 1;
let musicPlaying = false;
let chestOpened = false;
const correctPassword = 'lovers';

// ===== AUDIO =====
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = musicBtn.querySelector('.music-icon');

function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.innerHTML = '&#9654;';
        musicBtn.classList.remove('playing');
        musicPlaying = false;
    } else {
        bgMusic.play().then(() => {
            musicIcon.innerHTML = '&#10073;&#10073;';
            musicBtn.classList.add('playing');
            musicPlaying = true;
        }).catch(err => {
            console.log('Audio play failed:', err);
        });
    }
}

// ===== SCENE NAVIGATION =====
function enterWorld() {
    document.getElementById('scene1').style.display = 'none';
    document.getElementById('scene2').classList.add('active');
    document.getElementById('scene2').classList.add('visible');
    currentScene = 2;
    updateNavDots();
    document.getElementById('scrollIndicator').classList.add('visible');
    document.getElementById('navDots').classList.add('visible');
}

function goToMemories() {
    document.getElementById('scene2').style.display = 'none';
    document.getElementById('scene3').classList.add('active');
    document.getElementById('scene3').classList.add('visible');
    currentScene = 3;
    updateNavDots();
    initMemoryObserver();
}

function goToWish() {
    document.getElementById('scene3').style.display = 'none';
    document.getElementById('scene4').classList.add('active');
    document.getElementById('scene4').classList.add('visible');
    currentScene = 4;
    updateNavDots();
    revealWishText();
}

function goToPromise() {
    document.getElementById('scene4').style.display = 'none';
    document.getElementById('scene5').classList.add('active');
    document.getElementById('scene5').classList.add('visible');
    currentScene = 5;
    updateNavDots();
    revealPromiseText();
}

function goToFinale() {
    document.getElementById('scene5').style.display = 'none';
    document.getElementById('scene6').classList.add('active');
    document.getElementById('scene6').classList.add('visible');
    currentScene = 6;
    updateNavDots();
    document.getElementById('scrollIndicator').classList.remove('visible');
}

function goToScene(sceneNum) {
    for (let i = 1; i <= 6; i++) {
        const scene = document.getElementById('scene' + i);
        scene.style.display = 'none';
        scene.classList.remove('active');
    }

    const targetScene = document.getElementById('scene' + sceneNum);
    targetScene.style.display = 'flex';
    targetScene.classList.add('active');
    targetScene.classList.add('visible');
    currentScene = sceneNum;
    updateNavDots();

    if (sceneNum === 3) {
        initMemoryObserver();
    } else if (sceneNum === 4) {
        revealWishText();
    } else if (sceneNum === 5) {
        revealPromiseText();
    }

    if (sceneNum === 6) {
        document.getElementById('scrollIndicator').classList.remove('visible');
    } else {
        document.getElementById('scrollIndicator').classList.add('visible');
    }
}

function updateNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentScene) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function reliveStory() {
    for (let i = 1; i <= 6; i++) {
        const scene = document.getElementById('scene' + i);
        scene.style.display = 'none';
        scene.classList.remove('active');
        scene.classList.remove('visible');
    }

    document.getElementById('chestLid').classList.remove('open');
    document.getElementById('passwordSection').classList.remove('visible');
    document.getElementById('parchmentWrapper').classList.remove('visible');
    document.getElementById('continueBtn1').classList.remove('visible');
    document.getElementById('waxSeal').classList.remove('melted');
    document.getElementById('passwordInput').value = '';
    chestOpened = false;

    const letterParagraphs = document.querySelectorAll('#letterContent p');
    letterParagraphs.forEach(p => p.classList.remove('visible'));

    const wishParagraphs = document.querySelectorAll('#wishContent p');
    wishParagraphs.forEach(p => p.classList.remove('visible'));
    const promiseParagraphs = document.querySelectorAll('#promiseContent p');
    promiseParagraphs.forEach(p => p.classList.remove('visible'));

    document.getElementById('scene1').style.display = 'flex';
    document.getElementById('scene1').classList.add('visible');
    currentScene = 1;
    updateNavDots();
    document.getElementById('navDots').classList.remove('visible');
    document.getElementById('scrollIndicator').classList.remove('visible');

    window.scrollTo(0, 0);
}

// ===== CHEST & PASSWORD =====
function openChest() {
    if (chestOpened) return;
    chestOpened = true;

    const dustContainer = document.getElementById('goldenDust');
    dustContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        particle.style.animation = 'dustBurst 2s ease forwards';
        dustContainer.appendChild(particle);
    }
    dustContainer.classList.add('active');

    setTimeout(() => {
        document.getElementById('chestLid').classList.add('open');
    }, 300);

    setTimeout(() => {
        document.getElementById('passwordSection').classList.add('visible');
        document.getElementById('passwordInput').focus();
    }, 1500);
}

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const password = input.value.toLowerCase().trim();

    if (password === correctPassword) {
        input.style.borderColor = 'var(--gold)';
        input.style.boxShadow = '0 0 20px rgba(212,175,55,0.3)';
        document.getElementById('passwordSection').style.display = 'none';

        setTimeout(() => {
            document.getElementById('parchmentWrapper').classList.add('visible');
            setTimeout(() => {
                document.getElementById('waxSeal').classList.add('melted');
            }, 1000);
            revealLetterText();
        }, 500);
    } else {
        input.classList.add('error');
        setTimeout(() => {
            input.classList.remove('error');
        }, 500);
    }
}

function revealLetterText() {
    const paragraphs = document.querySelectorAll('#letterContent p');
    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.classList.add('visible');
        }, 500 + (index * 400));
    });

    setTimeout(() => {
        document.getElementById('continueBtn1').classList.add('visible');
    }, 500 + (paragraphs.length * 400) + 1000);
}

function revealWishText() {
    const paragraphs = document.querySelectorAll('#wishContent p');
    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.classList.add('visible');
        }, 300 + (index * 300));
    });

    setTimeout(() => {
        document.getElementById('continueBtn3').classList.add('visible');
    }, 300 + (paragraphs.length * 300) + 500);
}

function revealPromiseText() {
    const paragraphs = document.querySelectorAll('#promiseContent p');
    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.classList.add('visible');
        }, 300 + (index * 300));
    });

    setTimeout(() => {
        document.getElementById('continueBtn4').classList.add('visible');
    }, 300 + (paragraphs.length * 300) + 500);
}

// ===== MEMORY OBSERVER =====
function initMemoryObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        observer.observe(item);
    });

    setTimeout(() => {
        document.getElementById('continueBtn2').classList.add('visible');
    }, 3000);
}

// ===== PARTICLE SYSTEM =====
function createParticles() {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(212, 175, 55, ' + (Math.random() * 0.5 + 0.2) + ')';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.boxShadow = '0 0 ' + (Math.random() * 10 + 5) + 'px rgba(212, 175, 55, 0.5)';
        particle.style.animation = 'fireflyFloat ' + (Math.random() * 6 + 4) + 's ease-in-out infinite';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.position = 'fixed';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        document.body.appendChild(particle);
    }
}

function createFireflies() {
    const fireflyCount = 12;
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = Math.random() * 100 + 'vh';
        firefly.style.animationDelay = Math.random() * 8 + 's';
        firefly.style.animationDuration = (Math.random() * 4 + 6) + 's';
        document.body.appendChild(firefly);
    }
}

function createPetals() {
    const petalCount = 15;
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        document.body.appendChild(petal);
    }
}

function createDandelions() {
    const dandelionCount = 10;
    for (let i = 0; i < dandelionCount; i++) {
        const dandelion = document.createElement('div');
        dandelion.className = 'dandelion';
        dandelion.style.left = Math.random() * 100 + 'vw';
        dandelion.style.animationDuration = (Math.random() * 10 + 10) + 's';
        dandelion.style.animationDelay = Math.random() * 15 + 's';
        document.body.appendChild(dandelion);
    }
}

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 50 + 'vw';
    star.style.top = Math.random() * 30 + 'vh';
    star.style.animation = 'shoot 1.5s ease forwards';
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);
}

setInterval(() => {
    if (Math.random() > 0.7) {
        createShootingStar();
    }
}, 8000);

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const moon = document.querySelector('.moon');
    if (moon) {
        moon.style.transform = 'translate(' + (mouseX * 10) + 'px, ' + (mouseY * 10) + 'px)';
    }

    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        const speed = (index + 1) * 2;
        cloud.style.transform = 'translate(' + (mouseX * speed) + 'px, ' + (mouseY * speed) + 'px)';
    });
});

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
    createParticles();
    createFireflies();
    createPetals();
    createDandelions();

    setTimeout(() => {
        if (currentScene === 1) {
            document.getElementById('scrollIndicator').classList.add('visible');
        }
    }, 10000);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (currentScene < 6) {
            goToScene(currentScene + 1);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentScene > 1) {
            goToScene(currentScene - 1);
        }
    }
});
