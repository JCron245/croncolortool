const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  style: {
    postcss: {
      plugins: [
        purgecss({
					content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
					whitelist: ['html', 'head', 'body', 'section', 'div', 'active'],
					whitelistPatterns: [/^nav/, /^container/, /^input-range/, /^Toastify/, /^custom/, /^chrome/, /^picker/, /^collapse/, /^ml-/, /^mr/, /^fade/, /^animation/],
					whitelistPatternsChildren: [/^nav/, /^container/, /^input-range/, /^Toastify/, /^custom/, /^chrome/, /^picker/, /^collapse/, /^ml-/, /^mr/, /^fade/, /^animation/]
        }),
      ],
    },
  },
}
