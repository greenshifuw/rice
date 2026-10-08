
import React from 'react';
import {
  HardHat, Construction, TrafficCone,
  ChartNoAxesCombined, Gauge, MonitorCog,
  Recycle, Infinity as InfinityIcon,
  ClipboardCheck, FileSearch, Landmark,
  Lightbulb, Factory, Cog,
  Bird, Trees, Leaf,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../../types';

interface ServicesViewProps {
  language: Language;
}

const RAW_SERVICES = [
  {
    icon: <><Bird className="h-8 w-8 text-white" /><Trees className="h-8 w-8 text-white" /><Leaf className="h-8 w-8 text-white" /></>,
    color: "bg-green-600",
    pages: [
      { to: "/renaturation-biodiversite", fr: "Renaturation & biodiversité", en: "Renaturation & biodiversity" }
    ],
    fr: {
      title: "Renaturation & Biodiversité",
      description: "Plans stratégiques de renaturation urbaine et intégration de la biodiversité dans le bâti."
    },
    en: {
      title: "Renaturation & Biodiversity",
      description: "Strategic plans for urban renaturation and integration of biodiversity into the built environment."
    }
  },
  {
    icon: <><ClipboardCheck className="h-8 w-8 text-white" /><FileSearch className="h-8 w-8 text-white" /><Landmark className="h-8 w-8 text-white" /></>,
    color: "bg-indigo-500",
    pages: [
      { to: "/etudes-reglementaires", fr: "ICPE, loi sur l'eau, études d'impact", en: "Regulatory studies" }
    ],
    fr: {
      title: "Études & Dossiers Réglementaires",
      description: "Gestion complète de vos dossiers ICPE, études d'impact, Loi sur l'eau et audits de conformité pour sécuriser vos activités."
    },
    en: {
      title: "Regulatory Studies & Files",
      description: "Complete management of ICPE files, impact studies, Water Law compliance, and audits to secure your activities."
    }
  },
  {
    icon: <><HardHat className="h-8 w-8 text-white" /><Construction className="h-8 w-8 text-white" /><TrafficCone className="h-8 w-8 text-white" /></>,
    color: "bg-orange-500",
    pages: [
      { to: "/amiante-plomb", fr: "Amiante et plomb : AMO et MOE", en: "Asbestos and lead" },
      { to: "/depollution", fr: "Dépollution et sols pollués", en: "Site remediation" },
      { to: "/chantier-suivi", fr: "Chantier suivi : MOE et suivi environnemental", en: "Monitored works" }
    ],
    fr: {
      title: "AMO & MOE",
      description: "Maîtrise d'œuvre amiante, plomb, démolition et dépollution. Gestion des risques sanitaires, suivi de chantier spécialisé et suivi environnemental des travaux."
    },
    en: {
      title: "Project Management & Remediation",
      description: "Project management for asbestos, lead, demolition, and depollution. Health risk management, specialized site supervision, and environmental monitoring of works."
    }
  },
  {
    icon: <><Recycle className="h-8 w-8 text-white" /><InfinityIcon className="h-8 w-8 text-white" /></>,
    color: "bg-amber-500",
    pages: [
      { to: "/biodechets", fr: "AMO tri à la source des biodéchets", en: "Biowaste sorting" }
    ],
    fr: {
      title: "Économie Circulaire",
      description: "Stratégies pour transformer les déchets en ressources et boucler les cycles de matière."
    },
    en: {
      title: "Circular Economy",
      description: "Strategies to transform waste into resources and close material cycles."
    }
  },
  {
    icon: <><Lightbulb className="h-8 w-8 text-white" /><Factory className="h-8 w-8 text-white" /><Cog className="h-8 w-8 text-white" /></>,
    color: "bg-purple-500",
    fr: {
      title: "Innovation Industrielle",
      description: "Conseil pour l'adaptation des processus industriels aux normes environnementales et à l'efficacité énergétique."
    },
    en: {
      title: "Industrial Innovation",
      description: "Consulting for adapting industrial processes to environmental standards and energy efficiency."
    }
  },
  {
    icon: <><ChartNoAxesCombined className="h-8 w-8 text-white" /><Gauge className="h-8 w-8 text-white" /><MonitorCog className="h-8 w-8 text-white" /></>,
    color: "bg-cyan-600",
    link: "https://www.numerice.rice.re",
    pages: [
      { to: "/carbone-operation", fr: "Carbone d'opération : mémoire et suivi des émissions de GES", en: "Operation carbon" }
    ],
    fr: {
      title: "Digitalisation & Tableaux de bord",
      description: "Conception de tableaux de bord numériques sur mesure pour piloter efficacement votre DUERP, vos certifications ISO, votre démarche QHSE/QSE et la gestion de vos déchets. Logiciel de calcul des émissions Carbone."
    },
    en: {
      title: "Digitalization & Dashboards",
      description: "Design of custom digital dashboards to effectively manage your risk assessments, ISO certifications, QHSE processes, and waste management. Carbon emissions calculation software."
    }
  }
];

export const ServicesView: React.FC<ServicesViewProps> = ({ language }) => {
  // Sort services alphabetically based on the current language title
  const sortedServices = [...RAW_SERVICES]
    .map(service => ({
      ...service,
      title: service[language].title,
      description: service[language].description
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const texts = {
    fr: {
      offer: "Notre Offre",
      title: "Prestations sur Mesure",
      subtitle: "De l'étude préliminaire à la mise en œuvre, nous couvrons tous les aspects de l'ingénierie environnementale.",
      themes: "Thématiques Couvertes",
      more: "En savoir plus",
      tags: [
        "Énergie Maîtrisée", "Santé Environnementale", "Smart Cities", 
        "Climat", "Croissance Durable", "Maîtrise des Consommations",
        "Sécurité Industrielle", "Conformité Réglementaire"
      ]
    },
    en: {
      offer: "Our Offer",
      title: "Tailored Services",
      subtitle: "From preliminary studies to implementation, we cover all aspects of environmental engineering.",
      themes: "Covered Themes",
      more: "Learn more",
      tags: [
        "Energy Management", "Environmental Health", "Smart Cities", 
        "Climate", "Sustainable Growth", "Consumption Control",
        "Industrial Safety", "Regulatory Compliance"
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">{t.offer}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">{t.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedServices.map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col">
              <div className={`${service.color} p-6 flex justify-center items-center gap-6 h-32 group-hover:scale-105 transition-transform duration-500 flex-shrink-0`}>
                {service.icon}
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                {(service as any).pages && (
                  <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-2">
                    {(service as any).pages.map((pg: any) => (
                      <Link key={pg.to} to={pg.to} className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition">
                        {pg[language]} →
                      </Link>
                    ))}
                  </div>
                )}
                {service.link && (
                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <a 
                      href={service.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition group/link"
                    >
                      {t.more}
                      <ExternalLink className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Themes List */}
        <div className="mt-20 pt-10 border-t border-slate-200">
           <h3 className="text-center text-xl font-semibold text-slate-700 mb-8">{t.themes}</h3>
           <div className="flex flex-wrap justify-center gap-3">
             {t.tags.map((tag, i) => (
               <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium hover:border-primary-400 hover:text-primary-600 transition cursor-default">
                 {tag}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};
