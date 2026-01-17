// ============================================
// Personal Website - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initBackgroundAnimation();
    initSmoothScroll();
    initScrollAnimations();
});

// ============================================
// Theme Switcher
// ============================================
let currentTheme = 'meta';
let animationId = null;

function initThemeSwitcher() {
    const buttons = document.querySelectorAll('.theme-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            setTheme(theme);
            
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function setTheme(theme) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('theme-netflix', 'theme-meta', 'theme-discord');
    
    // Add new theme class
    body.classList.add(`theme-${theme}`);
    currentTheme = theme;
    
    // Restart background animation for new theme
    initBackgroundAnimation();
}

// ============================================
// Background Animations
// ============================================
function initBackgroundAnimation() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Cancel existing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Choose animation based on theme
    if (currentTheme === 'netflix') {
        animateStars(ctx, canvas);
    } else if (currentTheme === 'discord') {
        animateSparks(ctx, canvas);
    } else {
        // Clear canvas for Meta theme
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Netflix Theme - Space Stars Animation
function animateStars(ctx, canvas) {
    const stars = [];
    const numStars = 300;
    const maxDepth = 1000;
    
    // Initialize stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width - canvas.width / 2,
            y: Math.random() * canvas.height - canvas.height / 2,
            z: Math.random() * maxDepth,
            color: getStarColor()
        });
    }
    
    function getStarColor() {
        const colors = ['#E50914', '#FF6B6B', '#FFFFFF', '#FFE5E5', '#FF8585'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(20, 20, 20, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        stars.forEach(star => {
            // Move star closer
            star.z -= 2;
            
            // Reset when too close
            if (star.z <= 0) {
                star.z = maxDepth;
                star.x = Math.random() * canvas.width - centerX;
                star.y = Math.random() * canvas.height - centerY;
                star.color = getStarColor();
            }
            
            // Project 3D to 2D
            const scale = maxDepth / (star.z + 1);
            const x2d = star.x * scale + centerX;
            const y2d = star.y * scale + centerY;
            
            // Size based on distance
            const size = Math.max(0.5, 2 * (maxDepth - star.z) / maxDepth);
            const brightness = Math.min(1, (maxDepth - star.z) / maxDepth);
            
            // Draw star
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            ctx.fillStyle = star.color + Math.floor(brightness * 255).toString(16).padStart(2, '0');
            ctx.fill();
            
            // Glow for closer stars
            if (star.z < maxDepth / 2) {
                ctx.beginPath();
                ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
                ctx.fillStyle = star.color + Math.floor(brightness * 30).toString(16).padStart(2, '0');
                ctx.fill();
            }
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Discord Theme - Electric Sparks Animation
function animateSparks(ctx, canvas) {
    const sparks = [];
    const numSparkLines = 5;
    
    function createSpark() {
        const edge = Math.floor(Math.random() * 4);
        let x = 0, y = 0;
        
        switch (edge) {
            case 0: x = Math.random() * canvas.width; y = 0; break;
            case 1: x = canvas.width; y = Math.random() * canvas.height; break;
            case 2: x = Math.random() * canvas.width; y = canvas.height; break;
            default: x = 0; y = Math.random() * canvas.height;
        }
        
        return {
            x, y,
            angle: Math.random() * Math.PI * 2,
            length: Math.random() * 50 + 20,
            life: Math.random() * 100 + 50,
            maxLife: Math.random() * 100 + 50,
            color: getSparkColor()
        };
    }
    
    function getSparkColor() {
        const colors = ['#5865F2', '#7289DA', '#99AAB5', '#FFFFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function drawSpark(spark) {
        const endX = spark.x + Math.cos(spark.angle) * spark.length;
        const endY = spark.y + Math.sin(spark.angle) * spark.length;
        
        const gradient = ctx.createLinearGradient(spark.x, spark.y, endX, endY);
        gradient.addColorStop(0, spark.color + '00');
        gradient.addColorStop(0.5, spark.color + 'FF');
        gradient.addColorStop(1, spark.color + '00');
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * (spark.life / spark.maxLife);
        ctx.moveTo(spark.x, spark.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Branching sparks
        if (spark.life > spark.maxLife * 0.7) {
            for (let i = 0; i < 2; i++) {
                const branchAngle = spark.angle + (Math.random() - 0.5) * Math.PI / 2;
                const branchLength = spark.length * 0.4;
                const startX = spark.x + Math.cos(spark.angle) * spark.length * 0.7;
                const startY = spark.y + Math.sin(spark.angle) * spark.length * 0.7;
                
                const branchGradient = ctx.createLinearGradient(
                    startX, startY,
                    startX + Math.cos(branchAngle) * branchLength,
                    startY + Math.sin(branchAngle) * branchLength
                );
                branchGradient.addColorStop(0, spark.color + 'FF');
                branchGradient.addColorStop(1, spark.color + '00');
                
                ctx.beginPath();
                ctx.strokeStyle = branchGradient;
                ctx.lineWidth = 1 * (spark.life / spark.maxLife);
                ctx.moveTo(startX, startY);
                ctx.lineTo(
                    startX + Math.cos(branchAngle) * branchLength,
                    startY + Math.sin(branchAngle) * branchLength
                );
                ctx.stroke();
            }
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(49, 51, 56, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add new sparks
        if (sparks.length < numSparkLines) {
            sparks.push(createSpark());
        }
        
        // Update and draw
        for (let i = sparks.length - 1; i >= 0; i--) {
            const spark = sparks[i];
            spark.life--;
            
            if (spark.life <= 0) {
                sparks.splice(i, 1);
                continue;
            }
            
            // Move spark
            spark.x += Math.cos(spark.angle) * 2;
            spark.y += Math.sin(spark.angle) * 2;
            
            // Random direction change
            spark.angle += (Math.random() - 0.5) * 0.2;
            
            drawSpark(spark);
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}
