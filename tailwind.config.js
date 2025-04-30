/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx}'],
        theme: {
                extend: {
                    screens: {
                    'xs': '480px',
                    'sm': '640px',
                    'md': '768px',
                    'lg': '1024px',
                    'xl': '1280px',
                    '2xl': '1536px',
                    },
                    colors: {
                        primary: '#3490dc',
                        secondary: '#ffed4a',
                        accent: '#f56565',
                        background: '#000',
                        pink: '#ff72a6',
                        // pink: '#ed5fa3',
                        purple: '#7943f6',
                        gray: '#5b6875',
                        
                    },
                    fontFamily: {
                        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                        display: ['"Six Caps"', '"Six Caps Placeholder"', 'sans-serif'],
                    },
                },
        },
    plugins: [],
}