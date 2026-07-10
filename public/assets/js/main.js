document.addEventListener("DOMContentLoaded", () => {
  const config = window.SCHOOL_CONFIG;
  const isSubPage = window.location.pathname.includes("/pages/");
  const homePath = isSubPage ? "../index.html" : "index.html";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let programSwiper = null;

  const translations = {
    fr: {
      a11y: { skipToContent: "Aller au contenu principal", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
      nav: { home: "Accueil", about: "A propos", strengths: "Atouts", programs: "Sections", schedule: "Horaires", gallery: "Galerie", contact: "Contact", language: "Langue" },
      hero: { eyebrow: "Oeuvre de la Congregation", title: "Ecole Monseigneur Bernard Bududira", text: "Une institution de l'Institut Famille des Disciples du Christ, avec la Section Maternelle, l'ECOFO et le Lycee Technique Monseigneur Bernard Bududira.", secondary: "Voir nos sections", third: "Visiter la galerie", badge: "Grandir avec foi et confiance", points: ["Section Maternelle", "ECOFO", "Lycee Technique"], cards: ["Education humaine et chretienne", "Parcours de la maternelle au lycee", "Suivi des familles"] },
      about: { eyebrow: "A propos", title: "Une oeuvre educative de la Congregation.", text: "L'Ecole Monseigneur Bernard Bududira est une oeuvre de l'Institut Famille des Disciples du Christ. Elle accompagne les enfants et les jeunes de la maternelle a l'ECOFO puis au Lycee Technique.", cardTitle: "Une ecole proche des familles", cardText: "Education, suivi et confiance au quotidien.", features: [ { title: "Section Maternelle", text: "Eveil, langage et premiers apprentissages." }, { title: "ECOFO", text: "Enseignement fondamental et bases solides." }, { title: "Lycee Technique", text: "Competences techniques et preparation a l'avenir." } ] },
      strengths: { eyebrow: "Nos atouts", title: "Une organisation pensee pour la progression.", text: "Nous combinons accompagnement, exigence, outils modernes et cadre stable pour aider chaque eleve a progresser.", metric: "piliers pour apprendre avec confiance", cards: [ { title: "Suivi individuel", text: "Chaque eleve est accompagne avec attention selon son rythme et ses difficultes." }, { title: "Exigence scolaire", text: "Des objectifs clairs, des evaluations regulieres et une vraie culture de l'effort." }, { title: "Outils modernes", text: "Une pedagogie ouverte aux sciences, au numerique et aux projets pratiques." }, { title: "Cadre rassurant", text: "Discipline, respect et securite pour apprendre dans un environnement stable." } ] },
      programs: { eyebrow: "Sections", title: "Les trois sections de l'Ecole Monseigneur Bernard Bududira.", items: [ { icon: "bi-backpack", level: "Maternelle", title: "Section Maternelle", text: "Un cadre d'eveil pour developper le langage, la socialisation, la curiosite et les premiers apprentissages.", details: ["Petite section", "Moyenne section", "Grande section"] }, { icon: "bi-book-half", level: "ECOFO", title: "Ecole Fondamentale", text: "Un parcours fondamental pour construire les bases scolaires, humaines et spirituelles des eleves.", details: ["Lecture et calcul", "Suivi regulier", "Formation humaine"] }, { icon: "bi-tools", level: "Lycee Technique", title: "Lycee Technique Monseigneur Bernard Bududira", text: "Une formation technique orientee vers les competences pratiques, la responsabilite et la preparation professionnelle.", details: ["Competences techniques", "Discipline", "Preparation a l'avenir"] } ] },
      method: { eyebrow: "Projet educatif", title: "Grandir dans la foi, la discipline et le savoir-faire.", text: "A l'Ecole Monseigneur Bernard Bududira, chaque enfant est accueilli selon son age, son rythme et sa section, puis accompagne vers l'autonomie, le service et la competence.", summary: ["sections accompagnees", "meme mission educative", "presence aupres des familles"], pillars: ["Education chretienne et humaine", "Bases solides de la maternelle a l'ECOFO", "Competences pratiques au Lycee Technique"], steps: [ { title: "Accueillir et connaitre l'enfant", text: "L'ecole commence par comprendre l'eleve, sa famille, son niveau et ses besoins afin de l'integrer dans un cadre rassurant." }, { title: "Former selon chaque section", text: "La Maternelle eveille, l'ECOFO construit les bases, et le Lycee Technique developpe des competences utiles pour la vie et le travail." }, { title: "Accompagner la personne entiere", text: "Les apprentissages vont avec la discipline, la foi, le respect, le dialogue et l'attention portee aux difficultes de chaque eleve." }, { title: "Preparer l'avenir", text: "L'ecole aide les jeunes a devenir responsables, capables de servir, de poursuivre leur formation et de mettre leurs talents au travail." } ] },
      learning: { eyebrow: "Parcours academique", title: "Un parcours structure de la maternelle au lycee technique.", cards: [ { title: "Sciences et mathematiques", text: "Raisonnement, experimentation, resolution de problemes et preparation aux examens scientifiques." }, { title: "Langues", text: "Expression orale, lecture, redaction et ouverture aux cultures." }, { title: "Sciences humaines", text: "Histoire, geographie, citoyennete et comprehension du monde." }, { title: "Numerique", text: "Informatique, recherche, projets et usage responsable des outils digitaux." } ] },
      life: { eyebrow: "Vie scolaire", title: "Une ecole vivante au-dela des cours.", text: "Les activites permettent aux eleves de decouvrir leurs talents, de gagner en confiance et d'apprendre a travailler avec les autres.", items: ["Arts et expression", "Sport et bien-etre", "Clubs scientifiques", "Leadership et service"] },
      support: { eyebrow: "Accompagnement", title: "Un suivi qui regarde l'eleve dans sa globalite.", cards: [ { title: "Bien-etre", text: "Ecoute, prevention, discipline positive et climat scolaire rassurant." }, { title: "Suivi des resultats", text: "Evaluation continue, bilans, conseils et communication avec les familles." }, { title: "Orientation", text: "Aide au choix des filieres, preparation des projets d'etudes et de carriere." } ] },
      leadership: { eyebrow: "Direction et administration", title: "Une equipe presente pour accompagner l'ecole.", text: "La direction, l'encadrement et l'administration travaillent ensemble pour accueillir les familles, organiser la vie scolaire et suivre chaque section avec attention.", cards: [ { title: "Direction generale", text: "La Soeur Directrice porte la mission educative et spirituelle de l'etablissement." }, { title: "Encadrement des eleves", text: "L'equipe d'encadrement veille au climat scolaire, a la discipline et au suivi quotidien." }, { title: "Administration scolaire", text: "Secretariat, internat et prefecture des etudes assurent l'organisation des dossiers et des parcours." } ] },
      kindergarten: { eyebrow: "Section Maternelle", title: "Un depart doux, structure et rassurant.", text: "La maternelle accueille les plus jeunes dans un cadre adapte a leur age, avec des activites d'eveil, de langage, de motricite et de socialisation." },
      refectory: { eyebrow: "Refectoire", title: "Un temps de repas organise et convivial.", text: "Le refectoire participe a la vie scolaire: les eleves apprennent l'ordre, le respect, le partage et les bonnes habitudes dans un cadre encadre." },
      schedule: { eyebrow: "Horaires, internat et encadrement", title: "Une organisation claire pour la vie scolaire.", text: "Les journees sont structurees autour de l'etude, des cours, de la formation spirituelle, de l'internat et d'un encadrement pedagogique solide.", teacherTitle: "Enseignants", teacher: "Des enseignants qualifies et experimentes assurent les apprentissages.", week: { label: "Rythme hebdomadaire", title: "Du lundi au samedi", study: "Etude obligatoire", classes: "Cours" }, sunday: { label: "Formation spirituelle", title: "Le dimanche", text: "Culte et etude obligatoires" }, boarding: { label: "Vie en internat", title: "Internat", text: "Internat reserve aux filles." }, kindergarten: { label: "Premiers apprentissages", title: "Ecole maternelle", text: "Une section maternelle est disponible pour les plus jeunes." } },
      gallery: { eyebrow: "Galerie", title: "La vie de l'ecole en images." },
      contact: { eyebrow: "Contact", title: "Contactez l'administration de l'ecole.", text: "Contactez l'administration pour obtenir les informations sur les horaires, l'internat et la vie scolaire.", button: "Ecrire a l'ecole" },
      footer: { text: "Une oeuvre educative de l'Institut Famille des Disciples du Christ, au service de la formation des enfants et des jeunes.", newsletterTitle: "Recevoir nos nouvelles", newsletterText: "Recevez les informations importantes de l'ecole, les horaires et les nouvelles de la vie scolaire.", subscribe: "S'abonner", helpTitle: "Aide et services", howWork: "Horaires et internat", faqs: "Questions frequentes", exploreTitle: "A explorer", possibilitiesTitle: "Autres possibilites", appStore: "App Store", googlePlay: "Google Play", linksTitle: "Navigation", contactTitle: "Contact", hoursTitle: "Horaires", hours1: "Lundi - Vendredi", hours2: "7h30 - 16h30", hours3: "Samedi sur rendez-vous", bottom: "Tous droits reserves." },
      values: ["Foi", "Discipline", "Excellence", "Service"]
    },
    en: {
      a11y: { skipToContent: "Skip to main content", openMenu: "Open menu", closeMenu: "Close menu" },
      nav: { home: "Home", about: "About", strengths: "Strengths", programs: "Sections", schedule: "Schedule", gallery: "Gallery", contact: "Contact", language: "Language" },
      hero: { eyebrow: "Work of the Congregation", title: "Ecole Monseigneur Bernard Bududira", text: "An institution of Institut Famille des Disciples du Christ, with Kindergarten, ECOFO and Lycee Technique Monseigneur Bernard Bududira.", secondary: "View sections", third: "Visit gallery", badge: "Growing with faith and confidence", points: ["Kindergarten", "ECOFO", "Technical Lycee"], cards: ["Human and Christian education", "From kindergarten to technical lycee", "Family support"] },
      about: { eyebrow: "About", title: "An educational work of the Congregation.", text: "Ecole Monseigneur Bernard Bududira is a work of Institut Famille des Disciples du Christ. It supports children and young people from Kindergarten to ECOFO and the Technical Lycee.", cardTitle: "A school close to families", cardText: "Education, follow-up and trust every day.", features: [ { title: "Kindergarten", text: "Awakening, language and first learning steps." }, { title: "ECOFO", text: "Fundamental education and solid foundations." }, { title: "Technical Lycee", text: "Technical skills and preparation for the future." } ] },
      strengths: { eyebrow: "Strengths", title: "A structure designed for progress.", text: "We combine guidance, high standards, modern tools and a stable environment to help every learner progress.", metric: "pillars for confident learning", cards: [ { title: "Individual support", text: "Every student is guided with care according to their pace and needs." }, { title: "Academic standards", text: "Clear goals, regular assessments and a strong culture of effort." }, { title: "Modern tools", text: "Teaching open to science, digital learning and practical projects." }, { title: "Safe environment", text: "Discipline, respect and security for stable learning." } ] },
      programs: { eyebrow: "Sections", title: "The three sections of Ecole Monseigneur Bernard Bududira.", items: [ { icon: "bi-backpack", level: "Kindergarten", title: "Kindergarten Section", text: "An early-learning environment for language, socialization, curiosity and first learning steps.", details: ["Small section", "Middle section", "Large section"] }, { icon: "bi-book-half", level: "ECOFO", title: "Fundamental School", text: "A foundational path to build students academic, human and spiritual bases.", details: ["Reading and numeracy", "Regular follow-up", "Human formation"] }, { icon: "bi-tools", level: "Technical Lycee", title: "Lycee Technique Monseigneur Bernard Bududira", text: "Technical training focused on practical skills, responsibility and professional preparation.", details: ["Technical skills", "Discipline", "Future preparation"] } ] },
      method: { eyebrow: "Educational project", title: "Growing in faith, discipline and practical skill.", text: "At Ecole Monseigneur Bernard Bududira, every child is welcomed according to age, pace and section, then guided toward autonomy, service and competence.", summary: ["supported sections", "one educational mission", "presence with families"], pillars: ["Christian and human education", "Solid foundations from Kindergarten to ECOFO", "Practical skills in the Technical Lycee"], steps: [ { title: "Welcome and know the child", text: "The school begins by understanding the student, family, level and needs so each child enters a reassuring environment." }, { title: "Teach according to each section", text: "Kindergarten awakens, ECOFO builds foundations, and the Technical Lycee develops useful skills for life and work." }, { title: "Support the whole person", text: "Learning is joined with discipline, faith, respect, dialogue and attention to each student's difficulties." }, { title: "Prepare the future", text: "The school helps young people become responsible, ready to serve, continue learning and put their talents to work." } ] },
      learning: { eyebrow: "Academic pathway", title: "A structured pathway from kindergarten to technical lycee.", cards: [ { title: "Science and mathematics", text: "Reasoning, experimentation, problem solving and preparation for science exams." }, { title: "Languages", text: "Speaking, reading, writing and openness to cultures." }, { title: "Humanities", text: "History, geography, citizenship and understanding the world." }, { title: "Digital learning", text: "Computing, research, projects and responsible use of digital tools." } ] },
      life: { eyebrow: "Student life", title: "A lively school beyond the classroom.", text: "Activities help students discover their talents, gain confidence and learn to work with others.", items: ["Arts and expression", "Sports and wellbeing", "Science clubs", "Leadership and service"] },
      support: { eyebrow: "Student support", title: "Support that sees the whole student.", cards: [ { title: "Wellbeing", text: "Listening, prevention, positive discipline and a reassuring school climate." }, { title: "Progress tracking", text: "Continuous assessment, reports, guidance and communication with families." }, { title: "Guidance", text: "Support with pathways, study projects and future career choices." } ] },
      leadership: { eyebrow: "Leadership and administration", title: "A present team supporting the school.", text: "Leadership, supervision and administration work together to welcome families, organize school life and support each section with care.", cards: [ { title: "School leadership", text: "The Sister Director carries the educational and spiritual mission of the school." }, { title: "Student supervision", text: "The supervision team cares for school climate, discipline and daily follow-up." }, { title: "School administration", text: "Secretariat, boarding leadership and studies coordination organize files and pathways." } ] },
      kindergarten: { eyebrow: "Kindergarten Section", title: "A gentle, structured and reassuring start.", text: "Kindergarten welcomes the youngest children in an age-appropriate environment with activities for early learning, language, movement and socialization." },
      refectory: { eyebrow: "Dining hall", title: "An organized and friendly meal time.", text: "The dining hall is part of school life: students learn order, respect, sharing and good habits in a supervised setting." },
      schedule: { eyebrow: "Schedule, boarding and support", title: "A clear structure for school life.", text: "Days are structured around study, classes, spiritual formation, boarding life and strong academic support.", teacherTitle: "Teachers", teacher: "Qualified and experienced teachers guide learning.", week: { label: "Weekly rhythm", title: "Monday to Saturday", study: "Mandatory study", classes: "Classes" }, sunday: { label: "Spiritual formation", title: "Sunday", text: "Mandatory worship and study" }, boarding: { label: "Boarding life", title: "Boarding", text: "Boarding is reserved for girls." }, kindergarten: { label: "Early learning", title: "Kindergarten", text: "A kindergarten section is available for younger children." } },
      gallery: { eyebrow: "Gallery", title: "School life in pictures." },
      contact: { eyebrow: "Contact", title: "Contact the school administration.", text: "Contact the administration for information about schedules, boarding and school life.", button: "Email the school" },
      footer: { text: "An educational work of Institut Famille des Disciples du Christ, serving the formation of children and young people.", newsletterTitle: "Sign up for our newsletter", newsletterText: "Get important school news, schedules and student life updates.", subscribe: "Subscribe", helpTitle: "Help and services", howWork: "Schedule and boarding", faqs: "FAQs", exploreTitle: "To explore", possibilitiesTitle: "Other possibilities", appStore: "App Store", googlePlay: "Google Play", linksTitle: "Navigation", contactTitle: "Contact", hoursTitle: "Hours", hours1: "Monday - Friday", hours2: "7:30 AM - 4:30 PM", hours3: "Saturday by appointment", bottom: "All rights reserved." },
      values: ["Faith", "Discipline", "Excellence", "Service"]
    }
  };

  const getValue = (source, path) => path.split(".").reduce((value, part) => value?.[part], source);
  const currentLang = () => localStorage.getItem("schoolLang") || "fr";

  const setConfigText = () => {
    document.querySelectorAll("[data-config]").forEach((element) => {
      const key = element.dataset.config;
      const value = key === "pageTitle" ? `${config.name} | Ecole` : config[key];
      element.textContent = value || "";
    });

    document.querySelectorAll("[data-config-src]").forEach((element) => {
      const key = element.dataset.configSrc;
      if (config[key]) element.src = config[key];
    });
  };

  const renderNav = (lang) => {
    const nav = document.querySelector('[data-render="nav"]');
    if (!nav) return;

    const labels = translations[lang].nav;
    const items = [
      { label: labels.home, target: "#accueil", icon: "bi-house-door" },
      { label: labels.about, target: "#apropos", icon: "bi-info-circle" },
      { label: labels.strengths, target: "#atouts", icon: "bi-stars" },
      { label: labels.programs, target: "#programmes", icon: "bi-journal-bookmark" },
      { label: labels.schedule, target: "#horaires-internat", icon: "bi-clock-history" },
      { label: labels.contact, target: "#contact", icon: "bi-chat-dots" }
    ];

    nav.innerHTML = items.map((item, index) => `
      <li class="nav-item">
        <a class="nav-link nav-link-icon ${index === 0 ? "active" : ""}" href="${isSubPage ? `${homePath}${item.target}` : item.target}">
          <i class="bi ${item.icon}"></i><span>${item.label}</span>
        </a>
      </li>
    `).join("") + `
      <li class="nav-item theme-nav-item">
        <button class="theme-toggle-btn theme-toggle-mobile" type="button" data-theme-toggle aria-label="Changer le theme">
          <i class="bi bi-moon-stars" data-theme-icon></i><span data-theme-label>Dark</span>
        </button>
      </li>
    `;
    window.syncSchoolThemeButtons?.();
  };

  const renderValues = (lang) => {
    const values = document.querySelector('[data-render="values"]');
    if (!values) return;
    values.innerHTML = translations[lang].values.map((value) => `<span class="value-pill"><i class="bi bi-check2-circle"></i>${value}</span>`).join("");
  };

  const initProgramSwiper = () => {
    if (!document.querySelector(".program-swiper") || !window.Swiper) return;
    if (programSwiper) programSwiper.destroy(true, true);

    programSwiper = new Swiper(".program-swiper", {
      slidesPerView: 1.05,
      spaceBetween: 16,
      grabCursor: true,
      watchOverflow: true,
      navigation: { nextEl: "[data-program-next]", prevEl: "[data-program-prev]" },
      pagination: { el: ".program-pagination", clickable: true },
      breakpoints: {
        576: { slidesPerView: 1.35, spaceBetween: 18 },
        768: { slidesPerView: 2, spaceBetween: 18 },
        1200: { slidesPerView: 3, spaceBetween: 20 }
      }
    });
  };

  const renderPrograms = (lang) => {
    const programs = document.querySelector('[data-render="programs"]');
    if (!programs) return;
    const labels = translations[lang].nav;
    const programImages = [
      "public/assets/images/Section Maternelle.jpeg",
      "public/assets/images/eleves rensemblement 2.jpeg",
      "public/assets/images/Fille_avec_des_cahiers.jpg"
    ];
    programs.innerHTML = `
      <div class="swiper program-swiper">
        <div class="swiper-wrapper">
          ${translations[lang].programs.items.map((item, index) => `
            <div class="swiper-slide program-slide">
              <article class="program-card" data-aos="fade-up" data-aos-delay="${index * 60}">
                <img class="program-card-image" src="${programImages[index]}" alt="${item.title}" loading="lazy">
                <div class="program-card-top">
                  <span class="program-icon"><i class="bi ${item.icon}"></i></span>
                  <span class="program-level">${item.level}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
                <ul class="program-detail-list">
                  ${item.details.map((detail) => `<li><i class="bi bi-check2"></i><span>${detail}</span></li>`).join("")}
                </ul>              </article>
            </div>
          `).join("")}
        </div>
        <div class="swiper-pagination program-pagination"></div>
      </div>
    `;
    initProgramSwiper();
  };

  const renderGallery = () => {
    const gallery = document.querySelector('[data-render="gallery"]');
    if (!gallery) return;
    gallery.innerHTML = config.gallery.map((image, index) => `<div class="swiper-slide gallery-slide"><img src="${image}" alt="Photo ${index + 1} de ${config.name}" loading="lazy"></div>`).join("");
  };

  const initGallerySwiper = () => {
    if (!document.querySelector(".gallery-slider") || !window.Swiper) return;

    new Swiper(".gallery-slider", {
      slidesPerView: 1,
      spaceBetween: 18,
      loop: config.gallery.length > 1,
      speed: 700,
      grabCursor: true,
      allowTouchMove: true,
      autoplay: prefersReducedMotion || config.gallery.length <= 1 ? false : {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  };

  const applyTranslations = (lang) => {
    document.documentElement.lang = lang;
    document.title = document.querySelector("[data-admission-form]") ? `${config.name} | Demande d'inscription` : `${config.name} | Ecole`;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = getValue(translations[lang], element.dataset.i18n);
      if (value) element.textContent = value;
    });

    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler) {
      const isOpen = navbarToggler.getAttribute("aria-expanded") === "true";
      navbarToggler.setAttribute("aria-label", isOpen ? translations[lang].a11y.closeMenu : translations[lang].a11y.openMenu);
    }

    renderNav(lang);
    renderValues(lang);
    renderPrograms(lang);
    window.syncSchoolThemeButtons?.();
    setConfigText();


    document.querySelectorAll('[data-lang-current]').forEach((label) => {
      label.textContent = lang === "fr" ? "Francais" : "English";
    });

    document.querySelectorAll('[data-lang-option]').forEach((option) => {
      const isActive = option.dataset.langOption === lang;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };


  const initThemeMode = () => {
    const storedTheme = localStorage.getItem("schoolTheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

    const applyTheme = (theme) => {
      document.body.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      document.querySelectorAll("[data-theme-icon]").forEach((icon) => {
        icon.className = `bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`;
      });
      document.querySelectorAll("[data-theme-label]").forEach((label) => {
        label.textContent = theme === "dark" ? "White" : "Dark";
      });
    };

    applyTheme(initialTheme);
    window.syncSchoolThemeButtons = () => applyTheme(document.body.dataset.theme || initialTheme);

    document.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-theme-toggle]");
      if (!toggle) return;
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("schoolTheme", nextTheme);
      applyTheme(nextTheme);
    });
  };
  const initContactLinks = () => {
    document.querySelectorAll('[data-contact-link="phone"]').forEach((link) => {
      link.href = `tel:${config.phone.replace(/\s/g, "")}`;
    });
    document.querySelectorAll('[data-contact-link="email"]').forEach((link) => {
      link.href = `mailto:${config.email}`;
    });
    document.querySelectorAll('[data-contact-link="whatsapp"]').forEach((link) => {
      const whatsappNumber = (config.whatsappPhone || config.phone).replace(/\D/g, "");
      link.href = `https://wa.me/${whatsappNumber}`;
      link.target = "_blank";
      link.rel = "noopener";
    });
  };

  const initParticles = () => {
    if (prefersReducedMotion || !window.particlesJS) return;
    document.querySelectorAll(".particles-layer[id]").forEach((target) => {
      particlesJS(target.id, {
        particles: {
          number: { value: window.innerWidth < 768 ? 30 : 54, density: { enable: true, value_area: 900 } },
          color: { value: ["#0b6ee8", "#16a34a", "#f5b942"] },
          shape: { type: "circle" },
          opacity: { value: target.classList.contains("particles-layer--soft") ? 0.12 : 0.18, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#0b6ee8", opacity: target.classList.contains("particles-layer--soft") ? 0.07 : 0.08, width: 1 },
          move: { enable: true, speed: 1.1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true }, modes: { grab: { distance: 150, line_linked: { opacity: 0.16 } } } },
        retina_detect: true
      });
    });
  };

  const initGsap = () => {
    if (prefersReducedMotion || !window.gsap) return;

    gsap.set(".hero-title, .hero-text, .section-kicker, .hero-actions", { opacity: 0, y: 22 });
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".section-kicker", { opacity: 1, y: 0, duration: 0.55 })
      .to(".hero-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.28")
      .to(".hero-text", { opacity: 1, y: 0, duration: 0.65 }, "-=0.38")
      .to(".hero-actions", { opacity: 1, y: 0, duration: 0.65 }, "-=0.38")
      .from(".hero-photo-wrap, .admission-photo-card", { opacity: 0, x: 36, duration: 0.8 }, "-=0.65")
      .from(".hero-badge, .admission-note", { opacity: 0, y: 22, scale: 0.96, duration: 0.55 }, "-=0.35");

    gsap.to(".blob", { x: "random(-18, 18)", y: "random(-22, 22)", rotate: "random(-10, 10)", borderRadius: "58% 42% 48% 52% / 48% 62% 38% 52%", duration: "random(5, 8)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.16 });
    gsap.to(".hero-photo, .about-photo, .admission-photo-card img", { scale: 1.025, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });

    document.querySelectorAll(".auth-btn, .program-card, .gallery-slide, .contact-list a, .info-card").forEach((element) => {
      element.addEventListener("mouseenter", () => gsap.to(element, { y: -3, duration: 0.22, ease: "power2.out" }));
      element.addEventListener("mouseleave", () => gsap.to(element, { y: 0, duration: 0.22, ease: "power2.out" }));
    });
  };

  const setDropdownInvalid = (dropdown, invalid) => {
    const toggle = dropdown.querySelector(".form-dropdown-toggle");
    if (!toggle) return;
    toggle.classList.toggle("is-invalid", invalid);
    toggle.setAttribute("aria-invalid", invalid ? "true" : "false");
  };
  const updateSubmitState = (form) => {
    const submitButton = form.querySelector("[data-submit-button]");
    const consent = form.querySelector("[data-consent-check]");
    if (submitButton && consent) submitButton.disabled = !consent.checked;
  };

  const setDropdownValue = (dropdown, value, labelText = value) => {
    const input = dropdown?.querySelector("[data-form-dropdown-input]");
    const label = dropdown?.querySelector("[data-form-dropdown-label]");
    if (input) input.value = value;
    if (label) label.textContent = labelText || "Selectionner";
    dropdown?.querySelectorAll("[data-form-dropdown-option]").forEach((option) => option.classList.toggle("active", option.dataset.formDropdownOption === value && value !== ""));
    if (dropdown) setDropdownInvalid(dropdown, false);
  };

  const updateClassOptions = (form, level) => {
    const classDropdown = form.querySelector("[data-class-dropdown]");
    if (!classDropdown) return;

    setDropdownValue(classDropdown, "", "Selectionner");
    classDropdown.querySelector("[data-class-empty]")?.toggleAttribute("hidden", Boolean(level));
    classDropdown.querySelectorAll("[data-level]").forEach((option) => {
      option.closest("li").hidden = !level || option.dataset.level !== level;
    });
  };

  const resetFormDropdowns = (form) => {
    form.querySelectorAll("[data-form-dropdown]").forEach((dropdown) => {
      const input = dropdown.querySelector("[data-form-dropdown-input]");
      const label = dropdown.querySelector("[data-form-dropdown-label]");
      const firstOption = dropdown.querySelector("[data-form-dropdown-option]");
      const defaultValue = input?.defaultValue || "";

      setDropdownValue(dropdown, defaultValue, defaultValue || (dropdown.dataset.required !== undefined ? "Selectionner" : firstOption?.textContent || "Selectionner"));
    });
  };

  const syncBirthDate = (form) => {
    const day = form.querySelector("[data-birth-day]")?.value.padStart(2, "0");
    const month = form.querySelector("[data-birth-month]")?.value.padStart(2, "0");
    const year = form.querySelector("[data-birth-year]")?.value;
    const target = form.querySelector("[data-birth-date-value]");
    if (target) target.value = day && month && year ? `${year}-${month}-${day}` : "";
  };
  const initAdmissionForm = () => {
    const admissionForm = document.querySelector("[data-admission-form]");
    if (!admissionForm) return;

    const phoneInput = admissionForm.querySelector("[data-phone-input]");
    const phoneFullInput = admissionForm.querySelector("[data-phone-full]");
    const africanCountries = ["dz", "ao", "bj", "bw", "bf", "bi", "cv", "cm", "cf", "td", "km", "cd", "cg", "ci", "dj", "eg", "gq", "er", "sz", "et", "ga", "gm", "gh", "gn", "gw", "ke", "ls", "lr", "ly", "mg", "mw", "ml", "mr", "mu", "ma", "mz", "na", "ne", "ng", "rw", "st", "sn", "sc", "sl", "so", "za", "ss", "sd", "tz", "tg", "tn", "ug", "zm", "zw"];
    const phoneInstance = phoneInput && window.intlTelInput ? window.intlTelInput(phoneInput, {
      initialCountry: "bi",
      onlyCountries: africanCountries,
      separateDialCode: true,
      nationalMode: false
    }) : null;

    const syncPhoneNumber = () => {
      if (!phoneFullInput || !phoneInput) return;
      phoneFullInput.value = phoneInstance ? phoneInstance.getNumber() : phoneInput.value;
    };

    phoneInput?.addEventListener("input", syncPhoneNumber);
    phoneInput?.addEventListener("countrychange", syncPhoneNumber);

    updateSubmitState(admissionForm);
    updateClassOptions(admissionForm, "");

    admissionForm.addEventListener("change", (event) => {
      if (event.target.matches("[data-consent-check]")) updateSubmitState(admissionForm);
      if (event.target.matches("[data-birth-day], [data-birth-month], [data-birth-year]")) syncBirthDate(admissionForm);
    });

    admissionForm.addEventListener("input", (event) => {
      if (event.target.matches("[data-birth-day], [data-birth-month], [data-birth-year]")) syncBirthDate(admissionForm);
    });

    admissionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      syncBirthDate(admissionForm);
      syncPhoneNumber();
      const alert = admissionForm.querySelector("[data-form-alert]");
      const requiredDropdowns = Array.from(admissionForm.querySelectorAll("[data-form-dropdown][data-required]"));
      const missingDropdowns = requiredDropdowns.filter((dropdown) => !dropdown.querySelector("[data-form-dropdown-input]")?.value);

      requiredDropdowns.forEach((dropdown) => setDropdownInvalid(dropdown, missingDropdowns.includes(dropdown)));

      if (!admissionForm.checkValidity() || missingDropdowns.length) {
        admissionForm.classList.add("was-validated");
        alert.hidden = false;
        alert.className = "form-alert is-error";
        alert.textContent = "Veuillez completer les champs obligatoires avant d'envoyer la demande.";
        return;
      }

      admissionForm.reset();
      resetFormDropdowns(admissionForm);
      updateClassOptions(admissionForm, "");
      updateSubmitState(admissionForm);
      admissionForm.classList.remove("was-validated");
      alert.hidden = false;
      alert.className = "form-alert is-success";
      alert.textContent = "Votre demande est prete. La connexion au serveur sera ajoutee plus tard pour l'envoi reel.";
    });
  };

  initThemeMode();
  setConfigText();
  renderGallery();
  applyTranslations(currentLang());
  initContactLinks();
  initParticles();
  initGsap();
  initGallerySwiper();

  if (window.AOS) {
    AOS.init({
      duration: prefersReducedMotion ? 0 : 700,
      easing: "ease-out-cubic",
      once: true,
      disable: prefersReducedMotion
    });
  }

  const navbarCollapse = document.getElementById("mainNavbar");
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarCollapse && navbarToggler) {
    const syncMenuAria = (isOpen) => {
      const labels = translations[currentLang()].a11y;
      navbarToggler.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navbarToggler.setAttribute("aria-label", isOpen ? labels.closeMenu : labels.openMenu);
      document.body.classList.toggle("nav-open", isOpen);
    };

    navbarCollapse.addEventListener("shown.bs.collapse", () => syncMenuAria(true));
    navbarCollapse.addEventListener("hidden.bs.collapse", () => syncMenuAria(false));
  }

  initAdmissionForm();


  document.addEventListener("click", (event) => {

    const formDropdownOption = event.target.closest("[data-form-dropdown-option]");
    if (formDropdownOption) {
      const dropdown = formDropdownOption.closest("[data-form-dropdown]");
      const form = dropdown?.closest("form");
      const input = dropdown?.querySelector("[data-form-dropdown-input]");
      const value = formDropdownOption.dataset.formDropdownOption;

      setDropdownValue(dropdown, value);
      if (form && input?.id === "schoolLevel") updateClassOptions(form, value);
      return;
    }


    const languageOption = event.target.closest("[data-lang-option]");
    if (languageOption) {
      localStorage.setItem("schoolLang", languageOption.dataset.langOption);
      applyTranslations(languageOption.dataset.langOption);
      return;
    }

    const openMenu = document.querySelector(".navbar-collapse.show");

    if (event.target.closest(".navbar .nav-link, .navbar .auth-btn")) {
      if (openMenu) bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
      return;
    }

    if (openMenu && !event.target.closest(".app-navbar")) {
      bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
    }
  });
});




