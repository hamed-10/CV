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
 
    
    
    // Effet de survol sur les compétences
    const competences = document.querySelectorAll('.competences-grid li, .qualites-grid li');
    
    competences.forEach(competence => {
        competence.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        competence.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
