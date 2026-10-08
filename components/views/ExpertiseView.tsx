import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Phone, Mail } from 'lucide-react';
import { Language } from '../../types';
import { SITE_URL } from '../../seo/routes';

// Pages « expertise » dédiées (amiante-plomb, dépollution) :
// une page par sujet pour que Google puisse la proposer sur les recherches précises.
// Contenu limité à ce que R.I.C.E fait réellement : assistance, conseil, AMO et MOE
// (analyse des dossiers, DCE, analyse des offres, suivi). Pas de diagnostics.

type Lang = 'fr' | 'en';

interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface Faq {
  q: string;
  a: string;
}

interface PageContent {
  kicker: string;
  h1: string;
  intro: string[];
  sections: Section[];
  faqTitle: string;
  faq: Faq[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  related: { label: string; to: string };
}

interface Img {
  src: string;
  alt: Record<Lang, string>;
  caption?: Record<Lang, string>;
  w: number;
  h: number;
}

export interface ExpertiseData {
  path: string;
  serviceName: string;
  serviceType: string;
  content: Record<Lang, PageContent>;
  // Illustrations : photos Unsplash (licence Unsplash), servies depuis /public/images
  hero: Img;
  figures: Img[]; // affichées côte à côte après la première section
}

const CLIENTS_FR =
  "Nous travaillons pour des maîtres d'ouvrage privés (entreprises, propriétaires, promoteurs), des maîtres d'ouvrage publics et des collectivités de La Réunion et de Mayotte.";
const CLIENTS_EN =
  'We work for private project owners (companies, owners, developers), public project owners and local authorities in Réunion and Mayotte.';

export const AMIANTE_PLOMB: ExpertiseData = {
  path: '/amiante-plomb',
  hero: { src: '/images/offre-amiante-demolition.jpg', w: 1400, h: 933, alt: { fr: 'Pelle de démolition déconstruisant un immeuble', en: 'Demolition excavator taking down a building' } },
  figures: [
    { src: '/images/offre-amiante-travaux.jpg', w: 1400, h: 933, alt: { fr: 'Pièce en cours de travaux, gravats au sol et étais', en: 'Room under works, rubble on the floor and props' }, caption: { fr: 'Amiante : des travaux encadrés, de la préparation à la restitution', en: 'Asbestos: works managed from preparation to handover' } },
    { src: '/images/offre-plomb-peinture.jpg', w: 900, h: 1353, alt: { fr: 'Mur aux peintures anciennes écaillées', en: 'Wall with old flaking paint' }, caption: { fr: 'Plomb : les peintures anciennes dégradées', en: 'Lead: old deteriorated paint' } },
  ],
  serviceName: "Maîtrise d'œuvre et assistance à maîtrise d'ouvrage amiante et plomb",
  serviceType: "Maîtrise d'œuvre et AMO de travaux de désamiantage et de déplombage",
  content: {
    fr: {
      kicker: 'Amiante et plomb · La Réunion et Mayotte',
      h1: "Maîtrise d'œuvre et AMO amiante et plomb à La Réunion",
      intro: [
        "R.I.C.E accompagne les maîtres d'ouvrage dans leurs travaux de désamiantage et de déplombage à La Réunion et à Mayotte : assistance, conseil, assistance à maîtrise d'ouvrage (AMO) et maîtrise d'œuvre (MOE).",
        "Bureau d'études en environnement basé au Tampon, R.I.C.E intervient depuis 2008. Notre rôle : vous aider à préparer, consulter et suivre des travaux exposant à l'amiante ou au plomb, en sécurisant le cadre réglementaire, le coût et le calendrier de votre opération.",
      ],
      sections: [
        {
          heading: 'Nos missions sur vos chantiers amiante et plomb',
          bullets: [
            "Analyse des dossiers : lecture des rapports de repérage amiante et plomb fournis par le maître d'ouvrage, identification des matériaux concernés et de leurs conséquences sur le projet.",
            "Rédaction du dossier de consultation des entreprises (DCE) : pièces techniques décrivant les travaux de retrait, d'encapsulage ou de déplombage.",
            "Analyse des offres des entreprises et aide au choix du titulaire.",
            "Suivi des travaux, de la préparation du chantier jusqu'à son achèvement.",
            "Conseil tout au long de l'opération, en assistance à maîtrise d'ouvrage ou en maîtrise d'œuvre selon votre besoin.",
          ],
        },
        {
          heading: "AMO ou maîtrise d'œuvre : deux façons de vous accompagner",
          paragraphs: [
            "En assistance à maîtrise d'ouvrage (AMO), R.I.C.E vous conseille et vous aide à piloter votre opération : définition du besoin, lecture des dossiers, consultation des entreprises, suivi. Vous gardez la main sur les décisions.",
            "En maîtrise d'œuvre (MOE), R.I.C.E conçoit la consultation des entreprises et suit l'exécution des travaux pour votre compte, de la rédaction du DCE jusqu'à la fin du chantier.",
          ],
        },
        {
          heading: 'Un cadre réglementaire exigeant',
          paragraphs: [
            "Les travaux exposant à l'amiante sont encadrés par le Code du travail (articles R4412-94 et suivants). Ils sont confiés à des entreprises spécialisées, sur la base d'un repérage préalable des matériaux réalisé par un opérateur certifié.",
            "Les travaux sur des peintures ou matériaux contenant du plomb exposent également les travailleurs et l'environnement du chantier. Ils demandent une préparation et un suivi adaptés.",
            "R.I.C.E ne réalise pas de diagnostics ni de repérages : nous exploitons les rapports existants pour préparer et suivre vos travaux.",
          ],
        },
        {
          heading: 'Pour qui ?',
          paragraphs: [CLIENTS_FR],
        },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'R.I.C.E réalise-t-il les diagnostics ou repérages amiante et plomb ?',
          a: "Non. Les repérages sont réalisés par des opérateurs certifiés. R.I.C.E analyse ces rapports et s'en sert pour préparer la consultation des entreprises et suivre les travaux.",
        },
        {
          q: "Le bureau qui a réalisé le repérage amiante peut-il aussi être votre AMO ou votre maître d'œuvre ?",
          a: "Attention : c'est à éviter. Le Code du travail (article R4412-97-1) impose à l'opérateur de repérage amiante avant travaux d'exercer sa mission « en toute indépendance » et de n'avoir aucun « lien d'intérêts de nature à nuire à son impartialité, notamment avec une personne physique ou morale intervenant dans le cadre de la même opération de travaux ». Confier le repérage puis l'AMO ou la maîtrise d'œuvre de la même opération à une seule entité crée précisément ce lien : celui qui a établi le diagnostic préparerait et suivrait ensuite les travaux qui en découlent. Avant de signer, vérifiez que l'opérateur de repérage est un tiers indépendant des autres intervenants de l'opération. R.I.C.E ne réalise aucun repérage ni diagnostic : nous intervenons uniquement en conseil, AMO et maîtrise d'œuvre, en toute indépendance vis-à-vis des diagnostics.",
        },
        {
          q: 'Et pour le plomb ?',
          a: "Le diagnostiqueur plomb est lui aussi soumis à une exigence d'indépendance : le Code de la construction et de l'habitation (article L271-6) lui interdit tout lien de nature à porter atteinte à son impartialité avec le propriétaire qui fait appel à lui ou avec une entreprise pouvant réaliser les travaux. Dans le même esprit, nous vous recommandons de confier le diagnostic et l'accompagnement des travaux (AMO ou maîtrise d'œuvre) à des intervenants distincts. R.I.C.E ne réalise aucun diagnostic.",
        },
        {
          q: "Quelle est la différence entre AMO et maîtrise d'œuvre ?",
          a: "L'AMO conseille et assiste le maître d'ouvrage dans le pilotage de son opération. La maîtrise d'œuvre prépare la consultation des entreprises (DCE, analyse des offres) et suit l'exécution des travaux pour le compte du maître d'ouvrage.",
        },
        {
          q: 'Intervenez-vous pour des collectivités et des marchés publics ?',
          a: "Oui. Nous intervenons pour des maîtres d'ouvrage publics et des collectivités, ainsi que pour des maîtres d'ouvrage privés.",
        },
        {
          q: 'Où intervenez-vous ?',
          a: 'À La Réunion et à Mayotte.',
        },
      ],
      ctaTitle: 'Un projet de désamiantage ou de déplombage ?',
      ctaText: 'Présentez-nous votre projet : nous vous répondons avec une proposition adaptée.',
      ctaButton: 'Nous contacter',
      related: { label: "Voir aussi : dépollution et sites et sols pollués", to: '/depollution' },
    },
    en: {
      kicker: 'Asbestos and lead · Réunion and Mayotte',
      h1: 'Asbestos and lead project management and owner assistance in Réunion',
      intro: [
        'R.I.C.E supports project owners with asbestos removal and lead abatement works in Réunion and Mayotte: assistance, advice, owner assistance (AMO) and project management (MOE).',
        'An environmental consultancy based in Le Tampon, R.I.C.E has been operating since 2008.',
      ],
      sections: [
        {
          heading: 'Our missions',
          bullets: [
            'Review of existing asbestos and lead survey reports.',
            'Drafting of the tender documents (DCE).',
            'Analysis of contractor bids.',
            'Supervision of the works.',
            'Advice throughout the project.',
          ],
        },
        {
          heading: 'Who we work for',
          paragraphs: [CLIENTS_EN, 'R.I.C.E does not carry out surveys or diagnostics.'],
        },
      ],
      faqTitle: 'FAQ',
      faq: [
        {
          q: 'Does R.I.C.E carry out asbestos or lead surveys?',
          a: 'No. Surveys are carried out by certified operators; R.I.C.E uses their reports to prepare and supervise the works.',
        },
        {
          q: 'Can the firm that carried out the asbestos survey also act as your owner assistant or project manager?',
          a: 'This should be avoided. The French Labour Code (article R4412-97-1) requires the survey operator to work "in complete independence", with no conflict of interest with any person involved in the same works operation. R.I.C.E carries out no surveys: we only act as advisor, owner assistant and project manager.',
        },
        {
          q: 'And for lead?',
          a: 'Lead inspectors are also bound by independence rules (French Construction and Housing Code, article L271-6). We recommend entrusting the inspection and the works supervision to separate parties. R.I.C.E carries out no inspections.',
        },
        { q: 'Where do you work?', a: 'In Réunion and Mayotte.' },
      ],
      ctaTitle: 'An asbestos or lead project?',
      ctaText: 'Tell us about your project and we will reply with a tailored proposal.',
      ctaButton: 'Contact us',
      related: { label: 'See also: site remediation', to: '/depollution' },
    },
  },
};

export const DEPOLLUTION: ExpertiseData = {
  path: '/depollution',
  hero: { src: '/images/offre-depol-pelle.jpg', w: 1400, h: 787, alt: { fr: 'Pelle mécanique en terrassement sur un site', en: 'Excavator during earthworks on a site' } },
  figures: [
    { src: '/images/offre-depol-godet.jpg', w: 1400, h: 937, alt: { fr: 'Godet de pelle mécanique dans la terre', en: 'Excavator bucket in soil' }, caption: { fr: 'Excavation et gestion des terres', en: 'Excavation and soil management' } },
    { src: '/images/offre-depol-sol.jpg', w: 900, h: 1199, alt: { fr: 'Gros plan sur un sol', en: 'Close-up of soil' }, caption: { fr: 'Le sol, au cœur du projet', en: 'Soil at the heart of the project' } },
  ],
  serviceName: 'Assistance, conseil, AMO et maîtrise d’œuvre en dépollution et sites et sols pollués',
  serviceType: 'AMO et maîtrise d’œuvre de travaux de dépollution',
  content: {
    fr: {
      kicker: 'Sites et sols pollués · La Réunion et Mayotte',
      h1: 'Dépollution et sites et sols pollués à La Réunion : conseil, AMO et maîtrise d’œuvre',
      intro: [
        "R.I.C.E accompagne les maîtres d'ouvrage confrontés à une pollution des sols à La Réunion et à Mayotte : assistance, conseil, assistance à maîtrise d'ouvrage (AMO) et maîtrise d'œuvre (MOE) des travaux de dépollution.",
        "Bureau d'études en environnement basé au Tampon depuis 2008, R.I.C.E vous aide à comprendre les études existantes, à préparer la consultation des entreprises et à suivre les travaux jusqu'à leur achèvement.",
      ],
      sections: [
        {
          heading: 'Nos missions en dépollution',
          bullets: [
            "Analyse des dossiers : lecture des études de sols et des rapports existants, mise en perspective avec votre projet (aménagement, construction, cession, réhabilitation).",
            "Conseil sur la stratégie de gestion de la pollution et ses conséquences sur le coût et le calendrier du projet.",
            "Rédaction du dossier de consultation des entreprises (DCE) pour les travaux de dépollution.",
            "Analyse des offres des entreprises et aide au choix du titulaire.",
            "Suivi des travaux de dépollution jusqu'à leur achèvement.",
          ],
        },
        {
          heading: "AMO ou maîtrise d'œuvre : selon votre besoin",
          paragraphs: [
            "En AMO, R.I.C.E vous conseille et vous assiste dans le pilotage de l'opération, en lien avec les bureaux d'études spécialisés et les entreprises.",
            "En maîtrise d'œuvre, R.I.C.E prépare la consultation des entreprises et suit l'exécution des travaux pour votre compte.",
          ],
        },
        {
          heading: 'Le cadre de référence',
          paragraphs: [
            "En France, la gestion des sites et sols pollués suit la méthodologie nationale publiée par le ministère chargé de l'environnement (version d'avril 2017). Les prestations du domaine sont décrites par la série de normes NF X31-620, dont la partie 3 porte sur l'ingénierie des travaux de réhabilitation (version de décembre 2021).",
            "R.I.C.E ne réalise pas de diagnostics de pollution ni de prélèvements : nous exploitons les études existantes pour conseiller, préparer et suivre vos travaux.",
          ],
        },
        {
          heading: 'Pour qui ?',
          paragraphs: [CLIENTS_FR],
        },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'R.I.C.E réalise-t-il des diagnostics de pollution des sols ?',
          a: "Non. R.I.C.E n'effectue ni diagnostics ni prélèvements. Nous analysons les études existantes et accompagnons le maître d'ouvrage en conseil, en AMO ou en maîtrise d'œuvre.",
        },
        {
          q: 'À quel moment faire appel à R.I.C.E ?',
          a: "Dès qu'une pollution est identifiée ou suspectée sur un terrain lié à votre projet : pour comprendre ses conséquences, préparer la consultation des entreprises puis suivre les travaux.",
        },
        {
          q: 'Intervenez-vous pour des collectivités ?',
          a: "Oui, pour des collectivités et des maîtres d'ouvrage publics, ainsi que pour des maîtres d'ouvrage privés.",
        },
        {
          q: 'Où intervenez-vous ?',
          a: 'À La Réunion et à Mayotte.',
        },
      ],
      ctaTitle: 'Un terrain pollué dans votre projet ?',
      ctaText: 'Présentez-nous votre projet : nous vous répondons avec une proposition adaptée.',
      ctaButton: 'Nous contacter',
      related: { label: "Voir aussi : maîtrise d'œuvre et AMO amiante et plomb", to: '/amiante-plomb' },
    },
    en: {
      kicker: 'Contaminated sites and soils · Réunion and Mayotte',
      h1: 'Site remediation in Réunion: advice, owner assistance and project management',
      intro: [
        'R.I.C.E supports project owners dealing with soil contamination in Réunion and Mayotte: assistance, advice, owner assistance (AMO) and project management (MOE) of remediation works.',
        'An environmental consultancy based in Le Tampon since 2008.',
      ],
      sections: [
        {
          heading: 'Our missions',
          bullets: [
            'Review of existing soil studies and reports.',
            'Advice on the management strategy.',
            'Drafting of the tender documents (DCE).',
            'Analysis of contractor bids.',
            'Supervision of the remediation works.',
          ],
        },
        {
          heading: 'Who we work for',
          paragraphs: [CLIENTS_EN, 'R.I.C.E does not carry out contamination surveys or sampling.'],
        },
      ],
      faqTitle: 'FAQ',
      faq: [
        {
          q: 'Does R.I.C.E carry out soil contamination surveys?',
          a: 'No. We review existing studies and support the project owner with advice, owner assistance or project management.',
        },
        { q: 'Where do you work?', a: 'In Réunion and Mayotte.' },
      ],
      ctaTitle: 'Contaminated land in your project?',
      ctaText: 'Tell us about your project and we will reply with a tailored proposal.',
      ctaButton: 'Contact us',
      related: { label: 'See also: asbestos and lead', to: '/amiante-plomb' },
    },
  },
};

const buildJsonLd = (data: ExpertiseData) => {
  const fr = data.content.fr;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: data.serviceName,
        serviceType: data.serviceType,
        url: SITE_URL + data.path,
        description: fr.intro[0],
        provider: { '@type': 'ProfessionalService', name: 'R.I.C.E', url: SITE_URL + '/' },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'La Réunion' },
          { '@type': 'AdministrativeArea', name: 'Mayotte' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: fr.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
};

export const ExpertiseView: React.FC<{ language: Language; data: ExpertiseData }> = ({ language, data }) => {
  const lang: Lang = language === 'en' ? 'en' : 'fr';
  const t = data.content[lang];

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(data)) }}
      />
      <section className="bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-stretch">
          <div className="flex-[999_1_520px] min-w-0 px-4 sm:px-6 lg:px-8 pt-12 pb-14">
            <span className="text-primary-300 font-bold tracking-wider uppercase text-sm">{t.kicker}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6 leading-tight">{t.h1}</h1>
            {t.intro.map((p, i) => (
              <p key={i} className="text-lg text-secondary-100 leading-relaxed mb-4 max-w-2xl">{p}</p>
            ))}
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-semibold transition">
                {t.ctaButton}<ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:+262692656166" className="inline-flex items-center px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold transition">
                <Phone className="mr-2 h-5 w-5" />0692 65 61 66
              </a>
            </div>
          </div>
          <img src={data.hero.src} alt={data.hero.alt[lang]} width={data.hero.w} height={data.hero.h} className="flex-[1_1_420px] min-w-0 w-full min-h-[320px] object-cover" />
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {t.sections.map((s, i) => (
            <React.Fragment key={i}>
            {i === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.figures.map((f) => (
                  <figure key={f.src} className="m-0">
                    <img src={f.src} alt={f.alt[lang]} width={f.w} height={f.h} loading="lazy" className="w-full h-80 object-cover rounded-2xl" />
                    {f.caption && <figcaption className="text-sm text-slate-500 mt-2">{f.caption[lang]}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">{s.heading}</h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="text-slate-600 leading-relaxed mb-3">{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-3">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start text-slate-600 leading-relaxed">
                      <Check className="h-5 w-5 text-primary-600 mr-3 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            </React.Fragment>
          ))}

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">{t.faqTitle}</h2>
            <div className="space-y-6">
              {t.faq.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{f.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-secondary-900 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">{t.ctaTitle}</h2>
            <p className="text-secondary-100 mb-6">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold transition"
              >
                {t.ctaButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:+262692656166"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition"
              >
                <Phone className="mr-2 h-5 w-5" />
                0692 65 61 66
              </a>
              <a
                href="mailto:contact@rice.re"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition"
              >
                <Mail className="mr-2 h-5 w-5" />
                contact@rice.re
              </a>
            </div>
          </section>

          <p className="text-center">
            <Link to={t.related.to} className="text-primary-600 font-semibold hover:text-primary-700">
              {t.related.label} →
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
};
