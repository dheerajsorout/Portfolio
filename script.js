document.addEventListener('DOMContentLoaded', () => {
    const { animate, stagger, inView } = Motion;

    // ── Smooth scrolling for nav links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const el = document.querySelector(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Remove default CSS animation so Motion One takes over ──
    document.querySelectorAll('.section').forEach(s => {
        s.style.animation = 'none';
        s.style.opacity = '0';
        s.style.transform = 'translateY(40px)';
    });

    // ── Hero entrance animation (plays immediately) ──
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');

    if (heroContent) {
        animate(
            heroContent,
            { opacity: [0, 1], x: [-60, 0] },
            { duration: 0.9, easing: [0.25, 1, 0.5, 1] }
        );
    }

    if (heroImage) {
        animate(
            heroImage,
            { opacity: [0, 1], scale: [0.7, 1] },
            { duration: 1, easing: [0.16, 1, 0.3, 1], delay: 0.3 }
        );
    }

    // Make the hero section visible immediately
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'none';
    }

    // ── Scroll-triggered section reveals ──
    document.querySelectorAll('.section:not(#home)').forEach((section, index) => {
        inView(section, () => {
            animate(
                section,
                { opacity: [0, 1], y: [40, 0] },
                { duration: 0.7, easing: [0.25, 1, 0.5, 1] }
            );
        }, { margin: '0px 0px -100px 0px' });
    });

    // ── Staggered card animations ──
    const cardGroups = [
        '.experience-grid .card',
        '.projects-grid .card',
        '.contact-item'
    ];

    cardGroups.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        if (cards.length === 0) return;
        const parent = cards[0].closest('.section');
        if (!parent) return;

        inView(parent, () => {
            animate(
                cards,
                { opacity: [0, 1], y: [30, 0], scale: [0.95, 1] },
                { duration: 0.5, delay: stagger(0.15), easing: [0.25, 1, 0.5, 1] }
            );
        }, { margin: '0px 0px -80px 0px' });
    });

    // ── Skill chips stagger ──
    const skillChips = document.querySelectorAll('.skill-chip');
    if (skillChips.length > 0) {
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            inView(skillsSection, () => {
                animate(
                    skillChips,
                    { opacity: [0, 1], y: [20, 0], scale: [0.85, 1] },
                    { duration: 0.4, delay: stagger(0.05), easing: [0.25, 1, 0.5, 1] }
                );
            }, { margin: '0px 0px -80px 0px' });
        }
    }

    // ── About section grid columns ──
    const aboutColumns = document.querySelectorAll('.about-grid > div');
    if (aboutColumns.length > 0) {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            inView(aboutSection, () => {
                animate(
                    aboutColumns,
                    { opacity: [0, 1], x: [-30, 0] },
                    { duration: 0.6, delay: stagger(0.2), easing: [0.25, 1, 0.5, 1] }
                );
            }, { margin: '0px 0px -80px 0px' });
        }
    }

    // ── Section title animation ──
    document.querySelectorAll('.section-title').forEach(title => {
        inView(title, () => {
            animate(
                title,
                { opacity: [0, 1], y: [-20, 0], scale: [0.9, 1] },
                { duration: 0.6, easing: [0.16, 1, 0.3, 1] }
            );
        }, { margin: '0px 0px -50px 0px' });
    });

    // ── Nav links entrance ──
    const navLinks = document.querySelectorAll('.nav-list a');
    if (navLinks.length > 0) {
        animate(
            navLinks,
            { opacity: [0, 1], y: [-10, 0] },
            { duration: 0.4, delay: stagger(0.08), easing: 'ease-out' }
        );
    }

    // ── Logo entrance ──
    const logo = document.querySelector('.logo');
    if (logo) {
        animate(
            logo,
            { opacity: [0, 1], x: [-20, 0] },
            { duration: 0.5, easing: [0.25, 1, 0.5, 1] }
        );
    }

    // ── Social icons stagger ──
    const socialIcons = document.querySelectorAll('.social-icons a');
    if (socialIcons.length > 0) {
        const footer = document.querySelector('.footer');
        if (footer) {
            inView(footer, () => {
                animate(
                    socialIcons,
                    { opacity: [0, 1], y: [20, 0], scale: [0.8, 1] },
                    { duration: 0.4, delay: stagger(0.1), easing: [0.25, 1, 0.5, 1] }
                );
            }, { margin: '0px 0px -50px 0px' });
        }
    }

    // ── Mobile Menu Toggle ──
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksList = document.querySelectorAll('.nav-list a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });
    });
});
