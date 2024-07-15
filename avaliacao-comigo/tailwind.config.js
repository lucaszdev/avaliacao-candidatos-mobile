/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/screens/**/*.tsx",
        "./src/screens/**/**/*.tsx",
        "./src/components/*.tsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
};
