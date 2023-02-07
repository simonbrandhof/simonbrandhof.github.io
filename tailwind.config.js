/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
  content: [ "src/**/*.html", "src/**/*.njk" ],
  theme: {
    extend: {},
  },
  plugins: [
		require('@tailwindcss/typography')
	],
}
