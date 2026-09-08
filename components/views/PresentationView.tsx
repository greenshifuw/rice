import React from 'react';
import { Leaf, CheckCircle, BarChart3, Box, Cpu, Globe, Mail, Phone, MapPin, HardHat, Lightbulb, LayoutDashboard } from 'lucide-react';
import { Language } from '../../types';

interface PresentationViewProps {
  language: Language;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ language }) => {
  const content = {
    fr: {
      title: "Présentation R.I.C.E",
      subtitle: "Ingénierie Environnementale & Développement Durable",
      pages: [
        {
          title: "Qui sommes-nous ?",
          content: "R.I.C.E est un bureau d'études spécialisé dans l'ingénierie environnementale à La Réunion. Depuis 2008, nous accompagnons les entreprises et collectivités dans leur transition écologique.",
          points: [
            "Expertise locale et internationale",
            "Approche centrée sur l'écoconception",
            "Solutions innovantes et durables",
            "Accompagnement réglementaire complet"
          ]
        },
        {
          title: "Nos Domaines d'Intervention",
          items: [
            { title: "Assistance", desc: "Accompagnement réglementaire et technique." },
            { title: "Conseils", desc: "Stratégies durables et audits d'impact." },
            { title: "Études", desc: "Analyses approfondies et diagnostics." },
            { title: "Imagerie & 3D", desc: "Relevés par drone et modélisation." }
          ]
        },
        {
          title: "Nos Prestations",
          services: [
            { title: "Renaturation & Biodiversité", desc: "Plans stratégiques de renaturation urbaine et intégration de la biodiversité.", color: "bg-green-600", icon: "sprout" },
            { title: "Études Réglementaires", desc: "Gestion de dossiers ICPE, études d'impact et audits de conformité.", color: "bg-indigo-500", icon: "filecheck" },
            { title: "ATMO & MOE", desc: "Maîtrise d'œuvre amiante, plomb, démolition et dépollution.", color: "bg-orange-500", icon: "hardhat" },
            { title: "Économie Circulaire", desc: "Stratégies pour transformer les déchets en ressources durables.", color: "bg-amber-500", icon: "recycle" },
            { title: "Innovation Industrielle", desc: "Adaptation des processus aux normes environnementales.", color: "bg-purple-500", icon: "lightbulb" },
            { title: "Digitalisation", desc: "Tableaux de bord numériques pour le pilotage QHSE et déchets.", color: "bg-cyan-600", icon: "dashboard" }
          ]
        },
        {
          title: "Contactez-nous",
          contact: {
            email: "contact@rice.re",
            phone: "0692 65 61 66",
            address: "Le TAMPON, La Réunion",
            website: "www.rice.re"
          }
        }
      ]
    },
    en: {
      title: "R.I.C.E Presentation",
      subtitle: "Environmental Engineering & Sustainable Development",
      pages: [
        {
          title: "Who are we?",
          content: "R.I.C.E is a consulting firm specialized in environmental engineering in Reunion Island. Since 2008, we have been supporting companies and local authorities in their ecological transition.",
          points: [
            "Local and international expertise",
            "Eco-design centered approach",
            "Innovative and sustainable solutions",
            "Full regulatory support"
          ]
        },
        {
          title: "Our Areas of Intervention",
          items: [
            { title: "Assistance", desc: "Regulatory and technical support." },
            { title: "Consulting", desc: "Sustainable strategies and impact audits." },
            { title: "Studies", desc: "In-depth analyses and diagnostics." },
            { title: "Imagery & 3D", desc: "Drone surveys and modeling." }
          ]
        },
        {
          title: "Our Services",
          services: [
            { title: "Renaturation & Biodiversity", desc: "Strategic plans for urban renaturation and biodiversity.", color: "bg-green-600", icon: "sprout" },
            { title: "Regulatory Studies", desc: "Management of ICPE files, impact studies and compliance audits.", color: "bg-indigo-500", icon: "filecheck" },
            { title: "Project Management", desc: "Supervision for asbestos, lead, demolition and remediation.", color: "bg-orange-500", icon: "hardhat" },
            { title: "Circular Economy", desc: "Strategies to transform waste into sustainable resources.", color: "bg-amber-500", icon: "recycle" },
            { title: "Industrial Innovation", desc: "Adapting processes to environmental standards.", color: "bg-purple-500", icon: "lightbulb" },
            { title: "Digitalization", desc: "Digital dashboards for QHSE and waste management.", color: "bg-cyan-600", icon: "dashboard" }
          ]
        },
        {
          title: "Contact Us",
          contact: {
            email: "contact@rice.re",
            phone: "0692 65 61 66",
            address: "Le TAMPON, La Réunion",
            website: "www.rice.re"
          }
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="bg-white min-h-screen print:bg-white">
      {/* Print Instructions - Hidden when printing */}
      <div className="max-w-4xl mx-auto py-8 px-4 print:hidden">
        <div className="bg-secondary-50 border border-secondary-200 p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-bold text-secondary-900 mb-2">
            {language === 'fr' ? 'Générer votre présentation PDF' : 'Generate your PDF presentation'}
          </h2>
          <p className="text-secondary-700 mb-4">
            {language === 'fr' 
              ? 'Pour obtenir le meilleur résultat, utilisez les paramètres suivants dans votre dialogue d\'impression :' 
              : 'For the best results, use the following settings in your print dialog:'}
          </p>
          <ul className="list-disc list-inside text-sm text-secondary-600 space-y-1 mb-6">
            <li>{language === 'fr' ? 'Destination : Enregistrer au format PDF' : 'Destination: Save as PDF'}</li>
            <li>{language === 'fr' ? 'Disposition : Paysage' : 'Layout: Landscape'}</li>
            <li>{language === 'fr' ? 'Taille du papier : A4' : 'Paper size: A4'}</li>
            <li>{language === 'fr' ? 'Marges : Aucune' : 'Margins: None'}</li>
            <li>{language === 'fr' ? 'Graphiques d\'arrière-plan : Activé' : 'Background graphics: Enabled'}</li>
          </ul>
          <button 
            onClick={() => window.print()}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center"
          >
            <Globe className="mr-2 h-5 w-5" />
            {language === 'fr' ? 'Imprimer / Exporter en PDF' : 'Print / Export to PDF'}
          </button>
        </div>
      </div>

      {/* Presentation Pages */}
      <div className="flex flex-col items-center space-y-8 print:space-y-0">
        
        {/* Page 1: Cover */}
        <div className="presentation-page bg-secondary-900 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <Leaf className="h-96 w-96 text-primary-500" />
          </div>
          <div className="relative z-10">
            <div className="mb-12 flex justify-center">
               <img 
                 src="https://lh3.googleusercontent.com/d/1fuy_xQJH5LZGyoPu_0Hc7-pDsrnIPuF6" 
                 alt="Logo R.I.C.E" 
                 className="h-48 w-48 object-contain bg-white rounded-full p-4"
               />
            </div>
            <h1 className="text-7xl font-bold mb-4 tracking-tight">R.I.C.E</h1>
            <h2 className="text-3xl font-light text-primary-400 uppercase tracking-[0.2em]">
              {t.subtitle}
            </h2>
          </div>
          <div className="absolute bottom-12 left-12 text-secondary-400 text-sm font-mono">
            © {new Date().getFullYear()} R.I.C.E Ingénierie
          </div>
        </div>

        {/* Page 2: About */}
        <div className="presentation-page bg-white flex flex-col">
          <div className="flex justify-between items-start mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 border-l-8 border-primary-500 pl-6">
              {t.pages[0].title}
            </h2>
            <div className="text-secondary-300 font-bold text-6xl">01</div>
          </div>
          <div className="grid grid-cols-2 gap-12 flex-grow">
            <div className="flex flex-col justify-center">
              <p className="text-2xl text-slate-700 leading-relaxed mb-8">
                {t.pages[0].content}
              </p>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 flex flex-col justify-center">
              <ul className="space-y-6">
                {t.pages[0].points?.map((point, i) => (
                  <li key={i} className="flex items-center text-xl text-slate-800 font-medium">
                    <CheckCircle className="h-8 w-8 text-primary-500 mr-4 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center text-slate-400 text-sm">
            <span>R.I.C.E - Ingénierie Environnementale</span>
            <span>{language === 'fr' ? 'Présentation Institutionnelle' : 'Institutional Presentation'}</span>
          </div>
        </div>

        {/* Page 3: Domains */}
        <div className="presentation-page bg-slate-50 flex flex-col">
          <div className="flex justify-between items-start mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 border-l-8 border-primary-500 pl-6">
              {t.pages[1].title}
            </h2>
            <div className="text-secondary-300 font-bold text-6xl">02</div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
            {t.pages[1].items?.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                <div className="bg-secondary-50 p-6 rounded-xl mb-6">
                  {i === 0 && <CheckCircle className="h-12 w-12 text-primary-500" />}
                  {i === 1 && <BarChart3 className="h-12 w-12 text-secondary-500" />}
                  {i === 2 && <Box className="h-12 w-12 text-amber-600" />}
                  {i === 3 && <Cpu className="h-12 w-12 text-purple-600" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400 text-sm">
            <span>R.I.C.E - Ingénierie Environnementale</span>
            <span>{language === 'fr' ? 'Expertise & Domaines' : 'Expertise & Domains'}</span>
          </div>
        </div>

        {/* Page 4: Services */}
        <div className="presentation-page bg-white flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <h2 className="text-4xl font-bold text-secondary-900 border-l-8 border-primary-500 pl-6">
              {t.pages[2].title}
            </h2>
            <div className="text-secondary-300 font-bold text-6xl">03</div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 flex-grow">
            {t.pages[2].services?.map((service: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
                <div className={`${service.color} p-4 flex justify-center items-center h-20`}>
                  {service.icon === 'sprout' && <Leaf className="h-10 w-10 text-white" />}
                  {service.icon === 'filecheck' && <CheckCircle className="h-10 w-10 text-white" />}
                  {service.icon === 'hardhat' && <HardHat className="h-10 w-10 text-white" />}
                  {service.icon === 'recycle' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-white"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784l1.326-2.296 1.5 2.607M3.75 6H7m0 0 3-4h4.5m-7.5 4L7 10m9-4 1.5 2.607-1.5 2.607m1.285-5.214 1.326-2.296A1.785 1.785 0 0 0 19.39 2.12a1.83 1.83 0 0 0-1.57-.881H14.5M16 10h-2.5m2.5 0 3 4M7 19l1.5-2.607-1.5-2.607M7 19h7.5m0 0 1.57.881a1.83 1.83 0 0 0 1.57-.881 1.785 1.785 0 0 0 .004-1.784L17.5 16m0 0-3-4"/></svg>
                  )}
                  {service.icon === 'lightbulb' && <Lightbulb className="h-10 w-10 text-white" />}
                  {service.icon === 'dashboard' && <LayoutDashboard className="h-10 w-10 text-white" />}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-slate-400 text-xs">
            <span>R.I.C.E - Ingénierie Environnementale</span>
            <span>{language === 'fr' ? 'Détail des Prestations' : 'Service Details'}</span>
          </div>
        </div>

        {/* Page 5: Contact */}
        <div className="presentation-page bg-secondary-900 text-white flex flex-col">
          <div className="flex justify-between items-start mb-16">
            <h2 className="text-4xl font-bold text-white border-l-8 border-primary-500 pl-6">
              {t.pages[3].title}
            </h2>
            <div className="text-secondary-700 font-bold text-6xl">04</div>
          </div>
          <div className="flex-grow flex flex-col justify-center items-center">
            <div className="grid grid-cols-2 gap-12 w-full max-w-4xl">
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="bg-primary-500 p-4 rounded-full mr-6">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm uppercase tracking-widest mb-1">Email</p>
                    <p className="text-2xl font-bold">{t.pages[3].contact?.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary-500 p-4 rounded-full mr-6">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm uppercase tracking-widest mb-1">{language === 'fr' ? 'Téléphone' : 'Phone'}</p>
                    <p className="text-2xl font-bold">{t.pages[3].contact?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="bg-primary-500 p-4 rounded-full mr-6">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm uppercase tracking-widest mb-1">{language === 'fr' ? 'Adresse' : 'Address'}</p>
                    <p className="text-2xl font-bold">{t.pages[3].contact?.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary-500 p-4 rounded-full mr-6">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm uppercase tracking-widest mb-1">Web</p>
                    <p className="text-2xl font-bold">{t.pages[3].contact?.website}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-8 border-t border-secondary-800 flex justify-between items-center text-secondary-500 text-sm">
            <span>R.I.C.E - Ingénierie Environnementale</span>
            <span>{language === 'fr' ? 'Contact & Informations' : 'Contact & Information'}</span>
          </div>
        </div>

      </div>

      <style>{`
        @media screen {
          .presentation-page {
            width: 297mm;
            height: 210mm;
            padding: 20mm;
            margin: 20px auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
        }
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .presentation-page {
            width: 297mm;
            height: 210mm;
            padding: 20mm;
            page-break-after: always;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header, footer, nav, .print-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
