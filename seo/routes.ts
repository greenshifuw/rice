// Métadonnées SEO par page — source unique utilisée :
//  - côté navigateur (components/Seo.tsx) pour mettre à jour <head> à chaque navigation
//  - au build (scripts/prerender.mjs) pour générer le HTML statique de chaque page
export const SITE_URL = 'https://www.rice.re';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  sitemapPriority?: number;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: "Bureau d'études environnement à La Réunion | R.I.C.E",
    description:
      "R.I.C.E, bureau d'études en ingénierie environnementale au Tampon (La Réunion) depuis 2008 : études réglementaires ICPE, maîtrise d'œuvre amiante et plomb, dépollution, renaturation, économie circulaire.",
    sitemapPriority: 1.0,
  },
  {
    path: '/services',
    title: "Prestations : études réglementaires, MOE amiante, dépollution | R.I.C.E",
    description:
      "Prestations du bureau d'études R.I.C.E à La Réunion : dossiers ICPE, études d'impact, Loi sur l'eau, maîtrise d'œuvre amiante et plomb, dépollution, renaturation, économie circulaire, tableaux de bord QHSE.",
    sitemapPriority: 0.9,
  },
  {
    path: '/activities',
    title: "Activités : AMO, ICPE, études d'impact, drone | R.I.C.E La Réunion",
    description:
      "Assistance à maîtrise d'ouvrage, gestion ICPE, études amiante et plomb, études d'impact, plans de gestion des déchets de chantier, renaturation, photogrammétrie par drone à La Réunion.",
    sitemapPriority: 0.8,
  },
  {
    path: '/amiante-plomb',
    title: "Maîtrise d'œuvre et AMO amiante et plomb à La Réunion | R.I.C.E",
    description:
      "Désamiantage et déplombage à La Réunion et Mayotte : R.I.C.E, bureau d'études depuis 2008, vous accompagne en AMO et maîtrise d'œuvre — analyse des dossiers, DCE, analyse des offres, suivi des travaux.",
    sitemapPriority: 0.9,
  },
  {
    path: '/depollution',
    title: "Dépollution et sites et sols pollués à La Réunion : AMO, MOE | R.I.C.E",
    description:
      "Sols pollués à La Réunion et Mayotte : R.I.C.E vous accompagne en conseil, AMO et maîtrise d'œuvre des travaux de dépollution — analyse des études, DCE, analyse des offres, suivi.",
    sitemapPriority: 0.9,
  },
  {
    path: '/about',
    title: "Bureau d'études environnement au Tampon depuis 2008 | R.I.C.E",
    description:
      "Fondé en 2008 au Tampon, R.I.C.E est un bureau d'études en ingénierie environnementale à La Réunion : dépollution, désamiantage, écoconception, relevés par drone.",
    sitemapPriority: 0.7,
  },
  {
    path: '/strategy',
    title: "Accompagnement des collectivités : PLU, SCOT, HQE | R.I.C.E La Réunion",
    description:
      "R.I.C.E accompagne les collectivités de La Réunion : documents d'urbanisme (PLU, ZAC, SCOT), solutions fondées sur la nature, certifications HQE, BREEAM, LEED, concertation.",
    sitemapPriority: 0.7,
  },
  {
    path: '/contact',
    title: "Contact — bureau d'études R.I.C.E, Le Tampon, La Réunion",
    description:
      "Contactez le bureau d'études environnement R.I.C.E au Tampon (La Réunion) : 0692 65 61 66, contact@rice.re. Demande de devis et de rendez-vous.",
    sitemapPriority: 0.8,
  },
  {
    path: '/legal',
    title: 'Mentions légales | R.I.C.E',
    description: 'Mentions légales du site du bureau d\'études R.I.C.E, Le Tampon, La Réunion.',
    sitemapPriority: 0.2,
  },
  {
    path: '/privacy',
    title: 'Politique de confidentialité | R.I.C.E',
    description: 'Politique de confidentialité du site du bureau d\'études R.I.C.E, Le Tampon, La Réunion.',
    sitemapPriority: 0.2,
  },
  {
    // Version imprimable : doublon de contenu, exclue de l'index Google
    path: '/presentation',
    title: 'Présentation R.I.C.E (version imprimable)',
    description: "Plaquette de présentation imprimable du bureau d'études R.I.C.E.",
    noindex: true,
  },
];

export const getRouteMeta = (pathname: string): RouteMeta =>
  ROUTES.find((r) => r.path === pathname) ?? ROUTES[0];
