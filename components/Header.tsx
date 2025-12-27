
import React, { useState } from 'react';
import { Menu, X, Globe, Leaf } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItem, Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = (lang: Language): NavItem[] => [
    { label: lang === 'fr' ? 'Accueil' : 'Home', path: '/' },
    { label: lang === 'fr' ? "L'Entreprise" : 'About Us', path: '/about' },
    { label: lang === 'fr' ? 'Prestations' : 'Services', path: '/services' },
    { label: lang === 'fr' ? 'Activités' : 'Activities', path: '/activities' },
    { label: lang === 'fr' ? 'Stratégies' : 'Strategy', path: '/strategy' },
    { label: lang === 'fr' ? 'Contact' : 'Contact', path: '/contact' },
  ];

  const NAV_ITEMS = getNavItems(language);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-secondary-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-40">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group py-2" 
            onClick={() => handleNavClick('/')}
          >
            {/* Logo Image */}
            <div className="relative h-12 w-12 md:h-32 md:w-32 mr-3 md:mr-6 transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              {!imgError ? (
                <img 
                  src="https://lh3.googleusercontent.com/d/1fuy_xQJH5LZGyoPu_0Hc7-pDsrnIPuF6" 
                  alt="Logo R.I.C.E" 
                  className="h-full w-full object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="h-full w-full bg-secondary-50 rounded-full flex items-center justify-center border-2 border-primary-100">
                  <Leaf className="h-6 w-6 md:h-16 md:h-16 text-primary-500" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-3xl md:text-7xl font-bold text-secondary-900 tracking-tight leading-none drop-shadow-sm">R.I.C.E</span>
              <span className="text-[10px] md:text-xl leading-tight text-primary-600 font-bold tracking-wider mt-1 md:mt-2">
                {language === 'fr' ? 'INGÉNIERIE ENVIRONNEMENTALE' : 'ENVIRONMENTAL ENGINEERING'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-secondary-700 border-b-2 border-primary-500'
                    : 'text-gray-500 hover:text-secondary-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={onToggleLanguage}
              className="flex items-center text-gray-500 hover:text-secondary-600 ml-4 px-3 py-1 border border-gray-200 rounded-full hover:border-secondary-500 transition-all"
            >
               <Globe className="h-4 w-4 mr-2" />
               <span className="text-xs font-bold uppercase">{language}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={onToggleLanguage}
              className="flex items-center text-gray-500 hover:text-secondary-600 px-3 py-2 border border-gray-200 rounded-full active:bg-slate-100 transition-colors"
              aria-label="Change language"
            >
               <Globe className="h-4 w-4 mr-1" />
               <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 text-gray-500 hover:text-secondary-700 focus:outline-none active:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl animate-fade-in-up">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block px-4 py-4 rounded-md text-lg font-semibold w-full text-left transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-700 bg-primary-50 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-secondary-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
