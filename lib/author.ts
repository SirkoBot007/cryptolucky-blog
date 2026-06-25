// lib/author.ts — FUENTE ÚNICA DE VERDAD del autor/marca de CryptoLucky.
// Datos 100% REALES y verificables (cuenta BetFury de Sirko007). NO inventar cifras.
// Si un dato cambia, se edita SOLO aquí y se propaga a toda la web (E-E-A-T consistente).

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';

export const AUTHOR = {
  alias: 'Sirko007',
  // Identidad pública elegida por el CEO: alias + avatar (NO nombre real).
  jobTitleEs: 'Autor y revisor editorial de CryptoLucky',
  jobTitleEn: 'CryptoLucky author and editorial reviewer',

  // Contacto público de marca (email dedicado del dominio). El admin/notificaciones
  // internas usan ADMIN_NOTIFICATION_EMAIL (gmail), que es independiente de este.
  email: 'contacto@cryptoluckyguia.com',

  // Perfiles para sameAs (señal de entidad). Rellenar X con la URL exacta.
  githubUrl: 'https://github.com/SirkoBot007',
  xUrl: 'https://x.com/sirko007', // Perfil X de Sirko007 — señal sameAs / entidad E-E-A-T.

  // Avatar real (subir el avatar de BetFury a /public). Si falta, no se rompe nada.
  avatar: '/images/autores/sirko007-avatar.png',

  // Afiliado oficial BetFury.
  affiliateCode: 'LUCKYSIRKO007',
  affiliateUrl: 'https://betfury.io/?r=LUCKYSIRKO007',

  // Datos REALES del perfil público de BetFury (capturas verificadas 2026-06).
  betfury: {
    antiguedadEs: '5 años y 10 meses',
    antiguedadEn: '5 years and 10 months',
    rank: 7,
    totalApostadoUsd: 213214, // USD
    apuestasTotales: 2983031,
    juegosTop: ['Space Dice', 'Dice', 'Crash', 'Candy Jar Clusters'],
    mensajesChat: 9027,
    likes: 4690,
    // Victoria documentada públicamente en X (~hace 2 años).
    victoriaDocumentada: '+5,88 BNB',
  },
} as const;

// Helper de formato de números (es-ES: punto de millar).
export const fmt = (n: number) => n.toLocaleString('es-ES');

// Entidad Person reutilizable (mismo @id en toda la web).
export function personSchema(locale: string) {
  const b = AUTHOR.betfury;
  const isEs = locale === 'es';
  const sameAs = [AUTHOR.xUrl, AUTHOR.githubUrl].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/autor/sirko007#person`,
    name: AUTHOR.alias,
    alternateName: AUTHOR.alias,
    url: `${SITE_URL}/${locale}/autor/sirko007`,
    image: `${SITE_URL}${AUTHOR.avatar}`,
    email: `mailto:${AUTHOR.email}`,
    jobTitle: isEs ? AUTHOR.jobTitleEs : AUTHOR.jobTitleEn,
    description: isEs
      ? `Autor de CryptoLucky con experiencia práctica verificable en BetFury: cuenta de ${b.antiguedadEs}, Rank ${b.rank}, ${fmt(b.apuestasTotales)} apuestas y ${fmt(b.totalApostadoUsd)} USD apostados históricamente. Juegos más jugados: ${b.juegosTop.join(', ')}.`
      : `CryptoLucky author with verifiable hands-on BetFury experience: ${b.antiguedadEn} account, Rank ${b.rank}, ${fmt(b.apuestasTotales)} bets and ${fmt(b.totalApostadoUsd)} USD wagered historically. Most played games: ${b.juegosTop.join(', ')}.`,
    sameAs: sameAs.length ? sameAs : undefined,
    knowsAbout: [
      'BetFury',
      'casino cripto',
      'juego con criptomonedas',
      'Space Dice',
      'Dice',
      'Crash',
      'Candy Jar Clusters',
      'staking BFG',
      'bonos y promociones de casino cripto',
    ],
    mainEntityOfPage: `${SITE_URL}/${locale}/autor/sirko007`,
  };
}

// Entidad Organization reutilizable (mismo @id en toda la web).
export function organizationSchema(locale: string) {
  const isEs = locale === 'es';
  const sameAs = [AUTHOR.xUrl, AUTHOR.githubUrl].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'CryptoLucky',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/CryptoLucky.png`,
    email: `mailto:${AUTHOR.email}`,
    description: isEs
      ? 'CryptoLucky es un sitio editorial en español sobre BetFury y juego con criptomonedas para LATAM, con contenidos basados en experiencia real de uso, revisión editorial y disclosures de afiliado visibles.'
      : 'CryptoLucky is a Spanish editorial site about BetFury and crypto gambling for LATAM, with content based on real hands-on experience, editorial review and visible affiliate disclosures.',
    publishingPrinciples: `${SITE_URL}/${locale}/sobre-nosotros`,
    founder: { '@id': `${SITE_URL}/autor/sirko007#person` },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}
