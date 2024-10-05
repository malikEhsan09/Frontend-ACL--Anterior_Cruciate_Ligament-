import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		 scrollbar: ['rounded'],
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			lightBlue: '#547ea8',
  			sidebar: '#151F38',
  			onHover: '#1F3F72',
  			darkBlue: '#28375B',
  			buttonColor: '#1F3F72',
  			boldTextColor: '#121212',
  			semiTextColor: '#676F87',
  			toggleBackground: '#12182A'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"),  function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '8px', // Adjust as needed
          },
          '&::-webkit-scrollbar-track': {
            'background-color': '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            'background-color': '#888',
            'border-radius': '10px',
            'border': '2px solid #f1f1f1',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            'background-color': '#555',
          },
        },
      });
    },],
};
export default config;
