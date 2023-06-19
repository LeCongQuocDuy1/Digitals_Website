/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            width: {
                main: "1180px",
            },
            backgroundColor: {
                main: "#f9ba48",
            },
            colors: {
                main: "#f9ba48",
            },
        },
        fontFamily: {
            main: ["Poppins", "sans-serif;"],
        },
    },
    plugins: [],
};
