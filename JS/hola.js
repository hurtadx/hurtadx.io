document.addEventListener('DOMContentLoaded', function() {
    
    const consentDialog = document.getElementById('consent-dialog');
    const agreeBtn = document.getElementById('agree-btn');
    const declineBtn = document.getElementById('decline-btn');
    
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            consentDialog.style.display = 'none';
     
            const trackingId = generateId();
            const trackingElement = document.getElementById('tracking-id');
            if (trackingElement) {
                trackingElement.textContent = trackingId;
            }
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            
            window.location.href = 'introduccion.html';
        });
    }


    function generateId() {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    }


    window.confirmExit = function() {
        if (confirm('¿Realmente quieres abandonar esta página? Lo que has visto no puede ser borrado de tu memoria.')) {

            window.location.href = 'introduccion.html';
        }
    };

    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        const targetDate = new Date('2025-11-27T23:59:59').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '¡El tiempo ha terminado!';
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});


