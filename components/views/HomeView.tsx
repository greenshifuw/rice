import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Leaf, BarChart3, Box, Cpu, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../../types';

interface HomeViewProps {
  language: Language;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1518005052357-e9871951f3a2?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1449824913929-49aa7649720b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1622383563227-0440114a68d1?auto=format&fit=crop&w=1920&q=80"
];

export const HomeView: React.FC<HomeViewProps> = ({ language }) => {
  const [heroImage, setHeroImage] = useState(HERO_IMAGES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    setHeroImage(HERO_IMAGES[randomIndex]);
  }, []);

  const handleImageError = () => {
    setHeroImage(HERO_IMAGES[0]);
  };

  const content = {
    fr: {
      badge: "Expert en Ingénierie Environnementale depuis 2008",
      heroTitlePrefix: "Bureau d'études environnement",
      heroTitleSuffix: "à La Réunion",
      heroTagline: "Études, projets, conseils… Notre mission est de vous accompagner !",
      heroDesc: "Basé au Tampon, R.I.C.E aide les organisations à intégrer le développement durable dans leurs activités, quel que soit le secteur, en garantissant une qualité environnementale optimale.",
      btnContact: "Contactez-nous",
      btnServices: "Découvrir nos services",
      domainsTitle: "Nos Domaines d'Intervention",
      domainsDesc: "Une expertise globale pour répondre aux défis écologiques de La Réunion et d'ailleurs.",
      domains: [
        { title: "Assistance", desc: "Accompagnement réglementaire et technique pour vos projets." },
        { title: "Conseils", desc: "Stratégies durables et audits pour optimiser votre impact." },
        { title: "Études", desc: "Analyses approfondies, diagnostics et rapports d'expert." },
        { title: "Imagerie & 3D", desc: "Relevés par drone et modélisation pour une précision absolue." }
      ],
      digitalTitle: "Nos solutions numériques",
      digitalDesc: "Les outils numériques développés par R.I.C.E, indépendants et complémentaires, pour les bureaux d'études, maîtres d'œuvre, maîtres d'ouvrage et collectivités.",
      digital: [
        { name: "NUMERICE by R.I.C.E", desc: "La branche numérique de R.I.C.E : un outil dédié pour chaque expertise (RSE, QHSE, DUERP, suivi de travaux, émissions de GES).", url: "https://www.numerice.rice.re/" },
        { name: "NUMERICE BTP", desc: "Suivi de travaux et suivi environnemental des chantiers de démolition, désamiantage, déplombage, renaturation et dépollution.", url: "https://numericebtp.rice.re/" },
        { name: "RICO2", desc: "Logiciel de bilan des émissions de gaz à effet de serre (BEGES) pour entreprises et collectivités, conforme à la norme ISO 14064-1.", url: "https://rico2.rice.re/" }
      ],
      quote: "\"Notre vision est celle d'un monde où l'ingénierie sert la nature autant qu'elle sert l'homme. Intégrer le développement durable n'est plus une option, c'est la fondation de tout projet pérenne.\"",
      team: "L'Équipe R.I.C.E"
    },
    en: {
      badge: "Expert in Environmental Engineering since 2008",
      heroTitlePrefix: "Environmental consultancy",
      heroTitleSuffix: "in Reunion Island",
      heroTagline: "Studies, projects, consulting… Our mission is to support you!",
      heroDesc: "Based in Le Tampon, R.I.C.E helps organizations integrate sustainable development into their activities, regardless of the sector, ensuring optimal environmental quality.",
      btnContact: "Contact Us",
      btnServices: "Discover Our Services",
      domainsTitle: "Our Areas of Intervention",
      domainsDesc: "Global expertise to meet the ecological challenges of Reunion Island and beyond.",
      domains: [
        { title: "Assistance", desc: "Regulatory and technical support for your projects." },
        { title: "Consulting", desc: "Sustainable strategies and audits to optimize your impact." },
        { title: "Studies", desc: "In-depth analyses, diagnostics, and expert reports." },
        { title: "Imagery & 3D", desc: "Drone surveys and modeling for absolute precision." }
      ],
      digitalTitle: "Our digital solutions",
      digitalDesc: "Independent, complementary digital tools developed by R.I.C.E for consultancies, project managers, project owners and local authorities.",
      digital: [
        { name: "NUMERICE by R.I.C.E", desc: "R.I.C.E's digital branch: one dedicated tool for each field of expertise (CSR, QHSE, risk assessment, works monitoring, GHG emissions).", url: "https://www.numerice.rice.re/" },
        { name: "NUMERICE BTP", desc: "Works monitoring and environmental monitoring of demolition, asbestos removal, lead removal, renaturation and remediation sites.", url: "https://numericebtp.rice.re/" },
        { name: "RICO2", desc: "Greenhouse gas emissions reporting software for companies and local authorities, compliant with ISO 14064-1.", url: "https://rico2.rice.re/" }
      ],
      quote: "\"Our vision is of a world where engineering serves nature as much as it serves humanity. Integrating sustainable development is no longer an option, it is the foundation of any lasting project.\"",
      team: "The R.I.C.E Team"
    }
  };

  const t = content[language];
  const icons = [
    <CheckCircle className="h-8 w-8 text-primary-500" />,
    <BarChart3 className="h-8 w-8 text-secondary-500" />,
    <Box className="h-8 w-8 text-amber-600" />,
    <Cpu className="h-8 w-8 text-purple-600" />
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {/* MIX: Blue Globe Background (Secondary-900) */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-secondary-900">
        <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
          <img 
            src={heroImage}
            onError={handleImageError}
            alt="Paysage R.I.C.E - Environnement" 
            className="w-full h-full object-cover"
          />
          {/* Blue Overlay to simulate the Globe color */}
          <div className="absolute inset-0 bg-secondary-900/70 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* MIX: Green Badge for contrast */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary-400/30 bg-secondary-800/80 backdrop-blur-sm text-primary-200 mb-8 animate-fade-in-up">
            <Leaf className="h-4 w-4 mr-2 text-primary-400" />
            <span className="text-sm font-medium tracking-wide">{t.badge}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg">
            {t.heroTitlePrefix} <br/>
            {/* MIX: Highlight in Light Blue or Green? Green pops better on dark blue. */}
            <span className="text-primary-400">{t.heroTitleSuffix}</span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-white/90 mb-6 max-w-3xl mx-auto drop-shadow-md">
            {t.heroTagline}
          </p>
          
          <p className="text-lg md:text-xl text-secondary-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* MIX: Primary Action in Green (Nature) */}
            <Link 
              to="/contact"
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-primary-500/30 flex items-center justify-center"
            >
              {t.btnContact}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            {/* MIX: Secondary Action in Light Blue (Globe) */}
            <Link 
              to="/services"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg font-semibold transition-all flex items-center justify-center"
            >
              {t.btnServices}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Domains Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{t.domainsTitle}</h2>
            {/* Separator in Primary Green */}
            <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              {t.domainsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.domains.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
                <div className="bg-white rounded-xl p-4 inline-block shadow-sm mb-6 group-hover:bg-secondary-50 transition-colors">
                  {icons[idx]}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions numériques (liens vers NUMERICE, NUMERICE BTP, RICO2) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{t.digitalTitle}</h2>
            <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{t.digitalDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.digital.map((tool) => (
              <a
                key={tool.url}
                href={tool.url}
                target="_blank"
                rel="noopener"
                className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{tool.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{tool.desc}</p>
                <span className="inline-flex items-center text-primary-600 font-semibold">
                  {tool.url.replace('https://', '').replace(/\/$/, '')}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quote/Vision Section */}
      {/* MIX: Background Secondary (Blue), Icon Primary (Green) */}
      <section className="py-20 bg-secondary-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Leaf className="h-64 w-64 text-primary-500" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-secondary-50">
            {t.quote}
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
             <div className="h-px w-12 bg-primary-500"></div>
             <span className="uppercase tracking-widest text-sm font-semibold text-primary-400">{t.team}</span>
             <div className="h-px w-12 bg-primary-500"></div>
          </div>
        </div>
      </section>
    </div>
  );
};