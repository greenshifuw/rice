import React from 'react';
import { Sprout, Lightbulb, FileCheck, HardHat, LayoutDashboard } from 'lucide-react';
import { Language } from '../../types';

interface ServicesViewProps {
  language: Language;
}

const RAW_SERVICES = [
  {
    icon: <Sprout className="h-8 w-8 text-white" />,
    color: "bg-green-600",
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
    icon: <FileCheck className="h-8 w-8 text-white" />,
    color: "bg-indigo-500",
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
    icon: <HardHat className="h-8 w-8 text-white" />,
    color: "bg-orange-500",
    fr: {
      title: "ATMO & MOE",
      description: "Maîtrise d'œuvre amiante, plomb, démolition et dépollution. Gestion des risques sanitaires et suivi de chantier spécialisé."
    },
    en: {
      title: "Project Management & Remediation",
      description: "Project management for asbestos, lead, demolition, and depollution. Health risk management and specialized site supervision."
    }
  },
  {
    icon: <RecycleIcon className="h-8 w-8 text-white" />,
    color: "bg-amber-500",
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
    icon: <Lightbulb className="h-8 w-8 text-white" />,
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
    icon: <LayoutDashboard className="h-8 w-8 text-white" />,
    color: "bg-cyan-600",
    fr: {
      title: "Digitalisation & Tableaux de bord",
      description: "Conception de tableaux de bord numériques sur mesure pour piloter efficacement votre DUERP, vos certifications ISO, votre démarche QHSE/QSE et la gestion de vos déchets."
    },
    en: {
      title: "Digitalization & Dashboards",
      description: "Design of custom digital dashboards to effectively manage your risk assessments, ISO certifications, QHSE processes, and waste management."
    }
  }
];

// Helper component for icon
function RecycleIcon({className}: {className?: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784l1.326-2.296 1.5 2.607M3.75 6H7m0 0 3-4h4.5m-7.5 4L7 10m9-4 1.5 2.607-1.5 2.607m1.285-5.214 1.326-2.296A1.785 1.785 0 0 0 19.39 2.12a1.83 1.83 0 0 0-1.57-.881H14.5M16 10h-2.5m2.5 0 3 4M7 19l1.5-2.607-1.5-2.607M7 19h7.5m0 0 1.57.881a1.83 1.83 0 0 0 1.57-.881 1.785 1.785 0 0 0 .004-1.784L17.5 16m0 0-3-4"/></svg>
    )
}

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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">{t.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedServices.map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className={`${service.color} p-6 flex justify-center items-center h-32 group-hover:scale-105 transition-transform duration-500`}>
                {service.icon}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
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