import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.2,
  googleFonts: [
    {
      name: "Lato",
      styles: ["400"],
    },
  ],
  headerFontFamily: ["Lato"],
  bodyFontFamily: ["Lato"],
})

export default typography
