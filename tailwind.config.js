const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			blue: colors.blue,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			indigo: colors.indigo,
			yellow: colors.yellow,
			graybg: "#F6F6F6",
			grayborder: "#E8E8E8",
			grayPlaceholder: "#BDBDBD",
			grayHeading: "#575767",
			graySubText: "#B9B9BE",
		},
		extend: {
			screens: {
				"3xl": "3640px",
			},
			fontFamily: {
				sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
			},
			spacing: {
				"14px": "14px",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/aspect-ratio"),
		require("tailwindcss-debug-screens"),
	],
};
