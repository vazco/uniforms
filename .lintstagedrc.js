module.exports = {
  '**/*.{js,ts,tsx}': ['eslint'],
  '**/*.{json,md,mdx,yml}': ['prettier --check'],
  '**/*.{ts,tsx}': () => 'tsc --project .'
};
