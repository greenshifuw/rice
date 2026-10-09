import React, { useEffect, useRef, useState } from 'react';
import { Map, Award, Users } from 'lucide-react';
import { Language } from '../../types';

// Page Stratégies animée.
// Les animations se déclenchent une seule fois, quand chaque bloc entre à l'écran.
// Le contenu reste visible sans JavaScript (pré-rendu) et pour les visiteurs qui
// ont demandé à réduire les animations (prefers-reduced-motion).
//
// Données :
// - Consommation d'ENAF : Cerema, jeu « du 1er janvier 2011 au 1er janvier 2025 » (data.gouv.fr,
//   màj 24/07/2026), fichier conso_com_974. Valeurs du fichier en m², converties en hectares.
// - Températures : Météo-France, données climatologiques de base mensuelles, département 974,
//   station 97422440 Plaine des Cafres (1 560 m). Moyenne des années complètes, par décennie.
// - ZAN : loi n° 2021-1104 du 22 août 2021 (Banque des Territoires, 14/02/2022).

interface StrategyViewProps {
  language: Language;
}

type Lang = 'fr' | 'en';

/* ---------- Apparition au défilement ---------- */

function useReveal<T extends HTMLElement>(): [React.RefObject<T>, boolean, boolean] {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false); // false au pré-rendu : tout reste visible
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    setArmed(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, armed, seen];
}

const revealCls = (armed: boolean, seen: boolean) =>
  armed ? `transition-all duration-700 ease-out ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}` : '';

/* ---------- Données ---------- */

const ENAF_YEARS: [number, number][] = [
  [2011, 269.4], [2012, 264.7], [2013, 219.0], [2014, 227.4], [2015, 253.3], [2016, 277.0], [2017, 242.2],
  [2018, 261.2], [2019, 157.8], [2020, 184.8], [2021, 162.9], [2022, 148.9], [2023, 200.9], [2024, 134.1],
];
const ENAF_COMMUNES: [string, number][] = [
  ['Saint-Paul', 498.0], ['Saint-Pierre', 322.1], ['Le Tampon', 277.6], ['Saint-Denis', 189.7], ['Sainte-Marie', 181.4],
  ['Saint-Louis', 156.2], ['Saint-Joseph', 141.2], ['Saint-Leu', 137.0], ['La Possession', 124.5], ['Saint-Benoît', 124.4],
];
const TEMPS: [string, number][] = [
  ['1960', 13.22], ['1970', 13.42], ['1980', 13.55], ['1990', 13.67], ['2000', 14.14], ['2010', 14.79], ['2020', 14.9],
];
const TAGS = ['PLU', 'SCoT', 'ZAC', 'SFN', 'HQE', 'BREEAM', 'LEED', 'Plan Climat', 'Agenda 21'];

const T = {
  fr: {
    kicker: 'Collectivités · Aménageurs · Territoires',
    title: 'Stratégies & Accompagnement',
    subtitle: "Nous aidons les collectivités et acteurs du territoire à bâtir l'avenir.",
    yearsLabel: "ans d'expérience",
    yearsSub: 'au service du territoire, depuis 2008',
    cards: [
      { title: 'Planification Territoriale', text: "R.I.C.E accompagne les collectivités dans l'élaboration de leurs documents d'urbanisme (<strong>PLU, ZAC, SCoT</strong>). Nous veillons à l'intégration des <em>Solutions Fondées sur la Nature</em> pour rendre les territoires plus résilients face au changement climatique." },
      { title: 'Certifications & Labels', text: "Nous apportons notre expertise technique pour le montage de projets visant des certifications environnementales exigeantes telles que <strong>HQE, BREEAM, LEED</strong>. Nous assurons le suivi des performances tout au long du projet." },
      { title: 'Concertation & Impact', text: "Parce qu'un projet durable est aussi un projet socialement accepté, nous participons aux stratégies de concertation et aidons à maximiser l'impact positif des projets sur les populations locales (Plans Climat, Agenda 21)." },
    ],
    stepsKicker: 'Notre démarche',
    stepsTitle: "De l'état des lieux au suivi",
    steps: [['Diagnostic', 'État des lieux du territoire'], ['Stratégie', 'Orientations et scénarios'], ['Concertation', 'Élus, services, habitants'], ['Mise en œuvre', 'Projets et documents'], ['Suivi', 'Indicateurs et ajustements']],
    tagsTitle: 'Documents, démarches et référentiels',
    tagsNote: 'HQE, BREEAM et LEED sont des marques de leurs titulaires respectifs. SFN : solutions fondées sur la nature.',
    zanKicker: 'Zéro artificialisation nette',
    zanTitle: 'Une trajectoire fixée par la loi',
    zanText: "Diviser par deux le rythme de consommation d'espaces sur les dix premières années, puis atteindre zéro artificialisation nette en 2050.",
    zanSrc: 'Loi n° 2021-1104 du 22 août 2021 — source : Banque des Territoires, 14 février 2022. Courbe indicative en indice (rythme de départ = 100), sans valeurs absolues ; le tracé entre 2031 et 2050 est simplifié.',
    zanAria: 'Trajectoire indicative : rythme de consommation indice 100, divisé par deux en dix ans, puis zéro artificialisation nette en 2050',
    zanRef: 'Période de référence',
    zanHalf: '÷ 2 en 10 ans',
    enafKicker: 'La Réunion en chiffres',
    enafTitle: 'Espaces naturels, agricoles et forestiers consommés',
    tabYears: 'Par année',
    tabCom: 'Par commune',
    capYears: '≈ 236 ha consommés par an en moyenne de 2011 à 2020, ≈ 162 ha par an de 2021 à 2024. Total 2011-2024 : ≈ 3 004 ha.',
    capCom: "Les 10 communes ayant le plus consommé d'espaces naturels, agricoles et forestiers entre 2011 et 2024 (cumul, en hectares).",
    enafSrc: "Source : Cerema, « Consommation d'espaces naturels, agricoles et forestiers du 1er janvier 2011 au 1er janvier 2025 », data.gouv.fr, mis à jour le 24 juillet 2026. Valeurs en hectares.",
    climKicker: 'Résilience climatique',
    climTitle: '+1,7 °C entre les années 1960 et 2020 à la Plaine-des-Cafres',
    climText: 'Température moyenne annuelle par décennie, station Météo-France de la Plaine-des-Cafres (Le Tampon, 1 560 m).',
    climSrc: 'Source : Météo-France, données climatologiques de base mensuelles, département 974 (data.gouv.fr). Calcul R.I.C.E : moyenne des années complètes ; 1960 = 1965-1969, 2020 = 2020-2024 ; données de station brutes, non homogénéisées.',
    climScale: 'Échelle des barres à partir de 12 °C.',
  },
  en: {
    kicker: 'Local authorities · Developers · Territories',
    title: 'Strategies & Support',
    subtitle: 'We help communities and regional actors build the future.',
    yearsLabel: 'years of experience',
    yearsSub: 'serving the territory since 2008',
    cards: [
      { title: 'Territorial Planning', text: 'R.I.C.E supports communities in developing their urban planning documents (<strong>PLU, ZAC, SCoT</strong>). We ensure the integration of <em>Nature-Based Solutions</em> to make territories more resilient to climate change.' },
      { title: 'Certifications & Labels', text: 'We provide our technical expertise for setting up projects aiming for demanding environmental certifications such as <strong>HQE, BREEAM, LEED</strong>. We monitor performance throughout the project.' },
      { title: 'Consultation & Impact', text: 'Because a sustainable project is also a socially accepted project, we participate in consultation strategies and help maximize the positive impact of projects on local populations (Climate Plans, Agenda 21).' },
    ],
    stepsKicker: 'Our approach',
    stepsTitle: 'From baseline to follow-up',
    steps: [['Assessment', 'Territory baseline'], ['Strategy', 'Directions and scenarios'], ['Consultation', 'Elected officials, services, residents'], ['Implementation', 'Projects and documents'], ['Follow-up', 'Indicators and adjustments']],
    tagsTitle: 'Documents, processes and standards',
    tagsNote: 'HQE, BREEAM and LEED are trademarks of their respective owners. SFN: nature-based solutions.',
    zanKicker: 'Zero net land take',
    zanTitle: 'A trajectory set by law',
    zanText: 'Halve the pace of land consumption over the first ten years, then reach zero net land take by 2050.',
    zanSrc: 'French law no. 2021-1104 of 22 August 2021 — source: Banque des Territoires, 14 February 2022. Indicative curve as an index (starting pace = 100), no absolute values; the 2031–2050 line is simplified.',
    zanAria: 'Indicative trajectory: consumption pace index 100, halved in ten years, then zero net land take by 2050',
    zanRef: 'Reference period',
    zanHalf: '÷ 2 in 10 years',
    enafKicker: 'Réunion in figures',
    enafTitle: 'Natural, agricultural and forest land consumed',
    tabYears: 'By year',
    tabCom: 'By municipality',
    capYears: '≈ 236 ha consumed per year on average from 2011 to 2020, ≈ 162 ha per year from 2021 to 2024. Total 2011–2024: ≈ 3,004 ha.',
    capCom: 'The 10 municipalities that consumed the most natural, agricultural and forest land between 2011 and 2024 (cumulative, in hectares).',
    enafSrc: 'Source: Cerema, “Consommation d’espaces naturels, agricoles et forestiers du 1er janvier 2011 au 1er janvier 2025”, data.gouv.fr, updated 24 July 2026. Values in hectares.',
    climKicker: 'Climate resilience',
    climTitle: '+1.7 °C between the 1960s and the 2020s at Plaine-des-Cafres',
    climText: 'Mean annual temperature by decade, Météo-France Plaine-des-Cafres station (Le Tampon, 1,560 m).',
    climSrc: 'Source: Météo-France, monthly basic climate data, département 974 (data.gouv.fr). R.I.C.E calculation: mean of complete years; 1960s = 1965–1969, 2020s = 2020–2024; raw station data, not homogenised.',
    climScale: 'Bar scale starts at 12 °C.',
  },
};

const CARD_STYLE = [
  { Icon: Map, bar: 'bg-primary-500', icon: 'text-primary-600' },
  { Icon: Award, bar: 'bg-secondary-500', icon: 'text-secondary-600' },
  { Icon: Users, bar: 'bg-amber-500', icon: 'text-amber-600' },
];
const TAG_STYLE = ['bg-primary-100 text-primary-800', 'bg-secondary-100 text-secondary-800', 'bg-amber-100 text-amber-900'];

/* ---------- Blocs ---------- */

const Counter: React.FC<{ target: number; run: boolean }> = ({ target, run }) => {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(target); return; }
    setN(0);
    let v = 0;
    const id = setInterval(() => { v += 1; setN(Math.min(v, target)); if (v >= target) clearInterval(id); }, 70);
    return () => clearInterval(id);
  }, [run, target]);
  return <>{n}</>;
};

const Bars: React.FC<{ items: { label: string; value: number; display: string; color: string }[]; max: number; run: boolean; height: number; minVal?: number }> = ({ items, max, run, height, minVal = 0 }) => (
  <div>
    <div className="flex items-end gap-1.5 sm:gap-2 border-b border-slate-300" style={{ height }}>
      {items.map((b, i) => {
        const h = Math.round(((b.value - minVal) / (max - minVal)) * (height - 28));
        return (
          <div key={b.label} className="flex-1 min-w-0 h-full flex flex-col items-center justify-end">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 mb-1 whitespace-nowrap">{b.display}</span>
            <div
              className={`w-full max-w-[46px] rounded-t-md ${b.color}`}
              style={{ height: run ? h : 0, transition: `height 0.9s cubic-bezier(.2,.8,.2,1) ${i * 0.05}s` }}
            />
          </div>
        );
      })}
    </div>
    <div className="flex gap-1.5 sm:gap-2 mt-1.5">
      {items.map((b) => (
        <span key={b.label} className="flex-1 min-w-0 text-center text-[10px] sm:text-xs text-slate-500 truncate" title={b.label}>{b.label}</span>
      ))}
    </div>
  </div>
);

export const StrategyView: React.FC<StrategyViewProps> = ({ language }) => {
  const lang: Lang = language === 'en' ? 'en' : 'fr';
  const t = T[lang];
  const years = new Date().getFullYear() - 2008;

  const [heroRef, heroArmed, heroSeen] = useReveal<HTMLDivElement>();
  const [cardsRef, cardsArmed, cardsSeen] = useReveal<HTMLDivElement>();
  const [stepsRef, , stepsSeen] = useReveal<HTMLDivElement>();
  const [tagsRef, tagsArmed, tagsSeen] = useReveal<HTMLDivElement>();
  const [zanRef, zanArmed, zanSeen] = useReveal<HTMLDivElement>();
  const [enafRef, , enafSeen] = useReveal<HTMLDivElement>();
  const [climRef, climArmed, climSeen] = useReveal<HTMLDivElement>();

  const [step, setStep] = useState(5);
  useEffect(() => {
    if (!stepsSeen) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setStep(5); return; }
    setStep(0);
    let s = 0;
    const id = setInterval(() => { s += 1; setStep(s); if (s >= 5) clearInterval(id); }, 600);
    return () => clearInterval(id);
  }, [stepsSeen]);

  const [tab, setTab] = useState<'years' | 'com'>('years');
  const [barsKey, setBarsKey] = useState(0);
  const [barsRun, setBarsRun] = useState(true);
  useEffect(() => { setBarsRun(enafSeen); }, [enafSeen]);
  const switchTab = (k: 'years' | 'com') => {
    if (k === tab) return;
    setTab(k);
    setBarsRun(false);
    setBarsKey((x) => x + 1);
    setTimeout(() => setBarsRun(true), 60);
  };

  const fmt = (v: number) => Math.round(v).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB');
  const enafItems = tab === 'years'
    ? ENAF_YEARS.map(([y, v]) => ({ label: String(y), value: v, display: fmt(v), color: y >= 2021 ? 'bg-primary-600' : 'bg-sky-600' }))
    : ENAF_COMMUNES.map(([n, v]) => ({ label: n, value: v, display: fmt(v), color: n === 'Le Tampon' ? 'bg-primary-600' : 'bg-sky-600' }));
  const tempItems = TEMPS.map(([l, v]) => ({
    label: lang === 'fr' ? `${l}` : `${l}s`,
    value: v,
    display: `${v.toFixed(1).replace('.', lang === 'fr' ? ',' : '.')} °C`,
    color: v >= 14.5 ? 'bg-orange-600' : v >= 14 ? 'bg-amber-500' : 'bg-amber-400',
  }));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero + compteur */}
      <section className="bg-secondary-900 text-white">
        <div ref={heroRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-wrap gap-10 items-center justify-between">
          <div className={`flex-[999_1_520px] ${revealCls(heroArmed, heroSeen)}`}>
            <span className="text-sm font-bold tracking-wider uppercase text-primary-300">{t.kicker}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4">{t.title}</h1>
            <p className="text-lg md:text-xl text-secondary-100">{t.subtitle}</p>
          </div>
          <div className={`flex-none bg-white/10 border border-white/20 rounded-2xl px-9 py-7 text-center ${revealCls(heroArmed, heroSeen)}`} style={{ transitionDelay: '0.2s' }}>
            <div className="text-6xl md:text-7xl font-extrabold leading-none text-primary-300"><Counter target={years} run={heroSeen} /></div>
            <div className="text-secondary-100 mt-2">{t.yearsLabel}<br />{t.yearsSub}</div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* 1. Les trois cartes */}
        <div ref={cardsRef} className="space-y-6">
          {t.cards.map((c, i) => {
            const st = CARD_STYLE[i];
            return (
              <article
                key={c.title}
                className={`relative overflow-hidden bg-white p-8 pl-11 rounded-2xl shadow-sm ${revealCls(cardsArmed, cardsSeen)}`}
                style={{ transitionDelay: `${0.15 + i * 0.2}s` }}
              >
                <span
                  className={`absolute left-0 top-0 bottom-0 w-2 ${st.bar} origin-top`}
                  style={cardsArmed ? { transform: cardsSeen ? 'scaleY(1)' : 'scaleY(0)', transition: `transform 0.9s ease-out ${0.15 + i * 0.2}s` } : undefined}
                />
                <div className="flex items-start mb-4">
                  <st.Icon className={`h-8 w-8 ${st.icon} mr-4 shrink-0`} aria-hidden="true" />
                  <h2 className="text-2xl font-bold text-slate-800">{c.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.text }} />
              </article>
            );
          })}
        </div>

        {/* 2. Démarche en étapes */}
        <section ref={stepsRef} className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
          <span className="text-sm font-bold tracking-wider uppercase text-primary-700">{t.stepsKicker}</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-900 mt-2 mb-8">{t.stepsTitle}</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-0">
            {t.steps.map(([title, desc], i) => {
              const on = i < step;
              const lineOn = i + 1 < step;
              return (
                <li key={title} className="relative flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2.5">
                  {i < 4 && <span className={`hidden sm:block absolute top-[22px] left-1/2 w-full h-1 transition-colors duration-500 ${lineOn ? 'bg-primary-600' : 'bg-slate-200'}`} aria-hidden="true" />}
                  <span className={`relative shrink-0 w-12 h-12 rounded-full font-extrabold flex items-center justify-center transition-all duration-500 ${on ? 'bg-primary-600 text-white ring-[6px] ring-primary-100' : 'bg-white text-slate-400 ring-2 ring-slate-200'}`}>{i + 1}</span>
                  <span className="flex flex-col sm:items-center">
                    <strong className="text-slate-800">{title}</strong>
                    <span className="text-sm text-slate-500 sm:px-2">{desc}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* 3. Pastilles */}
        <section ref={tagsRef} className="text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-secondary-900 mb-5">{t.tagsTitle}</h2>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {TAGS.map((g, i) => (
              <span
                key={g}
                className={`px-4 py-2.5 rounded-full font-semibold ${TAG_STYLE[i % 3]}`}
                style={tagsArmed ? { opacity: tagsSeen ? 1 : 0, transform: tagsSeen ? 'scale(1)' : 'scale(0.6)', transition: `all 0.45s cubic-bezier(.3,1.6,.5,1) ${i * 0.08}s` } : undefined}
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">{t.tagsNote}</p>
        </section>

        {/* 4. Courbe ZAN */}
        <section ref={zanRef} className="bg-secondary-900 rounded-3xl p-8 md:p-10 text-white flex flex-wrap gap-9 items-center">
          <div className="flex-[1_1_320px]">
            <span className="text-sm font-bold tracking-wider uppercase text-primary-300">{t.zanKicker}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-3">{t.zanTitle}</h2>
            <p className="text-secondary-100 leading-relaxed mb-3">{t.zanText}</p>
            <p className="text-xs text-secondary-200">{t.zanSrc}</p>
          </div>
          <figure className="flex-[1_1_480px] min-w-0 m-0 bg-white rounded-xl p-5">
            <svg viewBox="0 0 520 240" className="w-full h-auto block" role="img" aria-label={t.zanAria}>
              <line x1="50" y1="200" x2="500" y2="200" stroke="#cbd5e1" />
              <line x1="50" y1="30" x2="50" y2="200" stroke="#cbd5e1" />
              <text x="40" y="34" fontSize="11" fill="#64748b" textAnchor="end">100</text>
              <text x="40" y="119" fontSize="11" fill="#64748b" textAnchor="end">50</text>
              <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">0</text>
              <line x1="50" y1="115" x2="500" y2="115" stroke="#e2e8f0" strokeDasharray="4 4" />
              <path
                d="M50 30 L160 30 L160 115 L270 115 L479 200"
                fill="none" stroke="#46852b" strokeWidth="4" strokeLinejoin="round"
                strokeDasharray="900"
                style={zanArmed ? { strokeDashoffset: zanSeen ? 0 : 900, transition: 'stroke-dashoffset 2.2s ease-out' } : { strokeDashoffset: 0 }}
              />
              <circle cx="479" cy="200" r="7" fill="#0c4a6e" />
              <text x="105" y="22" fontSize="12" fill="#0f172a" textAnchor="middle">{t.zanRef}</text>
              <text x="215" y="107" fontSize="12" fill="#0f172a" textAnchor="middle">{t.zanHalf}</text>
              <text x="465" y="188" fontSize="12" fontWeight="700" fill="#0c4a6e" textAnchor="end">ZAN 2050</text>
              <text x="50" y="222" fontSize="11" fill="#64748b">2011</text>
              <text x="160" y="222" fontSize="11" fill="#64748b" textAnchor="middle">2021</text>
              <text x="270" y="222" fontSize="11" fill="#64748b" textAnchor="middle">2031</text>
              <text x="479" y="222" fontSize="11" fill="#64748b" textAnchor="middle">2050</text>
            </svg>
          </figure>
        </section>

        {/* 5. Histogramme ENAF Réunion */}
        <section ref={enafRef} className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between items-end mb-6">
            <div>
              <span className="text-sm font-bold tracking-wider uppercase text-primary-700">{t.enafKicker}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-900 mt-2">{t.enafTitle}</h2>
            </div>
            <div role="tablist" className="flex gap-1.5 bg-slate-100 rounded-full p-1">
              {(['years', 'com'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => switchTab(k)}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition ${tab === k ? 'bg-secondary-900 text-white' : 'text-slate-700 hover:bg-white'}`}
                >
                  {k === 'years' ? t.tabYears : t.tabCom}
                </button>
              ))}
            </div>
          </div>
          <Bars key={barsKey} items={enafItems} max={tab === 'years' ? 280 : 500} run={barsRun} height={260} />
          <p className="text-slate-700 font-semibold mt-4 mb-1">{tab === 'years' ? t.capYears : t.capCom}</p>
          <p className="text-xs text-slate-500">{t.enafSrc}</p>
        </section>

        {/* 6. Climat */}
        <section ref={climRef} className="flex flex-wrap gap-8 items-center">
          <div className="flex-[1_1_340px]">
            <span className="text-sm font-bold tracking-wider uppercase text-primary-700">{t.climKicker}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-900 mt-2 mb-3">{t.climTitle}</h2>
            <p className="text-slate-600 leading-relaxed mb-3">{t.climText}</p>
            <p className="text-xs text-slate-500">{t.climSrc}</p>
          </div>
          <div className="flex-[1_1_480px] min-w-0 bg-white rounded-2xl p-6 md:p-7 shadow-sm">
            <Bars items={tempItems} max={15.2} minVal={12} run={!climArmed || climSeen} height={230} />
            <p className="text-[11px] text-slate-500 mt-2.5">{t.climScale}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
