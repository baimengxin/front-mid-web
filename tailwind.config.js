/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind 应用范围
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      // 更改 tailwind 的默认值，更符合项目的值
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white'
      },
      height: {
        header: '72px',
        main: 'calc(100vh - 72px)'
      }
    }
  },
  plugins: []
}
