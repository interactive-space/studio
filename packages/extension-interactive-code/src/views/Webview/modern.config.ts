import appTools, { defineConfig } from '@modern-js/app-tools';
import { resolve } from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';
const extVersion = process.env.EXT_VER || 'default';

const distRelativePath = 'resources/webview';
const assetPrefix = `https://extension.editor.incca.cn/interactive-code/${extVersion}/${distRelativePath}`;
const root = isDevelopment ? resolve(__dirname, '../../../', distRelativePath) : undefined;

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
    distPath: { root },
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
  ],
  tools: {
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      }
    }
  }
});
