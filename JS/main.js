document.addEventListener('DOMContentLoaded', function() {
    
    const background = document.getElementById('background');
    if (background) {
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.left = `${Math.random() * 100}vw`;
            element.style.animationDuration = `${15 + Math.random() * 20}s`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            background.appendChild(element);
        }
    }

    
    const enterButton = document.getElementById('enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', function() {
            let nombre = prompt("Introduce tu nombre para continuar:");
            if (nombre && nombre.trim() !== "") {
                localStorage.setItem('nombreUsuario', nombre);
                
                window.location.href = 'views/introduccion.html';
            } else {
                alert("Debes proporcionar un nombre para acceder al templo.");
            }
        });
    }
});