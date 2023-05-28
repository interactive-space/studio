import { Helmet } from '@modern-js/runtime/head';

const Index = () => (
  <>
    <Helmet>
      <title>Interactive Stuido</title>
    </Helmet>
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={`${process.env.ASSET_PREFIX}/public/images/logo.png`}
        alt="logo"
        style={{ width: '360px', margin: '50px 0 25px' }}
      />
      <label style={{ fontSize: '30px', fontWeight: 'bold' }}>
        Interactive
      </label>
    </main>
  </>
);

export default Index;
