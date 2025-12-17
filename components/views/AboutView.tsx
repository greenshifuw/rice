import React from 'react';
import { ShieldCheck, Recycle, Target, Plane } from 'lucide-react';
import { Language } from '../../types';

interface AboutViewProps {
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  const content = {
    fr: {
      title: "Notre Histoire & Expertise",
      intro: "Fondé en 2008, R.I.C.E s'est imposé comme un acteur incontournable de l'ingénierie environnementale à La Réunion.",
      expYears: "Années d'expérience",
      sections: [
        {
          title: "Dépollution & Réhabilitation",
          text: "Notre cœur de métier historique. Nous intervenons sur la dépollution des sols, le désamiantage et la réhabilitation écologique des sites. Nous privilégions des techniques douces comme la phytoremédiation et le tri sélectif sur site pour minimiser l'impact carbone."
        },
        {
          title: "Écoconception & Low-tech",
          text: "Nous croyons en l'innovation sobre. Nous intégrons les principes d'économie circulaire et de design circulaire dès la phase de conception. La valorisation post-traitement, via des jardins temporaires ou des fermes urbaines, est une de nos signatures."
        },
        {
          title: "Technologie Drone (Depuis 2014)",
          text: "Pionniers dans l'utilisation de drones civils pour l'ingénierie, nous réalisons des relevés topographiques précis, de la photogrammétrie et de l'inspection thermique, permettant une analyse fine sans impacter le milieu."
        }
      ],
      pillarsTitle: "Nos Piliers d'Intervention",
      pillars: [
        "Accompagnement Réglementaire & Social",
        "Valorisation des Déchets",
        "Respect de la Biodiversité",
        "Gestion Amiante, Plomb & Pollution"
      ]
    },
    en: {
      title: "Our History & Expertise",
      intro: "Founded in 2008, R.I.C.E has established itself as a key player in environmental engineering in Reunion Island.",
      expYears: "Years of experience",
      sections: [
        {
          title: "Depollution & Rehabilitation",
          text: "Our historic core business. We intervene in soil remediation, asbestos removal, and ecological site rehabilitation. We favor gentle techniques like phytoremediation and on-site selective sorting to minimize carbon impact."
        },
        {
          title: "Ecodesign & Low-tech",
          text: "We believe in sober innovation. We integrate the principles of circular economy and circular design right from the design phase. Post-treatment valorization, via temporary gardens or urban farms, is one of our signatures."
        },
        {
          title: "Drone Technology (Since 2014)",
          text: "Pioneers in the use of civil drones for engineering, we perform precise topographic surveys, photogrammetry, and aerial thermal inspection, allowing for detailed analysis without impacting the environment."
        }
      ],
      pillarsTitle: "Our Pillars of Intervention",
      pillars: [
        "Regulatory & Social Support",
        "Waste Valorization",
        "Respect for Biodiversity",
        "Asbestos, Lead & Pollution Management"
      ]
    }
  };

  const t = content[language];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">{t.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t.intro}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" 
              alt="Bureau d'études R.I.C.E" 
              className="relative rounded-2xl shadow-2xl object-cover z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20 hidden md:block border border-slate-100">
               <div className="text-4xl font-bold text-primary-600">15+</div>
               <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{t.expYears}</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <ShieldCheck className="h-6 w-6 text-primary-500 mr-3" />
                {t.sections[0].title}
              </h3>
              <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.sections[0].text.replace('phytoremédiation', '<strong>phytoremédiation</strong>').replace('phytoremediation', '<strong>phytoremediation</strong>') }} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <Recycle className="h-6 w-6 text-secondary-500 mr-3" />
                {t.sections[1].title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{t.sections[1].text}</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <Plane className="h-6 w-6 text-purple-500 mr-3" />
                {t.sections[2].title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{t.sections[2].text}</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-slate-50 rounded-3xl p-12">
           <h3 className="text-2xl font-bold text-center mb-12 text-slate-800">{t.pillarsTitle}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.pillars.map((val, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:border-primary-200 transition h-full flex flex-col justify-center items-center">
                  <Target className="h-10 w-10 text-primary-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-slate-700">{val}</h4>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};