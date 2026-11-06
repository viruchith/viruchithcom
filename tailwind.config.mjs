/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Schibsted Grotesk"',
          '"Schibsted Grotesk Fallback"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"JetBrains Mono Fallback"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        meta: ['0.8125rem', { lineHeight: '1.25rem' }],
        small: ['0.875rem', { lineHeight: '1.375rem' }],
        body: ['1rem', { lineHeight: '1.625rem' }],
        lead: ['1.125rem', { lineHeight: '1.75rem' }],
        title: ['1.0625rem', { lineHeight: '1.5rem', letterSpacing: '-0.005em' }],
        section: ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '-0.02em' }],
        page: ['clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        display: ['clamp(1.875rem, 1.35rem + 2.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.032em' }],
      },
      colors: {
        paper: 'var(--paper)',
        raised: 'var(--raised)',
        ink: 'var(--ink)',
        body: 'var(--ink-body)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        accent: 'var(--accent)',
        'accent-wash': 'var(--accent-wash)',
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
      },
      maxWidth: {
        page: '75rem',
        measure: '56ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
