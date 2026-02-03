// ==========================================
// CLOSEUP PRESENTATION - SCRIPTS
// Animations, micro-interactions, easter eggs
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollReveal();
    initSmoothScroll();
    initCounterAnimation();
    initParallaxEffects();
    initMicroInteractions();
    initEasterEggs();
    initNavbarScroll();
    initCursorEffects();
    initTypewriterEffect();
    initProgressBar();
    initTooltips();
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Floating elements
    const floatingElements = document.querySelectorAll('.animate-float');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

// ==========================================
// MICRO INTERACTIONS
// ==========================================
function initMicroInteractions() {
    // Card hover effects
    const cards = document.querySelectorAll('.card-brutal');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translate(-4px, -4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0)';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.hover-lift, a[class*="bg-brutal"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Hover sound effect (optional, subtle)
    const interactiveElements = document.querySelectorAll('a, button, .card-brutal');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Subtle visual feedback
            el.style.transition = 'all 0.2s ease';
        });
    });
}

// ==========================================
// EASTER EGGS
// ==========================================
function initEasterEggs() {
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Click counter easter egg
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 50) {
            showMessage("Vous êtes vraiment motivé(e) ! 50 clics ! 🎉");
        }
        if (clickCount === 100) {
            showMessage("100 clics ! Vous devriez peut-être nous appeler directement 📞");
        }
    });

    // Logo click easter egg
    const logo = document.querySelector('nav .w-10');
    if (logo) {
        let logoClicks = 0;
        logo.addEventListener('click', () => {
            logoClicks++;
            if (logoClicks === 5) {
                logo.style.animation = 'spin 1s ease-in-out';
                setTimeout(() => logo.style.animation = '', 1000);
                showMessage("Logo turbo mode activé ! 🚀");
                logoClicks = 0;
            }
        });
    }

    // Scroll speed easter egg
    let lastScrollY = 0;
    let scrollSpeed = 0;
    window.addEventListener('scroll', () => {
        scrollSpeed = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;

        if (scrollSpeed > 500) {
            document.body.style.filter = 'blur(2px)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 100);
        }
    });

    // Double-click on yellow elements
    document.querySelectorAll('.bg-brutal-yellow').forEach(el => {
        el.addEventListener('dblclick', () => {
            el.classList.add('animate-shake');
            setTimeout(() => el.classList.remove('animate-shake'), 500);
        });
    });
}

function activateKonamiEasterEgg() {
    // Create confetti
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    showMessage("🎮 KONAMI CODE ACTIVÉ ! +30 leads gratuits ! (joke) 🎮");

    // Rainbow mode for 5 seconds
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#facc15', '#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#ec4899'];

    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}vw;
        z-index: 9999;
        pointer-events: none;
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
    `;

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

function showMessage(text) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #facc15;
        color: #0a0a0a;
        padding: 20px 40px;
        font-size: 20px;
        font-weight: bold;
        z-index: 10000;
        border: 4px solid #0a0a0a;
        box-shadow: 8px 8px 0px 0px #0a0a0a;
        animation: bounce-in 0.5s ease-out;
    `;
    message.textContent = text;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fade-out 0.5s ease-out forwards';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// Add required animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    @keyframes fade-out {
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#0a0a0a';
            navbar.style.backdropFilter = 'none';
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        navbar.style.transition = 'all 0.3s ease';
    });
}

// ==========================================
// CURSOR EFFECTS
// ==========================================
function initCursorEffects() {
    // Custom cursor follower
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #facc15;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Grow cursor on interactive elements
    const interactives = document.querySelectorAll('a, button, .card-brutal, input, .hover-lift');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(250, 204, 21, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });

    // Hide on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');

    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.borderRight = '3px solid #facc15';

        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                el.style.borderRight = 'none';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        });

        observer.observe(el);
    });
}

// ==========================================
// PROGRESS BAR
// ==========================================
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #facc15, #3b82f6, #a855f7);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ==========================================
// TOOLTIPS
// ==========================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(el => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: #0a0a0a;
            color: #facc15;
            padding: 8px 12px;
            font-size: 12px;
            border: 2px solid #facc15;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;

        el.style.position = 'relative';
        el.appendChild(tooltip);

        el.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginBottom = '8px';
        });

        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// SECTION HIGHLIGHT ON SCROLL
// ==========================================
function initSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-brutal-yellow');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-brutal-yellow');
            }
        });
    });
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to go to top
    if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Press numbers 1-5 to navigate to sections
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const sectionIds = ['contexte', 'acquisition', 'outils', 'clients', 'timeline'];
        const section = document.getElementById(sectionIds[parseInt(e.key) - 1]);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ==========================================
// PRINT STYLES
// ==========================================
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.animate-float, .animate-bounce').forEach(el => {
        el.style.animation = 'none';
    });
});

console.log('%c🚀 CLOSEUP PRESENTATION LOADED', 'color: #facc15; font-size: 20px; font-weight: bold;');
console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'color: #3b82f6; font-size: 12px;');
