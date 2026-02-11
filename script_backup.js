document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .service-item, .burger');

    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

    // Smooth follower movement
    setInterval(() => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }, 10); // Update rate

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // --- Interaction Observer for Reveals ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve if you only want it to animate once
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-text-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // Reveal hero elements with delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero .reveal-text');
        if(heroTitle) heroTitle.classList.add('active');
        
        document.querySelectorAll('.reveal-delay').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 600 + (index * 200));
        });
    }, 500);


    // --- Scroll Events (Parallax & Horizontal) ---
    const horizontalSection = document.querySelector('.horizontal-scroll-wrapper');
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    const parallaxImages = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // 1. Horizontal Scroll Logic
        if (horizontalSection) {
            const sectionTop = horizontalSection.offsetTop;
            const sectionsHeight = horizontalSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Percentage of scroll within the wrapper
            let scrollPercentage = (scrolled - sectionTop) / (sectionsHeight - windowHeight);
            
            // Clamp between 0 and 1
            scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);
            
            // Calculate width to scroll (container width - viewport width)
            // Simplified approximation for this demo - ideally measure scrollWidth
            const moveAmount = window.innerWidth < 768 ? 0 : 
                             (horizontalContainer.scrollWidth - window.innerWidth) * scrollPercentage;

            if (window.innerWidth >= 768) {
                horizontalContainer.style.transform = `translateX(-${moveAmount}px)`;
            }
        }

        // 2. Parallax Logic
        parallaxImages.forEach(img => {
            const speed = img.getAttribute('data-speed') || 0.1;
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });

    // --- Mobile Menu Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links'); // Note: in new HTML structure this might need adjustment if using same class
    const desktopNav = document.querySelector('.desktop-nav'); // Selector based on new HTML

    burger.addEventListener('click', () => {
        // Toggle mobile menu logic here
        // For this implementation, let's just slide in a mobile menu overlay or toggle the existing nav
        // Since we changed HTML structure, let's create a simple overlay for mobile
        
        desktopNav.classList.toggle('mobile-active');
        burger.classList.toggle('toggle');
    });

    // --- Header Color Change on Scroll ---
    // Removed because design is now consistent light theme
    // const header = document.querySelector('header');
    // window.addEventListener('scroll', () => { ... });

    // --- Language Switcher ---
    const translations = {
        'en': {
            'nav_philosophy': 'Philosophy',
            'nav_expertise': 'Expertise',
            'nav_visuals': 'Visuals',
            'book_btn': 'Make an Appointment',
            'hero_title': 'Natural <br><i>Aesthetics</i> <br>Science',
            'hero_location': 'Dubai & Nizhny Novgorod',
            'hero_specialty': 'Dermatology & Cosmetology',
            'about_title': 'The Doctor',
            'about_subtitle': 'Dr. Xenia Barinova',
            'about_p1': 'Dermatologist and cosmetologist with an integrated approach to beauty. I believe that external aesthetics are inextricably linked with internal health.',
            'about_p2': 'Over 10 years of experience in injection and hardware cosmetology. Founder of Skin NN clinic. International practice.',
            'about_link': 'More about Skin NN',
            'gallery_title': 'Visual <br><i>Stories</i>',
            'gallery_subtitle': 'Results & Aesthetics',
            'gallery_item1': 'Clinic Atmosphere',
            'gallery_item2': 'Natural Skin',
            'gallery_item3': 'Process',
            'gallery_item4': 'Shop',
            'services_main_title': 'Expertise',
            'service_1_title': 'Dermatology',
            'service_1_desc': 'Diagnosis and treatment of acne, rosacea. Individual skin health protocols.',
            'service_2_title': 'Anti-Age',
            'service_2_desc': 'Personalized age management strategy. Genetic tests and integrative medicine.',
            'service_3_title': 'Injection',
            'service_3_desc': 'Botulinum therapy, contouring, biorevitalisation. Preservation of natural mimicry.',
            'service_4_title': 'Hardware',
            'service_4_desc': 'SMAS-lifting, phototherapy, laser techniques. High-tech rejuvenation.',
            'footer_title': 'Let\'s start your<br>journey',
            'footer_btn': 'Book <br>Now',
            'footer_socials': 'Socials',
            'footer_location': 'Location',
            'footer_loc_dubai': 'Dubai, UAE',
            'footer_loc_nn': 'Nizhny Novgorod, RU',
            'marquee_text': 'Dr. Xenia Barinova — Anti-Age Therapy — Dermatology — Aesthetic Medicine — Art of Injection — Skin Health — ',
            'modal_title': 'Choose Clinic',
            'loc_nn': 'Nizhny Novgorod (SKIN)',
            'loc_dubai': 'Dubai (Medpalm)'
        },
        'ru': {
            'nav_philosophy': 'Философия',
            'nav_expertise': 'Услуги',
            'nav_visuals': 'Портфолио',
            'book_btn': 'Записаться',
            'hero_title': 'Естественность <br><i>Эстетика</i> <br>Наука',
            'hero_location': 'Дубай и Нижний Новгород',
            'hero_specialty': 'Дерматология и Косметология',
            'about_title': 'О докторе',
            'about_subtitle': 'Ксения Баринова',
            'about_p1': 'Врач-дерматовенеролог и косметолог с интегрированным подходом к красоте. Верю, что внешняя эстетика неразрывно связана с внутренним здоровьем.',
            'about_p2': 'Более 10 лет опыта в инъекционной и аппаратной косметологии. Основатель клиники Skin NN. Международная практика.',
            'about_link': 'Клиника Skin NN',
            'gallery_title': 'Эстетика <br><i>в деталях</i>',
            'gallery_subtitle': 'Результаты процедур',
            'gallery_item1': 'Атмосфера клиники',
            'gallery_item2': 'Естественность',
            'gallery_item3': 'Процесс',
            'gallery_item4': 'Бутик',
            'services_main_title': 'Методики',
            'service_1_title': 'Дерматология',
            'service_1_desc': 'Диагностика и лечение акне, розацеа. Индивидуальные протоколы оздоровления кожи.',
            'service_2_title': 'Anti-Age',
            'service_2_desc': 'Персонализированная стратегия управления возрастом. Генетические тесты и интегративная медицина.',
            'service_3_title': 'Инъекции',
            'service_3_desc': 'Ботулинотерапия, контурная пластика, биоревитализация. Сохранение естественной мимики.',
            'service_4_title': 'Аппаратная',
            'service_4_desc': 'SMAS-лифтинг, фототерапия, лазерные методики. Высокотехнологичные протоколы омоложения.',
            'footer_title': 'Начните свое<br>преображение',
            'footer_btn': 'Запись',
            'footer_socials': 'Соцсети',
            'footer_location': 'Локация',
            'footer_loc_dubai': 'Дубай, ОАЭ',
            'footer_loc_nn': 'Нижний Новгород, РФ',
            'marquee_text': 'Доктор Ксения Баринова — Anti-Age Терапия — Дерматология — Эстетическая Медицина — Искусство Инъекций — Здоровье Кожи — ',
             'modal_title': 'Выберите локацию',
            'loc_nn': 'Нижний Новгород (SKIN)',
            'loc_dubai': 'Дубай (Medpalm)'
        }
    };

    const langBtn = document.querySelector('.lang-switch');
    const marqueeContent = document.getElementById('marquee-content');
    
    // Check browser language or default to EN
    let currentLang = 'en';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ru' : 'en';
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        // Update simple texts
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key]; 
            }
        });
        
        // Update Marquee
        if (marqueeContent && translations[lang]['marquee_text']) {
            const text = translations[lang]['marquee_text'];
            marqueeContent.innerHTML = text.repeat(4); 
        }
        
        // Update button text
        langBtn.textContent = lang === 'en' ? 'RU / EN' : 'EN / RU';
        document.documentElement.lang = lang;
    }

    // Modal Logic
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close-modal');
    // Select both book buttons
    const bookBtns = document.querySelectorAll('a[href*="taplink"], .btn-circle'); 

    // Override default link behavior for book buttons
    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function openModal() {
        if (!modal) return;
        modal.style.display = 'flex';
        // forced reflow
        modal.offsetHeight; 
        modal.classList.add('active');
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});
