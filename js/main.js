document.addEventListener('DOMContentLoaded', () => {

    const btnModo = document.querySelector('#btn-modo');
    const body = document.body;

    const modoGuardado = localStorage.getItem('tema');
    if (modoGuardado === 'claro') {
        body.classList.add('light-mode');
        if (btnModo) btnModo.checked = true;
    }

    if (btnModo) {
        btnModo.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('light-mode');
                localStorage.setItem('tema', 'claro');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('tema', 'oscuro');
            }
        });
    }

    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 100
            });
        }
    } catch (e) {
        console.warn('AOS not loaded', e);
    }

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');

            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('show-menu')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }

    const navClose = document.getElementById('nav-close');
    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');

            // Esto restaura el icono de hamburguesa cuando cierras
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');

                const icon = navToggle ? navToggle.querySelector('i') : null;
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    function scrollHeader() {
        const header = document.getElementById('header')
        // CAMBIO: El "if (header)" es vital para que no dé error en About
        if (header) {
            if (this.scrollY >= 80) header.classList.add('scroll-header');
            else header.classList.remove('scroll-header');
        }
    }
    window.addEventListener('scroll', scrollHeader)

    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name.length < 2 || !email.includes('@')) {
                alert('Por favor, rellena los campos correctamente antes de enviar.');
                e.preventDefault();
            } else {
                setTimeout(() => {
                    contactForm.reset();
                }, 1000);
            }
        });
    }
});

function setContactType(type) {
    setTimeout(() => {
        const select = document.getElementById('type');
        if (select) {
            select.value = type;
        }
    }, 500);
}
