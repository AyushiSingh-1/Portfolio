document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');

    // --- Preloader ---
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            content.style.opacity = '1';
            
            // --- Animate sections on scroll ---
            const sections = document.querySelectorAll('section');
            const observerOptions = { threshold: 0.1 };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            sections.forEach(section => observer.observe(section));
            
            // --- Initialize Typewriter ---
            initTypewriter();

        }, 500); // Match CSS transition
    }, 1000); // Fake loading time

    // --- Mobile menu toggle ---
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    // --- Smooth scrolling & close mobile menu on nav ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if it's open and a nav link is clicked
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
                
                // Scroll to element
                 window.scrollTo({
                    top: targetElement.offsetTop - 64, // 64px is nav height
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Typewriter Effect Function ---
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
        
        const text = "Cyber Security Enthusiast";
        let index = 0;

        function type() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        type();
    }
});