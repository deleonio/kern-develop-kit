import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.cjs',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/index.mjs',
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		typescript(),
		nodeResolve(),
		commonjs(),
		postcss({
			plugins: [require('autoprefixer')],
			inject: false,
			use: {
				sass: {
					silenceDeprecations: ['legacy-js-api'], // may be removed when the following issue has been resolved: https://github.com/egoist/rollup-plugin-postcss/issues/463
				},
			},
		}),
	],
};
