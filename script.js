document.addEventListener('DOMContentLoaded', () => {
    console.log('Terminal initialized. Welcome to Atas Tech.');

    // Handle Typewriter effect if needed
    // The current implementation uses CSS animations as per code.html
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(el => {
        // CSS animation handles the effect. 
        // We can add replay logic or delays here if desired.
    });

    // Intersection Observer for fade-in/reveal effects can be added here
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add any reveal animations if needed
    // document.querySelectorAll('.project-card-outer').forEach(el => observer.observe(el));
});
