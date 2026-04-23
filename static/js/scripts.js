const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'experience', 'awards', 'publications'];

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initSpotlight() {
    if (prefersReducedMotion()) {
        return;
    }
    const spotlight = document.getElementById('fx-spotlight');
    if (!spotlight) {
        return;
    }

    let rafId = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 5;

    const update = () => {
        rafId = 0;
        document.documentElement.style.setProperty('--mx', `${lastX}px`);
        document.documentElement.style.setProperty('--my', `${lastY}px`);
    };

    window.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (!rafId) {
            rafId = window.requestAnimationFrame(update);
        }
    }, { passive: true });
}

function initReveal() {
    const targets = Array.from(
        document.querySelectorAll('section .container, footer .container, #avatar img, #experience-md .experience-item')
    ).filter(Boolean);

    const shouldRevealNow = prefersReducedMotion() || !('IntersectionObserver' in window);
    targets.forEach(el => {
        if (el.dataset.revealBound === '1') {
            return;
        }
        el.dataset.revealBound = '1';
        el.classList.add('reveal');
        if (shouldRevealNow) {
            el.classList.add('is-visible');
        }
    });

    if (shouldRevealNow) {
        return;
    }

    if (!window.__revealIO) {
        window.__revealIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    window.__revealIO.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.12 });
    }

    targets.forEach(el => {
        if (!el.classList.contains('is-visible')) {
            window.__revealIO.observe(el);
        }
    });
}

function initFxCanvas() {
    if (prefersReducedMotion()) {
        return;
    }
    const canvas = document.getElementById('fx-canvas');
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
        return;
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let points = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
        w = Math.floor(window.innerWidth);
        h = Math.floor(window.innerHeight);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.max(32, Math.min(86, Math.floor((w * h) / 32000)));
        points = Array.from({ length: count }).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 0.8 + Math.random() * 1.8,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.14,
            a: 0.06 + Math.random() * 0.08
        }));
    };

    let lastT = 0;
    const draw = (t) => {
        const dt = Math.min(40, t - lastT);
        lastT = t;

        ctx.clearRect(0, 0, w, h);

        // Subtle grid lines
        ctx.save();
        ctx.globalAlpha = 0.05;
        ctx.strokeStyle = '#1f3f66';
        ctx.lineWidth = 1;
        const step = 120;
        for (let x = 0; x <= w; x += step) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, h);
            ctx.stroke();
        }
        for (let y = 0; y <= h; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(w, y + 0.5);
            ctx.stroke();
        }
        ctx.restore();

        // Floating points + mouse interaction + connections
        const maxLinkDist = 165;
        const maxLinkDist2 = maxLinkDist * maxLinkDist;
        const repelR = 180;
        const repelR2 = repelR * repelR;

        points.forEach(p => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (p.x < -20) p.x = w + 20;
            if (p.x > w + 20) p.x = -20;
            if (p.y < -20) p.y = h + 20;
            if (p.y > h + 20) p.y = -20;

            if (mouse.active) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < repelR2 && d2 > 0.001) {
                    const d = Math.sqrt(d2);
                    const f = (1 - d / repelR) * 0.020;
                    p.x += (dx / d) * f * dt;
                    p.y += (dy / d) * f * dt;
                }
            }

            ctx.beginPath();
            ctx.fillStyle = `rgba(143, 106, 43, ${p.a})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Connections (O(n^2) but n is small; keep it subtle)
        ctx.save();
        ctx.lineWidth = 1;
        for (let i = 0; i < points.length; i++) {
            const a = points[i];
            for (let j = i + 1; j < points.length; j++) {
                const b = points[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < maxLinkDist2) {
                    const alpha = (1 - d2 / maxLinkDist2) * 0.10;
                    ctx.strokeStyle = `rgba(31, 63, 102, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();

        window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    }, { passive: true });
    window.requestAnimationFrame(draw);
}

function initHeroParallax() {
    if (prefersReducedMotion()) {
        return;
    }
    const hero = document.querySelector('.top-section');
    if (!hero) {
        return;
    }
    let rafId = 0;
    const update = () => {
        rafId = 0;
        const y = window.scrollY || 0;
        // Subtle: move background a bit slower than scroll
        const posY = Math.round(50 + Math.min(14, y * 0.02));
        hero.style.backgroundPosition = `center ${posY}%`;
    };
    window.addEventListener('scroll', () => {
        if (!rafId) {
            rafId = window.requestAnimationFrame(update);
        }
    }, { passive: true });
    update();
}

function initTilt() {
    if (prefersReducedMotion()) {
        return;
    }
    const targets = Array.from(document.querySelectorAll('#avatar img, #experience-md .experience-item'));
    targets.forEach(el => el.classList.add('tilt'));

    const attach = (el) => {
        let rafId = 0;
        let rx = 0, ry = 0;
        const max = 6; // degrees

        const apply = () => {
            rafId = 0;
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-1px)`;
        };

        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            ry = (px - 0.5) * max * 2;
            rx = -(py - 0.5) * max * 2;
            if (!rafId) rafId = window.requestAnimationFrame(apply);
        });

        el.addEventListener('mouseleave', () => {
            rx = 0; ry = 0;
            el.style.transform = '';
        });
    };

    targets.forEach(attach);
}

function buildExperienceAccordion() {
    const container = document.getElementById('experience-md');
    if (!container) {
        return;
    }

    const allNodes = Array.from(container.childNodes).filter(node => {
        return !(node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '');
    });

    if (allNodes.length === 0) {
        return;
    }

    const groups = [];
    let currentGroup = null;

    allNodes.forEach(node => {
        const isHeading = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H3';
        if (isHeading) {
            if (currentGroup) {
                groups.push(currentGroup);
            }
            currentGroup = {
                title: node,
                content: []
            };
            return;
        }

        if (currentGroup) {
            currentGroup.content.push(node);
        }
    });

    if (currentGroup) {
        groups.push(currentGroup);
    }

    if (groups.length === 0) {
        return;
    }

    container.innerHTML = '';

    groups.forEach((group, index) => {
        const detail = document.createElement('details');
        detail.className = 'experience-item';

        const summary = document.createElement('summary');
        summary.className = 'experience-summary';
        summary.innerHTML = group.title.innerHTML;
        detail.appendChild(summary);

        const content = document.createElement('div');
        content.className = 'experience-content';

        group.content.forEach(node => {
            const shouldSkipDivider = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'HR';
            if (!shouldSkipDivider) {
                content.appendChild(node);
            }
        });

        detail.appendChild(content);

        detail.addEventListener('toggle', () => {
            if (detail.open) {
                container.querySelectorAll('.experience-item').forEach(item => {
                    if (item !== detail) {
                        item.open = false;
                    }
                });
            }
        });

        container.appendChild(detail);
    });
}


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
                if (name === 'experience') {
                    buildExperienceAccordion();
                }
            }).then(() => {
                // MathJax
                MathJax.typeset();
                initReveal();
                initTilt();
            })
            .catch(error => console.log(error));
    })

    initSpotlight();
    initFxCanvas();
    initHeroParallax();
}); 
