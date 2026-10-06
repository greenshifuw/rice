import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';

// Bannière de consentement aux cookies — conforme aux recommandations CNIL
// (délibération n° 2020-091) et Google Consent Mode v2.
//  - aucun cookie publicitaire avant accord explicite ;
//  - « Tout refuser » aussi visible et aussi simple que « Tout accepter » ;
//  - choix mémorisé 13 mois (localStorage, la bannière ne dépose aucun cookie) ;
//  - réaffichable à tout moment (lien « Gestion des cookies » du pied de page).
// Reprend le fonctionnement de RICO2/js/consent.js.

const STORAGE_KEY = 'rice_consent_v1';
const TTL_MS = 13 * 30 * 24 * 3600 * 1000;

interface Consent { ads: boolean; at: number }

const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (!c || Date.now() - (c.at || 0) > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return c;
  } catch {
    return null;
  }
};

const applyConsent = (ads: boolean) => {
  try {
    window.gtag?.('consent', 'update', {
      ad_storage: ads ? 'granted' : 'denied',
      ad_user_data: ads ? 'granted' : 'denied',
      ad_personalization: ads ? 'granted' : 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  } catch {
    /* silencieux */
  }
};

const saveConsent = (ads: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ads, at: Date.now() }));
  } catch {
    /* navigation privée : le choix vaut pour la page en cours */
  }
  applyConsent(ads);
};

const TEXTS = {
  fr: {
    title: 'Cookies et confidentialité',
    body: "Ce site utilise des cookies techniques nécessaires à son fonctionnement. Avec votre accord, nous utilisons aussi des cookies publicitaires (Google Ads) pour mesurer l'efficacité de nos annonces. Aucune publicité n'est affichée sur ce site.",
    more: 'En savoir plus',
    refuse: 'Tout refuser',
    custom: 'Personnaliser',
    accept: 'Tout accepter',
    modalTitle: 'Personnaliser vos cookies',
    techTitle: 'Cookies techniques',
    techDesc: 'Nécessaires au fonctionnement du site. Toujours actifs.',
    adsTitle: 'Cookies publicitaires (Google Ads)',
    adsDesc: "Mesurent si une visite provient de nos annonces et si elle aboutit à une prise de contact.",
    cancel: 'Annuler',
    save: 'Enregistrer mes choix',
  },
  en: {
    title: 'Cookies and privacy',
    body: 'This site uses technical cookies required for it to work. With your consent, we also use advertising cookies (Google Ads) to measure how well our ads perform. No ads are displayed on this site.',
    more: 'Learn more',
    refuse: 'Reject all',
    custom: 'Customise',
    accept: 'Accept all',
    modalTitle: 'Customise your cookies',
    techTitle: 'Technical cookies',
    techDesc: 'Required for the site to work. Always on.',
    adsTitle: 'Advertising cookies (Google Ads)',
    adsDesc: 'Measure whether a visit comes from our ads and leads to a contact.',
    cancel: 'Cancel',
    save: 'Save my choices',
  },
};

export const CookieConsent: React.FC<{ language: Language }> = ({ language }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adsChoice, setAdsChoice] = useState(false);
  const t = TEXTS[language];

  useEffect(() => {
    const current = readConsent();
    if (current) {
      applyConsent(current.ads);
    } else {
      const timer = window.setTimeout(() => setShowBanner(true), 400);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    window.__riceShowConsent = () => {
      setAdsChoice(readConsent()?.ads ?? false);
      setShowModal(true);
    };
    return () => {
      delete window.__riceShowConsent;
    };
  }, []);

  const decide = (ads: boolean) => {
    saveConsent(ads);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {showBanner && !showModal && (
        <div
          role="dialog"
          aria-label={t.title}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-secondary-100 bg-white p-5 text-sm text-slate-700 shadow-2xl print:hidden"
        >
          <p className="mb-1 font-bold text-secondary-900">{t.title}</p>
          <p className="mb-4 leading-relaxed">
            {t.body}{' '}
            <Link to="/privacy" className="text-secondary-700 underline">
              {t.more}
            </Link>
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => decide(false)} className="min-w-[130px] flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-800 hover:bg-slate-50">
              {t.refuse}
            </button>
            <button onClick={() => { setAdsChoice(false); setShowModal(true); }} className="min-w-[130px] rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-secondary-700 hover:bg-slate-50">
              {t.custom}
            </button>
            <button onClick={() => decide(true)} className="min-w-[130px] flex-1 rounded-lg bg-secondary-700 px-4 py-2.5 font-semibold text-white hover:bg-secondary-800">
              {t.accept}
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/70 p-4 print:hidden"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div role="dialog" aria-label={t.modalTitle} className="w-full max-w-lg rounded-2xl bg-white p-6 text-slate-700">
            <h2 className="mb-4 text-lg font-bold text-secondary-900">{t.modalTitle}</h2>
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3">
              <div>
                <p className="font-semibold text-slate-800">{t.techTitle}</p>
                <p className="text-sm text-slate-500">{t.techDesc}</p>
              </div>
              <input type="checkbox" checked disabled aria-label={t.techTitle} className="mt-1 h-5 w-5" />
            </div>
            <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
              <span>
                <span className="block font-semibold text-slate-800">{t.adsTitle}</span>
                <span className="block text-sm text-slate-500">{t.adsDesc}</span>
              </span>
              <input type="checkbox" checked={adsChoice} onChange={(e) => setAdsChoice(e.target.checked)} className="mt-1 h-5 w-5" />
            </label>
            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-800 hover:bg-slate-50">
                {t.cancel}
              </button>
              <button onClick={() => decide(adsChoice)} className="flex-1 rounded-lg bg-secondary-700 px-4 py-2.5 font-semibold text-white hover:bg-secondary-800">
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
