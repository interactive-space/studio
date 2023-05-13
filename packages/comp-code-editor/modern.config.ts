import { resolve } from 'path';
import moduleTools, { defineConfig } from '@modern-js/module-tools';
import storybookPlugin from '@modern-js/plugin-storybook';

export default defineConfig({
  plugins: [moduleTools(), storybookPlugin()],
  dev: {
    storybook: {
      webpackChain(chain) {
        chain.output.path(resolve(__dirname, './dist-storybook'));
        return chain;
      },
    },
  },
});
