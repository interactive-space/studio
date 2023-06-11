import typescript from 'rollup-plugin-typescript2';
import { string } from 'rollup-plugin-string';
import pkg from './package.json';

/**
 * @type {Array<import('rollup').RollupOptions>}
 */
const options = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'commonjs',
        sourcemap: true,
        globals: { react: 'React' },
      },
    ],
    external: ['@open-draft/deferred-promise', 'react'],
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        clean: true,
      }),
      string({
        include: '**/*.html',
      }),
    ],
  },
];

export default options;
