// Suivi des conversions Google Ads pour www.rice.re.
// Compte Google Ads « RICE » (AW-18427250200), partagé avec RICO2.
// Conversion utilisée : « Contact cliqué » (même action que sur rico2.rice.re ;
// Google Ads attribue chaque conversion à la campagne sur laquelle le visiteur a cliqué).
//
// Aucun envoi n'a lieu sans consentement : Consent Mode v2 est réglé sur « denied »
// par défaut dans index.html, et seule la bannière (components/CookieConsent.tsx)
// peut le passer à « granted ».

export const GOOGLE_ADS_ID = 'AW-18427250200';
const CONTACT_CONVERSION = 'AW-18427250200/7wJ6CJnfxPAcEJiM5tJE'; // Contact cliqué
const SESSION_KEY = 'rice_contact_tracked';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __riceShowConsent?: () => void;
  }
}

// Une seule conversion « contact » par visite, même si le visiteur clique
// plusieurs fois sur le téléphone ou l'e-mail.
export function trackContact(): void {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    window.gtag('event', 'conversion', { send_to: CONTACT_CONVERSION });
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* silencieux */
  }
}

// Écoute globale des clics sur les liens téléphone, e-mail et WhatsApp, partout sur le site.
export function installContactClickTracking(): () => void {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.includes('wa.me/')) {
      trackContact();
    }
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
