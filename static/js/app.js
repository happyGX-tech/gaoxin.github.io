/* Xin Gao homepage — i18n (EN default / ZH), 4 themes, particle toggle,
   detail pages with research material figures. No runtime dependencies. */
(function () {
    'use strict';

    var PAPER_TITLE = 'Conservatism Controllable Compositional Guidance for Offline Safe Reinforcement Learning';
    var PAPER_AUTHORS = 'Ruiqi Xue &middot; Shenghe Hu &middot; <strong>Xin Gao</strong> &middot; Jing-Wen Yang';
    var EMAIL = '231830150@smail.nju.edu.cn';
    var GITHUB = 'https://github.com/happygx-tech';

    var I18N = {
        en: {
            brand: 'Xin Gao',
            docTitle: 'Xin Gao — Nanjing University',
            metaDesc: 'Xin Gao — undergraduate at Nanjing University. Research in reinforcement learning and embodied intelligence, building self-evolving embodied agents.',
            role: 'Undergraduate · Nanjing University',
            interestsLabel: 'Research Interests',
            chipRL: 'Reinforcement Learning',
            chipEI: 'Embodied Intelligence',
            bio: 'My research centers on reinforcement learning and embodied intelligence — building embodied agents that can evolve on their own. At the LAMDA Lab of Nanjing University, I work on offline &amp; safe RL, multi-agent decision-making, and vision-language-action models, toward agents that keep learning, adapt autonomously, and act safely in the real world.',
            btnEmail: 'Email',
            btnGitHub: 'GitHub',
            researchKicker: 'Research Experience',
            exp1Title: 'Reinforcement Learning &amp; Embodied Intelligence',
            exp1Org: 'LAMDA Lab, Nanjing University',
            exp1Period: '2025.11 — Present',
            exp1Desc: 'Offline &amp; safe RL, multi-agent systems, and VLA models for real-world robot settings.',
            exp2Title: 'Data Intelligence &amp; Interactive Visualization',
            exp2Org: 'Team Lead · National First Prize',
            exp2Period: '2025.03 — 2025.07',
            exp2Desc: 'A data-driven ML network analyzing technology innovation and social change; saliency-based sampling for large-scale scatter data.',
            detailsLink: 'Details',
            pubsKicker: 'Publications',
            accepted: 'Accepted',
            pubTldr: 'Co3G: conservatism-controllable compositional guidance that outperforms hard- and soft-constraint baselines on offline safe RL benchmarks.',
            awardsKicker: 'Awards',
            award1Name: 'First Prize, China Collegiate Computing Competition',
            award2Name: 'First Prize, People’s Scholarship of NJU',
            footerCopy: '© 2023–2026 Xin Gao',
            license: 'License',
            back: 'Back to home',
            detailKicker: 'Research Experience',
            overviewH: 'Overview',
            directionsH: 'Research Directions',
            workH: 'Key Work',
            publicationH: 'Publication',
            awardH: 'Award',
            factsH: 'At a Glance',
            factRole: 'Role',
            factPeriod: 'Period',
            factOutcome: 'Outcome',
            focusH: 'Focus',
            materialsH: 'Research Materials',
            figLabel: 'Fig.',
            enlarge: 'Click to enlarge',
            lightboxClose: 'Close',
            firstPrize: 'First Prize',
            ariaGithub: 'GitHub profile',
            ariaMotion: 'Toggle particle field',
            themePickerLabel: 'Color theme',
            themeLight: 'Graphite Light',
            themeDark: 'Graphite Dark',
            themeViolet: 'NJU Violet',
            themeOcean: 'Deep Ocean'
        },
        zh: {
            brand: '高昕',
            docTitle: '高昕 — 南京大学',
            metaDesc: '高昕 — 南京大学本科生。研究兴趣为强化学习与具身智能，致力于构建能够自我进化的具身智能体。',
            role: '本科生 · 南京大学',
            interestsLabel: '研究兴趣',
            chipRL: '强化学习',
            chipEI: '具身智能',
            bio: '我的研究兴趣主要集中在强化学习与具身智能，致力于构建能够自我进化的具身智能体。目前在南京大学 LAMDA 实验室开展研究，关注离线与安全强化学习、多智能体决策以及视觉-语言-动作（VLA）模型，希望让智能体在真实世界中持续学习、自主适应并安全地交互。',
            btnEmail: '邮箱',
            btnGitHub: 'GitHub',
            researchKicker: '科研经历',
            exp1Title: '强化学习与具身智能科研实践',
            exp1Org: '南京大学 LAMDA 实验室',
            exp1Period: '2025.11 — 至今',
            exp1Desc: '离线/安全强化学习、多智能体系统与面向真实机器人的 VLA 模型研究。',
            exp2Title: '数据智能与可视化交互研究',
            exp2Org: '团队负责人 · 全国一等奖',
            exp2Period: '2025.03 — 2025.07',
            exp2Desc: '以数据驱动机器学习构建科技创新与社会变革多维分析网络，研究大规模散点数据的显著性采样与交互可视化。',
            detailsLink: '查看详情',
            pubsKicker: '论文发表',
            accepted: '已录用',
            pubTldr: 'Co3G：保守度可控的组合引导方法，在离线安全强化学习基准上显著优于硬约束与软约束基线。',
            awardsKicker: '奖项荣誉',
            award1Name: '中国大学生计算机设计大赛 一等奖',
            award2Name: '南京大学人民奖学金 一等奖',
            footerCopy: '© 2023–2026 高昕',
            license: '许可协议',
            back: '返回首页',
            detailKicker: '科研经历',
            overviewH: '概述',
            directionsH: '研究方向',
            workH: '主要工作',
            publicationH: '论文发表',
            awardH: '获奖情况',
            factsH: '概览',
            factRole: '角色',
            factPeriod: '时间',
            factOutcome: '成果',
            focusH: '研究关键词',
            materialsH: '研究材料',
            figLabel: '图',
            enlarge: '点击放大',
            lightboxClose: '关闭',
            firstPrize: '一等奖',
            ariaGithub: 'GitHub 主页',
            ariaMotion: '切换粒子动效',
            themePickerLabel: '配色方案',
            themeLight: '经典白',
            themeDark: '石墨黑',
            themeViolet: '南大紫',
            themeOcean: '深海'
        }
    };

    var DETAILS = {
        1: {
            en: {
                title: 'Reinforcement Learning & Embodied Intelligence',
                meta: ['LAMDA Lab, Nanjing University', '2025.11 — Present', 'RL Lab'],
                overview: 'Research training at the RL Lab (LAMDA), School of Artificial Intelligence, Nanjing University, focusing on safe decision-making and generalization of agents in complex real-world embodied settings.',
                directions: ['Offline reinforcement learning & safe reinforcement learning', 'Multi-agent reinforcement learning', 'Vision-Language-Action (VLA) embodied models'],
                work: [
                    'Studied and presented frontier Safe RL and Offline RL papers; explored generative models and meta-learning for RL task generalization.',
                    'Built RL environments and reproduced multi-agent algorithm baselines; currently exploring generative models for multi-agent RL.',
                    'Surveyed VLA literature and presented findings; supported robot teleoperation data collection and simulation setup.'
                ],
                pubNote: 'Proposes Co3G — conservatism-controllable compositional guidance that significantly outperforms hard- and soft-constraint baselines on offline safe RL benchmarks.',
                facts: { role: 'Member', period: '2025.11 — Present', outcome: 'NeurIPS 2026 (Accepted)' },
                focus: ['Offline RL', 'Safe RL', 'MARL', 'VLA'],
                media: [
                    { src: 'static/assets/img/experience/exp-1.jpg', cap: 'SOMAD → SOMAP → SOMATT: safe offline multi-agent transfer for scalable MARL' }
                ]
            },
            zh: {
                title: '强化学习与具身智能科研实践',
                meta: ['南京大学 LAMDA 实验室', '2025.11 — 至今', 'RL Lab'],
                overview: '在南京大学人工智能学院 LAMDA 实验室 RL Lab 进组科研，围绕强化学习与具身智能开展研究，主要关注智能体在复杂真实场景中的安全性与泛化能力。',
                directions: ['离线强化学习与安全强化学习', '多智能体强化学习', 'VLA（视觉-语言-动作）具身模型'],
                work: [
                    '深入研读 Safe RL 与 Offline RL 前沿论文并进行组会汇报，探索生成模型、元学习等方法在强化学习任务泛化中的应用。',
                    '搭建强化学习环境，复现并比较多智能体算法基线，正在探索生成式模型在多智能体强化学习中的应用。',
                    '调研 VLA 相关文献并汇报，协助机器人遥操数据收集与仿真环境搭建。'
                ],
                pubNote: '提出 Co3G 方法（保守度可控的组合引导），在离线安全强化学习基准上显著优于硬约束与软约束基线。',
                facts: { role: '成员', period: '2025.11 — 至今', outcome: 'NeurIPS 2026（已录用）' },
                focus: ['离线强化学习', '安全强化学习', '多智能体', 'VLA'],
                media: [
                    { src: 'static/assets/img/experience/exp-1.jpg', cap: 'SOMAD → SOMAP → SOMATT：面向可扩展多智能体的安全离线迁移框架' }
                ]
            }
        },
        2: {
            en: {
                title: 'Data Intelligence & Interactive Visualization',
                meta: ['Team Lead', '2025.03 — 2025.07', 'National First Prize'],
                overview: 'Led a team building a multi-dimensional analysis network of technology innovation and social change with data-driven machine learning, winning First Prize in the China Collegiate Computing Competition. Also conducted intelligent, interactive analysis of enterprise-scale scatter datasets based on human visual perception and density information.',
                directions: null,
                work: [
                    'Organized the team to integrate multiple analytical models into a data-driven machine-learning pipeline, building the multi-dimensional analysis network.',
                    'Surveyed literature and implemented visual-saliency-based sampling algorithms.',
                    'Designed and validated core sampling and visualization algorithms; co-built the complete front-end / back-end visualization system.'
                ],
                awardName: 'China Collegiate Computing Competition',
                awardNote: 'First Prize (national level) for the data-driven analysis network of technology innovation and social change, providing data support and interpretable paths for research innovation and social development in the big-data era.',
                facts: { role: 'Team Lead', period: '2025.03 — 2025.07', outcome: 'National First Prize' },
                focus: ['Data-Driven ML', 'Visual Saliency', 'Sampling', 'Visualization'],
                media: [
                    { src: 'static/assets/img/experience/exp-3-2.png', cap: 'ZoomScatter: saliency-based sampling and interactive exploration of 14M-point scatter data' },
                    { src: 'static/assets/img/experience/exp-3.png', cap: 'First Prize certificate, 18th China Collegiate Computing Competition (2025)' }
                ]
            },
            zh: {
                title: '数据智能与可视化交互研究',
                meta: ['团队负责人', '2025.03 — 2025.07', '全国一等奖'],
                overview: '作为团队负责人，组织团队以数据驱动的机器学习方式综合多类分析模型，构建科技创新与社会变革的多维度分析网络，获中国大学生计算机设计大赛一等奖；同时基于人类视觉感知与密度信息，对企业提出的大规模散点数据集进行数据智能与交互分析。',
                directions: null,
                work: [
                    '组织团队以数据驱动机器学习方式综合多类分析模型，构建科技创新与社会变革多维分析网络。',
                    '调研文献，编写基于视觉显著性图的采样算法。',
                    '负责核心采样与可视化算法的设计与验证，与合作者共同构建完整的前后端可视化系统。'
                ],
                awardName: '中国大学生计算机设计大赛',
                awardNote: '以数据驱动的科技创新与社会变革分析网络获全国一等奖，为大数据时代的科研创新与社会变化发展路径提供数据支撑与可解释路径。',
                facts: { role: '团队负责人', period: '2025.03 — 2025.07', outcome: '全国一等奖' },
                focus: ['数据驱动机器学习', '视觉显著性', '采样算法', '交互可视化'],
                media: [
                    { src: 'static/assets/img/experience/exp-3-2.png', cap: 'ZoomScatter：千万级散点数据的显著性采样与交互探索系统' },
                    { src: 'static/assets/img/experience/exp-3.png', cap: '第18届中国大学生计算机设计大赛一等奖证书（2025）' }
                ]
            }
        }
    };

    var THEMES = ['light', 'dark', 'violet', 'ocean'];
    var state = {
        lang: localStorage.getItem('gx-lang') === 'zh' ? 'zh' : 'en',
        theme: THEMES.indexOf(localStorage.getItem('gx-theme')) >= 0 ? localStorage.getItem('gx-theme') : 'violet',
        motion: localStorage.getItem('gx-motion') === '1'
    };

    function t() { return I18N[state.lang]; }

    /* ------------------------------------------------------------------ */
    /* Theme                                                               */
    /* ------------------------------------------------------------------ */
    function applyTheme(theme, animate) {
        state.theme = theme;
        localStorage.setItem('gx-theme', theme);
        var root = document.documentElement;
        if (animate) {
            root.classList.add('theme-anim');
            setTimeout(function () { root.classList.remove('theme-anim'); }, 520);
        }
        root.setAttribute('data-theme', theme);
        document.querySelectorAll('.swatch').forEach(function (b) {
            b.setAttribute('aria-pressed', String(b.dataset.themeBtn === theme));
        });
        if (window.Particles) window.Particles.refresh();
    }

    /* ------------------------------------------------------------------ */
    /* Language                                                            */
    /* ------------------------------------------------------------------ */
    function swapTexts() {
        var dict = t();
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var k = el.getAttribute('data-i18n');
            if (dict[k] != null) el.textContent = dict[k];
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var k = el.getAttribute('data-i18n-html');
            if (dict[k] != null) el.innerHTML = dict[k];
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var k = el.getAttribute('data-i18n-aria');
            if (dict[k] != null) el.setAttribute('aria-label', dict[k]);
        });
        document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
        var meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', dict.metaDesc);
        document.querySelectorAll('.lang-toggle button').forEach(function (b) {
            b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
        });
        if (document.body.dataset.page === 'detail') renderDetail(false);
        else document.title = dict.docTitle;
    }

    function applyLang(lang, animate) {
        state.lang = lang;
        localStorage.setItem('gx-lang', lang);
        if (animate) {
            document.body.classList.add('lang-fading');
            setTimeout(function () {
                swapTexts();
                document.body.classList.remove('lang-fading');
            }, 190);
        } else {
            swapTexts();
        }
    }

    /* ------------------------------------------------------------------ */
    /* Motion toggle                                                       */
    /* ------------------------------------------------------------------ */
    function applyMotion(on, persist) {
        state.motion = on;
        if (persist) localStorage.setItem('gx-motion', on ? '1' : '0');
        document.body.classList.toggle('motion-off', !on);
        var btn = document.getElementById('motion-toggle');
        if (btn) {
            btn.setAttribute('aria-pressed', String(on));
            btn.querySelector('.ic-on').style.display = on ? '' : 'none';
            btn.querySelector('.ic-off').style.display = on ? 'none' : '';
        }
        if (window.Particles) { if (on) window.Particles.start(); else window.Particles.stop(); }
    }

    /* ------------------------------------------------------------------ */
    /* Detail page                                                         */
    /* ------------------------------------------------------------------ */
    function detailId() {
        var m = new URLSearchParams(location.search).get('id');
        return DETAILS[m] ? m : '1';
    }

    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function renderDetail(animate) {
        var root = document.getElementById('detail-root');
        if (!root) return;
        var id = detailId();
        var d = DETAILS[id][state.lang];
        var dict = t();
        document.title = d.title + ' — ' + dict.brand;

        var html = '';
        html += '<a class="back-link enter" href="index.html"><span class="arrow">&larr;</span><span>' + esc(dict.back) + '</span></a>';
        html += '<div class="detail-grid">';
        html += '<article class="detail-article">';
        html += '<p class="kicker enter" style="--d:60ms">' + esc(dict.detailKicker) + ' · 0' + id + '</p>';
        html += '<h1 class="detail-title enter" style="--d:120ms">' + esc(d.title) + '</h1>';
        html += '<div class="detail-meta enter" style="--d:180ms">' + d.meta.map(function (m) { return '<span class="chip">' + esc(m) + '</span>'; }).join('') + '</div>';
        html += '<section class="detail-section reveal"><h2>' + esc(dict.overviewH) + '</h2><p>' + esc(d.overview) + '</p></section>';
        if (d.directions) {
            html += '<section class="detail-section reveal"><h2>' + esc(dict.directionsH) + '</h2><ul class="detail-list">' + d.directions.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></section>';
        }
        html += '<section class="detail-section reveal"><h2>' + esc(dict.workH) + '</h2><ul class="detail-list">' + d.work.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></section>';

        if (id === '1') {
            html += '<section class="detail-section reveal"><h2>' + esc(dict.publicationH) + '</h2><div class="pub-card">' +
                '<div class="pub-badge-row"><span class="badge badge-ok">' + esc(dict.accepted) + '</span><span class="badge badge-venue">NeurIPS 2026</span></div>' +
                '<p class="pub-title">' + esc(PAPER_TITLE) + '</p>' +
                '<p class="pub-authors">' + PAPER_AUTHORS + '</p>' +
                '<p class="pub-note">' + esc(d.pubNote) + '</p>' +
                '</div></section>';
        } else {
            html += '<section class="detail-section reveal"><h2>' + esc(dict.awardH) + '</h2><div class="pub-card">' +
                '<div class="pub-badge-row"><span class="badge badge-ok">' + esc(dict.firstPrize) + '</span><span class="badge badge-venue">2025.07</span></div>' +
                '<p class="pub-title">' + esc(d.awardName) + '</p>' +
                '<p class="pub-note">' + esc(d.awardNote) + '</p>' +
                '</div></section>';
        }
        html += '</article>';

        html += '<aside class="detail-aside">';
        html += '<div class="media-card reveal"><h3 class="media-h">' + esc(dict.materialsH) + '</h3>' + d.media.map(function (f, i) {
            return '<button class="media-fig" type="button" data-src="' + f.src + '" data-cap="' + esc(f.cap) + '">' +
                '<span class="media-imgwrap"><img src="' + f.src + '" alt="' + esc(f.cap) + '" loading="lazy" decoding="async">' +
                '<span class="media-zoom" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></span></span>' +
                '<span class="media-cap"><span class="media-idx">' + esc(dict.figLabel) + ' 0' + (i + 1) + '</span><span>' + esc(f.cap) + '</span></span>' +
                '</button>';
        }).join('') + '</div>';
        html += '<div class="facts-card reveal" style="--d:90ms"><h3>' + esc(dict.factsH) + '</h3>' +
            '<div class="fact-row"><span class="k">' + esc(dict.factRole) + '</span><span class="v">' + esc(d.facts.role) + '</span></div>' +
            '<div class="fact-row"><span class="k">' + esc(dict.factPeriod) + '</span><span class="v">' + esc(d.facts.period) + '</span></div>' +
            '<div class="fact-row"><span class="k">' + esc(dict.factOutcome) + '</span><span class="v">' + esc(d.facts.outcome) + '</span></div>' +
            '<h3 style="margin-top:14px">' + esc(dict.focusH) + '</h3><div class="focus-chips">' + d.focus.map(function (f) { return '<span class="chip">' + esc(f) + '</span>'; }).join('') + '</div>' +
            '</div>';
        html += '</aside></div>';

        root.innerHTML = html;
        initReveal(root);
        if (animate) {
            root.querySelectorAll('.enter').forEach(function (el) {
                el.style.animation = 'none';
                void el.offsetWidth;
                el.style.animation = '';
            });
        }
    }

    /* ------------------------------------------------------------------ */
    /* Lightbox for research material figures                              */
    /* ------------------------------------------------------------------ */
    var lb = { el: null, img: null, cap: null, lastFocus: null, timer: 0 };

    function ensureLightbox() {
        if (lb.el) return;
        var el = document.createElement('div');
        el.className = 'lightbox';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.hidden = true;
        el.innerHTML = '<div class="lightbox-scrim" data-lb-close></div>' +
            '<figure class="lightbox-figure">' +
            '<img alt="" />' +
            '<figcaption class="lightbox-cap"><span></span>' +
            '<button class="icon-btn lightbox-close" type="button" data-lb-close>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
            '</button></figcaption></figure>';
        document.body.appendChild(el);
        lb.el = el;
        lb.img = el.querySelector('img');
        lb.cap = el.querySelector('.lightbox-cap span');
        var closeBtn = el.querySelector('.lightbox-close');
        closeBtn.setAttribute('data-i18n-aria', 'lightboxClose');
        closeBtn.setAttribute('aria-label', t().lightboxClose);
        el.addEventListener('click', function (e) {
            if (e.target.closest('[data-lb-close]')) closeLightbox();
        });
    }

    function openLightbox(src, cap) {
        ensureLightbox();
        clearTimeout(lb.timer);
        lb.lastFocus = document.activeElement;
        lb.img.src = src;
        lb.img.alt = cap;
        lb.cap.textContent = cap;
        lb.el.hidden = false;
        requestAnimationFrame(function () { lb.el.classList.add('open'); });
        document.body.style.overflow = 'hidden';
        lb.el.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
        if (!lb.el || lb.el.hidden) return;
        lb.el.classList.remove('open');
        document.body.style.overflow = '';
        var el = lb.el;
        lb.timer = setTimeout(function () { if (!el.classList.contains('open')) el.hidden = true; }, 220);
        if (lb.lastFocus && lb.lastFocus.focus) lb.lastFocus.focus();
    }

    /* ------------------------------------------------------------------ */
    /* Scroll reveal (detail page)                                         */
    /* ------------------------------------------------------------------ */
    var revealObs = null;

    function initReveal(scope) {
        var targets = (scope || document).querySelectorAll('.reveal');
        if (!targets.length) return;
        if (revealObs) revealObs.disconnect();
        if (!('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('in'); });
            return;
        }
        revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('in');
                    revealObs.unobserve(en.target);
                }
            });
        }, { threshold: 0.08 });
        targets.forEach(function (el) { revealObs.observe(el); });
    }

    /* ------------------------------------------------------------------ */
    /* Boot                                                                */
    /* ------------------------------------------------------------------ */
    function boot() {
        applyTheme(state.theme, false);
        applyLang(state.lang, false);
        applyMotion(state.motion, false);

        document.querySelectorAll('.swatch').forEach(function (b) {
            b.addEventListener('click', function () { applyTheme(b.dataset.themeBtn, true); });
        });
        document.querySelectorAll('.lang-toggle button').forEach(function (b) {
            b.addEventListener('click', function () {
                if (b.dataset.lang !== state.lang) applyLang(b.dataset.lang, true);
            });
        });
        var mt = document.getElementById('motion-toggle');
        if (mt) mt.addEventListener('click', function () { applyMotion(!state.motion, true); });

        document.addEventListener('click', function (e) {
            var fig = e.target.closest('.media-fig');
            if (fig) openLightbox(fig.dataset.src, fig.dataset.cap);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });

        if (document.body.dataset.page === 'home') initReveal(document);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();