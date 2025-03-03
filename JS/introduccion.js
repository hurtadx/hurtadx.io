document.addEventListener('DOMContentLoaded', function() {
    
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
    
    
    const loadingOverlay = document.querySelector('.loading-overlay');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }, 500);
    });
    
    
    if (localStorage.getItem('nombreUsuario')) {
        const nombre = localStorage.getItem('nombreUsuario');
        const saludoEl = document.getElementById('saludo');
        if (saludoEl) {
            saludoEl.textContent = `¡${nombre} putero, bienvenido al templo!`;
            saludoEl.classList.add('active');
        }
    } else {
        
        
        window.location.href = '../index.html';
    }
    
    
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
    
    
    document.querySelectorAll('.video-player').forEach((video) => {
        const container = video.closest('.media-container');
        const playBtn = container.querySelector('.play-btn');
        const pauseBtn = container.querySelector('.pause-btn');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');
        
        if (playBtn) playBtn.addEventListener('click', () => {
            video.play();
            
            if (Math.random() > 0.7) createConfetti();
        });
        if (pauseBtn) pauseBtn.addEventListener('click', () => video.pause());
        if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => video.requestFullscreen());
        
        
        container.addEventListener('mouseenter', () => {
            container.querySelector('.media-controls').style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            container.querySelector('.media-controls').style.opacity = '0';
        });
    });
    
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-block, .media-container, .feature-card').forEach(el => {
        observer.observe(el);
    });

    
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ff3030', '#ffcc00', '#ff9900', '#cc00ff', '#00ccff'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.transform = `scale(${Math.random() * 0.7 + 0.3})`;
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
    
    
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    let darkMode = localStorage.getItem('darkMode') === 'true';
    
    if (darkMode) {
        document.body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode);
        document.body.classList.toggle('dark-theme');
        
        if (darkMode) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    createFloatingElements();
    
    
    const enterButton = document.getElementById('enterButton');
    
    
    checkExistingUser();
    
    
    if (enterButton) {
        enterButton.addEventListener('click', handleTempleEntry);
    }
    
    
    addVisualEffects();
});


function createFloatingElements() {
    const background = document.getElementById('background');
    if (!background) return;
    
    
    background.innerHTML = '';
    
    
    for (let i = 0; i < 35; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        
        element.style.left = `${Math.random() * 100}vw`;
        element.style.animationDuration = `${15 + Math.random() * 25}s`;
        element.style.animationDelay = `${Math.random() * 7}s`;
        element.style.opacity = `${0.2 + Math.random() * 0.4}`;
        
        
        background.appendChild(element);
    }
}


function checkExistingUser() {
    if (localStorage.getItem('nombreUsuario')) {
        const nombre = localStorage.getItem('nombreUsuario');
        const enterButton = document.getElementById('enterButton');
        const portalDescription = document.querySelector('.portal-description');
        
        if (enterButton) {
            enterButton.innerHTML = '<i class="fas fa-door-open"></i> Continuar al Templo';
        }
        
        if (portalDescription) {
            portalDescription.textContent = `Bienvenido de nuevo, ${nombre}. El templo te espera.`;
            
            
            setTimeout(() => {
                if (Math.random() > 0.8) {
                    addBloodEffect(portalDescription);
                }
            }, 2000);
        }
    }
}


function handleTempleEntry() {
    
    this.classList.add('clicked');
    
    
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    transitionOverlay.appendChild(loader);
    
    document.body.appendChild(transitionOverlay);
    
    
    setTimeout(() => {
        transitionOverlay.classList.add('active');
        
        
        setTimeout(() => {
            if (!localStorage.getItem('nombreUsuario')) {
                requestName();
            } else {
                
                navigateToTemple();
            }
        }, 500);
    }, 300);
}


function requestName() {
    let nombre = prompt("Introduce tu nombre para continuar:");
    
    if (nombre && nombre.trim() !== "") {
        localStorage.setItem('nombreUsuario', nombre);
        navigateToTemple();
    } else {
        
        const transitionOverlay = document.querySelector('.page-transition');
        if (transitionOverlay) {
            transitionOverlay.classList.remove('active');
            setTimeout(() => {
                transitionOverlay.remove();
            }, 500);
        }
        
        
        const enterButton = document.getElementById('enterButton');
        if (enterButton) {
            enterButton.classList.remove('clicked');
        }
        
        alert("Debes proporcionar un nombre para acceder al templo.");
    }
}


function navigateToTemple() {
    
    console.log("Ya estamos en la página del templo");
}


function addVisualEffects() {
    
    const title = document.querySelector('.portal-title');
    if (title) {
        setInterval(() => {
            if (Math.random() > 0.92) {
                title.style.textShadow = 'none';
                setTimeout(() => {
                    title.style.textShadow = '0 0 15px rgba(255, 0, 0, 0.7)';
                }, 100);
            }
        }, 2000);
    }
    
    
    const disclaimer = document.querySelector('.disclaimer');
    if (disclaimer && Math.random() > 0.8) {
        setTimeout(() => {
            addBloodEffect(disclaimer);
        }, 3000);
    }
}


function addBloodEffect(element) {
    const bloodDrop = document.createElement('span');
    bloodDrop.style.position = 'absolute';
    bloodDrop.style.top = '0';
    bloodDrop.style.left = '50%';
    bloodDrop.style.width = '2px';
    bloodDrop.style.background = 'linear-gradient(to bottom, transparent, #ff0000)';
    bloodDrop.style.height = '0';
    bloodDrop.style.zIndex = '1';
    
    element.style.position = 'relative';
    element.appendChild(bloodDrop);
    
    
    setTimeout(() => {
        bloodDrop.style.transition = 'height 3s ease';
        bloodDrop.style.height = '100px';
    }, 100);
}