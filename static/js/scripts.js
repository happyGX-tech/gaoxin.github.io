const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'experience', 'awards', 'publications'];


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
            })
            .catch(error => console.log(error));
    })

}); 
