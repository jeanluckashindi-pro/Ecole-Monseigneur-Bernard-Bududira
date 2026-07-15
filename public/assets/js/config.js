const SCHOOL_ASSET_BASE = (() => {
  const scriptSrc = document.currentScript?.getAttribute("src") || "";
  return scriptSrc.includes("public/assets/") ? "public/assets" : "assets";
})();

const schoolAsset = (path) => `${SCHOOL_ASSET_BASE}/${path}`;

window.SCHOOL_CONFIG = {
  assetBase: SCHOOL_ASSET_BASE,
  name: "Institut Famille des Disciples du Christ",
  shortName: "École Monseigneur Bernard Bududira",
  schoolName: "Oeuvre educative de la Congregation",
  tagline: "Former des eleves curieux, confiants et prets pour demain.",
  eyebrow: "Oeuvre de la Congregation",
  description: "L'Ecole Monseigneur Bernard Bududira accueille les enfants en maternelle, a l'ECOFO et au Lycee Technique dans un cadre encadre et humain.",
  year: "2026",
  primaryAction: "Voir les sections",
  secondaryAction: "Horaires et internat",
  location: "Bujumbura, Burundi",
  phone: "+257 66 25 20 99",
  whatsappPhone: "+257 66 25 20 99",
  email: "contact@ifdc.bi",
  address: "Bujumbura, Burundi",
  heroImage: schoolAsset("images/Hero.jpeg"),
  aboutImage: schoolAsset("images/eleves rensemblement.jpeg"),
  gallery: [
    schoolAsset("images/Directrice avec l'Encadreuse.jpeg"),
    schoolAsset("images/Soeur Directrice.jpeg"),
    schoolAsset("images/Administration Directrice d'Internat et Secretaire, Directrice et Prèfete des Etudes.jpeg"),
    schoolAsset("images/Section Maternelle.jpeg"),
    schoolAsset("images/Refectoire.jpeg"),
    schoolAsset("images/eleves rensemblement.jpeg"),
    schoolAsset("images/eleves rensemblement 2.jpeg"),
    schoolAsset("images/enfant_entrain_d_ecrire.jpg"),
    schoolAsset("images/enfant_bokk.jpg"),
    schoolAsset("images/Fille_avec_cahier.jpg"),
    schoolAsset("images/deux_enfants.jpg")
  ],
  programs: [
    {
      icon: "bi-backpack",
      title: "Maternelle",
      text: "Eveil, socialisation, langage et premiers apprentissages dans un cadre attentif."
    },
    {
      icon: "bi-book-half",
      title: "ECOFO",
      text: "Bases solides, suivi regulier et progression dans l'enseignement fondamental."
    },
    {
      icon: "bi-tools",
      title: "Lycee Technique Monseigneur Bernard Bududira",
      text: "Formation technique, discipline, competences pratiques et preparation a l'avenir."
    }
  ],
  values: ["Foi", "Discipline", "Excellence", "Service"],
  nav: [
    { label: "Accueil", target: "#accueil" },
    { label: "A propos", target: "#apropos" },
    { label: "Sections", target: "#programmes" },
    { label: "Galerie", target: "#galerie" },
    { label: "Contact", target: "#contact" }
  ]
};
