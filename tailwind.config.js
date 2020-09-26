module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  // purge: {enabled: true, content: [
  //   'src/**/*.ts',
  //   'src/**/*.tsx' ,
  // ]},
  theme: {
    fontFamily: {
      "sans": ["'nort'", "sans-serif"],
      "display": ["nort", "sans-serif"],
      "body": ["nort", "sans-serif"]
    },
    extend: {
    },
  },
  variants: {
    fontWeight: ["responsive", "hover", "focus", "active", "group-hover"]
  },
  plugins: [],
}
