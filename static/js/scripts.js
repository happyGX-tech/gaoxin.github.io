const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'experience', 'awards', 'publications'];

function buildExperienceCards() {
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
        const card = document.createElement('article');
        card.className = 'experience-card';

        const title = document.createElement('h3');
        title.className = 'experience-card-title';
        title.innerHTML = group.title.innerHTML;

        const body = document.createElement('div');
        body.className = 'experience-card-body';
        group.content.forEach(node => {
            const isDivider = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'HR';
            if (!isDivider) {
                body.appendChild(node);
            }
        });

        const link = document.createElement('a');
        link.className = 'experience-card-link';
        link.href = 'experience.html?id=' + (index + 1);
        link.textContent = '查看详情 →';

        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(link);
        container.appendChild(card);
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
    Promise.all(section_names.map(name =>
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
                if (name === 'experience') {
                    buildExperienceCards();
                }
            })
            .catch(error => console.log(error))
    )).then(() => {
        // MathJax
        MathJax.typeset();
        initReveal();
    });
});

function initReveal() {
    const targets = [];

    document.querySelectorAll('section header').forEach(header => {
        header.classList.add('reveal');
        targets.push(header);
    });

    document.querySelectorAll('.main-body').forEach(body => {
        Array.from(body.children).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.setProperty('--d', (index * 70) + 'ms');
            targets.push(el);
        });
    });

    if (targets.length === 0) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('reveal-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(el => observer.observe(el));
}
