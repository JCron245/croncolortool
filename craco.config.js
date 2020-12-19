const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
	style: {
		postcss: {
			plugins: [
				purgecss({
          content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts', './src/**/*.scss'],
					safelist: {
						greedy: [/MuiAppBar/i, /react-colorful/i, /toastify/i]
					},
				}),
			],
		},
	},
};
