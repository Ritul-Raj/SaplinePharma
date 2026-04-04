/* ============================================
   SAPLINE PHARMACEUTICAL — MAIN SCRIPTS
   ============================================ */

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hide');
    }, 2000);
});

// ===== EVENT POPUP =====
(function initEventPopup() {
    const overlay = document.getElementById('eventPopupOverlay');
    const closeBtn = document.getElementById('eventPopupClose');
    const viewAllBtn = document.getElementById('eventPopupViewAll');
    if (!overlay) return;

    // Show popup after preloader finishes (2s preloader + 0.5s delay)
    setTimeout(() => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 2800);

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (viewAllBtn) viewAllBtn.addEventListener('click', closePopup);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
    });
})();

// ===== CUSTOM CURSOR =====
(function initCursor() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');

    if (!dot || !outline) return;

    if (window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        function animate() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            outline.style.left = outlineX + 'px';
            outline.style.top = outlineY + 'px';
            requestAnimationFrame(animate);
        }
        animate();

        document.querySelectorAll('a, button, .service-card, .product-card, .team-card, .catalog-product').forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.width = '55px';
                outline.style.height = '55px';
                outline.style.borderColor = 'rgba(0,184,148,0.6)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.width = '35px';
                outline.style.height = '35px';
                outline.style.borderColor = 'rgba(0,184,148,0.4)';
            });
        });
    } else {
        dot.style.display = 'none';
        outline.style.display = 'none';
    }
})();

// ===== NAVBAR SCROLL =====
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
})();

// ===== HAMBURGER MENU =====
(function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    if (!hamburger || !navLinks) return;

    function closeMenu() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        navLinks.classList.add('active');
        hamburger.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();

// ===== COUNTER ANIMATION =====
(function initCounters() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const update = () => {
                        current += step;
                        if (current < target) {
                            num.textContent = Math.floor(current) + '+';
                            requestAnimationFrame(update);
                        } else {
                            num.textContent = target + '+';
                        }
                    };
                    update();
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
})();

// ===== PARTICLES =====
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        const size = (Math.random() * 4 + 2) + 'px';
        p.style.width = size;
        p.style.height = size;
        p.style.animationDuration = (Math.random() * 4 + 2) + 's';
        p.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(p);
    }
})();

// ===== BACK TO TOP =====
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE NAV HIGHLIGHT =====
(function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.getElementById('navbar');
    if (!sections.length || !navbar) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a:not(.nav-contact)').forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = navbar.classList.contains('scrolled') ? 'var(--accent)' : 'var(--white)';
            }
        });
    });
})();

// ===== CONTACT FORM =====
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('.form-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = '#27ae60';
                form.reset();
            } else {
                btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try again.';
                btn.style.background = '#e74c3c';
            }
        }).catch(() => {
            btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try again.';
            btn.style.background = '#e74c3c';
        }).finally(() => {
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });
})();
