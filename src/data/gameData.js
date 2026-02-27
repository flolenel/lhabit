export const statuts = [
  "Stagiaire moyennement respecté",
  "Stagiaire avec tickets resto",
  "Alternant maltraité",
  "Alternant avec 2 écrans",
  "CDD en période d'essai",
  "CDD validé",
  "Junior ambitieux",
  "Junior avec maitrise en café dégueulasse",
  "Middle  qui fait le boulot du Senior",
  "Senior à 65h/semaine",
  "Senior qui 'délègue'",
  "Senior qui arrive à 10h",
  "Lead sans augmentation",
  "Manager (presque) bienveillant",
  "Director of Things",
  "Head of Vague Stuff",
  "CTO qui envoie des mails à 23h",
  "Chief Disruption Officer",
  "Chief Happiness Officer",
  "Directeur de la Transformation",
  "CEO fatigué",
  "Influenceur réseaux sociaux",
  "Speaker TEDx",
  "Board Member",
  "Retraité heureux 🎉",
];

export const malusPhrases = [
  "Ton N+1 demande un point rapide...",
  "On va devoir te challenger sur ce point...",
  "On compte sur toi pour être davantage force de propal...",
  "Ce n'est pas un problème, c'est une opportunité...",
  "Il faut gagner en transversalité...",
  "Je te fais un feedback constructif...",
  "On va devoir upscaler la solution ensemble...",
  "Le board attend le doss pour lundi 8h...",
  "Il faut qu'on synergise nos efforts...",
  "Tu n'es pas assez agile sur ce point...",
];

export const corporateMessages = [
  "Waouh, quel ownership sur ce sujet !",
  "Tu délivres de la valeur !",
  "Très bonne agilité cognitive !",
  "Tu es force de propal, j'adore !",
  "Beau mindset growth, tu level-up !",
  "Tu scales ton impact, c'est team-oriented !",
  "Parfaite transversalité, le top !",
  "Tu es 1/6eme astucieux, à minima !",
  "Super disruptif, j'en suis impacté !",
  "Tu moves the needle, clairement !",
  "On ressent ton énergie positive, ça rayonne !",
  "Tu es dans une logique de win-win, bravo !",
  "Tu crées de l'engagement 360° !",
  "Belle montée en compétences, tu upskilles !",
  "Quel beau parcours de transformation !",
  "Tu perfuses la culture d'entreprise, merci !",
  "Beau job sur l'excellence opérationnelle !",
  "Tu crées de la disruption positive !",
  "Tu es dans une démarche d'amélioration continue !",
  "Belle orchestration des parties prenantes !",
  "Quel leadership situationnel, impressionnant !",
  "Tu es un vrai catalyseur de synergies !",
  "Très belle maturité sur ce delivrable !",
  "Tu génères de l'adhésion naturellement !",
  "Tu prends de la hauteur tout en restant dans l'action !",
  "Quel focus sur la customer centricity !",
];

// ─── Images bonne réponse ─────────────────────────────────────────────────
export const correctImagesDesktop = [
  "/images/correct-desktop-1.jpg",
  "/images/correct-desktop-2.jpg",
  "/images/correct-desktop-3.jpg",
  "/images/correct-desktop-4.jpg",
  "/images/correct-desktop-5.jpg",
  "/images/correct-desktop-6.jpg",
  "/images/correct-desktop-7.jpg",
];

export const correctImagesMobile = [
  "/images/correct-mobile-1.jpg",
  "/images/correct-mobile-2.jpg",
  "/images/correct-mobile-3.jpg",
  "/images/correct-mobile-4.jpg",
];

// ─── Images mauvaise réponse ──────────────────────────────────────────────
export const wrongImagesDesktop = [
  "/images/wrong-desktop-1.jpg",
  "/images/wrong-desktop-2.jpg",
  "/images/wrong-desktop-3.jpg",
  "/images/wrong-desktop-4.jpg",
];

export const wrongImagesMobile = [
  "/images/wrong-mobile-1.jpg",
  "/images/wrong-mobile-2.jpg",
  "/images/wrong-mobile-3.jpg",
];

/** Sélectionne une image selon le résultat et la taille d'écran */
export function pickBgImage(isCorrect) {
  const isMobile = window.innerWidth < 768;
  const pool = isCorrect
    ? isMobile
      ? correctImagesMobile
      : correctImagesDesktop
    : isMobile
      ? wrongImagesMobile
      : wrongImagesDesktop;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const BONUS_INTERVAL = 3;
