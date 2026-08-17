const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

// Abre o cierra el menú al tocar el botón de hamburguesa
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.remove('hiding');
    navMenu.classList.toggle('active');
});

// Cierra el menú al instante tan pronto como comiences a deslizar hacia abajo
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Con un umbral muy pequeño (tan solo 3 píxeles de movimiento), el menú se contrae de inmediato
    if (currentScroll > lastScrollTop + 3 && navMenu.classList.contains('active')) {
        navMenu.classList.add('hiding');
        setTimeout(() => {
            navMenu.classList.remove('active', 'hiding');
        }, 250); // Tiempo de la animación
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Cierra el menú al hacer clic en los enlaces o botones internos
const navLinks = navMenu.querySelectorAll('a, button');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.add('hiding');
        setTimeout(() => {
            navMenu.classList.remove('active', 'hiding');
        }, 250);
    });
});

// Cierra el menú si haces clic fuera de él
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.add('hiding');
        setTimeout(() => {
            navMenu.classList.remove('active', 'hiding');
        }, 250);
    }
});

const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

function toggleModal() {
    modalOverlay.classList.toggle('open');
}

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) toggleModal();
});

const modeToggleBtn = document.getElementById('modeToggle');
const htmlElement = document.documentElement;
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');

modeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('night-mode');
    if (htmlElement.classList.contains('night-mode')) {
        modeToggleBtn.innerHTML = '☀️ Switch to Day Coffee';
        heroTitle.textContent = "Botanical cocktails & neon whispers in Mills 50";
        heroSubtitle.textContent = "The sun is down, the plants are resting, and the craft cocktails are waiting for your drama.";
    } else {
        modeToggleBtn.innerHTML = '🌙 Switch to Night Bar';
        heroTitle.textContent = "Urban nature & specialty coffee in Mills 50";
        heroSubtitle.textContent = "A sanctuary where specialty coffee, craft cocktails, and an exclusive botanical selection coexist to disconnect from the noise.";
    }
});

const funQuotes = [
    "🌿 Vibe check: You need an Iced Matcha and a plant you will probably name Bob.",
    "☕ Energy level: 2 sips away from fixing your entire life choices.",
    "🪴 Plant advice: If it dies, just buy another one and gaslight yourself into thinking it's a new species.",
    "🍸 Evening mood: You are 1 Garden Herb Spritz away from starting a podcast.",
    "✨ Reminder: You came here to work on your laptop, but you're actually just going to scroll TikTok in a gorgeous aesthetic setting.",
    "🌞 Morning mood: Powered strictly by iced caffeine and denial.",
    "🌵 Plant mom/dad status: Overwatering is an act of aggressive love.",
    "🌙 Night mode: Where good intentions go to die over craft cocktails in the zen patio."
];

const chaosPicks = [
    "🎲 Chaos Pick: Order 2 Iced Coconut Matchas and pretend you're a botanical CEO.",
    "🎲 Chaos Pick: Get The Atabey Wrap and eat it entirely in silence while judging passersby.",
    "🎲 Chaos Pick: Order a Botanical Cold Brew and challenge a stranger to a staring contest.",
    "🎲 Chaos Pick: Ask the barista for 'the secret menu' just to see what happens."
];

let lastQuoteIndex = -1;

function generateMood() {
    const textBox = document.getElementById('funText');
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * funQuotes.length);
    } while (randomIndex === lastQuoteIndex);
    lastQuoteIndex = randomIndex;
    
    textBox.style.opacity = 0;
    setTimeout(() => {
        textBox.textContent = funQuotes[randomIndex];
        textBox.style.opacity = 1;
    }, 200);
}

function triggerChaos() {
    const textBox = document.getElementById('funText');
    const randomChaos = chaosPicks[Math.floor(Math.random() * chaosPicks.length)];
    textBox.style.opacity = 0;
    setTimeout(() => {
        textBox.textContent = randomChaos;
        textBox.style.opacity = 1;
    }, 200);
}

function secretReveal(card, secretText) {
    const p = card.querySelector('p');
    const badge = card.querySelector('.secret-badge');
    if (!card.classList.contains('revealed')) {
        card.dataset.originalText = p.textContent;
        p.textContent = secretText;
        badge.textContent = 'Tap to go back ↩';
        card.classList.add('revealed');
        card.style.backgroundColor = htmlElement.classList.contains('night-mode') ? '#242D25' : '#E6E2D8';
    } else {
        p.textContent = card.dataset.originalText;
        badge.textContent = 'Tap for secret 🤫';
        card.classList.remove('revealed');
        card.style.backgroundColor = '';
    }
}

function revealSecret(card, text) {
    secretReveal(card, text);
}
