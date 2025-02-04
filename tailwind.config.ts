import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#644841',
  			'primary-content': '#dcccc8',
  			'primary-dark': '#45322d',
  			'primary-light': '#835e55',
  			secondary: '#4b6441',
  			'secondary-content': '#cedcc8',
  			'secondary-dark': '#34452d',
  			'secondary-light': '#628355',
  			background: '#f5ecea',
  			foreground: '#fdfafa',
  			border: '#ead8d4',
  			copy: '#341e19',
  			'copy-light': '#8a5142',
  			'copy-lighter': '#b47464',
  			success: '#416441',
  			warning: '#646441',
  			error: '#644141',
  			'success-content': '#c8dcc8',
  			'warning-content': '#dcdcc8',
  			'error-content': '#dcc8c8',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
