document.addEventListener("DOMContentLoaded", () => {
  const isSubPage = window.location.pathname.includes("/pages/");
  const homePath = isSubPage ? "../index.html" : "index.html";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let programSwiper = null;

  const translations = {
    fr: {
      a11y: { skipToContent: "Aller au contenu principal", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
      nav: { home: "Accueil", about: "A propos", strengths: "Atouts", programs: "Sections", schedule: "Horaires", gallery: "Galerie", contact: "Contact", language: "Langue", groupMain: "Navigation", groupSettings: "Preferences" },
      hero: { eyebrow: "Œuvre éducative de la Congrégation", title: "Ecole Monseigneur Bernard Bududira", text: "Une institution de l'Institut Famille des Disciples du Christ, avec la Section Maternelle, l'ECOFO et le Lycee Technique Monseigneur Bernard Bududira.", secondary: "Voir nos sections", third: "Visiter la galerie", badge: "Grandir avec foi et confiance", points: ["Section Maternelle", "ECOFO", "Lycee Technique"], cards: ["Education humaine et chretienne", "Parcours de la maternelle au lycee", "Suivi des familles"] },
      about: { eyebrow: "A propos", title: "Une ecole qui accompagne chaque enfant.", text: "Notre objectif est de creer un cadre scolaire clair, motivant et humain. Les eleves apprennent a reflechir, collaborer, communiquer et prendre confiance en leurs capacites.", cardTitle: "Un cadre proche des familles", cardText: "Dialogue, suivi et confiance au quotidien.", features: [ { title: "Apprentissage structure", text: "Des objectifs lisibles pour chaque niveau." }, { title: "Presence humaine", text: "Une equipe attentive aux besoins des eleves." }, { title: "Orientation progressive", text: "Des choix scolaires mieux accompagnes." } ] },
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
      contact: { eyebrow: "Contact", title: "Contactez l'administration de l'ecole.", text: "Contactez l'administration pour obtenir les informations sur les horaires, l'internat et la vie scolaire.", button: "Ecrire a l'ecole", formName: "Votre nom", formEmail: "Votre email", formSubject: "Sujet", formMessage: "Votre message", formSubmit: "Envoyer", formSuccess: "Message envoye avec succes. Nous vous repondrons rapidement.", formError: "Erreur lors de l'envoi. Veuillez reessayer." },
      footer: { text: "Une oeuvre educative de l'Institut Famille des Disciples du Christ, au service de la formation des enfants et des jeunes.", newsletterTitle: "Recevoir nos nouvelles", newsletterText: "Recevez les informations importantes de l'ecole, les horaires et les nouvelles de la vie scolaire.", subscribe: "S'abonner", helpTitle: "Aide et services", howWork: "Horaires et internat", faqs: "Questions frequentes", exploreTitle: "A explorer", possibilitiesTitle: "Autres possibilites", appStore: "App Store", googlePlay: "Google Play", linksTitle: "Navigation", contactTitle: "Contact", hoursTitle: "Horaires", hours1: "Lundi - Vendredi", hours2: "7h30 - 16h30", hours3: "Samedi sur rendez-vous", bottom: "Tous droits reserves." },
      values: ["Foi", "Discipline", "Excellence", "Service"],
      admission: { success: "Votre demande d'inscription a ete envoyee avec succes. L'administration vous contactera.", error: "Erreur lors de l'envoi de la demande. Veuillez reessayer." }
    },
    en: {
      a11y: { skipToContent: "Skip to main content", openMenu: "Open menu", closeMenu: "Close menu" },
      nav: { home: "Home", about: "About", strengths: "Strengths", programs: "Sections", schedule: "Schedule", gallery: "Gallery", contact: "Contact", language: "Language", groupMain: "Navigation", groupSettings: "Preferences" },
      hero: { eyebrow: "Work of the Congregation", title: "Ecole Monseigneur Bernard Bududira", text: "An institution of Institut Famille des Disciples du Christ, with Kindergarten, ECOFO and Lycee Technique Monseigneur Bernard Bududira.", secondary: "View sections", third: "Visit gallery", badge: "Growing with faith and confidence", points: ["Kindergarten", "ECOFO", "Technical Lycee"], cards: ["Human and Christian education", "From kindergarten to technical lycee", "Family support"] },
      about: { eyebrow: "About", title: "A school that supports every child.", text: "Our goal is to create a clear, motivating and humane school environment. Students learn to think, collaborate, communicate and build confidence.", cardTitle: "A school close to families", cardText: "Dialogue, follow-up and trust every day.", features: [ { title: "Structured learning", text: "Clear objectives for each level." }, { title: "Human presence", text: "A team attentive to students' needs." }, { title: "Progressive guidance", text: "Better supported academic choices." } ] },
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
      contact: { eyebrow: "Contact", title: "Contact the school administration.", text: "Contact the administration for information about schedules, boarding and school life.", button: "Email the school", formName: "Your name", formEmail: "Your email", formSubject: "Subject", formMessage: "Your message", formSubmit: "Send", formSuccess: "Message sent successfully. We will reply shortly.", formError: "Error sending message. Please try again." },
      footer: { text: "An educational work of Institut Famille des Disciples du Christ, serving the formation of children and young people.", newsletterTitle: "Sign up for our newsletter", newsletterText: "Get important school news, schedules and student life updates.", subscribe: "Subscribe", helpTitle: "Help and services", howWork: "Schedule and boarding", faqs: "FAQs", exploreTitle: "To explore", possibilitiesTitle: "Other possibilities", appStore: "App Store", googlePlay: "Google Play", linksTitle: "Navigation", contactTitle: "Contact", hoursTitle: "Hours", hours1: "Monday - Friday", hours2: "7:30 AM - 4:30 PM", hours3: "Saturday by appointment", bottom: "All rights reserved." },
      values: ["Faith", "Discipline", "Excellence", "Service"],
      admission: { success: "Your enrollment request has been submitted successfully. The administration will contact you.", error: "Error submitting your request. Please try again." }
    }
  };

  const getValue = (source, path) => path.split(".").reduce((value, part) => value?.[part], source);
  const currentLang = () => localStorage.getItem("schoolLang") || "fr";
  const t = () => translations[currentLang()];

  const setConfigText = () => {
    const config = window.SCHOOL_CONFIG || {};
    document.querySelectorAll("[data-config]").forEach((element) => {
      const key = element.dataset.config;
      if (key === "pageTitle") {
        element.textContent = `${config.name || ""} | Ecole`;
      } else {
        element.textContent = config[key] || "";
      }
    });
    document.querySelectorAll("[data-config-src]").forEach((element) => {
      const key = element.dataset.configSrc;
      if (config[key]) element.src = config[key];
    });
    document.querySelectorAll("[data-contact-link]").forEach((link) => {
      const type = link.dataset.contactLink;
      if (type === "phone") link.href = `tel:${(config.phone || "").replace(/\s/g, "")}`;
      if (type === "email") link.href = `mailto:${config.email || ""}`;
      if (type === "whatsapp") {
        const num = (config.whatsappPhone || config.phone || "").replace(/\D/g, "");
        link.href = `https://wa.me/${num}`;
        link.target = "_blank";
        link.rel = "noopener";
      }
    });
  };

  const renderNav = (lang) => {
    const labels = translations[lang]?.nav || translations.fr.nav;
    const items = [
      { label: labels.home, target: "#accueil", icon: "bi-house-door" },
      { label: labels.about, target: "#apropos", icon: "bi-info-circle" },
      { label: labels.strengths, target: "#atouts", icon: "bi-stars" },
      { label: labels.programs, target: "#programmes", icon: "bi-journal-bookmark" },
      { label: labels.schedule, target: "#horaires-internat", icon: "bi-clock-history" },
      { label: labels.contact, target: "#contact", icon: "bi-chat-dots" }
    ];
    const href = (target) => isSubPage ? `${homePath}${target}` : target;
    const desktopNav = document.querySelector('[data-render="nav-desktop"]');
    if (desktopNav) {
      desktopNav.innerHTML = items.map((item, i) => `
        <li class="nav-item">
          <a class="nav-link nav-link-icon ${i === 0 ? "active" : ""}" href="${href(item.target)}">
            <i class="bi ${item.icon}"></i><span>${item.label}</span>
          </a>
        </li>
      `).join("");
    }
    const mobileNav = document.querySelector('[data-render="nav-mobile"]');
    if (mobileNav) {
      mobileNav.innerHTML = items.map((item, i) => `
        <li class="drawer-nav-item">
          <a class="drawer-nav-link ${i === 0 ? "active" : ""}" href="${href(item.target)}" data-drawer-link>
            <span class="drawer-nav-icon"><i class="bi ${item.icon}"></i></span>
            <span class="drawer-nav-label">${item.label}</span>
            <i class="bi bi-chevron-right drawer-nav-arrow"></i>
          </a>
        </li>
      `).join("");
    }
    window.syncSchoolThemeButtons?.();
  };

  const renderValues = (lang) => {
    const values = document.querySelector('[data-render="values"]');
    if (!values) return;
    const list = translations[lang]?.values || translations.fr.values;
    values.innerHTML = list.map((v) => `<span class="value-pill"><i class="bi bi-check2-circle"></i>${v}</span>`).join("");
  };

  const initProgramSwiper = () => {
    if (!document.querySelector(".program-swiper") || !window.Swiper) return;
    if (programSwiper) programSwiper.destroy(true, true);
    programSwiper = new Swiper(".program-swiper", {
      slidesPerView: 1.05, spaceBetween: 16, grabCursor: true, watchOverflow: true,
      navigation: { nextEl: "[data-program-next]", prevEl: "[data-program-prev]" },
      pagination: { el: ".program-pagination", clickable: true },
      breakpoints: { 576: { slidesPerView: 1.35, spaceBetween: 18 }, 768: { slidesPerView: 2, spaceBetween: 18 }, 1200: { slidesPerView: 3, spaceBetween: 20 } }
    });
  };

  const renderPrograms = (lang) => {
    const container = document.querySelector('[data-render="programs"]');
    if (!container) return;
    const config = window.SCHOOL_CONFIG || {};
    const items = config.programs || translations[lang]?.programs?.items || translations.fr.programs.items;
    container.innerHTML = items.map((item, index) => `
      <article class="program-card" data-aos="fade-up" data-aos-delay="${index * 80}">
        <div class="program-card-visual">
          <div class="program-card-body">
            <div class="program-card-head">
              <span class="program-icon"><i class="bi ${item.icon}"></i></span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </div>
      </article>
    `).join("");
  };

  const renderGallery = () => {
    const gallery = document.querySelector('[data-render="gallery"]');
    if (!gallery) return;
    const config = window.SCHOOL_CONFIG || {};
    const images = config.gallery || [];
    gallery.innerHTML = images.map((img, i) =>
      `<div class="swiper-slide gallery-slide"><img src="${img}" alt="Photo ${i + 1}" loading="lazy"></div>`
    ).join("");
  };

  const initGallerySwiper = () => {
    if (!document.querySelector(".gallery-slider") || !window.Swiper) return;
    const config = window.SCHOOL_CONFIG || {};
    const images = config.gallery || [];
    new Swiper(".gallery-slider", {
      slidesPerView: 1, spaceBetween: 18, loop: images.length > 1, speed: 700,
      grabCursor: true, allowTouchMove: true,
      autoplay: prefersReducedMotion || images.length <= 1 ? false : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
    });
  };

  const applyTranslations = (lang) => {
    document.documentElement.lang = lang;
    document.title = document.querySelector("[data-admission-form]")
      ? `${window.SCHOOL_CONFIG?.name || ""} | Demande d'inscription`
      : `${window.SCHOOL_CONFIG?.name || ""} | Ecole`;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = getValue(translations[lang], el.dataset.i18n);
      if (value) el.textContent = value;
    });
    const toggler = document.querySelector(".navbar-toggler");
    if (toggler) {
      const isOpen = toggler.getAttribute("aria-expanded") === "true";
      toggler.setAttribute("aria-label", isOpen ? translations[lang].a11y.closeMenu : translations[lang].a11y.openMenu);
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
    document.querySelectorAll(".auth-btn, .program-card, .gallery-slide, .contact-list a, .info-card").forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(el, { y: -3, duration: 0.22, ease: "power2.out" }));
      el.addEventListener("mouseleave", () => gsap.to(el, { y: 0, duration: 0.22, ease: "power2.out" }));
    });
  };

  const setDropdownInvalid = (dropdown, invalid) => {
    const toggle = dropdown?.querySelector(".form-dropdown-toggle");
    if (!toggle) return;
    toggle.classList.toggle("is-invalid", invalid);
    toggle.setAttribute("aria-invalid", invalid ? "true" : "false");
  };

  const updateSubmitState = (form) => {
    const submitButton = form?.querySelector("[data-submit-button]");
    const consent = form?.querySelector("[data-consent-check]");
    if (submitButton && consent) submitButton.disabled = !consent.checked;
  };

  const setDropdownValue = (dropdown, value, labelText) => {
    const input = dropdown?.querySelector("[data-form-dropdown-input]");
    const label = dropdown?.querySelector("[data-form-dropdown-label]");
    if (input) input.value = value;
    if (label) label.textContent = labelText || value || "Selectionner";
    dropdown?.querySelectorAll("[data-form-dropdown-option]").forEach((o) => o.classList.toggle("active", o.dataset.formDropdownOption === value && value !== ""));
    if (dropdown) setDropdownInvalid(dropdown, false);
  };

  const updateClassOptions = (form, level) => {
    const classDropdown = form?.querySelector("[data-class-dropdown]");
    if (!classDropdown) return;
    setDropdownValue(classDropdown, "", "Selectionner");
    classDropdown.querySelector("[data-class-empty]")?.toggleAttribute("hidden", Boolean(level));
    classDropdown.querySelectorAll("[data-level]").forEach((option) => {
      option.closest("li").hidden = !level || option.dataset.level !== level;
    });
  };

  const resetFormDropdowns = (form) => {
    form?.querySelectorAll("[data-form-dropdown]").forEach((dropdown) => {
      const input = dropdown.querySelector("[data-form-dropdown-input]");
      const label = dropdown.querySelector("[data-form-dropdown-label]");
      const firstOption = dropdown.querySelector("[data-form-dropdown-option]");
      const defaultValue = input?.defaultValue || "";
      setDropdownValue(dropdown, defaultValue, defaultValue || (dropdown.dataset.required !== undefined ? "Selectionner" : firstOption?.textContent || "Selectionner"));
    });
  };

  const syncBirthDate = (form) => {
    const day = form?.querySelector("[data-birth-day]")?.value.padStart(2, "0");
    const month = form?.querySelector("[data-birth-month]")?.value.padStart(2, "0");
    const year = form?.querySelector("[data-birth-year]")?.value;
    const target = form?.querySelector("[data-birth-date-value]");
    if (target) target.value = day && month && year ? `${year}-${month}-${day}` : "";
  };

  const postJSON = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `HTTP ${res.status}`);
    }
    return res.json();
  };

  const initContactForm = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const alert = form.querySelector("[data-form-alert]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      const submitBtn = form.querySelector("[type=submit]");
      submitBtn.disabled = true;
      try {
        await postJSON("/api/messages", {
          name: form.name.value,
          email: form.email.value,
          phone: form.phone?.value || "",
          subject: form.subject.value,
          body: form.message.value
        });
        form.reset();
        form.classList.remove("was-validated");
        alert.hidden = false;
        alert.className = "form-alert is-success";
        alert.textContent = t().contact.formSuccess;
      } catch {
        alert.hidden = false;
        alert.className = "form-alert is-error";
        alert.textContent = t().contact.formError;
      } finally {
        submitBtn.disabled = false;
      }
    });
  };

  const initAdmissionForm = () => {
    const form = document.querySelector("[data-admission-form]");
    if (!form) return;

    const phoneInput = form.querySelector("[data-phone-input]");
    const phoneFullInput = form.querySelector("[data-phone-full]");
    const africanCountries = ["dz","ao","bj","bw","bf","bi","cv","cm","cf","td","km","cd","cg","ci","dj","eg","gq","er","sz","et","ga","gm","gh","gn","gw","ke","ls","lr","ly","mg","mw","ml","mr","mu","ma","mz","na","ne","ng","rw","st","sn","sc","sl","so","za","ss","sd","tz","tg","tn","ug","zm","zw"];
    const phoneInstance = phoneInput && window.intlTelInput ? window.intlTelInput(phoneInput, {
      initialCountry: "bi", onlyCountries: africanCountries, separateDialCode: true, nationalMode: false
    }) : null;

    const syncPhoneNumber = () => {
      if (!phoneFullInput || !phoneInput) return;
      phoneFullInput.value = phoneInstance ? phoneInstance.getNumber() : phoneInput.value;
    };

    phoneInput?.addEventListener("input", syncPhoneNumber);
    phoneInput?.addEventListener("countrychange", syncPhoneNumber);

    updateSubmitState(form);
    updateClassOptions(form, "");

    form.addEventListener("change", (event) => {
      if (event.target.matches("[data-consent-check]")) updateSubmitState(form);
      if (event.target.matches("[data-birth-day], [data-birth-month], [data-birth-year]")) syncBirthDate(form);
    });

    form.addEventListener("input", (event) => {
      if (event.target.matches("[data-birth-day], [data-birth-month], [data-birth-year]")) syncBirthDate(form);
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      syncBirthDate(form);
      syncPhoneNumber();
      const alert = form.querySelector("[data-form-alert]");
      const requiredDropdowns = Array.from(form.querySelectorAll("[data-form-dropdown][data-required]"));
      const missingDropdowns = requiredDropdowns.filter((d) => !d.querySelector("[data-form-dropdown-input]")?.value);
      requiredDropdowns.forEach((d) => setDropdownInvalid(d, missingDropdowns.includes(d)));

      if (!form.checkValidity() || missingDropdowns.length) {
        form.classList.add("was-validated");
        alert.hidden = false;
        alert.className = "form-alert is-error";
        alert.textContent = "Veuillez completer les champs obligatoires avant d'envoyer la demande.";
        return;
      }

      const data = {
        application_type: form.applicationType?.value || "",
        student_status: form.studentStatus?.value || "",
        school_level: form.schoolLevel?.value || "",
        student_first_name: form.studentFirstName?.value || "",
        student_last_name: form.studentLastName?.value || "",
        birth_date: form.birthDate?.value || "",
        gender: form.gender?.value || "",
        requested_class: form.requestedClass?.value || "",
        previous_school: form.previousSchool?.value || "",
        guardian_name: form.guardianName?.value || "",
        relationship: form.relationship?.value || "",
        phone: form.phone?.value || "",
        email: form.email?.value || "",
        address: form.address?.value || "",
        school_year: form.schoolYear?.value || "",
        documents: form.documents?.value || "Bulletin uniquement",
        message: form.message?.value || ""
      };

      const submitBtn = form.querySelector("[data-submit-button]");
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours...";

      try {
        await postJSON("/api/inscriptions", data);
        form.reset();
        resetFormDropdowns(form);
        updateClassOptions(form, "");
        updateSubmitState(form);
        form.classList.remove("was-validated");
        alert.hidden = false;
        alert.className = "form-alert is-success";
        alert.textContent = t().admission.success;
      } catch {
        alert.hidden = false;
        alert.className = "form-alert is-error";
        alert.textContent = t().admission.error;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer la demande";
      }
    });
  };

  const onReady = () => {
    setConfigText();
    renderGallery();
    applyTranslations(currentLang());
    initParticles();
    initGsap();
    initGallerySwiper();
    if (window.AOS) {
      AOS.init({
        duration: prefersReducedMotion ? 0 : 700,
        easing: "ease-out-cubic", once: true, disable: prefersReducedMotion,
        disableMutationObserver: false, offset: 60, anchorPlacement: "top-bottom"
      });
    }
    initAdmissionForm();
    initContactForm();
  };

  initThemeMode();
  initProgramSwiper();

  const drawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("mobileDrawerOverlay");
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("mobileMenuClose");

  const openDrawer = () => {
    if (!drawer) return;
    drawer.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add("is-open");
      drawerOverlay?.classList.add("is-visible");
    });
    document.body.classList.add("drawer-open");
    menuBtn?.setAttribute("aria-expanded", "true");
    closeBtn?.focus();
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawerOverlay?.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
    menuBtn?.setAttribute("aria-expanded", "false");
    drawer.addEventListener("transitionend", () => { drawer.hidden = true; }, { once: true });
    menuBtn?.focus();
  };

  menuBtn?.addEventListener("click", () => {
    drawer?.hidden === false && drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
  });
  closeBtn?.addEventListener("click", closeDrawer);
  drawerOverlay?.addEventListener("click", closeDrawer);

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-drawer-link]")) closeDrawer();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && !drawer.hidden && drawer.classList.contains("is-open")) closeDrawer();
  });

  document.querySelectorAll(".drawer-lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.langOption;
      localStorage.setItem("schoolLang", lang);
      applyTranslations(lang);
      document.querySelectorAll(".drawer-lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.langOption === lang));
    });
  });
  document.querySelectorAll(".drawer-lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.langOption === currentLang()));

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
    }
  });

  if (document.readyState === "complete") {
    onReady();
  } else {
    window.addEventListener("load", onReady);
  }
  document.addEventListener("school:config-ready", onReady);
});
