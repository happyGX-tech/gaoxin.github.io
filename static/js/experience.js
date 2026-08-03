(function () {
    const EXPERIENCE_DIR = 'contents/';
    const TITLES = {
        1: '具身智能与强化学习科研实践',
        2: '复杂场景导航控制新方法',
        3: '数据智能与可视化交互研究'
    };

    // 图片直接指定：路径与 static/assets/img/experience/ 下的文件保持一致
    const IMAGES = {
        1: 'static/assets/img/experience/exp-1.jpg',
        2: 'static/assets/img/experience/exp-2.jpg',
        3: 'static/assets/img/experience/exp-3.png'
    };

    let container = null;
    let media = null;

    function setMedia(id) {
        if (!media) {
            return;
        }
        const path = IMAGES[id];
        if (!path) {
            media.classList.add('is-empty');
            return;
        }
        const img = document.createElement('img');
        img.src = path;
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = function () {
            img.style.display = 'none';
            media.classList.add('is-empty');
        };
        media.appendChild(img);
    }

    function reveal() {
        const els = Array.from(container.querySelectorAll('.experience-detail > *'));
        if (els.length === 0) {
            return;
        }

        els.forEach(function (el, index) {
            el.classList.add('reveal');
            el.style.setProperty('--d', (index * 60) + 'ms');
        });

        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('reveal-visible'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        els.forEach(function (el) { observer.observe(el); });
    }

    function init() {
        container = document.getElementById('experience-detail');
        media = document.getElementById('experience-media');
        if (!container) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'), 10) || 1;
        document.title = (TITLES[id] || 'Experience') + ' — GaoXin';

        fetch(EXPERIENCE_DIR + 'experience-' + id + '.md')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                return response.text();
            })
            .then(function (markdown) {
                marked.use({ mangle: false, headerIds: false });
                container.innerHTML = marked.parse(markdown);
                setMedia(id);
                reveal();
            })
            .catch(function () {
                container.innerHTML = '<p class="experience-error">内容加载失败，请返回重试。</p>';
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
