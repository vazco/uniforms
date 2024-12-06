module.exports = {
  '**/*.{js,ts,tsx}': [
    'eslint --cache --cache-location node_modules/.cache/eslint --cache-strategy content',
  ],
  '**/*.{json,md,yml}': ['prettier --check'],
  '**/*.{ts,tsx}': () => 'pnpm lint:types',
};
