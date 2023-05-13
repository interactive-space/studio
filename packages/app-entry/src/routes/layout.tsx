import { Helmet } from '@modern-js/runtime/head';
import { Outlet, useNavigate } from '@modern-js/runtime/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Box, Button, Container, CssBaseline } from '@mui/material';
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
          href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
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
        <Container
          sx={{ display: 'flex', alignItems: 'center' }}
          maxWidth={false}
        >
          <span
            onClick={() => navigateTo('/')}
            className="logo"
            style={{ cursor: 'pointer' }}
          >
            Interactive Studio
          </span>
          <Box sx={{ ml: '16px' }}>
            <Button onClick={() => navigateTo('/code')}>Code</Button>
          </Box>
        </Container>
      </AppBar>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
