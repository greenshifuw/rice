import React from 'react';
import { Map, Award, Users } from 'lucide-react';
import { Language } from '../../types';

interface StrategyViewProps {
  language: Language;
}

export const StrategyView: React.FC<StrategyViewProps> = ({ language }) => {
  const content = {
    fr: {
      title: "Stratégies & Accompagnement",
      subtitle: "Nous aidons les collectivités et acteurs du territoire à bâtir l'avenir.",
      cards: [
        {
          title: "Planification Territoriale",
          text: "R.I.C.E accompagne les collectivités dans l'élaboration de leurs documents d'urbanisme (<strong>PLU, ZAC, SCOT</strong>). Nous veillons à l'intégration des <em>Solutions Fondées sur la Nature</em> pour rendre les territoires plus résilients face au changement climatique."
        },
        {
          title: "Certifications & Labels",
          text: "Nous apportons notre expertise technique pour le montage de projets visant des certifications environnementales exigeantes telles que <strong>HQE, BREEAM, LEED</strong>. Nous assurons le suivi des performances tout au long du projet."
        },
        {
          title: "Concertation & Impact",
          text: "Parce qu'un projet durable est aussi un projet socialement accepté, nous participons aux stratégies de concertation et aidons à maximiser l'impact positif des projets sur les populations locales (Plans Climat, Agenda 21)."
        }
      ]
    },
    en: {
      title: "Strategies & Support",
      subtitle: "We help communities and regional actors build the future.",
      cards: [
        {
          title: "Territorial Planning",
          text: "R.I.C.E supports communities in developing their urban planning documents (<strong>PLU, ZAC, SCOT</strong>). We ensure the integration of <em>Nature-Based Solutions</em> to make territories more resilient to climate change."
        },
        {
          title: "Certifications & Labels",
          text: "We provide our technical expertise for setting up projects aiming for demanding environmental certifications such as <strong>HQE, BREEAM, LEED</strong>. We monitor performance throughout the project."
        },
        {
          title: "Consultation & Impact",
          text: "Because a sustainable project is also a socially accepted project, we participate in consultation strategies and help maximize the positive impact of projects on local populations (Climate Plans, Agenda 21)."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.title}</h2>
           <p className="text-xl text-slate-600">
             {t.subtitle}
           </p>
        </div>

        <div className="space-y-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-primary-500">
             <div className="flex items-start mb-4">
               <Map className="h-8 w-8 text-primary-600 mr-4" />
               <h3 className="text-2xl font-bold text-slate-800">{t.cards[0].title}</h3>
             </div>
             <p className="text-slate-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.cards[0].text }} />
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-secondary-500">
             <div className="flex items-start mb-4">
               <Award className="h-8 w-8 text-secondary-600 mr-4" />
               <h3 className="text-2xl font-bold text-slate-800">{t.cards[1].title}</h3>
             </div>
             <p className="text-slate-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.cards[1].text }} />
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-amber-500">
             <div className="flex items-start mb-4">
               <Users className="h-8 w-8 text-amber-600 mr-4" />
               <h3 className="text-2xl font-bold text-slate-800">{t.cards[2].title}</h3>
             </div>
             <p className="text-slate-600 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.cards[2].text }} />
          </div>
        </div>
      </div>
    </div>
  );
};