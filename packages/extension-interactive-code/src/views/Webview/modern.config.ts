import appTools, { defineConfig } from '@modern-js/app-tools';
import { resolve } from 'path';

const distRelativePath = 'resources/webview';
const assetPrefix = `https://editor.incca.cn/extensions/interactive-code/1.0/${distRelativePath}`;

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'rspack'>({
  runtime: {
    router: true,
  },
  dev: {
    assetPrefix,
    port: 3001,
  },
  source: {
    globalVars: {
      ['process.env.IS_REACT18']: JSON.stringify(true),
    },
  },
  output: {
    assetPrefix,
    distPath: {
      root: resolve(__dirname, '../../../', distRelativePath),
    },
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
  ],
  tools: {
    rspack: {
      devServer: {
        devMiddleware: {
          writeToDisk: true,
        }
      }
    },
  }
});
