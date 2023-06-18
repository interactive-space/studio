import appTools, { defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'rspack'>({
  runtime: {
    router: true,
  },
  output: {
    assetPrefix: 'https://studio.incca.cn',
  },
  dev: {
    port: 3000,
    startUrl: 'https://dev.istudio.today',
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
  ],
});
