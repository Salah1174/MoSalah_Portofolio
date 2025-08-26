module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14171A",
        secondary: "#1DA1F2",
        tertiary: "#657786",
      },
    },
    screens: {
      sm: { max: '1000px' },
      lg: { max: '1024px' },
    }
  },
  plugins: [],
};