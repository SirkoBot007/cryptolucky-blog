// FAQs por pilar (money page). ES+EN. Alimentan PillarFaq (acordeón + FAQPage schema).
// Contenido basado en el conocimiento real del blog (no inventar cifras nuevas).
interface FaqItem { q: string; a: string; }
type Bilingual = { es: FaqItem[]; en: FaqItem[] };

export const PILLAR_FAQS: Record<string, Bilingual> = {
  betfury: {
    es: [
      { q: '¿Es seguro y legítimo BetFury?', a: 'Sí. BetFury opera con licencia de Curaçao desde 2019, usa juegos provably fair verificables y procesa retiros en cripto sin bloqueos arbitrarios. Como en todo casino, existe riesgo de pérdida: juega solo con lo que puedas permitirte. +18.' },
      { q: '¿Necesito verificación KYC para jugar en BetFury?', a: 'Para empezar solo necesitas un email. En el uso normal puedes jugar y retirar en cripto sin KYC obligatorio. BetFury puede solicitar verificación en casos puntuales por seguridad o cumplimiento legal.' },
      { q: '¿Qué es el token BFG y cómo funciona el staking?', a: 'Cada apuesta genera tokens BFG. Si los bloqueas en el pool de staking, recibes una parte proporcional de los ingresos diarios de la plataforma, pagada en BTC, ETH, BNB y otras criptomonedas.' },
      { q: '¿Cuánto tardan los retiros en BetFury?', a: 'Al ser cripto, los retiros suelen procesarse en minutos directamente a tu wallet, sin los límites ni esperas de la banca tradicional. Los tiempos finales dependen de la red blockchain elegida.' },
    ],
    en: [
      { q: 'Is BetFury safe and legit?', a: 'Yes. BetFury has operated under a Curaçao license since 2019, uses verifiable provably fair games and processes crypto withdrawals without arbitrary blocks. As with any casino there is risk of loss: only play what you can afford. 18+.' },
      { q: 'Do I need KYC verification to play on BetFury?', a: 'You only need an email to start. In normal use you can play and withdraw in crypto without mandatory KYC. BetFury may request verification in specific cases for security or legal compliance.' },
      { q: 'What is the BFG token and how does staking work?', a: 'Every bet generates BFG tokens. If you lock them in the staking pool, you receive a proportional share of the platform’s daily revenue, paid in BTC, ETH, BNB and other cryptocurrencies.' },
      { q: 'How long do BetFury withdrawals take?', a: 'Being crypto, withdrawals are usually processed in minutes straight to your wallet, without the limits or delays of traditional banking. Final times depend on the chosen blockchain network.' },
    ],
  },
  'casino-cripto': {
    es: [
      { q: '¿Qué es un casino cripto?', a: 'Una plataforma de juego que opera con criptomonedas (BTC, ETH, USDT y otras). Ofrece transacciones rápidas, mayor privacidad y juegos provably fair que puedes verificar matemáticamente.' },
      { q: '¿Son seguros los casinos cripto?', a: 'Los que tienen licencia válida (Curaçao, Malta), historial de pagos sin problemas y auditorías de RNG por terceros son fiables. Verifica siempre la reputación y los términos antes de depositar. +18.' },
      { q: '¿Cuál es el mejor casino cripto en 2026?', a: 'En nuestra experiencia de uso real, BetFury lidera por su sistema de staking BFG (dividendos diarios), su catálogo de +5.000 juegos y sus retiros rápidos sin KYC básico.' },
    ],
    en: [
      { q: 'What is a crypto casino?', a: 'A gaming platform that operates with cryptocurrencies (BTC, ETH, USDT and others). It offers fast transactions, greater privacy and provably fair games you can verify mathematically.' },
      { q: 'Are crypto casinos safe?', a: 'Those with a valid license (Curaçao, Malta), a clean payment history and third-party RNG audits are reliable. Always check reputation and terms before depositing. 18+.' },
      { q: 'What is the best crypto casino in 2026?', a: 'From real hands-on use, BetFury leads thanks to its BFG staking system (daily dividends), its +5,000-game catalogue and its fast withdrawals without basic KYC.' },
    ],
  },
  'bonos-casino': {
    es: [
      { q: '¿Qué bonos ofrece BetFury?', a: 'Un bono de bienvenida de hasta 590%, cashback semanal, free spins, faucet gratuito y Crypto Boxes sin depósito. La disponibilidad puede variar según la promoción vigente.' },
      { q: '¿Cómo reclamo el bono de bienvenida?', a: 'Regístrate con el código LUCKYSIRKO007, verifica tu email y realiza tu primer depósito. El bono se aplica según los términos y condiciones de la promoción en ese momento.' },
      { q: '¿Los bonos tienen requisitos de apuesta?', a: 'Sí. La mayoría de bonos de casino tienen un rollover (requisito de apuesta) antes de poder retirar. Lee siempre las condiciones de cada promoción antes de aceptarla.' },
    ],
    en: [
      { q: 'What bonuses does BetFury offer?', a: 'A welcome bonus of up to 590%, weekly cashback, free spins, a free faucet and no-deposit Crypto Boxes. Availability may vary depending on the current promotion.' },
      { q: 'How do I claim the welcome bonus?', a: 'Sign up with code LUCKYSIRKO007, verify your email and make your first deposit. The bonus applies according to the promotion’s terms and conditions at that time.' },
      { q: 'Do bonuses have wagering requirements?', a: 'Yes. Most casino bonuses have a rollover (wagering requirement) before you can withdraw. Always read the conditions of each promotion before accepting it.' },
    ],
  },
  'apuestas-deportivas': {
    es: [
      { q: '¿Puedo apostar al Mundial 2026 en BetFury?', a: 'Sí. BetFury cubre los 104 partidos del Mundial 2026 con cuotas en tiempo real, apuestas en vivo y pago en criptomonedas, con retiros rápidos.' },
      { q: '¿Qué deportes puedo apostar?', a: 'Más de 30 deportes: fútbol, baloncesto, tenis y eSports (CS2, Dota 2, LoL), con mercados pre-partido y en directo.' },
      { q: '¿Las apuestas deportivas generan tokens BFG?', a: 'Sí. Igual que en el casino, cada apuesta deportiva genera tokens BFG que puedes poner en staking para recibir dividendos diarios.' },
    ],
    en: [
      { q: 'Can I bet on the 2026 World Cup at BetFury?', a: 'Yes. BetFury covers all 104 matches of the 2026 World Cup with real-time odds, live betting and crypto payouts, with fast withdrawals.' },
      { q: 'Which sports can I bet on?', a: 'Over 30 sports: football, basketball, tennis and eSports (CS2, Dota 2, LoL), with pre-match and live markets.' },
      { q: 'Do sports bets generate BFG tokens?', a: 'Yes. Just like the casino, every sports bet generates BFG tokens you can stake to receive daily dividends.' },
    ],
  },
  'staking-crypto': {
    es: [
      { q: '¿Qué es el staking de BFG?', a: 'Consiste en bloquear tus tokens BFG para recibir una parte de los ingresos diarios de BetFury, pagada en varias criptomonedas.' },
      { q: '¿Cómo consigo tokens BFG?', a: 'Jugando (cada apuesta genera BFG), comprándolos o mediante el faucet gratuito. Después los bloqueas en el pool de staking.' },
      { q: '¿El staking garantiza ingresos?', a: 'No. Los dividendos dependen de los ingresos diarios de la plataforma y del valor del token BFG, que fluctúa. No es un ingreso garantizado. +18.' },
    ],
    en: [
      { q: 'What is BFG staking?', a: 'It means locking your BFG tokens to receive a share of BetFury’s daily revenue, paid in several cryptocurrencies.' },
      { q: 'How do I get BFG tokens?', a: 'By playing (every bet generates BFG), buying them or via the free faucet. Then you lock them in the staking pool.' },
      { q: 'Does staking guarantee income?', a: 'No. Dividends depend on the platform’s daily revenue and on the BFG token value, which fluctuates. It is not guaranteed income. 18+.' },
    ],
  },
  'ganar-criptomonedas': {
    es: [
      { q: '¿Se puede ganar cripto gratis en BetFury?', a: 'Sí, mediante el faucet gratuito y las Crypto Boxes (BTC, ETH, BNB) que se abren cada cierto tiempo sin depósito. Las cantidades son pequeñas pero reales.' },
      { q: '¿Es el juego una forma fiable de ingresos?', a: 'No. El juego implica riesgo de pérdida y no debe verse como fuente de ingresos. Trátalo como entretenimiento y juega con responsabilidad. +18.' },
      { q: '¿Qué métodos hay para ganar cripto sin depositar?', a: 'Faucet, Crypto Boxes, rakeback y promociones puntuales. Son complementos, nunca un sustituto de ingresos.' },
    ],
    en: [
      { q: 'Can you earn free crypto on BetFury?', a: 'Yes, through the free faucet and the Crypto Boxes (BTC, ETH, BNB) that open periodically with no deposit. Amounts are small but real.' },
      { q: 'Is gambling a reliable source of income?', a: 'No. Gambling involves risk of loss and should not be seen as income. Treat it as entertainment and play responsibly. 18+.' },
      { q: 'What methods are there to earn crypto without depositing?', a: 'Faucet, Crypto Boxes, rakeback and occasional promotions. They are extras, never a substitute for income.' },
    ],
  },
  'casino-sin-kyc': {
    es: [
      { q: '¿Qué es un casino sin KYC?', a: 'Uno que permite jugar y retirar sin enviar documentos de identidad en el uso normal, operando solo con cripto y un email.' },
      { q: '¿BetFury es un casino sin KYC?', a: 'Para el uso normal sí: te registras con email y juegas/retiras en cripto sin KYC obligatorio. Puede pedir verificación en casos puntuales por seguridad o cumplimiento.' },
      { q: '¿Es legal jugar sin KYC?', a: 'Depende de tu jurisdicción. El casino opera con licencia de Curaçao; tú eres responsable de cumplir las leyes de tu país. +18.' },
    ],
    en: [
      { q: 'What is a no-KYC casino?', a: 'One that lets you play and withdraw without submitting ID documents in normal use, operating only with crypto and an email.' },
      { q: 'Is BetFury a no-KYC casino?', a: 'For normal use, yes: you register with an email and play/withdraw in crypto without mandatory KYC. It may request verification in specific cases for security or compliance.' },
      { q: 'Is it legal to play without KYC?', a: 'It depends on your jurisdiction. The casino operates under a Curaçao license; you are responsible for complying with your country’s laws. 18+.' },
    ],
  },
};
