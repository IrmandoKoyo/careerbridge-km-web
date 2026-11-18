import { useEffect, useState, useCallback } from 'react';

export const BASE_PATH = '/kmclass';

export type RouteView =
  | { page: 'home' }
  | { page: 'guides'; categoryFilter?: number }
  | { page: 'entry'; entryNo: number }
  | { page: 'downloads' }
  | { page: 'faq' }
  | { page: 'about' }
  | { page: 'testing' };

function parseLocationToRoute(pathname: string): RouteView {
  let clean = pathname;
  if (clean.startsWith(BASE_PATH)) {
    clean = clean.slice(BASE_PATH.length);
  }
  clean = clean.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/beranda') {
    return { page: 'home' };
  }
  if (clean === '/panduan') {
    return { page: 'guides' };
  }
  if (clean.startsWith('/kategori/')) {
    const num = Number(clean.replace('/kategori/', ''));
    return { page: 'guides', categoryFilter: Number.isNaN(num) ? undefined : num };
  }
  if (clean.startsWith('/entri/')) {
    const num = Number(clean.replace('/entri/', ''));
    if (!Number.isNaN(num) && num >= 1 && num <= 10) {
      return { page: 'entry', entryNo: num };
    }
    return { page: 'guides' };
  }
  if (clean === '/unduhan') return { page: 'downloads' };
  if (clean === '/faq') return { page: 'faq' };
  if (clean === '/tentang') return { page: 'about' };
  if (clean === '/masukan' || clean === '/uji-coba') return { page: 'testing' };

  return { page: 'home' };
}

export function routeToUrl(route: RouteView): string {
  switch (route.page) {
    case 'home':
      return BASE_PATH;
    case 'guides':
      return route.categoryFilter ? `${BASE_PATH}/kategori/${route.categoryFilter}` : `${BASE_PATH}/panduan`;
    case 'entry':
      return `${BASE_PATH}/entri/${route.entryNo}`;
    case 'downloads':
      return `${BASE_PATH}/unduhan`;
    case 'faq':
      return `${BASE_PATH}/faq`;
    case 'about':
      return `${BASE_PATH}/tentang`;
    case 'testing':
      return `${BASE_PATH}/masukan`;
  }
}

export function useSubpathRoute() {
  const [route, setRoute] = useState<RouteView>(() =>
    parseLocationToRoute(window.location.pathname)
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseLocationToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((nextRoute: RouteView) => {
    const targetUrl = routeToUrl(nextRoute);
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}
