import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        serviscon: { navy: "#0F2742", blue: "#1F6FEB", green: "#1FA971", sand: "#F4F1EA" },
      },
    },
  },
  plugins: [],
};
export default config;
