import { Helmet } from '@modern-js/runtime/head';
import { Outlet, useNavigate } from '@modern-js/runtime/router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SWRConfig } from 'swr';
import { AppHeader } from '@/components/AppHeader';
import './index.css';

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

export default function Layout() {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    // 判断当前路由不为 path 时，进行 navigate
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(`${process.env.API_BASEURL}${url}`, {
              credentials: 'include',
              mode: 'cors',
            }).then(res => res.json()),
        }}
      >
        <Helmet>
          <link
            rel="icon"
            type="image/x-icon"
            href={`${process.env.ASSET_PREFIX}/public/logo-small.png`}
          />
        </Helmet>
        <CssBaseline />
        <AppHeader navigateTo={navigateTo} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
      </SWRConfig>
    </ThemeProvider>
  );
}
