// =========================================================================
// 1. NEURAL NETWORK PARTICLE BACKGROUND (Interactive Particle Physics)
// =========================================================================
const canvas = document.getElementById('neural-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 80; // Performance optimized density
    const connectionDistance = 120; // Distance to draw lines between nodes

    // Mouse Coordinates
    let mouse = {
        x: null,
        y: null,
        radius: 180 // Area around mouse where lines connect
    };

    // Track mouse movement safely
    window.addEventListener('mousemove', function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    // Reset mouse when leaving screen
    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Adjust canvas size on resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    window.addEventListener('resize', resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle Object Blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8; // Floating speed horizontal
            this.vy = (Math.random() - 0.5) * 0.8; // Floating speed vertical
            this.radius = Math.random() * 2 + 1; // Varying particle sizes
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(34, 211, 238, 0.6)'; // Neon Cyan color node
            ctx.fill();
        }

        update() {
            // Collision check on canvas boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            this.x += this.vx;
            this.y += this.vy;

            this.draw();
        }
    }

    // Initialize Particle Pool
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Dynamic Connections (Connecting lines between particles & mouse)
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distSq = dx * dx + dy * dy;

                // Check distance between particles
                if (distSq < connectionDistance * connectionDistance) {
                    opacityValue = 1 - (distSq / (connectionDistance * connectionDistance));
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.15})`; // Soft Blue lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }

            // Connection with Mouse Pointer
            if (mouse.x !== null && mouse.y !== null) {
                let mdx = particlesArray[a].x - mouse.x;
                let mdy = particlesArray[a].y - mouse.y;
                let mDistSq = mdx * mdx + mdy * mdy;

                if (mDistSq < mouse.radius * mouse.radius) {
                    opacityValue = 1 - (mDistSq / (mouse.radius * mouse.radius));
                    ctx.strokeStyle = `rgba(34, 211, 238, ${opacityValue * 0.3})`; // Glow cyan to cursor
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

// =========================================================================
// 2. DYNAMIC HERO TYPING EFFECT
// =========================================================================
const typingTarget = document.querySelector('.hero-text h2');
if (typingTarget) {
    const roles = [
        "DevOps & Cloud Infrastructure Engineer",
        "Ready for New Projects",
        "Building Scalable & High-Availability Systems"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at full text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    window.addEventListener('DOMContentLoaded', () => {
        typingTarget.textContent = "";
        setTimeout(typeEffect, 500);
    });
}

// =========================================================================
// 3. SCROLL-REVEAL ANIMS & SCROLLING
// =========================================================================
const revealSections = () => {
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('section, .project-card, .skill-card, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-init');
        revealOnScroll.observe(el);
    });
};
revealSections();

// Smooth navigation scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// =========================================================================
// 4. CLEAN PROFESSIONAL CONTACT FORM VALIDATION
// =========================================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        let statusMessage = document.getElementById('formStatus');
        if (!statusMessage) {
            statusMessage = document.createElement('div');
            statusMessage.id = 'formStatus';
            contactForm.appendChild(statusMessage);
        }

        statusMessage.style.display = "block";
        statusMessage.style.padding = "1rem";
        statusMessage.style.marginTop = "1.5rem";
        statusMessage.style.borderRadius = "10px";
        statusMessage.style.fontSize = "0.9rem";
        statusMessage.style.fontWeight = "500";
        statusMessage.style.textAlign = "center";
        statusMessage.style.border = "1px solid rgba(16, 185, 129, 0.2)";
        statusMessage.style.color = "#10b981";
        statusMessage.style.backgroundColor = "rgba(16, 185, 129, 0.06)";
        
        statusMessage.innerHTML = '<i class="fa-regular fa-circle-check" style="margin-right: 8px;"></i> Thank you! Your message has been sent successfully.';

        contactForm.reset();

        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 5000);
    });
}
