import React from 'react';
import { Language } from '../../types';

interface LegalViewProps {
  language: Language;
}

export const LegalView: React.FC<LegalViewProps> = ({ language }) => {
  const content = {
    fr: {
      title: "Mentions Légales",
      sections: [
        {
          heading: "1. Éditeur du site",
          text: "Le présent site internet est édité par l'entreprise individuelle **R.I.C.E (Réunion Ingénierie Consultant Environnement)**.\n\n**Siège social :** 5 impasse Ambroise, 97430 Le TAMPON, La Réunion.\n**Forme juridique :** Entreprise Individuelle\n**Email :** contact@rice.re\n**Téléphone :** +262 692 65 61 66"
        },
        {
          heading: "2. Directeur de la publication",
          text: "Le directeur de la publication est le représentant légal de l'entreprise R.I.C.E."
        },
        {
          heading: "3. Hébergement",
          text: "Ce site est une application web hébergée sur une infrastructure Cloud sécurisée (Google Cloud / Vercel / Netlify selon déploiement)."
        },
        {
          heading: "4. Propriété intellectuelle",
          text: "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication."
        },
        {
          heading: "5. Responsabilité",
          text: "Les informations communiquées sur le site sont fournies à titre indicatif, elles sont non contractuelles et ne sauraient engager la responsabilité de R.I.C.E. L'entreprise se réserve le droit de modifier le contenu du site à tout moment et sans préavis."
        }
      ]
    },
    en: {
      title: "Legal Notice",
      sections: [
        {
          heading: "1. Site Editor",
          text: "This website is edited by the sole proprietorship **R.I.C.E (Réunion Ingénierie Consultant Environnement)**.\n\n**Registered Office:** 5 impasse Ambroise, 97430 Le TAMPON, Reunion Island.\n**Legal Form:** Sole Proprietorship (Entreprise Individuelle)\n**Email:** contact@rice.re\n**Phone:** +262 692 65 61 66"
        },
        {
          heading: "2. Director of Publication",
          text: "The director of publication is the legal representative of R.I.C.E."
        },
        {
          heading: "3. Hosting",
          text: "This site is a web application hosted on secure Cloud infrastructure (Google Cloud / Vercel / Netlify depending on deployment)."
        },
        {
          heading: "4. Intellectual Property",
          text: "The entire site is subject to French and international legislation on copyright and intellectual property. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations. Reproduction of all or part of this site on any electronic medium whatsoever is strictly prohibited unless expressly authorized by the director of publication."
        },
        {
          heading: "5. Liability",
          text: "The information provided on the site is for information purposes only, is non-contractual, and cannot engage the liability of R.I.C.E. The company reserves the right to modify the content of the site at any time and without notice."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center">{t.title}</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-8">
          {t.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold text-secondary-900 mb-3">{section.heading}</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ 
                __html: section.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};