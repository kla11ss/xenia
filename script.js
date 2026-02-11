document.addEventListener('DOMContentLoaded', () => {
    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
    const hasLenis = typeof window.Lenis !== 'undefined';
    const hasThree = typeof window.THREE !== 'undefined';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasGSAP && hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    const body = document.body;
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuItems = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu-link, .mobile-menu-book') : [];
    const modal = document.getElementById('booking-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBookingButtons = modal ? modal.querySelectorAll('.modal-btn[data-book-city]') : [];
    const cityGalleryImages = document.querySelectorAll('.city-gallery-image');
    const langBtn = document.querySelector('.lang-switch');
    const marqueeContent = document.getElementById('marquee-content');
    const preloader = document.querySelector('.preloader');
    const cityGate = document.getElementById('city-gate');
    const cityButtons = cityGate ? cityGate.querySelectorAll('[data-city-select]') : [];
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterConsent = document.getElementById('newsletter-consent');
    const newsletterFeedback = document.getElementById('newsletter-feedback');
    const smartBookingForm = document.getElementById('smart-booking-form');
    const smartCitySelect = document.getElementById('smart-city');
    const smartGoalSelect = document.getElementById('smart-goal');
    const smartBookLink = document.getElementById('smart-book-link');
    const quizStepCurrent = document.getElementById('quiz-step-current');
    const quizStepTotal = document.getElementById('quiz-step-total');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizPrevBtn = document.getElementById('quiz-prev');
    const quizNextBtn = document.getElementById('quiz-next');
    const quizResultWrap = document.getElementById('quiz-result');
    const quizResultTitle = document.getElementById('quiz-result-title');
    const quizResultText = document.getElementById('quiz-result-text');
    const quizResultSmartLink = document.getElementById('quiz-result-smart-link');
    const quizRestartBtn = document.getElementById('quiz-restart');
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieRejectBtn = document.getElementById('cookie-reject');
    const forcedCity = body.dataset.forceCity === 'dubai' || body.dataset.forceCity === 'nn' ? body.dataset.forceCity : '';
    const isCityEntryPage = body.dataset.cityEntry === 'true';
    const shouldKeepSeoTitle = body.dataset.lockTitle === 'true';

    let lenis = null;
    let currentLang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
    let currentCity = 'nn';
    let cityGateOpen = false;
    let introPlayed = false;
    let splitAnimationRefs = [];
    let newsletterMessageType = '';
    let newsletterMessageKey = '';
    let lastFocusedElement = null;
    const BOOKING_LINKS = {
        nn: 'https://klientiks.ru/app2/SKIN',
        dubai: 'https://medpalm.ae/doctors/kseniya-belyh/'
    };
    const CITY_PREF_KEY = 'drxenia_city_v1';
    const COOKIE_CONSENT_KEY = 'drxenia_cookie_consent_v1';
    const motion = {
        revealY: 42,
        revealDuration: 1.05,
        revealEase: 'expo.out'
    };

    const translations = {
        en: {
            skip_to_content: 'Skip to content',
            city_gate_kicker: 'Choose your location',
            city_gate_title: 'Select your city before entering',
            city_gate_subtitle: 'This helps open the right local version for doctor profile and booking flow.',
            city_gate_dubai: 'Dubai',
            city_gate_nn: 'Nizhny Novgorod',
            city_gate_clinic_dubai: 'Medpalm clinic',
            city_gate_clinic_nn: 'SKIN clinic',
            city_gate_doctor_dubai: 'Dr. Xenia Belykh',
            city_gate_doctor_nn: 'Dr. Xenia Barinova',
            nav_philosophy: 'Philosophy',
            nav_expertise: 'Expertise',
            nav_visuals: 'Visuals',
            book_btn: 'Make an Appointment',
            hero_specialty: 'Dermatology & Cosmetology',
            hero_title: 'Natural<br><i>Aesthetics</i><br>Science',
            hero_location: 'Dubai & Nizhny Novgorod',
            about_title: 'The Doctor',
            about_subtitle: 'Dr. Xenia Barinova',
            about_role: 'Cosmetologist-Dermatologist',
            about_p1: 'Dermatologist and cosmetologist with an integrated approach to beauty. I believe that external aesthetics are inextricably linked with internal health.',
            about_p2: 'Over 10 years of experience in injection and hardware cosmetology. Founder of Skin NN clinic. International practice.',
            about_link: 'More about Skin NN',
            gallery_title: 'Visual <br><i>Stories</i>',
            gallery_subtitle: 'Results & Aesthetics',
            gallery_item1: 'Clinic Atmosphere',
            gallery_item2: 'Natural Skin',
            gallery_item3: 'Process',
            gallery_item4: 'Shop',
            services_main_title: 'Expertise',
            service_1_title: 'Dermatology',
            service_1_desc: 'Diagnosis and treatment of acne, rosacea. Individual skin health protocols.',
            service_2_title: 'Anti-Age',
            service_2_desc: 'Personalized age management strategy. Genetic tests and integrative medicine.',
            service_3_title: 'Injection',
            service_3_desc: 'Botulinum therapy, contouring, biorevitalisation. Preservation of natural mimicry.',
            service_4_title: 'Hardware',
            service_4_desc: 'SMAS-lifting, phototherapy, laser techniques. High-tech rejuvenation.',
            trust_label: 'Trust & Credentials',
            trust_heading: 'Verified expertise and clinical standards',
            trust_card_1_title: 'Medical education',
            trust_card_1_text: '2014 - MD degree; 2015 - internship in dermatovenerology; additional qualification in cosmetology.',
            trust_card_2_title: 'Integrative anti-age approach',
            trust_card_2_text: 'Advanced training in endocrinology and nutrition for age-management protocols.',
            trust_card_3_title: 'Clinical licensing',
            trust_card_3_text: 'Clinic publishes certificates and medical licenses in open access.',
            trust_card_4_title: 'International practice',
            trust_card_4_text: 'More than 10 years in aesthetic medicine and current consulting in Dubai and Nizhny Novgorod.',
            trust_disclaimer: 'Data collected from public profiles of clinics and physician.',
            trust_source_1: 'Source: SKIN NN specialist profile',
            trust_source_2: 'Source: SKIN NN licenses and certificates',
            trust_source_3: 'Source: Medpalm Dubai physician profile',
            quiz_kicker: 'Personal protocol',
            quiz_title: 'Find your treatment route',
            quiz_description: 'Answer 3 short questions and get a recommended focus before booking.',
            quiz_back: 'Back',
            quiz_next: 'Next',
            quiz_show_result: 'Show result',
            quiz_restart: 'Restart',
            quiz_result_label: 'Recommended focus',
            quiz_result_continue: 'Continue in smart booking',
            smart_booking_title: 'Smart booking',
            smart_booking_desc: 'Choose city and visit goal to jump directly to the right booking flow.',
            smart_booking_city: 'City',
            smart_booking_goal: 'Goal',
            smart_city_nn: 'Nizhny Novgorod',
            smart_city_dubai: 'Dubai',
            smart_goal_diagnostics: 'Diagnostics / first consultation',
            smart_goal_antiage: 'Anti-age planning',
            smart_goal_injection: 'Injection treatment',
            smart_goal_hardware: 'Hardware procedure',
            smart_booking_action: 'Continue to booking',
            smart_booking_note: 'You will continue to booking in the selected city.',
            floating_book: 'Book in 1 click',
            floating_chat: 'Telegram',
            footer_title: "Let's start your<br>journey",
            footer_socials: 'Socials',
            footer_location: 'Location',
            footer_loc_dubai: 'Dubai, UAE',
            footer_loc_nn: 'Nizhny Novgorod, RU',
            footer_policy: 'Privacy Policy',
            instagram_disclaimer: '* Instagram belongs to Meta, recognized as extremist and banned in Russia.',
            newsletter_kicker: 'Special offers',
            newsletter_title: 'Get updates about promos by email',
            newsletter_text: 'Leave your email and we will notify you about new offers and appointment windows.',
            newsletter_email_label: 'Email',
            newsletter_email_placeholder: 'name@example.com',
            newsletter_consent_text: 'By sharing your data, you agree to the ',
            privacy_policy_link: 'privacy policy',
            newsletter_submit: 'Subscribe',
            newsletter_success: 'Thanks! You are subscribed to updates.',
            newsletter_error_email: 'Please enter a valid email address.',
            newsletter_error_consent: 'Please confirm your consent to the privacy policy.',
            cookie_text: 'We use cookies for stable site operation, and enable analytics cookies only with your consent.',
            cookie_accept: 'Accept all',
            cookie_reject: 'Only necessary',
            cookie_more: 'Read policy',
            modal_title: 'Choose Clinic',
            loc_nn: 'Nizhny Novgorod (SKIN)',
            loc_dubai: 'Dubai (Medpalm)',
            marquee_text: 'Dr. Xenia Barinova - Anti-Age Therapy - Dermatology - Aesthetic Medicine - Art of Injection - Skin Health -'
        },
        ru: {
            skip_to_content: 'Перейти к контенту',
            city_gate_kicker: 'Выберите локацию',
            city_gate_title: 'Сначала выберите ваш город',
            city_gate_subtitle: 'Это откроет нужную локальную версию профиля врача и записи.',
            city_gate_dubai: 'Дубай',
            city_gate_nn: 'Нижний Новгород',
            city_gate_clinic_dubai: 'Клиника Medpalm',
            city_gate_clinic_nn: 'Клиника SKIN',
            city_gate_doctor_dubai: 'Ксения Белых',
            city_gate_doctor_nn: 'Ксения Баринова',
            nav_philosophy: 'Философия',
            nav_expertise: 'Экспертиза',
            nav_visuals: 'Визуализация',
            book_btn: 'Записаться',
            hero_specialty: 'Дерматология и косметология',
            hero_title: 'Естественность<br><i>Эстетика</i><br>Наука',
            hero_location: 'Дубай и Нижний Новгород',
            about_title: 'Доктор',
            about_subtitle: 'Ксения Баринова',
            about_role: 'Врач косметолог-дерматолог',
            about_p1: 'Врач-дерматолог и косметолог с интегративным подходом к красоте. Внешняя эстетика неразрывно связана с внутренним здоровьем.',
            about_p2: 'Более 10 лет практики в инъекционной и аппаратной косметологии. Основатель Skin NN. Международная практика.',
            about_link: 'Подробнее о Skin NN',
            gallery_title: 'Визуальные <br><i>истории</i>',
            gallery_subtitle: 'Результаты и эстетика',
            gallery_item1: 'Атмосфера клиники',
            gallery_item2: 'Естественная кожа',
            gallery_item3: 'Процесс',
            gallery_item4: 'Бутик',
            services_main_title: 'Экспертиза',
            service_1_title: 'Дерматология',
            service_1_desc: 'Диагностика и лечение акне, розацеа. Индивидуальные протоколы здоровья кожи.',
            service_2_title: 'Anti-Age',
            service_2_desc: 'Персональная стратегия управления возрастом. Генетические тесты и интегративная медицина.',
            service_3_title: 'Инъекции',
            service_3_desc: 'Ботулинотерапия, контурная пластика, биоревитализация. Сохранение естественной мимики.',
            service_4_title: 'Аппаратные методики',
            service_4_desc: 'SMAS-лифтинг, фототерапия, лазерные техники. Высокотехнологичное омоложение.',
            trust_label: 'Доверие и квалификация',
            trust_heading: 'Подтвержденная экспертиза и клинические стандарты',
            trust_card_1_title: 'Медицинское образование',
            trust_card_1_text: '2014 - диплом врача; 2015 - интернатура по дерматовенерологии; дополнительная квалификация по косметологии.',
            trust_card_2_title: 'Интегративный anti-age подход',
            trust_card_2_text: 'Повышение квалификации по эндокринологии и питанию в age-management протоколах.',
            trust_card_3_title: 'Лицензирование клиники',
            trust_card_3_text: 'Клиника публикует сертификаты и медицинские лицензии в открытом доступе.',
            trust_card_4_title: 'Международная практика',
            trust_card_4_text: 'Более 10 лет в эстетической медицине и текущая практика в Дубае и Нижнем Новгороде.',
            trust_disclaimer: 'Данные собраны из публичных профилей клиник и врача.',
            trust_source_1: 'Источник: профиль специалиста SKIN NN',
            trust_source_2: 'Источник: лицензии и сертификаты SKIN NN',
            trust_source_3: 'Источник: профиль врача Medpalm Dubai',
            quiz_kicker: 'Персональный протокол',
            quiz_title: 'Подберите ваш маршрут процедур',
            quiz_description: 'Ответьте на 3 коротких вопроса и получите рекомендованный фокус перед записью.',
            quiz_back: 'Назад',
            quiz_next: 'Далее',
            quiz_show_result: 'Показать результат',
            quiz_restart: 'Пройти заново',
            quiz_result_label: 'Рекомендуемый фокус',
            quiz_result_continue: 'Продолжить в smart booking',
            smart_booking_title: 'Smart booking',
            smart_booking_desc: 'Выберите город и цель визита, чтобы сразу перейти в нужный сценарий записи.',
            smart_booking_city: 'Город',
            smart_booking_goal: 'Цель',
            smart_city_nn: 'Нижний Новгород',
            smart_city_dubai: 'Дубай',
            smart_goal_diagnostics: 'Диагностика / первичная консультация',
            smart_goal_antiage: 'План anti-age',
            smart_goal_injection: 'Инъекционная процедура',
            smart_goal_hardware: 'Аппаратная процедура',
            smart_booking_action: 'Перейти к записи',
            smart_booking_note: 'Вы перейдете к записи в выбранной локации.',
            floating_book: 'Записаться в 1 клик',
            floating_chat: 'Telegram',
            footer_title: 'Начнем ваш<br>путь',
            footer_socials: 'Соцсети',
            footer_location: 'Локация',
            footer_loc_dubai: 'Дубай, ОАЭ',
            footer_loc_nn: 'Нижний Новгород, РФ',
            footer_policy: 'Политика конфиденциальности',
            instagram_disclaimer: '* Instagram принадлежит Meta, деятельность которой запрещена на территории РФ.',
            newsletter_kicker: 'Спецпредложения',
            newsletter_title: 'Получайте информацию об акциях на почту',
            newsletter_text: 'Оставьте email и мы будем присылать уведомления о новых предложениях и слотах для записи.',
            newsletter_email_label: 'Электронная почта',
            newsletter_email_placeholder: 'name@example.com',
            newsletter_consent_text: 'Оставляя свои данные, вы соглашаетесь с ',
            privacy_policy_link: 'политикой конфиденциальности',
            newsletter_submit: 'Подписаться',
            newsletter_success: 'Спасибо! Вы подписались на рассылку.',
            newsletter_error_email: 'Введите корректный адрес электронной почты.',
            newsletter_error_consent: 'Подтвердите согласие с политикой конфиденциальности.',
            cookie_text: 'Мы используем cookie для стабильной работы сайта и включаем аналитические cookie только с вашего согласия.',
            cookie_accept: 'Принять все',
            cookie_reject: 'Только необходимые',
            cookie_more: 'Подробнее',
            modal_title: 'Выберите клинику',
            loc_nn: 'Нижний Новгород (SKIN)',
            loc_dubai: 'Дубай (Medpalm)',
            marquee_text: 'Dr. Xenia Barinova - Anti-Age терапия - Дерматология - Эстетическая медицина - Искусство инъекций - Здоровье кожи -'
        }
    };

    const quizContent = {
        en: {
            questions: [
                {
                    id: 'goal',
                    text: 'What is your primary goal right now?',
                    options: [
                        { value: 'dermatology', label: 'Improve skin condition and calm inflammation' },
                        { value: 'antiage', label: 'Build a long-term anti-age strategy' },
                        { value: 'injection', label: 'Refresh facial features without surgery' },
                        { value: 'hardware', label: 'Tighten and tone with device-based methods' }
                    ]
                },
                {
                    id: 'timeline',
                    text: 'How fast do you want visible changes?',
                    options: [
                        { value: 'injection', label: 'As soon as possible' },
                        { value: 'hardware', label: 'Within 1-2 months' },
                        { value: 'antiage', label: 'Step-by-step and sustainable' },
                        { value: 'dermatology', label: 'After complete diagnostics' }
                    ]
                },
                {
                    id: 'format',
                    text: 'What format feels closest to you?',
                    options: [
                        { value: 'dermatology', label: 'Medical diagnostics and skin treatment' },
                        { value: 'antiage', label: 'Holistic protocols with labs and nutrition' },
                        { value: 'injection', label: 'Precision injectable treatments' },
                        { value: 'hardware', label: 'High-tech non-invasive procedures' }
                    ]
                }
            ],
            results: {
                dermatology: {
                    title: 'Dermatology focus',
                    text: 'Start from diagnostics and treatment protocol for stable skin quality.'
                },
                antiage: {
                    title: 'Anti-age strategy focus',
                    text: 'Best fit: integrative age-management plan with periodic assessments.'
                },
                injection: {
                    title: 'Injection focus',
                    text: 'Best fit: precise injectable plan with natural facial dynamics.'
                },
                hardware: {
                    title: 'Hardware focus',
                    text: 'Best fit: device-based lifting and tone improvement protocol.'
                }
            }
        },
        ru: {
            questions: [
                {
                    id: 'goal',
                    text: 'Какая главная цель для вас сейчас?',
                    options: [
                        { value: 'dermatology', label: 'Улучшить состояние кожи и снизить воспаление' },
                        { value: 'antiage', label: 'Построить долгосрочную anti-age стратегию' },
                        { value: 'injection', label: 'Освежить черты лица без операции' },
                        { value: 'hardware', label: 'Подтянуть ткани аппаратными методиками' }
                    ]
                },
                {
                    id: 'timeline',
                    text: 'Как быстро вы хотите увидеть заметный результат?',
                    options: [
                        { value: 'injection', label: 'Максимально быстро' },
                        { value: 'hardware', label: 'В течение 1-2 месяцев' },
                        { value: 'antiage', label: 'Постепенно и устойчиво' },
                        { value: 'dermatology', label: 'После полной диагностики' }
                    ]
                },
                {
                    id: 'format',
                    text: 'Какой формат вам ближе?',
                    options: [
                        { value: 'dermatology', label: 'Медицинская диагностика и лечение кожи' },
                        { value: 'antiage', label: 'Интегративные протоколы с анализами и питанием' },
                        { value: 'injection', label: 'Точные инъекционные процедуры' },
                        { value: 'hardware', label: 'Высокотехнологичные неинвазивные процедуры' }
                    ]
                }
            ],
            results: {
                dermatology: {
                    title: 'Фокус: дерматология',
                    text: 'Оптимально начать с диагностики и терапевтического протокола для стабильного качества кожи.'
                },
                antiage: {
                    title: 'Фокус: anti-age стратегия',
                    text: 'Оптимально: интегративный age-management план с регулярными контрольными точками.'
                },
                injection: {
                    title: 'Фокус: инъекционные методики',
                    text: 'Оптимально: точный инъекционный план с сохранением естественной мимики.'
                },
                hardware: {
                    title: 'Фокус: аппаратные процедуры',
                    text: 'Оптимально: курс аппаратных методик для лифтинга и улучшения тонуса тканей.'
                }
            }
        }
    };

    const quizState = {
        step: 0,
        answers: [],
        completed: false,
        resultKey: ''
    };

    function getCityProfile(lang) {
        const isRu = lang === 'ru';
        if (currentCity === 'dubai') {
            return {
                aboutSubtitle: isRu ? 'Ксения Белых' : 'Dr. Xenia Belykh',
                heroLocation: isRu ? 'Дубай, ОАЭ' : 'Dubai, UAE',
                logoHtml: 'Dr. Xenia<br>Belykh',
                preloaderLabel: 'Dr. Xenia Belykh',
                pageTitle: 'Dr. Xenia Belykh | Aesthetic Medicine',
                marqueeText: isRu
                    ? 'Dr. Xenia Belykh - Anti-Age терапия - Дерматология - Эстетическая медицина - Искусство инъекций - Здоровье кожи -'
                    : 'Dr. Xenia Belykh - Anti-Age Therapy - Dermatology - Aesthetic Medicine - Art of Injection - Skin Health -',
                footerCopyright: '© 2026 Dr. Xenia Belykh'
            };
        }

        return {
            aboutSubtitle: isRu ? 'Ксения Баринова' : 'Dr. Xenia Barinova',
            heroLocation: isRu ? 'Нижний Новгород, РФ' : 'Nizhny Novgorod, RU',
            logoHtml: 'Dr. Xenia<br>Barinova',
            preloaderLabel: 'Dr. Xenia Barinova',
            pageTitle: 'Dr. Xenia Barinova | Aesthetic Medicine',
            marqueeText: isRu
                ? 'Dr. Xenia Barinova - Anti-Age терапия - Дерматология - Эстетическая медицина - Искусство инъекций - Здоровье кожи -'
                : 'Dr. Xenia Barinova - Anti-Age Therapy - Dermatology - Aesthetic Medicine - Art of Injection - Skin Health -',
            footerCopyright: '© 2026 Dr. Xenia Barinova'
        };
    }

    function getLocalizedDictionary(lang) {
        const baseDict = translations[lang] || translations.en;
        const cityProfile = getCityProfile(lang);
        return {
            ...baseDict,
            about_subtitle: cityProfile.aboutSubtitle,
            hero_location: cityProfile.heroLocation,
            marquee_text: cityProfile.marqueeText
        };
    }

    function applyCityBranding(lang) {
        const cityProfile = getCityProfile(lang);
        const logos = document.querySelectorAll('.logo');
        logos.forEach((logo) => {
            logo.innerHTML = cityProfile.logoHtml;
        });

        const preloaderLogo = document.querySelector('.preloader-logo');
        if (preloaderLogo) {
            preloaderLogo.textContent = cityProfile.preloaderLabel;
        }

        if (!shouldKeepSeoTitle) {
            document.title = cityProfile.pageTitle;
        }

        const footerCopy = document.querySelector('.footer-copy p');
        if (footerCopy) {
            footerCopy.textContent = cityProfile.footerCopyright;
        }

        if (smartCitySelect) {
            smartCitySelect.value = currentCity;
        }

        syncCityBookingVisibility();
        syncCityGallery();
    }

    function getCurrentDirectoryPath() {
        const path = window.location.pathname || '/';
        if (path.endsWith('/')) {
            return path;
        }

        const lastSegment = path.split('/').pop() || '';
        if (lastSegment && !lastSegment.includes('.')) {
            return `${path}/`;
        }

        const lastSlashIndex = path.lastIndexOf('/');
        return path.slice(0, lastSlashIndex + 1) || '/';
    }

    function getCityPath(city) {
        const normalizedCity = city === 'dubai' ? 'dubai' : 'nn';
        const directoryPath = getCurrentDirectoryPath();
        return `${directoryPath}${normalizedCity}/`;
    }

    function goToCityPage(city, options = {}) {
        const { replace = false } = options;
        const targetPath = getCityPath(city);
        if (replace) {
            window.location.replace(targetPath);
            return;
        }
        window.location.href = targetPath;
    }

    function syncCityBookingVisibility() {
        const activeCity = currentCity === 'dubai' ? 'dubai' : 'nn';

        modalBookingButtons.forEach((button) => {
            const isActiveCity = button.dataset.bookCity === activeCity;
            button.hidden = !isActiveCity;
            button.setAttribute('aria-hidden', isActiveCity ? 'false' : 'true');
            if (isActiveCity) {
                button.removeAttribute('tabindex');
            } else {
                button.setAttribute('tabindex', '-1');
            }
        });

        if (!smartCitySelect) {
            return;
        }

        const cityOptions = smartCitySelect.querySelectorAll('option');
        cityOptions.forEach((option) => {
            const isActiveCity = option.value === activeCity;
            option.hidden = !isActiveCity;
            option.disabled = !isActiveCity;
        });

        smartCitySelect.value = activeCity;
    }

    function syncCityGallery() {
        const activeCity = currentCity === 'dubai' ? 'dubai' : 'nn';
        cityGalleryImages.forEach((image) => {
            const nextSrc = activeCity === 'dubai' ? image.dataset.srcDubai : image.dataset.srcNn;
            const nextAlt = activeCity === 'dubai' ? image.dataset.altDubai : image.dataset.altNn;

            if (nextSrc) {
                image.setAttribute('src', nextSrc);
            }
            if (nextAlt) {
                image.setAttribute('alt', nextAlt);
            }
        });
    }

    function setCitySelection(city, options = {}) {
        const { persist = true, closeGate = false } = options;
        const normalizedCity = city === 'dubai' ? 'dubai' : 'nn';
        currentCity = normalizedCity;

        if (persist) {
            safeStorageSet(CITY_PREF_KEY, normalizedCity);
        }

        if (closeGate && cityGate) {
            cityGateOpen = false;
            body.classList.remove('city-gate-open');
            cityGate.classList.add('is-hidden');
            cityGate.hidden = true;
        }

        updateLanguage(currentLang);

        if (closeGate) {
            resumeLenisIfPossible();
        }
    }

    function initCityGate() {
        if (!cityGate) {
            return;
        }

        if (forcedCity) {
            currentCity = forcedCity;
            cityGateOpen = false;
            cityGate.hidden = true;
            body.classList.remove('city-gate-open');
            safeStorageSet(CITY_PREF_KEY, forcedCity);
            return;
        }

        cityButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const city = button.getAttribute('data-city-select');
                if (isCityEntryPage) {
                    event.preventDefault();
                    event.stopPropagation();
                    const normalizedCity = city === 'dubai' ? 'dubai' : 'nn';
                    currentCity = normalizedCity;
                    safeStorageSet(CITY_PREF_KEY, normalizedCity);
                    const href = button.getAttribute('href');
                    const isLink = button.tagName === 'A' && href;
                    if (isLink) {
                        window.location.assign(href);
                        return;
                    }
                    goToCityPage(normalizedCity);
                    return;
                }
                setCitySelection(city, { persist: true, closeGate: true });
            }, true);
        });

        const savedCity = safeStorageGet(CITY_PREF_KEY);
        if (savedCity === 'dubai' || savedCity === 'nn') {
            currentCity = savedCity;
            if (isCityEntryPage) {
                cityGateOpen = true;
                cityGate.hidden = false;
                body.classList.add('city-gate-open');
                introPlayed = true;

                if (preloader) {
                    preloader.style.display = 'none';
                }

                if (lenis) {
                    lenis.stop();
                }
                return;
            }
            cityGate.hidden = true;
            return;
        }

        if (!isCityEntryPage) {
            currentCity = 'nn';
            cityGate.hidden = true;
            return;
        }

        currentCity = 'nn';
        cityGateOpen = true;
        cityGate.hidden = false;
        body.classList.add('city-gate-open');
        introPlayed = true;

        if (preloader) {
            preloader.style.display = 'none';
        }

        if (lenis) {
            lenis.stop();
        }
    }

    function setLangButtonLabel(lang) {
        if (!langBtn) {
            return;
        }
        if (lang === 'en') {
            langBtn.textContent = 'RU';
            langBtn.setAttribute('aria-label', 'Switch to Russian');
        } else {
            langBtn.textContent = 'EN';
            langBtn.setAttribute('aria-label', 'Переключить на английский');
        }
    }

    function setMarqueeText(text) {
        if (!marqueeContent || !text) {
            return;
        }
        marqueeContent.textContent = `${text} ${text} ${text}`;
    }

    function renderNewsletterFeedback() {
        if (!newsletterFeedback) {
            return;
        }

        if (!newsletterMessageKey) {
            newsletterFeedback.textContent = '';
            newsletterFeedback.classList.remove('is-error');
            return;
        }

        const dict = translations[currentLang] || translations.en;
        newsletterFeedback.textContent = dict[newsletterMessageKey] || '';
        newsletterFeedback.classList.toggle('is-error', newsletterMessageType === 'error');
    }

    function splitTextNode(textNode) {
        const source = textNode.textContent;
        if (!source || !source.trim()) {
            return;
        }

        const fragment = document.createDocumentFragment();
        const chunks = source.split(/(\s+)/);

        chunks.forEach((chunk) => {
            if (!chunk) {
                return;
            }

            if (/^\s+$/.test(chunk)) {
                fragment.appendChild(document.createTextNode(chunk));
                return;
            }

            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';

            Array.from(chunk).forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            });

            fragment.appendChild(wordSpan);
        });

        textNode.replaceWith(fragment);
    }

    function splitElementChars(root) {
        const nodes = Array.from(root.childNodes);
        nodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                splitTextNode(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
                splitElementChars(node);
            }
        });
    }

    function setupSplitHeadings() {
        const headings = document.querySelectorAll('.split-heading');
        headings.forEach((heading) => {
            if (heading.dataset.splitReady === 'true') {
                return;
            }
            splitElementChars(heading);
            heading.dataset.splitReady = 'true';
        });

        if (hasGSAP) {
            const heroChars = document.querySelectorAll('.hero-title .char');
            gsap.set(heroChars, { yPercent: 0 });
        }
    }

    function clearSplitHeadingAnimations() {
        splitAnimationRefs.forEach((ref) => {
            if (ref && typeof ref.kill === 'function') {
                ref.kill();
            }
        });
        splitAnimationRefs = [];
    }

    function initSplitHeadingAnimations() {
        clearSplitHeadingAnimations();

        if (!hasGSAP || !hasScrollTrigger) {
            document.querySelectorAll('.split-heading .char').forEach((char) => {
                char.style.transform = 'translateY(0)';
            });
            return;
        }

        const scrollHeadings = ['.about-heading', '.gallery-heading', '.trust-heading', '.quiz-heading', '.cta-heading', '.newsletter-title'];

        scrollHeadings.forEach((selector) => {
            const heading = document.querySelector(selector);
            if (!heading) {
                return;
            }

            const chars = heading.querySelectorAll('.char');
            if (!chars.length) {
                return;
            }

            gsap.set(chars, { yPercent: 115 });
            const tween = gsap.to(chars, {
                yPercent: 0,
                duration: 0.82,
                ease: 'power3.out',
                stagger: 0.012,
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true
                }
            });

            splitAnimationRefs.push(tween);
            if (tween.scrollTrigger) {
                splitAnimationRefs.push(tween.scrollTrigger);
            }
        });
    }

    function updateLanguage(lang) {
        const dict = getLocalizedDictionary(lang);

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const value = dict[key];

            if (!value) {
                return;
            }

            if (element.dataset.i18nHtml === 'true') {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }

            if (element.classList.contains('split-heading')) {
                element.dataset.splitReady = 'false';
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const key = element.getAttribute('data-i18n-placeholder');
            const value = dict[key];
            if (value) {
                element.setAttribute('placeholder', value);
            }
        });

        setMarqueeText(dict.marquee_text);
        setLangButtonLabel(lang);
        document.documentElement.lang = lang;
        applyCityBranding(lang);
        renderNewsletterFeedback();
        resetQuiz();
        renderQuiz();
        updateSmartBookingLink();

        setupSplitHeadings();
        initSplitHeadingAnimations();

        if (hasScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    function initLenis() {
        if (prefersReducedMotion || !hasLenis) {
            return;
        }

        lenis = new Lenis({
            lerp: 0.085,
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.9
        });

        if (hasScrollTrigger) {
            lenis.on('scroll', ScrollTrigger.update);
        }

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }

    function resumeLenisIfPossible() {
        if (!lenis) {
            return;
        }

        if (
            !body.classList.contains('menu-open') &&
            !body.classList.contains('modal-open') &&
            !body.classList.contains('city-gate-open')
        ) {
            lenis.start();
        }
    }

    function initCursor() {
        const canUseCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        if (!canUseCursor || !cursor || !cursorFollower) {
            return;
        }

        body.classList.add('has-cursor');

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        const renderCursor = () => {
            currentX += (mouseX - currentX) * 0.14;
            currentY += (mouseY - currentY) * 0.14;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
            cursorFollower.style.left = `${currentX}px`;
            cursorFollower.style.top = `${currentY}px`;

            requestAnimationFrame(renderCursor);
        };

        requestAnimationFrame(renderCursor);

        const interactives = document.querySelectorAll('a, button, .service-item, .gallery-item, .btn-book-large');
        interactives.forEach((element) => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    function openMobileMenu() {
        if (!mobileMenu || !burger) {
            return;
        }

        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        burger.classList.add('is-active');
        burger.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');

        if (lenis) {
            lenis.stop();
        }

        if (hasGSAP && mobileMenuItems.length) {
            gsap.fromTo(
                mobileMenuItems,
                { y: 24, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.66,
                    stagger: 0.075,
                    ease: 'power3.out',
                    overwrite: true
                }
            );
        }
    }

    function closeMobileMenu() {
        if (!mobileMenu || !burger) {
            return;
        }

        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');

        if (hasGSAP && mobileMenuItems.length) {
            gsap.set(mobileMenuItems, { clearProps: 'opacity,transform,visibility' });
        }

        resumeLenisIfPossible();
    }

    function initMobileMenu() {
        if (!burger || !mobileMenu) {
            return;
        }

        burger.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                if (mobileMenu.classList.contains('is-open')) {
                    closeMobileMenu();
                }
                if (modal && modal.classList.contains('active')) {
                    closeModal();
                }
            }
        });
    }

    function openModal(event) {
        if (event) {
            event.preventDefault();
        }

        if (!modal) {
            return;
        }

        closeMobileMenu();
        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        body.classList.add('modal-open');

        if (lenis) {
            lenis.stop();
        }

        window.requestAnimationFrame(() => {
            if (closeModalBtn) {
                closeModalBtn.focus();
            }
        });
    }

    function closeModal() {
        if (!modal) {
            return;
        }

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');
        resumeLenisIfPossible();

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    function initModal() {
        if (!modal) {
            return;
        }

        document.querySelectorAll('.js-open-booking').forEach((trigger) => {
            trigger.addEventListener('click', openModal);
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        modal.addEventListener('keydown', (event) => {
            if (event.key !== 'Tab') {
                return;
            }

            const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (!focusable.length) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    function safeStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeStorageSet(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            // Ignore storage issues in private mode.
        }
    }

    function showCookieBanner() {
        if (!cookieBanner) {
            return;
        }

        cookieBanner.hidden = false;
        body.classList.add('cookie-banner-visible');
        requestAnimationFrame(() => {
            cookieBanner.classList.add('is-visible');
        });
    }

    function hideCookieBanner() {
        if (!cookieBanner) {
            return;
        }

        cookieBanner.classList.remove('is-visible');
        body.classList.remove('cookie-banner-visible');
        window.setTimeout(() => {
            cookieBanner.hidden = true;
        }, 420);
    }

    function applyCookieMode(mode) {
        document.documentElement.dataset.cookieConsent = mode;
    }

    function setCookieConsent(mode) {
        safeStorageSet(COOKIE_CONSENT_KEY, mode);
        applyCookieMode(mode);
        hideCookieBanner();
    }

    function initCookieConsent() {
        if (!cookieBanner || !cookieAcceptBtn || !cookieRejectBtn) {
            return;
        }

        const savedMode = safeStorageGet(COOKIE_CONSENT_KEY);
        if (savedMode === 'accepted' || savedMode === 'necessary') {
            applyCookieMode(savedMode);
        } else {
            showCookieBanner();
        }

        cookieAcceptBtn.addEventListener('click', () => {
            setCookieConsent('accepted');
        });

        cookieRejectBtn.addEventListener('click', () => {
            setCookieConsent('necessary');
        });
    }

    function setNewsletterMessage(type, key) {
        newsletterMessageType = type;
        newsletterMessageKey = key;
        renderNewsletterFeedback();
    }

    function initNewsletterForm() {
        if (!newsletterForm || !newsletterEmail || !newsletterConsent) {
            return;
        }

        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!newsletterEmail.value || !newsletterEmail.checkValidity()) {
                setNewsletterMessage('error', 'newsletter_error_email');
                newsletterEmail.focus();
                return;
            }

            if (!newsletterConsent.checked) {
                setNewsletterMessage('error', 'newsletter_error_consent');
                newsletterConsent.focus();
                return;
            }

            setNewsletterMessage('success', 'newsletter_success');
            newsletterForm.reset();
        });
    }

    function updateSmartBookingLink() {
        if (!smartBookLink || !smartCitySelect) {
            return;
        }

        const city = Object.prototype.hasOwnProperty.call(BOOKING_LINKS, smartCitySelect.value) ? smartCitySelect.value : 'nn';
        const goal = smartGoalSelect ? smartGoalSelect.value : 'diagnostics';
        const baseUrl = BOOKING_LINKS[city];
        let finalUrl = baseUrl;

        try {
            const url = new URL(baseUrl);
            url.searchParams.set('goal', goal);
            url.searchParams.set('source', 'drxenia-site');
            finalUrl = url.toString();
        } catch (error) {
            finalUrl = baseUrl;
        }

        smartBookLink.href = finalUrl;
        smartBookLink.dataset.city = city;
        smartBookLink.dataset.goal = goal;
    }

    function initSmartBooking() {
        if (!smartBookingForm || !smartCitySelect || !smartGoalSelect || !smartBookLink) {
            return;
        }

        smartCitySelect.addEventListener('change', updateSmartBookingLink);
        smartGoalSelect.addEventListener('change', updateSmartBookingLink);
        updateSmartBookingLink();
    }

    function resetQuiz() {
        quizState.step = 0;
        quizState.answers = [];
        quizState.completed = false;
        quizState.resultKey = '';
    }

    function getQuizLocale() {
        return quizContent[currentLang] || quizContent.en;
    }

    function getQuizResultKey() {
        const scores = {
            dermatology: 0,
            antiage: 0,
            injection: 0,
            hardware: 0
        };

        quizState.answers.forEach((answer) => {
            if (Object.prototype.hasOwnProperty.call(scores, answer)) {
                scores[answer] += 1;
            }
        });

        return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    }

    function syncSmartBookingFromQuiz(resultKey) {
        if (!smartGoalSelect) {
            return;
        }

        const map = {
            dermatology: 'diagnostics',
            antiage: 'antiage',
            injection: 'injection',
            hardware: 'hardware'
        };

        const goalValue = map[resultKey];
        if (goalValue) {
            smartGoalSelect.value = goalValue;
            updateSmartBookingLink();
        }
    }

    function renderQuiz() {
        if (!quizQuestion || !quizOptions || !quizPrevBtn || !quizNextBtn || !quizResultWrap || !quizResultTitle || !quizResultText) {
            return;
        }

        const locale = getQuizLocale();
        const questions = locale.questions;
        const dict = translations[currentLang] || translations.en;
        const maxStep = Math.max(questions.length - 1, 0);
        quizState.step = Math.min(Math.max(quizState.step, 0), maxStep);

        if (quizStepCurrent) {
            quizStepCurrent.textContent = String(Math.min(quizState.step + 1, questions.length));
        }
        if (quizStepTotal) {
            quizStepTotal.textContent = String(questions.length);
        }

        if (quizState.completed) {
            const result = locale.results[quizState.resultKey] || locale.results.dermatology;
            quizQuestion.textContent = '';
            quizOptions.innerHTML = '';
            quizOptions.setAttribute('aria-label', dict.quiz_title);
            quizPrevBtn.hidden = true;
            quizNextBtn.hidden = true;
            quizResultWrap.hidden = false;
            quizResultTitle.textContent = result.title;
            quizResultText.textContent = result.text;
            return;
        }

        quizResultWrap.hidden = true;
        quizPrevBtn.hidden = false;
        quizNextBtn.hidden = false;

        const currentQuestion = questions[quizState.step];
        quizQuestion.textContent = currentQuestion.text;
        quizOptions.innerHTML = '';
        quizOptions.setAttribute('aria-label', currentQuestion.text);

        currentQuestion.options.forEach((option) => {
            const isSelected = quizState.answers[quizState.step] === option.value;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-option';
            button.setAttribute('role', 'radio');
            button.setAttribute('aria-checked', isSelected ? 'true' : 'false');
            button.textContent = option.label;
            button.addEventListener('click', () => {
                quizState.answers[quizState.step] = option.value;
                renderQuiz();
            });
            quizOptions.appendChild(button);
        });

        quizPrevBtn.disabled = quizState.step === 0;
        quizNextBtn.disabled = !quizState.answers[quizState.step];
        quizNextBtn.textContent = quizState.step === maxStep ? dict.quiz_show_result : dict.quiz_next;
    }

    function initQuiz() {
        if (!quizQuestion || !quizOptions || !quizPrevBtn || !quizNextBtn || !quizRestartBtn) {
            return;
        }

        if (quizResultSmartLink) {
            quizResultSmartLink.addEventListener('click', (event) => {
                event.preventDefault();
                const target = document.querySelector('#smart-booking');
                if (!target) {
                    return;
                }

                if (lenis) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.1 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        quizPrevBtn.addEventListener('click', () => {
            quizState.step = Math.max(quizState.step - 1, 0);
            renderQuiz();
        });

        quizNextBtn.addEventListener('click', () => {
            const locale = getQuizLocale();
            const maxStep = locale.questions.length - 1;

            if (quizState.step >= maxStep) {
                quizState.resultKey = getQuizResultKey();
                quizState.completed = true;
                syncSmartBookingFromQuiz(quizState.resultKey);
                renderQuiz();
                return;
            }

            quizState.step += 1;
            renderQuiz();
        });

        quizRestartBtn.addEventListener('click', () => {
            resetQuiz();
            renderQuiz();
        });

        renderQuiz();
    }

    function initAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            if (anchor.classList.contains('skip-link')) {
                return;
            }

            anchor.addEventListener('click', (event) => {
                const href = anchor.getAttribute('href');

                if (!href || href === '#' || anchor.classList.contains('js-open-booking')) {
                    if (href === '#') {
                        event.preventDefault();
                    }
                    return;
                }

                const target = document.querySelector(href);
                if (!target) {
                    return;
                }

                event.preventDefault();

                if (lenis) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.1 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initMagneticButtons() {
        if (!hasGSAP || window.matchMedia('(hover: none), (pointer: coarse)').matches) {
            return;
        }

        document.querySelectorAll('.magnetic').forEach((element) => {
            element.addEventListener('mousemove', (event) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = event.clientX - centerX;
                const deltaY = event.clientY - centerY;

                gsap.to(element, {
                    x: deltaX * 0.3,
                    y: deltaY * 0.3,
                    duration: 0.3,
                    ease: 'power4.out'
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.75,
                    ease: 'elastic.out(1, 0.42)'
                });
            });
        });
    }

    function initRevealAnimations() {
        if (!hasGSAP || !hasScrollTrigger) {
            document.querySelectorAll('.reveal-up').forEach((element) => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            });
            return;
        }

        gsap.utils.toArray('.reveal-up').forEach((element) => {
            if (element.closest('.hero')) {
                return;
            }
            if (element.classList.contains('gallery-item') || element.classList.contains('service-item')) {
                return;
            }

            gsap.fromTo(
                element,
                {
                    y: motion.revealY,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: motion.revealDuration,
                    ease: motion.revealEase,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 86%',
                        once: true
                    }
                }
            );
        });
    }

    function initSectionStaggers() {
        if (!hasGSAP || !hasScrollTrigger) {
            return;
        }

        const serviceItems = gsap.utils.toArray('.service-item');
        if (serviceItems.length) {
            gsap.fromTo(
                serviceItems,
                {
                    y: 56,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.08,
                    ease: 'expo.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.services-list',
                        start: 'top 80%',
                        once: true
                    }
                }
            );
        }

        const galleryItems = gsap.utils.toArray('.gallery-item');
        if (galleryItems.length) {
            gsap.fromTo(
                galleryItems,
                {
                    y: 52,
                    autoAlpha: 0,
                    scale: 0.97
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.08,
                    ease: 'expo.out',
                    stagger: 0.09,
                    scrollTrigger: {
                        trigger: '.gallery-grid',
                        start: 'top 82%',
                        once: true
                    }
                }
            );
        }
    }

    function initSectionTransitions() {
        if (!hasGSAP || !hasScrollTrigger || prefersReducedMotion) {
            return;
        }

        const sections = gsap.utils.toArray('.story-section');
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                {
                    clipPath: 'inset(14% 0% 0% 0% round 22px)',
                    y: 72,
                    autoAlpha: 0.35
                },
                {
                    clipPath: 'inset(0% 0% 0% 0% round 0px)',
                    y: 0,
                    autoAlpha: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 88%',
                        end: 'top 45%',
                        scrub: 0.6
                    }
                }
            );
        });
    }

    function initImageRevealAnimations() {
        if (!hasGSAP || !hasScrollTrigger) {
            document.querySelectorAll('.img-reveal').forEach((wrapper) => {
                wrapper.style.clipPath = 'inset(0 0 0 0)';
                const image = wrapper.querySelector('img');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
            return;
        }

        gsap.utils.toArray('.img-reveal').forEach((wrapper) => {
            if (wrapper.closest('.hero')) {
                return;
            }

            const image = wrapper.querySelector('img');

            gsap.fromTo(
                wrapper,
                { clipPath: 'inset(100% 0 0 0)' },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top 88%',
                        once: true
                    }
                }
            );

            if (image) {
                gsap.fromTo(
                    image,
                    { scale: 1.2 },
                    {
                        scale: 1,
                        duration: 1.25,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: wrapper,
                            start: 'top 88%',
                            once: true
                        }
                    }
                );
            }
        });
    }

    function initParallax() {
        if (!hasGSAP || !hasScrollTrigger) {
            return;
        }

        const heroImage = document.querySelector('.hero-img-wrapper img');
        const aboutImage = document.querySelector('.about-widget-img img') || document.querySelector('.about-img-wrapper img');

        if (heroImage) {
            gsap.to(heroImage, {
                yPercent: -14,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.2
                }
            });
        }

        if (aboutImage) {
            gsap.to(aboutImage, {
                yPercent: -18,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.3
                }
            });
        }
    }

    function initCtaShader() {
        if (!hasThree) {
            return;
        }

        const shaderContainer = document.querySelector('.cta-shader-bg');
        if (!shaderContainer || shaderContainer.dataset.shaderReady === 'true') {
            return;
        }
        shaderContainer.dataset.shaderReady = 'true';

        const THREE_NS = window.THREE;
        const camera = new THREE_NS.Camera();
        camera.position.z = 1;

        const scene = new THREE_NS.Scene();
        const geometry = new THREE_NS.PlaneGeometry(2, 2);

        const vertexShader = `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;
            uniform vec2 resolution;
            uniform float time;

            float curveLines(vec2 p, float speed, float scale, float thickness) {
                float wave = sin((p.x * scale) + (p.y * 3.8) + time * speed) * 0.5 + 0.5;
                return smoothstep(1.0 - thickness, 1.0, wave);
            }

            void main(void) {
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                vec2 p = uv - 0.5;
                p.x *= resolution.x / resolution.y;

                float r = length(p);
                float ring = smoothstep(0.38, 0.0, r);
                float lineA = curveLines(p, 1.1, 16.0, 0.11);
                float lineB = curveLines(p * 1.35, -1.45, 24.0, 0.10);
                float pulse = smoothstep(0.25, 0.0, abs(sin(time * 0.45) * 0.42 - r));
                float energy = clamp(lineA * 0.75 + lineB * 0.55 + pulse * 0.35, 0.0, 1.0);

                vec3 base = vec3(0.02, 0.03, 0.05);
                vec3 gold = vec3(0.95, 0.72, 0.38);
                vec3 cyan = vec3(0.47, 0.79, 1.0);

                vec3 color = base;
                color += gold * energy * 1.25;
                color += cyan * lineB * 0.42;
                color += gold * ring * 0.24;

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const uniforms = {
            time: { value: 0.0 },
            resolution: { value: new THREE_NS.Vector2() }
        };

        const material = new THREE_NS.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader
        });

        const mesh = new THREE_NS.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE_NS.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x050505, 1);
        shaderContainer.appendChild(renderer.domElement);

        let animationId = 0;

        const renderFrame = () => {
            renderer.render(scene, camera);
        };

        const onResize = () => {
            const width = shaderContainer.clientWidth;
            const height = shaderContainer.clientHeight;
            if (!width || !height) {
                return;
            }
            renderer.setSize(width, height, false);
            uniforms.resolution.value.x = renderer.domElement.width;
            uniforms.resolution.value.y = renderer.domElement.height;
            renderFrame();
        };

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            uniforms.time.value += 0.018;
            renderFrame();
        };

        onResize();
        window.addEventListener('resize', onResize, false);
        if (prefersReducedMotion) {
            uniforms.time.value = 24.0;
            renderFrame();
        } else {
            animate();
        }

        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', onResize, false);

            if (shaderContainer.contains(renderer.domElement)) {
                shaderContainer.removeChild(renderer.domElement);
            }

            renderer.dispose();
            geometry.dispose();
            material.dispose();
        }, { once: true });
    }

    function playIntroAnimation() {
        if (introPlayed) {
            return;
        }

        if (cityGateOpen) {
            return;
        }

        if (!preloader) {
            introPlayed = true;
            return;
        }

        if (!hasGSAP || prefersReducedMotion) {
            preloader.style.display = 'none';
            introPlayed = true;

            document.querySelectorAll('.hero-title .char').forEach((char) => {
                char.style.transform = 'translateY(0)';
            });

            const heroElements = document.querySelectorAll('.hero-tag, .hero-location, .scroll-indicator');
            heroElements.forEach((element) => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            });

            const heroImageWrap = document.querySelector('.hero-img-wrapper');
            const heroImage = document.querySelector('.hero-img-wrapper img');
            if (heroImageWrap) {
                heroImageWrap.style.clipPath = 'inset(0 0 0 0)';
            }
            if (heroImage) {
                heroImage.style.transform = 'scale(1)';
            }

            return;
        }

        const heroChars = document.querySelectorAll('.hero-title .char');
        const heroImageWrap = document.querySelector('.hero-img-wrapper');
        const heroImage = document.querySelector('.hero-img-wrapper img');
        const forceHidePreloader = () => {
            if (!preloader || preloader.style.display === 'none') {
                return;
            }
            preloader.style.display = 'none';
            introPlayed = true;
            if (hasScrollTrigger) {
                ScrollTrigger.refresh();
            }
        };
        const preloaderFailsafeTimer = window.setTimeout(forceHidePreloader, 4200);
        const forceHeroVisible = () => {
            if (hasGSAP) {
                gsap.set(heroChars, { yPercent: 0 });
            } else {
                heroChars.forEach((char) => {
                    char.style.transform = 'translateY(0)';
                });
            }
        };

        gsap.set('.preloader-line span', { animation: 'none' });
        gsap.set('.preloader-logo', { y: 0, autoAlpha: 1 });
        gsap.set(heroChars, { yPercent: 115 });
        window.setTimeout(forceHeroVisible, 2600);

        const introTl = gsap.timeline({
            defaults: { ease: 'expo.out' },
            onComplete: () => {
                window.clearTimeout(preloaderFailsafeTimer);
                preloader.style.display = 'none';
                introPlayed = true;
                if (hasScrollTrigger) {
                    ScrollTrigger.refresh();
                }
            }
        });

        introTl
            .to('.preloader-logo', {
                y: -10,
                autoAlpha: 0.65,
                duration: 0.45
            })
            .to('.preloader-line span', {
                scaleX: 1,
                duration: 0.55,
                transformOrigin: 'left center'
            }, '<')
            .to(
                preloader,
                {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 0.95,
                    ease: 'power4.inOut'
                },
                '+=0.08'
            )
            .fromTo(
                '.hero-tag',
                { y: 22, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.54 },
                '-=0.42'
            )
            .fromTo(
                heroImageWrap,
                { clipPath: 'inset(100% 0 0 0)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.02, ease: 'power4.out' },
                '-=0.5'
            )
            .fromTo(
                heroImage,
                { scale: 1.2 },
                { scale: 1, duration: 1.14, ease: 'power3.out' },
                '<'
            )
            .to(
                heroChars,
                {
                    yPercent: 0,
                    duration: 0.86,
                    stagger: 0.013,
                    ease: 'expo.out'
                },
                '-=0.72'
            )
            .fromTo(
                '.hero-location',
                { y: 18, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.52 },
                '-=0.46'
            )
            .fromTo(
                '.scroll-indicator',
                { y: 18, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.52 },
                '-=0.4'
            );
    }

    function initLanguageSwitcher() {
        setLangButtonLabel(currentLang);

        if (!langBtn) {
            return;
        }

        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ru' : 'en';
            updateLanguage(currentLang);

            if (introPlayed && hasGSAP) {
                gsap.set('.hero-title .char', { yPercent: 0 });
            }
        });
    }

    function initFallbackStates() {
        if (hasGSAP) {
            return;
        }

        document.querySelectorAll('.split-heading .char').forEach((char) => {
            char.style.transform = 'translateY(0)';
        });

        document.querySelectorAll('.hero-tag, .hero-location, .scroll-indicator').forEach((element) => {
            element.style.opacity = '1';
        });
    }

    initLenis();
    initCursor();
    initMobileMenu();
    initModal();
    initNewsletterForm();
    initSmartBooking();
    initCityGate();
    initQuiz();
    initCookieConsent();
    initAnchorScroll();
    initMagneticButtons();
    initRevealAnimations();
    initSectionStaggers();
    initSectionTransitions();
    initImageRevealAnimations();
    initParallax();
    initCtaShader();
    initLanguageSwitcher();

    updateLanguage(currentLang);
    initFallbackStates();

    if (document.readyState === 'complete') {
        playIntroAnimation();
    } else {
        window.addEventListener('load', playIntroAnimation, { once: true });
    }
});
