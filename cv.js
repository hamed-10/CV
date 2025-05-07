// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-left,.animate-slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    /* Détection du scroll */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    lastScroll = currentScroll;
    
    // Animation des sections au scroll
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });
});

/* Initialisation */
document.addEventListener('DOMContentLoaded', () => {
    // Ajoutez le fond parallaxe
    const parallax = document.createElement('div');
    parallax.className = 'parallax-bg';
    document.body.appendChild(parallax);
    
    // Active les animations après le chargement
    setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 1000);
});
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    document.querySelectorAll('.imgo img').forEach(img => {
        // Animation au clic
        img.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    
   
});
