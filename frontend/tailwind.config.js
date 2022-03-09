module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         boxShadow: {
            card: '14px 14px 28px rgba(79,117,92,1),-14px -14px 28px rgba(229,255,255,0.5)',
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
