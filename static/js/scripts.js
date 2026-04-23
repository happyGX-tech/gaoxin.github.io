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

function initRlViz() {
    if (prefersReducedMotion()) {
        return;
    }
    const host = document.getElementById('rl-viz');
    if (!host || host.dataset.bound === '1') {
        return;
    }
    host.dataset.bound = '1';

    // Build DOM
    const card = document.createElement('div');
    card.className = 'rl-viz-card';

    const head = document.createElement('div');
    head.className = 'rl-viz-head';

    const title = document.createElement('div');
    title.className = 'rl-viz-title';
    title.textContent = 'Embodied RL Navigation (Paper-style Toy)';

    const meta = document.createElement('div');
    meta.className = 'rl-viz-meta';
    meta.textContent = 'Click: set Goal · Contours: value/occupancy · Metrics: success/steps/return';

    head.appendChild(title);
    head.appendChild(meta);

    const body = document.createElement('div');
    body.className = 'rl-viz-body';

    const canvas = document.createElement('canvas');
    canvas.className = 'rl-viz-canvas';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Interactive embodied RL rollout visualization');

    const legend = document.createElement('div');
    legend.className = 'rl-viz-legend';
    legend.innerHTML = [
        '<span><span class="rl-viz-dot agent"></span>Agent</span>',
        '<span><span class="rl-viz-dot goal"></span>Goal</span>',
        '<span><span class="rl-viz-dot traj"></span>Trajectory samples</span>',
        '<span><span class="rl-viz-dot obs"></span>Obstacles</span>',
        '<span>Contours: value \u2248 -distance(goal)</span>'
    ].join('');

    body.appendChild(canvas);
    const metrics = document.createElement('div');
    metrics.className = 'rl-viz-metrics';
    metrics.innerHTML = [
        '<div class="rl-metric"><span class="k">Success</span><span class="v" id="rl-m-sr">—</span></div>',
        '<div class="rl-metric"><span class="k">Steps</span><span class="v" id="rl-m-steps">—</span></div>',
        '<div class="rl-metric"><span class="k">Return</span><span class="v" id="rl-m-ret">—</span></div>',
    ].join('');
    body.appendChild(metrics);
    body.appendChild(legend);
    card.appendChild(head);
    card.appendChild(body);
    host.appendChild(card);

    // Simulation
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
        return;
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const state = {
        w: 0,
        h: 0,
        cols: 64,
        rows: 36,
        agent: { x: 0.15, y: 0.70, vx: 0, vy: 0 },
        goal: { x: 0.80, y: 0.30 },
        traj: [],
        obstacles: [],
        mouse: { x: -1, y: -1 },
        epSteps: 0,
        epReturn: 0,
        episodes: [],
        lastSuccess: null
    };

    // Obstacles: deterministic layout with a few "walls"
    const buildObstacles = () => {
        const obs = [];
        // vertical wall
        obs.push({ x: 0.46, y: 0.10, w: 0.03, h: 0.62 });
        // horizontal wall
        obs.push({ x: 0.18, y: 0.52, w: 0.46, h: 0.035 });
        // small blocks
        obs.push({ x: 0.72, y: 0.56, w: 0.06, h: 0.09 });
        obs.push({ x: 0.63, y: 0.20, w: 0.05, h: 0.07 });
        return obs;
    };
    state.obstacles = buildObstacles();

    const resize = () => {
        const r = canvas.getBoundingClientRect();
        const w = Math.max(420, Math.floor(r.width));
        const h = Math.floor(w * 9 / 16);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        state.w = w;
        state.h = h;
        // scale grid to keep nice cell sizes
        state.cols = Math.max(56, Math.min(96, Math.floor(w / 11)));
        state.rows = Math.max(32, Math.min(54, Math.floor(h / 11)));
    };

    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const inRect = (p, rect) => (p.x >= rect.x && p.x <= rect.x + rect.w && p.y >= rect.y && p.y <= rect.y + rect.h);

    const project = (x, y) => ({ x: x * state.w, y: y * state.h });
    const unproject = (x, y) => ({ x: x / state.w, y: y / state.h });

    const obstacleDistance = (p) => {
        // Signed-ish distance: positive outside, negative inside
        let minD = Infinity;
        for (const o of state.obstacles) {
            const cx = Math.max(o.x, Math.min(p.x, o.x + o.w));
            const cy = Math.max(o.y, Math.min(p.y, o.y + o.h));
            const dx = p.x - cx;
            const dy = p.y - cy;
            const d = Math.hypot(dx, dy);
            if (inRect(p, o)) {
                minD = Math.min(minD, -d);
            } else {
                minD = Math.min(minD, d);
            }
        }
        return minD;
    };

    const valueAt = (p, goal) => {
        // value ~= -distance(goal) with obstacle penalty
        const dg = Math.hypot(p.x - goal.x, p.y - goal.y);
        const dob = obstacleDistance(p);
        const penalty = dob < 0.02 ? (0.06 - dob) * 2.0 : 0;
        return -(dg + penalty);
    };

    // Marching-squares style isolines (paper-style contour plot)
    const drawValueContours = () => {
        const cols = state.cols;
        const rows = state.rows;
        const cw = state.w / cols;
        const ch = state.h / rows;

        // sample distances at grid vertices (rows+1 x cols+1)
        const dField = new Float32Array((rows + 1) * (cols + 1));
        for (let y = 0; y <= rows; y++) {
            for (let x = 0; x <= cols; x++) {
                const px = x / cols;
                const py = y / rows;
                const v = valueAt({ x: px, y: py }, state.goal);
                const d = -v; // distance-ish
                dField[y * (cols + 1) + x] = d;
            }
        }

        const levels = [];
        for (let d = 0.20; d <= 1.20; d += 0.15) levels.push(d);

        const interp = (x1, y1, v1, x2, y2, v2, level) => {
            const t = (level - v1) / (v2 - v1 + 1e-6);
            return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
        };

        ctx.save();
        ctx.lineWidth = 1.25;
        ctx.globalAlpha = 1;

        levels.forEach((level, li) => {
            const a = 0.18 + (li % 2) * 0.06;
            ctx.strokeStyle = `rgba(31, 63, 102, ${a})`;
            ctx.beginPath();

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const i00 = y * (cols + 1) + x;
                    const i10 = i00 + 1;
                    const i01 = i00 + (cols + 1);
                    const i11 = i01 + 1;

                    const v00 = dField[i00];
                    const v10 = dField[i10];
                    const v01 = dField[i01];
                    const v11 = dField[i11];

                    const p00 = { x: x * cw, y: y * ch };
                    const p10 = { x: (x + 1) * cw, y: y * ch };
                    const p01 = { x: x * cw, y: (y + 1) * ch };
                    const p11 = { x: (x + 1) * cw, y: (y + 1) * ch };

                    const c0 = v00 < level;
                    const c1 = v10 < level;
                    const c2 = v11 < level;
                    const c3 = v01 < level;
                    const code = (c0 ? 1 : 0) | (c1 ? 2 : 0) | (c2 ? 4 : 0) | (c3 ? 8 : 0);
                    if (code === 0 || code === 15) continue;

                    const e = [];
                    // edges: 0 top(00-10), 1 right(10-11), 2 bottom(01-11), 3 left(00-01)
                    if (c0 !== c1) e.push(interp(p00.x, p00.y, v00, p10.x, p10.y, v10, level));
                    if (c1 !== c2) e.push(interp(p10.x, p10.y, v10, p11.x, p11.y, v11, level));
                    if (c3 !== c2) e.push(interp(p01.x, p01.y, v01, p11.x, p11.y, v11, level));
                    if (c0 !== c3) e.push(interp(p00.x, p00.y, v00, p01.x, p01.y, v01, level));

                    if (e.length === 2) {
                        ctx.moveTo(e[0].x, e[0].y);
                        ctx.lineTo(e[1].x, e[1].y);
                    } else if (e.length === 4) {
                        // ambiguous case: draw two segments
                        ctx.moveTo(e[0].x, e[0].y);
                        ctx.lineTo(e[1].x, e[1].y);
                        ctx.moveTo(e[2].x, e[2].y);
                        ctx.lineTo(e[3].x, e[3].y);
                    }
                }
            }

            ctx.stroke();
        });

        ctx.restore();
    };

    const drawOccupancyContours = () => {
        // emphasize obstacle boundaries like occupancy contours
        ctx.save();
        ctx.strokeStyle = 'rgba(29, 39, 51, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        state.obstacles.forEach(o => {
            const p = project(o.x, o.y);
            ctx.strokeRect(p.x + 1, p.y + 1, o.w * state.w - 2, o.h * state.h - 2);
        });
        ctx.restore();
    };

    const drawObstacles = () => {
        ctx.save();
        ctx.fillStyle = 'rgba(29, 39, 51, 0.12)';
        ctx.strokeStyle = 'rgba(29, 39, 51, 0.22)';
        ctx.lineWidth = 1;
        state.obstacles.forEach(o => {
            const p = project(o.x, o.y);
            ctx.fillRect(p.x, p.y, o.w * state.w, o.h * state.h);
            ctx.strokeRect(p.x + 0.5, p.y + 0.5, o.w * state.w - 1, o.h * state.h - 1);
        });
        ctx.restore();
    };

    const drawGoalAgentTraj = () => {
        // trajectory samples (paper style)
        ctx.save();
        const every = 6;
        for (let i = 0; i < state.traj.length; i += every) {
            const p = state.traj[i];
            const s = project(p.x, p.y);
            const alpha = Math.max(0.06, Math.min(0.32, i / Math.max(1, state.traj.length) * 0.32));
            ctx.fillStyle = `rgba(31, 63, 102, ${alpha})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // goal
        const g = project(state.goal.x, state.goal.y);
        ctx.save();
        ctx.fillStyle = 'rgba(31, 63, 102, 0.92)';
        ctx.beginPath();
        ctx.arc(g.x, g.y, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(g.x, g.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // agent
        const a = project(state.agent.x, state.agent.y);
        ctx.save();
        ctx.fillStyle = 'rgba(143, 106, 43, 0.92)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, 8.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + state.agent.vx * state.w * 0.12, a.y + state.agent.vy * state.h * 0.12);
        ctx.stroke();
        ctx.restore();
    };

    const drawGridFrame = () => {
        ctx.save();
        ctx.strokeStyle = 'rgba(230, 224, 212, 0.9)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, state.w - 1, state.h - 1);
        ctx.restore();
    };

    const step = (dt) => {
        // simplified policy: follow value gradient with obstacle repulsion
        const p = { x: state.agent.x, y: state.agent.y };
        const eps = 0.0045;

        const v0 = valueAt(p, state.goal);
        const vx = valueAt({ x: clamp01(p.x + eps), y: p.y }, state.goal) - v0;
        const vy = valueAt({ x: p.x, y: clamp01(p.y + eps) }, state.goal) - v0;

        // gradient ascent on value (since value is negative distance, this moves toward goal)
        let gx = vx / eps;
        let gy = vy / eps;

        // repulsion from obstacles
        const dob = obstacleDistance(p);
        if (dob < 0.10) {
            // approximate obstacle normal by sampling
            const d0 = obstacleDistance(p);
            const dx = obstacleDistance({ x: clamp01(p.x + eps), y: p.y }) - d0;
            const dy = obstacleDistance({ x: p.x, y: clamp01(p.y + eps) }) - d0;
            const nx = dx / eps;
            const ny = dy / eps;
            const s = (0.10 - dob) * 3.2;
            gx += nx * s;
            gy += ny * s;
        }

        // normalize + smooth dynamics
        const gnorm = Math.hypot(gx, gy) || 1;
        gx /= gnorm; gy /= gnorm;

        const speed = 0.22; // units/sec
        const ax = gx * speed;
        const ay = gy * speed;

        // low-pass velocity
        const k = 0.18;
        state.agent.vx = state.agent.vx * (1 - k) + ax * k;
        state.agent.vy = state.agent.vy * (1 - k) + ay * k;

        // integrate
        state.agent.x = clamp01(state.agent.x + state.agent.vx * dt);
        state.agent.y = clamp01(state.agent.y + state.agent.vy * dt);

        // collision: if inside obstacle, push back slightly
        if (obstacleDistance({ x: state.agent.x, y: state.agent.y }) < 0) {
            state.agent.x = clamp01(state.agent.x - state.agent.vx * dt * 2.2);
            state.agent.y = clamp01(state.agent.y - state.agent.vy * dt * 2.2);
            state.agent.vx *= 0.15;
            state.agent.vy *= 0.15;
        }

        // record trajectory
        state.traj.push({ x: state.agent.x, y: state.agent.y });
        if (state.traj.length > 220) {
            state.traj.shift();
        }

        state.epSteps += 1;
        state.epReturn += valueAt({ x: state.agent.x, y: state.agent.y }, state.goal);

        // reset if reached goal
        const dg = Math.hypot(state.agent.x - state.goal.x, state.agent.y - state.goal.y);
        if (dg < 0.03) {
            state.episodes.push(true);
            if (state.episodes.length > 20) state.episodes.shift();
            state.lastSuccess = true;
            state.traj = [];
            state.epSteps = 0;
            state.epReturn = 0;
            // respawn
            state.agent.x = 0.12 + Math.random() * 0.08;
            state.agent.y = 0.72 + (Math.random() - 0.5) * 0.08;
            state.agent.vx = 0;
            state.agent.vy = 0;
        } else if (state.epSteps > 520) {
            // timeout episode
            state.episodes.push(false);
            if (state.episodes.length > 20) state.episodes.shift();
            state.lastSuccess = false;
            state.traj = [];
            state.epSteps = 0;
            state.epReturn = 0;
            state.agent.x = 0.12 + Math.random() * 0.08;
            state.agent.y = 0.72 + (Math.random() - 0.5) * 0.08;
            state.agent.vx = 0;
            state.agent.vy = 0;
        }
    };

    let lastT = 0;
    const render = (t) => {
        const dtMs = Math.min(40, t - lastT);
        lastT = t;
        const dt = dtMs / 1000;

        // background
        ctx.fillStyle = 'rgb(252, 251, 247)';
        ctx.fillRect(0, 0, state.w, state.h);

        drawValueContours();
        drawObstacles();
        drawOccupancyContours();

        // rollout step
        step(dt);
        drawGoalAgentTraj();
        drawGridFrame();

        // metrics
        const srEl = metrics.querySelector('#rl-m-sr');
        const stEl = metrics.querySelector('#rl-m-steps');
        const rtEl = metrics.querySelector('#rl-m-ret');
        if (srEl && stEl && rtEl) {
            const n = state.episodes.length;
            const s = state.episodes.reduce((acc, v) => acc + (v ? 1 : 0), 0);
            const sr = n ? (s / n) : 0;
            srEl.textContent = n ? `${Math.round(sr * 100)}% (${s}/${n})` : '—';
            stEl.textContent = `${state.epSteps}`;
            const pret = state.epSteps ? (state.epReturn / state.epSteps) : 0;
            rtEl.textContent = state.epSteps ? `${pret.toFixed(3)}` : '—';
        }

        requestAnimationFrame(render);
    };

    const setGoalFromEvent = (e) => {
        const r = canvas.getBoundingClientRect();
        const x = clamp01((e.clientX - r.left) / r.width);
        const y = clamp01((e.clientY - r.top) / r.height);
        // avoid placing goal inside obstacles
        const g = { x, y };
        if (obstacleDistance(g) < 0.02) {
            return;
        }
        state.goal.x = g.x;
        state.goal.y = g.y;
        state.traj = [];
        state.epSteps = 0;
        state.epReturn = 0;
    };

    canvas.addEventListener('click', setGoalFromEvent);
    canvas.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        const x = clamp01((e.clientX - r.left) / r.width);
        const y = clamp01((e.clientY - r.top) / r.height);
        state.mouse.x = x;
        state.mouse.y = y;
    }, { passive: true });

    resize();
    window.addEventListener('resize', resize, { passive: true });
    requestAnimationFrame(render);
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
                initRlViz();
            })
            .catch(error => console.log(error));
    })

    initSpotlight();
    initFxCanvas();
    initHeroParallax();
}); 
