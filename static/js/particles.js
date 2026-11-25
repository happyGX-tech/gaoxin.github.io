/* Ambient particle field: drifting dots, mouse gravity + links, cursor trail.
   Theme-aware, single rAF loop, DPR capped, pausable, reduced-motion safe. */
(function () {
    const api = { start() {}, stop() {}, refresh() {} };
    window.Particles = api;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let canvas, ctx, w = 0, h = 0, dpr = 1;
    let dots = [], sparks = [];
    let raf = 0, running = false, enabled = false, lastT = 0;
    let ink = '13,13,13', accent = '15,138,106';
    const mouse = { x: -9999, y: -9999, active: false };

    function readTheme() {
        const cs = getComputedStyle(document.documentElement);
        ink = (cs.getPropertyValue('--particle') || '13,13,13').trim();
        accent = (cs.getPropertyValue('--particle-accent') || ink).trim();
    }

    function seed() {
        const density = coarse ? 42000 : 21000;
        const count = Math.max(26, Math.min(coarse ? 52 : 105, Math.floor(w * h / density)));
        dots = [];
        for (let i = 0; i < count; i++) {
            dots.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                r: Math.random() * 1.5 + 0.6,
                a: Math.random() * 0.22 + 0.1,
                tint: Math.random() < 0.24,
                ph: Math.random() * Math.PI * 2
            });
        }
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seed();
        if (!running && enabled) drawStatic();
    }

    function drawStatic() {
        ctx.clearRect(0, 0, w, h);
        for (const p of dots) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + (p.tint ? accent : ink) + ',' + (p.a * 0.8) + ')';
            ctx.fill();
        }
    }

    function step(t) {
        if (!running) return;
        raf = requestAnimationFrame(step);
        const dt = Math.min((t - lastT) / 16.667, 3) || 1;
        lastT = t;

        ctx.clearRect(0, 0, w, h);

        for (const p of dots) {
            p.ph += 0.004 * dt;
            p.vx += Math.cos(p.ph) * 0.003 * dt;
            p.vy += Math.sin(p.ph * 0.9) * 0.003 * dt;

            if (mouse.active) {
                const dx = mouse.x - p.x, dy = mouse.y - p.y;
                const d = Math.hypot(dx, dy);
                if (d < 180 && d > 0.01) {
                    const f = (180 - d) / 180 * 0.028 * dt;
                    p.vx += dx / d * f;
                    p.vy += dy / d * f;
                }
            }

            p.vx *= Math.pow(0.965, dt);
            p.vy *= Math.pow(0.965, dt);
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            if (p.x < -24) p.x = w + 24; else if (p.x > w + 24) p.x = -24;
            if (p.y < -24) p.y = h + 24; else if (p.y > h + 24) p.y = -24;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + (p.tint ? accent : ink) + ',' + p.a + ')';
            ctx.fill();
        }

        if (mouse.active) {
            ctx.lineWidth = 1;
            for (const p of dots) {
                const dx = mouse.x - p.x, dy = mouse.y - p.y;
                const d = Math.hypot(dx, dy);
                if (d < 150) {
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(p.x, p.y);
                    ctx.strokeStyle = 'rgba(' + (p.tint ? accent : ink) + ',' + ((1 - d / 150) * 0.2) + ')';
                    ctx.stroke();
                }
            }
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.life -= 0.022 * dt;
            if (s.life <= 0) { sparks.splice(i, 1); continue; }
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            s.vx *= 0.96;
            s.vy *= 0.96;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + accent + ',' + (s.life * 0.5) + ')';
            ctx.fill();
        }
    }

    function start() {
        if (running || !enabled || reduced || !ctx) return;
        running = true;
        lastT = performance.now();
        raf = requestAnimationFrame(step);
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    function onMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        if (running && !coarse && sparks.length < 70 && Math.random() < 0.55) {
            sparks.push({
                x: mouse.x + (Math.random() - 0.5) * 6,
                y: mouse.y + (Math.random() - 0.5) * 6,
                vx: (Math.random() - 0.5) * 1.1,
                vy: (Math.random() - 0.5) * 1.1,
                r: Math.random() * 2 + 1,
                life: 1
            });
        }
    }

    function init() {
        canvas = document.getElementById('bg-canvas');
        if (!canvas || !canvas.getContext) return;
        ctx = canvas.getContext('2d');
        readTheme();
        resize();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseout', function (e) {
            if (!e.relatedTarget) mouse.active = false;
        });
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop();
            else if (enabled && !reduced) start();
        });
        window.addEventListener('pagehide', function () {
            stop();
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
        });

        if (reduced && enabled) drawStatic();
        else start();
    }

    api.start = function () { enabled = true; if (reduced) { drawStatic(); return; } start(); };
    api.stop = function () { enabled = false; stop(); if (ctx) ctx.clearRect(0, 0, w, h); };
    api.refresh = function () { readTheme(); if (!running && enabled && ctx) drawStatic(); };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();