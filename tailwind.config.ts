import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                yekan: "IRANYekanWeb",
                yekanX: "IRANYekanX",
            },
            colors: {
                ada: {
                    primary: "#84BD00",
                    neutral: {
                        0: "#000000",
                        5: "#1C1C1E",
                        10: "#101A29",
                        30: "#37465C",
                        40: "#526075",
                        60: "#979EA8",
                        80: "#D5D6D8",
                        93: "#CDCDCD",
                        100: "#FFFFFF",
                    },
                },
            },
        },
    },
    plugins: [],
};
export default config;
