document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Scroll en Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 2. Menú Móvil (Hamburguesa)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileBtn && navLinks) {
        // Abrir/Cerrar menú
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace (Vital para móviles)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });
    }

    // 3. Smooth Scrolling (Desplazamiento Suave)
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

    // 4. Animaciones al hacer scroll (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 5. Integración Formulario con WhatsApp
    const whatsappForm = document.getElementById('whatsappForm');
    
    if(whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Capturar datos
            const name = document.getElementById('wp-name').value;
            const email = document.getElementById('wp-email').value;
            const message = document.getElementById('wp-message').value;

            // Número configurado
            const phoneNumber = "584120936783";

            // Crear texto
            const customMessage = `Hola Eduardo, mi nombre es *${name}*.\n\nMi correo es: ${email}\n\nTe escribo por lo siguiente:\n"${message}"\n\nMe gustaría agendar una consulta.`;

            // Codificar y abrir URL
            const encodedMessage = encodeURIComponent(customMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});