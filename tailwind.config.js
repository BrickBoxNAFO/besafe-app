/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        navy2: '#122544',
        navy3: '#1B3358',
        teal: '#0EA5A0',
        teal2: '#0C8C88',
        teal3: '#0A7370',
        slate: '#F0F4F8',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#334155',
            '--tw-prose-headings': '#0B1F3A',
            '--tw-prose-links': '#0EA5A0',
            '--tw-prose-bold': '#0B1F3A',
            '--tw-prose-quotes': '#0B1F3A',
            '--tw-prose-quote-borders': '#0EA5A0',
            '--tw-prose-bullets': '#0EA5A0',
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
