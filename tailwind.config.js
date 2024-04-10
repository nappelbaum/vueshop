/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: [
          'Montserrat',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Arial',
          'Noto Sans',
          'Liberation Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      keyframes: {
        drawerOpacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.7' }
        },
        drawerOpacityBack: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '0' }
        },
        drawerTranslate: {
          '0%': { transform: 'translateX(24rem)' },
          '100%': { transform: 'translateX(0)' }
        },
        drawerTranslateBack: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(24rem)' }
        }
      },
      animation: {
        drawerOpacity: 'drawerOpacity 0.5s ease-in-out forwards',
        drawerOpacityBack: 'drawerOpacityBack 0.5s ease-in-out forwards',
        drawerTranslate: 'drawerTranslate 0.5s ease-in-out forwards',
        drawerTranslateBack: 'drawerTranslateBack 0.5s ease-in-out forwards'
      }
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens
    }
  },
  plugins: ['@tailwindcss/forms']
}
