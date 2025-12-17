import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { Mail, Phone, Leaf } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const t = {
    fr: {
      description: "Réunion Ingénierie Consultant Environnement. Votre partenaire pour un développement durable et responsable depuis 2008.",
      navTitle: "Navigation",
      nav: {
        home: "Accueil",
        about: "L'Entreprise",
        services: "Prestations",
        activities: "Activités",
        contact: "Contact"
      },
      expTitle: "Expertises",
      exp: [
        "Études Réglementaires & ICPE",
        "Dépollution & Amiante",
        "Renaturation & Biodiversité",
        "Économie Circulaire & RSE",
        "Imagerie Drone & 3D"
      ],
      contactTitle: "Nous Contacter",
      rights: "Tous droits réservés.",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité"
    },
    en: {
      description: "Reunion Engineering Environmental Consultant. Your partner for sustainable and responsible development since 2008.",
      navTitle: "Navigation",
      nav: {
        home: "Home",
        about: "About Us",
        services: "Services",
        activities: "Activities",
        contact: "Contact"
      },
      expTitle: "Expertise",
      exp: [
        "Regulatory Studies & ICPE",
        "Depollution & Asbestos",
        "Renaturation & Biodiversity",
        "Circular Economy & CSR",
        "Drone Imagery & 3D"
      ],
      contactTitle: "Contact Us",
      rights: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy"
    }
  }[language];

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    // Changed bg to light (secondary-50) and text to dark (secondary-900/slate-600) to blend the white logo background
    <footer className="bg-secondary-50 text-slate-600 pt-16 pb-8 border-t border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-20 w-20 mr-5 flex-shrink-0 relative">
                {!imgError ? (
                  <img 
                    src="https://lh3.googleusercontent.com/d/1fuy_xQJH5LZGyoPu_0Hc7-pDsrnIPuF6" 
                    alt="Logo R.I.C.E" 
                    className="h-full w-full object-contain" 
                    onError={() => setImgError(true)}
                  />
                ) : (
                  // Logo Fallback: Green Leaf
                  <Leaf className="h-full w-full text-primary-500" />
                )}
              </div>
              {/* Brand Name in Dark Blue */}
              <h2 className="text-2xl font-bold text-secondary-900">R.I.C.E</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 mb-6 text-left">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary-900 font-semibold mb-4 tracking-wider uppercase text-sm">{t.navTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNav('/')} className="hover:text-primary-600 transition">{t.nav.home}</button></li>
              <li><button onClick={() => handleNav('/about')} className="hover:text-primary-600 transition">{t.nav.about}</button></li>
              <li><button onClick={() => handleNav('/services')} className="hover:text-primary-600 transition">{t.nav.services}</button></li>
              <li><button onClick={() => handleNav('/activities')} className="hover:text-primary-600 transition">{t.nav.activities}</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-primary-600 transition">{t.nav.contact}</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-secondary-900 font-semibold mb-4 tracking-wider uppercase text-sm">{t.expTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {t.exp.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-secondary-900 font-semibold mb-4 tracking-wider uppercase text-sm">{t.contactTitle}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-600 mr-3 shrink-0" />
                <a href="tel:+262692656166" className="hover:text-secondary-800 transition">+262 692 65 61 66</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-600 mr-3 shrink-0" />
                <a href="mailto:contact@rice.re" className="hover:text-secondary-800 transition">contact@rice.re</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} R.I.C.E - {t.rights}</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <button onClick={() => handleNav('/legal')} className="hover:text-primary-600 transition">
              {t.legal}
            </button>
            <button onClick={() => handleNav('/privacy')} className="hover:text-primary-600 transition">
              {t.privacy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};