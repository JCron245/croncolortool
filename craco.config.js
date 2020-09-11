const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  style: {
    postcss: {
      plugins: [
        purgecss({
					content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
					whitelist: ['html', 'head', 'body', 'section', 'div', 'active', 'input-range__slider', 'input-range__label--value', 'input-range__label--min', 'input-range__label--max', 'input-range__track--background', 'input-range__slider-container', 'input-range__track', 'input-range__track--active'],
					whitelistPatterns: [/^nav/, /^container/, /^input-range/, /^Toastify/, /^custom/, /^chrome/, /^picker/, /^collapse/, /^ml-/, /^mr/, /^fade/, /^animation/, /^slider/],
					whitelistPatternsChildren: [/^nav/, /^container/, /^input-range/, /^Toastify/, /^custom/, /^chrome/, /^picker/, /^collapse/, /^ml-/, /^mr/, /^fade/, /^animation/, /^slider/]
        }),
      ],
    },
  },
}
