module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {enabled: true, content: [
    'src/**/*.ts',
    'src/**/*.tsx' ,
  ]},
  theme: {
    fontFamily: {
      "sans": ["'nort'", "sans-serif"],
      "display": ["nort", "sans-serif"],
      "body": ["nort", "sans-serif"]
    },
 
    extend: {
      colors: {
        'purpureo': {
          '500': '#3e42ab',
          '700': '#2e317d',
          '900': '#0b0932',
        },
        'orange': {
          '400': ''
        },
        'bluish': {
          '300': '#0071bc'
        },
        'tangerine': {
          '200': '#fae7e1',
          '400': '#f97f5f'
        },
        'white': '100',
      },
    },
  },
  variants: {
    fontWeight: ["responsive", "hover", "focus", "active", "group-hover"]
  },
  plugins: [],
}
