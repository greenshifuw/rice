import React from 'react';
import { Language } from '../../types';

interface ActivitiesViewProps {
  language: Language;
}

const ACTIVITY_CATEGORIES = [
  {
    // Image : Consulting environnemental, réunion avec végétation au premier plan
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    fr: {
      name: "Assistance & Conseil",
      items: [
        "Assistance à Maîtrise d'Ouvrage (AMO)",
        "Stratégie RSE et bilans carbone",
        "Gestion des Installations Classées (ICPE)",
        "Audit de conformité réglementaire"
      ]
    },
    en: {
      name: "Assistance & Consulting",
      items: [
        "Project Ownership Assistance (AMO)",
        "CSR strategy and carbon footprints",
        "Classified Installations Management (ICPE)",
        "Regulatory compliance audit"
      ]
    }
  },
  {
    // Image : Chantier, terre, technique
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    fr: {
      name: "Études Techniques",
      items: [
        "Diagnostics amiante et plomb",
        "Études d'impact environnemental",
        "Plans de gestion des déchets de chantier",
        "Ingénierie de la dépollution"
      ]
    },
    en: {
      name: "Technical Studies",
      items: [
        "Asbestos and lead diagnostics",
        "Environmental impact studies",
        "Construction waste management plans",
        "Depollution engineering"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    fr: {
      name: "Nature & Ville",
      items: [
        "Agriculture urbaine et toitures végétalisées",
        "Renaturation de friches industrielles",
        "Création de jardins temporaires",
        "Intégration paysagère"
      ]
    },
    en: {
      name: "Nature & City",
      items: [
        "Urban agriculture and green roofs",
        "Renaturation of industrial wastelands",
        "Creation of temporary gardens",
        "Landscape integration"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    fr: {
      name: "Imagerie & Innovation",
      items: [
        "Photogrammétrie par drone",
        "Modélisation 3D de sites",
        "Inspection thermique aérienne",
        "Suivi de chantier par imagerie"
      ]
    },
    en: {
      name: "Imagery & Innovation",
      items: [
        "Drone photogrammetry",
        "3D site modeling",
        "Aerial thermal inspection",
        "Site monitoring via imagery"
      ]
    }
  }
];

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ language }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80";
  };

  const tTitle = language === 'fr' ? "Nos Activités" : "Our Activities";

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">{tTitle}</h2>
        
        <div className="space-y-24">
          {ACTIVITY_CATEGORIES.map((cat, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl bg-slate-200">
                  <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-primary-900/0 transition-all duration-500 z-10"></div>
                  <img 
                    src={cat.image} 
                    alt={cat[language].name} 
                    onError={handleImageError}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-bold text-slate-800 mb-6 border-l-4 border-primary-500 pl-4">{cat[language].name}</h3>
                <ul className="space-y-4">
                  {cat[language].items.map((item, i) => (
                    <li key={i} className="flex items-center text-lg text-slate-600">
                      <span className="h-2 w-2 bg-primary-500 rounded-full mr-4"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};