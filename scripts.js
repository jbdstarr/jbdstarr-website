// JBD Starr - Global Scripts
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 800);
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        if (isOpen) {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'rgba(20,61,89,0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.backdropFilter = 'blur(20px)';
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function validateForm(form) {
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = 'var(--error)';
        } else {
            field.style.borderColor = '';
        }
    });
    const email = form.querySelector('input[type="email"]');
    if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            valid = false;
            email.style.borderColor = 'var(--error)';
            showToast('Please enter a valid email', 'error');
        }
    }
    return valid;
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.fade-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });
    gsap.utils.toArray('.fade-left').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            x: -50, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });
    gsap.utils.toArray('.fade-right').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            x: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });
    gsap.utils.toArray('.stagger-container').forEach(container => {
        gsap.from(container.children, {
            scrollTrigger: { trigger: container, start: 'top 85%', once: true },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});
