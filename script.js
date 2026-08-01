// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling for anchor links (if browser doesn't support CSS scroll-behavior)
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

    // 2. Intersection Observer for smooth reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once it has faded in
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Typewriter effect for status card
    const phrases = ["Open to work", "Let's collaborate", "Available for coffee chat"];
    const typewriter = document.getElementById('typewriter');
    const statusCard = document.getElementById('statusCard');

    if (typewriter && statusCard) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timer = null;

        function tick() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                charIndex--;
                typewriter.textContent = current.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    timer = setTimeout(tick, 400);
                    return;
                }
                timer = setTimeout(tick, 35);
            } else {
                charIndex++;
                typewriter.textContent = current.substring(0, charIndex);
                if (charIndex === current.length) {
                    isDeleting = true;
                    timer = setTimeout(tick, 1800);
                    return;
                }
                timer = setTimeout(tick, 70);
            }
        }

        // Hover: immediately switch to next phrase
        statusCard.addEventListener('mouseenter', function () {
            if (timer) clearTimeout(timer);
            if (!isDeleting) {
                isDeleting = true;
            }
            tick();
        });

        tick();
    }
});