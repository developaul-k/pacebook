module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/common/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        login: '#F1F2F5',
        pacebook: '#3578e5',
        pacebook2: '#1877f2',
        'pacebook-disabled': '#e8f0fe',
        'pacebook-green': '#42b72a',
      },
    },
  },
  plugins: [],
}
