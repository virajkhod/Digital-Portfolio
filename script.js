// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, .skill-tag, .project-content');

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Slight delay for the outline for a fluid effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// Preloader & Initial Animations
window.addEventListener('load', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const tl = gsap.timeline();

    // Preloader out
    tl.to('.preloader-text span', {
        y: 0, duration: 1, ease: 'power4.out'
    })
    .to('.preloader-text span', {
        y: '-100%', duration: 0.8, ease: 'power4.in', delay: 0.5
    })
    .to('.preloader', {
        opacity: 0, duration: 0.5, onComplete: () => {
            document.querySelector('.preloader').style.display = 'none';
            // Start Hero Animations
            heroAnimations();
        }
    }, "-=0.2");
});

function heroAnimations() {
    const tl = gsap.timeline();
    
    // Navbar drop in
    tl.from('#navbar', {
        y: -100, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // Hero title lines slide up
    tl.from('.gs-title', {
        y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: 'power4.out'
    }, "-=0.5");

    // Other hero elements fade up
    tl.from('.gs-hero', {
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
    }, "-=0.5");
}

// ScrollTrigger Animations for internal sections
document.addEventListener('DOMContentLoaded', () => {
    // Parallax background blobs
    gsap.to('.blob-1', {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });

    gsap.to('.blob-2', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Section Scroll Animations
    const sections = gsap.utils.toArray('.section');
    
    sections.forEach(sec => {
        const upElements = sec.querySelectorAll('.gs-up');
        if (upElements.length > 0) {
            gsap.from(upElements, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
});

// Mobile Menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const sysThemeBtn = document.getElementById('mobile-theme-toggle');

function toggleTheme() {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    
    // Change icon
    const icon = themeBtn.querySelector('i');
    if (isLight) {
        icon.classList.replace('ph-sun', 'ph-moon');
    } else {
        icon.classList.replace('ph-moon', 'ph-sun');
    }
}

themeBtn.addEventListener('click', toggleTheme);
sysThemeBtn.addEventListener('click', toggleTheme);
