import { Helmet } from '@modern-js/runtime/head';
import { Outlet, useNavigate } from '@modern-js/runtime/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Box, Button, CssBaseline } from '@mui/material';
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
      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.ASSET_PREFIX}/public/logo-small.png`}
        />
      </Helmet>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          cursor: 'default',
          height: '48px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${process.env.ASSET_PREFIX}/public/logo-small.png`}
            alt="logo"
            style={{ height: '28px', margin: '0 12px' }}
          />
          <span
            onClick={() => navigateTo('/')}
            className="logo"
            style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}
          >
            Interactive
          </span>
          <Box sx={{ ml: '16px' }}>
            <Button onClick={() => navigateTo('/code')}>Code</Button>
          </Box>
        </div>
      </AppBar>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
