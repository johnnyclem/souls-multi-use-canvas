module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest'],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  // Disable the conflicting rule or configure any additional ESLint rules here
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },
}; 