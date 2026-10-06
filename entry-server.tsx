// Point d'entrée utilisé uniquement au build pour générer le HTML statique de chaque page.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from './App';

export { ROUTES, SITE_URL } from './seo/routes';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );
}
