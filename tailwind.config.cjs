/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        dsphere: {
          950: '#02050D',
          900: '#040914',
          850: '#071124',
          800: '#0B1736',
          750: '#0E1E45',
          700: '#112554',
          cyan: '#00C2FF',
          electric: '#00F0FF',
          blue: '#0070F3',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          purple: '#A855F7',
          emerald: '#00FF9D',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(0, 194, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 194, 255, 0.04) 1px, transparent 1px)',
        'mesh-glow': 'radial-gradient(at 0% 0%, rgba(0, 194, 255, 0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.12) 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'glow-pulse': 'glowPulse 3.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(1)' },
          '50%': { opacity: 0.75, transform: 'scale(1.04)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -3px rgba(0, 194, 255, 0.35)',
        'neon-violet': '0 0 25px -3px rgba(139, 92, 246, 0.35)',
        'neon-emerald': '0 0 25px -3px rgba(0, 255, 157, 0.35)',
        'neon-amber': '0 0 25px -3px rgba(245, 158, 11, 0.35)',
        'glass-level1': '0 4px 20px 0 rgba(0, 0, 0, 0.3)',
        'glass-level2': '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'glass-level3': '0 16px 48px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'glass-glow-cyan': '0 8px 32px 0 rgba(0, 194, 255, 0.15), inset 0 1px 0 0 rgba(0, 194, 255, 0.25)',
      }
    },
  },
  plugins: [],
}

