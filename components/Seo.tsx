import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, getRouteMeta } from '../seo/routes';

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Met à jour <title>, description, canonical et Open Graph à chaque changement de page.
export const Seo: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const url = SITE_URL + (meta.path === '/' ? '/' : meta.path);
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow');
  }, [pathname]);

  return null;
};
