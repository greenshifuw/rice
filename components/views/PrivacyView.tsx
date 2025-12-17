import React from 'react';
import { Language } from '../../types';

interface PrivacyViewProps {
  language: Language;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ language }) => {
  const content = {
    fr: {
      title: "Politique de Confidentialité",
      lastUpdate: "Dernière mise à jour : Octobre 2023",
      intro: "L'entreprise R.I.C.E accorde une grande importance à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).",
      sections: [
        {
          heading: "1. Collecte des données",
          text: "Nous pouvons collecter les informations suivantes lorsque vous utilisez notre formulaire de contact ou notre assistant virtuel :\n- Nom et prénom\n- Adresse email\n- Numéro de téléphone\n- Informations relatives à votre projet professionnel"
        },
        {
          heading: "2. Utilisation des données",
          text: "Les données collectées sont utilisées uniquement pour :\n- Répondre à vos demandes de contact et de devis.\n- Améliorer nos services et notre relation client.\n- Assurer le suivi technique de vos projets."
        },
        {
          heading: "3. Conservation des données",
          text: "Vos données personnelles sont conservées uniquement le temps nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, sauf si une durée de conservation plus longue est requise par la loi (ex: obligations comptables)."
        },
        {
          heading: "4. Partage des données",
          text: "R.I.C.E ne vend, n'échange et ne loue aucune information personnelle à des tiers. Les données peuvent être partagées avec des prestataires de confiance uniquement pour le fonctionnement du site (ex: hébergement, service d'emailing) qui sont tenus de respecter la confidentialité de vos informations."
        },
        {
          heading: "5. Vos droits",
          text: "Conformément au RGPD, vous disposez des droits suivants concernant vos données :\n- Droit d'accès et de rectification\n- Droit à l'effacement (droit à l'oubli)\n- Droit à la limitation du traitement\n\nPour exercer ces droits, veuillez nous contacter à l'adresse : **contact@rice.re** ou par courrier au 5 impasse Ambroise, 97430 Le TAMPON."
        },
        {
          heading: "6. Cookies",
          text: "Ce site utilise des cookies techniques essentiels à son fonctionnement. Nous n'utilisons pas de cookies publicitaires ou de traçage intrusifs sans votre consentement préalable."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdate: "Last updated: October 2023",
      intro: "R.I.C.E places great importance on protecting your privacy. This privacy policy explains how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR).",
      sections: [
        {
          heading: "1. Data Collection",
          text: "We may collect the following information when you use our contact form or virtual assistant:\n- Full name\n- Email address\n- Phone number\n- Information related to your professional project"
        },
        {
          heading: "2. Use of Data",
          text: "The data collected is used solely to:\n- Respond to your contact and quote requests.\n- Improve our services and customer relationship.\n- Ensure technical follow-up of your projects."
        },
        {
          heading: "3. Data Retention",
          text: "Your personal data is kept only for the time necessary to achieve the purposes for which it was collected, unless a longer retention period is required by law (e.g., accounting obligations)."
        },
        {
          heading: "4. Data Sharing",
          text: "R.I.C.E does not sell, trade, or rent any personal information to third parties. Data may be shared with trusted service providers solely for the operation of the site (e.g., hosting, emailing service) who are required to respect the confidentiality of your information."
        },
        {
          heading: "5. Your Rights",
          text: "In accordance with the GDPR, you have the following rights regarding your data:\n- Right of access and rectification\n- Right to erasure (right to be forgotten)\n- Right to restriction of processing\n\nTo exercise these rights, please contact us at: **contact@rice.re** or by mail at 5 impasse Ambroise, 97430 Le TAMPON."
        },
        {
          heading: "6. Cookies",
          text: "This site uses technical cookies essential for its operation. We do not use advertising or intrusive tracking cookies without your prior consent."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">{t.title}</h1>
        <p className="text-center text-slate-500 mb-10 text-sm">{t.lastUpdate}</p>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-8">
          <p className="text-lg text-slate-700 leading-relaxed border-b border-slate-100 pb-6">
            {t.intro}
          </p>

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