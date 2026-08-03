(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    function init() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas || !canvas.getContext) {
            return;
        }

        const ctx = canvas.getContext('2d');
        let w = 0;
        let h = 0;
        let particles = [];
        const mouse = { x: -9999, y: -9999, active: false };

        const COLORS = ['160,122,60', '18,58,99'];
        const COUNT = Math.max(24, Math.min(64, Math.floor(innerWidth * innerHeight / 26000)));

        function seed() {
            particles = [];
            for (let i = 0; i < COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.6 + 0.6,
                    color: COLORS[i % COLORS.length]
                });
            }
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        }

        function step() {
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const d = Math.hypot(dx, dy);
                    if (d < 160 && d > 0.01) {
                        const f = (160 - d) / 160 * 0.022;
                        p.vx += dx / d * f;
                        p.vy += dy / d * f;
                    }
                }

                p.vx *= 0.96;
                p.vy *= 0.96;
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -20) p.x = w + 20;
                else if (p.x > w + 20) p.x = -20;
                if (p.y < -20) p.y = h + 20;
                else if (p.y > h + 20) p.y = -20;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + p.color + ',0.32)';
                ctx.fill();
            }

            if (mouse.active) {
                ctx.lineWidth = 1;
                for (const p of particles) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const d = Math.hypot(dx, dy);
                    if (d < 170) {
                        const a = (1 - d / 170) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = 'rgba(' + p.color + ',' + a + ')';
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(step);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });
        window.addEventListener('mouseleave', function () {
            mouse.active = false;
        });

        resize();
        requestAnimationFrame(step);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
