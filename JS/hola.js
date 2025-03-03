document.addEventListener('DOMContentLoaded', function() {
    
    const consentDialog = document.getElementById('consent-dialog');
    const agreeBtn = document.getElementById('agree-btn');
    const declineBtn = document.getElementById('decline-btn');
    
    agreeBtn.addEventListener('click', function() {
        consentDialog.style.display = 'none';
    });

    declineBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });

    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        const targetDate = new Date('2025-12-31T23:59:59').getTime();
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

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});


