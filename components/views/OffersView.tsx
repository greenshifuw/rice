import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check, ArrowRight, Phone, Mail, ExternalLink, FileText, LineChart, Award,
  CalendarDays, Landmark, Building2, Sprout,
} from 'lucide-react';
import { Language } from '../../types';
import { SITE_URL } from '../../seo/routes';

// Pages « offres » (carbone d'opération, biodéchets, chantier suivi).
// Règles de contenu :
// - ne jamais employer l'appellation protégée de l'ABC : écrire « calcul des émissions de GES » ;
// - pas de diagnostics (R.I.C.E n'en réalise pas), pas de références ni de qualifications affichées ;
// - toute donnée réglementaire est sourcée dans le texte.

type Lang = 'fr' | 'en';
interface Faq { q: string; a: string }

const TEL = 'tel:+262692656166';
const MAIL = 'mailto:contact@rice.re';

/* ---------- Éléments communs ---------- */

const Kicker: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span className={`text-sm font-bold tracking-wider uppercase ${light ? 'text-primary-300' : 'text-primary-700'}`}>{children}</span>
);

const H2: React.FC<{ children: React.ReactNode; light?: boolean; className?: string }> = ({ children, light, className = '' }) => (
  <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight mt-2 mb-4 ${light ? 'text-white' : 'text-secondary-900'} ${className}`}>{children}</h2>
);

const CheckList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((it, i) => (
      <li key={i} className="flex items-start text-slate-600 leading-relaxed">
        <Check className="h-5 w-5 text-primary-600 mr-3 mt-0.5 shrink-0" aria-hidden="true" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 ${className}`}>{children}</div>
);

const Breadcrumb: React.FC<{ lang: Lang; label: string; light?: boolean }> = ({ lang, label, light }) => (
  <nav aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'} className={`text-sm mb-7 ${light ? 'text-secondary-200' : 'text-slate-500'}`}>
    <Link to="/" className="hover:underline">{lang === 'fr' ? 'Accueil' : 'Home'}</Link>
    <span className="mx-2">›</span>
    <Link to="/services" className="hover:underline">{lang === 'fr' ? 'Prestations' : 'Services'}</Link>
    <span className="mx-2">›</span>
    <span>{label}</span>
  </nav>
);

const HeroButtons: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex flex-wrap gap-4">
    <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-semibold transition">
      {label}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
    </Link>
    <a href={TEL} className="inline-flex items-center px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold transition">
      <Phone className="mr-2 h-5 w-5" aria-hidden="true" />0692 65 61 66
    </a>
  </div>
);

const FaqBlock: React.FC<{ lang: Lang; items: Faq[] }> = ({ lang, items }) => (
  <Card className="md:p-10">
    <H2>{lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}</H2>
    <div className="divide-y divide-slate-100">
      {items.map((f, i) => (
        <div key={i} className="py-5">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{f.q}</h3>
          <p className="text-slate-600 leading-relaxed">{f.a}</p>
        </div>
      ))}
    </div>
  </Card>
);

const Cta: React.FC<{ lang: Lang; title: string; text: string }> = ({ lang, title, text }) => (
  <section className="bg-secondary-900 text-white rounded-2xl px-8 py-12 text-center">
    <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{title}</h2>
    <p className="text-secondary-100 mb-7 max-w-2xl mx-auto leading-relaxed">{text}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-semibold transition">
        {lang === 'fr' ? 'Nous contacter' : 'Contact us'}<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </Link>
      <a href={TEL} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition">
        <Phone className="mr-2 h-5 w-5" aria-hidden="true" />0692 65 61 66
      </a>
      <a href={MAIL} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition">
        <Mail className="mr-2 h-5 w-5" aria-hidden="true" />contact@rice.re
      </a>
    </div>
  </section>
);

const Related: React.FC<{ lang: Lang; links: { to: string; fr: string; en: string }[] }> = ({ lang, links }) => (
  <p className="text-center text-slate-600">
    {lang === 'fr' ? 'Voir aussi : ' : 'See also: '}
    {links.map((l, i) => (
      <React.Fragment key={l.to}>
        {i > 0 && <span className="mx-2">·</span>}
        <Link to={l.to} className="text-primary-700 font-semibold hover:text-primary-800">{lang === 'fr' ? l.fr : l.en}</Link>
      </React.Fragment>
    ))}
  </p>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 text-sm font-medium">{children}</span>
);

const JsonLd: React.FC<{ path: string; name: string; serviceType: string; description: string; faq: Faq[] }> = (p) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            name: p.name,
            serviceType: p.serviceType,
            url: SITE_URL + p.path,
            description: p.description,
            provider: { '@type': 'ProfessionalService', name: 'R.I.C.E', url: SITE_URL + '/' },
            areaServed: [
              { '@type': 'AdministrativeArea', name: 'La Réunion' },
              { '@type': 'AdministrativeArea', name: 'Mayotte' },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ],
      }),
    }}
  />
);

const lng = (language: Language): Lang => (language === 'en' ? 'en' : 'fr');

/* =====================================================================
   1. CARBONE D'OPÉRATION — /carbone-operation
   ===================================================================== */

const CARBONE_FAQ: Record<Lang, Faq[]> = {
  fr: [
    { q: "Un acheteur public peut-il encore attribuer un marché sur le seul prix ?", a: "Non, depuis le 22 août 2026 : l'article R2152-7 du code de la commande publique impose d'autres critères que le prix (Banque des Territoires, 15 septembre 2026)." },
    { q: "Pourquoi suivre les émissions pendant le chantier ?", a: "Parce qu'une estimation reste une promesse. Mesurer au fil de l'opération permet d'agir tant qu'il est temps, de piloter une trajectoire à la baisse et de remettre au maître d'ouvrage un résultat vérifiable à la réception." },
    { q: "Le maître d'ouvrage a-t-il accès au suivi ?", a: "Oui. Depuis RICO2, il consulte en temps réel les émissions mesurées, l'écart avec l'estimation de l'offre et les mesures prises, puis reçoit le calcul des émissions de l'opération à la réception." },
    { q: "Quelles émissions sont mesurées pendant le chantier ?", a: "Tout ce que couvrent les facteurs d'émission disponibles dans la Base Carbone de l'ADEME : carburants des engins, transports, matériaux, traitement des déchets, et tout autre poste de l'opération pour lequel un facteur existe." },
    { q: "Quel calcul des émissions faut-il fournir pour répondre ?", a: "Chaque acheteur fixe ses propres exigences dans le règlement de consultation. R.I.C.E les lit avec vous et produit les éléments demandés, sur la base d'un calcul des émissions de gaz à effet de serre." },
  ],
  en: [
    { q: 'Can a public buyer still award a contract on price alone?', a: 'No. Since 22 August 2026, article R2152-7 of the French public procurement code requires criteria other than price (Banque des Territoires, 15 September 2026).' },
    { q: 'Why track emissions during the works?', a: 'Because an estimate is only a promise. Measuring as the works progress makes it possible to act in time, steer a downward trajectory and hand the client a verifiable result at handover.' },
    { q: 'Does the client have access to the tracking?', a: 'Yes. In RICO2 the client sees, in real time, measured emissions, the gap with the bid estimate and the measures taken, then receives the calculation of the operation’s emissions at handover.' },
    { q: 'Which emissions are measured during the works?', a: 'Everything covered by the emission factors available in the ADEME Base Carbone: plant fuel, transport, materials, waste treatment, and any other item of the operation for which a factor exists.' },
    { q: 'What emissions calculation is required to bid?', a: 'Each buyer sets its own requirements in the tender rules. R.I.C.E reviews them with you and produces the requested elements, based on a greenhouse gas emissions calculation.' },
  ],
};

const CarboneT = {
  fr: {
    crumb: "Carbone d'opération",
    kicker: 'Entreprises du BTP · Marchés publics',
    h1: "Carbone d'opération : estimer, piloter, prouver",
    lead: "Un mémoire environnemental qui ne se contente pas de promettre. R.I.C.E estime les émissions de gaz à effet de serre de l'opération à la remise de l'offre, puis les mesure au fil du chantier : chaque mesure prise est tracée et la trajectoire est pilotée à la baisse, sous les yeux du maître d'ouvrage.",
    btn: 'Demander un devis',
    asideKicker: 'Depuis le 22 août 2026',
    asideTitle: "Le prix ne peut plus être le seul critère d'attribution d'un marché public.",
    asideText: "Article R2152-7 du code de la commande publique. Les critères environnementaux pèsent davantage dans la note : votre mémoire fait la différence.",
    asideSrc: 'Source : Banque des Territoires, 15 septembre 2026',
    whoKicker: 'Pour qui ?',
    whoTitle: "Les entreprises qui répondent aux appels d'offres",
    whoText: "Démolition, désamiantage, gros œuvre, VRD, second œuvre, aménagement : toute entreprise de travaux dont l'offre est notée sur un critère environnemental, et qui veut se démarquer par des engagements mesurables.",
    pills: ['TPE et PME du BTP', "Groupements d'entreprises", 'Sous-traitants', 'Marchés publics', 'Consultations privées'],
    missionKicker: 'La mission',
    missionTitle: "Trois temps, de la remise de l'offre à la réception",
    steps: [
      { tag: 'ESTIMER', when: "À la remise de l'offre", title: 'Le mémoire environnemental', text: "Estimation des émissions de l'opération et de vos variantes (engins, transports, matériaux, déchets). La note méthodologique présente au maître d'ouvrage le dispositif de suivi qui sera mis en place pendant les travaux." },
      { tag: 'PILOTER', when: 'Pendant le chantier', title: "Mesurer au fil de l'eau, agir, réduire", text: "Dans RICO2, les émissions sont mesurées au fil de l'opération sur tout ce que couvrent les facteurs d'émission de la Base Carbone de l'ADEME : carburants, transports, matériaux, déchets… Chaque mesure de réduction est tracée et son effet suivi : la trajectoire est pilotée à la baisse, et le maître d'ouvrage la consulte en temps réel.", badge: "Suivi en temps réel, partagé avec le maître d'ouvrage" },
      { tag: 'PROUVER', when: 'À la réception', title: "Le résultat de l'opération", text: "Émissions réelles comparées à l'estimation initiale, mesures mises en œuvre et résultats obtenus. Une référence vérifiable à citer dans vos prochaines réponses." },
    ],
    trajKicker: "Ce que voit le maître d'ouvrage",
    trajTitle: 'Une trajectoire, pas une promesse',
    trajList: ['Les émissions mesurées, période après période', "L'écart avec l'estimation remise dans l'offre", "Les mesures prises et leur date : changement d'engin, filière de déchets, logistique, réemploi", "La trajectoire de réduction jusqu'à la fin du chantier"],
    mock: { title: 'RICO2 · Suivi carbone · Opération de démolition', l1: 'Émissions mesurées', l2: "Estimation de l'offre", l3: 'Mesure de réduction', m: ['Filière de réemploi', 'Optimisation des rotations', 'Engin moins émetteur'], mk: 'Mesure', caption: "Illustration de l'interface, données fictives", aria: "Exemple de graphique : émissions mesurées par période, en baisse après chaque mesure de réduction, sous la ligne d'estimation initiale" },
    noteKicker: 'Dans votre note méthodologique',
    noteTitle: "Des engagements que le maître d'ouvrage peut vérifier",
    notes: [
      { t: 'Une estimation chiffrée', d: "Les émissions prévues de l'opération, poste par poste, et les variantes étudiées." },
      { t: 'Un dispositif de mesure', d: 'Quelles données sont relevées pendant le chantier, à quelle fréquence, par qui.' },
      { t: 'Un plan de réduction', d: "Les leviers identifiés et les mesures à déclencher au fil de l'opération." },
      { t: 'Un accès au suivi', d: "Le maître d'ouvrage consulte la trajectoire en temps réel, puis reçoit le résultat à la réception." },
    ],
    getTitle: 'Ce que vous recevez',
    get: ["Le mémoire environnemental et sa note méthodologique, au format demandé par l'acheteur", "Si le marché vous est attribué : le suivi des émissions pendant le chantier dans RICO2, partagé avec le maître d'ouvrage", "Le calcul des émissions de GES de fin d'opération : réel, estimé, mesures et résultats", "En option : le calcul des émissions de GES de l'entreprise avec RICO2"],
    transTitle: 'En toute transparence',
    trans: ["R.I.C.E ne garantit pas l'attribution du marché : la note dépend de l'ensemble de votre offre.", "Pas d'engagement écrit dans le mémoire que l'entreprise ne pourrait pas tenir sur le chantier.", "Les calculs d'émissions de GES s'appuient sur les facteurs d'émission officiels de la Base Carbone de l'ADEME : chaque chiffre est traçable."],
    rico2Title: "RICO2, l'outil développé par R.I.C.E",
    rico2Text: "Suivi des émissions de vos opérations en temps réel, calcul des émissions de l'entreprise (23 postes, scopes 1 à 3), plan de transition et trajectoire de réduction. Tous les calculs s'appuient sur les facteurs d'émission de la Base Carbone de l'ADEME.",
    rico2Btn: 'Découvrir RICO2',
    ctaTitle: "Un appel d'offres en cours ?",
    ctaText: "Envoyez-nous le règlement de consultation : nous vous disons rapidement ce qu'il est possible de produire avant la date limite.",
    imgAlt1: "Rédaction d'un dossier technique sur plans",
    imgAlt2: 'Compagnons sur un chantier de gros œuvre, vue aérienne',
  },
  en: {
    crumb: 'Operation carbone',
    kicker: 'Construction companies · Public tenders',
    h1: 'Operation carbon: estimate, steer, prove',
    lead: 'An environmental statement that does more than promise. R.I.C.E estimates the greenhouse gas emissions of the operation when you bid, then measures them throughout the works: every measure taken is logged and the trajectory is steered downwards, in full view of the client.',
    btn: 'Request a quote',
    asideKicker: 'Since 22 August 2026',
    asideTitle: 'Price can no longer be the only award criterion for a public contract.',
    asideText: 'Article R2152-7 of the French public procurement code. Environmental criteria weigh more in the score: your statement makes the difference.',
    asideSrc: 'Source: Banque des Territoires, 15 September 2026',
    whoKicker: 'Who is it for?',
    whoTitle: 'Companies bidding for tenders',
    whoText: 'Demolition, asbestos removal, structural works, roads and utilities, finishing works, landscaping: any contractor whose bid is scored on an environmental criterion and who wants to stand out with measurable commitments.',
    pills: ['Small and medium contractors', 'Consortiums', 'Subcontractors', 'Public tenders', 'Private tenders'],
    missionKicker: 'The assignment',
    missionTitle: 'Three stages, from bid to handover',
    steps: [
      { tag: 'ESTIMATE', when: 'When you bid', title: 'The environmental statement', text: 'Estimate of the emissions of the operation and of your variants (plant, transport, materials, waste). The method statement shows the client the tracking system that will run during the works.' },
      { tag: 'STEER', when: 'During the works', title: 'Measure as you go, act, reduce', text: 'In RICO2, emissions are measured throughout the operation across everything covered by the ADEME Base Carbone emission factors: fuel, transport, materials, waste… Every reduction measure is logged and its effect tracked: the trajectory is steered downwards and the client follows it in real time.', badge: 'Real-time tracking, shared with the client' },
      { tag: 'PROVE', when: 'At handover', title: 'The result of the operation', text: 'Actual emissions compared with the initial estimate, measures implemented and results achieved. A verifiable reference to quote in your next bids.' },
    ],
    trajKicker: 'What the client sees',
    trajTitle: 'A trajectory, not a promise',
    trajList: ['Measured emissions, period after period', 'The gap with the estimate given in the bid', 'Measures taken and their date: plant change, waste route, logistics, reuse', 'The reduction trajectory until the end of the works'],
    mock: { title: 'RICO2 · Carbon tracking · Demolition operation', l1: 'Measured emissions', l2: 'Bid estimate', l3: 'Reduction measure', m: ['Reuse route', 'Optimised haulage', 'Lower-emission plant'], mk: 'Measure', caption: 'Interface illustration, fictitious data', aria: 'Example chart: emissions measured per period, decreasing after each reduction measure, below the initial estimate line' },
    noteKicker: 'In your method statement',
    noteTitle: 'Commitments the client can check',
    notes: [
      { t: 'A quantified estimate', d: 'Expected emissions of the operation, item by item, and the variants studied.' },
      { t: 'A measurement system', d: 'Which data are collected during the works, how often, by whom.' },
      { t: 'A reduction plan', d: 'The levers identified and the measures to trigger as the operation progresses.' },
      { t: 'Access to tracking', d: 'The client follows the trajectory in real time, then receives the result at handover.' },
    ],
    getTitle: 'What you receive',
    get: ['The environmental statement and its method statement, in the format required by the buyer', 'If you win the contract: emissions tracking during the works in RICO2, shared with the client', 'The end-of-operation greenhouse gas emissions calculation: actual, estimated, measures and results', 'Optional: your company’s greenhouse gas emissions calculation with RICO2'],
    transTitle: 'Full transparency',
    trans: ['R.I.C.E does not guarantee that you win the contract: the score depends on your whole bid.', 'No written commitment in the statement that the company could not keep on site.', 'Greenhouse gas calculations rely on the official emission factors of the ADEME Base Carbone: every figure is traceable.'],
    rico2Title: 'RICO2, the tool developed by R.I.C.E',
    rico2Text: 'Real-time emissions tracking of your operations, company emissions calculation (23 items, scopes 1 to 3), transition plan and reduction trajectory. All calculations rely on the ADEME Base Carbone emission factors.',
    rico2Btn: 'Discover RICO2',
    ctaTitle: 'A tender under way?',
    ctaText: 'Send us the tender rules: we will quickly tell you what can be produced before the deadline.',
    imgAlt1: 'Drafting a technical file on plans',
    imgAlt2: 'Workers on a structural works site, aerial view',
  },
};

const STEP_STYLE = [
  { band: 'bg-sky-600', when: 'text-sky-700', Icon: FileText, card: 'border border-slate-100 shadow-sm' },
  { band: 'bg-green-600', when: 'text-primary-700', Icon: LineChart, card: 'border-2 border-primary-600 shadow-lg' },
  { band: 'bg-orange-500', when: 'text-orange-700', Icon: Award, card: 'border border-slate-100 shadow-sm' },
];

const BARS = [128, 120, 102, 88, 76, 62, 54];

export const CarboneOperationView: React.FC<{ language: Language }> = ({ language }) => {
  const lang = lng(language);
  const t = CarboneT[lang];
  return (
    <div className="bg-slate-50">
      <JsonLd
        path="/carbone-operation"
        name="Calcul et suivi des émissions de GES d'une opération de travaux, mémoire environnemental"
        serviceType="Calcul des émissions de gaz à effet de serre et mémoire environnemental pour les marchés de travaux"
        description={CarboneT.fr.lead}
        faq={CARBONE_FAQ.fr}
      />
      {/* Hero */}
      <section className="bg-secondary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <Breadcrumb lang={lang} label={t.crumb} light />
          <div className="flex flex-wrap gap-10 items-start">
            <div className="flex-[999_1_520px] min-w-0">
              <Kicker light>{t.kicker}</Kicker>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mt-3 mb-5">{t.h1}</h1>
              <p className="text-lg md:text-xl text-secondary-100 leading-relaxed mb-8 max-w-2xl">{t.lead}</p>
              <HeroButtons label={t.btn} />
            </div>
            <aside className="flex-[1_1_340px] bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <img src="/images/offre-plans.jpg" alt={t.imgAlt1} className="w-full h-48 object-cover" width={1400} height={787} />
              <div className="p-7">
                <span className="text-xs font-bold tracking-wider uppercase text-secondary-700">{t.asideKicker}</span>
                <p className="text-xl font-bold leading-snug text-secondary-900 mt-2 mb-3">{t.asideTitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{t.asideText}</p>
                <p className="text-xs text-slate-500 mt-3">{t.asideSrc}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* Pour qui */}
        <section className="flex flex-wrap gap-10 items-center">
          <img src="/images/offre-chantier-aerien.jpg" alt={t.imgAlt2} className="flex-[1_1_420px] min-w-0 w-full h-80 object-cover rounded-2xl" loading="lazy" width={1400} height={927} />
          <div className="flex-[1_1_440px]">
            <Kicker>{t.whoKicker}</Kicker>
            <H2>{t.whoTitle}</H2>
            <p className="text-lg text-slate-600 leading-relaxed mb-5">{t.whoText}</p>
            <div className="flex flex-wrap gap-2">{t.pills.map((p) => <Pill key={p}>{p}</Pill>)}</div>
          </div>
        </section>

        {/* Trois temps */}
        <section>
          <Kicker>{t.missionKicker}</Kicker>
          <H2 className="mb-8">{t.missionTitle}</H2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.steps.map((s, i) => {
              const st = STEP_STYLE[i];
              return (
                <article key={s.tag} className={`bg-white rounded-2xl overflow-hidden flex flex-col ${st.card}`}>
                  <div className={`${st.band} h-24 flex items-center justify-center gap-3 text-white`}>
                    <st.Icon className="h-9 w-9" aria-hidden="true" />
                    <span className="text-xl font-extrabold tracking-wide">{s.tag}</span>
                  </div>
                  <div className="p-7 flex flex-col gap-2">
                    <span className={`text-sm font-bold ${st.when}`}>{s.when}</span>
                    <h3 className="text-xl font-bold text-slate-800">{s.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{s.text}</p>
                    {'badge' in s && s.badge && (
                      <span className="self-start mt-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold">{s.badge}</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Trajectoire */}
        <section className="bg-secondary-900 rounded-3xl px-6 md:px-10 py-12 text-white flex flex-wrap gap-10 items-center">
          <div className="flex-[1_1_360px]">
            <Kicker light>{t.trajKicker}</Kicker>
            <H2 light>{t.trajTitle}</H2>
            <ul className="list-disc pl-5 space-y-2 text-secondary-100 leading-relaxed">
              {t.trajList.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <figure className="flex-[1_1_460px] min-w-0">
            <div className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /><span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="ml-2 text-xs font-semibold text-slate-600">{t.mock.title}</span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 mb-3">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-sky-600" />{t.mock.l1}</span>
                  <span className="flex items-center gap-1.5"><span className="w-5 border-t-2 border-dashed border-slate-400" />{t.mock.l2}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-600" />{t.mock.l3}</span>
                </div>
                <svg viewBox="0 0 440 200" className="w-full h-auto block" role="img" aria-label={t.mock.aria}>
                  <line x1="30" y1="180" x2="430" y2="180" stroke="#e2e8f0" />
                  <line x1="30" y1="40" x2="430" y2="40" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 5" />
                  {BARS.map((h, i) => <rect key={i} x={44 + i * 56} y={180 - h} width="36" height={h} rx="4" fill="#0284c7" />)}
                  <polyline points={BARS.map((h, i) => `${62 + i * 56},${180 - h}`).join(' ')} fill="none" stroke="#0c4a6e" strokeWidth="2" />
                  {[146, 258, 370].map((x) => (
                    <g key={x}>
                      <circle cx={x} cy="30" r="7" fill="#46852b" />
                      <line x1={x} y1="37" x2={x} y2="180" stroke="#46852b" strokeDasharray="2 4" />
                    </g>
                  ))}
                </svg>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  {t.mock.m.map((m, i) => (
                    <div key={m} className="bg-primary-50 rounded-lg px-2.5 py-2 text-primary-800"><strong>{t.mock.mk} {i + 1}</strong><br />{m}</div>
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="text-xs text-secondary-200 mt-3 text-center">{t.mock.caption}</figcaption>
          </figure>
        </section>

        {/* Note méthodologique */}
        <Card className="md:p-10">
          <Kicker>{t.noteKicker}</Kicker>
          <H2 className="mb-8">{t.noteTitle}</H2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.notes.map((n, i) => (
              <li key={n.t} className="flex flex-col gap-2">
                <span className="w-11 h-11 rounded-full bg-primary-100 text-primary-800 font-extrabold flex items-center justify-center">{i + 1}</span>
                <h3 className="font-bold text-slate-800">{n.t}</h3>
                <p className="text-slate-600 leading-relaxed">{n.d}</p>
              </li>
            ))}
          </ol>
        </Card>

        {/* Livrables / transparence */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-2xl font-extrabold text-secondary-900 mb-5">{t.getTitle}</h2>
            <CheckList items={t.get} />
          </Card>
          <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-8">
            <h2 className="text-2xl font-extrabold text-secondary-900 mb-5">{t.transTitle}</h2>
            <ul className="list-disc pl-5 space-y-3 text-slate-700 leading-relaxed">{t.trans.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </section>

        {/* RICO2 */}
        <section className="bg-primary-100 rounded-2xl p-8 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex-[1_1_520px]">
            <h2 className="text-2xl font-extrabold text-primary-900 mb-2">{t.rico2Title}</h2>
            <p className="text-primary-800 leading-relaxed">{t.rico2Text}</p>
          </div>
          <a href="https://rico2.rice.re" target="_blank" rel="noopener" className="inline-flex items-center px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-semibold transition">
            {t.rico2Btn}<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        <FaqBlock lang={lang} items={CARBONE_FAQ[lang]} />
        <Cta lang={lang} title={t.ctaTitle} text={t.ctaText} />
        <Related lang={lang} links={[{ to: '/biodechets', fr: 'AMO tri des biodéchets', en: 'Food waste sorting' }, { to: '/chantier-suivi', fr: 'Chantier suivi', en: 'Monitored works' }]} />
      </div>
    </div>
  );
};

/* =====================================================================
   2. BIODÉCHETS — /biodechets
   ===================================================================== */

const BIO_FAQ: Record<Lang, Faq[]> = {
  fr: [
    { q: 'Qui est concerné par le tri à la source des biodéchets ?', a: 'Depuis le 1er janvier 2024, tous les professionnels qui produisent des biodéchets (ministère de la Transition écologique, page « Tri à la source des biodéchets » mise à jour le 27 décembre 2023).' },
    { q: 'Collecte ou compostage sur place : que choisir ?', a: "Les deux permettent de valoriser les biodéchets. Le bon choix dépend du volume, de la place, des contraintes du site et du coût global : c'est l'objet de l'étape 2 de la mission." },
    { q: 'Y a-t-il des règles sanitaires particulières ?', a: "Oui, car les restes de cuisine et de table sont des sous-produits animaux. Le « compostage de proximité » est encadré par l'arrêté du 9 avril 2018 (articles 17 à 21) : jusqu'à 1 tonne par semaine de restes de cuisine et de table, sans agrément sanitaire, dans le respect de conditions sanitaires minimales. Au-delà, ou pour une autre installation, d'autres règles s'appliquent. Source : instruction technique DGAL/SDSPA/2020-41 du 21 janvier 2020." },
    { q: 'R.I.C.E collecte-t-il les biodéchets ?', a: "Non. R.I.C.E intervient en assistance à maîtrise d'ouvrage et reste indépendant des prestataires de collecte et de traitement." },
  ],
  en: [
    { q: 'Who must sort food and organic waste at source?', a: 'Since 1 January 2024, all professionals producing biowaste (French Ministry for Ecological Transition, page updated 27 December 2023).' },
    { q: 'Collection or on-site composting: which one?', a: 'Both recover biowaste. The right choice depends on volume, space, site constraints and overall cost: that is step 2 of the assignment.' },
    { q: 'Are there specific health rules?', a: 'Yes, because kitchen and table leftovers are animal by-products. “Local composting” is governed by the order of 9 April 2018 (articles 17 to 21): up to 1 tonne per week of kitchen and table waste, without health approval, subject to minimum health conditions. Beyond that, or for another type of facility, other rules apply. Source: technical instruction DGAL/SDSPA/2020-41 of 21 January 2020.' },
    { q: 'Does R.I.C.E collect biowaste?', a: 'No. R.I.C.E acts as owner’s assistant and remains independent from collection and treatment providers.' },
  ],
};

const BioT = {
  fr: {
    crumb: 'Biodéchets',
    kicker: "ATMO · Assistance technique à maîtrise d'ouvrage",
    h1: "Tri à la source des biodéchets : passer de l'obligation à une organisation qui tient",
    lead: "État des lieux, choix de la solution, consultation du prestataire et suivi : R.I.C.E accompagne les établissements et les collectivités, en toute indépendance des prestataires de collecte.",
    btn: 'Demander un devis',
    oblig: 'Depuis le 1er janvier 2024, tous les professionnels qui produisent des biodéchets doivent les trier à la source.',
    obligSrc: 'Source : ministère de la Transition écologique, « Tri à la source des biodéchets », mis à jour le 27 décembre 2023.',
    constatKicker: 'Le constat',
    constatTitle: 'Un bac ne suffit pas',
    constat: "Gisement mal connu, contrat de collecte mal dimensionné, tri peu suivi par les équipes : beaucoup d'établissements ont posé un contenant sans organisation derrière. L'AMO de R.I.C.E remet de la méthode, des chiffres et un suivi.",
    whoTitle: 'Pour qui ?',
    who: ["Restauration collective : cantines, restaurants d'entreprise, cuisines centrales", 'Hôtellerie et restauration commerciale', "Établissements de santé et médico-sociaux (hors déchets d'activités de soins)", 'Collectivités, pour leurs établissements et leurs projets de proximité', 'Grandes surfaces, marchés, agroalimentaire'],
    missionKicker: 'La mission',
    missionTitle: 'Six étapes, du diagnostic au suivi',
    steps: [
      { t: 'État des lieux du gisement', d: 'Visite, pesées ou estimations sur une période représentative, points de production (préparation, retours plateaux, invendus).' },
      { t: 'Choix de la solution', d: 'Collecte séparée ou gestion sur place : comparaison chiffrée selon le volume, la place disponible et le coût global.' },
      { t: 'Cadre réglementaire', d: 'Vérification, au cas par cas et avec les services compétents, des règles applicables à la solution retenue.' },
      { t: 'DCE ou cahier des charges', d: "Pour le prestataire de collecte ou le fournisseur d'équipement, en marché public ou en consultation privée." },
      { t: 'Analyse des offres', d: "Rapport d'analyse et aide au choix du prestataire." },
      { t: 'Mise en route et suivi', d: 'Organisation du tri, signalétique, sensibilisation des équipes, indicateurs, point à 3 et 6 mois.' },
    ],
    getTitle: 'Ce que vous recevez',
    get: ["Rapport d'état des lieux et estimation du gisement", 'Note de choix de solution, avec scénarios chiffrés', 'DCE ou cahier des charges prêt à publier', "Rapport d'analyse des offres", 'Tableau de bord de suivi et bilan de mise en route'],
    indepTitle: 'Indépendant des prestataires',
    indep: "R.I.C.E n'assure ni la collecte ni le traitement des biodéchets. Le conseil reste neutre : vous choisissez la solution qui vous convient, pas celle qui arrange un prestataire.",
    ctaTitle: 'Votre tri des biodéchets est-il vraiment en place ?',
    ctaText: "Parlons de votre établissement : un premier échange suffit pour cadrer l'état des lieux.",
    imgAlt: 'Mains tenant du compost',
  },
  en: {
    crumb: 'Biowaste',
    kicker: 'Owner’s technical assistance',
    h1: 'Sorting biowaste at source: from legal obligation to an organisation that works',
    lead: 'Baseline, choice of solution, provider tender and follow-up: R.I.C.E supports establishments and local authorities, fully independent from collection providers.',
    btn: 'Request a quote',
    oblig: 'Since 1 January 2024, all professionals producing biowaste must sort it at source.',
    obligSrc: 'Source: French Ministry for Ecological Transition, “Tri à la source des biodéchets”, updated 27 December 2023.',
    constatKicker: 'The situation',
    constatTitle: 'A bin is not enough',
    constat: 'Unknown volumes, badly sized collection contracts, sorting poorly followed by staff: many establishments set up a container with no organisation behind it. R.I.C.E brings back method, figures and follow-up.',
    whoTitle: 'Who is it for?',
    who: ['Catering: school canteens, staff restaurants, central kitchens', 'Hotels and restaurants', 'Health and social care establishments (excluding healthcare waste)', 'Local authorities, for their buildings and local projects', 'Supermarkets, markets, food industry'],
    missionKicker: 'The assignment',
    missionTitle: 'Six steps, from baseline to follow-up',
    steps: [
      { t: 'Waste baseline', d: 'Site visit, weighing or estimates over a representative period, production points (preparation, tray returns, unsold food).' },
      { t: 'Choice of solution', d: 'Separate collection or on-site treatment: costed comparison based on volume, available space and overall cost.' },
      { t: 'Regulatory framework', d: 'Case-by-case check, with the competent authorities, of the rules applicable to the chosen solution.' },
      { t: 'Tender documents', d: 'For the collection provider or equipment supplier, in public or private procurement.' },
      { t: 'Bid analysis', d: 'Analysis report and support in choosing the provider.' },
      { t: 'Start-up and follow-up', d: 'Sorting organisation, signage, staff awareness, indicators, review at 3 and 6 months.' },
    ],
    getTitle: 'What you receive',
    get: ['Baseline report and waste estimate', 'Solution note with costed scenarios', 'Tender documents ready to publish', 'Bid analysis report', 'Follow-up dashboard and start-up review'],
    indepTitle: 'Independent from providers',
    indep: 'R.I.C.E neither collects nor treats biowaste. Advice stays neutral: you choose the solution that suits you, not the one that suits a provider.',
    ctaTitle: 'Is your biowaste sorting really in place?',
    ctaText: 'Let’s talk about your establishment: a first call is enough to frame the baseline.',
    imgAlt: 'Hands holding compost',
  },
};

const BIO_STEP_COLORS = ['bg-green-600', 'bg-green-600', 'bg-green-600', 'bg-sky-600', 'bg-sky-600', 'bg-orange-500'];

export const BiodechetsView: React.FC<{ language: Language }> = ({ language }) => {
  const lang = lng(language);
  const t = BioT[lang];
  return (
    <div className="bg-slate-50">
      <JsonLd
        path="/biodechets"
        name="Assistance à maîtrise d'ouvrage pour le tri à la source des biodéchets"
        serviceType="AMO biodéchets : état des lieux, choix de solution, DCE, analyse des offres, suivi"
        description={BioT.fr.lead}
        faq={BIO_FAQ.fr}
      />
      <section className="relative bg-primary-950 text-white overflow-hidden">
        <img src="/images/offre-bacs-tri.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" width={1400} height={933} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          <Breadcrumb lang={lang} label={t.crumb} light />
          <div className="max-w-3xl">
            <Kicker light>{t.kicker}</Kicker>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mt-3 mb-5">{t.h1}</h1>
            <p className="text-lg md:text-xl text-primary-50 leading-relaxed mb-8">{t.lead}</p>
            <HeroButtons label={t.btn} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-14">
        <section className="-mt-9 relative bg-white rounded-2xl p-7 shadow-xl flex flex-wrap gap-6 items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
            <CalendarDays className="h-8 w-8" aria-hidden="true" />
          </div>
          <div className="flex-[999_1_420px]">
            <p className="text-xl font-bold text-secondary-900 mb-1">{t.oblig}</p>
            <p className="text-sm text-slate-500">{t.obligSrc}</p>
          </div>
        </section>

        <section className="flex flex-wrap gap-10 items-start">
          <div className="flex-[1_1_440px]">
            <Kicker>{t.constatKicker}</Kicker>
            <H2>{t.constatTitle}</H2>
            <p className="text-lg text-slate-600 leading-relaxed">{t.constat}</p>
          </div>
          <Card className="flex-[1_1_440px]">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{t.whoTitle}</h3>
            <CheckList items={t.who} />
          </Card>
        </section>

        <section>
          <Kicker>{t.missionKicker}</Kicker>
          <H2 className="mb-8">{t.missionTitle}</H2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.steps.map((s, i) => (
              <li key={s.t} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col gap-2">
                <span className={`w-11 h-11 rounded-xl ${BIO_STEP_COLORS[i]} text-white font-extrabold flex items-center justify-center`}>{i + 1}</span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{s.t}</h3>
                <p className="text-slate-600 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-wrap gap-10 items-stretch">
          <img src="/images/offre-compost.jpg" alt={t.imgAlt} className="flex-[1_1_380px] min-w-0 w-full h-[420px] object-cover rounded-2xl" loading="lazy" width={900} height={1350} />
          <div className="flex-[1_1_460px] flex flex-col gap-5">
            <Card>
              <h2 className="text-2xl font-extrabold text-secondary-900 mb-5">{t.getTitle}</h2>
              <CheckList items={t.get} />
            </Card>
            <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-7">
              <h2 className="text-xl font-extrabold text-secondary-900 mb-2">{t.indepTitle}</h2>
              <p className="text-slate-700 leading-relaxed">{t.indep}</p>
            </div>
          </div>
        </section>

        <FaqBlock lang={lang} items={BIO_FAQ[lang]} />
        <Cta lang={lang} title={t.ctaTitle} text={t.ctaText} />
        <Related lang={lang} links={[{ to: '/carbone-operation', fr: "Carbone d'opération", en: 'Operation carbon' }, { to: '/chantier-suivi', fr: 'Chantier suivi', en: 'Monitored works' }]} />
      </div>
    </div>
  );
};

/* =====================================================================
   3. CHANTIER SUIVI — /chantier-suivi
   ===================================================================== */

const CHANTIER_FAQ: Record<Lang, Faq[]> = {
  fr: [
    { q: "Quels types d'opérations sont concernés ?", a: 'Démolition, désamiantage, déplombage, curage, dépollution, renaturation et suivi environnemental de travaux.' },
    { q: "Le maître d'ouvrage voit-il l'avancement du chantier ?", a: "Oui. L'espace NUMERICE BTP est partagé en temps réel : avancement, taux de conformité, contrôles, documents et tâches de chaque phase, avec des droits d'accès selon le rôle de chacun." },
    { q: 'R.I.C.E réalise-t-il les diagnostics ?', a: "Non. R.I.C.E ne réalise pas de diagnostics : la maîtrise d'œuvre reste séparée de l'entité qui a fait les repérages. Pour l'amiante, l'article R4412-97-1 du code du travail impose l'indépendance de l'opérateur de repérage vis-à-vis des autres intervenants de l'opération." },
    { q: 'R.I.C.E entre-t-il en zone confinée ?', a: "Non. R.I.C.E supervise depuis l'extérieur des zones : contrôles documentaires, visites, réunions, contrôle des mesures et des bordereaux. Les interventions en zone relèvent des entreprises certifiées et des organismes accrédités." },
  ],
  en: [
    { q: 'Which operations are covered?', a: 'Demolition, asbestos removal, lead removal, strip-out, remediation, renaturation and environmental monitoring of works.' },
    { q: 'Can the client see progress on site?', a: 'Yes. The NUMERICE BTP workspace is shared in real time: progress, compliance rate, checks, documents and tasks for each phase, with access rights by role.' },
    { q: 'Does R.I.C.E carry out surveys?', a: 'No. R.I.C.E does not carry out surveys: project management stays separate from the company that did them. For asbestos, article R4412-97-1 of the French labour code requires the surveyor to be independent from other parties to the operation.' },
    { q: 'Does R.I.C.E enter confined areas?', a: 'No. R.I.C.E supervises from outside the areas: document checks, site visits, meetings, checks of measurements and waste tracking slips. Work inside the areas is done by certified contractors and accredited bodies.' },
  ],
};

const ChantierT = {
  fr: {
    crumb: 'Chantier suivi',
    kicker: "Maîtrise d'œuvre · Suivi environnemental",
    h1: 'Chantier suivi : votre opération, visible en temps réel',
    lead: "Démolition, désamiantage, déplombage, curage, dépollution, renaturation : R.I.C.E conduit l'opération et vous ouvre un espace de suivi partagé, NUMERICE BTP. Vous voyez où en est le chantier sans attendre le prochain compte rendu.",
    btn: 'Parler de votre opération',
    imgAlt: 'Pelle mécanique chargeant un tombereau sur un chantier de terrassement',
    who: [
      { Icon: Landmark, t: "Maîtres d'ouvrage publics", d: 'Collectivités : bâtiments publics, écoles, logements, friches.' },
      { Icon: Building2, t: "Bailleurs et maîtres d'ouvrage privés", d: 'Réhabilitation, déconstruction, remise en état avant cession.' },
      { Icon: Sprout, t: 'Aménageurs', d: 'Opérations de dépollution ou de renaturation de sites.' },
    ],
    moeKicker: "1 · Conduite de l'opération",
    moeTitle: "Maîtrise d'œuvre ou AMO, de l'analyse à la réception",
    moeText: "R.I.C.E supervise depuis l'extérieur des zones confinées : contrôles documentaires, visites, réunions, contrôle des mesures et des bordereaux. Les interventions en zone relèvent des entreprises certifiées et des organismes accrédités.",
    moeSince: 'Expérience depuis 2008, en marchés publics et privés.',
    moeSteps: [
      ['Analyse des dossiers existants', ' : repérages et diagnostics réalisés par des tiers'],
      ['Rédaction du DCE', ''],
      ['Analyse des offres', ' et aide au choix des entreprises'],
      ['Suivi des travaux', ' et réception'],
    ],
    numKicker: "2 · L'espace partagé",
    numTitle: "NUMERICE BTP, ouvert au maître d'ouvrage",
    numList: ['Une fiche par opération, découpée en phases', 'Pour chaque phase : contrôles, documents, notes, tâches et devis', 'Avancement et taux de conformité en %', 'Une frise environnementale en 5 jalons', 'Accès multi-utilisateurs en temps réel, avec des rôles'],
    mock: { title: 'NUMERICE BTP · Opération de désamiantage', prog: 'Avancement', conf: 'Conformité', frise: 'Frise environnementale', jalons: ['Diagnostic & EIE', 'Mesures ERC', 'Pré-chantier', 'Suivi travaux', 'Post-travaux'], phases: [['Phase · Préparation', 'Validée'], ['Phase · Travaux', 'En cours'], ['Phase · Réception', 'À venir']], caption: "Illustration de l'interface, données fictives" },
    lotsKicker: '3 · Suivi environnemental',
    lotsTitle: "Neuf lots, du cadrage réglementaire à l'après-chantier",
    lots: ['Cadrage réglementaire & ERC', 'Faune, flore & biodiversité', "Milieux aquatiques & loi sur l'eau", 'Sols, sous-sols & pollution', 'Air, bruit & vibrations', 'Déchets de chantier', 'Paysage, patrimoine & archéologie', 'Espaces protégés & Natura 2000', 'Suivi post-travaux & bilan'],
    getTitle: 'Ce que vous recevez',
    get: ["DCE, rapport d'analyse des offres, comptes rendus de chantier", "Un accès à l'espace NUMERICE BTP pendant toute l'opération", 'Le dossier de fin de chantier : réception et traçabilité des déchets'],
    indepTitle: 'Indépendance',
    indep: "R.I.C.E ne réalise pas de diagnostics. La maîtrise d'œuvre reste ainsi séparée de l'entité qui a fait les repérages.",
    ctaTitle: 'Une opération en préparation ?',
    ctaText: "Présentez-nous votre projet : nous vous proposons une mission de maîtrise d'œuvre et de suivi adaptée.",
  },
  en: {
    crumb: 'Monitored works',
    kicker: 'Project management · Environmental monitoring',
    h1: 'Monitored works: your operation, visible in real time',
    lead: 'Demolition, asbestos removal, lead removal, strip-out, remediation, renaturation: R.I.C.E manages the operation and opens a shared tracking workspace, NUMERICE BTP. You see where the works stand without waiting for the next report.',
    btn: 'Talk about your operation',
    imgAlt: 'Excavator loading a dump truck on an earthworks site',
    who: [
      { Icon: Landmark, t: 'Public project owners', d: 'Local authorities: public buildings, schools, housing, brownfields.' },
      { Icon: Building2, t: 'Social landlords and private owners', d: 'Refurbishment, deconstruction, site clean-up before sale.' },
      { Icon: Sprout, t: 'Developers', d: 'Site remediation or renaturation operations.' },
    ],
    moeKicker: '1 · Managing the operation',
    moeTitle: 'Project management or owner’s assistance, from analysis to handover',
    moeText: 'R.I.C.E supervises from outside confined areas: document checks, site visits, meetings, checks of measurements and waste tracking slips. Work inside the areas is done by certified contractors and accredited bodies.',
    moeSince: 'Experience since 2008, in public and private contracts.',
    moeSteps: [
      ['Review of existing files', ': surveys carried out by third parties'],
      ['Tender documents', ''],
      ['Bid analysis', ' and contractor selection'],
      ['Works supervision', ' and handover'],
    ],
    numKicker: '2 · The shared workspace',
    numTitle: 'NUMERICE BTP, open to the client',
    numList: ['One sheet per operation, split into phases', 'For each phase: checks, documents, notes, tasks and quotes', 'Progress and compliance rate in %', 'A 5-milestone environmental timeline', 'Real-time multi-user access, with roles'],
    mock: { title: 'NUMERICE BTP · Asbestos removal operation', prog: 'Progress', conf: 'Compliance', frise: 'Environmental timeline', jalons: ['Survey & EIA', 'Mitigation', 'Pre-works', 'Works', 'Post-works'], phases: [['Phase · Preparation', 'Approved'], ['Phase · Works', 'In progress'], ['Phase · Handover', 'Upcoming']], caption: 'Interface illustration, fictitious data' },
    lotsKicker: '3 · Environmental monitoring',
    lotsTitle: 'Nine work packages, from regulatory framing to post-works',
    lots: ['Regulatory framing & mitigation', 'Fauna, flora & biodiversity', 'Water bodies & water law', 'Soil, subsoil & pollution', 'Air, noise & vibration', 'Construction waste', 'Landscape, heritage & archaeology', 'Protected areas & Natura 2000', 'Post-works monitoring & review'],
    getTitle: 'What you receive',
    get: ['Tender documents, bid analysis report, site meeting minutes', 'Access to the NUMERICE BTP workspace throughout the operation', 'End-of-works file: handover and waste traceability'],
    indepTitle: 'Independence',
    indep: 'R.I.C.E does not carry out surveys, so project management stays separate from the company that did them.',
    ctaTitle: 'An operation in preparation?',
    ctaText: 'Tell us about your project: we will propose a tailored project management and monitoring assignment.',
  },
};

const PHASE_STYLE = [
  'border-slate-200 text-primary-800',
  'border-secondary-200 bg-secondary-50 text-secondary-700',
  'border-slate-200 text-slate-500',
];

export const ChantierSuiviView: React.FC<{ language: Language }> = ({ language }) => {
  const lang = lng(language);
  const t = ChantierT[lang];
  return (
    <div className="bg-slate-50">
      <JsonLd
        path="/chantier-suivi"
        name="Maîtrise d'œuvre et suivi environnemental de chantier avec espace de suivi partagé"
        serviceType="Maîtrise d'œuvre, AMO et suivi environnemental de travaux de démolition, désamiantage, déplombage, dépollution et renaturation"
        description={ChantierT.fr.lead}
        faq={CHANTIER_FAQ.fr}
      />
      <section className="bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-stretch">
          <div className="flex-[999_1_520px] min-w-0 px-4 sm:px-6 lg:px-8 pt-12 pb-16">
            <Breadcrumb lang={lang} label={t.crumb} light />
            <Kicker light>{t.kicker}</Kicker>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mt-3 mb-5">{t.h1}</h1>
            <p className="text-lg md:text-xl text-secondary-100 leading-relaxed mb-8 max-w-2xl">{t.lead}</p>
            <HeroButtons label={t.btn} />
          </div>
          <img src="/images/offre-pelle-chantier.jpg" alt={t.imgAlt} className="flex-[1_1_420px] min-w-0 w-full min-h-[320px] object-cover" width={1400} height={933} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.who.map((w) => (
            <Card key={w.t} className="p-7">
              <w.Icon className="h-8 w-8 text-secondary-700" aria-hidden="true" />
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-1">{w.t}</h3>
              <p className="text-slate-600 leading-relaxed">{w.d}</p>
            </Card>
          ))}
        </section>

        <section className="flex flex-wrap gap-10 items-center">
          <div className="flex-[1_1_440px]">
            <Kicker>{t.moeKicker}</Kicker>
            <H2>{t.moeTitle}</H2>
            <p className="text-lg text-slate-600 leading-relaxed mb-3">{t.moeText}</p>
            <p className="text-slate-500">{t.moeSince}</p>
          </div>
          <ol className="flex-[1_1_440px] space-y-3">
            {t.moeSteps.map(([b, r], i) => (
              <li key={b} className="flex gap-4 items-center bg-white border border-slate-100 rounded-xl px-5 py-4">
                <span className="w-10 h-10 shrink-0 rounded-full bg-primary-100 text-primary-800 font-extrabold flex items-center justify-center">{i + 1}</span>
                <span className="text-slate-800"><strong>{b}</strong>{r}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-secondary-900 rounded-3xl px-6 md:px-10 py-12 text-white flex flex-wrap gap-10 items-center">
          <div className="flex-[1_1_360px]">
            <Kicker light>{t.numKicker}</Kicker>
            <H2 light>{t.numTitle}</H2>
            <ul className="list-disc pl-5 space-y-2 text-secondary-100 leading-relaxed">{t.numList.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <figure className="flex-[1_1_460px] min-w-0">
            <div className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /><span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="ml-2 text-xs font-semibold text-slate-600">{t.mock.title}</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs font-semibold text-slate-500">{t.mock.prog}</span><div className="h-2 bg-slate-200 rounded-full mt-2"><div className="h-2 w-[62%] bg-sky-600 rounded-full" /></div></div>
                  <div className="bg-slate-50 rounded-lg p-3"><span className="text-xs font-semibold text-slate-500">{t.mock.conf}</span><div className="h-2 bg-slate-200 rounded-full mt-2"><div className="h-2 w-[88%] bg-primary-600 rounded-full" /></div></div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500">{t.mock.frise}</span>
                  <div className="flex items-center mt-3" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <React.Fragment key={i}>
                        <span className={`w-4 h-4 rounded-full shrink-0 ${i < 2 ? 'bg-primary-600' : i === 2 ? 'bg-white border-[3px] border-sky-600' : 'bg-slate-200'}`} />
                        {i < 4 && <span className={`flex-1 h-[3px] ${i < 2 ? 'bg-primary-600' : 'bg-slate-200'}`} />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-1 mt-2 text-[10px] leading-tight text-slate-500">
                    {t.mock.jalons.map((j, i) => <span key={j} className={i === 0 ? '' : i === 4 ? 'text-right' : 'text-center'}>{j}</span>)}
                  </div>
                </div>
                <div className="space-y-2">
                  {t.mock.phases.map(([p, s], i) => (
                    <div key={p} className={`flex justify-between items-center px-3 py-2.5 border rounded-lg text-sm ${PHASE_STYLE[i]}`}>
                      <span className="text-slate-800">{p}</span><span className="font-bold">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="text-xs text-secondary-200 mt-3 text-center">{t.mock.caption}</figcaption>
          </figure>
        </section>

        <Card className="md:p-10">
          <Kicker>{t.lotsKicker}</Kicker>
          <H2 className="mb-6">{t.lotsTitle}</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.lots.map((l, i) => (
              <div key={l} className="border border-primary-200 bg-primary-50 rounded-xl p-4">
                <strong className="text-primary-800">L{i}</strong>
                <p className="mt-1 text-slate-800">{l}</p>
              </div>
            ))}
          </div>
        </Card>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-2xl font-extrabold text-secondary-900 mb-5">{t.getTitle}</h2>
            <CheckList items={t.get} />
          </Card>
          <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-8">
            <h2 className="text-2xl font-extrabold text-secondary-900 mb-3">{t.indepTitle}</h2>
            <p className="text-slate-700 leading-relaxed">{t.indep}</p>
          </div>
        </section>

        <FaqBlock lang={lang} items={CHANTIER_FAQ[lang]} />
        <Cta lang={lang} title={t.ctaTitle} text={t.ctaText} />
        <Related lang={lang} links={[{ to: '/amiante-plomb', fr: 'Amiante & Plomb', en: 'Asbestos & lead' }, { to: '/depollution', fr: 'Dépollution', en: 'Remediation' }, { to: '/carbone-operation', fr: "Carbone d'opération", en: 'Operation carbon' }]} />
      </div>
    </div>
  );
};
