import { LazyExoticComponent, FC, Suspense, lazy } from 'react';

function routerComponentWrapper(LazyComponent: LazyExoticComponent<FC>): FC {
  return (): JSX.Element => (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );
}

export const routes = [
  {
    path: '/chat',
    Component: routerComponentWrapper(lazy(() => import('./pages/Chat')))
  }
];
