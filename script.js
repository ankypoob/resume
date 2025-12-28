// ============================================
// Resume Site - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initSectionAnimations();
    initSmoothScroll();
});

// ============================================
// Navigation scroll effect
// ============================================
function initNavScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Section reveal animations
// ============================================
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// Smooth scroll for anchor links
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Optional: Typing effect for hero
// ============================================
function initTypingEffect() {
    const element = document.querySelector('.hero-tagline');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = 1;
    
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start after hero animations
    setTimeout(typeWriter, 1200);
}

// ============================================
// Optional: Parallax effect for hero circles
// ============================================
function initParallax() {
    const circles = document.querySelectorAll('.circle');
    
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        circles.forEach((circle, index) => {
            const factor = (index + 1) * 0.5;
            circle.style.transform = `translate(calc(-50% + ${x * factor}px), calc(-50% + ${y * factor}px))`;
        });
    });
}

// Uncomment to enable:
// document.addEventListener('DOMContentLoaded', initParallax);

