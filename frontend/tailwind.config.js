/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        devbot: {
          bg: '#0A0A0F',
          surface: '#111118',
          surface2: '#1A1A2E',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          border: '#1E1E2E',
          text: '#F1F5F9',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-custom': 'bounce-custom 1.4s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)',
            opacity: '0.8'
          }
        },
        'bounce-custom': {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '40%': { transform: 'translateY(-8px)', opacity: '0.8' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
