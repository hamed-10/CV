// Animation au défilement avec effets variés
document.addEventListener('DOMContentLoaded', function() {
    // Configuration des animations
    const animationConfig = {
        fadeIn: {
            elements: document.querySelectorAll('.animate-fade-in'),
            options: { threshold: 0.1 },
            callback: (element) => {
                element.style.opacity = 0;
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                setTimeout(() => {
                    element.style.opacity = 1;
                }, 100);
            }
        },
        slideLeft: {
            elements: document.querySelectorAll('.animate-slide-left'),
            options: { threshold: 0.1 },
            callback: (element) => {
                element.style.transform = 'translateX(-50px)';
                element.style.opacity = 0;
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                setTimeout(() => {
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = 1;
                }, 100);
            }
        },
        slideRight: {
            elements: document.querySelectorAll('.animate-slide-right'),
            options: { threshold: 0.1 },
            callback: (element) => {
                element.style.transform = 'translateX(50px)';
                element.style.opacity = 0;
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                setTimeout(() => {
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = 1;
                }, 100);
            }
        }
    };

    // Initialisation de l'Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Détermine le type d'animation à appliquer
                if (element.classList.contains('animate-fade-in')) {
                    animationConfig.fadeIn.callback(element);
                } else if (element.classList.contains('animate-slide-left')) {
                    animationConfig.slideLeft.callback(element);
                } else if (element.classList.contains('animate-slide-right')) {
                    animationConfig.slideRight.callback(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });

    // Observe tous les éléments animés
    Object.values(animationConfig).forEach(config => {
        config.elements.forEach(el => observer.observe(el));
    });

    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percent = skillBar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
                skillBar.style.width = percent;
                skillBar.style.transition = 'width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
                skillBarObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillBarObserver.observe(bar));

    // Animation des points de qualité
    const qualityDots = document.querySelectorAll('.level-dot.filled');
    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dot = entry.target;
                dot.style.animation = 'popIn 0.5s ease forwards';
                dot.style.animationDelay = `${dot.dataset.index * 0.1}s`;
                dotObserver.unobserve(dot);
            }
        });
    }, { threshold: 0.5 });

    qualityDots.forEach((dot, index) => {
        dot.dataset.index = index;
        dotObserver.observe(dot);
    });

    // Animation au survol des projets
    const projetItems = document.querySelectorAll('.projet-item');
    projetItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });

    // Effet parallaxe amélioré
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    document.body.appendChild(parallaxBg);

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        
        // Animation des sections au scroll
        document.querySelectorAll('section').forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                section.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Animation au clic sur l'image de profil
    document.querySelectorAll('.imgo img').forEach(img => {
        img.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Ajout d'animations CSS dynamiques
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        80% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .projet-item:hover .projet-image img {
        transform: scale(1.05);
        transition: transform 0.5s ease;
    }
    
    .social-icons a:hover {
        animation: float 0.8s ease infinite;
    }
    
    .parallax-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%);
        z-index: -1;
        will-change: transform;
    }
`;
document.head.appendChild(style);