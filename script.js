document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainContent = document.getElementById('main-content');
    const successScreen = document.getElementById('success-screen');
    const bgAnimation = document.getElementById('bg-animation');

    // Create floating hearts for background
    function createHearts() {
        const heartCount = 15;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random size, position and animation delay
            const size = Math.random() * 40 + 20;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDelay = `${Math.random() * 15}s`;
            heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            bgAnimation.appendChild(heart);
        }
    }

    createHearts();

    // No button evasion logic
    noBtn.addEventListener('mouseover', () => {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate maximum allowed coordinates
        const maxX = window.innerWidth - btnRect.width;
        const maxY = window.innerHeight - btnRect.height;

        // Generate random position within viewport but outside current mouse position
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Ensure the button stays somewhat visible but moves away
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        
        // Add a little wobble
        noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    });

    // Yes button action
    yesBtn.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        successScreen.classList.remove('hidden');
        
        // Confetti explosion
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    });
});
