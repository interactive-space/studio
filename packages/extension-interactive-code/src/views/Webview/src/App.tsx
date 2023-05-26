import { MemoryRouter, Route, Routes } from '@modern-js/runtime/router';
import { usePathname } from '@/hooks/usePathname';
import { routes } from './routes';
import './App.scss';

export default function App() {
  const pathname = usePathname();

  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes location={{ pathname }}>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />)
        )}
      </Routes>
    </MemoryRouter>
  );
}
