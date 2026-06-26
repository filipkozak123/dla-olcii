// sekcja
const introPage = document.getElementById("introPage");
const riddlePage = document.getElementById("riddlePage");
const errorPopup = document.getElementById("errorPopup");
const envelopePage = document.getElementById("envelopePage");
const letter = document.getElementById("letter");
const galleryPage = document.getElementById("galleryPage");
const finalPage = document.getElementById("finalPage");
const loveBurstPopup = document.getElementById("loveBurstPopup");
const proposalQuestionPage = document.getElementById("proposalQuestionPage");
const ultimatePage = document.getElementById("ultimatePage");

// muzyka
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.1;
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;
musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerText = "🔇";
    } else {
        bgMusic.play().catch(e => console.log("Audio block:", e));
        musicBtn.innerText = "🔊";
    }
    isPlaying = !isPlaying;
});

/* =======================================================
   Zanikanie
   ======================================================= */
document.getElementById("startBtn").addEventListener("click", () => {
    introPage.style.opacity = "0";
    bgMusic.play().then(() => { isPlaying = true; musicBtn.innerText = "🔊"; }).catch(() => {});
    
    setTimeout(() => {
        introPage.classList.add("hidden");
        riddlePage.classList.remove("hidden");
        riddlePage.style.opacity = "1";
    }, 1000);
});

/* =======================================================
   2. Hasło
   ======================================================= */
const secretPassword = "31122025"; // Zmień na Waszą datę rocznicy
const passwordInput = document.getElementById("passwordInput");

document.getElementById("loginBtn").addEventListener("click", () => {
    if (passwordInput.value === secretPassword) {
        riddlePage.classList.add("hidden");
        envelopePage.classList.remove("hidden");
    } else {
        errorPopup.classList.remove("hidden");
    }
});

document.getElementById("closeErrorBtn").addEventListener("click", () => {
    errorPopup.classList.add("hidden");
    passwordInput.value = "";
    passwordInput.focus();
});

/* =======================================================
   3. List
   ======================================================= */
const envelope = document.getElementById("envelope");
const goToGalleryBtn = document.getElementById("goToGalleryBtn");
let letterOpened = false;

envelope.addEventListener("click", function(e) {
    if (letterOpened || e.target === goToGalleryBtn) return;
    letterOpened = true;
    this.classList.add("open");
    
    setTimeout(startTypewriter, 1000);
});

const loveLetterText = `Mineło już pół roku...\n\n Nie wiem kiedy to zleciało, ale wiem jedno. Każdy dzień z Tobą jest lepszy od poprzedniego.\n\n Chcę zbierać z Tobą sekundy, minuty i całe lata.\n\nDziękuję Ci za wszystkie wspólne chwile, za śmiech, za wsparcie, za wspomnienia które tworzymy każdego dnia.\n\nI mam nadzieję, że to dopiero początek naszej historii. ❤️`;

function startTypewriter() {
    const textContainer = document.getElementById("typewriterText");
    let index = 0;
    
    function type() {
        if (index < loveLetterText.length) {
            textContainer.innerHTML += loveLetterText.charAt(index);
            index++;
            letter.scrollTop = letter.scrollHeight;
            setTimeout(type, 50);
        } else {
            goToGalleryBtn.classList.remove("hidden");
        }
    }
    type();
}

goToGalleryBtn.addEventListener("click", () => {
    envelopePage.classList.add("hidden");
    galleryPage.classList.remove("hidden");
});

/* =======================================================
   4. Galeria
   ======================================================= */
const loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn.addEventListener("click", () => {
    document.querySelectorAll(".hidden-photo").forEach(item => {
        item.classList.remove("hidden-photo");
    });
    loadMoreBtn.classList.add("hidden");
});

document.getElementById("goToFinalBtn").addEventListener("click", () => {
    galleryPage.classList.add("hidden");
    finalPage.classList.remove("hidden");
    buildFinalPageLayout();
});

// LIGHTBOX 
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxVideo = document.getElementById("lightboxVideo");

document.querySelectorAll(".media-item").forEach(item => {
    item.addEventListener("click", (e) => {
        lightbox.classList.remove("hidden");
        if (item.tagName === "VIDEO") {
            lightboxImg.classList.add("hidden");
            lightboxVideo.classList.remove("hidden");
            lightboxVideo.src = item.querySelector("source").src;
            lightboxVideo.play();
        } else {
            lightboxVideo.classList.add("hidden");
            lightboxImg.classList.remove("hidden");
            lightboxImg.src = item.src;
        }
        e.stopPropagation();
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightboxVideo.pause();
    lightboxVideo.src = "";
});

/* =======================================================
   5. Koniec
   ======================================================= */
let heartIntervalTime = 300;
let heartTimer = null;

function buildFinalPageLayout() {
    finalPage.innerHTML = "";
    const finalLayout = document.createElement("div");
    finalLayout.classList.add("final-layout");

    // KOLUMNA 1: TERMOMETR
    const leftBox = document.createElement("div");
    leftBox.classList.add("final-side-box");
    leftBox.innerHTML = `
        <h3>Licznik Miłości! ⚡</h3>
        <div class="progress-bar-container">
            <div id="loveProgress"></div>
            <div id="progressText">0%</div>
        </div>
        <button id="kissBtn">Wyślij buziaka 😘</button>
    `;

    // KOLUMNA 2: ŚRODEK 
    const centerBox = document.createElement("div");
    centerBox.classList.add("final-center");
    centerBox.innerHTML = `
        <div class="heart-pulse">❤️</div>
        <h1>Kocham Cię</h1>
        <div class="counter-live">
            <div class="counter-box"><span class="num" id="c-days">0</span><span class="label">Dni</span></div>
            <div class="counter-box"><span class="num" id="c-hours">0</span><span class="label">Godz</span></div>
            <div class="counter-box"><span class="num" id="c-mins">0</span><span class="label">Min</span></div>
            <div class="counter-box"><span class="num" id="c-secs">0</span><span class="label">Sek</span></div>
        </div>
        <button id="finalProposalBtn" style="margin-top:25px; display:none; border-color:#fff; color:#fff;">Dalej... 👀</button>
    `;

    // KOLUMNA 3: losowanie
    const rightBox = document.createElement("div");
    rightBox.classList.add("final-side-box");
    rightBox.innerHTML = `
        <h3>Dlaczego Cię kocham? 🤔</h3>
        <p id="reasonText">Kliknij przycisk, aby wylosować...</p>
        <button id="reasonBtn">Wylosuj powód ❤️</button>
    `;

    finalLayout.appendChild(leftBox);
    finalLayout.appendChild(centerBox);
    finalLayout.appendChild(rightBox);
    finalPage.appendChild(finalLayout);

    initFinalFeatures();
}

function initFinalFeatures() {
    const kissBtn = document.getElementById("kissBtn");
    const loveProgress = document.getElementById("loveProgress");
    const progressText = document.getElementById("progressText");
    let clicks = 0;
    const maxClicks = 10;

    kissBtn.addEventListener("click", (e) => {
        if (clicks >= maxClicks) return;
        clicks++;
        let pct = (clicks / maxClicks) * 100;
        loveProgress.style.width = pct + "%";
        progressText.innerText = pct + "%";

        for(let i=0; i<3; i++) createFloatingKiss(e.clientX, e.clientY);

        if (clicks === maxClicks) {
            kissBtn.innerText = "Naładowano! ❤️";
            document.body.classList.add("love-burst");
            heartIntervalTime = 80;
            startHeartRain();
            
            setTimeout(() => {
                loveBurstPopup.classList.remove("hidden");
            }, 600);
        }
    });

    const startDate = new Date("2025-12-31T00:00:00");
    function updateClock() {
        const diff = new Date() - startDate;
        document.getElementById("c-days").innerText = Math.floor(diff / (1000*60*60*24));
        document.getElementById("c-hours").innerText = String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2, '0');
        document.getElementById("c-mins").innerText = String(Math.floor((diff / (1000*60)) % 60)).padStart(2, '0');
        document.getElementById("c-secs").innerText = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    }
    setInterval(updateClock, 1000);
    updateClock();

    const loveReasons = [
        "Bo przy Tobie czuję się sobą.",
        "Za to, jak na mnie patrzysz.",
        "Za Twoje ciepło i opiekuńczość.",
        "Za Twój piękny uśmiech, który potrafi naprawić mój najgorszy dzień.",
        "Za Twoje wsparcie w każdym momencie, kiedy tego najbardziej potrzebuję.",
        "Za Twoją mądrość i to, jak wiele się od Ciebie uczę każdego dnia.",
        "Za Twoje dobre serce i to, z jaką empatią patrzysz na świat.",
        "Za to, że potrafisz mnie uspokoić samym swoim przytuleniem.",
        "Za wszystkie wspólne wspomnienia i te, które dopiero stworzymy.",
        "Za to, że dbasz o mnie każdego dnia na milion małych sposobów.",
        "Za to, że przy Tobie chcę być lepszym człowiekiem.",
        "Za to, że jesteś moją najlepszą przyjaciółką i miłością w jednym.",
        "Po prostu za to, że JESTEŚ. Bez Ciebie wszystko byłoby nudne.",
        "Za to, że wierzysz we mnie nawet wtedy, kiedy ja sam w siebie wątpię.",
        "Po prostu za to, że jesteś kompletnie moja."
    ]; 

    const reasonBtn = document.getElementById("reasonBtn");
    const reasonText = document.getElementById("reasonText");
    reasonBtn.addEventListener("click", () => {
        reasonText.style.opacity = 0;
        setTimeout(() => {
            let index = Math.floor(Math.random() * loveReasons.length);
            reasonText.innerText = loveReasons[index];
            reasonText.style.opacity = 1;
            reasonBtn.innerText = "Jeszcze raz... 🔁";
        }, 300);
    });
}

document.getElementById("closeBurstBtn").addEventListener("click", () => {
    loveBurstPopup.classList.add("hidden");
    document.getElementById("finalProposalBtn").style.display = "inline-block";
});

document.addEventListener("click", (e) => {
    if(e.target && e.target.id === "finalProposalBtn") {
        proposalQuestionPage.classList.remove("hidden");
        initEvasionButton();
    }
});

/* =======================================================
   6. spierdalajacy przycisk
   ======================================================= */
function initEvasionButton() {
    const noBtn = document.getElementById("noBtn");
    const container = noBtn.parentElement;

    function moveButton() {
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * (maxY + 60)) - 30;

        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
    }

    noBtn.addEventListener("mouseenter", moveButton);
    noBtn.addEventListener("click", moveButton);
}

document.getElementById("yesBtn").addEventListener("click", () => {
    proposalQuestionPage.classList.add("hidden");
    finalPage.classList.add("hidden");
    document.body.classList.remove("love-burst");
    
    ultimatePage.classList.remove("hidden");
    
    heartIntervalTime = 50;
    startHeartRain();
    if(bgMusic.paused) bgMusic.play();
});

/* =======================================================
   7. serce wiadomosc
   ======================================================= */
document.getElementById("crackingHeart").addEventListener("click", function() {
    if(this.classList.contains("cracked")) return;
    this.classList.add("cracked");
    document.querySelector(".instruction").style.display = "none";
    
    setTimeout(() => {
        document.getElementById("secretMessage").classList.remove("hidden");
    }, 600);
});

/* =======================================================
   generator
   ====================================================== */
function startHeartRain() {
    if (heartTimer) clearInterval(heartTimer);
    heartTimer = setInterval(createHeart, heartIntervalTime);
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("falling-heart");
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";

    const duration = Math.random() * 2 + 2;
    heart.style.animationDuration = duration + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, duration * 1000);
}

function createFloatingKiss(startX, startY) {
    const kiss = document.createElement("div");
    kiss.classList.add("floating-kiss");
    const icons = ["😘", "❤️", "💋", "💕"];
    kiss.innerText = icons[Math.floor(Math.random() * icons.length)];
    kiss.style.left = (startX - 12) + "px";
    kiss.style.top = (startY - 12) + "px";
    
    const randomX = (Math.random() * 60 - 30) + "px";
    kiss.style.setProperty("--mx", randomX);
    
    document.body.appendChild(kiss);
    setTimeout(() => { kiss.remove(); }, 800);
}
