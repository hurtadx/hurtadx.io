/* filepath: /c:/Users/pracsistemas/Desktop/TemploPirlotero/hurtadx.io/js/interior.js */
// JavaScript para la página interior (introduccion.html)

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animaciones AOS
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
    
    // Overlay de carga
    const loadingOverlay = document.querySelector('.loading-overlay');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 500);
    });
    
    // Mostrar saludo personalizado
    if (localStorage.getItem('nombreUsuario')) {
        const nombre = localStorage.getItem('nombreUsuario');
        const saludoEl = document.getElementById('saludo');
        saludoEl.textContent = `¡${nombre} putero, bienvenido al templo!`;
        saludoEl.classList.add('active');
    } else {
        window.location.href = 'index.html';
    }
    
    // Navegación móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Cambiar ícono del botón
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
    
    // Controles personalizados para videos
    document.querySelectorAll('.video-player').forEach((video) => {
        const container = video.closest('.media-container');
        const playBtn = container.querySelector('.play-btn');
        const pauseBtn = container.querySelector('.pause-btn');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');
        
        if (playBtn) playBtn.addEventListener('click', () => {
            video.play();
            // Mostrar confeti de manera aleatoria al reproducir
            if (Math.random() > 0.7) createConfetti();
        });
        if (pauseBtn) pauseBtn.addEventListener('click', () => video.pause());
        if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => video.requestFullscreen());
        
        // Mostrar/ocultar controles al pasar el ratón
        container.addEventListener('mouseenter', () => {
            container.querySelector('.media-controls').style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            container.querySelector('.media-controls').style.opacity = '0';
        });
    });
    
    // Animaciones al hacer scroll
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

    // Función para crear confeti (efecto visual)
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
    
    // Botón para cambiar el tema
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
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Botón para volver arriba
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
});