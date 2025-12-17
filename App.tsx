import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Language } from './types';

// Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ServicesView } from './components/views/ServicesView';
import { ActivitiesView } from './components/views/ActivitiesView';
import { StrategyView } from './components/views/StrategyView';
import { ContactView } from './components/views/ContactView';
import { LegalView } from './components/views/LegalView';
import { PrivacyView } from './components/views/PrivacyView';

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <div className="font-sans text-slate-700 antialiased min-h-screen flex flex-col bg-slate-50">
      <ScrollToTop />
      <Header 
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'fr' ? 'en' : 'fr')}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeView language={language} />} />
          <Route path="/about" element={<AboutView language={language} />} />
          <Route path="/services" element={<ServicesView language={language} />} />
          <Route path="/activities" element={<ActivitiesView language={language} />} />
          <Route path="/strategy" element={<StrategyView language={language} />} />
          <Route path="/contact" element={<ContactView language={language} />} />
          <Route path="/legal" element={<LegalView language={language} />} />
          <Route path="/privacy" element={<PrivacyView language={language} />} />
        </Routes>
      </main>

      <Footer language={language} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;