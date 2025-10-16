import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'module';
import postcss from 'rollup-plugin-postcss';

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
