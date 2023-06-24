import { FC } from 'react';
import { AppBar, Box, Button } from '@mui/material';

interface IHeaderProps {
  navigateTo: (path: string) => void;
}

export const AppHeader: FC<IHeaderProps> = ({ navigateTo }) => (
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
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        Interactive
      </span>
      <Box sx={{ ml: '16px' }}>
        <Button onClick={() => navigateTo('/code')}>Code</Button>
      </Box>
    </div>
  </AppBar>
);
