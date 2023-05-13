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
      <AppBar position="fixed" sx={{ cursor: 'default' }}>
        <Container
          sx={{ display: 'flex', alignItems: 'center' }}
          maxWidth={false}
        >
          <span
            onClick={() => navigateTo('/')}
            className="logo"
            style={{ cursor: 'pointer' }}
          >
            Interactive Space
          </span>
          <Box
            sx={{
              flexGrow: 1,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              ml: 4,
            }}
          >
            <Button onClick={() => navigateTo('/code')}>Code</Button>
          </Box>
        </Container>
      </AppBar>
      <div style={{ marginTop: '48px' }}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
