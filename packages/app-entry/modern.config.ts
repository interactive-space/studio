import appTools, { defineConfig } from '@modern-js/app-tools';

const isPreview = process.env.APP_ENV === 'preview';
const assetPrefix = isPreview
  ? 'https://pre.studio.incca.cn'
  : 'https://studio.incca.cn';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'rspack'>({
  source: {
    globalVars: {
      'process.env.APP_ENV': process.env.APP_ENV || 'development',
      'process.env.API_BASEURL':
        'https://studio-configuration.pre.api.istudio.today',
    },
  },
  runtime: {
    router: true,
  },
  output: {
    assetPrefix,
  },
  dev: {
    port: 3000,
    startUrl: 'http://localhost:3000/',
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
  ],
});
