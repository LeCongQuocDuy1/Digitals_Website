/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            width: {
                main: "1220px",
            },
            backgroundColor: {
                main: "#f9ba48",
            },
            colors: {
                main: "#f9ba48",
            },
            borderColor: {
                "bd-main": "#ebebeb",
            },
            borderWidth: {
                "bd-main": "1px",
            },
            keyframes: {
                "slide-top": {
                    "0%": {
                        "-webkit-transform": "translateY(0)",
                        transform: "translateY(0)",
                    },
                    "100%": {
                        "-webkit-transform": "translateY(-30px)",
                        transform: "translateY(-30px)",
                    },
                },
            },
            animation: {
                "slide-top":
                    "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
            },
        },
        fontFamily: {
            main: ["Poppins", "sans-serif;"],
        },
    },
    plugins: [],
};
