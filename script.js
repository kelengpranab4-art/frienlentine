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

    // No button evasion logic & Yes button growth
    let yesScale = 1;
    noBtn.addEventListener('mouseover', () => {
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate maximum allowed coordinates
        const maxX = window.innerWidth - btnRect.width;
        const maxY = window.innerHeight - btnRect.height;

        // Generate random position within viewport
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Ensure the button stays somewhat visible but moves away
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        // Add a little wobble
        noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

        // Grow the Yes button
        yesScale += 0.15;
        yesBtn.style.transform = `scale(${yesScale})`;

        // Change text based on size
        if (yesScale > 2) {
            yesBtn.innerText = "YES PLEASE! 🥰";
        } else if (yesScale > 1.5) {
            yesBtn.innerText = "SAY YES! 🥺";
        }
    });

    // Yes button action
    yesBtn.addEventListener('click', () => {
        // Hide card with a nice fade
        mainContent.style.transition = 'all 0.5s ease';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'scale(0.8)';

        setTimeout(() => {
            mainContent.classList.add('hidden');
            successScreen.classList.remove('hidden');

            // Confetti explosion (Grand version)
            const duration = 10 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 1000 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 70 * (timeLeft / duration);

                // Sides
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));

                // Center burst occasionally
                if (Math.random() > 0.7) {
                    confetti(Object.assign({}, defaults, {
                        particleCount: 100,
                        scalar: 2,
                        origin: { x: 0.5, y: 0.5 }
                    }));
                }
            }, 300);
        }, 500);
    });
});
