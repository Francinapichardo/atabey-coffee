const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.remove('hiding');
    navMenu.classList.toggle('active');
});

// Detecta el scroll para cerrar el menú y contraer el botón flotante dejando la luna/sol visible
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const modeBtn = document.getElementById('modeToggle');
    
    if (currentScroll > lastScrollTop + 3 && navMenu.classList.contains('active')) {
        navMenu.classList.add('hiding');
        setTimeout(() => {
            navMenu.classList.remove('active', 'hiding');
        }, 250);
    }
    
    // Contrae el botón dejando solo el icono y reduce la opacidad al bajar la página
    if (currentScroll > lastScrollTop && currentScroll > 50) {
        modeBtn.classList.add('scrolled-down');
    } else {
        modeBtn.classList.remove('scrolled-down');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

const navLinks = navMenu.querySelectorAll('a, button');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.add('hiding');
        setTimeout(() => {
            navMenu.classList.remove('active', 'hiding');
        }, 250);
    });
});

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
    const btnText = modeToggleBtn.querySelector('.btn-text');
    
    if (htmlElement.classList.contains('night-mode')) {
        // Cambiamos el icono del botón a un sol (☀️) cuando está en modo noche y listo para volver al día
        modeToggleBtn.childNodes[0].nodeValue = "☀️ ";
        if (btnText) btnText.textContent = "Switch to Day Coffee";
        heroTitle.textContent = "Botanical cocktails & neon whispers in Mills 50";
        heroSubtitle.textContent = "The sun is down, the plants are resting, and the craft cocktails are waiting for your drama.";
    } else {
        // Cambiamos el icono a la luna (🌙) cuando está en modo día
        modeToggleBtn.childNodes[0].nodeValue = "🌙 ";
        if (btnText) btnText.textContent = "Switch to Night Bar";
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

const plantDatabase = {
    "monstera": "🌱 Monstera (Named 'Carlos'): Thinks he's a tropical god. Wants bright indirect light, a misting session, and for you to stop touching his new fenestrated leaves.",
    "money tree": "🌿 Money Tree (Named 'Lulu'): Supposed to bring financial prosperity. Currently judging your recent online shopping cart choices. Water only when dry.",
    "aglaonema": "🪴 Aglaonema (Named 'Abuela'): Low maintenance queen. She survives on pure spite, fluorescent office light, and weekly sips of tap water.",
    "philodendron": "🍃 Philodendron (Named 'Ziggy'): Dramatic climber. If you forget to water him for 2 days, he will throw a full emotional tantrum.",
    "syngonium": "🌿 Syngonium (Named 'Pip'): Arrowhead plant. Changes leaf shapes just to confuse you. Likes humidity and being complimented on her colors.",
    "orchid": "🌸 Orchid (Named 'Priscilla'): High maintenance diva. Demands absolute perfection, ice cubes on Tuesdays, and a round of applause when she blooms once a year."
};

function searchPlantVibe() {
    const input = document.getElementById('plantInput').value.toLowerCase().trim();
    const resultBox = document.getElementById('plantResult');
    
    resultBox.style.opacity = 0;
    setTimeout(() => {
        if (plantDatabase[input]) {
            resultBox.textContent = plantDatabase[input];
        } else if (input === "") {
            resultBox.textContent = "✨ Please type a plant name first!";
        } else {
            resultBox.textContent = `🌵 Plant '${input}' is currently hiding in the jungle or plotting a rebellion. Try searching: Monstera, Money Tree, Aglaonema, Philodendron, Syngonium, or Orchid.`;
        }
        resultBox.style.opacity = 1;
    }, 200);
}
